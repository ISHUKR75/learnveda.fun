/**
 * @file app/api/health/route.ts
 * @description Health check API endpoint for LearnVeda
 * Used by: monitoring systems, CI/CD, Kubernetes liveness probes, uptime bots
 * Route: GET /api/health
 * Returns: Service status, version, uptime, and dependency health
 * Auth: Public — no authentication required
 */

import { NextResponse } from "next/server"; // Next.js response helper

/* ─── Server startup time ─────────────────────────────────────────────────── */
const SERVER_START_TIME = Date.now(); // Record when server started for uptime calculation

/* ─── Health Check Handler ────────────────────────────────────────────────── */
/**
 * GET /api/health
 * Returns a JSON payload with service health information.
 * - status: "ok" | "degraded" | "down"
 * - uptime: seconds since server start
 * - timestamp: current ISO timestamp
 * - version: app version from package.json
 */
export async function GET() {
  const now = Date.now(); // Current timestamp in milliseconds

  // Check environment indicators for each dependency
  const hasDb      = !!process.env.MONGODB_URI;     // MongoDB configured?
  const hasRedis   = !!process.env.REDIS_URL;        // Redis configured?
  const hasClerk   = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.startsWith("pk_"); // Clerk configured?
  const hasAI      = !!process.env.OPENAI_API_KEY || !!process.env.GEMINI_API_KEY; // AI configured?

  // Determine overall status
  // "ok" = all critical services configured
  // "degraded" = optional services missing but core works
  // "demo" = running in demo mode (no external services)
  const isFullyConfigured = hasDb && hasClerk;
  const status = isFullyConfigured ? "ok" : hasDb ? "degraded" : "demo"; // "ok" | "degraded" | "demo"

  /* ── Response Payload ────────────────────────────────────────────────── */
  const healthData = {
    status,                                                   // Overall service health
    timestamp:   new Date().toISOString(),                    // Current server time (UTC)
    uptime:      Math.round((now - SERVER_START_TIME) / 1000), // Uptime in seconds
    version:     process.env.npm_package_version || "0.1.0",  // App version
    environment: process.env.NODE_ENV || "development",       // Runtime environment

    // Service dependency status (configured = true means env var is set)
    services: {
      database:     hasDb    ? "configured" : "not-configured", // MongoDB
      cache:        hasRedis ? "configured" : "not-configured", // Redis
      auth:         hasClerk ? "configured" : "demo-mode",      // Clerk
      ai:           hasAI    ? "configured" : "not-configured", // OpenAI/Gemini
    },

    // Platform metadata
    platform: {
      name:    "LearnVeda",
      region:  process.env.VERCEL_REGION || "local",             // Deployment region
      runtime: "Node.js",
    },
  };

  /* ── HTTP Response ───────────────────────────────────────────────────── */
  return NextResponse.json(healthData, {
    status: 200, // always 200 for reachable service; use status field in body to indicate degraded/demo
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate", // Never cache health checks
      "Content-Type":  "application/json",
    },
  });
}
