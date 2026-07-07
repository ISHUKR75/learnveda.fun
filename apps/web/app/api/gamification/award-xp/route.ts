/**
 * @file app/api/gamification/award-xp/route.ts
 * @description Award XP to authenticated user
 * Route: POST /api/gamification/award-xp
 * @purpose Increments user XP in MongoDB and checks for level-up
 *
 * Body: { amount: number, reason: string }
 * Response: { newXP, newLevel, leveledUp, xpGained }
 */

import { NextRequest, NextResponse } from "next/server";
import { auth }                      from "@clerk/nextjs/server";
import { z }                         from "zod";
import connectToDatabase             from "@/lib/database/mongodb";
import { xpForLevel }                from "@/features/gamification/components/XPBar";

const AwardXPSchema = z.object({
  amount: z.number().int().min(1).max(10000),  // Max 10k XP per action
  reason: z.string().min(1).max(100),
});

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body   = await req.json().catch(() => null);
    const parsed = AwardXPSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid data" }, { status: 422 });
    }

    const { amount, reason } = parsed.data;

    // Demo mode: skip DB
    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ success: true, demo: true });
    }

    const db   = await connectToDatabase();
    const user = await db.collection("users").findOne({ clerkId: userId });

    const currentXP = (user?.xp as number ?? 0) + amount;
    let   level     = user?.level as number ?? 1;

    // Recalculate level from new XP
    while (level < 100 && xpForLevel(level + 1) <= currentXP) level++;

    const leveledUp = level > (user?.level as number ?? 1);

    await db.collection("users").updateOne(
      { clerkId: userId },
      {
        $inc: { xp: amount },
        $set: { level, updatedAt: new Date() },
        $push: { xpHistory: { amount, reason, earnedAt: new Date() } as never },
      },
      { upsert: true },
    );

    return NextResponse.json({ newXP: currentXP, newLevel: level, leveledUp, xpGained: amount });

  } catch (error) {
    console.error("[award-xp] Error:", error);
    return NextResponse.json({ error: "Failed to award XP" }, { status: 500 });
  }
}
