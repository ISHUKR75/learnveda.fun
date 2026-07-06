/**
 * @file lib/content/class10-hindi.ts
 * @description Real, NCERT-aligned Class 10 Hindi curriculum content
 * (Kshitij, Kritika textbooks — 2025-26 edition).
 */

import type { ContentChapter } from "./class9-mathematics";

export const CLASS_10_HINDI_CHAPTERS: ContentChapter[] = [
  { chapterId: "chapter-01", order: 1,  title: "सूरदास के पद (Kshitij)",              objective: "भक्ति काव्य और सूरदास की भाषा शैली को समझें।",              durationLabel: "2 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], nextChapterId: "chapter-02" },
  { chapterId: "chapter-02", order: 2,  title: "राम-लक्ष्मण-परशुराम संवाद (Kshitij)", objective: "तुलसीदास की काव्य शैली और संवाद-कला का अध्ययन करें।",        durationLabel: "2 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-01", nextChapterId: "chapter-03" },
  { chapterId: "chapter-03", order: 3,  title: "नेताजी का चश्मा (Kshitij)",           objective: "देशभक्ति और प्रतीकात्मकता को समझें।",                       durationLabel: "2 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-02", nextChapterId: "chapter-04" },
  { chapterId: "chapter-04", order: 4,  title: "बालगोबिन भगत (Kshitij)",              objective: "चरित्र-चित्रण और भक्ति भावना का अध्ययन करें।",              durationLabel: "2 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-03", nextChapterId: "chapter-05" },
  { chapterId: "chapter-05", order: 5,  title: "माता का अँचल (Kritika)",              objective: "बाल मनोविज्ञान और पारिवारिक संबंधों को समझें।",             durationLabel: "2 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-04", nextChapterId: "chapter-06" },
  { chapterId: "chapter-06", order: 6,  title: "जॉर्ज पंचम की नाक (Kritika)",         objective: "व्यंग्य और हास्य शैली का विश्लेषण करें।",                    durationLabel: "2 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-05", nextChapterId: "chapter-07" },
  { chapterId: "chapter-07", order: 7,  title: "व्याकरण — समास, अलंकार",             objective: "समास, अलंकार, और रस के भेद सीखें।",                          durationLabel: "3 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-06", nextChapterId: "chapter-08" },
  { chapterId: "chapter-08", order: 8,  title: "लेखन कौशल",                          objective: "औपचारिक पत्र, निबंध, और संवाद लेखन का अभ्यास करें।",         durationLabel: "3 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-07" },
];
