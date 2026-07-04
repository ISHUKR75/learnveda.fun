---
name: Framer Motion SSR Initial Opacity
description: Hero sections with opacity:0 initial state appear blank before hydration; use 0.01 floor
---

## Rule
For above-the-fold hero sections that use Framer Motion `initial="hidden"` with `opacity: 0`, change the initial opacity to `0.01` (not 0). This ensures content is painted on first SSR render and avoids blank screenshots or flashes.

**Why:** Framer Motion animates client-side. Initial `opacity: 0` means the element is invisible until JS hydration + animation fires. Screenshots tools and slow devices see a blank page.

**How to apply:** Change `hidden: { opacity: 0, y: N }` to `hidden: { opacity: 0.01, y: N }` in hero section animation variants. Below-the-fold sections that use `whileInView` are fine with opacity:0.
