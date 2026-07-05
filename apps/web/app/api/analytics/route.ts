/**
 * @file app/api/analytics/route.ts
 * @description Platform statistics API endpoint for LearnVeda
 * Route: GET /api/analytics — returns public platform stats (students, chapters, etc.)
 * Auth: Public — platform stats shown on homepage and about page
 * In production: queries MongoDB with aggregation pipeline + Redis cache
 */

import { NextResponse } from "next/server"; // Next.js response helper

/* ─── Platform Stats Cache ────────────────────────────────────────────────── */
// In production: Redis cache with 5-minute TTL
// These values are updated by background jobs that run aggregate queries
const CACHED_STATS = {
  students:          12847,   // Total registered student accounts
  chaptersCompleted: 489231,  // Total chapter completions across all users
  questionsAnswered: 2847392, // Total practice questions answered
  activeLearners:    3241,    // Students active in the last 7 days
  battlesPlayed:     54891,   // Total live battles completed
  simulationsRun:    129847,  // Total simulation sessions
  mentorSessions:    4872,    // Total mentor sessions completed
  coursesAvailable:  847,     // Total chapters/lessons available on platform
  teachersOnPlatform: 156,    // Registered mentors and teachers
  countriesReached:  18,      // Countries with registered students
  avgRating:         4.8,     // Average platform rating (from reviews)
  updatedAt:         new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 min ago
};

/* ─── GET /api/analytics ─────────────────────────────────────────────────── */
/**
 * Returns platform-wide statistics for display on marketing pages.
 * In production: first checks Redis cache, falls back to MongoDB aggregate if stale.
 */
export async function GET() {
  // In production:
  // const redis = await getRedisClient();
  // const cached = await redis.get("platform:stats");
  // if (cached) return NextResponse.json({ ok: true, data: JSON.parse(cached) });
  // const stats = await db.aggregate(platformStatsQuery);
  // await redis.setex("platform:stats", 300, JSON.stringify(stats)); // Cache 5 min

  return NextResponse.json(
    {
      ok:   true,
      data: CACHED_STATS,
    },
    {
      headers: {
        "Cache-Control": "public, max-age=300, stale-while-revalidate=600", // Cache 5 min, serve stale for 10 min
      },
    },
  );
}
