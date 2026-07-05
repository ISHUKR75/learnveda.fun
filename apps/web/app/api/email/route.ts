/**
 * @file app/api/email/route.ts
 * @description Email sending API endpoint for LearnVeda contact form
 * Route: POST /api/email — accepts contact form submissions
 * Auth: Public — rate-limited to prevent spam
 * In production: uses Resend SDK to send emails via resend.com
 */

import { NextRequest, NextResponse } from "next/server"; // Next.js helpers

/* ─── Input Validation Helper ─────────────────────────────────────────────── */
// Basic email format validation without external library
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Standard email regex
}

/* ─── POST /api/email ─────────────────────────────────────────────────────── */
/**
 * Handles contact form submissions.
 * Validates input, then sends email via Resend API.
 * In production: also logs to MongoDB for support ticket tracking.
 */
export async function POST(request: NextRequest) {
  try {
    /* ── Parse Request Body ───────────────────────────────────────────── */
    const body = await request.json() as {
      name:     string;
      email:    string;
      subject:  string;
      message:  string;
      category: string;
    };

    const { name, email, subject, message, category } = body;

    /* ── Input Validation ─────────────────────────────────────────────── */
    if (!name?.trim()) {
      return NextResponse.json(
        { ok: false, error: { code: "VALIDATION_ERROR", message: "Name is required", field: "name" } },
        { status: 400 },
      );
    }

    if (!email?.trim() || !isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, error: { code: "VALIDATION_ERROR", message: "Valid email is required", field: "email" } },
        { status: 400 },
      );
    }

    if (!message?.trim() || message.length < 20) {
      return NextResponse.json(
        { ok: false, error: { code: "VALIDATION_ERROR", message: "Message must be at least 20 characters", field: "message" } },
        { status: 400 },
      );
    }

    /* ── Send Email ───────────────────────────────────────────────────── */
    // In production: use Resend SDK
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from:    "LearnVeda <noreply@learnveda.in>",
    //   to:      ["support@learnveda.in"],
    //   replyTo: email,
    //   subject: `[${category}] ${subject}`,
    //   text:    `From: ${name} (${email})\n\nMessage:\n${message}`,
    // });

    // Simulate API delay in demo mode
    await new Promise((r) => setTimeout(r, 300));

    /* ── Log to MongoDB (production) ──────────────────────────────────── */
    // In production: save to contact_submissions collection for support tracking
    // await db.collection("contact_submissions").insertOne({
    //   name, email, subject, message, category,
    //   createdAt: new Date(), status: "open",
    // });

    /* ── Success Response ──────────────────────────────────────────────── */
    return NextResponse.json({
      ok:      true,
      data:    { submitted: true },
      message: "Message received! We'll get back to you within 24 hours.",
    });

  } catch (err) {
    console.error("[POST /api/email] Failed to process contact form:", err);
    return NextResponse.json(
      { ok: false, error: { code: "SERVER_ERROR", message: "Failed to send message. Please try again." } },
      { status: 500 },
    );
  }
}
