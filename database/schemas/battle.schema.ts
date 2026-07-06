/**
 * @file database/schemas/battle.schema.ts
 * @description MongoDB Battle (Live 1v1 match) schema for LearnVeda
 *
 * Stores the full record of every live battle match:
 *   - Participants and their answers
 *   - Question set used
 *   - Scores and winner
 *   - ELO rating changes
 *
 * Collections: battles
 *
 * Indexes:
 *   - { player1Id, createdAt } and { player2Id, createdAt } — per-user history
 *   - status: 1 — for active match queries
 */

import mongoose, { Schema, Document, Model } from "mongoose"; // Mongoose ODM

/* ─── Answer Record Sub-schema ───────────────────────────────────────────── */
/** A single answer submission by a player */
const AnswerSchema = new Schema(
  {
    questionIndex: { type: Number, required: true },          // Which question (0-based)
    answer:        { type: Number, required: true, min: -1 },  // Answer index (-1 = no answer)
    correct:       { type: Boolean, required: true },          // Was it correct?
    responseTimeMs:{ type: Number, required: true, min: 0 },   // Time taken in ms
    xpEarned:      { type: Number, default: 0 },               // XP for this answer
  },
  { _id: false }
);

/* ─── Battle Question Sub-schema ─────────────────────────────────────────── */
/** A question used in a battle (de-normalized for query efficiency) */
const BattleQuestionSchema = new Schema(
  {
    questionId: { type: String, required: true },   // Reference to question in chapters collection
    text:       { type: String, required: true },   // Question text (de-normalized)
    options:    [{ type: String, required: true }],  // Options (de-normalized)
    correct:    { type: Number, required: true },    // Correct answer index
    subject:    { type: String, required: true },    // Subject tag
    difficulty: { type: String, required: true },    // Question difficulty
  },
  { _id: false }
);

/* ─── Battle Interface ───────────────────────────────────────────────────── */
export interface IBattle extends Document {
  /* Room */
  roomId:      string;   // Unique socket room ID
  subject:     string;   // Battle subject ("mixed" | "mathematics" | "dsa" | etc.)
  mode:        "ranked" | "casual" | "practice"; // Battle mode

  /* Participants */
  player1Id:   string;   // Clerk user ID
  player1Name: string;   // Display name (de-normalized)
  player2Id:   string;   // Clerk user ID
  player2Name: string;   // Display name (de-normalized)

  /* Questions */
  questions:   typeof BattleQuestionSchema[]; // 10 questions for the match

  /* Answers */
  player1Answers: typeof AnswerSchema[];   // Player 1's answers
  player2Answers: typeof AnswerSchema[];   // Player 2's answers

  /* Scores */
  player1Score: number; // Final score (correct answers × time bonus)
  player2Score: number; // Final score

  /* Result */
  winner:      "player1" | "player2" | "draw" | null; // Match result
  winReason:   string; // "higher_score" | "opponent_disconnected" | "timeout" | "draw"

  /* ELO rating changes */
  player1EloChange: number; // e.g. +15 or -10
  player2EloChange: number;
  player1EloAfter:  number; // New ELO after match
  player2EloAfter:  number;

  /* Timing */
  startedAt:   Date;    // When match started
  endedAt?:    Date;    // When match ended (null if in progress)
  durationMs:  number;  // Total match duration

  /* Status */
  status: "waiting" | "active" | "completed" | "abandoned"; // Match lifecycle

  /* Timestamps */
  createdAt:   Date;
  updatedAt:   Date;
}

/* ─── Battle Schema ──────────────────────────────────────────────────────── */
const BattleSchema = new Schema<IBattle>(
  {
    /* Room */
    roomId:      { type: String, required: true, unique: true },
    subject:     { type: String, default: "mixed" },
    mode:        { type: String, enum: ["ranked", "casual", "practice"], default: "ranked" },

    /* Participants */
    player1Id:   { type: String, required: true, index: true },
    player1Name: { type: String, required: true },
    player2Id:   { type: String, required: true, index: true },
    player2Name: { type: String, required: true },

    /* Questions */
    questions: [BattleQuestionSchema],

    /* Answers */
    player1Answers: [AnswerSchema],
    player2Answers: [AnswerSchema],

    /* Scores */
    player1Score: { type: Number, default: 0, min: 0 },
    player2Score: { type: Number, default: 0, min: 0 },

    /* Result */
    winner:    { type: String, enum: ["player1", "player2", "draw", null], default: null },
    winReason: { type: String, default: "" },

    /* ELO */
    player1EloChange: { type: Number, default: 0 },
    player2EloChange: { type: Number, default: 0 },
    player1EloAfter:  { type: Number, default: 1000 },
    player2EloAfter:  { type: Number, default: 1000 },

    /* Timing */
    startedAt:  { type: Date, required: true },
    endedAt:    { type: Date, default: null },
    durationMs: { type: Number, default: 0 },

    /* Status */
    status: { type: String, enum: ["waiting", "active", "completed", "abandoned"], default: "waiting" },
  },
  {
    timestamps: true,
    toJSON:     { virtuals: true },
  }
);

/* ─── Indexes ────────────────────────────────────────────────────────────── */
BattleSchema.index({ player1Id: 1, createdAt: -1 }); // Player 1's battle history
BattleSchema.index({ player2Id: 1, createdAt: -1 }); // Player 2's battle history
BattleSchema.index({ status: 1 });                    // Active matches
BattleSchema.index({ subject: 1, mode: 1 });          // Matchmaking queries

/* ─── Virtual: match duration formatted ─────────────────────────────────── */
BattleSchema.virtual("durationFormatted").get(function (this: IBattle) {
  const sec = Math.round(this.durationMs / 1000);
  return `${Math.floor(sec / 60)}m ${sec % 60}s`;
});

/* ─── Model export ───────────────────────────────────────────────────────── */
export const Battle: Model<IBattle> =
  mongoose.models.Battle || mongoose.model<IBattle>("Battle", BattleSchema);
export default Battle;
