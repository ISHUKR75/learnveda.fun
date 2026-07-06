/**
 * @file app/(platform)/learn/class-10/[subject]/page.tsx
 * @description Class 10 subject detail page — shows all chapters for a subject
 * Route: /learn/class-10/[subject]  (e.g. /learn/class-10/mathematics)
 * Lists chapters with progress, simulations badge, and navigation to individual chapters.
 * Mirrors the Class 9 subject page pattern for consistency across the platform.
 */

import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen, ArrowRight, ChevronRight, Clock, Play,
  CheckCircle2, FlaskConical, Star, Download,
} from "lucide-react";
import { Badge }  from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getChapterList } from "@/lib/services/content-service";

/* ─── Static Subject Data ────────────────────────────────────────────────── */
// Complete chapter list for every Class 10 subject. This static data doubles
// as the demo-mode fallback: `getChapterList()` (backed by MongoDB when
// configured) is merged on top of it below so duration/quiz/simulation flags
// stay accurate as content moves into the database subject-by-subject.
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
    name: "Mathematics", description: "NCERT Class 10 Mathematics — from Real Numbers to Probability, fully board-exam aligned with solved examples.",
    totalChapters: 15, duration: "50 days", hasSimulation: true, color: "blue",
    chapters: [
      { id:"chapter-01", title:"Real Numbers",                              topics:["Euclid's Division Lemma","Fundamental Theorem of Arithmetic","Irrational Numbers"], duration:"3 days", hasQuiz:true },
      { id:"chapter-02", title:"Polynomials",                               topics:["Zeros","Relationship with Coefficients","Division Algorithm"],                     duration:"3 days", hasQuiz:true },
      { id:"chapter-03", title:"Pair of Linear Equations in Two Variables",  topics:["Graphical Method","Substitution","Elimination","Cross-Multiplication"],           duration:"4 days", hasQuiz:true },
      { id:"chapter-04", title:"Quadratic Equations",                       topics:["Factorisation","Completing the Square","Quadratic Formula","Discriminant"],       duration:"4 days", hasQuiz:true },
      { id:"chapter-05", title:"Arithmetic Progressions",                   topics:["nth Term","Sum of n Terms","Applications"],                                        duration:"3 days", hasQuiz:true },
      { id:"chapter-06", title:"Triangles",                                 topics:["Similarity","Basic Proportionality Theorem","Pythagoras Theorem"],                 duration:"4 days", hasQuiz:true },
      { id:"chapter-07", title:"Coordinate Geometry",                       topics:["Distance Formula","Section Formula","Area of Triangle"],                          duration:"3 days", hasQuiz:true },
      { id:"chapter-08", title:"Introduction to Trigonometry",              topics:["Trig Ratios","Identities","Specific Angles"],                                      duration:"4 days", hasSimulation:true, hasQuiz:true },
      { id:"chapter-09", title:"Some Applications of Trigonometry",         topics:["Height and Distance","Angle of Elevation","Angle of Depression"],                 duration:"2 days", hasSimulation:true, hasQuiz:true },
      { id:"chapter-10", title:"Circles",                                   topics:["Tangent to a Circle","Number of Tangents","Properties"],                          duration:"2 days", hasQuiz:true },
      { id:"chapter-11", title:"Areas Related to Circles",                  topics:["Sector Area","Segment Area","Combination of Figures"],                            duration:"3 days", hasQuiz:true },
      { id:"chapter-12", title:"Surface Areas and Volumes",                 topics:["Combination of Solids","Frustum","Conversion of Solids"],                        duration:"3 days", hasQuiz:true },
      { id:"chapter-13", title:"Statistics",                                topics:["Mean","Median","Mode","Ogive"],                                                    duration:"3 days", hasQuiz:true },
      { id:"chapter-14", title:"Probability",                               topics:["Theoretical Probability","Events","Sample Space"],                                duration:"2 days", hasQuiz:true },
      { id:"chapter-15", title:"Proofs in Mathematics",                     topics:["Deductive Reasoning","Conjectures","Theorems"],                                    duration:"1 day",  hasQuiz:true },
    ],
  },
  science: {
    name: "Science", description: "NCERT Class 10 Science — Physics, Chemistry, Biology with 30+ simulations, diagrams, and HOTS questions for board prep.",
    totalChapters: 16, duration: "55 days", hasSimulation: true, color: "green",
    chapters: [
      { id:"chapter-01", title:"Chemical Reactions and Equations",                 topics:["Balancing Equations","Types of Reactions","Corrosion"],                duration:"3 days", hasSimulation:true, hasQuiz:true },
      { id:"chapter-02", title:"Acids, Bases and Salts",                          topics:["pH Scale","Indicators","Common Salts"],                                 duration:"3 days", hasSimulation:true, hasQuiz:true },
      { id:"chapter-03", title:"Metals and Non-metals",                          topics:["Reactivity Series","Extraction","Corrosion"],                           duration:"3 days", hasQuiz:true },
      { id:"chapter-04", title:"Carbon and its Compounds",                       topics:["Covalent Bonding","Homologous Series","Functional Groups"],            duration:"4 days", hasQuiz:true },
      { id:"chapter-05", title:"Life Processes",                                 topics:["Nutrition","Respiration","Transportation","Excretion"],                duration:"4 days", hasQuiz:true },
      { id:"chapter-06", title:"Control and Coordination",                       topics:["Nervous System","Reflex Action","Plant Hormones"],                     duration:"3 days", hasQuiz:true },
      { id:"chapter-07", title:"How do Organisms Reproduce?",                    topics:["Asexual Reproduction","Sexual Reproduction","Human Reproduction"],     duration:"3 days", hasQuiz:true },
      { id:"chapter-08", title:"Heredity",                                       topics:["Mendel's Laws","Sex Determination","Evolution"],                       duration:"3 days", hasQuiz:true },
      { id:"chapter-09", title:"Light — Reflection and Refraction",              topics:["Mirror Formula","Lens Formula","Refractive Index"],                     duration:"4 days", hasSimulation:true, hasQuiz:true },
      { id:"chapter-10", title:"The Human Eye and the Colourful World",          topics:["Eye Defects","Dispersion","Atmospheric Refraction"],                   duration:"3 days", hasQuiz:true },
      { id:"chapter-11", title:"Electricity",                                    topics:["Ohm's Law","Resistance","Electric Power"],                             duration:"4 days", hasSimulation:true, hasQuiz:true },
      { id:"chapter-12", title:"Magnetic Effects of Electric Current",           topics:["Magnetic Field","Right-Hand Rule","Motors and Generators"],            duration:"3 days", hasSimulation:true, hasQuiz:true },
      { id:"chapter-13", title:"Our Environment",                                topics:["Ecosystem","Food Chain","Ozone Layer"],                                duration:"2 days", hasQuiz:true },
      { id:"chapter-14", title:"Sustainable Management of Natural Resources",    topics:["5 R's","Forest Conservation","Water Harvesting"],                      duration:"2 days", hasQuiz:true },
      { id:"chapter-15", title:"Sources of Energy",                              topics:["Renewable Energy","Non-Renewable Energy","Nuclear Energy"],            duration:"2 days", hasQuiz:true },
      { id:"chapter-16", title:"Periodic Classification of Elements",            topics:["Mendeleev's Table","Modern Periodic Table","Periodic Trends"],         duration:"3 days", hasQuiz:true },
    ],
  },
  physics: {
    name: "Physics", description: "Focused Class 10 Physics track — Light, Electricity, Magnetism, and Energy Sources for concept mastery.",
    totalChapters: 5, duration: "18 days", hasSimulation: true, color: "cyan",
    chapters: [
      { id:"chapter-01", title:"Light — Reflection and Refraction",       topics:["Mirror Formula","Lens Formula","Refractive Index"],          duration:"4 days", hasSimulation:true, hasQuiz:true },
      { id:"chapter-02", title:"The Human Eye and the Colourful World",   topics:["Eye Defects","Dispersion","Scattering"],                     duration:"3 days", hasQuiz:true },
      { id:"chapter-03", title:"Electricity",                            topics:["Ohm's Law","Resistance","Electrical Power"],                 duration:"4 days", hasSimulation:true, hasQuiz:true },
      { id:"chapter-04", title:"Magnetic Effects of Electric Current",   topics:["Magnetic Field","Electromagnets","Motors and Generators"],  duration:"3 days", hasSimulation:true, hasQuiz:true },
      { id:"chapter-05", title:"Sources of Energy",                      topics:["Renewable Energy","Non-Renewable Energy"],                   duration:"2 days", hasQuiz:true },
    ],
  },
  chemistry: {
    name: "Chemistry", description: "Focused Class 10 Chemistry track — Reactions, Acids/Bases/Salts, Metals, Carbon, and the Periodic Table.",
    totalChapters: 5, duration: "16 days", hasSimulation: true, color: "purple",
    chapters: [
      { id:"chapter-01", title:"Chemical Reactions and Equations",      topics:["Balancing Equations","Types of Reactions"],           duration:"3 days", hasSimulation:true, hasQuiz:true },
      { id:"chapter-02", title:"Acids, Bases and Salts",               topics:["pH Scale","Indicators","Common Salts"],               duration:"3 days", hasSimulation:true, hasQuiz:true },
      { id:"chapter-03", title:"Metals and Non-metals",                topics:["Reactivity Series","Extraction","Corrosion"],         duration:"3 days", hasQuiz:true },
      { id:"chapter-04", title:"Carbon and its Compounds",             topics:["Covalent Bonding","Homologous Series"],               duration:"4 days", hasQuiz:true },
      { id:"chapter-05", title:"Periodic Classification of Elements",  topics:["Mendeleev's Table","Modern Periodic Table"],          duration:"3 days", hasQuiz:true },
    ],
  },
  biology: {
    name: "Biology", description: "Focused Class 10 Biology track — Life Processes, Coordination, Reproduction, Heredity, and Environment.",
    totalChapters: 6, duration: "17 days", hasSimulation: false, color: "emerald",
    chapters: [
      { id:"chapter-01", title:"Life Processes",                                topics:["Nutrition","Respiration","Transportation"],       duration:"4 days", hasQuiz:true },
      { id:"chapter-02", title:"Control and Coordination",                      topics:["Nervous System","Reflex Action","Hormones"],      duration:"3 days", hasQuiz:true },
      { id:"chapter-03", title:"How do Organisms Reproduce?",                   topics:["Asexual","Sexual","Human Reproduction"],          duration:"3 days", hasQuiz:true },
      { id:"chapter-04", title:"Heredity",                                      topics:["Mendel's Laws","Evolution"],                      duration:"3 days", hasQuiz:true },
      { id:"chapter-05", title:"Our Environment",                               topics:["Ecosystem","Food Chain"],                         duration:"2 days", hasQuiz:true },
      { id:"chapter-06", title:"Sustainable Management of Natural Resources",   topics:["5 R's","Conservation"],                           duration:"2 days", hasQuiz:true },
    ],
  },
  "social-science": {
    name: "Social Science", description: "NCERT Class 10 Social Science — History, Geography, Political Science, Economics with maps and case studies.",
    totalChapters: 20, duration: "50 days", hasSimulation: false, color: "orange",
    chapters: [
      { id:"chapter-01", title:"The Rise of Nationalism in Europe",   topics:["Nation-States","German Unification"],           duration:"3 days", hasQuiz:true },
      { id:"chapter-02", title:"Nationalism in India",                topics:["Non-Cooperation","Civil Disobedience"],         duration:"3 days", hasQuiz:true },
      { id:"chapter-03", title:"The Making of a Global World",        topics:["Trade","Migration","Colonialism"],              duration:"2 days", hasQuiz:true },
      { id:"chapter-04", title:"The Age of Industrialisation",        topics:["Britain","India","Factories"],                  duration:"2 days", hasQuiz:true },
      { id:"chapter-05", title:"Print Culture and the Modern World",  topics:["History of Print","Social Impact"],             duration:"2 days", hasQuiz:true },
      { id:"chapter-06", title:"Resources and Development",           topics:["Resource Classification","Land","Soil"],        duration:"2 days", hasQuiz:true },
      { id:"chapter-07", title:"Forest and Wildlife Resources",       topics:["Biodiversity","Conservation"],                  duration:"2 days", hasQuiz:true },
      { id:"chapter-08", title:"Water Resources",                     topics:["Scarcity","Dams","Rainwater Harvesting"],       duration:"2 days", hasQuiz:true },
      { id:"chapter-09", title:"Agriculture",                         topics:["Farming Types","Green Revolution"],             duration:"2 days", hasQuiz:true },
      { id:"chapter-10", title:"Minerals and Energy Resources",       topics:["Minerals","Energy Sources"],                    duration:"2 days", hasQuiz:true },
      { id:"chapter-11", title:"Power Sharing",                       topics:["Belgium","Sri Lanka","Forms of Power Sharing"], duration:"2 days", hasQuiz:true },
      { id:"chapter-12", title:"Federalism",                          topics:["Federal Structure","Decentralisation"],         duration:"2 days", hasQuiz:true },
      { id:"chapter-13", title:"Political Parties",                   topics:["Party System","National/State Parties"],       duration:"2 days", hasQuiz:true },
      { id:"chapter-14", title:"Outcomes of Democracy",                topics:["Accountability","Quality of Life"],            duration:"2 days", hasQuiz:true },
      { id:"chapter-15", title:"Development",                         topics:["National Income","Sustainability"],            duration:"2 days", hasQuiz:true },
      { id:"chapter-16", title:"Sectors of the Indian Economy",        topics:["Primary","Secondary","Tertiary"],              duration:"2 days", hasQuiz:true },
      { id:"chapter-17", title:"Money and Credit",                     topics:["Role of Money","Banks","Credit"],              duration:"2 days", hasQuiz:true },
      { id:"chapter-18", title:"Globalisation and the Indian Economy", topics:["MNCs","Trade Barriers"],                       duration:"2 days", hasQuiz:true },
      { id:"chapter-19", title:"Consumer Rights",                      topics:["Consumer Protection","Redressal"],             duration:"1 day",  hasQuiz:true },
      { id:"chapter-20", title:"Challenges to Democracy",               topics:["Contemporary Challenges"],                     duration:"1 day",  hasQuiz:true },
    ],
  },
  english: {
    name: "English", description: "NCERT Class 10 English — First Flight, Footprints without Feet, grammar, and writing skills.",
    totalChapters: 10, duration: "30 days", hasSimulation: false, color: "rose",
    chapters: [
      { id:"chapter-01", title:"A Letter to God (First Flight)",                     topics:["Faith","Irony"],                       duration:"2 days", hasQuiz:true },
      { id:"chapter-02", title:"Nelson Mandela — Long Walk to Freedom",              topics:["Speech Analysis","Freedom"],           duration:"2 days", hasQuiz:true },
      { id:"chapter-03", title:"Two Stories About Flying",                           topics:["His First Flight","Black Aeroplane"],  duration:"2 days", hasQuiz:true },
      { id:"chapter-04", title:"From the Diary of Anne Frank",                       topics:["WWII Context","Diary Entries"],        duration:"2 days", hasQuiz:true },
      { id:"chapter-05", title:"Glimpses of India",                                  topics:["A Baker from Goa","Coorg","Tea from Assam"], duration:"2 days", hasQuiz:true },
      { id:"chapter-06", title:"A Tiger in the Zoo (Poetry)",                        topics:["Imagery","Freedom Theme"],             duration:"1 day",  hasQuiz:true },
      { id:"chapter-07", title:"A Triumph of Surgery",                               topics:["Humour","Characterisation"],           duration:"2 days", hasQuiz:true },
      { id:"chapter-08", title:"The Thief's Story",                                  topics:["Character Transformation"],            duration:"2 days", hasQuiz:true },
      { id:"chapter-09", title:"Grammar — Reported Speech & Clauses",                 topics:["Direct/Indirect Speech","Clauses"],    duration:"3 days", hasQuiz:true },
      { id:"chapter-10", title:"Writing Skills",                                     topics:["Letter Writing","Analytical Paragraph"], duration:"3 days", hasQuiz:true },
    ],
  },
  hindi: {
    name: "Hindi", description: "NCERT Class 10 Hindi — Kshitij and Kritika prose, poetry, and grammar.",
    totalChapters: 8, duration: "25 days", hasSimulation: false, color: "red",
    chapters: [
      { id:"chapter-01", title:"सूरदास के पद (Kshitij)",               topics:["भक्ति काव्य","भाषा शैली"],       duration:"2 days", hasQuiz:true },
      { id:"chapter-02", title:"राम-लक्ष्मण-परशुराम संवाद (Kshitij)",  topics:["तुलसीदास","संवाद-कला"],         duration:"2 days", hasQuiz:true },
      { id:"chapter-03", title:"नेताजी का चश्मा (Kshitij)",            topics:["देशभक्ति","प्रतीकात्मकता"],      duration:"2 days", hasQuiz:true },
      { id:"chapter-04", title:"बालगोबिन भगत (Kshitij)",               topics:["चरित्र-चित्रण","भक्ति भावना"],   duration:"2 days", hasQuiz:true },
      { id:"chapter-05", title:"माता का अँचल (Kritika)",               topics:["बाल मनोविज्ञान"],               duration:"2 days", hasQuiz:true },
      { id:"chapter-06", title:"जॉर्ज पंचम की नाक (Kritika)",          topics:["व्यंग्य","हास्य"],               duration:"2 days", hasQuiz:true },
      { id:"chapter-07", title:"व्याकरण — समास, अलंकार",              topics:["समास","अलंकार","रस"],           duration:"3 days", hasQuiz:true },
      { id:"chapter-08", title:"लेखन कौशल",                            topics:["पत्र लेखन","निबंध"],            duration:"3 days", hasQuiz:true },
    ],
  },
  "computer-science": {
    name: "Computer Science", description: "CBSE Class 10 Computer Applications — HTML, CSS, JavaScript basics, databases, and networking.",
    totalChapters: 8, duration: "22 days", hasSimulation: false, color: "indigo",
    chapters: [
      { id:"chapter-01", title:"Networking and Its Types",   topics:["LAN","MAN","WAN","Topologies"],   duration:"3 days", hasQuiz:true },
      { id:"chapter-02", title:"Introduction to HTML",       topics:["Tags","Elements","Page Structure"], duration:"3 days", hasQuiz:true },
      { id:"chapter-03", title:"HTML Formatting and Forms",  topics:["Text Formatting","Tables","Forms"], duration:"3 days", hasQuiz:true },
      { id:"chapter-04", title:"Introduction to CSS",        topics:["Selectors","Box Model","Styling"],  duration:"3 days", hasQuiz:true },
      { id:"chapter-05", title:"Introduction to JavaScript", topics:["Variables","Operators","Syntax"],   duration:"3 days", hasQuiz:true },
      { id:"chapter-06", title:"Database Concepts",          topics:["DBMS","Tables","Keys"],             duration:"2 days", hasQuiz:true },
      { id:"chapter-07", title:"Introduction to SQL",        topics:["SELECT","INSERT","UPDATE","DELETE"],duration:"3 days", hasQuiz:true },
      { id:"chapter-08", title:"Cyber Safety",                topics:["Internet Safety","Digital Footprint"], duration:"2 days", hasQuiz:true },
    ],
  },
  sanskrit: {
    name: "Sanskrit", description: "NCERT Class 10 Sanskrit — Shemushi textbook with grammar and composition.",
    totalChapters: 9, duration: "22 days", hasSimulation: false, color: "yellow",
    chapters: [
      { id:"chapter-01", title:"शुचिपर्यावरणम् (Shemushi)",       topics:["पर्यावरण संरक्षण"],       duration:"2 days", hasQuiz:true },
      { id:"chapter-02", title:"बुद्धिर्बलवती सदा (Shemushi)",    topics:["बुद्धि का महत्व"],         duration:"2 days", hasQuiz:true },
      { id:"chapter-03", title:"व्यायामः सर्वदा पथ्यः (Shemushi)",topics:["व्यायाम का महत्व"],       duration:"2 days", hasQuiz:true },
      { id:"chapter-04", title:"शब्द रूप एवं धातु रूप",           topics:["संज्ञा रूप","क्रिया रूप"], duration:"3 days", hasQuiz:true },
      { id:"chapter-05", title:"संधि एवं समास",                   topics:["संधि","समास"],            duration:"3 days", hasQuiz:true },
      { id:"chapter-06", title:"कारक एवं विभक्ति",                topics:["कारक","विभक्ति"],          duration:"3 days", hasQuiz:true },
      { id:"chapter-07", title:"रचनात्मक कार्य — निबंध लेखन",     topics:["निबंध","पत्र लेखन"],       duration:"3 days", hasQuiz:true },
      { id:"chapter-08", title:"अपठित अवबोधन",                    topics:["गद्यांश","पद्यांश"],       duration:"2 days", hasQuiz:true },
      { id:"chapter-09", title:"मौखिक अभिव्यक्ति",               topics:["संभाषण","मौखिक अभ्यास"],  duration:"1 day",  hasQuiz:true },
    ],
  },
};

/* ─── Fallback for unknown subjects ─────────────────────────────────────── */
function getSubjectData(slug: string) {
  return SUBJECT_DATA[slug] ?? {
    name:          slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
    description:   `Complete NCERT Class 10 ${slug} curriculum with structured lessons and practice.`,
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
const COLOR_MAP: Record<string, { bg: string; border: string; text: string; gradient: string }> = {
  blue:    { bg:"bg-blue-500/10",    border:"border-blue-500/20",    text:"text-blue-600 dark:text-blue-400",    gradient:"from-blue-500 to-cyan-500"    },
  green:   { bg:"bg-green-500/10",   border:"border-green-500/20",   text:"text-green-600 dark:text-green-400",  gradient:"from-green-500 to-emerald-500" },
  cyan:    { bg:"bg-cyan-500/10",    border:"border-cyan-500/20",    text:"text-cyan-600 dark:text-cyan-400",    gradient:"from-cyan-500 to-blue-500"    },
  purple:  { bg:"bg-purple-500/10",  border:"border-purple-500/20",  text:"text-purple-600 dark:text-purple-400",gradient:"from-purple-500 to-violet-500" },
  emerald: { bg:"bg-emerald-500/10", border:"border-emerald-500/20", text:"text-emerald-600 dark:text-emerald-400", gradient:"from-emerald-500 to-green-500" },
  orange:  { bg:"bg-orange-500/10",  border:"border-orange-500/20",  text:"text-orange-600 dark:text-orange-400",gradient:"from-orange-500 to-amber-500"  },
  rose:    { bg:"bg-rose-500/10",    border:"border-rose-500/20",    text:"text-rose-600 dark:text-rose-400",    gradient:"from-rose-500 to-pink-500"    },
  red:     { bg:"bg-red-500/10",     border:"border-red-500/20",     text:"text-red-600 dark:text-red-400",      gradient:"from-red-500 to-rose-500"     },
  indigo:  { bg:"bg-indigo-500/10",  border:"border-indigo-500/20",  text:"text-indigo-600 dark:text-indigo-400",gradient:"from-indigo-500 to-blue-500"  },
  yellow:  { bg:"bg-yellow-500/10",  border:"border-yellow-500/20",  text:"text-yellow-600 dark:text-yellow-400",gradient:"from-yellow-500 to-amber-500" },
};

/* ─── generateStaticParams ───────────────────────────────────────────────── */
export async function generateStaticParams() {
  return Object.keys(SUBJECT_DATA).map((subject) => ({ subject }));
}

/* ─── generateMetadata ───────────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string }>;
}): Promise<Metadata> {
  const { subject } = await params;
  const data = getSubjectData(subject);

  return {
    title:       `Class 10 ${data.name} — NCERT | LearnVeda`,
    description: data.description,
    keywords:    [`Class 10 ${data.name}`, `NCERT Class 10 ${data.name}`, "CBSE Class 10"],
  };
}

/* ─── Subject Page Component ─────────────────────────────────────────────── */
export default async function Class10SubjectPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject } = await params;
  const baseData   = getSubjectData(subject);
  const colors     = COLOR_MAP[baseData.color] ?? COLOR_MAP.indigo;

  const liveChapters = await getChapterList("class-10", subject);
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
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap">
            <Link href="/learn"          className="hover:text-foreground transition-colors">Learn</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/learn/class-10" className="hover:text-foreground transition-colors">Class 10</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">{data.name}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-2xl sm:text-3xl font-bold">Class 10 — {data.name}</h1>
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
                <Link href={`/learn/class-10/${subject}/${data.chapters[0]?.id ?? "chapter-01"}`}>
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

      {/* ── Chapter List ─────────────────────────────────────────────────── */}
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
              href={`/learn/class-10/${subject}/${chapter.id}`}
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
