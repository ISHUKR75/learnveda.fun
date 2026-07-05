/**
 * @file types/user.ts
 * @description User, profile, authentication, and gamification TypeScript types
 * Used across dashboard, profile pages, leaderboard, and auth flows
 */

/* ─── User Roles ──────────────────────────────────────────────────────────── */
export type UserRole = "student" | "teacher" | "mentor" | "admin" | "moderator";

/* ─── User Grade/Level ────────────────────────────────────────────────────── */
export type UserGrade =
  | "class-9"
  | "class-10"
  | "class-11"
  | "class-12"
  | "engineering-1"
  | "engineering-2"
  | "engineering-3"
  | "engineering-4"
  | "graduate";

/* ─── Base User ───────────────────────────────────────────────────────────── */
/**
 * Core user object — matches the MongoDB users collection schema
 * Contains all fields needed across the platform
 */
export interface User {
  id:           string;       // MongoDB ObjectId (string representation)
  clerkId:      string;       // Clerk user ID for auth integration
  email:        string;       // Primary email address
  username:     string;       // Unique public username (URL-safe)
  displayName:  string;       // Full display name shown in UI
  avatar?:      string;       // Profile picture URL (Cloudinary)
  role:         UserRole;     // Access level role
  grade:        UserGrade;    // Current education level
  school?:      string;       // School/college name
  bio?:         string;       // Short profile bio
  location?:    string;       // City, State (optional)
  createdAt:    Date;         // Account creation timestamp
  updatedAt:    Date;         // Last profile update
}

/* ─── User Gamification Stats ─────────────────────────────────────────────── */
/**
 * XP, streaks, levels, and achievement data for a user
 * Shown on dashboard, profile page, and leaderboard
 */
export interface UserStats {
  userId:             string;  // Reference to User.id
  xp:                 number;  // Total experience points earned
  level:              number;  // Current level (1–100)
  xpToNextLevel:      number;  // XP required to reach next level
  streak:             number;  // Current daily login streak (days)
  longestStreak:      number;  // All-time best streak (days)
  chaptersCompleted:  number;  // Total chapters finished
  practiceScore:      number;  // Average practice quiz score (0–100)
  battlesWon:         number;  // Total live battles won
  battlesPlayed:      number;  // Total live battles participated in
  rank:               number;  // Global leaderboard rank position
  stars:              number;  // Premium currency (wagered in ranked battles)
  certificates:       number;  // Certificates earned
  lastActiveAt:       Date;    // Last platform activity timestamp
}

/* ─── User Progress Entry ─────────────────────────────────────────────────── */
/**
 * Tracks completion status for individual chapters/lessons
 */
export interface UserProgress {
  userId:       string;   // User reference
  chapterId:    string;   // Chapter reference
  subjectId:    string;   // Subject reference
  completed:    boolean;  // Whether chapter is fully completed
  completedAt?: Date;     // When the chapter was completed
  score?:       number;   // Chapter quiz score (0–100)
  timeSpent:    number;   // Time spent on chapter in seconds
}

/* ─── Achievement / Badge ─────────────────────────────────────────────────── */
/**
 * A badge or achievement earned by completing specific milestones
 */
export interface Achievement {
  id:          string;  // Unique achievement ID
  name:        string;  // Badge name (e.g. "First Blood", "Week Warrior")
  description: string;  // What triggered this achievement
  emoji:       string;  // Visual icon/emoji
  category:    "study" | "battle" | "streak" | "social" | "special"; // Category
  xpReward:    number;  // XP granted when unlocked
  rarity:      "common" | "rare" | "epic" | "legendary";             // Drop rarity
  unlockedAt?: Date;    // When the user earned this (undefined = locked)
}

/* ─── Notification ────────────────────────────────────────────────────────── */
/**
 * Platform notification sent to a user
 */
export interface Notification {
  id:        string;    // Unique notification ID
  userId:    string;    // Target user ID
  type:      "battle" | "achievement" | "system" | "community" | "streak"; // Type
  title:     string;    // Short notification title
  message:   string;    // Full notification body
  href?:     string;    // Optional link (e.g. /live-battles/result/123)
  read:      boolean;   // Whether the user has read/dismissed it
  createdAt: Date;      // When the notification was created
}

/* ─── Session ─────────────────────────────────────────────────────────────── */
/**
 * Auth session stored server-side for Clerk + custom session management
 */
export interface Session {
  sessionId:  string;   // Secure session token (stored in HTTPOnly cookie)
  userId:     string;   // Linked user ID
  clerkId:    string;   // Clerk user ID
  expiresAt:  Date;     // Session expiry timestamp
  ipAddress?: string;   // Client IP (for security logging)
  userAgent?: string;   // Browser user-agent (for security display)
  createdAt:  Date;     // Session creation timestamp
}
