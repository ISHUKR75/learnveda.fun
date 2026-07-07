/**
 * @file lib/gamification/xp.ts
 * @description Pure gamification math helpers — server-safe (no UI imports)
 * @purpose Shared between API routes (server) and UI components (client)
 *
 * Extracted here so API routes don't import from "use client" components.
 * UI components import from here too, keeping a single source of truth.
 *
 * XP Formula: cumulative sum of 100 × i² for i=1..N
 *   Level 1 → 100 XP, Level 2 → 500 XP total, Level 3 → 1400 XP total ...
 */

/* ─── XP Tier Definitions ─────────────────────────────────────────────────── */
export interface XPTier {
  name:   string;
  color:  string;
  minLvl: number;
  maxLvl: number;
}

/** Tier table — keep in sync with XPBar.tsx display logic */
export const XP_TIERS: XPTier[] = [
  { name: "Bronze",   color: "#cd7f32", minLvl: 1,  maxLvl: 9   },
  { name: "Silver",   color: "#c0c0c0", minLvl: 10, maxLvl: 19  },
  { name: "Gold",     color: "#ffd700", minLvl: 20, maxLvl: 34  },
  { name: "Platinum", color: "#00d4ff", minLvl: 35, maxLvl: 49  },
  { name: "Diamond",  color: "#9f50ff", minLvl: 50, maxLvl: 69  },
  { name: "Master",   color: "#ff6b35", minLvl: 70, maxLvl: 89  },
  { name: "Legend",   color: "#ff1744", minLvl: 90, maxLvl: 100 },
];

/**
 * Total XP required to REACH a given level.
 * Uses quadratic formula: sum of 100 × i² for i = 1..level
 */
export function xpForLevel(level: number): number {
  if (level <= 1) return 0;
  let total = 0;
  for (let i = 1; i < level; i++) {
    total += 100 * i * i;
  }
  return total;
}

/**
 * Returns the XP tier info for a given level.
 */
export function getTier(level: number): XPTier {
  return (
    XP_TIERS.find((t) => level >= t.minLvl && level <= t.maxLvl) ??
    XP_TIERS[XP_TIERS.length - 1]
  );
}

/**
 * Calculates level from a raw XP total.
 * Walks up from level 1 until the next level requires more XP than available.
 */
export function levelFromXP(xp: number, maxLevel = 100): number {
  let level = 1;
  while (level < maxLevel && xpForLevel(level + 1) <= xp) level++;
  return level;
}

/**
 * Validated list of action types that can award XP server-side.
 * Only these actions are accepted by the award-xp API route.
 */
export const XP_ACTIONS: Record<string, number> = {
  "lesson-complete":    50,
  "quiz-pass":         100,
  "quiz-perfect":      200,
  "streak-7":          300,
  "streak-30":        1000,
  "first-login":        25,
  "battle-win":        150,
  "battle-perfect":    250,
  "test-complete":      75,
  "test-pass":         125,
  "challenge-complete": 200,
  "daily-goal":         50,
} as const;

export type XPActionKey = keyof typeof XP_ACTIONS;
