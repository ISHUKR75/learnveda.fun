---
name: LearnVeda Setup Notes
description: Build quirks, demo mode pattern, middleware auth, admin access pattern, compiler backend, Docker config, CI/CD.
---

## Demo Mode Pattern
All external services fail gracefully when not configured:
- Clerk absent → demo mode (unauthenticated, show banner)
- Redis absent → in-memory MemoryCacheClient fallback
- OpenAI absent → pre-written demo AI responses
- Resend absent → log to console instead of sending
- Judge0/Piston absent → simulated compiler output

## Admin Access Pattern (FAIL CLOSED)
- `ADMIN_USER_IDS` env var = comma-separated Clerk user IDs with admin access
- **If unset, ALL requests to admin APIs are denied (403)** — not open
- Admin layout at `app/(platform)/admin/layout.tsx` adds a server-side role check before rendering
- Middleware adds `/admin` to protected routes (auth required)
- Defense in depth: middleware → layout → individual API routes all check independently

## Compiler Backend
- `/api/compiler` POST route — tries Judge0 (JUDGE0_API_KEY), then Piston (PISTON_API_URL), then demo
- Monaco Editor installed: `@monaco-editor/react` (confirmed in package.json)
- `output: 'standalone'` in next.config.ts gated on `NEXT_OUTPUT=standalone` env var (prevents breaking dev)

## Docker Configuration
- Production Dockerfile: `docker/Dockerfile` — multi-stage, requires `NEXT_OUTPUT=standalone` at build time
- Dev Dockerfile: `docker/Dockerfile.dev` — lightweight, bind-mounts source for hot-reload
- `docker/docker-compose.yml` = base (production standalone build)
- `docker/docker-compose.dev.yml` = override for dev (uses Dockerfile.dev + npm run dev)
- `docker/mongo-init.js` — creates all MongoDB collections + indexes on first container start
- `docker/redis.conf` — custom Redis config (256MB maxmemory, allkeys-lru, AOF persistence)

## i18n (11 Languages)
- All 11 translation files created: en, hi, bn, te, mr, ta, gu, kn, ml, pa, or
- LanguageSwitcher component wired into navbar (hidden md:block — visible on tablet+)
- Locale stored in `learnveda-locale` cookie; triggers page reload on change

## GitHub Actions CI/CD
- `.github/workflows/ci.yml` — lint + type-check + build + security audit
- `.github/workflows/deploy.yml` — Vercel deployment on push to main
- CI uses placeholder env vars for build-time; real values come from GitHub Secrets

## Middleware Auth
- PROTECTED_PREFIXES includes /admin (auth required)
- Clerk keys checked at module load; demo mode = all routes open
- Security headers applied on every non-static response

**Why fail-closed admin:** Any authenticated user could otherwise blast 50K users with emails if ADMIN_USER_IDS isn't set. This was a critical security finding from code review.
