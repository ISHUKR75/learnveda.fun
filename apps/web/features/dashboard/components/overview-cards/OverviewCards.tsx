/**
 * @file features/dashboard/components/overview-cards/OverviewCards.tsx
 * @description Dashboard overview stat cards — XP, Streak, Chapters, Quiz Score
 *
 * Shows key performance metrics at a glance using animated count-up cards.
 * Each card has an icon, label, value, and trend indicator.
 *
 * Used in: DashboardOverview
 * Dependencies: framer-motion, lucide-react, @/components/ui/badge
 */

"use client"; // Client component — uses animations

import React from "react"; // React core
import { motion } from "framer-motion"; // Entry animations
import { Flame, Star, BookOpen, Trophy, Zap, TrendingUp, Target } from "lucide-react"; // Icons
import { Badge } from "@/components/ui/badge"; // UI badge

/* ─── Types ──────────────────────────────────────────────────────────────── */

/** Props for the OverviewCards component */
interface OverviewCardsProps {
  xp:            number; // Total XP earned by the user
  level:         number; // Current level
  streak:        number; // Daily streak count
  chaptersTotal: number; // Total chapters completed
  quizScore:     number; // Average quiz score (0–100)
  battleWins:    number; // Battle wins this week
}

/* ─── Animation Variant ──────────────────────────────────────────────────── */
// Staggered entry animation for each card
const cardVariant = {
  hidden:  { opacity: 0.01, y: 16 }, // Start nearly invisible and slightly below
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ─── OverviewCards Component ────────────────────────────────────────────── */

/**
 * Renders a grid of stat cards showing the student's key metrics.
 *
 * @param props - Student statistics to display
 */
export function OverviewCards({
  xp, level, streak, chaptersTotal, quizScore, battleWins,
}: OverviewCardsProps) {

  // Define each stat card's content and style
  const cards = [
    {
      icon:  <Star className="h-5 w-5" />,      // XP icon
      label: "Total XP",
      value: xp.toLocaleString(),               // Format with commas
      sub:   `Level ${level}`,                  // Current level
      color: "text-yellow-500",                  // Icon color
      bg:    "bg-yellow-500/10",                 // Icon background
      trend: "+250 this week",                   // Recent trend
      trendUp: true,                             // Positive trend
    },
    {
      icon:  <Flame className="h-5 w-5" />,     // Streak icon
      label: "Day Streak",
      value: `${streak}d`,                      // Streak in days
      sub:   streak >= 7 ? "🔥 On Fire!" : "Keep going!", // Motivational sub-text
      color: "text-orange-500",
      bg:    "bg-orange-500/10",
      trend: "Best: 21 days",
      trendUp: true,
    },
    {
      icon:  <BookOpen className="h-5 w-5" />,  // Chapters icon
      label: "Chapters Done",
      value: chaptersTotal.toString(),           // Total chapters completed
      sub:   "500+ available",                   // Context for progress
      color: "text-blue-500",
      bg:    "bg-blue-500/10",
      trend: "+3 this week",
      trendUp: true,
    },
    {
      icon:  <Target className="h-5 w-5" />,   // Quiz score icon
      label: "Avg Quiz Score",
      value: `${quizScore}%`,                   // Percentage score
      sub:   quizScore >= 80 ? "Excellent!" : quizScore >= 60 ? "Good" : "Keep practicing",
      color: "text-green-500",
      bg:    "bg-green-500/10",
      trend: "+5% vs last week",
      trendUp: true,
    },
    {
      icon:  <Zap className="h-5 w-5" />,      // Battle icon
      label: "Battle Wins",
      value: battleWins.toString(),             // Wins this week
      sub:   "This week",                       // Time period
      color: "text-purple-500",
      bg:    "bg-purple-500/10",
      trend: "Win rate: 67%",
      trendUp: true,
    },
    {
      icon:  <Trophy className="h-5 w-5" />,   // Trophy icon
      label: "Achievements",
      value: "12",                              // Total achievements
      sub:   "3 new this month",               // Recent unlocks
      color: "text-amber-500",
      bg:    "bg-amber-500/10",
      trend: "Top 15% overall",
      trendUp: true,
    },
  ];

  return (
    // Responsive 2-column (mobile) → 3-column (desktop) grid
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
      {cards.map((card, i) => (
        <motion.div
          key={card.label}
          custom={i}                      // Pass index for stagger delay
          variants={cardVariant}
          initial="hidden"
          animate="visible"
          className="rounded-2xl border bg-card p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          {/* Card icon */}
          <div className={`inline-flex p-2 rounded-xl ${card.bg} ${card.color} mb-3`}>
            {card.icon}
          </div>

          {/* Value + label */}
          <p className="text-2xl font-bold text-foreground tabular-nums">{card.value}</p>
          <p className="text-xs font-medium text-muted-foreground mt-0.5">{card.label}</p>

          {/* Sub-text */}
          <p className="text-xs text-muted-foreground mt-1">{card.sub}</p>

          {/* Trend indicator */}
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp className="h-3 w-3 text-green-500" /> {/* Trend arrow */}
            <span className="text-xs text-green-600">{card.trend}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
