/**
 * @file lib/mongodb/models/User.ts
 * @description Mongoose User model for LearnVeda
 *
 * Stores authenticated user data synced from Clerk via webhook.
 * Includes gamification fields (XP, level, streak) for quick dashboard reads.
 *
 * Relationships:
 *   User 1→N Progress (via userId)
 *   User 1→1 StudentProfile (via userId)
 *   User 1→N Notification (via userId)
 */

import mongoose, { Document, Model, Schema } from "mongoose"; // ODM types

/* ─── TypeScript Interface ───────────────────────────────────────────────── */
// Defines the shape of a User document — used for type-safe queries
export interface IUser extends Document {
  clerkId:       string;   // Clerk's unique user ID (primary external key)
  name:          string;   // Full display name
  email:         string;   // Email address — unique
  avatar?:       string;   // Profile image URL (Cloudinary)
  role:          "student" | "teacher" | "admin" | "moderator"; // Access level
  plan:          "free" | "pro" | "school"; // Subscription tier
  // ── Gamification (denormalized for O(1) reads) ─────────────────────────
  xp:            number;   // Total experience points earned
  level:         number;   // Current level (1–100)
  streak:        number;   // Current daily streak count
  longestStreak: number;   // All-time highest streak
  lastActiveAt:  Date;     // Last login / activity timestamp
  // ── Profile ────────────────────────────────────────────────────────────
  class?:        string;   // e.g. "class-9" | "class-10" | ... | "graduation"
  board:         string;   // e.g. "CBSE" | "ICSE" | "State"
  language:      string;   // Preferred UI language code (e.g. "en", "hi")
  isActive:      boolean;  // Soft-delete flag
  createdAt:     Date;     // Account creation timestamp
  updatedAt:     Date;     // Last profile update timestamp
}

/* ─── Schema Definition ──────────────────────────────────────────────────── */
const UserSchema = new Schema<IUser>(
  {
    // ── Identity fields ────────────────────────────────────────────────────
    clerkId: {
      type:     String,   // Clerk user ID string (e.g. "user_abc123")
      required: [true, "Clerk user ID is required"], // Mandatory for auth sync
      unique:   true,     // Each Clerk account maps to exactly one user record
      index:    true,     // Frequently queried — needs fast lookup
    },

    name: {
      type:      String,  // User's display name
      required:  [true, "Name is required"],
      trim:      true,    // Strip leading/trailing whitespace
      maxlength: [100, "Name must be ≤ 100 characters"],
    },

    email: {
      type:      String,  // Email address (sourced from Clerk)
      required:  [true, "Email is required"],
      unique:    true,    // Enforce one account per email
      lowercase: true,    // Normalize to lowercase for consistent lookups
      trim:      true,    // Strip whitespace
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"], // Basic format check
    },

    avatar: {
      type:    String,    // Cloudinary URL or Clerk avatar URL
      default: "",        // Empty string = use generated avatar
    },

    role: {
      type:    String,    // Access control role
      enum:    ["student", "teacher", "admin", "moderator"], // Allowed values only
      default: "student", // Most users are students
    },

    plan: {
      type:    String,    // Subscription tier controls feature access
      enum:    ["free", "pro", "school"],
      default: "free",    // Everyone starts on the free plan
    },

    // ── Gamification ────────────────────────────────────────────────────────
    xp: {
      type:    Number,    // Experience points — earned by completing chapters/quizzes
      default: 0,         // New users start at 0 XP
      min:     [0, "XP cannot be negative"],
    },

    level: {
      type:    Number,    // Derived from XP but cached for fast reads
      default: 1,         // Level 1 is the starting level
      min:     1,         // Minimum level
      max:     100,       // Maximum level cap
    },

    streak: {
      type:    Number,    // Days studied in a row (resets at midnight if no activity)
      default: 0,         // Starts at 0
      min:     [0, "Streak cannot be negative"],
    },

    longestStreak: {
      type:    Number,    // Historical highest streak — never decreases
      default: 0,
    },

    lastActiveAt: {
      type:    Date,      // Timestamp of last meaningful activity (chapter view, quiz, etc.)
      default: Date.now,  // Defaults to account creation time
    },

    // ── Profile ─────────────────────────────────────────────────────────────
    class: {
      type:    String,    // Student's current education level
      enum:    ["class-9", "class-10", "class-11", "class-12", "engineering", "graduation", null],
      default: null,      // Not set until profile is completed
    },

    board: {
      type:    String,    // Education board — affects curriculum content shown
      default: "CBSE",    // Default to CBSE (most common in India)
    },

    language: {
      type:    String,    // UI/content language preference
      default: "en",      // Default to English
    },

    isActive: {
      type:    Boolean,   // Soft-delete — deactivated accounts are hidden not deleted
      default: true,      // All new accounts are active
    },
  },
  {
    timestamps: true,     // Auto-add createdAt and updatedAt fields
    versionKey: false,    // Remove __v field — not needed for our use case
  }
);

/* ─── Indexes ────────────────────────────────────────────────────────────── */
// Compound index for leaderboard queries (sort by XP descending within a class)
UserSchema.index({ class: 1, xp: -1 });

// Index for active-user analytics queries
UserSchema.index({ isActive: 1, lastActiveAt: -1 });

// Index for leaderboard sorted by level + xp
UserSchema.index({ level: -1, xp: -1 });

/* ─── Model Export ───────────────────────────────────────────────────────── */
// Prevent recompiling the model on every Next.js hot-reload by checking if it exists
export const User: Model<IUser> =
  (mongoose.models.User as Model<IUser>) ??
  mongoose.model<IUser>("User", UserSchema);

export default User;
