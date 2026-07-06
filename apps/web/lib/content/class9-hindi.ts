/**
 * @file lib/content/class9-hindi.ts
 * @description Real, NCERT-aligned Class 9 Hindi curriculum content
 * (Kshitij, Sparsh, Kritika, Sanchayan — 2025-26 edition).
 *
 * Reused by `scripts/seed/seed-content.ts` (writes into MongoDB) and by
 * `lib/services/content-service.ts` (demo-mode fallback when DB is offline).
 */

import type { ContentChapter } from "./class9-mathematics";

/* ─── Class 9 Hindi — Full Chapter List (NCERT 2025-26) ─────────────────── */
export const CLASS_9_HINDI_CHAPTERS: ContentChapter[] = [
  { chapterId: "chapter-01", order: 1, title: "दो बैलों की कथा (Kshitij)",       objective: "कहानी का सारांश, पात्र परिचय और भाषा शैली समझें।",           durationLabel: "2 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], nextChapterId: "chapter-02" },
  { chapterId: "chapter-02", order: 2, title: "ल्हासा की ओर (Kshitij)",          objective: "यात्रा वृत्तांत, लेखक परिचय और सारांश का अध्ययन करें।",       durationLabel: "2 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-01", nextChapterId: "chapter-03" },
  { chapterId: "chapter-03", order: 3, title: "उपभोक्तावाद की संस्कृति",         objective: "निबंध का विश्लेषण और भाषाई बिंदुओं को समझें।",              durationLabel: "2 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-02", nextChapterId: "chapter-04" },
  { chapterId: "chapter-04", order: 4, title: "साँवले सपनों की याद",             objective: "कहानी सारांश और प्रकृति चित्रण पर ध्यान दें।",              durationLabel: "2 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-03", nextChapterId: "chapter-05" },
  { chapterId: "chapter-05", order: 5, title: "नाना साहब की पुत्री (Sparsh)",     objective: "ऐतिहासिक संदर्भ, बलिदान और भावनाओं को समझें।",              durationLabel: "2 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-04", nextChapterId: "chapter-06" },
  { chapterId: "chapter-06", order: 6, title: "प्रेमचंद के फटे जूते (Sparsh)",    objective: "व्यंग्य शैली और प्रेमचंद की जीवनी का अध्ययन करें।",         durationLabel: "2 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-05", nextChapterId: "chapter-07" },
  { chapterId: "chapter-07", order: 7, title: "व्याकरण — संज्ञा, सर्वनाम",       objective: "संज्ञा, सर्वनाम, विशेषण और क्रिया के नियम सीखें।",          durationLabel: "3 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-06", nextChapterId: "chapter-08" },
  { chapterId: "chapter-08", order: 8, title: "लेखन कौशल",                       objective: "अनुच्छेद लेखन, पत्र लेखन और निबंध लेखन का अभ्यास करें।",     durationLabel: "4 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-07" },
];
