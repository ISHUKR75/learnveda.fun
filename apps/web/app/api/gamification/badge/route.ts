/**
 * @file app/api/gamification/badge/route.ts
 * @description Unlock achievement badge for authenticated user
 * Route: POST /api/gamification/badge
 * @purpose Adds badge ID to user's unlockedBadges array in MongoDB
 *
 * Body: { badgeId: string }
 * Response: { success, badgeId, alreadyUnlocked }
 */

import { NextRequest, NextResponse } from "next/server";
import { auth }                      from "@clerk/nextjs/server";
import { z }                         from "zod";
import connectToDatabase             from "@/lib/database/mongodb";

const BadgeSchema = z.object({
  badgeId: z.string().min(1).max(50),
});

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body   = await req.json().catch(() => null);
    const parsed = BadgeSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: "Invalid badgeId" }, { status: 422 });

    const { badgeId } = parsed.data;

    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ success: true, demo: true, badgeId });
    }

    const db   = await connectToDatabase();
    const user = await db.collection("users").findOne({ clerkId: userId });

    const existing = (user?.unlockedBadges as string[] ?? []);
    if (existing.includes(badgeId)) {
      return NextResponse.json({ success: true, badgeId, alreadyUnlocked: true });
    }

    await db.collection("users").updateOne(
      { clerkId: userId },
      {
        $addToSet: { unlockedBadges: badgeId },
        $set:      { updatedAt: new Date() },
      },
      { upsert: true },
    );

    return NextResponse.json({ success: true, badgeId, alreadyUnlocked: false });

  } catch (error) {
    console.error("[badge] Error:", error);
    return NextResponse.json({ error: "Failed to unlock badge" }, { status: 500 });
  }
}
