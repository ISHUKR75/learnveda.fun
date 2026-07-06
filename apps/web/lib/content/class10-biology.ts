/**
 * @file lib/content/class10-biology.ts
 * @description Real, NCERT-aligned Class 10 Biology curriculum content —
 * the biology-specific chapters of the CBSE Class 10 Science syllabus,
 * offered as a standalone subject track for focused study.
 */

import type { ContentChapter } from "./class9-mathematics";

export const CLASS_10_BIOLOGY_CHAPTERS: ContentChapter[] = [
  { chapterId: "chapter-01", order: 1, title: "Life Processes",                          objective: "Study nutrition, respiration, transportation, and excretion.",     durationLabel: "4 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], nextChapterId: "chapter-02" },
  { chapterId: "chapter-02", order: 2, title: "Control and Coordination",                objective: "Study the nervous system, reflex actions, and plant hormones.",    durationLabel: "3 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-01", nextChapterId: "chapter-03" },
  { chapterId: "chapter-03", order: 3, title: "How do Organisms Reproduce?",             objective: "Compare asexual and sexual reproduction across organisms.",       durationLabel: "3 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-02", nextChapterId: "chapter-04" },
  { chapterId: "chapter-04", order: 4, title: "Heredity",                                objective: "Study Mendel's laws of inheritance and evolution.",                durationLabel: "3 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-03", nextChapterId: "chapter-05" },
  { chapterId: "chapter-05", order: 5, title: "Our Environment",                         objective: "Study ecosystems, food chains, and environmental issues.",         durationLabel: "2 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-04", nextChapterId: "chapter-06" },
  { chapterId: "chapter-06", order: 6, title: "Sustainable Management of Natural Resources", objective: "Study forest, water conservation, and the 5 R's.",              durationLabel: "2 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-05" },
];
