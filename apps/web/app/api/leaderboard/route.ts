/**
 * @file app/api/leaderboard/route.ts
 * @description Leaderboard API — XP rankings, battle Elo rankings, streak rankings
 * Route: GET /api/leaderboard
 *
 * GET /api/leaderboard                  — overall XP leaderboard (top 50)
 * GET /api/leaderboard?type=battles     — battle Elo ranking
 * GET /api/leaderboard?type=streak      — streak leaderboard
 * GET /api/leaderboard?type=weekly      — this week's XP leaderboard (resets Monday)
 * GET /api/leaderboard?userId=xxx       — include user's own rank in response
 *
 * In demo mode (no MongoDB): returns realistic mock data.
 * In production: aggregates from users + battles MongoDB collections.
 */

import { NextRequest, NextResponse } from "next/server";

/* ─── Mock leaderboard data ──────────────────────────────────────────────── */
/**
 * MOCK_LEADERBOARD
 * 20 realistic Indian student profiles for demo leaderboard.
 * Covers a mix of XP levels, streaks, and subjects.
 */
const MOCK_LEADERBOARD = [
  { rank: 1,  name: "Arjun Sharma",      city: "Delhi",      xp: 84200, level: 28, streak: 112, elo: 2140, weekXp: 3420, subject: "DSA",         avatar: "🧑‍💻" },
  { rank: 2,  name: "Priya Mehta",       city: "Mumbai",     xp: 78900, level: 26, streak: 89,  elo: 2080, weekXp: 3100, subject: "Physics",      avatar: "👩‍🔬" },
  { rank: 3,  name: "Rahul Kumar",       city: "Bengaluru",  xp: 72000, level: 24, streak: 76,  elo: 1980, weekXp: 2800, subject: "Chemistry",    avatar: "🧑‍🏫" },
  { rank: 4,  name: "Sneha Patel",       city: "Ahmedabad",  xp: 68000, level: 23, streak: 65,  elo: 1920, weekXp: 2600, subject: "Maths",        avatar: "👩‍🎓" },
  { rank: 5,  name: "Karan Verma",       city: "Pune",       xp: 62000, level: 21, streak: 54,  elo: 1880, weekXp: 2400, subject: "Java",         avatar: "🧑‍💼" },
  { rank: 6,  name: "Divya Krishnan",    city: "Chennai",    xp: 58000, level: 20, streak: 48,  elo: 1820, weekXp: 2100, subject: "Biology",      avatar: "👩‍🔬" },
  { rank: 7,  name: "Vikram Singh",      city: "Jaipur",     xp: 54000, level: 19, streak: 41,  elo: 1780, weekXp: 1950, subject: "Python",       avatar: "🧑‍💻" },
  { rank: 8,  name: "Ananya Nair",       city: "Kochi",      xp: 50000, level: 18, streak: 35,  elo: 1740, weekXp: 1800, subject: "CS Theory",    avatar: "👩‍🎓" },
  { rank: 9,  name: "Rohan Joshi",       city: "Nagpur",     xp: 47000, level: 17, streak: 30,  elo: 1700, weekXp: 1620, subject: "Networks",     avatar: "🧑‍🏫" },
  { rank: 10, name: "Neha Gupta",        city: "Lucknow",    xp: 44000, level: 16, streak: 27,  elo: 1650, weekXp: 1500, subject: "DBMS",         avatar: "👩‍💼" },
  { rank: 11, name: "Aditya Reddy",      city: "Hyderabad",  xp: 41000, level: 15, streak: 24,  elo: 1620, weekXp: 1400, subject: "System Design",avatar: "🧑‍💻" },
  { rank: 12, name: "Pooja Iyer",        city: "Coimbatore", xp: 38000, level: 14, streak: 21,  elo: 1580, weekXp: 1320, subject: "Algorithm",    avatar: "👩‍🔬" },
  { rank: 13, name: "Siddharth Das",     city: "Kolkata",    xp: 35000, level: 13, streak: 19,  elo: 1540, weekXp: 1200, subject: "Maths",        avatar: "🧑‍🎓" },
  { rank: 14, name: "Meera Rao",         city: "Mysuru",     xp: 32000, level: 12, streak: 17,  elo: 1500, weekXp: 1100, subject: "Physics",      avatar: "👩‍🏫" },
  { rank: 15, name: "Amit Pandey",       city: "Varanasi",   xp: 30000, level: 11, streak: 15,  elo: 1480, weekXp: 1000, subject: "C++",          avatar: "🧑‍💼" },
  { rank: 16, name: "Shruti Saxena",     city: "Bhopal",     xp: 28000, level: 11, streak: 14,  elo: 1460, weekXp: 920,  subject: "Chemistry",    avatar: "👩‍🎓" },
  { rank: 17, name: "Nikhil Tiwari",     city: "Indore",     xp: 26000, level: 10, streak: 12,  elo: 1440, weekXp: 840,  subject: "Python",       avatar: "🧑‍🔬" },
  { rank: 18, name: "Kavya Menon",       city: "Trivandrum", xp: 24000, level: 10, streak: 11,  elo: 1420, weekXp: 780,  subject: "Biology",      avatar: "👩‍💻" },
  { rank: 19, name: "Ravi Shankar",      city: "Patna",      xp: 22000, level: 9,  streak: 10,  elo: 1400, weekXp: 720,  subject: "OS",           avatar: "🧑‍🎓" },
  { rank: 20, name: "Tanvi Bhatt",       city: "Surat",      xp: 20000, level: 9,  streak: 9,   elo: 1380, weekXp: 650,  subject: "Java",         avatar: "👩‍🏫" },
];

/* ─── GET Handler ─────────────────────────────────────────────────────────── */
/**
 * GET /api/leaderboard
 * Returns ranked leaderboard data.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const type   = searchParams.get("type") ?? "xp";       // xp | battles | streak | weekly
  const userId = searchParams.get("userId");              // Optional: include caller's rank
  const limit  = Math.min(parseInt(searchParams.get("limit") ?? "20", 10), 100);

  /* ── Try real MongoDB ─────────────────────────────────────────── */
  const MONGODB_URI = process.env.MONGODB_URI;
  if (MONGODB_URI) {
    try {
      const { connectToDatabase } = await import("@/lib/mongodb");
      const { db } = await connectToDatabase();

      const sortField = type === "battles" ? "elo" : type === "streak" ? "streak" : type === "weekly" ? "weeklyXp" : "xp";

      const users = await db
        .collection("users")
        .find({}, { projection: { email: 0, clerkId: 0 } })
        .sort({ [sortField]: -1 })
        .limit(limit)
        .toArray();

      const leaderboard = users.map((u, i) => ({ ...u, rank: i + 1 }));

      let userRank = null;
      if (userId) {
        userRank = await db.collection("users").findOne({ clerkId: userId }, { projection: { email: 0 } });
      }

      return NextResponse.json({ leaderboard, userRank, type, source: "mongodb" });
    } catch (dbErr) {
      console.error("[leaderboard] MongoDB error:", dbErr);
    }
  }

  /* ── Demo mode — sort mock data by requested type ─────────────── */
  let sorted = [...MOCK_LEADERBOARD];
  if (type === "battles")  sorted = sorted.sort((a, b) => b.elo - a.elo);
  else if (type === "streak") sorted = sorted.sort((a, b) => b.streak - a.streak);
  else if (type === "weekly") sorted = sorted.sort((a, b) => b.weekXp - a.weekXp);
  // Re-rank after sort
  sorted = sorted.slice(0, limit).map((u, i) => ({ ...u, rank: i + 1 }));

  const userRank = userId
    ? { ...MOCK_LEADERBOARD[4], rank: 4721, note: "Demo — your actual rank would appear here" }
    : null;

  return NextResponse.json({
    leaderboard: sorted,
    userRank,
    type,
    total:  50121, // Total platform users
    source: "demo",
  });
}

/* ─── POST — not allowed ─────────────────────────────────────────────────── */
export function POST() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
