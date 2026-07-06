# Contributing to LearnVeda

Thank you for your interest in contributing to LearnVeda! 🎉

LearnVeda is an open-source EdTech platform built for Indian students. We welcome contributions from everyone.

## Getting Started

### 1. Fork & Clone
```bash
git clone https://github.com/<your-username>/LearnVeda.git
cd LearnVeda
```

### 2. Setup
```bash
cd apps/web
npm install
cp .env.example .env.local
# Edit .env.local with your values
npm run dev
```

### 3. Create a branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

## Contribution Guidelines

### Code Style
- **TypeScript strict mode** — no `any` types
- **Comments on every function** — parameters, return values, purpose
- **One feature per folder** — don't add code to unrelated features
- **No console.log in production code** — use the logger

### Naming Conventions
| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `UserCard.tsx` |
| Hooks | camelCase + `use` prefix | `useLocalStorage.ts` |
| Utils | camelCase | `formatDate.ts` |
| Types | PascalCase | `UserProfile` |
| Constants | UPPER_SNAKE_CASE | `MAX_STREAK_DAYS` |
| API routes | kebab-case | `/api/live-battles` |

### Commit Messages
Follow [Conventional Commits](https://www.conventionalcommits.org/):
```
feat: add live battle reconnect support
fix: resolve timezone issue in streak calculation
docs: update API reference for /api/compiler
chore: upgrade framer-motion to v12
```

### Pull Request Checklist
- [ ] Code follows TypeScript strict mode
- [ ] New components have detailed JSDoc comments
- [ ] No existing files deleted (only additions)
- [ ] Responsive on mobile (375px) and desktop (1440px)
- [ ] No hardcoded API keys or secrets
- [ ] Feature works in demo mode (without real API keys)
- [ ] PR description explains what changed and why

## Project Structure

Each new feature should follow this folder pattern:
```
features/<feature-name>/
├── components/           # React components
│   └── FeatureMain.tsx
├── hooks/                # Custom hooks (optional)
├── types/                # TypeScript types (optional)
├── utils/                # Utility functions (optional)
└── README.md             # Feature documentation
```

## What to Contribute

### Good first issues
- Adding translations for a new Indian language
- Adding a new programming language day-plan
- Improving accessibility (ARIA labels, keyboard navigation)
- Adding unit tests
- Fixing typos in content

### Feature areas
- **CBSE Content**: Chapter content, quiz questions, simulations
- **Programming**: Day-by-day lesson plans for any language
- **UI/UX**: Animations, responsiveness improvements
- **i18n**: Translating UI strings to Indian languages
- **Performance**: Bundle size reduction, loading improvements

## Need Help?

- 💬 [Community Forum](https://learnveda.in/community)
- 🐛 [GitHub Issues](https://github.com/ISHUKR75/LearnVeda/issues)
- 📧 [Email](mailto:hello@learnveda.in)

---

Thank you for helping make LearnVeda better for millions of Indian students! 🇮🇳
