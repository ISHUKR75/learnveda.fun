/**
 * @file app/api/learn/[classLevel]/[subject]/[chapter]/route.ts
 * @description Single-chapter detail API — theory, formulas, key points, MCQs.
 * Route: GET /api/learn/class-9/mathematics/chapter-01
 *
 * Reads from MongoDB via `content-service`, which transparently falls back
 * to bundled static NCERT content when the database is not configured or
 * the chapter hasn't been seeded yet (demo mode).
 */

import { NextRequest, NextResponse } from "next/server";
import { getChapterDetail } from "@/lib/services/content-service";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ classLevel: string; subject: string; chapter: string }> }
) {
  const { classLevel, subject, chapter } = await params;

  try {
    const detail = await getChapterDetail(classLevel, subject, chapter);
    if (!detail) {
      return NextResponse.json(
        { error: "Chapter not found", classLevel, subject, chapter },
        { status: 404 }
      );
    }
    return NextResponse.json(detail, {
      headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" },
    });
  } catch (error) {
    console.error(`[api/learn/${classLevel}/${subject}/${chapter}] Failed to load chapter:`, error);
    return NextResponse.json(
      { error: "Failed to load chapter detail" },
      { status: 500 }
    );
  }
}
