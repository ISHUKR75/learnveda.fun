/**
 * @file features/test-center/components/CBSETestHub.tsx
 * @description CBSE Board exam test hub for LearnVeda
 * @purpose Complete CBSE preparation: Class 9–12, all subjects, chapter tests, mock boards
 * @used-by app/(platform)/test-center/cbse/page.tsx
 */

"use client";

import React, { useState } from "react";
import { motion }          from "framer-motion";
import Link                from "next/link";
import {
  BookOpen, Calculator, Atom, Globe, Clock, Target,
  ChevronRight, Play, BarChart2, ArrowLeft, Users,
  PenTool, Leaf, Languages, Star, Trophy,
} from "lucide-react";
import { Button }         from "@/components/ui/button";
import { Badge }          from "@/components/ui/badge";
import { MockTestEngine } from "./MockTestEngine";
import { CBSE_CLASS12_PHYSICS_QUESTIONS } from "../data/jee-questions";
import type { TestQuestion } from "./MockTestEngine";
import { cn }             from "@/lib/utils";

/* ─── CBSE Class Definitions ─────────────────────────────────────────────── */
const CBSE_CLASSES = [
  { id: "class-9",  label: "Class 9",  icon: BookOpen, subjects: 7,  tests: 58,  color: "text-blue-600",   bg: "bg-blue-500/10",  border: "border-blue-500/20"  },
  { id: "class-10", label: "Class 10", icon: Target,   subjects: 7,  tests: 72,  color: "text-green-600",  bg: "bg-green-500/10", border: "border-green-500/20" },
  { id: "class-11", label: "Class 11", icon: Atom,     subjects: 8,  tests: 56,  color: "text-purple-600", bg: "bg-purple-500/10",border: "border-purple-500/20"},
  { id: "class-12", label: "Class 12", icon: Calculator,subjects: 8, tests: 64,  color: "text-orange-600", bg: "bg-orange-500/10",border: "border-orange-500/20"},
] as const;

/* ─── Sample Chapter Tests ───────────────────────────────────────────────── */
const CBSE_CHAPTER_TESTS = [
  // Class 9
  { id: "c9-math-01",  class: "class-9",  subject: "Mathematics", title: "Number Systems",         qs: 20, time: 30, diff: "easy",   attempts: 18200 },
  { id: "c9-math-02",  class: "class-9",  subject: "Mathematics", title: "Polynomials",            qs: 20, time: 30, diff: "medium", attempts: 14100 },
  { id: "c9-sci-01",   class: "class-9",  subject: "Science",     title: "Matter in Our Surroundings", qs: 20, time: 30, diff: "easy", attempts: 16400 },
  { id: "c9-sst-01",   class: "class-9",  subject: "Social Science", title: "French Revolution",   qs: 20, time: 30, diff: "medium", attempts: 12800 },
  // Class 10
  { id: "c10-math-01", class: "class-10", subject: "Mathematics", title: "Real Numbers",           qs: 20, time: 30, diff: "easy",   attempts: 24300 },
  { id: "c10-math-02", class: "class-10", subject: "Mathematics", title: "Quadratic Equations",    qs: 20, time: 30, diff: "hard",   attempts: 19800 },
  { id: "c10-sci-01",  class: "class-10", subject: "Science",     title: "Light — Reflection & Refraction", qs: 20, time: 30, diff: "medium", attempts: 21400 },
  { id: "c10-sci-02",  class: "class-10", subject: "Science",     title: "Life Processes",         qs: 20, time: 30, diff: "easy",   attempts: 18900 },
  // Class 11
  { id: "c11-phy-01",  class: "class-11", subject: "Physics",     title: "Laws of Motion",         qs: 20, time: 30, diff: "hard",   attempts: 16100 },
  { id: "c11-chem-01", class: "class-11", subject: "Chemistry",   title: "Some Basic Concepts",    qs: 20, time: 30, diff: "easy",   attempts: 14200 },
  { id: "c11-math-01", class: "class-11", subject: "Mathematics", title: "Sets & Functions",       qs: 20, time: 30, diff: "medium", attempts: 15800 },
  // Class 12
  { id: "c12-phy-01",  class: "class-12", subject: "Physics",     title: "Electric Charges & Fields", qs: 20, time: 30, diff: "medium", attempts: 19400 },
  { id: "c12-phy-02",  class: "class-12", subject: "Physics",     title: "Current Electricity",    qs: 20, time: 30, diff: "hard",   attempts: 17600 },
  { id: "c12-chem-01", class: "class-12", subject: "Chemistry",   title: "Solutions",              qs: 20, time: 30, diff: "medium", attempts: 14800 },
  { id: "c12-math-01", class: "class-12", subject: "Mathematics", title: "Relations & Functions",  qs: 20, time: 30, diff: "easy",   attempts: 16200 },
  { id: "c12-math-02", class: "class-12", subject: "Mathematics", title: "Integrals",              qs: 20, time: 30, diff: "hard",   attempts: 22100 },
] as const;

/* ─── Full Board Mock Tests ──────────────────────────────────────────────── */
const BOARD_MOCKS = [
  { id: "board-c10-math", class: "class-10", subject: "Mathematics", title: "Class 10 Board Mock — Mathematics (Full)",   qs: 40, time: 180, diff: "hard", year: null, attempts: 48200 },
  { id: "board-c10-sci",  class: "class-10", subject: "Science",     title: "Class 10 Board Mock — Science (Full)",        qs: 40, time: 180, diff: "hard", year: null, attempts: 42100 },
  { id: "board-c12-phy",  class: "class-12", subject: "Physics",     title: "Class 12 Board Mock — Physics (Full Paper)",  qs: 35, time: 180, diff: "hard", year: null, attempts: 38400 },
  { id: "board-c12-math", class: "class-12", subject: "Mathematics", title: "Class 12 Board Mock — Mathematics (Full)",    qs: 38, time: 180, diff: "hard", year: null, attempts: 44800 },
  { id: "board-c12-chem", class: "class-12", subject: "Chemistry",   title: "Class 12 Board Mock — Chemistry (Full)",      qs: 33, time: 180, diff: "hard", year: null, attempts: 29600 },
  { id: "pyq-c10-2024",   class: "class-10", subject: "Mathematics", title: "CBSE Class 10 Maths 2024 PYQ",                qs: 40, time: 180, diff: "hard", year: 2024, attempts: 86200 },
  { id: "pyq-c12-2024",   class: "class-12", subject: "Physics",     title: "CBSE Class 12 Physics 2024 PYQ",              qs: 35, time: 180, diff: "hard", year: 2024, attempts: 72100 },
  { id: "pyq-c12-2023",   class: "class-12", subject: "Chemistry",   title: "CBSE Class 12 Chemistry 2023 PYQ",            qs: 33, time: 180, diff: "hard", year: 2023, attempts: 64300 },
] as const;

/* ─── CBSETestHub Component ──────────────────────────────────────────────── */
export function CBSETestHub() {
  const [activeClass,  setActiveClass]  = useState<"all" | "class-9" | "class-10" | "class-11" | "class-12">("all");
  const [activeType,   setActiveType]   = useState<"chapter" | "board" | "pyq">("chapter");
  const [activeTestId, setActiveTestId] = useState<string | null>(null);

  /* ── Run selected test ─────────────────────────────────────────── */
  if (activeTestId) {
    const testMeta = [...CBSE_CHAPTER_TESTS, ...BOARD_MOCKS].find((t) => t.id === activeTestId);
    if (!testMeta) return null;

    return (
      <MockTestEngine
        testId={activeTestId}
        title={testMeta.title}
        questions={CBSE_CLASS12_PHYSICS_QUESTIONS}  // Use real questions in production
        totalTime={testMeta.time * 60}
        onFinish={() => setActiveTestId(null)}
      />
    );
  }

  /* ── Filter tests ─────────────────────────────────────────────── */
  const chapterTests = CBSE_CHAPTER_TESTS.filter((t) =>
    activeClass === "all" || t.class === activeClass
  );
  const boardMocks = BOARD_MOCKS.filter((t) =>
    (activeClass === "all" || t.class === activeClass) &&
    (activeType === "board" ? !t.year : activeType === "pyq" ? t.year : true)
  );
  const displayList = activeType === "chapter" ? chapterTests : boardMocks;

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 md:px-6 py-10 max-w-6xl mx-auto">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/test-center" className="hover:text-foreground flex items-center gap-1">
            <ArrowLeft className="h-3.5 w-3.5" /> Test Center
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground font-medium">CBSE Board Tests</span>
        </div>

        {/* Header */}
        <motion.div initial={{ opacity: 0.01, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20">
              <BookOpen className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">CBSE Board Test Prep</h1>
              <p className="text-muted-foreground text-sm">240 tests · Class 9–12 · All NCERT subjects</p>
            </div>
          </div>

          {/* Class cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
            {CBSE_CLASSES.map((cls) => (
              <button
                key={cls.id}
                onClick={() => setActiveClass(cls.id)}
                className={cn(
                  "rounded-xl border p-4 text-left transition-all",
                  activeClass === cls.id ? cn(cls.bg, cls.border) : "border-border bg-card hover:bg-muted/20",
                )}
              >
                <cls.icon className={cn("h-6 w-6 mb-2", activeClass === cls.id ? cls.color : "text-muted-foreground")} />
                <div className={cn("font-bold text-sm", activeClass === cls.id ? cls.color : "text-foreground")}>{cls.label}</div>
                <div className="text-xs text-muted-foreground">{cls.tests} tests</div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Type selector */}
        <div className="flex gap-2 mb-6">
          {(["chapter", "board", "pyq"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-all",
                activeType === type
                  ? "bg-foreground text-background border-foreground"
                  : "border-border text-muted-foreground hover:border-foreground/50",
              )}
            >
              {type === "chapter" ? "Chapter Tests" : type === "board" ? "Full Board Mock" : "Previous Year (PYQ)"}
            </button>
          ))}
        </div>

        {/* Test list */}
        <div className="space-y-3">
          {displayList.map((test, i) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0.01, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="flex items-center justify-between rounded-xl border bg-card px-5 py-4 hover:bg-muted/20 hover:border-blue-500/30 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                  <Target className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <div className="font-medium text-foreground flex items-center gap-2">
                    {test.title}
                    {"year" in test && test.year && (
                      <Badge className="text-xs bg-purple-500/10 text-purple-600 border-purple-500/20">PYQ {test.year}</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                    <span>{test.subject}</span>
                    <span className="flex items-center gap-1"><Target className="h-3 w-3" /> {test.qs} questions</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {test.time} min</span>
                    <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {test.attempts.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <Button
                size="sm"
                className="gap-2 bg-blue-500 hover:bg-blue-600 text-white shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => setActiveTestId(test.id)}
              >
                <Play className="h-3.5 w-3.5" /> Start
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
