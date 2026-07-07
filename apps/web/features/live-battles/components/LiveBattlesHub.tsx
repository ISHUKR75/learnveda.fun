/**
 * @file features/live-battles/components/LiveBattlesHub.tsx
 * @description Live Battles hub component — matchmaking, active battles, recent results
 * Real-time updates powered by Socket.IO (placeholder UI — full backend in services/battle-service)
 */

"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Users, Clock, Trophy, Shield, Swords, Play, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge }  from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

/* ─── Battle Modes ───────────────────────────────────────────────────────── */
const battleModes = [
  {
    id: "quick",   title: "Quick Match",         emoji: "⚡", time: "~2 min",
    desc: "10 MCQs in 15s each · Random subject · XP reward",
    xp: "+30 XP win",
    color: "from-blue-500 to-cyan-500",   border: "border-blue-500/20",
  },
  {
    id: "ranked",  title: "Ranked Battle",        emoji: "🏆", time: "~5 min",
    desc: "20 MCQs · Elo matchmaking · Stars wager · Rank points",
    xp: "+75 XP + Elo",
    color: "from-purple-500 to-pink-500", border: "border-purple-500/20",
  },
  {
    id: "subject", title: "Subject Challenge",    emoji: "📚", time: "~4 min",
    desc: "Choose your subject — Physics, DSA, Python, Math, etc.",
    xp: "+50 XP win",
    color: "from-green-500 to-teal-500",  border: "border-green-500/20",
  },
  {
    id: "friend",  title: "Challenge a Friend",   emoji: "👥", time: "Custom",
    desc: "Invite a friend with a room code. Any subject, custom rules.",
    xp: "+20 XP",
    color: "from-orange-500 to-red-500",  border: "border-orange-500/20",
  },
];

/* ─── Live Battle Feed ───────────────────────────────────────────────────── */
const liveFeed = [
  { p1: "Priya S.", p2: "Arjun N.", subject: "Physics",   status: "In Progress", score: "4-3", time: "35s left" },
  { p1: "Karthik R.", p2: "Sneha G.", subject: "DSA",    status: "In Progress", score: "7-6", time: "12s left" },
  { p1: "Rohit V.", p2: "Ananya S.", subject: "Python",   status: "Finished",  score: "8-5", winner: "Rohit V." },
  { p1: "Vikram D.", p2: "Pooja J.", subject: "Math",    status: "Finished",  score: "6-6", winner: "Draw" },
];

/* ─── Live Battles Hub Component ──────────────────────────────────────────── */
export function LiveBattlesHub() {
  const [searching, setSearching] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  // Simulate matchmaking
  const startMatchmaking = () => {
    setSearching(true);
    let count = 5;
    setCountdown(count);
    const interval = setInterval(() => {
      count--;
      setCountdown(count);
      if (count <= 0) {
        clearInterval(interval);
        setSearching(false);
        setCountdown(null);
        // TODO: Redirect to battle room — connect Socket.IO
      }
    }, 1000);
  };

  return (
    <div className="py-12 md:py-20">
      <div className="container px-4 md:px-6 space-y-12">

        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className="text-center">
          <Badge variant="outline" className="mb-4 text-brand-500 border-brand-500/30">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse mr-2" />
            Live Now
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            <span className="text-gradient">Live Battles</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Real-time 1v1 academic battles. 10 questions. 15 seconds each. May the best student win.
          </p>
        </div>

        {/* ── Stats Bar ──────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Online Now",    value: "247",  icon: <Users    className="h-4 w-4 text-green-500" /> },
            { label: "Active Battles",value: "83",   icon: <Swords   className="h-4 w-4 text-red-500"  /> },
            { label: "Battles Today", value: "1,234",icon: <Zap      className="h-4 w-4 text-yellow-500"/> },
            { label: "Top Streak",    value: "15W",  icon: <Crown    className="h-4 w-4 text-purple-500"/> },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border bg-card p-4 text-center">
              <div className="flex justify-center mb-1">{stat.icon}</div>
              <p className="text-2xl font-extrabold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* ── Battle Mode Selection ─────────────────────────────────── */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Choose Your Battle Mode</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {battleModes.map((mode, i) => (
              <motion.div
                key={mode.id}
                initial={{ opacity: 0.01, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`rounded-2xl border ${mode.border} bg-gradient-to-br ${mode.color.replace("from-", "from-").replace("to-", "to-")}/5 p-6 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-200`}
              >
                <div className="text-3xl mb-3">{mode.emoji}</div>
                <h3 className="font-bold mb-1">{mode.title}</h3>
                <p className="text-xs text-muted-foreground mb-3">{mode.desc}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" /> {mode.time}
                  </div>
                  <Badge variant="success" className="text-xs">{mode.xp}</Badge>
                </div>
                <Button
                  size="sm"
                  className={`w-full mt-4 bg-gradient-to-r ${mode.color} text-white border-0 hover:opacity-90`}
                  onClick={startMatchmaking}
                  disabled={searching}
                >
                  {searching && countdown !== null ? `Finding... ${countdown}s` : "Find Match"}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Live Battle Feed ──────────────────────────────────────── */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            <h2 className="text-xl font-bold">Live Feed</h2>
          </div>

          <div className="space-y-3">
            {liveFeed.map((battle, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.01, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-4 rounded-xl border bg-card px-5 py-4"
              >
                {/* Players */}
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="font-semibold text-sm truncate">{battle.p1}</span>
                  <Swords className="h-4 w-4 text-red-500 flex-shrink-0" />
                  <span className="font-semibold text-sm truncate">{battle.p2}</span>
                </div>

                {/* Subject */}
                <Badge variant="outline" className="text-xs hidden sm:block">{battle.subject}</Badge>

                {/* Status */}
                <div className="flex items-center gap-2">
                  {battle.status === "In Progress" ? (
                    <>
                      <span className="text-sm font-bold font-mono">{battle.score}</span>
                      <span className="text-xs text-orange-500 font-medium">{battle.time}</span>
                      <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    </>
                  ) : (
                    <>
                      <Trophy className="h-4 w-4 text-yellow-500" />
                      <span className="text-xs font-medium text-muted-foreground">{battle.winner}</span>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Battle Rules ───────────────────────────────────────────── */}
        <div className="rounded-2xl border bg-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-5 w-5 text-brand-500" />
            <h3 className="font-bold">Battle Rules</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { rule: "10 MCQ questions per battle",               emoji: "❓" },
              { rule: "15 seconds per question",                    emoji: "⏱" },
              { rule: "Faster answers score higher bonus points",   emoji: "⚡" },
              { rule: "Tab switching and DevTools are blocked",     emoji: "🛡" },
            ].map((r) => (
              <div key={r.rule} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-base">{r.emoji}</span>
                {r.rule}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
