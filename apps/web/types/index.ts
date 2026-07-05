/**
 * @file types/index.ts
 * @description Central TypeScript type definitions for LearnVeda platform
 * Shared types used across frontend, API routes, and feature modules
 * All types are exported from here for clean imports: import { User } from "@/types"
 */

// ─── Re-export all type modules ───────────────────────────────────────────
export * from "./user";       // User, profile, auth types
export * from "./course";     // Course, chapter, subject types
export * from "./battle";     // Live battle, matchmaking types
export * from "./community";  // Posts, questions, comments types
export * from "./api";        // API response wrapper types
export * from "./ui";         // UI component prop types
