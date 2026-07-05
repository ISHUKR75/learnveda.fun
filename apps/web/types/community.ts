/**
 * @file types/community.ts
 * @description Community forum, Q&A, posts, comments, and groups TypeScript types
 * Used across community pages, discussion threads, and knowledge sharing features
 */

/* ─── Post Category ───────────────────────────────────────────────────────── */
export type PostCategory =
  | "question"       // "How do I solve this problem?"
  | "discussion"     // "What do you think about X?"
  | "tip"            // "Pro tip: use this trick for Y"
  | "resource"       // "Here's a great resource for Z"
  | "project"        // "Check out what I built!"
  | "announcement";  // Platform-wide announcement

/* ─── Community Post ──────────────────────────────────────────────────────── */
/**
 * A post in the community forum — question, discussion, or resource share
 */
export interface CommunityPost {
  id:          string;       // Unique post ID
  authorId:    string;       // Author's user ID
  authorName:  string;       // Author's display name (denormalized for performance)
  authorLevel: number;       // Author's level (shown on post card)
  title:       string;       // Post title
  content:     string;       // Post body (markdown supported)
  category:    PostCategory; // Post type
  subject?:    string;       // Related subject (if academic)
  tags:        string[];     // Searchable tags (e.g. ["python", "recursion", "help"])
  upvotes:     number;       // Upvote count
  downvotes:   number;       // Downvote count
  viewCount:   number;       // Total view count
  answerCount: number;       // Number of answers/comments
  isResolved:  boolean;      // For questions: marked as resolved
  isPinned:    boolean;      // Pinned by moderator
  createdAt:   Date;         // Post creation timestamp
  updatedAt:   Date;         // Last edit timestamp
}

/* ─── Community Comment / Answer ─────────────────────────────────────────── */
/**
 * A comment or answer on a community post
 */
export interface CommunityComment {
  id:            string;  // Unique comment ID
  postId:        string;  // Parent post ID
  parentId?:     string;  // Parent comment ID (for nested replies)
  authorId:      string;  // Author's user ID
  authorName:    string;  // Author's display name
  authorLevel:   number;  // Author's level
  content:       string;  // Comment body (markdown supported)
  upvotes:       number;  // Upvote count
  isAccepted:    boolean; // Accepted answer (for questions)
  createdAt:     Date;    // Comment timestamp
}

/* ─── Study Group ─────────────────────────────────────────────────────────── */
/**
 * A study group where students can collaborate
 */
export interface StudyGroup {
  id:          string;   // Unique group ID
  name:        string;   // Group name
  description: string;   // What the group is about
  subject:     string;   // Primary subject focus
  grade:       string;   // Target grade level
  memberCount: number;   // Current member count
  maxMembers:  number;   // Maximum allowed members
  isPrivate:   boolean;  // Private (invite-only) vs public
  tags:        string[]; // Searchable tags
  createdBy:   string;   // Creator's user ID
  createdAt:   Date;     // Group creation timestamp
}

/* ─── User Vote ───────────────────────────────────────────────────────────── */
/**
 * Records a user's upvote or downvote on a post or comment
 */
export interface UserVote {
  userId:   string;                  // Voter's user ID
  targetId: string;                  // Post or comment being voted on
  type:     "upvote" | "downvote";   // Vote direction
  votedAt:  Date;                    // When the vote was cast
}
