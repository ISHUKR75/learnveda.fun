/**
 * @file app/(platform)/notifications/page.tsx
 * @description User notifications page — all platform notifications
 * Route: /notifications
 * Shows: Unread and read notifications with type-based icons and actions
 */

import type { Metadata } from "next";
import Link from "next/link";
import {
  Bell, ChevronRight, Flame, Trophy, Star, BookOpen,
  MessageSquare, Zap, Users, CheckCheck, ArrowRight,
} from "lucide-react";
import { Badge }  from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* ─── Page Metadata ──────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title:  "Notifications — LearnVeda",
  description: "Your LearnVeda notifications — updates, achievements, and messages.",
  robots: { index: false, follow: false },
};

/* ─── Notification Data ──────────────────────────────────────────────────── */
// In production, fetched from MongoDB notifications collection via WebSocket or polling
const NOTIFICATIONS = [
  {
    id:     "n-01",
    type:   "achievement",
    icon:   Trophy,
    title:  "🏆 Achievement Unlocked!",
    body:   "You earned the 'Week Warrior' badge for maintaining a 7-day study streak!",
    time:   "2 minutes ago",
    read:   false,
    href:   "/dashboard/achievements",
    color:  "text-amber-500",
    bgColor:"bg-amber-500/10 border-amber-500/20",
  },
  {
    id:     "n-02",
    type:   "battle",
    icon:   Zap,
    title:  "⚔️ Battle Match Found",
    body:   "Your ranked DSA battle is ready. Opponent: rahul_coder_99. Click to join!",
    time:   "5 minutes ago",
    read:   false,
    href:   "/live-battles",
    color:  "text-purple-500",
    bgColor:"bg-purple-500/10 border-purple-500/20",
  },
  {
    id:     "n-03",
    type:   "streak",
    icon:   Flame,
    title:  "🔥 Streak at Risk!",
    body:   "You haven't studied today yet. Your 7-day streak resets in 3 hours.",
    time:   "30 minutes ago",
    read:   false,
    href:   "/learn",
    color:  "text-orange-500",
    bgColor:"bg-orange-500/10 border-orange-500/20",
  },
  {
    id:     "n-04",
    type:   "reply",
    icon:   MessageSquare,
    title:  "💬 New Reply on Your Post",
    body:   "ananya_math replied to your question 'How to prove √2 is irrational?'",
    time:   "1 hour ago",
    read:   false,
    href:   "/community/questions",
    color:  "text-blue-500",
    bgColor:"bg-blue-500/10 border-blue-500/20",
  },
  {
    id:     "n-05",
    type:   "xp",
    icon:   Star,
    title:  "⭐ +30 XP Earned",
    body:   "You earned 30 XP for completing 'Newton's Laws of Motion' chapter.",
    time:   "2 hours ago",
    read:   true,
    href:   "/dashboard",
    color:  "text-yellow-500",
    bgColor:"bg-yellow-500/10 border-yellow-500/20",
  },
  {
    id:     "n-06",
    type:   "event",
    icon:   Users,
    title:  "📅 Event Starting Tomorrow",
    body:   "Python Championship starts tomorrow at 5 PM. 780+ participants registered.",
    time:   "3 hours ago",
    read:   true,
    href:   "/events",
    color:  "text-green-500",
    bgColor:"bg-green-500/10 border-green-500/20",
  },
  {
    id:     "n-07",
    type:   "chapter",
    icon:   BookOpen,
    title:  "📚 Chapter Recommendation",
    body:   "Based on your progress, you should study 'Gravitation' next (Class 9 Science).",
    time:   "1 day ago",
    read:   true,
    href:   "/learn/class-9/science/chapter-09",
    color:  "text-teal-500",
    bgColor:"bg-teal-500/10 border-teal-500/20",
  },
];

const unreadCount = NOTIFICATIONS.filter((n) => !n.read).length;

/* ─── Notifications Page Component ──────────────────────────────────────── */
export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="border-b bg-gradient-to-br from-primary/5 to-background">
        <div className="container px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center relative">
                <Bell className="h-5 w-5 text-primary" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold">Notifications</h1>
                <p className="text-sm text-muted-foreground">
                  {unreadCount} unread · {NOTIFICATIONS.length} total
                </p>
              </div>
            </div>

            {/* Mark all read */}
            <Button variant="outline" size="sm" className="text-xs">
              <CheckCheck className="h-3.5 w-3.5 mr-1" />
              Mark all read
            </Button>
          </div>
        </div>
      </div>

      {/* ── Notification List ─────────────────────────────────────────────── */}
      <div className="container px-4 py-6 max-w-3xl">

        {/* Unread section */}
        {unreadCount > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
              Unread ({unreadCount})
            </h2>
            <div className="space-y-2">
              {NOTIFICATIONS.filter((n) => !n.read).map((notif) => {
                const Icon = notif.icon;
                return (
                  <Link
                    key={notif.id}
                    href={notif.href}
                    className={`group flex items-start gap-4 rounded-2xl border ${notif.bgColor} p-4 hover:shadow-md transition-all`}
                  >
                    <div className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 bg-white/50 dark:bg-black/20`}>
                      <Icon className={`h-4.5 w-4.5 ${notif.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm mb-0.5">{notif.title}</div>
                      <p className="text-xs text-muted-foreground">{notif.body}</p>
                      <div className="text-[10px] text-muted-foreground mt-1">{notif.time}</div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Read section */}
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Earlier
          </h2>
          <div className="space-y-2">
            {NOTIFICATIONS.filter((n) => n.read).map((notif) => {
              const Icon = notif.icon;
              return (
                <Link
                  key={notif.id}
                  href={notif.href}
                  className="group flex items-start gap-4 rounded-2xl border bg-card p-4 hover:shadow-md transition-all opacity-70 hover:opacity-100"
                >
                  <div className="h-9 w-9 rounded-xl bg-muted flex items-center justify-center shrink-0">
                    <Icon className="h-4.5 w-4.5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm mb-0.5">{notif.title}</div>
                    <p className="text-xs text-muted-foreground">{notif.body}</p>
                    <div className="text-[10px] text-muted-foreground mt-1">{notif.time}</div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
