/**
 * @file app/(platform)/dashboard/page.tsx
 * @description Student dashboard page for LearnVeda
 * Route: /dashboard (requires authentication)
 * Shows: Overview, Progress, Achievements, Leaderboard rank, Calendar, Recommendations
 * Auth-safe: works in both Clerk-configured and demo (no-keys) modes
 */

import type { Metadata } from "next"; // Next.js metadata type

/* ─── Import dashboard component ─────────────────────────────────────────── */
import { DashboardOverview } from "@/features/dashboard/components/DashboardOverview"; // Main dashboard UI

/* ─── Check if real Clerk keys are present ───────────────────────────────── */
const hasRealClerkKeys =
  !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes("placeholder") &&
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.startsWith("pk_");

export const metadata: Metadata = {
  title:       "Dashboard — LearnVeda",
  description: "Your personal learning dashboard — track progress, XP, streaks, achievements, and more.",
  robots:      { index: false, follow: false }, // Private page — excluded from search index
};

/* ─── Dashboard Page Component ────────────────────────────────────────────── */
export default async function DashboardPage() {
  // Only import Clerk when real keys are configured — prevents crash in demo mode
  let userId   = "";
  let userName = "Student";

  if (hasRealClerkKeys) {
    try {
      // Dynamic import avoids bundling Clerk server code when keys aren't set
      const { currentUser } = await import("@clerk/nextjs/server");
      const user = await currentUser(); // Fetch authenticated user from Clerk
      userId   = user?.id         || ""; // Clerk user ID for API calls
      userName = user?.firstName  || "Student"; // Personalized greeting name
    } catch (err) {
      // Silently fall back to guest mode if Clerk is misconfigured
      console.warn("[DashboardPage] Clerk not available — rendering in demo mode:", err);
    }
  }

  return (
    <DashboardOverview
      userId={userId}       // Pass user ID (empty string in demo mode)
      userName={userName}   // Pass first name for greeting
    />
  );
}
