/**
 * @file app/(legal)/privacy-policy/page.tsx
 * @description Privacy Policy page for LearnVeda
 * Route: /privacy-policy
 *
 * Covers:
 *  - Data collected and why
 *  - How we use Clerk for authentication
 *  - MongoDB data storage
 *  - Analytics tools (PostHog, Google Analytics)
 *  - User rights and data deletion
 *  - Contact information
 */

import type { Metadata } from "next";       // SEO metadata type
import { Navbar }  from "@/components/navigation/navbar"; // Top navigation
import { Footer }  from "@/components/navigation/footer"; // Site footer
import { Shield, Eye, Database, Lock, Mail, Users, FileText, Globe } from "lucide-react"; // Icons

/* ─── Page SEO Metadata ──────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title:       "Privacy Policy — LearnVeda",
  description: "LearnVeda's privacy policy. Learn how we collect, use, and protect your data. We are committed to your privacy and data security.",
  robots:      { index: true, follow: true }, // Legal pages should be indexed
};

/* ─── Section Component ──────────────────────────────────────────────────── */
// Reusable section with icon, title, and content
function PolicySection({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-12">
      {/* Section header with icon */}
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-brand-500/10 text-brand-500">
          <Icon className="h-5 w-5" /> {/* Section icon */}
        </div>
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
      </div>
      {/* Section content */}
      <div className="pl-14 text-muted-foreground leading-relaxed space-y-3">
        {children}
      </div>
    </section>
  );
}

/* ─── Privacy Policy Page ────────────────────────────────────────────────── */
export default function PrivacyPolicyPage() {
  const lastUpdated = "January 1, 2025"; // Last update date

  return (
    <>
      <Navbar /> {/* Navigation bar */}

      <main className="min-h-screen bg-background">
        {/* ── Hero Header ───────────────────────────────────────────────── */}
        <div className="border-b bg-muted/30 py-16">
          <div className="container max-w-4xl px-4 md:px-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl bg-brand-500 text-white">
                <Shield className="h-7 w-7" /> {/* Privacy shield icon */}
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Privacy Policy</h1>
                <p className="text-muted-foreground mt-1">Last updated: {lastUpdated}</p>
              </div>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed">
              At LearnVeda, we are committed to protecting your privacy. This policy explains what data
              we collect, how we use it, and your rights as a user of our platform.
            </p>
          </div>
        </div>

        {/* ── Policy Content ────────────────────────────────────────────── */}
        <div className="container max-w-4xl px-4 md:px-6 py-16">
          <PolicySection icon={Eye} title="Information We Collect">
            <p>We collect the following information to provide and improve our services:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Account information</strong> — name, email address, and profile photo provided through Clerk authentication (Google, email/password)</li>
              <li><strong>Learning data</strong> — chapters completed, quiz scores, time spent learning, streak data, and XP earned</li>
              <li><strong>Device information</strong> — browser type, operating system, device type (for optimizing the experience)</li>
              <li><strong>Usage analytics</strong> — pages visited, features used, click patterns (anonymized)</li>
              <li><strong>Community content</strong> — posts, comments, and questions you submit publicly</li>
            </ul>
          </PolicySection>

          <PolicySection icon={Database} title="How We Use Your Data">
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide and personalize your learning experience</li>
              <li>To calculate your XP, level, and streak progress</li>
              <li>To show you on the leaderboard (only public nickname and stats)</li>
              <li>To send you important updates about your learning progress and new content</li>
              <li>To improve platform features based on aggregated usage patterns</li>
              <li>To comply with legal obligations</li>
            </ul>
          </PolicySection>

          <PolicySection icon={Lock} title="Data Security">
            <p>
              We take security seriously. Your data is protected by:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Clerk authentication</strong> — industry-standard OAuth 2.0 and JWT tokens handle all authentication. We never store passwords</li>
              <li><strong>HTTPS everywhere</strong> — all data in transit is encrypted with TLS 1.3</li>
              <li><strong>MongoDB encryption</strong> — data at rest is encrypted using AES-256</li>
              <li><strong>Rate limiting</strong> — API routes are rate-limited to prevent abuse</li>
              <li><strong>Input validation</strong> — all user input is sanitized before processing</li>
            </ul>
          </PolicySection>

          <PolicySection icon={Globe} title="Third-Party Services">
            <p>We use trusted third-party services to operate LearnVeda:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Clerk</strong> — authentication and user management (<a href="https://clerk.com/privacy" className="text-brand-500 hover:underline">Clerk Privacy Policy</a>)</li>
              <li><strong>MongoDB Atlas</strong> — secure cloud database hosting</li>
              <li><strong>Cloudinary</strong> — image and video storage and optimization</li>
              <li><strong>Resend</strong> — transactional email delivery</li>
              <li><strong>Vercel</strong> — hosting and edge deployment</li>
              <li><strong>PostHog</strong> — anonymous usage analytics</li>
            </ul>
          </PolicySection>

          <PolicySection icon={Users} title="Your Rights">
            <p>You have the following rights regarding your personal data:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Access</strong> — request a copy of all data we hold about you</li>
              <li><strong>Correction</strong> — update your profile information at any time in Settings</li>
              <li><strong>Deletion</strong> — delete your account and all associated data from the Settings page. Community posts may be anonymized rather than deleted</li>
              <li><strong>Portability</strong> — export your learning progress data as a CSV or JSON file</li>
              <li><strong>Opt-out</strong> — opt out of non-essential emails at any time</li>
            </ul>
          </PolicySection>

          <PolicySection icon={FileText} title="Cookies">
            <p>
              We use essential cookies only — for maintaining your session and theme preference.
              We do not use third-party advertising cookies. You can disable cookies in your browser
              settings, but this may affect your ability to stay signed in.
            </p>
          </PolicySection>

          <PolicySection icon={Mail} title="Contact Us">
            <p>
              If you have any questions about this privacy policy or how we handle your data,
              please contact us:
            </p>
            <ul className="list-none space-y-2 mt-2">
              <li>📧 <strong>Email:</strong> <a href="mailto:privacy@learnveda.in" className="text-brand-500 hover:underline">privacy@learnveda.in</a></li>
              <li>📍 <strong>Address:</strong> LearnVeda, India</li>
            </ul>
          </PolicySection>

          {/* Last updated notice */}
          <div className="mt-8 p-4 rounded-lg border bg-muted/50 text-sm text-muted-foreground">
            This privacy policy was last updated on <strong>{lastUpdated}</strong>. We will notify
            registered users via email if we make significant changes to this policy.
          </div>
        </div>
      </main>

      <Footer /> {/* Site footer */}
    </>
  );
}
