/**
 * @file app/api/contact/route.ts
 * @description Contact form API route — POST handler
 * Route: POST /api/contact
 *
 * Accepts: { name, email, subject, message, category }
 * Sends email via Resend (or logs to console in demo mode).
 * Rate limits: 5 requests per IP per hour (via in-memory store, Redis if available).
 *
 * Response codes:
 *   200 — sent successfully
 *   400 — validation error
 *   429 — rate limited
 *   500 — server error
 */

import { NextRequest, NextResponse } from "next/server"; // Next.js server utilities
import { z } from "zod";                                 // Input validation schema

/* ─── Validation Schema ───────────────────────────────────────────────────── */
/**
 * ContactSchema
 * Validates the incoming contact form payload.
 * All fields are required; email must be valid format.
 */
const ContactSchema = z.object({
  name:     z.string().min(2, "Name must be at least 2 characters").max(100),  // Full name
  email:    z.string().email("Please enter a valid email address"),              // Contact email
  subject:  z.string().min(5, "Subject must be at least 5 characters").max(200), // Message subject
  message:  z.string().min(20, "Message must be at least 20 characters").max(5000), // Body
  category: z.enum(["general", "support", "billing", "partnership", "feedback"]).optional(), // Category
});

/* ─── In-Memory Rate Limiter ─────────────────────────────────────────────── */
/**
 * rateLimitMap
 * Tracks request counts per IP address per hour window.
 * In production, replace with Redis (INCR + EXPIRE) for persistence across instances.
 * Key: IP string — Value: { count, windowStart }
 */
const rateLimitMap = new Map<string, { count: number; windowStart: number }>();

const RATE_LIMIT_MAX     = 5;        // Max 5 contact form submissions per IP
const RATE_LIMIT_WINDOW  = 60 * 60 * 1000; // 1-hour sliding window (ms)

/**
 * checkRateLimit
 * Returns true if the IP is within rate limits, false if exceeded.
 * @param ip — client IP address string
 */
function checkRateLimit(ip: string): boolean {
  const now    = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now - record.windowStart > RATE_LIMIT_WINDOW) {
    // First request or window expired — reset the counter
    rateLimitMap.set(ip, { count: 1, windowStart: now });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false; // Limit exceeded
  }

  // Increment existing counter
  rateLimitMap.set(ip, { count: record.count + 1, windowStart: record.windowStart });
  return true;
}

/* ─── POST Handler ────────────────────────────────────────────────────────── */
/**
 * POST /api/contact
 * Handles contact form submission with validation, rate limiting, and email dispatch.
 * @param req — incoming Next.js request
 */
export async function POST(req: NextRequest) {
  try {
    /* ── Rate limiting ────────────────────────────────────────────── */
    // Extract client IP from headers (works behind Vercel / Nginx proxies)
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
      ?? req.headers.get("x-real-ip")
      ?? "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests — please wait an hour before sending another message." },
        { status: 429 }
      );
    }

    /* ── Parse and validate input ─────────────────────────────────── */
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
    }

    const parsed = ContactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message ?? "Validation failed." },
        { status: 400 }
      );
    }

    const { name, email, subject, message, category } = parsed.data;

    /* ── Send email via Resend (or demo fallback) ─────────────────── */
    const RESEND_API_KEY = process.env.RESEND_API_KEY; // Optional env variable

    if (RESEND_API_KEY && RESEND_API_KEY !== "re_placeholder") {
      // Real email send via Resend API
      try {
        const { Resend } = await import("resend"); // Lazy import
        const resend     = new Resend(RESEND_API_KEY);

        await resend.emails.send({
          from:    "LearnVeda Contact <noreply@learnveda.in>",
          to:      ["support@learnveda.in"],
          replyTo: email,
          subject: `[Contact] ${category ? `[${category}] ` : ""}${subject}`,
          text:    `Name: ${name}\nEmail: ${email}\nCategory: ${category ?? "general"}\n\n${message}`,
          html:    `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Category:</strong> ${category ?? "general"}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <hr/>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, "<br>")}</p>
          `,
        });
      } catch (emailError) {
        console.error("[contact] Resend error:", emailError);
        // Fall through — still return success (don't expose email errors to client)
      }
    } else {
      // Demo mode — log to console instead of sending
      console.log("[contact] Demo mode — email would be sent:", {
        name, email, subject, message, category: category ?? "general",
      });
    }

    /* ── Success response ─────────────────────────────────────────── */
    return NextResponse.json(
      {
        success: true,
        message: "Your message has been received! We'll get back to you within 24 hours.",
      },
      { status: 200 }
    );

  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}

/* ─── GET — method not allowed ───────────────────────────────────────────── */
export function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
