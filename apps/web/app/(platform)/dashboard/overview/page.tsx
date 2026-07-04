/**
 * @file app/(platform)/dashboard/overview/page.tsx
 * @description Dashboard overview sub-page — redirects to main dashboard
 * Route: /dashboard/overview
 * The main /dashboard page already shows the full overview via DashboardOverview component
 */

import { redirect } from "next/navigation"; // Next.js redirect utility

/* ─── Dashboard Overview Sub-Page ─────────────────────────────────────────── */
// Redirect to the main dashboard page which contains the full overview
export default function DashboardOverviewPage() {
  redirect("/dashboard"); // Redirect to parent dashboard route
}
