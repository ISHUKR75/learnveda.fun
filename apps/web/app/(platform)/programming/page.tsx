/**
 * @file app/(platform)/programming/page.tsx
 * @description Programming languages hub — all 12 language tracks
 * Route: /programming
 * Shows: Language cards with day-count, difficulty, and Core CS tracks
 * Each language has a structured N-day plan from first principles to projects
 */

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Code2, Star, ChevronRight, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

/* ─── Page-level SEO Metadata ─────────────────────────────────────────────── */
export const metadata: Metadata = {
  title:       "Programming Languages — Structured Learning Plans | LearnVeda",
  description:
    "Learn programming with structured N-day plans. C, C++, Java, Python, JavaScript, " +
    "TypeScript, Rust, Kotlin, Swift, SQL, Dart, Ruby — from first principles to projects.",
  keywords:    ["Learn programming", "C++ tutorial", "Python learning plan", "Java beginner", "DSA preparation"],
};

/* ─── Programming Language Data ──────────────────────────────────────────── */
// All 12 programming language tracks with metadata
const PROGRAMMING_LANGUAGES = [
  {
    id:          "python",
    name:        "Python",
    slug:        "python",
    days:        45,
    level:       "Beginner",
    color:       "#3776AB",
    bgClass:     "from-blue-500/10 to-cyan-500/10",
    borderClass: "border-blue-500/20",
    textClass:   "text-blue-600 dark:text-blue-400",
    emoji:       "🐍",
    description: "The most beginner-friendly language. Data science, web dev, AI/ML, automation.",
    topics:      ["Variables & Control Flow", "Functions & OOP", "File I/O & Modules", "Projects"],
    jobRoles:    ["Data Scientist", "ML Engineer", "Web Developer", "Automation Engineer"],
    popularity:  "#1 on Stack Overflow 2024",
  },
  {
    id:          "javascript",
    name:        "JavaScript",
    slug:        "javascript",
    days:        30,
    level:       "Beginner",
    color:       "#F7DF1E",
    bgClass:     "from-yellow-500/10 to-amber-500/10",
    borderClass: "border-yellow-500/20",
    textClass:   "text-yellow-600 dark:text-yellow-400",
    emoji:       "⚡",
    description: "The language of the web. Build interactive websites and full-stack apps.",
    topics:      ["Basics & DOM", "ES6+ Features", "Async/Await", "Node.js & React"],
    jobRoles:    ["Frontend Dev", "Full-Stack Dev", "React Developer"],
    popularity:  "Most used language 12 years running",
  },
  {
    id:          "java",
    name:        "Java",
    slug:        "java",
    days:        45,
    level:       "Intermediate",
    color:       "#ED8B00",
    bgClass:     "from-orange-500/10 to-amber-500/10",
    borderClass: "border-orange-500/20",
    textClass:   "text-orange-600 dark:text-orange-400",
    emoji:       "☕",
    description: "Enterprise-grade OOP. Most common language in FAANG interviews.",
    topics:      ["OOP Principles", "Collections & Generics", "Multithreading", "Spring Boot"],
    jobRoles:    ["Software Engineer", "Backend Developer", "Android Developer"],
    popularity:  "#1 for FAANG SDE interviews",
  },
  {
    id:          "cpp",
    name:        "C++",
    slug:        "cpp",
    days:        30,
    level:       "Intermediate",
    color:       "#00599C",
    bgClass:     "from-blue-600/10 to-indigo-500/10",
    borderClass: "border-blue-600/20",
    textClass:   "text-blue-700 dark:text-blue-300",
    emoji:       "🔧",
    description: "High-performance systems. Essential for Competitive Programming and game dev.",
    topics:      ["Pointers & Memory", "STL", "Templates", "Competitive Programming"],
    jobRoles:    ["Competitive Programmer", "Game Dev", "Systems Engineer"],
    popularity:  "#1 for Competitive Programming",
  },
  {
    id:          "c",
    name:        "C",
    slug:        "c",
    days:        30,
    level:       "Beginner",
    color:       "#A8B9CC",
    bgClass:     "from-slate-500/10 to-gray-500/10",
    borderClass: "border-slate-500/20",
    textClass:   "text-slate-600 dark:text-slate-400",
    emoji:       "📟",
    description: "The foundation of modern computing. Essential for OS, embedded systems.",
    topics:      ["Syntax & I/O", "Pointers & Arrays", "Structs & Memory", "File Handling"],
    jobRoles:    ["Embedded Engineer", "OS Developer", "Systems Programmer"],
    popularity:  "Foundation of all modern languages",
  },
  {
    id:          "typescript",
    name:        "TypeScript",
    slug:        "typescript",
    days:        25,
    level:       "Intermediate",
    color:       "#3178C6",
    bgClass:     "from-blue-500/10 to-sky-500/10",
    borderClass: "border-blue-500/20",
    textClass:   "text-blue-600 dark:text-blue-400",
    emoji:       "🔷",
    description: "JavaScript with types. Industry standard for large-scale frontend apps.",
    topics:      ["Types & Interfaces", "Generics", "Decorators", "Advanced Patterns"],
    jobRoles:    ["Senior Frontend Dev", "Full-Stack Engineer"],
    popularity:  "#3 most loved language",
  },
  {
    id:          "rust",
    name:        "Rust",
    slug:        "rust",
    days:        40,
    level:       "Advanced",
    color:       "#CE412B",
    bgClass:     "from-red-500/10 to-orange-500/10",
    borderClass: "border-red-500/20",
    textClass:   "text-red-600 dark:text-red-400",
    emoji:       "🦀",
    description: "Memory-safe systems programming. Most loved language 8 years running.",
    topics:      ["Ownership & Borrowing", "Lifetimes", "Traits", "Async & Concurrency"],
    jobRoles:    ["Systems Engineer", "Blockchain Dev", "Game Engine Dev"],
    popularity:  "Most loved language 8 years (Stack Overflow)",
  },
  {
    id:          "kotlin",
    name:        "Kotlin",
    slug:        "kotlin",
    days:        30,
    level:       "Intermediate",
    color:       "#7F52FF",
    bgClass:     "from-violet-500/10 to-purple-500/10",
    borderClass: "border-violet-500/20",
    textClass:   "text-violet-600 dark:text-violet-400",
    emoji:       "🎯",
    description: "Modern Android development. 100% interoperable with Java.",
    topics:      ["Kotlin Basics", "Coroutines", "Android Dev", "Spring + Kotlin"],
    jobRoles:    ["Android Developer", "Backend Engineer"],
    popularity:  "Official Android language by Google",
  },
  {
    id:          "swift",
    name:        "Swift",
    slug:        "swift",
    days:        30,
    level:       "Intermediate",
    color:       "#FA7343",
    bgClass:     "from-orange-400/10 to-red-400/10",
    borderClass: "border-orange-400/20",
    textClass:   "text-orange-600 dark:text-orange-400",
    emoji:       "🍎",
    description: "Apple ecosystem development — iOS, macOS, watchOS apps.",
    topics:      ["Swift Basics", "UIKit / SwiftUI", "Networking", "App Architecture"],
    jobRoles:    ["iOS Developer", "macOS Developer"],
    popularity:  "Only language for native Apple apps",
  },
  {
    id:          "sql",
    name:        "SQL",
    slug:        "sql",
    days:        20,
    level:       "Beginner",
    color:       "#4479A1",
    bgClass:     "from-sky-500/10 to-blue-500/10",
    borderClass: "border-sky-500/20",
    textClass:   "text-sky-600 dark:text-sky-400",
    emoji:       "🗄️",
    description: "Database querying — every developer and data professional needs SQL.",
    topics:      ["SELECT & WHERE", "JOINs", "Aggregations", "Indexing & Optimization"],
    jobRoles:    ["Data Analyst", "Backend Developer", "Database Engineer"],
    popularity:  "Used in every company worldwide",
  },
  {
    id:          "dart",
    name:        "Dart",
    slug:        "dart",
    days:        25,
    level:       "Beginner",
    color:       "#0175C2",
    bgClass:     "from-cyan-500/10 to-blue-400/10",
    borderClass: "border-cyan-500/20",
    textClass:   "text-cyan-600 dark:text-cyan-400",
    emoji:       "💎",
    description: "Flutter's language — build cross-platform mobile apps from one codebase.",
    topics:      ["Dart Basics", "OOP in Dart", "Async Programming", "Flutter Integration"],
    jobRoles:    ["Flutter Developer", "Mobile App Developer"],
    popularity:  "Only language for Flutter apps",
  },
  {
    id:          "ruby",
    name:        "Ruby",
    slug:        "ruby",
    days:        25,
    level:       "Beginner",
    color:       "#CC342D",
    bgClass:     "from-red-400/10 to-rose-400/10",
    borderClass: "border-red-400/20",
    textClass:   "text-red-600 dark:text-red-400",
    emoji:       "💎",
    description: "Elegant scripting language. Ruby on Rails — rapid web app development.",
    topics:      ["Ruby Basics", "OOP & Blocks", "Ruby on Rails", "APIs with Rails"],
    jobRoles:    ["Rails Developer", "Backend Engineer"],
    popularity:  "Developer happiness-focused language",
  },
];

/* ─── Core CS Subjects ───────────────────────────────────────────────────── */
// The 4 Core CS tracks (not languages but CS fundamentals)
const CORE_CS_SUBJECTS = [
  {
    id:    "dsa",
    name:  "Data Structures & Algorithms",
    slug:  "dsa",
    days:  60,
    emoji: "🧠",
    bgClass:     "from-purple-500/10 to-indigo-500/10",
    borderClass: "border-purple-500/20",
    textClass:   "text-purple-600 dark:text-purple-400",
    desc:  "6-phase, 60-day plan — Arrays to DP. FAANG-focused problem sets.",
  },
  {
    id:    "web-development",
    name:  "Web Development",
    slug:  "web-development",
    days:  30,
    emoji: "🌐",
    bgClass:     "from-teal-500/10 to-green-500/10",
    borderClass: "border-teal-500/20",
    textClass:   "text-teal-600 dark:text-teal-400",
    desc:  "HTML → CSS → JavaScript → React → Node.js → Full-Stack project.",
  },
  {
    id:    "system-design",
    name:  "System Design",
    slug:  "system-design",
    days:  25,
    emoji: "🏗️",
    bgClass:     "from-amber-500/10 to-orange-500/10",
    borderClass: "border-amber-500/20",
    textClass:   "text-amber-600 dark:text-amber-400",
    desc:  "HLD → LLD → CAP theorem → Real systems (Twitter, Netflix, Uber).",
  },
  {
    id:    "dbms",
    name:  "Database Management Systems",
    slug:  "dbms",
    days:  20,
    emoji: "🗃️",
    bgClass:     "from-rose-500/10 to-pink-500/10",
    borderClass: "border-rose-500/20",
    textClass:   "text-rose-600 dark:text-rose-400",
    desc:  "Relational → SQL → Normalization → ACID → Transactions → Indexing.",
  },
];

/* ─── Difficulty Color Map ───────────────────────────────────────────────── */
const DIFFICULTY_COLORS: Record<string, string> = {
  Beginner:     "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
  Intermediate: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  Advanced:     "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
};

/* ─── Programming Hub Page Component ────────────────────────────────────── */
export default function ProgrammingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ── Page Header ──────────────────────────────────────────────────── */}
      <div className="border-b bg-gradient-to-br from-green-500/5 via-background to-teal-500/5">
        <div className="container px-4 py-12 md:py-16">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/learn" className="hover:text-foreground transition-colors">Learn</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">Programming</span>
          </nav>

          <div className="flex items-start gap-4 mb-6">
            <div className="h-14 w-14 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-2xl shrink-0">
              <Code2 className="h-7 w-7 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">Programming Languages</h1>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Structured N-day plans — from first principles to project-level confidence.
                Each language has daily lessons, exercises, and a final project.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Languages",   value: "12"   },
              { label: "CS Tracks",   value: "4"    },
              { label: "Total Days",  value: "400+" },
              { label: "Projects",    value: "50+"  },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border bg-card/50 p-4 text-center">
                <div className="text-2xl font-bold">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container px-4 py-10 space-y-12">

        {/* ── Programming Languages Grid ────────────────────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">12 Programming Languages</h2>
            <Badge variant="outline" className="text-xs">Structured N-Day Plans</Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {PROGRAMMING_LANGUAGES.map((lang) => (
              <Link
                key={lang.id}
                href={`/programming/${lang.slug}`}
                className="group rounded-2xl border bg-card hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 overflow-hidden"
              >
                {/* Top gradient bar */}
                <div className={`h-1 bg-gradient-to-r ${lang.bgClass.replace("/10", "")}`} />

                <div className="p-5">
                  {/* Language icon + badge */}
                  <div className="flex items-start justify-between mb-3">
                    <div className={`h-11 w-11 rounded-xl bg-gradient-to-br ${lang.bgClass} border ${lang.borderClass} flex items-center justify-center text-xl`}>
                      {lang.emoji}
                    </div>
                    <Badge className={`text-[9px] py-0 ${DIFFICULTY_COLORS[lang.level]}`}>
                      {lang.level}
                    </Badge>
                  </div>

                  {/* Language name + desc */}
                  <h3 className="font-bold text-base mb-1 group-hover:text-primary transition-colors">
                    {lang.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                    {lang.description}
                  </p>

                  {/* Topics preview */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {lang.topics.slice(0, 2).map((t) => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Duration + arrow */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {lang.days}-Day Plan
                    </span>
                    <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-200" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Core CS Tracks ────────────────────────────────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Core CS Subjects</h2>
            <Badge variant="outline" className="text-xs">SDE Interview Essentials</Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CORE_CS_SUBJECTS.map((cs) => (
              <Link
                key={cs.id}
                href={`/core-cs/${cs.slug}`}
                className="group rounded-2xl border bg-card hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 p-5"
              >
                <div className={`h-11 w-11 rounded-xl bg-gradient-to-br ${cs.bgClass} border ${cs.borderClass} flex items-center justify-center text-xl mb-3`}>
                  {cs.emoji}
                </div>
                <h3 className="font-bold text-sm mb-1 group-hover:text-primary transition-colors">{cs.name}</h3>
                <p className="text-xs text-muted-foreground mb-3">{cs.desc}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {cs.days} Days
                  </span>
                  <Zap className="h-3.5 w-3.5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Why Learn Here ─────────────────────────────────────────────── */}
        <section className="rounded-2xl border bg-gradient-to-br from-primary/5 to-background p-6">
          <h3 className="font-bold text-lg mb-4">Why Learn Programming on LearnVeda?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon:"📅", title:"Structured Day Plans",  desc:"Every language has a day-by-day curriculum — never wonder what to study next."        },
              { icon:"💻", title:"Online Compiler",        desc:"Run code directly in your browser — no setup needed."                                  },
              { icon:"🏆", title:"Project-Based Ending",  desc:"Every track ends with a real project you can add to your portfolio."                    },
              { icon:"🎯", title:"FAANG-Focused DSA",     desc:"Problem sets curated for product company SDE interviews."                              },
              { icon:"⚡", title:"Live Battle Mode",       desc:"Test your skills in 1v1 coding battles with real opponents."                           },
              { icon:"🆓", title:"Completely Free",        desc:"All programming tracks are free for every student."                                   },
            ].map((f) => (
              <div key={f.title} className="flex items-start gap-3">
                <span className="text-2xl shrink-0">{f.icon}</span>
                <div>
                  <div className="font-medium text-sm">{f.title}</div>
                  <div className="text-xs text-muted-foreground">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
