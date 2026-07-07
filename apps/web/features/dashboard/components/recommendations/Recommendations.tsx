/**
 * @file features/dashboard/components/recommendations/Recommendations.tsx
 * @description AI-powered next-chapter recommendations for the student dashboard
 *
 * Shows personalized chapter recommendations based on:
 * - Current progress (which chapters are in-progress)
 * - Weak areas (low quiz scores in specific topics)
 * - Learning path continuity (next logical chapter)
 * - XP optimization (high-XP chapters the student hasn't tried)
 *
 * Used in: DashboardOverview
 * Data source: /api/learn/recommendations?userId=xxx (demo data used here)
 */

"use client"; // Client component — uses motion animations

import React from "react"; // React core
import Link from "next/link"; // Next.js client-side navigation
import { motion } from "framer-motion"; // Entry animations
import { ArrowRight, BookOpen, Code2, Brain, Zap, Sparkles, Star } from "lucide-react"; // Icons
import { Badge } from "@/components/ui/badge"; // Status badges

/* ─── Types ──────────────────────────────────────────────────────────────── */

/** Recommendation reason type — determines the badge shown */
type RecommendationReason = "next-up" | "weak-area" | "high-xp" | "trending" | "ai-pick";

/** A single chapter recommendation */
interface Recommendation {
  id:       string;              // Unique ID
  title:    string;              // Chapter / topic name
  subject:  string;              // Subject it belongs to (e.g., "Class 9 Mathematics")
  href:     string;              // Route to navigate to
  xp:       number;              // XP reward for completion
  duration: string;              // Estimated time (e.g., "30 min")
  reason:   RecommendationReason;// Why this was recommended
  icon:     React.ReactNode;     // Subject category icon
  iconBg:   string;              // Icon background color class
  iconColor:string;              // Icon text color class
  difficulty: "Easy" | "Medium" | "Hard"; // Chapter difficulty
}

/* ─── Demo Recommendations ───────────────────────────────────────────────── */
// In production: fetched from /api/learn/recommendations
const RECOMMENDATIONS: Recommendation[] = [
  {
    id:       "r1",
    title:    "Chapter 3: Polynomials",
    subject:  "Class 9 Mathematics",
    href:     "/learn/class-9/mathematics/chapter-03",
    xp:       50,
    duration: "35 min",
    reason:   "next-up",
    icon:     <BookOpen className="h-4 w-4" />,
    iconBg:   "bg-blue-500/10",
    iconColor:"text-blue-500",
    difficulty: "Medium",
  },
  {
    id:       "r2",
    title:    "Newton's Second Law of Motion",
    subject:  "Class 9 Physics",
    href:     "/learn/class-9/science/chapter-09",
    xp:       60,
    duration: "40 min",
    reason:   "ai-pick",
    icon:     <Zap className="h-4 w-4" />,
    iconBg:   "bg-orange-500/10",
    iconColor:"text-orange-500",
    difficulty: "Medium",
  },
  {
    id:       "r3",
    title:    "Day 5: Functions & Scope",
    subject:  "Python Programming",
    href:     "/programming/python/day-05",
    xp:       40,
    duration: "25 min",
    reason:   "next-up",
    icon:     <Code2 className="h-4 w-4" />,
    iconBg:   "bg-green-500/10",
    iconColor:"text-green-500",
    difficulty: "Easy",
  },
  {
    id:       "r4",
    title:    "Binary Search Trees",
    subject:  "Data Structures & Algorithms",
    href:     "/core-cs/dsa",
    xp:       80,
    duration: "50 min",
    reason:   "high-xp",
    icon:     <Brain className="h-4 w-4" />,
    iconBg:   "bg-purple-500/10",
    iconColor:"text-purple-500",
    difficulty: "Hard",
  },
];

/* ─── Reason Badge Config ─────────────────────────────────────────────────── */
// Maps recommendation reason to a display label + color
const REASON_CONFIG: Record<RecommendationReason, { label: string; className: string }> = {
  "next-up":   { label: "Next Up",     className: "border-blue-500/40 text-blue-600"   },
  "weak-area": { label: "Needs Work",  className: "border-red-500/40 text-red-600"     },
  "high-xp":   { label: "High XP",     className: "border-yellow-500/40 text-yellow-600"},
  "trending":  { label: "Trending",    className: "border-green-500/40 text-green-600"  },
  "ai-pick":   { label: "AI Pick ✨",  className: "border-brand-500/40 text-brand-600"  },
};

/* ─── Difficulty color ───────────────────────────────────────────────────── */
const DIFFICULTY_COLOR: Record<string, string> = {
  Easy:   "text-green-600",
  Medium: "text-yellow-600",
  Hard:   "text-red-600",
};

/* ─── Recommendations Component ──────────────────────────────────────────── */

/**
 * Renders a list of AI-personalized chapter recommendations.
 * Each card shows chapter name, XP reward, estimated duration, and reason.
 */
export function Recommendations() {
  return (
    <div className="rounded-2xl border bg-card p-5 shadow-sm">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-brand-500" /> {/* AI sparkle icon */}
          <h3 className="font-semibold text-foreground">Recommended for You</h3>
        </div>
        <Badge variant="outline" className="text-xs gap-1 border-brand-500/40 text-brand-600">
          <Sparkles className="h-2.5 w-2.5" />
          AI-powered
        </Badge>
      </div>

      {/* ── Recommendation Cards ────────────────────────────────────── */}
      <div className="space-y-3">
        {RECOMMENDATIONS.map((rec, i) => {
          const reasonConfig = REASON_CONFIG[rec.reason]; // Get reason badge config

          return (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0.01, y: 8 }} // Slide up entry
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.07 }}
            >
              {/* Recommendation card — links to the chapter */}
              <Link
                href={rec.href}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/60 transition-colors group border border-transparent hover:border-muted"
              >
                {/* Subject icon */}
                <div className={`flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-xl ${rec.iconBg} ${rec.iconColor}`}>
                  {rec.icon}
                </div>

                {/* Chapter info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground group-hover:text-brand-500 transition-colors truncate">
                    {rec.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{rec.subject}</p>

                  {/* Tags row */}
                  <div className="flex items-center gap-2 mt-1">
                    {/* Reason badge */}
                    <Badge variant="outline" className={`text-xs h-5 ${reasonConfig.className}`}>
                      {reasonConfig.label}
                    </Badge>
                    {/* Duration */}
                    <span className="text-xs text-muted-foreground">{rec.duration}</span>
                    {/* Difficulty */}
                    <span className={`text-xs font-medium ${DIFFICULTY_COLOR[rec.difficulty]}`}>
                      {rec.difficulty}
                    </span>
                  </div>
                </div>

                {/* XP reward */}
                <div className="flex-shrink-0 text-right">
                  <div className="flex items-center gap-0.5 text-yellow-600 text-sm font-semibold">
                    <Star className="h-3.5 w-3.5" />
                    {rec.xp}
                  </div>
                  <p className="text-xs text-muted-foreground">XP</p>
                </div>

                {/* Arrow indicator */}
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-brand-500 transition-colors flex-shrink-0" />
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
