/**
 * @file features/gamification/components/StreakDisplay.tsx
 * @description Study streak display component for LearnVeda gamification
 * @purpose Shows current streak, longest streak, weekly calendar, and risk warning
 * @used-by Dashboard overview, Profile page, Navbar (compact flame icon)
 *
 * Streak rules:
 *  - A streak day is earned by completing at least 1 lesson or quiz
 *  - Missing a day resets the streak to 0
 *  - "At risk" state: last activity was yesterday and today is not yet complete
 */

"use client"; // Client component — needs date calculations at runtime

import React, { useMemo } from "react";         // React core
import { motion }         from "framer-motion"; // Entry animations
import { Flame, Calendar, TrendingUp, AlertTriangle, CheckCircle2, Circle } from "lucide-react"; // Icons
import { cn }             from "@/lib/utils";   // Class merger utility
import { format, subDays, isToday, isYesterday, startOfWeek, addDays } from "date-fns"; // Date helpers

/* ─── Streak Props ───────────────────────────────────────────────────────── */
interface StreakDisplayProps {
  /** Current consecutive day streak */
  currentStreak: number;
  /** All-time longest streak */
  longestStreak: number;
  /** Whether the user has completed today's activity */
  completedToday: boolean;
  /** Whether streak is at risk (active yesterday, not yet today) */
  isAtRisk: boolean;
  /** Dates (ISO strings) when the user was active — for weekly calendar */
  activeDates?: string[];
  /** Compact mode: just the flame + number */
  compact?: boolean;
  /** Custom CSS class */
  className?: string;
}

/* ─── Streak Color Helper ────────────────────────────────────────────────── */
/**
 * Returns the flame color CSS class based on streak length.
 * Longer streaks = more intense colors.
 */
function flameColor(streak: number): string {
  if (streak >= 100) return "text-red-500";      // Legendary — red flame
  if (streak >= 30)  return "text-orange-500";   // Month+ — orange
  if (streak >= 7)   return "text-amber-500";    // Week+ — amber
  if (streak >= 3)   return "text-yellow-500";   // Few days — yellow
  return "text-muted-foreground";                // Just started — grey
}

/* ─── Streak Display Component ───────────────────────────────────────────── */
/**
 * Full streak display with:
 *  - Animated flame + current streak number
 *  - 7-day mini calendar (current week)
 *  - Longest streak stat
 *  - "At risk" warning if needed
 */
export function StreakDisplay({
  currentStreak,
  longestStreak,
  completedToday,
  isAtRisk,
  activeDates = [],
  compact = false,
  className,
}: StreakDisplayProps) {

  /* ── Build 7-day calendar for the current week ─────────────────────── */
  const weekDays = useMemo(() => {
    const today     = new Date();
    const weekStart = startOfWeek(today, { weekStartsOn: 1 }); // Week starts Monday
    const activeDateSet = new Set(activeDates);                 // Fast lookup

    return Array.from({ length: 7 }, (_, i) => {
      const date      = addDays(weekStart, i);                  // Mon to Sun
      const isoDate   = format(date, "yyyy-MM-dd");             // "2026-07-07"
      const isActive  = activeDateSet.has(isoDate);             // Was there activity?
      const isTodayDate = isToday(date);
      const isFuture  = date > today;                           // Future days — greyed out
      return { date, isoDate, isActive, isToday: isTodayDate, isFuture };
    });
  }, [activeDates]);                                            // Recompute when dates change

  /* ── Compact Mode — just flame + number ───────────────────────────── */
  if (compact) {
    return (
      <div className={cn("flex items-center gap-1", className)}>
        <Flame className={cn("h-4 w-4", flameColor(currentStreak))} />
        <span className="text-sm font-bold">{currentStreak}</span>
      </div>
    );
  }

  return (
    <div className={cn("rounded-2xl border bg-card p-5 shadow-sm", className)}>
      {/* ── At-risk warning banner ─────────────────────────────────── */}
      {isAtRisk && (
        <motion.div
          initial={{ opacity: 0.01, height: 0 }}    // Slides down from above
          animate={{ opacity: 1, height: "auto" }}
          className="mb-4 flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2.5 text-sm text-amber-600 dark:text-amber-400"
        >
          <AlertTriangle className="h-4 w-4 shrink-0" />  {/* Warning icon */}
          <span>
            Your streak is at risk! Complete a lesson today to keep your{" "}
            <strong>{currentStreak}-day streak</strong>.
          </span>
        </motion.div>
      )}

      {/* ── Main streak display ────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-5">
        {/* Left: animated flame + streak number */}
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}      // Pulse animation for the flame
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 border border-orange-500/20"
          >
            <Flame className={cn("h-8 w-8", flameColor(currentStreak))} />
          </motion.div>

          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold tabular-nums">{currentStreak}</span>
              <span className="text-muted-foreground text-sm">days</span>
            </div>
            <div className="text-muted-foreground text-sm">Current Streak</div>
          </div>
        </div>

        {/* Right: longest streak stat */}
        <div className="text-right">
          <div className="flex items-center gap-1 justify-end text-muted-foreground text-sm mb-0.5">
            <TrendingUp className="h-3.5 w-3.5" />  {/* Trend icon */}
            Best Streak
          </div>
          <div className="text-xl font-bold">{longestStreak} days</div>
        </div>
      </div>

      {/* ── 7-day calendar ────────────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
          <Calendar className="h-3.5 w-3.5" />   {/* Calendar icon */}
          This week
        </div>

        {/* Day grid: Mon → Sun */}
        <div className="grid grid-cols-7 gap-1.5">
          {weekDays.map(({ date, isActive, isToday: todayDay, isFuture }) => {
            const dayLabel = format(date, "EEE"); // "Mon", "Tue", ...

            return (
              <div key={format(date, "yyyy-MM-dd")} className="flex flex-col items-center gap-1">
                {/* Day label */}
                <span className={cn(
                  "text-xs",
                  todayDay ? "font-bold text-foreground" : "text-muted-foreground",
                )}>
                  {dayLabel}
                </span>

                {/* Activity indicator circle */}
                <div className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors",
                  isFuture
                    ? "border-border/30 bg-background opacity-30"         // Future: dim
                    : isActive || (todayDay && completedToday)
                    ? "border-amber-500 bg-amber-500/20"                  // Active: amber
                    : todayDay
                    ? "border-brand-500 bg-brand-500/10 border-dashed"   // Today, not done: dashed
                    : "border-border/50 bg-muted/30",                     // Past inactive: grey
                )}>
                  {(isActive || (todayDay && completedToday)) && !isFuture
                    ? <Flame className="h-4 w-4 text-amber-500" />         // Active: flame
                    : todayDay && !completedToday
                    ? <Circle className="h-3 w-3 text-brand-500" />       // Today: ring
                    : null
                  }
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Today status message ──────────────────────────────────── */}
      <div className={cn(
        "mt-4 flex items-center gap-2 rounded-xl px-3 py-2 text-sm",
        completedToday
          ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
          : "bg-muted/50 border border-border text-muted-foreground",
      )}>
        {completedToday
          ? <CheckCircle2 className="h-4 w-4 shrink-0" />                // Completed checkmark
          : <Circle       className="h-4 w-4 shrink-0" />                // Not completed ring
        }
        <span>
          {completedToday
            ? "Today's activity done! Streak maintained. 🔥"             // Success message
            : "Complete a lesson today to maintain your streak."         // Reminder message
          }
        </span>
      </div>
    </div>
  );
}
