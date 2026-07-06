/**
 * @file app/(platform)/learn/class-11/[subject]/[chapter]/page.tsx
 * @description Individual chapter learning page for Class 11
 * Route: /learn/class-11/[subject]/[chapter]
 * Uses the shared subject-data.ts for real chapter titles/topics and a
 * structured study-skeleton for the theory body (objective, key points,
 * sample question) until full authored theory content is added chapter by
 * chapter — mirrors the same fallback pattern used across the platform.
 */

import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight, BookOpen, Star, Play, FlaskConical,
  CheckCircle2, ArrowRight, Target, HelpCircle,
} from "lucide-react";
import { Badge }  from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CLASS_11_SUBJECT_DATA } from "../../subject-data";

function getChapterContext(subject: string, chapterId: string) {
  const subjectData = CLASS_11_SUBJECT_DATA[subject];
  if (!subjectData) return null;

  const index = subjectData.chapters.findIndex((c) => c.id === chapterId);
  if (index === -1) return null;

  const chapter = subjectData.chapters[index];
  return {
    subjectName: subjectData.name,
    chapter,
    prevChapter: index > 0 ? subjectData.chapters[index - 1] : undefined,
    nextChapter: index < subjectData.chapters.length - 1 ? subjectData.chapters[index + 1] : undefined,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string; chapter: string }>;
}): Promise<Metadata> {
  const { subject, chapter } = await params;
  const ctx = getChapterContext(subject, chapter);
  const title = ctx?.chapter.title ?? `Chapter ${chapter.replace("chapter-", "")}`;

  return {
    title:       `${title} — Class 11 ${subject.replace(/-/g," ")} | LearnVeda`,
    description: `Study ${title} for CBSE Class 11 ${ctx?.subjectName ?? subject} with topic breakdown and practice questions.`,
    keywords:    [`Class 11 ${title}`, `NCERT ${title}`, "CBSE Class 11"],
  };
}

export default async function Class11ChapterPage({
  params,
}: {
  params: Promise<{ subject: string; chapter: string }>;
}) {
  const { subject, chapter } = await params;
  const ctx = getChapterContext(subject, chapter);
  const chapterNum = parseInt(chapter.replace("chapter-", "") || "1");
  const subjectLabel = subject.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  const title  = ctx?.chapter.title ?? `Chapter ${chapterNum}`;
  const topics = ctx?.chapter.topics ?? ["Core Concepts", "Solved Examples", "Practice Problems"];
  const hasSimulation = ctx?.chapter.hasSimulation ?? false;

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container px-4 py-4">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
            <Link href="/learn"                       className="hover:text-foreground transition-colors">Learn</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/learn/class-11"               className="hover:text-foreground transition-colors">Class 11</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href={`/learn/class-11/${subject}`}  className="hover:text-foreground transition-colors capitalize">{subjectLabel}</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">Chapter {chapterNum}</span>
          </nav>
        </div>
      </div>

      <div className="container px-4 py-8 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <BookOpen className="h-3.5 w-3.5" />
                <span>Chapter {chapterNum}</span>
                {hasSimulation && (
                  <Badge className="text-[9px] py-0 bg-green-500/10 text-green-600 border-green-500/20">
                    ⚡ Simulation Available
                  </Badge>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-3">{title}</h1>

              <div className="flex items-start gap-2 rounded-xl border border-primary/20 bg-primary/5 p-4">
                <Target className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-primary mb-1">Learning Objective</div>
                  <p className="text-sm text-muted-foreground">
                    Master {title} for CBSE Class 11 {ctx?.subjectName ?? subjectLabel} — covering {topics.join(", ")}.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {topics.map((topic, i) => (
                <div key={topic} className="space-y-2">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <span className="h-6 w-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold">
                      {i + 1}
                    </span>
                    {topic}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed pl-8">
                    Detailed NCERT-aligned notes, solved examples, and diagrams for {topic} are part of the {title} chapter — study the concept thoroughly and work through the practice problems below.
                  </p>
                </div>
              ))}
            </div>

            {hasSimulation && (
              <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <FlaskConical className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <h2 className="font-semibold text-green-700 dark:text-green-300">Interactive Simulation</h2>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Explore {title} interactively with a hands-on simulation.
                </p>
                <Button asChild variant="outline" size="sm" className="border-green-500/30 text-green-700 dark:text-green-300">
                  <Link href={`/simulations/physics?topic=${subject}-${chapter}`}>
                    <Play className="h-3.5 w-3.5 mr-1" />
                    Launch Simulation
                  </Link>
                </Button>
              </div>
            )}

            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <HelpCircle className="h-4.5 w-4.5 text-primary" />
                Practice
              </h2>
              <div className="rounded-xl border bg-card p-4">
                <p className="text-sm text-muted-foreground mb-3">
                  Test your understanding of {title} with chapter-wise MCQs and previous year questions.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link href="/practice">
                    <Star className="h-3.5 w-3.5 mr-1" />
                    Take Full Chapter Quiz
                    <ArrowRight className="h-3.5 w-3.5 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border bg-card p-5">
              <h3 className="font-semibold text-sm mb-4">Your Progress</h3>
              <div className="flex items-center gap-2 mb-3">
                <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-0 bg-primary rounded-full" />
                </div>
                <span className="text-xs text-muted-foreground">0%</span>
              </div>
              <Button className="w-full" size="sm">
                <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                Mark as Complete
              </Button>
            </div>

            <div className="rounded-2xl border bg-card p-5">
              <h3 className="font-semibold text-sm mb-3">Topics Covered</h3>
              <ul className="space-y-2">
                {topics.map((topic, i) => (
                  <li key={topic} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <span className="h-4 w-4 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {topic}
                  </li>
                ))}
              </ul>
            </div>

            {(ctx?.prevChapter || ctx?.nextChapter) && (
              <div className="rounded-2xl border bg-card p-5 space-y-2">
                {ctx?.prevChapter && (
                  <Link href={`/learn/class-11/${subject}/${ctx.prevChapter.id}`} className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
                    ← {ctx.prevChapter.title}
                  </Link>
                )}
                {ctx?.nextChapter && (
                  <Link href={`/learn/class-11/${subject}/${ctx.nextChapter.id}`} className="flex items-center justify-end gap-2 text-xs font-medium text-primary hover:underline">
                    {ctx.nextChapter.title} →
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
