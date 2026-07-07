/**
 * @file features/test-center/components/question-panel/QuestionPanel.tsx
 * @description MCQ question display panel for mock tests and practice sessions
 *
 * Features:
 * - Question text with KaTeX math support
 * - 4 answer options (A–D) with selection feedback
 * - Navigation: Previous / Next / Mark for Review
 * - Question palette (mini overview of all questions)
 * - Marks awarded / negative marking display
 *
 * Used in: Active test page, Practice MCQ sessions
 */

"use client"; // Client component — interactive quiz state

import React, { useState } from "react"; // React + state
import { motion, AnimatePresence } from "framer-motion"; // Option animations
import { ChevronLeft, ChevronRight, Flag, CheckCircle2, Circle } from "lucide-react"; // Icons
import { Button } from "@/components/ui/button"; // CTA buttons
import { Badge }  from "@/components/ui/badge";  // Status badges

/* ─── Types ──────────────────────────────────────────────────────────────── */

/** A single MCQ question */
export interface MCQQuestion {
  id:       string;   // Unique question ID
  number:   number;   // Display number (1-based)
  text:     string;   // Question text (may contain LaTeX via $...$ delimiters)
  options:  string[]; // Array of 4 answer options (A, B, C, D)
  subject:  string;   // Subject name (e.g., "Physics")
  marks:    number;   // Marks for correct answer
  negative: number;   // Marks deducted for wrong answer (0 = no negative marking)
}

/** Status of each question in the palette */
type QuestionStatus = "unanswered" | "answered" | "review" | "answered-review";

/* ─── Option labels A–D ──────────────────────────────────────────────────── */
const OPTION_LABELS = ["A", "B", "C", "D"]; // Option prefix labels

/* ─── Palette status colors ──────────────────────────────────────────────── */
const STATUS_COLORS: Record<QuestionStatus, string> = {
  unanswered:       "bg-muted text-muted-foreground border",       // Not yet answered
  answered:         "bg-green-500 text-white border-green-500",    // Answered
  review:           "bg-orange-400 text-white border-orange-400",  // Marked for review
  "answered-review":"bg-purple-500 text-white border-purple-500",  // Answered + marked
};

/* ─── Demo questions for development ─────────────────────────────────────── */
// In production: fetched from /api/questions?testId=xxx
const DEMO_QUESTIONS: MCQQuestion[] = [
  {
    id: "q1", number: 1, marks: 4, negative: -1, subject: "Physics",
    text: "A body of mass 2 kg is acted upon by a force of 4 N. What is the acceleration produced?",
    options: ["1 m/s²", "2 m/s²", "4 m/s²", "8 m/s²"],
  },
  {
    id: "q2", number: 2, marks: 4, negative: -1, subject: "Mathematics",
    text: "If α and β are the zeroes of the polynomial p(x) = 2x² - 7x + 3, find α + β.",
    options: ["7/2", "3/2", "−7/2", "−3/2"],
  },
  {
    id: "q3", number: 3, marks: 4, negative: -1, subject: "Chemistry",
    text: "Which of the following is NOT a physical change?",
    options: [
      "Melting of ice",
      "Boiling of water",
      "Rusting of iron",
      "Dissolving sugar in water",
    ],
  },
];

/* ─── QuestionPanel Component ────────────────────────────────────────────── */

/**
 * Renders the main MCQ question panel with navigation and answer selection.
 *
 * @param questions - Array of MCQ questions for this session
 * @param onSubmit  - Called when student submits the test
 */
export function QuestionPanel({
  questions = DEMO_QUESTIONS,
  onSubmit,
}: {
  questions?: MCQQuestion[];
  onSubmit?:  (answers: Record<string, number>) => void;
}) {
  // Current question index (0-based)
  const [currentIndex, setCurrentIndex] = useState(0);

  // Map from question ID → selected option index (0–3), or -1 if unanswered
  const [answers, setAnswers] = useState<Record<string, number>>({});

  // Map from question ID → whether it's marked for review
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});

  const question = questions[currentIndex]; // Currently displayed question

  /** Get the display status of a question for the palette */
  function getStatus(q: MCQQuestion): QuestionStatus {
    const answered = answers[q.id] !== undefined; // Has an answer been selected?
    const review   = markedForReview[q.id];       // Is it marked for review?
    if (answered && review)  return "answered-review"; // Both
    if (answered)            return "answered";         // Just answered
    if (review)              return "review";           // Just marked
    return "unanswered";                               // Default
  }

  /** Select an answer option for the current question */
  function handleSelect(optionIndex: number) {
    setAnswers(prev => ({ ...prev, [question.id]: optionIndex }));
  }

  /** Toggle the 'mark for review' state for the current question */
  function toggleReview() {
    setMarkedForReview(prev => ({ ...prev, [question.id]: !prev[question.id] }));
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

      {/* ── Main Question Panel ─────────────────────────────────────── */}
      <div className="lg:col-span-2 rounded-2xl border bg-card p-6 shadow-sm">

        {/* Question header: number + subject + marks */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-foreground">
              Q{question.number} of {questions.length}
            </span>
            <Badge variant="secondary" className="text-xs">{question.subject}</Badge>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="text-green-600">+{question.marks}</span>
            {question.negative < 0 && <span className="text-red-600">{question.negative}</span>}
          </div>
        </div>

        {/* Question text */}
        <p className="text-foreground leading-relaxed mb-6 text-base">
          {question.text}
        </p>

        {/* Answer options */}
        <div className="space-y-3">
          {question.options.map((option, i) => {
            const isSelected = answers[question.id] === i; // Is this option selected?
            return (
              <button
                key={i}
                onClick={() => handleSelect(i)} // Select this option
                className={`w-full flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? "border-brand-500 bg-brand-500/10 text-brand-600" // Selected state
                    : "border-border hover:border-brand-500/50 hover:bg-muted/60" // Default
                }`}
              >
                {/* Option letter label */}
                <span className={`flex-shrink-0 flex h-7 w-7 items-center justify-center rounded-lg text-sm font-bold ${
                  isSelected ? "bg-brand-500 text-white" : "bg-muted text-muted-foreground"
                }`}>
                  {OPTION_LABELS[i]}
                </span>
                {/* Option text */}
                <span className="text-sm flex-1">{option}</span>
                {/* Check icon if selected */}
                {isSelected && <CheckCircle2 className="h-4 w-4 text-brand-500 flex-shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t">
          {/* Previous button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentIndex(i => Math.max(0, i - 1))}
            disabled={currentIndex === 0}
            className="gap-1"
          >
            <ChevronLeft className="h-4 w-4" /> Previous
          </Button>

          {/* Mark for review + next */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleReview}
              className={`gap-1 ${markedForReview[question.id] ? "border-orange-500 text-orange-500" : ""}`}
            >
              <Flag className="h-3.5 w-3.5" />
              {markedForReview[question.id] ? "Unmark" : "Mark Review"}
            </Button>

            {currentIndex < questions.length - 1 ? (
              <Button
                size="sm"
                onClick={() => setCurrentIndex(i => Math.min(questions.length - 1, i + 1))}
                className="gap-1"
              >
                Next <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={() => onSubmit?.(answers)}
                className="bg-green-600 hover:bg-green-700 gap-1"
              >
                <CheckCircle2 className="h-4 w-4" /> Submit Test
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* ── Question Palette Sidebar ────────────────────────────────── */}
      <div className="rounded-2xl border bg-card p-5 shadow-sm h-fit">
        <h3 className="font-semibold text-foreground mb-3 text-sm">Question Palette</h3>

        {/* Grid of question number buttons */}
        <div className="grid grid-cols-5 gap-1.5 mb-4">
          {questions.map((q, i) => (
            <button
              key={q.id}
              onClick={() => setCurrentIndex(i)} // Jump to question
              className={`h-8 w-8 rounded-lg text-xs font-semibold border transition-all hover:scale-105 ${
                i === currentIndex
                  ? "ring-2 ring-brand-500 ring-offset-1" // Active question outline
                  : ""
              } ${STATUS_COLORS[getStatus(q)]}`}
            >
              {q.number}
            </button>
          ))}
        </div>

        {/* Legend */}
        <div className="space-y-1.5 text-xs text-muted-foreground">
          {(["unanswered", "answered", "review", "answered-review"] as QuestionStatus[]).map((status) => (
            <div key={status} className="flex items-center gap-2">
              <div className={`h-4 w-4 rounded border ${STATUS_COLORS[status]}`} />
              <span className="capitalize">{status.replace("-", " + ")}</span>
            </div>
          ))}
        </div>

        {/* Summary counts */}
        <div className="mt-4 pt-3 border-t space-y-1 text-xs">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Answered</span>
            <span className="font-semibold text-green-600">{Object.keys(answers).length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Unanswered</span>
            <span className="font-semibold text-muted-foreground">
              {questions.length - Object.keys(answers).length}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">For Review</span>
            <span className="font-semibold text-orange-600">
              {Object.values(markedForReview).filter(Boolean).length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
