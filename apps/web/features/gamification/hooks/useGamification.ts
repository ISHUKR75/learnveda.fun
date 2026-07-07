/**
 * @file features/gamification/hooks/useGamification.ts
 * @description Master gamification hook for LearnVeda
 * @purpose Provides XP, level, streak, and badge data via API with optimistic updates
 * @used-by Dashboard, Navbar (XP bar), Post-lesson screens, Live Battles
 *
 * Data fetched from:
 *  - GET /api/gamification/user → { xp, level, streak, badges, recentXP }
 *
 * In demo mode (no auth): returns realistic mock data for UI display
 */

"use client";

import { useState, useEffect, useCallback } from "react";  // React hooks
import { xpForLevel, getTier }              from "../components/XPBar"; // XP helpers

/* ─── Gamification State ─────────────────────────────────────────────────── */
export interface GamificationState {
  xp:            number;          // Total XP earned
  level:          number;         // Current level (1–100)
  streak:         number;         // Current day streak
  longestStreak:  number;         // All-time longest streak
  completedToday: boolean;        // Has user studied today?
  isAtRisk:       boolean;        // Is streak at risk (studied yesterday, not today)?
  activeDates:    string[];       // ISO dates user was active (last 30 days)
  unlockedBadges: Set<string>;    // Set of unlocked achievement IDs
  recentXPGain:   number;         // XP gained in the most recent action (for animations)
  tierName:       string;         // Current tier name (e.g. "Gold")
  tierJustChanged:boolean;        // Did the tier change in this session?
}

/* ─── Demo Data (when not authenticated) ─────────────────────────────────── */
const DEMO_STATE: GamificationState = {
  xp:             3750,
  level:          12,
  streak:         7,
  longestStreak:  21,
  completedToday: true,
  isAtRisk:       false,
  activeDates:    [
    "2026-07-01", "2026-07-02", "2026-07-03", "2026-07-04",
    "2026-07-05", "2026-07-06", "2026-07-07",
  ],
  unlockedBadges: new Set([
    "first-lesson", "streak-3", "streak-7", "first-blood",
    "xp-10", "xp-100", "xp-1000", "first-post",
  ]),
  recentXPGain:    0,
  tierName:        "Gold",
  tierJustChanged: false,
};

/* ─── useGamification Hook ───────────────────────────────────────────────── */
/**
 * Fetches and manages the user's gamification state.
 * Provides:
 *  - Current XP, level, streak, badges
 *  - awardXP() — optimistically adds XP and triggers level-up detection
 *  - addStreak() — marks today as complete, updates streak
 *
 * @example
 * const { xp, level, streak, awardXP } = useGamification();
 * // On lesson complete:
 * await awardXP(50, "lesson-complete");
 */
export function useGamification() {
  const [state,      setState]      = useState<GamificationState>(DEMO_STATE);
  const [isLoading,  setIsLoading]  = useState(false);
  const [showLevelUp,setShowLevelUp]= useState(false);  // Trigger level-up modal
  const [error,      setError]      = useState<string | null>(null);

  /* ── Fetch gamification data from API ──────────────────────────── */
  useEffect(() => {
    async function fetchState() {
      setIsLoading(true);
      try {
        const res = await fetch("/api/gamification/user", {
          credentials: "include",           // Include auth cookies
        });

        if (res.status === 401) {
          // Not authenticated — use demo state
          setState(DEMO_STATE);
          return;
        }

        if (!res.ok) throw new Error(`API error: ${res.status}`);

        const data = await res.json();
        setState({
          xp:             data.xp            ?? DEMO_STATE.xp,
          level:           data.level         ?? DEMO_STATE.level,
          streak:          data.streak        ?? DEMO_STATE.streak,
          longestStreak:   data.longestStreak ?? DEMO_STATE.longestStreak,
          completedToday:  data.completedToday ?? DEMO_STATE.completedToday,
          isAtRisk:        data.isAtRisk      ?? false,
          activeDates:     data.activeDates   ?? DEMO_STATE.activeDates,
          unlockedBadges:  new Set(data.unlockedBadges ?? Array.from(DEMO_STATE.unlockedBadges)),
          recentXPGain:    0,
          tierName:        data.tierName      ?? getTier(data.level ?? DEMO_STATE.level).name,
          tierJustChanged: false,
        });
      } catch (err) {
        // In demo mode: silently use demo state (don't show errors for missing API)
        setState(DEMO_STATE);
        console.debug("[gamification] Using demo state:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchState();
  }, []);

  /* ── Award XP — optimistic update + level-up detection ─────────── */
  /**
   * Awards XP to the user. Optimistically updates the UI and calls the API.
   * If a level-up occurs, triggers the LevelUpModal.
   *
   * @param amount - XP to award
   * @param reason - Event that triggered the XP (for logging)
   */
  const awardXP = useCallback(async (amount: number, reason: string = "action") => {
    if (amount <= 0) return;

    setState((prev) => {
      const newXP     = prev.xp + amount;           // Add XP
      const oldLevel  = prev.level;
      let   newLevel  = prev.level;

      // Check for level-up: keep incrementing while XP exceeds next level threshold
      while (newLevel < 100 && xpForLevel(newLevel + 1) <= newXP) {
        newLevel++;
      }

      const leveledUp     = newLevel > oldLevel;    // Did we level up?
      const newTier       = getTier(newLevel);
      const oldTier       = getTier(oldLevel);
      const tierChanged   = newTier.name !== oldTier.name; // Tier promotion?

      if (leveledUp) {
        setShowLevelUp(true);                        // Trigger celebration modal
      }

      return {
        ...prev,
        xp:              newXP,
        level:            newLevel,
        recentXPGain:    amount,                     // For +XP toast animation
        tierName:         newTier.name,
        tierJustChanged: tierChanged,
      };
    });

    // Call API in background (fire and forget for responsiveness)
    try {
      await fetch("/api/gamification/award-xp", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ amount, reason }),
        credentials: "include",
      });
    } catch {
      // API failure: state already updated optimistically, so UI is fine
      console.debug("[gamification] XP API call failed — state remains optimistic");
    }
  }, []);

  /* ── Mark today as complete (streak) ──────────────────────────── */
  /**
   * Marks today's activity as complete.
   * Increments streak if this is the first activity today.
   */
  const markTodayComplete = useCallback(async () => {
    setState((prev) => {
      if (prev.completedToday) return prev;          // Already completed — no change
      const today    = new Date().toISOString().split("T")[0]; // "2026-07-07"
      const newStreak = prev.streak + 1;
      return {
        ...prev,
        completedToday: true,
        isAtRisk:       false,
        streak:          newStreak,
        longestStreak:  Math.max(prev.longestStreak, newStreak),
        activeDates:    [...prev.activeDates, today].slice(-30), // Keep last 30 days
      };
    });

    try {
      await fetch("/api/gamification/streak", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
    } catch {
      console.debug("[gamification] Streak API call failed — state optimistic");
    }
  }, []);

  /* ── Unlock a badge ────────────────────────────────────────────── */
  const unlockBadge = useCallback(async (badgeId: string) => {
    setState((prev) => {
      if (prev.unlockedBadges.has(badgeId)) return prev; // Already unlocked
      const newBadges = new Set(prev.unlockedBadges);
      newBadges.add(badgeId);
      return { ...prev, unlockedBadges: newBadges };
    });

    try {
      await fetch("/api/gamification/badge", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ badgeId }),
        credentials: "include",
      });
    } catch {
      console.debug("[gamification] Badge API failed — state optimistic");
    }
  }, []);

  /* ── Dismiss level-up modal ─────────────────────────────────────── */
  const dismissLevelUp = useCallback(() => {
    setShowLevelUp(false);
    setState((prev) => ({ ...prev, tierJustChanged: false, recentXPGain: 0 }));
  }, []);

  return {
    // State
    ...state,
    isLoading,
    error,
    showLevelUp,
    // Actions
    awardXP,
    markTodayComplete,
    unlockBadge,
    dismissLevelUp,
  };
}
