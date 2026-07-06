# Feature: Simulations

Interactive browser-based simulations for Physics, Chemistry, Mathematics, DSA, and Computer Science.

## Simulation Categories

| Category        | Count | Key Simulations                                                |
|----------------|-------|----------------------------------------------------------------|
| Physics         | 8     | Force & Motion, Gravitation, Projectile, Optics, Circuits      |
| Chemistry       | 4     | Periodic Table, Atomic Structure, Chemical Reactions, Electrolysis |
| Mathematics     | 4     | Geometry Explorer, Function Grapher, Statistics Viz, Probability |
| DSA             | 5     | Sorting Visualizer, BST, Graph BFS/DFS, DP Table               |
| Computer Science| 3     | CPU Scheduler, Cache Simulator, Network Protocols              |

## Architecture

Each simulation is a **client component** (`"use client"`) that:
1. Uses `useRef` for physics state (avoids React re-renders during animation)
2. Uses `useEffect` for `requestAnimationFrame` animation loops
3. Uses `useState` only for UI telemetry (updated at ~10fps, not 60fps)
4. Cleans up with `cancelAnimationFrame` in the `useEffect` return function

### Canvas-based Simulations

Physics simulations (Force & Motion, Projectile, etc.) use the HTML5 Canvas API:
```tsx
const canvasRef = useRef<HTMLCanvasElement>(null);
const ctx = canvasRef.current.getContext("2d");
// Physics state in ref (no re-render)
const stateRef = useRef({ position: 0, velocity: 0, ... });
```

### React-state Simulations

DSA simulations (Sorting Visualizer, BST) use React state with `useState`:
```tsx
const [bars, setBars] = useState<Bar[]>([]);
// Animation via async/await + sleep()
await sleep(animationSpeed);
setBars([...newState]);
```

## Performance Notes

- Physics loops run at 60fps using `requestAnimationFrame`
- Telemetry (UI numbers like velocity, XP) updates at 10fps using `setInterval`
- Canvas draws happen synchronously in the RAF callback — no React re-renders
- Stop signal uses `useRef<boolean>` to avoid stale closures in async sort loops

## Adding a New Simulation

1. Create file: `app/(platform)/simulations/[category]/[name]/page.tsx`
2. Mark as `"use client"` at top
3. Add to `SIMULATION_CATEGORIES` in `app/(platform)/simulations/page.tsx`
4. Add to `SIMULATIONS_DATA` in `app/(platform)/simulations/[category]/page.tsx`
5. Link from the relevant chapter page (`hasSimulation: true`)
