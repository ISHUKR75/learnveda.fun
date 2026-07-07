/**
 * @file app/api/gamification/user/route.ts
 * @description Gamification user data API route
 * Route: GET /api/gamification/user
 * @purpose Returns current user's XP, level, streak, active dates, and badge IDs
 * Used by useGamification() hook on dashboard, navbar, and lesson pages
 *
 * Response format:
 * {
 *   xp: 3750, level: 12, streak: 7, longestStreak: 21,
 *   completedToday: true, isAtRisk: false, tierName: "Gold",
 *   activeDates: ["2026-07-01", ...], unlockedBadges: ["first-lesson", ...]
 * }
 */

import { NextRequest, NextResponse } from "next/server";
import { auth }                      from "@clerk/nextjs/server";
import connectToDatabase             from "@/lib/database/mongodb";
import { getTier }                   from "@/features/gamification/components/XPBar";

/* ─── GET: Fetch user gamification state ─────────────────────────────────── */
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const { userId } = await auth();

    // Not authenticated → return 401 (hook will use demo state)
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Try to fetch from MongoDB
    if (process.env.MONGODB_URI) {
      const db   = await connectToDatabase();
      const user = await db.collection("users").findOne({ clerkId: userId });

      if (user) {
        // Calculate derived values
        const today         = new Date().toISOString().split("T")[0];
        const yesterday     = new Date(Date.now() - 86400000).toISOString().split("T")[0];
        const completedToday = (user.activeDates as string[] ?? []).includes(today);
        const studiedYesterday = (user.activeDates as string[] ?? []).includes(yesterday);
        const isAtRisk      = !completedToday && studiedYesterday && (user.streak ?? 0) > 0;
        const tier          = getTier(user.level ?? 1);

        return NextResponse.json({
          xp:            user.xp            ?? 0,
          level:          user.level         ?? 1,
          streak:         user.streak        ?? 0,
          longestStreak:  user.longestStreak ?? 0,
          completedToday,
          isAtRisk,
          tierName:       tier.name,
          activeDates:    (user.activeDates as string[] ?? []).slice(-30), // Last 30 days
          unlockedBadges: user.unlockedBadges ?? [],
        });
      }
    }

    // New user or no DB — return default starting state
    return NextResponse.json({
      xp: 0, level: 1, streak: 0, longestStreak: 0,
      completedToday: false, isAtRisk: false, tierName: "Bronze",
      activeDates: [], unlockedBadges: [],
    });

  } catch (error) {
    console.error("[gamification/user] Error:", error);
    return NextResponse.json({ error: "Failed to fetch gamification data" }, { status: 500 });
  }
}
