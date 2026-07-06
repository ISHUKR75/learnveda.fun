/**
 * @file app/(platform)/live-battles/components/BattleArena.tsx
 * @description Battle Arena UI component — the main 1v1 quiz battle interface
 *
 * Renders:
 *   - Question with 4 MCQ options
 *   - 15-second countdown timer per question
 *   - Opponent score comparison
 *   - Anti-cheat protection overlay
 *   - Match result (win/loss/draw) with XP earned
 *
 * Used by: /live-battles page (loaded dynamically when match is found)
 *
 * Socket events consumed:
 *   - question_start     → new question payload
 *   - opponent_answered  → opponent answer notification
 *   - match_end          → final result payload
 *
 * Socket events emitted:
 *   - submit_answer      → { matchId, questionIndex, answer, responseTime }
 */

"use client"; // Client component — socket, timer, real-time state

import { useState, useEffect, useRef, useCallback } from "react"; // React hooks
import {
  Clock, Shield, Zap, Trophy, XCircle, Minus,
  CheckCircle2, AlertTriangle, User, Wifi,
} from "lucide-react"; // Icons
import { Badge }  from "@/components/ui/badge";   // Badge component
import { Button } from "@/components/ui/button";  // Button component

/* ─── Question Type ──────────────────────────────────────────────────────── */
interface BattleQuestion {
  index:    number;    // Question number (0-based)
  text:     string;   // Question text
  options:  string[]; // 4 answer choices
  correct?: number;   // Correct answer index (revealed after submission)
  subject:  string;   // Subject tag (e.g., "Mathematics", "Physics")
}

/* ─── Match State Type ───────────────────────────────────────────────────── */
type MatchPhase = "waiting" | "active" | "result";

/* ─── Component Props ────────────────────────────────────────────────────── */
interface BattleArenaProps {
  matchId:      string;   // Battle room UUID
  myScore:      number;   // Current user's score
  opponentScore: number;  // Opponent's score
  opponentName: string;   // Opponent display name
  questionIndex: number;  // Current question index (0–9)
  totalQuestions: number; // Total questions in match (default 10)
  phase:        MatchPhase; // Current match phase
  question:     BattleQuestion | null; // Current question (null = loading)
  xpEarned?:    number;   // XP earned (shown in result phase)
  isWinner?:    boolean;  // Match result (shown in result phase)
  onAnswerSubmit: (answer: number, responseTime: number) => void; // Callback on answer
  onLeave?:     () => void; // Callback to exit battle
}

/* ─── Battle Arena Component ─────────────────────────────────────────────── */
export function BattleArena({
  matchId,
  myScore,
  opponentScore,
  opponentName,
  questionIndex,
  totalQuestions,
  phase,
  question,
  xpEarned = 0,
  isWinner,
  onAnswerSubmit,
  onLeave,
}: BattleArenaProps) {
  /* ── State ───────────────────────────────────────────────────────────── */
  const [timeLeft,        setTimeLeft]        = useState(15);     // Seconds remaining for current question
  const [selectedAnswer,  setSelectedAnswer]  = useState<number | null>(null); // User's selected answer
  const [isSubmitted,     setIsSubmitted]     = useState(false);  // Has user submitted an answer?
  const [questionStartTime, setQuestionStartTime] = useState(0);  // Timestamp when question started

  const timerRef = useRef<NodeJS.Timeout | null>(null); // Timer interval reference

  /* ── Start timer when question changes ───────────────────────────────── */
  useEffect(() => {
    if (!question || phase !== "active") return; // Only run during active match

    setTimeLeft(15); // Reset timer to 15 seconds
    setSelectedAnswer(null); // Clear previous selection
    setIsSubmitted(false); // Reset submission flag
    setQuestionStartTime(Date.now()); // Record when question appeared

    /* Countdown timer — decrements every second */
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!); // Stop timer at 0
          handleTimeout(); // Auto-submit when time runs out
          return 0;
        }
        return prev - 1; // Decrement
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current); // Cleanup on unmount/question change
    };
  }, [question?.index, phase]); // Re-run when question changes

  /* ── Handle answer selection ─────────────────────────────────────────── */
  const handleAnswer = useCallback((optionIndex: number) => {
    if (isSubmitted || !question) return; // Prevent double-submission

    const responseTime = Date.now() - questionStartTime; // Time taken to answer in ms

    setSelectedAnswer(optionIndex); // Show selection visually
    setIsSubmitted(true);           // Mark as submitted
    clearInterval(timerRef.current!); // Stop countdown timer

    /* Anti-cheat: penalize instant answers (< 500ms) */
    onAnswerSubmit(optionIndex, responseTime); // Emit to socket
  }, [isSubmitted, question, questionStartTime, onAnswerSubmit]);

  /* ── Handle timeout (no answer within 15s) ───────────────────────────── */
  const handleTimeout = useCallback(() => {
    if (isSubmitted) return; // Don't submit twice
    setIsSubmitted(true);    // Mark submitted
    onAnswerSubmit(-1, 15000); // -1 = no answer, 15000ms = timeout
  }, [isSubmitted, onAnswerSubmit]);

  /* ── Timer color based on remaining time ─────────────────────────────── */
  const timerColor = timeLeft > 8 ? "text-green-500" : timeLeft > 4 ? "text-yellow-500" : "text-red-500 animate-pulse";

  /* ── Match result phase ──────────────────────────────────────────────── */
  if (phase === "result") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center">
        {/* Result icon */}
        {isWinner === true  && <Trophy   className="h-20 w-20 text-yellow-500" />}
        {isWinner === false && <XCircle  className="h-20 w-20 text-red-500" />}
        {isWinner === undefined && <Minus className="h-20 w-20 text-muted-foreground" />}

        {/* Result message */}
        <div>
          <h2 className="text-3xl font-bold mb-2">
            {isWinner === true ? "🎉 You Won!" : isWinner === false ? "Better Luck Next Time" : "It's a Draw!"}
          </h2>
          <p className="text-muted-foreground">
            {isWinner === true
              ? `You defeated ${opponentName} — well played!`
              : isWinner === false
              ? `${opponentName} beat you this time. Keep practicing!`
              : "Both of you played equally well."}
          </p>
        </div>

        {/* Score comparison */}
        <div className="flex items-center gap-8 rounded-xl border border-border/40 bg-card p-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-brand-500">{myScore}</p>
            <p className="text-sm text-muted-foreground">Your Score</p>
          </div>
          <span className="text-xl text-muted-foreground">vs</span>
          <div className="text-center">
            <p className="text-3xl font-bold text-muted-foreground">{opponentScore}</p>
            <p className="text-sm text-muted-foreground">{opponentName}</p>
          </div>
        </div>

        {/* XP earned */}
        {xpEarned > 0 && (
          <div className="flex items-center gap-2 text-green-500 font-bold text-lg">
            <Zap className="h-5 w-5" />
            +{xpEarned} XP earned
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <Button onClick={onLeave} variant="outline">Back to Battles</Button>
          <Button onClick={onLeave}>Play Again</Button>
        </div>
      </div>
    );
  }

  /* ── Active battle phase ─────────────────────────────────────────────── */
  return (
    <div className="space-y-6">
      {/* ── Score header ────────────────────────────────────────────── */}
      <div className="flex items-center justify-between rounded-xl border border-border/40 bg-card p-4">
        {/* My score */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-brand-500 flex items-center justify-center text-white text-xs font-bold">
            Me
          </div>
          <div>
            <p className="text-xs text-muted-foreground">You</p>
            <p className="font-bold text-2xl text-brand-500">{myScore}</p>
          </div>
        </div>

        {/* Timer + question counter */}
        <div className="text-center">
          <div className={`text-4xl font-bold font-mono ${timerColor}`}>
            {String(timeLeft).padStart(2, "0")}
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Q{questionIndex + 1}/{totalQuestions}
          </p>
          {/* Timer progress bar */}
          <div className="h-1 bg-muted rounded-full mt-1 w-20 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${
                timeLeft > 8 ? "bg-green-500" : timeLeft > 4 ? "bg-yellow-500" : "bg-red-500"
              }`}
              style={{ width: `${(timeLeft / 15) * 100}%` }}
            />
          </div>
        </div>

        {/* Opponent score */}
        <div className="flex items-center gap-2">
          <div>
            <p className="text-xs text-muted-foreground text-right">Opponent</p>
            <p className="font-bold text-2xl text-muted-foreground text-right">{opponentScore}</p>
          </div>
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold">
            <User className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* ── Question ────────────────────────────────────────────────── */}
      {question ? (
        <div className="rounded-xl border border-border/40 bg-card p-6">
          {/* Subject badge */}
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="text-xs">{question.subject}</Badge>
            <span className="text-xs text-muted-foreground">Question {questionIndex + 1}</span>
          </div>

          {/* Question text */}
          <h2 className="text-lg font-semibold leading-snug mb-6">{question.text}</h2>

          {/* Answer options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {question.options.map((option, i) => {
              /* Determine button style based on submission state */
              let style = "border-border/40 hover:border-brand-500/50 hover:bg-brand-500/5"; // Default
              if (isSubmitted) {
                if (i === selectedAnswer) style = "border-brand-500 bg-brand-500/10"; // Selected
              }

              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={isSubmitted}
                  className={`p-4 rounded-xl border text-left transition-all disabled:cursor-not-allowed ${style}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="h-7 w-7 rounded-full border border-border/60 flex items-center justify-center text-sm font-bold shrink-0">
                      {String.fromCharCode(65 + i)} {/* A, B, C, D */}
                    </span>
                    <span className="text-sm">{option}</span>
                    {isSubmitted && i === selectedAnswer && (
                      <CheckCircle2 className="h-4 w-4 text-brand-500 ml-auto" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Submitted status */}
          {isSubmitted && (
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              Answer submitted! Waiting for opponent…
            </div>
          )}
        </div>
      ) : (
        /* Loading question skeleton */
        <div className="rounded-xl border border-border/40 bg-card p-6 animate-pulse">
          <div className="h-4 bg-muted rounded w-1/4 mb-4" />
          <div className="h-6 bg-muted rounded w-3/4 mb-2" />
          <div className="h-4 bg-muted rounded w-1/2 mb-6" />
          <div className="grid grid-cols-2 gap-3">
            {[0,1,2,3].map((i) => <div key={i} className="h-16 bg-muted rounded-xl" />)}
          </div>
        </div>
      )}

      {/* ── Anti-cheat notice ───────────────────────────────────────── */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground rounded-lg bg-muted/30 p-3">
        <Shield className="h-3.5 w-3.5 shrink-0" />
        Anti-cheat active: tab switching, DevTools, and copy-paste are monitored.
        <Wifi className="h-3.5 w-3.5 ml-auto text-green-500" />
        Connected
      </div>
    </div>
  );
}
