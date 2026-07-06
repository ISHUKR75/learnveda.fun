/**
 * @file lib/mongodb/models/Battle.ts
 * @description Mongoose Battle model for LearnVeda live battles
 *
 * Represents a 1v1 live coding/quiz battle between two students.
 * Tracks the full battle lifecycle: waiting → active → completed.
 *
 * Real-time battle state is managed via Socket.IO (in-memory).
 * MongoDB is used for persistent records, leaderboard, and analytics.
 */

import mongoose, { Document, Schema, Types } from "mongoose";

/* ─── Battle Document Interface ──────────────────────────────────────────── */
export interface IBattle extends Document {
  _id:         Types.ObjectId;
  // Participants
  player1Id:   string;       // Clerk user ID of player 1 (challenger)
  player2Id:   string;       // Clerk user ID of player 2 (opponent)
  player1Name: string;       // Display name of player 1
  player2Name: string;       // Display name of player 2
  // Battle config
  subject:     string;       // Subject: "mathematics", "physics", "dsa", etc.
  class?:      string;       // CBSE class filter (optional)
  difficulty:  "easy" | "medium" | "hard"; // Question difficulty
  questionCount: number;     // Number of questions (default 10)
  timePerQ:    number;       // Seconds per question (default 15)
  // Battle state
  status:      "waiting" | "active" | "completed" | "cancelled"; // Lifecycle state
  startedAt?:  Date;         // When the battle became active
  endedAt?:    Date;         // When the battle ended
  // Scores
  player1Score: number;      // Player 1's final score
  player2Score: number;      // Player 2's final score
  winnerId?:   string;       // Clerk user ID of the winner (undefined if draw)
  isDraw:      boolean;      // True if both players have equal scores
  // XP changes
  player1XpGain: number;     // XP awarded to player 1
  player2XpGain: number;     // XP awarded to player 2
  // ELO tracking
  player1EloBefore: number;  // Player 1's ELO before the battle
  player2EloBefore: number;  // Player 2's ELO before the battle
  player1EloAfter:  number;  // Player 1's ELO after the battle
  player2EloAfter:  number;  // Player 2's ELO after the battle
  // Questions used
  quizId?:     Types.ObjectId; // Reference to the Quiz used
  createdAt:   Date;
  updatedAt:   Date;
}

/* ─── Battle Schema ──────────────────────────────────────────────────────── */
const BattleSchema = new Schema<IBattle>(
  {
    player1Id:   { type: String, required: true, index: true },  // Indexed for user battle history
    player2Id:   { type: String, required: true, index: true },
    player1Name: { type: String, required: true },
    player2Name: { type: String, required: true },

    subject:     { type: String, required: true, index: true },
    class:       { type: String },
    difficulty:  { type: String, enum: ["easy", "medium", "hard"], default: "medium" },
    questionCount: { type: Number, default: 10 },
    timePerQ:    { type: Number, default: 15 },

    status:      {
      type:    String,
      enum:    ["waiting", "active", "completed", "cancelled"],
      default: "waiting",
      index:   true,
    },
    startedAt:   { type: Date },
    endedAt:     { type: Date },

    player1Score: { type: Number, default: 0 },
    player2Score: { type: Number, default: 0 },
    winnerId:    { type: String },
    isDraw:      { type: Boolean, default: false },

    player1XpGain: { type: Number, default: 0 },
    player2XpGain: { type: Number, default: 0 },

    player1EloBefore: { type: Number, default: 1000 },
    player2EloBefore: { type: Number, default: 1000 },
    player1EloAfter:  { type: Number, default: 1000 },
    player2EloAfter:  { type: Number, default: 1000 },

    quizId:      { type: Schema.Types.ObjectId, ref: "Quiz" },
  },
  {
    timestamps: true,
    collection: "battles",
  }
);

/* ─── Compound Index ─────────────────────────────────────────────────────── */
// Fast lookup: find all battles a user participated in, sorted by date
BattleSchema.index({ player1Id: 1, createdAt: -1 });
BattleSchema.index({ player2Id: 1, createdAt: -1 });
BattleSchema.index({ status: 1, createdAt: -1 }); // For matchmaking: find waiting battles

/* ─── Export Model ───────────────────────────────────────────────────────── */
export const Battle = (mongoose.models.Battle as mongoose.Model<IBattle>)
  ?? mongoose.model<IBattle>("Battle", BattleSchema);
