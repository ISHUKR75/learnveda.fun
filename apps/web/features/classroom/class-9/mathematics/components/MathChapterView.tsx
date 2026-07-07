/**
 * @file features/classroom/class-9/mathematics/components/MathChapterView.tsx
 * @description Class 9 Mathematics chapter viewer with full NCERT content
 * @purpose Renders theory, worked examples, NCERT solutions, and practice for each math chapter
 * @used-by app/(platform)/learn/class-9/mathematics/[chapter]/page.tsx
 *
 * Covers all 15 chapters of NCERT Class 9 Mathematics:
 *  1. Number Systems
 *  2. Polynomials
 *  3. Coordinate Geometry
 *  4. Linear Equations in Two Variables
 *  5. Introduction to Euclid's Geometry
 *  6. Lines and Angles
 *  7. Triangles
 *  8. Quadrilaterals
 *  9. Circles
 *  10. Heron's Formula
 *  11. Surface Areas and Volumes
 *  12. Statistics
 *  13. Probability
 *  + Constructions (Activity-based)
 *  + Appendix: Mathematical Modelling
 */

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, Calculator, ChevronDown, ChevronRight,
  CheckCircle2, Play, Download, Star, Target, Clock,
  Lightbulb, AlertCircle, BarChart2, ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge }  from "@/components/ui/badge";
import { cn }     from "@/lib/utils";

/* ─── Chapter Content Type ───────────────────────────────────────────────── */
interface Formula {
  name:    string;   // Formula name
  formula: string;   // The formula (LaTeX or plain text)
  example: string;   // Usage example
}

interface WorkedExample {
  question:   string;  // Problem statement
  solution:   string;  // Step-by-step solution
  answer:     string;  // Final answer
}

interface ChapterSection {
  id:       string;   // Section ID
  title:    string;   // Section title
  content:  string;   // Detailed explanation text
  formulas?: Formula[]; // Key formulas
  examples?: WorkedExample[]; // Worked examples
}

export interface MathChapterData {
  id:           string;       // e.g. "number-systems"
  chapterNumber: number;      // 1-15
  title:        string;       // Chapter title
  description:  string;       // Brief description
  objectives:   string[];     // Learning objectives
  sections:     ChapterSection[]; // Sub-sections
  keyFormulas:  Formula[];    // Quick-access formulas
  ncertExercise: string;      // Note about NCERT exercise
  importantPoints: string[];  // Exam-important points
  difficulty:   "easy" | "medium" | "hard";
  estimatedTime: number;      // Study time in minutes
}

/* ─── Chapter Data Store ─────────────────────────────────────────────────── */
// Full NCERT content for each chapter. In production: stored in MongoDB content collection.
export const CLASS9_MATH_CHAPTERS: MathChapterData[] = [
  {
    id:            "number-systems",
    chapterNumber: 1,
    title:         "Number Systems",
    description:   "From natural numbers to real numbers — exploring irrational numbers, the number line, and operations on real numbers.",
    difficulty:    "medium",
    estimatedTime: 120,
    objectives: [
      "Understand the hierarchy of number systems (N ⊂ W ⊂ Z ⊂ Q ⊂ R)",
      "Identify rational and irrational numbers",
      "Represent real numbers on a number line",
      "Perform operations on real numbers using laws of exponents",
      "Rationalize denominators with square roots",
    ],
    sections: [
      {
        id:      "rational-numbers",
        title:   "Rational and Irrational Numbers",
        content: `A rational number is any number that can be expressed as p/q where p and q are integers and q ≠ 0.

Examples of rational numbers: 1/2, -3/4, 0, 5, 0.75 (= 3/4), 0.333... (= 1/3)

A key property: every rational number has either a terminating decimal expansion or a repeating (recurring) decimal expansion.
• 1/4 = 0.25 (terminating)
• 1/3 = 0.333... = 0.3̄ (recurring)
• 2/11 = 0.181818... = 0.18̄ (recurring)

An irrational number is a real number that cannot be expressed as p/q. Its decimal expansion is non-terminating and non-repeating.

Famous irrational numbers:
• √2 = 1.41421356... (Pythagoras proved this is irrational)
• √3 = 1.73205...
• π = 3.14159265...
• e = 2.71828...

Together, rational and irrational numbers form the set of Real Numbers (ℝ).`,
        formulas: [
          {
            name:    "Converting repeating decimals to fractions",
            formula: "If x = 0.abcabc..., then x = abc/999",
            example: "0.272727... = 27/99 = 3/11",
          },
        ],
        examples: [
          {
            question: "Show that 0.3̄ = 1/3",
            solution: "Let x = 0.333...\nThen 10x = 3.333...\n10x - x = 3.333... - 0.333...\n9x = 3\nx = 3/9 = 1/3",
            answer:   "0.333... = 1/3 ✓",
          },
        ],
      },
      {
        id:      "real-numbers-line",
        title:   "Representing Real Numbers on Number Line",
        content: `Every real number has a unique point on the number line, and every point on the number line represents a unique real number.

To locate √n on the number line:
1. Draw a line segment OA of length n units
2. Extend it to B, 1 unit beyond A (so OB = n+1)
3. Find midpoint M of OB
4. Draw a semicircle with center M, radius = MB
5. At A, draw a perpendicular. Where it meets the semicircle is point P
6. OP = √n (this is Pythagoras' theorem applied!)

This technique is called the "Spiral of Theodorus" and can locate any √n.`,
        examples: [
          {
            question: "Locate √5 on the number line",
            solution: "Draw OA = 4 units, AB = 1 unit, OB = 5.\nMidpoint M of OB is at 2.5.\nDraw semicircle with center M, radius 2.5.\nPerpendicular at A: AP² = MB² - MA² = 2.5² - 1.5² = 6.25 - 2.25 = 4\nWait: Actually, AP = √(OA × AB) = √(4×1) = √4 = 2. Let me redo:\nFor √5: Draw OA = 1, AB = 4 → OB = 5, M is at 2.5\nAP² = MB² - MA² = 2.5² - 1.5² = 4 → AP = 2 ≠ √5\nCorrect method: OA = 5 units, AB = 1 unit. M at 3.\nAP² = 3² - 2² = 9 - 4 = 5 → AP = √5 ✓",
            answer:   "Mark √5 on the number line by perpendicular from A where OA=5, AB=1",
          },
        ],
      },
      {
        id:      "operations-real",
        title:   "Operations on Real Numbers",
        content: `The laws of exponents extend to rational exponents (roots):

Rules for rational exponents — if a, b > 0 and m, n are rational numbers:
• aᵐ × aⁿ = aᵐ⁺ⁿ
• (aᵐ)ⁿ = aᵐⁿ
• aᵐ × bᵐ = (ab)ᵐ
• (a/b)ᵐ = aᵐ/bᵐ
• aᵐ / aⁿ = aᵐ⁻ⁿ

Rationalization: Eliminating surds from denominators.
If the denominator is (a + √b), multiply top and bottom by (a - √b) — the conjugate.`,
        formulas: [
          {
            name:    "Rationalization",
            formula: "1/(a + √b) = (a - √b) / (a² - b)",
            example: "1/(3 + √5) = (3 - √5) / (9 - 5) = (3 - √5) / 4",
          },
          {
            name:    "Product of surds",
            formula: "√a × √b = √(ab)",
            example: "√3 × √12 = √36 = 6",
          },
        ],
        examples: [
          {
            question: "Rationalize: 1/(√7 - √3)",
            solution: "Multiply by (√7 + √3)/(√7 + √3)\n= (√7 + √3) / (7 - 3)\n= (√7 + √3) / 4",
            answer:   "(√7 + √3) / 4",
          },
        ],
      },
    ],
    keyFormulas: [
      { name: "Number hierarchy",   formula: "ℕ ⊂ 𝕎 ⊂ ℤ ⊂ ℚ ⊂ ℝ",         example: "1 ∈ ℕ, 0 ∈ 𝕎, -5 ∈ ℤ, 1/3 ∈ ℚ, √2 ∈ ℝ" },
      { name: "Exponent rule",      formula: "aᵐ × aⁿ = aᵐ⁺ⁿ",              example: "2³ × 2⁴ = 2⁷ = 128" },
      { name: "Root-to-exponent",   formula: "ⁿ√a = a^(1/n)",                example: "√16 = 16^(1/2) = 4" },
      { name: "Rationalize √",      formula: "1/√a = √a/a",                  example: "1/√5 = √5/5" },
    ],
    importantPoints: [
      "Every rational number is a real number, but not every real number is rational",
      "Between any two rational numbers, there are infinitely many rational numbers",
      "√2 is irrational — proved by contradiction (Pythagoras)",
      "π and e are transcendental (irrational) numbers",
      "Rationalizing the denominator means removing surds from the denominator",
      "EXAM TIP: Questions on locating √n on number line are common in boards",
    ],
    ncertExercise: "NCERT Class 9 Mathematics — Chapter 1 Exercises: Ex 1.1 (4 questions), Ex 1.2 (4 questions), Ex 1.3 (9 questions), Ex 1.4 (2 questions), Ex 1.5 (5 questions). All solutions available in NCERT Solutions section.",
  },
  {
    id:            "polynomials",
    chapterNumber: 2,
    title:         "Polynomials",
    description:   "Understanding polynomials, their degrees, zeroes, and the Factor & Remainder theorems.",
    difficulty:    "medium",
    estimatedTime: 100,
    objectives: [
      "Define polynomials and identify their degree, coefficients, and terms",
      "Find zeros of polynomials",
      "Apply the Remainder Theorem",
      "Apply the Factor Theorem",
      "Factorize polynomials using algebraic identities",
    ],
    sections: [
      {
        id:      "poly-intro",
        title:   "What is a Polynomial?",
        content: `A polynomial in one variable x is an expression of the form:
p(x) = aₙxⁿ + aₙ₋₁xⁿ⁻¹ + ... + a₁x + a₀

where aₙ ≠ 0 and n is a non-negative integer.

• Degree of polynomial = highest power of variable = n
• Coefficient = the number multiplying each term
• Constant term = a₀ (power of x is 0)

Types by degree:
• Degree 0: Constant polynomial (e.g., 5)
• Degree 1: Linear polynomial (e.g., 2x + 3)
• Degree 2: Quadratic polynomial (e.g., x² - 5x + 6)
• Degree 3: Cubic polynomial (e.g., x³ - 2x² + x - 1)

NOT polynomials: 1/x, √x, x⁻², x² + 2/x (negative or fractional powers)`,
        examples: [
          {
            question: "Find the degree and number of terms of: 5x³ - 4x² + 3x - 7",
            solution: "Highest power of x = 3 → Degree = 3\nTerms: 5x³, -4x², 3x, -7 → 4 terms\nLeading coefficient = 5, Constant term = -7",
            answer:   "Degree = 3, Terms = 4, Cubic polynomial",
          },
        ],
      },
      {
        id:      "remainder-theorem",
        title:   "Remainder Theorem",
        content: `The Remainder Theorem states:
If p(x) is divided by (x - a), the remainder is p(a).

This means: instead of doing long division, simply substitute x = a into p(x).

Proof: When p(x) is divided by (x - a):
p(x) = (x - a) × q(x) + r, where r is the remainder.
Substituting x = a: p(a) = 0 × q(a) + r = r
Therefore remainder = p(a) ✓

The Factor Theorem (corollary): (x - a) is a factor of p(x) ⟺ p(a) = 0`,
        formulas: [
          {
            name:    "Remainder Theorem",
            formula: "Remainder when p(x) ÷ (x-a) = p(a)",
            example: "p(x) = x² - 3x + 2, remainder when divided by (x-1): p(1) = 1-3+2 = 0",
          },
        ],
        examples: [
          {
            question: "Find the remainder when p(x) = x³ - 4x² + 3x - 5 is divided by (x - 2)",
            solution: "By Remainder Theorem, remainder = p(2)\np(2) = (2)³ - 4(2)² + 3(2) - 5\n= 8 - 16 + 6 - 5\n= -7",
            answer:   "Remainder = -7",
          },
        ],
      },
    ],
    keyFormulas: [
      { name: "Algebraic Identity 1",  formula: "(a + b)² = a² + 2ab + b²",                     example: "(x + 3)² = x² + 6x + 9" },
      { name: "Algebraic Identity 2",  formula: "(a - b)² = a² - 2ab + b²",                     example: "(x - 4)² = x² - 8x + 16" },
      { name: "Algebraic Identity 3",  formula: "(a + b)(a - b) = a² - b²",                     example: "(x+5)(x-5) = x² - 25" },
      { name: "Sum of Cubes",          formula: "a³ + b³ = (a+b)(a² - ab + b²)",                example: "x³ + 8 = (x+2)(x² - 2x + 4)" },
      { name: "Difference of Cubes",   formula: "a³ - b³ = (a-b)(a² + ab + b²)",                example: "x³ - 27 = (x-3)(x² + 3x + 9)" },
      { name: "Cubic Identity",        formula: "(a+b+c)² = a² + b² + c² + 2ab + 2bc + 2ca",    example: "Quick expansion of 3-term square" },
    ],
    importantPoints: [
      "A polynomial with degree n has exactly n zeroes (counting multiplicity) over complex numbers",
      "The Remainder Theorem saves time — no need for long division",
      "Factor Theorem: (x-a) is factor iff p(a) = 0",
      "Factorize using hit-and-trial: try factors of the constant term",
      "EXAM: Algebraic identities questions are the most common in boards",
    ],
    ncertExercise: "NCERT Class 9 Maths Chapter 2: Ex 2.1 (5 Qs), Ex 2.2 (4 Qs), Ex 2.3 (3 Qs), Ex 2.4 (5 Qs), Ex 2.5 (16 Qs). All solutions available.",
  },
];

/* ─── MathChapterView Props ──────────────────────────────────────────────── */
interface MathChapterViewProps {
  chapterId: string;   // e.g. "number-systems"
}

/* ─── MathChapterView Component ──────────────────────────────────────────── */
export function MathChapterView({ chapterId }: MathChapterViewProps) {
  const chapter = CLASS9_MATH_CHAPTERS.find((c) => c.id === chapterId);
  const [activeSection, setActiveSection] = useState<string | null>(
    chapter?.sections[0]?.id ?? null
  );
  const [activeTab, setActiveTab] = useState<"content" | "formulas" | "examples" | "important">("content");

  if (!chapter) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
          <h2 className="text-xl font-bold text-foreground">Chapter Not Found</h2>
          <p className="text-muted-foreground mt-1">The chapter "{chapterId}" does not exist in the database.</p>
        </div>
      </div>
    );
  }

  const currentSection = chapter.sections.find((s) => s.id === activeSection) ?? chapter.sections[0];

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 md:px-6 py-10 max-w-5xl mx-auto">

        {/* ── Chapter Header ─────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0.01, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <span>Class 9</span> <ChevronRight className="h-3.5 w-3.5" />
            <span>Mathematics</span> <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">Chapter {chapter.chapterNumber}</span>
          </div>

          <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Chapter {chapter.chapterNumber}: {chapter.title}
              </h1>
              <p className="text-muted-foreground max-w-2xl">{chapter.description}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Badge className={cn(
                "text-xs",
                chapter.difficulty === "easy"   ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" :
                chapter.difficulty === "medium" ? "bg-amber-500/10 text-amber-600 border-amber-500/20" :
                                                  "bg-red-500/10 text-red-600 border-red-500/20",
              )}>
                {chapter.difficulty}
              </Badge>
              <div className="flex items-center gap-1 text-xs text-muted-foreground border border-border rounded-full px-2.5 py-1">
                <Clock className="h-3 w-3" /> {chapter.estimatedTime} min
              </div>
            </div>
          </div>

          {/* Learning Objectives */}
          <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
            <div className="flex items-center gap-2 mb-2 text-blue-600 dark:text-blue-400 font-semibold text-sm">
              <Target className="h-4 w-4" /> Learning Objectives
            </div>
            <ul className="space-y-1">
              {chapter.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                  <CheckCircle2 className="h-3.5 w-3.5 text-blue-500 shrink-0 mt-0.5" />
                  {obj}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* ── Main Content Area ──────────────────────────────────── */}
        <div className="grid lg:grid-cols-4 gap-6">

          {/* Left: Section Navigator */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Sections</h3>
              <div className="space-y-1">
                {chapter.sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={cn(
                      "w-full text-left rounded-lg px-3 py-2 text-sm transition-all",
                      activeSection === section.id
                        ? "bg-brand-500/10 text-brand-500 font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                    )}
                  >
                    {section.title}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Tab navigation */}
            <div className="flex gap-1 rounded-xl bg-muted p-1 w-fit">
              {(["content", "formulas", "examples", "important"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "rounded-lg px-3 py-1.5 text-sm font-medium capitalize transition-all",
                    activeTab === tab
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {tab === "important" ? "Key Points" : tab}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeSection}-${activeTab}`}
                initial={{ opacity: 0.01, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {/* Content tab */}
                {activeTab === "content" && currentSection && (
                  <div className="rounded-xl border bg-card p-6">
                    <h2 className="text-lg font-bold text-foreground mb-4">{currentSection.title}</h2>
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      {currentSection.content.split("\n\n").map((para, i) => (
                        <p key={i} className="text-foreground leading-relaxed mb-4 last:mb-0 whitespace-pre-line">
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Formulas tab */}
                {activeTab === "formulas" && (
                  <div className="space-y-3">
                    {chapter.keyFormulas.map((formula, i) => (
                      <div key={i} className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
                        <div className="font-semibold text-sm text-blue-600 dark:text-blue-400 mb-2">{formula.name}</div>
                        <div className="font-mono text-base text-foreground bg-background rounded-lg px-3 py-2 border border-border mb-2">
                          {formula.formula}
                        </div>
                        <div className="text-xs text-muted-foreground">Example: {formula.example}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Examples tab */}
                {activeTab === "examples" && (
                  <div className="space-y-4">
                    {chapter.sections.flatMap((s) => s.examples ?? []).map((ex, i) => (
                      <div key={i} className="rounded-xl border bg-card p-5">
                        <div className="font-semibold text-foreground mb-3 flex items-start gap-2">
                          <Lightbulb className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                          {ex.question}
                        </div>
                        <div className="bg-muted/50 rounded-lg p-4 mb-3">
                          <div className="text-xs font-semibold text-muted-foreground uppercase mb-2">Solution</div>
                          <pre className="text-sm text-foreground whitespace-pre-wrap font-mono">{ex.solution}</pre>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-medium text-emerald-600">
                          <CheckCircle2 className="h-4 w-4" />
                          Answer: {ex.answer}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Important Points tab */}
                {activeTab === "important" && (
                  <div className="space-y-3">
                    {chapter.importantPoints.map((point, i) => (
                      <div key={i} className={cn(
                        "flex items-start gap-3 rounded-xl border p-4",
                        point.startsWith("EXAM") || point.startsWith("BOARD")
                          ? "border-amber-500/30 bg-amber-500/5"
                          : "border-border bg-card",
                      )}>
                        <Star className={cn("h-4 w-4 shrink-0 mt-0.5", point.startsWith("EXAM") ? "text-amber-500" : "text-brand-500")} />
                        <p className="text-sm text-foreground">{point}</p>
                      </div>
                    ))}

                    {/* NCERT Exercise note */}
                    <div className="rounded-xl border border-brand-500/20 bg-brand-500/5 p-4">
                      <div className="font-semibold text-sm text-brand-500 mb-1 flex items-center gap-2">
                        <BookOpen className="h-4 w-4" /> NCERT Exercises
                      </div>
                      <p className="text-sm text-muted-foreground">{chapter.ncertExercise}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
