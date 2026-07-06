/**
 * @file app/(platform)/settings/page.tsx
 * @description User Settings page for LearnVeda
 * Route: /settings
 *
 * Sections:
 *   - Profile: name, bio, avatar, username
 *   - Learning: preferred language, daily goal, notifications
 *   - Appearance: theme (light/dark/system), font size, reduced motion
 *   - Privacy: public profile, activity visibility, search indexing
 *   - Account: change password, delete account, connected apps
 *   - Notifications: email preferences, push notification toggles
 */

"use client"; // Client component — form state, theme toggle

/* ─── Imports ─────────────────────────────────────────────────────────────── */
import { useState } from "react"; // React state
import Link         from "next/link"; // Navigation
import {
  User, Palette, Bell, Shield, Trash2,
  ChevronRight, Save, Moon, Sun, Monitor,
  Globe, BookOpen, Target, Volume2,
  CheckCircle2, Loader2,
} from "lucide-react"; // Icons
import { Badge }  from "@/components/ui/badge";   // Badge
import { Button } from "@/components/ui/button";  // Button

/* ─── Settings Section Type ──────────────────────────────────────────────── */
type SettingsTab = "profile" | "learning" | "appearance" | "notifications" | "privacy" | "account";

/* ─── Save State ─────────────────────────────────────────────────────────── */
type SaveState = "idle" | "saving" | "saved";

/* ─── Toggle Component ───────────────────────────────────────────────────── */
/** Reusable toggle switch for boolean settings */
function Toggle({ checked, onChange, id }: { checked: boolean; onChange: (v: boolean) => void; id: string }) {
  return (
    <button
      id={id}
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500/30 ${
        checked ? "bg-brand-500" : "bg-muted-foreground/30"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-4" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

/* ─── Page Component ─────────────────────────────────────────────────────── */
export default function SettingsPage() {
  /* ── Active tab ──────────────────────────────────────────────────────── */
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile"); // Current settings section

  /* ── Save state ──────────────────────────────────────────────────────── */
  const [saveState, setSaveState] = useState<SaveState>("idle"); // Save button state

  /* ── Profile settings ────────────────────────────────────────────────── */
  const [profileName,  setProfileName]  = useState("Aarav Kumar");       // Display name
  const [profileBio,   setProfileBio]   = useState("Class 10 student · LearnVeda learner 🚀"); // Bio
  const [profileEmail, setProfileEmail] = useState("aarav@example.com");  // Email (read-only)
  const [profileLang,  setProfileLang]  = useState("en");                 // Interface language

  /* ── Learning settings ───────────────────────────────────────────────── */
  const [dailyGoal,     setDailyGoal]    = useState(30);    // Daily study goal in minutes
  const [autoPlay,      setAutoPlay]     = useState(false);  // Auto-play next lesson
  const [showProgress,  setShowProgress] = useState(true);   // Show progress bar
  const [soundEffects,  setSoundEffects] = useState(true);   // XP sound effects

  /* ── Appearance settings ─────────────────────────────────────────────── */
  const [theme,         setTheme]        = useState<"light" | "dark" | "system">("system"); // Theme
  const [fontSize,      setFontSize]     = useState<"small" | "medium" | "large">("medium"); // Font size
  const [reducedMotion, setReducedMotion] = useState(false);  // Disable animations
  const [compactMode,   setCompactMode]  = useState(false);   // Dense UI layout

  /* ── Notification settings ───────────────────────────────────────────── */
  const [emailStreak,   setEmailStreak]   = useState(true);  // Daily streak reminder
  const [emailWeekly,   setEmailWeekly]   = useState(true);  // Weekly progress email
  const [emailBattle,   setEmailBattle]   = useState(false); // Battle invite notification
  const [emailEvents,   setEmailEvents]   = useState(true);  // Upcoming events
  const [pushEnabled,   setPushEnabled]   = useState(false); // Push notifications

  /* ── Privacy settings ────────────────────────────────────────────────── */
  const [publicProfile,    setPublicProfile]    = useState(true);  // Public profile visibility
  const [showActivity,     setShowActivity]     = useState(true);  // Show activity on profile
  const [searchIndexed,    setSearchIndexed]    = useState(true);  // Profile in search results
  const [showLeaderboard,  setShowLeaderboard]  = useState(true);  // Appear on leaderboard

  /* ── Save handler ────────────────────────────────────────────────────── */
  const handleSave = async () => {
    setSaveState("saving");
    /* Simulate API save (replace with real PATCH /api/user/settings) */
    await new Promise((r) => setTimeout(r, 1000));
    setSaveState("saved");
    setTimeout(() => setSaveState("idle"), 2000);
  };

  /* ── Navigation tabs ─────────────────────────────────────────────────── */
  const TABS: { id: SettingsTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "profile",       label: "Profile",       icon: User },
    { id: "learning",      label: "Learning",      icon: BookOpen },
    { id: "appearance",    label: "Appearance",    icon: Palette },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy",       label: "Privacy",       icon: Shield },
    { id: "account",       label: "Account",       icon: User },
  ];

  /* ── Render ──────────────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/40 bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4" aria-label="Breadcrumb">
            <Link href="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">Settings</span>
          </nav>
          <h1 className="text-2xl font-bold">Account Settings</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your profile, preferences, and account</p>
        </div>
      </div>

      {/* Main layout */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row gap-8">
          {/* Sidebar nav */}
          <nav className="w-full sm:w-48 shrink-0" aria-label="Settings sections">
            <ul className="space-y-1">
              {TABS.map((tab) => (
                <li key={tab.id}>
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all text-left ${
                      activeTab === tab.id
                        ? "bg-brand-500/10 text-brand-500 font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                    }`}
                  >
                    <tab.icon className="h-4 w-4 shrink-0" />
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Settings panels */}
          <div className="flex-1 space-y-6">

            {/* ── Profile Tab ─────────────────────────────────────── */}
            {activeTab === "profile" && (
              <div className="rounded-xl border border-border/40 bg-card p-6 space-y-5">
                <h2 className="font-semibold text-lg">Profile Information</h2>

                {/* Avatar */}
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shrink-0">
                    AK
                  </div>
                  <div>
                    <Button variant="outline" size="sm">Change Avatar</Button>
                    <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 2MB</p>
                  </div>
                </div>

                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="profile-name" className="text-sm font-medium">Display Name</label>
                  <input
                    id="profile-name"
                    type="text"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="w-full rounded-lg border border-border/60 bg-background px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500/30"
                  />
                </div>

                {/* Bio */}
                <div className="space-y-1.5">
                  <label htmlFor="profile-bio" className="text-sm font-medium">Bio</label>
                  <textarea
                    id="profile-bio"
                    value={profileBio}
                    onChange={(e) => setProfileBio(e.target.value)}
                    rows={3}
                    maxLength={160}
                    className="w-full rounded-lg border border-border/60 bg-background px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500/30 resize-none"
                  />
                  <p className="text-xs text-muted-foreground text-right">{profileBio.length}/160</p>
                </div>

                {/* Email (read-only) */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Email</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="email"
                      value={profileEmail}
                      readOnly
                      className="flex-1 rounded-lg border border-border/60 bg-muted/30 px-3 py-2 text-sm text-muted-foreground cursor-not-allowed"
                    />
                    <Badge variant="secondary" className="text-xs">Verified</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Email is managed by your Clerk account.</p>
                </div>

                {/* Interface language */}
                <div className="space-y-1.5">
                  <label htmlFor="profile-lang" className="text-sm font-medium flex items-center gap-1.5">
                    <Globe className="h-4 w-4" /> Interface Language
                  </label>
                  <select
                    id="profile-lang"
                    value={profileLang}
                    onChange={(e) => setProfileLang(e.target.value)}
                    className="w-full rounded-lg border border-border/60 bg-background px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
                  >
                    <option value="en">English</option>
                    <option value="hi">हिंदी (Hindi)</option>
                    <option value="bn">বাংলা (Bengali)</option>
                    <option value="ta">தமிழ் (Tamil)</option>
                    <option value="te">తెలుగు (Telugu)</option>
                    <option value="mr">मराठी (Marathi)</option>
                    <option value="gu">ગુજરાતી (Gujarati)</option>
                    <option value="kn">ಕನ್ನಡ (Kannada)</option>
                    <option value="ml">മലയാളം (Malayalam)</option>
                    <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
                    <option value="or">ଓଡ଼ିଆ (Odia)</option>
                  </select>
                </div>
              </div>
            )}

            {/* ── Learning Tab ─────────────────────────────────────── */}
            {activeTab === "learning" && (
              <div className="rounded-xl border border-border/40 bg-card p-6 space-y-5">
                <h2 className="font-semibold text-lg">Learning Preferences</h2>

                {/* Daily goal */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <label htmlFor="daily-goal" className="flex items-center gap-1.5 font-medium">
                      <Target className="h-4 w-4" /> Daily Study Goal
                    </label>
                    <span className="font-mono font-medium">{dailyGoal} min/day</span>
                  </div>
                  <input
                    id="daily-goal"
                    type="range" min="15" max="120" step="15"
                    value={dailyGoal}
                    onChange={(e) => setDailyGoal(Number(e.target.value))}
                    className="w-full accent-brand-500"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>15 min</span><span>60 min</span><span>120 min</span>
                  </div>
                </div>

                {/* Toggles */}
                {[
                  { id: "auto-play",     label: "Auto-play next lesson",  sub: "Automatically start the next lesson when one ends", value: autoPlay,      set: setAutoPlay },
                  { id: "show-progress", label: "Show progress bar",      sub: "Display chapter completion progress on all pages",  value: showProgress,  set: setShowProgress },
                  { id: "sound-effects", label: "Sound effects",          sub: "Play sounds for XP gain, streaks, and level-ups",   value: soundEffects,  set: setSoundEffects },
                ].map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-3 border-t border-border/30">
                    <div>
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.sub}</p>
                    </div>
                    <Toggle id={item.id} checked={item.value} onChange={item.set} />
                  </div>
                ))}
              </div>
            )}

            {/* ── Appearance Tab ───────────────────────────────────── */}
            {activeTab === "appearance" && (
              <div className="rounded-xl border border-border/40 bg-card p-6 space-y-5">
                <h2 className="font-semibold text-lg">Appearance</h2>

                {/* Theme selector */}
                <div className="space-y-2">
                  <p className="text-sm font-medium">Theme</p>
                  <div className="grid grid-cols-3 gap-3">
                    {(["light", "dark", "system"] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setTheme(t)}
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                          theme === t
                            ? "border-brand-500 bg-brand-500/10"
                            : "border-border/40 hover:border-border/80"
                        }`}
                      >
                        {t === "light"  && <Sun     className="h-5 w-5" />}
                        {t === "dark"   && <Moon    className="h-5 w-5" />}
                        {t === "system" && <Monitor className="h-5 w-5" />}
                        <span className="text-sm capitalize">{t}</span>
                        {theme === t && <Badge className="text-xs">Active</Badge>}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font size */}
                <div className="space-y-2">
                  <p className="text-sm font-medium">Font Size</p>
                  <div className="grid grid-cols-3 gap-3">
                    {(["small", "medium", "large"] as const).map((fs) => (
                      <button
                        key={fs}
                        onClick={() => setFontSize(fs)}
                        className={`p-3 rounded-lg border text-sm capitalize transition-all ${
                          fontSize === fs
                            ? "border-brand-500 bg-brand-500/10 text-brand-500"
                            : "border-border/40 hover:border-border/80"
                        }`}
                      >
                        {fs}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Toggles */}
                {[
                  { id: "reduced-motion", label: "Reduce motion",  sub: "Minimize animations for better accessibility",         value: reducedMotion, set: setReducedMotion },
                  { id: "compact-mode",   label: "Compact mode",   sub: "Show more content with tighter spacing (power users)", value: compactMode,   set: setCompactMode },
                ].map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-3 border-t border-border/30">
                    <div>
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.sub}</p>
                    </div>
                    <Toggle id={item.id} checked={item.value} onChange={item.set} />
                  </div>
                ))}
              </div>
            )}

            {/* ── Notifications Tab ────────────────────────────────── */}
            {activeTab === "notifications" && (
              <div className="rounded-xl border border-border/40 bg-card p-6 space-y-5">
                <h2 className="font-semibold text-lg">Notification Preferences</h2>
                <p className="text-sm text-muted-foreground">Choose which emails and notifications you receive from LearnVeda.</p>

                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mt-4 mb-2">Email Notifications</p>
                  {[
                    { id: "email-streak",  label: "Daily streak reminder",   sub: "Get reminded before your streak resets",         value: emailStreak,  set: setEmailStreak },
                    { id: "email-weekly",  label: "Weekly progress report",  sub: "Summary of your learning progress every Monday",  value: emailWeekly,  set: setEmailWeekly },
                    { id: "email-battle",  label: "Battle invitations",      sub: "When someone challenges you to a live battle",    value: emailBattle,  set: setEmailBattle },
                    { id: "email-events",  label: "Upcoming events",         sub: "Notifications about olympiads, hackathons, etc.", value: emailEvents,  set: setEmailEvents },
                  ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between py-3 border-b border-border/20 last:border-0">
                      <div>
                        <p className="text-sm font-medium">{item.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.sub}</p>
                      </div>
                      <Toggle id={item.id} checked={item.value} onChange={item.set} />
                    </div>
                  ))}

                  <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mt-6 mb-2">Push Notifications</p>
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="text-sm font-medium">Enable push notifications</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Requires browser permission — real-time battle and streak alerts</p>
                    </div>
                    <Toggle id="push-enabled" checked={pushEnabled} onChange={setPushEnabled} />
                  </div>
                </div>
              </div>
            )}

            {/* ── Privacy Tab ──────────────────────────────────────── */}
            {activeTab === "privacy" && (
              <div className="rounded-xl border border-border/40 bg-card p-6 space-y-5">
                <h2 className="font-semibold text-lg">Privacy Settings</h2>
                {[
                  { id: "public-profile",    label: "Public profile",       sub: "Anyone can view your profile, level, and achievements", value: publicProfile,   set: setPublicProfile },
                  { id: "show-activity",     label: "Show activity",        sub: "Display your learning activity heatmap on your profile", value: showActivity,    set: setShowActivity },
                  { id: "search-indexed",    label: "Appear in search",     sub: "Your profile can be found via LearnVeda search",         value: searchIndexed,   set: setSearchIndexed },
                  { id: "show-leaderboard",  label: "Appear on leaderboard",sub: "Your username and XP are visible on the global leaderboard", value: showLeaderboard, set: setShowLeaderboard },
                ].map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-3 border-b border-border/20 last:border-0">
                    <div>
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.sub}</p>
                    </div>
                    <Toggle id={item.id} checked={item.value} onChange={item.set} />
                  </div>
                ))}
              </div>
            )}

            {/* ── Account Tab ──────────────────────────────────────── */}
            {activeTab === "account" && (
              <div className="space-y-4">
                <div className="rounded-xl border border-border/40 bg-card p-6">
                  <h2 className="font-semibold text-lg mb-4">Account Management</h2>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Shield className="h-4 w-4" /> Change Password
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Globe className="h-4 w-4" /> Connected Apps &amp; OAuth
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Volume2 className="h-4 w-4" /> Export My Data (GDPR)
                    </Button>
                  </div>
                </div>

                {/* Danger zone */}
                <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6">
                  <h2 className="font-semibold text-red-600 mb-2 flex items-center gap-2">
                    <Trash2 className="h-4 w-4" /> Danger Zone
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    Deleting your account permanently removes all your data — progress, XP, streaks, and community posts.
                    This action cannot be undone.
                  </p>
                  <Button variant="destructive" size="sm">Delete My Account</Button>
                </div>
              </div>
            )}

            {/* ── Save button (for profile, learning, appearance, notifications, privacy) ── */}
            {activeTab !== "account" && (
              <div className="flex justify-end">
                <Button onClick={handleSave} disabled={saveState !== "idle"} className="gap-1.5">
                  {saveState === "saving" ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Saving…</>
                  ) : saveState === "saved" ? (
                    <><CheckCircle2 className="h-4 w-4 text-green-400" /> Saved!</>
                  ) : (
                    <><Save className="h-4 w-4" /> Save Changes</>
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
