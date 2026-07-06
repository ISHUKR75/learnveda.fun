/**
 * @file app/(platform)/semester/page.tsx
 * @description BTech CSE Semester Guides overview — all 8 semesters
 * Route: /semester
 *
 * Shows all 8 semester cards with:
 *  - Semester number + theme
 *  - Key subjects
 *  - Difficulty indicator
 *  - Link to full semester detail page
 *
 * Platform layout (Navbar) is provided by (platform)/layout.tsx.
 * Server component — no interactivity needed at this level.
 */

import type { Metadata } from "next";                    // SEO metadata
import Link from "next/link";                            // Client-side navigation
import { Badge }   from "@/components/ui/badge";         // Label badges
import { Button }  from "@/components/ui/button";        // CTA button
import {
  GraduationCap, BookOpen, Code2, ArrowRight,
  Brain, Zap, Star, ChevronRight, Layers,
} from "lucide-react";                                   // Icons

/* ─── SEO Metadata ────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title:       "BTech CSE Semester Guides — LearnVeda",
  description: "Complete BTech CSE semester-wise guides for all 8 semesters. Subject lists, important topics, senior tips, and study resources from IIT/NIT students.",
  keywords:    ["BTech CSE", "semester guide", "engineering subjects", "BTech curriculum", "engineering study tips"],
  openGraph:   {
    title:       "BTech CSE Semester Guides — LearnVeda",
    description: "Ace every semester with subject breakdowns, senior tips, and curated resources.",
    type:        "website",
  },
  alternates: { canonical: "/semester" },
};

/* ─── Semester Summary Data ───────────────────────────────────────────────── */
/**
 * SEMESTERS
 * Summary card data for all 8 semesters — displayed on the overview page.
 * Full content lives in /semester/[n]/page.tsx.
 */
const SEMESTERS = [
  {
    n:          1,
    title:      "Semester 1",
    theme:      "Engineering Foundations",
    tagline:    "Math, C Programming & Physics",
    difficulty: "Easy" as const,
    subjects:   ["Engineering Maths I", "C Programming", "Engineering Physics", "Engineering Chemistry", "English"],
    credits:    18,
    tips:       "Focus on C — it's your gateway into CSE.",
    emoji:      "🌱",
    color:      "from-green-500 to-teal-500",
  },
  {
    n:          2,
    title:      "Semester 2",
    theme:      "Data Structures & OOP",
    tagline:    "The most important semester for placements",
    difficulty: "Moderate" as const,
    subjects:   ["Data Structures", "OOP with Java/C++", "Maths II", "Digital Logic", "English II"],
    credits:    20,
    tips:       "Data Structures is your most critical course. Practice daily.",
    emoji:      "📚",
    color:      "from-blue-500 to-indigo-500",
  },
  {
    n:          3,
    title:      "Semester 3",
    theme:      "Algorithms & Architecture",
    tagline:    "Algorithms + Discrete Maths + Computer Architecture",
    difficulty: "Moderate" as const,
    subjects:   ["Algorithms", "Computer Organization", "Discrete Maths", "Probability & Stats", "Digital Electronics"],
    credits:    22,
    tips:       "Algorithms here directly maps to coding interviews.",
    emoji:      "⚙️",
    color:      "from-purple-500 to-violet-500",
  },
  {
    n:          4,
    title:      "Semester 4",
    theme:      "OS + DBMS + ToC",
    tagline:    "3 Core CS pillars in one semester",
    difficulty: "Hard" as const,
    subjects:   ["Operating Systems", "DBMS", "Theory of Computation", "Software Engineering", "Web Technologies"],
    credits:    22,
    tips:       "OS + DBMS are placement gold. Master them well.",
    emoji:      "🖥️",
    color:      "from-orange-500 to-red-500",
  },
  {
    n:          5,
    title:      "Semester 5",
    theme:      "Networks + Compilers + AI",
    tagline:    "Computer Networks, Compilers, AI introduction",
    difficulty: "Hard" as const,
    subjects:   ["Computer Networks", "Compiler Design", "Artificial Intelligence", "Software Project Lab", "Numerical Methods"],
    credits:    22,
    tips:       "CN and AI are the most career-relevant subjects here.",
    emoji:      "🌐",
    color:      "from-cyan-500 to-teal-500",
  },
  {
    n:          6,
    title:      "Semester 6",
    theme:      "ML + Security + Electives",
    tagline:    "Machine Learning, Cloud, Cybersecurity",
    difficulty: "Moderate" as const,
    subjects:   ["Machine Learning", "Information Security", "Cloud Computing", "Mobile App Development", "Elective I"],
    credits:    21,
    tips:       "Go beyond ML syllabus — build real projects on Kaggle.",
    emoji:      "🤖",
    color:      "from-pink-500 to-rose-500",
  },
  {
    n:          7,
    title:      "Semester 7",
    theme:      "Internship + Deep Learning",
    tagline:    "Major Project Phase 1 + Distributed Systems",
    difficulty: "Moderate" as const,
    subjects:   ["Major Project Phase 1", "Distributed Systems", "Deep Learning", "Elective I", "Elective II"],
    credits:    24,
    tips:       "Placement season peaks here. Be prepared before it starts.",
    emoji:      "🚀",
    color:      "from-amber-500 to-orange-500",
  },
  {
    n:          8,
    title:      "Semester 8",
    theme:      "Final Project + Placement",
    tagline:    "Major Project Phase 2 + Internship Report",
    difficulty: "Easy" as const,
    subjects:   ["Major Project Phase 2", "Professional Ethics", "Internship Report", "Elective III"],
    credits:    20,
    tips:       "Make your project deployment-ready and put it on GitHub.",
    emoji:      "🎓",
    color:      "from-slate-500 to-gray-600",
  },
] as const;

/** Difficulty badge color mapping */
const DIFFICULTY_COLORS = {
  Easy:     "text-green-600 border-green-400/40  bg-green-500/5",
  Moderate: "text-yellow-600 border-yellow-400/40 bg-yellow-500/5",
  Hard:     "text-red-600 border-red-400/40 bg-red-500/5",
} as const;

/* ─── Page Component ─────────────────────────────────────────────────────── */
export default function SemesterOverviewPage() {
  return (
    <div className="min-h-screen pb-20">

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="border-b bg-gradient-to-b from-indigo-950/5 to-background py-16 md:py-20">
        <div className="container px-4 md:px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
            <span>/</span>
            <span className="text-foreground font-medium">Semester Guides</span>
          </nav>

          <div className="max-w-2xl">
            <Badge variant="secondary" className="mb-3 gap-1.5">
              <GraduationCap className="h-3.5 w-3.5" /> BTech CSE
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              BTech CSE — All 8 Semester Guides
            </h1>
            <p className="text-muted-foreground text-lg mb-6">
              Subject-wise breakdowns, important topics, senior tips, and resource recommendations
              for every semester of BTech Computer Science Engineering.
              Aligned with Anna University, IP University, and most Indian universities.
            </p>

            {/* Quick stats row */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><Layers className="h-4 w-4" /> 8 Semesters</span>
              <span className="flex items-center gap-1.5"><BookOpen className="h-4 w-4" /> 35+ Subjects</span>
              <span className="flex items-center gap-1.5"><Star className="h-4 w-4 fill-yellow-500 text-yellow-500" /> IIT/NIT verified tips</span>
              <span className="flex items-center gap-1.5"><Zap className="h-4 w-4 text-brand-500" /> Free forever</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quick Semester Jump ────────────────────────────────────── */}
      <section className="border-b bg-muted/30 py-4">
        <div className="container px-4 md:px-6">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-muted-foreground mr-1">Jump to:</span>
            {SEMESTERS.map((sem) => (
              <Link
                key={sem.n}
                href={`/semester/${sem.n}`}
                className="flex h-8 w-8 items-center justify-center rounded-lg border bg-background text-sm font-semibold hover:bg-brand-500 hover:text-white hover:border-brand-500 transition-all"
              >
                {sem.n}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Semester Cards Grid ────────────────────────────────────── */}
      <section className="py-12">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SEMESTERS.map((sem) => (
              <Link
                key={sem.n}
                href={`/semester/${sem.n}`}
                className="group block"
              >
                <div className="h-full rounded-2xl border bg-card overflow-hidden hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                  {/* Gradient accent stripe */}
                  <div className={`h-1.5 w-full bg-gradient-to-r ${sem.color}`} />

                  <div className="p-6">
                    {/* Header row */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        {/* Semester number circle */}
                        <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${sem.color} text-white text-2xl font-black shadow-sm`}>
                          {sem.n}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <h2 className="font-extrabold text-lg group-hover:text-brand-500 transition-colors">
                              {sem.title}
                            </h2>
                            <span className="text-xl">{sem.emoji}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{sem.theme}</p>
                        </div>
                      </div>
                      {/* Difficulty badge */}
                      <Badge
                        variant="outline"
                        className={`shrink-0 text-xs ${DIFFICULTY_COLORS[sem.difficulty]}`}
                      >
                        {sem.difficulty}
                      </Badge>
                    </div>

                    {/* Tagline */}
                    <p className="text-sm text-muted-foreground mb-4 italic">{sem.tagline}</p>

                    {/* Subject chips */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {sem.subjects.map((subject) => (
                        <span
                          key={subject}
                          className="rounded-lg bg-muted px-2.5 py-1 text-xs text-muted-foreground"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>

                    {/* Senior tip */}
                    <div className="rounded-xl bg-muted/50 border border-dashed px-3 py-2 mb-4 flex items-start gap-2">
                      <Brain className="h-3.5 w-3.5 text-brand-500 shrink-0 mt-0.5" />
                      <p className="text-xs text-muted-foreground italic">
                        <strong className="text-foreground not-italic">Senior tip:</strong> {sem.tips}
                      </p>
                    </div>

                    {/* Footer meta + CTA */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-3 w-3" /> {sem.subjects.length} Subjects
                        </span>
                        <span className="flex items-center gap-1">
                          <Zap className="h-3 w-3" /> {sem.credits} Credits
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs font-semibold text-brand-500 group-hover:gap-2 transition-all">
                        Full Guide <ArrowRight className="h-3 w-3" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Related Resources ────────────────────────────────────── */}
      <section className="py-10 bg-muted/30">
        <div className="container px-4 md:px-6">
          <h2 className="text-xl font-bold mb-6">Go Deeper with Core CS Tracks</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "DSA — 60-Day Plan",      emoji: "🌳", href: "/core-cs/dsa",             badge: "FAANG Prep"  },
              { name: "System Design — 25 Days", emoji: "🏗️", href: "/core-cs/system-design",   badge: "Senior SDE" },
              { name: "DBMS — 20 Days",          emoji: "🗃️", href: "/core-cs/database-management", badge: "Core"  },
              { name: "Computer Networks",       emoji: "🌐", href: "/core-cs/computer-networks", badge: "Core"     },
            ].map((track) => (
              <Link key={track.href} href={track.href} className="group flex items-center gap-3 rounded-xl border bg-card p-4 hover:border-brand-500/40 hover:shadow-md transition-all">
                <span className="text-2xl">{track.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm group-hover:text-brand-500 transition-colors">{track.name}</div>
                  <Badge variant="secondary" className="text-xs mt-1">{track.badge}</Badge>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
