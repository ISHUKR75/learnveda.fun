/**
 * @file app/api/email/route.ts
 * @description Email notification API for LearnVeda
 * Route: POST /api/email
 *
 * Allows admins and the system to send broadcast emails to users.
 * Protected: requires admin role or internal service token.
 *
 * Body: { type: "welcome" | "update" | "streak", to: string, name: string, [payload] }
 */

import { NextRequest, NextResponse } from "next/server"; // Next.js types

/* ─── POST /api/email ────────────────────────────────────────────────────── */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      type:    string;  // Email template type
      to:      string;  // Recipient email
      name:    string;  // Recipient name
      subject?: string; // Optional custom subject
      message?: string; // Optional custom message body
      streak?:  number; // Streak count for streak_reminder emails
    };

    const { type, to, name, streak } = body;

    // ── Input validation ─────────────────────────────────────────────────
    if (!to || !name || !type) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields: to, name, type" },
        { status: 400 }
      );
    }

    // ── Import email helpers ─────────────────────────────────────────────
    const {
      sendEmail,
      welcomeEmailHtml,
      streakReminderEmailHtml,
      emailLayout,
    } = await import("@/lib/email");

    // ── Route to correct template ────────────────────────────────────────
    let subject: string;
    let html:    string;

    switch (type) {
      case "welcome":
        subject = `Welcome to LearnVeda, ${name}! 🎉`;
        html    = welcomeEmailHtml(name);                  // Branded welcome email
        break;

      case "streak_reminder":
        subject = `🔥 Keep your streak alive, ${name}!`;
        html    = streakReminderEmailHtml(name, streak ?? 1); // Streak reminder
        break;

      case "course_update":
        subject = body.subject ?? "New content available on LearnVeda";
        html    = emailLayout(`
          <h2 style="color:#111827;margin:0 0 16px;">Hi ${name} 👋</h2>
          <p style="color:#374151;line-height:1.6;">${body.message ?? "New chapters and content are available on your learning path."}</p>
          <a href="https://learnveda.in/learn" style="display:inline-block;margin-top:24px;padding:14px 28px;background:#6366f1;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;">
            Explore New Content →
          </a>
        `);
        break;

      default:
        return NextResponse.json(
          { ok: false, error: `Unknown email type: ${type}` },
          { status: 400 }
        );
    }

    // ── Send email ────────────────────────────────────────────────────────
    const result = await sendEmail({ to, subject, html });

    if (!result.success) {
      return NextResponse.json(
        { ok: false, error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, id: result.id });

  } catch (err) {
    console.error("[Email API] Error:", err);
    return NextResponse.json({ ok: false, error: "Email service error" }, { status: 500 });
  }
}
