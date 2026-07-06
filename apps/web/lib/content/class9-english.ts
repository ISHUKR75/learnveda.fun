/**
 * @file lib/content/class9-english.ts
 * @description Real, NCERT-aligned Class 9 English curriculum content
 * (Beehive, Moments, Grammar, Writing Skills — 2025-26 edition).
 *
 * Reused by `scripts/seed/seed-content.ts` (writes into MongoDB) and by
 * `lib/services/content-service.ts` (demo-mode fallback when DB is offline).
 */

import type { ContentChapter } from "./class9-mathematics";

/* ─── Class 9 English — Full Chapter List (NCERT 2025-26) ───────────────── */
export const CLASS_9_ENGLISH_CHAPTERS: ContentChapter[] = [
  { chapterId: "chapter-01", order: 1, title: "The Fun They Had (Beehive)",         objective: "Read Asimov's story on classroom-of-the-future and analyse its themes.", durationLabel: "2 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], nextChapterId: "chapter-02" },
  { chapterId: "chapter-02", order: 2, title: "The Sound of Music (Beehive)",        objective: "Study the lives of Evelyn Glennie and Bismillah Khan.",                  durationLabel: "2 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-01", nextChapterId: "chapter-03" },
  { chapterId: "chapter-03", order: 3, title: "The Little Girl (Beehive)",           objective: "Analyse character growth and the theme of a father-daughter relationship.", durationLabel: "2 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-02", nextChapterId: "chapter-04" },
  { chapterId: "chapter-04", order: 4, title: "The Lake Isle of Innisfree (Poetry)", objective: "Study Yeats' poem for symbolism, imagery, and rhyme scheme.",            durationLabel: "1 day",  theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-03", nextChapterId: "chapter-05" },
  { chapterId: "chapter-05", order: 5, title: "The Lost Child (Moments)",            objective: "Explore the psychology and emotions in this supplementary reader story.", durationLabel: "2 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-04", nextChapterId: "chapter-06" },
  { chapterId: "chapter-06", order: 6, title: "The Adventures of Toto (Moments)",    objective: "Study humour and characterisation in Ruskin Bond's story.",             durationLabel: "2 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-05", nextChapterId: "chapter-07" },
  { chapterId: "chapter-07", order: 7, title: "Grammar — Tenses and Voice",          objective: "Master active/passive voice and sentence transformation rules.",         durationLabel: "3 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-06", nextChapterId: "chapter-08" },
  { chapterId: "chapter-08", order: 8, title: "Writing Skills",                      objective: "Practice formal letters, articles, notices, and diary entries.",         durationLabel: "4 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-07" },
];
