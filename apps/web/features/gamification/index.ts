/**
 * @file features/gamification/index.ts
 * @description Public API barrel export for the gamification feature module
 * @purpose Single import point for all gamification components and utilities
 * @used-by Dashboard, Profile, Navbar, Post-lesson screens, Live battles
 *
 * The gamification system powers:
 *  - XP tracking and level progression (quadratic XP formula)
 *  - Daily streak monitoring
 *  - Achievement badge system
 *  - Level-up celebrations
 *  - Leaderboard ranking
 */

// ── UI Components ─────────────────────────────────────────────────────────
export { XPBar, LevelRing, xpForLevel, getTier } from "./components/XPBar";         // XP bar + level ring + helpers
export { StreakDisplay }                           from "./components/StreakDisplay"; // Streak calendar + flame
export { AchievementBadges, ALL_ACHIEVEMENTS }    from "./components/AchievementBadges"; // Badge grid
export { LevelUpModal }                           from "./components/LevelUpModal";  // Level-up celebration

// ── Types ─────────────────────────────────────────────────────────────────
export type { } from "./components/XPBar"; // XPBar types are inlined — exported here for discoverability
