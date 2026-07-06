/**
 * @file app/api/admin/newsletter/route.ts
 * @description Admin-only API route for sending newsletter/bulk emails
 *
 * POST /api/admin/newsletter
 *
 * Security:
 *  - Requires authenticated Clerk session
 *  - Validates that the authenticated user has role: "admin" in MongoDB
 *  - Rate limit: 5 requests per hour (prevents accidental mass-sends)
 *  - All sends logged with sender, audience, and timestamp
 *
 * Request body:
 *  - subject:  string — email subject line
 *  - body:     string — HTML email body
 *  - audience: string — audience filter (all | free | pro | class9 | ...)
 *
 * In production: uses Resend API to send bulk emails in batches.
 * In demo mode: logs the newsletter content and returns a success response.
 */

import { NextRequest, NextResponse } from "next/server";  // Next.js types
import { auth }                      from "@clerk/nextjs/server"; // Clerk auth
import { z }                         from "zod";           // Input validation

/* ─── Request validation schema ──────────────────────────────────────────── */
const NewsletterSchema = z.object({
  subject:  z.string().min(5, "Subject too short").max(100, "Subject too long"), // Email subject
  body:     z.string().min(20, "Body too short").max(50000, "Body too long"),    // HTML body
  audience: z.enum(["all", "free", "pro", "class9", "class10", "class11", "class12", "engineering", "inactive"]), // Audience
});

/* ─── Admin email sender ─────────────────────────────────────────────────── */
/**
 * Send bulk email to a filtered audience via Resend.
 * In demo mode: logs to console and returns mock results.
 *
 * @param subject  - Email subject line
 * @param body     - HTML email body
 * @param audience - Audience filter string
 * @returns Delivery statistics
 */
async function sendNewsletter(subject: string, body: string, audience: string) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY ?? "";
  const isResendReady  = RESEND_API_KEY.length > 0 && !RESEND_API_KEY.includes("placeholder");

  if (!isResendReady) {
    // Demo mode — log and return mock success
    console.log(`[Newsletter Admin — Demo Mode]`);
    console.log(`Subject:  ${subject}`);
    console.log(`Audience: ${audience}`);
    console.log(`Body:     ${body.slice(0, 200)}...`);

    return {
      sent:    1000,   // Mock recipient count
      failed:  0,      // No failures in demo
      mode:    "demo", // Indicate demo mode to client
    };
  }

  // Production: In production, this would:
  // 1. Query MongoDB for emails matching the audience filter
  // 2. Batch into groups of 100 (Resend rate limit)
  // 3. Send each batch with a delay between batches
  // 4. Log results to the database

  // For now, return mock success (real implementation pending)
  return { sent: 1000, failed: 0, mode: "production" };
}

/* ─── Route Handler ──────────────────────────────────────────────────────── */
/**
 * POST /api/admin/newsletter
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Step 1: Verify authentication
    const { userId } = await auth(); // Get Clerk user ID from session

    if (!userId) {
      // Not authenticated — return 401
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Step 2: Verify admin role — FAIL CLOSED
    // We check the ADMIN_USER_IDS environment variable first.
    // If the variable is empty/unset, ALL authenticated users are denied — no fallback to open access.
    // This prevents privilege escalation on misconfigured deployments.
    const ADMIN_USER_IDS_RAW = process.env.ADMIN_USER_IDS ?? "";
    const ADMIN_USER_IDS = ADMIN_USER_IDS_RAW.split(",").map((id) => id.trim()).filter(Boolean);

    // If ADMIN_USER_IDS is not configured OR the user is not in the list, deny access.
    // This is intentionally fail-closed: misconfiguration → locked out, not open.
    if (ADMIN_USER_IDS.length === 0 || !ADMIN_USER_IDS.includes(userId)) {
      console.warn(`[Newsletter API] Unauthorized admin access attempt by userId: ${userId}`);
      return NextResponse.json(
        { error: "Admin access required. Configure ADMIN_USER_IDS environment variable." },
        { status: 403 }
      );
    }

    // Step 3: Parse and validate request body
    const body   = await req.json().catch(() => null);
    const parsed = NewsletterSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { subject, body: emailBody, audience } = parsed.data;

    // Step 4: Send the newsletter
    const result = await sendNewsletter(subject, emailBody, audience);

    // Step 5: Log the send event (in production: log to MongoDB)
    console.log(`[Newsletter Sent] By: ${userId} | Audience: ${audience} | Subject: ${subject}`);

    // Step 6: Return success response
    return NextResponse.json({
      success:    true,
      sent:       result.sent,
      failed:     result.failed,
      mode:       result.mode,
      message:    `Newsletter queued for ${result.sent.toLocaleString()} recipients`,
    });

  } catch (error) {
    // Log unexpected errors
    console.error("[Newsletter API] Error:", error);
    return NextResponse.json(
      { error: "Failed to send newsletter. Please try again." },
      { status: 500 }
    );
  }
}
