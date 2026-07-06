/**
 * @file lib/content/class10-physics.ts
 * @description Real, NCERT-aligned Class 10 Physics curriculum content —
 * the physics-specific chapters of the CBSE Class 10 Science syllabus,
 * offered as a standalone subject track for focused study.
 */

import type { ContentChapter } from "./class9-mathematics";

export const CLASS_10_PHYSICS_CHAPTERS: ContentChapter[] = [
  { chapterId: "chapter-01", order: 1, title: "Light — Reflection and Refraction",         objective: "Study reflection/refraction laws and mirror/lens formulae.",           durationLabel: "4 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: true, sampleQuestions: [], nextChapterId: "chapter-02" },
  { chapterId: "chapter-02", order: 2, title: "The Human Eye and the Colourful World",     objective: "Study eye defects, corrections, dispersion, and scattering.",           durationLabel: "3 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-01", nextChapterId: "chapter-03" },
  { chapterId: "chapter-03", order: 3, title: "Electricity",                               objective: "Study current, resistance, Ohm's Law, and electrical power.",           durationLabel: "4 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: true, sampleQuestions: [], prevChapterId: "chapter-02", nextChapterId: "chapter-04" },
  { chapterId: "chapter-04", order: 4, title: "Magnetic Effects of Electric Current",       objective: "Study magnetic fields, electromagnets, motors, and generators.",         durationLabel: "3 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: true, sampleQuestions: [], prevChapterId: "chapter-03", nextChapterId: "chapter-05" },
  { chapterId: "chapter-05", order: 5, title: "Sources of Energy",                          objective: "Compare renewable and non-renewable energy sources.",                   durationLabel: "2 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-04" },
];
