/**
 * @file app/(platform)/events/page.tsx
 * @description Events listing page for the platform (authenticated users)
 * Route: /events  (platform version — shows registration & personal event status)
 *
 * Shows:
 *   - Live events with countdown timers
 *   - Upcoming events with registration
 *   - Past events with results
 *   - My registrations
 *
 * Note: /events (marketing) shows public info; /events (platform) shows personal status.
 * In production: registration state fetched from /api/events?includeMyRegistrations=true
 */

import type { Metadata } from "next"; // SEO
import Link              from "next/link"; // Navigation
import {
  Calendar, Clock, Users, Trophy, ChevronRight,
  Zap, Star, CheckCircle2, ExternalLink, Bell,
  Globe, MapPin, Award, ArrowRight, Flame,
} from "lucide-react"; // Icons
import { Badge }  from "@/components/ui/badge";   // Badge
import { Button } from "@/components/ui/button";  // Button

/* ─── SEO Metadata ────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title:  "Events & Competitions — LearnVeda",
  description: "Upcoming olympiads, code sprints, hackathons, and live battles on LearnVeda.",
  robots: { index: false, follow: false }, // Private platform page
};

/* ─── Event Type ─────────────────────────────────────────────────────────── */
type EventStatus = "live" | "upcoming" | "completed";

interface Event {
  id:           string;   // Unique event ID
  title:        string;   // Event name
  type:         "olympiad" | "code-sprint" | "hackathon" | "mock-test" | "championship" | "battle"; // Event type
  status:       EventStatus; // Current status
  date:         string;   // Display date
  time?:        string;   // Display time (for live events)
  location:     "online" | string; // "online" or venue name
  participants: number;   // Registered participants
  maxParticipants?: number; // Max capacity (null = unlimited)
  prize?:       string;   // Prize or reward
  xpBonus:      number;   // XP multiplier bonus
  subjects:     string[]; // Relevant subjects
  isRegistered: boolean;  // Has current user registered?
  description:  string;   // Short description
  organizer:    string;   // Organizer name
}

/* ─── Events Data ─────────────────────────────────────────────────────────── */
// In production: fetched from /api/events with user registration status
const EVENTS: Event[] = [
  {
    id:           "ev-001",
    title:        "Code Sprint — DSA Challenge",
    type:         "code-sprint",
    status:       "live",
    date:         "July 6, 2026",
    time:         "Live Now",
    location:     "online",
    participants: 1247,
    prize:        "Premium subscription + Certificate",
    xpBonus:      3,
    subjects:     ["DSA", "Algorithms", "Data Structures"],
    isRegistered: true,
    description:  "Solve 20 DSA problems in 60 minutes. Compete live against 1000+ students. ELO-ranked.",
    organizer:    "LearnVeda",
  },
  {
    id:           "ev-002",
    title:        "Science Olympiad 2026",
    type:         "olympiad",
    status:       "upcoming",
    date:         "July 20, 2026",
    location:     "online",
    participants: 2890,
    maxParticipants: 5000,
    prize:        "Gold/Silver/Bronze medals + ₹10,000 scholarship",
    xpBonus:      5,
    subjects:     ["Physics", "Chemistry", "Biology"],
    isRegistered: true,
    description:  "Annual science olympiad covering Class 9–12 NCERT curriculum. 100 questions, 90 minutes.",
    organizer:    "LearnVeda × NCERT",
  },
  {
    id:           "ev-003",
    title:        "Math Battle Royale",
    type:         "battle",
    status:       "upcoming",
    date:         "August 2, 2026",
    location:     "online",
    participants: 850,
    prize:        "₹5,000 + LearnVeda Pro (1 year)",
    xpBonus:      4,
    subjects:     ["Mathematics", "Algebra", "Calculus"],
    isRegistered: false,
    description:  "1v1 elimination tournament. 64 students → 32 → 16 → 8 → 4 → 2 → Champion.",
    organizer:    "LearnVeda",
  },
  {
    id:           "ev-004",
    title:        "Inter-College Python Hackathon",
    type:         "hackathon",
    status:       "upcoming",
    date:         "August 20, 2026",
    location:     "Delhi NCR + Online",
    participants: 420,
    maxParticipants: 600,
    prize:        "₹25,000 first prize + internship opportunities",
    xpBonus:      10,
    subjects:     ["Python", "Web Development", "AI/ML"],
    isRegistered: false,
    description:  "24-hour build. Teams of 3–4. Build an AI-powered educational tool. GitHub submission.",
    organizer:    "LearnVeda × IIT Delhi",
  },
  {
    id:           "ev-005",
    title:        "Board Exam Mock Test — Class 10",
    type:         "mock-test",
    status:       "completed",
    date:         "June 28, 2026",
    location:     "online",
    participants: 4200,
    prize:        "Certificate + Detailed analysis report",
    xpBonus:      2,
    subjects:     ["Mathematics", "Science", "Social Science", "English"],
    isRegistered: true,
    description:  "Full CBSE Class 10 board mock exam with detailed performance analysis and rank.",
    organizer:    "LearnVeda",
  },
  {
    id:           "ev-006",
    title:        "Python Championship 2026",
    type:         "championship",
    status:       "upcoming",
    date:         "August 15, 2026",
    location:     "online",
    participants: 980,
    prize:        "₹15,000 + Python Certified Developer badge",
    xpBonus:      6,
    subjects:     ["Python", "OOP", "Data Structures"],
    isRegistered: false,
    description:  "Three rounds: Basics → Intermediate → Advanced. 2 hours per round. FAANG-style.",
    organizer:    "LearnVeda",
  },
];

/* ─── Event Type Icons ────────────────────────────────────────────────────── */
const EVENT_TYPE_ICONS = {
  "olympiad":     "🏆",
  "code-sprint":  "⚡",
  "hackathon":    "💻",
  "mock-test":    "📝",
  "championship": "🥇",
  "battle":       "⚔️",
};

/* ─── Status colors ──────────────────────────────────────────────────────── */
function statusBadge(status: EventStatus) {
  switch (status) {
    case "live":      return <Badge className="bg-red-500 text-white border-red-500 animate-pulse"><Flame className="h-3 w-3 mr-1" />Live</Badge>;
    case "upcoming":  return <Badge variant="outline" className="border-blue-500/50 text-blue-600">Upcoming</Badge>;
    case "completed": return <Badge variant="outline" className="text-muted-foreground">Completed</Badge>;
  }
}

/* ─── Page Component ─────────────────────────────────────────────────────── */
export default function EventsPage() {
  const live      = EVENTS.filter((e) => e.status === "live");      // Currently live
  const upcoming  = EVENTS.filter((e) => e.status === "upcoming");  // Coming soon
  const completed = EVENTS.filter((e) => e.status === "completed"); // Past events
  const myEvents  = EVENTS.filter((e) => e.isRegistered);           // My registrations

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/40 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4" aria-label="Breadcrumb">
            <Link href="/dashboard" className="hover:text-foreground transition-colors">Platform</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">Events</span>
          </nav>
          <div className="flex items-center gap-3">
            <Calendar className="h-8 w-8 text-brand-500" />
            <div>
              <h1 className="text-2xl font-bold">Events & Competitions</h1>
              <p className="text-muted-foreground text-sm">Compete, learn, and win — {EVENTS.length} events available</p>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-4 gap-4">
            {[
              { label: "Live Now",    value: live.length,              icon: Flame,  color: "text-red-500" },
              { label: "Upcoming",    value: upcoming.length,          icon: Calendar, color: "text-blue-500" },
              { label: "My Events",   value: myEvents.length,          icon: CheckCircle2, color: "text-green-500" },
              { label: "Total XP Available", value: "50,000+",         icon: Zap,    color: "text-purple-500" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-lg border border-border/40 bg-card p-4 flex items-center gap-3">
                <stat.icon className={`h-5 w-5 ${stat.color} shrink-0`} />
                <div>
                  <p className="font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-10">
        {/* Live events */}
        {live.length > 0 && (
          <section aria-labelledby="live-events-heading">
            <h2 id="live-events-heading" className="text-lg font-bold mb-4 flex items-center gap-2">
              <Flame className="h-5 w-5 text-red-500" />
              Happening Now
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {live.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </section>
        )}

        {/* Upcoming events */}
        <section aria-labelledby="upcoming-events-heading">
          <h2 id="upcoming-events-heading" className="text-lg font-bold mb-4 flex items-center gap-2">
            <Bell className="h-5 w-5 text-blue-500" />
            Upcoming Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {upcoming.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>

        {/* Past events */}
        <section aria-labelledby="past-events-heading">
          <h2 id="past-events-heading" className="text-lg font-bold mb-4 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-muted-foreground" />
            Past Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {completed.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

/* ─── Event Card Component ───────────────────────────────────────────────── */
function EventCard({ event }: { event: Event }) {
  return (
    <div className={`rounded-xl border bg-card overflow-hidden hover:shadow-md transition-all ${
      event.status === "live" ? "border-red-500/30" : "border-border/40"
    }`}>
      {/* Top accent */}
      <div className={`h-1 ${
        event.status === "live"      ? "bg-red-500" :
        event.status === "upcoming"  ? "bg-blue-500" :
        "bg-muted"
      }`} />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{EVENT_TYPE_ICONS[event.type]}</span>
            <div>
              <h3 className="font-semibold text-sm leading-tight">{event.title}</h3>
              <p className="text-xs text-muted-foreground">{event.organizer}</p>
            </div>
          </div>
          {statusBadge(event.status)}
        </div>

        {/* Description */}
        <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{event.description}</p>

        {/* Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5 shrink-0" />
            {event.date}{event.time ? ` · ${event.time}` : ""}
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {event.location === "online"
              ? <><Globe className="h-3.5 w-3.5 shrink-0" />Online</>
              : <><MapPin className="h-3.5 w-3.5 shrink-0" />{event.location}</>}
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Users className="h-3.5 w-3.5 shrink-0" />
            {event.participants.toLocaleString()} registered
            {event.maxParticipants && ` / ${event.maxParticipants.toLocaleString()} max`}
          </div>
          {event.prize && (
            <div className="flex items-center gap-2 text-xs text-yellow-600">
              <Award className="h-3.5 w-3.5 shrink-0" />
              {event.prize}
            </div>
          )}
        </div>

        {/* XP bonus + subjects */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <Badge variant="outline" className="text-xs border-purple-500/40 text-purple-600">
            <Zap className="h-3 w-3 mr-1" />{event.xpBonus}× XP
          </Badge>
          {event.subjects.slice(0, 2).map((sub) => (
            <Badge key={sub} variant="secondary" className="text-xs">{sub}</Badge>
          ))}
        </div>

        {/* CTA button */}
        {event.status === "live" && event.isRegistered && (
          <Button className="w-full gap-1.5" size="sm">
            <Zap className="h-3.5 w-3.5" /> Join Now (Live!)
          </Button>
        )}
        {event.status === "upcoming" && event.isRegistered && (
          <Button variant="outline" className="w-full gap-1.5 text-green-600 border-green-500/40" size="sm">
            <CheckCircle2 className="h-3.5 w-3.5" /> Registered
          </Button>
        )}
        {event.status === "upcoming" && !event.isRegistered && (
          <Button className="w-full gap-1.5" size="sm">
            Register Free <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        )}
        {event.status === "completed" && (
          <Button variant="outline" className="w-full gap-1.5" size="sm">
            <ExternalLink className="h-3.5 w-3.5" /> View Results
          </Button>
        )}
      </div>
    </div>
  );
}
