/**
 * @file features/mentorship/components/MentorshipHub.tsx
 * @description Mentorship hub — browse expert mentors, book 1:1 sessions,
 * view upcoming calls, and track session history.
 * Production-ready UI with mentor cards, filter system, and booking modal.
 * In production: connects to /api/mentorship endpoints for real mentor data.
 */

"use client"; // Client component — uses state, filters, and modal interactions

import React, { useState, useMemo } from "react"; // React core
import { motion, AnimatePresence }   from "framer-motion"; // Smooth animations
import {
  Search, Star, Clock, Video, Calendar, Filter,
  BookOpen, Code2, Brain, FlaskConical, GraduationCap,
  Award, MapPin, Users, ChevronRight, X, Check,
  MessageSquare, Zap, Badge as BadgeIcon, Heart,
} from "lucide-react"; // Icons
import { Button } from "@/components/ui/button"; // Reusable button
import { Badge  } from "@/components/ui/badge";  // Label badge
import { Input  } from "@/components/ui/input";  // Search input
import { cn     } from "@/lib/utils";             // Tailwind merger

/* ─── Mentor Data Types ───────────────────────────────────────────────────── */
interface Mentor {
  id:           string;   // Unique mentor ID
  name:         string;   // Full name
  avatar:       string;   // Initials (fallback for missing images)
  avatarColor:  string;   // Gradient CSS class for avatar background
  title:        string;   // Current role/company
  college:      string;   // Education background
  subjects:     string[]; // Areas of expertise
  tags:         string[]; // Quick-filter tags (JEE, NEET, etc.)
  rating:       number;   // Average rating (1-5)
  reviewCount:  number;   // Total reviews
  sessions:     number;   // Total sessions conducted
  rate:         number;   // INR per 30-min session
  experience:   number;   // Years of experience
  location:     string;   // City, State
  bio:          string;   // Short bio
  available:    boolean;  // Currently accepting bookings
  nextSlot:     string;   // Next available slot text
  languages:    string[]; // Teaching languages
  badges:       string[]; // Special badges (Top Rated, IIT Alumni, etc.)
}

/* ─── Mock Mentor Data (replace with /api/mentorship in production) ──────── */
const MENTORS: Mentor[] = [
  {
    id: "m1", name: "Arjun Sharma", avatar: "AS",
    avatarColor: "from-blue-500 to-cyan-500",
    title: "SDE-2 @ Google", college: "IIT Bombay, B.Tech CSE",
    subjects: ["DSA", "System Design", "Python", "Java"],
    tags: ["Coding", "Placements", "Tech Interviews"],
    rating: 4.9, reviewCount: 312, sessions: 850, rate: 999,
    experience: 5, location: "Bengaluru, Karnataka",
    bio: "Ex-Amazon, now at Google. I help students crack top tech interviews with structured DSA + System Design prep. 850+ sessions, 95% offer-rate students.",
    available: true, nextSlot: "Today, 6 PM",
    languages: ["English", "Hindi"],
    badges: ["Top Rated", "IIT Alumni", "500+ Sessions"],
  },
  {
    id: "m2", name: "Priya Nair", avatar: "PN",
    avatarColor: "from-purple-500 to-pink-500",
    title: "JEE Expert Mentor", college: "IIT Madras, B.Tech Maths",
    subjects: ["JEE Math", "JEE Physics", "Class 11-12 Math"],
    tags: ["JEE", "Class 11", "Class 12", "Maths"],
    rating: 4.8, reviewCount: 198, sessions: 540, rate: 799,
    experience: 7, location: "Chennai, Tamil Nadu",
    bio: "Qualified JEE Advanced (AIR 312). Specialized in Advanced Maths, Calculus, and Mechanics for JEE. My students average 95%ile+ in JEE.",
    available: true, nextSlot: "Tomorrow, 9 AM",
    languages: ["English", "Tamil", "Hindi"],
    badges: ["JEE Expert", "IIT Alumni"],
  },
  {
    id: "m3", name: "Rohit Verma", avatar: "RV",
    avatarColor: "from-green-500 to-teal-500",
    title: "Research Scholar @ AIIMS", college: "AIIMS Delhi, MBBS",
    subjects: ["NEET Biology", "NEET Chemistry", "Physiology"],
    tags: ["NEET", "Biology", "Chemistry", "Medical"],
    rating: 4.9, reviewCount: 267, sessions: 620, rate: 899,
    experience: 6, location: "New Delhi",
    bio: "NEET AIR 89. Teaching Biology and Chemistry for NEET. My structured approach helps students understand concepts deeply, not just memorize.",
    available: true, nextSlot: "Today, 8 PM",
    languages: ["English", "Hindi"],
    badges: ["NEET Expert", "Top Rated"],
  },
  {
    id: "m4", name: "Sneha Gupta", avatar: "SG",
    avatarColor: "from-orange-500 to-red-500",
    title: "Full Stack Engineer @ Razorpay", college: "NIT Trichy, B.Tech ECE",
    subjects: ["Web Development", "React", "Node.js", "SQL"],
    tags: ["Coding", "Web Dev", "Projects", "Internships"],
    rating: 4.7, reviewCount: 145, sessions: 380, rate: 699,
    experience: 4, location: "Mumbai, Maharashtra",
    bio: "Building products at Razorpay. I help students transition into web development — from fundamentals to production-level projects that impress recruiters.",
    available: false, nextSlot: "Mon, 7 PM",
    languages: ["English", "Hindi"],
    badges: ["Industry Expert"],
  },
  {
    id: "m5", name: "Dr. Kavya Reddy", avatar: "KR",
    avatarColor: "from-yellow-500 to-orange-500",
    title: "Physics Professor", college: "IISc Bengaluru, PhD Physics",
    subjects: ["Class 11 Physics", "Class 12 Physics", "JEE Physics", "NEET Physics"],
    tags: ["Physics", "JEE", "NEET", "Class 11", "Class 12"],
    rating: 5.0, reviewCount: 89, sessions: 210, rate: 1299,
    experience: 12, location: "Bengaluru, Karnataka",
    bio: "PhD from IISc. Former JEE coach. I make Physics intuitive — from mechanics to quantum. Students who struggled with Physics say I changed how they think about it.",
    available: true, nextSlot: "Today, 4 PM",
    languages: ["English", "Telugu", "Kannada"],
    badges: ["Top Rated", "PhD Expert", "IISc"],
  },
  {
    id: "m6", name: "Aditya Kumar", avatar: "AK",
    avatarColor: "from-cyan-500 to-blue-500",
    title: "ML Engineer @ Microsoft", college: "IIT Kharagpur, M.Tech AI",
    subjects: ["Machine Learning", "Python", "Data Science", "AI/ML"],
    tags: ["AI/ML", "Data Science", "Python", "Research"],
    rating: 4.8, reviewCount: 176, sessions: 445, rate: 1099,
    experience: 6, location: "Hyderabad, Telangana",
    bio: "ML Engineer at Microsoft working on Azure AI. I help students break into AI/ML — from Python basics to deploying ML models. Placement success rate: 88%.",
    available: true, nextSlot: "Tomorrow, 11 AM",
    languages: ["English", "Hindi", "Bengali"],
    badges: ["AI/ML Expert", "IIT Alumni", "200+ Sessions"],
  },
];

/* ─── Filter Configuration ────────────────────────────────────────────────── */
const SUBJECT_FILTERS = [
  { id: "all",        label: "All Mentors",  icon: <Users       className="h-3.5 w-3.5" /> },
  { id: "Coding",     label: "Coding",       icon: <Code2       className="h-3.5 w-3.5" /> },
  { id: "JEE",        label: "JEE",          icon: <Brain       className="h-3.5 w-3.5" /> },
  { id: "NEET",       label: "NEET",         icon: <FlaskConical className="h-3.5 w-3.5" /> },
  { id: "Physics",    label: "Physics",      icon: <Zap         className="h-3.5 w-3.5" /> },
  { id: "Maths",      label: "Maths",        icon: <BookOpen    className="h-3.5 w-3.5" /> },
  { id: "AI/ML",      label: "AI/ML",        icon: <GraduationCap className="h-3.5 w-3.5" /> },
];

/* ─── Booking Modal Component ─────────────────────────────────────────────── */
function BookingModal({ mentor, onClose }: { mentor: Mentor; onClose: () => void }) {
  const [selectedDate, setSelectedDate] = useState(""); // Selected booking date
  const [selectedTime, setSelectedTime] = useState(""); // Selected time slot
  const [booked,       setBooked]       = useState(false); // Booking success state

  // Available time slots for demo
  const timeSlots = ["10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM", "6:00 PM", "8:00 PM"];

  const handleBook = () => {
    if (selectedDate && selectedTime) {
      setBooked(true); // Show success state — in production: POST /api/mentorship/book
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose} // Close on backdrop click
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95 }}
        onClick={(e) => e.stopPropagation()} // Prevent close on content click
        className="w-full max-w-md rounded-2xl border bg-background shadow-xl overflow-hidden"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h3 className="font-bold text-lg">Book a Session</h3>
            <p className="text-sm text-muted-foreground">with {mentor.name}</p>
          </div>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-muted transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5">
          {booked ? (
            /* Success State */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6 space-y-3"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 mx-auto">
                <Check className="h-8 w-8 text-green-500" />
              </div>
              <h4 className="font-bold text-lg">Session Booked! 🎉</h4>
              <p className="text-sm text-muted-foreground">
                Your session with {mentor.name} is confirmed for {selectedDate} at {selectedTime}.
                You'll receive a Google Meet link via email.
              </p>
              <Button onClick={onClose} className="mt-4 bg-green-500 hover:bg-green-600">
                Done
              </Button>
            </motion.div>
          ) : (
            <>
              {/* Mentor Summary */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/40">
                <div className={cn("flex h-10 w-10 items-center justify-center rounded-full text-white text-sm font-bold bg-gradient-to-br", mentor.avatarColor)}>
                  {mentor.avatar}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm">{mentor.name}</div>
                  <div className="text-xs text-muted-foreground">{mentor.title}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-sm">₹{mentor.rate}</div>
                  <div className="text-xs text-muted-foreground">per session</div>
                </div>
              </div>

              {/* Date Picker */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Date</label>
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]} // Minimum: today
                  className="text-sm"
                />
              </div>

              {/* Time Slot Grid */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Time Slot</label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedTime(slot)}
                      className={cn(
                        "rounded-lg border py-2 text-xs font-medium transition-all",
                        selectedTime === slot
                          ? "border-brand-500 bg-brand-500/10 text-brand-600" // Selected
                          : "hover:border-muted-foreground/40 text-muted-foreground", // Default
                      )}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Session Info */}
              <div className="rounded-lg bg-blue-500/5 border border-blue-500/20 p-3 text-xs space-y-1">
                <div className="flex items-center gap-2 text-blue-600 font-medium">
                  <Video className="h-3.5 w-3.5" />
                  Google Meet session (30 minutes)
                </div>
                <div className="text-muted-foreground">
                  A meeting link will be sent to your email after booking.
                </div>
              </div>

              {/* Book Button */}
              <Button
                onClick={handleBook}
                disabled={!selectedDate || !selectedTime}
                className="w-full bg-brand-500 hover:bg-brand-600"
              >
                Confirm Booking — ₹{mentor.rate}
              </Button>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Mentor Card Component ───────────────────────────────────────────────── */
function MentorCard({ mentor, onBook }: { mentor: Mentor; onBook: (m: Mentor) => void }) {
  const [saved, setSaved] = useState(false); // Wishlist toggle state

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="group rounded-2xl border bg-card hover:border-brand-500/30 hover:shadow-md transition-all overflow-hidden"
    >
      {/* Card Top: Avatar + basic info */}
      <div className="p-5">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className={cn(
              "flex h-14 w-14 items-center justify-center rounded-xl text-white font-bold text-lg bg-gradient-to-br",
              mentor.avatarColor,
            )}>
              {mentor.avatar}
            </div>
            {/* Online indicator */}
            {mentor.available && (
              <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-background" />
            )}
          </div>

          {/* Name + Title */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-bold text-base truncate">{mentor.name}</h3>
                <p className="text-xs text-muted-foreground truncate">{mentor.title}</p>
                <p className="text-xs text-muted-foreground">{mentor.college}</p>
              </div>
              {/* Save/wishlist button */}
              <button
                onClick={() => setSaved(!saved)}
                className={cn(
                  "shrink-0 rounded-full p-1.5 transition-colors",
                  saved ? "text-red-500 bg-red-500/10" : "text-muted-foreground hover:text-red-500 hover:bg-red-500/10",
                )}
              >
                <Heart className={cn("h-4 w-4", saved && "fill-current")} />
              </button>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-1 mt-2">
              {mentor.badges.slice(0, 2).map((badge) => (
                <Badge key={badge} className="text-[10px] bg-brand-500/10 text-brand-600 border-brand-500/20 py-0">
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
          {/* Rating */}
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
            <span className="font-semibold text-foreground">{mentor.rating}</span>
            <span>({mentor.reviewCount})</span>
          </div>
          {/* Sessions */}
          <div className="flex items-center gap-1">
            <Video className="h-3.5 w-3.5" />
            <span>{mentor.sessions} sessions</span>
          </div>
          {/* Location */}
          <div className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            <span>{mentor.location.split(",")[0]}</span>
          </div>
        </div>

        {/* Bio — truncated */}
        <p className="mt-3 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {mentor.bio}
        </p>

        {/* Subject Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {mentor.subjects.slice(0, 3).map((subject) => (
            <span key={subject} className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              {subject}
            </span>
          ))}
          {mentor.subjects.length > 3 && (
            <span className="rounded-md bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
              +{mentor.subjects.length - 3} more
            </span>
          )}
        </div>

        {/* Languages */}
        <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
          <MessageSquare className="h-3 w-3" />
          {mentor.languages.join(" · ")}
        </div>
      </div>

      {/* Card Footer: Rate + Book */}
      <div className="flex items-center justify-between border-t px-5 py-3 bg-muted/20">
        {/* Availability */}
        <div>
          <div className="text-xs text-muted-foreground">Next slot</div>
          <div className={cn(
            "text-xs font-semibold",
            mentor.available ? "text-green-600" : "text-muted-foreground",
          )}>
            {mentor.nextSlot}
          </div>
        </div>

        {/* Rate + Book Button */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="font-bold text-base">₹{mentor.rate}</div>
            <div className="text-[10px] text-muted-foreground">/ 30 min</div>
          </div>
          <Button
            onClick={() => onBook(mentor)}
            disabled={!mentor.available}
            size="sm"
            className="bg-brand-500 hover:bg-brand-600 text-xs"
          >
            {mentor.available ? "Book Now" : "Waitlist"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Mentorship Hub Component ──────────────────────────────────────── */
export function MentorshipHub() {
  // ── State ────────────────────────────────────────────────────────────────
  const [search,        setSearch]        = useState("");         // Search query
  const [activeFilter,  setActiveFilter]  = useState("all");      // Active subject filter
  const [bookingMentor, setBookingMentor] = useState<Mentor | null>(null); // Mentor being booked
  const [sortBy,        setSortBy]        = useState<"rating" | "sessions" | "rate">("rating"); // Sort order

  /* ── Filtered + Sorted Mentors ─────────────────────────────────────────── */
  const filteredMentors = useMemo(() => {
    let result = MENTORS;

    // Filter by search query (name, title, subjects)
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((m) =>
        m.name.toLowerCase().includes(q) ||
        m.title.toLowerCase().includes(q) ||
        m.subjects.some((s) => s.toLowerCase().includes(q)) ||
        m.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Filter by subject tag
    if (activeFilter !== "all") {
      result = result.filter((m) => m.tags.includes(activeFilter));
    }

    // Sort mentors
    return [...result].sort((a, b) => {
      if (sortBy === "rating")   return b.rating - a.rating;    // Highest rated first
      if (sortBy === "sessions") return b.sessions - a.sessions; // Most experienced first
      if (sortBy === "rate")     return a.rate - b.rate;         // Cheapest first
      return 0;
    });
  }, [search, activeFilter, sortBy]);

  return (
    <>
      <div className="container px-4 md:px-6 py-8 space-y-8">

        {/* ── Page Header ─────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-2"
        >
          <div className="flex items-center gap-2">
            <Badge className="bg-brand-500/10 text-brand-600 border-brand-500/20">
              1:1 Sessions
            </Badge>
            <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
              {MENTORS.filter((m) => m.available).length} Available Now
            </Badge>
          </div>
          <h1 className="text-3xl font-extrabold">Find Your Mentor</h1>
          <p className="text-muted-foreground max-w-xl">
            Learn from experts from IITs, NITs, AIIMS, and top tech companies.
            Book a personalized 1:1 session — get unstuck, plan your journey, or ace your next exam.
          </p>
        </motion.div>

        {/* ── Search + Sort Bar ────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, subject, or expertise…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 text-sm"
            />
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground shrink-0">Sort by:</span>
            {(["rating", "sessions", "rate"] as const).map((sort) => (
              <button
                key={sort}
                onClick={() => setSortBy(sort)}
                className={cn(
                  "rounded-lg border px-3 py-2 text-xs font-medium transition-all capitalize",
                  sortBy === sort
                    ? "border-brand-500/50 bg-brand-500/10 text-brand-600"
                    : "text-muted-foreground hover:text-foreground hover:border-muted-foreground/40",
                )}
              >
                {sort === "rate" ? "Price ↑" : sort === "rating" ? "Rating ↓" : "Experience"}
              </button>
            ))}
          </div>
        </div>

        {/* ── Subject Filter Tabs ──────────────────────────────────────────── */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
          {SUBJECT_FILTERS.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={cn(
                "flex items-center gap-1.5 rounded-xl border px-4 py-2 text-xs font-medium whitespace-nowrap transition-all shrink-0",
                activeFilter === filter.id
                  ? "border-brand-500/50 bg-brand-500/10 text-brand-600"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted",
              )}
            >
              {filter.icon}
              {filter.label}
            </button>
          ))}
        </div>

        {/* ── Results Count ────────────────────────────────────────────────── */}
        <div className="text-sm text-muted-foreground">
          {filteredMentors.length === 0
            ? "No mentors match your search — try a different filter."
            : `${filteredMentors.length} mentor${filteredMentors.length !== 1 ? "s" : ""} found`}
        </div>

        {/* ── Mentor Grid ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredMentors.map((mentor) => (
              <MentorCard
                key={mentor.id}
                mentor={mentor}
                onBook={setBookingMentor} // Open booking modal
              />
            ))}
          </AnimatePresence>
        </div>

        {/* ── Become a Mentor CTA ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border bg-gradient-to-br from-brand-500/5 to-purple-500/5 p-8 text-center space-y-4"
        >
          <GraduationCap className="h-10 w-10 text-brand-500 mx-auto" />
          <h3 className="text-xl font-bold">Become a LearnVeda Mentor</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Share your knowledge, earn ₹50,000–₹2,00,000/month, and help India's
            next generation of students succeed. We handle scheduling, payments, and student matching.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground">
            {["Set your own schedule", "Earn ₹999–₹2,999/session", "1,000+ students waiting", "Free mentor portal"].map((point) => (
              <div key={point} className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-green-500" />
                {point}
              </div>
            ))}
          </div>
          <Button className="bg-brand-500 hover:bg-brand-600 gap-2">
            Apply to Mentor
            <ChevronRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>

      {/* ── Booking Modal (Portal-like overlay) ─────────────────────────────── */}
      <AnimatePresence>
        {bookingMentor && (
          <BookingModal
            mentor={bookingMentor}
            onClose={() => setBookingMentor(null)} // Close booking modal
          />
        )}
      </AnimatePresence>
    </>
  );
}
