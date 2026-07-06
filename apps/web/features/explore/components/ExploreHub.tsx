/**
 * @file features/explore/components/ExploreHub.tsx
 * @description Full content discovery hub for LearnVeda
 *
 * Sections rendered in order:
 *  1. ExploreHero     — search bar + animated headline + quick category pills
 *  2. FeaturedSubjects — top-6 curated subject cards with chapter counts
 *  3. LearningPaths   — guided learning journeys (CBSE, Engineering, etc.)
 *  4. TrendingTopics  — trending this week
 *  5. BrowseByCategory — tabbed grid of ALL available content
 *  6. ExploreCTA      — sign-up prompt
 *
 * All data is static for SSR performance; API calls will replace it when MongoDB is wired up.
 */

"use client"; // Interactive: search input, tab switching, motion

import React, { useState, useMemo } from "react";     // React core + hooks
import Link   from "next/link";                        // Client-side navigation
import { motion, AnimatePresence } from "framer-motion"; // Smooth animations
import {
  Search, BookOpen, Code2, Zap, Brain, ArrowRight, Star,
  TrendingUp, Clock, Users, Filter, ChevronRight,
  Flame, Award, Sparkles, Target, Globe,
} from "lucide-react";                                 // Icons
import { Badge }  from "@/components/ui/badge";        // Label badges
import { Button } from "@/components/ui/button";       // CTA buttons
import { Input }  from "@/components/ui/input";        // Search input

/* ══════════════════════════════════════════════════════════════════════════ */
/*  STATIC DATA                                                              */
/* ══════════════════════════════════════════════════════════════════════════ */

/** Top-level category tabs */
const CATEGORIES = [
  { id: "all",         label: "All",          icon: <Globe    className="h-4 w-4" /> },
  { id: "cbse",        label: "CBSE",         icon: <BookOpen className="h-4 w-4" /> },
  { id: "engineering", label: "Engineering",  icon: <Zap      className="h-4 w-4" /> },
  { id: "programming", label: "Programming",  icon: <Code2    className="h-4 w-4" /> },
  { id: "core-cs",     label: "Core CS",      icon: <Brain    className="h-4 w-4" /> },
] as const;

type CategoryId = typeof CATEGORIES[number]["id"];

/** All browsable content cards */
const ALL_CONTENT = [
  /* ── CBSE ──────────────────────────────────────── */
  { id: "c9-math",  cat: "cbse",        title: "Class 9 Mathematics",     desc: "Polynomials, Coordinate Geometry, Statistics & more",  chapters: 15, href: "/learn/class-9",    badge: "Class 9",  color: "from-blue-500 to-cyan-500",    level: "Foundation", emoji: "📐" },
  { id: "c9-sci",   cat: "cbse",        title: "Class 9 Science",          desc: "Motion, Force, Matter, Living Organisms & Atoms",      chapters: 14, href: "/learn/class-9",    badge: "Class 9",  color: "from-green-500 to-teal-500",   level: "Foundation", emoji: "🔬" },
  { id: "c10-math", cat: "cbse",        title: "Class 10 Mathematics",     desc: "Real Numbers, Triangles, Trigonometry & Probability",  chapters: 15, href: "/learn/class-10",   badge: "Class 10", color: "from-blue-600 to-indigo-500",  level: "Board Prep", emoji: "📊" },
  { id: "c10-sci",  cat: "cbse",        title: "Class 10 Science",         desc: "Chemical Reactions, Life Processes & Electricity",     chapters: 16, href: "/learn/class-10",   badge: "Class 10", color: "from-emerald-500 to-green-600", level: "Board Prep", emoji: "⚗️" },
  { id: "c11-phy",  cat: "cbse",        title: "Class 11 Physics",         desc: "Kinematics, Laws of Motion, Thermodynamics",           chapters: 14, href: "/learn/class-11",   badge: "Class 11", color: "from-purple-500 to-violet-600", level: "Advanced",   emoji: "🌌" },
  { id: "c11-chem", cat: "cbse",        title: "Class 11 Chemistry",       desc: "Atomic Structure, Chemical Bonding, Equilibrium",      chapters: 14, href: "/learn/class-11",   badge: "Class 11", color: "from-orange-500 to-amber-500",  level: "Advanced",   emoji: "🧪" },
  { id: "c12-phy",  cat: "cbse",        title: "Class 12 Physics",         desc: "Electrostatics, Optics, Modern Physics & more",        chapters: 15, href: "/learn/class-12",   badge: "Class 12", color: "from-violet-500 to-purple-600", level: "Board/JEE",  emoji: "⚡" },
  { id: "c12-chem", cat: "cbse",        title: "Class 12 Chemistry",       desc: "Electrochemistry, Organic Chemistry, Biomolecules",    chapters: 16, href: "/learn/class-12",   badge: "Class 12", color: "from-red-500 to-rose-600",      level: "Board/JEE",  emoji: "🔴" },
  /* ── Engineering ─────────────────────────────── */
  { id: "java",     cat: "programming", title: "Java — 45-Day Plan",        desc: "OOP, Collections, Streams, Spring Boot — interview ready", chapters: 45, href: "/programming/java",       badge: "Intermediate", color: "from-orange-500 to-red-500",   level: "Intermediate", emoji: "☕" },
  { id: "python",   cat: "programming", title: "Python — 45-Day Plan",      desc: "Syntax, Data Structures, OOP, ML Libraries",          chapters: 45, href: "/programming/python",     badge: "Beginner",     color: "from-yellow-500 to-green-500", level: "Beginner",     emoji: "🐍" },
  { id: "cpp",      cat: "programming", title: "C++ — 30-Day Plan",         desc: "Pointers, STL, OOP, Templates & competitive programming", chapters: 30, href: "/programming/cpp",      badge: "Intermediate", color: "from-blue-600 to-sky-500",     level: "Intermediate", emoji: "⚙️" },
  { id: "js",       cat: "programming", title: "JavaScript — 30-Day Plan",  desc: "DOM, ES6+, Async/Await, React fundamentals",          chapters: 30, href: "/programming/javascript", badge: "Beginner",     color: "from-yellow-400 to-orange-400", level: "Beginner",    emoji: "🟨" },
  { id: "ts",       cat: "programming", title: "TypeScript — 25-Day Plan",  desc: "Types, Interfaces, Generics, Full-stack TypeScript",   chapters: 25, href: "/programming/typescript", badge: "Intermediate", color: "from-blue-500 to-blue-700",    level: "Intermediate", emoji: "🔷" },
  { id: "rust",     cat: "programming", title: "Rust — 40-Day Plan",        desc: "Ownership, Borrowing, Traits, Async, Systems programming", chapters: 40, href: "/programming/rust",    badge: "Advanced",     color: "from-rose-600 to-red-700",     level: "Advanced",     emoji: "🦀" },
  { id: "kotlin",   cat: "programming", title: "Kotlin — 30-Day Plan",      desc: "Null Safety, Coroutines, Android development",         chapters: 30, href: "/programming/kotlin",     badge: "Intermediate", color: "from-violet-500 to-purple-600", level: "Intermediate", emoji: "🎯" },
  { id: "swift",    cat: "programming", title: "Swift — 30-Day Plan",       desc: "Optionals, Protocols, SwiftUI, iOS development",       chapters: 30, href: "/programming/swift",      badge: "Intermediate", color: "from-orange-400 to-red-500",    level: "Intermediate", emoji: "🍎" },
  /* ── Core CS ──────────────────────────────────── */
  { id: "dsa",      cat: "core-cs",     title: "DSA — 60-Day Plan",         desc: "Arrays, Trees, Graphs, DP — FAANG-level preparation",  chapters: 60, href: "/core-cs/dsa",            badge: "FAANG Prep",   color: "from-purple-600 to-indigo-600", level: "Intermediate", emoji: "🌳" },
  { id: "sd",       cat: "core-cs",     title: "System Design — 25 Days",   desc: "HLD, LLD, CAP theorem, Kafka, Redis, real systems",    chapters: 25, href: "/core-cs/system-design",  badge: "Advanced",     color: "from-slate-600 to-gray-700",   level: "Advanced",     emoji: "🏗️" },
  { id: "dbms",     cat: "core-cs",     title: "DBMS — 20 Days",            desc: "Relational, SQL, Normalization, ACID, Indexing",       chapters: 20, href: "/core-cs/dbms",           badge: "Core",         color: "from-cyan-600 to-teal-600",    level: "Intermediate", emoji: "🗄️" },
  { id: "os",       cat: "core-cs",     title: "Operating Systems — 20 Days", desc: "Processes, Deadlocks, Memory, File Systems",         chapters: 20, href: "/core-cs/operating-systems", badge: "Core",      color: "from-gray-600 to-slate-700",   level: "Intermediate", emoji: "💻" },
  { id: "cn",       cat: "core-cs",     title: "Computer Networks — 20 Days", desc: "TCP/IP, OSI, DNS, HTTP, Network Security",           chapters: 20, href: "/core-cs/computer-networks", badge: "Core",      color: "from-green-600 to-emerald-700", level: "Intermediate", emoji: "🌐" },
  { id: "git",      cat: "core-cs",     title: "Git & GitHub — 10 Days",    desc: "Branching, Merge, Rebase, CI/CD workflows",           chapters: 10, href: "/core-cs/git-github",     badge: "Essential",    color: "from-orange-600 to-red-600",   level: "Beginner",     emoji: "🔀" },
  { id: "cp",       cat: "core-cs",     title: "Competitive Programming — 60 Days", desc: "Greedy, DP, Graphs, Number Theory, Segment Trees", chapters: 60, href: "/core-cs/competitive-programming", badge: "Expert", color: "from-yellow-600 to-orange-600", level: "Expert", emoji: "🏆" },
  /* ── Engineering branches ─────────────────────── */
  { id: "cse",      cat: "engineering", title: "B.Tech CSE — 8 Semesters",  desc: "Complete BTech CS curriculum with survival guides",     chapters: 48, href: "/semester",              badge: "Engineering",  color: "from-blue-700 to-indigo-700",  level: "University",   emoji: "🎓" },
  { id: "ece",      cat: "engineering", title: "B.Tech ECE — 8 Semesters",  desc: "Electronics, Signals, Embedded Systems, VLSI",         chapters: 48, href: "/semester",              badge: "Engineering",  color: "from-green-700 to-teal-700",   level: "University",   emoji: "📡" },
] as const;

/** Trending topics with percentage growth */
const TRENDING = [
  { topic: "Python Decorators",      growth: "+142%", category: "Programming", href: "/programming/python",     color: "text-yellow-500" },
  { topic: "System Design — Netflix", growth: "+98%",  category: "Core CS",     href: "/core-cs/system-design",  color: "text-blue-500"   },
  { topic: "Class 12 Electrostatics", growth: "+87%",  category: "CBSE",        href: "/learn/class-12",         color: "text-purple-500" },
  { topic: "DSA — Graph Algorithms",  growth: "+76%",  category: "Core CS",     href: "/core-cs/dsa",            color: "text-green-500"  },
  { topic: "Rust Ownership Model",    growth: "+71%",  category: "Programming", href: "/programming/rust",       color: "text-rose-500"   },
  { topic: "JEE Physics — Optics",   growth: "+65%",  category: "CBSE",        href: "/learn/class-12",         color: "text-cyan-500"   },
];

/** Guided learning paths */
const PATHS = [
  {
    id: "board-prep",
    title: "CBSE Board Champion",
    desc: "Class 10 complete board prep — Maths, Science, Social Science, English",
    steps: ["Class 10 Maths", "Class 10 Science", "Mock Tests", "PYQ Practice"],
    duration: "8 weeks", difficulty: "Intermediate", students: 8200, href: "/learn/class-10",
    gradient: "from-blue-500 via-cyan-500 to-teal-500",
    emoji: "📋",
  },
  {
    id: "jee-crack",
    title: "JEE Main Cracker",
    desc: "Physics + Chemistry + Maths — class 11 & 12 with mock tests and PYQs",
    steps: ["Class 11 PCM", "Class 12 PCM", "JEE Mock Tests", "PYQ Bank"],
    duration: "16 weeks", difficulty: "Advanced", students: 5600, href: "/learn/class-11",
    gradient: "from-purple-500 via-violet-500 to-indigo-500",
    emoji: "🏆",
  },
  {
    id: "sde-ready",
    title: "SDE Interview Ready",
    desc: "DSA + System Design + OS + DBMS — FAANG placement preparation",
    steps: ["DSA 60-Day", "System Design", "DBMS", "OS + CN"],
    duration: "12 weeks", difficulty: "Advanced", students: 12400, href: "/core-cs/dsa",
    gradient: "from-orange-500 via-red-500 to-rose-500",
    emoji: "🎯",
  },
  {
    id: "fullstack",
    title: "Full-Stack Developer",
    desc: "JavaScript → TypeScript → React → Node.js — build production apps",
    steps: ["JavaScript 30d", "TypeScript 25d", "React Projects", "Backend APIs"],
    duration: "10 weeks", difficulty: "Intermediate", students: 9800, href: "/programming/javascript",
    gradient: "from-green-500 via-emerald-500 to-teal-500",
    emoji: "💻",
  },
];

/* ══════════════════════════════════════════════════════════════════════════ */
/*  ANIMATION VARIANTS                                                       */
/* ══════════════════════════════════════════════════════════════════════════ */

/** Container that staggers its children */
const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.06 } },
};

/** Each card fades up into view */
const cardVariants = {
  hidden:  { opacity: 0.01, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

/* ══════════════════════════════════════════════════════════════════════════ */
/*  COMPONENT                                                                */
/* ══════════════════════════════════════════════════════════════════════════ */

/**
 * ExploreHub
 * Full content discovery experience — search, categories, trending, paths.
 */
export function ExploreHub() {
  /* ── State ──────────────────────────────────────────────────────────── */
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all"); // Active tab
  const [searchQuery,    setSearchQuery]    = useState("");                  // Search text

  /* ── Filtered content based on tab + search ─────────────────────────── */
  const filteredContent = useMemo(() => {
    let items = [...ALL_CONTENT];

    // Filter by category tab
    if (activeCategory !== "all") {
      items = items.filter((item) => item.cat === activeCategory);
    }

    // Filter by search query (title + desc)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.desc.toLowerCase().includes(q)   ||
          item.badge.toLowerCase().includes(q)
      );
    }

    return items;
  }, [activeCategory, searchQuery]);

  /* ── Render ─────────────────────────────────────────────────────────── */
  return (
    <div className="pb-20">

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* SECTION 1 — HERO                                              */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-20 md:py-28 bg-gradient-to-b from-brand-950/5 to-background">
        {/* Decorative background orbs */}
        <div className="absolute top-10 left-1/4 h-72 w-72 rounded-full bg-brand-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/3 h-60 w-60 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

        <div className="container px-4 md:px-6 relative text-center">
          {/* Badge label */}
          <motion.div
            initial={{ opacity: 0.01, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="outline" className="mb-5 gap-2 px-4 py-1.5 text-sm rounded-full border-brand-500/30 bg-brand-500/5 text-brand-600 dark:text-brand-400">
              <Sparkles className="h-3.5 w-3.5" />
              500+ Chapters · 12 Programming Languages · 25+ Simulations
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0.01, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-5"
          >
            Explore All{" "}
            <span className="text-gradient">Learning Content</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0.01, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-lg text-muted-foreground max-w-xl mx-auto mb-8"
          >
            Browse CBSE subjects, engineering tracks, programming languages, and Core CS —
            all in one place, completely free.
          </motion.p>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0.01, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex max-w-xl mx-auto gap-2"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              {/* Search input — controlled */}
              <Input
                placeholder="Search subjects, topics, languages…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-12 rounded-xl border-border/60"
              />
            </div>
            <Button size="lg" variant="gradient" className="rounded-xl px-6">
              <Search className="h-4 w-4" />
            </Button>
          </motion.div>

          {/* Quick category pills */}
          <motion.div
            initial={{ opacity: 0.01 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-2 mt-6"
          >
            {["Mathematics", "Physics", "Python", "DSA", "System Design", "CBSE Boards", "Java", "Chemistry"].map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchQuery(tag)}
                className="px-3 py-1 text-xs rounded-full border bg-background hover:bg-muted hover:border-brand-500/50 transition-colors"
              >
                {tag}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* SECTION 2 — LEARNING PATHS                                    */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="py-14 bg-muted/30">
        <div className="container px-4 md:px-6">
          {/* Section heading */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Guided Learning Paths</h2>
              <p className="text-muted-foreground text-sm mt-1">Curated journeys from beginner to job-ready</p>
            </div>
            <Badge variant="outline" className="hidden sm:flex gap-1 text-brand-500 border-brand-500/30">
              <Flame className="h-3 w-3" /> Popular
            </Badge>
          </div>

          {/* Path cards — horizontal scroll on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PATHS.map((path, i) => (
              <motion.div
                key={path.id}
                initial={{ opacity: 0.01, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.45 }}
              >
                <Link href={path.href} className="group block h-full">
                  <div className="h-full rounded-2xl border bg-card overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    {/* Gradient header stripe */}
                    <div className={`h-2 w-full bg-gradient-to-r ${path.gradient}`} />
                    <div className="p-5 flex flex-col gap-3">
                      {/* Emoji + title */}
                      <div className="text-3xl">{path.emoji}</div>
                      <h3 className="font-bold text-sm group-hover:text-brand-500 transition-colors">{path.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{path.desc}</p>

                      {/* Steps preview */}
                      <div className="flex flex-col gap-1">
                        {path.steps.map((step, si) => (
                          <div key={si} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <div className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                            {step}
                          </div>
                        ))}
                      </div>

                      {/* Meta */}
                      <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto pt-3 border-t">
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {path.duration}</span>
                        <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {path.students.toLocaleString()}</span>
                      </div>

                      {/* CTA */}
                      <div className="flex items-center gap-1 text-xs font-semibold text-brand-500 group-hover:gap-2 transition-all">
                        Start Path <ArrowRight className="h-3 w-3" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* SECTION 3 — TRENDING THIS WEEK                                */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="py-14">
        <div className="container px-4 md:px-6">
          <div className="flex items-center gap-2 mb-8">
            <TrendingUp className="h-5 w-5 text-brand-500" />
            <h2 className="text-2xl font-bold tracking-tight">Trending This Week</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TRENDING.map((item, i) => (
              <motion.div
                key={item.topic}
                initial={{ opacity: 0.01, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <Link href={item.href} className="group flex items-center justify-between rounded-xl border bg-card p-4 hover:shadow-md hover:border-brand-500/30 transition-all">
                  <div className="flex items-center gap-3">
                    {/* Rank number */}
                    <span className="text-xl font-black text-muted-foreground/30 tabular-nums w-6">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <div className="font-semibold text-sm group-hover:text-brand-500 transition-colors">{item.topic}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{item.category}</div>
                    </div>
                  </div>
                  {/* Growth badge */}
                  <Badge className={`${item.color} bg-transparent border-current text-xs`}>
                    {item.growth}
                  </Badge>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* SECTION 4 — BROWSE BY CATEGORY                                */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="py-14 bg-muted/30">
        <div className="container px-4 md:px-6">
          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight mb-1">Browse All Content</h2>
            <p className="text-muted-foreground text-sm">
              {filteredContent.length} {filteredContent.length === 1 ? "result" : "results"}
              {activeCategory !== "all" ? ` in ${CATEGORIES.find((c) => c.id === activeCategory)?.label}` : " across all categories"}
            </p>
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); setSearchQuery(""); }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? "bg-brand-500 text-white border-brand-500 shadow-md shadow-brand-500/20"
                    : "bg-background hover:bg-muted hover:border-muted-foreground/30"
                }`}
              >
                {cat.icon}
                {cat.label}
              </button>
            ))}
          </div>

          {/* Content grid with AnimatePresence for smooth transitions */}
          <AnimatePresence mode="wait">
            {filteredContent.length > 0 ? (
              <motion.div
                key={activeCategory + searchQuery}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
              >
                {filteredContent.map((item) => (
                  <motion.div key={item.id} variants={cardVariants}>
                    <Link href={item.href} className="group block h-full">
                      <div className="h-full rounded-2xl border bg-card overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        {/* Top gradient bar */}
                        <div className={`h-1.5 w-full bg-gradient-to-r ${item.color}`} />
                        <div className="p-5 flex flex-col gap-3">
                          {/* Emoji */}
                          <div className="text-2xl">{item.emoji}</div>

                          {/* Badges row */}
                          <div className="flex flex-wrap gap-1.5">
                            <Badge variant="secondary" className="text-xs">{item.badge}</Badge>
                            <Badge variant="outline" className="text-xs text-muted-foreground">{item.level}</Badge>
                          </div>

                          {/* Title + desc */}
                          <div className="flex-1">
                            <h3 className="font-bold text-sm leading-tight group-hover:text-brand-500 transition-colors mb-1.5">
                              {item.title}
                            </h3>
                            <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                          </div>

                          {/* Meta row */}
                          <div className="flex items-center gap-3 text-xs text-muted-foreground pt-3 border-t">
                            <span className="flex items-center gap-1">
                              <BookOpen className="h-3 w-3" /> {item.chapters} {item.chapters === 1 ? "day" : "chapters/days"}
                            </span>
                          </div>

                          {/* CTA */}
                          <div className="flex items-center gap-1 text-xs font-semibold text-brand-500 group-hover:gap-2 transition-all">
                            Start Learning <ArrowRight className="h-3 w-3" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              /* Empty state — no results */
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="font-semibold text-lg mb-2">No results found</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Try a different search term or browse all categories.
                </p>
                <Button variant="outline" onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}>
                  Clear Search
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* SECTION 5 — CTA                                               */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0.01, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-brand-600 via-purple-600 to-violet-700 p-8 md:p-14 text-white text-center"
          >
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] [background-size:24px_24px]" />

            {/* Stars decorations */}
            <Star className="absolute top-6 left-6 h-6 w-6 text-yellow-300/50 fill-yellow-300/30" />
            <Star className="absolute bottom-8 right-8 h-5 w-5 text-yellow-300/50 fill-yellow-300/30" />

            <div className="relative">
              <div className="text-5xl mb-4">🚀</div>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-white/80 max-w-lg mx-auto mb-8 text-lg">
                Join 10,000+ students already learning on LearnVeda.
                Free forever — no credit card required.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="xl" variant="secondary" asChild className="bg-white text-brand-700 hover:bg-white/90 font-bold">
                  <Link href="/sign-up">
                    Get Started Free
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button size="xl" variant="outline" asChild className="border-white/30 text-white hover:bg-white/10">
                  <Link href="/pricing">View Plans</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
