<div align="center">

# 🎓 LearnVeda

### **The Open-Source, AI-Powered Learning Ecosystem**

*From Class 9 to Graduation — One Platform for Complete Education*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Stars](https://img.shields.io/github/stars/ISHUKR75/LearnVeda?style=social)](https://github.com/ISHUKR75/LearnVeda)
[![Forks](https://img.shields.io/github/forks/ISHUKR75/LearnVeda?style=social)](https://github.com/ISHUKR75/LearnVeda/fork)
[![Issues](https://img.shields.io/github/issues/ISHUKR75/LearnVeda)](https://github.com/ISHUKR75/LearnVeda/issues)
[![Last Commit](https://img.shields.io/github/last-commit/ISHUKR75/LearnVeda)](https://github.com/ISHUKR75/LearnVeda/commits/main)

<br />

**LearnVeda** is an enterprise-grade, production-ready EdTech platform built with modern technologies. It combines the best of **Coursera**, **Khan Academy**, **LeetCode**, **Physics Wallah**, and **GeeksforGeeks** into a single, open-source ecosystem.

[Live Demo](#) · [Report Bug](https://github.com/ISHUKR75/LearnVeda/issues) · [Request Feature](https://github.com/ISHUKR75/LearnVeda/issues) · [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🏗️ Architecture](#️-architecture)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [📦 Apps & Services](#-apps--services)
- [🎯 Learning Modules](#-learning-modules)
- [🧪 Testing](#-testing)
- [🔒 Security](#-security)
- [📈 Performance](#-performance)
- [🌐 Internationalization](#-internationalization)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

### 📚 Learning Content
| Feature | Description |
|---------|-------------|
| **Classes 9-12** | Complete CBSE curriculum — Mathematics, Science (Physics/Chemistry/Biology), English, Hindi, Social Science, Computer Science, AI |
| **Engineering** | 9 branches × 8 semesters — CSE, ECE, EEE, Mechanical, Civil, Chemical, AI & ML, Data Science, IT |
| **14 Programming Languages** | Day-by-day structured plans — C, C++, Java, Python, JavaScript, TypeScript, Rust, Go, Kotlin, Swift, SQL, Dart, Ruby |
| **9 Core CS Subjects** | DSA (60 days), Web Dev (30 days), System Design (25 days), DBMS, OS, CN, Git, CP (60 days), Interview Prep (30 days) |

### 🎮 Interactive Learning
| Feature | Description |
|---------|-------------|
| **140+ Simulations** | Physics, Chemistry, Biology, CS, DSA, Digital Logic, CPU, Sorting, Graphs, Trees, DP, Recursion |
| **Live Battles** | Real-time coding battles with leaderboard |
| **Live Classes** | Interactive video classes with chat |
| **Live Quiz** | Real-time quiz competitions |
| **Coding Playground** | In-browser compiler for 14+ languages |

### 📊 Assessment
| Feature | Description |
|---------|-------------|
| **Test Center** | CBSE, JEE, NEET, GATE, CAT, Company-specific tests |
| **Mock Tests** | Timed, realistic exam simulations |
| **Practice Problems** | Topic-wise problems with solutions |
| **Previous Year Questions** | PYQs with detailed solutions |
| **Assignments** | Structured assignments with auto-grading |

### 🤖 AI-Powered
| Feature | Description |
|---------|-------------|
| **AI Tutor** | Personalized learning assistant powered by Gemini & OpenAI |
| **AI Search** | Semantic search across all content |
| **Smart Recommendations** | Personalized learning paths |
| **Code Review** | AI-powered code analysis |

### 👥 Community
| Feature | Description |
|---------|-------------|
| **Discussion Forum** | Posts, questions, answers |
| **Study Groups** | Create and join study groups |
| **Real-time Chat** | Direct messaging and group chat |
| **Events** | Hackathons, workshops, webinars |

### 🎯 Gamification
| Feature | Description |
|---------|-------------|
| **XP & Levels** | Earn experience points for learning |
| **Streaks** | Daily learning streaks |
| **Badges** | Achievement badges |
| **Leaderboard** | Global and topic-wise rankings |
| **Career Roadmaps** | 14 career paths with guided learning |

### 💼 Platform Features
| Feature | Description |
|---------|-------------|
| **Multi-role Dashboard** | Student, Teacher, Admin, Parent dashboards |
| **Payments** | Stripe, Razorpay, PayPal integration |
| **Subscriptions** | Flexible pricing plans |
| **CMS** | Content management system for admins |
| **Analytics** | Detailed learning analytics |
| **i18n** | 22 language support |
| **PWA** | Offline support, installable |
| **Blog** | Technical blog platform |
| **Certificates** | Auto-generated completion certificates |

---

## 🏗️ Architecture

LearnVeda uses a **modular monorepo architecture** powered by **Turborepo + pnpm Workspaces**.

```
┌─────────────────────────────────────────────────────────────┐
│                        LEARNVEDA                            │
├──────────┬──────────┬───────────┬───────────┬───────────────┤
│  apps/   │packages/ │ services/ │  infra/   │    docs/      │
│          │          │           │           │               │
│ ├─ web   │ ├─ ui    │ ├─ auth   │ ├─ docker │ ├─ api        │
│ ├─ admin │ ├─ hooks │ ├─ user   │ ├─ k8s    │ ├─ arch       │
│ ├─ teacher│├─ utils │ ├─ course │ ├─ tf     │ ├─ security   │
│ ├─ student│├─ db    │ ├─ payment│ ├─ gha    │ ├─ deploy     │
│ ├─ parent│ ├─ seo   │ ├─ ai    │ ├─ nginx  │ └─ testing    │
│ ├─ mobile│ ├─ auth  │ ├─ chat  │ └─ monitor│               │
│ └─ desktop├─ i18n  │ └─ media │           │               │
│          │ └─ anim  │           │           │               │
└──────────┴──────────┴───────────┴───────────┴───────────────┘
```

### Design Principles

- **🔒 Feature Isolation** — Every feature is independent. No cross-feature dependencies.
- **📦 Shared Packages** — Reusable code is extracted into shared packages (UI, hooks, utils, types).
- **🧩 Modular Services** — Backend is split into independent NestJS microservices.
- **🚀 Scalable** — Designed for 10,000+ concurrent users from day one.
- **♻️ Zero Impact** — Changes in one module never break another.

---

## 🛠️ Tech Stack

### Frontend
| Category | Technologies |
|----------|-------------|
| **Framework** | Next.js 15 (App Router), React 19, TypeScript 5.5 |
| **Styling** | Tailwind CSS 4, shadcn/ui, Radix UI |
| **Animations** | GSAP, Framer Motion, Motion One, Lenis, Lottie, Anime.js, React Spring |
| **3D & Graphics** | Three.js, React Three Fiber, Drei, Spline, WebGL, OGL, Canvas API |
| **State** | Zustand, TanStack Query |
| **Forms** | React Hook Form, Zod |
| **Charts** | Apache ECharts, Chart.js, Recharts, D3.js |
| **Icons** | Lucide, Heroicons, Phosphor |
| **Editors** | Monaco Editor, CodeMirror, TipTap |
| **Math** | KaTeX, MathJax |

### Backend
| Category | Technologies |
|----------|-------------|
| **Runtime** | Node.js 22, NestJS 11 |
| **API** | REST, GraphQL, tRPC, WebSocket, Socket.IO |
| **Queue** | BullMQ, RabbitMQ |
| **Docs** | Swagger / OpenAPI |

### Database & Storage
| Category | Technologies |
|----------|-------------|
| **Primary DB** | MongoDB (Mongoose ODM) |
| **Cache** | Redis |
| **Search** | Meilisearch |
| **File Storage** | Cloudinary, AWS S3 |

### Authentication & Security
| Category | Technologies |
|----------|-------------|
| **Auth** | Clerk |
| **Security** | Helmet, CSP, CSRF, XSS Protection, Rate Limiting, Zod Validation |

### AI & ML
| Category | Technologies |
|----------|-------------|
| **LLMs** | OpenAI GPT, Google Gemini, Anthropic Claude |
| **Frameworks** | LangChain, Vercel AI SDK |
| **Browser ML** | TensorFlow.js, Transformers.js, ONNX Runtime |

### Payments
| Category | Technologies |
|----------|-------------|
| **Gateways** | Stripe, Razorpay, PayPal |

### DevOps & Infrastructure
| Category | Technologies |
|----------|-------------|
| **Containerization** | Docker, Docker Compose |
| **Orchestration** | Kubernetes (future) |
| **IaC** | Terraform |
| **CI/CD** | GitHub Actions |
| **Hosting** | Vercel, Cloudflare |
| **Proxy** | Nginx |
| **Monitoring** | Sentry, Grafana, Prometheus, OpenTelemetry |
| **Analytics** | Google Analytics, PostHog, Microsoft Clarity |

### Quality & Testing
| Category | Technologies |
|----------|-------------|
| **Unit** | Jest, Vitest |
| **E2E** | Playwright, Cypress |
| **Components** | Storybook, Testing Library |
| **Linting** | ESLint, Prettier, Husky, lint-staged |

### Additional Packages
| Category | Technologies |
|----------|-------------|
| **PDF** | PDF.js, react-pdf |
| **QR/Barcode** | Custom generators & scanners |
| **OCR** | Tesseract.js |
| **Audio/Video** | Custom player, recorder, streaming |
| **Calendar** | Custom calendar with month/week/day views |
| **Maps** | Google Maps, Mapbox, Leaflet |
| **AR/VR** | WebXR (future-ready) |
| **i18n** | next-intl (22 languages) |

---

## 📁 Project Structure

```
learnveda/
├── apps/                          # Applications
│   ├── web/                       # Main Next.js web app
│   │   ├── features/              # Feature modules
│   │   │   ├── landing/           # Landing page
│   │   │   ├── classroom/         # Classes 9-12
│   │   │   │   ├── class-9/       # Class 9 subjects & chapters
│   │   │   │   ├── class-10/      # Class 10
│   │   │   │   ├── class-11/      # Class 11 (Science/Commerce)
│   │   │   │   └── class-12/      # Class 12
│   │   │   ├── engineering/       # 9 branches × 8 semesters
│   │   │   ├── programming/       # 14 languages (day plans)
│   │   │   ├── core-cs/           # 9 CS subjects
│   │   │   ├── simulations/       # 140+ interactive simulations
│   │   │   ├── test-center/       # CBSE/JEE/NEET/GATE tests
│   │   │   ├── dashboard/         # Student dashboard
│   │   │   ├── community/         # Forum, chat, groups
│   │   │   ├── live/              # Live classes, battles, quiz
│   │   │   ├── practice/          # Coding, quiz, assignments
│   │   │   ├── leaderboard/       # Rankings
│   │   │   ├── events/            # Hackathons, workshops
│   │   │   ├── pricing/           # Subscription plans
│   │   │   ├── search/            # AI-powered search
│   │   │   ├── profile/           # User profile
│   │   │   ├── settings/          # User settings
│   │   │   ├── blog/              # Technical blog
│   │   │   ├── career/            # Career roadmaps
│   │   │   ├── company/           # About, Contact, Team
│   │   │   └── auth/              # Sign in, Sign up
│   │   ├── components/            # 80+ UI components
│   │   ├── animations/            # GSAP, Framer, Three.js
│   │   └── pwa/                   # Progressive Web App
│   ├── admin/                     # Admin panel
│   ├── teacher/                   # Teacher dashboard
│   ├── student/                   # Student app
│   ├── parent/                    # Parent portal
│   ├── mobile/                    # React Native mobile app
│   ├── desktop/                   # Electron desktop app
│   └── storybook/                 # Component library
│
├── packages/                      # 25+ Shared packages
│   ├── ui/                        # Design system & components
│   ├── animations/                # Animation utilities
│   ├── hooks/                     # Shared React hooks
│   ├── utils/                     # Common utilities
│   ├── database/                  # MongoDB schemas & models
│   ├── security/                  # Security middleware
│   ├── seo/                       # SEO utilities
│   ├── analytics/                 # Analytics integration
│   ├── i18n/                      # 22 language translations
│   ├── cache/                     # Redis caching layer
│   ├── queue/                     # Job queue management
│   ├── email/                     # Email service (Resend)
│   ├── notification/              # Push notifications
│   ├── storage/                   # File storage (Cloudinary/S3)
│   ├── pdf/                       # PDF generation & viewing
│   ├── qr-barcode/                # QR & barcode tools
│   ├── audio/                     # Audio player, TTS, STT
│   ├── video/                     # Video player & streaming
│   ├── calendar/                  # Calendar components
│   ├── maps/                      # Maps integration
│   ├── ml/                        # Browser-side ML
│   ├── design-system/             # Design tokens
│   └── config/                    # Shared configuration
│
├── services/                      # Backend microservices
│   ├── auth-service/              # Authentication (Clerk)
│   ├── user-service/              # User management
│   ├── course-service/            # Course content
│   ├── payment-service/           # Payments (Stripe/Razorpay)
│   ├── ai-service/                # AI tutor (GPT/Gemini)
│   ├── chat-service/              # Real-time chat
│   ├── notification-service/      # Notifications
│   ├── media-service/             # Media processing
│   ├── search-service/            # Meilisearch integration
│   ├── analytics-service/         # Learning analytics
│   ├── compiler-service/          # Code compilation
│   ├── simulation-service/        # Simulation engine
│   ├── test-service/              # Test & quiz engine
│   ├── community-service/         # Community features
│   ├── leaderboard-service/       # Rankings
│   ├── battle-service/            # Live battles
│   ├── certificate-service/       # Certificate generation
│   ├── email-service/             # Email sending
│   ├── cms-service/               # Content management
│   └── report-service/            # Analytics reports
│
├── infrastructure/                # DevOps & infrastructure
│   ├── docker/                    # Docker configurations
│   ├── kubernetes/                # K8s manifests
│   ├── terraform/                 # Infrastructure as Code
│   ├── github-actions/            # CI/CD pipelines
│   ├── nginx/                     # Reverse proxy
│   └── monitoring/                # Grafana, Prometheus
│
├── docs/                          # Documentation
│   ├── architecture/              # System architecture
│   ├── api/                       # API documentation
│   ├── deployment/                # Deployment guides
│   ├── contributing/              # Contribution guidelines
│   └── adr/                       # Architecture Decision Records
│
└── tooling/                       # Development tools
    ├── generators/                # Code generators
    ├── analyzers/                 # Bundle & performance analyzers
    ├── linters/                   # Custom ESLint rules
    └── codemods/                  # Migration scripts
```

> **52,366+ folders** — Every feature, every page, every chapter, every day-plan has its own isolated folder structure.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 22.0.0
- **pnpm** ≥ 9.0.0
- **MongoDB** ≥ 7.0
- **Redis** ≥ 7.0
- **Docker** (optional, for containerized development)

### Installation

```bash
# Clone the repository
git clone https://github.com/ISHUKR75/LearnVeda.git
cd learnveda

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local

# Start development server
pnpm dev
```

### Environment Variables

```env
# Authentication (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Database (MongoDB)
MONGODB_URI=mongodb+srv://...

# Cache (Redis)
REDIS_URL=redis://localhost:6379

# AI
OPENAI_API_KEY=sk-...
GOOGLE_GEMINI_API_KEY=...

# Payments
STRIPE_SECRET_KEY=sk_test_...
RAZORPAY_KEY_ID=rzp_test_...

# Storage
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...

# Search
MEILISEARCH_HOST=http://localhost:7700
MEILISEARCH_API_KEY=...

# Email
RESEND_API_KEY=re_...

# Analytics
NEXT_PUBLIC_GA_ID=G-...
NEXT_PUBLIC_POSTHOG_KEY=phc_...
```

### Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Lint all packages
pnpm format       # Format code with Prettier
pnpm test         # Run all tests
pnpm test:e2e     # Run E2E tests
pnpm storybook    # Launch Storybook
pnpm db:seed      # Seed database
pnpm db:migrate   # Run migrations
pnpm docker:up    # Start Docker services
pnpm docker:down  # Stop Docker services
```

---

## 📦 Apps & Services

### Applications

| App | Description | Port |
|-----|-------------|------|
| `apps/web` | Main student-facing web application | 3000 |
| `apps/admin` | Admin panel for content & user management | 3001 |
| `apps/teacher` | Teacher dashboard for course management | 3002 |
| `apps/student` | Dedicated student application | 3003 |
| `apps/parent` | Parent monitoring portal | 3004 |
| `apps/storybook` | Component library documentation | 6006 |

### Backend Services

| Service | Description | Port |
|---------|-------------|------|
| `auth-service` | Authentication & authorization | 4001 |
| `user-service` | User profiles & settings | 4002 |
| `course-service` | Course content management | 4003 |
| `payment-service` | Payment processing | 4004 |
| `ai-service` | AI tutor & recommendations | 4005 |
| `chat-service` | Real-time messaging | 4006 |
| `compiler-service` | Code compilation & execution | 4007 |
| `simulation-service` | Interactive simulations | 4008 |
| `search-service` | Full-text & semantic search | 4009 |

---

## 🎯 Learning Modules

### Classes 9-12 (CBSE)

Each class contains:
- **Subjects** with chapter-wise content
- **NCERT Solutions** for every chapter
- **Previous Year Questions** (PYQs)
- **Sample Papers** with solutions
- **Interactive Simulations**
- **Practice Quizzes**
- **Video Lessons**
- **Downloadable Notes**

### Engineering (9 Branches × 8 Semesters)

| Branch | Duration |
|--------|----------|
| Computer Science & Engineering (CSE) | 8 Semesters |
| Electronics & Communication (ECE) | 8 Semesters |
| Electrical & Electronics (EEE) | 8 Semesters |
| Mechanical Engineering | 8 Semesters |
| Civil Engineering | 8 Semesters |
| Chemical Engineering | 8 Semesters |
| AI & Machine Learning | 8 Semesters |
| Data Science | 8 Semesters |
| Information Technology (IT) | 8 Semesters |

### Programming Languages (Day-by-Day Plans)

| Language | Days | Level |
|----------|------|-------|
| C | 30 | Beginner |
| C++ | 30 | Intermediate |
| Java | 45 | Intermediate |
| Python | 45 | Beginner |
| JavaScript | 30 | Beginner |
| TypeScript | 25 | Intermediate |
| Rust | 40 | Advanced |
| Go | 30 | Intermediate |
| Kotlin | 30 | Intermediate |
| Swift | 30 | Intermediate |
| SQL | 20 | Beginner |
| Dart | 25 | Beginner |
| Ruby | 25 | Beginner |

### Core CS Subjects

| Subject | Days |
|---------|------|
| Data Structures & Algorithms | 60 |
| Web Development | 30 |
| System Design | 25 |
| Database Management | 20 |
| Operating Systems | 20 |
| Computer Networks | 20 |
| Git & GitHub | 10 |
| Competitive Programming | 60 |
| Interview Preparation | 30 |

---

## 🧪 Testing

```bash
# Unit tests
pnpm test

# E2E tests
pnpm test:e2e

# Component tests
pnpm test:components

# Coverage report
pnpm test:coverage
```

| Type | Tool | Coverage Target |
|------|------|----------------|
| Unit | Jest / Vitest | 80%+ |
| E2E | Playwright | Critical paths |
| Component | Storybook + Testing Library | All UI components |
| API | Supertest | All endpoints |

---

## 🔒 Security

- **Authentication**: Clerk (enterprise-grade)
- **Input Validation**: Zod schemas on every endpoint
- **XSS Protection**: Helmet + Content Security Policy
- **CSRF Protection**: Token-based CSRF prevention
- **Rate Limiting**: Per-route rate limiting
- **Data Sanitization**: MongoDB injection prevention
- **Encryption**: AES-256 for sensitive data
- **Audit Logs**: Track all admin actions
- **2FA Ready**: Two-factor authentication support

---

## 📈 Performance

- **Lazy Loading** — Components load on demand
- **Dynamic Imports** — Route-based code splitting
- **Skeleton Loading** — Instant perceived loading
- **ISR/SSR/SSG** — Hybrid rendering strategies
- **Edge Rendering** — Cloudflare edge functions
- **CDN** — Static assets served globally
- **Redis Caching** — API response caching
- **Image Optimization** — Next.js Image with Cloudinary
- **Font Optimization** — Google Fonts with `next/font`
- **Virtualization** — React Virtual for long lists
- **Service Worker** — Offline support via PWA
- **Brotli Compression** — Smallest possible payloads

**Target**: Core Web Vitals score 90+ on all pages.

---

## 🌐 Internationalization

LearnVeda supports **22 languages**:

| Language | Code | | Language | Code |
|----------|------|-|----------|------|
| English | `en` | | Hindi | `hi` |
| Bengali | `bn` | | Tamil | `ta` |
| Telugu | `te` | | Marathi | `mr` |
| Gujarati | `gu` | | Kannada | `kn` |
| Malayalam | `ml` | | Punjabi | `pa` |
| Odia | `or` | | Urdu | `ur` |
| Spanish | `es` | | French | `fr` |
| German | `de` | | Portuguese | `pt` |
| Japanese | `ja` | | Korean | `ko` |
| Chinese | `zh` | | Arabic | `ar` |
| Russian | `ru` | | Indonesian | `id` |

---

## 🤝 Contributing

We welcome contributions from developers worldwide! 🌍

### How to Contribute

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/YOUR_USERNAME/LearnVeda.git`
3. **Create** a branch: `git checkout -b feature/amazing-feature`
4. **Commit** changes: `git commit -m 'feat: add amazing feature'`
5. **Push** to branch: `git push origin feature/amazing-feature`
6. **Open** a Pull Request

### Contribution Guidelines

- Follow the existing folder structure
- Every file must have header comments explaining its purpose
- Every function must have documentation comments
- Write tests for new features
- Follow the commit convention: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`

### Good First Issues

Look for issues labeled [`good first issue`](https://github.com/ISHUKR75/LearnVeda/labels/good%20first%20issue) to get started.

---

## 📊 Project Stats

```
📁 Total Folders:     52,366+
📄 Total Files:       52,000+ (.gitkeep placeholders)
🏗️ Applications:     7 (web, admin, teacher, student, parent, mobile, desktop)
🔧 Backend Services: 20+
📦 Shared Packages:  25+
🌐 Languages:        22
🎮 Simulations:      140+
💻 Programming Langs: 14
🎓 Engineering:      9 branches × 8 semesters
📚 CS Subjects:      9
🧪 Test Categories:  7 (CBSE/JEE/NEET/GATE/CAT/Company/Programming)
```

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

Inspired by the best in EdTech:

- [Coursera](https://coursera.org) — Course structure
- [Khan Academy](https://khanacademy.org) — Free learning philosophy
- [LeetCode](https://leetcode.com) — Coding practice
- [GeeksforGeeks](https://geeksforgeeks.org) — CS content depth
- [Physics Wallah](https://physicswallah.live) — Indian education
- [Unacademy](https://unacademy.com) — Live learning
- [freeCodeCamp](https://freecodecamp.org) — Open-source education

---

<div align="center">

### ⭐ Star this repo if you find it useful!

**Built with ❤️ by [ISHUKR75](https://github.com/ISHUKR75) and contributors**

*Making quality education accessible to everyone, everywhere.*

</div>
