/**
 * @file features/events/components/EventsGrid.tsx
 * @description Events grid component for the /events page
 *
 * Shows upcoming and past events in a responsive card grid:
 * - Live events (happening now) — highlighted
 * - Upcoming events — with countdown + registration CTA
 * - Past events — with recording links
 *
 * Categories: Hackathon, Workshop, Live Class, Webinar, Battle Tournament, Quiz
 *
 * Used in: app/(marketing)/events/page.tsx
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar, Clock, Users, MapPin, ArrowRight,
  Zap, BookOpen, Trophy, Radio, Code2, Star,
  ChevronRight, Play,
} from "lucide-react";
import { Badge }  from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* ─── Types ──────────────────────────────────────────────────────────────── */
type EventCategory = "hackathon" | "workshop" | "live-class" | "webinar" | "battle" | "quiz";
type EventStatus   = "live" | "upcoming" | "past";

interface EventItem {
  id:         string;
  title:      string;
  description:string;
  category:   EventCategory;
  status:     EventStatus;
  date:       string;         // Display date string
  time:       string;         // Display time string (IST)
  duration:   string;         // Duration (e.g., "2 hours")
  seats:      number;         // Total seats
  registered: number;         // Already registered
  host:       string;         // Host name
  tags:       string[];
  href:       string;
  isPremium?: boolean;
}

/* ─── Category icons + colors ────────────────────────────────────────────── */
const CAT_CONFIG: Record<EventCategory, { icon: React.ReactNode; color: string; bg: string; label: string }> = {
  hackathon:  { icon: <Code2  className="h-4 w-4" />, color: "text-purple-500", bg: "bg-purple-500/10", label: "Hackathon"    },
  workshop:   { icon: <BookOpen className="h-4 w-4" />, color: "text-blue-500", bg: "bg-blue-500/10",   label: "Workshop"     },
  "live-class":{ icon: <Radio  className="h-4 w-4" />, color: "text-red-500",   bg: "bg-red-500/10",    label: "Live Class"   },
  webinar:    { icon: <Users  className="h-4 w-4" />, color: "text-teal-500",  bg: "bg-teal-500/10",   label: "Webinar"      },
  battle:     { icon: <Zap    className="h-4 w-4" />, color: "text-orange-500",bg: "bg-orange-500/10", label: "Battle"       },
  quiz:       { icon: <Trophy className="h-4 w-4" />, color: "text-amber-500", bg: "bg-amber-500/10",  label: "Quiz"         },
};

/* ─── Demo Events Data ────────────────────────────────────────────────────── */
const EVENTS: EventItem[] = [
  {
    id: "ev1", status: "live",
    title:       "LIVE: Class 12 Physics — Wave Optics Deep Dive",
    description: "60-minute live session covering wave optics from CBSE perspective with NEET/JEE application. Q&A session included.",
    category: "live-class", date: "Today", time: "5:00 PM IST", duration: "1 hour",
    seats: 500, registered: 312, host: "Dr. Sharma", tags: ["Physics", "Class 12", "JEE"],
    href: "/events/live-physics-wave-optics",
  },
  {
    id: "ev2", status: "upcoming",
    title:       "Python for Beginners — 3-Day Bootcamp",
    description: "Start from zero, write your first web scraper by day 3. Hands-on with real exercises. Certificate included.",
    category: "workshop", date: "Jul 12, 2026", time: "10:00 AM IST", duration: "3 days",
    seats: 200, registered: 147, host: "LearnVeda Team", tags: ["Python", "Beginner", "Certificate"],
    href: "/events/python-bootcamp-july",
  },
  {
    id: "ev3", status: "upcoming",
    title:       "National Coding Battle — July Edition",
    description: "1v1 and team battles across DSA, Math, and Python. Prize pool ₹10,000. Open to all registered students.",
    category: "battle", date: "Jul 15, 2026", time: "6:00 PM IST", duration: "2 hours",
    seats: 1000, registered: 689, host: "LearnVeda", tags: ["DSA", "Competition", "Prize"],
    href: "/events/battle-july-2026", isPopular: true,
  } as EventItem & { isPopular?: boolean },
  {
    id: "ev4", status: "upcoming",
    title:       "CBSE Class 10 Board Prep Webinar",
    description: "Last 30 days strategy for CBSE Class 10 board exams. Exam pattern analysis, important topics, and time management.",
    category: "webinar", date: "Jul 18, 2026", time: "7:00 PM IST", duration: "1.5 hours",
    seats: 2000, registered: 1203, host: "Priya Sharma", tags: ["Class 10", "Boards", "Strategy"],
    href: "/events/cbse-class10-webinar",
  },
  {
    id: "ev5", status: "upcoming",
    title:       "System Design Interview Prep — Live",
    description: "Mock system design interview with real-time feedback. Cover Load Balancer, Caching, Database sharding design.",
    category: "live-class", date: "Jul 20, 2026", time: "8:00 PM IST", duration: "2 hours",
    seats: 100, registered: 78, host: "Rahul Nair", tags: ["System Design", "Interview", "SDE"],
    href: "/events/system-design-live", isPremium: true,
  },
  {
    id: "ev6", status: "past",
    title:       "LearnVeda Hackathon 2026 — Results & Showcase",
    description: "Winners presentation from our 48-hour hackathon. 120 teams, 12 winners. Watch the winning projects showcase.",
    category: "hackathon", date: "Jun 28, 2026", time: "4:00 PM IST", duration: "2 hours",
    seats: 500, registered: 487, host: "LearnVeda", tags: ["Hackathon", "Projects"],
    href: "/events/hackathon-2026-results",
  },
];

/* ─── Status filter tabs ─────────────────────────────────────────────────── */
const STATUS_FILTERS: { id: string; label: string }[] = [
  { id: "all",      label: "All Events" },
  { id: "live",     label: "🔴 Live Now" },
  { id: "upcoming", label: "Upcoming" },
  { id: "past",     label: "Past" },
];

/* ─── EventsGrid Component ───────────────────────────────────────────────── */
export function EventsGrid() {
  const [activeFilter, setActiveFilter] = useState("all");

  // Filter events based on active tab
  const filtered = activeFilter === "all"
    ? EVENTS
    : EVENTS.filter(e => e.status === activeFilter);

  return (
    <div className="py-12">
      <div className="container px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-foreground mb-3">Events & Live Sessions</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Live classes, workshops, hackathons, and battle tournaments — happening every week.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {STATUS_FILTERS.map(f => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                activeFilter === f.id
                  ? "bg-brand-500 text-white border-brand-500"
                  : "border-border text-muted-foreground hover:border-brand-500/50"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Events grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((event, i) => {
            const catConfig = CAT_CONFIG[event.category];
            const seatsLeft = event.seats - event.registered;
            const seatsLow  = seatsLeft < 50; // Low seat warning

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0.01, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
              >
                <div className={`h-full rounded-2xl border bg-card p-5 shadow-sm hover:shadow-md transition-all flex flex-col ${
                  event.status === "live" ? "border-red-500/40" : ""
                }`}>
                  {/* Category icon + status */}
                  <div className="flex items-center justify-between mb-3">
                    <div className={`flex items-center gap-1.5 ${catConfig.color}`}>
                      <div className={`p-1.5 rounded-lg ${catConfig.bg}`}>{catConfig.icon}</div>
                      <span className="text-xs font-medium">{catConfig.label}</span>
                    </div>
                    <div className="flex gap-1.5">
                      {event.status === "live" && (
                        <Badge className="bg-red-500 text-white text-xs animate-pulse">🔴 LIVE</Badge>
                      )}
                      {(event as EventItem & { isPremium?: boolean }).isPremium && (
                        <Badge variant="outline" className="border-amber-500/40 text-amber-600 text-xs gap-1">
                          <Star className="h-2.5 w-2.5" /> Pro
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-semibold text-foreground mb-1.5 leading-snug">{event.title}</h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3 flex-1">{event.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {event.tags.map(tag => (
                      <span key={tag} className="text-xs px-2 py-0.5 bg-muted text-muted-foreground rounded-full">{tag}</span>
                    ))}
                  </div>

                  {/* Meta: date, time, duration */}
                  <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" /> {event.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> {event.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      <span className={seatsLow ? "text-orange-600 font-medium" : ""}>
                        {seatsLow ? `${seatsLeft} seats left` : `${event.registered} registered`}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> {event.duration}
                    </div>
                  </div>

                  {/* Host */}
                  <p className="text-xs text-muted-foreground mb-3">Hosted by <strong>{event.host}</strong></p>

                  {/* CTA */}
                  <Link href={event.href}>
                    <Button className="w-full gap-1.5" size="sm" variant={event.status === "past" ? "outline" : "default"}>
                      {event.status === "live"     ? <><Play className="h-3.5 w-3.5" /> Join Live</>     :
                       event.status === "upcoming" ? <>Register <ArrowRight className="h-3.5 w-3.5" /></> :
                       <>Watch Recording <Play className="h-3.5 w-3.5" /></>}
                    </Button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* No events */}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No events found for this filter.
          </div>
        )}
      </div>
    </div>
  );
}
