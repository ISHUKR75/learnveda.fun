/**
 * @file app/(platform)/practice/quiz/page.tsx
 * @description Adaptive Quiz Practice — subject-wise question banks
 * Route: /practice/quiz
 *
 * Features:
 *  - Subject selector (CBSE Class 9–12, Engineering, Core CS, Programming)
 *  - Difficulty filter: Easy / Medium / Hard / Mixed
 *  - Timed and untimed modes
 *  - Question rendering with 4 options (MCQ format)
 *  - Instant feedback with explanation
 *  - Session result with XP earned
 *
 * Platform layout (Navbar) provided by (platform)/layout.tsx.
 */

"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain, Clock, CheckCircle2, XCircle, ArrowRight,
  Target, Zap, RefreshCw, Trophy, ChevronRight, Star,
} from "lucide-react";
import { Badge }    from "@/components/ui/badge";
import { Button }   from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

/* ─── Types ───────────────────────────────────────────────────────────────── */
interface Question {
  id:          number;
  subject:     string;
  topic:       string;
  text:        string;
  options:     string[];
  correct:     number; // 0-indexed
  explanation: string;
  difficulty:  "Easy" | "Medium" | "Hard";
  xp:          number;
}

/* ─── Sample Question Bank ────────────────────────────────────────────────── */
/**
 * QUESTIONS
 * 15 sample questions across subjects.
 * In production, fetched from /api/practice?subject=...&difficulty=...
 */
const QUESTIONS: Question[] = [
  {
    id:          1,
    subject:     "Mathematics",
    topic:       "Algebra",
    text:        "If α and β are roots of x² – 5x + 6 = 0, find α² + β².",
    options:     ["13", "25", "11", "36"],
    correct:     0,
    explanation: "α + β = 5, αβ = 6. α² + β² = (α+β)² – 2αβ = 25 – 12 = 13.",
    difficulty:  "Medium",
    xp:          15,
  },
  {
    id:          2,
    subject:     "Physics",
    topic:       "Kinematics",
    text:        "A body moving with uniform velocity has its acceleration equal to:",
    options:     ["Maximum", "Minimum", "Zero", "Constant but non-zero"],
    correct:     2,
    explanation: "Uniform velocity means constant velocity, so the change in velocity per unit time (acceleration) is zero.",
    difficulty:  "Easy",
    xp:          10,
  },
  {
    id:          3,
    subject:     "Chemistry",
    topic:       "Periodic Table",
    text:        "Which element has the highest electronegativity on the Pauling scale?",
    options:     ["Oxygen", "Chlorine", "Fluorine", "Nitrogen"],
    correct:     2,
    explanation: "Fluorine has the highest electronegativity (3.98) on the Pauling scale. It is the most electronegative element.",
    difficulty:  "Easy",
    xp:          10,
  },
  {
    id:          4,
    subject:     "DSA",
    topic:       "Arrays",
    text:        "What is the time complexity of the best sorting algorithm for sorting n integers in O(n log n) worst case?",
    options:     ["Bubble Sort", "Merge Sort", "Quick Sort", "Insertion Sort"],
    correct:     1,
    explanation: "Merge Sort has O(n log n) time complexity in all cases (best, average, worst). Quick Sort is O(n log n) average but O(n²) worst case.",
    difficulty:  "Medium",
    xp:          15,
  },
  {
    id:          5,
    subject:     "Biology",
    topic:       "Cell Biology",
    text:        "The powerhouse of the cell is:",
    options:     ["Nucleus", "Ribosome", "Mitochondria", "Golgi Apparatus"],
    correct:     2,
    explanation: "Mitochondria are called the 'powerhouse of the cell' because they produce ATP (adenosine triphosphate) through cellular respiration.",
    difficulty:  "Easy",
    xp:          10,
  },
  {
    id:          6,
    subject:     "Computer Networks",
    topic:       "OSI Model",
    text:        "Which layer of the OSI model handles routing of packets?",
    options:     ["Data Link Layer", "Transport Layer", "Network Layer", "Session Layer"],
    correct:     2,
    explanation: "The Network Layer (Layer 3) handles routing, addressing (IP), and forwarding of packets across networks.",
    difficulty:  "Medium",
    xp:          15,
  },
  {
    id:          7,
    subject:     "Mathematics",
    topic:       "Calculus",
    text:        "What is the derivative of sin(x) with respect to x?",
    options:     ["–cos(x)", "cos(x)", "tan(x)", "–sin(x)"],
    correct:     1,
    explanation: "The derivative of sin(x) is cos(x). This is one of the fundamental trigonometric derivatives.",
    difficulty:  "Easy",
    xp:          10,
  },
  {
    id:          8,
    subject:     "Physics",
    topic:       "Electricity",
    text:        "In a parallel circuit with two resistors R₁ and R₂, the equivalent resistance is:",
    options:     ["R₁ + R₂", "R₁ × R₂ / (R₁ + R₂)", "R₁ – R₂", "(R₁ + R₂) / 2"],
    correct:     1,
    explanation: "For parallel resistors: 1/R_eq = 1/R₁ + 1/R₂, which gives R_eq = (R₁ × R₂) / (R₁ + R₂).",
    difficulty:  "Medium",
    xp:          15,
  },
  {
    id:          9,
    subject:     "DSA",
    topic:       "Trees",
    text:        "What is the height of a balanced binary search tree with n nodes?",
    options:     ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
    correct:     1,
    explanation: "A balanced BST with n nodes has height O(log n). This is why search, insertion, and deletion are all O(log n).",
    difficulty:  "Medium",
    xp:          15,
  },
  {
    id:          10,
    subject:     "Chemistry",
    topic:       "Chemical Bonding",
    text:        "What type of bond is formed between Na and Cl in NaCl?",
    options:     ["Covalent Bond", "Ionic Bond", "Hydrogen Bond", "Metallic Bond"],
    correct:     1,
    explanation: "NaCl (table salt) is formed by ionic bonding — sodium loses one electron to chlorine. The electrostatic attraction between Na⁺ and Cl⁻ forms the ionic bond.",
    difficulty:  "Easy",
    xp:          10,
  },
];

/* ─── Subject filters ─────────────────────────────────────────────────────── */
const SUBJECTS = [
  { label: "All Subjects", value: "all"           },
  { label: "Mathematics",  value: "Mathematics"   },
  { label: "Physics",      value: "Physics"       },
  { label: "Chemistry",    value: "Chemistry"     },
  { label: "Biology",      value: "Biology"       },
  { label: "DSA",          value: "DSA"           },
  { label: "Networks",     value: "Computer Networks" },
] as const;

type QuizPhase = "setup" | "active" | "result";

/* ─── Page Component ─────────────────────────────────────────────────────── */
export default function QuizPracticePage() {
  const [phase,           setPhase]           = useState<QuizPhase>("setup");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [questionIndex,   setQuestionIndex]   = useState(0);
  const [answers,         setAnswers]         = useState<(number | null)[]>([]);
  const [selected,        setSelected]        = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeLeft,        setTimeLeft]        = useState(30);
  const [totalXp,         setTotalXp]         = useState(0);

  /* ── Filter questions by subject ──────────────────────────────── */
  const questions = QUESTIONS.filter((q) =>
    selectedSubject === "all" || q.subject === selectedSubject
  );
  const current = questions[questionIndex];

  /* ── Timer ────────────────────────────────────────────────────── */
  useEffect(() => {
    if (phase !== "active" || showExplanation || selected !== null) return;
    if (timeLeft <= 0) {
      handleSelect(-1); // Auto-submit as wrong on timeout
      return;
    }
    const t = setTimeout(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, timeLeft, showExplanation, selected]);

  /* ── Handle answer selection ──────────────────────────────────── */
  const handleSelect = useCallback((optionIdx: number) => {
    if (selected !== null || !current) return;
    setSelected(optionIdx);
    setShowExplanation(true);
    const isCorrect = optionIdx === current.correct;
    if (isCorrect) setTotalXp((p) => p + current.xp);
  }, [selected, current]);

  /* ── Next question ────────────────────────────────────────────── */
  const handleNext = () => {
    setAnswers((prev) => {
      const next = [...prev];
      next[questionIndex] = selected;
      return next;
    });
    if (questionIndex + 1 >= questions.length) {
      setPhase("result");
    } else {
      setQuestionIndex((i) => i + 1);
      setSelected(null);
      setShowExplanation(false);
      setTimeLeft(30);
    }
  };

  /* ── Start quiz ───────────────────────────────────────────────── */
  const startQuiz = () => {
    setQuestionIndex(0);
    setAnswers([]);
    setSelected(null);
    setShowExplanation(false);
    setTimeLeft(30);
    setTotalXp(0);
    setPhase("active");
  };

  /* ── Restart ──────────────────────────────────────────────────── */
  const restart = () => {
    setPhase("setup");
  };

  /* ── Correct answers count ────────────────────────────────────── */
  const correctCount = answers.filter((a, i) => a === questions[i]?.correct).length;

  /* ── Render ───────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen pb-20">

      {/* ── Setup Phase ─────────────────────────────────────────── */}
      {phase === "setup" && (
        <div>
          <section className="border-b bg-gradient-to-b from-brand-950/5 to-background py-14">
            <div className="container px-4 md:px-6 max-w-2xl">
              <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-5">
                <Link href="/practice" className="hover:text-foreground">Practice</Link>
                <span>/</span>
                <span className="text-foreground font-medium">Quiz</span>
              </nav>
              <Badge variant="secondary" className="mb-3">Adaptive Quiz</Badge>
              <h1 className="text-3xl font-extrabold mb-4">🧠 Practice Quiz</h1>
              <p className="text-muted-foreground mb-8">
                10 questions, 30 seconds each. Get instant explanations and earn XP.
              </p>

              {/* Subject selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3">Choose Subject</label>
                <div className="flex flex-wrap gap-2">
                  {SUBJECTS.map((s) => (
                    <button key={s.value} onClick={() => setSelectedSubject(s.value)}
                      className={`rounded-xl border px-3 py-1.5 text-sm font-medium transition-all ${
                        selectedSubject === s.value ? "bg-brand-500 text-white border-brand-500" : "hover:bg-muted"
                      }`}>
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border bg-muted/40 p-4 mb-6 text-sm text-muted-foreground">
                <Brain className="h-5 w-5 text-brand-500" />
                <div>
                  <strong className="text-foreground">{questions.length} questions</strong> available for
                  {" "}<strong className="text-foreground">{SUBJECTS.find((s) => s.value === selectedSubject)?.label}</strong>
                </div>
              </div>

              <Button variant="gradient" size="lg" onClick={startQuiz} className="w-full sm:w-auto gap-2">
                <Zap className="h-4 w-4" /> Start Quiz
              </Button>
            </div>
          </section>
        </div>
      )}

      {/* ── Active Quiz Phase ───────────────────────────────────── */}
      {phase === "active" && current && (
        <div className="container px-4 md:px-6 py-10 max-w-2xl">
          {/* Progress bar + meta */}
          <div className="flex items-center justify-between mb-3 text-sm text-muted-foreground">
            <span>Question {questionIndex + 1} of {questions.length}</span>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span className={timeLeft <= 5 ? "text-red-500 font-bold" : ""}>{timeLeft}s</span>
            </div>
          </div>
          <Progress value={((questionIndex + 1) / questions.length) * 100} className="h-2 mb-8" />

          <AnimatePresence mode="wait">
            <motion.div key={questionIndex} initial={{ opacity: 0.01, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              {/* Question header */}
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">{current.subject}</Badge>
                <Badge variant="outline" className={`text-xs ${current.difficulty === "Easy" ? "text-green-600 border-green-400/40" : current.difficulty === "Medium" ? "text-yellow-600 border-yellow-400/40" : "text-red-600 border-red-400/40"}`}>
                  {current.difficulty}
                </Badge>
                <Badge variant="outline" className="text-xs text-brand-500 border-brand-400/40">+{current.xp} XP</Badge>
              </div>

              {/* Question text */}
              <h2 className="text-xl font-semibold mb-6 leading-relaxed">{current.text}</h2>

              {/* Options */}
              <div className="flex flex-col gap-3 mb-6">
                {current.options.map((option, idx) => {
                  const isSelected = selected === idx;
                  const isCorrect  = idx === current.correct;
                  const showResult = selected !== null;
                  return (
                    <button key={idx} onClick={() => handleSelect(idx)} disabled={selected !== null}
                      className={`w-full text-left rounded-xl border p-4 text-sm font-medium transition-all ${
                        showResult && isCorrect  ? "border-green-500 bg-green-500/10 text-green-700 dark:text-green-400" :
                        showResult && isSelected ? "border-red-500 bg-red-500/10 text-red-700 dark:text-red-400" :
                        !showResult              ? "hover:border-brand-500/40 hover:bg-muted cursor-pointer" :
                        "opacity-50"
                      }`}>
                      <div className="flex items-center gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="flex-1">{option}</span>
                        {showResult && isCorrect  && <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />}
                        {showResult && isSelected && !isCorrect && <XCircle className="h-4 w-4 text-red-500 shrink-0" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {showExplanation && (
                <motion.div initial={{ opacity: 0.01, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border bg-muted/50 p-4 mb-6 text-sm">
                  <p className="font-semibold mb-1">Explanation</p>
                  <p className="text-muted-foreground">{current.explanation}</p>
                </motion.div>
              )}

              {selected !== null && (
                <Button variant="gradient" onClick={handleNext} className="w-full gap-2">
                  {questionIndex + 1 < questions.length ? "Next Question" : "See Results"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* ── Result Phase ────────────────────────────────────────── */}
      {phase === "result" && (
        <div className="container px-4 md:px-6 py-16 max-w-xl">
          <motion.div initial={{ opacity: 0.01, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
            <div className="text-6xl mb-4">{correctCount >= questions.length * 0.8 ? "🏆" : correctCount >= questions.length * 0.5 ? "🎯" : "📚"}</div>
            <h1 className="text-3xl font-extrabold mb-2">Quiz Complete!</h1>
            <p className="text-muted-foreground mb-8">
              You answered <strong>{correctCount} out of {questions.length}</strong> correctly
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="rounded-2xl border bg-card p-4">
                <div className="text-2xl font-bold text-green-500">{correctCount}</div>
                <div className="text-xs text-muted-foreground">Correct</div>
              </div>
              <div className="rounded-2xl border bg-card p-4">
                <div className="text-2xl font-bold text-red-500">{questions.length - correctCount}</div>
                <div className="text-xs text-muted-foreground">Wrong</div>
              </div>
              <div className="rounded-2xl border bg-card p-4">
                <div className="text-2xl font-bold text-brand-500">+{totalXp}</div>
                <div className="text-xs text-muted-foreground">XP Earned</div>
              </div>
            </div>

            <Progress value={(correctCount / questions.length) * 100} className="h-3 mb-8" />

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="gradient" onClick={startQuiz} className="gap-2">
                <RefreshCw className="h-4 w-4" /> Try Again
              </Button>
              <Button variant="outline" onClick={restart}>Change Subject</Button>
              <Button variant="outline" asChild>
                <Link href="/practice/mock-test"><Trophy className="h-4 w-4" /> Try Mock Test</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
