/**
 * @file lib/email/resend.ts
 * @description Resend email client wrapper for LearnVeda
 * @purpose Provides a typed sendEmail() helper that wraps the Resend API
 * @used-by API routes: email-broadcast, password-reset, OTP, welcome, receipt
 *
 * Resend docs: https://resend.com/docs/api-reference/emails/send-email
 * In production: RESEND_API_KEY env var must be set.
 * In demo mode (no key): emails are logged to console and not sent.
 */

/* ─── Types ──────────────────────────────────────────────────────────────── */
/** Parameters for sendEmail — mirrors Resend's send API */
interface SendEmailParams {
  to:       string | string[];   // Recipient(s) — email address(es)
  subject:  string;              // Email subject line
  html:     string;              // HTML email body
  text?:    string;              // Optional plain-text fallback
  from?:    string;              // Override sender (default: RESEND_FROM_EMAIL env)
  replyTo?: string;              // Reply-to address
  cc?:      string[];            // CC recipients
  bcc?:     string[];            // BCC recipients (used for batch broadcasts)
  tags?:    { name: string; value: string }[]; // Tags for Resend analytics
}

/** Return type from sendEmail */
interface SendEmailResult {
  id:      string;               // Resend message ID (for tracking)
  success: boolean;              // Whether the API call succeeded
  error?:  string;               // Error message if failed
}

/* ─── Default sender info ────────────────────────────────────────────────── */
// Set RESEND_FROM_EMAIL in environment; fallback to a safe default
const DEFAULT_FROM = process.env.RESEND_FROM_EMAIL ?? "LearnVeda <hello@learnveda.in>";

/* ─── sendEmail helper ───────────────────────────────────────────────────── */
/**
 * Sends a transactional email via Resend.
 * Falls back to console.log() in demo mode when RESEND_API_KEY is not set.
 *
 * @param params - Email parameters (to, subject, html, etc.)
 * @returns SendEmailResult with Resend message ID on success
 *
 * @example
 * await sendEmail({
 *   to:      "student@example.com",
 *   subject: "Welcome to LearnVeda!",
 *   html:    "<h1>Hello!</h1>",
 * });
 */
export async function sendEmail(params: SendEmailParams): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY; // Check if Resend is configured

  /* ── Demo mode: log to console and return fake success ────────── */
  if (!apiKey) {
    console.log("[sendEmail] RESEND_API_KEY not set — demo mode");
    console.log("[sendEmail] Would send:", {
      to:      params.to,
      subject: params.subject,
      from:    params.from ?? DEFAULT_FROM,
    });
    // Return a fake ID for demo mode
    return { id: `demo-${Date.now()}`, success: true };
  }

  /* ── Production mode: call Resend API ─────────────────────────── */
  try {
    const payload = {
      from:     params.from ?? DEFAULT_FROM,     // Sender address
      to:       Array.isArray(params.to) ? params.to : [params.to], // Always an array
      subject:  params.subject,
      html:     params.html,
      text:     params.text,                     // Plain text fallback
      reply_to: params.replyTo,                  // Reply-to (Resend field name)
      cc:       params.cc,
      bcc:      params.bcc,
      tags:     params.tags,
    };

    // Remove undefined fields (Resend API rejects them)
    const cleanPayload = Object.fromEntries(
      Object.entries(payload).filter(([, v]) => v !== undefined)
    );

    // Call Resend REST API
    const response = await fetch("https://api.resend.com/emails", {
      method:  "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type":  "application/json",
      },
      body: JSON.stringify(cleanPayload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMsg  = (errorData as { message?: string }).message ?? `HTTP ${response.status}`;
      console.error("[sendEmail] Resend API error:", errorMsg);
      return { id: "", success: false, error: errorMsg };
    }

    const data = await response.json() as { id?: string };
    return { id: data.id ?? "", success: true };  // Return Resend message ID

  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Unknown error";
    console.error("[sendEmail] Failed:", errorMsg);
    return { id: "", success: false, error: errorMsg };
  }
}

/* ─── Email Templates ────────────────────────────────────────────────────── */
/**
 * Generates a branded HTML email body using the LearnVeda template.
 * Wraps content in a responsive HTML shell with LearnVeda branding.
 *
 * @param content - Main HTML content to wrap
 * @param title   - Email title (used in preheader text)
 */
export function emailTemplate(content: string, title: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f4f4f5; color: #09090b; }
    .container { max-width: 580px; margin: 40px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.06); }
    .header { background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 32px 40px; }
    .logo { font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px; }
    .logo span { color: #c7d2fe; }
    .body { padding: 40px; }
    .body h1 { font-size: 24px; font-weight: 700; color: #09090b; margin-bottom: 12px; }
    .body h2 { font-size: 20px; font-weight: 600; color: #09090b; margin: 24px 0 8px; }
    .body p { font-size: 15px; line-height: 1.7; color: #52525b; margin-bottom: 16px; }
    .body a { color: #6366f1; text-decoration: none; }
    .btn { display: inline-block; background: #6366f1; color: #ffffff !important; font-weight: 600; font-size: 15px; padding: 14px 28px; border-radius: 10px; text-decoration: none !important; margin: 16px 0; }
    .stat-row { display: flex; gap: 16px; margin: 24px 0; }
    .stat { flex: 1; background: #f4f4f5; border-radius: 10px; padding: 16px; text-align: center; }
    .stat-value { font-size: 24px; font-weight: 700; color: #6366f1; }
    .stat-label { font-size: 12px; color: #71717a; margin-top: 4px; }
    .divider { border: none; border-top: 1px solid #e4e4e7; margin: 24px 0; }
    .footer { background: #f9f9fb; padding: 24px 40px; text-align: center; }
    .footer p { font-size: 13px; color: #a1a1aa; line-height: 1.6; }
    .footer a { color: #6366f1; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">Learn<span>Veda</span></div>
    </div>
    <div class="body">
      ${content}
    </div>
    <div class="footer">
      <p>
        LearnVeda · India's AI-powered EdTech platform<br>
        <a href="https://learnveda.in">learnveda.in</a> · 
        <a href="https://learnveda.in/unsubscribe">Unsubscribe</a> · 
        <a href="https://learnveda.in/privacy">Privacy Policy</a>
      </p>
    </div>
  </div>
</body>
</html>`.trim();
}
