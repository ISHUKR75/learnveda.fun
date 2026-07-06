/**
 * @file app/(platform)/admin/newsletter/page.tsx
 * @description Admin-only Newsletter / Email Blast page
 *
 * Route: /admin/newsletter
 *
 * This page is NOT visible to regular users.
 * Only accessible to users with the `admin` role in MongoDB.
 * Used to send bulk update emails to all registered LearnVeda users.
 *
 * Features:
 *  - Compose email with subject, body (rich text), and audience filter
 *  - Preview before sending
 *  - Send via Resend API to all matching users
 *  - Scheduling (future)
 *  - Sent history log
 *
 * Security:
 *  - Route is protected by middleware — redirects non-admins to /dashboard
 *  - API calls require admin role validation server-side
 *  - All sends are logged with timestamp, sender, and recipient count
 */

"use client"; // Client component — form state + preview

import React, { useState }  from "react";     // React hooks
import {
  Mail, Send, Eye, AlertTriangle,
  Users, CheckCircle2, Loader2, Clock,
} from "lucide-react"; // Icons for UI
import { Badge }   from "@/components/ui/badge";    // Badge component
import { Button }  from "@/components/ui/button";   // Button component
import { Input }   from "@/components/ui/input";    // Input component

/* ─── Audience filter options ────────────────────────────────────────────── */
const AUDIENCE_OPTIONS = [
  { value: "all",          label: "All Users",             count: "50,000+" },
  { value: "free",         label: "Free Plan Users",       count: "45,000+" },
  { value: "pro",          label: "Pro Subscribers",       count: "5,000+"  },
  { value: "class9",       label: "Class 9 Students",      count: "8,000+"  },
  { value: "class10",      label: "Class 10 Students",     count: "12,000+" },
  { value: "class11",      label: "Class 11 Students",     count: "10,000+" },
  { value: "class12",      label: "Class 12 Students",     count: "9,000+"  },
  { value: "engineering",  label: "Engineering Students",  count: "6,000+"  },
  { value: "inactive",     label: "Inactive (7+ days)",    count: "15,000+" },
];

/* ─── Email template options ─────────────────────────────────────────────── */
const EMAIL_TEMPLATES = [
  { value: "blank",         label: "Blank — Start fresh"          },
  { value: "new_feature",   label: "New Feature Announcement"     },
  { value: "new_content",   label: "New Chapters / Content Added" },
  { value: "streak_alert",  label: "Streak Alert (re-engagement)" },
  { value: "weekly_digest", label: "Weekly Progress Digest"       },
  { value: "promo",         label: "Promotional / Offer"          },
];

/* ─── Past email log (demo data) ─────────────────────────────────────────── */
const PAST_EMAILS = [
  { subject: "New Physics Simulations Added!", audience: "All Users", sent: 50000, date: "June 28, 2025", status: "delivered" },
  { subject: "Don't Break Your Streak! 🔥",   audience: "Inactive (7+ days)", sent: 14200, date: "June 20, 2025", status: "delivered" },
  { subject: "LearnVeda Pro — 30% Off This Week", audience: "Free Plan Users", sent: 45000, date: "June 15, 2025", status: "delivered" },
];

/* ─── NewsletterAdminPage Component ──────────────────────────────────────── */
export default function NewsletterAdminPage() {
  // Email composition state
  const [subject,   setSubject]   = useState("");                     // Email subject line
  const [body,      setBody]      = useState("");                      // Email HTML body
  const [audience,  setAudience]  = useState("all");                   // Target audience
  const [template,  setTemplate]  = useState("blank");                 // Email template
  const [showPreview, setShowPreview] = useState(false);               // Preview modal toggle
  const [isSending, setIsSending] = useState(false);                   // Sending state
  const [sent,      setSent]      = useState(false);                   // Success state
  const [error,     setError]     = useState("");                      // Error message

  /* ── Validate form ──────────────────────────────────────────────────── */
  const isValid = subject.trim().length > 3 && body.trim().length > 20; // Minimum content

  /* ── Handle send ────────────────────────────────────────────────────── */
  const handleSend = async () => {
    if (!isValid || isSending) return; // Guard against invalid/double submit

    setIsSending(true);  // Show loading state
    setError("");        // Clear previous error

    try {
      // Call the admin email blast API
      const response = await fetch("/api/admin/newsletter", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Send session cookie for auth
        body:    JSON.stringify({ subject, body, audience }),
      });

      if (!response.ok) {
        const data = await response.json() as { error?: string };
        throw new Error(data.error ?? "Failed to send newsletter");
      }

      setSent(true);     // Show success state
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send newsletter");
    } finally {
      setIsSending(false); // Reset loading state
    }
  };

  /* ── Success screen ─────────────────────────────────────────────────── */
  if (sent) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
            <CheckCircle2 className="h-8 w-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Newsletter Sent!</h2>
          <p className="text-muted-foreground">
            Your email has been queued and will be delivered to{" "}
            {AUDIENCE_OPTIONS.find((a) => a.value === audience)?.count} users.
          </p>
          <Button onClick={() => { setSent(false); setSubject(""); setBody(""); }}>
            Send Another Email
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 md:px-6 py-10 max-w-5xl">

        {/* ── Header ──────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold text-foreground">Newsletter Manager</h1>
              <Badge className="bg-red-500/10 text-red-500 border-red-500/20">Admin Only</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Send email updates to LearnVeda users. All sends are logged.
            </p>
          </div>
        </div>

        {/* ── Warning banner ──────────────────────────────────────────── */}
        <div className="flex items-start gap-3 p-4 rounded-xl border border-yellow-500/30 bg-yellow-500/5 mb-8">
          <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">Admin Action</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              This will send real emails to registered LearnVeda users. Double-check the content and audience before sending.
              This action is logged and cannot be undone.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* ── Left: Compose form ────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Template selector */}
            <div className="rounded-2xl border bg-card p-6 shadow-sm">
              <label className="text-sm font-semibold text-foreground block mb-3">
                Email Template
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {EMAIL_TEMPLATES.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => setTemplate(t.value)}
                    className={`p-3 rounded-lg border text-xs text-left transition-colors ${
                      template === t.value
                        ? "border-brand-500 bg-brand-500/10 text-brand-500 font-medium"
                        : "hover:border-muted-foreground/30 text-muted-foreground"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Email composition */}
            <div className="rounded-2xl border bg-card p-6 shadow-sm space-y-4">
              {/* Subject */}
              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">
                  Subject Line <span className="text-red-500">*</span>
                </label>
                <Input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. New Physics Simulations Added! 🔭"
                  maxLength={100} // Email subject max length
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {subject.length}/100 characters
                </p>
              </div>

              {/* Body */}
              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">
                  Email Body (HTML supported) <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Write your email content here. You can use HTML tags for formatting.

Example:
<h2>New Features on LearnVeda!</h2>
<p>We just launched 50 new chapters for Class 12 Physics...</p>
<a href='https://learnveda.in/learn/class-12'>Start Learning →</a>"
                  className="w-full h-64 px-4 py-3 rounded-xl border bg-background font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {body.length} characters
                </p>
              </div>

              {/* Error message */}
              {error && (
                <div className="flex items-center gap-2 text-red-500 text-sm p-3 rounded-lg bg-red-500/10">
                  <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              {/* Action buttons */}
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() => setShowPreview(!showPreview)}
                  disabled={!isValid}
                >
                  <Eye className="h-4 w-4" />
                  {showPreview ? "Hide Preview" : "Preview Email"}
                </Button>

                <Button
                  className="gap-2"
                  onClick={handleSend}
                  disabled={!isValid || isSending}
                >
                  {isSending ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</>
                  ) : (
                    <><Send className="h-4 w-4" /> Send Email</>
                  )}
                </Button>
              </div>
            </div>

            {/* Email preview */}
            {showPreview && isValid && (
              <div className="rounded-2xl border bg-card p-6 shadow-sm">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Eye className="h-4 w-4 text-brand-500" />
                  Email Preview
                </h3>
                <div className="border rounded-xl overflow-hidden">
                  {/* Preview header */}
                  <div className="bg-muted px-4 py-3 border-b">
                    <p className="text-xs text-muted-foreground">From: LearnVeda &lt;hello@learnveda.in&gt;</p>
                    <p className="text-sm font-semibold text-foreground mt-1">{subject}</p>
                  </div>
                  {/* Preview body */}
                  <div
                    className="p-6 prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: body }} // Render HTML preview
                  />
                </div>
              </div>
            )}
          </div>

          {/* ── Right sidebar: Audience + Stats ───────────────────────── */}
          <div className="space-y-6">
            {/* Audience selector */}
            <div className="rounded-2xl border bg-card p-5 shadow-sm">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Users className="h-4 w-4 text-brand-500" />
                Target Audience
              </h3>
              <div className="space-y-2">
                {AUDIENCE_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setAudience(opt.value)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg border text-sm transition-colors ${
                      audience === opt.value
                        ? "border-brand-500 bg-brand-500/10"
                        : "hover:border-muted-foreground/30"
                    }`}
                  >
                    <span className={audience === opt.value ? "text-brand-500 font-medium" : "text-foreground"}>
                      {opt.label}
                    </span>
                    <Badge variant="secondary" className="text-xs">{opt.count}</Badge>
                  </button>
                ))}
              </div>
            </div>

            {/* Send stats */}
            <div className="rounded-2xl border bg-card p-5 shadow-sm">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Mail className="h-4 w-4 text-brand-500" />
                Email Stats
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Total sent (30d)</span><span className="font-medium">3 emails</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Total recipients</span><span className="font-medium">109,200</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Avg open rate</span><span className="font-medium text-green-500">34.2%</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Avg click rate</span><span className="font-medium text-brand-500">8.7%</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Sent history ──────────────────────────────────────────────── */}
        <div className="mt-10">
          <h2 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <Clock className="h-4 w-4 text-brand-500" />
            Recent Emails Sent
          </h2>
          <div className="space-y-3">
            {PAST_EMAILS.map((email, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl border bg-card shadow-sm flex-wrap gap-3">
                <div>
                  <p className="font-medium text-foreground text-sm">{email.subject}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    To: {email.audience} · {email.sent.toLocaleString()} recipients · {email.date}
                  </p>
                </div>
                <Badge className="bg-green-500/10 text-green-600 border-green-500/20 text-xs">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  {email.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
