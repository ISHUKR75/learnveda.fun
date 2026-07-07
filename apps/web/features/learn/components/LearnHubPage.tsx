/**
 * @file features/learn/components/LearnHubPage.tsx
 * @description Learn Hub — all learning tracks in one place
 *
 * The main /learn page showing all available learning paths:
 * - CBSE Classes 9–12 with subject overview + chapter counts
 * - Engineering branches (B.Tech, 9 branches)
 * - Core CS subjects (DSA, OS, DBMS, CN, System Design, Git, CP, Web Dev, Interview)
 * - Programming languages (14 languages with day plans)
 *
 * Used in: app/(marketing)/learn/page.tsx
 */

"use client"; // Client component — hover animations

import React from "react"; // React core
import Link from "next/link"; // Navigation
import { motion } from "framer-motion"; // Entry animations
import {
  BookOpen, Code2, Cpu, ChevronRight, Atom, FlaskConical,
  Calculator, Globe, GraduationCap, ArrowRight,
  BarChart2, Database, Network, HardDrive, GitBranch,
  Brain, Terminal, Zap, Trophy,
} from "lucide-react"; // Icons
import { Badge }  from "@/components/ui/badge";  // Status badges
import { Button } from "@/components/ui/button"; // CTA button

/* ─── CBSE Classes Data ──────────────────────────────────────────────────── */
const CLASSES = [
  {
    id:       "class-9",
    label:    "Class 9",
    href:     "/learn/class-9",
    emoji:    "📗",
    subjects: ["Mathematics", "Science", "Social Science", "English", "Hindi", "Computer", "AI"],
    chapters: 90,
    color:    "from-blue-500 to-cyan-500",
    bg:       "bg-blue-500/10",
    border:   "border-blue-500/20",
    plans:    "45-day plan",
  },
  {
    id:       "class-10",
    label:    "Class 10",
    href:     "/learn/class-10",
    emoji:    "📘",
    subjects: ["Mathematics", "Science", "Social Science", "English", "Hindi", "IT"],
    chapters: 95,
    color:    "from-green-500 to-emerald-500",
    bg:       "bg-green-500/10",
    border:   "border-green-500/20",
    plans:    "50-day plan · Board prep",
  },
  {
    id:       "class-11",
    label:    "Class 11",
    href:     "/learn/class-11",
    emoji:    "📙",
    subjects: ["Physics", "Chemistry", "Mathematics", "Biology", "Economics", "Accounts"],
    chapters: 110,
    color:    "from-orange-500 to-amber-500",
    bg:       "bg-orange-500/10",
    border:   "border-orange-500/20",
    plans:    "Science · Commerce · Arts streams",
  },
  {
    id:       "class-12",
    label:    "Class 12",
    href:     "/learn/class-12",
    emoji:    "📕",
    subjects: ["Physics", "Chemistry", "Mathematics", "Biology", "Accountancy", "Business Studies"],
    chapters: 115,
    color:    "from-purple-500 to-violet-500",
    bg:       "bg-purple-500/10",
    border:   "border-purple-500/20",
    plans:    "2,000+ questions · JEE/NEET prep",
  },
];

/* ─── Engineering Branches ───────────────────────────────────────────────── */
const ENGINEERING_BRANCHES = [
  { id:"cse",      label:"Computer Science (CSE)",     emoji:"💻", href:"/learn/engineering/cse",      semesters:8 },
  { id:"ece",      label:"Electronics & Comm (ECE)",   emoji:"📡", href:"/learn/engineering/ece",      semesters:8 },
  { id:"eee",      label:"Electrical (EEE)",           emoji:"⚡", href:"/learn/engineering/eee",      semesters:8 },
  { id:"civil",    label:"Civil Engineering",          emoji:"🏗",  href:"/learn/engineering/civil",    semesters:8 },
  { id:"mech",     label:"Mechanical",                 emoji:"⚙️",  href:"/learn/engineering/mech",     semesters:8 },
  { id:"ai-ml",    label:"AI & Machine Learning",      emoji:"🤖", href:"/learn/engineering/ai-ml",    semesters:8 },
  { id:"data-sci", label:"Data Science",               emoji:"📊", href:"/learn/engineering/data-sci", semesters:8 },
  { id:"it",       label:"Information Technology",     emoji:"🌐", href:"/learn/engineering/it",       semesters:8 },
  { id:"chemical", label:"Chemical Engineering",       emoji:"🧪", href:"/learn/engineering/chemical", semesters:8 },
];

/* ─── Core CS Subjects ───────────────────────────────────────────────────── */
const CORE_CS = [
  { id:"dsa",      label:"Data Structures & Algorithms", emoji:"🌳", days:60, href:"/core-cs/dsa",          icon:GitBranch   },
  { id:"os",       label:"Operating Systems",            emoji:"💾", days:20, href:"/core-cs/os",           icon:HardDrive   },
  { id:"dbms",     label:"Database Management",          emoji:"🗄️", days:20, href:"/core-cs/dbms",         icon:Database    },
  { id:"cn",       label:"Computer Networks",            emoji:"🌐", days:20, href:"/core-cs/cn",           icon:Network     },
  { id:"sd",       label:"System Design",                emoji:"🏛",  days:25, href:"/core-cs/system-design",icon:BarChart2   },
  { id:"git",      label:"Git & GitHub",                 emoji:"🔀", days:10, href:"/core-cs/git",          icon:GitBranch   },
  { id:"cp",       label:"Competitive Programming",      emoji:"🏆", days:60, href:"/core-cs/cp",           icon:Trophy      },
  { id:"web",      label:"Web Development",              emoji:"🕸",  days:30, href:"/core-cs/web-dev",      icon:Globe       },
  { id:"interview",label:"Interview Preparation",        emoji:"🎯", days:30, href:"/core-cs/interview",    icon:Brain       },
];

/* ─── Programming Languages ──────────────────────────────────────────────── */
const LANGUAGES = [
  { id:"python",     name:"Python",     emoji:"🐍", days:45, level:"Beginner",     href:"/programming/python",     color:"from-yellow-500 to-green-500"  },
  { id:"javascript", name:"JavaScript", emoji:"🌐", days:30, level:"Beginner",     href:"/programming/javascript", color:"from-yellow-400 to-yellow-600" },
  { id:"java",       name:"Java",       emoji:"☕", days:45, level:"Intermediate", href:"/programming/java",       color:"from-orange-500 to-red-500"    },
  { id:"c",          name:"C",          emoji:"©️",  days:30, level:"Beginner",     href:"/programming/c",          color:"from-blue-500 to-blue-600"     },
  { id:"cpp",        name:"C++",        emoji:"➕", days:30, level:"Intermediate", href:"/programming/cpp",        color:"from-blue-600 to-indigo-600"   },
  { id:"typescript", name:"TypeScript", emoji:"📘", days:25, level:"Intermediate", href:"/programming/typescript", color:"from-blue-500 to-cyan-500"     },
  { id:"rust",       name:"Rust",       emoji:"🦀", days:40, level:"Advanced",     href:"/programming/rust",       color:"from-orange-600 to-red-700"    },
  { id:"go",         name:"Go",         emoji:"🔵", days:30, level:"Intermediate", href:"/programming/go",         color:"from-cyan-500 to-teal-500"     },
  { id:"kotlin",     name:"Kotlin",     emoji:"🟣", days:30, level:"Intermediate", href:"/programming/kotlin",     color:"from-purple-500 to-violet-600" },
  { id:"swift",      name:"Swift",      emoji:"🐦", days:30, level:"Intermediate", href:"/programming/swift",      color:"from-orange-500 to-pink-500"   },
  { id:"sql",        name:"SQL",        emoji:"🗄️", days:20, level:"Beginner",     href:"/programming/sql",        color:"from-teal-500 to-cyan-600"     },
  { id:"dart",       name:"Dart",       emoji:"🎯", days:25, level:"Beginner",     href:"/programming/dart",       color:"from-cyan-400 to-blue-500"     },
  { id:"ruby",       name:"Ruby",       emoji:"💎", days:25, level:"Beginner",     href:"/programming/ruby",       color:"from-red-500 to-pink-500"      },
];

/* ─── Animation variants ─────────────────────────────────────────────────── */
const cardVariant = {
  hidden:  { opacity: 0.01, y: 12 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.35, delay: i * 0.06 } }),
};

/* ─── LearnHubPage Component ─────────────────────────────────────────────── */

/**
 * Full /learn page with all learning tracks.
 */
export function LearnHubPage() {
  return (
    <div className="py-12">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">

        {/* ── Page Header ────────────────────────────────────────── */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-3">
            All Learning Tracks
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From Class 9 to Graduation — structured, CBSE-aligned, and updated for 2025-26.
          </p>
        </div>

        {/* ── Section 1: CBSE Classes ─────────────────────────────── */}
        <section className="mb-14">
          <div className="flex items-center gap-2 mb-5">
            <BookOpen className="h-5 w-5 text-brand-500" />
            <h2 className="text-xl font-bold text-foreground">CBSE Classes (9–12)</h2>
            <Badge variant="outline" className="text-xs">NCERT Aligned</Badge>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CLASSES.map((cls, i) => (
              <motion.div
                key={cls.id}
                custom={i}
                variants={cardVariant}
                initial="hidden"
                animate="visible"
              >
                <Link href={cls.href}>
                  <div className={`h-full rounded-2xl border ${cls.border} ${cls.bg} p-5 hover:shadow-md transition-all group cursor-pointer`}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">{cls.emoji}</span>
                      <span className="text-sm font-bold text-foreground">{cls.label}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {cls.subjects.slice(0, 4).map(s => (
                        <span key={s} className="text-xs px-1.5 py-0.5 bg-background/50 text-muted-foreground rounded-full">
                          {s}
                        </span>
                      ))}
                      {cls.subjects.length > 4 && (
                        <span className="text-xs text-muted-foreground">+{cls.subjects.length - 4}</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{cls.chapters}+ chapters</span>
                      <ChevronRight className="h-3.5 w-3.5 group-hover:text-brand-500 transition-colors" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Section 2: Programming Languages ───────────────────── */}
        <section className="mb-14">
          <div className="flex items-center gap-2 mb-5">
            <Code2 className="h-5 w-5 text-brand-500" />
            <h2 className="text-xl font-bold text-foreground">Programming Languages</h2>
            <Badge variant="outline" className="text-xs">14 Languages</Badge>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {LANGUAGES.map((lang, i) => (
              <motion.div
                key={lang.id}
                custom={i}
                variants={cardVariant}
                initial="hidden"
                animate="visible"
              >
                <Link href={lang.href}>
                  <div className="rounded-2xl border bg-card p-4 hover:shadow-md transition-all group cursor-pointer text-center">
                    <div className="text-2xl mb-1">{lang.emoji}</div>
                    <p className="font-semibold text-sm text-foreground group-hover:text-brand-500 transition-colors">
                      {lang.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{lang.days} days</p>
                    <Badge
                      variant="outline"
                      className={`text-xs mt-1.5 ${
                        lang.level === "Beginner"     ? "border-green-500/40 text-green-600" :
                        lang.level === "Intermediate" ? "border-yellow-500/40 text-yellow-600" :
                        "border-red-500/40 text-red-600"
                      }`}
                    >
                      {lang.level}
                    </Badge>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Section 3: Core CS Subjects ─────────────────────────── */}
        <section className="mb-14">
          <div className="flex items-center gap-2 mb-5">
            <Brain className="h-5 w-5 text-brand-500" />
            <h2 className="text-xl font-bold text-foreground">Core CS Subjects</h2>
            <Badge variant="outline" className="text-xs">SDE Interview Ready</Badge>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CORE_CS.map((sub, i) => (
              <motion.div
                key={sub.id}
                custom={i}
                variants={cardVariant}
                initial="hidden"
                animate="visible"
              >
                <Link href={sub.href}>
                  <div className="flex items-center gap-4 rounded-2xl border bg-card p-4 hover:shadow-md hover:border-brand-500/30 transition-all group cursor-pointer">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-2xl">
                      {sub.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-foreground group-hover:text-brand-500 transition-colors">
                        {sub.label}
                      </p>
                      <p className="text-xs text-muted-foreground">{sub.days} day plan</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-brand-500 transition-colors flex-shrink-0" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Section 4: Engineering ───────────────────────────────── */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-5">
            <GraduationCap className="h-5 w-5 text-brand-500" />
            <h2 className="text-xl font-bold text-foreground">Engineering (B.Tech)</h2>
            <Badge variant="outline" className="text-xs">9 Branches · 8 Semesters</Badge>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ENGINEERING_BRANCHES.map((branch, i) => (
              <motion.div
                key={branch.id}
                custom={i}
                variants={cardVariant}
                initial="hidden"
                animate="visible"
              >
                <Link href={branch.href}>
                  <div className="flex items-center gap-4 rounded-2xl border bg-card p-4 hover:shadow-md hover:border-brand-500/30 transition-all group cursor-pointer">
                    <span className="text-2xl flex-shrink-0">{branch.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-foreground group-hover:text-brand-500 transition-colors">
                        {branch.label}
                      </p>
                      <p className="text-xs text-muted-foreground">{branch.semesters} semesters</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-brand-500 transition-colors flex-shrink-0" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Bottom CTA ───────────────────────────────────────────── */}
        <div className="text-center p-8 rounded-2xl border bg-brand-500/5 border-brand-500/20">
          <h3 className="text-xl font-bold text-foreground mb-2">Not sure where to start?</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Try our AI-powered learning path builder — get a personalized plan in 2 minutes.
          </p>
          <Link href="/ai-tutor">
            <Button className="gap-1.5">
              Get My Learning Path <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
