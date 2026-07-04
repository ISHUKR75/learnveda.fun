/**
 * @file features/home/components/ProgrammingSection.tsx
 * @description Programming languages section for LearnVeda homepage
 * Shows all 14 languages with their day plans, difficulty, and quick-start CTA
 */

"use client"; // Client component for hover animations

import React from "react";                       // React core
import Link from "next/link";                    // Next.js navigation
import { motion } from "framer-motion";          // Animations
import { ArrowRight, Clock } from "lucide-react"; // Icons
import { Badge } from "@/components/ui/badge";   // Badge component

/* ─── Programming Language Data ──────────────────────────────────────────── */
const languages = [
  { id: "c",          name: "C",          days: 30, level: "Beginner",     emoji: "©️",  color: "from-blue-500 to-blue-600"   },
  { id: "cpp",        name: "C++",        days: 30, level: "Intermediate", emoji: "➕", color: "from-blue-600 to-indigo-600" },
  { id: "java",       name: "Java",       days: 45, level: "Intermediate", emoji: "☕", color: "from-orange-500 to-red-500"  },
  { id: "python",     name: "Python",     days: 45, level: "Beginner",     emoji: "🐍", color: "from-yellow-500 to-green-500"},
  { id: "javascript", name: "JavaScript", days: 30, level: "Beginner",     emoji: "🌐", color: "from-yellow-400 to-yellow-600"},
  { id: "typescript", name: "TypeScript", days: 25, level: "Intermediate", emoji: "📘", color: "from-blue-500 to-cyan-500"   },
  { id: "rust",       name: "Rust",       days: 40, level: "Advanced",     emoji: "🦀", color: "from-orange-600 to-red-700"  },
  { id: "go",         name: "Go",         days: 30, level: "Intermediate", emoji: "🔵", color: "from-cyan-500 to-teal-500"   },
  { id: "kotlin",     name: "Kotlin",     days: 30, level: "Intermediate", emoji: "🟣", color: "from-purple-500 to-violet-600"},
  { id: "swift",      name: "Swift",      days: 30, level: "Intermediate", emoji: "🐦", color: "from-orange-500 to-pink-500" },
  { id: "sql",        name: "SQL",        days: 20, level: "Beginner",     emoji: "🗄️", color: "from-teal-500 to-cyan-600"   },
  { id: "dart",       name: "Dart",       days: 25, level: "Beginner",     emoji: "🎯", color: "from-cyan-400 to-blue-500"   },
  { id: "ruby",       name: "Ruby",       days: 25, level: "Beginner",     emoji: "💎", color: "from-red-500 to-pink-500"    },
];

/* ─── Level badge variants ───────────────────────────────────────────────── */
const levelVariant = {
  Beginner:     "success",
  Intermediate: "warning",
  Advanced:     "destructive",
} as const;

/* ─── Programming Section Component ──────────────────────────────────────── */
export function ProgrammingSection() {
  return (
    <section className="py-20 md:py-32 bg-muted/20" aria-label="Programming languages">
      <div className="container px-4 md:px-6">
        {/* ── Section Header ─────────────────────────────────────────── */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 text-brand-500 border-brand-500/30">
            Programming
          </Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Master{" "}
            <span className="text-gradient">Any Language</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Structured N-day plans from first principles to project-level confidence — with daily lessons, coding exercises, and projects.
          </p>
        </div>

        {/* ── Language Cards Grid ────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {languages.map((lang, index) => (
            <motion.div
              key={lang.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.3, delay: index * 0.04 }}
            >
              <Link
                href={`/learn/programming/${lang.id}`}
                className="group flex flex-col items-center gap-3 rounded-xl border bg-background p-4 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
              >
                {/* Language emoji in gradient circle */}
                <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${lang.color} text-2xl shadow-sm`}>
                  {lang.emoji}
                </div>

                {/* Language name */}
                <h3 className="font-bold text-sm group-hover:text-brand-500 transition-colors">
                  {lang.name}
                </h3>

                {/* Days plan */}
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {lang.days}-Day Plan
                </div>

                {/* Difficulty badge */}
                <Badge variant={levelVariant[lang.level] as any} className="text-xs">
                  {lang.level}
                </Badge>

                {/* Start CTA on hover */}
                <div className="flex items-center gap-1 text-xs font-medium text-brand-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  Start <ArrowRight className="h-3 w-3" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* ── Core CS Subjects sub-section ──────────────────────────── */}
        <div className="mt-16">
          <h3 className="text-xl font-bold text-center mb-8">
            + Core CS Subjects for Every SDE
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: "DSA",         days: 60, emoji: "🌳" },
              { name: "Web Dev",     days: 30, emoji: "🌐" },
              { name: "System Design", days: 25, emoji: "⚙️" },
              { name: "DBMS",        days: 20, emoji: "🗄️" },
              { name: "OS",          days: 20, emoji: "💻" },
              { name: "Comp. Networks", days: 20, emoji: "🔗" },
              { name: "Git & GitHub",   days: 10, emoji: "📦" },
              { name: "Comp. Prog.",    days: 60, emoji: "🏆" },
              { name: "Interview Prep", days: 30, emoji: "🎯" },
            ].map((subject) => (
              <Link
                key={subject.name}
                href={`/learn/core-cs/${subject.name.toLowerCase().replace(/ &/g, "").replace(/ /g, "-")}`}
                className="group flex items-center gap-3 rounded-xl border bg-background p-3 hover:shadow-md hover:border-brand-500/30 transition-all duration-200"
              >
                <span className="text-xl">{subject.emoji}</span>
                <div>
                  <p className="text-sm font-semibold group-hover:text-brand-500 transition-colors">{subject.name}</p>
                  <p className="text-xs text-muted-foreground">{subject.days} days</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
