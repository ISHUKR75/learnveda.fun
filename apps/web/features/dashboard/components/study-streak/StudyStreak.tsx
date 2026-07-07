/**
 * @file features/dashboard/components/study-streak/StudyStreak.tsx
 * @description 52-week study activity heatmap + streak calendar for the dashboard
 *
 * Renders a GitHub-style contribution graph showing daily study activity.
 * Each cell represents one day; color intensity shows hours studied.
 *
 * Design: 5 intensity levels (0 = none, 4 = 4+ hours)
 * Layout: 52 weeks × 7 days = 364 days of history
 *
 * Used in: DashboardOverview > Progress tab
 */

"use client"; // Client component — uses state for tooltip

import React, { useState } from "react"; // React + state hook
import { Flame, Calendar, TrendingUp } from "lucide-react"; // Icons
import { Badge } from "@/components/ui/badge"; // Badge component

/* ─── Types ──────────────────────────────────────────────────────────────── */

/** Intensity level for a single day (0 = no activity, 4 = maximum) */
type IntensityLevel = 0 | 1 | 2 | 3 | 4;

/** Data for a single day in the heatmap */
interface DayData {
  date:      string;         // ISO date string (e.g., "2026-07-07")
  intensity: IntensityLevel; // Activity level
  minutes:   number;         // Minutes studied
  chapters:  number;         // Chapters completed
}

/* ─── Generate demo heatmap data ─────────────────────────────────────────── */
/**
 * Generates 364 days of demo activity data with realistic patterns.
 * In production: fetched from /api/progress/heatmap?userId=xxx
 *
 * @returns Array of 364 DayData objects, oldest first
 */
function generateDemoHeatmapData(): DayData[] {
  const days: DayData[] = []; // Result array
  const today = new Date();   // Today's date

  for (let i = 363; i >= 0; i--) {
    const date = new Date(today);   // Clone today
    date.setDate(today.getDate() - i); // Go back i days

    // Generate realistic study patterns: higher on weekdays, lower on weekends
    const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6; // Weekend check

    // Random study activity — weekends have lower probability
    const random = Math.random();
    let intensity: IntensityLevel = 0;
    let minutes = 0;

    if (isWeekend) {
      // Weekend: 40% chance of studying
      if (random > 0.6) { intensity = 1; minutes = 20; }
      if (random > 0.8) { intensity = 2; minutes = 60; }
      if (random > 0.95) { intensity = 3; minutes = 120; }
    } else {
      // Weekday: 65% chance of studying
      if (random > 0.35) { intensity = 1; minutes = 30; }
      if (random > 0.55) { intensity = 2; minutes = 75; }
      if (random > 0.75) { intensity = 3; minutes = 150; }
      if (random > 0.92) { intensity = 4; minutes = 240; }
    }

    days.push({
      date:      date.toISOString().split("T")[0], // Format: YYYY-MM-DD
      intensity,                                    // Activity level
      minutes,                                      // Minutes studied
      chapters:  intensity > 0 ? Math.floor(intensity * 0.8) : 0, // Approx chapters
    });
  }

  return days; // Return all 364 days
}

/* ─── Color Map for Intensity Levels ─────────────────────────────────────── */
// Each level maps to a Tailwind bg class (light + dark mode variants)
const INTENSITY_COLORS: Record<IntensityLevel, string> = {
  0: "bg-muted/40",                       // No activity — light gray
  1: "bg-brand-200 dark:bg-brand-900",   // Low activity — very light indigo
  2: "bg-brand-400 dark:bg-brand-700",   // Medium — medium indigo
  3: "bg-brand-500 dark:bg-brand-500",   // High — brand indigo
  4: "bg-brand-600 dark:bg-brand-400",   // Max — deep indigo
};

/* ─── Month labels (abbreviated) ─────────────────────────────────────────── */
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

/* ─── StudyStreak Component ──────────────────────────────────────────────── */

/**
 * Renders the 52-week study heatmap and streak information.
 *
 * @param currentStreak - Current day streak count
 * @param longestStreak - All-time longest streak
 */
export function StudyStreak({
  currentStreak = 7,
  longestStreak = 21,
}: {
  currentStreak?: number; // Current active streak
  longestStreak?: number; // Best streak ever achieved
}) {
  // Generate demo data (replace with API call in production)
  const data = generateDemoHeatmapData();

  // Tooltip state — shows day details on hover
  const [tooltip, setTooltip] = useState<{ day: DayData; x: number; y: number } | null>(null);

  // Split data into 52 weeks × 7 days for grid rendering
  const weeks: DayData[][] = [];
  for (let w = 0; w < 52; w++) {
    weeks.push(data.slice(w * 7, w * 7 + 7)); // Slice 7 days per week
  }

  // Total study minutes this year
  const totalMinutes = data.reduce((sum, d) => sum + d.minutes, 0);
  const totalHours   = Math.round(totalMinutes / 60); // Convert to hours

  // Active study days this year
  const activeDays   = data.filter(d => d.intensity > 0).length;

  return (
    <div className="rounded-2xl border bg-card p-5 shadow-sm">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-orange-500" /> {/* Streak flame icon */}
          <h3 className="font-semibold text-foreground">Study Activity</h3>
        </div>
        {/* Current streak badge */}
        <Badge variant="outline" className="gap-1 text-orange-600 border-orange-500/40">
          <Flame className="h-3 w-3" />
          {currentStreak} day streak
        </Badge>
      </div>

      {/* ── Stats Row ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-4 mb-4 text-center">
        {/* Total hours */}
        <div>
          <p className="text-xl font-bold text-foreground">{totalHours}h</p>
          <p className="text-xs text-muted-foreground">Total Hours</p>
        </div>
        {/* Active days */}
        <div>
          <p className="text-xl font-bold text-foreground">{activeDays}</p>
          <p className="text-xs text-muted-foreground">Active Days</p>
        </div>
        {/* Longest streak */}
        <div>
          <p className="text-xl font-bold text-foreground">{longestStreak}d</p>
          <p className="text-xs text-muted-foreground">Best Streak</p>
        </div>
      </div>

      {/* ── Heatmap Grid ───────────────────────────────────────────── */}
      <div className="overflow-x-auto">
        <div className="flex gap-[3px] min-w-max">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.map((day, di) => (
                <div
                  key={`${wi}-${di}`}
                  className={`h-[11px] w-[11px] rounded-sm cursor-pointer transition-transform hover:scale-125 ${INTENSITY_COLORS[day.intensity]}`}
                  onMouseEnter={(e) => {
                    // Show tooltip on hover with day details
                    const rect = e.currentTarget.getBoundingClientRect();
                    setTooltip({ day, x: rect.left, y: rect.top });
                  }}
                  onMouseLeave={() => setTooltip(null)} // Hide tooltip on leave
                  title={`${day.date}: ${day.minutes} min studied, ${day.chapters} chapters`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── Legend ─────────────────────────────────────────────────── */}
      <div className="flex items-center gap-1.5 mt-3 justify-end">
        <span className="text-xs text-muted-foreground">Less</span>
        {([0, 1, 2, 3, 4] as IntensityLevel[]).map((level) => (
          <div
            key={level}
            className={`h-[10px] w-[10px] rounded-sm ${INTENSITY_COLORS[level]}`}
          />
        ))}
        <span className="text-xs text-muted-foreground">More</span>
      </div>
    </div>
  );
}
