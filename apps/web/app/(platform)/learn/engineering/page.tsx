/**
 * @file app/(platform)/learn/engineering/page.tsx
 * @description Engineering tracks hub — BTech CSE subjects, semester guides, and interview prep
 * Route: /learn/engineering
 * Shows: CS core subjects, semester plan, interview prep, and DSA tracks
 */

import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen, ArrowRight, Clock, ChevronRight, Code2,
  Cpu, Database, Globe, Network, Binary, Layers,
  GraduationCap, Star, Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* ─── Page-level SEO Metadata ─────────────────────────────────────────────── */
export const metadata: Metadata = {
  title:       "Engineering Tracks — BTech CSE, DSA, System Design | LearnVeda",
  description:
    "Complete engineering learning hub — BTech CSE 8-semester guide, DSA 60-day plan, " +
    "System Design, DBMS, OS, Computer Networks, and FAANG interview preparation.",
  keywords:    ["BTech CSE", "Engineering subjects", "DSA preparation", "FAANG interview", "System Design"],
};

/* ─── Engineering Subjects Data ──────────────────────────────────────────── */
// Core BTech CSE subjects organized by importance and track
const CORE_CS_SUBJECTS = [
  {
    id:          "dsa",
    name:        "Data Structures & Algorithms",
    abbrev:      "DSA",
    icon:        Binary,
    days:        60,
    phases:      6,
    emoji:       "🧠",
    bgClass:     "from-purple-500/10 to-indigo-500/10",
    borderClass: "border-purple-500/20",
    textClass:   "text-purple-600 dark:text-purple-400",
    badge:       "FAANG Essential",
    badgeColor:  "bg-purple-500/10 text-purple-600 border-purple-500/20",
    href:        "/programming/dsa",
    topics:      ["Arrays & Strings", "Trees & Graphs", "Dynamic Programming", "Greedy", "FAANG Problems"],
    description: "60-day structured DSA plan — 6 phases from fundamentals to FAANG-level problems.",
  },
  {
    id:          "web-dev",
    name:        "Web Development",
    abbrev:      "Web Dev",
    icon:        Globe,
    days:        30,
    phases:      4,
    emoji:       "🌐",
    bgClass:     "from-teal-500/10 to-green-500/10",
    borderClass: "border-teal-500/20",
    textClass:   "text-teal-600 dark:text-teal-400",
    badge:       "Industry Favorite",
    badgeColor:  "bg-teal-500/10 text-teal-600 border-teal-500/20",
    href:        "/programming/web-development",
    topics:      ["HTML & CSS", "JavaScript", "React.js", "Node.js + APIs"],
    description: "Complete full-stack web dev — from HTML basics to building REST APIs with Express.",
  },
  {
    id:          "system-design",
    name:        "System Design",
    abbrev:      "SysDes",
    icon:        Layers,
    days:        25,
    phases:      3,
    emoji:       "🏗️",
    bgClass:     "from-amber-500/10 to-orange-500/10",
    borderClass: "border-amber-500/20",
    textClass:   "text-amber-600 dark:text-amber-400",
    badge:       "Senior SDE",
    badgeColor:  "bg-amber-500/10 text-amber-600 border-amber-500/20",
    href:        "/programming/system-design",
    topics:      ["HLD vs LLD", "CAP Theorem", "Load Balancing", "Real Systems (Twitter, Netflix)"],
    description: "High-Level and Low-Level design — master distributed systems for senior interviews.",
  },
  {
    id:          "dbms",
    name:        "Database Management Systems",
    abbrev:      "DBMS",
    icon:        Database,
    days:        20,
    phases:      4,
    emoji:       "🗃️",
    bgClass:     "from-rose-500/10 to-pink-500/10",
    borderClass: "border-rose-500/20",
    textClass:   "text-rose-600 dark:text-rose-400",
    badge:       "Core CS",
    badgeColor:  "bg-rose-500/10 text-rose-600 border-rose-500/20",
    href:        "/programming/dbms",
    topics:      ["ER Diagrams", "SQL & Joins", "Normalization (3NF/BCNF)", "Transactions & ACID"],
    description: "Relational databases, SQL mastery, normalization, indexing, and ACID properties.",
  },
  {
    id:          "os",
    name:        "Operating Systems",
    abbrev:      "OS",
    icon:        Cpu,
    days:        20,
    phases:      4,
    emoji:       "⚙️",
    bgClass:     "from-cyan-500/10 to-sky-500/10",
    borderClass: "border-cyan-500/20",
    textClass:   "text-cyan-600 dark:text-cyan-400",
    badge:       "Core CS",
    badgeColor:  "bg-cyan-500/10 text-cyan-600 border-cyan-500/20",
    href:        "/programming/os",
    topics:      ["Process Management", "Memory Management", "CPU Scheduling", "Deadlocks"],
    description: "OS internals — processes, threads, memory management, scheduling algorithms, deadlocks.",
  },
  {
    id:          "computer-networks",
    name:        "Computer Networks",
    abbrev:      "CN",
    icon:        Network,
    days:        15,
    phases:      3,
    emoji:       "📡",
    bgClass:     "from-blue-500/10 to-indigo-500/10",
    borderClass: "border-blue-500/20",
    textClass:   "text-blue-600 dark:text-blue-400",
    badge:       "Core CS",
    badgeColor:  "bg-blue-500/10 text-blue-600 border-blue-500/20",
    href:        "/programming/computer-networks",
    topics:      ["OSI/TCP Model", "HTTP & HTTPS", "DNS & CDN", "TCP vs UDP"],
    description: "Computer networking fundamentals — OSI model, TCP/IP, HTTP, DNS, and web protocols.",
  },
];

/* ─── BTech Semester Guide ───────────────────────────────────────────────── */
// 8-semester BTech CSE plan overview
const SEMESTER_PLAN = [
  { sem: 1, subjects: ["Maths I (Calculus)", "Physics", "C Programming", "English"],        focus: "Foundation"  },
  { sem: 2, subjects: ["Maths II (Linear Algebra)", "Data Structures", "OOP (Java/C++)", "Digital Logic"], focus: "Core Concepts" },
  { sem: 3, subjects: ["Algorithms", "DBMS", "Computer Architecture", "Discrete Maths"],    focus: "Deep Core"   },
  { sem: 4, subjects: ["Operating Systems", "Theory of Computation", "Computer Networks", "Software Engineering"], focus: "Systems" },
  { sem: 5, subjects: ["Compiler Design", "AI & ML", "Web Technologies", "Elective I"],     focus: "Advanced"    },
  { sem: 6, subjects: ["Distributed Systems", "Cloud Computing", "Elective II", "Project"], focus: "Specialization" },
  { sem: 7, subjects: ["Machine Learning", "Big Data", "Elective III", "Industry Project"], focus: "Industry"    },
  { sem: 8, subjects: ["Capstone Project", "Internship", "Elective IV", "Placement Prep"],  focus: "Placement"   },
];

/* ─── Interview Prep Resources ───────────────────────────────────────────── */
// FAANG-focused interview preparation resources
const INTERVIEW_RESOURCES = [
  {
    title: "C++ OOP Deep Dive",
    topics: ["Virtual Functions", "Diamond Problem", "RAII", "Smart Pointers"],
    href:  "/interviews/cpp-oop",
  },
  {
    title: "DBMS Interview Guide",
    topics: ["B-Trees & Indexing", "ACID Properties", "Normalization", "Isolation Levels"],
    href:  "/interviews/dbms",
  },
  {
    title: "OS Interview Guide",
    topics: ["Deadlock Detection", "CPU Scheduling", "Memory Management", "Paging vs Segmentation"],
    href:  "/interviews/os",
  },
  {
    title: "System Design Catalog",
    topics: ["Design Twitter", "Design Netflix", "Design Uber", "Design WhatsApp"],
    href:  "/interviews/system-design",
  },
];

/* ─── Engineering Hub Page Component ────────────────────────────────────── */
export default function EngineeringPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ── Page Header ──────────────────────────────────────────────────── */}
      <div className="border-b bg-gradient-to-br from-cyan-500/5 via-background to-indigo-500/5">
        <div className="container px-4 py-12 md:py-16">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/learn" className="hover:text-foreground transition-colors">Learn</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">Engineering</span>
          </nav>

          <div className="flex items-start gap-4 mb-6">
            <div className="h-14 w-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-2xl shrink-0">
              <GraduationCap className="h-7 w-7 text-cyan-600 dark:text-cyan-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-3xl sm:text-4xl font-bold">Engineering Tracks</h1>
                <Badge className="text-xs bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20">
                  BTech CSE
                </Badge>
              </div>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Complete engineering curriculum — BTech CSE subjects, DSA interview prep,
                System Design, and FAANG-focused problem sets.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "CS Subjects",    value: "6"    },
              { label: "Total Days",     value: "170+" },
              { label: "FAANG Problems", value: "500+" },
              { label: "Mock Tests",     value: "20"   },
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

        {/* ── Core CS Subjects ──────────────────────────────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Core Computer Science Subjects</h2>
            <Badge variant="outline" className="text-xs">SDE Interview Essential</Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CORE_CS_SUBJECTS.map((subject) => {
              const Icon = subject.icon;
              return (
                <Link
                  key={subject.id}
                  href={subject.href}
                  className="group rounded-2xl border bg-card hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 overflow-hidden"
                >
                  <div className={`h-1 bg-gradient-to-r ${subject.bgClass.replace("/10", "")}`} />
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`h-11 w-11 rounded-xl bg-gradient-to-br ${subject.bgClass} border ${subject.borderClass} flex items-center justify-center text-xl`}>
                        {subject.emoji}
                      </div>
                      <Badge className={`text-[9px] py-0 ${subject.badgeColor}`}>{subject.badge}</Badge>
                    </div>

                    <h3 className="font-bold text-sm mb-1 group-hover:text-primary transition-colors">
                      {subject.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{subject.description}</p>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {subject.topics.slice(0, 3).map((t) => (
                        <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {subject.days} Days · {subject.phases} Phases
                      </span>
                      <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── BTech Semester Guide ──────────────────────────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">BTech CSE — 8 Semester Guide</h2>
            <Badge variant="outline" className="text-xs">Complete 4-Year Plan</Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {SEMESTER_PLAN.map((sem) => (
              <Link
                key={sem.sem}
                href={`/semester/${sem.sem}`}
                className="group rounded-2xl border bg-card hover:shadow-md transition-all p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center">
                    S{sem.sem}
                  </div>
                  <Badge variant="outline" className="text-[9px]">{sem.focus}</Badge>
                </div>
                <ul className="space-y-1">
                  {sem.subjects.map((s) => (
                    <li key={s} className="text-xs text-muted-foreground flex items-center gap-1">
                      <BookOpen className="h-2.5 w-2.5 shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Interview Prep ────────────────────────────────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Interview Preparation</h2>
            <Badge className="text-xs bg-purple-500/10 text-purple-600 border-purple-500/20">FAANG Ready</Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {INTERVIEW_RESOURCES.map((res) => (
              <Link
                key={res.title}
                href={res.href}
                className="group rounded-2xl border bg-card p-4 hover:shadow-md transition-all hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between mb-3">
                  <Star className="h-4 w-4 text-amber-500" />
                  <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="font-semibold text-sm mb-2 group-hover:text-primary transition-colors">
                  {res.title}
                </h3>
                <div className="space-y-1">
                  {res.topics.map((t) => (
                    <div key={t} className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      <Code2 className="h-2.5 w-2.5 shrink-0" />
                      {t}
                    </div>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── CTA Banner ─────────────────────────────────────────────────── */}
        <section className="rounded-2xl border bg-gradient-to-br from-primary/10 to-cyan-500/5 p-8 text-center">
          <h3 className="text-2xl font-bold mb-3">Start Your Engineering Journey Today</h3>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            All engineering tracks are free. Start with DSA — the most critical skill for tech interviews.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Button asChild size="lg">
              <Link href="/programming/dsa">
                <Zap className="h-4 w-4 mr-2" />
                Start DSA 60-Day Plan
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/programming">
                <Code2 className="h-4 w-4 mr-2" />
                Browse All Languages
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
