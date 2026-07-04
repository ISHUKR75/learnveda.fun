/**
 * @file app/(platform)/dashboard/settings/page.tsx
 * @description User settings and preferences page
 * Route: /dashboard/settings
 * Shows: Profile settings, notifications, privacy, and account management
 */

import type { Metadata } from "next";
import Link from "next/link";
import {
  Settings, ChevronRight, User, Bell, Shield, Palette,
  Globe, Volume2, Moon, Save, ChevronDown,
} from "lucide-react";
import { Badge }  from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* ─── Page Metadata ──────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title:  "Settings — Dashboard | LearnVeda",
  description: "Manage your LearnVeda account settings, notifications, and preferences.",
  robots: { index: false, follow: false },
};

/* ─── Settings Sections ──────────────────────────────────────────────────── */
// All settings sections shown on the page
const SETTINGS_SECTIONS = [
  {
    id:    "profile",
    icon:  User,
    title: "Profile",
    desc:  "Update your name, avatar, and bio",
    fields: [
      { label: "Full Name",     type: "text",   placeholder: "Arjun Sharma",       value: "Arjun Sharma"    },
      { label: "Username",      type: "text",   placeholder: "arjun_sharma",        value: "arjunsharma07"   },
      { label: "Email",         type: "email",  placeholder: "user@example.com",    value: "arjun@gmail.com", readonly: true },
      { label: "Bio",           type: "textarea",placeholder: "Tell us about yourself...", value: "Class 11 student | Math lover | Aspiring Engineer" },
      { label: "Class",         type: "select", placeholder: "Select class",        value: "class-11",
        options: ["class-9","class-10","class-11","class-12","engineering","graduation"] },
      { label: "School / College", type: "text", placeholder: "Your institution", value: "Delhi Public School" },
    ],
  },
  {
    id:    "notifications",
    icon:  Bell,
    title: "Notifications",
    desc:  "Choose what you want to be notified about",
    toggles: [
      { label: "Daily study reminder",      desc: "Get a reminder at your preferred time",           enabled: true  },
      { label: "Streak at risk alert",       desc: "Get notified if your streak is about to break",  enabled: true  },
      { label: "Battle match found",         desc: "Notify when a 1v1 battle match is ready",        enabled: true  },
      { label: "New community reply",        desc: "Notify when someone replies to your post",       enabled: true  },
      { label: "Achievement unlocked",       desc: "Celebrate each new achievement",                 enabled: true  },
      { label: "Weekly progress report",     desc: "Receive weekly email summary",                   enabled: false },
      { label: "Product updates",            desc: "News about new features and courses",            enabled: false },
    ],
  },
  {
    id:    "privacy",
    icon:  Shield,
    title: "Privacy",
    desc:  "Control who can see your data",
    toggles: [
      { label: "Show profile on leaderboard",  desc: "Your name and XP visible on public leaderboard", enabled: true  },
      { label: "Show streak publicly",          desc: "Others can see your current streak",              enabled: true  },
      { label: "Show battle history",           desc: "Your win/loss history is public",                 enabled: false },
      { label: "Allow community mentions",      desc: "Others can @mention you in posts",               enabled: true  },
    ],
  },
  {
    id:    "appearance",
    icon:  Palette,
    title: "Appearance",
    desc:  "Customize your LearnVeda experience",
    toggles: [
      { label: "Dark mode",         desc: "Switch between light and dark theme",              enabled: false },
      { label: "Compact mode",      desc: "Reduce spacing for more content on screen",       enabled: false },
      { label: "Animations",        desc: "Enable micro-animations throughout the app",      enabled: true  },
    ],
  },
];

/* ─── Settings Page Component ────────────────────────────────────────────── */
export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="border-b bg-gradient-to-br from-muted/50 to-background">
        <div className="container px-4 py-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">Settings</span>
          </nav>

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-muted border flex items-center justify-center">
              <Settings className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Settings</h1>
              <p className="text-sm text-muted-foreground">Manage your account and preferences</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Settings Sections ─────────────────────────────────────────────── */}
      <div className="container px-4 py-8 max-w-3xl space-y-6">
        {SETTINGS_SECTIONS.map((section) => {
          const Icon = section.icon;
          return (
            <section key={section.id} className="rounded-2xl border bg-card overflow-hidden">
              {/* Section header */}
              <div className="flex items-center gap-3 p-5 border-b bg-muted/20">
                <div className="h-8 w-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">{section.title}</div>
                  <div className="text-xs text-muted-foreground">{section.desc}</div>
                </div>
              </div>

              <div className="p-5 space-y-4">
                {/* Form fields (for Profile section) */}
                {"fields" in section && section.fields.map((field) => (
                  <div key={field.label} className="space-y-1.5">
                    <label className="text-sm font-medium">{field.label}</label>
                    {field.type === "textarea" ? (
                      <textarea
                        defaultValue={field.value}
                        placeholder={field.placeholder}
                        rows={3}
                        className="w-full rounded-lg border bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                        readOnly
                      />
                    ) : field.type === "select" ? (
                      <div className="relative">
                        <select
                          defaultValue={field.value}
                          className="w-full rounded-lg border bg-background px-3 py-2 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                        >
                          {field.options?.map((opt) => (
                            <option key={opt} value={opt}>{opt.replace(/-/g," ").replace(/\b\w/g,l=>l.toUpperCase())}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                      </div>
                    ) : (
                      <input
                        type={field.type}
                        defaultValue={field.value}
                        placeholder={field.placeholder}
                        readOnly={"readonly" in field ? field.readonly : false}
                        className={`w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 ${"readonly" in field && field.readonly ? "opacity-60 cursor-not-allowed" : ""}`}
                      />
                    )}
                    {"readonly" in field && field.readonly && (
                      <p className="text-[11px] text-muted-foreground">
                        Email is managed by your authentication provider
                      </p>
                    )}
                  </div>
                ))}

                {/* Toggle rows (for Notifications, Privacy, Appearance) */}
                {"toggles" in section && section.toggles.map((toggle) => (
                  <div key={toggle.label} className="flex items-center justify-between gap-4 py-1">
                    <div>
                      <div className="text-sm font-medium">{toggle.label}</div>
                      <div className="text-xs text-muted-foreground">{toggle.desc}</div>
                    </div>
                    {/* Toggle switch (visual only — state management would need "use client") */}
                    <div className={`relative h-5 w-9 rounded-full border-2 cursor-pointer transition-colors ${
                      toggle.enabled ? "bg-primary border-primary" : "bg-muted border-border"
                    }`}>
                      <div className={`absolute top-0.5 h-3 w-3 rounded-full bg-white shadow transition-transform ${
                        toggle.enabled ? "translate-x-4" : "translate-x-0.5"
                      }`} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Save button for Profile section */}
              {"fields" in section && (
                <div className="px-5 pb-5">
                  <Button size="sm">
                    <Save className="h-3.5 w-3.5 mr-1" />
                    Save Changes
                  </Button>
                </div>
              )}
            </section>
          );
        })}

        {/* ── Danger Zone ─────────────────────────────────────────────────── */}
        <section className="rounded-2xl border border-red-500/20 bg-red-500/5 overflow-hidden">
          <div className="p-5">
            <h3 className="font-semibold text-red-600 dark:text-red-400 mb-1">Danger Zone</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Irreversible actions — proceed with caution.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="border-red-500/30 text-red-600 hover:bg-red-500/10">
                Delete All Progress
              </Button>
              <Button variant="outline" size="sm" className="border-red-500/30 text-red-600 hover:bg-red-500/10">
                Delete Account
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
