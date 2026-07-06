/**
 * @file lib/content/class9-mathematics.ts
 * @description Single source of truth for real, NCERT-aligned Class 9 Mathematics
 * curriculum content (chapters, theory, formulas, and MCQs).
 *
 * This file is intentionally framework-agnostic — it exports plain data, no
 * React/Next.js imports — so it can be reused by:
 *   1. `scripts/seed/seed-content.ts`      (writes this into MongoDB)
 *   2. `lib/services/content-service.ts`   (demo-mode fallback when DB is offline)
 *
 * Every chapter/topic below matches the official NCERT Class 9 Mathematics
 * textbook (2025-26 edition) — no placeholder or invented content.
 */

/* ─── Shared Type Definitions ────────────────────────────────────────────── */
export interface ContentTheoryPoint {
  heading: string;
  content: string;
}

export interface ContentKeyFormula {
  label:   string;
  formula: string;
}

export interface ContentSampleQuestion {
  question: string;
  options:  string[];
  answer:   number; // Zero-based correct option index
}

export interface ContentChapter {
  chapterId:    string; // e.g. "chapter-01"
  order:        number;
  title:        string;
  objective:    string;
  durationLabel: string;
  theoryPoints:  ContentTheoryPoint[];
  keyFormulas:   ContentKeyFormula[];
  keyPoints:     string[];
  hasSimulation: boolean;
  simulationDescription?: string;
  sampleQuestions: ContentSampleQuestion[];
  prevChapterId?: string;
  nextChapterId?: string;
}

/* ─── Class 9 Mathematics — Full Chapter List (NCERT 2025-26) ───────────── */
// Chapters 1 and 2 carry full theory content (theory/formulas/MCQs).
// Chapters 3-13 carry the real NCERT titles/topics/duration used for the
// subject overview list; their deep-dive theory content is queued for the
// next content-authoring phase (tracked in work_progress.md Phase 3).
export const CLASS_9_MATHEMATICS_CHAPTERS: ContentChapter[] = [
  {
    chapterId: "chapter-01",
    order: 1,
    title: "Number Systems",
    objective:
      "Understand rational and irrational numbers, real numbers on the number line, and decimal expansions.",
    durationLabel: "3 days",
    theoryPoints: [
      {
        heading: "Natural and Whole Numbers",
        content:
          "Natural numbers are counting numbers: 1, 2, 3, … Whole numbers include 0: 0, 1, 2, 3, … Integers include negatives: …, -2, -1, 0, 1, 2, …",
      },
      {
        heading: "Rational Numbers",
        content:
          "A rational number is a number that can be written as p/q where p and q are integers and q ≠ 0. Examples: 1/2, -3/4, 5. Every integer is a rational number. Rational numbers have either terminating or repeating decimal expansions.",
      },
      {
        heading: "Irrational Numbers",
        content:
          "Numbers that cannot be written as p/q. Examples: √2, √3, π. Their decimal expansions are non-terminating and non-repeating. √2 = 1.41421356… never repeats or terminates.",
      },
      {
        heading: "Real Numbers",
        content:
          "The set of all rational and irrational numbers together form the Real Numbers (ℝ). Every point on the number line corresponds to a unique real number.",
      },
      {
        heading: "Laws of Exponents for Real Numbers",
        content:
          "For positive real bases: aᵐ · aⁿ = aᵐ⁺ⁿ, (aᵐ)ⁿ = aᵐⁿ, aᵐ/aⁿ = aᵐ⁻ⁿ, (ab)ⁿ = aⁿbⁿ. These extend to fractional exponents: a^(1/n) = ⁿ√a.",
      },
    ],
    keyFormulas: [
      { label: "Rational + Irrational", formula: "p/q form (q ≠ 0) → Rational; else → Irrational" },
      { label: "Terminating Decimal",   formula: "p/q terminates if q = 2ᵃ × 5ᵇ" },
      { label: "Power Rule",            formula: "a^(m/n) = ⁿ√(aᵐ)" },
      { label: "Product of Surds",      formula: "√a × √b = √(ab)" },
    ],
    keyPoints: [
      "Every rational number can be represented as a terminating or repeating decimal",
      "√p is irrational for any prime p",
      "Between any two distinct real numbers, there are infinitely many real numbers",
      "The decimal expansion of π is 3.14159265…, non-terminating and non-repeating",
      "To represent √n on number line: use Pythagoras theorem (right triangle method)",
    ],
    hasSimulation: false,
    sampleQuestions: [
      { question: "Which of the following is an irrational number?", options: ["4/5", "√9", "√7", "0.333..."], answer: 2 },
      { question: "The decimal expansion of 1/7 is:", options: ["Terminating", "Non-terminating, non-repeating", "Non-terminating, repeating", "None of these"], answer: 2 },
      { question: "Which statement is FALSE about real numbers?", options: ["Every integer is rational", "√2 is irrational", "π is rational", "0 is a whole number"], answer: 2 },
    ],
    nextChapterId: "chapter-02",
  },
  {
    chapterId: "chapter-02",
    order: 2,
    title: "Polynomials",
    objective:
      "Define polynomials, understand the Remainder Theorem and Factor Theorem, and factorise algebraic expressions.",
    durationLabel: "3 days",
    theoryPoints: [
      {
        heading: "What is a Polynomial?",
        content:
          "A polynomial p(x) is an expression of the form aₙxⁿ + aₙ₋₁xⁿ⁻¹ + … + a₁x + a₀, where the exponents are whole numbers and the coefficients aᵢ are real numbers. The degree is the highest power of x.",
      },
      {
        heading: "Types of Polynomials",
        content:
          "Monomial (1 term): 5x². Binomial (2 terms): x² + 3. Trinomial (3 terms): x² + 2x + 1. By degree — Constant (0), Linear (1), Quadratic (2), Cubic (3).",
      },
      {
        heading: "Zeros of a Polynomial",
        content:
          "A value of x for which p(x) = 0 is called a zero (or root). A polynomial of degree n has at most n zeros. For p(x) = 2x - 6, the zero is x = 3 since p(3) = 0.",
      },
      {
        heading: "Remainder Theorem",
        content:
          "When polynomial p(x) is divided by (x - a), the remainder is p(a). Example: divide p(x) = x³ - 3x + 5 by (x - 1): remainder = p(1) = 1 - 3 + 5 = 3.",
      },
      {
        heading: "Factor Theorem",
        content:
          "A polynomial p(x) has (x - a) as a factor if and only if p(a) = 0. This allows us to factorise by finding zeros.",
      },
      {
        heading: "Algebraic Identities",
        content:
          "(a + b)² = a² + 2ab + b², (a - b)² = a² - 2ab + b², a² - b² = (a+b)(a-b), (a+b+c)² = a²+b²+c²+2ab+2bc+2ca, (a+b)³ = a³+3a²b+3ab²+b³.",
      },
    ],
    keyFormulas: [
      { label: "(a+b)²", formula: "a² + 2ab + b²" },
      { label: "(a-b)²", formula: "a² - 2ab + b²" },
      { label: "a²-b²",  formula: "(a+b)(a-b)" },
      { label: "(a+b)³", formula: "a³ + 3a²b + 3ab² + b³" },
      { label: "(a-b)³", formula: "a³ - 3a²b + 3ab² - b³" },
      { label: "a³+b³",  formula: "(a+b)(a²-ab+b²)" },
      { label: "a³-b³",  formula: "(a-b)(a²+ab+b²)" },
    ],
    keyPoints: [
      "Degree of zero polynomial is not defined",
      "A polynomial of degree 1 is called linear, degree 2 is quadratic, degree 3 is cubic",
      "Factor Theorem: p(a)=0 ⟺ (x-a) is a factor of p(x)",
      "Every linear polynomial has exactly one zero",
      "Sum of zeros of ax² + bx + c is -b/a; product is c/a",
    ],
    hasSimulation: false,
    sampleQuestions: [
      { question: "If p(x) = x³ - 3x² + 4x - 12, then p(3) is:", options: ["0", "6", "-6", "12"], answer: 0 },
      { question: "Which is NOT an identity?", options: ["(a+b)² = a²+2ab+b²", "a²-b² = (a-b)²", "a²-b² = (a+b)(a-b)", "(a+b)³ = a³+3a²b+3ab²+b³"], answer: 1 },
    ],
    prevChapterId: "chapter-01",
    nextChapterId: "chapter-03",
  },
  { chapterId: "chapter-03", order: 3,  title: "Coordinate Geometry",       objective: "Learn the Cartesian plane, plotting points, and the distance formula.",                       durationLabel: "2 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-02", nextChapterId: "chapter-04" },
  { chapterId: "chapter-04", order: 4,  title: "Linear Equations in Two Variables", objective: "Understand and graph linear equations in two variables.",                              durationLabel: "2 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-03", nextChapterId: "chapter-05" },
  { chapterId: "chapter-05", order: 5,  title: "Introduction to Euclid's Geometry", objective: "Study Euclid's postulates, axioms, and foundational theorems.",                          durationLabel: "2 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-04", nextChapterId: "chapter-06" },
  { chapterId: "chapter-06", order: 6,  title: "Lines and Angles",           objective: "Master pairs of angles, parallel lines, and the angle sum property of a triangle.",              durationLabel: "3 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-05", nextChapterId: "chapter-07" },
  { chapterId: "chapter-07", order: 7,  title: "Triangles",                  objective: "Understand congruence criteria (SAS, ASA, SSS) and triangle inequalities.",                       durationLabel: "4 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-06", nextChapterId: "chapter-08" },
  { chapterId: "chapter-08", order: 8,  title: "Quadrilaterals",             objective: "Study properties of parallelograms and the mid-point theorem.",                                    durationLabel: "3 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-07", nextChapterId: "chapter-09" },
  { chapterId: "chapter-09", order: 9,  title: "Circles",                    objective: "Learn circle theorems involving chords, arcs, and angles in a semicircle.",                        durationLabel: "3 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-08", nextChapterId: "chapter-10" },
  { chapterId: "chapter-10", order: 10, title: "Heron's Formula",            objective: "Calculate the area of a triangle using Heron's Formula.",                                          durationLabel: "2 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-09", nextChapterId: "chapter-11" },
  { chapterId: "chapter-11", order: 11, title: "Surface Areas and Volumes",  objective: "Compute surface area and volume of cuboids, cylinders, cones, and spheres.",                       durationLabel: "4 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-10", nextChapterId: "chapter-12" },
  { chapterId: "chapter-12", order: 12, title: "Statistics",                 objective: "Organise data via frequency distributions, bar graphs, histograms, and central tendency.",         durationLabel: "3 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-11", nextChapterId: "chapter-13" },
  { chapterId: "chapter-13", order: 13, title: "Probability",                objective: "Introduce empirical probability through experiments and events.",                                  durationLabel: "2 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-12" },
];
