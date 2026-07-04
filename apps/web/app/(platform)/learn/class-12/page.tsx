/**
 * @file app/(platform)/learn/class-12/page.tsx
 * @description Class 12 subjects listing page — Final board year + JEE/NEET prep
 * Route: /learn/class-12
 * Critical year — board + competitive exam preparation
 */

import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen, FlaskConical, Globe, Calculator, ArrowRight,
  Clock, ChevronRight, Atom, TrendingUp, Landmark, Target,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

/* ─── Page-level SEO Metadata ─────────────────────────────────────────────── */
export const metadata: Metadata = {
  title:       "Class 12 — CBSE Board + JEE/NEET Preparation | LearnVeda",
  description:
    "Master CBSE Class 12 with LearnVeda. Complete board + competitive exam preparation — " +
    "Physics, Chemistry, Maths, Biology, English. 15 mock tests, 2,000+ questions.",
  keywords: ["Class 12 CBSE", "JEE Mains", "NEET", "Class 12 Physics", "Class 12 Maths"],
};

/* ─── Class 12 Subjects (Science PCM) ───────────────────────────────────── */
const SCIENCE_PCM = [
  { name:"Physics",     slug:"physics",     chapters:15, hasSimulation:true,  desc:"Electrostatics to Modern Physics" },
  { name:"Chemistry",   slug:"chemistry",   chapters:16, hasSimulation:false, desc:"Solid State to Chemistry in Everyday Life" },
  { name:"Mathematics", slug:"mathematics", chapters:13, hasSimulation:false, desc:"Relations → Integration → Probability" },
  { name:"English",     slug:"english",     chapters:8,  hasSimulation:false, desc:"Flamingo + Vistas literature" },
  { name:"Informatics", slug:"informatics", chapters:10, hasSimulation:false, desc:"Python, Databases, Networking" },
];

const SCIENCE_PCB = [
  { name:"Physics",  slug:"physics",  chapters:15, hasSimulation:true,  desc:"Electrostatics to Modern Physics" },
  { name:"Chemistry",slug:"chemistry",chapters:16, hasSimulation:false, desc:"Solid State to Chemistry in Everyday Life" },
  { name:"Biology",  slug:"biology",  chapters:16, hasSimulation:false, desc:"Reproduction to Biotechnology & Its Applications" },
  { name:"English",  slug:"english",  chapters:8,  hasSimulation:false, desc:"Flamingo + Vistas" },
];

const COMMERCE = [
  { name:"Accountancy",      slug:"accountancy",      chapters:12, hasSimulation:false, desc:"Company Accounts to Cash Flow" },
  { name:"Business Studies", slug:"business-studies", chapters:12, hasSimulation:false, desc:"Management to Consumer Protection" },
  { name:"Economics",        slug:"economics",        chapters:10, hasSimulation:false, desc:"Micro + Macro economics" },
  { name:"Mathematics",      slug:"mathematics",      chapters:13, hasSimulation:false, desc:"Matrices to Linear Programming" },
];

/* ─── Class 12 Page Component ────────────────────────────────────────────── */
export default function Class12Page() {
  return (
    <div className="min-h-screen bg-background">
      {/* ── Page Header ──────────────────────────────────────────────────── */}
      <div className="border-b bg-gradient-to-br from-red-500/5 via-background to-orange-500/5">
        <div className="container px-4 py-12 md:py-16">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/learn" className="hover:text-foreground transition-colors">Learn</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">Class 12</span>
          </nav>

          <div className="flex items-start gap-4 mb-6">
            <div className="h-14 w-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-2xl font-bold text-red-600 dark:text-red-400 shrink-0">
              12
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-3xl sm:text-4xl font-bold">Class 12</h1>
                <Badge className="text-xs bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20">
                  <Target className="h-3 w-3 mr-1" />
                  Final Board Year
                </Badge>
              </div>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Your most important year — complete CBSE board preparation combined with
                JEE/NEET competitive exam content. 15 full mock tests included.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Subjects",    value: "18"   },
              { label: "Chapters",    value: "100+" },
              { label: "Questions",   value: "5K+"  },
              { label: "Mock Tests",  value: "15"   },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border bg-card/50 p-4 text-center">
                <div className="text-2xl font-bold">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Science PCM ──────────────────────────────────────────────────── */}
      <div className="container px-4 py-10 space-y-8">

        {/* Science PCM */}
        <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-blue-500 to-violet-500" />
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-xl font-bold">Science — PCM</h2>
              <Badge className="text-[10px] bg-blue-500/10 text-blue-600 border-blue-500/20">JEE Track</Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {SCIENCE_PCM.map((sub) => (
                <Link key={sub.slug} href={`/learn/class-12/${sub.slug}`}
                  className="group rounded-xl border bg-background p-4 hover:shadow-md transition-all hover:-translate-y-0.5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm group-hover:text-primary transition-colors">{sub.name}</span>
                    {sub.hasSimulation && <span className="text-[9px] text-green-600 font-medium">⚡ Sim</span>}
                  </div>
                  <p className="text-[11px] text-muted-foreground mb-2">{sub.desc}</p>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <BookOpen className="h-3 w-3" />{sub.chapters} chapters
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Science PCB */}
        <div className="rounded-2xl border border-green-500/20 bg-green-500/5 overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-green-500 to-teal-500" />
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-xl font-bold">Science — PCB</h2>
              <Badge className="text-[10px] bg-green-500/10 text-green-600 border-green-500/20">NEET Track</Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {SCIENCE_PCB.map((sub) => (
                <Link key={sub.slug} href={`/learn/class-12/${sub.slug}`}
                  className="group rounded-xl border bg-background p-4 hover:shadow-md transition-all hover:-translate-y-0.5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm group-hover:text-primary transition-colors">{sub.name}</span>
                    {sub.hasSimulation && <span className="text-[9px] text-green-600 font-medium">⚡ Sim</span>}
                  </div>
                  <p className="text-[11px] text-muted-foreground mb-2">{sub.desc}</p>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <BookOpen className="h-3 w-3" />{sub.chapters} chapters
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Commerce */}
        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-amber-500 to-orange-500" />
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-xl font-bold">Commerce</h2>
              <Badge className="text-[10px] bg-amber-500/10 text-amber-600 border-amber-500/20">CA/MBA Track</Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {COMMERCE.map((sub) => (
                <Link key={sub.slug} href={`/learn/class-12/${sub.slug}`}
                  className="group rounded-xl border bg-background p-4 hover:shadow-md transition-all hover:-translate-y-0.5">
                  <span className="font-medium text-sm group-hover:text-primary transition-colors block mb-2">{sub.name}</span>
                  <p className="text-[11px] text-muted-foreground mb-2">{sub.desc}</p>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <BookOpen className="h-3 w-3" />{sub.chapters} chapters
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Other class navigation */}
        <div className="flex flex-wrap gap-3">
          <span className="text-sm text-muted-foreground self-center">Also explore:</span>
          {["class-9", "class-10", "class-11"].map((cls) => (
            <Link key={cls} href={`/learn/${cls}`}
              className="text-sm font-medium px-4 py-1.5 rounded-full border hover:bg-accent transition-colors">
              {cls.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
