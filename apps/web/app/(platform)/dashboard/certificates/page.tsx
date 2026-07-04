/**
 * @file app/(platform)/dashboard/certificates/page.tsx
 * @description Student certificates page — earned completion certificates
 * Route: /dashboard/certificates
 * Shows earned certificates with download options and sharing functionality
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Award, ChevronRight, Download, Share2, Lock, Star } from "lucide-react";
import { Badge }  from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* ─── Page Metadata ──────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title:  "Certificates — Dashboard | LearnVeda",
  description: "Your earned completion certificates on LearnVeda.",
  robots: { index: false, follow: false },
};

/* ─── Certificate Data ───────────────────────────────────────────────────── */
// Certificates earned and locked — in production fetched from MongoDB
const CERTIFICATES = [
  {
    id:       "cert-001",
    title:    "Python Fundamentals",
    subtitle: "Completed Python Days 1–15",
    issueDate:"June 28, 2026",
    type:     "track",
    earned:   true,
    grade:    "A (92%)",
    color:    "from-blue-500 to-cyan-500",
    bgColor:  "bg-blue-500/5 border-blue-500/20",
  },
  {
    id:       "cert-002",
    title:    "Class 9 Mathematics",
    subtitle: "Completed all 15 chapters with 85%+ average",
    issueDate:"June 15, 2026",
    type:     "subject",
    earned:   true,
    grade:    "A+ (96%)",
    color:    "from-green-500 to-emerald-500",
    bgColor:  "bg-green-500/5 border-green-500/20",
  },
  {
    id:       "cert-003",
    title:    "Battle Arena Champion",
    subtitle: "Won 10+ consecutive battles",
    issueDate:null,
    type:     "achievement",
    earned:   false,
    grade:    null,
    color:    "from-purple-500 to-violet-500",
    bgColor:  "bg-purple-500/5 border-purple-500/20",
    requirement: "Win 10 consecutive battles (8/10 done)",
  },
  {
    id:       "cert-004",
    title:    "DSA Fundamentals",
    subtitle: "Complete DSA Phase 1 & 2 (Days 1–20)",
    issueDate:null,
    type:     "track",
    earned:   false,
    grade:    null,
    color:    "from-amber-500 to-orange-500",
    bgColor:  "bg-amber-500/5 border-amber-500/20",
    requirement: "Complete DSA Days 1–20",
  },
];

const earnedCerts  = CERTIFICATES.filter((c) => c.earned);
const lockedCerts  = CERTIFICATES.filter((c) => !c.earned);

/* ─── Certificates Page Component ───────────────────────────────────────── */
export default function CertificatesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="border-b bg-gradient-to-br from-yellow-500/5 to-background">
        <div className="container px-4 py-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">Certificates</span>
          </nav>

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
              <Award className="h-5 w-5 text-yellow-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Certificates</h1>
              <p className="text-sm text-muted-foreground">
                {earnedCerts.length} earned · {lockedCerts.length} locked
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 py-8 space-y-8">

        {/* ── Earned Certificates ───────────────────────────────────────── */}
        {earnedCerts.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold mb-4">
              <Star className="inline h-4.5 w-4.5 text-amber-500 mr-1" />
              Earned Certificates
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {earnedCerts.map((cert) => (
                <div
                  key={cert.id}
                  className={`rounded-2xl border ${cert.bgColor} overflow-hidden`}
                >
                  {/* Gradient top bar */}
                  <div className={`h-1.5 bg-gradient-to-r ${cert.color}`} />

                  <div className="p-5">
                    {/* Certificate icon */}
                    <div className="flex items-start justify-between mb-4">
                      <Award className="h-8 w-8 text-amber-500" />
                      <Badge className="text-[10px] bg-amber-500/10 text-amber-600 border-amber-500/20">
                        Verified
                      </Badge>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-lg mb-1">{cert.title}</h3>
                    <p className="text-sm text-muted-foreground mb-1">{cert.subtitle}</p>

                    {/* Grade + date */}
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                      {cert.grade && <span className="font-semibold text-green-600 dark:text-green-400">{cert.grade}</span>}
                      <span>{cert.issueDate}</span>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="text-xs h-7">
                        <Download className="h-3 w-3 mr-1" />
                        Download PDF
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs h-7">
                        <Share2 className="h-3 w-3 mr-1" />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Locked Certificates ───────────────────────────────────────── */}
        {lockedCerts.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold mb-4">
              <Lock className="inline h-4 w-4 text-muted-foreground mr-1" />
              Locked Certificates
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {lockedCerts.map((cert) => (
                <div
                  key={cert.id}
                  className="rounded-2xl border bg-muted/20 overflow-hidden opacity-70"
                >
                  <div className={`h-1.5 bg-gradient-to-r ${cert.color} opacity-30`} />
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <Lock className="h-7 w-7 text-muted-foreground" />
                      <Badge variant="outline" className="text-[10px]">Locked</Badge>
                    </div>
                    <h3 className="font-bold text-lg mb-1 text-muted-foreground">{cert.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{cert.subtitle}</p>
                    {"requirement" in cert && cert.requirement && (
                      <div className="text-xs text-muted-foreground bg-muted/50 rounded-lg px-3 py-2">
                        🎯 {cert.requirement}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
