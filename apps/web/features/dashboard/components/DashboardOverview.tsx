/**
 * @file features/dashboard/components/DashboardOverview.tsx
 * @description Main student dashboard overview for LearnVeda
 *
 * Shows:
 *  - Personalized welcome with XP level bar
 *  - Today's study streak
 *  - Progress summary (chapters completed, XP earned)
 *  - Quick-access study cards
 *  - Recent activity feed
 *  - Achievement badges
 *  - Recommended next chapters
 *
 * Works in both Clerk-auth mode and demo mode (userId="" for demo)
 */

"use client"; // Client component — uses state, effects, and browser APIs

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  BookOpen, Flame, Star, Zap, Trophy, Clock,
  TrendingUp, Target, ChevronRight, Calendar,
  Code2, Brain, BarChart3, Users, Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge"; // Status badge component

/* ─── Props ──────────────────────────────────────────────────────────────── */
interface DashboardOverviewProps {
  userId:   string; // Clerk user ID (empty string in demo mode)
  userName: string; // User's first name for greeting
}

/* ─── Demo Progress Data ─────────────────────────────────────────────────── */
// Used when no real user data is available — shows a realistic dashboard state
const DEMO_STATS = {
  xp:            1250,     // Total XP earned
  level:         5,        // Current level
  levelMaxXP:    1500,     // XP needed for level 6
  streak:        7,        // Current daily streak
  chaptersTotal: 14,       // Total chapters completed
  quizScore:     82,       // Average quiz score (%)
  battleWins:    3,        // Live battle wins this week
};

/* ─── Quick-action Study Cards ───────────────────────────────────────────── */
const STUDY_SHORTCUTS = [
  { href: "/learn/class-9",      icon: BookOpen, label: "Class 9",     color: "bg-blue-500/10 text-blue-500"   },
  { href: "/learn/class-10",     icon: BookOpen, label: "Class 10",    color: "bg-cyan-500/10 text-cyan-500"   },
  { href: "/programming/python", icon: Code2,    label: "Python",      color: "bg-green-500/10 text-green-500" },
  { href: "/core-cs/dsa",        icon: Brain,    label: "DSA",         color: "bg-purple-500/10 text-purple-500" },
  { href: "/live-battles",       icon: Zap,      label: "Live Battle", color: "bg-red-500/10 text-red-500"     },
  { href: "/ai-tutor",           icon: Sparkles, label: "AI Tutor",    color: "bg-brand-500/10 text-brand-500" },
];

/* ─── Recommended Chapters ───────────────────────────────────────────────── */
const RECOMMENDATIONS = [
  { title: "Chapter 3: Polynomials",          subject: "Class 9 Mathematics", xp: 50,  href: "/learn/class-9/mathematics/chapter-03" },
  { title: "Newton's Laws of Motion",          subject: "Class 9 Science",     xp: 60,  href: "/learn/class-9/science/chapter-09"     },
  { title: "Day 5: Functions in Python",       subject: "Python",              xp: 40,  href: "/programming/python/day-05"            },
  { title: "Binary Search Tree Operations",    subject: "DSA",                 xp: 80,  href: "/core-cs/dsa"                          },
];

/* ─── Recent Activity ────────────────────────────────────────────────────── */
const RECENT_ACTIVITY = [
  { text: "Completed Chapter 2: Polynomials", time: "2 hours ago", type: "chapter", xp: 50  },
  { text: "Won a Live Battle in Mathematics", time: "Yesterday",   type: "battle",  xp: 100 },
  { text: "Earned 'Week Warrior' badge",       time: "3 days ago", type: "badge",   xp: 0   },
  { text: "Completed Python Day 4",            time: "4 days ago", type: "chapter", xp: 40  },
];

/* ─── DashboardOverview Component ────────────────────────────────────────── */
export function DashboardOverview({ userName }: DashboardOverviewProps) {
  const stats = DEMO_STATS; // In production, replace with API call using userId
  const [activeTab, setActiveTab] = useState<"progress" | "activity" | "achievements">("progress");

  // XP progress percentage within current level
  const xpProgress = Math.round((stats.xp / stats.levelMaxXP) * 100);

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 md:px-6 py-8">
        {/* ── Welcome Header ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0.01, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                Welcome back, {userName}! 👋
              </h1>
              <p className="text-muted-foreground mt-1">
                You&apos;re on a <strong className="text-orange-500">{stats.streak}-day streak</strong>! Keep it up!
              </p>
            </div>
            {/* Streak badge */}
            <div className="flex items-center gap-2 rounded-2xl border bg-orange-500/10 px-4 py-2.5">
              <Flame className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-xs text-muted-foreground">Current Streak</p>
                <p className="font-bold text-orange-500 text-lg leading-none">{stats.streak} days 🔥</p>
              </div>
            </div>
          </div>

          {/* XP Progress bar */}
          <div className="mt-6 rounded-2xl border bg-card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-brand-500/10">
                  <Star className="h-4 w-4 text-brand-500" />
                </div>
                <span className="font-semibold text-foreground">Level {stats.level}</span>
                <Badge variant="secondary" className="text-xs">{stats.xp} XP</Badge>
              </div>
              <span className="text-sm text-muted-foreground">
                {stats.levelMaxXP - stats.xp} XP to Level {stats.level + 1}
              </span>
            </div>
            {/* XP progress bar */}
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${xpProgress}%` }}
                transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-brand-500 to-purple-500 rounded-full"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1.5 text-right">{xpProgress}%</p>
          </div>
        </motion.div>

        {/* ── Stats Grid ────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: BookOpen,    label: "Chapters Done", value: stats.chaptersTotal, color: "text-blue-500 bg-blue-500/10"   },
            { icon: TrendingUp,  label: "Quiz Average",  value: `${stats.quizScore}%`, color: "text-green-500 bg-green-500/10" },
            { icon: Trophy,      label: "Battles Won",   value: stats.battleWins,   color: "text-yellow-500 bg-yellow-500/10" },
            { icon: Zap,         label: "Total XP",      value: stats.xp,           color: "text-brand-500 bg-brand-500/10"  },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0.01, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl border bg-card p-4 shadow-sm"
            >
              <div className={`inline-flex p-2 rounded-lg ${stat.color} mb-3`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* ── Study shortcuts ─────────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick access */}
            <div className="rounded-2xl border bg-card p-6 shadow-sm">
              <h2 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <Target className="h-5 w-5 text-brand-500" />
                Study Now
              </h2>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {STUDY_SHORTCUTS.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl ${s.color.split(" ").slice(0,1)} hover:opacity-80 transition-opacity text-center border`}
                  >
                    <s.icon className={`h-6 w-6 ${s.color.split(" ").slice(1)}`} />
                    <span className="text-xs font-medium text-foreground">{s.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recommended chapters */}
            <div className="rounded-2xl border bg-card p-6 shadow-sm">
              <h2 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-brand-500" />
                Continue Learning
              </h2>
              <div className="space-y-3">
                {RECOMMENDATIONS.map((rec) => (
                  <Link
                    key={rec.href}
                    href={rec.href}
                    className="flex items-center justify-between p-4 rounded-xl border hover:border-brand-500/50 hover:bg-brand-500/5 transition-colors group"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground group-hover:text-brand-500 transition-colors">
                        {rec.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">{rec.subject}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">+{rec.xp} XP</Badge>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-brand-500 transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right sidebar ─────────────────────────────────────────────── */}
          <div className="space-y-6">
            {/* Tab switcher */}
            <div className="rounded-2xl border bg-card shadow-sm overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b">
                {(["progress", "activity", "achievements"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-3 text-xs font-medium capitalize transition-colors ${
                      activeTab === tab
                        ? "text-brand-500 border-b-2 border-brand-500 bg-brand-500/5"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <div className="p-4">
                {activeTab === "activity" && (
                  <div className="space-y-3">
                    {RECENT_ACTIVITY.map((item, i) => (
                      <div key={i} className="flex items-start gap-3 py-2 border-b last:border-0">
                        <div className={`p-1.5 rounded-lg mt-0.5 ${
                          item.type === "battle" ? "bg-red-500/10 text-red-500" :
                          item.type === "badge"  ? "bg-yellow-500/10 text-yellow-500" :
                          "bg-brand-500/10 text-brand-500"
                        }`}>
                          {item.type === "battle" ? <Zap className="h-3.5 w-3.5" /> :
                           item.type === "badge"  ? <Trophy className="h-3.5 w-3.5" /> :
                           <BookOpen className="h-3.5 w-3.5" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-foreground leading-tight">{item.text}</p>
                          <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {item.time}
                            {item.xp > 0 && <span className="text-brand-500 ml-1">+{item.xp} XP</span>}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "progress" && (
                  <div className="space-y-4">
                    {[
                      { label: "Mathematics",  progress: 65, color: "bg-blue-500"   },
                      { label: "Physics",       progress: 42, color: "bg-green-500"  },
                      { label: "Python",        progress: 28, color: "bg-yellow-500" },
                      { label: "DSA",           progress: 15, color: "bg-purple-500" },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-foreground font-medium">{item.label}</span>
                          <span className="text-muted-foreground">{item.progress}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.progress}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "achievements" && (
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { emoji: "🔥", label: "7 Day Streak"  },
                      { emoji: "⚔️", label: "Battle Win"   },
                      { emoji: "📚", label: "10 Chapters"   },
                      { emoji: "🏆", label: "Top 100"       },
                      { emoji: "⚡", label: "Speed Learner" },
                      { emoji: "🎯", label: "Perfect Score" },
                    ].map((badge) => (
                      <div key={badge.label} className="flex flex-col items-center gap-1.5 p-2 rounded-xl border bg-muted/30 text-center">
                        <span className="text-2xl">{badge.emoji}</span>
                        <span className="text-xs text-muted-foreground leading-tight">{badge.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Calendar stub */}
            <div className="rounded-2xl border bg-card p-5 shadow-sm">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-brand-500" />
                Study Calendar
              </h3>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 28 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-6 w-full rounded ${
                      i < 7  ? "bg-brand-500 opacity-80" :          // Last week — studied
                      i < 14 ? "bg-brand-500/40" :                  // Week before
                      i < 17 ? "bg-brand-500/20" :                  // Partial
                      "bg-muted"                                     // No activity
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">Last 4 weeks</p>
            </div>

            {/* Dashboard links */}
            <div className="rounded-2xl border bg-card p-4 shadow-sm">
              <h3 className="font-semibold text-foreground mb-3">Dashboard</h3>
              {[
                { href: "/dashboard/progress",      icon: BarChart3, label: "My Progress"   },
                { href: "/dashboard/achievements",   icon: Trophy,    label: "Achievements"  },
                { href: "/dashboard/certificates",   icon: Star,      label: "Certificates"  },
                { href: "/dashboard/analytics",      icon: TrendingUp,label: "Analytics"     },
                { href: "/dashboard/settings",       icon: Users,     label: "Settings"      },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                  <ChevronRight className="h-3.5 w-3.5 ml-auto" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
