/**
 * @file types/battle.ts
 * @description Live battle, matchmaking, and competitive mode TypeScript types
 * Used across live-battles page, real-time Socket.IO events, and battle history
 */

/* ─── Battle Mode ─────────────────────────────────────────────────────────── */
export type BattleMode = "quick" | "ranked" | "subject" | "friend"; // Available game modes

/* ─── Battle Status ───────────────────────────────────────────────────────── */
export type BattleStatus = "waiting" | "in-progress" | "finished" | "cancelled"; // Match lifecycle states

/* ─── Battle Player ───────────────────────────────────────────────────────── */
/**
 * A player's state within a live battle session
 */
export interface BattlePlayer {
  userId:          string;   // User ID
  displayName:     string;   // Display name shown in battle UI
  avatar?:         string;   // Profile picture URL
  level:           number;   // Player level (for display)
  eloRating:       number;   // Current Elo rating (for ranked)
  score:           number;   // Current score in the battle
  correctAnswers:  number;   // Correct answers count
  incorrectAnswers: number;  // Incorrect answers count
  timeUsed:        number;   // Total time used in seconds
  isReady:         boolean;  // Player confirmed ready to start
  isConnected:     boolean;  // WebSocket connection status
}

/* ─── Battle Session ──────────────────────────────────────────────────────── */
/**
 * A live battle session between two players
 */
export interface BattleSession {
  id:          string;        // Unique battle/match ID
  mode:        BattleMode;    // Battle format
  status:      BattleStatus;  // Current match status
  subject:     string;        // Subject area (math, physics, etc.)
  player1:     BattlePlayer;  // First player
  player2:     BattlePlayer;  // Second player
  questions:   string[];      // Ordered question IDs
  currentQ:    number;        // Index of the current question (0-based)
  totalQ:      number;        // Total questions in the match
  timePerQ:    number;        // Seconds allowed per question
  startedAt:   Date;          // Match start timestamp
  endedAt?:    Date;          // Match end timestamp (undefined if ongoing)
  winnerId?:   string;        // Winner's user ID (undefined if draw)
  xpAwarded?:  number;        // XP given to winner
  eloChange?:  number;        // Elo rating change (ranked only)
  roomCode?:   string;        // Friend challenge room code
}

/* ─── Battle Result ───────────────────────────────────────────────────────── */
/**
 * Post-battle result shown on the results screen
 */
export interface BattleResult {
  battleId:       string;   // Reference to BattleSession.id
  winnerId?:      string;   // Winner's user ID (null = draw)
  isDraw:         boolean;  // Was it a draw?
  player1Score:   number;   // Player 1 final score
  player2Score:   number;   // Player 2 final score
  xpEarned:       number;   // XP earned by the requesting user
  eloChange:      number;   // Elo rating change (positive = gain, negative = loss)
  starsChange:    number;   // Stars wallet change (ranked only)
  newLevel?:      number;   // New level if the XP caused a level-up
  newAchievement?: string;  // Achievement ID if battle unlocked one
  duration:       number;   // Battle duration in seconds
}

/* ─── Matchmaking Queue Entry ─────────────────────────────────────────────── */
/**
 * A player's position in the matchmaking queue
 */
export interface MatchmakingEntry {
  userId:    string;       // Player looking for a match
  mode:      BattleMode;  // Preferred battle mode
  subject?:  string;      // Preferred subject (subject mode only)
  eloRating: number;      // For Elo-based matchmaking range
  joinedAt:  Date;        // When they entered the queue
  matchId?:  string;      // Set when a match is found
}

/* ─── Battle History Entry ────────────────────────────────────────────────── */
/**
 * A past battle record shown in battle history
 */
export interface BattleHistoryEntry {
  battleId:      string;      // Battle session ID
  mode:          BattleMode;  // Battle format
  subject:       string;      // Subject area
  opponentName:  string;      // Opponent's display name
  result:        "win" | "loss" | "draw"; // Outcome
  myScore:       number;      // User's score
  opponentScore: number;      // Opponent's score
  xpEarned:      number;      // XP earned in this battle
  eloChange:     number;      // Elo rating change
  duration:      number;      // Battle duration in seconds
  playedAt:      Date;        // When the battle took place
}
