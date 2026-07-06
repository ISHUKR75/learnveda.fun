/**
 * @file app/(platform)/learn/class-9/[subject]/page.tsx
 * @description Class 9 subject detail page — shows all chapters for a subject
 * Route: /learn/class-9/[subject]  (e.g. /learn/class-9/mathematics)
 * Lists chapters with progress, simulations badge, and navigation to individual chapters
 */

import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen, ArrowRight, ChevronRight, Clock, Play,
  CheckCircle2, Lock, FlaskConical, Star, Download,
} from "lucide-react";
import { Badge }  from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getChapterList } from "@/lib/services/content-service";

/* ─── Static Subject Data ────────────────────────────────────────────────── */
// Complete chapter list for every Class 9 subject.
// This static data doubles as the demo-mode fallback: `getChapterList()`
// (backed by MongoDB when configured) is merged on top of it below, so
// subjects that have been migrated to the database (currently Class 9
// Mathematics) show live duration/quiz/simulation flags from real chapter
// documents, while the topic tags stay sourced from this file.
const SUBJECT_DATA: Record<string, {
  name:        string;
  description: string;
  totalChapters: number;
  duration:    string;
  hasSimulation: boolean;
  color:       string;
  chapters:    { id: string; title: string; topics: string[]; duration: string; hasSimulation?: boolean; hasQuiz: boolean }[];
}> = {
  mathematics: {
    name:          "Mathematics",
    description:   "NCERT Class 9 Mathematics — from Number Systems to Statistics. Structured lessons, solved examples, and 200+ practice problems.",
    totalChapters: 15,
    duration:      "45 days",
    hasSimulation: false,
    color:         "blue",
    chapters: [
      { id:"chapter-01", title:"Number Systems",          topics:["Rational & Irrational Numbers","Real Numbers","Decimal Expansion"],                    duration:"3 days", hasQuiz:true  },
      { id:"chapter-02", title:"Polynomials",             topics:["Definition","Remainder Theorem","Factor Theorem","Algebraic Identities"],               duration:"3 days", hasQuiz:true  },
      { id:"chapter-03", title:"Coordinate Geometry",     topics:["Cartesian Plane","Plotting Points","Distance Formula"],                                  duration:"2 days", hasQuiz:true  },
      { id:"chapter-04", title:"Linear Equations",        topics:["Two Variables","Graph of Linear Equation","Solutions"],                                  duration:"2 days", hasQuiz:true  },
      { id:"chapter-05", title:"Introduction to Euclid",  topics:["Euclid's Postulates","Theorems","Axioms"],                                               duration:"2 days", hasQuiz:true  },
      { id:"chapter-06", title:"Lines and Angles",        topics:["Basic Terms","Pairs of Angles","Parallel Lines","Angle Sum Property"],                   duration:"3 days", hasQuiz:true  },
      { id:"chapter-07", title:"Triangles",               topics:["Congruence","Criteria (SAS, ASA, SSS)","Properties","Inequalities"],                    duration:"4 days", hasQuiz:true  },
      { id:"chapter-08", title:"Quadrilaterals",          topics:["Properties","Parallelogram","Mid-Point Theorem"],                                        duration:"3 days", hasQuiz:true  },
      { id:"chapter-09", title:"Circles",                 topics:["Circle Theorems","Chord","Arc","Angle in Semicircle"],                                   duration:"3 days", hasQuiz:true  },
      { id:"chapter-10", title:"Heron's Formula",         topics:["Area of Triangle","Heron's Formula","Applications"],                                    duration:"2 days", hasQuiz:true  },
      { id:"chapter-11", title:"Surface Areas & Volumes", topics:["Cuboid","Cylinder","Cone","Sphere","Total Surface Area"],                               duration:"4 days", hasQuiz:true  },
      { id:"chapter-12", title:"Statistics",              topics:["Collection of Data","Frequency Distribution","Bar Graphs","Histograms","Mean Median Mode"], duration:"3 days", hasQuiz:true },
      { id:"chapter-13", title:"Probability",             topics:["Introduction to Probability","Empirical","Events","Experiments"],                       duration:"2 days", hasQuiz:true  },
    ],
  },

  science: {
    name:          "Science",
    description:   "NCERT Class 9 Science — Physics, Chemistry, Biology integrated with 25+ interactive simulations and HOTS questions.",
    totalChapters: 14,
    duration:      "45 days",
    hasSimulation: true,
    color:         "green",
    chapters: [
      { id:"chapter-01", title:"Matter in Our Surroundings",   topics:["States of Matter","Evaporation","Latent Heat"],              duration:"3 days", hasSimulation:true,  hasQuiz:true },
      { id:"chapter-02", title:"Is Matter Around Us Pure?",    topics:["Mixture","Solution","Separation Techniques","Colloids"],     duration:"3 days", hasSimulation:false, hasQuiz:true },
      { id:"chapter-03", title:"Atoms and Molecules",          topics:["Laws of Chemical Combination","Atomic Mass","Mole Concept"], duration:"3 days", hasSimulation:false, hasQuiz:true },
      { id:"chapter-04", title:"Structure of the Atom",        topics:["Thomson Model","Bohr Model","Electrons & Protons","Shells"], duration:"3 days", hasSimulation:true,  hasQuiz:true },
      { id:"chapter-05", title:"The Fundamental Unit of Life", topics:["Cell Theory","Plant vs Animal Cell","Organelles","Osmosis"], duration:"3 days", hasSimulation:false, hasQuiz:true },
      { id:"chapter-06", title:"Tissues",                      topics:["Plant Tissues","Animal Tissues","Meristematic","Epithelial"],duration:"3 days", hasSimulation:false, hasQuiz:true },
      { id:"chapter-07", title:"Motion",                       topics:["Distance & Displacement","Velocity","Acceleration","Graphs"],duration:"4 days", hasSimulation:true,  hasQuiz:true },
      { id:"chapter-08", title:"Force and Laws of Motion",     topics:["Newton's 3 Laws","Momentum","Conservation"],                 duration:"4 days", hasSimulation:true,  hasQuiz:true },
      { id:"chapter-09", title:"Gravitation",                  topics:["Universal Law","g","Weight","Archimedes' Principle"],        duration:"3 days", hasSimulation:true,  hasQuiz:true },
      { id:"chapter-10", title:"Work and Energy",              topics:["Work","Kinetic Energy","Potential Energy","Power"],          duration:"3 days", hasSimulation:true,  hasQuiz:true },
      { id:"chapter-11", title:"Sound",                        topics:["Wave Properties","Reflection","Echo","SONAR"],              duration:"3 days", hasSimulation:true,  hasQuiz:true },
      { id:"chapter-12", title:"Improvement in Food Resources",topics:["Crop Production","Manure","Animal Husbandry"],              duration:"2 days", hasSimulation:false, hasQuiz:true },
    ],
  },

  "social-science": {
    name:          "Social Science",
    description:   "NCERT Class 9 Social Science — History, Geography, Civics, Economics with maps, timelines, and exam-focused notes.",
    totalChapters: 20,
    duration:      "40 days",
    hasSimulation: false,
    color:         "orange",
    chapters: [
      { id:"chapter-01", title:"The French Revolution",             topics:["Causes","Events","Impact","Napoleon"],                    duration:"3 days", hasQuiz:true },
      { id:"chapter-02", title:"Socialism in Europe & Russia",      topics:["Capitalism","Marxism","Russian Revolution","Stalin"],    duration:"3 days", hasQuiz:true },
      { id:"chapter-03", title:"Nazism and the Rise of Hitler",     topics:["Weimar Republic","Hitler's Rise","Holocaust","End"],     duration:"3 days", hasQuiz:true },
      { id:"chapter-04", title:"Forest Society and Colonialism",    topics:["Forest Acts","Shifting Cultivation","Peasant Movements"],duration:"2 days", hasQuiz:true },
      { id:"chapter-05", title:"Pastoralists in the Modern World",  topics:["Nomads","Colonial Impact","Modern Pastoralism"],         duration:"2 days", hasQuiz:true },
      { id:"chapter-06", title:"India — Size and Location",         topics:["Latitudes","Longitudes","Standard Meridian"],           duration:"2 days", hasQuiz:true },
      { id:"chapter-07", title:"Physical Features of India",        topics:["Himalayas","Indo-Gangetic Plain","Peninsular Plateau"],  duration:"3 days", hasQuiz:true },
      { id:"chapter-08", title:"Drainage",                          topics:["River Systems","Himalayan Rivers","Peninsular Rivers"],  duration:"2 days", hasQuiz:true },
      { id:"chapter-09", title:"Climate",                           topics:["Monsoon","Temperature","Seasons","Rainfall"],           duration:"2 days", hasQuiz:true },
      { id:"chapter-10", title:"Natural Vegetation and Wildlife",   topics:["Biomes","Forests","Grasslands","Wildlife"],             duration:"2 days", hasQuiz:true },
    ],
  },

  english: {
    name:          "English",
    description:   "NCERT Class 9 English — Beehive (poetry & prose), Moments (supplementary), grammar, writing, and comprehension.",
    totalChapters: 12,
    duration:      "30 days",
    hasSimulation: false,
    color:         "purple",
    chapters: [
      { id:"chapter-01", title:"The Fun They Had (Beehive)",           topics:["Summary","Characters","Comprehension","Writing Style"],   duration:"2 days", hasQuiz:true },
      { id:"chapter-02", title:"The Sound of Music (Beehive)",         topics:["Evelyn Glennie","Bismillah Khan","Prose Summary"],       duration:"2 days", hasQuiz:true },
      { id:"chapter-03", title:"The Little Girl (Beehive)",            topics:["Character Analysis","Father's Change","Themes"],        duration:"2 days", hasQuiz:true },
      { id:"chapter-04", title:"The Lake Isle of Innisfree (Poetry)",   topics:["Poem Analysis","Symbolism","Rhyme Scheme"],             duration:"1 day",  hasQuiz:true },
      { id:"chapter-05", title:"The Lost Child (Moments)",             topics:["Summary","Psychology","Emotions"],                      duration:"2 days", hasQuiz:true },
      { id:"chapter-06", title:"The Adventures of Toto (Moments)",     topics:["Humour","Character","Summary"],                        duration:"2 days", hasQuiz:true },
      { id:"chapter-07", title:"Grammar — Tenses & Voice",             topics:["Active/Passive","Tenses","Sentence Transformation"],   duration:"3 days", hasQuiz:true },
      { id:"chapter-08", title:"Writing Skills",                       topics:["Formal Letter","Article","Notice","Diary Entry"],      duration:"4 days", hasQuiz:true },
    ],
  },

  hindi: {
    name:          "Hindi",
    description:   "NCERT Class 9 Hindi — Kshitij, Sparsh, Kritika, and Sanchayan textbooks with detailed explanations.",
    totalChapters: 12,
    duration:      "30 days",
    hasSimulation: false,
    color:         "rose",
    chapters: [
      { id:"chapter-01", title:"दो बैलों की कथा (Kshitij)",    topics:["कहानी सारांश","पात्र परिचय","भाषा शैली"],        duration:"2 days", hasQuiz:true },
      { id:"chapter-02", title:"ल्हासा की ओर (Kshitij)",       topics:["यात्रा वृत्तांत","लेखक परिचय","सारांश"],        duration:"2 days", hasQuiz:true },
      { id:"chapter-03", title:"उपभोक्तावाद की संस्कृति",      topics:["निबंध विश्लेषण","भाषाई बिंदु"],               duration:"2 days", hasQuiz:true },
      { id:"chapter-04", title:"साँवले सपनों की याद",          topics:["कहानी सारांश","प्रकृति चित्रण"],               duration:"2 days", hasQuiz:true },
      { id:"chapter-05", title:"नाना साहब की पुत्री (Sparsh)", topics:["ऐतिहासिक संदर्भ","बलिदान","भावना"],           duration:"2 days", hasQuiz:true },
      { id:"chapter-06", title:"प्रेमचंद के फटे जूते (Sparsh)",topics:["व्यंग्य","प्रेमचंद जीवनी","सारांश"],         duration:"2 days", hasQuiz:true },
      { id:"chapter-07", title:"व्याकरण — संज्ञा, सर्वनाम",   topics:["संज्ञा","सर्वनाम","विशेषण","क्रिया"],         duration:"3 days", hasQuiz:true },
      { id:"chapter-08", title:"लेखन कौशल",                   topics:["अनुच्छेद लेखन","पत्र लेखन","निबंध"],           duration:"4 days", hasQuiz:true },
    ],
  },
};

/* ─── Fallback for unknown subjects ─────────────────────────────────────── */
// If a subject slug isn't in our data, show a generic placeholder
function getSubjectData(slug: string) {
  return SUBJECT_DATA[slug] ?? {
    name:          slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
    description:   `Complete NCERT Class 9 ${slug} curriculum with structured lessons and practice.`,
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

/* ─── Color Map ──────────────────────────────────────────────────────────── */
// Maps subject color names to Tailwind classes
const COLOR_MAP: Record<string, { bg: string; border: string; text: string; gradient: string }> = {
  blue:   { bg:"bg-blue-500/10",   border:"border-blue-500/20",   text:"text-blue-600 dark:text-blue-400",   gradient:"from-blue-500 to-cyan-500"   },
  green:  { bg:"bg-green-500/10",  border:"border-green-500/20",  text:"text-green-600 dark:text-green-400",  gradient:"from-green-500 to-emerald-500" },
  orange: { bg:"bg-orange-500/10", border:"border-orange-500/20", text:"text-orange-600 dark:text-orange-400",gradient:"from-orange-500 to-amber-500"  },
  purple: { bg:"bg-purple-500/10", border:"border-purple-500/20", text:"text-purple-600 dark:text-purple-400",gradient:"from-purple-500 to-violet-500" },
  rose:   { bg:"bg-rose-500/10",   border:"border-rose-500/20",   text:"text-rose-600 dark:text-rose-400",   gradient:"from-rose-500 to-pink-500"    },
  indigo: { bg:"bg-indigo-500/10", border:"border-indigo-500/20", text:"text-indigo-600 dark:text-indigo-400",gradient:"from-indigo-500 to-blue-500"  },
};

/* ─── generateStaticParams — next.js static optimization ────────────────── */
// Pre-renders known subject pages at build time for fast loading
export async function generateStaticParams() {
  return Object.keys(SUBJECT_DATA).map((subject) => ({ subject }));
}

/* ─── generateMetadata — dynamic SEO per subject ────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string }>;
}): Promise<Metadata> {
  const { subject } = await params;                  // Await params per Next.js 15
  const data = getSubjectData(subject);              // Get subject-specific data

  return {
    title:       `Class 9 ${data.name} — NCERT | LearnVeda`,
    description: data.description,
    keywords:    [`Class 9 ${data.name}`, `NCERT Class 9 ${data.name}`, "CBSE Class 9"],
  };
}

/* ─── Subject Page Component ─────────────────────────────────────────────── */
export default async function Class9SubjectPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject } = await params;                  // Await params
  const baseData   = getSubjectData(subject);        // Static/fallback subject data
  const colors     = COLOR_MAP[baseData.color] ?? COLOR_MAP.indigo; // Get color classes

  // Overlay live chapter data (from MongoDB when configured, else the same
  // static content used as fallback) so duration/quiz/simulation flags stay
  // accurate as content moves into the database subject-by-subject.
  const liveChapters = await getChapterList("class-9", subject);
  const liveById = new Map(liveChapters.map((c) => [c.chapterId, c]));
  const data = {
    ...baseData,
    chapters: baseData.chapters.map((chapter) => {
      const live = liveById.get(chapter.id);
      return live
        ? { ...chapter, duration: live.durationLabel, hasQuiz: live.hasQuiz, hasSimulation: live.hasSimulation }
        : chapter;
    }),
  };

  return (
    <div className="min-h-screen bg-background">
      {/* ── Page Header ──────────────────────────────────────────────────── */}
      <div className={`border-b bg-gradient-to-br from-${data.color}-500/5 via-background to-${data.color}-500/5`}>
        <div className="container px-4 py-10 md:py-14">
          {/* Breadcrumb navigation */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap">
            <Link href="/learn"         className="hover:text-foreground transition-colors">Learn</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/learn/class-9" className="hover:text-foreground transition-colors">Class 9</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">{data.name}</span>
          </nav>

          {/* Subject header */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-2xl sm:text-3xl font-bold">Class 9 — {data.name}</h1>
                {data.hasSimulation && (
                  <Badge className="text-xs bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20">
                    ⚡ Simulations
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground max-w-2xl">{data.description}</p>
            </div>

            {/* Start Learning CTA */}
            <div className="flex gap-2 shrink-0">
              <Button asChild size="sm" variant="outline">
                <Link href={`/learn/class-9/${subject}/${data.chapters[0]?.id ?? "chapter-01"}`}>
                  <Play className="h-3.5 w-3.5 mr-1" />
                  Start Learning
                </Link>
              </Button>
            </div>
          </div>

          {/* Summary stats */}
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

      {/* ── Chapter List ─────────────────────────────────────────────────── */}
      <div className="container px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">All Chapters</h2>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
            <span>0 of {data.chapters.length} completed</span>
          </div>
        </div>

        {/* Chapter cards — numbered list */}
        <div className="space-y-3">
          {data.chapters.map((chapter, index) => (
            <Link
              key={chapter.id}
              href={`/learn/class-9/${subject}/${chapter.id}`}
              className="group flex items-center gap-4 rounded-xl border bg-card hover:shadow-md transition-all hover:-translate-y-0.5 p-4"
            >
              {/* Chapter number */}
              <div className={`h-10 w-10 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center text-sm font-bold ${colors.text} shrink-0`}>
                {String(index + 1).padStart(2, "0")}
              </div>

              {/* Chapter info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="font-medium text-sm group-hover:text-primary transition-colors">
                    {chapter.title}
                  </h3>
                  {/* Simulation badge */}
                  {chapter.hasSimulation && (
                    <Badge className="text-[9px] py-0 bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20 shrink-0">
                      <FlaskConical className="h-2.5 w-2.5 mr-0.5" />
                      Simulation
                    </Badge>
                  )}
                  {/* Quiz badge */}
                  {chapter.hasQuiz && (
                    <Badge variant="outline" className="text-[9px] py-0 shrink-0">
                      Quiz
                    </Badge>
                  )}
                </div>

                {/* Topics list */}
                <div className="flex flex-wrap gap-1">
                  {chapter.topics.slice(0, 4).map((topic) => (
                    <span key={topic} className="text-[10px] text-muted-foreground">
                      {topic}{" · "}
                    </span>
                  ))}
                </div>
              </div>

              {/* Duration + arrow */}
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

        {/* ── Study Resources ─────────────────────────────────────────────── */}
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
