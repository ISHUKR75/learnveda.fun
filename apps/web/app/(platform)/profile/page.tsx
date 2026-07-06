/**
 * @file app/(platform)/profile/page.tsx
 * @description User profile overview page — redirects to own profile
 * Route: /profile
 *
 * When signed in: redirects to /profile/[username]
 * In demo mode: renders a preview of the profile page with demo data
 *
 * Platform layout (Navbar) is provided by (platform)/layout.tsx.
 */

"use client"; // Client component — reads clerk user, local demo fallback

import React, { useState } from "react";                   // React core
import Link from "next/link";                              // Navigation
import { motion } from "framer-motion";                    // Animations
import {
  User, BookOpen, Code2, Trophy, Flame, Star,
  Zap, Target, Award, TrendingUp, Clock, Calendar,
  Edit, Settings, Share2, ChevronRight, CheckCircle,
  BarChart3, Heart, Users,
} from "lucide-react";                                     // Icons
import { Badge }    from "@/components/ui/badge";          // Label badge
import { Button }   from "@/components/ui/button";         // CTA button
import { Progress } from "@/components/ui/progress";       // XP progress bar

/* ══════════════════════════════════════════════════════════════════════════ */
/*  DEMO DATA — Replaced with real data when Clerk + MongoDB are configured  */
/* ══════════════════════════════════════════════════════════════════════════ */

/** Demo user profile data */
const DEMO_USER = {
  name:      "Arjun Sharma",                    // Display name
  username:  "arjun_sharma",                    // URL slug
  avatar:    "AS",                              // Initials (used in avatar circle)
  bio:       "BTech CSE Student • FAANG Aspirant • Python + DSA enthusiast 🐍",
  location:  "Delhi, India",
  joined:    "January 2026",
  level:     28,                                // Current level
  xp:        4840,                              // Current XP
  xpToNext:  5000,                              // XP needed for next level
  streak:    7,                                 // Current day streak
  rank:      342,                               // Leaderboard rank
  followers: 128,
  following: 76,
};

/** Demo badges earned */
const DEMO_BADGES = [
  { id: "dsa-novice",    emoji: "🌱", name: "DSA Novice",        desc: "Completed first 10 DSA problems",    color: "bg-green-500/10" },
  { id: "streak-7",      emoji: "🔥", name: "7-Day Streak",      desc: "Maintained a 7-day learning streak",  color: "bg-orange-500/10" },
  { id: "python-start",  emoji: "🐍", name: "Python Starter",    desc: "Finished Python Week 1",              color: "bg-yellow-500/10" },
  { id: "quiz-master",   emoji: "🧠", name: "Quiz Master",       desc: "Scored 90%+ in 5 quizzes",            color: "bg-purple-500/10" },
  { id: "early-bird",    emoji: "🌅", name: "Early Bird",        desc: "Studied before 7 AM for 3 days",      color: "bg-cyan-500/10"   },
  { id: "community-rep", emoji: "💬", name: "Community Helper",  desc: "Answered 10 forum questions",          color: "bg-blue-500/10"   },
];

/** Demo active learning tracks */
const DEMO_ACTIVE_TRACKS = [
  { name: "DSA — 60-Day Plan",        progress: 18, total: 60, emoji: "🌳", href: "/core-cs/dsa"        },
  { name: "Python — 45-Day Plan",     progress: 12, total: 45, emoji: "🐍", href: "/programming/python"  },
  { name: "System Design — 25 Days",  progress: 5,  total: 25, emoji: "🏗️", href: "/core-cs/system-design" },
];

/** Demo activity feed */
const DEMO_ACTIVITY = [
  { action: "Completed",    subject: "DSA Day 18 — Graph BFS",          time: "2 hours ago",  xp: 55,  icon: <CheckCircle className="h-4 w-4 text-green-500" /> },
  { action: "Scored 92%",   subject: "Class 10 Maths Quiz — Trigonometry", time: "Yesterday", xp: 40,  icon: <Star className="h-4 w-4 text-yellow-500" />       },
  { action: "Completed",    subject: "Python Day 12 — List Comprehension", time: "2 days ago", xp: 35, icon: <CheckCircle className="h-4 w-4 text-green-500" /> },
  { action: "Earned badge", subject: "Quiz Master — 5× 90%+ Quiz",      time: "3 days ago",  xp: 100, icon: <Award className="h-4 w-4 text-purple-500" />       },
];

/** Demo stats */
const DEMO_STATS = [
  { label: "Days Active",       value: "42",     icon: <Calendar  className="h-4 w-4" />, color: "text-blue-500"   },
  { label: "Questions Solved",  value: "1,247",  icon: <BookOpen  className="h-4 w-4" />, color: "text-green-500"  },
  { label: "Avg. Quiz Score",   value: "78%",    icon: <BarChart3 className="h-4 w-4" />, color: "text-orange-500" },
  { label: "Chapters Finished", value: "63",     icon: <CheckCircle className="h-4 w-4" />, color: "text-purple-500" },
];

/* ══════════════════════════════════════════════════════════════════════════ */
/*  COMPONENT                                                                */
/* ══════════════════════════════════════════════════════════════════════════ */

/**
 * ProfilePage
 * Shows the signed-in user's own profile (demo data fallback when unauthenticated).
 */
export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"activity" | "tracks" | "badges">("activity");

  const xpPct = Math.round((DEMO_USER.xp / DEMO_USER.xpToNext) * 100); // XP progress %

  return (
    <div className="min-h-screen pb-20">

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* PROFILE HEADER                                                 */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="border-b bg-gradient-to-b from-brand-950/5 to-background py-12 md:py-16">
        <div className="container px-4 md:px-6">

          {/* Demo mode banner */}
          <div className="mb-6 rounded-xl border border-yellow-500/30 bg-yellow-500/5 px-4 py-3 flex items-center gap-2 text-sm text-yellow-700 dark:text-yellow-400">
            <User className="h-4 w-4 shrink-0" />
            <span>
              <strong>Demo Profile</strong> — Sign in with your account to see your real progress.{" "}
              <Link href="/sign-in" className="underline font-semibold">Sign In →</Link>
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Avatar circle with level ring */}
            <div className="relative shrink-0">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-purple-600 text-white text-3xl font-black ring-4 ring-brand-500/20 ring-offset-2">
                {DEMO_USER.avatar}
              </div>
              {/* Level badge */}
              <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-brand-500 text-white text-xs font-black ring-2 ring-background">
                {DEMO_USER.level}
              </div>
            </div>

            {/* User info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-1">
                <h1 className="text-2xl font-extrabold">{DEMO_USER.name}</h1>
                <Badge variant="secondary">Level {DEMO_USER.level}</Badge>
                <Badge variant="outline" className="text-orange-500 border-orange-400/40">
                  🔥 {DEMO_USER.streak}-Day Streak
                </Badge>
              </div>
              <p className="text-muted-foreground text-sm mb-2">@{DEMO_USER.username} · {DEMO_USER.location}</p>
              <p className="text-sm mb-4 max-w-lg">{DEMO_USER.bio}</p>

              {/* Follower counts */}
              <div className="flex items-center gap-4 text-sm mb-4">
                <span className="flex items-center gap-1">
                  <strong>{DEMO_USER.followers}</strong>
                  <span className="text-muted-foreground">Followers</span>
                </span>
                <span className="flex items-center gap-1">
                  <strong>{DEMO_USER.following}</strong>
                  <span className="text-muted-foreground">Following</span>
                </span>
                <span className="flex items-center gap-1">
                  <Trophy className="h-3.5 w-3.5 text-yellow-500" />
                  <strong>Rank #{DEMO_USER.rank}</strong>
                </span>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline" className="gap-1.5">
                  <Edit className="h-3.5 w-3.5" /> Edit Profile
                </Button>
                <Button size="sm" variant="outline" className="gap-1.5">
                  <Share2 className="h-3.5 w-3.5" /> Share
                </Button>
                <Button size="sm" variant="outline" asChild>
                  <Link href="/settings" className="gap-1.5">
                    <Settings className="h-3.5 w-3.5" /> Settings
                  </Link>
                </Button>
              </div>
            </div>

            {/* XP card */}
            <div className="w-full sm:w-64 rounded-2xl border bg-card p-5 shrink-0">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold flex items-center gap-1.5">
                  <Zap className="h-4 w-4 text-yellow-500" /> Experience Points
                </span>
                <span className="text-xs text-muted-foreground">Level {DEMO_USER.level}</span>
              </div>
              <div className="text-3xl font-black mb-1 text-yellow-500">
                {DEMO_USER.xp.toLocaleString()} XP
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                {(DEMO_USER.xpToNext - DEMO_USER.xp).toLocaleString()} XP to Level {DEMO_USER.level + 1}
              </p>
              <Progress value={xpPct} className="h-2" />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* STATS STRIP                                                    */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="border-b bg-muted/30 py-5">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {DEMO_STATS.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3 rounded-xl bg-background border p-4">
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-muted ${stat.color}`}>
                  {stat.icon}
                </div>
                <div>
                  <div className="text-xl font-black">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* TAB CONTENT — Activity / Tracks / Badges                      */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="py-10">
        <div className="container px-4 md:px-6 max-w-4xl">

          {/* Tab bar */}
          <div className="flex gap-1 border-b mb-8">
            {(["activity", "tracks", "badges"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2.5 text-sm font-medium capitalize border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-brand-500 text-brand-500"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* ── Activity Tab ────────────────────────────────────────── */}
          {activeTab === "activity" && (
            <motion.div initial={{ opacity: 0.01 }} animate={{ opacity: 1 }}>
              <div className="flex flex-col gap-3">
                {DEMO_ACTIVITY.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 rounded-xl border bg-card p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm">
                        <span className="text-muted-foreground">{item.action} — </span>
                        {item.subject}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">{item.time}</div>
                    </div>
                    <Badge variant="secondary" className="text-xs text-yellow-600 shrink-0">
                      +{item.xp} XP
                    </Badge>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── Active Tracks Tab ───────────────────────────────────── */}
          {activeTab === "tracks" && (
            <motion.div initial={{ opacity: 0.01 }} animate={{ opacity: 1 }}>
              <div className="flex flex-col gap-4">
                {DEMO_ACTIVE_TRACKS.map((track) => {
                  const pct = Math.round((track.progress / track.total) * 100);
                  return (
                    <Link key={track.name} href={track.href} className="group block">
                      <div className="rounded-xl border bg-card p-5 hover:shadow-md hover:border-brand-500/30 transition-all">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{track.emoji}</span>
                            <div>
                              <div className="font-semibold text-sm group-hover:text-brand-500 transition-colors">{track.name}</div>
                              <div className="text-xs text-muted-foreground">Day {track.progress} of {track.total}</div>
                            </div>
                          </div>
                          <Badge variant="secondary">{pct}%</Badge>
                        </div>
                        <Progress value={pct} className="h-1.5" />
                      </div>
                    </Link>
                  );
                })}
                <Button variant="outline" asChild className="self-start">
                  <Link href="/explore">Browse More Tracks <ChevronRight className="h-4 w-4" /></Link>
                </Button>
              </div>
            </motion.div>
          )}

          {/* ── Badges Tab ──────────────────────────────────────────── */}
          {activeTab === "badges" && (
            <motion.div initial={{ opacity: 0.01 }} animate={{ opacity: 1 }}>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {DEMO_BADGES.map((badge) => (
                  <div key={badge.id} className={`rounded-xl border p-4 text-center ${badge.color}`}>
                    <div className="text-3xl mb-2">{badge.emoji}</div>
                    <div className="font-bold text-sm mb-1">{badge.name}</div>
                    <div className="text-xs text-muted-foreground">{badge.desc}</div>
                  </div>
                ))}
              </div>
              <Button variant="outline" asChild className="mt-6">
                <Link href="/profile/achievements">View All Achievements <ChevronRight className="h-4 w-4" /></Link>
              </Button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
