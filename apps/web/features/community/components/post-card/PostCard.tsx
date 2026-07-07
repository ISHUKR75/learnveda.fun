/**
 * @file features/community/components/post-card/PostCard.tsx
 * @description Individual community post card component
 *
 * Displays a community post with:
 * - Author avatar + name + role
 * - Post title + preview excerpt
 * - Category badge + subject tags
 * - Stats: likes, replies, views
 * - Special indicators: pinned, resolved, mentor reply
 * - Time posted
 *
 * Used in: CommunityFeed, Community page, Home community section
 */

"use client"; // Client component — like/upvote interaction

import React, { useState } from "react"; // React + state for optimistic like
import Link from "next/link"; // Navigation
import { motion } from "framer-motion"; // Hover animation
import {
  ThumbsUp, MessageSquare, Eye, Pin, CheckCircle2,
  Clock, ChevronRight, Award,
} from "lucide-react"; // Post stat icons
import { Badge } from "@/components/ui/badge"; // Category + tag badges

/* ─── Types ──────────────────────────────────────────────────────────────── */

/** Category badge color map */
const CATEGORY_COLORS: Record<string, string> = {
  question:     "border-blue-500/40 text-blue-600",
  discussion:   "border-green-500/40 text-green-600",
  announcement: "border-red-500/40 text-red-600",
  resource:     "border-purple-500/40 text-purple-600",
};

/** Post data shape */
export interface PostData {
  id:           string;                                        // Unique post ID
  title:        string;                                        // Post headline
  author:       string;                                        // Author display name
  authorAvatar: string;                                        // Initials for avatar fallback
  category:     "question" | "discussion" | "announcement" | "resource"; // Post type
  tags:         string[];                                      // Subject tags
  likes:        number;                                        // Like count
  replies:      number;                                        // Reply count
  views:        number;                                        // View count
  isPinned:     boolean;                                       // Pinned by moderator
  isResolved:   boolean;                                       // Question marked resolved
  isMentorReply?:boolean;                                      // Has a mentor reply
  timeAgo:      string;                                        // Relative timestamp
  preview:      string;                                        // First 120 chars of body
}

/* ─── PostCard Component ─────────────────────────────────────────────────── */

/**
 * Renders a single community post card with interaction buttons.
 *
 * @param post - Post data to display
 * @param index - Position in list for stagger animation delay
 */
export function PostCard({ post, index = 0 }: { post: PostData; index?: number }) {
  // Optimistic like state — updates immediately on click without waiting for API
  const [liked,     setLiked]     = useState(false);  // Whether user has liked this post
  const [likeCount, setLikeCount] = useState(post.likes); // Current like count

  /** Handle like toggle — optimistic update + API call in production */
  function handleLike(e: React.MouseEvent) {
    e.preventDefault(); // Prevent navigation from the parent Link
    e.stopPropagation();

    if (liked) {
      setLiked(false);         // Unlike
      setLikeCount(c => c - 1); // Decrease count
    } else {
      setLiked(true);          // Like
      setLikeCount(c => c + 1); // Increase count
    }
    // In production: POST /api/community/posts/{post.id}/like
  }

  return (
    <motion.div
      initial={{ opacity: 0.01, y: 12 }} // Entry animation
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="group"
    >
      {/* Main card — link to full post */}
      <Link href={`/community/posts/${post.id}`}>
        <div className="rounded-2xl border bg-card p-5 shadow-sm hover:shadow-md transition-all hover:border-brand-500/30 cursor-pointer">

          {/* ── Top row: pinned/resolved badges + category ──────────── */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex flex-wrap gap-1.5">
              {/* Pinned indicator */}
              {post.isPinned && (
                <Badge variant="outline" className="gap-1 border-red-500/40 text-red-600 h-5 text-xs">
                  <Pin className="h-2.5 w-2.5" /> Pinned
                </Badge>
              )}
              {/* Resolved indicator (for questions) */}
              {post.isResolved && (
                <Badge variant="outline" className="gap-1 border-green-500/40 text-green-600 h-5 text-xs">
                  <CheckCircle2 className="h-2.5 w-2.5" /> Resolved
                </Badge>
              )}
              {/* Mentor reply indicator */}
              {post.isMentorReply && (
                <Badge variant="outline" className="gap-1 border-amber-500/40 text-amber-600 h-5 text-xs">
                  <Award className="h-2.5 w-2.5" /> Mentor Reply
                </Badge>
              )}
              {/* Category badge */}
              <Badge variant="outline" className={`h-5 text-xs capitalize ${CATEGORY_COLORS[post.category] ?? ""}`}>
                {post.category}
              </Badge>
            </div>
          </div>

          {/* ── Post title ───────────────────────────────────────────── */}
          <h3 className="font-semibold text-foreground group-hover:text-brand-500 transition-colors leading-snug mb-1.5">
            {post.title}
          </h3>

          {/* ── Preview text ─────────────────────────────────────────── */}
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-3">
            {post.preview}
          </p>

          {/* ── Tags row ─────────────────────────────────────────────── */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex h-5 px-2 items-center text-xs bg-muted text-muted-foreground rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* ── Footer: author + stats ───────────────────────────────── */}
          <div className="flex items-center justify-between">
            {/* Author info */}
            <div className="flex items-center gap-2">
              {/* Avatar (initials fallback) */}
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-500/10 text-brand-500 text-xs font-semibold">
                {post.authorAvatar}
              </div>
              <span className="text-xs text-muted-foreground">{post.author}</span>
              <span className="text-xs text-muted-foreground">·</span>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {post.timeAgo}
              </div>
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-3">
              {/* Like button with optimistic update */}
              <button
                onClick={handleLike}
                className={`flex items-center gap-1 text-xs transition-colors ${liked ? "text-brand-500" : "text-muted-foreground hover:text-brand-500"}`}
              >
                <ThumbsUp className="h-3.5 w-3.5" />
                {likeCount}
              </button>

              {/* Reply count */}
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MessageSquare className="h-3.5 w-3.5" />
                {post.replies}
              </div>

              {/* View count */}
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Eye className="h-3.5 w-3.5" />
                {post.views}
              </div>

              {/* Arrow */}
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-brand-500 transition-colors" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
