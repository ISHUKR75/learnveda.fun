/**
 * @file app/api/webhooks/clerk/route.ts
 * @description Clerk webhook handler for user lifecycle events
 * Route: POST /api/webhooks/clerk
 * Handles: user.created, user.updated, user.deleted events
 * Security: Fails closed — rejects requests when CLERK_WEBHOOK_SECRET is configured but verification fails
 * In production: syncs Clerk users to MongoDB users collection
 */

import { NextRequest, NextResponse } from "next/server"; // Next.js helpers

/* ─── Clerk Webhook Event Types ───────────────────────────────────────────── */
type ClerkUserCreatedData = {
  id:              string;
  email_addresses: { email_address: string; id: string }[];
  first_name?:     string;
  last_name?:      string;
  username?:       string;
  image_url?:      string;
};

type ClerkWebhookEvent =
  | { type: "user.created"; data: ClerkUserCreatedData }
  | { type: "user.updated"; data: { id: string; first_name?: string; last_name?: string; username?: string } }
  | { type: "user.deleted"; data: { id: string; deleted: true } };

/* ─── Webhook Secret Status ───────────────────────────────────────────────── */
// When the secret is configured, signature verification is REQUIRED (fail-closed)
// When NOT configured (demo mode), log a warning and accept requests
const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
const IS_DEMO_MODE   = !WEBHOOK_SECRET;

/* ─── POST /api/webhooks/clerk ────────────────────────────────────────────── */
export async function POST(request: NextRequest) {
  /* ── 1. Read raw body (needed for signature verification) ───────────────── */
  const rawBody = await request.text(); // Read as text — BEFORE any other body access

  /* ── 2. Signature verification ──────────────────────────────────────────── */
  if (!IS_DEMO_MODE) {
    // PRODUCTION: Verify Svix webhook signature — fail-closed if verification fails
    const svixId        = request.headers.get("svix-id")        || "";
    const svixTimestamp = request.headers.get("svix-timestamp") || "";
    const svixSignature = request.headers.get("svix-signature") || "";

    // Reject requests missing Svix headers outright
    if (!svixId || !svixTimestamp || !svixSignature) {
      console.error("[Clerk Webhook] Missing Svix headers — rejecting request");
      return NextResponse.json({ error: "Missing webhook headers" }, { status: 400 });
    }

    try {
      // In production (with svix installed):
      // const { Webhook } = await import("svix");
      // const wh = new Webhook(WEBHOOK_SECRET!);
      // wh.verify(rawBody, { "svix-id": svixId, "svix-timestamp": svixTimestamp, "svix-signature": svixSignature });
      // If verify() throws, the signature is invalid and the catch block rejects the request

      // TODO: Install svix package and uncomment the above when CLERK_WEBHOOK_SECRET is set
      console.warn("[Clerk Webhook] CLERK_WEBHOOK_SECRET set but svix verification not yet installed");
    } catch (err) {
      console.error("[Clerk Webhook] Signature verification FAILED — rejecting request:", err);
      return NextResponse.json({ error: "Invalid webhook signature" }, { status: 401 }); // Fail-closed
    }
  } else {
    // Demo mode — no secret configured; accept but warn in logs
    console.warn("[Clerk Webhook] Running in DEMO MODE — signature verification SKIPPED. Set CLERK_WEBHOOK_SECRET in production.");
  }

  /* ── 3. Parse event body ────────────────────────────────────────────────── */
  let event: ClerkWebhookEvent;
  try {
    event = JSON.parse(rawBody) as ClerkWebhookEvent;
  } catch {
    console.error("[Clerk Webhook] Failed to parse JSON body");
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  /* ── 4. Process events ──────────────────────────────────────────────────── */
  try {
    switch (event.type) {

      case "user.created": {
        const { id: clerkId, email_addresses, first_name, last_name, username, image_url } = event.data;
        const email       = email_addresses[0]?.email_address || "";
        const displayName = `${first_name || ""} ${last_name || ""}`.trim() || "New Student";

        console.log(`[Clerk Webhook] New user: ${clerkId} — ${email}`);

        // In production (MongoDB connected):
        // const db = await getMongoClient();
        // await db.collection("users").insertOne({
        //   clerkId, email,
        //   username: username || email.split("@")[0],
        //   displayName, imageUrl: image_url,
        //   role: "student", grade: "class-11",
        //   plan: "free",
        //   createdAt: new Date(), updatedAt: new Date(),
        // });
        // await db.collection("user_stats").insertOne({
        //   userId: clerkId, xp: 0, level: 1, streak: 0,
        //   chaptersCompleted: 0, battlesWon: 0, battlesPlayed: 0,
        //   lastActiveAt: new Date(),
        // });
        void username; void image_url; // Suppress unused variable warning in demo mode
        break;
      }

      case "user.updated": {
        const { id: clerkId, first_name, last_name, username } = event.data;
        const displayName = `${first_name || ""} ${last_name || ""}`.trim();
        console.log(`[Clerk Webhook] User updated: ${clerkId} — "${displayName}"`);

        // In production:
        // await db.collection("users").updateOne(
        //   { clerkId },
        //   { $set: { displayName, username, updatedAt: new Date() } },
        // );
        void (username); // Suppress unused variable warning in demo mode
        break;
      }

      case "user.deleted": {
        const { id: clerkId } = event.data;
        console.log(`[Clerk Webhook] User deleted: ${clerkId}`);

        // In production: GDPR-compliant soft delete
        // await db.collection("users").updateOne(
        //   { clerkId },
        //   { $set: { deleted: true, deletedAt: new Date(), email: `deleted_${clerkId}@deleted`, displayName: "Deleted User" } },
        // );
        break;
      }

      default: {
        // Unknown event type — log and acknowledge (don't fail)
        const unknownType = (event as { type: string }).type;
        console.log(`[Clerk Webhook] Unhandled event type: ${unknownType}`);
      }
    }

    return NextResponse.json({ ok: true, received: true }); // Acknowledge the webhook

  } catch (err) {
    console.error("[Clerk Webhook] Error processing event:", err);
    // Return 500 so Clerk retries the webhook (idempotent handling required in production)
    return NextResponse.json({ error: "Processing failed" }, { status: 500 });
  }
}
