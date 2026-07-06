/**
 * @file lib/content/class10-computer-science.ts
 * @description Real, CBSE-aligned Class 10 Computer Applications curriculum
 * content — HTML/CSS/JavaScript basics, database fundamentals, networking.
 */

import type { ContentChapter } from "./class9-mathematics";

export const CLASS_10_COMPUTER_SCIENCE_CHAPTERS: ContentChapter[] = [
  { chapterId: "chapter-01", order: 1, title: "Networking and Its Types",       objective: "Study LAN, MAN, WAN, and network topologies.",                  durationLabel: "3 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], nextChapterId: "chapter-02" },
  { chapterId: "chapter-02", order: 2, title: "Introduction to HTML",          objective: "Learn HTML tags, elements, and page structure.",                durationLabel: "3 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-01", nextChapterId: "chapter-03" },
  { chapterId: "chapter-03", order: 3, title: "HTML Formatting and Forms",     objective: "Study text formatting, tables, and HTML forms.",                durationLabel: "3 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-02", nextChapterId: "chapter-04" },
  { chapterId: "chapter-04", order: 4, title: "Introduction to CSS",           objective: "Learn CSS selectors, box model, and styling basics.",           durationLabel: "3 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-03", nextChapterId: "chapter-05" },
  { chapterId: "chapter-05", order: 5, title: "Introduction to JavaScript",    objective: "Learn variables, operators, and basic JavaScript syntax.",      durationLabel: "3 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-04", nextChapterId: "chapter-06" },
  { chapterId: "chapter-06", order: 6, title: "Database Concepts",            objective: "Understand DBMS, tables, keys, and relationships.",             durationLabel: "2 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-05", nextChapterId: "chapter-07" },
  { chapterId: "chapter-07", order: 7, title: "Introduction to SQL",           objective: "Learn basic SQL commands: SELECT, INSERT, UPDATE, DELETE.",     durationLabel: "3 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-06", nextChapterId: "chapter-08" },
  { chapterId: "chapter-08", order: 8, title: "Cyber Safety",                  objective: "Study internet safety, digital footprint, and cyber ethics.",   durationLabel: "2 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-07" },
];
