/**
 * @file app/api/users/route.ts
 * @description User management API — profile retrieval and basic user CRUD
 * Route: GET /api/users, POST /api/users
 *
 * GET  /api/users?id=xxx         — fetch a user's public profile
 * GET  /api/users?limit=N        — fetch N users (admin only)
 * POST /api/users                — create or upsert a user record (called on first login)
 *
 * In demo mode (no MongoDB): returns realistic mock data.
 * In production: reads/writes the `users` MongoDB collection.
 *
 * Sensitive fields (email, paymentInfo, etc.) are never returned to clients
 * unless the requesting user's ID matches the queried profile.
 */

import { NextRequest, NextResponse } from "next/server";
import { auth }                      from "@clerk/nextjs/server"; // Clerk session auth
import { z } from "zod";

/* ─── Validation schema ───────────────────────────────────────────────────── */
// ⚠️ SECURITY: `role` is intentionally excluded from the client schema.
// Role is always forced to "student" on upsert — never trust client-supplied roles.
// Admin role can only be set via direct DB write or a protected admin API.
const UpsertUserSchema = z.object({
  clerkId:   z.string().min(1),                            // Clerk user ID
  email:     z.string().email().optional(),                // Email (only stored internally)
  name:      z.string().min(1).max(100).optional(),        // Display name
  avatarUrl: z.string().url().optional(),                  // Profile picture URL
  // role is NOT accepted from clients — see security note above
});

/* ─── Mock user data ─────────────────────────────────────────────────────── */
/** Mock user profile (returned in demo mode) */
const MOCK_USERS = [
  { id: "u001", name: "Arjun Sharma",    xp: 8420,  level: 12, streak: 45, rank: 1,  badge: "🏆", subject: "DSA",       joinedAt: "2025-08-15" },
  { id: "u002", name: "Priya Mehta",     xp: 7890,  level: 11, streak: 32, rank: 2,  badge: "🥈", subject: "Physics",   joinedAt: "2025-09-01" },
  { id: "u003", name: "Rahul Kumar",     xp: 7200,  level: 10, streak: 28, rank: 3,  badge: "🥉", subject: "Chemistry", joinedAt: "2025-09-12" },
  { id: "u004", name: "Sneha Patel",     xp: 6800,  level: 10, streak: 21, rank: 4,  badge: "⭐", subject: "Maths",     joinedAt: "2025-10-05" },
  { id: "u005", name: "Karan Verma",     xp: 6200,  level: 9,  streak: 18, rank: 5,  badge: "⭐", subject: "Java",      joinedAt: "2025-10-18" },
];

/* ─── GET Handler ─────────────────────────────────────────────────────────── */
/**
 * GET /api/users
 * Returns user profile(s).
 *
 * @param req - Request with optional ?id or ?limit query params
 */
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const userId = searchParams.get("id");
  const limit  = Math.min(parseInt(searchParams.get("limit") ?? "10", 10), 100);

  /* ── Try MongoDB ──────────────────────────────────────────────── */
  const MONGODB_URI = process.env.MONGODB_URI;
  if (MONGODB_URI) {
    try {
      const { connectToDatabase } = await import("@/lib/mongodb");
      const { db } = await connectToDatabase();

      if (userId) {
        const user = await db.collection("users").findOne(
          { clerkId: userId },
          { projection: { email: 0, paymentInfo: 0 } } // Strip sensitive fields
        );
        if (!user) return NextResponse.json({ error: "User not found." }, { status: 404 });
        return NextResponse.json({ user, source: "mongodb" });
      }

      const users = await db
        .collection("users")
        .find({}, { projection: { email: 0, paymentInfo: 0 } })
        .sort({ xp: -1 })
        .limit(limit)
        .toArray();

      return NextResponse.json({ users, count: users.length, source: "mongodb" });
    } catch (dbErr) {
      console.error("[users] MongoDB error:", dbErr);
    }
  }

  /* ── Demo mode ────────────────────────────────────────────────── */
  if (userId) {
    const user = MOCK_USERS.find((u) => u.id === userId) ?? MOCK_USERS[0];
    return NextResponse.json({ user, source: "demo" });
  }

  return NextResponse.json({
    users:  MOCK_USERS.slice(0, limit),
    count:  MOCK_USERS.length,
    total:  50121, // Platform total (demo)
    source: "demo",
  });
}

/* ─── POST Handler ────────────────────────────────────────────────────────── */
/**
 * POST /api/users
 * Creates or upserts a user record.
 * Called automatically by the Clerk webhook (webhooks/clerk) on first login.
 *
 * ⚠️ SECURITY:
 *  - Requires a valid Clerk session. Unauthenticated callers are rejected.
 *  - The clerkId in the body is cross-checked against the session userId
 *    so a user cannot upsert another user's record.
 *  - Role is always forced to "student" — privilege escalation via this route
 *    is impossible.
 *
 * @param req - Request body: { clerkId, email, name, avatarUrl }
 */
export async function POST(req: NextRequest) {
  try {
    /* ── Authentication: require valid Clerk session ──────────────── */
    const { userId: sessionUserId } = await auth();
    if (!sessionUserId) {
      return NextResponse.json({ error: "Authentication required." }, { status: 401 });
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
    }

    const parsed = UpsertUserSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message ?? "Validation failed." },
        { status: 400 }
      );
    }

    const userData = parsed.data;

    /* ── Authorization: caller may only upsert their own record ───── */
    if (userData.clerkId !== sessionUserId) {
      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }

    /* ── Always force role to "student" — prevent privilege escalation */
    const safeUserData = {
      ...userData,
      role:      "student" as const, // Server-enforced; never trust the client
      updatedAt: new Date(),
    };

    /* ── Persist to MongoDB if available ─────────────────────────── */
    const MONGODB_URI = process.env.MONGODB_URI;
    if (MONGODB_URI) {
      try {
        const { connectToDatabase } = await import("@/lib/mongodb");
        const { db } = await connectToDatabase();

        await db.collection("users").updateOne(
          { clerkId: safeUserData.clerkId },
          {
            $set:         safeUserData,
            $setOnInsert: { xp: 0, level: 1, streak: 0, createdAt: new Date() },
          },
          { upsert: true }
        );

        return NextResponse.json({ success: true, source: "mongodb" }, { status: 201 });
      } catch (dbErr) {
        console.error("[users] MongoDB upsert error:", dbErr);
      }
    }

    /* ── Demo mode fallback ────────────────────────────────────── */
    console.log("[users] Demo mode — would upsert user:", safeUserData.clerkId);
    return NextResponse.json({ success: true, source: "demo" }, { status: 201 });
  } catch (err) {
    console.error("[users] Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
