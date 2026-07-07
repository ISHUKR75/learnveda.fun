/**
 * @file features/blog/components/BlogGrid.tsx
 * @description Blog article grid for the /blog page
 *
 * Shows articles across all categories:
 * - Featured article (large hero card)
 * - Category filter pills
 * - Article grid with author, date, read time, tags
 *
 * SEO: Each article has a JSON-LD TechArticle schema (in [slug]/page.tsx)
 * Used in: app/(marketing)/blog/page.tsx
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, User, ArrowRight, Tag, TrendingUp, BookOpen, Code2, Briefcase, GraduationCap, Bell } from "lucide-react";
import { Badge }  from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* ─── Types ──────────────────────────────────────────────────────────────── */
type BlogCategory = "all" | "cbse" | "coding" | "career" | "engineering" | "platform";

interface BlogPost {
  id:       string;
  title:    string;
  excerpt:  string;
  category: Exclude<BlogCategory, "all">;
  author:   string;
  date:     string;
  readTime: string;   // e.g. "5 min read"
  tags:     string[];
  href:     string;
  isFeatured?: boolean;
  isNew?:      boolean;
}

/* ─── Category config ────────────────────────────────────────────────────── */
const CATEGORY_CONFIG: Record<Exclude<BlogCategory, "all">, { label: string; icon: React.ReactNode; color: string }> = {
  cbse:        { label:"CBSE & Boards",  icon:<BookOpen className="h-3.5 w-3.5" />,     color:"border-blue-500/40 text-blue-600"   },
  coding:      { label:"Coding",         icon:<Code2 className="h-3.5 w-3.5" />,         color:"border-green-500/40 text-green-600" },
  career:      { label:"Career",         icon:<Briefcase className="h-3.5 w-3.5" />,     color:"border-amber-500/40 text-amber-600" },
  engineering: { label:"Engineering",    icon:<GraduationCap className="h-3.5 w-3.5" />, color:"border-purple-500/40 text-purple-600"},
  platform:    { label:"Platform News",  icon:<Bell className="h-3.5 w-3.5" />,          color:"border-red-500/40 text-red-600"     },
};

/* ─── Blog posts demo data ────────────────────────────────────────────────── */
const POSTS: BlogPost[] = [
  {
    id:"p1", category:"cbse", isFeatured:true,
    title:"The Complete Class 10 Board Exam Strategy for 2025-26",
    excerpt:"A data-driven study strategy for CBSE Class 10 boards. Chapter-wise weightage, high-yield topics, and a 30-day revision plan that actually works.",
    author:"Priya Sharma", date:"Jul 5, 2026", readTime:"8 min read",
    tags:["Class 10","Board Exam","Strategy","CBSE"],
    href:"/blog/class-10-board-strategy-2026",
  },
  {
    id:"p2", category:"coding", isNew:true,
    title:"Python vs JavaScript in 2026 — Which Should You Learn First?",
    excerpt:"A practical comparison for beginners. Career paths, syntax difficulty, job market demand, and why the answer depends on your goal.",
    author:"Rahul Nair", date:"Jul 3, 2026", readTime:"6 min read",
    tags:["Python","JavaScript","Beginner","Career"],
    href:"/blog/python-vs-javascript-2026",
  },
  {
    id:"p3", category:"career",
    title:"How to Get a Software Engineering Internship in India as a 2nd Year Student",
    excerpt:"A step-by-step guide from building your GitHub to cracking OA rounds at top Indian tech companies. What most students get wrong.",
    author:"Vikram Singh", date:"Jun 28, 2026", readTime:"10 min read",
    tags:["Internship","SDE","Career","Placement"],
    href:"/blog/sde-internship-guide-india",
  },
  {
    id:"p4", category:"cbse",
    title:"NCERT vs Reference Books for Class 12 Physics — What Actually Works",
    excerpt:"The honest answer based on 5 years of board result data. Which HC Verma chapters to prioritize, and when NCERT is enough.",
    author:"Dr. Sharma", date:"Jun 25, 2026", readTime:"7 min read",
    tags:["Class 12","Physics","NCERT","JEE"],
    href:"/blog/ncert-vs-reference-books-physics",
  },
  {
    id:"p5", category:"coding",
    title:"Top 10 DSA Problems Every Indian Engineering Student Must Solve",
    excerpt:"Curated from Google, Amazon, Flipkart, and TCS NQT interviews. With solutions in Python and Java, explained step-by-step.",
    author:"Rahul Nair", date:"Jun 20, 2026", readTime:"12 min read",
    tags:["DSA","Algorithms","Placement","Interview"],
    href:"/blog/top-dsa-problems-india-placement",
  },
  {
    id:"p6", category:"engineering",
    title:"CSE vs ECE vs IT in India — A 2026 Salary and Placement Guide",
    excerpt:"Branch-wise placement data from 50+ NITs and private colleges. Average packages, top recruiters, and which branch actually matters.",
    author:"Sneha Patel", date:"Jun 15, 2026", readTime:"9 min read",
    tags:["Engineering","CSE","ECE","Placement","Salary"],
    href:"/blog/cse-vs-ece-vs-it-placement-2026",
  },
  {
    id:"p7", category:"platform", isNew:true,
    title:"Introducing Live Battles 2.0 — Team Mode is Here",
    excerpt:"You asked for team battles. We built them. 2v2 and 3v3 battles with shared scoring, combined XP, and a new tournament bracket format.",
    author:"LearnVeda Team", date:"Jul 1, 2026", readTime:"3 min read",
    tags:["Platform","Live Battles","Feature"],
    href:"/blog/live-battles-team-mode",
  },
  {
    id:"p8", category:"career",
    title:"GATE 2027 Preparation Guide — Start Now or Miss the Bus",
    excerpt:"A realistic timeline and subject-wise strategy for GATE CSE 2027. Which subjects to start immediately, which to leave for the end.",
    author:"Vikram Singh", date:"Jun 10, 2026", readTime:"11 min read",
    tags:["GATE","CSE","Exam","Strategy"],
    href:"/blog/gate-2027-preparation-guide",
  },
];

/* ─── Category filter pills ──────────────────────────────────────────────── */
const FILTERS: { id: BlogCategory; label: string }[] = [
  { id:"all",         label:"All Posts"    },
  { id:"cbse",        label:"CBSE & Boards"},
  { id:"coding",      label:"Coding"       },
  { id:"career",      label:"Career"       },
  { id:"engineering", label:"Engineering"  },
  { id:"platform",    label:"Platform"     },
];

/* ─── BlogGrid Component ─────────────────────────────────────────────────── */
export function BlogGrid() {
  const [activeFilter, setActiveFilter] = useState<BlogCategory>("all");

  const featured  = POSTS.find(p => p.isFeatured);
  const remaining = POSTS.filter(p => !p.isFeatured && (activeFilter === "all" || p.category === activeFilter));

  return (
    <div className="py-12">
      <div className="container px-4 md:px-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-foreground mb-3">LearnVeda Blog</h1>
          <p className="text-muted-foreground">Study tips, coding guides, career advice, and platform updates.</p>
        </div>

        {/* Category filter pills */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {FILTERS.map(f => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                activeFilter === f.id
                  ? "bg-brand-500 text-white border-brand-500"
                  : "border-border text-muted-foreground hover:border-brand-500/50"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Featured article — full width hero card */}
        {featured && (activeFilter === "all" || activeFilter === featured.category) && (
          <motion.div
            initial={{ opacity: 0.01, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link href={featured.href}>
              <div className="rounded-2xl border bg-gradient-to-br from-brand-500/10 to-purple-500/10 border-brand-500/20 p-7 hover:shadow-lg transition-all group cursor-pointer">
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge className="bg-brand-500 text-white text-xs">⭐ Featured</Badge>
                  <Badge variant="outline" className={`text-xs ${CATEGORY_CONFIG[featured.category].color}`}>
                    {CATEGORY_CONFIG[featured.category].label}
                  </Badge>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-brand-500 transition-colors mb-2 max-w-2xl">
                  {featured.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4 max-w-2xl">{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" />{featured.author}</span>
                  <span>{featured.date}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{featured.readTime}</span>
                  <span className="ml-auto flex items-center gap-1 text-brand-500 font-medium">
                    Read more <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Article grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {remaining.map((post, i) => {
            const catConfig = CATEGORY_CONFIG[post.category];
            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0.01, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
              >
                <Link href={post.href}>
                  <div className="h-full rounded-2xl border bg-card p-5 shadow-sm hover:shadow-md hover:border-brand-500/30 transition-all group cursor-pointer flex flex-col">
                    {/* Category + New badge */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      <Badge variant="outline" className={`text-xs h-5 gap-1 ${catConfig.color}`}>
                        {catConfig.icon} {catConfig.label}
                      </Badge>
                      {post.isNew && <Badge className="text-xs h-5 bg-green-500">New</Badge>}
                    </div>

                    {/* Title */}
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-brand-500 transition-colors leading-snug flex-1">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-3">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {post.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-xs px-1.5 py-0.5 bg-muted text-muted-foreground rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Meta */}
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-auto">
                      <span className="flex items-center gap-1"><User className="h-3 w-3" />{post.author}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime}</span>
                      <span className="ml-auto text-brand-500 font-medium">Read →</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Load more */}
        <div className="text-center mt-10">
          <Button variant="outline" className="gap-1.5">
            Load More Articles <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
