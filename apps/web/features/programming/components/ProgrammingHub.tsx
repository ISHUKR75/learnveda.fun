/**
 * @file features/programming/components/ProgrammingHub.tsx
 * @description Programming Hub overview page for LearnVeda
 *
 * Shows all 12 programming language tracks + 4 Core CS tracks:
 *  1. Hero with search + stats
 *  2. Featured Language Cards (12 languages with day counts)
 *  3. Core CS Section (DSA, System Design, DBMS, OS, CN, Git, CP)
 *  4. How It Works — day-by-day plan explanation
 *  5. Testimonials from engineering students
 *  6. CTA to start any language
 *
 * Each language card links to /programming/[language]
 */

"use client"; // Client component — interactive filter tabs, animations

import React, { useState } from "react";               // React core + hooks
import Link from "next/link";                           // Client-side navigation
import { motion } from "framer-motion";                 // Entry animations
import {
  Code2, ArrowRight, Clock, ChevronRight,
  BookOpen, Brain, Zap, Star, Search,
  Trophy, Flame, Target, Users, Sparkles,
} from "lucide-react";                                  // Icons
import { Badge }  from "@/components/ui/badge";         // Label badge
import { Button } from "@/components/ui/button";        // CTA button
import { Input }  from "@/components/ui/input";         // Search input

/* ══════════════════════════════════════════════════════════════════════════ */
/*  STATIC DATA — 12 Programming Languages                                   */
/* ══════════════════════════════════════════════════════════════════════════ */

/** Programming language tracks */
const LANGUAGES = [
  {
    slug: "c",
    name: "C Language",
    emoji: "🔵",
    days: 30,
    level: "Beginner",
    desc: "Pointers, memory management, data structures from scratch — the foundation of all programming.",
    color: "from-slate-500 to-blue-600",
    badge: "Foundation",
    topics: ["Pointers", "Memory", "Structs", "File I/O", "Algorithms"],
    students: 3200,
    rating: 4.7,
  },
  {
    slug: "cpp",
    name: "C++",
    emoji: "⚙️",
    days: 30,
    level: "Intermediate",
    desc: "STL, OOP, templates, and competitive programming — the language of performance.",
    color: "from-blue-600 to-indigo-600",
    badge: "Popular",
    topics: ["OOP", "STL", "Templates", "Smart Pointers", "Concurrency"],
    students: 5800,
    rating: 4.8,
  },
  {
    slug: "java",
    name: "Java",
    emoji: "☕",
    days: 45,
    level: "Intermediate",
    desc: "OOP mastery, Collections, Streams, Spring Boot basics — placement-ready in 45 days.",
    color: "from-orange-500 to-red-600",
    badge: "Placement",
    topics: ["OOP", "Collections", "Streams", "Multithreading", "Spring Boot"],
    students: 8400,
    rating: 4.9,
  },
  {
    slug: "python",
    name: "Python",
    emoji: "🐍",
    days: 45,
    level: "Beginner",
    desc: "From syntax to data science libraries — Python for everyone, built in 45 days.",
    color: "from-yellow-500 to-green-500",
    badge: "Most Popular",
    topics: ["Syntax", "OOP", "NumPy", "Pandas", "ML Basics"],
    students: 14200,
    rating: 4.9,
  },
  {
    slug: "javascript",
    name: "JavaScript",
    emoji: "🟨",
    days: 30,
    level: "Beginner",
    desc: "DOM manipulation, ES6+, Async/Await, React fundamentals — web dev foundation.",
    color: "from-yellow-400 to-orange-500",
    badge: "Web Dev",
    topics: ["ES6+", "DOM", "Async/Await", "Fetch API", "React Intro"],
    students: 11600,
    rating: 4.8,
  },
  {
    slug: "typescript",
    name: "TypeScript",
    emoji: "🔷",
    days: 25,
    level: "Intermediate",
    desc: "Types, interfaces, generics, decorators — type-safe full-stack development.",
    color: "from-blue-500 to-blue-700",
    badge: "Enterprise",
    topics: ["Types", "Interfaces", "Generics", "Decorators", "Full-Stack"],
    students: 4800,
    rating: 4.7,
  },
  {
    slug: "rust",
    name: "Rust",
    emoji: "🦀",
    days: 40,
    level: "Advanced",
    desc: "Ownership, borrowing, lifetimes, async — systems programming for the future.",
    color: "from-rose-600 to-red-700",
    badge: "Advanced",
    topics: ["Ownership", "Borrowing", "Traits", "Async", "WebAssembly"],
    students: 2200,
    rating: 4.9,
  },
  {
    slug: "kotlin",
    name: "Kotlin",
    emoji: "🎯",
    days: 30,
    level: "Intermediate",
    desc: "Null safety, coroutines, Android development — the modern Java replacement.",
    color: "from-violet-500 to-purple-700",
    badge: "Android",
    topics: ["Null Safety", "Coroutines", "Data Classes", "Android", "Flows"],
    students: 3400,
    rating: 4.7,
  },
  {
    slug: "swift",
    name: "Swift",
    emoji: "🍎",
    days: 30,
    level: "Intermediate",
    desc: "Optionals, protocols, SwiftUI — iOS and macOS app development from scratch.",
    color: "from-orange-400 to-red-500",
    badge: "iOS",
    topics: ["Optionals", "Protocols", "SwiftUI", "Combine", "Core Data"],
    students: 2600,
    rating: 4.6,
  },
  {
    slug: "sql",
    name: "SQL",
    emoji: "🗄️",
    days: 20,
    level: "Beginner",
    desc: "Queries, JOINs, indexes, stored procedures — database mastery in 20 days.",
    color: "from-cyan-500 to-teal-600",
    badge: "Essential",
    topics: ["SELECT", "JOINs", "Indexes", "Transactions", "Stored Procedures"],
    students: 7200,
    rating: 4.8,
  },
  {
    slug: "dart",
    name: "Dart",
    emoji: "🎪",
    days: 25,
    level: "Beginner",
    desc: "Flutter development with Dart — cross-platform mobile apps from day 1.",
    color: "from-sky-500 to-blue-600",
    badge: "Flutter",
    topics: ["Syntax", "OOP", "Async", "Streams", "Flutter Widgets"],
    students: 1800,
    rating: 4.6,
  },
  {
    slug: "ruby",
    name: "Ruby",
    emoji: "💎",
    days: 25,
    level: "Beginner",
    desc: "Elegant syntax, Rails framework, MVC pattern — rapid web development.",
    color: "from-red-500 to-rose-700",
    badge: "Web Dev",
    topics: ["Syntax", "Blocks", "Modules", "Rails Basics", "REST APIs"],
    students: 1400,
    rating: 4.5,
  },
] as const;

/** Core CS subject tracks */
const CORE_CS = [
  {
    slug: "dsa",
    name: "Data Structures & Algorithms",
    emoji: "🌳",
    days: 60,
    level: "Intermediate",
    desc: "6-phase FAANG preparation: Arrays → Trees → Graphs → DP → Mock Interviews.",
    color: "from-purple-600 to-indigo-700",
    badge: "FAANG Prep",
    href: "/core-cs/dsa",
  },
  {
    slug: "system-design",
    name: "System Design",
    emoji: "🏗️",
    days: 25,
    level: "Advanced",
    desc: "HLD, LLD, CAP theorem, Kafka, Redis, design real systems like Netflix and Twitter.",
    color: "from-slate-600 to-gray-800",
    badge: "Senior SDE",
    href: "/core-cs/system-design",
  },
  {
    slug: "dbms",
    name: "DBMS",
    emoji: "🗃️",
    days: 20,
    level: "Intermediate",
    desc: "Relational model, SQL, normalization, ACID properties, transactions, B-Trees.",
    color: "from-cyan-600 to-teal-700",
    badge: "Core",
    href: "/core-cs/dbms",
  },
  {
    slug: "operating-systems",
    name: "Operating Systems",
    emoji: "💻",
    days: 20,
    level: "Intermediate",
    desc: "Processes, threads, scheduling, memory management, file systems, deadlocks.",
    color: "from-gray-600 to-slate-800",
    badge: "Core",
    href: "/core-cs/operating-systems",
  },
  {
    slug: "computer-networks",
    name: "Computer Networks",
    emoji: "🌐",
    days: 20,
    level: "Intermediate",
    desc: "OSI model, TCP/IP, DNS, HTTP, subnetting, network security, sockets.",
    color: "from-emerald-600 to-teal-700",
    badge: "Core",
    href: "/core-cs/computer-networks",
  },
  {
    slug: "git-github",
    name: "Git & GitHub",
    emoji: "🔀",
    days: 10,
    level: "Beginner",
    desc: "Branching, merging, rebasing, PRs, GitHub Actions CI/CD workflows.",
    color: "from-orange-600 to-red-700",
    badge: "Essential",
    href: "/core-cs/git-github",
  },
  {
    slug: "competitive-programming",
    name: "Competitive Programming",
    emoji: "🏆",
    days: 60,
    level: "Expert",
    desc: "Greedy, DP, Graph Theory, Number Theory, Segment Trees — Codeforces/ICPC level.",
    color: "from-yellow-600 to-orange-700",
    badge: "Expert",
    href: "/core-cs/competitive-programming",
  },
] as const;

/** Level color classes */
const LEVEL_COLORS: Record<string, string> = {
  Beginner:     "bg-green-500/10 text-green-600",
  Intermediate: "bg-blue-500/10 text-blue-600",
  Advanced:     "bg-orange-500/10 text-orange-600",
  Expert:       "bg-red-500/10 text-red-600",
};

/* ══════════════════════════════════════════════════════════════════════════ */
/*  COMPONENT                                                                */
/* ══════════════════════════════════════════════════════════════════════════ */

/**
 * ProgrammingHub
 * Main page showing all 12 programming language tracks + Core CS subjects.
 */
export function ProgrammingHub() {
  /* ── State ──────────────────────────────────────────────────────────── */
  const [filter, setFilter] = useState<"all" | "beginner" | "intermediate" | "advanced">("all");
  const [search, setSearch] = useState(""); // Language search

  /* ── Filtered languages ─────────────────────────────────────────────── */
  const filteredLangs = LANGUAGES.filter((lang) => {
    const matchLevel = filter === "all" || lang.level.toLowerCase() === filter;
    const matchSearch =
      !search.trim() ||
      lang.name.toLowerCase().includes(search.toLowerCase()) ||
      lang.desc.toLowerCase().includes(search.toLowerCase());
    return matchLevel && matchSearch;
  });

  /* ── Render ─────────────────────────────────────────────────────────── */
  return (
    <div className="pb-20">

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* HERO                                                           */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-20 md:py-28 bg-gradient-to-b from-green-950/5 to-background">
        {/* Background orbs */}
        <div className="absolute top-10 left-1/4 h-64 w-64 rounded-full bg-green-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

        <div className="container px-4 md:px-6 relative text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0.01, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Badge variant="outline" className="mb-5 gap-2 px-4 py-1.5 text-sm rounded-full border-green-500/30 bg-green-500/5 text-green-600 dark:text-green-400">
              <Code2 className="h-3.5 w-3.5" />
              12 Languages · Day-by-Day Plans · 40,000+ Learners
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0.01, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-5"
          >
            Learn to Code,{" "}
            <span className="text-gradient">Day by Day</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0.01, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            Structured day-wise plans for 12 programming languages and 7 Core CS subjects.
            From complete beginner to placement-ready — all free, all in one place.
          </motion.p>

          {/* Search + filter */}
          <motion.div
            initial={{ opacity: 0.01, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col sm:flex-row max-w-lg mx-auto gap-2"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search languages…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-12 rounded-xl"
              />
            </div>
          </motion.div>

          {/* Level filter tabs */}
          <motion.div
            initial={{ opacity: 0.01 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center gap-2 mt-5"
          >
            {(["all", "beginner", "intermediate", "advanced"] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setFilter(lvl)}
                className={`px-3 py-1.5 text-xs rounded-lg border font-medium capitalize transition-all ${
                  filter === lvl
                    ? "bg-brand-500 text-white border-brand-500"
                    : "bg-background hover:bg-muted"
                }`}
              >
                {lvl === "all" ? "All Levels" : lvl}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* PROGRAMMING LANGUAGE CARDS                                     */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="py-14">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Programming Languages</h2>
              <p className="text-muted-foreground text-sm mt-1">
                {filteredLangs.length} {filteredLangs.length === 1 ? "language" : "languages"} available
              </p>
            </div>
          </div>

          {/* Language cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredLangs.map((lang, i) => (
              <motion.div
                key={lang.slug}
                initial={{ opacity: 0.01, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.45 }}
              >
                <Link href={`/programming/${lang.slug}`} className="group block h-full">
                  <div className="h-full rounded-2xl border bg-card overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    {/* Gradient header */}
                    <div className={`h-1.5 w-full bg-gradient-to-r ${lang.color}`} />
                    <div className="p-5 flex flex-col gap-3">
                      {/* Emoji + badge row */}
                      <div className="flex items-start justify-between">
                        <span className="text-3xl">{lang.emoji}</span>
                        <Badge
                          className={`text-xs font-medium ${LEVEL_COLORS[lang.level] || "bg-muted text-muted-foreground"}`}
                          variant="secondary"
                        >
                          {lang.level}
                        </Badge>
                      </div>

                      {/* Name */}
                      <h3 className="font-black text-lg group-hover:text-brand-500 transition-colors">
                        {lang.name}
                      </h3>

                      {/* Desc */}
                      <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                        {lang.desc}
                      </p>

                      {/* Topic pills */}
                      <div className="flex flex-wrap gap-1">
                        {lang.topics.slice(0, 3).map((topic) => (
                          <span
                            key={topic}
                            className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                          >
                            {topic}
                          </span>
                        ))}
                        {lang.topics.length > 3 && (
                          <span className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                            +{lang.topics.length - 3} more
                          </span>
                        )}
                      </div>

                      {/* Meta strip */}
                      <div className="flex items-center justify-between text-xs text-muted-foreground border-t pt-3">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {lang.days} days
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" /> {lang.students.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1 text-yellow-500">
                          <Star className="h-3 w-3 fill-yellow-500" /> {lang.rating}
                        </span>
                      </div>

                      {/* CTA */}
                      <div className="flex items-center gap-1 text-xs font-semibold text-brand-500 group-hover:gap-2 transition-all">
                        Start {lang.name} <ArrowRight className="h-3 w-3" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Empty state */}
          {filteredLangs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-3">No languages match your filter.</p>
              <Button variant="outline" onClick={() => { setFilter("all"); setSearch(""); }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* CORE CS SUBJECTS                                               */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="py-14 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="mb-8">
            <Badge variant="outline" className="mb-3 text-purple-600 border-purple-500/30 gap-1">
              <Brain className="h-3.5 w-3.5" /> Core CS Subjects
            </Badge>
            <h2 className="text-2xl font-bold tracking-tight">Computer Science Fundamentals</h2>
            <p className="text-muted-foreground text-sm mt-1">
              Master the subjects every SDE interview tests you on
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {CORE_CS.map((subject, i) => (
              <motion.div
                key={subject.slug}
                initial={{ opacity: 0.01, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <Link href={subject.href} className="group block h-full">
                  <div className="h-full rounded-2xl border bg-card overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    {/* Gradient stripe */}
                    <div className={`h-1.5 w-full bg-gradient-to-r ${subject.color}`} />
                    <div className="p-5 flex flex-col gap-3">
                      <div className="text-2xl">{subject.emoji}</div>
                      <div>
                        <Badge variant="secondary" className="text-xs mb-2">{subject.badge}</Badge>
                        <h3 className="font-bold text-sm group-hover:text-brand-500 transition-colors">{subject.name}</h3>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed flex-1">{subject.desc}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground border-t pt-3">
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {subject.days} days</span>
                        <Badge variant="outline" className="text-xs">{subject.level}</Badge>
                      </div>
                      <div className="flex items-center gap-1 text-xs font-semibold text-brand-500 group-hover:gap-2 transition-all">
                        Start Track <ArrowRight className="h-3 w-3" />
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
      {/* HOW IT WORKS                                                   */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="py-14">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold tracking-tight mb-3">How the Day-by-Day Plans Work</h2>
            <p className="text-muted-foreground max-w-lg mx-auto text-sm">
              Each plan is carefully structured so you build knowledge incrementally — never overwhelmed.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { step: "01", title: "Pick a Language", desc: "Choose any language or track based on your goal — beginner to advanced.", icon: <Target className="h-6 w-6" />, color: "bg-blue-500/10 text-blue-500" },
              { step: "02", title: "Follow the Plan", desc: "One lesson per day with theory, examples, and practice problems.", icon: <BookOpen className="h-6 w-6" />, color: "bg-green-500/10 text-green-500" },
              { step: "03", title: "Code and Practice", desc: "Run code in the built-in compiler — no setup needed, right in the browser.", icon: <Code2 className="h-6 w-6" />, color: "bg-purple-500/10 text-purple-500" },
              { step: "04", title: "Track Progress", desc: "Earn XP, maintain your streak, and see your skill level grow daily.", icon: <Trophy className="h-6 w-6" />, color: "bg-yellow-500/10 text-yellow-500" },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0.01, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.color} mx-auto mb-4`}>
                  {item.icon}
                </div>
                <div className="text-xs font-black text-muted-foreground/40 mb-1">STEP {item.step}</div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* CTA                                                            */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0.01, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl mx-auto"
          >
            <div className="text-4xl mb-4">🚀</div>
            <h2 className="text-3xl font-extrabold mb-3">
              Start Coding Today
            </h2>
            <p className="text-muted-foreground mb-6">
              Free forever — pick a language and start day 1 right now. No sign-up required for basic access.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" variant="gradient" asChild>
                <Link href="/programming/python">
                  <Sparkles className="h-4 w-4" />
                  Start Python — Most Popular
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/programming/java">
                  Start Java — Placement Track
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
