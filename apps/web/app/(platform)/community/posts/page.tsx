/**
 * @file app/(platform)/community/posts/page.tsx
 * @description Community posts / discussion feed — general academic discussions
 * Route: /community/posts
 * Shows: Discussion posts, study tips, resource shares, and announcements
 */

import type { Metadata } from "next";
import Link from "next/link";
import {
  FileText, ChevronRight, Heart, MessageSquare, Share2,
  Plus, Search, BookOpen, Clock, Lightbulb, Star,
} from "lucide-react";
import { Badge }  from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* ─── Page Metadata ──────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title:  "Community Posts — LearnVeda",
  description: "Discussion posts, study tips, and resources shared by the LearnVeda student community.",
};

/* ─── Posts Data ─────────────────────────────────────────────────────────── */
const POSTS = [
  {
    id:      "p-001",
    type:    "tip",
    author:  "topper_arjun",
    avatar:  "A",
    title:   "I scored 98/100 in Class 9 Math — here's exactly how I studied 🎯",
    excerpt: "I divided each chapter into 3 phases: (1) Read NCERT theory with notes, (2) Solve all examples, (3) Do exercise problems. I also used the LearnVeda simulations for geometry chapters...",
    subject: "Mathematics",
    tags:    ["Study Tips", "NCERT", "Class 9", "Math"],
    likes:   145,
    comments: 32,
    time:    "3 hours ago",
    featured: true,
  },
  {
    id:      "p-002",
    type:    "resource",
    author:  "priya_notes",
    avatar:  "P",
    title:   "Free handwritten notes for ALL Class 10 Science chapters — PDF links",
    excerpt: "I spent 3 months making these notes. Covers Physics, Chemistry, and Biology for Class 10. Fully NCERT aligned with diagrams...",
    subject: "Science",
    tags:    ["Class 10", "Science", "Notes", "Free Resources"],
    likes:   312,
    comments: 89,
    time:    "Yesterday",
    featured: true,
  },
  {
    id:      "p-003",
    type:    "discussion",
    author:  "coder_rohit",
    avatar:  "R",
    title:   "Is Python or JavaScript better for a beginner in Class 10?",
    excerpt: "I'm about to start my first programming language. My friends recommend Python, but my cousin says JavaScript is more useful for getting jobs. What does the community think?",
    subject: "Programming",
    tags:    ["Python", "JavaScript", "Beginners"],
    likes:   78,
    comments: 45,
    time:    "2 days ago",
    featured: false,
  },
  {
    id:      "p-004",
    type:    "announcement",
    author:  "learnveda_team",
    avatar:  "L",
    title:   "🎉 Python Championship starts tomorrow — 780 students registered!",
    excerpt: "The July 2026 Python Championship begins tomorrow at 5 PM IST. 6 rounds, 45 min per round, covering Python fundamentals to advanced OOP. Top 3 winners get certificates + 10,000 XP...",
    subject: "Python",
    tags:    ["Event", "Championship", "Python"],
    likes:   234,
    comments: 67,
    time:    "Today",
    featured: true,
  },
];

/* ─── Post Type Config ───────────────────────────────────────────────────── */
const POST_TYPE_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  tip:          { label: "Study Tip",     color: "text-green-600",  bg: "bg-green-500/10 border-green-500/20"  },
  resource:     { label: "Resource",      color: "text-blue-600",   bg: "bg-blue-500/10 border-blue-500/20"    },
  discussion:   { label: "Discussion",    color: "text-purple-600", bg: "bg-purple-500/10 border-purple-500/20"},
  announcement: { label: "Announcement",  color: "text-amber-600",  bg: "bg-amber-500/10 border-amber-500/20"  },
};

/* ─── Posts Page Component ────────────────────────────────────────────────── */
export default function PostsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="border-b bg-gradient-to-br from-purple-500/5 to-background">
        <div className="container px-4 py-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/community" className="hover:text-foreground transition-colors">Community</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">Posts</span>
          </nav>

          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Community Posts</h1>
                <p className="text-sm text-muted-foreground">Discussions, tips, and resources</p>
              </div>
            </div>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Create Post
            </Button>
          </div>

          <div className="relative max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search posts..."
              className="w-full rounded-xl border bg-background pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
      </div>

      {/* ── Posts Feed ───────────────────────────────────────────────────── */}
      <div className="container px-4 py-8 max-w-3xl">
        {/* Filter tabs */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          {["All", "Study Tips", "Resources", "Discussion", "Announcements"].map((f, i) => (
            <button
              key={f}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                i === 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {POSTS.map((post) => {
            const config = POST_TYPE_CONFIG[post.type];
            return (
              <Link
                key={post.id}
                href={`/community/posts/${post.id}`}
                className="group block rounded-2xl border bg-card hover:shadow-lg transition-all p-5"
              >
                {/* Author header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                    {post.avatar}
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-medium">@{post.author}</span>
                    <span className="text-xs text-muted-foreground ml-2">{post.time}</span>
                  </div>
                  <Badge className={`text-[9px] py-0 ${config.bg} ${config.color}`}>
                    {config.label}
                  </Badge>
                  {post.featured && (
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                  )}
                </div>

                {/* Title + excerpt */}
                <h2 className="font-bold text-base mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{post.excerpt}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                    <Heart className="h-3.5 w-3.5" />
                    {post.likes}
                  </button>
                  <button className="flex items-center gap-1 hover:text-primary transition-colors">
                    <MessageSquare className="h-3.5 w-3.5" />
                    {post.comments}
                  </button>
                  <button className="flex items-center gap-1 hover:text-primary transition-colors">
                    <Share2 className="h-3.5 w-3.5" />
                    Share
                  </button>
                  <span className="flex items-center gap-1 ml-auto">
                    <BookOpen className="h-3 w-3" />
                    {post.subject}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
