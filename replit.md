# LearnVeda — AI-Powered EdTech Platform

## Project Overview

LearnVeda is an enterprise-grade, AI-powered EdTech platform for Indian students. It covers:
- **CBSE Class 9–12** — full NCERT-aligned curriculum with simulations and board exam prep
- **Engineering** — 8 branches × 8 semesters (B.Tech programs)
- **13 Programming Languages** — structured day-by-day learning plans
- **Core CS subjects** — DSA, System Design, DBMS, OS, CN, Git, Competitive Programming
- **Live Battles** — 1v1 real-time quiz duels with Elo matchmaking (Socket.IO)
- **AI Tutor** — GPT-4-powered 24/7 tutor with subject context
- **Online Compiler** — 13 languages via Monaco Editor + Judge0/Piston backend
- **Community** — 10K+ students, Q&A forum, live chat
- **Gamification** — XP, streaks, levels, achievement badges, leaderboard
- **i18n** — 11 Indian languages on every page

## Tech Stack
- **Frontend**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion
- **Backend**: Next.js API Routes, MongoDB + Mongoose, Redis (with in-memory fallback)
- **Auth**: Clerk (with graceful demo mode when keys are absent)
- **Payments**: Stripe + Razorpay (lazy-loaded stubs)
- **Storage**: Cloudinary (lazy-loaded stub)
- **Email**: Resend (logs to console in demo mode)
- **Compiler**: Monaco Editor + Judge0 or Piston API (demo fallback)
- **CI/CD**: GitHub Actions (`.github/workflows/ci.yml`, `deploy.yml`)
- **Docker**: Multi-stage Dockerfile + Docker Compose (`docker/`)

## Repository Structure
```
learnveda/
├── apps/web/                  # Next.js application
│   ├── app/                   # App Router pages
│   │   ├── (auth)/            # Clerk auth pages
│   │   ├── (legal)/           # Privacy, Terms
│   │   ├── (marketing)/       # Public marketing pages
│   │   ├── (platform)/        # Protected platform pages
│   │   │   ├── admin/         # Admin dashboard + newsletter
│   │   │   ├── compiler/      # Online code compiler
│   │   │   ├── dashboard/     # User dashboard
│   │   │   ├── learn/         # CBSE + Engineering + Programming
│   │   │   └── ...
│   │   └── api/               # REST API routes
│   ├── components/            # Shared UI components
│   ├── features/              # Feature-specific components
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Infrastructure (MongoDB, Redis, i18n, email, ...)
│   ├── providers/             # React context providers
│   ├── store/                 # Zustand state stores
│   └── types/                 # TypeScript type definitions
├── docker/                    # Docker configuration
├── docs/                      # Architecture + API + deployment docs
└── .github/workflows/         # GitHub Actions CI/CD
```

## Development

```bash
# Install dependencies
cd apps/web && npm install

# Start dev server
npm run dev         # Runs on port 5000

# Build for production
npm run build

# Type check
npx tsc --noEmit
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in values. The app runs in demo mode without most keys:
- **Required**: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, `MONGODB_URI`, `SESSION_SECRET`
- **Optional**: `REDIS_URL`, `OPENAI_API_KEY`, `RESEND_API_KEY`, `STRIPE_SECRET_KEY`, `RAZORPAY_KEY_ID`, `JUDGE0_API_KEY`

## User Preferences

- **Never delete any file or folder** — only add new files; every feature gets its own isolated folder
- **Detailed comments on every file** — parameters, return values, purpose documented in JSDoc
- **Everything production-functional** — no mocked placeholders; real API integrations with graceful fallbacks
- **Demo mode pattern** — all external services fail gracefully when not configured; app always runs
- **TypeScript strict mode** — no `any` types; use proper type guards and discriminated unions
- **Workflow**: `cd apps/web && npm run dev` (never pnpm, always npm)
- **Port**: app runs on 5000
- **Clerk**: optional — runs in demo mode when keys are absent or placeholder
- **Framer Motion**: use `opacity: 0.01` (not 0) in initial animation states above the fold
- **Platform layout**: `(platform)/layout.tsx` provides the Navbar — individual platform pages must NOT import their own Navbar
