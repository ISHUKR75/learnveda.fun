/**
 * @file store/index.ts
 * @description Global client-side state store for LearnVeda
 * Uses Zustand for lightweight, hook-based state management
 * Organized into slices for UI state, user preferences, and notifications
 *
 * Import stores: import { useUIStore, useUserPrefsStore } from "@/store"
 */

// ─── Re-export all store slices ───────────────────────────────────────────
export { useUIStore }        from "./uiStore";        // Modal, sidebar, overlay state
export { useUserPrefsStore } from "./userPrefsStore";  // Theme, language, display preferences
export { useNotifStore }     from "./notifStore";      // In-app notification state
