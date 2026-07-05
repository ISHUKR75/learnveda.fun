---
name: LearnVeda Setup Notes
description: Key setup facts for the LearnVeda monorepo on Replit — build quirks, demo mode, key patterns
---

# LearnVeda Setup Notes

## Build / Workflow Quirks

**Why:** Running `npm run build` inside `apps/web/` deletes the `.next/` dev directory — the dev server then 500s on all routes until the "Start application" workflow is restarted. Never run build + expect dev to still work.

**Rule:** After any `npm run build`, always restart the "Start application" workflow before testing routes.

## Demo Mode Pattern

All external services (Clerk, MongoDB, OpenAI, Stripe, Redis) have explicit key detection guards:
```ts
const hasRealClerkKeys = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  && !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes("placeholder")
  && process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.startsWith("pk_");
```
When keys are absent, every component/route falls back to demo behavior (mock data, pass-through auth) instead of crashing.

## Middleware Auth Pattern

**Rule:** Auth enforcement in `apps/web/middleware.ts` is conditional on `hasRealClerkKeys`. In demo mode, protected routes pass through with `X-LearnVeda-Demo: 1` header. In Clerk mode, unauthenticated requests are redirected to `/sign-in?redirect_url=...` with fail-closed error handling.

## Webhook Security Pattern

Both Clerk and Stripe webhook routes (`apps/web/app/api/webhooks/*/route.ts`) follow fail-closed security:
- When the respective webhook secret is configured → signature MUST verify or request is rejected (401)
- When secret is absent (demo mode) → accept with warning log only
- Raw body must be read as `.text()` BEFORE any JSON parsing for signature verification to work

## AI Rate Limiting

`/api/ai` uses in-memory rate limiting (20 req/hour per userId). In production, replace with Redis sliding window via `apps/web/lib/redis.ts`.

## Framer Motion Screenshot Issue

**Why:** Framer Motion `initial={{ opacity: 0 }}` causes near-blank screenshots when the screenshot tool captures mid-animation.

**Rule:** Use `opacity: 0.01` (not `0`) as the initial value for any above-the-fold hero/heading animations. This makes the page visually readable in SSR screenshots while still animating in for real users.

## pnpm vs npm

`apps/web/package-lock.json` exists → use `npm` in the workflow, not `pnpm`, for `apps/web`. The rest of the monorepo uses pnpm at the root level.
