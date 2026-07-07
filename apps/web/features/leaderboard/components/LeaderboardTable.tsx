/**
 * @file features/leaderboard/components/LeaderboardTable.tsx
 * @description Global leaderboard for LearnVeda
 *
 * Displays the top 50 students ranked by XP.
 * Supports filtering by:
 *  - Global ranking
 *  - Class-specific (Class 9, 10, 11, 12)
 *  - Subject-specific
 *  - Weekly / All-time
 *
 * Top 3 spots are highlighted with a podium-style display.
 */

"use client"; // Client component for filter state and animations

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Star, Flame, Medal, Crown, ArrowUp, ArrowDown, Minus } from "lucide-react";
import { Badge } from "@/components/ui/badge"; // Status badge

/* ─── Types ──────────────────────────────────────────────────────────────── */
interface LeaderboardEntry {
  rank:       number;  // Current ranking position
  prevRank:   number;  // Previous ranking (for trend arrow)
  name:       string;  // Display name
  class:      string;  // Education level
  xp:         number;  // Total XP
  level:      number;  // Current level
  streak:     number;  // Current daily streak
  battles:    number;  // Battle wins
  avatar:     string;  // Initials for avatar
  avatarColor: string; // Gradient color for avatar
}

/* ─── Demo Leaderboard Data ──────────────────────────────────────────────── */
// Replace with live MongoDB query in production
const LEADERBOARD_DATA: LeaderboardEntry[] = [
  { rank: 1,  prevRank: 2,  name: "Arjun Sharma",    class: "Class 12",     xp: 12450, level: 25, streak: 45,  battles: 87,  avatar: "AS", avatarColor: "from-brand-500 to-purple-500" },
  { rank: 2,  prevRank: 1,  name: "Priya Singh",      class: "Engineering",  xp: 11890, level: 24, streak: 32,  battles: 64,  avatar: "PS", avatarColor: "from-blue-500 to-cyan-500"   },
  { rank: 3,  prevRank: 3,  name: "Rohit Verma",      class: "Class 11",     xp: 10200, level: 21, streak: 28,  battles: 52,  avatar: "RV", avatarColor: "from-green-500 to-teal-500"  },
  { rank: 4,  prevRank: 5,  name: "Sneha Gupta",      class: "Class 10",     xp: 9800,  level: 20, streak: 21,  battles: 43,  avatar: "SG", avatarColor: "from-orange-500 to-amber-500" },
  { rank: 5,  prevRank: 4,  name: "Vikram Patel",     class: "Engineering",  xp: 9650,  level: 19, streak: 19,  battles: 38,  avatar: "VP", avatarColor: "from-red-500 to-rose-500"    },
  { rank: 6,  prevRank: 7,  name: "Ananya Reddy",     class: "Class 12",     xp: 8900,  level: 18, streak: 14,  battles: 31,  avatar: "AR", avatarColor: "from-purple-500 to-pink-500" },
  { rank: 7,  prevRank: 6,  name: "Karan Mehta",      class: "Class 9",      xp: 8200,  level: 17, streak: 11,  battles: 27,  avatar: "KM", avatarColor: "from-cyan-500 to-blue-500"   },
  { rank: 8,  prevRank: 9,  name: "Ishaan Kumar",     class: "Class 11",     xp: 7800,  level: 16, streak: 9,   battles: 22,  avatar: "IK", avatarColor: "from-brand-500 to-indigo-500" },
  { rank: 9,  prevRank: 8,  name: "Divya Nair",       class: "Class 10",     xp: 7400,  level: 15, streak: 8,   battles: 18,  avatar: "DN", avatarColor: "from-teal-500 to-green-500"  },
  { rank: 10, prevRank: 10, name: "Aditya Joshi",     class: "Engineering",  xp: 7100,  level: 15, streak: 7,   battles: 15,  avatar: "AJ", avatarColor: "from-yellow-500 to-orange-500" },
];

/* ─── Filter tabs ────────────────────────────────────────────────────────── */
const FILTER_TABS = ["Global", "Class 9", "Class 10", "Class 11", "Class 12", "Engineering"];
const TIME_TABS   = ["All Time", "This Week", "This Month"];

/* ─── Rank trend icon ────────────────────────────────────────────────────── */
function RankTrend({ rank, prevRank }: { rank: number; prevRank: number }) {
  if (rank < prevRank) return <ArrowUp className="h-3.5 w-3.5 text-green-500" />;   // Moved up
  if (rank > prevRank) return <ArrowDown className="h-3.5 w-3.5 text-red-500" />;   // Moved down
  return <Minus className="h-3.5 w-3.5 text-muted-foreground" />;                    // No change
}

/* ─── Rank icon for top 3 ────────────────────────────────────────────────── */
function RankIcon({ rank }: { rank: number }) {
  if (rank === 1) return <Crown className="h-5 w-5 text-yellow-500" />;   // Gold crown
  if (rank === 2) return <Medal className="h-5 w-5 text-slate-400" />;    // Silver medal
  if (rank === 3) return <Medal className="h-5 w-5 text-amber-600" />;    // Bronze medal
  return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>; // Numeric rank
}

/* ─── LeaderboardTable Component ─────────────────────────────────────────── */
export function LeaderboardTable() {
  const [filterTab, setFilterTab] = useState("Global"); // Active class filter
  const [timeTab,   setTimeTab]   = useState("All Time"); // Active time filter

  // In production, use filterTab and timeTab to query the API
  const data = LEADERBOARD_DATA; // Demo data for now

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 md:px-6 py-12">
        {/* ── Header ────────────────────────────────────────────────────── */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-1.5 text-sm font-medium text-yellow-600 dark:text-yellow-400 mb-4">
            <Trophy className="h-4 w-4" />
            Global Leaderboard
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Top Learners</h1>
          <p className="text-muted-foreground mt-2">Compete, climb, and become the #1 learner on LearnVeda</p>
        </div>

        {/* ── Podium — Top 3 ────────────────────────────────────────────── */}
        <div className="flex items-end justify-center gap-4 mb-12">
          {/* 2nd place */}
          {data[1] && (
            <motion.div
              initial={{ opacity: 0.01, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="flex flex-col items-center gap-2"
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${data[1].avatarColor} flex items-center justify-center shadow-lg`}>
                <span className="text-white font-bold text-sm">{data[1].avatar}</span>
              </div>
              <p className="text-sm font-semibold text-foreground max-w-[80px] text-center truncate">{data[1].name}</p>
              <Badge variant="secondary" className="text-xs">{data[1].xp.toLocaleString()} XP</Badge>
              <div className="w-20 h-16 bg-slate-400 rounded-t-xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">2</span>
              </div>
            </motion.div>
          )}
          {/* 1st place (taller podium) */}
          {data[0] && (
            <motion.div
              initial={{ opacity: 0.01, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0, duration: 0.5 }}
              className="flex flex-col items-center gap-2"
            >
              <Crown className="h-8 w-8 text-yellow-500 mb-1" />
              <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${data[0].avatarColor} flex items-center justify-center shadow-lg ring-4 ring-yellow-500/30`}>
                <span className="text-white font-bold">{data[0].avatar}</span>
              </div>
              <p className="text-sm font-semibold text-foreground max-w-[100px] text-center truncate">{data[0].name}</p>
              <Badge className="text-xs bg-yellow-500 hover:bg-yellow-500">{data[0].xp.toLocaleString()} XP</Badge>
              <div className="w-24 h-24 bg-yellow-500 rounded-t-xl flex items-center justify-center">
                <span className="text-white font-bold text-3xl">1</span>
              </div>
            </motion.div>
          )}
          {/* 3rd place */}
          {data[2] && (
            <motion.div
              initial={{ opacity: 0.01, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex flex-col items-center gap-2"
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${data[2].avatarColor} flex items-center justify-center shadow-lg`}>
                <span className="text-white font-bold text-sm">{data[2].avatar}</span>
              </div>
              <p className="text-sm font-semibold text-foreground max-w-[80px] text-center truncate">{data[2].name}</p>
              <Badge variant="secondary" className="text-xs">{data[2].xp.toLocaleString()} XP</Badge>
              <div className="w-20 h-12 bg-amber-700 rounded-t-xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">3</span>
              </div>
            </motion.div>
          )}
        </div>

        {/* ── Filters ───────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
          {/* Class filter */}
          <div className="flex gap-2 flex-wrap justify-center">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterTab(tab)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  filterTab === tab
                    ? "bg-brand-500 text-white"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          {/* Time filter */}
          <div className="flex gap-2">
            {TIME_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setTimeTab(tab)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  timeTab === tab
                    ? "bg-brand-500/20 text-brand-500 border border-brand-500/30"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* ── Leaderboard Table ─────────────────────────────────────────── */}
        <div className="rounded-2xl border bg-card shadow-sm overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-12 gap-2 px-4 py-3 bg-muted/50 border-b text-xs font-medium text-muted-foreground">
            <div className="col-span-1 text-center">Rank</div>
            <div className="col-span-4">Student</div>
            <div className="col-span-2 text-center hidden sm:block">Class</div>
            <div className="col-span-2 text-center">XP</div>
            <div className="col-span-1 text-center hidden md:block">Level</div>
            <div className="col-span-1 text-center hidden md:block">Streak</div>
            <div className="col-span-2 md:col-span-1 text-center hidden sm:block">Battles</div>
          </div>

          {/* Table rows */}
          {data.map((entry, i) => (
            <motion.div
              key={entry.rank}
              initial={{ opacity: 0.01, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
              className={`grid grid-cols-12 gap-2 px-4 py-3 border-b last:border-0 items-center hover:bg-muted/30 transition-colors ${
                entry.rank <= 3 ? "bg-yellow-500/5" : ""
              }`}
            >
              {/* Rank */}
              <div className="col-span-1 flex items-center justify-center gap-1">
                <RankTrend rank={entry.rank} prevRank={entry.prevRank} />
                <RankIcon rank={entry.rank} />
              </div>

              {/* Student name + avatar */}
              <div className="col-span-4 flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${entry.avatarColor} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white font-bold text-xs">{entry.avatar}</span>
                </div>
                <span className="font-medium text-foreground text-sm truncate">{entry.name}</span>
              </div>

              {/* Class */}
              <div className="col-span-2 text-center hidden sm:block">
                <Badge variant="secondary" className="text-xs">{entry.class}</Badge>
              </div>

              {/* XP */}
              <div className="col-span-2 text-center">
                <span className="font-bold text-brand-500 text-sm">{entry.xp.toLocaleString()}</span>
              </div>

              {/* Level */}
              <div className="col-span-1 text-center hidden md:block">
                <div className="inline-flex items-center gap-1">
                  <Star className="h-3 w-3 text-yellow-500" />
                  <span className="text-sm font-medium text-foreground">{entry.level}</span>
                </div>
              </div>

              {/* Streak */}
              <div className="col-span-1 text-center hidden md:block">
                <div className="inline-flex items-center gap-1">
                  <Flame className="h-3 w-3 text-orange-500" />
                  <span className="text-sm text-foreground">{entry.streak}</span>
                </div>
              </div>

              {/* Battles */}
              <div className="col-span-2 md:col-span-1 text-center hidden sm:block">
                <span className="text-sm text-foreground">{entry.battles}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
