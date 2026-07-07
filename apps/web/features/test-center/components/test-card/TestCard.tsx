/**
 * @file features/test-center/components/test-card/TestCard.tsx
 * @description Individual mock test card for the Test Center page
 *
 * Displays one test/exam option with:
 * - Test name + exam category
 * - Question count + time limit
 * - Number of students who have taken it
 * - Difficulty badge
 * - Start test CTA button
 * - Optional: user's last attempt score
 *
 * Used in: TestCenterPage, individual category sections
 */

"use client"; // Client component — uses state for hover animation

import React from "react"; // React core
import Link from "next/link"; // Navigation
import { motion } from "framer-motion"; // Hover scale animation
import {
  Clock, Users, FileText, ArrowRight, Star, CheckCircle2,
} from "lucide-react"; // Icons
import { Badge }  from "@/components/ui/badge";  // Category badge
import { Button } from "@/components/ui/button"; // CTA button

/* ─── Types ──────────────────────────────────────────────────────────────── */

/** Difficulty level for color coding */
type DifficultyLevel = "Easy" | "Medium" | "Hard" | "Expert";

/** A single test's data */
export interface TestCardData {
  id:           string;          // Unique test ID
  name:         string;          // Test display name
  category:     string;          // Category (e.g., "CBSE Board", "JEE / NEET")
  questions:    number;          // Number of questions
  timeMinutes:  number;          // Time limit in minutes
  takers:       number;          // Total students who took this test
  difficulty:   DifficultyLevel; // Difficulty classification
  href:         string;          // Route to start the test
  lastScore?:   number;          // User's last attempt score (0–100), undefined if never taken
  isPremium?:   boolean;         // Whether this is a Pro-only test
}

/* ─── Difficulty Color Map ───────────────────────────────────────────────── */
const DIFFICULTY_STYLES: Record<DifficultyLevel, string> = {
  Easy:   "border-green-500/40 text-green-600",
  Medium: "border-yellow-500/40 text-yellow-600",
  Hard:   "border-orange-500/40 text-orange-600",
  Expert: "border-red-500/40 text-red-600",
};

/* ─── TestCard Component ─────────────────────────────────────────────────── */

/**
 * Renders a mock test card with exam details and a start button.
 *
 * @param test  - Test data to display
 * @param index - Position for stagger animation
 */
export function TestCard({ test, index = 0 }: { test: TestCardData; index?: number }) {
  // Format taker count (e.g., 1200 → "1.2K")
  const formatTakers = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}K` : n.toString();

  return (
    <motion.div
      initial={{ opacity: 0.01, y: 10 }} // Entry slide-up animation
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.06 }}
      whileHover={{ y: -2 }} // Slight lift on hover
      className="rounded-2xl border bg-card p-5 shadow-sm hover:shadow-md transition-all group"
    >
      {/* ── Header: test name + badges ─────────────────────────────── */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-start gap-2.5">
          {/* File icon */}
          <div className="flex-shrink-0 flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500/10 text-brand-500">
            <FileText className="h-4.5 w-4.5" />
          </div>
          {/* Test name */}
          <div>
            <h3 className="font-semibold text-foreground text-sm group-hover:text-brand-500 transition-colors leading-tight">
              {test.name}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">{test.category}</p>
          </div>
        </div>

        {/* Premium badge (if applicable) */}
        {test.isPremium && (
          <Badge variant="outline" className="border-amber-500/40 text-amber-600 h-5 text-xs flex-shrink-0">
            <Star className="h-2.5 w-2.5 mr-1" /> Pro
          </Badge>
        )}
      </div>

      {/* ── Stats row ──────────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-3 mb-3">
        {/* Question count */}
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <FileText className="h-3.5 w-3.5" />
          {test.questions} questions
        </div>
        {/* Time limit */}
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          {test.timeMinutes >= 60
            ? `${test.timeMinutes / 60}h`
            : `${test.timeMinutes} min`
          }
        </div>
        {/* Takers count */}
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Users className="h-3.5 w-3.5" />
          {formatTakers(test.takers)} taken
        </div>
      </div>

      {/* ── Difficulty + last score ─────────────────────────────────── */}
      <div className="flex items-center justify-between mb-4">
        {/* Difficulty badge */}
        <Badge variant="outline" className={`text-xs ${DIFFICULTY_STYLES[test.difficulty]}`}>
          {test.difficulty}
        </Badge>

        {/* Last attempt score (if taken before) */}
        {test.lastScore !== undefined && (
          <div className="flex items-center gap-1 text-xs">
            <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
            <span className="text-muted-foreground">Last: </span>
            <span className={`font-semibold ${test.lastScore >= 70 ? "text-green-600" : "text-orange-600"}`}>
              {test.lastScore}%
            </span>
          </div>
        )}
      </div>

      {/* ── CTA button ─────────────────────────────────────────────── */}
      <Link href={test.href}>
        <Button className="w-full gap-1.5" size="sm" variant={test.isPremium ? "outline" : "default"}>
          {test.isPremium ? "Unlock Test" : "Start Test"}
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </Link>
    </motion.div>
  );
}
