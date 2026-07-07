/**
 * @file features/email-broadcast/components/EmailBroadcastDashboard.tsx
 * @description Admin-only email broadcast dashboard for LearnVeda
 * @purpose Allows admins to send emails to all users or filtered segments
 * @used-by app/(platform)/admin/newsletter/page.tsx (admin-only route)
 *
 * Features:
 *  - Compose email with rich text preview
 *  - Target audience: All users / By class / By track / By streak / Custom
 *  - Preview before sending
 *  - Send history with open/click rates
 *  - Scheduled sends (future)
 *
 * Security: This page is protected by admin role check in (platform)/admin/layout.tsx.
 * API: POST /api/admin/email-broadcast → queues email via Resend.
 */

"use client";

import React, { useState }  from "react";
import { motion }           from "framer-motion";
import {
  Mail, Send, Users, Clock, CheckCircle2, XCircle,
  Eye, BarChart2, ChevronDown, AlertTriangle, Zap,
  Megaphone, Calendar, Star,
} from "lucide-react";
import { Button }  from "@/components/ui/button";
import { Badge }   from "@/components/ui/badge";
import { cn }      from "@/lib/utils";

/* ─── Audience Segment Types ─────────────────────────────────────────────── */
type Segment =
  | "all"         // All registered users
  | "class-9"     // Class 9 students
  | "class-10"    // Class 10 students
  | "class-11"    // Class 11 students
  | "class-12"    // Class 12 students
  | "engineering" // Engineering/programming track users
  | "active"      // Users active in last 7 days
  | "inactive"    // Users inactive for 14+ days
  | "premium";    // Pro/School subscribers

/* ─── Segment metadata ───────────────────────────────────────────────────── */
const SEGMENTS: { id: Segment; label: string; count: number; desc: string }[] = [
  { id: "all",         label: "All Users",       count: 24180, desc: "Every registered user" },
  { id: "class-9",     label: "Class 9",         count: 4820,  desc: "Class 9 track students" },
  { id: "class-10",    label: "Class 10",        count: 6340,  desc: "Class 10 track students" },
  { id: "class-11",    label: "Class 11",        count: 5120,  desc: "Class 11 track students" },
  { id: "class-12",    label: "Class 12",        count: 4900,  desc: "Class 12 track students" },
  { id: "engineering", label: "Engineering",     count: 8760,  desc: "Engineering/programming users" },
  { id: "active",      label: "Active (7d)",     count: 12400, desc: "Active in last 7 days" },
  { id: "inactive",    label: "Inactive (14d+)", count: 6200,  desc: "Not active for 14+ days" },
  { id: "premium",     label: "Premium",         count: 1840,  desc: "Pro & School subscribers" },
];

/* ─── Email Templates ────────────────────────────────────────────────────── */
const TEMPLATES = [
  {
    id: "new-feature",
    name: "New Feature Announcement",
    subject: "🚀 Exciting New Features on LearnVeda!",
    body: "Hi {{name}},\n\nWe've just launched some amazing new features that will supercharge your learning journey...\n\n[Feature description here]\n\nLogin now to explore: https://learnveda.in/dashboard\n\nHappy Learning,\nThe LearnVeda Team",
  },
  {
    id: "streak-reminder",
    name: "Streak Reminder",
    subject: "⚠️ {{name}}, your streak is at risk!",
    body: "Hi {{name}},\n\nYou haven't studied today and your {{streak}}-day streak is at risk of resetting!\n\nJust 15 minutes of learning will save your streak. Open LearnVeda and continue where you left off.\n\n👉 https://learnveda.in/learn\n\nDon't break the chain!\nLearnVeda Team",
  },
  {
    id: "event-invite",
    name: "Event Invitation",
    subject: "🎯 You're invited: {{event_name}} on LearnVeda",
    body: "Hi {{name}},\n\n{{event_name}} is happening on {{event_date}}.\n\n📅 Date: {{event_date}}\n⏰ Time: {{event_time}}\n🏆 Prize: {{prize}}\n\nRegister now before seats fill up!\n👉 https://learnveda.in/events\n\nLearnVeda Team",
  },
  {
    id: "monthly-report",
    name: "Monthly Progress Report",
    subject: "📊 Your {{month}} Learning Report — LearnVeda",
    body: "Hi {{name}},\n\nHere's your {{month}} learning summary:\n\n✅ Lessons completed: {{lessons}}\n⚡ XP earned: {{xp}}\n🔥 Longest streak: {{streak}} days\n⚔️ Battles won: {{battles}}\n\nKeep it up! You're doing great.\n\nLearnVeda Team",
  },
  {
    id: "blank",
    name: "Blank (Custom)",
    subject: "",
    body: "",
  },
];

/* ─── Send History ───────────────────────────────────────────────────────── */
// In production: fetched from MongoDB email_campaigns collection
const SEND_HISTORY = [
  {
    id: "c-001", subject: "🚀 New AI Tutor Feature!", segment: "All Users",
    sentCount: 24180, openRate: 42, clickRate: 18,
    status: "sent", sentAt: "2026-07-05 10:00",
  },
  {
    id: "c-002", subject: "⚠️ Streak Reminder — Don't break your chain!", segment: "Inactive (14d+)",
    sentCount: 6200, openRate: 38, clickRate: 25,
    status: "sent", sentAt: "2026-07-03 09:00",
  },
  {
    id: "c-003", subject: "🎯 Science Olympiad 2026 — Register now!", segment: "Class 11 + Class 12",
    sentCount: 10020, openRate: 51, clickRate: 32,
    status: "sent", sentAt: "2026-06-28 11:30",
  },
  {
    id: "c-004", subject: "📊 Your June Progress Report", segment: "Active (7d)",
    sentCount: 12400, openRate: 67, clickRate: 41,
    status: "sent", sentAt: "2026-07-01 08:00",
  },
];

/* ─── EmailBroadcastDashboard Component ──────────────────────────────────── */
export function EmailBroadcastDashboard() {
  /* ── Form state ──────────────────────────────────────────────────── */
  const [segment,     setSegment]    = useState<Segment>("all");
  const [subject,     setSubject]    = useState("");
  const [body,        setBody]       = useState("");
  const [templateId,  setTemplateId] = useState("blank");
  const [tab,         setTab]        = useState<"compose" | "history">("compose");
  const [isPreview,   setIsPreview]  = useState(false);
  const [isSending,   setIsSending]  = useState(false);
  const [sent,        setSent]       = useState(false);

  const selectedSegment = SEGMENTS.find((s) => s.id === segment)!;

  /* ── Apply template ──────────────────────────────────────────────── */
  const applyTemplate = (tplId: string) => {
    setTemplateId(tplId);
    const tpl = TEMPLATES.find((t) => t.id === tplId);
    if (tpl) {
      setSubject(tpl.subject);
      setBody(tpl.body);
    }
  };

  /* ── Send broadcast ──────────────────────────────────────────────── */
  const handleSend = async () => {
    if (!subject.trim() || !body.trim()) return;
    setIsSending(true);

    try {
      // POST to API route (Resend queues the emails in background)
      const res = await fetch("/api/admin/email-broadcast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ segment, subject, body, recipientCount: selectedSegment.count }),
      });

      if (res.ok) {
        setSent(true);
        setSubject("");
        setBody("");
        setTimeout(() => setSent(false), 4000);
      }
    } catch {
      // Show error toast in production
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 md:px-6 py-10 max-w-5xl mx-auto">

        {/* ── Header ───────────────────────────────────────────────── */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <Megaphone className="h-5 w-5 text-brand-500" />
            <h1 className="text-2xl font-bold text-foreground">Email Broadcast</h1>
            <Badge className="bg-red-500/10 text-red-600 border-red-500/20">Admin Only</Badge>
          </div>
          <p className="text-muted-foreground text-sm">
            Send targeted emails to your students. Emails are delivered via Resend with a 14-day suppression list for bounces.
          </p>
        </div>

        {/* ── Tab Navigation ───────────────────────────────────────── */}
        <div className="flex gap-1 rounded-xl bg-muted p-1 mb-6 w-fit">
          {(["compose", "history"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "rounded-lg px-4 py-1.5 text-sm font-medium transition-all",
                tab === t ? "bg-background text-foreground shadow-sm" : "text-muted-foreground",
              )}
            >
              {t === "compose" ? "Compose" : "Send History"}
            </button>
          ))}
        </div>

        {/* ── Compose Tab ──────────────────────────────────────────── */}
        {tab === "compose" && (
          <div className="grid lg:grid-cols-3 gap-6">

            {/* Left: Audience Selector */}
            <div className="space-y-4">
              <div className="rounded-xl border bg-card p-4">
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Users className="h-4 w-4" /> Audience
                </h3>
                <div className="space-y-1.5">
                  {SEGMENTS.map((seg) => (
                    <button
                      key={seg.id}
                      onClick={() => setSegment(seg.id)}
                      className={cn(
                        "w-full text-left rounded-lg border px-3 py-2.5 text-sm transition-all",
                        segment === seg.id
                          ? "border-brand-500 bg-brand-500/10"
                          : "border-border hover:border-brand-500/30",
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className={segment === seg.id ? "text-brand-500 font-medium" : "text-foreground"}>
                          {seg.label}
                        </span>
                        <span className="text-xs text-muted-foreground">{seg.count.toLocaleString()}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">{seg.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Estimated reach */}
              <div className="rounded-xl border bg-card p-4">
                <h3 className="text-sm font-semibold text-foreground mb-2">Estimated Reach</h3>
                <div className="text-3xl font-bold text-brand-500">{selectedSegment.count.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground mt-1">recipients</div>
                <div className="mt-2 text-xs text-amber-600 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  Unsubscribed users excluded automatically
                </div>
              </div>
            </div>

            {/* Right: Compose */}
            <div className="lg:col-span-2 space-y-4">
              {/* Template picker */}
              <div className="rounded-xl border bg-card p-4">
                <h3 className="font-semibold text-foreground mb-3">Template</h3>
                <div className="flex flex-wrap gap-2">
                  {TEMPLATES.map((tpl) => (
                    <button
                      key={tpl.id}
                      onClick={() => applyTemplate(tpl.id)}
                      className={cn(
                        "rounded-full border px-3 py-1 text-xs font-medium transition-all",
                        templateId === tpl.id
                          ? "border-brand-500 bg-brand-500/10 text-brand-500"
                          : "border-border text-muted-foreground hover:border-brand-500/40",
                      )}
                    >
                      {tpl.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subject */}
              <div className="rounded-xl border bg-card p-4">
                <label className="block text-sm font-semibold text-foreground mb-2">Subject Line</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Enter email subject..."
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                />
                <div className="text-xs text-muted-foreground mt-1.5">
                  Variables: {"{{name}}"}, {"{{streak}}"}, {"{{xp}}"}, {"{{level}}"}
                </div>
              </div>

              {/* Body */}
              <div className="rounded-xl border bg-card p-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-foreground">Email Body</label>
                  <button
                    onClick={() => setIsPreview(!isPreview)}
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    {isPreview ? "Edit" : "Preview"}
                  </button>
                </div>

                {isPreview ? (
                  <div className="min-h-48 rounded-lg border border-border bg-muted/20 p-4 text-sm text-foreground whitespace-pre-wrap font-mono">
                    {body || <span className="text-muted-foreground">No content yet...</span>}
                  </div>
                ) : (
                  <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="Write your email body here..."
                    rows={10}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-500/30 resize-none font-mono"
                  />
                )}
              </div>

              {/* Send button */}
              <div className="flex items-center gap-3">
                <Button
                  onClick={handleSend}
                  disabled={!subject.trim() || !body.trim() || isSending}
                  className="gap-2 bg-brand-500 hover:bg-brand-600 text-white"
                >
                  {isSending ? (
                    <><Clock className="h-4 w-4 animate-spin" /> Sending...</>
                  ) : sent ? (
                    <><CheckCircle2 className="h-4 w-4" /> Sent!</>
                  ) : (
                    <><Send className="h-4 w-4" /> Send to {selectedSegment.count.toLocaleString()} recipients</>
                  )}
                </Button>
                <span className="text-xs text-muted-foreground">
                  Delivered via Resend. Subject to rate limits.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ── History Tab ───────────────────────────────────────────── */}
        {tab === "history" && (
          <div className="space-y-3">
            {SEND_HISTORY.map((c) => (
              <div key={c.id} className="rounded-xl border bg-card px-5 py-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-semibold text-foreground">{c.subject}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Sent to: {c.segment} · {c.sentCount.toLocaleString()} recipients · {c.sentAt}
                    </div>
                  </div>
                  <Badge className={cn(
                    "text-xs",
                    c.status === "sent"
                      ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                      : "bg-amber-500/10 text-amber-600 border-amber-500/20",
                  )}>
                    {c.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-4 pt-3 border-t border-border">
                  <div>
                    <div className="text-xs text-muted-foreground mb-0.5">Delivered</div>
                    <div className="font-bold text-foreground">{c.sentCount.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-0.5">Open Rate</div>
                    <div className="font-bold text-foreground">{c.openRate}%</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-0.5">Click Rate</div>
                    <div className="font-bold text-foreground">{c.clickRate}%</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
