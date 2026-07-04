/**
 * @file app/(platform)/learn/class-9/page.tsx
 * @description Class 9 subjects listing page for LearnVeda
 * Route: /learn/class-9
 * Shows all CBSE Class 9 subjects with chapter counts, progress, and navigation
 * Server component for fast SSR and SEO
 */

import type { Metadata } from "next";                    // SEO metadata type
import Link from "next/link";                             // Client-side navigation
import {
  BookOpen, FlaskConical, Globe, Languages, Calculator,
  Monitor, Brain, Atom, Users, Palette, Dumbbell,
  ArrowRight, Clock, Star, ChevronRight,
} from "lucide-react";                                    // Icons for subjects
import { Badge }  from "@/components/ui/badge";           // UI badge component
import { Button } from "@/components/ui/button";          // UI button component

/* ─── Page-level SEO Metadata ─────────────────────────────────────────────── */
export const metadata: Metadata = {
  title:       "Class 9 — CBSE NCERT Curriculum | LearnVeda",
  description:
    "Complete CBSE Class 9 curriculum on LearnVeda. Study Mathematics, Science, " +
    "Social Science, English, Hindi, Sanskrit, IT, AI, and more with interactive " +
    "simulations, quizzes, and structured day-wise plans.",
  keywords: ["Class 9 CBSE", "NCERT Class 9", "Class 9 Mathematics", "Class 9 Science"],
  openGraph: {
    title:       "Class 9 CBSE — LearnVeda Learning Hub",
    description: "All Class 9 CBSE subjects with structured plans, simulations & quizzes.",
    type:        "website",
  },
};

/* ─── Class 9 Subjects Data ──────────────────────────────────────────────── */
// Complete list of CBSE Class 9 subjects with their details
const CLASS_9_SUBJECTS = [
  {
    id:       "mathematics",
    slug:     "mathematics",
    name:     "Mathematics",
    icon:     Calculator,
    chapters: 15,
    color:    "from-blue-500 to-cyan-500",
    bg:       "bg-blue-500/10",
    border:   "border-blue-500/20",
    textColor:"text-blue-600 dark:text-blue-400",
    topics:   ["Number Systems", "Polynomials", "Coordinate Geometry", "Triangles", "Statistics"],
    duration: "45 days",
    difficulty: "Foundation",
    hasSimulation: false,
    description: "Master algebra, geometry, and statistics with structured daily lessons and practice problems.",
  },
  {
    id:       "science",
    slug:     "science",
    name:     "Science",
    icon:     FlaskConical,
    chapters: 14,
    color:    "from-green-500 to-emerald-500",
    bg:       "bg-green-500/10",
    border:   "border-green-500/20",
    textColor:"text-green-600 dark:text-green-400",
    topics:   ["Matter & Its Nature", "Force & Laws of Motion", "Gravitation", "Work & Energy", "Atoms & Molecules"],
    duration: "45 days",
    difficulty: "Foundation",
    hasSimulation: true, // Physics simulations available
    description: "Explore Physics, Chemistry, and Biology with 25+ interactive simulations and NCERT-aligned content.",
  },
  {
    id:       "social-science",
    slug:     "social-science",
    name:     "Social Science",
    icon:     Globe,
    chapters: 20,
    color:    "from-orange-500 to-amber-500",
    bg:       "bg-orange-500/10",
    border:   "border-orange-500/20",
    textColor:"text-orange-600 dark:text-orange-400",
    topics:   ["French Revolution", "India — Size & Location", "Democratic Politics", "Poverty as a Challenge"],
    duration: "40 days",
    difficulty: "Foundation",
    hasSimulation: false,
    description: "Study History, Geography, Civics, and Economics with maps, timelines, and structured notes.",
  },
  {
    id:       "english",
    slug:     "english",
    name:     "English",
    icon:     BookOpen,
    chapters: 12,
    color:    "from-purple-500 to-violet-500",
    bg:       "bg-purple-500/10",
    border:   "border-purple-500/20",
    textColor:"text-purple-600 dark:text-purple-400",
    topics:   ["Beehive Literature", "Moments (Supplementary)", "Grammar", "Writing Skills"],
    duration: "30 days",
    difficulty: "Foundation",
    hasSimulation: false,
    description: "Master English literature (Beehive + Moments), grammar, writing formats, and comprehension.",
  },
  {
    id:       "hindi",
    slug:     "hindi",
    name:     "Hindi",
    icon:     Languages,
    chapters: 12,
    color:    "from-rose-500 to-pink-500",
    bg:       "bg-rose-500/10",
    border:   "border-rose-500/20",
    textColor:"text-rose-600 dark:text-rose-400",
    topics:   ["Kshitij (Poetry & Prose)", "Sparsh", "Sanchayan", "Grammar"],
    duration: "30 days",
    difficulty: "Foundation",
    hasSimulation: false,
    description: "Study Kshitij, Sparsh, Sanchayan textbooks with detailed explanations and grammar practice.",
  },
  {
    id:       "sanskrit",
    slug:     "sanskrit",
    name:     "Sanskrit",
    icon:     Languages,
    chapters: 10,
    color:    "from-yellow-500 to-amber-500",
    bg:       "bg-yellow-500/10",
    border:   "border-yellow-500/20",
    textColor:"text-yellow-600 dark:text-yellow-400",
    topics:   ["Shemushi", "Vyakaranavithi", "Sanskrit Grammar", "Translation"],
    duration: "25 days",
    difficulty: "Foundation",
    hasSimulation: false,
    description: "Learn Sanskrit through Shemushi textbook, grammar (Vyakaranavithi), and translation exercises.",
  },
  {
    id:       "information-technology",
    slug:     "information-technology",
    name:     "Information Technology",
    icon:     Monitor,
    chapters: 8,
    color:    "from-cyan-500 to-sky-500",
    bg:       "bg-cyan-500/10",
    border:   "border-cyan-500/20",
    textColor:"text-cyan-600 dark:text-cyan-400",
    topics:   ["Digital Tools", "Communication Skills", "Office Productivity", "Internet Basics"],
    duration: "20 days",
    difficulty: "Foundation",
    hasSimulation: false,
    description: "Master digital tools, office applications, internet safety, and basic IT concepts.",
  },
  {
    id:       "artificial-intelligence",
    slug:     "artificial-intelligence",
    name:     "Artificial Intelligence",
    icon:     Brain,
    chapters: 8,
    color:    "from-indigo-500 to-blue-500",
    bg:       "bg-indigo-500/10",
    border:   "border-indigo-500/20",
    textColor:"text-indigo-600 dark:text-indigo-400",
    topics:   ["Introduction to AI", "Python Programming", "Machine Learning Basics", "AI Ethics"],
    duration: "25 days",
    difficulty: "Foundation",
    hasSimulation: false,
    description: "Explore AI concepts, Python programming basics, and ethical AI with hands-on projects.",
  },
  {
    id:       "computer-applications",
    slug:     "computer-applications",
    name:     "Computer Applications",
    icon:     Monitor,
    chapters: 8,
    color:    "from-teal-500 to-green-500",
    bg:       "bg-teal-500/10",
    border:   "border-teal-500/20",
    textColor:"text-teal-600 dark:text-teal-400",
    topics:   ["Python Basics", "HTML Fundamentals", "Problem Solving", "Digital Literacy"],
    duration: "25 days",
    difficulty: "Foundation",
    hasSimulation: false,
    description: "Learn Python programming, HTML basics, and computer science fundamentals.",
  },
  {
    id:       "physical-education",
    slug:     "physical-education",
    name:     "Physical Education",
    icon:     Dumbbell,
    chapters: 6,
    color:    "from-red-500 to-rose-500",
    bg:       "bg-red-500/10",
    border:   "border-red-500/20",
    textColor:"text-red-600 dark:text-red-400",
    topics:   ["Sports Theory", "Health & Nutrition", "Physical Fitness", "Yoga"],
    duration: "15 days",
    difficulty: "Foundation",
    hasSimulation: false,
    description: "Learn sports theory, health science, nutrition, and physical fitness principles.",
  },
  {
    id:       "art-education",
    slug:     "art-education",
    name:     "Art Education",
    icon:     Palette,
    chapters: 5,
    color:    "from-pink-500 to-fuchsia-500",
    bg:       "bg-pink-500/10",
    border:   "border-pink-500/20",
    textColor:"text-pink-600 dark:text-pink-400",
    topics:   ["Visual Arts Theory", "Indian Art History", "Drawing Techniques", "Craft"],
    duration: "15 days",
    difficulty: "Foundation",
    hasSimulation: false,
    description: "Explore visual arts theory, Indian art heritage, drawing, and craft techniques.",
  },
  {
    id:       "science-physics",
    slug:     "science-physics",
    name:     "Physics (Science)",
    icon:     Atom,
    chapters: 6,
    color:    "from-violet-500 to-purple-500",
    bg:       "bg-violet-500/10",
    border:   "border-violet-500/20",
    textColor:"text-violet-600 dark:text-violet-400",
    topics:   ["Motion", "Force & Laws", "Gravitation", "Sound", "Work & Energy"],
    duration: "20 days",
    difficulty: "Foundation",
    hasSimulation: true,
    description: "Deep dive into Physics topics from Class 9 Science with 15+ interactive simulations.",
  },
];

/* ─── Quick Stats ──────────────────────────────────────────────────────────── */
// Summary stats for the Class 9 track
const STATS = [
  { label: "Subjects", value: "13", icon: BookOpen },
  { label: "Total Chapters", value: "124", icon: BookOpen },
  { label: "Simulations", value: "25+", icon: Atom },
  { label: "Practice Questions", value: "2,000+", icon: Star },
];

/* ─── Class 9 Page Component ─────────────────────────────────────────────── */
export default function Class9Page() {
  return (
    <div className="min-h-screen bg-background">
      {/* ── Page Header ──────────────────────────────────────────────────── */}
      <div className="border-b bg-gradient-to-br from-blue-500/5 via-background to-cyan-500/5">
        <div className="container px-4 py-12 md:py-16">
          {/* Breadcrumb navigation */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/learn" className="hover:text-foreground transition-colors">Learn</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">Class 9</span>
          </nav>

          {/* Page title and description */}
          <div className="flex items-start gap-4 mb-6">
            <div className="h-14 w-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-2xl font-bold text-blue-600 dark:text-blue-400 shrink-0">
              9
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-3xl sm:text-4xl font-bold">Class 9</h1>
                <Badge variant="secondary" className="text-xs">CBSE NCERT</Badge>
              </div>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Complete CBSE Class 9 curriculum — all subjects, structured day-wise plans,
                interactive simulations, and 2,000+ practice questions.
              </p>
            </div>
          </div>

          {/* Quick stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="rounded-xl border bg-card/50 p-4 text-center">
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Subjects Grid ────────────────────────────────────────────────── */}
      <div className="container px-4 py-10">
        {/* Core subjects heading */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">All Subjects</h2>
          <Badge variant="outline" className="text-xs">{CLASS_9_SUBJECTS.length} subjects</Badge>
        </div>

        {/* Subject cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CLASS_9_SUBJECTS.map((subject) => {
            const Icon = subject.icon; // Subject icon component

            return (
              <Link
                key={subject.id}
                href={`/learn/class-9/${subject.slug}`}
                className="group rounded-2xl border bg-card hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 overflow-hidden"
              >
                {/* Card top gradient bar */}
                <div className={`h-1 w-full bg-gradient-to-r ${subject.color}`} />

                <div className="p-5">
                  {/* Subject icon + name */}
                  <div className="flex items-start justify-between mb-3">
                    <div className={`h-10 w-10 rounded-xl ${subject.bg} border ${subject.border} flex items-center justify-center`}>
                      <Icon className={`h-5 w-5 ${subject.textColor}`} />
                    </div>

                    {/* Simulation badge if available */}
                    {subject.hasSimulation && (
                      <Badge className="text-[10px] bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20">
                        ⚡ Simulations
                      </Badge>
                    )}
                  </div>

                  {/* Subject name */}
                  <h3 className="font-semibold text-base mb-1 group-hover:text-primary transition-colors">
                    {subject.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                    {subject.description}
                  </p>

                  {/* Key topics */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {subject.topics.slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                      >
                        {topic}
                      </span>
                    ))}
                    {subject.topics.length > 3 && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                        +{subject.topics.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Stats row */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-3 w-3" />
                        {subject.chapters} chapters
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {subject.duration}
                      </span>
                    </div>

                    {/* Arrow indicator on hover */}
                    <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-200" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* ── Additional Resources ────────────────────────────────────────── */}
        <div className="mt-10 rounded-2xl border bg-gradient-to-br from-blue-500/5 to-cyan-500/5 p-6">
          <h3 className="font-semibold text-lg mb-4">Additional Resources for Class 9</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                label: "NCERT Solutions",
                desc:  "Step-by-step solutions for all NCERT exercises",
                href:  "/learn/class-9/mathematics",
                color: "text-blue-600",
              },
              {
                label: "Sample Papers",
                desc:  "CBSE board-pattern sample papers with marking scheme",
                href:  "/test-center",
                color: "text-green-600",
              },
              {
                label: "Previous Year Questions",
                desc:  "Last 10 years PYQs chapter-wise",
                href:  "/practice",
                color: "text-purple-600",
              },
            ].map((res) => (
              <Link
                key={res.label}
                href={res.href}
                className="group flex items-center justify-between rounded-xl border bg-background p-4 hover:shadow-md transition-all"
              >
                <div>
                  <div className={`font-medium text-sm ${res.color}`}>{res.label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{res.desc}</div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0 ml-2" />
              </Link>
            ))}
          </div>
        </div>

        {/* ── Other Classes Navigation ─────────────────────────────────────── */}
        <div className="mt-6 flex flex-wrap gap-3">
          <span className="text-sm text-muted-foreground self-center">Also explore:</span>
          {["class-10", "class-11", "class-12"].map((cls) => (
            <Link
              key={cls}
              href={`/learn/${cls}`}
              className="text-sm font-medium px-4 py-1.5 rounded-full border hover:bg-accent transition-colors"
            >
              {cls.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
