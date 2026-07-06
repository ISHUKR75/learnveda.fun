/**
 * @file app/(platform)/leaderboard/page.tsx
 * @description Global Leaderboard page — top students by XP across all tracks
 * Route: /leaderboard
 *
 * Sections:
 *   - Global leaderboard (all users by total XP)
 *   - Class-specific boards (Class 9, 10, 11, 12)
 *   - Engineering board
 *   - Programming board
 *   - Weekly leaderboard (resets every Monday)
 *   - My rank (current user's position)
 *
 * In production: fetched from MongoDB via /api/leaderboard with Redis caching (5min TTL)
 */

import type { Metadata } from "next"; // SEO
import Link              from "next/link"; // Navigation
import {
  Trophy, Flame, Star, ChevronRight, Medal,
  Crown, Shield, Zap, TrendingUp, Users,
  ArrowUp, ArrowDown, Minus,
} from "lucide-react"; // Icons
import { Badge } from "@/components/ui/badge"; // Badge

/* ─── SEO Metadata ────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title:       "Leaderboard — Top Students on LearnVeda",
  description: "See the top LearnVeda students by XP, streak, and battles won. Weekly, monthly, and all-time rankings across all learning tracks.",
  openGraph: { title: "LearnVeda Leaderboard", description: "Top students by XP and learning streaks." },
};

/* ─── Leaderboard Entry Type ─────────────────────────────────────────────── */
interface LeaderboardEntry {
  rank:        number;   // Current rank position
  prevRank?:   number;   // Previous rank (to show movement)
  userId:      string;   // Unique user ID
  username:    string;   // Display username
  avatar:      string;   // Initials for avatar
  level:       number;   // XP level (1–100)
  tier:        string;   // "Bronze" | "Silver" | "Gold" | "Platinum" | ...
  xp:          number;   // Total XP
  streak:      number;   // Current daily streak
  battles:     number;   // Battles won
  track:       string;   // Primary learning track
  country:     string;   // Country flag emoji
}

/* ─── Demo Leaderboard Data ──────────────────────────────────────────────── */
// In production: fetched from /api/leaderboard?scope=global&limit=100
const GLOBAL_LEADERBOARD: LeaderboardEntry[] = [
  { rank:1,  prevRank:1,  userId:"u-001", username:"ArjunNair",     avatar:"AN", level:87, tier:"Diamond",  xp:730850, streak:142, battles:89,  track:"Engineering", country:"🇮🇳" },
  { rank:2,  prevRank:3,  userId:"u-002", username:"PriyaSharma",   avatar:"PS", level:84, tier:"Diamond",  xp:695200, streak:98,  battles:67,  track:"Class 12",    country:"🇮🇳" },
  { rank:3,  prevRank:2,  userId:"u-003", username:"RohanVerma",    avatar:"RV", level:82, tier:"Diamond",  xp:671400, streak:56,  battles:112, track:"Engineering", country:"🇮🇳" },
  { rank:4,  prevRank:4,  userId:"u-004", username:"NehaGupta",     avatar:"NG", level:79, tier:"Platinum", xp:612300, streak:201, battles:43,  track:"Class 12",    country:"🇮🇳" },
  { rank:5,  prevRank:7,  userId:"u-005", username:"AaravKumar",    avatar:"AK", level:76, tier:"Platinum", xp:584700, streak:34,  battles:78,  track:"Programming", country:"🇮🇳" },
  { rank:6,  prevRank:5,  userId:"u-006", username:"SnehaPatil",    avatar:"SP", level:74, tier:"Platinum", xp:561200, streak:87,  battles:55,  track:"Class 11",    country:"🇮🇳" },
  { rank:7,  prevRank:9,  userId:"u-007", username:"VikramSingh",   avatar:"VS", level:72, tier:"Platinum", xp:535800, streak:62,  battles:91,  track:"Engineering", country:"🇮🇳" },
  { rank:8,  prevRank:6,  userId:"u-008", username:"AnanyaRao",     avatar:"AR", level:70, tier:"Gold",     xp:512400, streak:45,  battles:38,  track:"Class 12",    country:"🇮🇳" },
  { rank:9,  prevRank:10, userId:"u-009", username:"KaranMehta",    avatar:"KM", level:68, tier:"Gold",     xp:489600, streak:123, battles:62,  track:"Programming", country:"🇮🇳" },
  { rank:10, prevRank:8,  userId:"u-010", username:"RiyaChaudhari", avatar:"RC", level:67, tier:"Gold",     xp:471900, streak:78,  battles:29,  track:"Class 10",    country:"🇮🇳" },
  { rank:11, prevRank:12, userId:"u-011", username:"DevMishra",     avatar:"DM", level:64, tier:"Gold",     xp:448200, streak:56,  battles:84,  track:"Engineering", country:"🇮🇳" },
  { rank:12, prevRank:11, userId:"u-012", username:"IshaJoshi",     avatar:"IJ", level:62, tier:"Gold",     xp:423700, streak:34,  battles:51,  track:"Class 11",    country:"🇮🇳" },
  { rank:13, prevRank:15, userId:"u-013", username:"AmitPandey",    avatar:"AP", level:60, tier:"Silver",   xp:401500, streak:89,  battles:73,  track:"Programming", country:"🇮🇳" },
  { rank:14, prevRank:13, userId:"u-014", username:"SaraDesai",     avatar:"SD", level:59, tier:"Silver",   xp:385300, streak:67,  battles:42,  track:"Class 12",    country:"🇮🇳" },
  { rank:15, prevRank:14, userId:"u-015", username:"NikhilSharma",  avatar:"NS", level:57, tier:"Silver",   xp:362800, streak:45,  battles:66,  track:"Engineering", country:"🇮🇳" },
];

/* ─── Tier Color Helper ──────────────────────────────────────────────────── */
/** Returns CSS color class for a tier name */
function tierColor(tier: string): string {
  switch (tier.toLowerCase()) {
    case "grandmaster": return "text-red-600 bg-red-500/10 border-red-500/30";
    case "legend":      return "text-pink-600 bg-pink-500/10 border-pink-500/30";
    case "diamond":     return "text-cyan-600 bg-cyan-500/10 border-cyan-500/30";
    case "emerald":     return "text-emerald-600 bg-emerald-500/10 border-emerald-500/30";
    case "ruby":        return "text-rose-600 bg-rose-500/10 border-rose-500/30";
    case "sapphire":    return "text-blue-700 bg-blue-500/10 border-blue-500/30";
    case "platinum":    return "text-slate-600 bg-slate-500/10 border-slate-500/30";
    case "gold":        return "text-yellow-600 bg-yellow-500/10 border-yellow-500/30";
    case "silver":      return "text-gray-500 bg-gray-400/10 border-gray-400/30";
    default:            return "text-orange-700 bg-orange-500/10 border-orange-500/30"; // bronze
  }
}

/* ─── Rank Movement Icon ─────────────────────────────────────────────────── */
function RankMovement({ current, prev }: { current: number; prev?: number }) {
  if (!prev || prev === current) return <Minus className="h-3.5 w-3.5 text-muted-foreground" />;
  if (current < prev) return <ArrowUp className="h-3.5 w-3.5 text-green-500" />;
  return <ArrowDown className="h-3.5 w-3.5 text-red-500" />;
}

/* ─── Page Component ─────────────────────────────────────────────────────── */
export default function LeaderboardPage() {
  const top3 = GLOBAL_LEADERBOARD.slice(0, 3); // Podium entries
  const rest  = GLOBAL_LEADERBOARD.slice(3);    // Remaining entries

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/40 bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4" aria-label="Breadcrumb">
            <Link href="/dashboard" className="hover:text-foreground transition-colors">Platform</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">Leaderboard</span>
          </nav>
          <div className="flex items-center gap-3">
            <Trophy className="h-8 w-8 text-yellow-500" />
            <div>
              <h1 className="text-3xl font-bold">Global Leaderboard</h1>
              <p className="text-muted-foreground">Top learners ranked by total XP — updated every 5 minutes</p>
            </div>
          </div>

          {/* Scope tabs */}
          <div className="mt-6 flex flex-wrap gap-2">
            {["Global", "Class 9", "Class 10", "Class 11", "Class 12", "Engineering", "Weekly"].map((tab) => (
              <button
                key={tab}
                className={`rounded-full border px-4 py-1.5 text-sm transition-all ${
                  tab === "Global"
                    ? "bg-brand-500 text-white border-brand-500"
                    : "border-border/40 text-muted-foreground hover:border-border/80"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* ── Podium (Top 3) ────────────────────────────────────────── */}
        <section aria-label="Top 3 students">
          <div className="flex items-end justify-center gap-4 py-6">
            {/* 2nd place */}
            <div className="flex flex-col items-center gap-2">
              <div className="relative">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center text-white font-bold text-xl">
                  {top3[1].avatar}
                </div>
                <div className="absolute -top-2 -right-2 bg-gray-400 rounded-full h-6 w-6 flex items-center justify-center">
                  <Medal className="h-3.5 w-3.5 text-white" />
                </div>
              </div>
              <div className="text-center">
                <p className="font-semibold text-sm">{top3[1].username}</p>
                <p className="text-xs text-muted-foreground">Lv.{top3[1].level} · {top3[1].xp.toLocaleString()} XP</p>
              </div>
              <div className="bg-gray-400/20 border border-gray-400/30 rounded-lg px-6 py-8 flex items-center justify-center">
                <span className="text-3xl font-black text-gray-400">2</span>
              </div>
            </div>

            {/* 1st place */}
            <div className="flex flex-col items-center gap-2">
              <Crown className="h-8 w-8 text-yellow-500" />
              <div className="relative">
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold text-2xl ring-4 ring-yellow-400/30">
                  {top3[0].avatar}
                </div>
                <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full h-7 w-7 flex items-center justify-center">
                  <Trophy className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="text-center">
                <p className="font-bold">{top3[0].username}</p>
                <p className="text-xs text-muted-foreground">Lv.{top3[0].level} · {top3[0].xp.toLocaleString()} XP</p>
              </div>
              <div className="bg-yellow-400/20 border border-yellow-400/40 rounded-lg px-8 py-10 flex items-center justify-center">
                <span className="text-4xl font-black text-yellow-500">1</span>
              </div>
            </div>

            {/* 3rd place */}
            <div className="flex flex-col items-center gap-2">
              <div className="relative">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-orange-600 to-amber-700 flex items-center justify-center text-white font-bold text-xl">
                  {top3[2].avatar}
                </div>
                <div className="absolute -top-2 -right-2 bg-amber-700 rounded-full h-6 w-6 flex items-center justify-center">
                  <Shield className="h-3.5 w-3.5 text-white" />
                </div>
              </div>
              <div className="text-center">
                <p className="font-semibold text-sm">{top3[2].username}</p>
                <p className="text-xs text-muted-foreground">Lv.{top3[2].level} · {top3[2].xp.toLocaleString()} XP</p>
              </div>
              <div className="bg-amber-700/10 border border-amber-700/30 rounded-lg px-6 py-6 flex items-center justify-center">
                <span className="text-3xl font-black text-amber-700">3</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Full Rankings Table ──────────────────────────────────── */}
        <section aria-label="Full leaderboard">
          <div className="rounded-xl border border-border/40 bg-card overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-12 gap-2 px-4 py-3 border-b border-border/40 bg-muted/30 text-xs text-muted-foreground font-medium">
              <div className="col-span-1 text-center">Rank</div>
              <div className="col-span-4">Student</div>
              <div className="col-span-2 text-center">Level</div>
              <div className="col-span-2 text-right">XP</div>
              <div className="col-span-1 text-center">
                <Flame className="h-3.5 w-3.5 inline" />
              </div>
              <div className="col-span-1 text-center">
                <Zap className="h-3.5 w-3.5 inline" />
              </div>
              <div className="col-span-1 text-right">Track</div>
            </div>

            {/* Table rows */}
            {rest.map((entry) => (
              <div
                key={entry.userId}
                className="grid grid-cols-12 gap-2 px-4 py-3 border-b border-border/20 last:border-0 hover:bg-muted/20 transition-colors items-center"
              >
                {/* Rank */}
                <div className="col-span-1 flex items-center justify-center gap-1">
                  <span className="font-bold text-sm w-6 text-center">{entry.rank}</span>
                  <RankMovement current={entry.rank} prev={entry.prevRank} />
                </div>

                {/* Student name + tier */}
                <div className="col-span-4 flex items-center gap-2.5 min-w-0">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {entry.avatar}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-sm truncate">
                      {entry.country} {entry.username}
                    </p>
                    <Badge variant="outline" className={`text-xs border mt-0.5 ${tierColor(entry.tier)}`}>
                      {entry.tier}
                    </Badge>
                  </div>
                </div>

                {/* Level */}
                <div className="col-span-2 text-center">
                  <div className="inline-flex items-center gap-1 text-sm">
                    <Star className="h-3.5 w-3.5 text-yellow-500" />
                    <span className="font-semibold">{entry.level}</span>
                  </div>
                </div>

                {/* XP */}
                <div className="col-span-2 text-right font-mono text-sm text-muted-foreground">
                  {entry.xp.toLocaleString()}
                </div>

                {/* Streak */}
                <div className="col-span-1 text-center text-sm">
                  <span className="flex items-center justify-center gap-0.5">
                    <Flame className="h-3.5 w-3.5 text-orange-500" />
                    {entry.streak}
                  </span>
                </div>

                {/* Battles */}
                <div className="col-span-1 text-center text-sm">
                  <span className="flex items-center justify-center gap-0.5">
                    <Zap className="h-3.5 w-3.5 text-purple-500" />
                    {entry.battles}
                  </span>
                </div>

                {/* Track badge */}
                <div className="col-span-1 flex justify-end">
                  <Badge variant="secondary" className="text-xs truncate max-w-[5rem]">
                    {entry.track}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* My rank card */}
        <section className="rounded-xl border border-brand-500/20 bg-brand-500/5 p-5">
          <h2 className="font-semibold mb-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-brand-500" />
            Your Current Rank
          </h2>
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
              AK
            </div>
            <div>
              <p className="font-semibold">AaravKumar</p>
              <p className="text-sm text-muted-foreground">Rank #5 · Level 76 · 584,700 XP · Platinum tier</p>
            </div>
            <Badge variant="outline" className={`ml-auto ${tierColor("Platinum")}`}>Platinum</Badge>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3 text-center text-sm">
            <div className="rounded-lg bg-background p-2">
              <p className="font-bold">34</p>
              <p className="text-xs text-muted-foreground">Day Streak 🔥</p>
            </div>
            <div className="rounded-lg bg-background p-2">
              <p className="font-bold">78</p>
              <p className="text-xs text-muted-foreground">Battles Won ⚡</p>
            </div>
            <div className="rounded-lg bg-background p-2">
              <p className="font-bold">584K</p>
              <p className="text-xs text-muted-foreground">Total XP ⭐</p>
            </div>
          </div>
        </section>

        {/* How XP works */}
        <section className="rounded-xl border border-border/40 bg-card p-6">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <Users className="h-4 w-4" /> How XP is Earned
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { action: "Complete a chapter",   xp: "+50 XP",  color: "text-blue-500" },
              { action: "Win a battle",          xp: "+90 XP",  color: "text-purple-500" },
              { action: "Daily streak",          xp: "+10 XP",  color: "text-orange-500" },
              { action: "Finish daily quiz",     xp: "+30 XP",  color: "text-green-500" },
            ].map((item) => (
              <div key={item.action} className="rounded-lg bg-muted/50 p-3 text-center">
                <p className={`font-bold ${item.color}`}>{item.xp}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.action}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
