/**
 * @file features/community/components/CommunityFeed.tsx
 * @description Community forum feed for the Community page
 *
 * Shows:
 *  - Category tabs (Questions, Discussions, Announcements, etc.)
 *  - Search bar
 *  - Post cards with author, title, stats (likes, replies, views)
 *  - Compose button (opens post creation modal)
 *  - Trending topics sidebar
 *
 * Data: in production, fetches from /api/community/posts
 * For now: uses static demo data with real-looking content
 */

"use client"; // Client component — filtering and search state

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Search, PenSquare, ThumbsUp, MessageSquare, Eye,
  Tag, TrendingUp, Pin, CheckCircle2, Filter, Flame,
} from "lucide-react";
import { Badge }  from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input }  from "@/components/ui/input";

/* ─── Types ──────────────────────────────────────────────────────────────── */
type PostCategory = "all" | "question" | "discussion" | "announcement" | "resource";

interface Post {
  id:         string;
  title:      string;
  author:     string;
  authorAvatar: string;   // Initials
  category:   Exclude<PostCategory, "all">;
  tags:       string[];
  likes:      number;
  replies:    number;
  views:      number;
  isPinned:   boolean;
  isResolved: boolean;
  timeAgo:    string;
  preview:    string;     // First 120 chars of post body
}

/* ─── Demo Posts ─────────────────────────────────────────────────────────── */
const DEMO_POSTS: Post[] = [
  {
    id: "1", title: "How to solve quadratic equations step by step?",
    author: "Arjun S.", authorAvatar: "AS", category: "question",
    tags: ["Mathematics", "Class 10"], likes: 42, replies: 8, views: 234,
    isPinned: false, isResolved: true,
    timeAgo: "2 hours ago",
    preview: "I'm struggling with the quadratic formula. Can someone explain when to use factorization vs the formula? I have boards next month..."
  },
  {
    id: "2", title: "📢 New: Physics Simulations for Class 12 are LIVE!",
    author: "LearnVeda Team", authorAvatar: "LV", category: "announcement",
    tags: ["Physics", "Simulations", "Class 12"], likes: 187, replies: 23, views: 1204,
    isPinned: true, isResolved: false,
    timeAgo: "1 day ago",
    preview: "We've just released 15 new interactive physics simulations for Class 12 — covering Electrostatics, Current Electricity, and Magnetism. All free to access..."
  },
  {
    id: "3", title: "Best resources for DSA preparation — what's working for me",
    author: "Priya M.", authorAvatar: "PM", category: "resource",
    tags: ["DSA", "Engineering", "Interview"], likes: 95, replies: 31, views: 876,
    isPinned: false, isResolved: false,
    timeAgo: "3 days ago",
    preview: "After 6 months of daily DSA practice, here's what actually helped me get a placement. TL;DR: consistency beats cramming every time..."
  },
  {
    id: "4", title: "Python vs Java for beginners — which should I start with?",
    author: "Rahul K.", authorAvatar: "RK", category: "discussion",
    tags: ["Python", "Java", "Programming"], likes: 63, replies: 47, views: 542,
    isPinned: false, isResolved: false,
    timeAgo: "5 days ago",
    preview: "I've been going back and forth between Python and Java. Both have pros and cons. What do you think is better for a complete beginner who wants to eventually get into backend dev?"
  },
  {
    id: "5", title: "Confused about Newton's 3rd Law — action-reaction pairs",
    author: "Sneha G.", authorAvatar: "SG", category: "question",
    tags: ["Physics", "Class 9"], likes: 28, replies: 12, views: 198,
    isPinned: false, isResolved: true,
    timeAgo: "1 week ago",
    preview: "My teacher explained Newton's 3rd Law but I'm confused about why action and reaction forces don't cancel out. If they're equal and opposite..."
  },
  {
    id: "6", title: "Study group for CBSE Class 12 Boards 2025 — join us!",
    author: "Kavya R.", authorAvatar: "KR", category: "discussion",
    tags: ["CBSE", "Class 12", "Study Group"], likes: 112, replies: 89, views: 1045,
    isPinned: false, isResolved: false,
    timeAgo: "1 week ago",
    preview: "Starting a study group for Class 12 board preparation. We meet daily at 7 PM on Discord for 1-hour focused sessions. All subjects welcome..."
  },
];

/* ─── Category Tabs ──────────────────────────────────────────────────────── */
const CATEGORIES: { value: PostCategory; label: string; count: number }[] = [
  { value: "all",          label: "All Posts",     count: 1204 },
  { value: "question",     label: "Questions",     count: 543  },
  { value: "discussion",   label: "Discussions",   count: 387  },
  { value: "announcement", label: "Announcements", count: 42   },
  { value: "resource",     label: "Resources",     count: 232  },
];

/* ─── Category badge colors ──────────────────────────────────────────────── */
const CATEGORY_COLORS: Record<Exclude<PostCategory, "all">, string> = {
  question:     "bg-blue-500/10 text-blue-500 border-blue-500/20",
  discussion:   "bg-purple-500/10 text-purple-500 border-purple-500/20",
  announcement: "bg-brand-500/10 text-brand-500 border-brand-500/20",
  resource:     "bg-green-500/10 text-green-500 border-green-500/20",
};

/* ─── CommunityFeed Component ────────────────────────────────────────────── */
export function CommunityFeed() {
  const [activeCategory, setActiveCategory] = useState<PostCategory>("all"); // Active tab
  const [searchQuery,    setSearchQuery]    = useState("");                   // Search input

  // Filter posts by category and search query
  const filtered = DEMO_POSTS.filter((post) => {
    const matchesCategory = activeCategory === "all" || post.category === activeCategory;
    const matchesSearch   = !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 md:px-6 py-10">
        {/* ── Header ────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Community</h1>
            <p className="text-muted-foreground mt-1">Ask questions, share resources, connect with learners</p>
          </div>
          <Button className="gap-2 flex-shrink-0">
            <PenSquare className="h-4 w-4" />
            New Post
          </Button>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* ── Main feed ─────────────────────────────────────────────── */}
          <div className="lg:col-span-3 space-y-4">
            {/* Search bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search posts, topics, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Category tabs */}
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === cat.value
                      ? "bg-brand-500 text-white shadow-sm"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat.label}
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    activeCategory === cat.value ? "bg-white/20" : "bg-background"
                  }`}>
                    {cat.count.toLocaleString()}
                  </span>
                </button>
              ))}
            </div>

            {/* Post cards */}
            <div className="space-y-3">
              {filtered.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.35 }}
                  className="rounded-2xl border bg-card p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Post header */}
                  <div className="flex items-start gap-3 mb-3">
                    {/* Author avatar */}
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-xs">{post.authorAvatar}</span>
                    </div>
                    {/* Author and time */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-medium text-foreground">{post.author}</span>
                        <span className="text-xs text-muted-foreground">{post.timeAgo}</span>
                        {post.isPinned && (
                          <span className="flex items-center gap-1 text-xs text-brand-500">
                            <Pin className="h-3 w-3" /> Pinned
                          </span>
                        )}
                      </div>
                      {/* Category + resolved badge */}
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className={`text-xs ${CATEGORY_COLORS[post.category]}`}>
                          {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                        </Badge>
                        {post.isResolved && (
                          <span className="flex items-center gap-1 text-xs text-green-500">
                            <CheckCircle2 className="h-3 w-3" /> Resolved
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Post title */}
                  <h3 className="font-semibold text-foreground mb-2 hover:text-brand-500 transition-colors cursor-pointer leading-snug">
                    {post.title}
                  </h3>

                  {/* Post preview */}
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed line-clamp-2">
                    {post.preview}
                  </p>

                  {/* Tags */}
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <Tag className="h-3.5 w-3.5 text-muted-foreground" />
                    {post.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground hover:text-foreground cursor-pointer">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Post stats */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1 hover:text-foreground cursor-pointer">
                      <ThumbsUp className="h-3.5 w-3.5" /> {post.likes}
                    </span>
                    <span className="flex items-center gap-1 hover:text-foreground cursor-pointer">
                      <MessageSquare className="h-3.5 w-3.5" /> {post.replies}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3.5 w-3.5" /> {post.views}
                    </span>
                  </div>
                </motion.div>
              ))}

              {/* Empty state */}
              {filtered.length === 0 && (
                <div className="text-center py-16 text-muted-foreground">
                  <p>No posts match your search. Try a different keyword.</p>
                </div>
              )}
            </div>
          </div>

          {/* ── Sidebar ───────────────────────────────────────────────── */}
          <div className="space-y-5">
            {/* Stats card */}
            <div className="rounded-2xl border bg-card p-5 shadow-sm">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Flame className="h-4 w-4 text-orange-500" />
                Community Stats
              </h3>
              {[
                { label: "Total Posts",   value: "12,048" },
                { label: "Active Members",value: "4,521"  },
                { label: "Answers Today", value: "234"    },
                { label: "Questions Resolved", value: "89%" },
              ].map((stat) => (
                <div key={stat.label} className="flex justify-between py-2 border-b last:border-0 text-sm">
                  <span className="text-muted-foreground">{stat.label}</span>
                  <span className="font-semibold text-foreground">{stat.value}</span>
                </div>
              ))}
            </div>

            {/* Trending tags */}
            <div className="rounded-2xl border bg-card p-5 shadow-sm">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-brand-500" />
                Trending Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Mathematics", "Physics", "Python", "DSA", "Class 12", "CBSE", "Java", "Boards 2025", "Chemistry", "JavaScript"].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground hover:bg-brand-500/10 hover:text-brand-500 transition-colors"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Sub-navigation */}
            <div className="rounded-2xl border bg-card p-5 shadow-sm">
              <h3 className="font-semibold text-foreground mb-3">Community</h3>
              {[
                { href: "/community",           label: "Feed"         },
                { href: "/community/questions",  label: "Questions"    },
                { href: "/community/posts",      label: "Posts"        },
                { href: "/community/groups",     label: "Study Groups" },
                { href: "/community/chat",       label: "Live Chat"    },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center justify-between py-2 text-sm text-muted-foreground hover:text-foreground transition-colors border-b last:border-0"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div className="rounded-2xl bg-gradient-to-br from-brand-500 to-purple-500 p-5 text-white">
              <p className="font-semibold mb-2">Get Help from AI Tutor</p>
              <p className="text-sm opacity-90 mb-4">Ask any question and get a detailed answer in seconds.</p>
              <Link href="/ai-tutor">
                <Button size="sm" variant="secondary" className="w-full">Open AI Tutor</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
