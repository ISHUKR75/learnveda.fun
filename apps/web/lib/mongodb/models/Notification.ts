/**
 * @file lib/mongodb/models/Notification.ts
 * @description Mongoose Notification model for LearnVeda
 *
 * Stores in-app and email-queued notifications for students.
 * Notifications are created by the system (course updates, new content,
 * streak reminders, battle results, etc.) and consumed by the user.
 *
 * Auto-expires: TTL index deletes documents 30 days after creation
 * (or 14 days after being read — whichever comes first via cron job).
 */

import mongoose, { Document, Model, Schema } from "mongoose"; // ODM types

/* ─── TypeScript Interface ───────────────────────────────────────────────── */
export interface INotification extends Document {
  userId:    string;      // Recipient user (MongoDB User._id)
  type:      NotificationType; // Notification category — determines icon and routing
  title:     string;      // Short notification title (max 80 chars)
  message:   string;      // Full notification body (max 500 chars)
  href?:     string;      // Optional deep-link URL within the platform
  isRead:    boolean;     // False = unread (shows badge in UI)
  emailSent: boolean;     // True when an email copy was dispatched via Resend
  createdAt: Date;        // Creation timestamp (used by TTL index)
}

/* ─── Notification Type Enum ─────────────────────────────────────────────── */
// Each type maps to a specific icon and color in the notification UI
type NotificationType =
  | "course_update"     // New chapter or content added to a subscribed course
  | "streak_reminder"   // Daily study reminder to maintain streak
  | "achievement"       // New badge or level-up earned
  | "battle_result"     // Live battle completed — win or loss
  | "announcement"      // Platform-wide announcement from admin
  | "mention"           // User was @mentioned in a community post
  | "reply"             // Someone replied to user's community question
  | "new_content"       // New content released in a subscribed subject
  | "system";           // Generic system notification (password change, etc.)

/* ─── Schema Definition ──────────────────────────────────────────────────── */
const NotificationSchema = new Schema<INotification>(
  {
    userId: {
      type:     String,   // The recipient user's ID
      required: [true, "User ID is required"],
      index:    true,     // Primary query axis — always filter by userId first
    },

    type: {
      type:     String,   // Notification category — drives icon selection on client
      enum:     [
        "course_update", "streak_reminder", "achievement",
        "battle_result", "announcement", "mention", "reply",
        "new_content", "system",
      ],
      required: [true, "Notification type is required"],
    },

    title: {
      type:      String,  // Brief headline shown in notification dropdown
      required:  [true, "Title is required"],
      trim:      true,
      maxlength: [80, "Title must be ≤ 80 characters"],
    },

    message: {
      type:      String,  // Detailed notification text
      required:  [true, "Message is required"],
      trim:      true,
      maxlength: [500, "Message must be ≤ 500 characters"],
    },

    href: {
      type:    String,    // Deep link (e.g. "/dashboard/achievements") — optional
      default: null,
    },

    isRead: {
      type:    Boolean,   // Controls the red badge count in the navbar
      default: false,     // All new notifications are unread
      index:   true,      // Queried with userId to count unread items
    },

    emailSent: {
      type:    Boolean,   // Prevents duplicate email dispatch
      default: false,     // Email is sent asynchronously by a background job
    },

    // TTL index field — MongoDB auto-deletes documents 30 days after creation
    createdAt: {
      type:    Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,     // Auto-adds createdAt and updatedAt
    versionKey: false,    // Skip __v field
  }
);

/* ─── Indexes ────────────────────────────────────────────────────────────── */
// Fetch all unread notifications for a user — the most common query
NotificationSchema.index({ userId: 1, isRead: 1, createdAt: -1 });

// TTL index: MongoDB auto-deletes documents 30 days after creation
// This keeps the collection size bounded without a cron job
NotificationSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 30 * 24 * 60 * 60 } // 30 days in seconds
);

/* ─── Model Export ───────────────────────────────────────────────────────── */
export const Notification: Model<INotification> =
  (mongoose.models.Notification as Model<INotification>) ??
  mongoose.model<INotification>("Notification", NotificationSchema);

export default Notification;
