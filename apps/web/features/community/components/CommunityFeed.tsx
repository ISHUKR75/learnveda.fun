/**
 * @file features/community/components/CommunityFeed.tsx
 * @description Community forum feed component for LearnVeda
 * Displays posts, questions, with category filters and ability to ask new questions
 */

"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Heart, Eye, Pin, CheckCircle2, Plus, Search, TrendingUp, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge }  from "@/components/ui/badge";

/* ─── Category Filters ───────────────────────────────────────────────────── */
const categories = [
  { id: "all",         label: "All",         count: 156 },
  { id: "general",     label: "General",     count: 23  },
  { id: "class-9",     label: "Class 9",     count: 18  },
  { id: "class-10",    label: "Class 10",    count: 31  },
  { id: "class-11",    label: "Class 11",    count: 28  },
  { id: "class-12",    label: "Class 12",    count: 25  },
  { id: "engineering", label: "Engineering", count: 12  },
  { id: "dsa",         label: "DSA",         count: 19  },
];

/* ─── Mock Posts ─────────────────────────────────────────────────────────── */
const mockPosts = [
  {
    id: "1", pinned: true, resolved: true,
    title: "Difference between == and .equals() in Java — when to use which?",
    body: "I keep getting confused about when to use == versus .equals() for string comparison in Java. Can someone explain with examples?",
    category: "Engineering", subject: "Java",
    author: "Priya S.", avatar: "PS", color: "from-purple-500 to-pink-500",
    time: "2 hours ago", views: 234, likes: 45, comments: 12,
    tags: ["java", "strings", "beginner"],
    mentorReply: true,
  },
  {
    id: "2", pinned: false, resolved: false,
    title: "How to approach graph problems in competitive programming? Tips needed!",
    body: "I'm struggling with graph problems on Codeforces. Should I learn BFS/DFS first or dive into advanced algorithms like Dijkstra?",
    category: "DSA", subject: "Graphs",
    author: "Arjun N.", avatar: "AN", color: "from-blue-500 to-cyan-500",
    time: "5 hours ago", views: 189, likes: 28, comments: 8,
    tags: ["graphs", "bfs", "dfs", "competitive-programming"],
    mentorReply: false,
  },
  {
    id: "3", pinned: false, resolved: true,
    title: "Class 11 Chemistry — How to balance redox reactions using oxidation number method?",
    body: "Our teacher explained ion-electron method but I want to understand the oxidation number method better. Can anyone walk me through it step by step?",
    category: "Class 11", subject: "Chemistry",
    author: "Sneha G.", avatar: "SG", color: "from-green-500 to-teal-500",
    time: "Yesterday", views: 312, likes: 67, comments: 15,
    tags: ["chemistry", "redox", "class-11"],
    mentorReply: true,
  },
  {
    id: "4", pinned: false, resolved: false,
    title: "Python list comprehension vs map() — which is more Pythonic?",
    body: "I've seen both used for transforming lists. Is there a performance difference? When should I prefer one over the other?",
    category: "Engineering", subject: "Python",
    author: "Karthik R.", avatar: "KR", color: "from-orange-500 to-red-500",
    time: "2 days ago", views: 145, likes: 32, comments: 7,
    tags: ["python", "list-comprehension", "performance"],
    mentorReply: false,
  },
  {
    id: "5", pinned: false, resolved: false,
    title: "Class 10 Math — Prove that √2 is irrational. Is my proof correct?",
    body: "I wrote a proof by contradiction but not sure if all steps are valid. Here's what I did: Assume √2 = p/q where p and q have no common factors...",
    category: "Class 10", subject: "Mathematics",
    author: "Ananya S.", avatar: "AS", color: "from-cyan-500 to-blue-500",
    time: "3 days ago", views: 423, likes: 89, comments: 24,
    tags: ["mathematics", "proof", "irrational-numbers", "class-10"],
    mentorReply: true,
  },
];

/* ─── Community Feed Component ───────────────────────────────────────────── */
export function CommunityFeed() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sort, setSort] = useState<"trending" | "recent">("trending");
  const [search, setSearch] = useState("");

  // Filter posts by category and search term
  const filtered = mockPosts.filter((p) => {
    const matchesCategory = activeCategory === "all" || p.category.toLowerCase().replace(" ", "-") === activeCategory;
    const matchesSearch   = !search || p.title.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-8 md:py-12">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── Main Feed ──────────────────────────────────────────── */}
          <div className="flex-1 min-w-0">
            {/* Feed header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-extrabold">Community</h1>
                <p className="text-muted-foreground text-sm">Ask, answer, and learn together</p>
              </div>
              <Button variant="gradient" size="sm">
                <Plus className="h-4 w-4" />
                Ask a Question
              </Button>
            </div>

            {/* Search bar */}
            <div className="relative mb-5">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search questions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border bg-background pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* Sort tabs */}
            <div className="flex gap-1 mb-5 rounded-xl border bg-background p-1 w-fit">
              {([
                { id: "trending", label: "Trending", icon: <TrendingUp className="h-3 w-3" /> },
                { id: "recent",   label: "Recent",   icon: <Clock      className="h-3 w-3" /> },
              ] as const).map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSort(s.id)}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                    sort === s.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {s.icon} {s.label}
                </button>
              ))}
            </div>

            {/* Posts list */}
            <div className="space-y-4">
              {filtered.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  className="rounded-xl border bg-card p-5 hover:shadow-md transition-shadow cursor-pointer"
                >
                  {/* Post header */}
                  <div className="flex items-start gap-3">
                    {/* Author avatar */}
                    <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${post.color} text-white text-xs font-bold`}>
                      {post.avatar}
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Meta row */}
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-sm font-semibold">{post.author}</span>
                        <Badge variant="outline" className="text-xs py-0">{post.category}</Badge>
                        <span className="text-xs text-muted-foreground">{post.subject}</span>
                        {post.pinned && <Pin className="h-3 w-3 text-brand-500" />}
                        {post.resolved && <CheckCircle2 className="h-3 w-3 text-green-500" />}
                        {post.mentorReply && <Badge variant="success" className="text-xs py-0">✓ Expert Answer</Badge>}
                        <span className="text-xs text-muted-foreground ml-auto">{post.time}</span>
                      </div>

                      {/* Title */}
                      <h3 className="font-semibold text-sm mb-1.5 hover:text-brand-500 transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      {/* Body preview */}
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{post.body}</p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {post.tags.map((tag) => (
                          <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Engagement stats */}
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> {post.views}</span>
                        <span className="flex items-center gap-1"><Heart className="h-3 w-3" /> {post.likes}</span>
                        <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" /> {post.comments} answers</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Sidebar ──────────────────────────────────────────────── */}
          <div className="lg:w-64 space-y-5">
            {/* Categories */}
            <div className="rounded-xl border bg-card p-4">
              <h3 className="font-semibold text-sm mb-3">Categories</h3>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`w-full flex items-center justify-between rounded-lg px-3 py-2 text-xs transition-colors ${
                      activeCategory === cat.id
                        ? "bg-brand-500/10 text-brand-500 font-semibold"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className="font-medium">{cat.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Community rules */}
            <div className="rounded-xl border bg-card p-4">
              <h3 className="font-semibold text-sm mb-3">Community Rules</h3>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                {["Be respectful and kind", "No spam or self-promotion", "Share accurate information", "Use proper formatting", "Mark answers as resolved"].map((rule) => (
                  <li key={rule} className="flex items-start gap-1.5">
                    <span className="text-green-500 mt-0.5">✓</span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
