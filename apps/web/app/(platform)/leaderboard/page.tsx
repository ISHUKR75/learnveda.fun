/**
 * @file app/(platform)/leaderboard/page.tsx
 * @description Global leaderboard page for LearnVeda
 * Route: /leaderboard
 * Shows top students by XP, battle wins, streaks, and subject-wise rankings
 * Navbar is provided by the (platform) layout — not duplicated here
 */

import type { Metadata } from "next"; // Next.js metadata type
import { LeaderboardTable } from "@/features/leaderboard/components/LeaderboardTable"; // Main leaderboard UI
import { Footer } from "@/components/navigation/footer"; // Site footer

export const metadata: Metadata = {
  title:       "Leaderboard — LearnVeda",
  description: "See the top learners on LearnVeda — ranked by XP, streaks, battle wins, and subject mastery. Where do you rank?",
  openGraph: { title: "Leaderboard — LearnVeda", url: "/leaderboard" },
};

/* ─── Leaderboard Page ────────────────────────────────────────────────────── */
export default function LeaderboardPage() {
  return (
    <>
      <main> {/* Platform layout provides Navbar — no duplication needed */}
        <LeaderboardTable /> {/* Renders top-50 students with filters and podium */}
      </main>
      <Footer /> {/* Site-wide footer with links */}
    </>
  );
}
