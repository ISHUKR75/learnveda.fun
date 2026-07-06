/**
 * @file lib/mongodb/models/Achievement.ts
 * @description Mongoose Achievement model for LearnVeda
 *
 * Tracks badges and achievements earned by students.
 * Each document represents ONE achievement earned by ONE user.
 *
 * Achievement types:
 *  - streak:   Consecutive daily study streaks
 *  - chapters: Completing N chapters in a subject
 *  - battle:   Winning N live battles
 *  - xp:       Reaching XP milestones
 *  - quiz:     Getting perfect scores on quizzes
 *  - special:  Event-based or manually awarded badges
 */

import mongoose, { Document, Schema, Types } from "mongoose";

/* ─── Achievement Badge Catalog ──────────────────────────────────────────── */
// This catalog defines all possible achievements in the system.
// When checking if a user qualifies, compare their stats to these thresholds.
export const ACHIEVEMENT_CATALOG = [
  // Streak achievements
  { id: "streak_3",   type: "streak",   title: "3-Day Streak",      emoji: "🔥",  xp: 50,  desc: "Study 3 days in a row"         },
  { id: "streak_7",   type: "streak",   title: "Week Warrior",       emoji: "⚡",  xp: 100, desc: "Study 7 days in a row"         },
  { id: "streak_30",  type: "streak",   title: "Month Master",       emoji: "🏆",  xp: 500, desc: "Study 30 days in a row"        },
  { id: "streak_100", type: "streak",   title: "Legend",             emoji: "👑",  xp: 2000,desc: "Study 100 days in a row"       },
  // Chapter achievements
  { id: "chapters_5",  type: "chapters", title: "Curious Learner",   emoji: "📚",  xp: 75,  desc: "Complete 5 chapters"           },
  { id: "chapters_25", type: "chapters", title: "Knowledge Seeker",  emoji: "🎓",  xp: 250, desc: "Complete 25 chapters"          },
  { id: "chapters_100",type: "chapters", title: "Chapter Champion",  emoji: "🏅",  xp: 1000,desc: "Complete 100 chapters"         },
  // Battle achievements
  { id: "battle_1",   type: "battle",   title: "First Battle",       emoji: "⚔️",  xp: 50,  desc: "Win your first live battle"    },
  { id: "battle_10",  type: "battle",   title: "Warrior",            emoji: "🛡️",  xp: 200, desc: "Win 10 live battles"           },
  { id: "battle_50",  type: "battle",   title: "Champion",           emoji: "🏆",  xp: 1000,desc: "Win 50 live battles"           },
  // XP milestones
  { id: "xp_100",     type: "xp",       title: "First Steps",        emoji: "🌱",  xp: 0,   desc: "Earn 100 XP"                   },
  { id: "xp_1000",    type: "xp",       title: "Rising Star",        emoji: "⭐",  xp: 0,   desc: "Earn 1,000 XP"                 },
  { id: "xp_10000",   type: "xp",       title: "Elite Learner",      emoji: "💎",  xp: 0,   desc: "Earn 10,000 XP"                },
  // Quiz achievements
  { id: "quiz_perfect",type: "quiz",    title: "Perfect Score",      emoji: "🎯",  xp: 100, desc: "Get 100% on any quiz"          },
  { id: "quiz_10",     type: "quiz",    title: "Quiz Master",        emoji: "🧠",  xp: 200, desc: "Complete 10 quizzes"           },
  // Special
  { id: "early_adopter",type: "special",title: "Early Adopter",      emoji: "🚀",  xp: 500, desc: "Joined LearnVeda early"        },
  { id: "beta_tester",  type: "special",title: "Beta Tester",        emoji: "🔬",  xp: 300, desc: "Tested LearnVeda in beta"      },
] as const;

export type AchievementId = typeof ACHIEVEMENT_CATALOG[number]["id"];

/* ─── Achievement Document Interface ────────────────────────────────────── */
export interface IAchievement extends Document {
  _id:           Types.ObjectId;
  userId:        string;         // Clerk user ID of the earner
  achievementId: AchievementId;  // References ACHIEVEMENT_CATALOG
  earnedAt:      Date;           // When the achievement was unlocked
  isNew:         boolean;        // True until the user has seen it (notification)
  createdAt:     Date;
  updatedAt:     Date;
}

/* ─── Achievement Schema ─────────────────────────────────────────────────── */
const AchievementSchema = new Schema<IAchievement>(
  {
    userId:        { type: String, required: true, index: true }, // Indexed for profile lookup
    achievementId: { type: String, required: true },              // References catalog
    earnedAt:      { type: Date, default: Date.now },             // When unlocked
    isNew:         { type: Boolean, default: true },              // Notification flag
  },
  {
    timestamps: true,
    collection: "achievements",
  }
);

/* ─── Unique compound index ───────────────────────────────────────────────── */
// Prevents duplicate achievements — each user can earn each achievement once
AchievementSchema.index({ userId: 1, achievementId: 1 }, { unique: true });

/* ─── Export Model ───────────────────────────────────────────────────────── */
export const Achievement = (mongoose.models.Achievement as mongoose.Model<IAchievement>)
  ?? mongoose.model<IAchievement>("Achievement", AchievementSchema);
