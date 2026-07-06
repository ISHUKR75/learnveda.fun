/**
 * @file app/api/webhooks/clerk/route.ts
 * @description Clerk webhook handler for LearnVeda
 * Route: POST /api/webhooks/clerk
 *
 * Receives Clerk lifecycle events and syncs them to MongoDB:
 *  - user.created → create User document + send welcome email
 *  - user.updated → update User name, avatar, email
 *  - user.deleted → soft-delete User (isActive: false)
 *  - session.created → update lastActiveAt
 *
 * Security:
 *  - Verifies Svix signature (CLERK_WEBHOOK_SECRET required)
 *  - Returns 401 for unverified payloads
 *  - Fail-closed: unknown events are logged and ignored, not rejected
 */

import { NextRequest, NextResponse } from "next/server"; // Next.js server types

/* ─── POST /api/webhooks/clerk ───────────────────────────────────────────── */
export async function POST(req: NextRequest) {
  // ── Guard: webhook secret must be configured ───────────────────────────
  if (!process.env.CLERK_WEBHOOK_SECRET) {
    console.error("[Clerk Webhook] CLERK_WEBHOOK_SECRET is not set — rejecting all webhooks");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  try {
    // ── Verify Svix signature ─────────────────────────────────────────────
    const svixId        = req.headers.get("svix-id");         // Unique message ID
    const svixTimestamp = req.headers.get("svix-timestamp");  // Message timestamp
    const svixSignature = req.headers.get("svix-signature");  // HMAC signature

    if (!svixId || !svixTimestamp || !svixSignature) {
      return NextResponse.json({ error: "Missing Svix headers" }, { status: 401 });
    }

    // Dynamically import svix to avoid bundling it unnecessarily
    const { Webhook } = await import("svix");
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET); // Create verifier

    const body    = await req.text();         // Read raw body for signature verification
    let payload: Record<string, unknown>;

    try {
      // verify() throws if the signature is invalid
      payload = wh.verify(body, {
        "svix-id":        svixId,
        "svix-timestamp": svixTimestamp,
        "svix-signature": svixSignature,
      }) as Record<string, unknown>;
    } catch {
      console.warn("[Clerk Webhook] Signature verification failed — rejecting request");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const eventType = payload.type as string;  // e.g. "user.created"
    const data      = payload.data as Record<string, unknown>; // Event payload

    // ── Connect to MongoDB ────────────────────────────────────────────────
    const { connectDB } = await import("@/lib/mongodb");
    const { User }      = await import("@/lib/mongodb/models");
    await connectDB();

    // ── Handle each event type ────────────────────────────────────────────
    switch (eventType) {
      case "user.created": {
        // New user registered via Clerk — create a MongoDB user record
        const email  = (data.email_addresses as {email_address: string}[])?.[0]?.email_address ?? "";
        const name   = `${data.first_name ?? ""} ${data.last_name ?? ""}`.trim() || "Student";
        const avatar = (data.image_url as string) ?? "";
        const userId = data.id as string;

        await User.findOneAndUpdate(
          { clerkId: userId },
          { $setOnInsert: { clerkId: userId, name, email, avatar, role: "student", plan: "free" } },
          { upsert: true }             // Create if doesn't exist, skip if already created via JIT
        );

        // Send welcome email asynchronously (don't await — webhook must respond fast)
        if (process.env.RESEND_API_KEY && email) {
          import("@/lib/email").then(({ sendEmail, welcomeEmailHtml }) => {
            sendEmail({ to: email, subject: "Welcome to LearnVeda! 🎉", html: welcomeEmailHtml(name) });
          }).catch(console.error);
        }

        console.log(`[Clerk Webhook] user.created — synced ${email} to MongoDB`);
        break;
      }

      case "user.updated": {
        // User updated their Clerk profile — sync changes to MongoDB
        const userId  = data.id as string;
        const name    = `${data.first_name ?? ""} ${data.last_name ?? ""}`.trim();
        const email   = (data.email_addresses as {email_address: string}[])?.[0]?.email_address ?? "";
        const avatar  = (data.image_url as string) ?? "";

        await User.findOneAndUpdate(
          { clerkId: userId },
          { $set: { name, email, avatar } }  // Update profile fields
        );
        console.log(`[Clerk Webhook] user.updated — synced ${userId}`);
        break;
      }

      case "user.deleted": {
        // User deleted their Clerk account — soft-delete in MongoDB
        const userId = data.id as string;
        await User.findOneAndUpdate(
          { clerkId: userId },
          { $set: { isActive: false } }      // Soft-delete — preserve data for analytics
        );
        console.log(`[Clerk Webhook] user.deleted — deactivated ${userId}`);
        break;
      }

      case "session.created": {
        // User signed in — update lastActiveAt for streak tracking
        const userId = (data.user_id ?? data.id) as string;
        if (userId) {
          await User.findOneAndUpdate(
            { clerkId: userId },
            { $set: { lastActiveAt: new Date() } }  // Record activity timestamp
          );
        }
        break;
      }

      default:
        // Unhandled event types are logged but not rejected
        console.info(`[Clerk Webhook] Unhandled event type: ${eventType}`);
    }

    return NextResponse.json({ ok: true, event: eventType });

  } catch (err) {
    console.error("[Clerk Webhook] Unhandled error:", err);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
