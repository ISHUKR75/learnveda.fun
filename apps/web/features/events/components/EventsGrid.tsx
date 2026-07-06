/**
 * @file features/events/components/EventsGrid.tsx
 * @description Events listing for the Events page
 *
 * Shows all upcoming and past events:
 *  - Live Coding Battles
 *  - CBSE Board Mock Tests
 *  - AI/ML Workshops
 *  - Hackathons
 *  - Guest lectures
 *
 * Events are filtered by type and status (upcoming/past).
 */

"use client"; // Client component for filtering state

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Users, Trophy, ExternalLink, Filter, Sparkles, Code2, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge"; // Status badge

/* ─── Event Type Definitions ─────────────────────────────────────────────── */
type EventStatus = "upcoming" | "live" | "past";
type EventType   = "battle" | "workshop" | "hackathon" | "mock-test" | "lecture" | "olympiad";

interface Event {
  id:          string;
  title:       string;
  type:        EventType;
  status:      EventStatus;
  date:        string;         // Display date string
  time:        string;         // Display time string
  duration:    string;         // e.g. "2 hours"
  participants: number;
  maxParticipants?: number;
  prize?:      string;         // Prize for competitions
  host:        string;         // Host / organizer name
  description: string;
  tags:        string[];
  registrationUrl?: string;
}

/* ─── Events Data ────────────────────────────────────────────────────────── */
const EVENTS: Event[] = [
  {
    id:          "battle-weekly-01",
    title:       "Weekly Math Battle Championship",
    type:        "battle",
    status:      "upcoming",
    date:        "July 12, 2025",
    time:        "7:00 PM IST",
    duration:    "2 hours",
    participants: 234,
    maxParticipants: 500,
    prize:       "₹5,000 + Pro subscription",
    host:        "LearnVeda",
    description: "Compete in real-time 1v1 math battles. Class 10 and above. Topics: Algebra, Geometry, Trigonometry.",
    tags:        ["Mathematics", "Battle", "Class 10+"],
    registrationUrl: "#",
  },
  {
    id:          "ai-workshop-01",
    title:       "Introduction to Machine Learning with Python",
    type:        "workshop",
    status:      "upcoming",
    date:        "July 15, 2025",
    time:        "4:00 PM IST",
    duration:    "3 hours",
    participants: 412,
    maxParticipants: 500,
    host:        "LearnVeda AI Team",
    description: "Hands-on workshop: build your first ML model using Python, scikit-learn, and pandas. No prior ML experience required.",
    tags:        ["AI", "Python", "Machine Learning", "Workshop"],
    registrationUrl: "#",
  },
  {
    id:          "cbse-mock-01",
    title:       "CBSE Class 12 Physics Mock Test",
    type:        "mock-test",
    status:      "upcoming",
    date:        "July 20, 2025",
    time:        "10:00 AM IST",
    duration:    "3 hours",
    participants: 1240,
    host:        "LearnVeda Test Center",
    description: "Full-length CBSE Class 12 Physics mock test. Covers all chapters. Detailed solution PDF provided after the test.",
    tags:        ["CBSE", "Class 12", "Physics", "Mock Test"],
    registrationUrl: "#",
  },
  {
    id:          "hackathon-01",
    title:       "LearnVeda Build-a-thon 2025",
    type:        "hackathon",
    status:      "upcoming",
    date:        "August 1–3, 2025",
    time:        "9:00 AM IST",
    duration:    "48 hours",
    participants: 89,
    maxParticipants: 200,
    prize:       "₹50,000 + Internship offers",
    host:        "LearnVeda Engineering",
    description: "Build an innovative EdTech solution in 48 hours. Open to all college students. Solo or teams of up to 3.",
    tags:        ["Hackathon", "Engineering", "Open Source"],
    registrationUrl: "#",
  },
  {
    id:          "dsa-workshop-01",
    title:       "DSA Bootcamp: Arrays & Strings",
    type:        "workshop",
    status:      "live",
    date:        "Today",
    time:        "6:00 PM IST",
    duration:    "2 hours",
    participants: 567,
    host:        "LearnVeda Instructors",
    description: "Deep dive into Arrays and Strings — the most common DSA interview topics. 20+ problems solved live.",
    tags:        ["DSA", "Interview Prep", "Coding"],
    registrationUrl: "#",
  },
  {
    id:          "science-olympiad-01",
    title:       "National Science Olympiad 2025",
    type:        "olympiad",
    status:      "past",
    date:        "June 15, 2025",
    time:        "10:00 AM IST",
    duration:    "90 minutes",
    participants: 3245,
    prize:       "Certificates + Medals",
    host:        "LearnVeda",
    description: "National-level science olympiad for Class 9–12. Physics, Chemistry, Biology sections.",
    tags:        ["Science", "Olympiad", "Class 9-12"],
  },
];

/* ─── Event type config ──────────────────────────────────────────────────── */
const EVENT_TYPE_CONFIG: Record<EventType, { label: string; icon: React.ComponentType<{ className?: string }>; color: string }> = {
  battle:    { label: "Live Battle",  icon: Trophy,    color: "bg-red-500/10 text-red-500 border-red-500/20"     },
  workshop:  { label: "Workshop",    icon: Sparkles,   color: "bg-purple-500/10 text-purple-500 border-purple-500/20" },
  hackathon: { label: "Hackathon",   icon: Code2,      color: "bg-orange-500/10 text-orange-500 border-orange-500/20" },
  "mock-test": { label: "Mock Test", icon: BookOpen,   color: "bg-blue-500/10 text-blue-500 border-blue-500/20"  },
  lecture:   { label: "Lecture",     icon: Users,      color: "bg-green-500/10 text-green-500 border-green-500/20" },
  olympiad:  { label: "Olympiad",    icon: Trophy,     color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" },
};

/* ─── Filter tabs ────────────────────────────────────────────────────────── */
const FILTERS: { label: string; value: "all" | EventStatus }[] = [
  { label: "All Events",  value: "all"      },
  { label: "🔴 Live Now", value: "live"     },
  { label: "Upcoming",    value: "upcoming" },
  { label: "Past",        value: "past"     },
];

/* ─── EventsGrid Component ───────────────────────────────────────────────── */
export function EventsGrid() {
  const [filter, setFilter] = useState<"all" | EventStatus>("all"); // Active filter tab

  // Filter events based on active tab
  const filtered = filter === "all" ? EVENTS : EVENTS.filter((e) => e.status === filter);

  return (
    <section className="py-20 bg-background">
      <div className="container px-4 md:px-6">
        {/* ── Header ───────────────────────────────────────────────────── */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Events & Competitions</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join live battles, workshops, hackathons, and olympiads. Compete, learn, and win prizes.
          </p>
        </div>

        {/* ── Filter tabs ───────────────────────────────────────────────── */}
        <div className="flex items-center gap-2 mb-10 flex-wrap justify-center">
          <Filter className="h-4 w-4 text-muted-foreground" />
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}   // Set active filter
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === f.value
                  ? "bg-brand-500 text-white shadow-sm"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* ── Events grid ───────────────────────────────────────────────── */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((event, i) => {
            const typeConfig = EVENT_TYPE_CONFIG[event.type];
            const TypeIcon   = typeConfig.icon;

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="rounded-2xl border bg-card shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                {/* Status + type header */}
                <div className={`px-5 py-3 flex items-center justify-between border-b ${
                  event.status === "live" ? "bg-red-500/10" : "bg-muted/30"
                }`}>
                  <Badge
                    variant="outline"
                    className={`text-xs ${typeConfig.color}`}
                  >
                    <TypeIcon className="h-3 w-3 mr-1" />
                    {typeConfig.label}
                  </Badge>
                  {event.status === "live" && (
                    <span className="flex items-center gap-1.5 text-xs text-red-500 font-semibold">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      LIVE
                    </span>
                  )}
                  {event.status === "past" && (
                    <Badge variant="secondary" className="text-xs">Ended</Badge>
                  )}
                </div>

                {/* Event content */}
                <div className="p-5">
                  <h3 className="font-bold text-foreground mb-2 leading-tight">{event.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{event.description}</p>

                  {/* Event meta */}
                  <div className="space-y-1.5 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5 text-brand-500" />
                      {event.date} at {event.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 text-brand-500" />
                      {event.duration}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-3.5 w-3.5 text-brand-500" />
                      {event.participants.toLocaleString()} registered
                      {event.maxParticipants && ` / ${event.maxParticipants.toLocaleString()} max`}
                    </div>
                    {event.prize && (
                      <div className="flex items-center gap-2">
                        <Trophy className="h-3.5 w-3.5 text-yellow-500" />
                        {event.prize}
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {event.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded-full bg-muted text-xs text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  {event.status !== "past" && event.registrationUrl && (
                    <a
                      href={event.registrationUrl}
                      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-brand-500 text-white text-sm font-semibold hover:bg-brand-600 transition-colors"
                    >
                      {event.status === "live" ? "Join Now" : "Register Free"}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {event.status === "past" && (
                    <div className="text-center py-2 text-sm text-muted-foreground">Event has ended</div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            No events found for this filter.
          </div>
        )}
      </div>
    </section>
  );
}
