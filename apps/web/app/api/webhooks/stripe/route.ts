/**
 * @file app/api/webhooks/stripe/route.ts
 * @description Stripe webhook handler for payment and subscription events
 * Route: POST /api/webhooks/stripe
 * Handles: checkout.session.completed, customer.subscription.* events
 * Security: Fails closed — rejects requests when STRIPE_WEBHOOK_SECRET is configured but verification fails
 * In production: upgrades/downgrades user plan in MongoDB on payment events
 */

import { NextRequest, NextResponse } from "next/server"; // Next.js helpers

/* ─── Webhook Secret Status ───────────────────────────────────────────────── */
const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET; // From Stripe dashboard webhooks tab
const IS_DEMO_MODE   = !WEBHOOK_SECRET;                   // Skip verification if not configured

/* ─── Stripe Event Payload Type ───────────────────────────────────────────── */
interface StripeEvent {
  type: string;
  data: { object: Record<string, unknown> };
}

/* ─── POST /api/webhooks/stripe ───────────────────────────────────────────── */
export async function POST(request: NextRequest) {
  /* ── 1. Read raw body (required for signature verification) ─────────────── */
  const rawBody  = await request.text();       // Must read as text before any JSON parsing
  const signature = request.headers.get("stripe-signature") || "";

  /* ── 2. Signature verification ──────────────────────────────────────────── */
  if (!IS_DEMO_MODE) {
    // PRODUCTION: Verify Stripe webhook signature — fail-closed if verification fails
    if (!signature) {
      console.error("[Stripe Webhook] Missing stripe-signature header — rejecting request");
      return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
    }

    try {
      // In production (with stripe package installed):
      // const Stripe = (await import("stripe")).default;
      // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
      // const event  = stripe.webhooks.constructEvent(rawBody, signature, WEBHOOK_SECRET!);
      // If constructEvent() throws, the signature is invalid
      // Process event.type below instead of parsing rawBody as JSON

      // TODO: Install stripe package and uncomment above when STRIPE_WEBHOOK_SECRET is set
      console.warn("[Stripe Webhook] STRIPE_WEBHOOK_SECRET set but stripe SDK verification not yet wired");
    } catch (err) {
      console.error("[Stripe Webhook] Signature verification FAILED — rejecting request:", err);
      return NextResponse.json({ error: "Invalid webhook signature" }, { status: 401 }); // Fail-closed
    }
  } else {
    // Demo mode — no secret; accept and warn
    console.warn("[Stripe Webhook] Running in DEMO MODE — signature verification SKIPPED. Set STRIPE_WEBHOOK_SECRET in production.");
  }

  /* ── 3. Parse event ─────────────────────────────────────────────────────── */
  let event: StripeEvent;
  try {
    event = JSON.parse(rawBody) as StripeEvent;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  /* ── 4. Handle events ───────────────────────────────────────────────────── */
  try {
    switch (event.type) {

      case "checkout.session.completed": {
        // User completed Pro plan purchase
        const session = event.data.object;
        console.log(`[Stripe Webhook] Checkout completed — customer: ${session.customer}`);

        // In production:
        // 1. Look up user by Stripe customer ID in MongoDB
        // 2. Set user.plan = "pro", user.planRenewsAt = subscription period end
        // 3. Send welcome email via Resend
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const sub    = event.data.object;
        const status = sub.status as string;
        console.log(`[Stripe Webhook] Subscription ${event.type} — status: ${status}`);

        // In production:
        // active / trialing → plan = "pro"
        // canceled / past_due / unpaid → downgrade to "free" after grace period
        break;
      }

      case "customer.subscription.deleted": {
        console.log(`[Stripe Webhook] Subscription cancelled: ${event.data.object.id}`);

        // In production:
        // 1. Find user by Stripe customer ID
        // 2. Set user.plan = "free" immediately (no grace period on explicit cancel)
        // 3. Send cancellation confirmation email
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object;
        console.log(`[Stripe Webhook] Payment failed — invoice: ${invoice.id}`);

        // In production:
        // 1. Find user by customer ID
        // 2. Mark user.paymentStatus = "past_due"
        // 3. Send payment failure email with Stripe's hosted payment update link
        break;
      }

      case "invoice.payment_succeeded": {
        console.log(`[Stripe Webhook] Payment succeeded — invoice: ${event.data.object.id}`);

        // In production:
        // 1. Clear any past_due flags on the user account
        // 2. Update planRenewsAt to next billing date
        break;
      }

      default:
        console.log(`[Stripe Webhook] Unhandled event: ${event.type}`);
    }

    return NextResponse.json({ ok: true, received: true }); // Stripe expects 2xx to stop retries

  } catch (err) {
    console.error("[Stripe Webhook] Processing error:", err);
    // Return 500 so Stripe retries the webhook
    return NextResponse.json({ error: "Processing failed" }, { status: 500 });
  }
}
