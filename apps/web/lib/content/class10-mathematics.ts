/**
 * @file lib/content/class10-mathematics.ts
 * @description Real, NCERT-aligned Class 10 Mathematics curriculum content
 * (2025-26 edition). Reused by seed-content.ts and content-service.ts.
 */

import type { ContentChapter } from "./class9-mathematics";

export const CLASS_10_MATHEMATICS_CHAPTERS: ContentChapter[] = [
  {
    chapterId: "chapter-01", order: 1,
    title: "Real Numbers",
    objective: "Master Euclid's Division Lemma, the Fundamental Theorem of Arithmetic, and irrationality proofs.",
    durationLabel: "3 days",
    theoryPoints: [
      { heading: "Euclid's Division Lemma", content: "For positive integers a and b, there exist unique whole numbers q and r such that a = bq + r, where 0 ≤ r < b. This is the basis of the Euclidean algorithm for finding HCF." },
      { heading: "Fundamental Theorem of Arithmetic", content: "Every composite number can be expressed as a product of primes, uniquely, apart from the order of factors. Example: 140 = 2² × 5 × 7." },
      { heading: "HCF and LCM using Prime Factorisation", content: "HCF = product of smallest powers of common prime factors. LCM = product of greatest powers of all prime factors. Relation: HCF × LCM = product of the two numbers." },
      { heading: "Irrational Numbers", content: "√2, √3, √5, and p (irrational + rational combos) are irrational. Proved by contradiction using the Fundamental Theorem of Arithmetic." },
    ],
    keyFormulas: [
      { label: "Euclid's Lemma",     formula: "a = bq + r, 0 ≤ r < b" },
      { label: "HCF × LCM relation", formula: "HCF(a,b) × LCM(a,b) = a × b" },
    ],
    keyPoints: [
      "HCF(a,b) always divides both a and b",
      "√p is irrational for any prime p",
      "The sum or product of a rational and an irrational number (non-zero rational) is irrational",
      "Every composite number has a unique prime factorisation (order doesn't matter)",
    ],
    hasSimulation: false,
    sampleQuestions: [
      { question: "HCF of 96 and 404 by Euclid's algorithm is:", options: ["2", "4", "8", "16"], answer: 1 },
      { question: "Which of the following is irrational?", options: ["√16", "√25", "√7", "22/7"], answer: 2 },
    ],
    nextChapterId: "chapter-02",
  },
  { chapterId: "chapter-02", order: 2,  title: "Polynomials",                          objective: "Study zeros of polynomials and relationships between zeros and coefficients.",       durationLabel: "3 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-01", nextChapterId: "chapter-03" },
  { chapterId: "chapter-03", order: 3,  title: "Pair of Linear Equations in Two Variables", objective: "Solve pairs of linear equations graphically and algebraically.",                    durationLabel: "4 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-02", nextChapterId: "chapter-04" },
  { chapterId: "chapter-04", order: 4,  title: "Quadratic Equations",                  objective: "Solve quadratic equations by factorisation, completing the square, and the formula.",  durationLabel: "4 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-03", nextChapterId: "chapter-05" },
  { chapterId: "chapter-05", order: 5,  title: "Arithmetic Progressions",              objective: "Find nth term and sum of n terms of an AP.",                                            durationLabel: "3 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-04", nextChapterId: "chapter-06" },
  { chapterId: "chapter-06", order: 6,  title: "Triangles",                            objective: "Study similarity of triangles, Basic Proportionality Theorem, and Pythagoras theorem.", durationLabel: "4 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-05", nextChapterId: "chapter-07" },
  { chapterId: "chapter-07", order: 7,  title: "Coordinate Geometry",                  objective: "Apply distance formula, section formula, and area of a triangle.",                     durationLabel: "3 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-06", nextChapterId: "chapter-08" },
  { chapterId: "chapter-08", order: 8,  title: "Introduction to Trigonometry",         objective: "Learn trigonometric ratios, identities, and ratios of specific angles.",               durationLabel: "4 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: true,  sampleQuestions: [], prevChapterId: "chapter-07", nextChapterId: "chapter-09" },
  { chapterId: "chapter-09", order: 9,  title: "Some Applications of Trigonometry",    objective: "Solve height and distance problems using angles of elevation/depression.",             durationLabel: "2 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: true,  sampleQuestions: [], prevChapterId: "chapter-08", nextChapterId: "chapter-10" },
  { chapterId: "chapter-10", order: 10, title: "Circles",                              objective: "Study tangents to a circle and their properties.",                                     durationLabel: "2 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-09", nextChapterId: "chapter-11" },
  { chapterId: "chapter-11", order: 11, title: "Areas Related to Circles",             objective: "Compute area of sectors, segments, and combinations of plane figures.",                durationLabel: "3 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-10", nextChapterId: "chapter-12" },
  { chapterId: "chapter-12", order: 12, title: "Surface Areas and Volumes",            objective: "Compute surface area and volume of combinations of solids.",                          durationLabel: "3 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-11", nextChapterId: "chapter-13" },
  { chapterId: "chapter-13", order: 13, title: "Statistics",                           objective: "Find mean, median, and mode of grouped data.",                                        durationLabel: "3 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-12", nextChapterId: "chapter-14" },
  { chapterId: "chapter-14", order: 14, title: "Probability",                          objective: "Compute theoretical probability of simple events.",                                   durationLabel: "2 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-13", nextChapterId: "chapter-15" },
  { chapterId: "chapter-15", order: 15, title: "Proofs in Mathematics (Appendix)",     objective: "Understand mathematical proofs, deductive reasoning, and conjectures.",               durationLabel: "1 day",  theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-14" },
];
