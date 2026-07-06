# Feature: Home

The `home` feature contains all components used on the LearnVeda marketing homepage (`/`).

## Components

| Component            | Description                                                      |
|---------------------|------------------------------------------------------------------|
| `HeroSection`        | Above-the-fold hero with animated headline, CTA, and stats       |
| `StatsSection`       | Social proof numbers (students, chapters, questions)              |
| `LearnTracksSection` | Cards for Class 9–12, Engineering, Programming tracks             |
| `FeaturesSection`    | "What makes LearnVeda unique" feature grid                        |
| `SimulationsSection` | Interactive simulations showcase with demo previews               |
| `ProgrammingSection` | 13 programming languages with day-plan overview                   |
| `CommunitySection`   | Community posts, battles, and social proof                        |
| `TestimonialsSection`| Student testimonials carousel                                     |
| `PricingPreview`     | Pricing tiers preview card                                        |
| `CTASection`         | Final conversion CTA section                                      |

## Usage

All components are imported in `app/(marketing)/page.tsx`:

```tsx
import { HeroSection } from "@/features/home/components/HeroSection";
```

## Animation Notes

- All Framer Motion `initial` states must use `opacity: 0.01` (NOT 0) for above-the-fold components
- This prevents blank screenshots in Replit previews and SSR hydration issues
- See `.agents/memory/framer-motion-ssr.md` for background

## Data Flow

- All content is static (in-component constants) for SSR performance
- No API calls from these components — data is baked in
- For real student count/stats: update the `STATS` constant via MongoDB aggregation pipeline
