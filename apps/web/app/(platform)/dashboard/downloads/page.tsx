/**
 * @file app/(platform)/dashboard/downloads/page.tsx
 * @description Downloads page — PDFs, notes, certificates, and saved resources
 * Route: /dashboard/downloads
 * Shows: All downloadable content organized by type
 */

import type { Metadata } from "next";
import Link from "next/link";
import {
  Download, ChevronRight, FileText, Award, BookOpen,
  Image, Archive, Clock, HardDrive,
} from "lucide-react";
import { Badge }  from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* ─── Page Metadata ──────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title:  "Downloads — Dashboard | LearnVeda",
  description: "Download your certificates, notes, and study materials from LearnVeda.",
  robots: { index: false, follow: false },
};

/* ─── Downloads Data ─────────────────────────────────────────────────────── */
// Downloadable files — in production generated and stored in S3/Cloudflare R2
const DOWNLOADS = [
  {
    id:       "dl-001",
    type:     "certificate",
    icon:     Award,
    name:     "Python Fundamentals Certificate",
    desc:     "Completion certificate for Python Days 1–15",
    size:     "245 KB",
    format:   "PDF",
    addedAt:  "June 28, 2026",
    color:    "text-amber-500",
    bgColor:  "bg-amber-500/10 border-amber-500/20",
  },
  {
    id:       "dl-002",
    type:     "certificate",
    icon:     Award,
    name:     "Class 9 Mathematics Certificate",
    desc:     "Subject completion certificate with grade A+",
    size:     "238 KB",
    format:   "PDF",
    addedAt:  "June 15, 2026",
    color:    "text-amber-500",
    bgColor:  "bg-amber-500/10 border-amber-500/20",
  },
  {
    id:       "dl-003",
    type:     "notes",
    icon:     FileText,
    name:     "Class 9 Science — Chapter Notes",
    desc:     "Complete chapter-wise notes for all 14 chapters",
    size:     "1.2 MB",
    format:   "PDF",
    addedAt:  "July 1, 2026",
    color:    "text-blue-500",
    bgColor:  "bg-blue-500/10 border-blue-500/20",
  },
  {
    id:       "dl-004",
    type:     "notes",
    icon:     FileText,
    name:     "Python Cheatsheet — All 45 Days",
    desc:     "Quick reference for all Python concepts in the 45-day plan",
    size:     "890 KB",
    format:   "PDF",
    addedAt:  "July 3, 2026",
    color:    "text-blue-500",
    bgColor:  "bg-blue-500/10 border-blue-500/20",
  },
  {
    id:       "dl-005",
    type:     "resource",
    icon:     BookOpen,
    name:     "DSA Interview Sheet",
    desc:     "Top 100 DSA problems with solutions and patterns",
    size:     "2.1 MB",
    format:   "PDF",
    addedAt:  "June 20, 2026",
    color:    "text-purple-500",
    bgColor:  "bg-purple-500/10 border-purple-500/20",
  },
  {
    id:       "dl-006",
    type:     "resource",
    icon:     Archive,
    name:     "Class 9 All Subjects — Study Pack",
    desc:     "Complete study pack with notes, formulas, and NCERT solutions",
    size:     "8.4 MB",
    format:   "ZIP",
    addedAt:  "June 10, 2026",
    color:    "text-green-500",
    bgColor:  "bg-green-500/10 border-green-500/20",
  },
];

const totalSize = "13.1 MB";

/* ─── File Type Icon Map ─────────────────────────────────────────────────── */
const TYPE_LABELS: Record<string, string> = {
  certificate: "Certificate",
  notes:       "Notes",
  resource:    "Resource",
};

/* ─── Downloads Page Component ───────────────────────────────────────────── */
export default function DownloadsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="border-b bg-gradient-to-br from-muted/50 to-background">
        <div className="container px-4 py-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">Downloads</span>
          </nav>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-muted border flex items-center justify-center">
                <Download className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Downloads</h1>
                <p className="text-sm text-muted-foreground">
                  {DOWNLOADS.length} files · {totalSize} total
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-xs text-muted-foreground border rounded-lg px-3 py-1.5">
              <HardDrive className="h-3.5 w-3.5 mr-1" />
              {totalSize} used
            </div>
          </div>
        </div>
      </div>

      {/* ── Downloads List ────────────────────────────────────────────────── */}
      <div className="container px-4 py-8 max-w-3xl space-y-4">
        {DOWNLOADS.map((file) => {
          const Icon = file.icon;
          const typeLabel = TYPE_LABELS[file.type] ?? file.type;

          return (
            <div
              key={file.id}
              className="flex items-center gap-4 rounded-2xl border bg-card hover:shadow-sm transition-all p-4"
            >
              {/* Icon */}
              <div className={`h-11 w-11 rounded-xl border flex items-center justify-center shrink-0 ${file.bgColor}`}>
                <Icon className={`h-5 w-5 ${file.color}`} />
              </div>

              {/* File info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                  <span className="font-medium text-sm">{file.name}</span>
                  <Badge className={`text-[9px] py-0 ${file.bgColor} ${file.color}`}>
                    {typeLabel}
                  </Badge>
                  <Badge variant="outline" className="text-[9px] py-0">{file.format}</Badge>
                </div>
                <div className="text-xs text-muted-foreground">{file.desc}</div>
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground mt-0.5">
                  <Clock className="h-3 w-3" />
                  {file.addedAt}
                  <span>·</span>
                  {file.size}
                </div>
              </div>

              {/* Download button */}
              <Button size="sm" variant="outline" className="text-xs h-8 shrink-0">
                <Download className="h-3 w-3 mr-1" />
                Download
              </Button>
            </div>
          );
        })}

        {/* Empty state / load more */}
        <div className="rounded-2xl border border-dashed bg-muted/10 p-8 text-center">
          <Download className="h-8 w-8 mx-auto mb-3 text-muted-foreground/40" />
          <p className="text-sm text-muted-foreground mb-1">More downloads as you progress</p>
          <p className="text-xs text-muted-foreground">
            Complete chapters and earn certificates to unlock downloadable content.
          </p>
          <Button asChild className="mt-4" size="sm" variant="outline">
            <Link href="/learn">Continue Learning</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
