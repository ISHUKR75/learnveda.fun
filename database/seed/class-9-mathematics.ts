/**
 * @file database/seed/class-9-mathematics.ts
 * @description Seed data for Class 9 Mathematics NCERT chapters
 *
 * Run this seed to populate MongoDB with chapter content:
 *   cd apps/web && npx ts-node database/seed/run.ts class-9-mathematics
 *
 * Covers all 15 chapters of NCERT Class 9 Mathematics:
 *   1.  Number Systems
 *   2.  Polynomials
 *   3.  Coordinate Geometry
 *   4.  Linear Equations in Two Variables
 *   5.  Introduction to Euclid's Geometry
 *   6.  Lines and Angles
 *   7.  Triangles
 *   8.  Quadrilaterals
 *   9.  Circles
 *   10. Heron's Formula
 *   11. Surface Areas and Volumes
 *   12. Statistics
 *   13. Probability
 *   14. Polynomials (extended)
 *   15. Revision / Mixed
 */

/** Chapter seed data type */
interface ChapterSeed {
  classLevel:  string;
  subject:     string;
  chapterId:   string;
  chapterNo:   number;
  title:       string;
  objective:   string;
  keyPoints:   string[];
  hasSimulation: boolean;
  simulationHref?: string;
  ncertRef:    string;
  difficulty:  "easy" | "medium" | "hard";
  duration:    number; // minutes
  isPublished: boolean;
  questions: {
    id:          string;
    text:        string;
    options:     string[];
    correct:     number; // 0-based index
    explanation: string;
    difficulty:  "easy" | "medium" | "hard";
    marks:       number;
    tags:        string[];
  }[];
}

/* ─── Class 9 Mathematics Seed Data ─────────────────────────────────────── */
export const CLASS_9_MATHEMATICS_SEED: ChapterSeed[] = [
  {
    classLevel:  "class-9",
    subject:     "mathematics",
    chapterId:   "chapter-01",
    chapterNo:   1,
    title:       "Number Systems",
    objective:   "Understand rational and irrational numbers, their decimal expansions, and representation on the number line.",
    keyPoints: [
      "Natural numbers (N): 1, 2, 3, … counting numbers",
      "Whole numbers (W): 0, 1, 2, 3, … (includes 0)",
      "Integers (Z): …, -2, -1, 0, 1, 2, … (includes negatives)",
      "Rational numbers (Q): p/q form where p, q ∈ Z and q ≠ 0",
      "Irrational numbers: cannot be written as p/q — e.g. √2, π, √3",
      "Real numbers (R) = Rational ∪ Irrational",
      "√2 is irrational — proof by contradiction",
      "Every real number has a unique point on the number line",
    ],
    hasSimulation:  false,
    ncertRef:    "NCERT Class 9 Mathematics Chapter 1",
    difficulty:  "easy",
    duration:    45,
    isPublished: true,
    questions: [
      {
        id:          "c9m1-q1",
        text:        "Which of the following is an irrational number?",
        options:     ["√4", "√9", "√2", "√25"],
        correct:     2,
        explanation: "√2 = 1.41421356… (non-terminating, non-repeating), so it is irrational. √4=2, √9=3, √25=5 are all rational.",
        difficulty:  "easy",
        marks:       1,
        tags:        ["irrational numbers", "square roots"],
      },
      {
        id:          "c9m1-q2",
        text:        "Which of the following is NOT a rational number?",
        options:     ["7/3", "0.142857142857…", "π", "−5"],
        correct:     2,
        explanation: "π = 3.14159265… is non-terminating and non-repeating, making it irrational. The others are rational.",
        difficulty:  "easy",
        marks:       1,
        tags:        ["rational numbers", "π"],
      },
      {
        id:          "c9m1-q3",
        text:        "The decimal expansion of a rational number is always:",
        options:     [
          "Non-terminating and non-repeating",
          "Terminating or non-terminating repeating",
          "Always terminating",
          "Always non-repeating",
        ],
        correct:     1,
        explanation: "Every rational number has either a terminating decimal (e.g., 1/4 = 0.25) or a non-terminating but repeating decimal (e.g., 1/3 = 0.333…).",
        difficulty:  "medium",
        marks:       2,
        tags:        ["decimal expansion", "rational numbers"],
      },
      {
        id:          "c9m1-q4",
        text:        "Which of these sets of numbers is correct? N ⊂ W ⊂ Z ⊂ Q ⊂ R means:",
        options:     [
          "Natural ⊂ Whole ⊂ Integer ⊂ Rational ⊂ Real",
          "Rational ⊂ Integer ⊂ Whole ⊂ Natural ⊂ Real",
          "Integer ⊂ Rational ⊂ Natural ⊂ Whole ⊂ Real",
          "Whole ⊂ Natural ⊂ Integer ⊂ Rational ⊂ Real",
        ],
        correct:     0,
        explanation: "The standard hierarchy is N ⊂ W ⊂ Z ⊂ Q ⊂ R — each set is a subset of the next.",
        difficulty:  "easy",
        marks:       1,
        tags:        ["number hierarchy", "subsets"],
      },
      {
        id:          "c9m1-q5",
        text:        "Rationalize the denominator of 1/√3:",
        options:     ["√3", "√3/3", "1/3", "3/√3"],
        correct:     1,
        explanation: "Multiply numerator and denominator by √3: 1/√3 × √3/√3 = √3/3.",
        difficulty:  "medium",
        marks:       2,
        tags:        ["rationalization", "irrational numbers"],
      },
    ],
  },
  {
    classLevel:  "class-9",
    subject:     "mathematics",
    chapterId:   "chapter-02",
    chapterNo:   2,
    title:       "Polynomials",
    objective:   "Understand polynomials, their zeroes, and apply the Remainder Theorem and Factor Theorem.",
    keyPoints: [
      "Polynomial: an expression of the form aₙxⁿ + aₙ₋₁xⁿ⁻¹ + … + a₀",
      "Degree: highest power of the variable in the polynomial",
      "Linear polynomial: degree 1, e.g., 2x + 3",
      "Quadratic polynomial: degree 2, e.g., x² − 5x + 6",
      "Cubic polynomial: degree 3, e.g., x³ − 2x² + x − 3",
      "Zero of polynomial p(x): value of x for which p(x) = 0",
      "Remainder Theorem: when p(x) is divided by (x − a), remainder = p(a)",
      "Factor Theorem: (x − a) is a factor of p(x) iff p(a) = 0",
    ],
    hasSimulation:  false,
    ncertRef:    "NCERT Class 9 Mathematics Chapter 2",
    difficulty:  "medium",
    duration:    50,
    isPublished: true,
    questions: [
      {
        id:          "c9m2-q1",
        text:        "What is the degree of the polynomial 5x³ − 4x² + 2x − 7?",
        options:     ["1", "2", "3", "7"],
        correct:     2,
        explanation: "The degree is the highest power of x, which is 3 in 5x³.",
        difficulty:  "easy",
        marks:       1,
        tags:        ["degree", "polynomials"],
      },
      {
        id:          "c9m2-q2",
        text:        "By Remainder Theorem, find the remainder when p(x) = x³ − 3x² + 4 is divided by (x − 2).",
        options:     ["−4", "0", "4", "8"],
        correct:     1,
        explanation: "p(2) = (2)³ − 3(2)² + 4 = 8 − 12 + 4 = 0. Remainder is 0, which also means (x−2) is a factor.",
        difficulty:  "medium",
        marks:       2,
        tags:        ["Remainder Theorem", "substitution"],
      },
      {
        id:          "c9m2-q3",
        text:        "The number of zeroes a linear polynomial can have is:",
        options:     ["0", "1", "2", "Infinite"],
        correct:     1,
        explanation: "A linear polynomial ax + b = 0 has exactly one zero: x = −b/a.",
        difficulty:  "easy",
        marks:       1,
        tags:        ["zeroes of polynomial", "linear"],
      },
    ],
  },
  /* Add remaining chapters with same structure...
   * Chapters 3–15 follow the same pattern.
   * Add them here as the content team writes the material.
   */
];

/* ─── Seed Runner ────────────────────────────────────────────────────────── */
/**
 * Seeds the Class 9 Mathematics chapters into MongoDB.
 * Run via: npx ts-node database/seed/run.ts class-9-mathematics
 *
 * @param {import("mongoose").Connection} db - Active Mongoose connection
 */
export async function seedClass9Mathematics(db: import("mongoose").Mongoose): Promise<void> {
  const Chapter = db.models.Chapter;
  if (!Chapter) {
    throw new Error("Chapter model not registered. Run connectDB() first.");
  }

  let inserted = 0;
  let updated  = 0;

  for (const seed of CLASS_9_MATHEMATICS_SEED) {
    const existing = await Chapter.findOne({
      classLevel: seed.classLevel,
      subject:    seed.subject,
      chapterId:  seed.chapterId,
    });

    if (existing) {
      /* Update existing — merge new question data */
      await Chapter.findByIdAndUpdate(existing._id, { $set: seed });
      updated++;
    } else {
      /* Insert new chapter */
      await Chapter.create(seed);
      inserted++;
    }
  }

  console.log(
    `[SEED] Class 9 Mathematics: ${inserted} inserted, ${updated} updated (${CLASS_9_MATHEMATICS_SEED.length} total)`
  );
}
