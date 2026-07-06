/**
 * @file app/(platform)/core-cs/operating-systems/page.tsx
 * @description Operating Systems (OS) Core CS track hub
 * Route: /core-cs/operating-systems
 *
 * Complete 30-day OS learning plan covering:
 *   Week 1: Basics, Processes, Threads
 *   Week 2: CPU Scheduling, Synchronization
 *   Week 3: Memory Management, Virtual Memory
 *   Week 4: File Systems, I/O, Deadlocks
 *
 * Content aligned with:
 *   - GATE CS syllabus
 *   - B.Tech CSE curriculum (Silberschatz's OS Concepts)
 *   - FAANG/placement interview topics
 */

import type { Metadata } from "next"; // SEO
import Link              from "next/link"; // Navigation
import { Cpu, ChevronRight, Clock, BookOpen, CheckCircle2, Play, ArrowRight, Star } from "lucide-react"; // Icons
import { Badge }  from "@/components/ui/badge";   // Badge
import { Button } from "@/components/ui/button";  // Button

/* ─── SEO Metadata ────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Operating Systems (OS) 30-Day Plan | LearnVeda Core CS",
  description:
    "Complete OS course for GATE and placements — Processes, Threads, CPU Scheduling, Memory Management, File Systems, Deadlocks.",
  keywords: ["Operating Systems GATE", "OS for placements", "CPU scheduling", "memory management", "deadlock detection"],
};

/* ─── OS Day Data ────────────────────────────────────────────────────────── */
interface OSDay {
  day:      number;
  title:    string;
  topics:   string[];
  difficulty: "Easy" | "Medium" | "Hard";
  isCompleted?: boolean;
}

/* ─── OS Curriculum ──────────────────────────────────────────────────────── */
const OS_WEEKS: { week: number; title: string; focus: string; color: string; days: OSDay[] }[] = [
  {
    week:  1,
    title: "Week 1: OS Foundations & Processes",
    focus: "What is an OS, process model, threads",
    color: "blue",
    days: [
      { day:1,  title:"Introduction to Operating Systems",         topics:["OS Definition","Types of OS","Kernel","System Calls","POSIX"],                             difficulty:"Easy",   isCompleted:true },
      { day:2,  title:"Processes — The Basic Unit",                topics:["Process vs Program","PCB","Process States","Context Switch"],                              difficulty:"Easy",   isCompleted:true },
      { day:3,  title:"Process Creation & Termination",            topics:["fork()","exec()","wait()","exit()","Zombie Process","Orphan"],                             difficulty:"Medium", isCompleted:true },
      { day:4,  title:"Threads — Lightweight Processes",           topics:["Thread vs Process","User Thread vs Kernel Thread","POSIX Threads","pthreads"],             difficulty:"Medium", isCompleted:false },
      { day:5,  title:"Inter-Process Communication (IPC)",         topics:["Pipes","Named Pipes","Message Queues","Shared Memory","Semaphores"],                       difficulty:"Medium", isCompleted:false },
      { day:6,  title:"Process Synchronization — Problem Intro",   topics:["Race Condition","Critical Section","Mutual Exclusion","Peterson's Solution"],              difficulty:"Hard",   isCompleted:false },
      { day:7,  title:"Week 1 Practice & GATE Questions",          topics:["PCB Structure","fork() output tracing","IPC selection","Thread benefits"],                difficulty:"Hard",   isCompleted:false },
    ],
  },
  {
    week:  2,
    title: "Week 2: CPU Scheduling & Synchronization",
    focus: "Schedulers, algorithms, mutex, semaphores",
    color: "green",
    days: [
      { day:8,  title:"CPU Scheduling — Overview",                 topics:["Short-term","Long-term","Medium-term","Preemptive vs Non-preemptive"],                    difficulty:"Easy"   },
      { day:9,  title:"FCFS, SJF, SRTF Algorithms",                topics:["FCFS","SJF","SRTF","Convoy Effect","Starvation","Aging"],                                difficulty:"Medium" },
      { day:10, title:"Round Robin & Priority Scheduling",         topics:["Round Robin","Priority","Time Quantum","Preemption","Aging"],                              difficulty:"Medium" },
      { day:11, title:"Multilevel Queue & Feedback Scheduling",    topics:["MLQ","MLFQ","Scheduling Criteria","Gantt Chart"],                                         difficulty:"Hard"   },
      { day:12, title:"Mutex Locks & Semaphores",                  topics:["Mutex","Semaphore","Binary Semaphore","Counting Semaphore","wait()/signal()"],             difficulty:"Hard"   },
      { day:13, title:"Classic Sync Problems",                     topics:["Producer-Consumer","Dining Philosophers","Readers-Writers","Sleeping Barber"],             difficulty:"Hard"   },
      { day:14, title:"Week 2 Revision & GATE Problems",           topics:["Gantt Chart tracing","Semaphore code","Deadlock identification"],                         difficulty:"Hard"   },
    ],
  },
  {
    week:  3,
    title: "Week 3: Memory Management & Virtual Memory",
    focus: "Allocation, paging, segmentation, page replacement",
    color: "purple",
    days: [
      { day:15, title:"Memory Management Basics",                  topics:["Logical vs Physical Address","MMU","Contiguous Allocation","Fragmentation"],               difficulty:"Easy"   },
      { day:16, title:"Paging",                                    topics:["Pages","Frames","Page Table","Page Table Entry","TLB","PTBR"],                             difficulty:"Medium" },
      { day:17, title:"Segmentation & Combined",                   topics:["Segmentation","Segmentation with Paging","GDT","LDT"],                                    difficulty:"Medium" },
      { day:18, title:"Virtual Memory — Concepts",                 topics:["Virtual Memory","Demand Paging","Page Fault","Pure Demand Paging","Lazy Loading"],        difficulty:"Medium" },
      { day:19, title:"Page Replacement Algorithms",               topics:["FIFO","Optimal (OPT)","LRU","LFU","Clock Algorithm","Belady's Anomaly"],                  difficulty:"Hard"   },
      { day:20, title:"Thrashing & Working Set Model",             topics:["Thrashing","Working Set","Page Fault Rate","Load Control"],                               difficulty:"Hard"   },
      { day:21, title:"Week 3 Revision",                           topics:["Page table calculations","TLB hit rate","Page replacement tracing"],                     difficulty:"Hard"   },
    ],
  },
  {
    week:  4,
    title: "Week 4: File Systems, I/O & Deadlocks",
    focus: "Storage, I/O management, deadlock theory",
    color: "orange",
    days: [
      { day:22, title:"File System Concepts",                      topics:["File","Directory","File Attributes","Operations","Inodes"],                               difficulty:"Easy"   },
      { day:23, title:"File System Implementation",                topics:["FAT","NTFS","Ext4","Inode Structure","Directory Implementation","Journaling"],            difficulty:"Medium" },
      { day:24, title:"Disk Scheduling Algorithms",                topics:["FCFS","SSTF","SCAN (Elevator)","C-SCAN","C-LOOK","Seek Time"],                            difficulty:"Medium" },
      { day:25, title:"I/O Management",                            topics:["I/O Hardware","Polling","Interrupts","DMA","Device Drivers","Buffering"],                 difficulty:"Medium" },
      { day:26, title:"Deadlocks — Concepts",                      topics:["Deadlock Conditions","Resource Allocation Graph","Hold and Wait","Circular Wait"],        difficulty:"Hard"   },
      { day:27, title:"Deadlock Handling",                         topics:["Prevention","Avoidance","Banker's Algorithm","Detection","Recovery"],                     difficulty:"Hard"   },
      { day:28, title:"Banker's Algorithm (hands-on)",             topics:["Safety Algorithm","Resource Request Algorithm","Need Matrix","Allocation"],               difficulty:"Hard"   },
      { day:29, title:"OS Security & Protection",                  topics:["Security vs Protection","Access Matrix","ACL","Capability List","Authentication"],        difficulty:"Medium" },
      { day:30, title:"Full OS Revision & GATE Mock",              topics:["All topics","GATE 2024 questions","Interview Q&A","Key formulas"],                        difficulty:"Hard"   },
    ],
  },
];

/* ─── Page Component ─────────────────────────────────────────────────────── */
export default function OperatingSystemsPage() {
  const allDays   = OS_WEEKS.flatMap((w) => w.days);
  const completed = allDays.filter((d) => d.isCompleted).length;
  const total     = allDays.length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/40 bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4" aria-label="Breadcrumb">
            <Link href="/core-cs" className="hover:text-foreground transition-colors">Core CS</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">Operating Systems</span>
          </nav>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
              <Cpu className="h-7 w-7 text-green-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Operating Systems</h1>
              <p className="text-muted-foreground mt-1">30-day structured plan — GATE, FAANG placements, B.Tech exams</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="secondary">30 Days</Badge>
                <Badge variant="secondary">4 Weeks</Badge>
                <Badge variant="secondary">120+ GATE Questions</Badge>
                <Badge variant="outline" className="border-green-500/50 text-green-600">Free</Badge>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-5 rounded-xl border border-border/40 bg-card p-4">
            <div className="flex items-center justify-between mb-2 text-sm">
              <span className="font-medium">Progress</span>
              <span className="text-muted-foreground">{completed}/{total} days</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full" style={{ width: `${(completed / total) * 100}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Curriculum */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        {OS_WEEKS.map((week) => (
          <section key={week.week} aria-labelledby={`week-${week.week}-heading`}>
            <div className={`rounded-xl border border-${week.color}-500/20 bg-${week.color}-500/5 p-5 mb-5`}>
              <h2 id={`week-${week.week}-heading`} className="font-bold text-lg">{week.title}</h2>
              <p className="text-sm text-muted-foreground mt-1">{week.focus}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {week.days.map((day) => (
                <Link
                  key={day.day}
                  href={`/core-cs/operating-systems/day-${day.day}`}
                  className={`group rounded-xl border bg-card p-4 hover:border-border/80 hover:shadow-sm transition-all ${
                    day.isCompleted ? "border-green-500/30" : "border-border/40"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {day.isCompleted
                      ? <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                      : <span className={`h-5 w-5 rounded-full border-2 border-${week.color}-500/40 text-${week.color}-500 flex items-center justify-center text-xs font-bold`}>{day.day}</span>}
                    <span className="text-xs text-muted-foreground">Day {day.day}</span>
                    <Badge
                      variant="outline"
                      className={`ml-auto text-xs ${
                        day.difficulty === "Easy" ? "border-green-500/40 text-green-600" :
                        day.difficulty === "Medium" ? "border-yellow-500/40 text-yellow-600" :
                        "border-red-500/40 text-red-600"}`}
                    >{day.difficulty}</Badge>
                  </div>
                  <h3 className="text-sm font-semibold leading-tight group-hover:text-brand-500 transition-colors mb-2">{day.title}</h3>
                  <div className="flex flex-wrap gap-1">
                    {day.topics.slice(0, 2).map((t) => (
                      <span key={t} className="text-xs bg-muted/60 rounded px-1.5 py-0.5 text-muted-foreground">{t}</span>
                    ))}
                    {day.topics.length > 2 && <span className="text-xs text-muted-foreground">+{day.topics.length - 2}</span>}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}

        {/* CTA */}
        <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-8 text-center">
          <Star className="h-10 w-10 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Complete OS to unlock your GATE-Ready badge</h2>
          <Button asChild>
            <Link href="/core-cs/operating-systems/day-1">
              Start from Day 1 <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
