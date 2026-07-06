/**
 * @file features/live-battles/components/LiveBattleArena.tsx
 * @description Live Battles page — matchmaking lobby and battle info
 *
 * Shows:
 *  - Active battles counter (real-time)
 *  - Subject selection for matchmaking
 *  - "Find Opponent" button
 *  - Battle rules explanation
 *  - Recent battle results feed
 *  - Leaderboard preview
 *
 * Real-time features require Socket.IO — wired in production.
 * In demo mode: shows a static but realistic UI.
 */

"use client"; // Client component — battle state

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Zap, Trophy, Users, Clock, Target, Shield,
  Sword, Star, ChevronRight, Flame, Play,
  CheckCircle2, XCircle, Minus,
} from "lucide-react";
import { Badge }  from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* ─── Battle subject options ─────────────────────────────────────────────── */
const BATTLE_SUBJECTS = [
  { id: "mathematics",  label: "Mathematics", emoji: "📐", difficulty: "All levels" },
  { id: "physics",      label: "Physics",     emoji: "⚛️", difficulty: "Class 9–12"  },
  { id: "chemistry",    label: "Chemistry",   emoji: "🧪", difficulty: "Class 9–12"  },
  { id: "biology",      label: "Biology",     emoji: "🌿", difficulty: "Class 9–12"  },
  { id: "dsa",          label: "DSA",         emoji: "🌳", difficulty: "Engineering" },
  { id: "python",       label: "Python",      emoji: "🐍", difficulty: "All levels"  },
  { id: "general",      label: "General GK",  emoji: "🌍", difficulty: "All levels"  },
];

/* ─── Demo recent battles ────────────────────────────────────────────────── */
const RECENT_BATTLES = [
  { p1: "Arjun S.",  p2: "Priya M.",  subject: "Mathematics",  winner: "p1", score: "8-6", time: "2 min ago" },
  { p1: "Rohit V.",  p2: "Sneha G.",  subject: "Physics",       winner: "draw", score: "7-7", time: "5 min ago" },
  { p1: "Karan M.", p2: "Ananya R.", subject: "DSA",            winner: "p2", score: "5-9", time: "8 min ago" },
  { p1: "Divya N.", p2: "Ishaan K.", subject: "Chemistry",     winner: "p1", score: "10-3", time: "12 min ago" },
  { p1: "Aditya J.",p2: "Kavya R.",  subject: "Python",        winner: "p2", score: "6-8", time: "15 min ago" },
];

/* ─── Battle rules ───────────────────────────────────────────────────────── */
const RULES = [
  { icon: Target,  text: "10 MCQ questions per battle"        },
  { icon: Clock,   text: "15 seconds per question"            },
  { icon: Shield,  text: "Elo-based matchmaking (±3 levels)"  },
  { icon: Zap,     text: "+100 XP for winning"                },
  { icon: Star,    text: "Battle history is permanently recorded" },
];

/* ─── LiveBattleArena Component ──────────────────────────────────────────── */
export function LiveBattleArena() {
  const [selectedSubject, setSelectedSubject] = useState("mathematics"); // Default subject
  const [isSearching,     setIsSearching]     = useState(false);         // Matchmaking state

  /* ── Start matchmaking ─────────────────────────────────────────────── */
  const handleFindOpponent = () => {
    setIsSearching(true); // Show searching animation
    // In production: emit Socket.IO "find_battle" event
    // For demo: stop searching after 3 seconds
    setTimeout(() => setIsSearching(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 md:px-6 py-10">
        {/* ── Header ────────────────────────────────────────────────────── */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-sm font-medium text-red-500 mb-4">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            {Math.floor(Math.random() * 100) + 45} battles active right now
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Live Battles — 1v1 Knowledge Duel
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Challenge a student at your level. Answer 10 questions in real time.
            Win XP, climb the leaderboard, earn prizes.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* ── Matchmaking panel ─────────────────────────────────────── */}
          <div className="lg:col-span-2">
            {/* Subject selector */}
            <div className="rounded-2xl border bg-card p-6 shadow-sm mb-6">
              <h2 className="font-bold text-foreground mb-4">Choose Subject</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {BATTLE_SUBJECTS.map((subject) => (
                  <button
                    key={subject.id}
                    onClick={() => setSelectedSubject(subject.id)}
                    className={`flex flex-col items-center gap-1.5 p-4 rounded-xl border transition-all ${
                      selectedSubject === subject.id
                        ? "border-red-500 bg-red-500/10"
                        : "hover:border-muted-foreground/30 bg-card"
                    }`}
                  >
                    <span className="text-2xl">{subject.emoji}</span>
                    <span className={`text-xs font-medium ${
                      selectedSubject === subject.id ? "text-red-500" : "text-foreground"
                    }`}>
                      {subject.label}
                    </span>
                    <span className="text-xs text-muted-foreground">{subject.difficulty}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Find opponent button */}
            <div className="rounded-2xl border bg-card p-8 shadow-sm text-center mb-6">
              {isSearching ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <div className="w-20 h-20 rounded-full bg-red-500/10 border-4 border-red-500/30 flex items-center justify-center mx-auto animate-pulse">
                    <Sword className="h-10 w-10 text-red-500" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Finding Opponent...</h3>
                  <p className="text-muted-foreground text-sm">
                    Matching you with a {BATTLE_SUBJECTS.find(s => s.id === selectedSubject)?.label} opponent at your level
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsSearching(false)}
                    className="mt-2"
                  >
                    Cancel
                  </Button>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center mx-auto">
                    <Sword className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Ready for Battle?</h3>
                  <p className="text-muted-foreground text-sm">
                    Subject: <strong>{BATTLE_SUBJECTS.find(s => s.id === selectedSubject)?.label}</strong> · 10 questions · 15 sec each
                  </p>
                  <Button
                    size="lg"
                    className="gap-2 bg-red-500 hover:bg-red-600"
                    onClick={handleFindOpponent}
                  >
                    <Zap className="h-5 w-5" />
                    Find Opponent
                  </Button>
                  <p className="text-xs text-muted-foreground">Average wait: ~10 seconds</p>
                </div>
              )}
            </div>

            {/* Battle rules */}
            <div className="rounded-2xl border bg-card p-6 shadow-sm">
              <h2 className="font-bold text-foreground mb-4">Battle Rules</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {RULES.map((rule) => (
                  <div key={rule.text} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <rule.icon className="h-4 w-4 text-red-500 flex-shrink-0" />
                    {rule.text}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Sidebar ───────────────────────────────────────────────── */}
          <div className="space-y-6">
            {/* Weekly prize */}
            <div className="rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 p-6 text-white">
              <Trophy className="h-8 w-8 mb-3" />
              <h3 className="font-bold text-lg mb-1">Weekly Prize</h3>
              <p className="text-2xl font-bold mb-1">₹5,000</p>
              <p className="text-sm opacity-90">Top 3 this week win cash prizes + Pro subscription</p>
              <div className="mt-4 text-sm">
                <div className="flex justify-between mb-1">
                  <span>🥇 1st place</span>
                  <span className="font-bold">₹3,000</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>🥈 2nd place</span>
                  <span className="font-bold">₹1,500</span>
                </div>
                <div className="flex justify-between">
                  <span>🥉 3rd place</span>
                  <span className="font-bold">₹500</span>
                </div>
              </div>
            </div>

            {/* Recent battles feed */}
            <div className="rounded-2xl border bg-card p-5 shadow-sm">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Flame className="h-4 w-4 text-orange-500" />
                Recent Battles
              </h3>
              <div className="space-y-3">
                {RECENT_BATTLES.map((battle, i) => (
                  <div key={i} className="flex items-center gap-3 py-2 border-b last:border-0">
                    {/* Players */}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground">
                        {battle.p1} vs {battle.p2}
                      </p>
                      <p className="text-xs text-muted-foreground">{battle.subject}</p>
                    </div>
                    {/* Result */}
                    <div className="text-right flex-shrink-0">
                      <div className="flex items-center gap-1">
                        {battle.winner === "draw"
                          ? <Minus className="h-3.5 w-3.5 text-muted-foreground" />
                          : battle.winner === "p1"
                            ? <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                            : <XCircle className="h-3.5 w-3.5 text-red-500" />
                        }
                        <span className="text-xs font-bold text-foreground">{battle.score}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{battle.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Leaderboard preview */}
            <div className="rounded-2xl border bg-card p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Top Battlers</h3>
                <Link href="/leaderboard" className="text-xs text-brand-500 hover:underline flex items-center gap-1">
                  Full list <ChevronRight className="h-3 w-3" />
                </Link>
              </div>
              {[
                { name: "Arjun S.", wins: 87, emoji: "🥇" },
                { name: "Priya M.", wins: 64, emoji: "🥈" },
                { name: "Rohit V.", wins: 52, emoji: "🥉" },
              ].map((player, i) => (
                <div key={i} className="flex items-center gap-3 py-2 border-b last:border-0">
                  <span className="text-lg">{player.emoji}</span>
                  <span className="flex-1 text-sm font-medium text-foreground">{player.name}</span>
                  <span className="text-xs text-muted-foreground">{player.wins} wins</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
