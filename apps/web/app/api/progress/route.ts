/**
 * @file app/api/progress/route.ts
 * @description Student progress tracking API — records chapter start/completion
 * and returns a user's progress history.
 *
 * Routes:
 *   GET  /api/progress?userId=...&subject=...   → list progress records
 *   POST /api/progress                          → record a start/completion event
 *
 * Auth: expects Clerk to have already resolved the user upstream. In demo
 * mode (no MongoDB configured) this API returns an empty/no-op response
 * instead of throwing, so the UI keeps working without persistence.
 */

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/mongodb";
import { Progress } from "@/lib/mongodb/models";

/** Returns true only when MongoDB is configured AND reachable. */
async function isDbAvailable(): Promise<boolean> {
  if (!process.env.MONGODB_URI) return false;
  try {
    await connectDB();
    return true;
  } catch {
    return false;
  }
}

/* ─── GET /api/progress ──────────────────────────────────────────────────── */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId  = searchParams.get("userId");
  const subject = searchParams.get("subject") ?? undefined;

  if (!userId) {
    return NextResponse.json({ error: "userId query param is required" }, { status: 400 });
  }

  if (!(await isDbAvailable())) {
    // Demo mode — no persistence backend, return empty history gracefully
    return NextResponse.json({ demoMode: true, records: [] });
  }

  const query: Record<string, string> = { userId };
  if (subject) query.subject = subject;

  const records = await Progress.find(query).sort({ completedAt: -1 }).limit(200).lean();
  return NextResponse.json({ demoMode: false, records });
}

/* ─── POST /api/progress ─────────────────────────────────────────────────── */
export async function POST(request: NextRequest) {
  const { userId: clerkUserId } = await auth();

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { courseType, subject, chapter, topicSlug, status, xpEarned, score, timeSpentMs } = body as {
    courseType?: string; subject?: string; chapter?: string; topicSlug?: string;
    status?: string; xpEarned?: number; score?: number; timeSpentMs?: number;
  };

  // Fall back to an explicit userId in the body for non-Clerk / demo callers
  const userId = clerkUserId ?? body.userId;

  if (!userId || !courseType || !subject || !chapter) {
    return NextResponse.json(
      { error: "userId, courseType, subject, and chapter are required" },
      { status: 400 }
    );
  }

  if (!(await isDbAvailable())) {
    // Demo mode — acknowledge the request without persisting anything
    return NextResponse.json({ demoMode: true, saved: false });
  }

  const record = await Progress.create({
    userId,
    courseType,
    subject,
    chapter,
    topicSlug: topicSlug ?? null,
    status: status === "completed" ? "completed" : "started",
    xpEarned: xpEarned ?? 0,
    score: score ?? null,
    timeSpentMs: timeSpentMs ?? 0,
    completedAt: new Date(),
  });

  return NextResponse.json({ demoMode: false, saved: true, record }, { status: 201 });
}
