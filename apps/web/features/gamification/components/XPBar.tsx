/**
 * @file features/gamification/components/XPBar.tsx
 * @description XP Progress Bar component for LearnVeda gamification system
 * @purpose Shows user's current XP level, progress to next level, and tier badge
 * @used-by Dashboard, Navbar (compact), Profile page, Post-lesson XP gain modal
 *
 * XP Formula: Next level requires 100 × level² XP from zero.
 * Tiers: Bronze(1–10) → Silver(11–20) → Gold(21–30) → Platinum(31–40)
 *        → Ruby(41–50) → Sapphire(51–60) → Diamond(61–70) → Emerald(71–80)
 *        → Legend(81–90) → Grandmaster(91–100)
 */

"use client"; // Client component — animated progress requires client-side rendering

import React, { useMemo } from "react";          // React core + memo for perf
import { motion }         from "framer-motion";  // Smooth bar fill animation
import { Zap, Star }      from "lucide-react";    // Icons: Zap for normal, Star for max
import { cn }             from "@/lib/utils";     // Tailwind class merger utility

/* ─── XP Tier Definitions ────────────────────────────────────────────────── */
// Maps level ranges to tier metadata (name, color, icon color)
const TIERS = [
  { name: "Bronze",      min: 1,  max: 10,  color: "from-amber-700  to-amber-500",  text: "text-amber-600",  bg: "bg-amber-500/10",  border: "border-amber-500/30" },
  { name: "Silver",      min: 11, max: 20,  color: "from-slate-400  to-slate-300",  text: "text-slate-500",  bg: "bg-slate-500/10",  border: "border-slate-400/30" },
  { name: "Gold",        min: 21, max: 30,  color: "from-yellow-500 to-amber-400",  text: "text-yellow-600", bg: "bg-yellow-500/10", border: "border-yellow-500/30" },
  { name: "Platinum",    min: 31, max: 40,  color: "from-cyan-400   to-blue-300",   text: "text-cyan-600",   bg: "bg-cyan-500/10",   border: "border-cyan-400/30"  },
  { name: "Ruby",        min: 41, max: 50,  color: "from-rose-600   to-red-400",    text: "text-rose-600",   bg: "bg-rose-500/10",   border: "border-rose-500/30"  },
  { name: "Sapphire",    min: 51, max: 60,  color: "from-blue-700   to-blue-400",   text: "text-blue-700",   bg: "bg-blue-500/10",   border: "border-blue-500/30"  },
  { name: "Diamond",     min: 61, max: 70,  color: "from-sky-300    to-cyan-200",   text: "text-sky-500",    bg: "bg-sky-500/10",    border: "border-sky-400/30"   },
  { name: "Emerald",     min: 71, max: 80,  color: "from-emerald-500 to-green-400", text: "text-emerald-600",bg: "bg-emerald-500/10",border: "border-emerald-500/30"},
  { name: "Legend",      min: 81, max: 90,  color: "from-pink-500   to-purple-400", text: "text-pink-600",   bg: "bg-pink-500/10",   border: "border-pink-500/30"  },
  { name: "Grandmaster", min: 91, max: 100, color: "from-red-600    to-orange-400", text: "text-red-600",    bg: "bg-red-500/10",    border: "border-red-500/30"   },
] as const;

/* ─── Helper: Calculate XP for a given level ─────────────────────────────── */
/**
 * Returns the *total* XP needed to reach `level` from level 1.
 * Formula: sum of 100×i² for i in [1..level-1]
 * @param level - Target level (1–100)
 */
export function xpForLevel(level: number): number {
  // Each level needs: 100 × level² XP (quadratic progression)
  if (level <= 1) return 0;                       // Level 1 starts at 0 XP
  let total = 0;
  for (let i = 1; i < level; i++) {
    total += 100 * i * i;                         // Cumulative XP up to this level
  }
  return total;
}

/* ─── Helper: Get tier for a level ──────────────────────────────────────── */
/**
 * Returns the tier metadata for a given level number.
 * @param level - Current level (1–100)
 */
export function getTier(level: number) {
  return TIERS.find((t) => level >= t.min && level <= t.max) ?? TIERS[0];
}

/* ─── XPBar Props ────────────────────────────────────────────────────────── */
interface XPBarProps {
  /** Current total XP of the user */
  currentXP: number;
  /** Current level (1–100) — derived from XP if not provided */
  level?: number;
  /** Compact mode: smaller height, no labels */
  compact?: boolean;
  /** Show tier badge next to the bar */
  showTier?: boolean;
  /** Show the "+X XP" gain animation (set to 0 for no animation) */
  xpGain?: number;
  /** Custom CSS class */
  className?: string;
}

/* ─── XPBar Component ────────────────────────────────────────────────────── */
/**
 * Renders an animated XP progress bar with level badge and tier info.
 * Color changes dynamically: Blue → Green (>80%) → Gold (max level).
 */
export function XPBar({
  currentXP,
  level: propLevel,
  compact = false,
  showTier = true,
  xpGain = 0,
  className,
}: XPBarProps) {

  /* ── Compute level + progress from XP ─────────────────────────────── */
  const { level, progressPercent, xpInLevel, xpNeeded, tier } = useMemo(() => {
    // Derive level from XP using cumulative formula
    let derivedLevel = 1;
    while (derivedLevel < 100 && xpForLevel(derivedLevel + 1) <= currentXP) {
      derivedLevel++;                             // Keep advancing until XP runs out
    }
    const finalLevel = propLevel ?? derivedLevel; // Use provided level if given

    const xpAtCurrentLevel  = xpForLevel(finalLevel);          // XP to enter this level
    const xpAtNextLevel     = xpForLevel(finalLevel + 1);      // XP to enter next level
    const xpNeededForNext   = xpAtNextLevel - xpAtCurrentLevel; // Range for this level
    const xpInThisLevel     = currentXP - xpAtCurrentLevel;     // Progress within level
    const percent           = finalLevel >= 100
      ? 100                                       // Max level — always full
      : Math.min(100, Math.floor((xpInThisLevel / xpNeededForNext) * 100));

    return {
      level:           finalLevel,
      progressPercent: percent,
      xpInLevel:       xpInThisLevel,
      xpNeeded:        xpNeededForNext,
      tier:            getTier(finalLevel),
    };
  }, [currentXP, propLevel]);                    // Recompute when XP or level changes

  /* ── Bar color — changes at thresholds ────────────────────────────── */
  const barColor = level >= 100
    ? "from-yellow-500 to-amber-400"             // Gold at max level
    : progressPercent >= 80
    ? "from-emerald-500 to-green-400"            // Green when almost full
    : "from-brand-500 to-blue-500";              // Blue default

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {/* ── Header row: level badge + tier + XP numbers ─────────────── */}
      {!compact && (
        <div className="flex items-center justify-between text-sm">
          {/* Left: Level badge */}
          <div className="flex items-center gap-2">
            {/* Level icon: Star for max level, Zap otherwise */}
            <div className={cn(
              "flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold border",
              tier.bg, tier.border, tier.text,
            )}>
              {level >= 100
                ? <Star   className="h-3 w-3" />  // Max level icon
                : <Zap    className="h-3 w-3" />  // Normal level icon
              }
              Level {level}                         {/* Display current level */}
            </div>

            {/* Tier badge — only shown when showTier is true */}
            {showTier && (
              <span className={cn(
                "rounded-full px-2.5 py-0.5 text-xs font-medium border",
                tier.bg, tier.border, tier.text,
              )}>
                {tier.name}                         {/* e.g. "Gold", "Diamond" */}
              </span>
            )}
          </div>

          {/* Right: XP numbers */}
          <div className="text-muted-foreground text-xs">
            {level >= 100
              ? "Max Level"                         // At max, no "next level" to show
              : `${xpInLevel.toLocaleString()} / ${xpNeeded.toLocaleString()} XP`
            }
          </div>
        </div>
      )}

      {/* ── Progress Bar ─────────────────────────────────────────────── */}
      <div className={cn(
        "relative w-full overflow-hidden rounded-full bg-muted",
        compact ? "h-1.5" : "h-3",               // Height depends on mode
      )}>
        {/* Animated fill */}
        <motion.div
          className={cn("h-full rounded-full bg-gradient-to-r", barColor)}
          initial={{ width: "0%" }}               // Start empty
          animate={{ width: `${progressPercent}%` }} // Animate to current progress
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        />

        {/* Shimmer effect overlay — shows motion */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
      </div>

      {/* ── XP Gain Toast — shows "+50 XP" briefly when xpGain > 0 ─── */}
      {xpGain > 0 && (
        <motion.span
          className="absolute top-0 right-0 text-xs font-bold text-emerald-500"
          initial={{ opacity: 0.01, y: 0 }}          // Start at bar position
          animate={{ opacity: [0, 1, 1, 0], y: -20 }} // Float up + fade out
          transition={{ duration: 1.5 }}
        >
          +{xpGain} XP                             {/* Show XP gain amount */}
        </motion.span>
      )}

      {/* ── Compact mode: small level label ──────────────────────────── */}
      {compact && (
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Lv.{level}</span>                  {/* Compact level label */}
          <span>{progressPercent}%</span>          {/* Percentage for compact */}
        </div>
      )}
    </div>
  );
}

/* ─── Level Progress Ring (circular variant) ─────────────────────────────── */
interface LevelRingProps {
  level:   number;   // Current level
  xp:      number;   // Current XP
  size?:   number;   // SVG size in px (default 64)
  stroke?: number;   // Stroke width in px (default 4)
}

/**
 * Circular progress ring variant — used in Profile header, Leaderboard cards.
 * Shows level number in the center with a ring indicating progress to next level.
 */
export function LevelRing({ level, xp, size = 64, stroke = 4 }: LevelRingProps) {
  const tier = getTier(level);                    // Get tier for colors

  // Calculate circumference and offset for SVG circle
  const radius      = (size / 2) - stroke;        // Inner radius
  const circumference = 2 * Math.PI * radius;     // Full circle length

  // Compute progress percentage
  const xpAtLevel  = xpForLevel(level);
  const xpAtNext   = xpForLevel(level + 1);
  const percent    = level >= 100 ? 100 : Math.min(100, ((xp - xpAtLevel) / (xpAtNext - xpAtLevel)) * 100);
  const offset     = circumference - (percent / 100) * circumference; // Gap = incomplete portion

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Background ring (grey) */}
      <svg className="absolute" width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="currentColor"
          strokeWidth={stroke}
          className="text-muted"                  // Grey background track
        />
        {/* Foreground arc (tier color) */}
        <motion.circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          stroke="url(#xpGradient)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }} // Start empty
          animate={{ strokeDashoffset: offset }}         // Animate to progress
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* Gradient definition */}
        <defs>
          <linearGradient id="xpGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#6366f1" />  {/* Purple start */}
            <stop offset="100%" stopColor="#8b5cf6" />  {/* Violet end   */}
          </linearGradient>
        </defs>
      </svg>

      {/* Center text: level number */}
      <div className="flex flex-col items-center justify-center z-10">
        <span className={cn("font-bold leading-none", tier.text, size < 50 ? "text-sm" : "text-base")}>
          {level}                                  {/* Level number */}
        </span>
        <span className="text-muted-foreground leading-none" style={{ fontSize: size / 8 }}>
          LVL                                      {/* "LVL" label */}
        </span>
      </div>
    </div>
  );
}
