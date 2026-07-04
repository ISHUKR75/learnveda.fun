/**
 * @file features/dashboard/components/DashboardOverview.tsx
 * @description Main dashboard overview component for LearnVeda
 * Shows greeting, quick stats, recent activity, progress rings, and recommended content
 * This is the first page a logged-in student sees
 */

"use client"; // Client component — uses hooks and interactivity

import React, { useState } from "react";          // React + state
import { motion } from "framer-motion";            // Entry animations
import {
  BookOpen, Zap, Trophy, Flame, Target, Clock,
  TrendingUp, Star, Play, ChevronRight, Bell,
  Calendar, Award, BarChart3,
} from "lucide-react";                             // Icons
import Link from "next/link";                     // Navigation
import { Button } from "@/components/ui/button"; // Button component
import { Badge }  from "@/components/ui/badge";  // Badge component
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Card components

/* ─── Props Interface ────────────────────────────────────────────────────── */
interface DashboardOverviewProps {
  userId:   string; // Clerk user ID for API calls
  userName: string; // Display name for personalized greeting
}

/* ─── Mock Dashboard Data (replace with real API calls in production) ──────── */
const mockStats = {
  xp:              2450,       // Total XP earned
  level:           12,         // Current level
  xpToNext:        350,        // XP needed for next level
  streak:          7,          // Current daily streak (days)
  longestStreak:   21,         // All-time longest streak
  chaptersCompleted: 34,       // Total chapters finished
  practiceScore:   87,         // Average practice score %
  rank:            "#342",     // Global leaderboard rank
  battlesWon:      18,         // Live battles won
  certificatesEarned: 2,       // Certificates earned
};

/* ─── Recent Activity ────────────────────────────────────────────────────── */
const recentActivity = [
  { type: "chapter", label: "Newton's Laws — Physics",     time: "2 hours ago",   xp: +30  },
  { type: "battle",  label: "Won 1v1 DSA battle",          time: "5 hours ago",   xp: +50  },
  { type: "quiz",    label: "Class 10 Math Quiz — 92%",    time: "Yesterday",     xp: +20  },
  { type: "chapter", label: "Python Day 12 — OOP Basics",  time: "2 days ago",    xp: +25  },
];

/* ─── Recommended Content ────────────────────────────────────────────────── */
const recommended = [
  { title: "Class 11 Physics — Ch. 7 Gravitation",   type: "Chapter",   href: "/learn/class-11/physics/ch-7", emoji: "🌍" },
  { title: "Python Day 13 — File Handling",           type: "Programming", href: "/learn/programming/python/day-13", emoji: "🐍" },
  { title: "DSA — Binary Trees Deep Dive",            type: "Core CS",   href: "/learn/core-cs/dsa/binary-trees", emoji: "🌳" },
  { title: "Practice — Class 11 Math",                type: "Practice",  href: "/practice/class-11/math", emoji: "📐" },
];

/* ─── Dashboard Overview Component ───────────────────────────────────────── */
export function DashboardOverview({ userId, userName }: DashboardOverviewProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "progress" | "activity">("overview");

  // XP progress percentage toward next level
  const xpProgress = Math.round((mockStats.xp % 500) / 500 * 100);

  return (
    <div className="container px-4 md:px-6 py-8 space-y-8">

      {/* ── Welcome Header ──────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <p className="text-muted-foreground text-sm">Welcome back,</p>
          <h1 className="text-2xl md:text-3xl font-extrabold">
            {userName} 👋
          </h1>
          <div className="flex items-center gap-3 mt-1">
            <Badge variant="gradient" className="text-xs">
              Level {mockStats.level}
            </Badge>
            <span className="flex items-center gap-1 text-orange-500 font-semibold text-sm">
              <Flame className="h-4 w-4" />
              {mockStats.streak} day streak
            </span>
          </div>
        </div>

        {/* Quick actions */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/live-battles">
              <Zap className="h-4 w-4" />
              Battle Now
            </Link>
          </Button>
          <Button variant="gradient" size="sm" asChild>
            <Link href="/explore">
              <Play className="h-4 w-4" />
              Continue Learning
            </Link>
          </Button>
        </div>
      </motion.div>

      {/* ── Quick Stats Grid ─────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total XP",        value: mockStats.xp.toLocaleString(), icon: <Star    className="h-5 w-5" />, color: "text-yellow-500 bg-yellow-500/10", suffix: "XP" },
          { label: "Streak",          value: mockStats.streak,              icon: <Flame   className="h-5 w-5" />, color: "text-orange-500 bg-orange-500/10", suffix: "days" },
          { label: "Chapters Done",   value: mockStats.chaptersCompleted,   icon: <BookOpen className="h-5 w-5" />, color: "text-blue-500 bg-blue-500/10",   suffix: "" },
          { label: "Global Rank",     value: mockStats.rank,                icon: <Trophy  className="h-5 w-5" />, color: "text-purple-500 bg-purple-500/10", suffix: "" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
          >
            <Card className="text-center p-4">
              <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${stat.color} mx-auto mb-2`}>
                {stat.icon}
              </div>
              <p className="text-2xl font-extrabold">{stat.value}{stat.suffix && <span className="text-sm text-muted-foreground ml-1">{stat.suffix}</span>}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* ── XP Progress Bar ──────────────────────────────────────────── */}
      <Card>
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500/10 text-brand-500">
                <TrendingUp className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold">Level {mockStats.level} → Level {mockStats.level + 1}</p>
                <p className="text-xs text-muted-foreground">{mockStats.xpToNext} XP to next level</p>
              </div>
            </div>
            <span className="text-sm font-bold text-brand-500">{xpProgress}%</span>
          </div>
          {/* Progress bar */}
          <div className="h-3 rounded-full bg-muted overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${xpProgress}%` }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-brand-500 to-purple-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* ── Main Content Grid ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ── Recommended Learning (2 cols) ─────────────────────────── */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Target className="h-4 w-4 text-brand-500" />
              Continue Where You Left Off
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recommended.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="flex items-center gap-3 rounded-xl border bg-muted/30 p-3 hover:bg-muted/60 hover:border-brand-500/30 transition-all group"
              >
                <span className="text-2xl">{item.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate group-hover:text-brand-500 transition-colors">
                    {item.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.type}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-brand-500 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </CardContent>
        </Card>

        {/* ── Recent Activity (1 col) ────────────────────────────────── */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Clock className="h-4 w-4 text-brand-500" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivity.map((activity, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="h-2 w-2 rounded-full bg-brand-500 mt-1.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate">{activity.label}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
                <span className="text-xs font-bold text-green-500 whitespace-nowrap">{activity.xp > 0 ? "+" : ""}{activity.xp} XP</span>
              </div>
            ))}

            {/* View all link */}
            <Link href="/dashboard/history" className="flex items-center gap-1 text-xs text-brand-500 hover:underline mt-2">
              View all activity <ChevronRight className="h-3 w-3" />
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* ── Quick Navigation Links ────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "My Progress",   href: "/dashboard/progress",     icon: <BarChart3  className="h-5 w-5" />, color: "text-blue-500"   },
          { label: "Certificates",  href: "/dashboard/certificates",  icon: <Award      className="h-5 w-5" />, color: "text-yellow-500" },
          { label: "Calendar",      href: "/dashboard/calendar",      icon: <Calendar   className="h-5 w-5" />, color: "text-green-500"  },
          { label: "Notifications", href: "/dashboard/notifications", icon: <Bell       className="h-5 w-5" />, color: "text-purple-500" },
        ].map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex flex-col items-center gap-2 rounded-xl border bg-card p-4 text-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className={item.color}>{item.icon}</div>
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
