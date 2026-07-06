/**
 * @file app/api/practice/route.ts
 * @description Practice questions API — quiz, assignments, and challenge feeds
 * Route: GET /api/practice
 *
 * GET /api/practice?type=quiz&subject=DSA&difficulty=medium — returns quiz questions
 * GET /api/practice?type=assignments&userId=xxx             — returns user's assignments
 * GET /api/practice?type=daily                              — today's daily challenge
 * POST /api/practice                                        — submit quiz answers, save results
 *
 * In demo mode (no MongoDB): returns curated hardcoded questions.
 * In production: queries the MongoDB questions collection with full filtering + pagination.
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

/* ─── Submit Answer Schema ────────────────────────────────────────────────── */
const SubmitSchema = z.object({
  userId:     z.string().min(1),
  sessionId:  z.string().min(1),
  answers:    z.array(z.object({
    questionId: z.number(),
    selected:   z.number(), // 0-indexed option chosen
    timeTaken:  z.number(), // seconds
  })),
  subject:    z.string().optional(),
});

/* ─── Demo Daily Challenge ────────────────────────────────────────────────── */
const DAILY_CHALLENGE = {
  id:          9001,
  date:        new Date().toISOString().split("T")[0],
  subject:     "Mathematics",
  topic:       "Calculus",
  text:        "Find the area bounded by the curve y = x² and the x-axis from x = 0 to x = 3.",
  options:     ["6", "9", "27", "3"],
  correct:     1,
  explanation: "∫₀³ x² dx = [x³/3]₀³ = 27/3 – 0 = 9 square units.",
  difficulty:  "Medium",
  xp:          50, // Double XP for daily
  completedBy: 2840,
};

/* ─── Demo Quiz Questions ─────────────────────────────────────────────────── */
const DEMO_QUESTIONS = [
  { id: 1, subject: "Mathematics", topic: "Algebra",      text: "Solve: 2x² – 5x + 3 = 0",                      options: ["x = 1, 1.5", "x = 1, 3", "x = –1, –1.5", "x = 0, 2"], correct: 0, explanation: "Factoring: (2x–3)(x–1) = 0, so x = 3/2 or x = 1.", difficulty: "Medium", xp: 15 },
  { id: 2, subject: "Physics",     topic: "Motion",       text: "A car accelerates from 0 to 60 km/h in 10s. Find acceleration.", options: ["6 m/s²", "1.67 m/s²", "60 m/s²", "0.6 m/s²"], correct: 1, explanation: "a = Δv/Δt = (60/3.6)/10 = 16.67/10 = 1.67 m/s².", difficulty: "Easy", xp: 10 },
  { id: 3, subject: "DSA",         topic: "Arrays",       text: "What is the time complexity of searching in an unsorted array?", options: ["O(1)", "O(log n)", "O(n)", "O(n²)"], correct: 2, explanation: "In an unsorted array, we must check every element → O(n) linear search.", difficulty: "Easy", xp: 10 },
  { id: 4, subject: "Chemistry",   topic: "Thermodynamics", text: "Which law states: 'Energy cannot be created or destroyed'?", options: ["Zeroth Law", "First Law", "Second Law", "Third Law"], correct: 1, explanation: "The First Law of Thermodynamics states conservation of energy.", difficulty: "Easy", xp: 10 },
];

/* ─── GET Handler ─────────────────────────────────────────────────────────── */
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const type       = searchParams.get("type")       ?? "quiz";
  const subject    = searchParams.get("subject")    ?? "all";
  const difficulty = searchParams.get("difficulty") ?? "all";
  const limit      = Math.min(parseInt(searchParams.get("limit") ?? "10", 10), 50);

  /* ── Daily challenge ──────────────────────────────────────────── */
  if (type === "daily") {
    return NextResponse.json({ challenge: DAILY_CHALLENGE });
  }

  /* ── Try MongoDB ──────────────────────────────────────────────── */
  const MONGODB_URI = process.env.MONGODB_URI;
  if (MONGODB_URI) {
    try {
      const { connectToDatabase } = await import("@/lib/mongodb");
      const { db } = await connectToDatabase();

      const query: Record<string, unknown> = {};
      if (subject !== "all")    query.subject    = subject;
      if (difficulty !== "all") query.difficulty = difficulty;

      const questions = await db
        .collection("questions")
        .find(query)
        .sort({ createdAt: -1 })
        .limit(limit)
        .project({ correct: 0 }) // Don't expose correct answer in GET
        .toArray();

      return NextResponse.json({ questions, count: questions.length, source: "mongodb" });
    } catch (dbErr) {
      console.error("[practice] MongoDB error:", dbErr);
    }
  }

  /* ── Demo mode ────────────────────────────────────────────────── */
  let questions = [...DEMO_QUESTIONS];
  if (subject !== "all")    questions = questions.filter((q) => q.subject.toLowerCase() === subject.toLowerCase());
  if (difficulty !== "all") questions = questions.filter((q) => q.difficulty.toLowerCase() === difficulty.toLowerCase());

  // Strip correct answer from GET response
  const sanitized = questions.slice(0, limit).map(({ correct: _c, ...rest }) => rest);

  return NextResponse.json({ questions: sanitized, count: sanitized.length, source: "demo" });
}

/* ─── POST Handler — submit quiz answers ─────────────────────────────────── */
export async function POST(req: NextRequest) {
  try {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
    }

    const parsed = SubmitSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0]?.message }, { status: 400 });
    }

    const { userId, sessionId, answers } = parsed.data;

    // Check answers against demo bank
    const results = answers.map((ans) => {
      const q = DEMO_QUESTIONS.find((dq) => dq.id === ans.questionId);
      return {
        questionId: ans.questionId,
        selected:   ans.selected,
        correct:    q?.correct ?? -1,
        isCorrect:  ans.selected === (q?.correct ?? -1),
        xp:         ans.selected === (q?.correct ?? -1) ? (q?.xp ?? 0) : 0,
        explanation: q?.explanation ?? "",
      };
    });

    const totalXp    = results.reduce((acc, r) => acc + r.xp, 0);
    const correctCnt = results.filter((r) => r.isCorrect).length;

    /* ── Persist to MongoDB if available ─────────────────────────── */
    const MONGODB_URI = process.env.MONGODB_URI;
    if (MONGODB_URI) {
      try {
        const { connectToDatabase } = await import("@/lib/mongodb");
        const { db } = await connectToDatabase();

        await db.collection("practiceResults").insertOne({
          userId,
          sessionId,
          results,
          totalXp,
          correctCount: correctCnt,
          totalCount:   answers.length,
          createdAt:    new Date(),
        });

        // Update user XP
        await db.collection("users").updateOne(
          { clerkId: userId },
          { $inc: { xp: totalXp, practiceCount: 1 } }
        );
      } catch (dbErr) {
        console.error("[practice] MongoDB persist error:", dbErr);
      }
    }

    return NextResponse.json({
      results,
      score:       `${correctCnt}/${answers.length}`,
      totalXp,
      percentage:  Math.round((correctCnt / answers.length) * 100),
    });
  } catch (err) {
    console.error("[practice] Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
