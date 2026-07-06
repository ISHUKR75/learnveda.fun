/**
 * @file lib/mongodb/models/CommunityPost.ts
 * @description Mongoose CommunityPost model for LearnVeda
 *
 * Stores forum-style posts created by students in the community section.
 * Supports questions, discussions, and announcements.
 * Includes moderation fields (flagged, pinned) for the admin panel.
 */

import mongoose, { Document, Model, Schema } from "mongoose"; // ODM types

/* ─── TypeScript Interface ───────────────────────────────────────────────── */
export interface ICommunityPost extends Document {
  authorId:     string;   // MongoDB User._id of the post creator
  authorName:   string;   // Denormalized name — avoids join on every read
  authorAvatar: string;   // Denormalized avatar URL
  category:     PostCategory; // Topic category for filtering
  title:        string;   // Post headline
  content:      string;   // Full post body (Markdown supported)
  tags:         string[]; // Searchable tags (e.g. ["mathematics", "class-9"])
  likes:        number;   // Total upvote count
  views:        number;   // View / impression count
  replies:      number;   // Comment count (denormalized for fast card rendering)
  isPinned:     boolean;  // Admin-pinned posts appear at the top
  isResolved:   boolean;  // For questions — marks when an answer is accepted
  isFlagged:    boolean;  // Moderation flag — temporarily hides the post
  slug:         string;   // URL-safe unique identifier for the post
  createdAt:    Date;     // Post creation timestamp
  updatedAt:    Date;     // Last edit timestamp
}

/* ─── Post Category Enum ─────────────────────────────────────────────────── */
type PostCategory =
  | "question"     // Student is asking for help
  | "discussion"   // Open-ended topic discussion
  | "announcement" // Official LearnVeda announcement
  | "study-group"  // Looking for study partners
  | "resource"     // Sharing external resources
  | "off-topic";   // Casual conversation

/* ─── Schema Definition ──────────────────────────────────────────────────── */
const CommunityPostSchema = new Schema<ICommunityPost>(
  {
    authorId: {
      type:     String,   // Reference to the User who created the post
      required: [true, "Author ID is required"],
      index:    true,     // Find all posts by a specific user
    },

    authorName: {
      type:     String,   // Stored at write time to avoid joins on read
      required: [true, "Author name is required"],
      trim:     true,
    },

    authorAvatar: {
      type:    String,    // Author's avatar URL — denormalized for feed renders
      default: "",
    },

    category: {
      type:     String,   // Post type — used for tab filtering in the feed
      enum:     ["question", "discussion", "announcement", "study-group", "resource", "off-topic"],
      required: [true, "Category is required"],
      index:    true,     // Frequently filtered by category
    },

    title: {
      type:      String,  // Post title shown in feed cards
      required:  [true, "Title is required"],
      trim:      true,
      maxlength: [200, "Title must be ≤ 200 characters"],
    },

    content: {
      type:     String,   // Markdown content — rendered on the detail page
      required: [true, "Content is required"],
    },

    tags: {
      type:    [String],  // Array of lowercase tags for search and filtering
      default: [],
    },

    likes: {
      type:    Number,    // Upvote count — incremented atomically via $inc
      default: 0,
      min:     0,
    },

    views: {
      type:    Number,    // Incremented each time the detail page is opened
      default: 0,
      min:     0,
    },

    replies: {
      type:    Number,    // Denormalized comment count — updated when replies are added
      default: 0,
      min:     0,
    },

    isPinned: {
      type:    Boolean,   // Pinned posts appear first in the feed
      default: false,
    },

    isResolved: {
      type:    Boolean,   // For questions — true when an accepted answer exists
      default: false,
    },

    isFlagged: {
      type:    Boolean,   // Soft-moderation — flagged posts are hidden from the feed
      default: false,
    },

    slug: {
      type:     String,   // URL-safe identifier (e.g. "how-to-solve-quadratic-12345")
      unique:   true,     // Each post has a unique URL
      required: [true, "Slug is required"],
      lowercase: true,
      trim:     true,
    },
  },
  {
    timestamps: true,     // Auto-manage createdAt and updatedAt
    versionKey: false,    // Skip __v
  }
);

/* ─── Indexes ────────────────────────────────────────────────────────────── */
// Feed query: non-flagged posts sorted by newest first
CommunityPostSchema.index({ isFlagged: 1, createdAt: -1 });

// Category-filtered feed
CommunityPostSchema.index({ category: 1, isFlagged: 1, createdAt: -1 });

// Hot posts (trending by likes)
CommunityPostSchema.index({ likes: -1, createdAt: -1 });

// Text search on title and content
CommunityPostSchema.index({ title: "text", content: "text", tags: "text" });

/* ─── Model Export ───────────────────────────────────────────────────────── */
export const CommunityPost: Model<ICommunityPost> =
  (mongoose.models.CommunityPost as Model<ICommunityPost>) ??
  mongoose.model<ICommunityPost>("CommunityPost", CommunityPostSchema);

export default CommunityPost;
