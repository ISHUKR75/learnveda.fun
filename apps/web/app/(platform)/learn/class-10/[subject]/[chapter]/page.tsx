/**
 * @file app/(platform)/learn/class-10/[subject]/[chapter]/page.tsx
 * @description Individual chapter learning page for Class 10
 * Route: /learn/class-10/[subject]/[chapter]
 * Shows: Theory content, key concepts, simulation (if applicable), quiz link, navigation.
 * Mirrors the Class 9 chapter page pattern for consistency across the platform.
 */

import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight, BookOpen, Star,
  Play, FlaskConical, CheckCircle2, ArrowRight,
  Target, FileText, HelpCircle,
} from "lucide-react";
import { Badge }  from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getChapterDetail, getChapterList } from "@/lib/services/content-service";

/* ─── Default Chapter Content ────────────────────────────────────────────── */
// Returns generic content when a chapter has no live content-service entry
// (should not normally happen for Class 10 since all subjects are registered
// in `content-service.ts`, but kept as a defensive fallback).
function getGenericChapterContent(chapter: string) {
  const chapterNum = parseInt(chapter.replace("chapter-", "") || "1");
  return {
    title:          `Chapter ${chapterNum}`,
    objective:      "Master this chapter with structured lessons, key concepts, and practice questions.",
    theoryPoints:   [
      { heading: "Introduction", content: "This chapter covers the fundamental concepts of this topic. Read carefully and take notes." },
      { heading: "Key Concepts", content: "Understand the core definitions and principles before moving to solved examples." },
      { heading: "Applications", content: "Real-world applications help solidify understanding. Practice with examples." },
    ],
    keyFormulas: [] as { label: string; formula: string }[],
    keyPoints:      ["Study NCERT theory thoroughly", "Solve all examples", "Practice exercise questions", "Revise formulas daily"],
    hasSimulation:  false,
    simulationDesc: undefined as string | undefined,
    sampleQuestions: [
      { question: "Which of the following is the correct statement?", options: ["Option A", "Option B", "Option C", "Option D"], answer: 0 },
    ],
    prevChapter: undefined as { id: string; title: string } | undefined,
    nextChapter: undefined as { id: string; title: string } | undefined,
  };
}

/**
 * Resolves full chapter content from the shared content-service (MongoDB
 * when configured, static Class 10 content files otherwise). Also resolves
 * prev/next chapter titles via the subject's chapter list.
 */
async function getResolvedChapterContent(subject: string, chapter: string) {
  const serviceDetail = await getChapterDetail("class-10", subject, chapter);

  if (serviceDetail) {
    const chapterList = await getChapterList("class-10", subject);
    const titleById = new Map(chapterList.map((c) => [c.chapterId, c.title]));
    return {
      title:       serviceDetail.title,
      objective:   serviceDetail.objective,
      theoryPoints: serviceDetail.theoryPoints,
      keyFormulas:  serviceDetail.keyFormulas,
      keyPoints:    serviceDetail.keyPoints,
      hasSimulation: serviceDetail.hasSimulation,
      simulationDesc: serviceDetail.simulationDescription,
      sampleQuestions: serviceDetail.sampleQuestions,
      prevChapter: serviceDetail.prevChapterId
        ? { id: serviceDetail.prevChapterId, title: titleById.get(serviceDetail.prevChapterId) ?? "Previous Chapter" }
        : undefined,
      nextChapter: serviceDetail.nextChapterId
        ? { id: serviceDetail.nextChapterId, title: titleById.get(serviceDetail.nextChapterId) ?? "Next Chapter" }
        : undefined,
    };
  }

  return getGenericChapterContent(chapter);
}

/* ─── generateMetadata — per chapter SEO ────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string; chapter: string }>;
}): Promise<Metadata> {
  const { subject, chapter } = await params;
  const data = await getResolvedChapterContent(subject, chapter);

  return {
    title:       `${data.title} — Class 10 ${subject.replace(/-/g," ")} | LearnVeda`,
    description: data.objective,
    keywords:    [`Class 10 ${data.title}`, `NCERT ${data.title}`, "CBSE Class 10"],
  };
}

/* ─── Chapter Page Component ─────────────────────────────────────────────── */
export default async function Class10ChapterPage({
  params,
}: {
  params: Promise<{ subject: string; chapter: string }>;
}) {
  const { subject, chapter } = await params;
  const data = await getResolvedChapterContent(subject, chapter);

  const subjectLabel = subject.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  const chapterNum   = parseInt(chapter.replace("chapter-", "") || "1");

  return (
    <div className="min-h-screen bg-background">
      {/* ── Breadcrumb ───────────────────────────────────────────────────── */}
      <div className="border-b">
        <div className="container px-4 py-4">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
            <Link href="/learn"                           className="hover:text-foreground transition-colors">Learn</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/learn/class-10"                  className="hover:text-foreground transition-colors">Class 10</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href={`/learn/class-10/${subject}`}     className="hover:text-foreground transition-colors capitalize">{subjectLabel}</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">Chapter {chapterNum}</span>
          </nav>
        </div>
      </div>

      {/* ── Main Content ─────────────────────────────────────────────────── */}
      <div className="container px-4 py-8 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ─── Article / Theory Content ─────────────────────────────── */}
          <div className="lg:col-span-2 space-y-8">

            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <BookOpen className="h-3.5 w-3.5" />
                <span>Chapter {chapterNum}</span>
                {data.hasSimulation && (
                  <Badge className="text-[9px] py-0 bg-green-500/10 text-green-600 border-green-500/20">
                    ⚡ Simulation Available
                  </Badge>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-3">{data.title}</h1>

              <div className="flex items-start gap-2 rounded-xl border border-primary/20 bg-primary/5 p-4">
                <Target className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-primary mb-1">Learning Objective</div>
                  <p className="text-sm text-muted-foreground">{data.objective}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {data.theoryPoints.map((point, i) => (
                <div key={i} className="space-y-2">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <span className="h-6 w-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold">
                      {i + 1}
                    </span>
                    {point.heading}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed pl-8">{point.content}</p>
                </div>
              ))}
            </div>

            {data.keyFormulas && data.keyFormulas.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <FileText className="h-4.5 w-4.5 text-primary" />
                  Key Formulas
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {data.keyFormulas.map((f) => (
                    <div key={f.label} className="rounded-xl border bg-card p-3">
                      <div className="text-xs text-muted-foreground mb-1">{f.label}</div>
                      <div className="font-mono text-sm font-semibold text-foreground">{f.formula}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {data.hasSimulation && (
              <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <FlaskConical className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <h2 className="font-semibold text-green-700 dark:text-green-300">Interactive Simulation</h2>
                </div>
                {data.simulationDesc && (
                  <p className="text-sm text-muted-foreground mb-4">{data.simulationDesc}</p>
                )}
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
                Sample Questions
              </h2>
              <div className="space-y-4">
                {data.sampleQuestions.map((q, qi) => (
                  <div key={qi} className="rounded-xl border bg-card p-4">
                    <p className="font-medium text-sm mb-3">Q{qi + 1}. {q.question}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt, oi) => (
                        <div
                          key={oi}
                          className={`rounded-lg border px-3 py-2 text-sm cursor-pointer transition-colors ${
                            oi === q.answer
                              ? "border-green-500/30 bg-green-500/10 text-green-700 dark:text-green-300"
                              : "border-border bg-muted/30 text-muted-foreground"
                          }`}
                        >
                          <span className="font-medium mr-2">{String.fromCharCode(65 + oi)}.</span>
                          {opt}
                          {oi === q.answer && <CheckCircle2 className="inline h-3.5 w-3.5 ml-1 text-green-600" />}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-center">
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

          {/* ─── Sidebar ──────────────────────────────────────────────── */}
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
              <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                Key Points to Remember
              </h3>
              <ol className="space-y-2">
                {data.keyPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <span className="h-4 w-4 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {point}
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-2xl border bg-card p-5">
              <h3 className="font-semibold text-sm mb-3">Resources</h3>
              <div className="space-y-2">
                <Link href="/practice" className="flex items-center justify-between text-xs text-muted-foreground hover:text-foreground transition-colors">
                  <span className="flex items-center gap-2"><BookOpen className="h-3.5 w-3.5" /> NCERT Solutions</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
                <Link href="/practice" className="flex items-center justify-between text-xs text-muted-foreground hover:text-foreground transition-colors">
                  <span className="flex items-center gap-2"><Star className="h-3.5 w-3.5" /> Practice Quiz</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
                {data.hasSimulation && (
                  <Link href={`/simulations/physics?topic=${subject}-${chapter}`} className="flex items-center justify-between text-xs text-muted-foreground hover:text-foreground transition-colors">
                    <span className="flex items-center gap-2"><FlaskConical className="h-3.5 w-3.5" /> Simulations</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                )}
              </div>
            </div>

            {/* Prev / Next navigation */}
            {(data.prevChapter || data.nextChapter) && (
              <div className="rounded-2xl border bg-card p-5 space-y-2">
                {data.prevChapter && (
                  <Link href={`/learn/class-10/${subject}/${data.prevChapter.id}`} className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
                    ← {data.prevChapter.title}
                  </Link>
                )}
                {data.nextChapter && (
                  <Link href={`/learn/class-10/${subject}/${data.nextChapter.id}`} className="flex items-center justify-end gap-2 text-xs font-medium text-primary hover:underline">
                    {data.nextChapter.title} →
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
