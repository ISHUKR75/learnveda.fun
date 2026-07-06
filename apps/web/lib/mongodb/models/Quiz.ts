/**
 * @file lib/mongodb/models/Quiz.ts
 * @description Mongoose Quiz model for LearnVeda
 *
 * Represents a single quiz (a set of MCQ questions for a chapter/topic).
 * Questions are embedded documents within the quiz.
 *
 * Used for:
 *  - Chapter-end quizzes
 *  - Live battle questions bank
 *  - Practice sets
 *  - Mock test papers
 */

import mongoose, { Document, Schema, Types } from "mongoose";

/* ─── Embedded Question Schema ───────────────────────────────────────────── */
interface IQuestion {
  text:        string;    // Question text
  options:     string[];  // Array of 4 option texts
  correct:     number;    // Index (0–3) of the correct option
  explanation: string;    // Why this is the correct answer
  difficulty:  "easy" | "medium" | "hard"; // Question difficulty
  xp:          number;    // XP awarded for correct answer
}

const QuestionSchema = new Schema<IQuestion>({
  text:        { type: String, required: true },         // Question text
  options:     { type: [String], required: true, validate: [(v: string[]) => v.length === 4, "Must have exactly 4 options"] },
  correct:     { type: Number, required: true, min: 0, max: 3 }, // 0–3 index
  explanation: { type: String, default: "" },            // Explanation shown after answering
  difficulty:  { type: String, enum: ["easy", "medium", "hard"], default: "medium" },
  xp:          { type: Number, default: 10 },            // XP for correct answer
});

/* ─── Quiz Document Interface ────────────────────────────────────────────── */
export interface IQuiz extends Document {
  _id:         Types.ObjectId;
  title:       string;                     // e.g. "Chapter 3: Polynomials — Quiz"
  description: string;                     // Short description
  subject:     string;                     // "Mathematics", "Physics", etc.
  class?:      string;                     // "9", "10", "11", "12" or null for CS/Prog
  chapter?:    string;                     // Chapter number or slug
  type:        "chapter" | "practice" | "battle" | "mock_test"; // Quiz type
  difficulty:  "easy" | "medium" | "hard" | "mixed"; // Overall difficulty
  questions:   IQuestion[];                // Embedded questions (5–50)
  duration:    number;                     // Time limit in seconds
  xpReward:    number;                     // XP for completing the quiz
  isPublished: boolean;                    // Only published quizzes are shown to students
  createdBy:   string;                     // Admin user ID
  attempts:    number;                     // Total number of student attempts
  avgScore:    number;                     // Average score % across all attempts
  createdAt:   Date;
  updatedAt:   Date;
}

/* ─── Quiz Schema ────────────────────────────────────────────────────────── */
const QuizSchema = new Schema<IQuiz>(
  {
    title:       { type: String, required: true, index: true }, // Indexed for search
    description: { type: String, default: "" },
    subject:     { type: String, required: true, index: true }, // Indexed for filtering
    class:       { type: String, index: true },                 // e.g. "9", "10"
    chapter:     { type: String },                              // Chapter slug
    type:        {
      type:    String,
      enum:    ["chapter", "practice", "battle", "mock_test"],
      default: "chapter",
      index:   true,
    },
    difficulty:  {
      type:    String,
      enum:    ["easy", "medium", "hard", "mixed"],
      default: "medium",
    },
    questions:   { type: [QuestionSchema], required: true },    // Embedded questions
    duration:    { type: Number, default: 300 },                // 5 minutes default
    xpReward:    { type: Number, default: 50 },                 // XP for completion
    isPublished: { type: Boolean, default: false, index: true },// Only show published quizzes
    createdBy:   { type: String, required: true },              // Admin who created this
    attempts:    { type: Number, default: 0 },                  // Usage stats
    avgScore:    { type: Number, default: 0 },                  // Performance stats
  },
  {
    timestamps:  true,      // Adds createdAt, updatedAt automatically
    collection:  "quizzes", // MongoDB collection name
  }
);

/* ─── Text Search Index ──────────────────────────────────────────────────── */
// Enables full-text search on quiz title and description
QuizSchema.index({ title: "text", description: "text" });

/* ─── Export Model ───────────────────────────────────────────────────────── */
// Guard against model redefinition in Next.js hot-reloading
export const Quiz = (mongoose.models.Quiz as mongoose.Model<IQuiz>)
  ?? mongoose.model<IQuiz>("Quiz", QuizSchema);
