/**
 * @file features/community/components/comment-section/CommentSection.tsx
 * @description Threaded comment section for community posts
 *
 * Features:
 * - Display flat list of comments with reply threading (1 level)
 * - Add new top-level comment
 * - Like / reply to individual comments
 * - Demo mode with static comments when API not configured
 *
 * Used in: community post detail pages, Q&A threads
 */

"use client";

import React, { useState } from "react";
import { ThumbsUp, Reply, ChevronDown, ChevronUp, Send, User } from "lucide-react";
import { Badge }  from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* ─── Comment type ───────────────────────────────────────────────────────── */
interface Comment {
  id:       string;
  author:   string;        // Display name
  avatar:   string;        // Initials for avatar
  content:  string;        // Comment body
  likes:    number;        // Like count
  time:     string;        // Display timestamp
  isVerified?: boolean;    // Mentor / verified badge
  replies?: Comment[];     // Nested replies (1 level)
}

/* ─── Demo comments ──────────────────────────────────────────────────────── */
const DEMO_COMMENTS: Comment[] = [
  {
    id:"c1", author:"Arjun Sharma", avatar:"AS", time:"2 hours ago", likes:12, isVerified:false,
    content:"This explanation is really helpful! I was stuck on the same concept for days. The part about Vieta's formulas was the key insight I was missing.",
    replies:[
      { id:"c1r1", author:"Priya Sharma", avatar:"PS", time:"1 hour ago", likes:5, isVerified:true,
        content:"Exactly! Once you internalize Vieta's formulas, the whole chapter becomes much easier. Let me know if you need help with the practice problems." },
    ],
  },
  {
    id:"c2", author:"Sneha Patel", avatar:"SP", time:"3 hours ago", likes:8, isVerified:false,
    content:"Can anyone clarify — does this apply only to monic polynomials or any quadratic? The textbook example uses leading coefficient 1 everywhere.",
    replies:[],
  },
  {
    id:"c3", author:"Vikram Singh", avatar:"VS", time:"5 hours ago", likes:4, isVerified:false,
    content:"I wrote a Python script to verify these relationships for any polynomial. Happy to share if anyone wants to see it.",
    replies:[
      { id:"c3r1", author:"Rahul Nair", avatar:"RN", time:"4 hours ago", likes:3, isVerified:false,
        content:"Yes please share! That would be really useful for practising." },
    ],
  },
];

/* ─── Single Comment ─────────────────────────────────────────────────────── */
function CommentCard({ comment, depth = 0 }: { comment: Comment; depth?: number }) {
  const [liked,   setLiked]   = useState(false);
  const [likes,   setLikes]   = useState(comment.likes);
  const [showReplies, setShowReplies] = useState(true);
  const [replying, setReplying] = useState(false);
  const [replyText, setReplyText] = useState("");

  function handleLike() {
    if (!liked) { setLikes(l => l + 1); setLiked(true); }
    else        { setLikes(l => l - 1); setLiked(false); }
  }

  return (
    <div className={`flex gap-3 ${depth > 0 ? "ml-8 mt-3" : ""}`}>
      {/* Avatar */}
      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-brand-500/20 flex items-center justify-center text-brand-600 text-xs font-bold">
        {comment.avatar}
      </div>

      <div className="flex-1 min-w-0">
        {/* Author + time */}
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-semibold text-foreground">{comment.author}</span>
          {comment.isVerified && <Badge className="text-xs h-4 bg-blue-500 text-white">Mentor</Badge>}
          <span className="text-xs text-muted-foreground">{comment.time}</span>
        </div>

        {/* Comment body */}
        <p className="text-sm text-foreground leading-relaxed mb-2">{comment.content}</p>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button onClick={handleLike} className={`flex items-center gap-1 text-xs transition-colors ${liked ? "text-brand-500" : "text-muted-foreground hover:text-brand-500"}`}>
            <ThumbsUp className="h-3.5 w-3.5" /> {likes}
          </button>
          {depth === 0 && (
            <button onClick={() => setReplying(!replying)} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-brand-500 transition-colors">
              <Reply className="h-3.5 w-3.5" /> Reply
            </button>
          )}
          {(comment.replies?.length ?? 0) > 0 && depth === 0 && (
            <button onClick={() => setShowReplies(!showReplies)} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
              {showReplies ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
              {comment.replies!.length} {comment.replies!.length === 1 ? "reply" : "replies"}
            </button>
          )}
        </div>

        {/* Reply input */}
        {replying && (
          <div className="flex gap-2 mt-3">
            <input
              value={replyText}
              onChange={e => setReplyText(e.target.value)}
              placeholder="Write a reply..."
              className="flex-1 px-3 py-1.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30"
            />
            <Button size="sm" className="gap-1 h-8 text-xs" onClick={() => { setReplyText(""); setReplying(false); }}>
              <Send className="h-3 w-3" /> Post
            </Button>
          </div>
        )}

        {/* Nested replies */}
        {showReplies && comment.replies?.map(reply => (
          <CommentCard key={reply.id} comment={reply} depth={depth + 1} />
        ))}
      </div>
    </div>
  );
}

/* ─── CommentSection Component ───────────────────────────────────────────── */
export function CommentSection({ postId }: { postId?: string }) {
  const [newComment, setNewComment] = useState("");

  return (
    <div>
      <h3 className="font-semibold text-foreground mb-4">
        {DEMO_COMMENTS.length} Comments
      </h3>

      {/* New comment box */}
      <div className="flex gap-3 mb-6">
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-muted flex items-center justify-center">
          <User className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex-1">
          <textarea
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            rows={3}
            className="w-full px-3 py-2 rounded-xl border bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-500/30 placeholder:text-muted-foreground"
          />
          <div className="flex justify-end mt-2">
            <Button size="sm" className="gap-1.5 h-8 text-xs" disabled={!newComment.trim()} onClick={() => setNewComment("")}>
              <Send className="h-3 w-3" /> Post Comment
            </Button>
          </div>
        </div>
      </div>

      {/* Comment list */}
      <div className="space-y-5">
        {DEMO_COMMENTS.map(comment => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}
