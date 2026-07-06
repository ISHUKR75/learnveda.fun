/**
 * @file app/api/learn/[classLevel]/[subject]/route.ts
 * @description Chapter-list API for a given class + subject.
 * Route: GET /api/learn/class-9/mathematics
 *
 * Reads from MongoDB via `content-service`, which transparently falls back
 * to bundled static NCERT content when the database is not configured or
 * the subject hasn't been seeded yet (demo mode).
 */

import { NextRequest, NextResponse } from "next/server";
import { getChapterList } from "@/lib/services/content-service";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ classLevel: string; subject: string }> }
) {
  const { classLevel, subject } = await params;

  try {
    const chapters = await getChapterList(classLevel, subject);
    return NextResponse.json(
      { classLevel, subject, chapterCount: chapters.length, chapters },
      { headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" } }
    );
  } catch (error) {
    console.error(`[api/learn/${classLevel}/${subject}] Failed to load chapters:`, error);
    return NextResponse.json(
      { error: "Failed to load chapter list", classLevel, subject, chapters: [] },
      { status: 500 }
    );
  }
}
