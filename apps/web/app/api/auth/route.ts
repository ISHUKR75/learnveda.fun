/**
 * @file app/api/auth/route.ts
 * @description Authentication status check endpoint for LearnVeda
 * Route: GET /api/auth — returns current user session status
 * Auth: Varies — returns different data for authenticated vs unauthenticated users
 * In production: verifies Clerk session and fetches user from MongoDB
 */

import { NextResponse } from "next/server"; // Next.js response helper

/* ─── Auth Status Constants ───────────────────────────────────────────────── */
// Check if real Clerk keys are configured
const hasRealClerkKeys =
  !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes("placeholder") &&
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.startsWith("pk_");

/* ─── GET /api/auth ───────────────────────────────────────────────────────── */
/**
 * Returns the current authentication status and user session data.
 * In Clerk-configured mode: validates the session JWT and returns user data.
 * In demo mode: returns unauthenticated status.
 */
export async function GET() {
  /* ── Demo / No Clerk Mode ─────────────────────────────────────────────── */
  if (!hasRealClerkKeys) {
    return NextResponse.json({
      ok:   true,
      data: {
        authenticated: false,                   // Not authenticated in demo mode
        mode:          "demo",                  // Indicate demo mode to frontend
        user:          null,                    // No user data
        message:       "Running in demo mode — configure Clerk to enable authentication",
      },
    });
  }

  /* ── Clerk Auth Mode ──────────────────────────────────────────────────── */
  try {
    // Dynamic import — only load Clerk when keys are configured
    const { auth, currentUser } = await import("@clerk/nextjs/server");
    const { userId } = await auth(); // Get Clerk user ID from session

    if (!userId) {
      // Valid request but user is not signed in
      return NextResponse.json({
        ok:   true,
        data: { authenticated: false, user: null, mode: "clerk" },
      });
    }

    // Fetch full user object from Clerk
    const user = await currentUser();

    return NextResponse.json({
      ok:   true,
      data: {
        authenticated: true,       // User is logged in
        mode:          "clerk",
        user: {
          id:          user?.id,
          email:       user?.emailAddresses[0]?.emailAddress,
          firstName:   user?.firstName,
          lastName:    user?.lastName,
          displayName: `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "Student",
          avatar:      user?.imageUrl,
          createdAt:   user?.createdAt,
        },
      },
    });
  } catch (err) {
    // Clerk error — return safe error response (don't expose error details)
    console.error("[GET /api/auth] Clerk auth error:", err);
    return NextResponse.json(
      {
        ok:    false,
        error: { code: "AUTH_ERROR", message: "Authentication service unavailable" },
      },
      { status: 503 },
    );
  }
}
