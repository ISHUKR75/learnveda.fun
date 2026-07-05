/**
 * @file store/notifStore.ts
 * @description Zustand store for in-app notification state
 * Manages: notification list, unread count, toast queue
 * Client-only — fetches from /api/notifications when user is logged in
 *
 * @example
 * const { unreadCount, notifications, markAllRead } = useNotifStore();
 */

"use client"; // Client-only store

import { create } from "zustand"; // Zustand core

/* ─── Notification Type ───────────────────────────────────────────────────── */
export interface InAppNotification {
  id:        string;    // Unique notification ID
  type:      "battle" | "achievement" | "system" | "community" | "streak"; // Category
  title:     string;    // Short title (e.g. "Battle request!")
  message:   string;    // Full message body
  href?:     string;    // Optional CTA link
  read:      boolean;   // Whether user has seen it
  createdAt: Date;      // Notification timestamp
}

/* ─── Notification Store State ────────────────────────────────────────────── */
interface NotifState {
  notifications:   InAppNotification[];         // All notifications for this session
  unreadCount:     number;                       // Unread notification count (for badge)
  isLoading:       boolean;                      // Fetching from API?
  lastFetchedAt:   Date | null;                  // When notifications were last synced

  // ── Actions ────────────────────────────────────────────────────────
  addNotification:    (notif: InAppNotification) => void;  // Add a new notification
  markRead:           (id: string) => void;                // Mark one notification as read
  markAllRead:        () => void;                          // Mark all as read
  removeNotification: (id: string) => void;                // Remove a notification
  clearAll:           () => void;                          // Clear all notifications
  setLoading:         (loading: boolean) => void;          // Set loading state
  setNotifications:   (notifs: InAppNotification[]) => void; // Bulk-replace (after API fetch)
}

/* ─── Notification Store ──────────────────────────────────────────────────── */
export const useNotifStore = create<NotifState>((set) => ({
  // ── Initial state ─────────────────────────────────────────────────
  notifications:  [],    // Empty on load — populated by API fetch
  unreadCount:    0,
  isLoading:      false,
  lastFetchedAt:  null,

  // ── Computed helper — count unread ────────────────────────────────
  // (Zustand doesn't support computed values natively; we update on changes)

  // ── Add notification ──────────────────────────────────────────────
  addNotification: (notif) =>
    set((s) => ({
      notifications: [notif, ...s.notifications], // Prepend (newest first)
      unreadCount:   s.unreadCount + (notif.read ? 0 : 1), // Increment if unread
    })),

  // ── Mark one as read ──────────────────────────────────────────────
  markRead: (id) =>
    set((s) => ({
      notifications: s.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n, // Update only the target
      ),
      unreadCount: Math.max(0, s.unreadCount - 1), // Decrement unread count
    })),

  // ── Mark all as read ──────────────────────────────────────────────
  markAllRead: () =>
    set((s) => ({
      notifications: s.notifications.map((n) => ({ ...n, read: true })), // Mark all
      unreadCount:   0, // Reset count
    })),

  // ── Remove one notification ───────────────────────────────────────
  removeNotification: (id) =>
    set((s) => {
      const target = s.notifications.find((n) => n.id === id); // Find notification
      return {
        notifications: s.notifications.filter((n) => n.id !== id), // Remove it
        unreadCount:   s.unreadCount - (target && !target.read ? 1 : 0), // Update count
      };
    }),

  // ── Clear all ─────────────────────────────────────────────────────
  clearAll: () => set({ notifications: [], unreadCount: 0 }),

  // ── Loading state ─────────────────────────────────────────────────
  setLoading: (loading) => set({ isLoading: loading }),

  // ── Bulk set (after API sync) ─────────────────────────────────────
  setNotifications: (notifs) =>
    set({
      notifications: notifs,
      unreadCount:   notifs.filter((n) => !n.read).length, // Recount unread
      lastFetchedAt: new Date(),
    }),
}));
