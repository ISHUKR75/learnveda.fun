/**
 * @file features/notifications/components/NotificationCenter.tsx
 * @description In-app notification center for LearnVeda
 * @purpose Shows all user notifications: XP gains, streaks, battles, announcements
 * @used-by app/(platform)/notifications/page.tsx, Navbar notification bell
 *
 * Notification types:
 *  - xp_gain        — Earned XP from lesson/quiz
 *  - level_up       — Reached a new level
 *  - streak         — Streak milestone or at-risk warning
 *  - battle_result  — Won/lost a live battle
 *  - announcement   — Platform-wide news
 *  - event          — Upcoming event reminder
 *  - badge          — Unlocked an achievement badge
 *  - email_sent     — Confirmation of emails sent (admin)
 */

"use client";

import React, { useState }    from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import {
  Zap, Flame, Sword, Megaphone, Calendar, Award,
  Bell, CheckCheck, Trash2, X, Filter, ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge }  from "@/components/ui/badge";
import { cn }     from "@/lib/utils";

/* ─── Notification Type ──────────────────────────────────────────────────── */
type NotifType =
  | "xp_gain" | "level_up" | "streak" | "battle_result"
  | "announcement" | "event" | "badge" | "email_sent";

interface Notification {
  id:        string;          // Unique ID
  type:      NotifType;       // Category
  title:     string;          // Short title
  message:   string;          // Full notification text
  isRead:    boolean;         // Whether user has seen it
  createdAt: string;          // ISO timestamp
  metadata?: Record<string, unknown>; // Extra data (xp amount, level, etc.)
  href?:     string;          // Optional: link to navigate on click
}

/* ─── Type metadata (icon + color) ──────────────────────────────────────── */
const TYPE_META: Record<NotifType, {
  icon:   React.ElementType;
  color:  string;
  bg:     string;
  border: string;
  label:  string;
}> = {
  xp_gain:      { icon: Zap,       color: "text-amber-600",   bg: "bg-amber-500/10",  border: "border-amber-500/20",  label: "XP"         },
  level_up:     { icon: Zap,       color: "text-brand-600",   bg: "bg-brand-500/10",  border: "border-brand-500/20",  label: "Level"      },
  streak:       { icon: Flame,     color: "text-orange-600",  bg: "bg-orange-500/10", border: "border-orange-500/20", label: "Streak"     },
  battle_result:{ icon: Sword,     color: "text-purple-600",  bg: "bg-purple-500/10", border: "border-purple-500/20", label: "Battle"     },
  announcement: { icon: Megaphone, color: "text-blue-600",    bg: "bg-blue-500/10",   border: "border-blue-500/20",   label: "News"       },
  event:        { icon: Calendar,  color: "text-green-600",   bg: "bg-green-500/10",  border: "border-green-500/20",  label: "Event"      },
  badge:        { icon: Award,     color: "text-rose-600",    bg: "bg-rose-500/10",   border: "border-rose-500/20",   label: "Badge"      },
  email_sent:   { icon: Megaphone, color: "text-cyan-600",    bg: "bg-cyan-500/10",   border: "border-cyan-500/20",   label: "Email"      },
};

/* ─── Demo Notifications ─────────────────────────────────────────────────── */
// In production: fetched from /api/notifications with Redis caching + pagination
const DEMO_NOTIFICATIONS: Notification[] = [
  {
    id: "n-001", type: "level_up", isRead: false,
    title: "Level Up! 🎉 You reached Level 12",
    message: "Congratulations! You've reached Level 12 (Gold tier). You earned 450 XP from today's sessions. Keep going to reach Platinum!",
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),  // 15 min ago
    href: "/dashboard",
  },
  {
    id: "n-002", type: "battle_result", isRead: false,
    title: "You won a battle! ⚔️",
    message: "You defeated Arjun_S in a Mathematics battle (8–5). You earned +90 XP and +50 Stars! Your win rate is now 68%.",
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),  // 45 min ago
    href: "/live-battles",
  },
  {
    id: "n-003", type: "streak", isRead: false,
    title: "7-Day Streak! 🔥",
    message: "Amazing! You've maintained a 7-day study streak. You've unlocked the 'Week Warrior' achievement badge.",
    createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),  // 1.5h ago
    href: "/dashboard",
  },
  {
    id: "n-004", type: "badge", isRead: true,
    title: "Achievement Unlocked: Week Warrior 🏆",
    message: "You've unlocked the 'Week Warrior' badge for maintaining a 7-day study streak. View all your badges on your profile.",
    createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    href: "/dashboard/achievements",
  },
  {
    id: "n-005", type: "event", isRead: true,
    title: "Reminder: Code Sprint starts tomorrow!",
    message: "The DSA Code Sprint begins tomorrow at 10:00 AM. 890 students are registered. Prepare your algorithms — 60 minutes, 20 DSA questions. Prize: Premium subscription.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3h ago
    href: "/events",
  },
  {
    id: "n-006", type: "xp_gain", isRead: true,
    title: "+120 XP from Chapter Test",
    message: "You scored 8/10 on the 'Class 9 — Number Systems' quiz and earned 120 XP. Well done! Try the next chapter: Polynomials.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5h ago
    href: "/learn/class-9/mathematics",
  },
  {
    id: "n-007", type: "announcement", isRead: true,
    title: "New Feature: AI Tutor upgraded to GPT-4o 🤖",
    message: "LearnVeda's AI Tutor has been upgraded to GPT-4o. It now supports multi-step problem solving, math equation rendering, and Hindi language support. Try it now!",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    href: "/ai-tutor",
  },
  {
    id: "n-008", type: "streak", isRead: true,
    title: "⚠️ Streak at risk! Study today to keep it.",
    message: "You haven't studied today. Your 6-day streak will reset if you don't complete at least one lesson or quiz before midnight. Open the app and learn something!",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(), // ~28h ago
    href: "/learn",
  },
  {
    id: "n-009", type: "announcement", isRead: true,
    title: "LearnVeda now supports 11 languages 🌐",
    message: "You can now use LearnVeda in Hindi, Tamil, Telugu, Bengali, Kannada, Malayalam, Marathi, Gujarati, Punjabi, Odia, and English. Switch language from the navbar.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    href: "/",
  },
  {
    id: "n-010", type: "event", isRead: true,
    title: "Science Olympiad registration open",
    message: "Registration is now open for the Science Olympiad 2026 (May 24). 1,250 students already registered. 100 XP bonus for all participants. Register now to secure your spot.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
    href: "/events",
  },
];

/* ─── Filter type tabs ───────────────────────────────────────────────────── */
const FILTER_TABS = [
  { id: "all",       label: "All"          },
  { id: "unread",    label: "Unread"       },
  { id: "battle_result", label: "Battles"  },
  { id: "event",     label: "Events"       },
  { id: "announcement", label: "News"      },
] as const;

/* ─── NotificationCenter Component ──────────────────────────────────────── */
export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>(DEMO_NOTIFICATIONS);
  const [filter, setFilter] = useState<"all" | "unread" | NotifType>("all");

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  /* ── Mark all as read ─────────────────────────────────────────────── */
  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  /* ── Mark single as read ──────────────────────────────────────────── */
  const markRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  /* ── Delete notification ──────────────────────────────────────────── */
  const deleteNotif = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  /* ── Filter notifications ─────────────────────────────────────────── */
  const filtered = notifications.filter((n) => {
    if (filter === "all")    return true;
    if (filter === "unread") return !n.isRead;
    return n.type === filter;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 md:px-6 py-10 max-w-3xl mx-auto">

        {/* ── Header ───────────────────────────────────────────────── */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Bell className="h-5 w-5 text-foreground" />
              <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
              {unreadCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-500 px-1.5 text-xs font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {unreadCount > 0 ? `${unreadCount} unread notifications` : "All caught up!"}
            </p>
          </div>

          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllRead} className="gap-1.5 text-muted-foreground hover:text-foreground">
              <CheckCheck className="h-4 w-4" />
              Mark all read
            </Button>
          )}
        </div>

        {/* ── Filter Tabs ───────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-2 mb-5">
          {FILTER_TABS.map((tab) => {
            const count = tab.id === "all" ? notifications.length
              : tab.id === "unread" ? unreadCount
              : notifications.filter((n) => n.type === tab.id).length;

            return (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as typeof filter)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium transition-all",
                  filter === tab.id
                    ? "border-brand-500 bg-brand-500/10 text-brand-500"
                    : "border-border text-muted-foreground hover:border-brand-500/50",
                )}
              >
                {tab.label}
                <span className={cn(
                  "rounded-full px-1.5 py-0.5 text-xs",
                  filter === tab.id ? "bg-brand-500/20" : "bg-muted",
                )}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Notification List ─────────────────────────────────────── */}
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <Bell className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground">No notifications here.</p>
          </div>
        ) : (
          <div className="space-y-2">
            <AnimatePresence>
              {filtered.map((notif, i) => {
                const meta = TYPE_META[notif.type];
                const Icon = meta.icon;
                const timeAgo = formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true });

                return (
                  <motion.div
                    key={notif.id}
                    layout
                    initial={{ opacity: 0.01, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20, height: 0 }}
                    transition={{ delay: i * 0.03 }}
                    onClick={() => markRead(notif.id)}
                    className={cn(
                      "group relative flex gap-4 rounded-2xl border p-4 transition-all cursor-pointer",
                      notif.isRead
                        ? "border-border bg-card hover:bg-muted/20"
                        : "border-brand-500/30 bg-brand-500/5 hover:bg-brand-500/10",
                    )}
                  >
                    {/* Unread dot */}
                    {!notif.isRead && (
                      <div className="absolute left-2 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-brand-500" />
                    )}

                    {/* Icon */}
                    <div className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border",
                      meta.bg, meta.border,
                    )}>
                      <Icon className={cn("h-5 w-5", meta.color)} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className={cn(
                          "text-sm font-semibold leading-tight",
                          notif.isRead ? "text-foreground" : "text-foreground",
                        )}>
                          {notif.title}
                        </p>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="text-xs text-muted-foreground whitespace-nowrap">{timeAgo}</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-red-500"
                            onClick={(e) => { e.stopPropagation(); deleteNotif(notif.id); }}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {notif.message}
                      </p>
                      {notif.href && (
                        <a
                          href={notif.href}
                          onClick={(e) => e.stopPropagation()}
                          className={cn(
                            "inline-flex items-center gap-1 mt-2 text-xs font-medium hover:underline",
                            meta.color,
                          )}
                        >
                          View details <ArrowRight className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
