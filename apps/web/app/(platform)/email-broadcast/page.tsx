/**
 * @file app/(platform)/email-broadcast/page.tsx
 * @description Email Broadcast / Newsletter Admin Page
 * Route: /email-broadcast
 *
 * Allows admins to send email updates to all registered users.
 * Features:
 *   - Audience segmentation (all, class-9, class-10, class-11, class-12, engineering, premium)
 *   - Rich text email composition with preview
 *   - Schedule or send immediately
 *   - Campaign history with open/click rates
 *
 * This page is NOT shown to regular users.
 * Middleware redirects non-admin users to /dashboard before this renders.
 */

"use client"; // Client component — form, rich text, preview state

/* ─── Imports ─────────────────────────────────────────────────────────────── */
import { useState }  from "react"; // React state
import Link          from "next/link"; // Navigation
import {
  Mail, Send, Users, ChevronRight, Clock,
  CheckCircle2, AlertCircle, BarChart3,
  Eye, MousePointerClick, Calendar, Loader2,
} from "lucide-react"; // Icons
import { Badge }  from "@/components/ui/badge";   // Badge
import { Button } from "@/components/ui/button";  // Button

/* ─── Audience Segments ──────────────────────────────────────────────────── */
/** Available user segments for targeted email campaigns */
const AUDIENCE_SEGMENTS = [
  { id: "all",         label: "All Users",           icon: "👥", count: "10,247", color: "bg-blue-500/10 border-blue-500/20 text-blue-600" },
  { id: "class-9",     label: "Class 9 Students",    icon: "📗", count: "2,103",  color: "bg-green-500/10 border-green-500/20 text-green-600" },
  { id: "class-10",    label: "Class 10 Students",   icon: "📘", count: "2,891",  color: "bg-blue-500/10 border-blue-500/20 text-blue-600" },
  { id: "class-11",    label: "Class 11 Students",   icon: "📙", count: "1,847",  color: "bg-orange-500/10 border-orange-500/20 text-orange-600" },
  { id: "class-12",    label: "Class 12 Students",   icon: "📕", count: "2,156",  color: "bg-red-500/10 border-red-500/20 text-red-600" },
  { id: "engineering", label: "Engineering Track",   icon: "⚙️", count: "987",    color: "bg-purple-500/10 border-purple-500/20 text-purple-600" },
  { id: "premium",     label: "Pro / Premium Users", icon: "⭐", count: "1,247",  color: "bg-yellow-500/10 border-yellow-500/20 text-yellow-600" },
];

/* ─── Past Campaign Data ─────────────────────────────────────────────────── */
/** History of sent email campaigns with performance metrics */
const PAST_CAMPAIGNS = [
  {
    id:          "c-001",
    subject:     "🎉 New Class 12 Physics simulations are live!",
    audience:    "Class 12 Students",
    sent:        "Jun 28, 2026",
    recipients:  2156,
    openRate:    "64.2%",
    clickRate:   "18.7%",
    status:      "sent" as const,
  },
  {
    id:          "c-002",
    subject:     "📢 DSA 60-Day Plan: Week 3 Recap & Tips",
    audience:    "Engineering Track",
    sent:        "Jun 22, 2026",
    recipients:  987,
    openRate:    "71.3%",
    clickRate:   "24.1%",
    status:      "sent" as const,
  },
  {
    id:          "c-003",
    subject:     "🏆 Leaderboard Update: Top 100 students this week",
    audience:    "All Users",
    sent:        "Jun 15, 2026",
    recipients:  10247,
    openRate:    "48.9%",
    clickRate:   "12.4%",
    status:      "sent" as const,
  },
  {
    id:          "c-004",
    subject:     "📅 Board Exam Countdown: 30-Day Strategy",
    audience:    "Class 10 Students",
    sent:        "Jun 8, 2026",
    recipients:  2891,
    openRate:    "78.4%",
    clickRate:   "31.2%",
    status:      "sent" as const,
  },
];

/* ─── Send State Type ─────────────────────────────────────────────────────── */
type SendState = "idle" | "sending" | "success" | "error";

/* ─── Page Component ─────────────────────────────────────────────────────── */
export default function EmailBroadcastPage() {
  /* ── Form State ──────────────────────────────────────────────────────── */
  const [subject,    setSubject]    = useState("");                    // Email subject line
  const [audience,   setAudience]   = useState("all");                 // Selected segment ID
  const [bodyText,   setBodyText]   = useState("");                    // Plain text body
  const [sendState,  setSendState]  = useState<SendState>("idle");     // Submission state
  const [preview,    setPreview]    = useState(false);                 // Show email preview

  /* ── Selected segment info ───────────────────────────────────────────── */
  const selectedSegment = AUDIENCE_SEGMENTS.find((s) => s.id === audience)!;

  /* ── Handle Send ─────────────────────────────────────────────────────── */
  const handleSend = async () => {
    if (!subject.trim() || !bodyText.trim()) return; // Validation

    setSendState("sending"); // Show loading state

    try {
      /* Call the email API route */
      const res = await fetch("/api/email", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type:     "broadcast",
          audience, // Segment ID
          subject:  subject.trim(),
          body:     bodyText.trim(),
        }),
      });

      if (res.ok) {
        setSendState("success"); // Show success
        /* Reset form after 3 seconds */
        setTimeout(() => {
          setSubject("");
          setBodyText("");
          setSendState("idle");
        }, 3000);
      } else {
        setSendState("error"); // Show error
        setTimeout(() => setSendState("idle"), 3000);
      }
    } catch {
      setSendState("error"); // Network error
      setTimeout(() => setSendState("idle"), 3000);
    }
  };

  /* ── Render ──────────────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-background">
      {/* ── Page Header ───────────────────────────────────────────────── */}
      <div className="border-b border-border/40 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4" aria-label="Breadcrumb">
            <Link href="/admin" className="hover:text-foreground transition-colors">Admin</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">Email Broadcast</span>
          </nav>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <Mail className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Email Broadcast</h1>
              <p className="text-muted-foreground text-sm mt-0.5">
                Send newsletters and updates to LearnVeda users by audience segment
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            {[
              { label: "Total Users",   value: "10,247", icon: Users },
              { label: "Avg Open Rate", value: "65.7%",  icon: Eye },
              { label: "Campaigns Sent",value: "24",     icon: Send },
            ].map((stat) => (
              <div key={stat.label} className="rounded-lg border border-border/40 bg-card p-4 flex items-center gap-3">
                <stat.icon className="h-5 w-5 text-muted-foreground shrink-0" />
                <div>
                  <p className="font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Content ──────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Compose Form ─────────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl border border-border/40 bg-card p-6 space-y-6">
              <h2 className="font-semibold text-lg">Compose Email</h2>

              {/* Subject line */}
              <div className="space-y-1.5">
                <label htmlFor="email-subject" className="text-sm font-medium">
                  Subject Line *
                </label>
                <input
                  id="email-subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. 🎉 New features are live on LearnVeda!"
                  maxLength={100}
                  className="w-full rounded-lg border border-border/60 bg-background px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500/30"
                />
                <p className="text-xs text-muted-foreground text-right">{subject.length}/100</p>
              </div>

              {/* Audience segment */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Audience Segment *</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {AUDIENCE_SEGMENTS.map((seg) => (
                    <button
                      key={seg.id}
                      onClick={() => setAudience(seg.id)}
                      className={`rounded-lg border p-3 text-left transition-all ${
                        audience === seg.id
                          ? `${seg.color} border-opacity-100`
                          : "border-border/40 hover:border-border/80"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 text-sm font-medium">
                        <span>{seg.icon}</span>
                        <span>{seg.label}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{seg.count} users</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Email body */}
              <div className="space-y-1.5">
                <label htmlFor="email-body" className="text-sm font-medium">
                  Email Body *
                </label>
                <textarea
                  id="email-body"
                  value={bodyText}
                  onChange={(e) => setBodyText(e.target.value)}
                  placeholder={`Write your email content here...\n\nTips:\n- Keep it short and actionable\n- Include a clear call-to-action\n- Personalize with {name} placeholder\n- Add relevant links`}
                  rows={12}
                  className="w-full rounded-lg border border-border/60 bg-background px-3 py-2.5 text-sm font-mono focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500/30 resize-none"
                />
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  className="gap-1.5"
                  onClick={() => setPreview((p) => !p)}
                >
                  <Eye className="h-4 w-4" />
                  {preview ? "Hide Preview" : "Preview"}
                </Button>

                <Button
                  onClick={handleSend}
                  disabled={!subject.trim() || !bodyText.trim() || sendState !== "idle"}
                  className="gap-1.5 ml-auto"
                >
                  {sendState === "sending" ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>
                  ) : sendState === "success" ? (
                    <><CheckCircle2 className="h-4 w-4 text-green-400" /> Sent!</>
                  ) : sendState === "error" ? (
                    <><AlertCircle className="h-4 w-4 text-red-400" /> Failed</>
                  ) : (
                    <><Send className="h-4 w-4" /> Send to {selectedSegment.count} users</>
                  )}
                </Button>
              </div>

              {/* Status messages */}
              {sendState === "success" && (
                <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-3 flex items-center gap-2 text-green-600 text-sm">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  Email campaign sent successfully to {selectedSegment.count} users!
                </div>
              )}
              {sendState === "error" && (
                <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 flex items-center gap-2 text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  Failed to send. Please try again or check the API configuration.
                </div>
              )}
            </div>

            {/* Email preview */}
            {preview && (
              <div className="rounded-xl border border-border/40 bg-card p-6">
                <h2 className="font-semibold mb-4 flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Email Preview
                </h2>
                <div className="rounded-lg border border-border/40 bg-white dark:bg-gray-900 overflow-hidden">
                  {/* Email header */}
                  <div className="bg-gradient-to-r from-brand-500 to-purple-600 p-6 text-white">
                    <p className="font-bold text-lg">LearnVeda</p>
                    <p className="text-sm text-white/70 mt-0.5">learn smarter · rank higher</p>
                  </div>
                  {/* Email body preview */}
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-gray-100">
                      {subject || "(Subject line will appear here)"}
                    </h3>
                    <div className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap leading-relaxed">
                      {bodyText || "(Email body will appear here)"}
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-400">
                      <p>You received this because you signed up at learnveda.in</p>
                      <p className="mt-1">Unsubscribe · Manage preferences · Privacy policy</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── Sidebar: Campaign History ─────────────────────────────── */}
          <div className="space-y-6">
            <div className="rounded-xl border border-border/40 bg-card p-5">
              <h2 className="font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Campaign History
              </h2>

              <div className="space-y-4">
                {PAST_CAMPAIGNS.map((campaign) => (
                  <div
                    key={campaign.id}
                    className="rounded-lg border border-border/30 p-3 hover:border-border/60 transition-colors"
                  >
                    {/* Subject */}
                    <p className="text-sm font-medium leading-tight line-clamp-2">
                      {campaign.subject}
                    </p>
                    {/* Audience & date */}
                    <div className="flex items-center gap-2 mt-1.5">
                      <Badge variant="secondary" className="text-xs">{campaign.audience}</Badge>
                      <span className="text-xs text-muted-foreground">{campaign.sent}</span>
                    </div>
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      <div className="text-center">
                        <p className="text-xs font-bold">{campaign.recipients.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Sent</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs font-bold text-green-600">{campaign.openRate}</p>
                        <p className="text-xs text-muted-foreground flex justify-center gap-0.5">
                          <Eye className="h-2.5 w-2.5 mt-0.5" /> Opens
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs font-bold text-blue-600">{campaign.clickRate}</p>
                        <p className="text-xs text-muted-foreground flex justify-center gap-0.5">
                          <MousePointerClick className="h-2.5 w-2.5 mt-0.5" /> Clicks
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Best practices card */}
            <div className="rounded-xl border border-border/40 bg-card p-5">
              <h2 className="font-semibold mb-3">📋 Best Practices</h2>
              <ul className="space-y-2 text-xs text-muted-foreground">
                {[
                  "Keep subject lines under 60 characters",
                  "Send Tuesday–Thursday for best open rates",
                  "Include exactly ONE clear call-to-action",
                  "Personalize with {name} for 26% higher opens",
                  "Test on mobile — 60% of users read on phone",
                  "GDPR: always include unsubscribe link",
                ].map((tip) => (
                  <li key={tip} className="flex items-start gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-500 shrink-0 mt-0.5" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
