/**
 * @file lib/razorpay/index.ts
 * @description Razorpay payment integration stub for LearnVeda
 *
 * Razorpay is the primary payment provider for Indian users
 * (UPI, Net Banking, cards — all in INR).
 *
 * Production setup:
 *  1. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to Replit Secrets
 *  2. Install: npm install razorpay
 *  3. Replace the stub below with real Razorpay client initialization
 *
 * @see https://razorpay.com/docs/payments/server-integration/nodejs/
 */

import crypto from "crypto";

/* ─── Environment ────────────────────────────────────────────────────────── */
const RAZORPAY_KEY_ID     = process.env.RAZORPAY_KEY_ID     || "";
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || "";

/** Publishable (frontend-safe) Razorpay key */
export const RAZORPAY_PUBLIC_KEY = RAZORPAY_KEY_ID;

/** True when Razorpay is fully configured */
export const isRazorpayConfigured =
  RAZORPAY_KEY_ID.length > 0 &&
  RAZORPAY_KEY_SECRET.length > 0 &&
  !RAZORPAY_KEY_ID.includes("placeholder");

/* ─── LearnVeda plan amounts (in paisa — 1 INR = 100 paisa) ─────────────── */
export const RAZORPAY_PLANS = {
  PRO_MONTHLY:   29900,    // ₹299/month
  PRO_YEARLY:    249900,   // ₹2499/year (≈ ₹208/month — save ₹1,089)
  SCHOOL_YEARLY: 4999900,  // ₹49,999/year (up to 500 students)
} as const;

/* ─── Razorpay client (lazy-loaded) ─────────────────────────────────────── */
let _razorpay: unknown = null;

/**
 * Get the Razorpay server-side client.
 * Returns null when credentials are not configured.
 *
 * @example
 * const rz = await getRazorpayClient();
 * if (!rz) return NextResponse.json({ error: "Payments not configured" }, { status: 503 });
 * const order = await rz.orders.create({ amount: RAZORPAY_PLANS.PRO_MONTHLY, currency: "INR", ... });
 */
export async function getRazorpayClient() {
  if (!isRazorpayConfigured) return null;
  if (_razorpay) return _razorpay as import("razorpay").default;

  try {
    const Razorpay = (await import("razorpay" as never) as { default: typeof import("razorpay").default }).default;
    _razorpay = new Razorpay({
      key_id:     RAZORPAY_KEY_ID,
      key_secret: RAZORPAY_KEY_SECRET,
    });
    return _razorpay as import("razorpay").default;
  } catch {
    console.warn("[LearnVeda] Razorpay package not installed. Run: npm install razorpay");
    return null;
  }
}

/* ─── Webhook signature verification ────────────────────────────────────── */
/**
 * Verify a Razorpay webhook signature.
 * Used in /api/webhooks/razorpay/route.ts
 *
 * @param body      - Raw request body as string
 * @param signature - Value of the `x-razorpay-signature` header
 */
export function verifyRazorpayWebhook(body: string, signature: string): boolean {
  if (!RAZORPAY_KEY_SECRET) return false;
  const expected = crypto
    .createHmac("sha256", RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}

/* ─── Payment verification (post-checkout) ───────────────────────────────── */
/**
 * Verify a Razorpay payment after checkout redirect.
 *
 * @param orderId   - Razorpay order ID
 * @param paymentId - Razorpay payment ID
 * @param signature - Razorpay signature from checkout
 */
export function verifyRazorpayPayment(
  orderId:   string,
  paymentId: string,
  signature: string,
): boolean {
  if (!RAZORPAY_KEY_SECRET) return false;
  const payload  = `${orderId}|${paymentId}`;
  const expected = crypto
    .createHmac("sha256", RAZORPAY_KEY_SECRET)
    .update(payload)
    .digest("hex");
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}
