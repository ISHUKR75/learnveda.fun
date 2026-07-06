/**
 * @file lib/mongodb/models/Progress.ts
 * @description Mongoose Progress model for LearnVeda
 *
 * Tracks a student's progress through chapters, subjects, and courses.
 * Each document represents one chapter completion record for one user.
 *
 * This is an append-only write pattern — we INSERT a record when a chapter
 * is marked complete, never updating existing records. This gives us a full
 * audit trail and easy streak / heatmap calculations.
 */

import mongoose, { Document, Model, Schema } from "mongoose"; // ODM types

/* ─── TypeScript Interface ───────────────────────────────────────────────── */
export interface IProgress extends Document {
  userId:      string;   // MongoDB User._id (indexed for fast lookups per user)
  courseType:  "class" | "programming" | "engineering" | "core-cs"; // Category
  subject:     string;   // e.g. "mathematics", "python", "dsa"
  chapter:     string;   // e.g. "chapter-01", "day-01"
  topicSlug?:  string;   // Optional sub-topic within a chapter
  status:      "started" | "completed"; // Completion state
  xpEarned:   number;    // XP awarded for this completion
  score?:      number;   // Quiz/test score (0–100) if applicable
  timeSpentMs: number;   // Time spent on this chapter (milliseconds)
  completedAt: Date;     // Timestamp of completion
}

/* ─── Schema Definition ──────────────────────────────────────────────────── */
const ProgressSchema = new Schema<IProgress>(
  {
    userId: {
      type:     String,   // Reference to User._id (string for Clerk compatibility)
      required: [true, "User ID is required"],
      index:    true,     // High-cardinality — queries are always userId-first
    },

    courseType: {
      type:     String,   // Top-level curriculum type
      enum:     ["class", "programming", "engineering", "core-cs"],
      required: [true, "Course type is required"],
    },

    subject: {
      type:     String,   // Subject within the course type (e.g. "mathematics")
      required: [true, "Subject is required"],
      lowercase: true,    // Normalize to lowercase for consistent lookups
      trim:     true,
    },

    chapter: {
      type:     String,   // Chapter identifier (e.g. "chapter-01", "day-05")
      required: [true, "Chapter is required"],
      lowercase: true,
      trim:     true,
    },

    topicSlug: {
      type:    String,    // Optional granular topic within a chapter
      default: null,
    },

    status: {
      type:     String,   // Whether chapter was started or fully completed
      enum:     ["started", "completed"],
      default:  "started",
    },

    xpEarned: {
      type:    Number,    // XP awarded — varies by content type and difficulty
      default: 0,
      min:     0,
    },

    score: {
      type:    Number,    // Quiz score 0–100 (null if no quiz taken)
      default: null,
      min:     0,
      max:     100,
    },

    timeSpentMs: {
      type:    Number,    // Time in milliseconds — used for study analytics
      default: 0,
      min:     0,
    },

    completedAt: {
      type:    Date,      // Exact timestamp — used for streak and heatmap calculation
      default: Date.now,
    },
  },
  {
    timestamps: true,     // Auto-add createdAt / updatedAt
    versionKey: false,    // No __v field needed
  }
);

/* ─── Indexes ────────────────────────────────────────────────────────────── */
// The most common query: all progress for a user in a subject
ProgressSchema.index({ userId: 1, subject: 1, status: 1 });

// For heatmap generation: all completions for a user sorted by date
ProgressSchema.index({ userId: 1, completedAt: -1 });

// For admin analytics: completions by subject across all users
ProgressSchema.index({ subject: 1, completedAt: -1 });

/* ─── Model Export ───────────────────────────────────────────────────────── */
export const Progress: Model<IProgress> =
  (mongoose.models.Progress as Model<IProgress>) ??
  mongoose.model<IProgress>("Progress", ProgressSchema);

export default Progress;
