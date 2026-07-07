/**
 * @file app/(platform)/learn/engineering/[branch]/[semester]/page.tsx
 * @description Engineering branch + semester detail page
 * Route: /learn/engineering/[branch]/[semester]
 * @purpose Full subject-wise view for a specific semester of an engineering branch
 */

"use client";

import React from "react";
import Link  from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ChevronRight, BookOpen, ExternalLink, FileText,
  Video, HelpCircle, Download, Play, Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge }  from "@/components/ui/badge";
import { cn }     from "@/lib/utils";

/* ─── Minimal branch color/label lookups ───────────────────────────────── */
const BRANCH_COLORS: Record<string, { bg: string; border: string; text: string; label: string }> = {
  cse:      { bg:"bg-blue-500/10",    border:"border-blue-500/20",    text:"text-blue-600 dark:text-blue-400",    label:"CSE"    },
  ece:      { bg:"bg-purple-500/10",  border:"border-purple-500/20",  text:"text-purple-600 dark:text-purple-400", label:"ECE"    },
  eee:      { bg:"bg-yellow-500/10",  border:"border-yellow-500/20",  text:"text-yellow-600 dark:text-yellow-400", label:"EEE"    },
  civil:    { bg:"bg-stone-500/10",   border:"border-stone-500/20",   text:"text-stone-600 dark:text-stone-400",   label:"Civil"  },
  mech:     { bg:"bg-orange-500/10",  border:"border-orange-500/20",  text:"text-orange-600 dark:text-orange-400", label:"Mech"   },
  chemical: { bg:"bg-green-500/10",   border:"border-green-500/20",   text:"text-green-600 dark:text-green-400",   label:"Chem E" },
  aiml:     { bg:"bg-pink-500/10",    border:"border-pink-500/20",    text:"text-pink-600 dark:text-pink-400",     label:"AI/ML"  },
  ds:       { bg:"bg-cyan-500/10",    border:"border-cyan-500/20",    text:"text-cyan-600 dark:text-cyan-400",     label:"DS"     },
  it:       { bg:"bg-indigo-500/10",  border:"border-indigo-500/20",  text:"text-indigo-600 dark:text-indigo-400", label:"IT"     },
};

/* ─── Generic resources for any subject ───────────────────────────────── */
const SUBJECT_RESOURCES = [
  { label: "Lecture Notes",        icon: FileText,  type: "notes"    },
  { label: "Video Lectures",       icon: Video,     type: "video"    },
  { label: "Previous Year Papers", icon: BookOpen,  type: "pyq"      },
  { label: "Practice Quiz",        icon: HelpCircle,type: "quiz"     },
];

/* ─── Semester subject map (derived from branch page data, used server-side) */
type SubjectData = { name: string; credits: number; hours: string; topics: string[] };

const SUBJECT_DETAILS: Record<string, SubjectData[]> = {
  // Sample for CSE Sem 1 — others will get generic data
  "cse-1": [
    { name: "Engineering Mathematics I",  credits: 4, hours: "40h", topics: ["Differential Calculus","Integral Calculus","Series","Partial Differentiation"] },
    { name: "Physics",                    credits: 4, hours: "40h", topics: ["Waves & Optics","Quantum Mechanics Basics","Laser & Fiber","Materials Science"] },
    { name: "Programming in C",           credits: 4, hours: "40h", topics: ["Fundamentals","Control Structures","Arrays","Functions","Pointers","Files"] },
    { name: "English Communication",      credits: 2, hours: "20h", topics: ["Technical Writing","Presentation Skills","GD & Interview"] },
    { name: "Engineering Drawing",        credits: 2, hours: "20h", topics: ["Orthographic Projection","Isometric Views","AutoCAD Basics"] },
  ],
  "cse-2": [
    { name: "Engineering Mathematics II", credits: 4, hours: "40h", topics: ["Linear Algebra","Numerical Methods","Graph Theory","Fourier Series"] },
    { name: "Basic Electronics",          credits: 4, hours: "40h", topics: ["Diodes","BJT","Amplifiers","Op-Amps","Digital Gates"] },
    { name: "Data Structures",            credits: 4, hours: "40h", topics: ["Arrays","Linked Lists","Stacks","Queues","Trees","Graphs","Sorting"] },
    { name: "OOP with Java",              credits: 4, hours: "40h", topics: ["Classes","Inheritance","Polymorphism","Interfaces","Collections","Exception Handling"] },
    { name: "Digital Logic Design",       credits: 4, hours: "40h", topics: ["Boolean Algebra","K-Maps","Combinational Circuits","Sequential Circuits","Flip-Flops"] },
  ],
};

/* ─── Allowed branch slugs ──────────────────────────────────────────────── */
const VALID_BRANCHES = new Set(Object.keys(BRANCH_COLORS));

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function EngineeringBranchSemesterPage() {
  const params = useParams<{ branch: string; semester: string }>();
  const branch  = params.branch;
  const semNum  = parseInt(params.semester, 10);

  // Validate branch slug and semester number — show not-found for invalid routes
  if (!VALID_BRANCHES.has(branch) || isNaN(semNum) || semNum < 1 || semNum > 8) {
    notFound();
    return null;
  }

  const colors  = BRANCH_COLORS[branch]!; // validated above, always defined
  const key     = `${branch}-${semNum}`;
  const subjects: SubjectData[] = SUBJECT_DETAILS[key] ?? Array.from({ length: 5 }, (_, i) => ({
    name:    `Subject ${i + 1} (Semester ${semNum})`,
    credits: 4,
    hours:   "40h",
    topics:  ["Topic 1", "Topic 2", "Topic 3", "Topic 4"],
  }));

  return (
    <div className="min-h-screen bg-background">
      {/* ── Breadcrumb + Header ──────────────────────────────────────────── */}
      <div className={cn("border-b", colors.bg)}>
        <div className="container px-4 md:px-6 py-8 max-w-5xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-5 flex-wrap">
            <Link href="/learn"                         className="hover:text-foreground">Learn</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/learn/engineering"             className="hover:text-foreground">Engineering</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href={`/learn/engineering/${branch}`} className="hover:text-foreground">{colors.label}</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className={cn("font-semibold", colors.text)}>Semester {semNum}</span>
          </nav>

          <div className="flex items-start gap-4">
            <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border text-lg font-bold", colors.bg, colors.border, colors.text)}>
              S{semNum}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{colors.label} — Semester {semNum}</h1>
              <p className="text-muted-foreground text-sm mt-1">
                {subjects.length} subjects · {subjects.reduce((s, x) => s + x.credits, 0)} total credits · ~{subjects.length * 40} hours of content
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Subject Cards ──────────────────────────────────────────────── */}
      <div className="container px-4 md:px-6 py-8 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Subjects</h2>
          <Badge className={cn("text-xs", colors.bg, colors.border, colors.text)}>
            {isNaN(semNum) ? "?" : semNum <= 2 ? "Foundation" : semNum <= 4 ? "Core" : semNum <= 6 ? "Advanced" : "Capstone"}
          </Badge>
        </div>

        <div className="space-y-4 mb-10">
          {subjects.map((subj, i) => (
            <motion.div
              key={subj.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className={cn("rounded-xl border p-5", colors.bg, colors.border)}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className={cn("font-bold text-base", colors.text)}>{subj.name}</h3>
                    <Badge className={cn("text-xs shrink-0", colors.bg, colors.border, colors.text)}>
                      {subj.credits} credits
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{subj.hours} · {subj.topics.length} units</p>
                </div>
                <Button size="sm" variant="outline" className={cn("gap-1.5 shrink-0 border", colors.border, colors.text)}>
                  <Play className="h-3.5 w-3.5" />
                  Study
                </Button>
              </div>

              {/* Topic pills */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {subj.topics.map((t) => (
                  <span key={t} className="rounded-md border border-border/60 bg-background/60 px-2 py-0.5 text-[11px] text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>

              {/* Resources */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {SUBJECT_RESOURCES.map((res) => {
                  const ResIcon = res.icon;
                  return (
                    <Link
                      key={res.type}
                      href={res.type === "quiz" ? "/test-center" : res.type === "video" ? "/live-classes" : "/notes"}
                      className="flex items-center gap-1.5 rounded-lg border border-border/60 bg-background/70 px-2.5 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-background transition-all"
                    >
                      <ResIcon className="h-3.5 w-3.5 shrink-0" />
                      {res.label}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4 border-t">
          {semNum > 1 ? (
            <Link href={`/learn/engineering/${branch}/${semNum - 1}`}>
              <Button variant="outline" className="gap-2">
                <ChevronRight className="h-4 w-4 rotate-180" />
                Semester {semNum - 1}
              </Button>
            </Link>
          ) : (
            <Link href={`/learn/engineering/${branch}`}>
              <Button variant="outline" className="gap-2">
                <ChevronRight className="h-4 w-4 rotate-180" />
                Branch Overview
              </Button>
            </Link>
          )}

          <div className="flex gap-2">
            <Link href="/test-center">
              <Button variant="outline" size="sm" className="gap-1.5">
                <Trophy className="h-3.5 w-3.5" />
                Mock Test
              </Button>
            </Link>
            <Link href="/notes">
              <Button variant="outline" size="sm" className="gap-1.5">
                <Download className="h-3.5 w-3.5" />
                Notes
              </Button>
            </Link>
          </div>

          {semNum < 8 ? (
            <Link href={`/learn/engineering/${branch}/${semNum + 1}`}>
              <Button variant="outline" className="gap-2">
                Semester {semNum + 1}
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          ) : (
            <Link href="/career">
              <Button variant="outline" className="gap-2">
                Career Paths
                <ExternalLink className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
