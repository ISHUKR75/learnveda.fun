/**
 * @file app/(platform)/admin/newsletter/page.tsx
 * @description Admin email newsletter broadcast page
 * Route: /admin/newsletter
 * @purpose Admin-only page for sending targeted emails to LearnVeda students
 * Protected by Clerk auth + admin role middleware
 */

import type { Metadata }              from "next";
import { EmailBroadcastDashboard }    from "@/features/email-broadcast/components/EmailBroadcastDashboard";

/* ─── Admin Newsletter SEO Metadata ─────────────────────────────────────── */
// No-index: admin pages should not appear in search engines
export const metadata: Metadata = {
  title:  "Newsletter Broadcast | LearnVeda Admin",
  robots: { index: false, follow: false },        // Never index admin pages
};

/* ─── Admin Newsletter Page ──────────────────────────────────────────────── */
export default function AdminNewsletterPage() {
  return <EmailBroadcastDashboard />;
}
