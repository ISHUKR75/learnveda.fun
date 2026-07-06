/**
 * @file lib/mongodb/models/Chapter.ts
 * @description Mongoose Chapter model for LearnVeda's curriculum content engine
 *
 * A "Chapter" document is the single source of truth for one lesson inside
 * one subject inside one class/course (e.g. Class 9 -> Mathematics -> Number
 * Systems). This model powers:
 *   - The subject chapter-list page  (/learn/[class]/[subject])
 *   - The chapter detail page        (/learn/[class]/[subject]/[chapter])
 *   - Quiz generation for the Test Center
 *   - Search indexing (Meilisearch) for full-text course search
 *
 * Content is seeded from `scripts/seed/seed-content.ts` using the real,
 * NCERT-aligned data in `lib/content/*`. When MongoDB is not configured
 * (demo mode), callers fall back to the same static data files directly —
 * see `lib/services/content-service.ts` for the resolution logic.
 */

import mongoose, { Document, Model, Schema } from "mongoose"; // ODM types

/* ─── Sub-document Interfaces ────────────────────────────────────────────── */

// One theory section inside a chapter (heading + explanatory paragraph)
export interface ITheoryPoint {
  heading: string; // Short section title, e.g. "Rational Numbers"
  content: string; // Full explanatory paragraph for that section
}

// One named formula/definition card shown in the "Key Formulas" panel
export interface IKeyFormula {
  label:   string; // Human-readable name, e.g. "(a+b)²"
  formula: string; // The formula/expression itself
}

// One multiple-choice practice question tied to the chapter
export interface ISampleQuestion {
  question: string;   // The question text
  options:  string[]; // Exactly 4 answer choices
  answer:   number;   // Zero-based index of the correct option
}

/* ─── Main Document Interface ────────────────────────────────────────────── */
export interface IChapter extends Document {
  courseType:  "class" | "programming" | "engineering" | "core-cs"; // Top-level curriculum bucket
  classLevel:  string;  // e.g. "class-9", "class-10", "engineering-cse-sem1"
  subject:     string;  // e.g. "mathematics", "science", "python"
  chapterId:   string;  // e.g. "chapter-01", "day-05" — unique within (classLevel, subject)
  order:       number;  // Display order within the subject
  title:       string;  // Chapter title, e.g. "Number Systems"
  objective:   string;  // One-line learning objective shown at the top of the page
  durationLabel: string;  // Human label, e.g. "3 days"
  theoryPoints:  ITheoryPoint[];   // Ordered list of explained sub-topics
  keyFormulas:   IKeyFormula[];    // Optional formula reference cards
  keyPoints:     string[];         // Quick-revision bullet list
  hasSimulation: boolean;          // Whether an interactive simulation is attached
  simulationDescription?: string;  // Description shown above the simulation embed
  sampleQuestions: ISampleQuestion[]; // Practice MCQs shown at the end of the chapter
  prevChapterId?: string; // Chapter to navigate "back" to
  nextChapterId?: string; // Chapter to navigate "forward" to
  isPublished:  boolean;  // Only published chapters are served to students
  createdAt:    Date;
  updatedAt:    Date;
}

/* ─── Schema Definition ──────────────────────────────────────────────────── */
const TheoryPointSchema = new Schema<ITheoryPoint>(
  {
    heading: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
  },
  { _id: false } // Sub-documents don't need their own ObjectId
);

const KeyFormulaSchema = new Schema<IKeyFormula>(
  {
    label:   { type: String, required: true, trim: true },
    formula: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const SampleQuestionSchema = new Schema<ISampleQuestion>(
  {
    question: { type: String, required: true, trim: true },
    options:  {
      type: [String],
      required: true,
      validate: {
        validator: (v: string[]) => v.length === 4, // Enforce exactly 4 MCQ options
        message:   "Every sample question must have exactly 4 options",
      },
    },
    answer: { type: Number, required: true, min: 0, max: 3 }, // Index into options[]
  },
  { _id: false }
);

const ChapterSchema = new Schema<IChapter>(
  {
    courseType: {
      type:     String,
      enum:     ["class", "programming", "engineering", "core-cs"],
      required: [true, "Course type is required"],
      index:    true,
    },

    classLevel: {
      type:      String, // Partition key for a curriculum track
      required:  [true, "Class level is required"],
      lowercase: true,
      trim:      true,
      index:     true,
    },

    subject: {
      type:      String,
      required:  [true, "Subject is required"],
      lowercase: true,
      trim:      true,
    },

    chapterId: {
      type:      String,
      required:  [true, "Chapter ID is required"],
      lowercase: true,
      trim:      true,
    },

    order: {
      type:    Number,
      required: [true, "Display order is required"],
      min:      1,
    },

    title:     { type: String, required: true, trim: true },
    objective: { type: String, required: true, trim: true },

    durationLabel: { type: String, default: "1 day" },

    theoryPoints: { type: [TheoryPointSchema], default: [] },
    keyFormulas:  { type: [KeyFormulaSchema],  default: [] },
    keyPoints:    { type: [String],            default: [] },

    hasSimulation:          { type: Boolean, default: false },
    simulationDescription:  { type: String,  default: "" },

    sampleQuestions: { type: [SampleQuestionSchema], default: [] },

    prevChapterId: { type: String, default: null },
    nextChapterId: { type: String, default: null },

    isPublished: { type: Boolean, default: true }, // Draft chapters set this to false
  },
  {
    timestamps: true,  // Auto createdAt / updatedAt
    versionKey: false,
  }
);

/* ─── Indexes ────────────────────────────────────────────────────────────── */
// Primary lookup pattern: fetch every chapter for a (classLevel, subject) pair, ordered
ChapterSchema.index({ classLevel: 1, subject: 1, order: 1 });

// Unique constraint: no duplicate chapterId within the same subject/class
ChapterSchema.index({ classLevel: 1, subject: 1, chapterId: 1 }, { unique: true });

/* ─── Model Export ───────────────────────────────────────────────────────── */
export const Chapter: Model<IChapter> =
  (mongoose.models.Chapter as Model<IChapter>) ??
  mongoose.model<IChapter>("Chapter", ChapterSchema);

export default Chapter;
