/**
 * @file features/live/components/LiveClassesHub.tsx
 * @description Live Classes hub — scheduled live sessions, live stream join,
 * recordings library, and upcoming class notifications.
 * Production-ready UI — in production: connects to /api/live endpoints.
 * Uses: Framer Motion animations, real-time countdown timers
 */

"use client"; // Client component — uses state, timers, and interactivity

import React, { useState, useEffect } from "react"; // React core + hooks
import { motion, AnimatePresence }     from "framer-motion"; // Smooth animations
import {
  Video, Clock, Users, Play, Calendar, Bell, BellOff,
  BookOpen, Code2, FlaskConical, Brain, GraduationCap,
  Radio, ChevronRight, Star, Search, Filter,
  Wifi, WifiOff, Download, Eye,
} from "lucide-react"; // Icons
import { Button } from "@/components/ui/button"; // Reusable button
import { Badge  } from "@/components/ui/badge";  // Label badge
import { Input  } from "@/components/ui/input";  // Search input
import { cn     } from "@/lib/utils";             // Tailwind class merger

/* ─── Live Class Data Types ───────────────────────────────────────────────── */
interface LiveClass {
  id:          string;   // Unique session ID
  title:       string;   // Class title
  subject:     string;   // Subject area
  teacher:     string;   // Teacher name
  teacherRole: string;   // Teacher role/background
  grade:       string;   // Target grade/level
  startTime:   Date;     // Class start time
  duration:    number;   // Duration in minutes
  enrolled:    number;   // Number of students enrolled
  maxCapacity: number;   // Max student capacity
  status:      "live" | "upcoming" | "recorded"; // Class status
  topics:      string[]; // Topics covered in this class
  thumbnail:   string;   // Emoji thumbnail (in production: real image URL)
  rating?:     number;   // Rating for recorded classes
  views?:      number;   // View count for recordings
  color:       string;   // Card gradient color
  free:        boolean;  // Free or Pro class
}

/* ─── Mock Live Class Data ────────────────────────────────────────────────── */
// In production: fetch from /api/live/classes endpoint
const LIVE_CLASSES: LiveClass[] = [
  {
    id: "lc1", title: "Newton's Laws — Deep Dive & Problem Solving",
    subject: "Physics", teacher: "Dr. Kavya Reddy", teacherRole: "IISc PhD",
    grade: "Class 11–12 & JEE",
    startTime: new Date(Date.now() + 5 * 60 * 1000), // Starts in 5 minutes
    duration: 90, enrolled: 234, maxCapacity: 500,
    status: "live", topics: ["Newton's 1st Law", "Free Body Diagrams", "Problem Solving"],
    thumbnail: "⚡", color: "from-blue-500 to-cyan-500", free: true,
  },
  {
    id: "lc2", title: "DSA Masterclass — Binary Trees & BST",
    subject: "Computer Science", teacher: "Arjun Sharma", teacherRole: "SDE-2 @ Google",
    grade: "Engineering & Placements",
    startTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // Starts in 2 hours
    duration: 120, enrolled: 389, maxCapacity: 600,
    status: "upcoming", topics: ["Binary Tree Traversals", "BST Operations", "LCA", "Height Balance"],
    thumbnail: "🌳", color: "from-purple-500 to-pink-500", free: false,
  },
  {
    id: "lc3", title: "Organic Chemistry — Reaction Mechanisms",
    subject: "Chemistry", teacher: "Dr. Ananya Singh", teacherRole: "IIT Delhi PhD",
    grade: "Class 11–12 & NEET",
    startTime: new Date(Date.now() + 4 * 60 * 60 * 1000), // Starts in 4 hours
    duration: 90, enrolled: 178, maxCapacity: 400,
    status: "upcoming", topics: ["SN1 & SN2 Reactions", "Elimination", "Addition Reactions"],
    thumbnail: "⚗️", color: "from-green-500 to-teal-500", free: true,
  },
  {
    id: "lc4", title: "Python for Beginners — Day 5: Functions & Scope",
    subject: "Programming", teacher: "Sneha Gupta", teacherRole: "Razorpay Engineer",
    grade: "Beginners",
    startTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // Recorded 2 days ago
    duration: 75, enrolled: 1240, maxCapacity: 1000,
    status: "recorded", topics: ["def keyword", "Parameters & Arguments", "Return Values", "Scope"],
    thumbnail: "🐍", color: "from-yellow-500 to-orange-500", free: true,
    rating: 4.8, views: 3420,
  },
  {
    id: "lc5", title: "JEE Math — Calculus: Limits & Continuity",
    subject: "Mathematics", teacher: "Priya Nair", teacherRole: "IIT Madras",
    grade: "Class 12 & JEE",
    startTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
    duration: 100, enrolled: 445, maxCapacity: 800,
    status: "upcoming", topics: ["Epsilon-Delta Definition", "L'Hôpital's Rule", "Continuity Tests"],
    thumbnail: "📐", color: "from-red-500 to-pink-500", free: false,
  },
  {
    id: "lc6", title: "Machine Learning: Linear Regression from Scratch",
    subject: "AI/ML", teacher: "Aditya Kumar", teacherRole: "Microsoft ML Engineer",
    grade: "Engineering & B.Tech",
    startTime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // Recorded 5 days ago
    duration: 110, enrolled: 890, maxCapacity: 1000,
    status: "recorded", topics: ["Cost Function", "Gradient Descent", "NumPy Implementation"],
    thumbnail: "🤖", color: "from-cyan-500 to-blue-500", free: false,
    rating: 4.9, views: 5621,
  },
];

/* ─── Countdown Timer Hook ────────────────────────────────────────────────── */
// Returns a formatted countdown string for a future date
function useCountdown(targetDate: Date): string {
  const [timeLeft, setTimeLeft] = useState(""); // Countdown display string

  useEffect(() => {
    const update = () => {
      const diff = targetDate.getTime() - Date.now(); // Milliseconds remaining
      if (diff <= 0) {
        setTimeLeft("Starting now"); // Class has started
        return;
      }
      const h = Math.floor(diff / 3_600_000);          // Hours
      const m = Math.floor((diff % 3_600_000) / 60_000); // Minutes
      const s = Math.floor((diff % 60_000) / 1000);      // Seconds
      setTimeLeft(
        h > 0 ? `${h}h ${m}m` : m > 0 ? `${m}m ${s}s` : `${s}s`
      );
    };

    update(); // Run immediately
    const interval = setInterval(update, 1000); // Update every second
    return () => clearInterval(interval); // Cleanup on unmount
  }, [targetDate]);

  return timeLeft;
}

/* ─── Live Class Card Component ───────────────────────────────────────────── */
function LiveClassCard({ liveClass }: { liveClass: LiveClass }) {
  const [notified, setNotified] = useState(false); // Notification toggle

  // Countdown for upcoming classes
  const CountdownDisplay = () => {
    const countdown = useCountdown(liveClass.startTime);
    return <span className="font-mono font-bold">{countdown}</span>;
  };

  // Calculate enrollment percentage
  const enrollPercent = Math.round((liveClass.enrolled / liveClass.maxCapacity) * 100);
  // Format class start time
  const startTimeFormatted = liveClass.startTime.toLocaleTimeString("en-IN", {
    hour: "2-digit", minute: "2-digit",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="group rounded-2xl border bg-card hover:border-brand-500/30 hover:shadow-md transition-all overflow-hidden"
    >
      {/* Card Header: Thumbnail + Status */}
      <div className={cn("flex items-center gap-4 p-5 bg-gradient-to-r opacity-90", liveClass.color, "relative")}>
        <div className="text-4xl">{liveClass.thumbnail}</div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            {/* Live indicator */}
            {liveClass.status === "live" && (
              <div className="flex items-center gap-1.5 rounded-full bg-red-500 px-2.5 py-1 text-[10px] font-bold text-white animate-pulse">
                <Radio className="h-2.5 w-2.5" />
                LIVE NOW
              </div>
            )}
            {/* Upcoming indicator */}
            {liveClass.status === "upcoming" && (
              <Badge className="text-[10px] bg-white/20 text-white border-white/30">
                Upcoming
              </Badge>
            )}
            {/* Recorded indicator */}
            {liveClass.status === "recorded" && (
              <Badge className="text-[10px] bg-white/20 text-white border-white/30">
                Recording
              </Badge>
            )}
            {/* Free badge */}
            {liveClass.free ? (
              <Badge className="text-[10px] bg-green-500 text-white border-0">Free</Badge>
            ) : (
              <Badge className="text-[10px] bg-white/20 text-white border-white/30">Pro</Badge>
            )}
          </div>
          <h3 className="font-bold text-white text-sm line-clamp-2 leading-tight">
            {liveClass.title}
          </h3>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 space-y-4">
        {/* Teacher info */}
        <div className="flex items-center gap-2">
          <div className={cn("flex h-8 w-8 items-center justify-center rounded-full text-white text-xs font-bold bg-gradient-to-br", liveClass.color)}>
            {liveClass.teacher.split(" ").map((n) => n[0]).join("")}
          </div>
          <div>
            <div className="text-sm font-medium">{liveClass.teacher}</div>
            <div className="text-xs text-muted-foreground">{liveClass.teacherRole}</div>
          </div>
        </div>

        {/* Meta info */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
          <div className="flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5" />
            {liveClass.grade}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {liveClass.duration} min
          </div>
          {liveClass.status === "recorded" ? (
            <div className="flex items-center gap-1">
              <Eye className="h-3.5 w-3.5" />
              {liveClass.views?.toLocaleString()} views
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              {liveClass.enrolled.toLocaleString()} enrolled
            </div>
          )}
          {liveClass.rating && (
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
              {liveClass.rating}
            </div>
          )}
        </div>

        {/* Topics covered */}
        <div className="flex flex-wrap gap-1.5">
          {liveClass.topics.slice(0, 3).map((topic) => (
            <span key={topic} className="rounded-md bg-muted px-2 py-0.5 text-[10px] text-muted-foreground font-medium">
              {topic}
            </span>
          ))}
        </div>

        {/* Enrollment progress bar (upcoming classes) */}
        {liveClass.status !== "recorded" && (
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>{liveClass.enrolled} enrolled</span>
              <span>{enrollPercent}% full</span>
            </div>
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className={cn("h-full rounded-full bg-gradient-to-r", liveClass.color)}
                style={{ width: `${enrollPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Action Row */}
        <div className="flex items-center justify-between pt-1">
          {/* Time info */}
          <div className="text-xs">
            {liveClass.status === "live" && (
              <span className="text-red-500 font-medium animate-pulse">● Streaming now</span>
            )}
            {liveClass.status === "upcoming" && (
              <div className="text-muted-foreground">
                Starts in <CountdownDisplay />
              </div>
            )}
            {liveClass.status === "recorded" && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <Download className="h-3.5 w-3.5" />
                Watch anytime
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Notify button for upcoming classes */}
            {liveClass.status === "upcoming" && (
              <button
                onClick={() => setNotified(!notified)}
                className={cn(
                  "rounded-lg p-2 transition-colors",
                  notified
                    ? "bg-brand-500/10 text-brand-500"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted",
                )}
                title={notified ? "Remove notification" : "Notify me"}
              >
                {notified ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
              </button>
            )}

            {/* Main action button */}
            <Button
              size="sm"
              className={cn(
                "text-xs gap-1.5",
                liveClass.status === "live"
                  ? "bg-red-500 hover:bg-red-600 animate-pulse"
                  : "bg-brand-500 hover:bg-brand-600",
              )}
              disabled={!liveClass.free && liveClass.status !== "recorded"} // Pro gating demo
            >
              {liveClass.status === "live" && <><Radio className="h-3 w-3" /> Join Live</>}
              {liveClass.status === "upcoming" && <><Calendar className="h-3 w-3" /> Register</>}
              {liveClass.status === "recorded" && <><Play className="h-3 w-3" /> Watch</>}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Live Classes Hub ───────────────────────────────────────────────── */
export function LiveClassesHub() {
  const [search,      setSearch]      = useState("");         // Search query
  const [activeTab,   setActiveTab]   = useState<"all" | "live" | "upcoming" | "recorded">("all"); // Status filter
  const [subjectFilter, setSubjectFilter] = useState("all"); // Subject filter

  // Unique subjects from data for filter
  const subjects = ["all", ...new Set(LIVE_CLASSES.map((c) => c.subject))];

  // Filter classes based on active tab and search
  const filteredClasses = LIVE_CLASSES.filter((cls) => {
    const matchesTab     = activeTab === "all" || cls.status === activeTab;
    const matchesSubject = subjectFilter === "all" || cls.subject === subjectFilter;
    const matchesSearch  = !search || cls.title.toLowerCase().includes(search.toLowerCase()) ||
                           cls.subject.toLowerCase().includes(search.toLowerCase()) ||
                           cls.teacher.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSubject && matchesSearch;
  });

  // Sort: live first → upcoming by time → recorded by views
  const sortedClasses = [...filteredClasses].sort((a, b) => {
    const order = { live: 0, upcoming: 1, recorded: 2 }; // Status sort order
    if (order[a.status] !== order[b.status]) return order[a.status] - order[b.status];
    if (a.status === "upcoming") return a.startTime.getTime() - b.startTime.getTime(); // Soonest first
    return 0;
  });

  // Live class count for tab badge
  const liveCount = LIVE_CLASSES.filter((c) => c.status === "live").length;

  return (
    <div className="container px-4 md:px-6 py-8 space-y-8">

      {/* ── Page Header ─────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-3"
      >
        <div className="flex items-center gap-2 flex-wrap">
          {liveCount > 0 && (
            <div className="flex items-center gap-1.5 rounded-full bg-red-500/10 border border-red-500/30 px-3 py-1 text-xs font-bold text-red-500 animate-pulse">
              <Radio className="h-3 w-3" />
              {liveCount} Class{liveCount > 1 ? "es" : ""} Live Now
            </div>
          )}
          <Badge className="bg-brand-500/10 text-brand-600 border-brand-500/20">
            Live Learning
          </Badge>
        </div>
        <h1 className="text-3xl font-extrabold">Live Classes</h1>
        <p className="text-muted-foreground max-w-xl">
          Learn live with expert teachers. Ask questions in real-time, get instant feedback,
          and watch recordings anytime. New classes added daily.
        </p>

        {/* Platform features */}
        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
          {[
            { icon: <Video  className="h-3.5 w-3.5" />, label: "HD video streaming"    },
            { icon: <Users  className="h-3.5 w-3.5" />, label: "Live Q&A chat"         },
            { icon: <Download className="h-3.5 w-3.5" />, label: "Downloadable notes"  },
            { icon: <Clock  className="h-3.5 w-3.5" />, label: "Recordings for 30 days" },
          ].map((feature) => (
            <div key={feature.label} className="flex items-center gap-1.5 text-muted-foreground">
              <span className="text-brand-500">{feature.icon}</span>
              {feature.label}
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Search Bar ──────────────────────────────────────────────────── */}
      <div className="relative max-w-lg">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search classes by topic, teacher, or subject…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 text-sm"
        />
      </div>

      {/* ── Status Tabs ─────────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 flex-wrap">
        {(["all", "live", "upcoming", "recorded"] as const).map((tab) => {
          const count = tab === "all" ? LIVE_CLASSES.length : LIVE_CLASSES.filter((c) => c.status === tab).length;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "flex items-center gap-1.5 rounded-xl border px-4 py-2 text-xs font-medium transition-all capitalize",
                activeTab === tab
                  ? tab === "live"
                    ? "border-red-500/50 bg-red-500/10 text-red-600"
                    : "border-brand-500/50 bg-brand-500/10 text-brand-600"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted",
              )}
            >
              {tab === "live" && <Radio className="h-3 w-3" />}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              <span className={cn(
                "rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                activeTab === tab ? "bg-current/20" : "bg-muted text-muted-foreground",
              )}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Subject Filters ──────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
        {subjects.map((subject) => (
          <button
            key={subject}
            onClick={() => setSubjectFilter(subject)}
            className={cn(
              "rounded-lg border px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all shrink-0 capitalize",
              subjectFilter === subject
                ? "border-brand-500/50 bg-brand-500/10 text-brand-600"
                : "text-muted-foreground hover:text-foreground hover:bg-muted",
            )}
          >
            {subject === "all" ? "All Subjects" : subject}
          </button>
        ))}
      </div>

      {/* ── Class Grid ──────────────────────────────────────────────────── */}
      {sortedClasses.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <Video className="h-12 w-12 mx-auto mb-3 opacity-30" />
          <p className="font-medium">No classes found</p>
          <p className="text-sm">Try a different filter or search term.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {sortedClasses.map((liveClass) => (
              <LiveClassCard key={liveClass.id} liveClass={liveClass} />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* ── Weekly Schedule CTA ──────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-2xl border bg-gradient-to-br from-blue-500/5 to-purple-500/5 p-8 text-center space-y-4"
      >
        <Calendar className="h-10 w-10 text-brand-500 mx-auto" />
        <h3 className="text-xl font-bold">Never Miss a Class</h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Subscribe to the LearnVeda live schedule and get notified 10 minutes
          before every class in your subjects.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button className="bg-brand-500 hover:bg-brand-600 gap-2">
            <Bell className="h-4 w-4" />
            Subscribe to Schedule
          </Button>
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            View Full Calendar
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
