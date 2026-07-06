/**
 * @file app/(platform)/practice/mock-test/page.tsx
 * @description CBSE & JEE Mock Test Centre — full-length timed tests
 * Route: /practice/mock-test
 *
 * Features:
 *  - Mock test selection by exam type (CBSE Board, JEE Main, NEET, Engineering)
 *  - Duration and question count displayed
 *  - Test instructions screen
 *  - Result analysis with subject-wise breakdown
 *  - Access to past attempt history
 *
 * Platform layout (Navbar) provided by (platform)/layout.tsx.
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Clock, BookOpen, Target, Trophy, Star, ArrowRight,
  Lock, Play, CheckCircle, BarChart3, Calendar,
} from "lucide-react";
import { Badge }  from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* ─── Mock Test Catalogue ─────────────────────────────────────────────────── */
/**
 * MOCK_TESTS
 * Available mock tests by exam category.
 * Each test has duration, question count, marks per question, and negative marking.
 */
const MOCK_TESTS = [
  {
    category: "CBSE Board",
    emoji:    "📚",
    color:    "from-blue-500 to-cyan-500",
    tests: [
      { id: "cbse-12-math",  name: "Class 12 Mathematics",    questions: 38, duration: 180, marks: 80,  negative: false, isPro: false, attempts: 1240 },
      { id: "cbse-12-phy",   name: "Class 12 Physics",        questions: 37, duration: 180, marks: 70,  negative: false, isPro: false, attempts: 980  },
      { id: "cbse-12-chem",  name: "Class 12 Chemistry",      questions: 37, duration: 180, marks: 70,  negative: false, isPro: false, attempts: 860  },
      { id: "cbse-12-bio",   name: "Class 12 Biology",        questions: 50, duration: 180, marks: 100, negative: false, isPro: false, attempts: 720  },
      { id: "cbse-10-full",  name: "Class 10 Full Syllabus",  questions: 80, duration: 180, marks: 80,  negative: false, isPro: true,  attempts: 1540 },
    ],
  },
  {
    category: "JEE Main",
    emoji:    "🏆",
    color:    "from-orange-500 to-red-500",
    tests: [
      { id: "jee-mock-1",    name: "JEE Main Mock Test 1",   questions: 90,  duration: 180, marks: 300, negative: true,  isPro: false, attempts: 2840 },
      { id: "jee-mock-2",    name: "JEE Main Mock Test 2",   questions: 90,  duration: 180, marks: 300, negative: true,  isPro: false, attempts: 2120 },
      { id: "jee-mock-3",    name: "JEE Main Mock Test 3",   questions: 90,  duration: 180, marks: 300, negative: true,  isPro: true,  attempts: 1680 },
      { id: "jee-adv",       name: "JEE Advanced Mock",      questions: 60,  duration: 180, marks: 198, negative: true,  isPro: true,  attempts: 1240 },
    ],
  },
  {
    category: "NEET",
    emoji:    "🔬",
    color:    "from-green-500 to-teal-500",
    tests: [
      { id: "neet-mock-1",   name: "NEET Mock Test 1",       questions: 180, duration: 200, marks: 720, negative: true,  isPro: false, attempts: 1980 },
      { id: "neet-mock-2",   name: "NEET Mock Test 2",       questions: 180, duration: 200, marks: 720, negative: true,  isPro: true,  attempts: 1560 },
      { id: "neet-bio",      name: "Biology Focused",        questions: 90,  duration: 100, marks: 360, negative: true,  isPro: false, attempts: 1200 },
    ],
  },
  {
    category: "DSA & CS",
    emoji:    "🧠",
    color:    "from-purple-500 to-violet-500",
    tests: [
      { id: "dsa-mock-1",    name: "DSA — FAANG Level Mock", questions: 40, duration: 90,  marks: 100, negative: false, isPro: false, attempts: 3400 },
      { id: "cs-full",       name: "CS Core Full Mock",      questions: 60, duration: 120, marks: 120, negative: false, isPro: true,  attempts: 1800 },
    ],
  },
] as const;

/** Recent attempt history (demo) */
const RECENT_ATTEMPTS = [
  { name: "JEE Main Mock Test 1",       score: "186/300", date: "Jul 4, 2026",  rank: "Top 12%" },
  { name: "Class 12 Mathematics",       score: "68/80",   date: "Jun 28, 2026", rank: "Top 8%"  },
  { name: "DSA — FAANG Level Mock",     score: "32/40",   date: "Jun 21, 2026", rank: "Top 5%"  },
];

export default function MockTestPage() {
  const [selectedTest, setSelectedTest] = useState<string | null>(null);

  return (
    <div className="min-h-screen pb-20">
      {/* Hero */}
      <section className="border-b bg-gradient-to-b from-orange-950/5 to-background py-14">
        <div className="container px-4 md:px-6">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-5">
            <Link href="/practice" className="hover:text-foreground">Practice</Link>
            <span>/</span>
            <span className="text-foreground font-medium">Mock Tests</span>
          </nav>
          <Badge variant="secondary" className="mb-3">Exam-Simulated Tests</Badge>
          <h1 className="text-3xl font-extrabold mb-4">📋 Mock Test Centre</h1>
          <p className="text-muted-foreground text-lg mb-6 max-w-xl">
            Full-length, exam-pattern mock tests for CBSE Board, JEE Main, NEET, and Core CS.
            Real timing, negative marking, and detailed result analysis.
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><BookOpen className="h-4 w-4" /> 15+ Mock Tests</span>
            <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> Real exam timing</span>
            <span className="flex items-center gap-1.5"><Star className="h-4 w-4 fill-yellow-500 text-yellow-500" /> 18K+ attempts</span>
          </div>
        </div>
      </section>

      {/* Test categories */}
      <section className="py-12">
        <div className="container px-4 md:px-6 space-y-10">
          {MOCK_TESTS.map((category, ci) => (
            <motion.div key={category.category} initial={{ opacity: 0.01, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: ci * 0.1 }}>
              {/* Category header */}
              <div className="flex items-center gap-3 mb-5">
                <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-xl`}>
                  {category.emoji}
                </div>
                <h2 className="text-xl font-bold">{category.category}</h2>
              </div>

              {/* Test cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.tests.map((test) => (
                  <div key={test.id} className="rounded-2xl border bg-card p-5 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <h3 className="font-semibold text-sm">{test.name}</h3>
                      {test.isPro && <Badge variant="outline" className="text-xs shrink-0 text-orange-600 border-orange-400/40"><Lock className="h-3 w-3 inline" /> Pro</Badge>}
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mb-4">
                      <span className="flex items-center gap-1"><Target className="h-3 w-3" /> {test.questions} Q</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {test.duration} min</span>
                      <span className="flex items-center gap-1"><BarChart3 className="h-3 w-3" /> {test.marks} marks</span>
                      {test.negative && <span className="text-red-500">–ve marking</span>}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{test.attempts.toLocaleString()} attempts</span>
                      <Button size="sm" variant={test.isPro ? "outline" : "gradient"} className="gap-1.5 h-8 text-xs" asChild={!test.isPro} disabled={false}>
                        {test.isPro
                          ? <span><Lock className="h-3 w-3" /> Unlock</span>
                          : <Link href={`/test-center`}><Play className="h-3 w-3" /> Start Test</Link>
                        }
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recent attempts */}
      <section className="py-10 bg-muted/30">
        <div className="container px-4 md:px-6 max-w-2xl">
          <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-brand-500" /> Your Recent Attempts
          </h2>
          <div className="rounded-2xl border bg-card overflow-hidden">
            {RECENT_ATTEMPTS.map((attempt, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-4 border-b last:border-0 hover:bg-muted/20">
                <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                <div className="flex-1">
                  <div className="font-semibold text-sm">{attempt.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{attempt.date}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-sm">{attempt.score}</div>
                  <div className="text-xs text-green-600">{attempt.rank}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
