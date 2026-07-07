# 🎮 Gamification Feature Module

> **LearnVeda's engagement engine** — XP levels, streaks, badges, and celebrations that keep students motivated.

---

## Overview

The gamification system drives student retention by making learning feel rewarding. Every action on the platform earns XP, contributes to a streak, or unlocks a badge.

## Components

| Component | File | Description |
|-----------|------|-------------|
| `XPBar` | `components/XPBar.tsx` | Animated horizontal progress bar with tier colors |
| `LevelRing` | `components/XPBar.tsx` | Circular SVG progress ring for Profile/cards |
| `StreakDisplay` | `components/StreakDisplay.tsx` | Weekly calendar + flame animation |
| `AchievementBadges` | `components/AchievementBadges.tsx` | Filterable badge grid (22+ badges) |
| `LevelUpModal` | `components/LevelUpModal.tsx` | 200-piece confetti celebration modal |

## XP Formula

```
XP needed to reach Level N = sum of (100 × i²) for i from 1 to N-1
Level  1 →  2 : 100 XP
Level  2 →  3 : 400 XP
Level 10 → 11 : 10,000 XP
Level 50 → 51 : 250,000 XP
```

## Tier System

| Tier | Levels | Color |
|------|--------|-------|
| Bronze | 1–10 | Amber |
| Silver | 11–20 | Slate |
| Gold | 21–30 | Yellow |
| Platinum | 31–40 | Cyan |
| Ruby | 41–50 | Rose |
| Sapphire | 51–60 | Blue |
| Diamond | 61–70 | Sky |
| Emerald | 71–80 | Green |
| Legend | 81–90 | Pink/Purple |
| Grandmaster | 91–100 | Red/Orange |

## Usage

```tsx
import { XPBar, StreakDisplay, LevelUpModal } from "@/features/gamification";

// XP Bar
<XPBar currentXP={1250} showTier />

// Streak
<StreakDisplay
  currentStreak={7}
  longestStreak={21}
  completedToday={true}
  isAtRisk={false}
  activeDates={["2026-07-01", "2026-07-02"]}
/>

// Level-up modal
<LevelUpModal
  isOpen={showModal}
  newLevel={15}
  xpEarned={450}
  newTier="Gold"
  onDismiss={() => setShowModal(false)}
/>
```
