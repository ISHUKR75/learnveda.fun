/**
 * @file features/test-center/components/MockTestEngine.tsx
 * @description Core mock test engine for LearnVeda Test Center
 * @purpose Full-featured timed MCQ test with timer, navigation, review, and results
 * @used-by JEE, NEET, CBSE, GATE, and programming test pages
 *
 * Features:
 *  - Countdown timer (per-question or per-test)
 *  - Question navigation panel (visited / answered / review states)
 *  - Answer selection with optimistic UI
 *  - Review mode before final submission
 *  - Detailed result analysis with explanation
 *  - Score chart (correct / wrong / unattempted)
 */

"use client"; // Full client component — timer + state machine

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence }   from "framer-motion";
import {
  Clock, ChevronLeft, ChevronRight, Flag, CheckCircle2,
  XCircle, AlertTriangle, BarChart2, BookOpen, Share2,
  RotateCcw, Home, Eye, EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge }  from "@/components/ui/badge";
import { cn }     from "@/lib/utils";

/* ─── Question Type ──────────────────────────────────────────────────────── */
export interface TestQuestion {
  id:          string;         // Unique question ID
  text:        string;         // Question text (supports KaTeX math)
  options:     string[];       // 4 options
  correctIndex: number;        // 0-based correct option index
  explanation: string;         // Explanation shown after answering
  subject:     string;         // e.g. "Physics", "Mathematics"
  chapter:     string;         // e.g. "Kinematics"
  difficulty:  "easy" | "medium" | "hard"; // Difficulty tag
  marks:       number;         // Marks for correct (+4 for JEE)
  negMarks:    number;         // Negative marks (-1 for JEE)
}

/* ─── Answer State per Question ──────────────────────────────────────────── */
type QuestionStatus =
  | "unattempted"    // Not visited
  | "answered"       // Selected an answer
  | "marked-review"  // Flagged for review (no answer)
  | "answered-review"// Flagged + answered
  | "visited";       // Seen but no answer selected

interface AnswerState {
  selectedIndex: number | null; // Which option is selected (null = none)
  status:        QuestionStatus;
}

/* ─── MockTestEngine Props ───────────────────────────────────────────────── */
interface MockTestEngineProps {
  testId:     string;           // Unique test identifier
  title:      string;           // Test display title
  questions:  TestQuestion[];   // Full question bank for this test
  totalTime:  number;           // Total test duration in seconds
  onFinish?:  (score: number, answers: AnswerState[]) => void; // Callback on submit
}

/* ─── Score Calculation ──────────────────────────────────────────────────── */
function calculateScore(questions: TestQuestion[], answers: AnswerState[]) {
  let score    = 0;   // Total score
  let correct  = 0;   // Correct count
  let wrong    = 0;   // Wrong count
  let skipped  = 0;   // Unattempted count

  questions.forEach((q, i) => {
    const sel = answers[i]?.selectedIndex;
    if (sel === null || sel === undefined) {
      skipped++;                                   // No answer selected
    } else if (sel === q.correctIndex) {
      score   += q.marks;                          // Add marks for correct
      correct++;
    } else {
      score   -= q.negMarks;                       // Subtract for wrong
      wrong++;
    }
  });

  return { score, correct, wrong, skipped, total: questions.length };
}

/* ─── Format Seconds as MM:SS ────────────────────────────────────────────── */
function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

/* ─── MockTestEngine Component ───────────────────────────────────────────── */
export function MockTestEngine({
  testId,
  title,
  questions,
  totalTime,
  onFinish,
}: MockTestEngineProps) {

  /* ── Core State ──────────────────────────────────────────────────── */
  const [currentQ,    setCurrentQ]    = useState(0);                    // Current question index
  const [answers,     setAnswers]     = useState<AnswerState[]>(        // Per-question answers
    () => questions.map(() => ({ selectedIndex: null, status: "unattempted" }))
  );
  const [timeLeft,    setTimeLeft]    = useState(totalTime);            // Seconds remaining
  const [phase,       setPhase]       = useState<"test" | "review" | "result">("test");
  const [showPanel,   setShowPanel]   = useState(true);                 // Nav panel visibility
  const timerRef = useRef<NodeJS.Timeout | null>(null);                 // Timer ref for cleanup

  /* ── Timer ───────────────────────────────────────────────────────── */
  useEffect(() => {
    if (phase !== "test") return;                                        // Only run during test
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!);                             // Stop timer
          setPhase("result");                                           // Auto-submit when time up
          return 0;
        }
        return t - 1;                                                   // Decrement each second
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);                      // Cleanup on unmount
  }, [phase]);

  /* ── Select an answer ─────────────────────────────────────────────── */
  const selectAnswer = useCallback((optionIndex: number) => {
    if (phase !== "test") return;                                        // Locked in review/result
    setAnswers((prev) => {
      const next = [...prev];
      const cur  = next[currentQ];
      next[currentQ] = {
        selectedIndex: optionIndex,                                      // Record selection
        status: cur.status === "marked-review" || cur.status === "answered-review"
          ? "answered-review"                                            // Keep review flag if set
          : "answered",
      };
      return next;
    });
  }, [currentQ, phase]);

  /* ── Toggle review flag ──────────────────────────────────────────── */
  const toggleReview = useCallback(() => {
    setAnswers((prev) => {
      const next = [...prev];
      const cur  = next[currentQ];
      next[currentQ] = {
        ...cur,
        status: cur.status === "answered-review" ? "answered"
               : cur.status === "marked-review"  ? "unattempted"
               : cur.status === "answered"        ? "answered-review"
               : "marked-review",
      };
      return next;
    });
  }, [currentQ]);

  /* ── Navigate to next/prev question ─────────────────────────────── */
  const goNext = () => {
    if (currentQ < questions.length - 1) {
      // Mark as visited if unattempted
      setAnswers((prev) => {
        const next = [...prev];
        if (next[currentQ + 1].status === "unattempted") {
          next[currentQ + 1] = { ...next[currentQ + 1], status: "visited" };
        }
        return next;
      });
      setCurrentQ((q) => q + 1);
    }
  };

  const goPrev = () => {
    if (currentQ > 0) setCurrentQ((q) => q - 1);
  };

  /* ── Submit test ─────────────────────────────────────────────────── */
  const submitTest = () => {
    clearInterval(timerRef.current!);                                   // Stop timer
    setPhase("result");                                                  // Show results
    const result = calculateScore(questions, answers);
    onFinish?.(result.score, answers);                                  // Notify parent
  };

  /* ── Status colors for navigation panel ─────────────────────────── */
  const statusColor = (status: QuestionStatus, isCurrent: boolean) => {
    if (isCurrent) return "bg-brand-500 text-white border-brand-500";
    switch (status) {
      case "answered":       return "bg-emerald-500 text-white border-emerald-500";
      case "answered-review":return "bg-purple-500 text-white border-purple-500";
      case "marked-review":  return "bg-amber-500 text-white border-amber-500";
      case "visited":        return "bg-red-500/20 text-red-600 border-red-500/30";
      default:               return "bg-muted text-muted-foreground border-border";
    }
  };

  /* ── Computed stats for display ──────────────────────────────────── */
  const stats = calculateScore(questions, answers);                      // Live score stats
  const isLastQuestion = currentQ === questions.length - 1;

  /* ── RESULT PHASE ─────────────────────────────────────────────────── */
  if (phase === "result") {
    const percentage = Math.max(0, (stats.score / (questions.length * (questions[0]?.marks ?? 1))) * 100);

    return (
      <div className="min-h-screen bg-background">
        <div className="container px-4 py-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0.01, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-10"
          >
            <div className={cn(
              "inline-flex h-24 w-24 items-center justify-center rounded-full mb-4 text-4xl font-bold",
              percentage >= 70 ? "bg-emerald-500/20 text-emerald-600" : "bg-red-500/20 text-red-600",
            )}>
              {Math.round(percentage)}%
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              {percentage >= 70 ? "Great Performance! 🎉" : "Keep Practicing! 💪"}
            </h1>
            <p className="text-muted-foreground">Test completed — {title}</p>
          </motion.div>

          {/* Score breakdown */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Score",       value: stats.score,   color: "text-foreground"     },
              { label: "Correct",     value: stats.correct, color: "text-emerald-600"     },
              { label: "Wrong",       value: stats.wrong,   color: "text-red-600"         },
              { label: "Unattempted", value: stats.skipped, color: "text-muted-foreground"},
            ].map((s) => (
              <div key={s.label} className="rounded-xl border bg-card p-5 text-center">
                <div className={cn("text-3xl font-bold mb-1", s.color)}>{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Per-question review */}
          <div className="space-y-4 mb-8">
            <h2 className="text-lg font-bold text-foreground">Question Review</h2>
            {questions.map((q, i) => {
              const sel     = answers[i]?.selectedIndex;
              const correct = q.correctIndex;
              const isCorrect = sel === correct;
              const skipped  = sel === null || sel === undefined;

              return (
                <div key={q.id} className={cn(
                  "rounded-xl border p-5",
                  isCorrect ? "border-emerald-500/30 bg-emerald-500/5"
                  : skipped  ? "border-border bg-card"
                  :            "border-red-500/30 bg-red-500/5",
                )}>
                  <div className="flex items-start gap-3 mb-3">
                    {isCorrect ? <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                     : skipped ? <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                     :           <XCircle       className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                    }
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">
                        Q{i + 1} · {q.subject} · {q.chapter}
                      </div>
                      <p className="text-foreground text-sm">{q.text}</p>
                    </div>
                  </div>
                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ml-8 mb-3">
                    {q.options.map((opt, oi) => (
                      <div key={oi} className={cn(
                        "rounded-lg border px-3 py-2 text-sm",
                        oi === correct ? "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                        : oi === sel && !isCorrect ? "border-red-500 bg-red-500/10 text-red-700 dark:text-red-400"
                        : "border-border text-muted-foreground",
                      )}>
                        {String.fromCharCode(65 + oi)}. {opt}
                      </div>
                    ))}
                  </div>
                  {/* Explanation */}
                  <div className="ml-8 rounded-lg bg-muted/50 border border-border px-3 py-2 text-sm text-muted-foreground">
                    <strong>Explanation:</strong> {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="outline" className="gap-2" asChild>
              <a href="/test-center"><Home className="h-4 w-4" /> Back to Test Center</a>
            </Button>
            <Button className="gap-2 bg-brand-500 hover:bg-brand-600 text-white" onClick={() => window.location.reload()}>
              <RotateCcw className="h-4 w-4" /> Retry Test
            </Button>
          </div>
        </div>
      </div>
    );
  }

  /* ── TEST / REVIEW PHASE ─────────────────────────────────────────── */
  const q = questions[currentQ];                                        // Current question
  const a = answers[currentQ];                                          // Current answer state

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* ── Top Bar ──────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-40 border-b bg-card/80 backdrop-blur-sm px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <h1 className="text-sm font-semibold text-foreground truncate">{title}</h1>
          <Badge variant="outline" className="text-xs shrink-0">
            {currentQ + 1} / {questions.length}
          </Badge>
        </div>

        <div className="flex items-center gap-3">
          {/* Timer */}
          <div className={cn(
            "flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-mono font-bold",
            timeLeft <= 300 ? "border-red-500/50 bg-red-500/10 text-red-600"   // Last 5 min: red
            : timeLeft <= 600 ? "border-amber-500/50 bg-amber-500/10 text-amber-600" // Last 10 min: amber
            : "border-border text-foreground",
          )}>
            <Clock className="h-3.5 w-3.5" />
            {formatTime(timeLeft)}
          </div>

          {/* Toggle nav panel */}
          <Button size="sm" variant="ghost" onClick={() => setShowPanel(!showPanel)}>
            {showPanel ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>

          {/* Submit button */}
          <Button
            size="sm"
            className="bg-brand-500 hover:bg-brand-600 text-white"
            onClick={() => setPhase(phase === "test" ? "review" : "result")}
          >
            {phase === "test" ? "Review" : "Submit"}
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* ── Question Area ─────────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQ}
              initial={{ opacity: 0.01, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {/* Question meta */}
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="outline" className="text-xs">{q.subject}</Badge>
                <Badge variant="outline" className="text-xs">{q.chapter}</Badge>
                <Badge variant="outline" className={cn("text-xs",
                  q.difficulty === "hard"   ? "border-red-500/30 text-red-600"
                  : q.difficulty === "medium"? "border-amber-500/30 text-amber-600"
                  : "border-emerald-500/30 text-emerald-600",
                )}>
                  {q.difficulty}
                </Badge>
                <span className="text-xs text-muted-foreground ml-auto">
                  +{q.marks} / -{q.negMarks}
                </span>
              </div>

              {/* Question text */}
              <div className="text-foreground text-base md:text-lg leading-relaxed mb-6 p-4 rounded-xl bg-card border border-border">
                <span className="font-semibold text-muted-foreground mr-2">Q{currentQ + 1}.</span>
                {q.text}
              </div>

              {/* Options */}
              <div className="space-y-3">
                {q.options.map((opt, oi) => (
                  <button
                    key={oi}
                    onClick={() => selectAnswer(oi)}
                    disabled={phase === "review"}
                    className={cn(
                      "w-full text-left rounded-xl border px-4 py-3.5 text-sm transition-all",
                      "flex items-center gap-3 hover:border-brand-500/50",
                      a.selectedIndex === oi
                        ? "border-brand-500 bg-brand-500/10 text-foreground"
                        : "border-border bg-card text-foreground hover:bg-muted/30",
                    )}
                  >
                    <span className={cn(
                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold",
                      a.selectedIndex === oi
                        ? "border-brand-500 bg-brand-500 text-white"
                        : "border-border text-muted-foreground",
                    )}>
                      {String.fromCharCode(65 + oi)}
                    </span>
                    {opt}
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between mt-8 pt-4 border-t border-border">
            <Button variant="outline" onClick={goPrev} disabled={currentQ === 0} className="gap-1">
              <ChevronLeft className="h-4 w-4" /> Previous
            </Button>

            <Button
              variant="ghost"
              onClick={toggleReview}
              className={cn("gap-2", (a.status === "marked-review" || a.status === "answered-review") ? "text-amber-600" : "text-muted-foreground")}
            >
              <Flag className="h-4 w-4" />
              {(a.status === "marked-review" || a.status === "answered-review") ? "Unmark" : "Mark for Review"}
            </Button>

            <Button onClick={isLastQuestion ? () => setPhase("review") : goNext} className="gap-1 bg-brand-500 hover:bg-brand-600 text-white">
              {isLastQuestion ? "Review All" : "Next"} <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* ── Question Navigation Panel ─────────────────────────────── */}
        {showPanel && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            className="w-56 border-l bg-card overflow-y-auto p-4 hidden md:block"
          >
            <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-3">Questions</h3>

            {/* Legend */}
            <div className="space-y-1 mb-4">
              {[
                { color: "bg-emerald-500", label: "Answered"       },
                { color: "bg-purple-500",  label: "Ans + Review"   },
                { color: "bg-amber-500",   label: "Marked Review"  },
                { color: "bg-red-500/20",  label: "Visited"        },
                { color: "bg-muted",       label: "Unattempted"    },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className={cn("h-3 w-3 rounded-sm", l.color)} /> {l.label}
                </div>
              ))}
            </div>

            {/* Number grid */}
            <div className="grid grid-cols-5 gap-1.5">
              {questions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentQ(i)}
                  className={cn(
                    "h-8 w-8 rounded-lg border text-xs font-medium transition-all",
                    statusColor(answers[i].status, i === currentQ),
                  )}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            {/* Live summary */}
            <div className="mt-4 pt-4 border-t border-border space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Answered</span>
                <span className="font-medium text-emerald-600">{stats.correct + stats.wrong}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Unattempted</span>
                <span className="font-medium text-muted-foreground">{stats.skipped}</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
