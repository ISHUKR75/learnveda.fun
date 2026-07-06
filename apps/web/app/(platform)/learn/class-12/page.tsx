/**
 * @file app/(platform)/learn/class-12/page.tsx
 * @description CBSE Class 12 subjects hub — board exam + JEE/NEET preparation
 * Route: /learn/class-12
 *
 * The most critical year for Indian students — board exams + entrance exam overlap.
 * Shows all subjects with board exam weight, JEE/NEET relevance, and chapter counts.
 * Links to subject detail pages.
 *
 * Platform layout (Navbar) is provided by (platform)/layout.tsx.
 */

"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Atom, FlaskConical, Calculator, BookOpen, Languages,
  Globe, Code2, ArrowRight, Clock, Star, Brain, Trophy,
  Zap, ChevronRight, Target,
} from "lucide-react";
import { Badge }    from "@/components/ui/badge";
import { Button }   from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

/* ─── Class 12 Subjects ───────────────────────────────────────────────────── */
/**
 * SUBJECTS
 * All CBSE Class 12 subjects with chapter counts, exam relevance, and key topics.
 */
const SUBJECTS = [
  {
    slug:       "physics",
    title:      "Physics",
    emoji:      "⚡",
    chapters:   15,
    color:      "from-purple-500 to-violet-600",
    bg:         "bg-purple-500/10 text-purple-500",
    boardWeight:"High",
    jeeNeet:    "JEE + NEET",
    keyTopics:  ["Electric Charges", "Magnetism", "Optics", "Dual Nature", "Semiconductors", "Communication Systems"],
    progress:   0,
  },
  {
    slug:       "chemistry",
    title:      "Chemistry",
    emoji:      "🧪",
    chapters:   16,
    color:      "from-orange-500 to-amber-500",
    bg:         "bg-orange-500/10 text-orange-500",
    boardWeight:"High",
    jeeNeet:    "JEE + NEET",
    keyTopics:  ["Solid State", "Electrochemistry", "Chemical Kinetics", "Amines", "Biomolecules", "Polymers"],
    progress:   0,
  },
  {
    slug:       "mathematics",
    title:      "Mathematics",
    emoji:      "📐",
    chapters:   13,
    color:      "from-blue-500 to-cyan-500",
    bg:         "bg-blue-500/10 text-blue-500",
    boardWeight:"High",
    jeeNeet:    "JEE",
    keyTopics:  ["Relations & Functions", "Integrals", "Differential Equations", "3D Geometry", "Linear Programming", "Probability"],
    progress:   0,
  },
  {
    slug:       "biology",
    title:      "Biology",
    emoji:      "🌱",
    chapters:   16,
    color:      "from-green-500 to-teal-500",
    bg:         "bg-green-500/10 text-green-500",
    boardWeight:"High",
    jeeNeet:    "NEET",
    keyTopics:  ["Reproduction", "Genetics & Evolution", "Biology in Human Welfare", "Biotechnology", "Ecology"],
    progress:   0,
  },
  {
    slug:       "computer-science",
    title:      "Computer Science",
    emoji:      "💻",
    chapters:   11,
    color:      "from-slate-500 to-gray-600",
    bg:         "bg-slate-500/10 text-slate-500",
    boardWeight:"Medium",
    jeeNeet:    "—",
    keyTopics:  ["Python Data Structures", "OOP Concepts", "File Handling", "SQL", "Networking", "Cybersecurity"],
    progress:   0,
  },
  {
    slug:       "english",
    title:      "English (Flamingo + Vistas)",
    emoji:      "📖",
    chapters:   14,
    color:      "from-violet-500 to-purple-600",
    bg:         "bg-violet-500/10 text-violet-500",
    boardWeight:"Medium",
    jeeNeet:    "—",
    keyTopics:  ["Flamingo Prose", "Flamingo Poetry", "Vistas", "Writing Skills", "Grammar"],
    progress:   0,
  },
  {
    slug:       "economics",
    title:      "Economics",
    emoji:      "📊",
    chapters:   12,
    color:      "from-emerald-500 to-green-600",
    bg:         "bg-emerald-500/10 text-emerald-500",
    boardWeight:"High",
    jeeNeet:    "CUET",
    keyTopics:  ["Macro Economics", "National Income", "Money & Banking", "Balance of Payments", "Government Budget"],
    progress:   0,
  },
  {
    slug:       "accountancy",
    title:      "Accountancy",
    emoji:      "📒",
    chapters:   9,
    color:      "from-teal-500 to-cyan-600",
    bg:         "bg-teal-500/10 text-teal-500",
    boardWeight:"High",
    jeeNeet:    "CA",
    keyTopics:  ["Partnership Accounts", "Company Accounts", "Cash Flow Statement", "Financial Analysis"],
    progress:   0,
  },
] as const;

/** Class 12 board exam preparation tips */
const BOARD_TIPS = [
  { emoji: "📝", tip: "Physics: NCERT examples are directly asked — solve every one of them." },
  { emoji: "🧪", tip: "Chemistry: Organic reactions — make a flowchart of all named reactions." },
  { emoji: "📐", tip: "Maths: Integration is 35 marks — master every standard integral form." },
  { emoji: "🌱", tip: "Biology: Draw and label every diagram — they carry dedicated marks." },
  { emoji: "💡", tip: "Computer Science: Program questions come from NCERT solutions exactly." },
  { emoji: "⏰", tip: "Time management: Don't spend >12 min on any one question in exams." },
];

/** Quick links for Class 12 */
const QUICK_LINKS = [
  { label: "Class 12 Mock Tests",      href: "/practice/mock-test", emoji: "📋" },
  { label: "PYQ Bank (2015–2024)",     href: "/practice/pyqs",      emoji: "📚" },
  { label: "Physics Simulations",      href: "/simulations",        emoji: "⚡" },
  { label: "JEE Practice",            href: "/practice/quiz",      emoji: "🏆" },
];

/* ─── Page Component ─────────────────────────────────────────────────────── */
export default function Class12Page() {
  return (
    <div className="min-h-screen pb-20">

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="border-b bg-gradient-to-b from-violet-950/5 to-background py-14 md:py-18">
        <div className="container px-4 md:px-6">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-5">
            <Link href="/dashboard" className="hover:text-foreground">Dashboard</Link>
            <span>/</span>
            <Link href="/learn" className="hover:text-foreground">CBSE Classes</Link>
            <span>/</span>
            <span className="text-foreground font-medium">Class 12</span>
          </nav>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary">CBSE Class 12</Badge>
                <Badge variant="outline" className="text-violet-600 border-violet-400/40">Board 2026</Badge>
                <Badge variant="outline" className="text-orange-600 border-orange-400/40">JEE · NEET · CUET</Badge>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
                🎯 CBSE Class 12 — Complete Study Hub
              </h1>
              <p className="text-muted-foreground text-lg mb-6 max-w-xl">
                The most important year of your school life. NCERT-aligned study material
                for board exams + entrance exam preparation (JEE, NEET, CUET).
                Chapter-wise notes, PYQs, mock tests, and AI-powered doubt solving.
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                <span className="flex items-center gap-1.5"><BookOpen className="h-4 w-4" /> 8 Subjects</span>
                <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> 106 Chapters</span>
                <span className="flex items-center gap-1.5"><Star className="h-4 w-4 fill-yellow-500 text-yellow-500" /> NCERT Aligned</span>
                <span className="flex items-center gap-1.5"><Trophy className="h-4 w-4 text-yellow-500" /> Board + JEE/NEET Ready</span>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button variant="gradient" size="lg" asChild>
                  <Link href="/learn/class-12/physics">
                    <Zap className="h-4 w-4" /> Start Physics
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/practice/mock-test">Mock Tests</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/ai-tutor">Ask AI Tutor</Link>
                </Button>
              </div>
            </div>

            {/* Quick links sidebar */}
            <div className="w-full md:w-64 rounded-2xl border bg-card p-5">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Target className="h-4 w-4 text-brand-500" /> Quick Access
              </h3>
              <div className="flex flex-col gap-2">
                {QUICK_LINKS.map((link) => (
                  <Link key={link.href} href={link.href}
                    className="flex items-center gap-2 rounded-lg p-2 hover:bg-muted transition-colors text-sm">
                    <span>{link.emoji}</span>
                    <span className="flex-1">{link.label}</span>
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Subject Cards ─────────────────────────────────────────── */}
      <section className="py-12">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold tracking-tight mb-8">All Subjects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {SUBJECTS.map((subject, i) => (
              <motion.div
                key={subject.slug}
                initial={{ opacity: 0.01, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
              >
                <Link href={`/learn/class-12/${subject.slug}`} className="group block h-full">
                  <div className="h-full rounded-2xl border bg-card overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className={`h-1.5 w-full bg-gradient-to-r ${subject.color}`} />
                    <div className="p-5 flex flex-col gap-3">
                      {/* Icon + badges */}
                      <div className="flex items-start justify-between">
                        <span className="text-3xl">{subject.emoji}</span>
                        <div className="flex flex-col gap-1 items-end">
                          <Badge variant="outline" className={`text-xs ${subject.boardWeight === "High" ? "text-red-600 border-red-400/40" : "text-yellow-600 border-yellow-400/40"}`}>
                            {subject.boardWeight} weight
                          </Badge>
                          {subject.jeeNeet !== "—" && (
                            <Badge variant="outline" className="text-xs text-brand-500 border-brand-400/40">{subject.jeeNeet}</Badge>
                          )}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-bold group-hover:text-brand-500 transition-colors">{subject.title}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">{subject.chapters} Chapters · NCERT</p>
                      </div>

                      {/* Key topics */}
                      <div className="flex flex-wrap gap-1">
                        {subject.keyTopics.slice(0, 3).map((topic) => (
                          <span key={topic} className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">{topic}</span>
                        ))}
                        {subject.keyTopics.length > 3 && (
                          <span className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">+{subject.keyTopics.length - 3}</span>
                        )}
                      </div>

                      {/* Progress bar */}
                      <div>
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                          <span>Progress</span>
                          <span>{subject.progress}%</span>
                        </div>
                        <Progress value={subject.progress} className="h-1.5" />
                      </div>

                      <div className="flex items-center gap-1 text-xs font-semibold text-brand-500 group-hover:gap-2 transition-all mt-auto">
                        Start Chapter 1 <ArrowRight className="h-3 w-3" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Board Exam Tips ────────────────────────────────────────── */}
      <section className="py-10 bg-muted/30">
        <div className="container px-4 md:px-6">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" /> Class 12 Board Exam Tips
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BOARD_TIPS.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0.01, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="flex items-start gap-3 rounded-xl border bg-card p-4">
                <span className="text-xl shrink-0">{item.emoji}</span>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.tip}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── JEE/NEET crossover note ────────────────────────────────── */}
      <section className="py-10">
        <div className="container px-4 md:px-6">
          <div className="rounded-2xl border bg-gradient-to-r from-orange-500/5 to-red-500/5 border-orange-500/20 p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">📢 Class 12 + JEE/NEET Overlap</h3>
                <p className="text-muted-foreground">
                  ~70% of Class 12 Physics, Chemistry, and Maths/Bio content overlaps with JEE/NEET syllabus.
                  Preparing well for boards means you're already halfway ready for entrance exams.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                <Button variant="gradient" asChild>
                  <Link href="/practice/mock-test">JEE Mock Tests</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/practice/pyqs">PYQ Bank</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
