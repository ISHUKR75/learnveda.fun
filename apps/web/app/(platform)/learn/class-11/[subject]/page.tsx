/**
 * @file app/(platform)/learn/class-11/[subject]/page.tsx
 * @description Class 11 subject detail page — shows all chapters for a subject
 * Route: /learn/class-11/[subject]  (e.g. /learn/class-11/physics)
 * Mirrors the Class 9/10 subject page pattern for consistency across the platform.
 */

import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen, ArrowRight, ChevronRight, Clock, Play,
  CheckCircle2, FlaskConical, Star, Download,
} from "lucide-react";
import { Badge }  from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CLASS_11_SUBJECT_DATA } from "../subject-data";

function getSubjectData(slug: string) {
  return CLASS_11_SUBJECT_DATA[slug] ?? {
    name:          slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
    description:   `Complete NCERT Class 11 ${slug} curriculum with structured lessons and practice.`,
    totalChapters: 10,
    duration:      "30 days",
    hasSimulation: false,
    color:         "indigo",
    chapters:      Array.from({ length: 10 }, (_, i) => ({
      id:      `chapter-${String(i + 1).padStart(2, "0")}`,
      title:   `Chapter ${i + 1}`,
      topics:  ["Topic 1", "Topic 2", "Topic 3"],
      duration:"2 days",
      hasQuiz: true,
    })),
  };
}

const COLOR_MAP: Record<string, { bg: string; border: string; text: string }> = {
  blue:    { bg:"bg-blue-500/10",    border:"border-blue-500/20",    text:"text-blue-600 dark:text-blue-400"    },
  green:   { bg:"bg-green-500/10",   border:"border-green-500/20",   text:"text-green-600 dark:text-green-400"  },
  purple:  { bg:"bg-purple-500/10",  border:"border-purple-500/20",  text:"text-purple-600 dark:text-purple-400" },
  emerald: { bg:"bg-emerald-500/10", border:"border-emerald-500/20", text:"text-emerald-600 dark:text-emerald-400" },
  indigo:  { bg:"bg-indigo-500/10",  border:"border-indigo-500/20",  text:"text-indigo-600 dark:text-indigo-400" },
  orange:  { bg:"bg-orange-500/10",  border:"border-orange-500/20",  text:"text-orange-600 dark:text-orange-400" },
  yellow:  { bg:"bg-yellow-500/10",  border:"border-yellow-500/20",  text:"text-yellow-600 dark:text-yellow-400" },
  rose:    { bg:"bg-rose-500/10",    border:"border-rose-500/20",    text:"text-rose-600 dark:text-rose-400"    },
  red:     { bg:"bg-red-500/10",     border:"border-red-500/20",     text:"text-red-600 dark:text-red-400"      },
  teal:    { bg:"bg-teal-500/10",    border:"border-teal-500/20",    text:"text-teal-600 dark:text-teal-400"    },
};

export async function generateStaticParams() {
  return Object.keys(CLASS_11_SUBJECT_DATA).map((subject) => ({ subject }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string }>;
}): Promise<Metadata> {
  const { subject } = await params;
  const data = getSubjectData(subject);
  return {
    title:       `Class 11 ${data.name} — NCERT | LearnVeda`,
    description: data.description,
    keywords:    [`Class 11 ${data.name}`, `NCERT Class 11 ${data.name}`, "CBSE Class 11"],
  };
}

export default async function Class11SubjectPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject } = await params;
  const data   = getSubjectData(subject);
  const colors = COLOR_MAP[data.color] ?? COLOR_MAP.indigo;

  return (
    <div className="min-h-screen bg-background">
      <div className={`border-b bg-gradient-to-br from-${data.color}-500/5 via-background to-${data.color}-500/5`}>
        <div className="container px-4 py-10 md:py-14">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap">
            <Link href="/learn"          className="hover:text-foreground transition-colors">Learn</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/learn/class-11" className="hover:text-foreground transition-colors">Class 11</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">{data.name}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-2xl sm:text-3xl font-bold">Class 11 — {data.name}</h1>
                {data.hasSimulation && (
                  <Badge className="text-xs bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20">
                    ⚡ Simulations
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground max-w-2xl">{data.description}</p>
            </div>

            <div className="flex gap-2 shrink-0">
              <Button asChild size="sm" variant="outline">
                <Link href={`/learn/class-11/${subject}/${data.chapters[0]?.id ?? "chapter-01"}`}>
                  <Play className="h-3.5 w-3.5 mr-1" />
                  Start Learning
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-3 gap-4 max-w-lg">
            <div className="rounded-xl border bg-card/50 p-3 text-center">
              <div className="font-bold text-xl">{data.totalChapters}</div>
              <div className="text-[11px] text-muted-foreground">Chapters</div>
            </div>
            <div className="rounded-xl border bg-card/50 p-3 text-center">
              <div className="font-bold text-xl">{data.duration}</div>
              <div className="text-[11px] text-muted-foreground">Duration</div>
            </div>
            <div className="rounded-xl border bg-card/50 p-3 text-center">
              <div className="font-bold text-xl">Free</div>
              <div className="text-[11px] text-muted-foreground">Access</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">All Chapters</h2>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
            <span>0 of {data.chapters.length} completed</span>
          </div>
        </div>

        <div className="space-y-3">
          {data.chapters.map((chapter, index) => (
            <Link
              key={chapter.id}
              href={`/learn/class-11/${subject}/${chapter.id}`}
              className="group flex items-center gap-4 rounded-xl border bg-card hover:shadow-md transition-all hover:-translate-y-0.5 p-4"
            >
              <div className={`h-10 w-10 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center text-sm font-bold ${colors.text} shrink-0`}>
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="font-medium text-sm group-hover:text-primary transition-colors">
                    {chapter.title}
                  </h3>
                  {chapter.hasSimulation && (
                    <Badge className="text-[9px] py-0 bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20 shrink-0">
                      <FlaskConical className="h-2.5 w-2.5 mr-0.5" />
                      Simulation
                    </Badge>
                  )}
                  {chapter.hasQuiz && (
                    <Badge variant="outline" className="text-[9px] py-0 shrink-0">
                      Quiz
                    </Badge>
                  )}
                </div>

                <div className="flex flex-wrap gap-1">
                  {chapter.topics.slice(0, 4).map((topic) => (
                    <span key={topic} className="text-[10px] text-muted-foreground">
                      {topic}{" · "}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {chapter.duration}
                </div>
                <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border bg-gradient-to-br from-muted/50 to-background p-6">
          <h3 className="font-semibold mb-4">Study Resources for {data.name}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { label:"NCERT Solutions", icon: BookOpen,  href:"/practice",    desc:"Solved exercises" },
              { label:"Practice Quiz",   icon: Star,      href:"/practice",    desc:"Chapter-wise MCQs" },
              { label:"Download Notes",  icon: Download,  href:"#",            desc:"PDF study notes"   },
            ].map((res) => {
              const ResIcon = res.icon;
              return (
                <Link
                  key={res.label}
                  href={res.href}
                  className="flex items-center gap-3 rounded-xl border bg-background p-3 hover:shadow-sm transition-all group"
                >
                  <ResIcon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  <div>
                    <div className="text-sm font-medium">{res.label}</div>
                    <div className="text-[11px] text-muted-foreground">{res.desc}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
