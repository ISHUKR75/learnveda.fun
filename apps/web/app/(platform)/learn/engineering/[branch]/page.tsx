/**
 * @file app/(platform)/learn/engineering/[branch]/page.tsx
 * @description Engineering branch detail page — shows semesters and subject list
 * Route: /learn/engineering/[branch] (e.g. /learn/engineering/cse)
 * @purpose Dedicated page for each engineering branch with semester navigation
 */

"use client";

import React, { useState } from "react";
import Link               from "next/link";
import { motion }         from "framer-motion";
import {
  Code2, Cpu, Zap, Building2, Cog, FlaskConical, Brain,
  BarChart2, Globe, ChevronRight, BookOpen, Download,
  Play, Award, Users, Clock, Star, GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge }  from "@/components/ui/badge";
import { cn }     from "@/lib/utils";
import { notFound, useParams } from "next/navigation";

/* ─── Branch Metadata ───────────────────────────────────────────────────── */
const BRANCH_META = {
  cse: {
    label: "Computer Science Engineering", short: "CSE",
    icon: Code2, color: "from-blue-500 to-cyan-500",
    bg: "bg-blue-500/10", border: "border-blue-500/20", text: "text-blue-600 dark:text-blue-400",
    description: "Algorithms, OS, DBMS, Computer Networks, Software Engineering, AI/ML",
    students: 12400, rating: 4.9,
    keySubjects: ["Data Structures & Algorithms", "DBMS", "Operating Systems", "Computer Networks", "AI/ML", "Software Engineering"],
    outcomes: ["Software Developer", "System Architect", "ML Engineer", "Product Manager", "Tech Lead"],
  },
  ece: {
    label: "Electronics & Communication Engineering", short: "ECE",
    icon: Cpu, color: "from-purple-500 to-violet-500",
    bg: "bg-purple-500/10", border: "border-purple-500/20", text: "text-purple-600 dark:text-purple-400",
    description: "Signals & Systems, VLSI Design, Embedded Systems, Digital Communication, Control Systems",
    students: 8200, rating: 4.7,
    keySubjects: ["Signals & Systems", "VLSI Design", "Microprocessors", "Digital Communication", "Control Systems", "Antenna Theory"],
    outcomes: ["VLSI Designer", "Embedded Systems Engineer", "RF Engineer", "Telecom Engineer", "Hardware Designer"],
  },
  eee: {
    label: "Electrical & Electronics Engineering", short: "EEE",
    icon: Zap, color: "from-yellow-500 to-amber-500",
    bg: "bg-yellow-500/10", border: "border-yellow-500/20", text: "text-yellow-600 dark:text-yellow-400",
    description: "Power Systems, Electrical Machines, Control Systems, Power Electronics, Smart Grid",
    students: 5800, rating: 4.6,
    keySubjects: ["Power Systems", "Electrical Machines", "Control Systems", "Power Electronics", "Instrumentation", "High Voltage"],
    outcomes: ["Power Systems Engineer", "Control Engineer", "Energy Consultant", "Grid Engineer", "Instrumentation Engineer"],
  },
  civil: {
    label: "Civil Engineering", short: "Civil",
    icon: Building2, color: "from-stone-500 to-slate-500",
    bg: "bg-stone-500/10", border: "border-stone-500/20", text: "text-stone-600 dark:text-stone-400",
    description: "Structural Analysis, Geotechnical Engineering, Transportation, Environmental, Construction",
    students: 4200, rating: 4.5,
    keySubjects: ["Structural Analysis", "Fluid Mechanics", "Soil Mechanics", "RCC Design", "Transportation Engineering", "Surveying"],
    outcomes: ["Structural Engineer", "Geotechnical Engineer", "Project Manager", "Site Engineer", "Urban Planner"],
  },
  mech: {
    label: "Mechanical Engineering", short: "Mech",
    icon: Cog, color: "from-orange-500 to-red-500",
    bg: "bg-orange-500/10", border: "border-orange-500/20", text: "text-orange-600 dark:text-orange-400",
    description: "Thermodynamics, Manufacturing, Fluid Mechanics, Design, CAD/CAM, Robotics",
    students: 6100, rating: 4.6,
    keySubjects: ["Thermodynamics", "Fluid Mechanics", "Manufacturing Processes", "Machine Design", "CAD/CAM", "Heat Transfer"],
    outcomes: ["Design Engineer", "Manufacturing Engineer", "Automotive Engineer", "R&D Engineer", "Production Manager"],
  },
  chemical: {
    label: "Chemical Engineering", short: "Chem E",
    icon: FlaskConical, color: "from-green-500 to-teal-500",
    bg: "bg-green-500/10", border: "border-green-500/20", text: "text-green-600 dark:text-green-400",
    description: "Process Design, Reaction Engineering, Transport Phenomena, Process Control, Safety",
    students: 2800, rating: 4.5,
    keySubjects: ["Chemical Thermodynamics", "Mass Transfer", "Heat Transfer", "Reaction Engineering", "Process Control", "Petrochemicals"],
    outcomes: ["Process Engineer", "Safety Engineer", "Plant Manager", "Research Scientist", "Environmental Engineer"],
  },
  aiml: {
    label: "Artificial Intelligence & Machine Learning", short: "AI/ML",
    icon: Brain, color: "from-pink-500 to-rose-500",
    bg: "bg-pink-500/10", border: "border-pink-500/20", text: "text-pink-600 dark:text-pink-400",
    description: "Machine Learning, Deep Learning, NLP, Computer Vision, MLOps, Generative AI",
    students: 9800, rating: 4.9,
    keySubjects: ["Machine Learning", "Deep Learning", "Natural Language Processing", "Computer Vision", "MLOps", "Generative AI"],
    outcomes: ["ML Engineer", "Data Scientist", "AI Researcher", "NLP Engineer", "Computer Vision Engineer"],
  },
  ds: {
    label: "Data Science", short: "DS",
    icon: BarChart2, color: "from-cyan-500 to-blue-500",
    bg: "bg-cyan-500/10", border: "border-cyan-500/20", text: "text-cyan-600 dark:text-cyan-400",
    description: "Statistics, Python/R, Data Engineering, Machine Learning, Big Data, Visualization",
    students: 7400, rating: 4.8,
    keySubjects: ["Statistics & Probability", "Python for Data Science", "Machine Learning", "SQL & Databases", "Big Data Technologies", "Data Visualization"],
    outcomes: ["Data Scientist", "Data Analyst", "Data Engineer", "Business Intelligence Analyst", "ML Engineer"],
  },
  it: {
    label: "Information Technology", short: "IT",
    icon: Globe, color: "from-indigo-500 to-blue-500",
    bg: "bg-indigo-500/10", border: "border-indigo-500/20", text: "text-indigo-600 dark:text-indigo-400",
    description: "Web Development, Cloud Computing, Cybersecurity, DevOps, Networking, IoT",
    students: 8900, rating: 4.7,
    keySubjects: ["Web Technologies", "Cloud Computing (AWS/Azure)", "Cybersecurity", "DevOps & CI/CD", "Database Management", "IoT & Networking"],
    outcomes: ["Full Stack Developer", "Cloud Architect", "Security Engineer", "DevOps Engineer", "Network Administrator"],
  },
} as const;

type BranchKey = keyof typeof BRANCH_META;

/* ─── Semester Data ─────────────────────────────────────────────────────── */
const SEMESTER_DATA: Record<BranchKey, Array<{ sem: number; subjects: string[]; credits: number }>> = {
  cse: [
    { sem: 1, credits: 24, subjects: ["Engineering Mathematics I", "Physics", "Programming in C", "English Communication", "Engineering Drawing"] },
    { sem: 2, credits: 24, subjects: ["Engineering Mathematics II", "Basic Electronics", "Data Structures", "OOP with Java", "Digital Logic"] },
    { sem: 3, credits: 24, subjects: ["Mathematics III", "Computer Architecture", "DBMS", "Operating Systems", "Theory of Computation"] },
    { sem: 4, credits: 24, subjects: ["Mathematics IV (Probability)", "Algorithms", "Computer Networks", "Software Engineering", "Microprocessors"] },
    { sem: 5, credits: 22, subjects: ["Compiler Design", "AI/ML Basics", "Web Technologies", "Information Security", "Open Elective I"] },
    { sem: 6, credits: 22, subjects: ["Cloud Computing", "Machine Learning Lab", "Mobile App Development", "Data Analytics", "Open Elective II"] },
    { sem: 7, credits: 20, subjects: ["Distributed Systems", "NLP", "Blockchain Technology", "Major Project I", "Professional Elective III"] },
    { sem: 8, credits: 20, subjects: ["Advanced CS Topics", "DevOps & CI/CD", "Research Methods", "Major Project II", "Industry Internship"] },
  ],
  ece: [
    { sem: 1, credits: 24, subjects: ["Mathematics I", "Physics", "Basic Electronics", "English", "Engineering Drawing"] },
    { sem: 2, credits: 24, subjects: ["Mathematics II", "Circuit Theory", "Signals & Systems", "Electronic Devices", "Programming in C"] },
    { sem: 3, credits: 24, subjects: ["Mathematics III", "Digital Electronics", "Electronic Circuits", "EM Theory", "Measurements & Instruments"] },
    { sem: 4, credits: 24, subjects: ["Mathematics IV", "Control Systems", "Communication Theory", "Microprocessors", "VLSI Design Basics"] },
    { sem: 5, credits: 22, subjects: ["Digital Signal Processing", "Wireless Communication", "Embedded Systems", "Analog IC Design", "Elective I"] },
    { sem: 6, credits: 22, subjects: ["RF & Microwave", "Optical Fiber Communication", "MEMS & Nanotechnology", "DSP Lab", "Elective II"] },
    { sem: 7, credits: 20, subjects: ["Advanced VLSI", "5G NR Technology", "Radar & Navigation", "Major Project I", "Elective III"] },
    { sem: 8, credits: 20, subjects: ["IoT & Edge Computing", "Satellite Communication", "Advanced Control", "Major Project II", "Industry Training"] },
  ],
  eee: [
    { sem: 1, credits: 24, subjects: ["Mathematics I", "Physics", "Basic Electrical Engineering", "English", "Engineering Drawing"] },
    { sem: 2, credits: 24, subjects: ["Mathematics II", "Circuit Analysis", "Electronic Devices", "Electrical Materials", "Engineering Mechanics"] },
    { sem: 3, credits: 24, subjects: ["Mathematics III", "DC Machines", "Electrical Measurements", "Analog Electronics", "Digital Systems"] },
    { sem: 4, credits: 24, subjects: ["Mathematics IV", "AC Machines", "Control Systems", "Power Electronics Basics", "Signals & Systems"] },
    { sem: 5, credits: 22, subjects: ["Power Systems I", "Power Electronics", "Electrical Drives", "Switchgear & Protection", "Elective I"] },
    { sem: 6, credits: 22, subjects: ["Power Systems II", "High Voltage Engineering", "Power Quality", "PLC & SCADA", "Elective II"] },
    { sem: 7, credits: 20, subjects: ["Smart Grid & Renewable Energy", "Flexible AC Transmission", "FACTS Devices", "Major Project I", "Elective III"] },
    { sem: 8, credits: 20, subjects: ["Power System Planning", "Electric Vehicles", "Energy Auditing", "Major Project II", "Industry Training"] },
  ],
  civil: [
    { sem: 1, credits: 24, subjects: ["Mathematics I", "Physics", "Engineering Mechanics", "English", "Engineering Drawing"] },
    { sem: 2, credits: 24, subjects: ["Mathematics II", "Strength of Materials", "Building Materials", "Fluid Mechanics I", "Surveying I"] },
    { sem: 3, credits: 24, subjects: ["Mathematics III", "Structural Analysis I", "Fluid Mechanics II", "Soil Mechanics", "Surveying II"] },
    { sem: 4, credits: 24, subjects: ["Mathematics IV", "Structural Analysis II", "Geotechnical Engineering", "Environmental Engineering", "Hydraulics"] },
    { sem: 5, credits: 22, subjects: ["RCC Design", "Foundation Engineering", "Transportation Engineering I", "Water Resource Engineering", "Elective I"] },
    { sem: 6, credits: 22, subjects: ["Steel Design", "Pre-stressed Concrete", "Transportation Engineering II", "Water Treatment", "Elective II"] },
    { sem: 7, credits: 20, subjects: ["Advanced Structural Design", "GIS & Remote Sensing", "Construction Management", "Major Project I", "Elective III"] },
    { sem: 8, credits: 20, subjects: ["Advanced Geotechnical", "Smart Cities", "Disaster Management", "Major Project II", "Industry Training"] },
  ],
  mech: [
    { sem: 1, credits: 24, subjects: ["Mathematics I", "Physics", "Engineering Mechanics", "English", "Engineering Drawing"] },
    { sem: 2, credits: 24, subjects: ["Mathematics II", "Thermodynamics I", "Material Science", "Workshop Practice", "Fluid Mechanics I"] },
    { sem: 3, credits: 24, subjects: ["Mathematics III", "Strength of Materials", "Thermodynamics II", "Fluid Mechanics II", "Kinematics"] },
    { sem: 4, credits: 24, subjects: ["Mathematics IV", "Machine Design I", "Manufacturing Processes I", "Heat Transfer", "Theory of Machines"] },
    { sem: 5, credits: 22, subjects: ["Machine Design II", "Manufacturing Processes II", "Dynamics of Machines", "Industrial Engineering", "Elective I"] },
    { sem: 6, credits: 22, subjects: ["CAD/CAM", "Refrigeration & Air Conditioning", "Metrology", "Robotics & Automation", "Elective II"] },
    { sem: 7, credits: 20, subjects: ["FEA & Simulation", "Automotive Engineering", "IC Engines", "Major Project I", "Elective III"] },
    { sem: 8, credits: 20, subjects: ["Rapid Prototyping", "Energy Systems", "Operations Research", "Major Project II", "Industry Training"] },
  ],
  chemical: [
    { sem: 1, credits: 24, subjects: ["Mathematics I", "Chemistry", "Physics", "English", "Introduction to Chemical Engineering"] },
    { sem: 2, credits: 24, subjects: ["Mathematics II", "Chemical Thermodynamics I", "Fluid Mechanics", "Organic Chemistry", "Numerical Methods"] },
    { sem: 3, credits: 24, subjects: ["Mathematics III", "Chemical Thermodynamics II", "Heat Transfer", "Mass Transfer I", "Chemical Reaction Engineering I"] },
    { sem: 4, credits: 24, subjects: ["Mathematics IV", "Mass Transfer II", "Chemical Reaction Engineering II", "Process Control", "Process Economics"] },
    { sem: 5, credits: 22, subjects: ["Process Design I", "Separation Processes", "Polymer Technology", "Safety & Hazard", "Elective I"] },
    { sem: 6, credits: 22, subjects: ["Process Design II", "Petrochemical Technology", "Environmental Engineering", "Biochemical Engineering", "Elective II"] },
    { sem: 7, credits: 20, subjects: ["Advanced Process Control", "Nanotechnology", "Petroleum Refinery", "Major Project I", "Elective III"] },
    { sem: 8, credits: 20, subjects: ["Pharmaceutical Processes", "Sustainable Engineering", "Plant Design", "Major Project II", "Industry Internship"] },
  ],
  aiml: [
    { sem: 1, credits: 24, subjects: ["Mathematics I (Linear Algebra)", "Statistics I", "Python Programming", "English", "Introduction to AI"] },
    { sem: 2, credits: 24, subjects: ["Mathematics II (Calculus)", "Statistics II (Probability)", "Data Structures", "Algorithms", "Database Fundamentals"] },
    { sem: 3, credits: 24, subjects: ["Machine Learning I", "Deep Learning Basics", "Data Mining", "Computer Vision I", "Big Data Technologies"] },
    { sem: 4, credits: 24, subjects: ["Machine Learning II", "Deep Learning Advanced", "Natural Language Processing I", "Reinforcement Learning", "Cloud for AI"] },
    { sem: 5, credits: 22, subjects: ["NLP II", "Computer Vision II", "Generative AI", "MLOps & Deployment", "Elective I"] },
    { sem: 6, credits: 22, subjects: ["Explainable AI", "AI Ethics & Fairness", "Recommendation Systems", "Graph Neural Networks", "Elective II"] },
    { sem: 7, credits: 20, subjects: ["Research Methodology", "Advanced NLP", "AI in Healthcare", "Major Project I", "Elective III"] },
    { sem: 8, credits: 20, subjects: ["LLMs & Foundation Models", "AI Systems Design", "Industry Applications", "Major Project II", "Research Internship"] },
  ],
  ds: [
    { sem: 1, credits: 24, subjects: ["Mathematics I", "Statistics I", "Python Fundamentals", "English", "Introduction to Data Science"] },
    { sem: 2, credits: 24, subjects: ["Mathematics II", "Statistics II", "Data Structures", "SQL & Databases", "R Programming"] },
    { sem: 3, credits: 24, subjects: ["Probability Theory", "Data Wrangling & EDA", "Machine Learning I", "Data Visualization", "NoSQL Databases"] },
    { sem: 4, credits: 24, subjects: ["Statistical Inference", "Machine Learning II", "Time Series Analysis", "Big Data (Hadoop/Spark)", "Data Warehousing"] },
    { sem: 5, credits: 22, subjects: ["Deep Learning", "NLP for Data Science", "Business Intelligence", "Data Pipeline Engineering", "Elective I"] },
    { sem: 6, credits: 22, subjects: ["MLOps", "Graph Analytics", "Geospatial Data", "Cloud Data Platforms", "Elective II"] },
    { sem: 7, credits: 20, subjects: ["Advanced Analytics", "Data Governance", "Causal Inference", "Major Project I", "Elective III"] },
    { sem: 8, credits: 20, subjects: ["AI Product Design", "Real-time Data Systems", "Research Seminar", "Major Project II", "Industry Internship"] },
  ],
  it: [
    { sem: 1, credits: 24, subjects: ["Mathematics I", "Physics", "Intro to IT & Web", "English", "Discrete Mathematics"] },
    { sem: 2, credits: 24, subjects: ["Mathematics II", "Data Structures", "Object-Oriented Programming", "Computer Networks I", "Digital Logic"] },
    { sem: 3, credits: 24, subjects: ["Database Management", "Computer Networks II", "Operating Systems", "Web Development I", "Software Engineering"] },
    { sem: 4, credits: 24, subjects: ["Algorithms", "Network Security", "Web Development II (React)", "Cloud Computing I", "System Administration"] },
    { sem: 5, credits: 22, subjects: ["Cybersecurity", "DevOps & CI/CD", "Mobile App Development", "Microservices & APIs", "Elective I"] },
    { sem: 6, credits: 22, subjects: ["Cloud Architecture (AWS/Azure)", "Machine Learning for IT", "Blockchain Applications", "IoT Systems", "Elective II"] },
    { sem: 7, credits: 20, subjects: ["Distributed Computing", "AI/ML Integration", "Enterprise IT Systems", "Major Project I", "Elective III"] },
    { sem: 8, credits: 20, subjects: ["Zero Trust Security", "Kubernetes & Containers", "IT Governance", "Major Project II", "Industry Internship"] },
  ],
};

/* ─── Branch Page Component ─────────────────────────────────────────────── */
export default function EngineeringBranchPage() {
  const params = useParams<{ branch: string }>();
  const branch = params.branch as BranchKey;
  const meta   = BRANCH_META[branch];

  const [activeSem, setActiveSem] = useState<number | null>(null);

  if (!meta) { notFound(); return null; }

  const semesters = SEMESTER_DATA[branch];
  const Icon      = meta.icon;

  return (
    <div className="min-h-screen bg-background">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className={cn("border-b", meta.bg)}>
        <div className="container px-4 md:px-6 py-10 max-w-6xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/learn"            className="hover:text-foreground">Learn</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/learn/engineering" className="hover:text-foreground">Engineering</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className={cn("font-semibold", meta.text)}>{meta.short}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-start gap-6 mb-8">
            <div className={cn("flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border", meta.bg, meta.border)}>
              <Icon className={cn("h-8 w-8", meta.text)} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-bold">{meta.label}</h1>
                <Badge className={cn("text-xs", meta.bg, meta.border, meta.text)}>{meta.short}</Badge>
              </div>
              <p className="text-muted-foreground mb-4 max-w-3xl">{meta.description}</p>
              <div className="flex flex-wrap gap-2">
                {meta.keySubjects.map((s) => (
                  <span key={s} className={cn("rounded-full border px-3 py-0.5 text-xs font-medium", meta.bg, meta.border, meta.text)}>{s}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Students",   value: meta.students.toLocaleString(), icon: Users  },
              { label: "Semesters",  value: "8",                            icon: Clock  },
              { label: "Rating",     value: `${meta.rating}/5`,             icon: Star   },
              { label: "Subjects",   value: "40+",                          icon: BookOpen },
            ].map((s) => (
              <div key={s.label} className={cn("rounded-xl border p-3 flex items-center gap-3", meta.bg, meta.border)}>
                <s.icon className={cn("h-5 w-5 shrink-0", meta.text)} />
                <div>
                  <div className={cn("font-bold", meta.text)}>{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Body ────────────────────────────────────────────────────────── */}
      <div className="container px-4 md:px-6 py-8 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Semester List */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <GraduationCap className={cn("h-5 w-5", meta.text)} />
              <h2 className="text-lg font-bold">Semester Curriculum</h2>
            </div>

            <div className="space-y-3">
              {semesters.map((semData, i) => (
                <motion.div
                  key={semData.sem}
                  initial={{ opacity: 0.01, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {/* Accordion row — structured as a div to avoid nested button/link issues */}
                  <div
                    className={cn(
                      "rounded-xl border transition-all",
                      activeSem === semData.sem
                        ? cn("shadow-md", meta.bg, meta.border)
                        : "bg-card border-border",
                    )}
                  >
                    {/* Toggle header — the only interactive element for expanding */}
                    <button
                      type="button"
                      aria-expanded={activeSem === semData.sem}
                      onClick={() => setActiveSem(activeSem === semData.sem ? null : semData.sem)}
                      className="w-full p-4 text-left flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn("h-9 w-9 rounded-lg border flex items-center justify-center text-sm font-bold shrink-0", meta.bg, meta.border, meta.text)}>
                          S{semData.sem}
                        </div>
                        <div>
                          <div className={cn("font-semibold text-sm", activeSem === semData.sem ? meta.text : "text-foreground")}>
                            Semester {semData.sem}
                          </div>
                          <div className="text-xs text-muted-foreground">{semData.subjects.length} subjects · {semData.credits} credits</div>
                        </div>
                      </div>
                      <ChevronRight className={cn("h-4 w-4 text-muted-foreground transition-transform shrink-0", activeSem === semData.sem && "rotate-90")} />
                    </button>

                    {/* Expanded content — rendered outside the toggle button */}
                    {activeSem === semData.sem && (
                      <motion.div
                        initial={{ opacity: 0.01, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.2 }}
                        className="px-4 pb-4 grid sm:grid-cols-2 gap-2"
                      >
                        {semData.subjects.map((subj, idx) => (
                          <div
                            key={subj}
                            className="flex items-center gap-2.5 rounded-lg border border-border/50 bg-background/60 px-3 py-2.5 text-sm text-muted-foreground"
                          >
                            <span className={cn("text-xs font-mono font-bold shrink-0", meta.text)}>{idx + 1}</span>
                            <BookOpen className="h-3.5 w-3.5 shrink-0 text-muted-foreground/60" />
                            {subj}
                          </div>
                        ))}
                        {/* Navigation link placed outside any button element */}
                        <div className="sm:col-span-2 mt-2">
                          <Link
                            href={`/learn/engineering/${branch}/${semData.sem}`}
                            className={cn(
                              "flex items-center justify-center gap-2 w-full rounded-lg border px-4 py-2 text-sm font-medium transition-all hover:opacity-80",
                              meta.bg, meta.border, meta.text,
                            )}
                          >
                            <Play className="h-3.5 w-3.5" />
                            Study Semester {semData.sem}
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Career Outcomes */}
            <div className={cn("rounded-2xl border p-5", meta.bg, meta.border)}>
              <div className="flex items-center gap-2 mb-4">
                <Award className={cn("h-4 w-4", meta.text)} />
                <h3 className={cn("font-semibold text-sm", meta.text)}>Career Outcomes</h3>
              </div>
              <ul className="space-y-2">
                {meta.outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ChevronRight className={cn("h-3.5 w-3.5 shrink-0", meta.text)} />
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>

            {/* Study Resources */}
            <div className="rounded-2xl border bg-card p-5">
              <h3 className="font-semibold text-sm mb-4">Study Resources</h3>
              <div className="space-y-2">
                {[
                  { label: "GATE Previous Year Papers",  icon: BookOpen,  href: "/test-center" },
                  { label: "Subject-wise Notes",          icon: Download,  href: "/notes"       },
                  { label: "Video Lectures",              icon: Play,      href: "/live-classes" },
                  { label: "Mock Tests",                  icon: Award,     href: "/test-center" },
                ].map((res) => {
                  const ResIcon = res.icon;
                  return (
                    <Link key={res.label} href={res.href}
                      className="flex items-center gap-3 rounded-xl border bg-background p-3 hover:shadow-sm transition-all group text-sm">
                      <ResIcon className={cn("h-4 w-4 shrink-0 group-hover:text-primary transition-colors", meta.text)} />
                      <span className="font-medium text-muted-foreground group-hover:text-foreground transition-colors">{res.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Back to All Branches */}
            <Link href="/learn/engineering">
              <Button variant="outline" className="w-full gap-2">
                <ChevronRight className="h-4 w-4 rotate-180" />
                All Engineering Branches
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
