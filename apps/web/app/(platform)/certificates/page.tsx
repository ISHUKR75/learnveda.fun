/**
 * @file app/(platform)/certificates/page.tsx
 * @description Certificates page — all earned certificates for the user
 * Route: /certificates
 *
 * Shows:
 *   - Earned certificates (course completions, events, achievements)
 *   - Download as PDF / share on LinkedIn
 *   - Pending certificates (courses near completion)
 *   - Certificate verification via unique code
 */

import type { Metadata } from "next"; // SEO metadata
import Link              from "next/link"; // Navigation
import {
  Award, Download, Share2, ChevronRight,
  Lock, CheckCircle2, Clock, ExternalLink,
  Trophy, BookOpen, Code2, Zap,
} from "lucide-react"; // Icons
import { Badge }  from "@/components/ui/badge";   // Badge
import { Button } from "@/components/ui/button";  // Button

/* ─── SEO Metadata ────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title:  "My Certificates — LearnVeda",
  description: "View and download your LearnVeda certificates — course completions, competition wins, and achievement milestones.",
  robots: { index: false, follow: false }, // Private page — don't index
};

/* ─── Certificate Type ────────────────────────────────────────────────────── */
type CertificateStatus = "earned" | "pending" | "locked";

interface Certificate {
  id:          string;            // Unique certificate ID
  title:       string;            // Certificate title
  issuer:      string;            // "LearnVeda" or event organizer
  type:        "course" | "event" | "achievement" | "competition"; // Type
  icon:        React.ComponentType<{ className?: string }>;        // Icon
  earnedDate?: string;            // Date earned (for "earned" status)
  progress?:   number;            // 0–100 percent complete (for "pending")
  code?:       string;            // Verification code (for "earned")
  status:      CertificateStatus; // Current status
  description: string;            // What this certificate represents
  linkedInUrl?: string;           // LinkedIn certification URL (mocked)
}

/* ─── Certificate Data ────────────────────────────────────────────────────── */
// In production: fetched from MongoDB via /api/certificates
const CERTIFICATES: Certificate[] = [
  {
    id:          "cert-001",
    title:       "Class 9 Mathematics — Complete",
    issuer:      "LearnVeda",
    type:        "course",
    icon:        BookOpen,
    earnedDate:  "May 14, 2026",
    code:        "LV-C9M-2026-7FX8K",
    status:      "earned",
    description: "Completed all 15 chapters of NCERT Class 9 Mathematics including Number Systems, Polynomials, Geometry, and Statistics.",
    linkedInUrl: "https://linkedin.com",
  },
  {
    id:          "cert-002",
    title:       "Python 45-Day Plan — Complete",
    issuer:      "LearnVeda",
    type:        "course",
    icon:        Code2,
    earnedDate:  "Jun 2, 2026",
    code:        "LV-PY45-2026-3KPQ9",
    status:      "earned",
    description: "Completed the full 45-day Python structured learning plan from basics to object-oriented programming, file handling, and APIs.",
    linkedInUrl: "https://linkedin.com",
  },
  {
    id:          "cert-003",
    title:       "Code Sprint DSA Challenge — 2nd Place",
    issuer:      "LearnVeda Events",
    type:        "competition",
    icon:        Trophy,
    earnedDate:  "May 12, 2026",
    code:        "LV-EV-CODE-2026-SPRINT",
    status:      "earned",
    description: "Achieved 2nd place in the Code Sprint DSA Challenge with 89% accuracy across 20 algorithmic problems in 60 minutes.",
    linkedInUrl: "https://linkedin.com",
  },
  {
    id:          "cert-004",
    title:       "Class 10 Science — In Progress",
    issuer:      "LearnVeda",
    type:        "course",
    icon:        BookOpen,
    progress:    65,
    status:      "pending",
    description: "Complete all 16 chapters of NCERT Class 10 Science to earn this certificate.",
  },
  {
    id:          "cert-005",
    title:       "DSA 60-Day Plan — In Progress",
    issuer:      "LearnVeda",
    type:        "course",
    icon:        Code2,
    progress:    40,
    status:      "pending",
    description: "Complete all 60 days of the DSA structured plan — covering Arrays, Trees, Graphs, and Dynamic Programming.",
  },
  {
    id:          "cert-006",
    title:       "System Design Mastery",
    issuer:      "LearnVeda",
    type:        "course",
    icon:        Zap,
    status:      "locked",
    description: "Complete the 25-day System Design track to unlock this certificate. Requires completion of DSA first.",
  },
];

/* ─── Certificate Card ────────────────────────────────────────────────────── */
function CertCard({ cert }: { cert: Certificate }) {
  const statusColor = {
    earned:  "border-green-500/20 bg-green-500/5",
    pending: "border-yellow-500/20 bg-yellow-500/5",
    locked:  "border-border/30 bg-muted/20",
  }[cert.status];

  return (
    <div className={`rounded-xl border ${statusColor} p-5 relative overflow-hidden`}>
      {/* Background decoration for earned certs */}
      {cert.status === "earned" && (
        <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/5 rounded-full -translate-y-8 translate-x-8" />
      )}

      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className={`p-2 rounded-lg shrink-0 ${
          cert.status === "earned"  ? "bg-green-500/10 text-green-600" :
          cert.status === "pending" ? "bg-yellow-500/10 text-yellow-600" :
          "bg-muted text-muted-foreground"
        }`}>
          <cert.icon className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm leading-tight">{cert.title}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{cert.issuer}</p>
        </div>
        {/* Status badge */}
        <Badge
          variant="outline"
          className={`shrink-0 text-xs ${
            cert.status === "earned"  ? "border-green-500/50 text-green-600" :
            cert.status === "pending" ? "border-yellow-500/50 text-yellow-600" :
            "text-muted-foreground"
          }`}
        >
          {cert.status === "earned"  ? <><CheckCircle2 className="h-3 w-3 mr-1" />Earned</> :
           cert.status === "pending" ? <><Clock className="h-3 w-3 mr-1" />In Progress</> :
           <><Lock className="h-3 w-3 mr-1" />Locked</>}
        </Badge>
      </div>

      {/* Description */}
      <p className="text-xs text-muted-foreground leading-relaxed mb-3">{cert.description}</p>

      {/* Progress bar (pending) */}
      {cert.status === "pending" && cert.progress !== undefined && (
        <div className="mb-3">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Progress</span>
            <span>{cert.progress}%</span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-yellow-500 rounded-full transition-all"
              style={{ width: `${cert.progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Earned info + actions */}
      {cert.status === "earned" && (
        <>
          <div className="flex items-center gap-1.5 text-xs text-green-600 mb-3">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Earned {cert.earnedDate} · Code: <span className="font-mono">{cert.code}</span>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="gap-1.5 text-xs h-8">
              <Download className="h-3.5 w-3.5" /> PDF
            </Button>
            <Button size="sm" variant="outline" className="gap-1.5 text-xs h-8">
              <Share2 className="h-3.5 w-3.5" /> LinkedIn
            </Button>
            <Button size="sm" variant="ghost" className="gap-1.5 text-xs h-8 text-muted-foreground ml-auto">
              <ExternalLink className="h-3.5 w-3.5" /> Verify
            </Button>
          </div>
        </>
      )}

      {/* CTA for pending */}
      {cert.status === "pending" && (
        <Button asChild size="sm" variant="outline" className="text-xs h-8">
          <Link href="/dashboard">Continue Learning</Link>
        </Button>
      )}
    </div>
  );
}

/* ─── Page Component ─────────────────────────────────────────────────────── */
export default function CertificatesPage() {
  const earnedCount  = CERTIFICATES.filter((c) => c.status === "earned").length;   // Count of earned
  const pendingCount = CERTIFICATES.filter((c) => c.status === "pending").length;  // Count of pending

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/40 bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4" aria-label="Breadcrumb">
            <Link href="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">Certificates</span>
          </nav>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
              <Award className="h-6 w-6 text-yellow-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">My Certificates</h1>
              <p className="text-muted-foreground text-sm mt-0.5">
                {earnedCount} earned · {pendingCount} in progress
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Earned section */}
        <section aria-labelledby="earned-heading">
          <h2 id="earned-heading" className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            Earned Certificates
            <Badge variant="secondary">{earnedCount}</Badge>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CERTIFICATES.filter((c) => c.status === "earned").map((cert) => (
              <CertCard key={cert.id} cert={cert} />
            ))}
          </div>
        </section>

        {/* Pending section */}
        <section aria-labelledby="pending-heading">
          <h2 id="pending-heading" className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-yellow-500" />
            In Progress
            <Badge variant="secondary">{pendingCount}</Badge>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CERTIFICATES.filter((c) => c.status === "pending").map((cert) => (
              <CertCard key={cert.id} cert={cert} />
            ))}
          </div>
        </section>

        {/* Locked section */}
        <section aria-labelledby="locked-heading">
          <h2 id="locked-heading" className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Lock className="h-5 w-5 text-muted-foreground" />
            Upcoming Certificates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CERTIFICATES.filter((c) => c.status === "locked").map((cert) => (
              <CertCard key={cert.id} cert={cert} />
            ))}
          </div>
        </section>

        {/* Verification section */}
        <section className="rounded-xl border border-border/40 bg-card p-6">
          <h2 className="font-semibold mb-2 flex items-center gap-2">
            <ExternalLink className="h-4 w-4" /> Verify a Certificate
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Enter a certificate verification code to confirm its authenticity.
          </p>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="e.g. LV-C9M-2026-7FX8K"
              className="flex-1 rounded-lg border border-border/60 bg-background px-3 py-2 text-sm font-mono focus:border-brand-500 focus:outline-none"
            />
            <Button variant="outline">Verify</Button>
          </div>
        </section>
      </div>
    </div>
  );
}
