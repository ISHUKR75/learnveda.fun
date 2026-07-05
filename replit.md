# LearnVeda — AI-Powered EdTech Platform

## Project Overview

LearnVeda is a **production-level EdTech website** for Indian students from Class 9 to Graduation. It is a **Turborepo + pnpm monorepo** — only the `apps/web` (Next.js 15 App Router) runs on Replit; microservices require external Docker/Kubernetes.

### Live App
- **URL**: Runs on port 5000 (mapped to port 80)
- **Start command**: `cd apps/web && npm run dev`
- **Stack**: Next.js 15 (App Router), TypeScript, Tailwind CSS, Zustand v5, Framer Motion, Radix UI, shadcn/ui, Clerk (optional), MongoDB (optional), Redis (optional)

---

## Architecture

```
apps/web/                   ← Next.js 15 App Router (the only runnable app on Replit)
├── app/
│   ├── (marketing)/        ← Public pages: home, about, blog, pricing, features, events, etc.
│   ├── (platform)/         ← Auth-protected student area: dashboard, AI tutor, battles, etc.
│   ├── (auth)/             ← Clerk sign-in/sign-up pages (demo mode when no keys)
│   ├── (legal)/            ← Privacy policy, terms of service
│   └── api/                ← API routes: health, search, analytics, AI, email, webhooks
├── features/               ← Feature components organized by domain
├── components/ui/           ← shadcn/ui component library
├── store/                  ← Zustand client state (uiStore, userPrefsStore, notifStore)
├── hooks/                  ← Custom React hooks (useLocalStorage, useDebounce, etc.)
├── types/                  ← TypeScript type definitions
├── lib/                    ← External service clients (MongoDB, Redis, Clerk, Stripe, etc.)
├── providers/              ← React context providers (theme, auth, query, toast)
├── middleware.ts            ← Auth protection + security headers
├── app/sitemap.ts           ← Dynamic SEO sitemap
└── app/robots.ts            ← robots.txt generator
```

---

## Running the App

```bash
cd apps/web && npm run dev   # Start dev server on port 5000
cd apps/web && npm run build # Production build (clears .next — restart workflow after)
cd apps/web && npx tsc --noEmit  # Type check only
```

**Important**: Running `npm run build` deletes `.next/` — always restart the "Start application" workflow after a build to restore dev server.

---

## Environment Variables / Secrets

All external services work in **demo/passthrough mode** when keys are not configured. No crashes, just limited functionality.

| Secret | Purpose | Demo Behavior |
|--------|---------|---------------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` + `CLERK_SECRET_KEY` | Authentication | Demo mode — all users shown as "Student" |
| `MONGODB_URI` | Database | Pages use mock data |
| `REDIS_URL` | Caching + rate limiting | In-memory fallback |
| `OPENAI_API_KEY` or `GEMINI_API_KEY` | AI Tutor | Shows demo response explaining setup |
| `STRIPE_SECRET_KEY` + `STRIPE_WEBHOOK_SECRET` | Payments | Pricing shown but not charged |
| `RAZORPAY_KEY_ID` | Indian payments | Same as above |
| `CLERK_WEBHOOK_SECRET` | Clerk webhook security | Demo mode accepts all (WARNING in logs) |
| `SESSION_SECRET` | Session encryption | Configured ✅ |

---

## Pages & Routes

### Marketing (public)
- `/` — Homepage with 10 sections
- `/about`, `/blog`, `/contact`, `/events`, `/features`, `/pricing`
- `/practice`, `/simulations`, `/test-center`

### Learning Content (authenticated via platform layout)
- `/learn/class-9`, `/learn/class-10`, `/learn/class-11`, `/learn/class-12`
- `/learn/class-9/[subject]`, `/learn/class-9/[subject]/[chapter]`
- `/learn/engineering`
- `/programming`, `/programming/[language]`, `/programming/[language]/[day]`
- `/semester/[n]` — BTech semester guides
- `/core-cs/[slug]` — DSA, OS, DBMS, CN deep dives

### Platform Features
- `/dashboard` + subpages (analytics, progress, achievements, goals, calendar, etc.)
- `/ai-tutor` — AI Tutor chat (needs OPENAI_API_KEY or GEMINI_API_KEY)
- `/mentorship` — Book 1:1 mentor sessions
- `/live` — Live classes with countdowns
- `/live-battles` — 1v1 knowledge battles
- `/leaderboard` — Student rankings
- `/compiler` — In-browser code editor
- `/community` + subpages (posts, questions, groups, chat)
- `/simulations/[category]`

### API Routes
- `GET /api/health` — Service health check
- `GET /api/search?q=...` — Global search
- `GET /api/analytics` — Platform statistics
- `GET /api/auth` — Session check
- `POST /api/ai` — AI Tutor chat (rate-limited, auth-gated in Clerk mode)
- `POST /api/email` — Contact form
- `POST /api/webhooks/clerk` — Clerk user sync (fail-closed verification)
- `POST /api/webhooks/stripe` — Payment events (fail-closed verification)

---

## User Preferences

- **No deletion policy**: Never delete existing files or folders — only additions allowed
- **Mock data convention**: All mock data has `// TODO: replace with /api/... in production` comments
- **Every file gets JSDoc**: Every line of every file should have a detailed comment
- **Separate feature folders**: Every feature lives in its own `features/[name]/components/` directory
- **Framer Motion**: Use `opacity: 0.01` (not `0`) as initial opacity for above-the-fold animations (prevents blank SSR screenshots)
- **TypeScript strict**: All code is TypeScript with no `any` unless explicitly justified
- **No hardcoded localhost**: Use `$REPLIT_DEV_DOMAIN` in shell, relative URLs in app code
