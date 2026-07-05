/**
 * @file store/uiStore.ts
 * @description Zustand store slice for global UI state
 * Manages: modals, sidebars, loading overlays, active dialogs
 * Client-only — do not import in server components
 *
 * @example
 * const { isSidebarOpen, openSidebar, closeSidebar } = useUIStore();
 */

"use client"; // Client-only store

import { create } from "zustand"; // Zustand state manager

/* ─── UI Store State Types ────────────────────────────────────────────────── */
interface UIState {
  // ── Sidebar ────────────────────────────────────────────────────────────
  isSidebarOpen:    boolean;         // Platform sidebar visibility
  openSidebar:      () => void;      // Open the sidebar
  closeSidebar:     () => void;      // Close the sidebar
  toggleSidebar:    () => void;      // Toggle sidebar visibility

  // ── Modals ─────────────────────────────────────────────────────────────
  activeModal:      string | null;   // Currently open modal ID (null = none)
  openModal:        (id: string) => void;  // Open a modal by ID
  closeModal:       () => void;      // Close the active modal

  // ── Global Loading Overlay ─────────────────────────────────────────────
  isPageLoading:    boolean;         // Full-page loading overlay visibility
  setPageLoading:   (loading: boolean) => void; // Set loading state

  // ── Command Palette ─────────────────────────────────────────────────────
  isCommandOpen:    boolean;         // ⌘K command palette visibility
  openCommand:      () => void;      // Open command palette
  closeCommand:     () => void;      // Close command palette
  toggleCommand:    () => void;      // Toggle command palette

  // ── Mobile Nav ──────────────────────────────────────────────────────────
  isMobileNavOpen:  boolean;         // Mobile navigation drawer state
  toggleMobileNav:  () => void;      // Toggle mobile nav drawer
  closeMobileNav:   () => void;      // Close mobile nav drawer
}

/* ─── UI Store ────────────────────────────────────────────────────────────── */
export const useUIStore = create<UIState>((set) => ({
  // ── Sidebar state ────────────────────────────────────────────────────
  isSidebarOpen:  false,
  openSidebar:    () => set({ isSidebarOpen: true }),
  closeSidebar:   () => set({ isSidebarOpen: false }),
  toggleSidebar:  () => set((s) => ({ isSidebarOpen: !s.isSidebarOpen })),

  // ── Modal state ──────────────────────────────────────────────────────
  activeModal:    null,
  openModal:      (id) => set({ activeModal: id }),
  closeModal:     () => set({ activeModal: null }),

  // ── Page loading overlay ─────────────────────────────────────────────
  isPageLoading:  false,
  setPageLoading: (loading) => set({ isPageLoading: loading }),

  // ── Command palette ──────────────────────────────────────────────────
  isCommandOpen:  false,
  openCommand:    () => set({ isCommandOpen: true }),
  closeCommand:   () => set({ isCommandOpen: false }),
  toggleCommand:  () => set((s) => ({ isCommandOpen: !s.isCommandOpen })),

  // ── Mobile nav ───────────────────────────────────────────────────────
  isMobileNavOpen: false,
  toggleMobileNav: () => set((s) => ({ isMobileNavOpen: !s.isMobileNavOpen })),
  closeMobileNav:  () => set({ isMobileNavOpen: false }),
}));
