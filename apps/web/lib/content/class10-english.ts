/**
 * @file lib/content/class10-english.ts
 * @description Real, NCERT-aligned Class 10 English curriculum content
 * (First Flight, Footprints without Feet, Grammar, Writing Skills).
 */

import type { ContentChapter } from "./class9-mathematics";

export const CLASS_10_ENGLISH_CHAPTERS: ContentChapter[] = [
  { chapterId: "chapter-01", order: 1,  title: "A Letter to God (First Flight)",         objective: "Analyse faith and irony in Lencho's story.",                        durationLabel: "2 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], nextChapterId: "chapter-02" },
  { chapterId: "chapter-02", order: 2,  title: "Nelson Mandela — Long Walk to Freedom",  objective: "Study Mandela's speech and the theme of freedom.",                  durationLabel: "2 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-01", nextChapterId: "chapter-03" },
  { chapterId: "chapter-03", order: 3,  title: "Two Stories About Flying",               objective: "Compare 'His First Flight' and 'Black Aeroplane'.",                 durationLabel: "2 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-02", nextChapterId: "chapter-04" },
  { chapterId: "chapter-04", order: 4,  title: "From the Diary of Anne Frank",           objective: "Study Anne Frank's diary entries and WWII context.",                durationLabel: "2 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-03", nextChapterId: "chapter-05" },
  { chapterId: "chapter-05", order: 5,  title: "Glimpses of India",                      objective: "Study 'A Baker from Goa', 'Coorg', and 'Tea from Assam'.",           durationLabel: "2 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-04", nextChapterId: "chapter-06" },
  { chapterId: "chapter-06", order: 6,  title: "A Tiger in the Zoo (Poetry)",            objective: "Analyse imagery and theme of freedom in the poem.",                 durationLabel: "1 day",  theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-05", nextChapterId: "chapter-07" },
  { chapterId: "chapter-07", order: 7,  title: "A Triumph of Surgery (Footprints without Feet)", objective: "Study humour in the story of Tricki the dog.",              durationLabel: "2 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-06", nextChapterId: "chapter-08" },
  { chapterId: "chapter-08", order: 8,  title: "The Thief's Story",                      objective: "Study character transformation and narrative technique.",          durationLabel: "2 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-07", nextChapterId: "chapter-09" },
  { chapterId: "chapter-09", order: 9,  title: "Grammar — Reported Speech & Clauses",    objective: "Master direct/indirect speech and noun/adjective/adverb clauses.",  durationLabel: "3 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-08", nextChapterId: "chapter-10" },
  { chapterId: "chapter-10", order: 10, title: "Writing Skills",                         objective: "Practice letter writing, analytical paragraphs, and story writing.", durationLabel: "3 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-09" },
];
