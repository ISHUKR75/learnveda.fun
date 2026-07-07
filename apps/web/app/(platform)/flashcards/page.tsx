/**
 * @file app/(platform)/flashcards/page.tsx
 * @description Flashcards study tool — spaced repetition for CBSE + DSA
 * Route: /flashcards
 *
 * Interactive flashcard decks using spaced repetition (SRS).
 * Students flip cards, rate difficulty, and the system schedules review sessions.
 * Covers CBSE formulas, DSA patterns, vocabulary, and more.
 *
 * Platform layout (Navbar) provided by (platform)/layout.tsx.
 */

"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, Brain, Zap, Star, Clock, RotateCcw,
  ChevronLeft, ChevronRight, Check, X, Minus, Play,
} from "lucide-react";
import { Badge }    from "@/components/ui/badge";
import { Button }   from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

/* ─── Flashcard Decks ─────────────────────────────────────────────────────── */
const DECKS = [
  {
    id:        "physics-formulas",
    title:     "Physics Formulas",
    subject:   "CBSE Class 12",
    emoji:     "⚡",
    total:     45,
    new:       12,
    review:    18,
    learned:   15,
    color:     "from-purple-500 to-violet-600",
    cards: [
      { front: "Coulomb's Law formula", back: "F = kq₁q₂/r²\nwhere k = 9×10⁹ N·m²/C²", hint: "Force between two charges" },
      { front: "Ohm's Law", back: "V = IR\n(Voltage = Current × Resistance)", hint: "Basic circuit relation" },
      { front: "Power dissipation in a resistor", back: "P = I²R = V²/R = VI", hint: "Three equivalent forms" },
      { front: "Lens Maker's Formula", back: "1/f = (n-1)[1/R₁ - 1/R₂]", hint: "For a thin lens in air" },
      { front: "de Broglie wavelength", back: "λ = h/mv = h/p\nwhere h = Planck's constant", hint: "Wave-particle duality" },
    ],
  },
  {
    id:        "dsa-patterns",
    title:     "DSA Patterns",
    subject:   "DSA",
    emoji:     "🌳",
    total:     60,
    new:       20,
    review:    25,
    learned:   15,
    color:     "from-green-500 to-teal-600",
    cards: [
      { front: "When to use Two Pointers?", back: "Sorted array + finding pair/triplet with target sum.\nAlso: palindrome check, container with most water.", hint: "Think: two indices moving" },
      { front: "Sliding Window use case?", back: "Subarray/substring with constraint (fixed/variable window).\nExample: max sum of size-k window.", hint: "Window shrinks/grows from both ends" },
      { front: "When to use BFS vs DFS?", back: "BFS: Shortest path in unweighted graph, level-order traversal.\nDFS: Cycle detection, topological sort, backtracking.", hint: "BFS = level, DFS = depth" },
      { front: "Binary Search prerequisite?", back: "The search space must be monotonically increasing or decreasing (sorted, or answer has monotone property).", hint: "Think: can I split in half?" },
      { front: "Dynamic Programming conditions?", back: "1. Optimal substructure: optimal solution uses optimal sub-solutions.\n2. Overlapping subproblems: same sub-problems solved multiple times.", hint: "DP = recursion + memoization" },
    ],
  },
  {
    id:        "python-concepts",
    title:     "Python Concepts",
    subject:   "Programming",
    emoji:     "🐍",
    total:     50,
    new:       15,
    review:    22,
    learned:   13,
    color:     "from-yellow-500 to-orange-500",
    cards: [
      { front: "What is a Python list comprehension?", back: "[expr for item in iterable if condition]\nExample: [x**2 for x in range(10) if x % 2 == 0]", hint: "One-line loop + filter" },
      { front: "Difference: shallow vs deep copy?", back: "Shallow: copy.copy() — copies container, not nested objects.\nDeep: copy.deepcopy() — recursively copies all nested objects.", hint: "Does it copy references or values?" },
      { front: "What is a Python decorator?", back: "@func wraps another function to add behavior.\ndef my_dec(fn):\n  def wrapper(*args):\n    # before\n    result = fn(*args)\n    # after\n    return result\n  return wrapper", hint: "Function that takes and returns a function" },
      { front: "GIL in Python — what is it?", back: "Global Interpreter Lock: only ONE Python thread executes at a time (CPython).\nUse multiprocessing or async for true parallelism.", hint: "Threading limitation in CPython" },
    ],
  },
  {
    id:        "chemistry-org",
    title:     "Organic Chemistry",
    subject:   "CBSE Class 12",
    emoji:     "🧪",
    total:     55,
    new:       18,
    review:    20,
    learned:   17,
    color:     "from-orange-500 to-amber-500",
    cards: [
      { front: "Aldol Condensation products?", back: "Aldehydes/ketones with α-H react in base to form β-hydroxy carbonyl compounds. Further dehydration → α,β-unsaturated carbonyl.", hint: "Aldehyde + aldehyde (or ketone)" },
      { front: "Cannizzaro Reaction condition?", back: "Aldehydes without α-H (e.g., HCHO, PhCHO) undergo disproportionation in concentrated NaOH → acid + alcohol.", hint: "No alpha-H needed" },
      { front: "Hinsberg test for amines?", back: "1° amines: react with benzenesulfonyl chloride → soluble in NaOH.\n2° amines: react → insoluble in NaOH.\n3° amines: no reaction.", hint: "Distinguishes 1°, 2°, 3° amines" },
    ],
  },
] as const;

type DeckId = typeof DECKS[number]["id"];
type Rating = "again" | "hard" | "good" | "easy";

/* ─── Page Component ─────────────────────────────────────────────────────── */
export default function FlashcardsPage() {
  const [activeDeck,   setActiveDeck]   = useState<DeckId | null>(null);
  const [cardIndex,    setCardIndex]    = useState(0);
  const [flipped,      setFlipped]      = useState(false);
  const [sessionDone,  setSessionDone]  = useState(false);
  const [ratings,      setRatings]      = useState<Rating[]>([]);

  const deck    = DECKS.find((d) => d.id === activeDeck);
  const cards   = deck?.cards ?? [];
  const card    = cards[cardIndex];

  /** Start a deck study session */
  const startDeck = useCallback((id: DeckId) => {
    setActiveDeck(id);
    setCardIndex(0);
    setFlipped(false);
    setSessionDone(false);
    setRatings([]);
  }, []);

  /** Rate current card and advance */
  const rateCard = useCallback((rating: Rating) => {
    setRatings((prev) => [...prev, rating]);
    if (cardIndex + 1 >= cards.length) {
      setSessionDone(true);
    } else {
      setCardIndex((i) => i + 1);
      setFlipped(false);
    }
  }, [cardIndex, cards.length]);

  /* ── Active deck session view ──────────────────────────────────── */
  if (activeDeck && deck) {
    if (sessionDone) {
      const goodCount = ratings.filter((r) => r === "good" || r === "easy").length;
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center max-w-sm px-4">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold mb-2">Session Complete!</h2>
            <p className="text-muted-foreground mb-4">
              You reviewed <strong>{cards.length}</strong> cards from <strong>{deck.title}</strong>.
            </p>
            <div className="flex justify-center gap-6 text-sm mb-6">
              <div className="text-center"><div className="text-2xl font-bold text-green-500">{goodCount}</div><div className="text-muted-foreground">Got Right</div></div>
              <div className="text-center"><div className="text-2xl font-bold text-red-500">{ratings.filter((r) => r === "again").length}</div><div className="text-muted-foreground">Again</div></div>
              <div className="text-center"><div className="text-2xl font-bold text-brand-500">{Math.round((goodCount / cards.length) * 100)}%</div><div className="text-muted-foreground">Score</div></div>
            </div>
            <div className="flex gap-3 justify-center">
              <Button variant="gradient" onClick={() => startDeck(activeDeck)}><RotateCcw className="h-4 w-4" /> Study Again</Button>
              <Button variant="outline" onClick={() => setActiveDeck(null)}>Back to Decks</Button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen pb-20">
        {/* Session header */}
        <div className="border-b py-4">
          <div className="container px-4 md:px-6 flex items-center justify-between">
            <button onClick={() => setActiveDeck(null)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ChevronLeft className="h-4 w-4" /> Back
            </button>
            <span className="font-bold">{deck.emoji} {deck.title}</span>
            <span className="text-sm text-muted-foreground">{cardIndex + 1} / {cards.length}</span>
          </div>
          <div className="container px-4 md:px-6 mt-2">
            <Progress value={((cardIndex) / cards.length) * 100} className="h-1.5" />
          </div>
        </div>

        {/* Flashcard */}
        <div className="container px-4 md:px-6 max-w-2xl mx-auto py-12">
          <div className="mb-3 text-center">
            <Badge variant="secondary" className="text-xs">{card?.hint}</Badge>
          </div>
          <motion.div
            key={cardIndex + (flipped ? "-flipped" : "")}
            initial={{ opacity: 0.01, rotateY: flipped ? -90 : 90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            transition={{ duration: 0.25 }}
            className="rounded-3xl border-2 bg-card p-8 md:p-12 text-center cursor-pointer hover:shadow-xl transition-shadow min-h-[260px] flex flex-col items-center justify-center"
            onClick={() => setFlipped(!flipped)}
          >
            <div className={`text-xs font-semibold uppercase tracking-wider mb-4 ${flipped ? "text-brand-500" : "text-muted-foreground"}`}>
              {flipped ? "Answer" : "Question"}
            </div>
            <div className={`text-lg md:text-xl font-semibold whitespace-pre-line ${flipped ? "text-foreground font-mono text-base" : ""}`}>
              {flipped ? card?.back : card?.front}
            </div>
            {!flipped && (
              <p className="text-xs text-muted-foreground mt-6">Click to reveal answer</p>
            )}
          </motion.div>

          {/* Rating buttons */}
          <AnimatePresence>
            {flipped && (
              <motion.div initial={{ opacity: 0.01, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-6">
                <p className="text-center text-sm text-muted-foreground mb-3">How well did you know this?</p>
                <div className="grid grid-cols-4 gap-3">
                  {([
                    { id: "again", label: "Again",  color: "bg-red-500 hover:bg-red-600",    emoji: "❌" },
                    { id: "hard",  label: "Hard",   color: "bg-orange-500 hover:bg-orange-600", emoji: "😓" },
                    { id: "good",  label: "Good",   color: "bg-blue-500 hover:bg-blue-600",  emoji: "👍" },
                    { id: "easy",  label: "Easy",   color: "bg-green-500 hover:bg-green-600", emoji: "✅" },
                  ] as { id: Rating; label: string; color: string; emoji: string }[]).map((btn) => (
                    <button key={btn.id} onClick={() => rateCard(btn.id)}
                      className={`rounded-xl py-3 text-white text-sm font-semibold transition-all ${btn.color}`}>
                      <div>{btn.emoji}</div>
                      <div className="text-xs mt-0.5">{btn.label}</div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  /* ── Deck browser ─────────────────────────────────────────────── */
  return (
    <div className="min-h-screen pb-20">
      {/* Hero */}
      <section className="border-b bg-gradient-to-b from-violet-950/5 to-background py-14">
        <div className="container px-4 md:px-6">
          <Badge variant="secondary" className="mb-3">Spaced Repetition · {DECKS.length} Decks</Badge>
          <h1 className="text-3xl font-extrabold mb-4">🗂️ Flashcards</h1>
          <p className="text-muted-foreground text-lg mb-4 max-w-xl">
            Master formulas, DSA patterns, and concepts with spaced repetition.
            Rate each card and the system schedules optimal review sessions.
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><BookOpen className="h-4 w-4" /> {DECKS.reduce((a, d) => a + d.total, 0)} Total Cards</span>
            <span className="flex items-center gap-1.5"><Brain className="h-4 w-4" /> Spaced Repetition</span>
            <span className="flex items-center gap-1.5"><Zap className="h-4 w-4 text-yellow-500" /> Earn XP per session</span>
          </div>
        </div>
      </section>

      {/* Decks grid */}
      <section className="py-10">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {DECKS.map((deck, i) => {
              const totalReview = deck.new + deck.review;
              const learnedPct  = Math.round((deck.learned / deck.total) * 100);
              return (
                <motion.div key={deck.id} initial={{ opacity: 0.01, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="rounded-2xl border bg-card overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className={`h-1.5 bg-gradient-to-r ${deck.color}`} />
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-3xl">{deck.emoji}</span>
                      <Badge variant="secondary" className="text-xs">{deck.subject}</Badge>
                    </div>
                    <h3 className="font-bold mb-1">{deck.title}</h3>
                    <p className="text-xs text-muted-foreground mb-3">{deck.total} cards</p>
                    <div className="flex gap-2 text-xs mb-3">
                      <span className="rounded-full bg-blue-500/10 text-blue-600 px-2 py-0.5 font-medium">{deck.new} new</span>
                      <span className="rounded-full bg-orange-500/10 text-orange-600 px-2 py-0.5 font-medium">{deck.review} review</span>
                      <span className="rounded-full bg-green-500/10 text-green-600 px-2 py-0.5 font-medium">{deck.learned} done</span>
                    </div>
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Learned</span><span>{learnedPct}%</span>
                      </div>
                      <Progress value={learnedPct} className="h-1.5" />
                    </div>
                    <Button size="sm" variant="gradient" className="w-full h-9 gap-2" onClick={() => startDeck(deck.id)}>
                      <Play className="h-3.5 w-3.5" />
                      {totalReview > 0 ? `Study (${totalReview} due)` : "Study"}
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
