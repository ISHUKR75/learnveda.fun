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

/* ─── Server Start Time ──────────────────────────────────────────────────── */
// Captured at module load — used to calculate uptime in seconds
const SERVER_START = Date.now();

/* ─── GET /api/health ────────────────────────────────────────────────────── */
export async function GET() {
  const uptimeSeconds = Math.floor((Date.now() - SERVER_START) / 1000); // Seconds since start

  const payload = {
    status:      "ok",                                        // Overall health status
    version:     process.env.npm_package_version ?? "0.1.0", // App version
    environment: process.env.NODE_ENV ?? "development",       // Runtime environment
    uptime:      uptimeSeconds,                               // Seconds since server started
    timestamp:   new Date().toISOString(),                    // ISO 8601 timestamp
    services: {
      mongodb: !!process.env.MONGODB_URI   ? "configured" : "not_configured", // DB config status
      redis:   !!process.env.REDIS_URL     ? "configured" : "not_configured", // Cache config
      clerk:   !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
               && !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes("placeholder")
               ? "configured" : "not_configured",                              // Auth config
    },
  };

  return NextResponse.json(payload, {
    status:  200,
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate", // Never cache health checks
      "X-Health-Check": "learnveda",                           // Custom identifier header
    },
  });
}
