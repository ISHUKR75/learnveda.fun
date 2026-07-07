/**
 * @file features/test-center/components/JEETestHub.tsx
 * @description JEE Main & Advanced test hub for LearnVeda
 * @purpose Complete JEE preparation page with mock tests, chapter tests, PYQs, and analytics
 * @used-by app/(platform)/test-center/jee/page.tsx
 *
 * Sections:
 *  1. JEE overview stats
 *  2. Subject tabs (Physics / Chemistry / Mathematics)
 *  3. Test type selector (Full Mock / Chapter-wise / PYQ)
 *  4. Test list with difficulty + time
 *  5. "Start Test" → launches MockTestEngine inline
 */

"use client";

import React, { useState }              from "react";
import { motion }                       from "framer-motion";
import Link                             from "next/link";
import {
  Calculator, Atom, FlaskConical, Clock, Target, Trophy,
  ChevronRight, Play, BarChart2, BookOpen, Star, ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import { Button }          from "@/components/ui/button";
import { Badge }           from "@/components/ui/badge";
import { MockTestEngine }  from "./MockTestEngine";
import {
  JEE_PHYSICS_QUESTIONS, JEE_CHEMISTRY_QUESTIONS,
  JEE_MATHEMATICS_QUESTIONS, JEE_MOCK_TEST_QUESTIONS,
} from "../data/jee-questions";
import { cn }              from "@/lib/utils";

/* ─── Subject Tabs ───────────────────────────────────────────────────────── */
const SUBJECTS = [
  { id: "all",         label: "Full Mock",    icon: Target,      color: "text-brand-500"   },
  { id: "physics",     label: "Physics",      icon: Atom,        color: "text-blue-500"    },
  { id: "chemistry",   label: "Chemistry",    icon: FlaskConical,color: "text-green-500"   },
  { id: "mathematics", label: "Mathematics",  icon: Calculator,  color: "text-orange-500"  },
] as const;

/* ─── Test Catalog ───────────────────────────────────────────────────────── */
const JEE_TESTS = [
  // Full mocks
  { id: "jee-full-01",   type: "full",    title: "JEE Main Full Mock #1",          subject: "all",         questions: 90, time: 180, difficulty: "hard",   year: null,  attempts: 12400 },
  { id: "jee-full-02",   type: "full",    title: "JEE Main Full Mock #2",          subject: "all",         questions: 90, time: 180, difficulty: "hard",   year: null,  attempts: 9800  },
  { id: "jee-adv-01",    type: "full",    title: "JEE Advanced Paper 1 Simulation",subject: "all",         questions: 54, time: 180, difficulty: "hard",   year: null,  attempts: 6200  },
  // Chapter-wise
  { id: "jee-phy-ch01",  type: "chapter", title: "Physics — Kinematics",           subject: "physics",     questions: 20, time: 30,  difficulty: "medium", year: null,  attempts: 8100  },
  { id: "jee-phy-ch02",  type: "chapter", title: "Physics — Electrostatics",       subject: "physics",     questions: 20, time: 30,  difficulty: "hard",   year: null,  attempts: 7400  },
  { id: "jee-phy-ch03",  type: "chapter", title: "Physics — Optics",               subject: "physics",     questions: 20, time: 30,  difficulty: "medium", year: null,  attempts: 6800  },
  { id: "jee-chem-ch01", type: "chapter", title: "Chemistry — Atomic Structure",   subject: "chemistry",   questions: 20, time: 30,  difficulty: "easy",   year: null,  attempts: 9200  },
  { id: "jee-chem-ch02", type: "chapter", title: "Chemistry — Organic Reactions",  subject: "chemistry",   questions: 20, time: 30,  difficulty: "hard",   year: null,  attempts: 7100  },
  { id: "jee-math-ch01", type: "chapter", title: "Mathematics — Calculus",         subject: "mathematics", questions: 20, time: 30,  difficulty: "hard",   year: null,  attempts: 11200 },
  { id: "jee-math-ch02", type: "chapter", title: "Mathematics — Vectors & 3D",     subject: "mathematics", questions: 20, time: 30,  difficulty: "medium", year: null,  attempts: 8900  },
  // PYQs
  { id: "jee-pyq-2024",  type: "pyq",     title: "JEE Main 2024 — January Session",subject: "all",         questions: 90, time: 180, difficulty: "hard",   year: 2024,  attempts: 42000 },
  { id: "jee-pyq-2023",  type: "pyq",     title: "JEE Main 2023 — Session 1",      subject: "all",         questions: 90, time: 180, difficulty: "hard",   year: 2023,  attempts: 38000 },
  { id: "jee-pyq-2022",  type: "pyq",     title: "JEE Main 2022",                  subject: "all",         questions: 90, time: 180, difficulty: "hard",   year: 2022,  attempts: 31000 },
] as const;

/* ─── Difficulty Badge ───────────────────────────────────────────────────── */
function DiffBadge({ d }: { d: "easy" | "medium" | "hard" }) {
  return (
    <Badge className={cn("text-xs", {
      "bg-emerald-500/10 text-emerald-600 border-emerald-500/20": d === "easy",
      "bg-amber-500/10   text-amber-600   border-amber-500/20":   d === "medium",
      "bg-red-500/10     text-red-600     border-red-500/20":     d === "hard",
    })}>
      {d.charAt(0).toUpperCase() + d.slice(1)}
    </Badge>
  );
}

/* ─── JEETestHub Component ───────────────────────────────────────────────── */
export function JEETestHub() {
  const [activeSubject, setActiveSubject] = useState<"all" | "physics" | "chemistry" | "mathematics">("all");
  const [activeType,    setActiveType]    = useState<"full" | "chapter" | "pyq">("full");
  const [activeTestId,  setActiveTestId]  = useState<string | null>(null);  // Which test is running

  /* ── Get questions for the selected test ─────────────────────────── */
  function getTestQuestions(testId: string) {
    if (testId.includes("full") || testId.includes("adv") || testId.includes("pyq")) {
      return JEE_MOCK_TEST_QUESTIONS;
    }
    if (testId.includes("phy"))  return JEE_PHYSICS_QUESTIONS;
    if (testId.includes("chem")) return JEE_CHEMISTRY_QUESTIONS;
    if (testId.includes("math")) return JEE_MATHEMATICS_QUESTIONS;
    return JEE_MOCK_TEST_QUESTIONS;
  }

  /* ── Filter tests by subject + type ─────────────────────────────── */
  const filtered = JEE_TESTS.filter((t) =>
    (activeSubject === "all" || t.subject === activeSubject || t.subject === "all") &&
    t.type === activeType
  );

  /* ── If a test is running, show the engine ────────────────────────── */
  if (activeTestId) {
    const testMeta = JEE_TESTS.find((t) => t.id === activeTestId);
    if (!testMeta) return null;

    return (
      <MockTestEngine
        testId={activeTestId}
        title={testMeta.title}
        questions={getTestQuestions(activeTestId)}
        totalTime={testMeta.time * 60}        // Convert minutes to seconds
        onFinish={() => setActiveTestId(null)} // Back to hub on finish
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 md:px-6 py-10 max-w-6xl mx-auto">

        {/* ── Breadcrumb ────────────────────────────────────────────── */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/test-center" className="hover:text-foreground flex items-center gap-1">
            <ArrowLeft className="h-3.5 w-3.5" /> Test Center
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground font-medium">JEE Main & Advanced</span>
        </div>

        {/* ── Header ────────────────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 border border-orange-500/20">
              <Calculator className="h-6 w-6 text-orange-500" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">JEE Main & Advanced</h1>
              <p className="text-muted-foreground text-sm">180 tests · Physics · Chemistry · Mathematics</p>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
            {[
              { icon: Target,    label: "Total Tests",    value: "180"   },
              { icon: BookOpen,  label: "Questions",      value: "5,400" },
              { icon: Clock,     label: "PYQs (2015–25)", value: "10"    },
              { icon: Trophy,    label: "Top Scorers",    value: "2,400" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border bg-card p-3 flex items-center gap-3">
                <s.icon className="h-5 w-5 text-orange-500 shrink-0" />
                <div>
                  <div className="font-bold text-foreground">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Subject Tabs ──────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-2 mb-5">
          {SUBJECTS.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSubject(s.id)}
              className={cn(
                "flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-all",
                activeSubject === s.id
                  ? "border-brand-500 bg-brand-500/10 text-brand-500"
                  : "border-border text-muted-foreground hover:border-brand-500/50",
              )}
            >
              <s.icon className={cn("h-4 w-4", activeSubject === s.id ? s.color : "")} />
              {s.label}
            </button>
          ))}
        </div>

        {/* ── Test Type Tabs ─────────────────────────────────────────── */}
        <div className="flex gap-2 mb-6">
          {(["full", "chapter", "pyq"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-all border",
                activeType === type
                  ? "bg-foreground text-background border-foreground"
                  : "border-border text-muted-foreground hover:border-foreground/50",
              )}
            >
              {type === "full" ? "Full Mock" : type === "chapter" ? "Chapter-wise" : "Previous Year (PYQ)"}
            </button>
          ))}
        </div>

        {/* ── Test List ─────────────────────────────────────────────── */}
        <div className="space-y-3">
          {filtered.map((test, i) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="flex items-center justify-between rounded-xl border bg-card px-5 py-4 hover:bg-muted/20 hover:border-brand-500/30 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
                  <Target className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <div className="font-medium text-foreground flex items-center gap-2">
                    {test.title}
                    {test.year && <Badge className="text-xs bg-purple-500/10 text-purple-600 border-purple-500/20">PYQ {test.year}</Badge>}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                    <span className="flex items-center gap-1">
                      <Target className="h-3 w-3" /> {test.questions} questions
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {test.time} min
                    </span>
                    <span className="flex items-center gap-1">
                      <BarChart2 className="h-3 w-3" /> {test.attempts.toLocaleString()} attempts
                    </span>
                    <DiffBadge d={test.difficulty as "easy" | "medium" | "hard"} />
                  </div>
                </div>
              </div>

              <Button
                size="sm"
                className="gap-2 bg-orange-500 hover:bg-orange-600 text-white shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
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
