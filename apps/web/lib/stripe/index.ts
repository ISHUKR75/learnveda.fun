/**
 * @file lib/stripe/index.ts
 * @description Stripe payment integration stub for LearnVeda
 *
 * Used for international payments (cards, international users).
 * Requires STRIPE_SECRET_KEY in environment.
 *
 * Production setup:
 *  1. Add STRIPE_SECRET_KEY to Replit Secrets
 *  2. Add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY to Replit Secrets
 *  3. Install: npm install stripe @stripe/stripe-js @stripe/react-stripe-js
 *  4. Replace the stub below with real Stripe client initialization
 *
 * @see https://stripe.com/docs/payments/quickstart
 */

/* ─── Environment ────────────────────────────────────────────────────────── */
const STRIPE_SECRET_KEY          = process.env.STRIPE_SECRET_KEY          || "";
const STRIPE_WEBHOOK_SECRET      = process.env.STRIPE_WEBHOOK_SECRET      || "";
export const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "";

/** True when Stripe is fully configured */
export const isStripeConfigured =
  STRIPE_SECRET_KEY.length > 0 &&
  !STRIPE_SECRET_KEY.includes("placeholder");

/* ─── LearnVeda plan price IDs (set in Stripe Dashboard) ─────────────────── */
export const STRIPE_PRICES = {
  /** Monthly Pro subscription */
  PRO_MONTHLY:   process.env.STRIPE_PRICE_PRO_MONTHLY   || "",
  /** Yearly Pro subscription (2 months free) */
  PRO_YEARLY:    process.env.STRIPE_PRICE_PRO_YEARLY    || "",
  /** School / institutional plan */
  SCHOOL_YEARLY: process.env.STRIPE_PRICE_SCHOOL_YEARLY || "",
} as const;

/* ─── Stripe client (lazy-loaded to avoid build errors without keys) ─────── */
let _stripe: unknown = null;

/**
 * Get the Stripe server-side client.
 * Returns null when STRIPE_SECRET_KEY is not configured — callers must
 * check `isStripeConfigured` before calling payment APIs.
 *
 * @example
 * const stripe = await getStripeClient();
 * if (!stripe) return NextResponse.json({ error: "Payments not configured" }, { status: 503 });
 * const session = await stripe.checkout.sessions.create({ ... });
 */
export async function getStripeClient() {
  if (!isStripeConfigured) return null;
  if (_stripe) return _stripe as import("stripe").default;

  // Dynamically import Stripe to avoid build failure when not installed
  try {
    const Stripe = (await import("stripe" as never) as { default: typeof import("stripe").default }).default;
    _stripe = new Stripe(STRIPE_SECRET_KEY, {
      apiVersion: "2024-12-18.acacia",
      typescript:  true,
    });
    return _stripe as import("stripe").default;
  } catch {
    // stripe package not installed — log once, return null
    console.warn("[LearnVeda] Stripe package not installed. Run: npm install stripe");
    return null;
  }
}

/* ─── Webhook signature verification ────────────────────────────────────── */
/**
 * Verify a Stripe webhook signature.
 * Used in /api/webhooks/stripe/route.ts
 *
 * @param payload - Raw request body as string
 * @param signature - Value of the `stripe-signature` header
 */
export async function verifyStripeWebhook(payload: string, signature: string) {
  const stripe = await getStripeClient();
  if (!stripe || !STRIPE_WEBHOOK_SECRET) return null;
  try {
    return stripe.webhooks.constructEvent(payload, signature, STRIPE_WEBHOOK_SECRET);
  } catch {
    return null;  // Invalid signature
  }
}
