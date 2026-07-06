/**
 * @file lib/services/content-service.ts
 * @description Curriculum content service — the single place that decides
 * whether chapter data comes from MongoDB or from the bundled static content
 * (demo mode fallback).
 *
 * Every page/API route that needs chapter data should call these functions
 * instead of talking to Mongoose or the static content files directly. This
 * keeps the "DB vs demo mode" branching logic in exactly one place.
 */

import { connectDB } from "@/lib/mongodb";
import { Chapter, type IChapter } from "@/lib/mongodb/models";
import {
  CLASS_9_MATHEMATICS_CHAPTERS,
  type ContentChapter,
} from "@/lib/content/class9-mathematics";
import { CLASS_9_SCIENCE_CHAPTERS } from "@/lib/content/class9-science";
import { CLASS_9_SOCIAL_SCIENCE_CHAPTERS } from "@/lib/content/class9-social-science";
import { CLASS_9_ENGLISH_CHAPTERS } from "@/lib/content/class9-english";
import { CLASS_9_HINDI_CHAPTERS } from "@/lib/content/class9-hindi";
import { CLASS_10_MATHEMATICS_CHAPTERS } from "@/lib/content/class10-mathematics";
import { CLASS_10_SCIENCE_CHAPTERS } from "@/lib/content/class10-science";
import { CLASS_10_PHYSICS_CHAPTERS } from "@/lib/content/class10-physics";
import { CLASS_10_CHEMISTRY_CHAPTERS } from "@/lib/content/class10-chemistry";
import { CLASS_10_BIOLOGY_CHAPTERS } from "@/lib/content/class10-biology";
import { CLASS_10_SOCIAL_SCIENCE_CHAPTERS } from "@/lib/content/class10-social-science";
import { CLASS_10_ENGLISH_CHAPTERS } from "@/lib/content/class10-english";
import { CLASS_10_HINDI_CHAPTERS } from "@/lib/content/class10-hindi";
import { CLASS_10_COMPUTER_SCIENCE_CHAPTERS } from "@/lib/content/class10-computer-science";
import { CLASS_10_SANSKRIT_CHAPTERS } from "@/lib/content/class10-sanskrit";

/* ─── Static Content Registry ────────────────────────────────────────────── */
// Maps "classLevel:subject" to its bundled static chapter array. New subjects
// register themselves here as their content files are authored.
const STATIC_CONTENT: Record<string, ContentChapter[]> = {
  "class-9:mathematics":       CLASS_9_MATHEMATICS_CHAPTERS,
  "class-9:science":           CLASS_9_SCIENCE_CHAPTERS,
  "class-9:social-science":    CLASS_9_SOCIAL_SCIENCE_CHAPTERS,
  "class-9:english":           CLASS_9_ENGLISH_CHAPTERS,
  "class-9:hindi":             CLASS_9_HINDI_CHAPTERS,
  "class-10:mathematics":      CLASS_10_MATHEMATICS_CHAPTERS,
  "class-10:science":          CLASS_10_SCIENCE_CHAPTERS,
  "class-10:physics":          CLASS_10_PHYSICS_CHAPTERS,
  "class-10:chemistry":        CLASS_10_CHEMISTRY_CHAPTERS,
  "class-10:biology":          CLASS_10_BIOLOGY_CHAPTERS,
  "class-10:social-science":   CLASS_10_SOCIAL_SCIENCE_CHAPTERS,
  "class-10:english":          CLASS_10_ENGLISH_CHAPTERS,
  "class-10:hindi":            CLASS_10_HINDI_CHAPTERS,
  "class-10:computer-science": CLASS_10_COMPUTER_SCIENCE_CHAPTERS,
  "class-10:sanskrit":         CLASS_10_SANSKRIT_CHAPTERS,
};

/* ─── Shared normalized shape returned to callers ────────────────────────── */
export interface ChapterSummary {
  chapterId: string;
  order:     number;
  title:     string;
  durationLabel: string;
  hasSimulation: boolean;
  hasQuiz:   boolean; // Derived: true when sampleQuestions.length > 0
}

export interface ChapterDetail extends ChapterSummary {
  objective:    string;
  theoryPoints: { heading: string; content: string }[];
  keyFormulas:  { label: string; formula: string }[];
  keyPoints:    string[];
  simulationDescription?: string;
  sampleQuestions: { question: string; options: string[]; answer: number }[];
  prevChapterId?: string;
  nextChapterId?: string;
}

/* ─── Helpers to normalize DB docs and static entries to the same shape ──── */
function fromDbDoc(doc: IChapter): ChapterDetail {
  return {
    chapterId: doc.chapterId,
    order:     doc.order,
    title:     doc.title,
    durationLabel: doc.durationLabel,
    hasSimulation: doc.hasSimulation,
    hasQuiz:   doc.sampleQuestions.length > 0,
    objective: doc.objective,
    theoryPoints: doc.theoryPoints,
    keyFormulas:  doc.keyFormulas,
    keyPoints:    doc.keyPoints,
    simulationDescription: doc.simulationDescription,
    sampleQuestions: doc.sampleQuestions,
    prevChapterId: doc.prevChapterId,
    nextChapterId: doc.nextChapterId,
  };
}

function fromStatic(entry: ContentChapter): ChapterDetail {
  return {
    chapterId: entry.chapterId,
    order:     entry.order,
    title:     entry.title,
    durationLabel: entry.durationLabel,
    hasSimulation: entry.hasSimulation,
    hasQuiz:   entry.sampleQuestions.length > 0,
    objective: entry.objective,
    theoryPoints: entry.theoryPoints,
    keyFormulas:  entry.keyFormulas,
    keyPoints:    entry.keyPoints,
    simulationDescription: entry.simulationDescription,
    sampleQuestions: entry.sampleQuestions,
    prevChapterId: entry.prevChapterId,
    nextChapterId: entry.nextChapterId,
  };
}

/**
 * Returns true when a real MongoDB connection can be established.
 * Used to decide whether to hit the database or fall back to static content.
 */
async function isDbAvailable(): Promise<boolean> {
  if (!process.env.MONGODB_URI) return false; // No URI configured → demo mode
  try {
    await connectDB();
    return true;
  } catch {
    return false; // DB configured but unreachable → gracefully fall back
  }
}

/**
 * Fetches the ordered chapter list for a given class level + subject.
 * Tries MongoDB first; falls back to bundled static content in demo mode
 * or when the requested content hasn't been seeded yet.
 */
export async function getChapterList(
  classLevel: string,
  subject: string
): Promise<ChapterSummary[]> {
  if (await isDbAvailable()) {
    const docs = await Chapter.find({ classLevel, subject, isPublished: true })
      .sort({ order: 1 })
      .lean<IChapter[]>();

    if (docs.length > 0) {
      return docs.map((doc) => ({
        chapterId: doc.chapterId,
        order:     doc.order,
        title:     doc.title,
        durationLabel: doc.durationLabel,
        hasSimulation: doc.hasSimulation,
        hasQuiz:   doc.sampleQuestions.length > 0,
      }));
    }
  }

  // Fall back to static content (demo mode, or subject not yet seeded)
  const staticEntries = STATIC_CONTENT[`${classLevel}:${subject}`] ?? [];
  return staticEntries
    .sort((a, b) => a.order - b.order)
    .map((entry) => ({
      chapterId: entry.chapterId,
      order:     entry.order,
      title:     entry.title,
      durationLabel: entry.durationLabel,
      hasSimulation: entry.hasSimulation,
      hasQuiz:   entry.sampleQuestions.length > 0,
    }));
}

/**
 * Fetches a single chapter's full detail (theory, formulas, quiz) for the
 * chapter reading page. Returns `null` when the chapter doesn't exist in
 * either the database or the static fallback.
 */
export async function getChapterDetail(
  classLevel: string,
  subject: string,
  chapterId: string
): Promise<ChapterDetail | null> {
  if (await isDbAvailable()) {
    const doc = await Chapter.findOne({ classLevel, subject, chapterId, isPublished: true }).lean<IChapter>();
    if (doc) return fromDbDoc(doc);
  }

  const staticEntries = STATIC_CONTENT[`${classLevel}:${subject}`] ?? [];
  const entry = staticEntries.find((c) => c.chapterId === chapterId);
  return entry ? fromStatic(entry) : null;
}
