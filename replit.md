# LearnVeda — AI-Powered EdTech Platform

## Project Overview

**LearnVeda** is an enterprise-grade, open-source EdTech platform for Class 9 to Graduation. It combines the best of Coursera, Khan Academy, LeetCode, Physics Wallah, and GeeksforGeeks into a single ecosystem.

### What It Does
- **CBSE Class 9–12** — Complete NCERT-aligned curriculum with simulations, quizzes, and notes
- **Engineering** — 9 branches × 8 semesters (CSE, ECE, EEE, Mechanical, Civil, Chemical, AI, IT, Data Science)
- **Programming** — 14 language day-plans (C, C++, Java, Python, JS, TS, Rust, Go, Kotlin, Swift, SQL, Dart, Ruby)
- **Core CS** — DSA, Web Dev, System Design, DBMS, OS, CN, Git, CP, Interview Prep
- **AI Tutor** — 24/7 AI-powered doubt solving
- **Live Battles** — Real-time 1v1 coding and quiz battles
- **140+ Simulations** — Physics, Chemistry, Biology, DSA, OS, Networks, Circuits
- **Community** — Q&A forums, study groups, leaderboard, events

## Tech Stack

### Frontend (apps/web)
- **Framework**: Next.js 15 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS v3 + shadcn/ui + Radix UI
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State**: Zustand + TanStack Query
- **Forms**: React Hook Form + Zod

### Authentication
- **Clerk** (optional — runs in demo mode without keys)
- Sign-in/sign-up at `/sign-in` and `/sign-up`
- Dashboard at `/dashboard` (works in demo mode without auth)

### Database
- **MongoDB** (via Mongoose) — configure MONGODB_URI env var

### Monorepo
- **Package Manager**: pnpm workspaces (use `npm install` in apps/web for Replit)
- **Build tool**: Turborepo

## How to Run

The main web app runs via the configured workflow:

```bash
cd apps/web && npm run dev
```

App runs on port 5000 at `http://localhost:5000`.

### Environment Variables

Required to enable Clerk auth (optional — works without):
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

Optional MongoDB:
```
MONGODB_URI=mongodb://localhost:27017/learnveda
```

The app detects placeholder keys and runs in **demo mode** when real keys aren't configured.

## Project Structure

```
learnveda/
├── apps/
│   ├── web/          ← Main Next.js web app (primary — runs on Replit)
│   │   ├── app/      ← Next.js App Router pages
│   │   │   ├── (marketing)/   ← Public pages (home, about, pricing, etc.)
│   │   │   ├── (platform)/    ← Auth-protected pages (dashboard, etc.)
│   │   │   └── (auth)/        ← Sign-in/sign-up pages
│   │   ├── components/  ← Shared UI components (navbar, footer, ui/*)
│   │   ├── features/    ← Feature-specific components (one folder per feature)
│   │   ├── providers/   ← React context providers
│   │   ├── lib/         ← Utilities, helpers
│   │   └── styles/      ← Global CSS
│   ├── admin/        ← Admin panel (placeholder)
│   ├── landing/      ← Landing page variant (placeholder)
│   ├── mobile/       ← React Native app (placeholder)
│   └── desktop/      ← Electron desktop app (placeholder)
├── packages/         ← Shared packages (ui, hooks, utils, config, etc.)
├── services/         ← Backend microservices (20+ services, placeholders)
└── infrastructure/   ← Docker, K8s, CI/CD configs
```

## Key Pages

| Route | Description |
|-------|-------------|
| `/` | Home — Hero, Stats, Learn Tracks, Simulations, Programming |
| `/learn` | Learning Hub — Class 9-12, Engineering, Programming, Core CS |
| `/learn/class-9` through `/learn/class-12` | CBSE subject pages |
| `/learn/engineering` | Engineering branch selector |
| `/programming` | All 14 language day-plans |
| `/simulations` | 140+ interactive simulation catalogue |
| `/practice` | Quiz, Mock Tests, Coding Playground, PYQs |
| `/test-center` | CBSE, JEE, NEET, Company mock tests |
| `/dashboard` | Student dashboard (XP, streak, progress) |
| `/live-battles` | Real-time 1v1 academic battles |
| `/leaderboard` | Global/subject/class rankings |
| `/community` | Q&A forum, study groups |
| `/events` | Olympiads, hackathons, code sprints |
| `/pricing` | Free/Pro/Team plans |
| `/features` | Full feature overview |
| `/about` | Mission, team, values |
| `/blog` | Study tips, guides, updates |
| `/contact` | Contact form |
| `/sign-in` | Clerk auth (demo mode without keys) |
| `/sign-up` | Clerk auth (demo mode without keys) |

## User Preferences

- **Language**: Mix of Hindi and English communication preferred
- **No files/folders should ever be deleted** — only add new ones
- **Every file must have detailed comments** explaining each section
- **Separate folders** for every page, section, and component
- **Production-level code** with proper TypeScript, SEO, and performance
- All new features should maintain the existing folder structure pattern
- Uses Clerk for auth, MongoDB for database — both optional in dev mode
