/**
 * @file lib/email/index.ts
 * @description Email service abstraction for LearnVeda using Resend
 *
 * All outbound emails flow through this module:
 *  - Welcome emails (after sign-up)
 *  - Course update notifications
 *  - Streak reminder emails
 *  - Password reset (Clerk handles this, but custom templates go here)
 *  - Admin broadcast emails
 *
 * When RESEND_API_KEY is not set, emails are logged to the console instead
 * of being sent — safe demo / development behaviour.
 */

/* ─── Types ──────────────────────────────────────────────────────────────── */
export interface EmailPayload {
  to:      string | string[]; // Recipient(s)
  subject: string;            // Email subject line
  html:    string;            // HTML body (use template helpers below)
  text?:   string;            // Plain-text fallback (accessibility + spam scores)
  from?:   string;            // Sender override — defaults to FROM_ADDRESS
  replyTo?: string;           // Reply-to address
}

export interface EmailResult {
  success: boolean;           // Whether the send was accepted
  id?:     string;            // Resend message ID (for tracking)
  error?:  string;            // Error message if success=false
}

/* ─── Constants ──────────────────────────────────────────────────────────── */
const FROM_ADDRESS = process.env.EMAIL_FROM ?? "LearnVeda <hello@learnveda.in>";
const RESEND_API_KEY = process.env.RESEND_API_KEY;

/* ─── sendEmail ──────────────────────────────────────────────────────────── */
/**
 * Send a transactional email via Resend.
 *
 * Gracefully logs to console when RESEND_API_KEY is not set (dev/demo mode).
 *
 * @param payload - Email payload with to, subject, html body
 * @returns       - Result object with success flag and optional ID/error
 */
export async function sendEmail(payload: EmailPayload): Promise<EmailResult> {
  const { to, subject, html, text, from = FROM_ADDRESS, replyTo } = payload;

  // ── Demo mode: log instead of send ─────────────────────────────────────
  if (!RESEND_API_KEY) {
    console.log("[LearnVeda Email] Demo mode — would send email:");
    console.log(`  To:      ${Array.isArray(to) ? to.join(", ") : to}`);
    console.log(`  Subject: ${subject}`);
    console.log(`  From:    ${from}`);
    return { success: true, id: "demo-" + Date.now() }; // Fake success in demo
  }

  // ── Production: send via Resend API ────────────────────────────────────
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type":  "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`, // API key auth
      },
      body: JSON.stringify({
        from,                                         // Sender address
        to:      Array.isArray(to) ? to : [to],       // Ensure array format
        subject,                                      // Email subject
        html,                                         // HTML body
        text:    text ?? stripHtml(html),             // Plain-text fallback
        reply_to: replyTo,                            // Optional reply-to
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Resend API error ${response.status}: ${err}`);
    }

    const data = (await response.json()) as { id: string }; // Resend returns { id }
    return { success: true, id: data.id };                  // Return message ID

  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown email error";
    console.error("[LearnVeda Email] Send failed:", message);
    return { success: false, error: message }; // Don't throw — caller decides how to handle
  }
}

/* ─── Email Template Helpers ─────────────────────────────────────────────── */

/**
 * Wraps content in the LearnVeda branded email layout.
 * @param content - The inner HTML content for the email body
 */
export function emailLayout(content: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>LearnVeda</title>
</head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.08);">
        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#6366f1,#8b5cf6);padding:28px 32px;">
          <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;letter-spacing:-0.5px;">
            Learn<span style="color:#c4b5fd;">Veda</span>
          </h1>
        </td></tr>
        <!-- Body -->
        <tr><td style="padding:32px;">${content}</td></tr>
        <!-- Footer -->
        <tr><td style="background:#f3f4f6;padding:20px 32px;text-align:center;">
          <p style="margin:0;color:#6b7280;font-size:13px;">
            © ${new Date().getFullYear()} LearnVeda. All rights reserved.<br/>
            <a href="https://learnveda.in/privacy-policy" style="color:#6366f1;">Privacy Policy</a> ·
            <a href="https://learnveda.in/terms-of-service" style="color:#6366f1;">Terms</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

/**
 * Generate the welcome email HTML for a new user.
 * @param name - The new user's display name
 */
export function welcomeEmailHtml(name: string): string {
  return emailLayout(`
    <h2 style="margin:0 0 16px;color:#111827;font-size:22px;">Welcome to LearnVeda, ${name}! 🎉</h2>
    <p style="color:#374151;line-height:1.6;">
      You've just joined India's most complete EdTech platform. Here's what you can explore:
    </p>
    <ul style="color:#374151;line-height:2;padding-left:20px;">
      <li>📚 <strong>CBSE Class 9–12</strong> — structured chapter plans with simulations</li>
      <li>💻 <strong>Programming</strong> — C, Python, Java, JavaScript and 9 more languages</li>
      <li>⚔️ <strong>Live Battles</strong> — compete with students nationwide in real time</li>
      <li>🤖 <strong>AI Tutor</strong> — get instant help on any topic, 24/7</li>
    </ul>
    <a href="https://learnveda.in/dashboard" style="display:inline-block;margin-top:24px;padding:14px 28px;background:#6366f1;color:#ffffff;text-decoration:none;border-radius:8px;font-weight:600;">
      Start Learning →
    </a>
  `);
}

/**
 * Generate a streak reminder email HTML.
 * @param name   - The user's display name
 * @param streak - The user's current streak count
 */
export function streakReminderEmailHtml(name: string, streak: number): string {
  return emailLayout(`
    <h2 style="margin:0 0 16px;color:#111827;font-size:22px;">🔥 Don't break your ${streak}-day streak, ${name}!</h2>
    <p style="color:#374151;line-height:1.6;">
      You haven't studied today. Log in and complete just one chapter to keep your streak alive!
    </p>
    <a href="https://learnveda.in/dashboard" style="display:inline-block;margin-top:24px;padding:14px 28px;background:#f59e0b;color:#ffffff;text-decoration:none;border-radius:8px;font-weight:600;">
      Continue Learning →
    </a>
  `);
}

/* ─── Utility ─────────────────────────────────────────────────────────────── */
/** Strip HTML tags for plain-text email fallback */
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}
