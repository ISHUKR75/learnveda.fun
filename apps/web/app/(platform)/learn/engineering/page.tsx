/**
 * @file app/(platform)/learn/engineering/page.tsx
 * @description Engineering curriculum hub page
 * Route: /learn/engineering
 *
 * Shows all engineering branches with semester structure.
 * Each branch has 8 semesters with key subjects listed.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, GraduationCap, Cpu, Zap, Building2, Settings, FlaskConical, Brain, Globe2, Database } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title:       "Engineering Curriculum — LearnVeda",
  description: "Complete engineering study material for all branches: CSE, ECE, EEE, Civil, Mechanical, Chemical, AI, IT, Data Science. Semester-wise structure.",
};

/* ─── Engineering Branches ───────────────────────────────────────────────── */
const BRANCHES = [
  {
    slug:     "cse",
    title:    "Computer Science & Engineering",
    icon:     Cpu,
    color:    "bg-blue-500/10 text-blue-500",
    border:   "hover:border-blue-500/50",
    subjects: ["Data Structures & Algorithms", "Operating Systems", "DBMS", "Computer Networks", "System Design", "Compilers", "Theory of Computation"],
    careers:  ["Software Engineer", "Backend Developer", "ML Engineer", "System Architect"],
    semesters: 8,
  },
  {
    slug:     "ece",
    title:    "Electronics & Communication",
    icon:     Zap,
    color:    "bg-yellow-500/10 text-yellow-500",
    border:   "hover:border-yellow-500/50",
    subjects: ["Analog Electronics", "Digital Electronics", "Signals & Systems", "Communication Systems", "VLSI Design", "Embedded Systems"],
    careers:  ["VLSI Engineer", "Embedded Developer", "Communication Engineer", "IoT Engineer"],
    semesters: 8,
  },
  {
    slug:     "eee",
    title:    "Electrical & Electronics",
    icon:     Zap,
    color:    "bg-orange-500/10 text-orange-500",
    border:   "hover:border-orange-500/50",
    subjects: ["Circuit Theory", "Electrical Machines", "Power Systems", "Control Systems", "Power Electronics", "Renewable Energy"],
    careers:  ["Power Engineer", "Control Engineer", "Electrical Designer", "Energy Analyst"],
    semesters: 8,
  },
  {
    slug:     "mechanical",
    title:    "Mechanical Engineering",
    icon:     Settings,
    color:    "bg-gray-500/10 text-gray-500",
    border:   "hover:border-gray-500/50",
    subjects: ["Engineering Mechanics", "Thermodynamics", "Fluid Mechanics", "Manufacturing", "Machine Design", "Heat Transfer"],
    careers:  ["Mechanical Designer", "Manufacturing Engineer", "HVAC Engineer", "Automotive Engineer"],
    semesters: 8,
  },
  {
    slug:     "civil",
    title:    "Civil Engineering",
    icon:     Building2,
    color:    "bg-amber-500/10 text-amber-500",
    border:   "hover:border-amber-500/50",
    subjects: ["Structural Analysis", "Soil Mechanics", "Fluid Mechanics", "Construction Management", "Surveying", "Environmental Engineering"],
    careers:  ["Structural Engineer", "Project Manager", "Urban Planner", "Environmental Engineer"],
    semesters: 8,
  },
  {
    slug:     "chemical",
    title:    "Chemical Engineering",
    icon:     FlaskConical,
    color:    "bg-green-500/10 text-green-500",
    border:   "hover:border-green-500/50",
    subjects: ["Mass Transfer", "Heat Transfer", "Chemical Reaction Engineering", "Process Control", "Thermodynamics", "Process Design"],
    careers:  ["Process Engineer", "Petroleum Engineer", "Pharmaceutical Engineer", "Plant Manager"],
    semesters: 8,
  },
  {
    slug:     "ai",
    title:    "Artificial Intelligence & ML",
    icon:     Brain,
    color:    "bg-purple-500/10 text-purple-500",
    border:   "hover:border-purple-500/50",
    subjects: ["Machine Learning", "Deep Learning", "Natural Language Processing", "Computer Vision", "Reinforcement Learning", "MLOps"],
    careers:  ["ML Engineer", "Data Scientist", "AI Researcher", "NLP Engineer"],
    semesters: 8,
  },
  {
    slug:     "it",
    title:    "Information Technology",
    icon:     Globe2,
    color:    "bg-cyan-500/10 text-cyan-500",
    border:   "hover:border-cyan-500/50",
    subjects: ["Web Development", "Cloud Computing", "Network Security", "Software Engineering", "Mobile App Development", "DevOps"],
    careers:  ["Full Stack Developer", "Cloud Engineer", "Security Analyst", "DevOps Engineer"],
    semesters: 8,
  },
  {
    slug:     "data-science",
    title:    "Data Science",
    icon:     Database,
    color:    "bg-teal-500/10 text-teal-500",
    border:   "hover:border-teal-500/50",
    subjects: ["Statistics", "Data Analysis", "Machine Learning", "Big Data", "Data Visualization", "Business Intelligence"],
    careers:  ["Data Analyst", "Data Scientist", "Business Analyst", "ML Engineer"],
    semesters: 8,
  },
];

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function EngineeringPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 md:px-6 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/learn" className="hover:text-foreground">Learn</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">Engineering</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 rounded-2xl bg-brand-500 text-white">
              <GraduationCap className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Engineering Curriculum</h1>
              <p className="text-muted-foreground text-sm">9 branches · 8 semesters each · Industry-ready content</p>
            </div>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Comprehensive semester-wise content for all engineering branches. Covers theory,
            practicals, lab programs, and interview preparation. Aligned with university syllabi
            (VTU, JNTUH, Mumbai University, Anna University, and more).
          </p>
        </div>

        {/* Branches grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BRANCHES.map((branch) => (
            <Link
              key={branch.slug}
              href={`/learn/engineering/${branch.slug}`}
              className={`group rounded-2xl border bg-card p-6 shadow-sm hover:shadow-md transition-all ${branch.border}`}
            >
              {/* Branch icon and title */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2.5 rounded-xl ${branch.color}`}>
                  <branch.icon className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="font-bold text-foreground text-sm leading-tight group-hover:text-brand-500 transition-colors">
                    {branch.title}
                  </h2>
                  <Badge variant="secondary" className="text-xs mt-1">{branch.semesters} semesters</Badge>
                </div>
              </div>

              {/* Key subjects */}
              <div className="space-y-1.5 mb-4">
                {branch.subjects.slice(0, 4).map((subject) => (
                  <div key={subject} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500/60 flex-shrink-0" />
                    {subject}
                  </div>
                ))}
                {branch.subjects.length > 4 && (
                  <p className="text-xs text-muted-foreground pl-3.5">+{branch.subjects.length - 4} more subjects</p>
                )}
              </div>

              {/* Career paths */}
              <div className="flex flex-wrap gap-1.5">
                {branch.careers.slice(0, 2).map((career) => (
                  <span key={career} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                    {career}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        {/* Core CS note */}
        <div className="mt-10 p-5 rounded-2xl border bg-purple-500/5 border-purple-500/20">
          <p className="text-sm text-foreground font-semibold mb-1">💡 Also explore Core CS</p>
          <p className="text-sm text-muted-foreground">
            For DSA, Operating Systems, DBMS, Computer Networks, and System Design — visit our
            dedicated <Link href="/core-cs/dsa" className="text-brand-500 hover:underline">Core CS section</Link>.
            These are essential for placements at top companies.
          </p>
        </div>
      </div>
    </div>
  );
}
