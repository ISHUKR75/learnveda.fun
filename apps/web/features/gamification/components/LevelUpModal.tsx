/**
 * @file features/gamification/components/LevelUpModal.tsx
 * @description Level-up celebration modal for LearnVeda
 * @purpose Shown when a user crosses an XP threshold and levels up
 * @used-by XP store listener, post-lesson/quiz completion flow
 *
 * Features:
 *  - 200-piece confetti burst in brand colors
 *  - Animated level badge with tier-based gradient
 *  - XP gain summary
 *  - Share button (copy to clipboard)
 */

"use client"; // Client component — confetti + portal rendering

import React, { useEffect, useRef } from "react";             // React core
import { motion, AnimatePresence } from "framer-motion";       // Modal + badge animations
import { Zap, Star, Share2, X, ChevronRight, Trophy } from "lucide-react"; // Icons
import { Button } from "@/components/ui/button";               // UI button
import { cn }     from "@/lib/utils";                         // Class merger
import { getTier }from "./XPBar";                             // Tier helper (re-used)

/* ─── Confetti Piece Type ─────────────────────────────────────────────────── */
interface ConfettiPiece {
  id:     number;   // Unique key
  x:      number;   // Horizontal start (vw units)
  color:  string;   // CSS color string
  size:   number;   // Size in px
  delay:  number;   // Animation delay in seconds
  rotate: number;   // Initial rotation degrees
  shape:  "rect" | "circle"; // Shape variant
}

/* ─── Brand Colors for Confetti ──────────────────────────────────────────── */
const CONFETTI_COLORS = [
  "#6366f1",   // Primary indigo
  "#f59e0b",   // Accent amber
  "#10b981",   // Success green
  "#7c3aed",   // Purple
  "#f97316",   // Orange
  "#ec4899",   // Pink
];

/* ─── Generate 200 Confetti Pieces ───────────────────────────────────────── */
function generateConfetti(count: number): ConfettiPiece[] {
  return Array.from({ length: count }, (_, i) => ({
    id:     i,
    x:      Math.random() * 100,                          // Random horizontal position
    color:  CONFETTI_COLORS[i % CONFETTI_COLORS.length],  // Cycle through brand colors
    size:   Math.random() * 8 + 4,                        // 4–12px size
    delay:  Math.random() * 0.5,                          // 0–0.5s stagger
    rotate: Math.random() * 360,                          // Random spin
    shape:  Math.random() > 0.4 ? "rect" : "circle",     // 60% rect, 40% circle
  }));
}

/* ─── LevelUpModal Props ─────────────────────────────────────────────────── */
interface LevelUpModalProps {
  /** Whether the modal is visible */
  isOpen:     boolean;
  /** The new level just reached */
  newLevel:   number;
  /** XP earned in this session (shown as "+X XP") */
  xpEarned:   number;
  /** New tier name if this level crossed a tier boundary */
  newTier?:   string;
  /** Called when user closes or continues */
  onDismiss:  () => void;
}

/* ─── LevelUpModal Component ─────────────────────────────────────────────── */
/**
 * Full-screen celebration modal that appears when the user levels up.
 * Shows confetti, animated level badge, XP summary, and share option.
 */
export function LevelUpModal({
  isOpen,
  newLevel,
  xpEarned,
  newTier,
  onDismiss,
}: LevelUpModalProps) {

  const confetti   = useRef<ConfettiPiece[]>([]);  // Stable confetti array (no re-render)
  const tier       = getTier(newLevel);             // Tier metadata for this level
  const isMaxLevel = newLevel >= 100;               // Special behavior at max level

  /* ── Generate confetti once when modal opens ─────────────────────── */
  useEffect(() => {
    if (isOpen) {
      confetti.current = generateConfetti(200);     // 200 pieces on open
    }
  }, [isOpen]);

  /* ── Share to clipboard handler ─────────────────────────────────── */
  const handleShare = async () => {
    const text = `🎉 I just reached Level ${newLevel} on LearnVeda! ${tier.name} tier — ${xpEarned} XP earned. Join me at learnveda.in`;
    try {
      await navigator.clipboard.writeText(text);  // Copy to clipboard
      // In production: show a toast notification
    } catch {
      // Clipboard not available — fallback silently
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Backdrop ─────────────────────────────────────────────── */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}               // Fade in backdrop
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onDismiss}                    // Click outside to close
          />

          {/* ── Confetti Layer ────────────────────────────────────────── */}
          <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
            {confetti.current.map((piece) => (
              <motion.div
                key={piece.id}
                className="absolute top-0"
                style={{
                  left:      `${piece.x}vw`,       // Horizontal position
                  width:     piece.size,
                  height:    piece.shape === "rect" ? piece.size * 1.5 : piece.size,
                  backgroundColor: piece.color,
                  borderRadius:    piece.shape === "circle" ? "50%" : "2px",
                  rotate:   piece.rotate,
                }}
                initial={{ y: -20, opacity: 1 }}   // Start above viewport
                animate={{
                  y:       ["0vh", "110vh"],        // Fall down past screen
                  rotate:  [piece.rotate, piece.rotate + 720], // Full spins
                  opacity: [1, 1, 0],               // Fade at bottom
                }}
                transition={{
                  duration: 2.5 + Math.random() * 1.5, // 2.5–4 second fall
                  delay:    piece.delay,
                  ease:     "linear",
                }}
              />
            ))}
          </div>

          {/* ── Modal Panel ──────────────────────────────────────────── */}
          <motion.div
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 px-4"
            initial={{ scale: 0.7, opacity: 0, y: 40 }}  // Scale up + rise
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 18, stiffness: 300 }}
          >
            <div className="rounded-3xl border bg-card shadow-2xl overflow-hidden">
              {/* ── Header gradient strip ────────────────────────────── */}
              <div className={cn(
                "h-2 w-full bg-gradient-to-r",
                tier.color,                        // Tier-specific gradient
              )} />

              <div className="p-8">
                {/* ── Close button ───────────────────────────────────── */}
                <button
                  onClick={onDismiss}
                  className="absolute top-5 right-5 rounded-full p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  aria-label="Close level up modal"
                >
                  <X className="h-4 w-4" />
                </button>

                {/* ── Title ──────────────────────────────────────────── */}
                <div className="text-center mb-6">
                  <motion.div
                    initial={{ scale: 0 }}          // Pop in from center
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 400 }}
                    className="inline-flex items-center justify-center"
                  >
                    <div className={cn(
                      "flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br border-2 mb-4",
                      tier.color, tier.border,
                    )}>
                      {/* Star icon for max level, Zap for normal */}
                      {isMaxLevel
                        ? <Star className="h-12 w-12 text-white" />
                        : <Zap  className="h-12 w-12 text-white" />
                      }
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }} // Fade up
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="text-muted-foreground text-sm font-medium mb-1 uppercase tracking-widest">
                      Level Up!
                    </div>
                    <h2 className="text-4xl font-bold text-foreground">
                      Level {newLevel}              {/* The new level number */}
                    </h2>
                    {/* New tier banner — only shown on tier change */}
                    {newTier && (
                      <div className={cn(
                        "inline-flex items-center gap-1.5 mt-2 rounded-full px-3 py-1 text-sm font-medium border",
                        tier.bg, tier.border, tier.text,
                      )}>
                        <Trophy className="h-3.5 w-3.5" />
                        You reached {newTier} tier!   {/* Tier promotion message */}
                      </div>
                    )}
                  </motion.div>
                </div>

                {/* ── XP Earned stat ─────────────────────────────────── */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-muted/50 border border-border px-5 py-4 mb-6"
                >
                  <Zap className="h-5 w-5 text-amber-500" />  {/* XP icon */}
                  <span className="text-2xl font-bold text-foreground">
                    +{xpEarned.toLocaleString()} XP            {/* XP gained */}
                  </span>
                  <span className="text-muted-foreground text-sm">earned this session</span>
                </motion.div>

                {/* ── Action buttons ─────────────────────────────────── */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  {/* Share button */}
                  <Button
                    variant="outline"
                    onClick={handleShare}
                    className="flex-1 gap-2"
                  >
                    <Share2 className="h-4 w-4" />
                    Share Achievement              {/* Copy to clipboard */}
                  </Button>

                  {/* Continue button — primary CTA */}
                  <Button
                    onClick={onDismiss}
                    className="flex-1 gap-2 bg-gradient-to-r from-brand-500 to-purple-600 text-white hover:opacity-90"
                  >
                    Continue Learning
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
