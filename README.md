# LearnVeda — AI-Powered EdTech Platform

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com)
[![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)](https://clerk.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

**"Learn Smarter. Rank Higher."**

*One Platform for Complete Learning — Class 9 to Graduation*

[🌐 Live Demo](https://learnveda.in) · [📖 Docs](./docs/) · [🐛 Issues](https://github.com/ISHUKR75/LearnVeda/issues) · [💬 Community](https://learnveda.in/community)

</div>

---

## 🎯 Overview

**LearnVeda** is an enterprise-grade, AI-powered EdTech platform for Indian students — covering CBSE Class 9–12, Engineering, 13 Programming Languages, Core CS subjects, and career preparation.

Built like a product company builds software — modular, scalable, and production-ready from day one.

### Key Pillars

| Pillar | What It Means |
|--------|---------------|
| 🎓 **CBSE Curriculum** | Class 9–12 with NCERT-aligned chapters, simulations, and board exam prep |
| 💻 **Programming** | 13 languages with structured day-by-day learning plans |
| 🏗️ **Engineering** | 8 branches × 8 semesters + Core CS (DSA, OS, DBMS, CN, System Design) |
| ⚔️ **Live Battles** | Real-time 1v1 knowledge duels with Elo matchmaking |
| 🤖 **AI Tutor** | GPT-4-powered 24/7 tutor with subject context |
| 🔭 **Simulations** | 140+ interactive physics, chemistry, and DSA simulations |
| 🏆 **Gamification** | XP, streaks, levels, badges, leaderboard |
| 👥 **Community** | 10K+ students — Q&A forum, groups, live chat |

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** (App Router, SSR, ISR, Server Components)
- **React 19** (Client + Server components)
- **TypeScript** (Strict mode)
- **Tailwind CSS** + **shadcn/ui** + **Radix UI**
- **Framer Motion** (animations)
- **Monaco Editor** (online compiler)
- **Zustand** (state management)
- **TanStack Query** (server state)
- **React Hook Form** + **Zod** (forms + validation)

### Backend
- **Next.js API Routes** (REST API)
- **MongoDB** + **Mongoose** (primary database)
- **Redis** (caching + rate limiting)
- **Clerk** (authentication)

### Infrastructure
- **Docker** + **Docker Compose**
- **GitHub Actions** (CI/CD)
- **Vercel** (deployment)
- **Cloudinary** (media storage)

---

## 📁 Project Structure

```
learnveda/
├── apps/
│   └── web/                    # Next.js application (main app)
│       ├── app/                # App Router pages
│       │   ├── (auth)/         # Authentication pages (Clerk)
│       │   ├── (legal)/        # Privacy, Terms pages
│       │   ├── (marketing)/    # Public marketing pages
│       │   ├── (platform)/     # Protected platform pages
│       │   └── api/            # API route handlers
│       ├── components/         # Shared UI components
│       ├── features/           # Feature-specific components
│       ├── hooks/              # Custom React hooks
│       ├── lib/                # Infrastructure libraries
│       │   ├── mongodb/        # MongoDB connection + models
│       │   ├── redis/          # Redis cache
│       │   ├── i18n/           # Internationalization (11 languages)
│       │   ├── stripe/         # Stripe payments stub
│       │   ├── razorpay/       # Razorpay payments stub
│       │   ├── cloudinary/     # Media storage stub
│       │   ├── email/          # Email service (Resend)
│       │   └── seo/            # SEO metadata helpers
│       ├── providers/          # React context providers
│       ├── store/              # Zustand state stores
│       └── types/              # TypeScript type definitions
│
├── docker/                     # Docker configuration
│   ├── Dockerfile              # Multi-stage production image
│   ├── docker-compose.yml      # Development environment
│   └── redis.conf              # Redis configuration
│
├── docs/                       # Documentation
│   ├── architecture/           # System design documents
│   ├── api/                    # API documentation
│   └── deployment/             # Deployment guides
│
├── .github/
│   └── workflows/              # GitHub Actions CI/CD
│       ├── ci.yml              # Lint, type-check, build
│       └── deploy.yml          # Deploy to Vercel
│
└── README.md                   # This file
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm 10+
- MongoDB 7.0+ (or MongoDB Atlas URI)
- Redis 7.0+ (optional — app runs without it)

### 1. Clone the repository
```bash
git clone https://github.com/ISHUKR75/LearnVeda.git
cd LearnVeda
```

### 2. Install dependencies
```bash
cd apps/web
npm install
```

### 3. Configure environment variables

Copy the example env file and fill in your values:
```bash
cp apps/web/.env.example apps/web/.env.local
```

Required variables:
```env
# Clerk Authentication (get from https://clerk.com)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# MongoDB (Atlas URI or local)
MONGODB_URI=mongodb+srv://...

# Session secret (generate with: openssl rand -base64 32)
SESSION_SECRET=your-secret-here
```

Optional variables (app works without these):
```env
REDIS_URL=redis://localhost:6379
OPENAI_API_KEY=sk-...
RESEND_API_KEY=re_...
STRIPE_SECRET_KEY=sk_...
RAZORPAY_KEY_ID=rzp_...
JUDGE0_API_KEY=...
```

### 4. Start the development server
```bash
cd apps/web
npm run dev
```

Open [http://localhost:5000](http://localhost:5000) in your browser.

### 5. (Optional) Start with Docker
```bash
docker compose -f docker/docker-compose.yml up
```

This starts MongoDB, Redis, and the Next.js app together.

---

## 🌍 Supported Languages (i18n)

LearnVeda supports 11 languages out of the box:

| Language | Code | Status |
|----------|------|--------|
| English | `en` | ✅ Complete |
| Hindi | `hi` | ✅ Complete |
| Bengali | `bn` | 🚧 In progress |
| Telugu | `te` | 🚧 In progress |
| Marathi | `mr` | 🚧 In progress |
| Tamil | `ta` | 🚧 In progress |
| Gujarati | `gu` | 🚧 In progress |
| Kannada | `kn` | 🚧 In progress |
| Malayalam | `ml` | 🚧 In progress |
| Punjabi | `pa` | 🚧 In progress |
| Odia | `or` | 🚧 In progress |

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [Architecture](./docs/architecture/README.md) | System design and component overview |
| [API Reference](./docs/api/README.md) | All API endpoints with request/response examples |
| [Deployment Guide](./docs/deployment/README.md) | How to deploy to Vercel, Docker, AWS |
| [Contributing](./CONTRIBUTING.md) | How to contribute to LearnVeda |

---

## 🔐 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Yes | Clerk frontend key |
| `CLERK_SECRET_KEY` | Yes | Clerk backend key |
| `MONGODB_URI` | Yes | MongoDB connection string |
| `SESSION_SECRET` | Yes | Session signing secret |
| `REDIS_URL` | No | Redis URL (in-memory fallback) |
| `OPENAI_API_KEY` | No | OpenAI GPT-4 (demo mode if absent) |
| `RESEND_API_KEY` | No | Email service (logs to console) |
| `STRIPE_SECRET_KEY` | No | Stripe payments |
| `RAZORPAY_KEY_ID` | No | Razorpay payments |
| `RAZORPAY_KEY_SECRET` | No | Razorpay secret |
| `CLOUDINARY_CLOUD_NAME` | No | Media uploads |
| `JUDGE0_API_KEY` | No | Online compiler |

---

## 📄 License

MIT License — see [LICENSE](./LICENSE) for details.

---

## 🤝 Contributing

We welcome contributions! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before submitting a PR.

---

<div align="center">
Made with ❤️ in India · LearnVeda © 2025
</div>
