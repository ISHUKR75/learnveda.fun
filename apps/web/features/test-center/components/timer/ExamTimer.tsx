/**
 * @file features/test-center/components/timer/ExamTimer.tsx
 * @description Countdown timer component for live mock tests
 *
 * Features:
 * - Countdown from exam duration to 0
 * - Color transitions: green → yellow (25% left) → red (10% left)
 * - Warning pulse animation when under 10% time remaining
 * - Auto-callback when time runs out
 * - Pause/resume capability (for allowed breaks)
 *
 * Used in: Active test pages (when a student is taking a test)
 */

"use client"; // Client component — uses state + interval

import React, { useState, useEffect, useRef, useCallback } from "react"; // React hooks
import { motion } from "framer-motion"; // Color transition animation
import { Clock, Pause, Play } from "lucide-react"; // Timer icons
import { Badge } from "@/components/ui/badge"; // Status badge

/* ─── Types ──────────────────────────────────────────────────────────────── */

/** Props for the ExamTimer */
interface ExamTimerProps {
  totalSeconds: number;           // Total exam duration in seconds
  onTimeUp?:    () => void;       // Callback when timer reaches 0
  paused?:      boolean;          // External pause control
  showControls?:boolean;          // Whether to show pause/resume buttons
}

/* ─── Timer color thresholds ─────────────────────────────────────────────── */
// Returns a Tailwind color class based on remaining time percentage
function getTimerColor(pct: number): string {
  if (pct > 0.25) return "text-green-500";  // > 25% left — green (plenty of time)
  if (pct > 0.10) return "text-yellow-500"; // 10–25% left — yellow (getting low)
  return "text-red-500";                     // < 10% left — red (critical)
}

/* ─── Format seconds to MM:SS ────────────────────────────────────────────── */
/**
 * Converts a raw second count into a MM:SS or HH:MM:SS display string.
 *
 * @param seconds - Total seconds remaining
 * @returns Formatted time string (e.g., "1:32:45" or "45:20")
 */
function formatTime(seconds: number): string {
  if (seconds < 0) return "0:00"; // Clamp at zero

  const h = Math.floor(seconds / 3600);         // Hours
  const m = Math.floor((seconds % 3600) / 60);  // Minutes
  const s = seconds % 60;                        // Seconds

  if (h > 0) {
    // Show hours if >= 1 hour remaining
    return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }
  return `${m}:${String(s).padStart(2, "0")}`; // MM:SS for under 1 hour
}

/* ─── ExamTimer Component ────────────────────────────────────────────────── */

/**
 * Live countdown timer for exam sessions.
 * Handles pause/resume, color transitions, and time-up callback.
 *
 * @param totalSeconds  - Starting time in seconds
 * @param onTimeUp      - Called when timer reaches 0
 * @param paused        - External pause state
 * @param showControls  - Show pause/play buttons
 */
export function ExamTimer({
  totalSeconds,
  onTimeUp,
  paused = false,
  showControls = true,
}: ExamTimerProps) {

  const [remaining, setRemaining] = useState(totalSeconds); // Seconds left
  const [isPaused,  setIsPaused]  = useState(paused);      // Internal pause state
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // Interval reference for cleanup

  // Percentage of time remaining (1.0 = full, 0.0 = none)
  const pct = remaining / totalSeconds;

  // Color class based on remaining time
  const colorClass = getTimerColor(pct);

  // Whether to show the urgent pulsing animation (under 10%)
  const isUrgent = pct <= 0.10;

  /** Stop the countdown interval */
  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current); // Clear the interval
      intervalRef.current = null;
    }
  }, []);

  /** Start the countdown interval — ticks every second */
  const startTimer = useCallback(() => {
    clearTimer(); // Clear any existing interval first
    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearTimer();       // Stop when we hit 0
          onTimeUp?.();       // Call the time-up callback
          return 0;           // Clamp at 0
        }
        return prev - 1;      // Decrement by 1 second
      });
    }, 1000); // 1 second interval
  }, [clearTimer, onTimeUp]);

  // Start or stop the timer based on isPaused state
  useEffect(() => {
    if (isPaused) {
      clearTimer(); // Stop when paused
    } else {
      startTimer(); // Start when running
    }

    return clearTimer; // Cleanup on unmount
  }, [isPaused, startTimer, clearTimer]);

  // Sync internal pause state with external prop
  useEffect(() => {
    setIsPaused(paused);
  }, [paused]);

  return (
    <div className="flex items-center gap-2">
      {/* Timer display */}
      <motion.div
        animate={isUrgent ? { scale: [1, 1.03, 1] } : {}} // Pulse when urgent
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="flex items-center gap-1.5"
      >
        <Clock className={`h-4 w-4 ${colorClass}`} /> {/* Clock icon */}
        <span className={`font-mono font-bold text-lg tabular-nums ${colorClass}`}>
          {formatTime(remaining)} {/* Formatted time display */}
        </span>
      </motion.div>

      {/* Warning badge when time is running out */}
      {isUrgent && (
        <Badge variant="outline" className="border-red-500/40 text-red-600 text-xs animate-pulse">
          ⚠️ Low Time!
        </Badge>
      )}

      {/* Pause/resume controls (optional) */}
      {showControls && (
        <button
          onClick={() => setIsPaused(p => !p)} // Toggle pause state
          className="flex items-center justify-center h-7 w-7 rounded-lg border hover:bg-muted transition-colors"
          title={isPaused ? "Resume timer" : "Pause timer"}
        >
          {isPaused
            ? <Play  className="h-3.5 w-3.5 text-green-500" /> // Show play when paused
            : <Pause className="h-3.5 w-3.5 text-orange-500" />// Show pause when running
          }
        </button>
      )}

      {/* Paused indicator */}
      {isPaused && (
        <span className="text-xs text-muted-foreground italic">Paused</span>
      )}
    </div>
  );
}
