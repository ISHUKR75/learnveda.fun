/**
 * @file app/api/gamification/streak/route.ts
 * @description Mark today as studied (update streak)
 * Route: POST /api/gamification/streak
 * @purpose Updates activeDates array, recalculates streak, longestStreak
 *
 * Response: { streak, longestStreak, completedToday }
 */

import { NextRequest, NextResponse } from "next/server";
import { auth }                      from "@clerk/nextjs/server";
import connectToDatabase             from "@/lib/database/mongodb";

export async function POST(_req: NextRequest): Promise<NextResponse> {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ success: true, demo: true, streak: 7 });
    }

    const db     = await connectToDatabase();
    const user   = await db.collection("users").findOne({ clerkId: userId });
    const today  = new Date().toISOString().split("T")[0];
    const dates  = (user?.activeDates as string[] ?? []);

    // Already marked today
    if (dates.includes(today)) {
      return NextResponse.json({
        streak:         user?.streak        ?? 1,
        longestStreak:  user?.longestStreak ?? 1,
        completedToday: true,
        alreadyDone:    true,
      });
    }

    // Recalculate streak
    const newDates = [...dates, today].sort();
    let streak = 1;
    // Walk backwards from today counting consecutive days
    for (let i = newDates.length - 1; i > 0; i--) {
      const d1 = new Date(newDates[i]);
      const d2 = new Date(newDates[i - 1]);
      if ((d1.getTime() - d2.getTime()) === 86400000) streak++;
      else break;
    }

    const longestStreak = Math.max(streak, user?.longestStreak as number ?? 0);

    await db.collection("users").updateOne(
      { clerkId: userId },
      {
        $addToSet: { activeDates: today },
        $set:      { streak, longestStreak, updatedAt: new Date() },
      },
      { upsert: true },
    );

    return NextResponse.json({ streak, longestStreak, completedToday: true });

  } catch (error) {
    console.error("[streak] Error:", error);
    return NextResponse.json({ error: "Failed to update streak" }, { status: 500 });
  }
}
