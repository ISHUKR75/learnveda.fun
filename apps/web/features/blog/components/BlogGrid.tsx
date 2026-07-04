/**
 * @file features/blog/components/BlogGrid.tsx
 * @description Blog listing page component with article cards
 * Shows articles organized by category with featured post hero
 */

"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, BookOpen, Tag } from "lucide-react";
import Link from "next/link";
import { Badge }  from "@/components/ui/badge";

/* ─── Sample Blog Posts ──────────────────────────────────────────────────── */
const posts = [
  {
    slug:      "how-to-study-physics-class-11",
    title:     "The Ultimate Guide to Studying Physics in Class 11",
    excerpt:   "Physics can be intimidating, but with the right approach — conceptual clarity first, then problems — you can master even the hardest chapters. Here's how.",
    category:  "Study Tips",
    tags:      ["Physics", "Class 11", "Board Exam"],
    author:    "LearnVeda Team",
    date:      "July 1, 2025",
    readTime:  "7 min read",
    featured:  true,
    emoji:     "⚡",
  },
  {
    slug:      "dsa-roadmap-for-placements",
    title:     "Complete DSA Roadmap for Placements — Month by Month",
    excerpt:   "From Arrays to Dynamic Programming in 60 days — the exact plan that got 200+ LearnVeda students placed at top tech companies.",
    category:  "Programming",
    tags:      ["DSA", "Placements", "LeetCode"],
    author:    "LearnVeda Team",
    date:      "June 28, 2025",
    readTime:  "12 min read",
    featured:  false,
    emoji:     "🌳",
  },
  {
    slug:      "python-day-plan-guide",
    title:     "Learn Python in 45 Days — The LearnVeda Day Plan Explained",
    excerpt:   "Our 45-day Python plan covers everything from print() to OOP, file handling, and projects. Here's what you'll learn and when.",
    category:  "Programming",
    tags:      ["Python", "Beginner", "Learning Path"],
    author:    "LearnVeda Team",
    date:      "June 24, 2025",
    readTime:  "8 min read",
    featured:  false,
    emoji:     "🐍",
  },
  {
    slug:      "jee-preparation-strategy",
    title:     "JEE Main 2025 Preparation Strategy — From Zero to 150+",
    excerpt:   "Breaking down the JEE Main syllabus, ideal schedule, important chapters, and common mistakes to avoid — a complete guide.",
    category:  "Exam Prep",
    tags:      ["JEE", "Physics", "Chemistry", "Math"],
    author:    "LearnVeda Team",
    date:      "June 20, 2025",
    readTime:  "15 min read",
    featured:  false,
    emoji:     "🏆",
  },
  {
    slug:      "what-is-simulation-learning",
    title:     "Why Simulations Are the Future of Science Education",
    excerpt:   "Traditional textbook diagrams can't replace actually seeing Newton's laws in action. Here's how LearnVeda's 140+ simulations are changing how students learn.",
    category:  "EdTech",
    tags:      ["Simulations", "Science", "Interactive Learning"],
    author:    "LearnVeda Team",
    date:      "June 15, 2025",
    readTime:  "6 min read",
    featured:  false,
    emoji:     "🔬",
  },
  {
    slug:      "live-battles-learnveda-feature",
    title:     "How Live Battles Make Studying Actually Fun",
    excerpt:   "Gamification isn't just about points and badges. Here's why competitive real-time battles improve retention and motivation scientifically.",
    category:  "Platform Updates",
    tags:      ["Live Battles", "Gamification", "Motivation"],
    author:    "LearnVeda Team",
    date:      "June 10, 2025",
    readTime:  "5 min read",
    featured:  false,
    emoji:     "⚔️",
  },
];

const categories = ["All", "Study Tips", "Programming", "Exam Prep", "EdTech", "Platform Updates"];

/* ─── Blog Grid Component ────────────────────────────────────────────────── */
export function BlogGrid() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = posts.filter(p => activeCategory === "All" || p.category === activeCategory);
  const featured = posts.find(p => p.featured);
  const regular  = filtered.filter(p => !p.featured);

  return (
    <div className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <Badge variant="outline" className="mb-4 text-brand-500 border-brand-500/30">
            <BookOpen className="h-3 w-3 mr-1" /> Blog
          </Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Study Smarter with{" "}
            <span className="text-gradient">LearnVeda Insights</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Study tips, subject guides, programming roadmaps, and platform updates from the team.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat ? "bg-brand-500 text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured post */}
        {featured && activeCategory === "All" && (
          <Link href={`/blog/${featured.slug}`} className="group block mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border bg-gradient-to-br from-brand-500/5 to-purple-500/5 border-brand-500/20 p-8 hover:shadow-xl transition-all"
            >
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="text-6xl">{featured.emoji}</div>
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="gradient">Featured</Badge>
                    <Badge variant="outline">{featured.category}</Badge>
                  </div>
                  <h2 className="text-2xl font-extrabold mb-3 group-hover:text-brand-500 transition-colors">{featured.title}</h2>
                  <p className="text-muted-foreground mb-4">{featured.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {featured.date}</span>
                    <span className="flex items-center gap-1"><Clock    className="h-3 w-3" /> {featured.readTime}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-brand-500 font-semibold text-sm whitespace-nowrap">
                  Read more <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          </Link>
        )}

        {/* Regular posts grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {regular.map((post, i) => (
            <motion.div key={post.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <div className="h-full rounded-xl border bg-card p-5 flex flex-col gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <div className="text-3xl">{post.emoji}</div>
                  <Badge variant="outline" className="w-fit text-xs">{post.category}</Badge>
                  <h3 className="font-bold text-sm leading-snug group-hover:text-brand-500 transition-colors flex-1">{post.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-auto">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock    className="h-3 w-3" /> {post.readTime}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
