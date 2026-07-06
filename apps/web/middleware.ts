/**
 * @file middleware.ts
 * @description Next.js middleware for LearnVeda
 * Handles auth protection, security headers, and request processing
 * Runs at the edge before any page or API handler is invoked
 *
 * Auth behavior:
 * - Clerk configured → redirect unauthenticated users away from protected routes to /sign-in
 * - Demo mode (no Clerk keys) → allow all routes so UI is explorable without auth
 *
 * Security headers applied to every response (non-static assets).
 */

import { NextRequest, NextResponse } from "next/server"; // Next.js middleware helpers

/* ─── Protected Platform Routes ───────────────────────────────────────────── */
// These routes require authentication — unauthenticated users are redirected to /sign-in
const PROTECTED_PREFIXES = [
  "/dashboard",
  "/ai-tutor",
  "/mentorship",
  "/live",
  "/live-battles",
  "/leaderboard",
  "/compiler",
  "/notifications",
  "/profile",
  "/semester",
  "/core-cs",
  "/community/chat",
  "/admin", // Admin routes — require auth; server-side admin role check is in each API + layout
];

/* ─── Admin-only routes ────────────────────────────────────────────────────── */
// These require both authentication AND admin role.
// API routes enforce admin role server-side. This middleware enforces authentication only.
// Pages under /admin also require role check via their layout (defense in depth).
const ADMIN_PREFIXES = ["/admin"];

/* ─── Auth Check ──────────────────────────────────────────────────────────── */
function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix + "/"),
  );
}

/* ─── Clerk Key Detection ─────────────────────────────────────────────────── */
// Only enforce auth when real Clerk keys are configured
const hasRealClerkKeys =
  !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes("placeholder") &&
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.startsWith("pk_");

/* ─── Middleware Function ─────────────────────────────────────────────────── */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /* ── 1. Skip static assets & Next.js internals ─────────────────────────── */
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/icon") ||
    pathname.startsWith("/icons/") ||
    pathname.startsWith("/screenshots/") ||
    pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|webp|woff2?|ttf|css|js|map)$/)
  ) {
    return NextResponse.next();
  }

  /* ── 2. Auth enforcement (Clerk-configured environments only) ───────────── */
  if (hasRealClerkKeys && isProtectedRoute(pathname)) {
    try {
      // Dynamically import Clerk auth — only runs when keys are present
      const { auth } = await import("@clerk/nextjs/server");
      const { userId } = await auth(); // Verify session JWT

      if (!userId) {
        // Unauthenticated — redirect to sign-in with return URL
        const signInUrl = new URL("/sign-in", request.url);
        signInUrl.searchParams.set("redirect_url", pathname); // Post-login redirect
        return NextResponse.redirect(signInUrl, { status: 302 });
      }
    } catch (err) {
      // Clerk error — fail-closed: redirect to sign-in rather than exposing the protected page
      console.error("[Middleware] Clerk auth check failed:", err);
      const signInUrl = new URL("/sign-in", request.url);
      return NextResponse.redirect(signInUrl, { status: 302 });
    }
  }

  /* ── 3. Demo mode notice for protected routes ───────────────────────────── */
  // In demo mode, allow access but set a header the layout can read to show a demo banner
  if (!hasRealClerkKeys && isProtectedRoute(pathname)) {
    const response = NextResponse.next();
    response.headers.set("X-LearnVeda-Demo", "1"); // Platform layout reads this for demo banner
    applySecurityHeaders(response);
    return response;
  }

  /* ── 4. Apply security headers to all other responses ──────────────────── */
  const response = NextResponse.next();
  applySecurityHeaders(response);
  return response;
}

/* ─── Security Headers Helper ─────────────────────────────────────────────── */
function applySecurityHeaders(response: NextResponse): void {
  // Content Security Policy — prevents XSS attacks
  response.headers.set(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      // Allow inline scripts (required for Next.js hydration) and Clerk scripts
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.clerk.accounts.dev",
      "style-src 'self' 'unsafe-inline'",
      // Allow images from self, data URIs, blob, and Clerk CDN
      "img-src 'self' data: blob: https://img.clerk.com https://*.clerk.com",
      // Allow connections to Clerk auth APIs
      "connect-src 'self' https://*.clerk.accounts.dev wss://*.clerk.accounts.dev",
      "font-src 'self' data:",
      // Allow Clerk and Google OAuth in iframes
      "frame-src 'self' https://accounts.google.com https://*.clerk.accounts.dev",
    ].join("; "),
  );

  // Force HTTPS in production only (Replit dev uses HTTP)
  if (process.env.NODE_ENV === "production") {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=63072000; includeSubDomains; preload", // 2-year HSTS preload
    );
  }

  // Prevent MIME type sniffing
  response.headers.set("X-Content-Type-Options", "nosniff");
  // Prevent clickjacking — only allow embedding from same origin
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  // Control Referer header sent with cross-origin requests
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  // Restrict browser feature access — deny camera/geolocation, allow microphone for AI voice
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(self), geolocation=(), payment=(self)",
  );
}

/* ─── Matcher Config ──────────────────────────────────────────────────────── */
export const config = {
  matcher: [
    // Run middleware on all paths EXCEPT Next.js static assets and image optimisation
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|woff2?|ttf|css|js)).*)",
  ],
};
