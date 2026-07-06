/**
 * @file database/schemas/chapter.schema.ts
 * @description MongoDB Chapter content schema for LearnVeda
 *
 * Stores NCERT chapter content for all classes (9–12) and engineering subjects.
 * One document per chapter — identified by classLevel + subject + chapterId.
 *
 * Collections: chapters
 *
 * Indexes:
 *   - compound: { classLevel, subject, chapterId } — unique
 *   - text index on title + content for full-text search
 */

import mongoose, { Schema, Document, Model } from "mongoose"; // Mongoose ODM

/* ─── Theory Block Sub-schema ────────────────────────────────────────────── */
/** A single theory section within a chapter */
const TheoryBlockSchema = new Schema(
  {
    heading:  { type: String, required: true },  // Section heading
    content:  { type: String, required: true },  // HTML or Markdown content
    type:     { type: String, enum: ["text", "formula", "diagram", "example", "note"], default: "text" },
    imageUrl: { type: String, default: "" },      // Optional diagram/image URL
  },
  { _id: false }
);

/* ─── Practice Question Sub-schema ──────────────────────────────────────── */
/** A single MCQ question within a chapter */
const QuestionSchema = new Schema(
  {
    id:         { type: String, required: true },   // Question unique ID
    text:       { type: String, required: true },   // Question text
    options:    [{ type: String, required: true }],  // 4 answer options
    correct:    { type: Number, required: true, min: 0, max: 3 }, // Correct answer index (0–3)
    explanation:{ type: String, default: "" },       // Explanation of the correct answer
    difficulty: { type: String, enum: ["easy", "medium", "hard"], default: "medium" },
    marks:      { type: Number, default: 1 },        // Marks for this question
    tags:       [{ type: String }],                  // Topic tags for filtering
  },
  { _id: false }
);

/* ─── Chapter Interface ──────────────────────────────────────────────────── */
export interface IChapter extends Document {
  /* Identity */
  classLevel:  string;   // e.g. "class-9", "class-10", "engineering-cse-sem-1"
  subject:     string;   // e.g. "mathematics", "physics", "data-structures"
  chapterId:   string;   // e.g. "chapter-01"
  chapterNo:   number;   // Chapter number (1-based)

  /* Content */
  title:       string;   // Chapter title
  objective:   string;   // Learning objective (1–2 sentences)
  theoryBlocks:typeof TheoryBlockSchema[]; // Theory sections
  keyPoints:   string[]; // Bullet points of key takeaways
  keyFormulas?: { label: string; formula: string }[]; // Named formulas
  summary:     string;   // Chapter summary

  /* Practice */
  questions:   typeof QuestionSchema[]; // Practice questions

  /* Navigation */
  prevChapterId?: string; // Previous chapter ID
  nextChapterId?: string; // Next chapter ID

  /* Simulation */
  hasSimulation:    boolean; // Does this chapter have an interactive simulation?
  simulationHref?:  string;  // Simulation URL

  /* Metadata */
  ncertRef:    string;   // NCERT chapter reference (e.g., "NCERT Class 9 Maths Ch. 1")
  difficulty:  "easy" | "medium" | "hard"; // Chapter difficulty
  duration:    number;   // Estimated reading time in minutes
  isPublished: boolean;  // Is this chapter live?

  /* Timestamps */
  createdAt:   Date;
  updatedAt:   Date;
}

/* ─── Chapter Schema ─────────────────────────────────────────────────────── */
const ChapterSchema = new Schema<IChapter>(
  {
    /* Identity */
    classLevel:  { type: String, required: true, index: true },
    subject:     { type: String, required: true, index: true },
    chapterId:   { type: String, required: true },
    chapterNo:   { type: Number, required: true, min: 1 },

    /* Content */
    title:       { type: String, required: true, maxlength: 200 },
    objective:   { type: String, required: true, maxlength: 500 },
    theoryBlocks:[TheoryBlockSchema],
    keyPoints:   [{ type: String }],
    keyFormulas: [{ label: { type: String }, formula: { type: String } }],
    summary:     { type: String, default: "" },

    /* Practice */
    questions:   [QuestionSchema],

    /* Navigation */
    prevChapterId: { type: String, default: null },
    nextChapterId: { type: String, default: null },

    /* Simulation */
    hasSimulation:   { type: Boolean, default: false },
    simulationHref:  { type: String, default: "" },

    /* Metadata */
    ncertRef:    { type: String, default: "" },
    difficulty:  { type: String, enum: ["easy", "medium", "hard"], default: "medium" },
    duration:    { type: Number, default: 30 }, // Minutes to read
    isPublished: { type: Boolean, default: false },
  },
  {
    timestamps: true, // Auto createdAt/updatedAt
    toJSON:     { virtuals: true },
  }
);

/* ─── Compound unique index ──────────────────────────────────────────────── */
ChapterSchema.index({ classLevel: 1, subject: 1, chapterId: 1 }, { unique: true });
ChapterSchema.index({ classLevel: 1, subject: 1, chapterNo: 1 });

/* ─── Full-text search index ─────────────────────────────────────────────── */
ChapterSchema.index(
  { title: "text", objective: "text", summary: "text" },
  { name: "chapter_text_search", weights: { title: 10, objective: 5, summary: 1 } }
);

/* ─── Virtual: Question count ────────────────────────────────────────────── */
ChapterSchema.virtual("questionCount").get(function (this: IChapter) {
  return this.questions?.length ?? 0;
});

/* ─── Model export ───────────────────────────────────────────────────────── */
export const Chapter: Model<IChapter> =
  mongoose.models.Chapter || mongoose.model<IChapter>("Chapter", ChapterSchema);
export default Chapter;
