/**
 * @file app/api/auth/route.ts
 * @description Auth utility API for LearnVeda
 * Route: GET /api/auth — returns the currently authenticated user's profile
 *
 * This is a thin wrapper around Clerk's server-side auth.
 * It syncs the Clerk user to MongoDB on first call (JIT provisioning).
 *
 * Returns:
 *  { ok: true,  data: { userId, name, email, role, plan, xp, level, streak } }
 *  { ok: false, error: "Unauthorized" } — when not authenticated
 */

import { NextResponse } from "next/server"; // Next.js response helper

/* ─── Check Clerk configuration ──────────────────────────────────────────── */
const hasClerk =
  !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes("placeholder") &&
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.startsWith("pk_");

/* ─── GET /api/auth ──────────────────────────────────────────────────────── */
export async function GET() {
  // ── Demo mode — Clerk not configured ────────────────────────────────────
  if (!hasClerk) {
    return NextResponse.json({
      ok:   true,
      data: {
        userId:  "demo-user",
        name:    "Demo Student",
        email:   "demo@learnveda.in",
        avatar:  "",
        role:    "student",
        plan:    "free",
        xp:      1250,
        level:   5,
        streak:  7,
        isDemo:  true,        // Flag so UI can show demo mode badge
      },
    });
  }

  // ── Production — verify Clerk auth ────────────────────────────────────────
  try {
    const { auth, currentUser } = await import("@clerk/nextjs/server");
    const { userId } = await auth(); // Get current Clerk session

    if (!userId) {
      // Not authenticated — return 401
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const clerkUser = await currentUser(); // Fetch full Clerk user profile

    // ── JIT MongoDB sync ──────────────────────────────────────────────────
    // On first API call after login, create/update the MongoDB user record
    let mongoUser = null;
    if (process.env.MONGODB_URI) {
      try {
        const { connectDB }  = await import("@/lib/mongodb");
        const { User }       = await import("@/lib/mongodb/models");
        await connectDB();   // Ensure connection

        mongoUser = await User.findOneAndUpdate(
          { clerkId: userId },           // Find by Clerk ID
          {
            $setOnInsert: {              // Only set these fields on document creation
              clerkId:  userId,
              email:    clerkUser?.emailAddresses[0]?.emailAddress ?? "",
              name:     `${clerkUser?.firstName ?? ""} ${clerkUser?.lastName ?? ""}`.trim() || "Student",
              avatar:   clerkUser?.imageUrl ?? "",
              role:     "student",
              plan:     "free",
              xp:       0,
              level:    1,
              streak:   0,
              longestStreak: 0,
            },
          },
          { upsert: true, new: true }   // Insert if not exists, return updated doc
        );
      } catch (dbErr) {
        console.warn("[Auth API] MongoDB sync failed — returning Clerk data only:", dbErr);
      }
    }

    return NextResponse.json({
      ok:   true,
      data: {
        userId:  userId,                                                   // Clerk user ID
        name:    mongoUser?.name ?? clerkUser?.firstName ?? "Student",    // Display name
        email:   mongoUser?.email ?? clerkUser?.emailAddresses[0]?.emailAddress ?? "",
        avatar:  mongoUser?.avatar ?? clerkUser?.imageUrl ?? "",
        role:    mongoUser?.role ?? "student",
        plan:    mongoUser?.plan ?? "free",
        xp:      mongoUser?.xp ?? 0,
        level:   mongoUser?.level ?? 1,
        streak:  mongoUser?.streak ?? 0,
        isDemo:  false,
      },
    });

  } catch (err) {
    console.error("[Auth API] Error:", err);
    return NextResponse.json({ ok: false, error: "Auth service unavailable" }, { status: 500 });
  }
}
