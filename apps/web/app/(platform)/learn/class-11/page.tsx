/**
 * @file app/(platform)/learn/class-11/page.tsx
 * @description Class 11 subjects listing page — Stream selection and specialization
 * Route: /learn/class-11
 * Shows Science (PCM/PCB), Commerce, and Arts stream subjects
 */

import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen, FlaskConical, Globe, Calculator, ArrowRight,
  Clock, ChevronRight, Atom, TrendingUp, Landmark,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

/* ─── Page-level SEO Metadata ─────────────────────────────────────────────── */
export const metadata: Metadata = {
  title:       "Class 11 — Science, Commerce & Arts | LearnVeda",
  description:
    "Class 11 CBSE on LearnVeda — choose your stream. Science (PCM/PCB), Commerce, " +
    "or Arts/Humanities. Structured study plans, NCERT solutions, and JEE/NEET prep integration.",
  keywords: ["Class 11 CBSE", "Class 11 Science", "Class 11 Commerce", "Class 11 Arts", "JEE Class 11"],
};

/* ─── Streams Data ───────────────────────────────────────────────────────── */
// Class 11 is stream-based — students choose Science, Commerce, or Arts
const STREAMS = [
  {
    id:    "science-pcm",
    name:  "Science (PCM)",
    desc:  "Physics, Chemistry, Mathematics — ideal for JEE/Engineering preparation",
    color: "from-blue-500 to-violet-500",
    bg:    "bg-blue-500/5",
    border:"border-blue-500/20",
    badge: "JEE Track",
    badgeColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    subjects: [
      { name: "Physics",         slug: "physics",     chapters: 15, icon: Atom,       hasSimulation: true  },
      { name: "Chemistry",       slug: "chemistry",   chapters: 14, icon: FlaskConical, hasSimulation: false },
      { name: "Mathematics",     slug: "mathematics", chapters: 16, icon: Calculator,  hasSimulation: false },
      { name: "English",         slug: "english",     chapters: 8,  icon: BookOpen,    hasSimulation: false },
      { name: "Computer Science",slug: "computer-science", chapters: 10, icon: BookOpen, hasSimulation: false },
    ],
  },
  {
    id:    "science-pcb",
    name:  "Science (PCB)",
    desc:  "Physics, Chemistry, Biology — ideal for NEET/Medical preparation",
    color: "from-green-500 to-teal-500",
    bg:    "bg-green-500/5",
    border:"border-green-500/20",
    badge: "NEET Track",
    badgeColor: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
    subjects: [
      { name: "Physics",     slug: "physics",     chapters: 15, icon: Atom,       hasSimulation: true  },
      { name: "Chemistry",   slug: "chemistry",   chapters: 14, icon: FlaskConical, hasSimulation: false },
      { name: "Biology",     slug: "biology",     chapters: 22, icon: BookOpen,    hasSimulation: false },
      { name: "English",     slug: "english",     chapters: 8,  icon: BookOpen,    hasSimulation: false },
    ],
  },
  {
    id:    "commerce",
    name:  "Commerce",
    desc:  "Accountancy, Business Studies, Economics — for CA/MBA aspirants",
    color: "from-amber-500 to-orange-500",
    bg:    "bg-amber-500/5",
    border:"border-amber-500/20",
    badge: "CA/MBA Track",
    badgeColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    subjects: [
      { name: "Accountancy",      slug: "accountancy",      chapters: 15, icon: TrendingUp, hasSimulation: false },
      { name: "Business Studies", slug: "business-studies", chapters: 12, icon: Landmark,   hasSimulation: false },
      { name: "Economics",        slug: "economics",        chapters: 10, icon: TrendingUp, hasSimulation: false },
      { name: "Mathematics",      slug: "mathematics",      chapters: 16, icon: Calculator,  hasSimulation: false },
      { name: "English",          slug: "english",          chapters: 8,  icon: BookOpen,    hasSimulation: false },
    ],
  },
  {
    id:    "arts",
    name:  "Arts / Humanities",
    desc:  "History, Geography, Political Science, Psychology, Sociology",
    color: "from-rose-500 to-pink-500",
    bg:    "bg-rose-500/5",
    border:"border-rose-500/20",
    badge: "UPSC/Law Track",
    badgeColor: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
    subjects: [
      { name: "History",          slug: "history",           chapters: 11, icon: Landmark, hasSimulation: false },
      { name: "Geography",        slug: "geography",         chapters: 16, icon: Globe,    hasSimulation: false },
      { name: "Political Science",slug: "political-science", chapters: 10, icon: Landmark, hasSimulation: false },
      { name: "Psychology",       slug: "psychology",        chapters: 9,  icon: BookOpen, hasSimulation: false },
      { name: "English",          slug: "english",           chapters: 8,  icon: BookOpen, hasSimulation: false },
    ],
  },
];

/* ─── Class 11 Page Component ────────────────────────────────────────────── */
export default function Class11Page() {
  return (
    <div className="min-h-screen bg-background">
      {/* ── Page Header ──────────────────────────────────────────────────── */}
      <div className="border-b bg-gradient-to-br from-violet-500/5 via-background to-blue-500/5">
        <div className="container px-4 py-12 md:py-16">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/learn" className="hover:text-foreground transition-colors">Learn</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">Class 11</span>
          </nav>

          <div className="flex items-start gap-4 mb-6">
            <div className="h-14 w-14 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-2xl font-bold text-violet-600 dark:text-violet-400 shrink-0">
              11
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-3xl sm:text-4xl font-bold">Class 11</h1>
                <Badge variant="secondary" className="text-xs">CBSE Stream Selection</Badge>
              </div>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Choose your stream — Science, Commerce, or Arts. Each stream has structured
                day-wise plans, NCERT solutions, and competitive exam prep integration.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Streams Section ───────────────────────────────────────────────── */}
      <div className="container px-4 py-10 space-y-8">
        {STREAMS.map((stream) => (
          <div key={stream.id} className={`rounded-2xl border ${stream.border} ${stream.bg} overflow-hidden`}>
            {/* Stream header */}
            <div className={`h-1 bg-gradient-to-r ${stream.color}`} />
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-xl font-bold">{stream.name}</h2>
                    <Badge className={`text-[10px] ${stream.badgeColor}`}>{stream.badge}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{stream.desc}</p>
                </div>
              </div>

              {/* Subject cards for this stream */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
                {stream.subjects.map((subject) => {
                  const Icon = subject.icon;
                  return (
                    <Link
                      key={subject.slug}
                      href={`/learn/class-11/${subject.slug}`}
                      className="group flex flex-col gap-2 rounded-xl border bg-background p-4 hover:shadow-md transition-all hover:-translate-y-0.5"
                    >
                      <div className="flex items-center justify-between">
                        <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        {subject.hasSimulation && (
                          <span className="text-[9px] text-green-600 font-medium">⚡ Sim</span>
                        )}
                      </div>
                      <div className="font-medium text-sm group-hover:text-primary transition-colors">
                        {subject.name}
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <BookOpen className="h-3 w-3" />
                        {subject.chapters} chapters
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        ))}

        {/* Other class navigation */}
        <div className="flex flex-wrap gap-3">
          <span className="text-sm text-muted-foreground self-center">Also explore:</span>
          {["class-9", "class-10", "class-12"].map((cls) => (
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
