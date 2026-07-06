/**
 * @file app/(platform)/learn/page.tsx
 * @description Learn Hub — all learning tracks in one place
 * Route: /learn
 *
 * Shows:
 *   - CBSE Classes 9–12 with subject overview
 *   - Engineering branches (B.Tech)
 *   - Core CS tracks (DSA, OS, DBMS, CN, System Design)
 *   - Programming languages
 *
 * Server component — SSR for SEO and fast initial load.
 */

import type { Metadata } from "next"; // SEO
import Link              from "next/link"; // Navigation
import {
  BookOpen, Code2, Cpu, ChevronRight, Atom, FlaskConical,
  Calculator, Globe, Users, GraduationCap, ArrowRight,
  BarChart2, Database, Network, HardDrive, GitBranch,
} from "lucide-react"; // Icons
import { Badge }  from "@/components/ui/badge";   // Badge
import { Button } from "@/components/ui/button";  // Button

/* ─── SEO Metadata ────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Learn — CBSE, Engineering, Programming & DSA | LearnVeda",
  description:
    "Browse all learning tracks on LearnVeda — CBSE Class 9–12, Engineering, DSA, 13 programming languages, and Core CS.",
  keywords: ["CBSE study material", "engineering notes", "DSA roadmap", "programming tutorial India"],
};

/* ─── Class Data ─────────────────────────────────────────────────────────── */
const CLASSES = [
  { id:"class-9",  label:"Class 9",  subjects:["Mathematics","Science","Social Science","English","Hindi"], chapters:90,  color:"from-blue-500 to-cyan-500",   bg:"bg-blue-500/10",   href:"/learn/class-9"  },
  { id:"class-10", label:"Class 10", subjects:["Mathematics","Science","Social Science","English","Hindi"], chapters:95,  color:"from-green-500 to-emerald-500",bg:"bg-green-500/10",  href:"/learn/class-10" },
  { id:"class-11", label:"Class 11", subjects:["Mathematics","Physics","Chemistry","Biology","Economics"],  chapters:110, color:"from-orange-500 to-amber-500", bg:"bg-orange-500/10", href:"/learn/class-11" },
  { id:"class-12", label:"Class 12", subjects:["Mathematics","Physics","Chemistry","Biology","Accountancy"],chapters:115, color:"from-purple-500 to-violet-500",bg:"bg-purple-500/10", href:"/learn/class-12" },
];

/* ─── Engineering Branches ───────────────────────────────────────────────── */
const ENGINEERING = [
  { id:"cse",   label:"Computer Science",   icon:"💻", semesters:8, href:"/learn/engineering/cse"   },
  { id:"ece",   label:"Electronics & Comm", icon:"📡", semesters:8, href:"/learn/engineering/ece"   },
  { id:"eee",   label:"Electrical",         icon:"⚡", semesters:8, href:"/learn/engineering/eee"   },
  { id:"civil", label:"Civil Engineering",  icon:"🏗", semesters:8, href:"/learn/engineering/civil" },
  { id:"mech",  label:"Mechanical",         icon:"⚙️", semesters:8, href:"/learn/engineering/mech"  },
  { id:"chem",  label:"Chemical",           icon:"⚗️", semesters:8, href:"/learn/engineering/chem"  },
  { id:"ai",    label:"AI & Machine Learning",icon:"🤖",semesters:8, href:"/learn/engineering/ai"   },
  { id:"it",    label:"Information Technology",icon:"🔐",semesters:8,href:"/learn/engineering/it"   },
];

/* ─── Core CS Tracks ─────────────────────────────────────────────────────── */
const CORE_CS = [
  { id:"dsa",       label:"DSA",            icon:BarChart2, days:60, href:"/core-cs/dsa",            color:"text-blue-500" },
  { id:"os",        label:"Operating Systems",icon:Cpu,     days:30, href:"/core-cs/operating-systems",color:"text-green-500" },
  { id:"dbms",      label:"DBMS",            icon:Database, days:25, href:"/core-cs/database-management",color:"text-purple-500" },
  { id:"cn",        label:"Computer Networks",icon:Network, days:25, href:"/core-cs/computer-networks",color:"text-orange-500" },
  { id:"sd",        label:"System Design",   icon:HardDrive,days:25, href:"/core-cs/system-design",  color:"text-red-500" },
  { id:"git",       label:"Git & GitHub",    icon:GitBranch,days:10, href:"/core-cs/git-github",     color:"text-yellow-500" },
];

/* ─── Page Component ─────────────────────────────────────────────────────── */
export default function LearnHubPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/40 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-brand-500" />
            <div>
              <h1 className="text-3xl font-bold">Learning Hub</h1>
              <p className="text-muted-foreground">All tracks in one place — CBSE, Engineering, DSA, Programming</p>
            </div>
          </div>

          {/* Quick stats */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label:"Total Chapters",  value:"400+",  icon:BookOpen },
              { label:"Practice Questions", value:"3,000+",icon:BarChart2 },
              { label:"Simulations",     value:"25+",   icon:Atom },
              { label:"Programming Days",value:"450+",  icon:Code2 },
            ].map((stat) => (
              <div key={stat.label} className="rounded-lg border border-border/40 bg-card p-4 flex items-center gap-3">
                <stat.icon className="h-5 w-5 text-muted-foreground shrink-0" />
                <div>
                  <p className="font-bold text-lg leading-none">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-14">
        {/* ── CBSE Classes ─────────────────────────────────────────── */}
        <section aria-labelledby="cbse-heading">
          <div className="flex items-center justify-between mb-6">
            <h2 id="cbse-heading" className="text-2xl font-bold">CBSE Classes</h2>
            <Badge variant="secondary">Class 9–12</Badge>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CLASSES.map((cls) => (
              <Link
                key={cls.id}
                href={cls.href}
                className="group rounded-xl border border-border/40 bg-card overflow-hidden hover:border-border/80 hover:shadow-md transition-all"
              >
                <div className={`h-2 bg-gradient-to-r ${cls.color}`} />
                <div className={`p-5 ${cls.bg}`}>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-brand-500 transition-colors">{cls.label}</h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    {cls.subjects.slice(0, 3).join(" · ")} + more
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <BookOpen className="h-3.5 w-3.5" /> {cls.chapters}+ chapters
                  </div>
                </div>
                <div className="px-5 py-3 border-t border-border/20 flex items-center text-xs text-brand-500 font-medium">
                  Start Learning <ChevronRight className="h-3.5 w-3.5 ml-auto group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Engineering ──────────────────────────────────────────── */}
        <section aria-labelledby="engineering-heading">
          <div className="flex items-center justify-between mb-6">
            <h2 id="engineering-heading" className="text-2xl font-bold">Engineering (B.Tech)</h2>
            <Badge variant="secondary">8 Branches · 8 Semesters</Badge>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {ENGINEERING.map((branch) => (
              <Link
                key={branch.id}
                href={branch.href}
                className="group rounded-xl border border-border/40 bg-card p-4 text-center hover:border-brand-500/40 hover:shadow-md transition-all"
              >
                <span className="text-2xl block mb-2">{branch.icon}</span>
                <p className="text-xs font-medium leading-tight group-hover:text-brand-500 transition-colors">{branch.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{branch.semesters} semesters</p>
              </Link>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Button asChild variant="outline" size="sm">
              <Link href="/learn/engineering">View All Engineering Branches <ArrowRight className="h-4 w-4 ml-2" /></Link>
            </Button>
          </div>
        </section>

        {/* ── Core CS ──────────────────────────────────────────────── */}
        <section aria-labelledby="core-cs-heading">
          <div className="flex items-center justify-between mb-6">
            <h2 id="core-cs-heading" className="text-2xl font-bold">Core CS</h2>
            <Badge variant="secondary">Interview Prep · GATE · Placements</Badge>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CORE_CS.map((track) => (
              <Link
                key={track.id}
                href={track.href}
                className="group rounded-xl border border-border/40 bg-card p-5 hover:border-border/80 hover:shadow-md transition-all text-center"
              >
                <track.icon className={`h-7 w-7 ${track.color} mx-auto mb-3`} />
                <p className="font-semibold text-sm group-hover:text-brand-500 transition-colors">{track.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{track.days} days</p>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Programming Languages ─────────────────────────────────── */}
        <section aria-labelledby="programming-heading">
          <div className="flex items-center justify-between mb-6">
            <h2 id="programming-heading" className="text-2xl font-bold">Programming Languages</h2>
            <Badge variant="secondary">13 Languages · Day-by-day plans</Badge>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {[
              { name:"Python",     emoji:"🐍", days:45, href:"/programming/python"     },
              { name:"JavaScript", emoji:"🟨", days:45, href:"/programming/javascript" },
              { name:"Java",       emoji:"☕", days:60, href:"/programming/java"       },
              { name:"C++",        emoji:"⚡", days:60, href:"/programming/cpp"        },
              { name:"C",          emoji:"🔧", days:30, href:"/programming/c"          },
              { name:"TypeScript", emoji:"🔷", days:30, href:"/programming/typescript" },
              { name:"Go",         emoji:"🐹", days:30, href:"/programming/golang"     },
              { name:"Rust",       emoji:"🦀", days:45, href:"/programming/rust"       },
              { name:"Kotlin",     emoji:"🎯", days:30, href:"/programming/kotlin"     },
              { name:"Swift",      emoji:"🍎", days:30, href:"/programming/swift"      },
              { name:"Dart",       emoji:"🎯", days:30, href:"/programming/dart"       },
              { name:"SQL",        emoji:"🗄️", days:30, href:"/programming/sql"        },
            ].map((lang) => (
              <Link
                key={lang.name}
                href={lang.href}
                className="group rounded-xl border border-border/40 bg-card p-4 text-center hover:border-brand-500/40 hover:shadow-md transition-all"
              >
                <span className="text-2xl block mb-2">{lang.emoji}</span>
                <p className="text-sm font-medium group-hover:text-brand-500 transition-colors">{lang.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{lang.days} days</p>
              </Link>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Button asChild variant="outline" size="sm">
              <Link href="/programming">View All Languages <ArrowRight className="h-4 w-4 ml-2" /></Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
