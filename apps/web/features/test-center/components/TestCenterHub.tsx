/**
 * @file features/test-center/components/TestCenterHub.tsx
 * @description Main Test Center hub page for LearnVeda
 * @purpose Entry point for all exam prep: JEE, NEET, CBSE, GATE, company tests
 * @used-by app/(platform)/test-center/page.tsx
 *
 * Sections:
 *  1. Hero header with active test count
 *  2. Exam category grid (JEE, NEET, CBSE, GATE, Programming, Company)
 *  3. Quick practice: start a 10-question mock instantly
 *  4. Recent test history for logged-in users
 *  5. Upcoming scheduled tests
 */

"use client"; // Client component — tab switching and timer interactions

import React, { useState }    from "react";          // React + state
import { motion }             from "framer-motion";  // Section animations
import Link                   from "next/link";       // Navigation
import {
  BookOpen, Zap, Clock, Target, Trophy, ChevronRight,
  Brain, Code2, Beaker, Calculator, Globe, Building2,
  BarChart2, Play, CheckCircle2, Star,
} from "lucide-react";                               // Icons
import { Badge }  from "@/components/ui/badge";      // Badge component
import { Button } from "@/components/ui/button";     // Button component
import { cn }     from "@/lib/utils";               // Class merger

/* ─── Exam Category Definitions ─────────────────────────────────────────── */
const EXAM_CATEGORIES = [
  {
    id:          "cbse",
    label:       "CBSE Board",
    description: "Class 9–12 NCERT-aligned chapter tests and full mock papers",
    icon:        BookOpen,
    color:       "from-blue-500 to-cyan-500",
    bg:          "bg-blue-500/10",
    border:      "border-blue-500/20",
    text:        "text-blue-600 dark:text-blue-400",
    testsCount:  240,                               // Total tests in this category
    href:        "/test-center/cbse",
    badges:      ["Class 9", "Class 10", "Class 11", "Class 12"],
    isPopular:   true,
  },
  {
    id:          "jee",
    label:       "JEE Main & Advanced",
    description: "Full mock tests, chapter-wise, previous year papers (2015–2025)",
    icon:        Calculator,
    color:       "from-orange-500 to-red-500",
    bg:          "bg-orange-500/10",
    border:      "border-orange-500/20",
    text:        "text-orange-600 dark:text-orange-400",
    testsCount:  180,
    href:        "/test-center/jee",
    badges:      ["Physics", "Chemistry", "Mathematics"],
    isPopular:   true,
  },
  {
    id:          "neet",
    label:       "NEET UG",
    description: "Biology, Physics, Chemistry mock tests with NEET pattern questions",
    icon:        Beaker,
    color:       "from-green-500 to-emerald-500",
    bg:          "bg-green-500/10",
    border:      "border-green-500/20",
    text:        "text-green-600 dark:text-green-400",
    testsCount:  120,
    href:        "/test-center/neet",
    badges:      ["Biology", "Physics", "Chemistry"],
    isPopular:   false,
  },
  {
    id:          "gate",
    label:       "GATE CS / EC",
    description: "Computer Science and Electronics GATE preparation tests",
    icon:        Brain,
    color:       "from-purple-500 to-violet-500",
    bg:          "bg-purple-500/10",
    border:      "border-purple-500/20",
    text:        "text-purple-600 dark:text-purple-400",
    testsCount:  90,
    href:        "/test-center/gate",
    badges:      ["CSE", "ECE", "Mathematics"],
    isPopular:   false,
  },
  {
    id:          "programming",
    label:       "Programming Tests",
    description: "Language-specific MCQ tests: Python, Java, C++, DSA, SQL and more",
    icon:        Code2,
    color:       "from-cyan-500 to-blue-500",
    bg:          "bg-cyan-500/10",
    border:      "border-cyan-500/20",
    text:        "text-cyan-600 dark:text-cyan-400",
    testsCount:  200,
    href:        "/test-center/programming",
    badges:      ["Python", "Java", "DSA", "SQL"],
    isPopular:   false,
  },
  {
    id:          "company",
    label:       "Company Tests",
    description: "Aptitude + coding tests modelled on TCS, Infosys, Wipro, Google, Microsoft",
    icon:        Building2,
    color:       "from-rose-500 to-pink-500",
    bg:          "bg-rose-500/10",
    border:      "border-rose-500/20",
    text:        "text-rose-600 dark:text-rose-400",
    testsCount:  80,
    href:        "/test-center/company-tests",
    badges:      ["TCS", "Infosys", "Google", "Amazon"],
    isPopular:   false,
  },
] as const;

/* ─── Quick Practice Modes ───────────────────────────────────────────────── */
const QUICK_MODES = [
  { id: "quick-10",   label: "Quick 10",    questions: 10,  time: "10 min", desc: "10 random questions from your track" },
  { id: "chapter",    label: "Chapter Quiz",questions: 20,  time: "20 min", desc: "One complete chapter, all topics"     },
  { id: "full-mock",  label: "Full Mock",   questions: 45,  time: "60 min", desc: "Complete exam simulation with timer"  },
] as const;

/* ─── Stats ──────────────────────────────────────────────────────────────── */
const STATS = [
  { value: "910+",    label: "Total Tests",     icon: BookOpen  },
  { value: "10,000+", label: "Questions",       icon: Target    },
  { value: "25,000+", label: "Tests Attempted", icon: BarChart2 },
  { value: "94%",     label: "Student Satisfaction", icon: Star },
];

/* ─── TestCenterHub Component ────────────────────────────────────────────── */
export function TestCenterHub() {
  const [selectedMode, setSelectedMode] = useState<string>("quick-10"); // Selected practice mode

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 md:px-6 py-10 max-w-6xl mx-auto">

        {/* ── Page Header ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-sm font-medium text-brand-500 mb-4">
            <Zap className="h-3.5 w-3.5" />
            Test Center — Exam Preparation
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Practice with{" "}
            <span className="text-brand-500">910+ Mock Tests</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            CBSE, JEE, NEET, GATE, Programming, and Company recruitment tests.
            Timed tests with instant results and detailed solutions.
          </p>
        </motion.div>

        {/* ── Stats Row ────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="rounded-xl border bg-card p-4 text-center">
              <stat.icon className="h-5 w-5 text-brand-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* ── Exam Category Cards ───────────────────────────────────────── */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-foreground mb-5">Choose Your Exam</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {EXAM_CATEGORIES.map((exam, i) => (
              <motion.div
                key={exam.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  href={exam.href}
                  className={cn(
                    "group flex flex-col rounded-2xl border p-6 h-full transition-all hover:shadow-md hover:-translate-y-0.5",
                    exam.bg, exam.border,
                  )}
                >
                  {/* Card header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-xl border",
                      exam.bg, exam.border,
                    )}>
                      <exam.icon className={cn("h-6 w-6", exam.text)} />
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      {exam.isPopular && (
                        <Badge className="text-xs bg-amber-500/20 text-amber-600 border-amber-500/30">
                          Popular
                        </Badge>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {exam.testsCount} tests
                      </span>
                    </div>
                  </div>

                  {/* Title + description */}
                  <h3 className={cn("font-bold text-lg mb-1.5", exam.text)}>{exam.label}</h3>
                  <p className="text-sm text-muted-foreground flex-1 mb-4">{exam.description}</p>

                  {/* Subject badges */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {exam.badges.map((b) => (
                      <span key={b} className={cn(
                        "rounded-full px-2 py-0.5 text-xs font-medium border",
                        exam.bg, exam.border, exam.text,
                      )}>
                        {b}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className={cn(
                    "flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all",
                    exam.text,
                  )}>
                    Start Practice
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Quick Practice ────────────────────────────────────────────── */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-foreground mb-5">Quick Practice</h2>
          <div className="rounded-2xl border bg-card p-6">
            <div className="grid md:grid-cols-3 gap-3 mb-5">
              {QUICK_MODES.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setSelectedMode(mode.id)}
                  className={cn(
                    "rounded-xl border p-4 text-left transition-all",
                    selectedMode === mode.id
                      ? "border-brand-500 bg-brand-500/10"
                      : "border-border hover:border-brand-500/50",
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-foreground">{mode.label}</span>
                    {selectedMode === mode.id && (
                      <CheckCircle2 className="h-4 w-4 text-brand-500" />
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">{mode.desc}</div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Target className="h-3 w-3" /> {mode.questions} questions
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {mode.time}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <Button className="w-full md:w-auto gap-2 bg-gradient-to-r from-brand-500 to-purple-600 text-white" asChild>
              <Link href={`/test-center/quick?mode=${selectedMode}`}>
                <Play className="h-4 w-4" />
                Start Quick Practice
              </Link>
            </Button>
          </div>
        </section>

        {/* ── Upcoming Tests ────────────────────────────────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-foreground">Upcoming Scheduled Tests</h2>
            <Link href="/events" className="text-sm text-brand-500 hover:underline flex items-center gap-1">
              View all events <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="space-y-3">
            {[
              { name: "JEE Main Mock — Full Syllabus",       date: "Jul 10, 2026", time: "10:00 AM", registered: 1240, seats: 2000, category: "JEE"  },
              { name: "CBSE Class 12 Physics Mock Board",    date: "Jul 12, 2026", time: "9:00 AM",  registered: 870,  seats: 1500, category: "CBSE" },
              { name: "NEET Biology Grand Test",             date: "Jul 15, 2026", time: "2:00 PM",  registered: 560,  seats: 1000, category: "NEET" },
              { name: "Python & DSA Assessment — Infosys Pattern", date: "Jul 18, 2026", time: "11:00 AM", registered: 390, seats: 800, category: "Company" },
            ].map((test) => (
              <div key={test.name} className="flex items-center justify-between rounded-xl border bg-card px-5 py-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
                    <Target className="h-5 w-5 text-brand-500" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{test.name}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {test.date} at {test.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Trophy className="h-3 w-3" /> {test.registered.toLocaleString()} registered
                      </span>
                    </div>
                  </div>
                </div>
                <Button size="sm" variant="outline" asChild>
                  <Link href="/test-center/register">Register</Link>
                </Button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
