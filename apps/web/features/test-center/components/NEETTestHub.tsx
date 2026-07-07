/**
 * @file features/test-center/components/NEETTestHub.tsx
 * @description NEET UG test hub for LearnVeda
 * @purpose Complete NEET preparation page with Biology, Physics, Chemistry tests
 * @used-by app/(platform)/test-center/neet/page.tsx
 */

"use client";

import React, { useState } from "react";
import { motion }          from "framer-motion";
import Link                from "next/link";
import {
  Leaf, Atom, FlaskConical, Clock, Target, Trophy,
  ChevronRight, Play, BarChart2, ArrowLeft,
} from "lucide-react";
import { Button }         from "@/components/ui/button";
import { Badge }          from "@/components/ui/badge";
import { MockTestEngine } from "./MockTestEngine";
import type { TestQuestion } from "./MockTestEngine";
import { cn }             from "@/lib/utils";

/* ─── NEET Biology Sample Questions ─────────────────────────────────────── */
// In production: fetched from MongoDB. Demo data here for immediate use.
const NEET_BIOLOGY_QUESTIONS: TestQuestion[] = [
  {
    id: "neet-bio-001", subject: "Biology", chapter: "Cell Biology",
    difficulty: "easy", marks: 4, negMarks: 1,
    text: "The powerhouse of the cell is the:",
    options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi apparatus"],
    correctIndex: 1,
    explanation: "Mitochondria are called the 'powerhouse of the cell' because they produce ATP (adenosine triphosphate) through cellular respiration. ATP is the primary energy currency of the cell.",
  },
  {
    id: "neet-bio-002", subject: "Biology", chapter: "Genetics",
    difficulty: "medium", marks: 4, negMarks: 1,
    text: "A cross between a tall pea plant (TT) and a dwarf pea plant (tt) will produce offspring in the ratio:",
    options: ["1 Tall : 1 Dwarf", "All Tall", "3 Tall : 1 Dwarf", "All Dwarf"],
    correctIndex: 1,
    explanation: "TT × tt → All Tt (tall). Since T (tall) is dominant over t (dwarf), all F1 offspring will be tall (Tt). This is Mendel's law of dominance.",
  },
  {
    id: "neet-bio-003", subject: "Biology", chapter: "Human Physiology",
    difficulty: "medium", marks: 4, negMarks: 1,
    text: "The normal pH of human blood is:",
    options: ["6.8", "7.4", "7.0", "8.0"],
    correctIndex: 1,
    explanation: "Normal blood pH is maintained between 7.35–7.45, approximately 7.4. Deviations (acidosis < 7.35 or alkalosis > 7.45) can be life-threatening. Maintained by buffer systems, lungs, and kidneys.",
  },
  {
    id: "neet-bio-004", subject: "Biology", chapter: "Ecology",
    difficulty: "easy", marks: 4, negMarks: 1,
    text: "Which gas is responsible for the 'Greenhouse Effect'?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    correctIndex: 2,
    explanation: "Carbon dioxide (CO₂) is the primary greenhouse gas responsible for global warming. It traps infrared radiation from Earth's surface, causing the greenhouse effect. Other greenhouse gases include methane, water vapor, and nitrous oxide.",
  },
  {
    id: "neet-bio-005", subject: "Biology", chapter: "Plant Physiology",
    difficulty: "hard", marks: 4, negMarks: 1,
    text: "The site of photosynthesis in plants is the:",
    options: ["Mitochondria", "Chloroplast", "Ribosome", "Vacuole"],
    correctIndex: 1,
    explanation: "Photosynthesis occurs in chloroplasts. The light-dependent reactions occur in the thylakoid membranes, while the Calvin cycle (dark reactions) occurs in the stroma. Chloroplasts contain chlorophyll that absorbs light energy.",
  },
  {
    id: "neet-bio-006", subject: "Biology", chapter: "Animal Kingdom",
    difficulty: "medium", marks: 4, negMarks: 1,
    text: "Which of the following is a cold-blooded (ectothermic) animal?",
    options: ["Dog", "Frog", "Pigeon", "Rabbit"],
    correctIndex: 1,
    explanation: "Frog is a cold-blooded (ectothermic/poikilothermic) amphibian. Its body temperature depends on the environment. Dogs, pigeons, and rabbits are warm-blooded (endothermic/homeothermic) — they maintain constant body temperature.",
  },
  {
    id: "neet-bio-007", subject: "Biology", chapter: "Molecular Biology",
    difficulty: "hard", marks: 4, negMarks: 1,
    text: "In DNA, adenine pairs with thymine via:",
    options: ["3 hydrogen bonds", "2 hydrogen bonds", "1 hydrogen bond", "Covalent bond"],
    correctIndex: 1,
    explanation: "In DNA, Adenine (A) pairs with Thymine (T) via 2 hydrogen bonds (A=T), while Guanine (G) pairs with Cytosine (C) via 3 hydrogen bonds (G≡C). This is Chargaff's rule and the complementary base pairing principle.",
  },
  {
    id: "neet-bio-008", subject: "Biology", chapter: "Reproduction",
    difficulty: "medium", marks: 4, negMarks: 1,
    text: "The process by which a zygote develops into an embryo is called:",
    options: ["Fertilization", "Cleavage", "Gastrulation", "Gametogenesis"],
    correctIndex: 1,
    explanation: "Cleavage is the rapid mitotic division of the zygote to form a multicellular structure (morula/blastula). It begins immediately after fertilization. The cells formed during cleavage are called blastomeres.",
  },
];

/* ─── NEET Test Catalog ──────────────────────────────────────────────────── */
const NEET_TESTS = [
  { id: "neet-full-01",   type: "full",    title: "NEET Full Mock #1 (180 questions)", subject: "all",     questions: 20, time: 200, difficulty: "hard",   attempts: 28400 },
  { id: "neet-full-02",   type: "full",    title: "NEET Full Mock #2",                 subject: "all",     questions: 20, time: 200, difficulty: "hard",   attempts: 21800 },
  { id: "neet-bio-ch01",  type: "chapter", title: "Biology — Cell Biology",            subject: "biology", questions: 20, time: 30,  difficulty: "easy",   attempts: 14200 },
  { id: "neet-bio-ch02",  type: "chapter", title: "Biology — Genetics & Evolution",    subject: "biology", questions: 20, time: 30,  difficulty: "hard",   attempts: 11900 },
  { id: "neet-bio-ch03",  type: "chapter", title: "Biology — Human Physiology",        subject: "biology", questions: 20, time: 30,  difficulty: "medium", attempts: 13400 },
  { id: "neet-bio-ch04",  type: "chapter", title: "Biology — Plant Kingdom",           subject: "biology", questions: 20, time: 30,  difficulty: "medium", attempts: 9800  },
  { id: "neet-pyq-2024",  type: "pyq",     title: "NEET 2024 Paper",                  subject: "all",     questions: 20, time: 200, difficulty: "hard",   attempts: 52000 },
  { id: "neet-pyq-2023",  type: "pyq",     title: "NEET 2023 Paper",                  subject: "all",     questions: 20, time: 200, difficulty: "hard",   attempts: 44000 },
  { id: "neet-pyq-2022",  type: "pyq",     title: "NEET 2022 Paper",                  subject: "all",     questions: 20, time: 200, difficulty: "hard",   attempts: 38000 },
];

const SUBJECT_TABS = [
  { id: "all",     label: "All",         icon: Target     },
  { id: "biology", label: "Biology",     icon: Leaf       },
  { id: "physics", label: "Physics",     icon: Atom       },
  { id: "chem",    label: "Chemistry",   icon: FlaskConical },
] as const;

/* ─── NEETTestHub Component ──────────────────────────────────────────────── */
export function NEETTestHub() {
  const [activeSub,    setActiveSub]    = useState<"all" | "biology" | "physics" | "chem">("all");
  const [activeType,   setActiveType]   = useState<"full" | "chapter" | "pyq">("full");
  const [activeTestId, setActiveTestId] = useState<string | null>(null);

  const filtered = NEET_TESTS.filter((t) =>
    (activeSub === "all" || t.subject === activeSub || t.subject === "all") &&
    t.type === activeType
  );

  if (activeTestId) {
    const meta = NEET_TESTS.find((t) => t.id === activeTestId);
    if (!meta) return null;
    return (
      <MockTestEngine
        testId={activeTestId}
        title={meta.title}
        questions={NEET_BIOLOGY_QUESTIONS}
        totalTime={meta.time * 60}
        onFinish={() => setActiveTestId(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 md:px-6 py-10 max-w-6xl mx-auto">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/test-center" className="hover:text-foreground flex items-center gap-1">
            <ArrowLeft className="h-3.5 w-3.5" /> Test Center
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground font-medium">NEET UG</span>
        </div>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10 border border-green-500/20">
              <Leaf className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">NEET UG Preparation</h1>
              <p className="text-muted-foreground text-sm">120 tests · Biology · Physics · Chemistry</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
            {[
              { icon: Target,    label: "Total Tests",    value: "120"   },
              { icon: Leaf,      label: "Biology MCQs",   value: "1,800" },
              { icon: Clock,     label: "PYQs",           value: "10"    },
              { icon: Trophy,    label: "Avg Score",      value: "68%"   },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border bg-card p-3 flex items-center gap-3">
                <s.icon className="h-5 w-5 text-green-500 shrink-0" />
                <div>
                  <div className="font-bold text-foreground">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Subject tabs */}
        <div className="flex flex-wrap gap-2 mb-4">
          {SUBJECT_TABS.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSub(s.id)}
              className={cn(
                "flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-all",
                activeSub === s.id
                  ? "border-green-500 bg-green-500/10 text-green-600"
                  : "border-border text-muted-foreground hover:border-green-500/50",
              )}
            >
              <s.icon className="h-4 w-4" /> {s.label}
            </button>
          ))}
        </div>

        {/* Type tabs */}
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
              {type === "full" ? "Full Mock" : type === "chapter" ? "Chapter-wise" : "Previous Year"}
            </button>
          ))}
        </div>

        {/* Test list */}
        <div className="space-y-3">
          {filtered.map((test, i) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="flex items-center justify-between rounded-xl border bg-card px-5 py-4 hover:bg-muted/20 hover:border-green-500/30 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0">
                  <Target className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <div className="font-medium text-foreground">{test.title}</div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                    <span className="flex items-center gap-1"><Target className="h-3 w-3" /> {test.questions} questions</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {test.time} min</span>
                    <span className="flex items-center gap-1"><BarChart2 className="h-3 w-3" /> {test.attempts.toLocaleString()} attempts</span>
                  </div>
                </div>
              </div>
              <Button
                size="sm"
                className="gap-2 bg-green-500 hover:bg-green-600 text-white shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
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
