/**
 * @file lib/mongodb/models/index.ts
 * @description Barrel re-export for all LearnVeda MongoDB models
 *
 * Import from here instead of individual model files to ensure
 * models are only registered once (prevents Mongoose OverwriteModelError).
 *
 * Usage:
 *   import { User, Progress, Quiz, Battle } from "@/lib/mongodb/models";
 */

// ── Core user models ──────────────────────────────────────────────────────
export { User }            from "./User";
export { Progress }        from "./Progress";
export { Notification }    from "./Notification";
export { CommunityPost }   from "./CommunityPost";

// ── Gamification models ───────────────────────────────────────────────────
export { Quiz }            from "./Quiz";
export { Battle }          from "./Battle";
export { Achievement, ACHIEVEMENT_CATALOG } from "./Achievement";

// ── Type exports ─────────────────────────────────────────────────────────
export type { IQuiz }        from "./Quiz";
export type { IBattle }      from "./Battle";
export type { IAchievement, AchievementId } from "./Achievement";
