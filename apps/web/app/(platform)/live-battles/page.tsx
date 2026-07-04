/**
 * @file app/(platform)/live-battles/page.tsx
 * @description Live Battles page — real-time 1v1 coding and quiz battles
 * Route: /live-battles
 * Shows active battles, matchmaking, recent results, and leaderboard
 * Navbar is provided by the (platform) layout — not duplicated here
 */

import type { Metadata } from "next"; // Next.js metadata type
import { Footer } from "@/components/navigation/footer"; // Site footer
import { LiveBattlesHub } from "@/features/live-battles/components/LiveBattlesHub"; // Main battles UI

export const metadata: Metadata = {
  title:       "Live Battles — LearnVeda",
  description: "Real-time 1v1 coding and quiz battles on LearnVeda. Compete with students across India, win XP, and climb the leaderboard.",
  openGraph: { title: "Live Battles — LearnVeda", url: "/live-battles" },
};

/* ─── Live Battles Page ───────────────────────────────────────────────────── */
export default function LiveBattlesPage() {
  return (
    <>
      <main> {/* Platform layout provides Navbar — no duplication needed */}
        <LiveBattlesHub /> {/* Renders battle modes, active battles, matchmaking */}
      </main>
      <Footer /> {/* Site-wide footer */}
    </>
  );
}
