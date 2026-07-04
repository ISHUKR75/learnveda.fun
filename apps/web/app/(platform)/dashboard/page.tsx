/**
 * @file app/(platform)/dashboard/page.tsx
 * @description Student dashboard page for LearnVeda
 * Route: /dashboard (requires authentication)
 * Shows: Overview, Progress, Achievements, Leaderboard rank, Calendar, Recommendations
 */

import type { Metadata } from "next";
import { auth, currentUser } from "@clerk/nextjs/server"; // Clerk auth server utilities
import { DashboardOverview } from "@/features/dashboard/components/DashboardOverview"; // Main dashboard component

export const metadata: Metadata = {
  title:  "Dashboard — LearnVeda",
  description: "Your personal learning dashboard — track progress, XP, streaks, achievements, and more.",
  robots: { index: false, follow: false }, // Dashboard is private — don't index
};

/* ─── Dashboard Page Component ────────────────────────────────────────────── */
export default async function DashboardPage() {
  const user = await currentUser(); // Get the authenticated user's details from Clerk

  return (
    <DashboardOverview
      userId={user?.id || ""}          // Pass user ID for data fetching
      userName={user?.firstName || "Student"} // Pass first name for personalized greeting
    />
  );
}
