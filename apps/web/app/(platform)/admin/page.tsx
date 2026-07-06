/**
 * @file app/(platform)/admin/page.tsx
 * @description Admin Dashboard — visible only to LearnVeda administrators
 *
 * Route: /admin
 *
 * This page is NOT shown to regular users. The middleware redirects
 * non-admin users to /dashboard before this page even renders.
 *
 * Admin capabilities:
 *  - Platform statistics overview
 *  - Newsletter / email blast
 *  - User management
 *  - Content moderation (community posts)
 *  - System health monitoring
 */

import type { Metadata } from "next"; // Next.js metadata type
import Link              from "next/link"; // Navigation
import {
  Users, Mail, BarChart3, Shield, Bell,
  BookOpen, Zap, AlertTriangle, Settings,
  CheckCircle2, TrendingUp, Database,
} from "lucide-react"; // Icons
import { Badge }  from "@/components/ui/badge";  // Badge component

/* ─── Page metadata ──────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title:  "Admin Dashboard — LearnVeda",
  robots: { index: false, follow: false }, // Do not index admin pages
};

/* ─── Admin sections ─────────────────────────────────────────────────────── */
const ADMIN_SECTIONS = [
  {
    title:    "Newsletter",
    desc:     "Send email updates to users by audience segment",
    href:     "/admin/newsletter",
    icon:     Mail,
    color:    "bg-blue-500/10 text-blue-500",
    badge:    null,
  },
  {
    title:    "User Management",
    desc:     "View, search, and manage user accounts",
    href:     "/admin/users",
    icon:     Users,
    color:    "bg-purple-500/10 text-purple-500",
    badge:    "50K+ users",
  },
  {
    title:    "Content Moderation",
    desc:     "Review flagged community posts and comments",
    href:     "/admin/moderation",
    icon:     Shield,
    color:    "bg-red-500/10 text-red-500",
    badge:    "3 pending",
  },
  {
    title:    "Platform Analytics",
    desc:     "DAU, MAU, engagement, and learning metrics",
    href:     "/admin/analytics",
    icon:     BarChart3,
    color:    "bg-green-500/10 text-green-500",
    badge:    null,
  },
  {
    title:    "Notifications",
    desc:     "Send push notifications and in-app alerts",
    href:     "/admin/notifications",
    icon:     Bell,
    color:    "bg-orange-500/10 text-orange-500",
    badge:    null,
  },
  {
    title:    "Content Manager",
    desc:     "Manage chapters, subjects, and course content",
    href:     "/admin/content",
    icon:     BookOpen,
    color:    "bg-teal-500/10 text-teal-500",
    badge:    null,
  },
  {
    title:    "System Health",
    desc:     "API health, database status, error tracking",
    href:     "/api/health",
    icon:     Database,
    color:    "bg-brand-500/10 text-brand-500",
    badge:    null,
  },
  {
    title:    "Admin Settings",
    desc:     "Platform configuration and feature flags",
    href:     "/admin/settings",
    icon:     Settings,
    color:    "bg-gray-500/10 text-gray-500",
    badge:    null,
  },
];

/* ─── Quick stats ────────────────────────────────────────────────────────── */
const QUICK_STATS = [
  { label: "Total Users",    value: "50,121", icon: Users,      color: "text-blue-500",   trend: "+234 today"   },
  { label: "Active Today",   value: "1,247",  icon: Zap,        color: "text-green-500",  trend: "+12% vs yesterday" },
  { label: "Pro Subscribers",value: "5,030",  icon: TrendingUp, color: "text-purple-500", trend: "+18 today"    },
  { label: "Flagged Posts",  value: "3",      icon: AlertTriangle, color: "text-red-500", trend: "Needs review" },
];

/* ─── Page Component ─────────────────────────────────────────────────────── */
export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 md:px-6 py-10">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2.5 rounded-xl bg-red-500/10">
            <Shield className="h-6 w-6 text-red-500" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
              <Badge className="bg-red-500/10 text-red-500 border-red-500/20 text-xs">Admin Only</Badge>
            </div>
            <p className="text-sm text-muted-foreground">Manage LearnVeda platform settings and users</p>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {QUICK_STATS.map((stat) => (
            <div key={stat.label} className="rounded-2xl border bg-card p-5 shadow-sm">
              <stat.icon className={`h-5 w-5 ${stat.color} mb-3`} />
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs font-medium text-foreground">{stat.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.trend}</p>
            </div>
          ))}
        </div>

        {/* Admin sections grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ADMIN_SECTIONS.map((section) => (
            <Link
              key={section.title}
              href={section.href}
              className="group rounded-2xl border bg-card p-5 shadow-sm hover:shadow-md transition-all hover:border-brand-500/30"
            >
              {/* Icon */}
              <div className={`inline-flex p-3 rounded-xl ${section.color} mb-4`}>
                <section.icon className="h-5 w-5" />
              </div>

              {/* Title + badge */}
              <div className="flex items-center gap-2 mb-1.5">
                <h2 className="font-semibold text-foreground text-sm group-hover:text-brand-500 transition-colors">
                  {section.title}
                </h2>
                {section.badge && (
                  <Badge variant="secondary" className="text-xs">{section.badge}</Badge>
                )}
              </div>

              {/* Description */}
              <p className="text-xs text-muted-foreground leading-relaxed">{section.desc}</p>
            </Link>
          ))}
        </div>

        {/* System status */}
        <div className="mt-10 rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <Database className="h-4 w-4 text-brand-500" />
            System Status
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { service: "Next.js App",   status: "Operational",  color: "text-green-500" },
              { service: "MongoDB",       status: "Check /api/health", color: "text-muted-foreground" },
              { service: "Redis Cache",   status: "Check /api/health", color: "text-muted-foreground" },
              { service: "Clerk Auth",    status: "Operational",  color: "text-green-500" },
            ].map((s) => (
              <div key={s.service} className="text-sm">
                <p className="text-foreground font-medium">{s.service}</p>
                <p className={`text-xs ${s.color} flex items-center gap-1 mt-0.5`}>
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {s.status}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
