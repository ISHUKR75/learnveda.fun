/**
 * @file app/(platform)/live-battles/page.tsx
 * @description Live Battles page
 * Route: /live-battles
 */

import type { Metadata } from "next";
import { LiveBattleArena } from "@/features/live-battles/components/LiveBattleArena";

export const metadata: Metadata = {
  title:       "Live Battles — LearnVeda",
  description: "Challenge students to real-time 1v1 knowledge battles. Earn XP, climb the leaderboard, and win weekly prizes.",
};

export default function LiveBattlesPage() {
  return <LiveBattleArena />;
}
