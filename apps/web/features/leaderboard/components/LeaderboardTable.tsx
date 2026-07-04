/**
 * @file features/leaderboard/components/LeaderboardTable.tsx
 * @description Leaderboard table component for LearnVeda
 * Displays top students ranked by XP with filters for subject and time period
 * Uses mock data — in production, fetches from /api/leaderboard endpoint
 */

"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Medal, Star, Flame, Crown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

/* ─── Mock Leaderboard Data ──────────────────────────────────────────────── */
const mockLeaderboard = Array.from({ length: 20 }, (_, i) => ({
  rank:     i + 1,
  name:     ["Arjun Nair", "Priya Sharma", "Sneha Gupta", "Rahul Verma", "Karthik Reddy",
             "Ananya Singh", "Vikram Das", "Pooja Joshi", "Aditya Kumar", "Mehul Patel",
             "Divya Rao", "Siddharth Mishra", "Nisha Agarwal", "Rohit Sinha", "Kavya Iyer",
             "Arnav Gupta", "Tanya Sharma", "Pranav Seth", "Ritika Jain", "Vishal Tripathi"][i],
  avatar:   ["AN", "PS", "SG", "RV", "KR", "AS", "VD", "PJ", "AK", "MP",
             "DR", "SM", "NA", "RS", "KI", "AG", "TS", "PS", "RJ", "VT"][i],
  color:    ["from-blue-500 to-cyan-500", "from-purple-500 to-pink-500", "from-green-500 to-teal-500",
             "from-orange-500 to-red-500", "from-yellow-500 to-orange-500"][i % 5],
  xp:       Math.max(50000 - i * 2200 + Math.floor(Math.random() * 500), 1000),
  level:    Math.max(25 - i, 5),
  streak:   Math.max(30 - i * 1.2, 1),
  battles:  Math.max(50 - i * 2, 3),
  badge:    i === 0 ? "👑" : i === 1 ? "🥈" : i === 2 ? "🥉" : i < 10 ? "⭐" : "",
  location: ["Kochi", "Jaipur", "Delhi", "Pune", "Hyderabad", "Bengaluru", "Mumbai", "Chennai", "Kolkata", "Ahmedabad"][i % 10],
}));

/* ─── Filter Options ─────────────────────────────────────────────────────── */
const filters = [
  { id: "all",     label: "All Time"  },
  { id: "monthly", label: "This Month" },
  { id: "weekly",  label: "This Week"  },
];

const subjects = [
  { id: "overall",     label: "Overall"   },
  { id: "math",        label: "Math"      },
  { id: "physics",     label: "Physics"   },
  { id: "dsa",         label: "DSA"       },
  { id: "programming", label: "Programming" },
];

/* ─── Rank Medal helper ──────────────────────────────────────────────────── */
function RankIcon({ rank }: { rank: number }) {
  if (rank === 1) return <Crown  className="h-5 w-5 text-yellow-500" />;
  if (rank === 2) return <Medal  className="h-5 w-5 text-gray-400"   />;
  if (rank === 3) return <Medal  className="h-5 w-5 text-amber-600"  />;
  return <span className="text-sm font-bold text-muted-foreground w-5 text-center">{rank}</span>;
}

/* ─── Leaderboard Table Component ────────────────────────────────────────── */
export function LeaderboardTable() {
  const [period,  setPeriod]  = useState("all");
  const [subject, setSubject] = useState("overall");

  return (
    <div className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <Badge variant="outline" className="mb-4 text-brand-500 border-brand-500/30">
            <Trophy className="h-3 w-3 mr-1" /> Global Rankings
          </Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
            Leaderboard
          </h1>
          <p className="text-muted-foreground">
            Top learners ranked by XP earned. Study more, rise higher.
          </p>
        </div>

        {/* Top 3 podium */}
        <div className="flex items-end justify-center gap-4 mb-10">
          {[mockLeaderboard[1], mockLeaderboard[0], mockLeaderboard[2]].map((student, i) => {
            const heights = ["h-24", "h-32", "h-20"]; // Podium heights: 2nd, 1st, 3rd
            const positions = ["2nd", "1st", "3rd"];
            return (
              <motion.div
                key={student.rank}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center gap-2"
              >
                {/* Avatar */}
                <div className={`flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${student.color} text-white font-bold text-sm border-4 ${i === 1 ? "border-yellow-400" : "border-background"} shadow-lg`}>
                  {student.avatar}
                </div>
                {/* Name */}
                <p className="text-xs font-semibold text-center max-w-[80px] truncate">{student.name}</p>
                {/* XP */}
                <p className="text-xs text-brand-500 font-bold">{(student.xp / 1000).toFixed(1)}K XP</p>
                {/* Podium block */}
                <div className={`${heights[i]} w-20 rounded-t-xl flex items-start justify-center pt-2 font-bold text-white text-sm ${
                  i === 1 ? "bg-gradient-to-b from-yellow-400 to-yellow-500" :
                  i === 0 ? "bg-gradient-to-b from-gray-300 to-gray-400" :
                            "bg-gradient-to-b from-amber-600 to-amber-700"
                }`}>
                  {positions[i]}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex gap-1 rounded-xl border bg-background p-1">
            {filters.map((f) => (
              <button key={f.id} onClick={() => setPeriod(f.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${period === f.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                {f.label}
              </button>
            ))}
          </div>
          <div className="flex gap-1 rounded-xl border bg-background p-1">
            {subjects.map((s) => (
              <button key={s.id} onClick={() => setSubject(s.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${subject === s.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Full leaderboard table */}
        <div className="rounded-2xl border bg-card overflow-hidden">
          <div className="grid grid-cols-[40px_1fr_auto_auto_auto] gap-4 px-5 py-3 bg-muted/40 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            <span>#</span>
            <span>Student</span>
            <span>Level</span>
            <span className="hidden sm:block">Streak</span>
            <span>XP</span>
          </div>

          {mockLeaderboard.map((student, i) => (
            <motion.div
              key={student.rank}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              className={`grid grid-cols-[40px_1fr_auto_auto_auto] items-center gap-4 px-5 py-4 border-b last:border-0 hover:bg-muted/30 transition-colors ${
                student.rank <= 3 ? "bg-gradient-to-r from-yellow-500/5 to-transparent" : ""
              }`}
            >
              {/* Rank */}
              <div className="flex items-center justify-center">
                <RankIcon rank={student.rank} />
              </div>

              {/* Student info */}
              <div className="flex items-center gap-3 min-w-0">
                <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${student.color} text-white text-xs font-bold`}>
                  {student.avatar}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate">{student.name} {student.badge}</p>
                  <p className="text-xs text-muted-foreground">{student.location}</p>
                </div>
              </div>

              {/* Level */}
              <Badge variant="outline" className="text-xs">Lv.{student.level}</Badge>

              {/* Streak */}
              <span className="hidden sm:flex items-center gap-1 text-sm text-orange-500 font-medium">
                <Flame className="h-3 w-3" /> {Math.floor(student.streak)}d
              </span>

              {/* XP */}
              <div className="text-right">
                <p className="text-sm font-bold text-brand-500">{(student.xp).toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">XP</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
