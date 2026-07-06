/**
 * @file app/api/battles/route.ts
 * @description Live Battles API — matchmaking, battle creation, result tracking
 * Route: GET /api/battles, POST /api/battles
 *
 * GET  /api/battles              — fetch active battles + recent results
 * GET  /api/battles?userId=xxx   — fetch battles for a specific user
 * POST /api/battles              — create a new battle challenge
 *
 * In demo mode (no MongoDB): returns realistic mock data.
 * In production: persists to MongoDB + triggers Socket.IO events.
 *
 * Socket.IO live events are handled in the Socket.IO server file,
 * NOT in this HTTP route. This route handles REST operations only.
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

/* ─── Validation schema ───────────────────────────────────────────────────── */
/** Schema for creating a new battle challenge */
const CreateBattleSchema = z.object({
  challengerId: z.string().min(1),           // Clerk user ID of challenger
  subject:      z.string().min(2).max(50),   // Subject: "DSA", "Physics", etc.
  difficulty:   z.enum(["easy", "medium", "hard"]).default("medium"),
  questionCount: z.number().int().min(5).max(20).default(10),
});

/* ─── Mock data ───────────────────────────────────────────────────────────── */
/** Mock active battles (shown when MongoDB is not configured) */
const MOCK_ACTIVE_BATTLES = [
  {
    id:          "battle-001",
    subject:     "DSA — Binary Trees",
    difficulty:  "medium",
    players:     [{ name: "Arjun S.", avatar: "🧑‍💻", elo: 1480 }],
    maxPlayers:  2,
    status:      "waiting",
    startIn:     15, // seconds
    questions:   10,
    prize:       "+50 XP",
    createdAt:   new Date(Date.now() - 60000).toISOString(),
  },
  {
    id:          "battle-002",
    subject:     "Chemistry — Organic",
    difficulty:  "hard",
    players:     [{ name: "Priya M.", avatar: "👩‍🔬", elo: 1620 }],
    maxPlayers:  2,
    status:      "waiting",
    startIn:     30,
    questions:   10,
    prize:       "+80 XP",
    createdAt:   new Date(Date.now() - 120000).toISOString(),
  },
  {
    id:          "battle-003",
    subject:     "Physics — Mechanics",
    difficulty:  "easy",
    players:     [{ name: "Rahul K.", avatar: "🧑‍🏫", elo: 1200 }],
    maxPlayers:  2,
    status:      "waiting",
    startIn:     45,
    questions:   5,
    prize:       "+25 XP",
    createdAt:   new Date(Date.now() - 180000).toISOString(),
  },
];

/** Mock recent completed battles */
const MOCK_RECENT_BATTLES = [
  { id: "r-001", subject: "Mathematics", winner: "Sneha P.", loser: "Amit R.", duration: "4m 32s", xpGained: 50, endedAt: new Date(Date.now() - 300000).toISOString() },
  { id: "r-002", subject: "DSA — Graphs", winner: "Karan V.", loser: "Neha S.", duration: "6m 18s", xpGained: 80, endedAt: new Date(Date.now() - 600000).toISOString() },
  { id: "r-003", subject: "Biology",     winner: "Divya M.", loser: "Rohan K.", duration: "3m 55s", xpGained: 45, endedAt: new Date(Date.now() - 900000).toISOString() },
];

/* ─── GET Handler ─────────────────────────────────────────────────────────── */
/**
 * GET /api/battles
 * Returns active battles and recent results.
 * Supports ?userId=xxx to filter by user.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const userId = searchParams.get("userId");

  /* ── Try real MongoDB ─────────────────────────────────────────── */
  const MONGODB_URI = process.env.MONGODB_URI;
  if (MONGODB_URI) {
    try {
      const { connectToDatabase } = await import("@/lib/mongodb");
      const { db } = await connectToDatabase();

      const query = userId
        ? { $or: [{ challengerId: userId }, { challengeeId: userId }] }
        : { status: "waiting" };

      const battles = await db
        .collection("battles")
        .find(query)
        .sort({ createdAt: -1 })
        .limit(20)
        .toArray();

      return NextResponse.json({ battles, source: "mongodb" });
    } catch (dbErr) {
      console.error("[battles] MongoDB error:", dbErr);
    }
  }

  /* ── Demo mode ────────────────────────────────────────────────── */
  return NextResponse.json({
    active:  MOCK_ACTIVE_BATTLES,
    recent:  MOCK_RECENT_BATTLES,
    total:   142, // Demo: total battles played today
    online:  87,  // Demo: players currently online
    source:  "demo",
  });
}

/* ─── POST Handler ────────────────────────────────────────────────────────── */
/**
 * POST /api/battles
 * Creates a new battle challenge.
 * Returns battle ID and join URL.
 */
export async function POST(req: NextRequest) {
  try {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
    }

    const parsed = CreateBattleSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message ?? "Validation failed." },
        { status: 400 }
      );
    }

    const { challengerId, subject, difficulty, questionCount } = parsed.data;

    /* ── Persist to MongoDB if available ─────────────────────────── */
    const MONGODB_URI = process.env.MONGODB_URI;
    let battleId = `demo-${Date.now()}`;

    if (MONGODB_URI) {
      try {
        const { connectToDatabase } = await import("@/lib/mongodb");
        const { db } = await connectToDatabase();

        const result = await db.collection("battles").insertOne({
          challengerId,
          subject,
          difficulty,
          questionCount,
          status:    "waiting",
          createdAt: new Date(),
          expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5-min expiry
        });

        battleId = result.insertedId.toString();
      } catch (dbErr) {
        console.error("[battles] MongoDB insert error:", dbErr);
        // Continue in demo mode
      }
    }

    return NextResponse.json(
      {
        success:  true,
        battleId,
        joinUrl:  `/live-battles?battle=${battleId}`,
        subject,
        difficulty,
        questionCount,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("[battles] Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
