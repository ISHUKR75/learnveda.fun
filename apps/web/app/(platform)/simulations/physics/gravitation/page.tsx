/**
 * @file app/(platform)/simulations/physics/gravitation/page.tsx
 * @description Interactive Gravitation & Orbital Motion Simulator
 * Route: /simulations/physics/gravitation
 *
 * Simulates:
 *   - Gravitational force between two bodies: F = GMm/r²
 *   - Orbital mechanics (circular and elliptical orbits)
 *   - Escape velocity: v_esc = √(2GM/r)
 *   - Time period of orbit: T² ∝ r³ (Kepler's Third Law)
 *
 * Controls:
 *   - Central body mass (M) — slider
 *   - Satellite distance (r) — drag on canvas
 *   - Initial velocity (v) — slider
 *   - Show/hide velocity vectors
 *   - Pause / Resume
 *
 * Physics: Euler integration (dt = 0.1s), real-time telemetry update.
 */

"use client"; // Client component — canvas animation

/* ─── Imports ─────────────────────────────────────────────────────────────── */
import { useEffect, useRef, useState, useCallback } from "react"; // React hooks
import Link from "next/link"; // Navigation
import { ChevronRight, Play, Pause, RotateCcw, Lightbulb, Star } from "lucide-react"; // Icons
import { Badge }  from "@/components/ui/badge";   // Badge
import { Button } from "@/components/ui/button";  // Button

/* ─── Physics Constants ──────────────────────────────────────────────────── */
const G_SIM   = 6.674e-4; // Scaled G for simulation (real: 6.674e-11 N·m²/kg²)
const DT      = 0.08;     // Time step per frame (seconds scaled)
const SCALE   = 100;      // Pixels per AU (Astronomical Unit for display)

/* ─── Page Component ─────────────────────────────────────────────────────── */
export default function GravitationSimPage() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);  // Canvas element
  const rafRef     = useRef<number>(0);                // Animation frame ID
  const stateRef   = useRef({
    running:    true,
    centralMass:5000,      // Mass of central body (arbitrary units)
    satX:       2.5,       // Satellite X in AU from center
    satY:       0,         // Satellite Y
    satVx:      0,         // Satellite velocity X
    satVy:      0,         // Satellite velocity Y
    trail:      [] as { x: number; y: number }[],
    showVectors: true,
    orbitPeriod: 0,
  });

  const [telemetry, setTelemetry] = useState({
    force:     0,
    velocity:  0,
    distance:  0,
    period:    0,
    escapeVel: 0,
    running:   true,
  });

  const [centralMass, setCentralMass] = useState(5000);

  /* ── Initialize satellite at circular orbit velocity ────────────────── */
  const initOrbit = useCallback((mass: number, dist = 2.5) => {
    const r  = dist; // AU
    const vc = Math.sqrt(G_SIM * mass / r); // Circular orbit velocity
    stateRef.current.satX  = r;
    stateRef.current.satY  = 0;
    stateRef.current.satVx = 0;
    stateRef.current.satVy = vc;
    stateRef.current.trail = [];
    stateRef.current.centralMass = mass;
  }, []);

  /* ── Canvas animation loop ───────────────────────────────────────────── */
  useEffect(() => {
    const canvas  = canvasRef.current;
    if (!canvas) return;
    const ctx     = canvas.getContext("2d");
    if (!ctx) return;

    initOrbit(centralMass); // Initialize with current mass

    const loop = () => {
      const s   = stateRef.current;
      const W   = canvas.width;
      const H   = canvas.height;
      const cx  = W / 2; // Canvas center X
      const cy  = H / 2; // Canvas center Y

      /* ── Physics update ────────────────────────────────────── */
      if (s.running) {
        /* Distance and direction from satellite to central body */
        const dx  = -s.satX;     // Central body at origin
        const dy  = -s.satY;
        const r   = Math.sqrt(dx * dx + dy * dy);       // Distance in AU
        const rMin = 0.3; // Minimum distance to prevent explosion

        if (r > rMin) {
          /* Gravitational acceleration: a = GM/r² */
          const a = G_SIM * s.centralMass / (r * r);
          s.satVx += (dx / r) * a * DT; // Euler integration
          s.satVy += (dy / r) * a * DT;
          s.satX  += s.satVx * DT;
          s.satY  += s.satVy * DT;

          /* Store trail */
          s.trail.push({ x: s.satX, y: s.satY });
          if (s.trail.length > 300) s.trail.shift(); // Limit trail length

          /* Update telemetry at 10fps */
          const v   = Math.sqrt(s.satVx * s.satVx + s.satVy * s.satVy);
          const F   = G_SIM * s.centralMass / (r * r);
          const T   = 2 * Math.PI * Math.sqrt((r * r * r) / (G_SIM * s.centralMass));
          const ves = Math.sqrt(2 * G_SIM * s.centralMass / r);
          setTelemetry({ force: F, velocity: v, distance: r, period: T, escapeVel: ves, running: s.running });
        } else {
          /* Collision — reset orbit */
          initOrbit(s.centralMass);
        }
      }

      /* ── Draw ──────────────────────────────────────────────── */
      /* Background */
      ctx.fillStyle = "#030712";
      ctx.fillRect(0, 0, W, H);

      /* Stars (static) */
      ctx.fillStyle = "rgba(255,255,255,0.4)";
      for (let i = 0; i < 80; i++) {
        const sx = ((i * 137.5) % 1) * W;
        const sy = ((i * 73.1)  % 1) * H;
        ctx.fillRect(sx, sy, 1, 1);
      }

      /* Orbit trail */
      if (s.trail.length > 2) {
        ctx.beginPath();
        ctx.strokeStyle = "rgba(99,102,241,0.4)";
        ctx.lineWidth   = 1.5;
        s.trail.forEach((pt, i) => {
          const px = cx + pt.x * SCALE;
          const py = cy + pt.y * SCALE;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        });
        ctx.stroke();
      }

      /* Central body (Sun/planet) */
      const bodyGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 22);
      bodyGrad.addColorStop(0, "#fde68a");
      bodyGrad.addColorStop(0.5, "#f59e0b");
      bodyGrad.addColorStop(1, "#d97706");
      ctx.beginPath();
      ctx.arc(cx, cy, 22, 0, Math.PI * 2);
      ctx.fillStyle = bodyGrad;
      ctx.fill();
      /* Glow */
      ctx.beginPath();
      ctx.arc(cx, cy, 30, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(251,191,36,0.15)";
      ctx.fill();

      /* Satellite */
      const satPx = cx + stateRef.current.satX * SCALE;
      const satPy = cy + stateRef.current.satY * SCALE;
      ctx.beginPath();
      ctx.arc(satPx, satPy, 8, 0, Math.PI * 2);
      ctx.fillStyle = "#60a5fa";
      ctx.fill();
      ctx.strokeStyle = "#93c5fd";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      /* Velocity vector */
      if (s.showVectors) {
        const vScale = 40;
        ctx.beginPath();
        ctx.strokeStyle = "#4ade80";
        ctx.lineWidth = 2;
        ctx.moveTo(satPx, satPy);
        ctx.lineTo(satPx + s.satVx * vScale, satPy + s.satVy * vScale);
        ctx.stroke();
        ctx.fillStyle = "#4ade80";
        ctx.font = "11px monospace";
        ctx.fillText("v", satPx + s.satVx * vScale + 4, satPy + s.satVy * vScale);
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current); // Cleanup
  }, [initOrbit, centralMass]);

  /* ── Controls ────────────────────────────────────────────────────────── */
  const togglePause = () => {
    stateRef.current.running = !stateRef.current.running;
    setTelemetry((t) => ({ ...t, running: stateRef.current.running }));
  };

  const handleReset = () => initOrbit(centralMass);

  const handleMassChange = (val: number) => {
    setCentralMass(val);
    initOrbit(val);
  };

  const toggleVectors = () => {
    stateRef.current.showVectors = !stateRef.current.showVectors;
  };

  /* ── Render ──────────────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/40 bg-muted/30 px-4 sm:px-6 py-5">
        <div className="max-w-5xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-2" aria-label="Breadcrumb">
            <Link href="/simulations" className="hover:text-foreground">Simulations</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/simulations/physics" className="hover:text-foreground">Physics</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">Gravitation</span>
          </nav>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">🪐 Orbital Gravitation Simulator</h1>
            <Badge variant="secondary">Class 9 · Science</Badge>
            <Badge variant="outline" className="border-purple-500/40 text-purple-600">F = GMm/r²</Badge>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Canvas */}
          <div className="lg:col-span-2 rounded-xl overflow-hidden border border-border/40">
            <canvas
              ref={canvasRef}
              width={600}
              height={450}
              className="w-full"
              aria-label="Gravitation simulation canvas"
            />
          </div>

          {/* Controls */}
          <div className="space-y-4">
            {/* Telemetry */}
            <div className="rounded-xl border border-border/40 bg-card p-4">
              <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" /> Live Telemetry
              </h3>
              <div className="space-y-2 font-mono text-sm">
                {[
                  { label:"F (Gravity)",    value:`${telemetry.force.toFixed(4)} N*`,    color:"text-yellow-400" },
                  { label:"v (Velocity)",   value:`${telemetry.velocity.toFixed(3)} AU/s`, color:"text-green-400" },
                  { label:"r (Distance)",   value:`${telemetry.distance.toFixed(2)} AU`,   color:"text-blue-400" },
                  { label:"T (Period)",     value:`${telemetry.period.toFixed(2)} s`,       color:"text-purple-400" },
                  { label:"v_esc",          value:`${telemetry.escapeVel.toFixed(3)} AU/s`, color:"text-red-400" },
                ].map((t) => (
                  <div key={t.label} className="flex items-center justify-between">
                    <span className="text-muted-foreground">{t.label}</span>
                    <span className={t.color}>{t.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Central mass slider */}
            <div className="rounded-xl border border-border/40 bg-card p-4">
              <label className="text-sm font-medium block mb-2">
                Central Body Mass (M): <span className="text-brand-500">{centralMass}</span>
              </label>
              <input
                type="range" min={500} max={15000} step={100}
                value={centralMass}
                onChange={(e) => handleMassChange(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Small planet</span><span>Giant star</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
              <Button onClick={togglePause} variant="outline" className="flex-1 gap-1.5">
                {telemetry.running ? <><Pause className="h-4 w-4" /> Pause</> : <><Play className="h-4 w-4" /> Resume</>}
              </Button>
              <Button onClick={handleReset} variant="outline" className="flex-1 gap-1.5">
                <RotateCcw className="h-4 w-4" /> Reset
              </Button>
            </div>
            <Button onClick={toggleVectors} variant="ghost" size="sm" className="w-full text-xs">
              Toggle Velocity Vectors
            </Button>

            {/* Key concept note */}
            <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
              <p className="text-xs text-muted-foreground flex gap-2">
                <Lightbulb className="h-4 w-4 text-yellow-500 shrink-0" />
                <span><strong>Kepler&apos;s 3rd Law:</strong> T² ∝ r³ — increase central mass to see the satellite orbit faster at the same distance.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
