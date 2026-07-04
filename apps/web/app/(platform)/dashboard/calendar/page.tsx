/**
 * @file app/(platform)/dashboard/calendar/page.tsx
 * @description Study calendar — shows daily study schedule and upcoming events
 * Route: /dashboard/calendar
 * Shows: Monthly calendar view, upcoming study sessions, exams, and events
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, ChevronRight, Clock, BookOpen, Trophy, ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";

/* ─── Page Metadata ──────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title:  "Study Calendar — Dashboard | LearnVeda",
  description: "Plan your studies with the LearnVeda calendar — daily goals, test dates, and events.",
  robots: { index: false, follow: false },
};

/* ─── Calendar Events Data ───────────────────────────────────────────────── */
// In production, fetched from MongoDB (user's personal events + platform events)
const UPCOMING_EVENTS = [
  { date: "Today",      time: "7:00 PM",  type: "study",  title: "Python Day 16 — List Comprehensions",     subject: "Python" },
  { date: "Today",      time: "9:00 PM",  type: "battle", title: "DSA Live Battle — Scheduled",             subject: "DSA"    },
  { date: "Tomorrow",   time: "10:00 AM", type: "study",  title: "Triangles — NCERT Exercise 7.1",          subject: "Math"   },
  { date: "Jul 05",     time: "5:00 PM",  type: "event",  title: "Python Championship — Live Event",        subject: "Python" },
  { date: "Jul 08",     time: "All Day",  type: "test",   title: "Class 9 Science Mock Test",               subject: "Science"},
  { date: "Jul 10",     time: "7:00 PM",  type: "study",  title: "Motion — NCERT Solutions + Simulation",   subject: "Science"},
  { date: "Jul 12",     time: "9:00 AM",  type: "test",   title: "Python Track — Week 3 Assessment",        subject: "Python" },
  { date: "Jul 15",     time: "6:00 PM",  type: "battle", title: "Ranked DSA Battle (Weekly Tournament)",   subject: "DSA"    },
];

/* ─── Event Type Config ──────────────────────────────────────────────────── */
const EVENT_CONFIG: Record<string, { color: string; bg: string; label: string }> = {
  study:   { color: "text-blue-600 dark:text-blue-400",  bg: "bg-blue-500/10 border-blue-500/20",  label: "Study"  },
  battle:  { color: "text-purple-600 dark:text-purple-400",bg: "bg-purple-500/10 border-purple-500/20",label: "Battle"},
  event:   { color: "text-green-600 dark:text-green-400", bg: "bg-green-500/10 border-green-500/20", label: "Event" },
  test:    { color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-500/10 border-amber-500/20", label: "Test"  },
};

/* ─── Generate Calendar Days ─────────────────────────────────────────────── */
// Generate a simple 5-week calendar for July 2026
function generateCalendarDays() {
  // July 2026 starts on Wednesday (index 3 in 0=Sun format)
  const daysInMonth = 31;
  const startDay    = 3; // Wednesday

  const days = [];
  // Padding days (from prev month)
  for (let i = 0; i < startDay; i++) days.push({ day: 0, isCurrentMonth: false });
  // July days
  for (let i = 1; i <= daysInMonth; i++) days.push({ day: i, isCurrentMonth: true });
  // Pad to complete week
  while (days.length % 7 !== 0) days.push({ day: 0, isCurrentMonth: false });

  return days;
}

/* ─── Calendar Page Component ────────────────────────────────────────────── */
export default function CalendarPage() {
  const calendarDays = generateCalendarDays();
  const today        = 4; // July 4 (today's date)

  // Days with events in July 2026
  const eventDays = new Set([4, 5, 8, 10, 12, 15, 20, 24]);

  return (
    <div className="min-h-screen bg-background">
      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="border-b bg-gradient-to-br from-blue-500/5 to-background">
        <div className="container px-4 py-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">Calendar</span>
          </nav>

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Study Calendar</h1>
              <p className="text-sm text-muted-foreground">July 2026 — 8 upcoming events</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ─── Monthly Calendar View ────────────────────────────────── */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border bg-card overflow-hidden">
              {/* Calendar header */}
              <div className="flex items-center justify-between p-4 border-b">
                <button className="h-8 w-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <h2 className="font-bold text-lg">July 2026</h2>
                <button className="h-8 w-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* Day headers */}
              <div className="grid grid-cols-7 border-b">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                  <div key={d} className="py-2 text-center text-xs font-medium text-muted-foreground">
                    {d}
                  </div>
                ))}
              </div>

              {/* Calendar days grid */}
              <div className="grid grid-cols-7">
                {calendarDays.map((d, i) => (
                  <div
                    key={i}
                    className={`relative min-h-[3.5rem] p-1 border-b border-r border-border/50 ${
                      d.day === today && d.isCurrentMonth
                        ? "bg-primary/5"
                        : d.isCurrentMonth ? "hover:bg-muted/30" : "bg-muted/10"
                    } transition-colors`}
                  >
                    {d.day > 0 && (
                      <>
                        <span className={`text-xs font-medium flex items-center justify-center h-6 w-6 rounded-full ${
                          d.day === today
                            ? "bg-primary text-primary-foreground"
                            : d.isCurrentMonth ? "text-foreground" : "text-muted-foreground"
                        }`}>
                          {d.day}
                        </span>
                        {/* Event dot indicator */}
                        {eventDays.has(d.day) && (
                          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                            <div className="h-1 w-1 rounded-full bg-primary" />
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 mt-3 flex-wrap">
              {Object.entries(EVENT_CONFIG).map(([type, config]) => (
                <div key={type} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <div className={`h-2 w-2 rounded-full ${config.bg.split(" ")[0]}`} />
                  {config.label}
                </div>
              ))}
            </div>
          </div>

          {/* ─── Upcoming Events List ──────────────────────────────────── */}
          <div>
            <h3 className="font-semibold mb-4">Upcoming Events</h3>
            <div className="space-y-3">
              {UPCOMING_EVENTS.map((event, i) => {
                const config = EVENT_CONFIG[event.type];
                return (
                  <div key={i} className={`rounded-xl border ${config.bg} p-3`}>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <Badge className={`text-[9px] py-0 ${config.bg} ${config.color}`}>
                        {config.label}
                      </Badge>
                      <span className="text-[10px] text-muted-foreground shrink-0">{event.date}</span>
                    </div>
                    <div className={`font-medium text-sm mb-1 ${config.color}`}>{event.title}</div>
                    <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {event.time}
                      <span>·</span>
                      <BookOpen className="h-3 w-3" />
                      {event.subject}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
