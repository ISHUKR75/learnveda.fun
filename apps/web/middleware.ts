/**
 * @file middleware.ts
 * @description Next.js middleware for LearnVeda
 * When Clerk keys are configured: protects authenticated routes
 * When Clerk keys are not set (dev/demo mode): passthrough — no auth required
 */

import { NextResponse, type NextRequest } from "next/server";

/**
 * Check whether real Clerk keys have been configured.
 * We look for the publishable key in the server environment (process.env).
 * In Next.js middleware, NEXT_PUBLIC_ variables ARE available via process.env.
 */
const hasRealClerkKeys =
  !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes("placeholder") &&
  (
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.startsWith("pk_live_") ||
    (process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.startsWith("pk_test_") &&
     process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.length > 20)
  );

/* ─── Middleware Function ─────────────────────────────────────────────────── */
export async function middleware(request: NextRequest) {
  // In demo / dev mode (no real Clerk keys), just pass through all requests
  if (!hasRealClerkKeys) {
    return NextResponse.next(); // Allow all requests without auth check
  }

  // When real Clerk keys are present, apply auth protection
  // Dynamically import Clerk to avoid initialization errors when keys are missing
  const { clerkMiddleware, createRouteMatcher } = await import("@clerk/nextjs/server");

  const isProtectedRoute = createRouteMatcher([
    "/dashboard(.*)",
    "/explore(.*)",
    "/api/user(.*)",
    "/api/progress(.*)",
    "/api/battle(.*)",
  ]);

  // Apply Clerk middleware protection
  return clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req)) {
      await auth.protect();
    }
  })(request, {} as never);
}

/* ─── Middleware Matcher ──────────────────────────────────────────────────── */
export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
