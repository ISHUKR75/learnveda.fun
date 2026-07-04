/**
 * @file app/(platform)/dashboard/notifications/page.tsx
 * @description Dashboard notifications settings and log page
 * Route: /dashboard/notifications
 * Redirects to the main /notifications page with full notification history
 */

import { redirect } from "next/navigation"; // Next.js redirect utility

/* ─── Dashboard Notifications ──────────────────────────────────────────────── */
// This dashboard sub-route delegates to the main notifications page
// The main /notifications page has the full notification center UI
export default function DashboardNotificationsPage() {
  redirect("/notifications"); // Redirect to the centralized notifications page
}
