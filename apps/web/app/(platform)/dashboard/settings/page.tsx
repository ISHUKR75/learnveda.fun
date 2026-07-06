/**
 * @file app/(platform)/dashboard/settings/page.tsx
 * @description User settings page
 * Route: /dashboard/settings
 */

import type { Metadata } from "next";
import { User, Bell, Shield, Palette, Globe2, CreditCard, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title:       "Settings — LearnVeda",
  description: "Manage your LearnVeda account settings, notifications, privacy, and subscription.",
  robots:      { index: false, follow: false },
};

/* ─── Settings sections ──────────────────────────────────────────────────── */
function SettingRow({ label, desc, children }: { label: string; desc?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-4 border-b last:border-0">
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        {desc && <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>}
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  );
}

function SettingsCard({ icon: Icon, title, children }: { icon: React.ComponentType<{ className?: string }>; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border bg-card p-6 shadow-sm mb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-brand-500/10 text-brand-500">
          <Icon className="h-5 w-5" />
        </div>
        <h2 className="font-bold text-foreground">{title}</h2>
      </div>
      {children}
    </div>
  );
}

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 md:px-6 py-10 max-w-3xl">
        <h1 className="text-2xl font-bold text-foreground mb-8">Account Settings</h1>

        {/* Profile */}
        <SettingsCard icon={User} title="Profile">
          <SettingRow label="Display Name" desc="Shown on leaderboard and community">
            <Button variant="outline" size="sm">Edit</Button>
          </SettingRow>
          <SettingRow label="Email Address" desc="demo@learnveda.in">
            <Button variant="outline" size="sm">Change</Button>
          </SettingRow>
          <SettingRow label="Profile Photo" desc="Used across the platform">
            <Button variant="outline" size="sm">Upload</Button>
          </SettingRow>
          <SettingRow label="Class / Level" desc="Class 9">
            <Button variant="outline" size="sm">Update</Button>
          </SettingRow>
        </SettingsCard>

        {/* Notifications */}
        <SettingsCard icon={Bell} title="Notifications">
          <SettingRow label="Daily Study Reminder" desc="Remind me if I haven't studied today">
            <div className="w-10 h-6 rounded-full bg-brand-500 flex items-center px-1">
              <div className="w-4 h-4 rounded-full bg-white ml-auto" />
            </div>
          </SettingRow>
          <SettingRow label="Streak Reminder" desc="Alert when my streak is at risk">
            <div className="w-10 h-6 rounded-full bg-brand-500 flex items-center px-1">
              <div className="w-4 h-4 rounded-full bg-white ml-auto" />
            </div>
          </SettingRow>
          <SettingRow label="Course Updates" desc="New chapters and simulations">
            <div className="w-10 h-6 rounded-full bg-muted flex items-center px-1">
              <div className="w-4 h-4 rounded-full bg-background border" />
            </div>
          </SettingRow>
          <SettingRow label="Battle Invites" desc="When someone challenges you">
            <div className="w-10 h-6 rounded-full bg-brand-500 flex items-center px-1">
              <div className="w-4 h-4 rounded-full bg-white ml-auto" />
            </div>
          </SettingRow>
        </SettingsCard>

        {/* Appearance */}
        <SettingsCard icon={Palette} title="Appearance">
          <SettingRow label="Theme" desc="Choose light or dark mode">
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Light</Button>
              <Button size="sm">Dark</Button>
            </div>
          </SettingRow>
          <SettingRow label="Language" desc="Platform interface language">
            <Button variant="outline" size="sm">English</Button>
          </SettingRow>
        </SettingsCard>

        {/* Privacy */}
        <SettingsCard icon={Shield} title="Privacy">
          <SettingRow label="Public Profile" desc="Show my profile on the leaderboard">
            <div className="w-10 h-6 rounded-full bg-brand-500 flex items-center px-1">
              <div className="w-4 h-4 rounded-full bg-white ml-auto" />
            </div>
          </SettingRow>
          <SettingRow label="Battle History" desc="Allow others to see my battle record">
            <div className="w-10 h-6 rounded-full bg-brand-500 flex items-center px-1">
              <div className="w-4 h-4 rounded-full bg-white ml-auto" />
            </div>
          </SettingRow>
          <SettingRow label="Analytics Sharing" desc="Help improve LearnVeda with anonymous data">
            <div className="w-10 h-6 rounded-full bg-brand-500 flex items-center px-1">
              <div className="w-4 h-4 rounded-full bg-white ml-auto" />
            </div>
          </SettingRow>
        </SettingsCard>

        {/* Subscription */}
        <SettingsCard icon={CreditCard} title="Subscription">
          <SettingRow label="Current Plan" desc="Renews on — N/A">
            <Badge variant="secondary">Free Plan</Badge>
          </SettingRow>
          <SettingRow label="Upgrade to Pro" desc="₹299/month (yearly) — unlock all content">
            <Button size="sm">Upgrade</Button>
          </SettingRow>
        </SettingsCard>

        {/* Danger zone */}
        <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-red-500/10 text-red-500">
              <Trash2 className="h-5 w-5" />
            </div>
            <h2 className="font-bold text-foreground">Danger Zone</h2>
          </div>
          <SettingRow label="Delete Account" desc="Permanently delete your account and all data. This cannot be undone.">
            <Button variant="destructive" size="sm">Delete Account</Button>
          </SettingRow>
        </div>
      </div>
    </div>
  );
}
