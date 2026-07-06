/**
 * @file lib/content/class10-sanskrit.ts
 * @description Real, NCERT-aligned Class 10 Sanskrit curriculum content
 * (Shemushi textbook — 2025-26 edition).
 */

import type { ContentChapter } from "./class9-mathematics";

export const CLASS_10_SANSKRIT_CHAPTERS: ContentChapter[] = [
  { chapterId: "chapter-01", order: 1, title: "शुचिपर्यावरणम् (Shemushi)",     objective: "पर्यावरण संरक्षण विषयक पाठ का अध्ययन करें।",         durationLabel: "2 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], nextChapterId: "chapter-02" },
  { chapterId: "chapter-02", order: 2, title: "बुद्धिर्बलवती सदा (Shemushi)",  objective: "बुद्धि के महत्व पर आधारित कथा को समझें।",             durationLabel: "2 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-01", nextChapterId: "chapter-03" },
  { chapterId: "chapter-03", order: 3, title: "व्यायामः सर्वदा पथ्यः (Shemushi)", objective: "व्यायाम के महत्व पर पाठ का अध्ययन करें।",           durationLabel: "2 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-02", nextChapterId: "chapter-04" },
  { chapterId: "chapter-04", order: 4, title: "शब्द रूप एवं धातु रूप",          objective: "संज्ञा और क्रिया के रूपों का अभ्यास करें।",          durationLabel: "3 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-03", nextChapterId: "chapter-05" },
  { chapterId: "chapter-05", order: 5, title: "संधि एवं समास",                 objective: "संधि के भेद और समास के प्रकार सीखें।",               durationLabel: "3 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-04", nextChapterId: "chapter-06" },
  { chapterId: "chapter-06", order: 6, title: "कारक एवं विभक्ति",              objective: "कारक के भेद और विभक्ति प्रयोग को समझें।",            durationLabel: "3 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-05", nextChapterId: "chapter-07" },
  { chapterId: "chapter-07", order: 7, title: "रचनात्मक कार्य — निबंध लेखन",     objective: "संस्कृत में निबंध और पत्र लेखन का अभ्यास करें।",      durationLabel: "3 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-06", nextChapterId: "chapter-08" },
  { chapterId: "chapter-08", order: 8, title: "अपठित अवबोधन",                  objective: "अपठित गद्यांश और पद्यांश का अभ्यास करें।",            durationLabel: "2 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-07", nextChapterId: "chapter-09" },
  { chapterId: "chapter-09", order: 9, title: "मौखिक अभिव्यक्ति",             objective: "संस्कृत संभाषण और मौखिक अभ्यास को सुदृढ़ करें।",       durationLabel: "1 day",  theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-08" },
];
