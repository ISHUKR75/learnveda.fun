/**
 * @file app/(platform)/live-battles/page.tsx
 * @description Live Battles page — real-time 1v1 coding and quiz battles
 * Route: /live-battles
 * Shows active battles, matchmaking, recent results, and leaderboard
 */

import type { Metadata } from "next";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { LiveBattlesHub } from "@/features/live-battles/components/LiveBattlesHub";

export const metadata: Metadata = {
  title:       "Live Battles — LearnVeda",
  description: "Real-time 1v1 coding and quiz battles on LearnVeda. Compete with students across India, win XP, and climb the leaderboard.",
  openGraph: { title: "Live Battles — LearnVeda", url: "/live-battles" },
};

export default function LiveBattlesPage() {
  return (
    <>
      <Navbar />
      <main>
        <LiveBattlesHub />
      </main>
      <Footer />
    </>
  );
}
