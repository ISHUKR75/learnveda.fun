/**
 * @file features/practice/components/PracticeHub.tsx
 * @description Practice hub — MCQ practice, daily challenges, PYQs, coding playground
 *
 * Sections:
 *  1. Daily challenge card (auto-refreshes daily)
 *  2. Practice modes: Quick MCQ / Full Test / PYQ / Coding
 *  3. Subject-wise practice picker
 *  4. Your practice stats (accuracy, streak, problems solved)
 *  5. Recent practice sessions
 *
 * Used in: app/(marketing)/practice/page.tsx
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Zap, Clock, Target, BookOpen, Code2, Trophy,
  ArrowRight, Star, CheckCircle2, Play, Calendar,
  Flame, TrendingUp, ChevronRight, BarChart3,
} from "lucide-react";
import { Badge }  from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* ─── Practice Modes ─────────────────────────────────────────────────────── */
const PRACTICE_MODES = [
  {
    id:    "quick-mcq",
    title: "Quick MCQ",
    desc:  "10 questions · 10 minutes · Any subject",
    emoji: "⚡",
    color: "from-blue-500 to-cyan-500",
    bg:    "bg-blue-500/10",
    border:"border-blue-500/20",
    href:  "/practice/quick",
    xp:    20,
  },
  {
    id:    "full-test",
    title: "Full Mock Test",
    desc:  "Board simulation · 3 hours · All subjects",
    emoji: "📋",
    color: "from-purple-500 to-violet-500",
    bg:    "bg-purple-500/10",
    border:"border-purple-500/20",
    href:  "/test-center",
    xp:    200,
  },
  {
    id:    "pyq",
    title: "Previous Year Papers",
    desc:  "2015–2025 board papers with solutions",
    emoji: "📜",
    color: "from-orange-500 to-amber-500",
    bg:    "bg-orange-500/10",
    border:"border-orange-500/20",
    href:  "/practice/pyq",
    xp:    50,
  },
  {
    id:    "coding",
    title: "Coding Playground",
    desc:  "Write and run code — Python, Java, C++, JS",
    emoji: "💻",
    color: "from-green-500 to-teal-500",
    bg:    "bg-green-500/10",
    border:"border-green-500/20",
    href:  "/compiler",
    xp:    30,
  },
];

/* ─── Subject practice options ───────────────────────────────────────────── */
const SUBJECTS = [
  { id:"maths",   emoji:"📐", label:"Mathematics",  levels:["Class 9","Class 10","Class 11","Class 12"],  href:"/practice/subject/mathematics" },
  { id:"physics", emoji:"⚛️", label:"Physics",      levels:["Class 9","Class 10","Class 11","Class 12"],  href:"/practice/subject/physics"     },
  { id:"chem",    emoji:"🧪", label:"Chemistry",    levels:["Class 9","Class 10","Class 11","Class 12"],  href:"/practice/subject/chemistry"   },
  { id:"bio",     emoji:"🌿", label:"Biology",      levels:["Class 9","Class 10","Class 11","Class 12"],  href:"/practice/subject/biology"     },
  { id:"cs",      emoji:"💻", label:"Computer Sci", levels:["Class 9","Class 10","Class 12"],              href:"/practice/subject/cs"          },
  { id:"sst",     emoji:"🌍", label:"Social Sci",   levels:["Class 9","Class 10"],                        href:"/practice/subject/social"      },
  { id:"dsa",     emoji:"🌳", label:"DSA",          levels:["Engineering","Placement"],                   href:"/practice/subject/dsa"         },
  { id:"python",  emoji:"🐍", label:"Python",       levels:["Beginner","Intermediate"],                   href:"/practice/subject/python"      },
];

/* ─── Demo practice stats ─────────────────────────────────────────────────── */
const DEMO_STATS = [
  { icon: Target,    label:"Accuracy",       value:"78%",   color:"text-green-500"  },
  { icon: Star,      label:"Problems Solved",value:"342",   color:"text-yellow-500" },
  { icon: Flame,     label:"Practice Streak",value:"5 days",color:"text-orange-500" },
  { icon: TrendingUp,label:"This Week",      value:"+47 Q", color:"text-brand-500"  },
];

/* ─── Daily challenge ─────────────────────────────────────────────────────── */
const DAILY_CHALLENGE = {
  subject:   "Mathematics",
  class:     "Class 10",
  question:  "If α and β are the zeroes of x² - 5x + 6, find the value of α² + β².",
  options:   ["13", "25", "17", "19"],
  answer:    0, // Index of correct option (13)
  xp:        30,
  hint:      "Use α² + β² = (α + β)² - 2αβ. Find α + β and αβ from the polynomial.",
};

/* ─── PracticeHub Component ──────────────────────────────────────────────── */
export function PracticeHub() {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showAnswer,     setShowAnswer]     = useState(false);
  const [showHint,       setShowHint]       = useState(false);

  return (
    <div className="py-12">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">

        {/* ── Page header ─────────────────────────────────────────── */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-foreground mb-3">Practice Hub</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            10,000+ MCQs, previous year papers, daily challenges, and a live coding playground.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">

            {/* ── Practice Modes ──────────────────────────────────── */}
            <section>
              <h2 className="text-lg font-bold text-foreground mb-4">Choose Practice Mode</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {PRACTICE_MODES.map((mode, i) => (
                  <motion.div
                    key={mode.id}
                    initial={{ opacity: 0.01, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.08 }}
                  >
                    <Link href={mode.href}>
                      <div className={`rounded-2xl border ${mode.border} ${mode.bg} p-5 hover:shadow-md transition-all group cursor-pointer`}>
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">{mode.emoji}</span>
                          <div className="flex-1">
                            <p className="font-semibold text-foreground group-hover:text-brand-500 transition-colors">{mode.title}</p>
                            <p className="text-sm text-muted-foreground mt-0.5">{mode.desc}</p>
                          </div>
                          <Badge variant="outline" className="text-xs border-yellow-500/40 text-yellow-600 flex-shrink-0 gap-1">
                            <Star className="h-2.5 w-2.5" /> +{mode.xp} XP
                          </Badge>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* ── Daily Challenge ──────────────────────────────────── */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-brand-500" />
                <h2 className="text-lg font-bold text-foreground">Daily Challenge</h2>
                <Badge variant="outline" className="text-xs gap-1 border-yellow-500/40 text-yellow-600">
                  <Star className="h-2.5 w-2.5" /> +{DAILY_CHALLENGE.xp} XP
                </Badge>
              </div>

              <div className="rounded-2xl border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className="text-xs">{DAILY_CHALLENGE.subject}</Badge>
                  <Badge variant="outline" className="text-xs">{DAILY_CHALLENGE.class}</Badge>
                </div>

                {/* Question */}
                <p className="text-foreground font-medium mb-4">{DAILY_CHALLENGE.question}</p>

                {/* Options */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {DAILY_CHALLENGE.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => { setSelectedOption(i); setShowAnswer(true); }}
                      className={`p-3 rounded-xl border text-sm text-left transition-all ${
                        showAnswer
                          ? i === DAILY_CHALLENGE.answer
                            ? "border-green-500 bg-green-500/10 text-green-700"
                            : i === selectedOption
                              ? "border-red-500 bg-red-500/10 text-red-700"
                              : "border-border text-muted-foreground"
                          : selectedOption === i
                            ? "border-brand-500 bg-brand-500/10 text-brand-600"
                            : "border-border hover:border-brand-500/50"
                      }`}
                    >
                      <span className="font-bold">{["A","B","C","D"][i]}.</span> {opt}
                      {showAnswer && i === DAILY_CHALLENGE.answer && <CheckCircle2 className="inline h-4 w-4 ml-2 text-green-500" />}
                    </button>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  {!showAnswer && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setShowHint(!showHint)}
                      className="gap-1"
                    >
                      💡 {showHint ? "Hide" : "Show"} Hint
                    </Button>
                  )}
                  {showAnswer && (
                    <Button size="sm" variant="outline" onClick={() => { setSelectedOption(null); setShowAnswer(false); setShowHint(false); }}>
                      Next Question →
                    </Button>
                  )}
                </div>

                {/* Hint */}
                {showHint && !showAnswer && (
                  <p className="mt-3 text-sm text-muted-foreground bg-muted p-3 rounded-xl">
                    💡 {DAILY_CHALLENGE.hint}
                  </p>
                )}
              </div>
            </section>

            {/* ── Subject-wise practice ────────────────────────────── */}
            <section>
              <h2 className="text-lg font-bold text-foreground mb-4">Practice by Subject</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {SUBJECTS.map((sub, i) => (
                  <motion.div
                    key={sub.id}
                    initial={{ opacity: 0.01, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <Link href={sub.href}>
                      <div className="rounded-xl border bg-card p-3.5 hover:border-brand-500/40 hover:shadow-sm transition-all group text-center cursor-pointer">
                        <div className="text-xl mb-1">{sub.emoji}</div>
                        <p className="text-xs font-semibold text-foreground group-hover:text-brand-500 transition-colors">{sub.label}</p>
                        <p className="text-xs text-muted-foreground">{sub.levels[0]}{sub.levels.length > 1 ? ` +${sub.levels.length - 1}` : ""}</p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          {/* ── Stats Sidebar ───────────────────────────────────────── */}
          <div className="space-y-4">
            {/* Practice stats */}
            <div className="rounded-2xl border bg-card p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="h-5 w-5 text-brand-500" />
                <h3 className="font-semibold text-foreground">Your Stats</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {DEMO_STATS.map(stat => (
                  <div key={stat.label} className="text-center p-3 bg-muted/50 rounded-xl">
                    <div className={`flex justify-center mb-1 ${stat.color}`}>
                      <stat.icon className="h-4 w-4" />
                    </div>
                    <p className="text-xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div className="rounded-2xl border bg-card p-5 shadow-sm">
              <h3 className="font-semibold text-foreground mb-3">Quick Access</h3>
              <div className="space-y-2">
                {[
                  { label:"Chapter MCQ Bank",       href:"/practice/mcq",    emoji:"📚" },
                  { label:"PYQ 2015–2025",           href:"/practice/pyq",    emoji:"📜" },
                  { label:"Flashcards",             href:"/flashcards",       emoji:"🃏" },
                  { label:"Compiler Playground",    href:"/compiler",         emoji:"💻" },
                  { label:"Live Battle",            href:"/live-battles",     emoji:"⚡" },
                ].map(link => (
                  <Link key={link.label} href={link.href}>
                    <div className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-muted transition-colors text-sm text-muted-foreground hover:text-foreground">
                      <span>{link.emoji}</span> {link.label}
                      <ChevronRight className="h-3.5 w-3.5 ml-auto" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA to premium */}
            <div className="rounded-2xl border bg-brand-500/5 border-brand-500/20 p-5 text-center">
              <Trophy className="h-8 w-8 text-brand-500 mx-auto mb-2" />
              <h3 className="font-semibold text-foreground mb-1">Unlock Full Practice</h3>
              <p className="text-xs text-muted-foreground mb-3">10,000+ MCQs + PYPs + AI analysis</p>
              <Link href="/pricing">
                <Button size="sm" className="w-full gap-1">
                  Go Pro <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
