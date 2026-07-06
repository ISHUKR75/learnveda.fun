/**
 * @file database/schemas/user.schema.ts
 * @description MongoDB User schema for LearnVeda
 *
 * Stores all user profile, authentication, progress, and settings data.
 * One document per user — Clerk user ID is the primary identifier.
 *
 * Collections: users
 *
 * Indexes:
 *   - clerkId: unique (primary lookup key)
 *   - email:   unique (for search and uniqueness enforcement)
 *   - "progress.xp": -1 (for leaderboard queries)
 *   - "progress.streak": -1 (for streak leaderboard)
 */

import mongoose, { Schema, Document, Model } from "mongoose"; // Mongoose ODM

/* ─── Progress Sub-schema ────────────────────────────────────────────────── */
/** Sub-document tracking learning progress, XP, and streaks */
const ProgressSchema = new Schema(
  {
    xp:               { type: Number, default: 0, min: 0 },          // Total XP earned
    level:            { type: Number, default: 1, min: 1, max: 100 }, // XP level (1–100)
    streak:           { type: Number, default: 0, min: 0 },           // Current daily streak
    longestStreak:    { type: Number, default: 0, min: 0 },           // All-time best streak
    lastActiveAt:     { type: Date,   default: null },                 // Last activity timestamp
    studiedTodayMin:  { type: Number, default: 0, min: 0 },           // Minutes studied today
    dailyGoalMin:     { type: Number, default: 30, min: 5, max: 360 }, // Daily study goal

    /* Completed items — stored as arrays of IDs for fast $in queries */
    completedChapters:   [{ type: String }], // e.g. "class-9-mathematics-chapter-01"
    completedDayLessons: [{ type: String }], // e.g. "python-day-1"
    completedSimulations:[{ type: String }], // e.g. "physics-force-motion"

    /* Battle statistics */
    battlesPlayed: { type: Number, default: 0 },
    battlesWon:    { type: Number, default: 0 },
    battlesLost:   { type: Number, default: 0 },
    battlesDraw:   { type: Number, default: 0 },
    winStreak:     { type: Number, default: 0 }, // Current consecutive battle wins

    /* Tier system */
    tier: {
      type:    String,
      enum:    ["Bronze", "Silver", "Gold", "Platinum", "Diamond", "Emerald", "Ruby", "Sapphire", "Legend", "Grandmaster"],
      default: "Bronze",
    },
  },
  { _id: false } // Progress is embedded, doesn't need its own _id
);

/* ─── Settings Sub-schema ────────────────────────────────────────────────── */
/** User preferences and notification settings */
const SettingsSchema = new Schema(
  {
    theme:              { type: String, enum: ["light", "dark", "system"], default: "system" },
    language:           { type: String, default: "en" },
    fontSize:           { type: String, enum: ["small", "medium", "large"], default: "medium" },
    reducedMotion:      { type: Boolean, default: false },
    compactMode:        { type: Boolean, default: false },
    soundEffects:       { type: Boolean, default: true },
    autoPlayNextLesson: { type: Boolean, default: false },

    /* Email notifications */
    emailStreak:        { type: Boolean, default: true },
    emailWeeklyReport:  { type: Boolean, default: true },
    emailBattleInvite:  { type: Boolean, default: false },
    emailEvents:        { type: Boolean, default: true },
    emailNewsletter:    { type: Boolean, default: true },

    /* Privacy */
    publicProfile:      { type: Boolean, default: true },
    showActivity:       { type: Boolean, default: true },
    searchIndexed:      { type: Boolean, default: true },
    showOnLeaderboard:  { type: Boolean, default: true },
  },
  { _id: false }
);

/* ─── Badge Sub-schema ───────────────────────────────────────────────────── */
const BadgeSchema = new Schema(
  {
    id:         { type: String, required: true }, // Badge identifier
    name:       { type: String, required: true }, // Display name
    icon:       { type: String, required: true }, // Emoji icon
    earnedAt:   { type: Date,   required: true }, // When earned
    category:   { type: String, required: true }, // "streak" | "completion" | "battle" | etc.
  },
  { _id: false }
);

/* ─── User Interface ─────────────────────────────────────────────────────── */
export interface IUser extends Document {
  /* Identity */
  clerkId:       string;     // Clerk user ID (primary key)
  email:         string;     // Email address
  username:      string;     // Unique username
  displayName:   string;     // Full display name
  bio:           string;     // Short bio (max 160 chars)
  avatarUrl:     string;     // Profile picture URL

  /* Auth */
  role:          "student" | "teacher" | "admin" | "moderator"; // User role

  /* Learning context */
  currentClass:  string;     // e.g. "class-9", "engineering", "programming"
  activeTracks:  string[];   // Active learning tracks e.g. ["python", "dsa"]
  school?:       string;     // School name (optional)
  city?:         string;     // City (optional)
  country:       string;     // Country code (default: "IN")

  /* Sub-documents */
  progress:      typeof ProgressSchema; // Learning progress
  settings:      typeof SettingsSchema; // User preferences
  badges:        (typeof BadgeSchema)[]; // Earned badges

  /* Timestamps */
  createdAt:     Date;
  updatedAt:     Date;
  lastLoginAt:   Date;
}

/* ─── User Schema ────────────────────────────────────────────────────────── */
const UserSchema = new Schema<IUser>(
  {
    /* Identity */
    clerkId:       { type: String, required: true, unique: true, index: true },
    email:         { type: String, required: true, unique: true, lowercase: true, trim: true },
    username:      { type: String, required: true, unique: true, trim: true, minlength: 3, maxlength: 30,
                     match: /^[a-zA-Z0-9_-]+$/ }, // Alphanumeric + underscore/hyphen only
    displayName:   { type: String, required: true, trim: true, maxlength: 50 },
    bio:           { type: String, default: "", maxlength: 160 },
    avatarUrl:     { type: String, default: "" },

    /* Auth */
    role:          { type: String, enum: ["student", "teacher", "admin", "moderator"], default: "student" },

    /* Learning context */
    currentClass:  { type: String, default: "general" },
    activeTracks:  [{ type: String }],
    school:        { type: String, default: "" },
    city:          { type: String, default: "" },
    country:       { type: String, default: "IN" },

    /* Sub-documents */
    progress:      { type: ProgressSchema, default: () => ({}) },
    settings:      { type: SettingsSchema, default: () => ({}) },
    badges:        [BadgeSchema],

    /* Timestamps */
    lastLoginAt:   { type: Date, default: Date.now },
  },
  {
    timestamps: true, // Auto-add createdAt and updatedAt
    toJSON:     { virtuals: true }, // Include virtuals in JSON output
  }
);

/* ─── Indexes for query performance ──────────────────────────────────────── */
UserSchema.index({ "progress.xp":     -1 }); // Leaderboard by XP
UserSchema.index({ "progress.streak": -1 }); // Leaderboard by streak
UserSchema.index({ country: 1, "progress.xp": -1 }); // Country-specific leaderboard
UserSchema.index({ currentClass: 1, "progress.xp": -1 }); // Class-specific leaderboard
UserSchema.index({ createdAt: -1 }); // New user queries

/* ─── Virtual: Full profile URL ──────────────────────────────────────────── */
UserSchema.virtual("profileUrl").get(function (this: IUser) {
  return `/profile/${this.username}`;
});

/* ─── Pre-save hook: level calculation ───────────────────────────────────── */
// Automatically update XP level before saving
UserSchema.pre("save", function (next) {
  if (this.isModified("progress.xp")) {
    const xp    = this.progress?.xp ?? 0;
    /* Level formula: xp = 100 × level² → level = √(xp/100) */
    const level = Math.min(100, Math.max(1, Math.floor(Math.sqrt(xp / 100)) + 1));
    this.progress.level = level;

    /* Update tier based on level */
    if      (level >= 90) this.progress.tier = "Grandmaster";
    else if (level >= 80) this.progress.tier = "Legend";
    else if (level >= 70) this.progress.tier = "Diamond";
    else if (level >= 60) this.progress.tier = "Emerald";
    else if (level >= 50) this.progress.tier = "Ruby";
    else if (level >= 40) this.progress.tier = "Sapphire";
    else if (level >= 30) this.progress.tier = "Platinum";
    else if (level >= 20) this.progress.tier = "Gold";
    else if (level >= 10) this.progress.tier = "Silver";
    else                  this.progress.tier = "Bronze";
  }
  next();
});

/* ─── Model export ───────────────────────────────────────────────────────── */
// Guard against model recompilation in development (Next.js hot reload)
export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;
