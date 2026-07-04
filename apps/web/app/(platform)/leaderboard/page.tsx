/**
 * @file app/(platform)/leaderboard/page.tsx
 * @description Global leaderboard page for LearnVeda
 * Route: /leaderboard
 * Shows top students by XP, battle wins, streaks, and subject-wise rankings
 */

import type { Metadata } from "next";
import { LeaderboardTable } from "@/features/leaderboard/components/LeaderboardTable";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";

export const metadata: Metadata = {
  title:       "Leaderboard — LearnVeda",
  description: "See the top learners on LearnVeda — ranked by XP, streaks, battle wins, and subject mastery. Where do you rank?",
  openGraph: { title: "Leaderboard — LearnVeda", url: "/leaderboard" },
};

export default function LeaderboardPage() {
  return (
    <>
      <Navbar />
      <main>
        <LeaderboardTable />
      </main>
      <Footer />
    </>
  );
}
