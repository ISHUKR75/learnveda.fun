/**
 * @file app/(platform)/semester/[n]/page.tsx
 * @description BTech semester detail page — subjects, syllabus, and resources
 * Route: /semester/[n]  (e.g. /semester/1 through /semester/8)
 * Shows complete syllabus, recommended resources, and previous year question trends
 */

import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen, ChevronRight, Clock, Code2, ArrowRight,
  Star, GraduationCap, FileText, Target,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* ─── Semester Data ──────────────────────────────────────────────────────── */
// Complete 8-semester BTech CSE syllabus (Anna University / IP University aligned)
const SEMESTER_DATA: Record<string, {
  semesterNum: number;
  title:       string;
  focus:       string;
  subjects: {
    code:    string;
    name:    string;
    credits: number;
    type:    "theory" | "lab" | "project";
    href:    string;
    topics:  string[];
  }[];
  importantTopics: string[];
  prevYearTrends:  string[];
}> = {
  "1": {
    semesterNum: 1,
    title:       "Semester 1",
    focus:       "Engineering Foundation",
    subjects: [
      { code:"MA101", name:"Engineering Mathematics I (Calculus)", credits:4, type:"theory",  href:"/learn/engineering", topics:["Limits & Continuity","Differentiation","Integration","Sequences & Series"] },
      { code:"PH101", name:"Engineering Physics",                  credits:4, type:"theory",  href:"/simulations/physics",topics:["Mechanics","Optics","Thermodynamics","Quantum Physics"] },
      { code:"CS101", name:"Introduction to Programming (C)",      credits:3, type:"theory",  href:"/programming/c",     topics:["Variables & Data Types","Loops","Arrays","Pointers","Functions"] },
      { code:"CS102", name:"Programming Lab (C)",                  credits:2, type:"lab",     href:"/programming/c",     topics:["Writing C programs","Debugging","File I/O"] },
      { code:"EG101", name:"Engineering Graphics",                 credits:3, type:"theory",  href:"/learn/engineering", topics:["Orthographic Projection","Isometric Views","CAD Basics"] },
      { code:"HS101", name:"Professional English I",               credits:2, type:"theory",  href:"/learn/class-12",    topics:["Technical Writing","Communication Skills","Presentation"] },
    ],
    importantTopics: ["Pointers in C","Integration techniques","Newton's Laws of Motion","Orthographic projection","Taylor series"],
    prevYearTrends:  ["Calculus is 40% of Maths I paper","Arrays & Pointers asked every year","Engineering Physics numericals from Optics and Mechanics"],
  },
  "2": {
    semesterNum: 2,
    title:       "Semester 2",
    focus:       "Core Computer Science",
    subjects: [
      { code:"MA201", name:"Engineering Mathematics II (Linear Algebra + Probability)", credits:4, type:"theory", href:"/learn/engineering", topics:["Matrices","Eigenvalues","Probability","Statistics"] },
      { code:"CS201", name:"Data Structures",                      credits:4, type:"theory", href:"/programming/dsa",   topics:["Arrays","Linked Lists","Stacks","Queues","Trees","Sorting"] },
      { code:"CS202", name:"Object Oriented Programming (Java/C++)",credits:4, type:"theory", href:"/programming/java",  topics:["Classes","Inheritance","Polymorphism","Exception Handling"] },
      { code:"CS203", name:"OOP Lab",                              credits:2, type:"lab",    href:"/programming/java",  topics:["Java programs","OOP patterns","GUI basics"] },
      { code:"DS201", name:"Digital Logic & Circuits",             credits:4, type:"theory", href:"/learn/engineering", topics:["Boolean Algebra","Logic Gates","Flip-Flops","Multiplexers"] },
      { code:"HS201", name:"Professional English II",              credits:2, type:"theory", href:"/learn/class-12",    topics:["Group Discussion","Technical Reports","Email Writing"] },
    ],
    importantTopics: ["AVL Trees","B-Trees","Inheritance vs Composition","Matrix rank & eigenvalues","Karnaugh Maps"],
    prevYearTrends:  ["Trees (BST, AVL) asked in 60% papers","OOP design patterns frequently tested","Linear Algebra has fixed formula-based questions"],
  },
  "3": {
    semesterNum: 3,
    title:       "Semester 3",
    focus:       "Algorithm Design & Systems",
    subjects: [
      { code:"CS301", name:"Design and Analysis of Algorithms",    credits:4, type:"theory", href:"/programming/dsa",          topics:["Sorting algorithms","Greedy","Dynamic Programming","Graph algorithms"] },
      { code:"CS302", name:"Database Management Systems",          credits:4, type:"theory", href:"/programming/dbms",         topics:["ER Model","SQL","Normalization","Transactions","ACID"] },
      { code:"CS303", name:"Computer Organization & Architecture", credits:4, type:"theory", href:"/learn/engineering",        topics:["CPU design","Cache memory","Pipelining","Instruction sets"] },
      { code:"MA301", name:"Discrete Mathematics",                 credits:4, type:"theory", href:"/learn/engineering",        topics:["Set theory","Graph theory","Logic","Combinatorics","Recurrences"] },
      { code:"CS304", name:"DBMS Lab",                             credits:2, type:"lab",    href:"/programming/dbms",         topics:["SQL queries","Stored procedures","Database design"] },
    ],
    importantTopics: ["Dijkstra's Algorithm","DP (knapsack, LCS, matrix chain)","3NF & BCNF","SQL joins","Cache replacement policies"],
    prevYearTrends:  ["Algorithms has 50% DP + Graph problems","DBMS normalization asked every semester","Computer Architecture: pipelining is always tested"],
  },
  "4": {
    semesterNum: 4,
    title:       "Semester 4",
    focus:       "Operating Systems & Networks",
    subjects: [
      { code:"CS401", name:"Operating Systems",                    credits:4, type:"theory", href:"/programming/os",           topics:["Process management","CPU scheduling","Memory management","Deadlocks","File systems"] },
      { code:"CS402", name:"Theory of Computation",               credits:4, type:"theory", href:"/learn/engineering",        topics:["Finite Automata","Regular expressions","CFG","Turing Machines","Decidability"] },
      { code:"CS403", name:"Computer Networks",                   credits:4, type:"theory", href:"/programming/computer-networks",topics:["OSI model","TCP/IP","DNS","Routing","HTTP","TCP vs UDP"] },
      { code:"CS404", name:"Software Engineering",                credits:3, type:"theory", href:"/learn/engineering",        topics:["SDLC","Agile","UML","Testing","Design Patterns"] },
      { code:"CS405", name:"OS & Networks Lab",                   credits:2, type:"lab",    href:"/learn/engineering",        topics:["Shell scripting","Socket programming","Packet analysis"] },
    ],
    importantTopics: ["CPU scheduling algorithms","Page replacement algorithms","OSI layers","Turing Machine proofs","UML diagrams"],
    prevYearTrends:  ["OS has heavy numerical questions on scheduling & memory","TOC proofs from DFA/NFA/PDA asked every year","Networks: TCP handshake, DNS always asked"],
  },
  "5": {
    semesterNum: 5,
    title:       "Semester 5",
    focus:       "Advanced Specializations",
    subjects: [
      { code:"CS501", name:"Compiler Design",                     credits:4, type:"theory", href:"/learn/engineering",        topics:["Lexical analysis","Parsing","Semantic analysis","Code generation"] },
      { code:"CS502", name:"Artificial Intelligence",             credits:4, type:"theory", href:"/learn/engineering",        topics:["Search algorithms","Machine Learning basics","Neural networks","NLP"] },
      { code:"CS503", name:"Web Technologies",                    credits:3, type:"theory", href:"/programming/javascript",   topics:["HTML/CSS","JavaScript","React","REST APIs","Node.js"] },
      { code:"CS504", name:"Elective I",                         credits:4, type:"theory", href:"/learn/engineering",        topics:["IoT / Mobile Dev / Cloud Computing / Cyber Security"] },
      { code:"CS505", name:"Web Tech Lab",                        credits:2, type:"lab",    href:"/programming/javascript",   topics:["Build a full-stack web application"] },
    ],
    importantTopics: ["LL & LR parsers","A* search","Backpropagation","REST API design","Dependency Injection"],
    prevYearTrends:  ["Compiler Design: First/Follow set problems always appear","AI: Search algorithms heavily weighted","Web Tech lab: CRUD application mandatory project"],
  },
  "6": {
    semesterNum: 6,
    title:       "Semester 6",
    focus:       "Distributed Systems & Cloud",
    subjects: [
      { code:"CS601", name:"Distributed Systems",                 credits:4, type:"theory", href:"/learn/engineering",        topics:["CAP theorem","Consistency","Replication","Consensus (Raft, Paxos)"] },
      { code:"CS602", name:"Cloud Computing",                     credits:4, type:"theory", href:"/learn/engineering",        topics:["AWS/Azure services","Virtualization","Containers","Microservices"] },
      { code:"CS603", name:"Machine Learning",                    credits:4, type:"theory", href:"/learn/engineering",        topics:["Supervised/Unsupervised","SVM","Decision Trees","Neural Networks"] },
      { code:"CS604", name:"Elective II",                        credits:4, type:"theory", href:"/learn/engineering",        topics:["Computer Vision / NLP / Blockchain / AR-VR"] },
      { code:"CS605", name:"Mini Project",                        credits:4, type:"project",href:"/learn/engineering",        topics:["Group project with report and presentation"] },
    ],
    importantTopics: ["CAP theorem","Docker & Kubernetes","Gradient Descent","Microservices architecture"],
    prevYearTrends:  ["Distributed Systems: CAP theorem case studies always asked","ML: gradient descent derivation is compulsory"],
  },
  "7": {
    semesterNum: 7,
    title:       "Semester 7",
    focus:       "Industry Preparation",
    subjects: [
      { code:"CS701", name:"Big Data Analytics",                  credits:4, type:"theory", href:"/learn/engineering",        topics:["Hadoop","Spark","MapReduce","Data warehousing"] },
      { code:"CS702", name:"Deep Learning",                       credits:4, type:"theory", href:"/learn/engineering",        topics:["CNN","RNN","LSTM","Transformers","BERT","GANs"] },
      { code:"CS703", name:"Elective III",                       credits:4, type:"theory", href:"/learn/engineering",        topics:["Quantum Computing / Edge Computing / Robotics"] },
      { code:"CS704", name:"Industry Internship",                 credits:6, type:"project",href:"/learn/engineering",        topics:["6-month internship at a tech company"] },
    ],
    importantTopics: ["MapReduce algorithm","CNN architecture","Transformer attention mechanism","Industry project design"],
    prevYearTrends:  ["Deep Learning: Transformer architecture papers now commonly cited","Internship reflection report is 40% of grade"],
  },
  "8": {
    semesterNum: 8,
    title:       "Semester 8",
    focus:       "Capstone & Placement",
    subjects: [
      { code:"CS801", name:"Capstone Project",                    credits:12, type:"project",href:"/learn/engineering",       topics:["Full stack project","Research paper","Industry collaboration"] },
      { code:"CS802", name:"Elective IV",                        credits:4,  type:"theory", href:"/learn/engineering",       topics:["Choose any advanced elective"] },
      { code:"CS803", name:"Placement Preparation",              credits:2,  type:"theory", href:"/programming/dsa",         topics:["DSA revision","System Design","HR interview","Resume"] },
      { code:"CS804", name:"Professional Ethics",                credits:2,  type:"theory", href:"/learn/engineering",       topics:["IP rights","Cyber law","Professional conduct","IEEE ethics"] },
    ],
    importantTopics: ["System Design interviews","Behavioral interview","Capstone documentation","Open source contribution"],
    prevYearTrends:  ["Capstone projects judged on novelty + implementation","Companies prioritize DSA + System Design in final placement"],
  },
};

/* ─── generateMetadata ───────────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ n: string }>;
}): Promise<Metadata> {
  const { n } = await params;
  const data   = SEMESTER_DATA[n];
  if (!data) return { title: "Semester — LearnVeda" };
  return {
    title:       `BTech CSE Semester ${n} — ${data.title} | LearnVeda`,
    description: `Complete syllabus for BTech CSE Semester ${n} — ${data.subjects.map((s) => s.name).join(", ")}`,
  };
}

/* ─── Semester Detail Page ───────────────────────────────────────────────── */
export default async function SemesterPage({
  params,
}: {
  params: Promise<{ n: string }>;
}) {
  const { n } = await params;
  const data  = SEMESTER_DATA[n];

  // Fallback for semesters not in data
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl font-bold mb-4">Semester {n}</div>
          <p className="text-muted-foreground mb-6">Syllabus coming soon</p>
          <Button asChild><Link href="/learn/engineering">← Back to Engineering</Link></Button>
        </div>
      </div>
    );
  }

  const totalCredits = data.subjects.reduce((a, s) => a + s.credits, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="border-b bg-gradient-to-br from-cyan-500/5 to-background">
        <div className="container px-4 py-10">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/learn"             className="hover:text-foreground transition-colors">Learn</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/learn/engineering" className="hover:text-foreground transition-colors">Engineering</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">Semester {n}</span>
          </nav>

          <div className="flex items-start gap-4 mb-6">
            <div className="h-14 w-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-2xl font-bold text-primary shrink-0">
              S{n}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-bold">BTech CSE — {data.title}</h1>
                <Badge className="text-xs bg-cyan-500/10 text-cyan-600 border-cyan-500/20">{data.focus}</Badge>
              </div>
              <p className="text-muted-foreground">
                {data.subjects.length} subjects · {totalCredits} total credits
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-sm">
            <div className="rounded-xl border bg-card/50 p-3 text-center">
              <div className="font-bold">{data.subjects.filter((s) => s.type === "theory").length}</div>
              <div className="text-[11px] text-muted-foreground">Theory</div>
            </div>
            <div className="rounded-xl border bg-card/50 p-3 text-center">
              <div className="font-bold">{data.subjects.filter((s) => s.type === "lab").length}</div>
              <div className="text-[11px] text-muted-foreground">Lab / Project</div>
            </div>
            <div className="rounded-xl border bg-card/50 p-3 text-center">
              <div className="font-bold">{totalCredits}</div>
              <div className="text-[11px] text-muted-foreground">Credits</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ─── Subjects List ─────────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold">Subjects</h2>

            {data.subjects.map((subject) => (
              <Link
                key={subject.code}
                href={subject.href}
                className="group block rounded-2xl border bg-card hover:shadow-md transition-all p-5"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-[10px] font-mono">{subject.code}</Badge>
                    <Badge
                      className={`text-[9px] py-0 ${
                        subject.type === "project"
                          ? "bg-purple-500/10 text-purple-600 border-purple-500/20"
                          : subject.type === "lab"
                          ? "bg-green-500/10 text-green-600 border-green-500/20"
                          : "bg-blue-500/10 text-blue-600 border-blue-500/20"
                      }`}
                    >
                      {subject.type.charAt(0).toUpperCase() + subject.type.slice(1)}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-muted-foreground">{subject.credits} cr</span>
                    <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>

                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                  {subject.name}
                </h3>

                <div className="flex flex-wrap gap-1">
                  {subject.topics.map((t) => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>

          {/* ─── Sidebar ─────────────────────────────────────────────── */}
          <div className="space-y-4">
            {/* Important topics */}
            <div className="rounded-2xl border bg-card p-5">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Star className="h-4 w-4 text-amber-500" />
                Key Topics to Master
              </h3>
              <ul className="space-y-2">
                {data.importantTopics.map((t, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Target className="h-3.5 w-3.5 text-primary shrink-0" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            {/* Exam trends */}
            <div className="rounded-2xl border bg-amber-500/5 border-amber-500/20 p-5">
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-amber-700 dark:text-amber-400">
                <FileText className="h-4 w-4" />
                Previous Year Exam Trends
              </h3>
              <ul className="space-y-2">
                {data.prevYearTrends.map((t, i) => (
                  <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                    <span className="text-amber-500 font-bold shrink-0">→</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            {/* Navigation to other semesters */}
            <div className="rounded-2xl border bg-card p-5">
              <h3 className="font-semibold text-sm mb-3">All Semesters</h3>
              <div className="grid grid-cols-4 gap-2">
                {[1,2,3,4,5,6,7,8].map((sem) => (
                  <Link
                    key={sem}
                    href={`/semester/${sem}`}
                    className={`h-9 rounded-lg flex items-center justify-center text-sm font-medium border transition-colors ${
                      sem === parseInt(n)
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-muted hover:bg-muted/80 text-muted-foreground"
                    }`}
                  >
                    S{sem}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
