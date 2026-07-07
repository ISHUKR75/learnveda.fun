/**
 * @file features/dashboard/components/recent-activity/RecentActivity.tsx
 * @description Recent activity feed for the student dashboard
 *
 * Shows a chronological list of the student's recent learning actions:
 * - Chapter completions
 * - Quiz results
 * - Battle outcomes
 * - Achievements unlocked
 * - Streak milestones
 *
 * Used in: DashboardOverview > Activity tab
 * Data source: In production, fetched from /api/progress?userId=xxx&type=activity
 */

"use client"; // Client component — uses motion animations

import React from "react"; // React core
import { motion } from "framer-motion"; // Entry animations
import {
  BookOpen, Zap, Trophy, Flame, Star, MessageSquare,
  CheckCircle2, Code2, Brain,
} from "lucide-react"; // Activity type icons
import { Badge } from "@/components/ui/badge"; // XP badge

/* ─── Types ──────────────────────────────────────────────────────────────── */

/** All possible activity types */
type ActivityType = "chapter" | "battle" | "badge" | "streak" | "quiz" | "community" | "coding";

/** A single activity entry */
interface ActivityEntry {
  id:     string;       // Unique ID for React key
  type:   ActivityType; // Determines icon and color
  text:   string;       // Description of what happened
  time:   string;       // Relative time (e.g., "2 hours ago")
  xp:     number;       // XP earned (0 if none)
  detail?: string;      // Optional extra detail
}

/* ─── Demo Activity Data ─────────────────────────────────────────────────── */
// Realistic activity feed showing various event types
// In production: replace with API response
const DEMO_ACTIVITY: ActivityEntry[] = [
  {
    id:     "a1",
    type:   "chapter",
    text:   "Completed Chapter 2: Polynomials",
    time:   "2 hours ago",
    xp:     50,
    detail: "Class 9 Mathematics",
  },
  {
    id:     "a2",
    type:   "quiz",
    text:   "Scored 88% on Newton's Laws Quiz",
    time:   "3 hours ago",
    xp:     30,
    detail: "10 correct out of 12 questions",
  },
  {
    id:     "a3",
    type:   "battle",
    text:   "Won a Live Battle in Mathematics",
    time:   "Yesterday",
    xp:     100,
    detail: "vs Rohan K. — Score: 8-5",
  },
  {
    id:     "a4",
    type:   "badge",
    text:   "Earned 'Week Warrior' badge",
    time:   "Yesterday",
    xp:     0,
    detail: "7-day study streak completed",
  },
  {
    id:     "a5",
    type:   "coding",
    text:   "Completed Python Day 4: Lists & Tuples",
    time:   "2 days ago",
    xp:     40,
    detail: "All 5 exercises passed",
  },
  {
    id:     "a6",
    type:   "streak",
    text:   "Achieved a 7-day study streak!",
    time:   "2 days ago",
    xp:     75,
    detail: "Keep the flame alive!",
  },
  {
    id:     "a7",
    type:   "community",
    text:   "Your answer was marked as best answer",
    time:   "3 days ago",
    xp:     20,
    detail: "Question: Quadratic formula explanation",
  },
  {
    id:     "a8",
    type:   "chapter",
    text:   "Completed Chapter 1: Number Systems",
    time:   "4 days ago",
    xp:     50,
    detail: "Class 9 Mathematics",
  },
];

/* ─── Activity Icon Map ───────────────────────────────────────────────────── */
// Maps activity type to the correct icon + color
const ACTIVITY_ICONS: Record<ActivityType, { icon: React.ReactNode; bg: string; color: string }> = {
  chapter:   { icon: <BookOpen  className="h-4 w-4" />, bg: "bg-blue-500/10",   color: "text-blue-500"   },
  battle:    { icon: <Zap       className="h-4 w-4" />, bg: "bg-purple-500/10", color: "text-purple-500" },
  badge:     { icon: <Trophy    className="h-4 w-4" />, bg: "bg-amber-500/10",  color: "text-amber-500"  },
  streak:    { icon: <Flame     className="h-4 w-4" />, bg: "bg-orange-500/10", color: "text-orange-500" },
  quiz:      { icon: <Star      className="h-4 w-4" />, bg: "bg-green-500/10",  color: "text-green-500"  },
  community: { icon: <MessageSquare className="h-4 w-4" />, bg: "bg-teal-500/10", color: "text-teal-500" },
  coding:    { icon: <Code2     className="h-4 w-4" />, bg: "bg-indigo-500/10", color: "text-indigo-500" },
};

/* ─── RecentActivity Component ───────────────────────────────────────────── */

/**
 * Renders the chronological activity feed for the dashboard.
 * Shows last 8 learning actions with XP earned.
 */
export function RecentActivity() {
  return (
    <div className="rounded-2xl border bg-card p-5 shadow-sm">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-brand-500" />
          <h3 className="font-semibold text-foreground">Recent Activity</h3>
        </div>
        <span className="text-xs text-muted-foreground">Last 7 days</span>
      </div>

      {/* ── Activity Feed ──────────────────────────────────────────── */}
      <div className="space-y-3">
        {DEMO_ACTIVITY.map((entry, i) => {
          const iconConfig = ACTIVITY_ICONS[entry.type]; // Get icon + color for type

          return (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0.01, x: -12 }} // Slide in from left
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="flex items-start gap-3 group"
            >
              {/* Activity type icon */}
              <div className={`flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-xl ${iconConfig.bg} ${iconConfig.color} mt-0.5`}>
                {iconConfig.icon}
              </div>

              {/* Activity text + detail */}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground font-medium leading-tight">{entry.text}</p>
                {entry.detail && (
                  <p className="text-xs text-muted-foreground mt-0.5">{entry.detail}</p>
                )}
                <p className="text-xs text-muted-foreground mt-1">{entry.time}</p>
              </div>

              {/* XP earned badge (if applicable) */}
              {entry.xp > 0 && (
                <div className="flex-shrink-0">
                  <Badge variant="outline" className="text-xs text-yellow-600 border-yellow-500/40 gap-0.5">
                    <Star className="h-2.5 w-2.5" />
                    +{entry.xp} XP
                  </Badge>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* ── Load More ──────────────────────────────────────────────── */}
      <button className="w-full mt-4 text-xs text-muted-foreground hover:text-brand-500 transition-colors py-2 border-t">
        View full activity history →
      </button>
    </div>
  );
}
