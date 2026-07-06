/**
 * @file features/blog/components/BlogGrid.tsx
 * @description Blog listing grid for the LearnVeda Blog
 *
 * Shows articles organized by category:
 *  - Study tips & strategies
 *  - Subject deep-dives (physics, math, etc.)
 *  - Programming tutorials
 *  - Career advice
 *  - LearnVeda news & updates
 *
 * In production: fetches from MongoDB (BlogPost model) or a CMS.
 * For now: uses static demo articles with realistic content.
 */

"use client"; // Client component — category filtering state

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, User, Tag, ChevronRight, Sparkles } from "lucide-react";
import { Badge }  from "@/components/ui/badge";
import { Input }  from "@/components/ui/input";
import { Search } from "lucide-react";

/* ─── Types ──────────────────────────────────────────────────────────────── */
interface BlogPost {
  slug:       string;
  title:      string;
  excerpt:    string;
  category:   string;
  author:     string;
  readTime:   number;     // Minutes
  date:       string;     // Display date string
  isPremium:  boolean;    // Pro-only content
  emoji:      string;     // Emoji for visual interest
}

/* ─── Demo Blog Posts ────────────────────────────────────────────────────── */
const POSTS: BlogPost[] = [
  {
    slug: "how-to-study-for-cbse-boards",
    title: "How to Study for CBSE Board Exams: A 90-Day Preparation Guide",
    excerpt: "A proven step-by-step plan to score 90%+ in your CBSE board exams. From chapter selection order to last-minute revision strategies.",
    category: "Study Tips", author: "LearnVeda Team", readTime: 8, date: "June 28, 2025", isPremium: false, emoji: "📋",
  },
  {
    slug: "python-vs-java-beginners",
    title: "Python vs Java for Beginners in 2025: The Honest Comparison",
    excerpt: "We look at use cases, job market demand, learning curve, and which language will help you land your first programming job faster.",
    category: "Programming", author: "Arjun Dev Team", readTime: 6, date: "June 20, 2025", isPremium: false, emoji: "⚡",
  },
  {
    slug: "dsa-roadmap-placements",
    title: "The Complete DSA Roadmap for Campus Placements",
    excerpt: "From arrays to dynamic programming — the exact order to learn DSA topics and which problems to practice for FAANG and top Indian companies.",
    category: "Career", author: "LearnVeda", readTime: 12, date: "June 15, 2025", isPremium: false, emoji: "🚀",
  },
  {
    slug: "physics-class-12-tips",
    title: "Class 12 Physics: Chapter-wise Study Strategy for 100/100",
    excerpt: "A subject expert breaks down which chapters carry the most marks, common mistake patterns, and how to approach derivations in board exams.",
    category: "CBSE", author: "Physics Expert", readTime: 10, date: "June 10, 2025", isPremium: false, emoji: "⚛️",
  },
  {
    slug: "system-design-beginners",
    title: "System Design for Beginners: Where to Start",
    excerpt: "If system design interviews feel overwhelming, start here. We explain load balancers, databases, caching, and scalability with simple analogies.",
    category: "Engineering", author: "LearnVeda", readTime: 9, date: "June 5, 2025", isPremium: true, emoji: "🏗️",
  },
  {
    slug: "pomodoro-technique-students",
    title: "Why the Pomodoro Technique Works for Indian Students",
    excerpt: "The science behind focused study sessions and how LearnVeda's streak system naturally implements the principles of spaced repetition and interleaving.",
    category: "Study Tips", author: "LearnVeda", readTime: 5, date: "May 28, 2025", isPremium: false, emoji: "🍅",
  },
  {
    slug: "learnveda-simulations-launched",
    title: "140 Interactive Simulations Are Now Live on LearnVeda",
    excerpt: "We just shipped 140 interactive simulations across Physics, Chemistry, Biology, Mathematics, DSA, and Computer Science. Here's what's new.",
    category: "Platform News", author: "LearnVeda Team", readTime: 4, date: "May 20, 2025", isPremium: false, emoji: "🎉",
  },
  {
    slug: "mathematics-class-10-chapters",
    title: "Class 10 Mathematics: Chapter-wise Weightage Analysis",
    excerpt: "Which chapters carry the most marks in the CBSE Class 10 Maths board exam? We analysed 10 years of papers to give you the exact weightage.",
    category: "CBSE", author: "Maths Expert", readTime: 7, date: "May 15, 2025", isPremium: false, emoji: "📊",
  },
];

/* ─── Categories ─────────────────────────────────────────────────────────── */
const CATEGORIES = ["All", "Study Tips", "Programming", "CBSE", "Engineering", "Career", "Platform News"];

/* ─── BlogGrid Component ─────────────────────────────────────────────────── */
export function BlogGrid() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery,    setSearchQuery]    = useState("");

  // Filter posts
  const filtered = POSTS.filter((post) => {
    const matchesCat    = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch = !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-16 border-b bg-gradient-to-b from-muted/30 to-background text-center">
        <div className="container px-4 md:px-6">
          <Badge variant="secondary" className="mb-4">LearnVeda Blog</Badge>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Study Smarter,{" "}
            <span className="bg-gradient-to-r from-brand-500 to-purple-500 bg-clip-text text-transparent">
              Learn Better
            </span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Expert study tips, programming tutorials, CBSE guides, and career advice — all in one place.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container px-4 md:px-6">
          {/* Search */}
          <div className="relative max-w-md mb-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Category filter */}
          <div className="flex gap-2 flex-wrap mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-brand-500 text-white"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured post (first result) */}
          {filtered[0] && searchQuery === "" && (
            <div className="mb-8">
              <Link
                href={`/blog/${filtered[0].slug}`}
                className="group block rounded-2xl border bg-card p-8 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <div className="flex items-start gap-6">
                  <span className="text-5xl flex-shrink-0">{filtered[0].emoji}</span>
                  <div>
                    <Badge variant="secondary" className="mb-3">{filtered[0].category}</Badge>
                    <h2 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-brand-500 transition-colors mb-2">
                      {filtered[0].title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">{filtered[0].excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" />{filtered[0].author}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{filtered[0].readTime} min read</span>
                      <span>{filtered[0].date}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Posts grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {(searchQuery || activeCategory !== "All" ? filtered : filtered.slice(1)).map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block rounded-2xl border bg-card p-6 shadow-sm hover:shadow-md transition-shadow h-full"
                >
                  <span className="text-3xl block mb-4">{post.emoji}</span>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs">{post.category}</Badge>
                    {post.isPremium && (
                      <Badge className="text-xs bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
                        <Sparkles className="h-3 w-3 mr-1" />Pro
                      </Badge>
                    )}
                  </div>
                  <h2 className="font-bold text-foreground group-hover:text-brand-500 transition-colors mb-2 leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{post.readTime} min</span>
                    <span className="flex items-center gap-1 group-hover:text-brand-500 transition-colors">
                      Read more <ChevronRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              No articles found for your search. Try a different keyword.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
