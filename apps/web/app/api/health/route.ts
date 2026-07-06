/**
 * @file app/api/health/route.ts
 * @description Health-check endpoint for LearnVeda
 * Route: GET /api/health
 *
 * Used by:
 *  - Docker/Kubernetes liveness probes
 *  - Uptime monitoring (UptimeRobot, Grafana)
 *  - CI/CD smoke tests
 *
 * Returns: { status, version, uptime, timestamp, environment }
 */

import { NextResponse } from "next/server"; // Next.js response helper
import { connectDB } from "@/lib/mongodb";   // Real DB connection singleton

/* ─── Server Start Time ──────────────────────────────────────────────────── */
// Captured at module load — used to calculate uptime in seconds
const SERVER_START = Date.now();

/**
 * Actively pings MongoDB rather than just checking whether the env var is
 * set. Returns one of: "connected" | "not_configured" | "unreachable".
 * "unreachable" means a URI is present but the connection/ping failed —
 * this is the case that matters most for real production alerting.
 */
async function getMongoStatus(): Promise<"connected" | "not_configured" | "unreachable"> {
  if (!process.env.MONGODB_URI) return "not_configured";
  try {
    const conn = await connectDB();
    // readyState 1 === connected (see mongoose.ConnectionStates)
    if (conn.connection.readyState === 1) return "connected";
    return "unreachable";
  } catch {
    return "unreachable";
  }
}

/* ─── GET /api/health ────────────────────────────────────────────────────── */
export async function GET() {
  const uptimeSeconds = Math.floor((Date.now() - SERVER_START) / 1000); // Seconds since start
  const mongoStatus = await getMongoStatus(); // Real DB ping, not just env-var presence

  const payload = {
    status:      mongoStatus === "unreachable" ? "degraded" : "ok", // Overall health status
    version:     process.env.npm_package_version ?? "0.1.0", // App version
    environment: process.env.NODE_ENV ?? "development",       // Runtime environment
    uptime:      uptimeSeconds,                               // Seconds since server started
    timestamp:   new Date().toISOString(),                    // ISO 8601 timestamp
    services: {
      mongodb: mongoStatus,                                                    // Real DB ping result
      redis:   !!process.env.REDIS_URL     ? "configured" : "not_configured", // Cache config
      clerk:   !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
               && !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes("placeholder")
               ? "configured" : "not_configured",                              // Auth config
    },
  };

  return NextResponse.json(payload, {
    status:  mongoStatus === "unreachable" ? 503 : 200, // Unhealthy DB → 503 for uptime monitors
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate", // Never cache health checks
      "X-Health-Check": "learnveda",                           // Custom identifier header
    },
  });
}
