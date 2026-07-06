/**
 * @file app/(platform)/learn/class-10/page.tsx
 * @description CBSE Class 10 subjects hub page
 * Route: /learn/class-10
 *
 * Shows all CBSE Class 10 subjects with:
 *  - Chapter count + progress indicators
 *  - Board exam tips specific to Class 10
 *  - Links to subject detail pages (chapter-level)
 *  - Quick access to PYQ and mock tests
 *
 * Platform layout (Navbar) is provided by (platform)/layout.tsx.
 */

"use client"; // Client component — animated cards, hover effects

import React from "react";                               // React core
import Link from "next/link";                            // Navigation
import { motion } from "framer-motion";                  // Animations
import {
  Calculator, FlaskConical, Leaf, Globe, Languages,
  BookOpen, Music, Palette, Clock, Star, ArrowRight,
  Target, Zap, Trophy, ChevronRight, Brain,
} from "lucide-react";                                   // Icons
import { Badge }  from "@/components/ui/badge";          // Label badge
import { Button } from "@/components/ui/button";         // CTA button
import { Progress } from "@/components/ui/progress";     // Chapter progress

/* ─── Class 10 Subjects ───────────────────────────────────────────────────── */
/**
 * SUBJECTS
 * All CBSE Class 10 subjects with chapter counts, colors, and board exam weight.
 */
const SUBJECTS = [
  {
    slug:        "mathematics",
    title:       "Mathematics",
    emoji:       "📐",
    icon:        Calculator,
    chapters:    15,
    color:       "from-blue-500 to-cyan-500",
    bg:          "bg-blue-500/10 text-blue-500",
    boardWeight: "High",
    keyTopics:   ["Real Numbers", "Polynomials", "Triangles", "Trigonometry", "Probability", "Statistics"],
    progress:    0, // Will be replaced with real DB data when MongoDB is wired
  },
  {
    slug:        "science",
    title:       "Science",
    emoji:       "🔬",
    icon:        FlaskConical,
    chapters:    16,
    color:       "from-green-500 to-teal-500",
    bg:          "bg-green-500/10 text-green-500",
    boardWeight: "High",
    keyTopics:   ["Chemical Reactions", "Life Processes", "Electricity", "Light", "Heredity & Evolution"],
    progress:    0,
  },
  {
    slug:        "social-science",
    title:       "Social Science",
    emoji:       "🌍",
    icon:        Globe,
    chapters:    27,
    color:       "from-orange-500 to-amber-500",
    bg:          "bg-orange-500/10 text-orange-500",
    boardWeight: "High",
    keyTopics:   ["Nationalism in India", "Resources", "Democratic Politics", "Money & Credit"],
    progress:    0,
  },
  {
    slug:        "english",
    title:       "English (First Flight)",
    emoji:       "📖",
    icon:        BookOpen,
    chapters:    20,
    color:       "from-violet-500 to-purple-600",
    bg:          "bg-violet-500/10 text-violet-500",
    boardWeight: "Medium",
    keyTopics:   ["First Flight", "Footprints Without Feet", "Grammar", "Writing Skills"],
    progress:    0,
  },
  {
    slug:        "hindi",
    title:       "Hindi (Course A/B)",
    emoji:       "📜",
    icon:        Languages,
    chapters:    18,
    color:       "from-pink-500 to-rose-500",
    bg:          "bg-pink-500/10 text-pink-500",
    boardWeight: "Medium",
    keyTopics:   ["Kshitij", "Sparsh", "Kritika", "Sanchayan", "Vyakaran"],
    progress:    0,
  },
  {
    slug:        "it",
    title:       "Information Technology (IT)",
    emoji:       "💻",
    icon:        Target,
    chapters:    8,
    color:       "from-slate-500 to-gray-600",
    bg:          "bg-slate-500/10 text-slate-500",
    boardWeight: "Medium",
    keyTopics:   ["Digital Documentation", "Electronic Spreadsheet", "DBMS", "Web Applications"],
    progress:    0,
  },
] as const;

/** Board exam tips specific to Class 10 */
const BOARD_TIPS = [
  { tip: "Maths: Always show full working — partial marks apply in CBSE.",          emoji: "📐" },
  { tip: "Science: Diagrams earn marks — label every part of Biology diagrams.",    emoji: "🔬" },
  { tip: "SST: Write in points with subheadings — easier to check and score.",     emoji: "🌍" },
  { tip: "English Grammar: Practice 3 essays and 5 letter formats — they repeat.", emoji: "📖" },
  { tip: "Revise NCERT exemplar questions — they often appear verbatim in boards.", emoji: "⭐" },
];

/** Quick links for Class 10 */
const QUICK_LINKS = [
  { label: "Class 10 Mock Tests",  href: "/practice/mock",  emoji: "📋" },
  { label: "PYQ Bank (2010–2024)", href: "/practice/pyq",   emoji: "📚" },
  { label: "Science Simulations",  href: "/simulations",    emoji: "🔬" },
  { label: "Practice Questions",   href: "/practice/quiz",  emoji: "🧠" },
];

/* ─── Page Component ─────────────────────────────────────────────────────── */
export default function Class10Page() {
  return (
    <div className="min-h-screen pb-20">

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="border-b bg-gradient-to-b from-blue-950/5 to-background py-14 md:py-18">
        <div className="container px-4 md:px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-5">
            <Link href="/dashboard" className="hover:text-foreground">Dashboard</Link>
            <span>/</span>
            <Link href="/learn" className="hover:text-foreground">CBSE Classes</Link>
            <span>/</span>
            <span className="text-foreground font-medium">Class 10</span>
          </nav>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary">CBSE Class 10</Badge>
                <Badge variant="outline" className="text-blue-600 border-blue-400/40">Board Prep 2026</Badge>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
                🎯 CBSE Class 10 — Complete Study Hub
              </h1>
              <p className="text-muted-foreground text-lg mb-6 max-w-xl">
                NCERT-aligned study material for all Class 10 subjects.
                Chapter-wise notes, practice questions, CBSE PYQs, and board exam strategies.
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                <span className="flex items-center gap-1.5"><BookOpen className="h-4 w-4" /> 6 Subjects</span>
                <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> 104 Chapters</span>
                <span className="flex items-center gap-1.5"><Star className="h-4 w-4 fill-yellow-500 text-yellow-500" /> NCERT Aligned</span>
                <span className="flex items-center gap-1.5"><Trophy className="h-4 w-4 text-yellow-500" /> Board Exam Ready</span>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button variant="gradient" size="lg" asChild>
                  <Link href="/learn/class-10/mathematics">
                    <Zap className="h-4 w-4" /> Start Maths
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/practice/mock">Mock Tests</Link>
                </Button>
              </div>
            </div>

            {/* Quick links sidebar */}
            <div className="w-full md:w-64 rounded-2xl border bg-card p-5">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Brain className="h-4 w-4 text-brand-500" /> Quick Access
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SUBJECTS.map((subject, i) => (
              <motion.div
                key={subject.slug}
                initial={{ opacity: 0.01, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.45 }}
              >
                <Link href={`/learn/class-10/${subject.slug}`} className="group block h-full">
                  <div className="h-full rounded-2xl border bg-card overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    {/* Gradient stripe */}
                    <div className={`h-1.5 w-full bg-gradient-to-r ${subject.color}`} />
                    <div className="p-5 flex flex-col gap-3">
                      {/* Icon + title */}
                      <div className="flex items-start justify-between">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${subject.bg} text-2xl`}>
                          {subject.emoji}
                        </div>
                        <Badge variant="outline" className={`text-xs ${
                          subject.boardWeight === "High" ? "text-red-600 border-red-400/40" : "text-yellow-600 border-yellow-400/40"
                        }`}>
                          {subject.boardWeight} weight
                        </Badge>
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

                      {/* Progress bar (0% in demo mode) */}
                      <div>
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                          <span>Progress</span>
                          <span>{subject.progress}%</span>
                        </div>
                        <Progress value={subject.progress} className="h-1.5" />
                      </div>

                      {/* CTA */}
                      <div className="flex items-center gap-1 text-xs font-semibold text-brand-500 group-hover:gap-2 transition-all">
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
            <Trophy className="h-5 w-5 text-yellow-500" /> Class 10 Board Exam Tips
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BOARD_TIPS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.01, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex items-start gap-3 rounded-xl border bg-card p-4"
              >
                <span className="text-xl shrink-0">{item.emoji}</span>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.tip}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
