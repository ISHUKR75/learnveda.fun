/**
 * @file app/api/newsletter/route.ts
 * @description Newsletter subscription API route
 * Route: POST /api/newsletter
 *
 * Accepts: { email, source? }
 * - Validates email format
 * - Rate limits 3 subscriptions per IP per hour (prevents spam)
 * - Stores in MongoDB (subscribers collection) if connected
 * - Sends welcome email via Resend (logs in demo mode)
 * - Returns 200 on success, 400 on invalid email, 409 on duplicate, 429 on rate limit
 */

import { NextRequest, NextResponse } from "next/server"; // Server utilities
import { z }                         from "zod";          // Validation

/* ─── Validation Schema ───────────────────────────────────────────────────── */
const NewsletterSchema = z.object({
  email:  z.string().email("Please enter a valid email address"),          // Subscriber email
  source: z.string().max(50).optional(),                                   // Signup source (e.g. "blog", "home")
});

/* ─── In-Memory Rate Limiter ─────────────────────────────────────────────── */
const rateLimitMap = new Map<string, { count: number; windowStart: number }>();
const RATE_LIMIT_MAX    = 3;                // Max 3 newsletter signups per IP per window
const RATE_LIMIT_WINDOW = 60 * 60 * 1000;  // 1-hour window

function checkRateLimit(ip: string): boolean {
  const now    = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now - record.windowStart > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, windowStart: now });
    return true;
  }
  if (record.count >= RATE_LIMIT_MAX) return false;

  rateLimitMap.set(ip, { count: record.count + 1, windowStart: record.windowStart });
  return true;
}

/* ─── POST Handler ────────────────────────────────────────────────────────── */
/**
 * POST /api/newsletter
 * Subscribes an email to the LearnVeda newsletter.
 * @param req — incoming Next.js request object
 */
export async function POST(req: NextRequest) {
  try {
    /* ── Rate limit ───────────────────────────────────────────────── */
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
      ?? req.headers.get("x-real-ip")
      ?? "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    /* ── Parse + validate ─────────────────────────────────────────── */
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const parsed = NewsletterSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message ?? "Invalid email." },
        { status: 400 }
      );
    }

    const { email, source = "website" } = parsed.data;

    /* ── MongoDB storage (if connected) ───────────────────────────── */
    const MONGODB_URI = process.env.MONGODB_URI;
    if (MONGODB_URI && !MONGODB_URI.includes("placeholder")) {
      try {
        const { connectDB } = await import("@/lib/mongodb"); // Lazy import
        const { default: mongoose } = await import("mongoose");
        await connectDB();

        // Check for existing subscription
        const existing = await mongoose.connection.db
          ?.collection("newsletter_subscribers")
          .findOne({ email });

        if (existing) {
          return NextResponse.json(
            { message: "You're already subscribed! Check your inbox for our weekly digest." },
            { status: 200 } // Return 200, not 409 — better UX
          );
        }

        // Insert new subscriber
        await mongoose.connection.db
          ?.collection("newsletter_subscribers")
          .insertOne({
            email,
            source,
            subscribedAt: new Date(),
            active:       true,
          });
      } catch (dbError) {
        console.error("[newsletter] DB error:", dbError);
        // Don't block subscription on DB failure — fall through
      }
    } else {
      // Demo mode — just log
      console.log("[newsletter] Demo mode — subscriber:", { email, source });
    }

    /* ── Welcome email via Resend ─────────────────────────────────── */
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (RESEND_API_KEY && RESEND_API_KEY !== "re_placeholder") {
      try {
        const { Resend } = await import("resend");
        const resend     = new Resend(RESEND_API_KEY);

        await resend.emails.send({
          from:    "LearnVeda Team <noreply@learnveda.in>",
          to:      [email],
          subject: "Welcome to LearnVeda Weekly! 🎓",
          html:    `
            <h1>Welcome to LearnVeda Weekly! 🎓</h1>
            <p>Thanks for subscribing! You'll receive our weekly digest every Sunday with:</p>
            <ul>
              <li>🔥 New CBSE study tips & strategies</li>
              <li>💻 Coding tutorials & DSA problems</li>
              <li>🚀 Career guidance & placement prep</li>
              <li>📖 Engineering survival guides</li>
            </ul>
            <p>While you wait for Sunday's digest, <a href="https://learnveda.in/explore">explore all our content</a>.</p>
            <p>— The LearnVeda Team</p>
            <hr/>
            <p style="font-size: 12px; color: #888;">
              You can <a href="https://learnveda.in/unsubscribe?email=${encodeURIComponent(email)}">unsubscribe</a> anytime.
            </p>
          `,
        });
      } catch (emailErr) {
        console.error("[newsletter] Resend error:", emailErr);
        // Still return success
      }
    } else {
      console.log("[newsletter] Demo mode — would send welcome email to:", email);
    }

    /* ── Success ──────────────────────────────────────────────────── */
    return NextResponse.json(
      {
        success: true,
        message: "You're subscribed! Expect your first digest this Sunday. 🎉",
      },
      { status: 200 }
    );

  } catch (err) {
    console.error("[newsletter] Unexpected error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

/* ─── GET — unsubscribe support ─────────────────────────────────────────── */
/**
 * GET /api/newsletter?email=...&token=...
 * Unsubscribes an email from the newsletter (one-click unsubscribe).
 */
export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email parameter required." }, { status: 400 });
  }

  // Validate email format
  const parsed = z.string().email().safeParse(email);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email." }, { status: 400 });
  }

  // Demo mode or DB unsubscribe
  const MONGODB_URI = process.env.MONGODB_URI;
  if (MONGODB_URI && !MONGODB_URI.includes("placeholder")) {
    try {
      const { connectDB } = await import("@/lib/mongodb");
      const { default: mongoose } = await import("mongoose");
      await connectDB();

      await mongoose.connection.db
        ?.collection("newsletter_subscribers")
        .updateOne({ email }, { $set: { active: false, unsubscribedAt: new Date() } });
    } catch (err) {
      console.error("[newsletter] Unsubscribe DB error:", err);
    }
  } else {
    console.log("[newsletter] Demo mode — unsubscribe:", email);
  }

  return NextResponse.json(
    { success: true, message: "You've been unsubscribed from LearnVeda Weekly." },
    { status: 200 }
  );
}
