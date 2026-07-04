/**
 * @file features/learn/components/LearnHubPage.tsx
 * @description Learning Hub page component showing all available tracks
 * Links to Class 9-12, Engineering, Programming Languages, and Core CS
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, GraduationCap, Code2, Brain, ArrowRight, Search, FlaskConical } from "lucide-react";
import { Badge }  from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* ─── Class 9-12 Data ────────────────────────────────────────────────────── */
const classes = [
  {
    name: "Class 9", href: "/learn/class-9", emoji: "9️⃣",
    subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "English", "Hindi", "Social Science", "Computer", "AI"],
    chapters: 75, questions: 2000,
    color: "from-blue-500 to-cyan-500", border: "border-blue-500/20", bg: "from-blue-500/5 to-cyan-500/5",
  },
  {
    name: "Class 10", href: "/learn/class-10", emoji: "🔟",
    subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "English", "Hindi", "Social Science", "Computer"],
    chapters: 80, questions: 2500,
    color: "from-purple-500 to-pink-500", border: "border-purple-500/20", bg: "from-purple-500/5 to-pink-500/5",
  },
  {
    name: "Class 11", href: "/learn/class-11", emoji: "1️⃣1️⃣",
    subjects: ["Physics", "Chemistry", "Math", "Biology", "CS", "English", "Accountancy", "Economics"],
    chapters: 120, questions: 4000,
    color: "from-green-500 to-teal-500", border: "border-green-500/20", bg: "from-green-500/5 to-teal-500/5",
  },
  {
    name: "Class 12", href: "/learn/class-12", emoji: "1️⃣2️⃣",
    subjects: ["Physics", "Chemistry", "Math", "Biology", "CS", "English", "Accountancy", "Economics"],
    chapters: 130, questions: 5000,
    color: "from-orange-500 to-red-500", border: "border-orange-500/20", bg: "from-orange-500/5 to-red-500/5",
  },
];

/* ─── Engineering Branches ───────────────────────────────────────────────── */
const engineeringBranches = [
  { name: "CSE",         emoji: "💻", href: "/learn/engineering/cse"         },
  { name: "ECE",         emoji: "📡", href: "/learn/engineering/ece"         },
  { name: "EEE",         emoji: "⚡", href: "/learn/engineering/eee"         },
  { name: "Mechanical",  emoji: "⚙️", href: "/learn/engineering/mechanical"  },
  { name: "Civil",       emoji: "🏗️", href: "/learn/engineering/civil"      },
  { name: "Chemical",    emoji: "🧪", href: "/learn/engineering/chemical"    },
  { name: "AI & ML",     emoji: "🤖", href: "/learn/engineering/ai-ml"      },
  { name: "Data Science",emoji: "📊", href: "/learn/engineering/data-science"},
  { name: "IT",          emoji: "🌐", href: "/learn/engineering/it"          },
];

/* ─── Programming Languages ──────────────────────────────────────────────── */
const languages = [
  { name: "Python",     emoji: "🐍", days: 45, href: "/learn/programming/python"     },
  { name: "Java",       emoji: "☕", days: 45, href: "/learn/programming/java"       },
  { name: "C++",        emoji: "➕", days: 30, href: "/learn/programming/cpp"        },
  { name: "JavaScript", emoji: "🌐", days: 30, href: "/learn/programming/javascript" },
  { name: "C",          emoji: "©️", days: 30, href: "/learn/programming/c"          },
  { name: "TypeScript", emoji: "📘", days: 25, href: "/learn/programming/typescript" },
  { name: "Rust",       emoji: "🦀", days: 40, href: "/learn/programming/rust"       },
  { name: "Go",         emoji: "🔵", days: 30, href: "/learn/programming/go"         },
];

/* ─── Learn Hub Component ────────────────────────────────────────────────── */
export function LearnHubPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="py-12 md:py-20">
      <div className="container px-4 md:px-6 space-y-16">

        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className="text-center">
          <Badge variant="outline" className="mb-4 text-brand-500 border-brand-500/30">
            Learning Hub
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            What Do You Want to{" "}
            <span className="text-gradient">Learn Today?</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            From Class 9 to your first job — choose your path and start learning with structured plans, simulations, and AI tutoring.
          </p>

          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text" placeholder="Search subjects, topics, languages..."
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border bg-background pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring shadow-sm"
            />
          </div>
        </div>

        {/* ── Class 9-12 ─────────────────────────────────────────────── */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold">School — Class 9 to 12</h2>
              <p className="text-sm text-muted-foreground">Complete CBSE NCERT curriculum</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {classes.map((cls, i) => (
              <motion.div key={cls.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Link href={cls.href} className="group block">
                  <div className={`rounded-2xl border ${cls.border} bg-gradient-to-br ${cls.bg} p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-200`}>
                    <div className="text-3xl mb-3">{cls.emoji}</div>
                    <h3 className="font-bold text-lg mb-2 group-hover:text-brand-500 transition-colors">{cls.name}</h3>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {cls.subjects.slice(0, 4).map((s) => (
                        <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-background/60 border text-muted-foreground">{s}</span>
                      ))}
                      {cls.subjects.length > 4 && <span className="text-xs text-muted-foreground px-1">+{cls.subjects.length - 4} more</span>}
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{cls.chapters} chapters</span>
                      <span className="flex items-center gap-1 text-brand-500 font-medium group-hover:gap-2 transition-all">
                        Start <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Engineering ────────────────────────────────────────────── */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold">Engineering</h2>
              <p className="text-sm text-muted-foreground">9 branches × 8 semesters</p>
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3">
            {engineeringBranches.map((branch, i) => (
              <motion.div key={branch.name} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Link href={branch.href} className="group flex flex-col items-center gap-2 rounded-xl border bg-background p-3 hover:shadow-md hover:-translate-y-0.5 transition-all text-center">
                  <span className="text-2xl">{branch.emoji}</span>
                  <span className="text-xs font-medium group-hover:text-brand-500 transition-colors">{branch.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Programming Languages ───────────────────────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-500">
                <Code2 className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold">Programming Languages</h2>
                <p className="text-sm text-muted-foreground">14 languages with N-day structured plans</p>
              </div>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/learn/programming">View All</Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {languages.map((lang, i) => (
              <Link key={lang.name} href={lang.href}
                className="group flex flex-col items-center gap-2 rounded-xl border bg-background p-4 hover:shadow-md hover:-translate-y-0.5 transition-all text-center">
                <span className="text-2xl">{lang.emoji}</span>
                <span className="text-xs font-bold group-hover:text-brand-500 transition-colors">{lang.name}</span>
                <span className="text-xs text-muted-foreground">{lang.days}d plan</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Core CS ─────────────────────────────────────────────────── */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-500">
              <Brain className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold">Core CS Subjects</h2>
              <p className="text-sm text-muted-foreground">SDE interview essentials</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: "DSA",           days: 60, emoji: "🌳", href: "/learn/core-cs/dsa"           },
              { name: "System Design", days: 25, emoji: "⚙️", href: "/learn/core-cs/system-design" },
              { name: "Web Dev",       days: 30, emoji: "🌐", href: "/learn/core-cs/web-dev"       },
              { name: "DBMS",          days: 20, emoji: "🗄️", href: "/learn/core-cs/dbms"         },
              { name: "OS",            days: 20, emoji: "💻", href: "/learn/core-cs/os"            },
              { name: "Comp. Networks",days: 20, emoji: "🔗", href: "/learn/core-cs/cn"            },
              { name: "Git & GitHub",  days: 10, emoji: "📦", href: "/learn/core-cs/git"           },
              { name: "Comp. Prog.",   days: 60, emoji: "🏆", href: "/learn/core-cs/cp"            },
              { name: "Interview Prep",days: 30, emoji: "🎯", href: "/learn/core-cs/interview"     },
            ].map((sub) => (
              <Link key={sub.name} href={sub.href}
                className="group flex items-center gap-3 rounded-xl border bg-background p-4 hover:shadow-md hover:border-brand-500/30 transition-all duration-200">
                <span className="text-xl">{sub.emoji}</span>
                <div>
                  <p className="text-sm font-semibold group-hover:text-brand-500 transition-colors">{sub.name}</p>
                  <p className="text-xs text-muted-foreground">{sub.days} days</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
