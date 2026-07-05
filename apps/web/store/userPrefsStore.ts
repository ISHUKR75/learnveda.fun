/**
 * @file store/userPrefsStore.ts
 * @description Zustand store slice for user preference state
 * Manages: display preferences, default grade, language, font size
 * Persisted to localStorage so preferences survive page refreshes
 *
 * @example
 * const { defaultGrade, setDefaultGrade, fontSize } = useUserPrefsStore();
 */

"use client"; // Client-only store

import { create }     from "zustand";     // Zustand core
import { persist }    from "zustand/middleware"; // Persistence middleware

/* ─── User Preferences State Types ───────────────────────────────────────── */
interface UserPrefsState {
  // ── Default Grade/Level ─────────────────────────────────────────────
  defaultGrade: string;                    // e.g. "class-11", "engineering"
  setDefaultGrade: (grade: string) => void; // Update default grade

  // ── UI Density ───────────────────────────────────────────────────────
  fontSize: "sm" | "md" | "lg";            // Reader font size preference
  setFontSize: (size: "sm" | "md" | "lg") => void; // Update font size

  // ── Content Preferences ──────────────────────────────────────────────
  showHints:     boolean;                  // Show/hide question hints by default
  setShowHints:  (show: boolean) => void;  // Update hint preference

  // ── Dashboard Layout ─────────────────────────────────────────────────
  dashboardLayout: "grid" | "list";        // Dashboard card layout style
  setDashboardLayout: (layout: "grid" | "list") => void; // Update layout

  // ── Notification Preferences ─────────────────────────────────────────
  emailNotifs:    boolean;                 // Email notification opt-in
  pushNotifs:     boolean;                 // Browser push notification opt-in
  battleNotifs:   boolean;                 // Battle challenge notifications
  setEmailNotifs: (v: boolean) => void;
  setPushNotifs:  (v: boolean) => void;
  setBattleNotifs: (v: boolean) => void;

  // ── Recently Visited ─────────────────────────────────────────────────
  recentPages: string[];                   // Array of recently visited route paths
  addRecentPage: (path: string) => void;   // Push to recent pages (max 10)
  clearRecentPages: () => void;            // Clear recent pages list
}

/* ─── User Preferences Store (persisted) ─────────────────────────────────── */
export const useUserPrefsStore = create<UserPrefsState>()(
  persist(
    (set) => ({
      // ── Default values ────────────────────────────────────────────
      defaultGrade:     "class-11",     // Default grade for new users
      setDefaultGrade:  (grade)  => set({ defaultGrade: grade }),

      fontSize:         "md",           // Medium font size by default
      setFontSize:      (size)   => set({ fontSize: size }),

      showHints:        true,           // Show hints by default
      setShowHints:     (show)   => set({ showHints: show }),

      dashboardLayout:  "grid",         // Grid layout by default
      setDashboardLayout: (layout) => set({ dashboardLayout: layout }),

      emailNotifs:      true,           // Email notifications on by default
      pushNotifs:       false,          // Push notifications off by default
      battleNotifs:     true,           // Battle notifications on by default
      setEmailNotifs:   (v) => set({ emailNotifs: v }),
      setPushNotifs:    (v) => set({ pushNotifs: v }),
      setBattleNotifs:  (v) => set({ battleNotifs: v }),

      recentPages:      [],             // No recent pages on first visit
      addRecentPage: (path) =>
        set((s) => ({
          recentPages: [
            path,
            ...s.recentPages.filter((p) => p !== path), // Remove duplicate
          ].slice(0, 10), // Keep only the 10 most recent pages
        })),
      clearRecentPages: () => set({ recentPages: [] }),
    }),
    {
      name: "learnveda-user-prefs", // localStorage key
      // Only persist specific fields — skip function references
      partialize: (state) => ({
        defaultGrade:    state.defaultGrade,
        fontSize:        state.fontSize,
        showHints:       state.showHints,
        dashboardLayout: state.dashboardLayout,
        emailNotifs:     state.emailNotifs,
        pushNotifs:      state.pushNotifs,
        battleNotifs:    state.battleNotifs,
        recentPages:     state.recentPages,
      }),
    },
  ),
);
