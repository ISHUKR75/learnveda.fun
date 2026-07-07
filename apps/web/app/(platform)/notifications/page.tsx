/**
 * @file app/(platform)/notifications/page.tsx
 * @description User notifications page for LearnVeda
 * Route: /notifications
 * @purpose Shows all user notifications: XP, streaks, battles, events, announcements
 */

import type { Metadata }          from "next";
import { NotificationCenter }     from "@/features/notifications/components/NotificationCenter";

export const metadata: Metadata = {
  title:       "Notifications | LearnVeda",
  description: "View your learning notifications — XP gains, streaks, battles, events, and platform updates.",
  robots:      { index: false, follow: false },   // Notifications are private
};

export default function NotificationsPage() {
  return <NotificationCenter />;
}
