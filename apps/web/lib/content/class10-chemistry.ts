/**
 * @file lib/content/class10-chemistry.ts
 * @description Real, NCERT-aligned Class 10 Chemistry curriculum content —
 * the chemistry-specific chapters of the CBSE Class 10 Science syllabus,
 * offered as a standalone subject track for focused study.
 */

import type { ContentChapter } from "./class9-mathematics";

export const CLASS_10_CHEMISTRY_CHAPTERS: ContentChapter[] = [
  { chapterId: "chapter-01", order: 1, title: "Chemical Reactions and Equations",   objective: "Balance chemical equations and identify reaction types.",                durationLabel: "3 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: true,  sampleQuestions: [], nextChapterId: "chapter-02" },
  { chapterId: "chapter-02", order: 2, title: "Acids, Bases and Salts",           objective: "Study pH, indicators, and the chemistry of common salts.",                durationLabel: "3 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: true,  sampleQuestions: [], prevChapterId: "chapter-01", nextChapterId: "chapter-03" },
  { chapterId: "chapter-03", order: 3, title: "Metals and Non-metals",            objective: "Study reactivity series, extraction of metals, and corrosion.",            durationLabel: "3 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-02", nextChapterId: "chapter-04" },
  { chapterId: "chapter-04", order: 4, title: "Carbon and its Compounds",         objective: "Study covalent bonds, homologous series, and everyday carbon compounds.",   durationLabel: "4 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-03", nextChapterId: "chapter-05" },
  { chapterId: "chapter-05", order: 5, title: "Periodic Classification of Elements", objective: "Study Mendeleev's table, the Modern Periodic Table, and periodic trends.", durationLabel: "3 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-04" },
];
