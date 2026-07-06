/**
 * @file app/(platform)/simulations/physics/force-motion/page.tsx
 * @description Force & Motion Physics Simulation — Class 9 CBSE
 * Route: /simulations/physics/force-motion
 *
 * Interactive canvas-based simulation that demonstrates:
 *   - Newton's Second Law: F = ma
 *   - Friction: f = μ × m × g
 *   - Real-time telemetry: velocity, acceleration, net force, kinetic energy
 *   - Adjustable sliders: mass (0.5–10 kg), applied force (±20 N), friction coefficient (0–1)
 *
 * Built as a client component to use canvas APIs and requestAnimationFrame.
 * Physics loop runs inside useRef to avoid React re-renders during animation.
 */

"use client"; // Client component — uses canvas, browser APIs, and real-time animation

/* ─── Imports ─────────────────────────────────────────────────────────────── */
import { useRef, useEffect, useState, useCallback } from "react"; // React hooks
import Link from "next/link"; // Navigation
import {
  ChevronRight, Play, Pause, RotateCcw,
  Zap, TrendingUp, Activity, Weight,
} from "lucide-react"; // Icons
import { Badge }  from "@/components/ui/badge";   // Badge component
import { Button } from "@/components/ui/button";  // Button component

/* ─── Physics Constants ──────────────────────────────────────────────────── */
const GRAVITY          = 9.8;  // m/s² — gravitational acceleration on Earth
const PIXELS_PER_METRE = 40;   // 1 metre = 40 pixels on canvas (scale factor)
const CANVAS_WIDTH     = 700;  // Canvas width in CSS pixels
const CANVAS_HEIGHT    = 180;  // Canvas height in CSS pixels
const GROUND_Y         = 140;  // Y position of the ground line on canvas
const BLOCK_SIZE       = 40;   // Block (object) size in pixels
const BLOCK_START_X    = 80;   // Starting X position of the block
const MAX_X            = CANVAS_WIDTH - BLOCK_SIZE - 20; // Maximum X before wall

/* ─── Physics State Interface ────────────────────────────────────────────── */
/** Internal physics state stored in ref — not React state to avoid re-renders */
interface PhysicsState {
  position:        number; // Block X position in pixels
  velocity:        number; // Current velocity in m/s
  acceleration:    number; // Current acceleration in m/s²
  netForce:        number; // Net force (applied - friction) in Newtons
  kineticEnergy:   number; // ½mv² in Joules
  time:            number; // Elapsed time in seconds
}

/* ─── Telemetry State Interface ─────────────────────────────────────────── */
/** Displayed telemetry values — updated at 60fps via setState */
interface Telemetry {
  velocity:      string; // Formatted velocity string
  acceleration:  string; // Formatted acceleration string
  netForce:      string; // Formatted net force string
  kineticEnergy: string; // Formatted kinetic energy string
  time:          string; // Formatted time string
}

/* ─── Main Component ──────────────────────────────────────────────────────── */
export default function ForceMotionSimulation() {
  /* ── Canvas Ref ──────────────────────────────────────────────────────── */
  const canvasRef    = useRef<HTMLCanvasElement>(null); // Reference to canvas element
  const physicsRef   = useRef<PhysicsState>({           // Physics state in ref (no re-render)
    position:      BLOCK_START_X,
    velocity:      0,
    acceleration:  0,
    netForce:      0,
    kineticEnergy: 0,
    time:          0,
  });
  const rafRef       = useRef<number>(0);               // requestAnimationFrame handle
  const lastTimeRef  = useRef<number>(0);               // Last frame timestamp for delta time

  /* ── React State (triggers UI re-render) ─────────────────────────────── */
  const [isRunning,   setIsRunning]   = useState(false);    // Is simulation running?
  const [mass,        setMass]        = useState(2);         // Object mass in kg (0.5–10)
  const [appliedForce, setAppliedForce] = useState(10);     // Applied force in N (−20 to +20)
  const [mu,          setMu]          = useState(0.3);       // Friction coefficient (0–1)
  const [telemetry,   setTelemetry]   = useState<Telemetry>({ // Live display values
    velocity:      "0.00 m/s",
    acceleration:  "0.00 m/s²",
    netForce:      "0.00 N",
    kineticEnergy: "0.00 J",
    time:          "0.00 s",
  });

  /* ── Draw Canvas Frame ────────────────────────────────────────────────── */
  /** Draws one frame of the simulation on the canvas */
  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Guard: canvas not mounted yet

    const ctx = canvas.getContext("2d");
    if (!ctx) return; // Guard: context not available

    const state = physicsRef.current; // Current physics state

    /* Clear canvas */
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    /* Draw sky gradient background */
    const skyGrad = ctx.createLinearGradient(0, 0, 0, GROUND_Y);
    skyGrad.addColorStop(0, "#0f172a"); // Dark navy top
    skyGrad.addColorStop(1, "#1e293b"); // Slightly lighter bottom
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, CANVAS_WIDTH, GROUND_Y);

    /* Draw ground */
    const groundGrad = ctx.createLinearGradient(0, GROUND_Y, 0, CANVAS_HEIGHT);
    groundGrad.addColorStop(0, "#374151"); // Dark gray
    groundGrad.addColorStop(1, "#1f2937"); // Darker
    ctx.fillStyle = groundGrad;
    ctx.fillRect(0, GROUND_Y, CANVAS_WIDTH, CANVAS_HEIGHT - GROUND_Y);

    /* Draw ground line */
    ctx.beginPath();
    ctx.moveTo(0, GROUND_Y);
    ctx.lineTo(CANVAS_WIDTH, GROUND_Y);
    ctx.strokeStyle = "#6b7280"; // Gray ground line
    ctx.lineWidth = 2;
    ctx.stroke();

    /* Draw block (the object) */
    const blockX = state.position; // Current X position
    const blockY = GROUND_Y - BLOCK_SIZE; // Y is always on ground

    ctx.beginPath();
    ctx.roundRect(blockX, blockY, BLOCK_SIZE, BLOCK_SIZE, 4); // Rounded corners
    ctx.fillStyle = "#6366f1"; // Indigo block color
    ctx.fill();
    ctx.strokeStyle = "#818cf8"; // Lighter stroke
    ctx.lineWidth = 1.5;
    ctx.stroke();

    /* Draw mass label on block */
    ctx.fillStyle = "#ffffff"; // White text
    ctx.font = "bold 11px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(`${mass}kg`, blockX + BLOCK_SIZE / 2, blockY + BLOCK_SIZE / 2 + 4);

    /* Draw force arrow (if applied force is non-zero) */
    if (appliedForce !== 0) {
      const arrowLength = Math.min(Math.abs(appliedForce) * 3, 80); // Scale arrow length
      const arrowDir    = appliedForce > 0 ? 1 : -1; // Direction
      const arrowStartX = appliedForce > 0
        ? blockX + BLOCK_SIZE          // Arrow starts at right edge
        : blockX;                       // Arrow starts at left edge
      const arrowEndX   = arrowStartX + arrowDir * arrowLength;
      const arrowY      = blockY + BLOCK_SIZE / 2; // Arrow at block midheight

      ctx.beginPath();
      ctx.moveTo(arrowStartX, arrowY);
      ctx.lineTo(arrowEndX, arrowY);
      ctx.strokeStyle = "#f97316"; // Orange arrow
      ctx.lineWidth = 3;
      ctx.stroke();

      /* Arrowhead */
      ctx.beginPath();
      ctx.moveTo(arrowEndX, arrowY - 6);
      ctx.lineTo(arrowEndX + arrowDir * 12, arrowY);
      ctx.lineTo(arrowEndX, arrowY + 6);
      ctx.fillStyle = "#f97316";
      ctx.fill();

      /* Force label */
      ctx.fillStyle = "#f97316";
      ctx.font = "bold 10px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(`F = ${appliedForce}N`, (arrowStartX + arrowEndX) / 2, arrowY - 10);
    }

    /* Draw friction indicator at bottom of block */
    if (mu > 0 && Math.abs(state.velocity) > 0.01) {
      const frictionDir = state.velocity > 0 ? -1 : 1; // Friction opposes motion
      const frictionLen = Math.min(mu * mass * GRAVITY * 2, 60); // Scaled length
      const frictionStartX = state.velocity > 0
        ? blockX                    // Friction arrow at left (opposing rightward motion)
        : blockX + BLOCK_SIZE;      // Friction arrow at right
      const frictionEndX = frictionStartX + frictionDir * frictionLen;

      ctx.beginPath();
      ctx.moveTo(frictionStartX, GROUND_Y - 6); // Below block
      ctx.lineTo(frictionEndX, GROUND_Y - 6);
      ctx.strokeStyle = "#ef4444"; // Red = friction force
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = "#ef4444";
      ctx.font = "9px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(`f = ${(mu * mass * GRAVITY).toFixed(1)}N`, (frictionStartX + frictionEndX) / 2, GROUND_Y + 14);
    }

    /* Draw velocity vector above block */
    if (Math.abs(state.velocity) > 0.05) {
      const velDir = state.velocity > 0 ? 1 : -1; // Velocity direction
      const velLen = Math.min(Math.abs(state.velocity) * 8, 60); // Scaled length
      const velStartX = blockX + BLOCK_SIZE / 2; // Velocity starts at block center top
      const velY      = blockY - 15;

      ctx.beginPath();
      ctx.moveTo(velStartX, velY);
      ctx.lineTo(velStartX + velDir * velLen, velY);
      ctx.strokeStyle = "#10b981"; // Green = velocity
      ctx.lineWidth = 2;
      ctx.stroke();

      /* Velocity arrowhead */
      ctx.beginPath();
      ctx.moveTo(velStartX + velDir * velLen - velDir * 6, velY - 5);
      ctx.lineTo(velStartX + velDir * velLen, velY);
      ctx.lineTo(velStartX + velDir * velLen - velDir * 6, velY + 5);
      ctx.fillStyle = "#10b981";
      ctx.fill();
    }
  }, [mass, appliedForce, mu]); // Redraw when sliders change

  /* ── Physics Step ────────────────────────────────────────────────────── */
  /** Advances physics simulation by deltaTime seconds */
  const physicsStep = useCallback((deltaTime: number) => {
    const state = physicsRef.current; // Get current state from ref

    /* Calculate friction force magnitude (opposes motion) */
    const frictionMagnitude = mu * mass * GRAVITY; // f = μmg

    /* Calculate friction force direction (opposes velocity) */
    let frictionForce = 0;
    if (Math.abs(state.velocity) > 0.01) {
      frictionForce = state.velocity > 0 ? -frictionMagnitude : frictionMagnitude;
    } else if (Math.abs(appliedForce) <= frictionMagnitude) {
      // Static friction — object doesn't move if applied force ≤ static friction
      frictionForce = -appliedForce; // Exactly cancels applied force
    }

    /* Net force = Applied force + Friction force */
    const netForce = appliedForce + frictionForce;

    /* Newton's Second Law: a = F/m */
    const acceleration = netForce / mass;

    /* Euler integration: v = v₀ + a·Δt */
    let newVelocity = state.velocity + acceleration * deltaTime;

    /* Prevent velocity sign flip from friction (object shouldn't slide backward) */
    if (appliedForce === 0 && Math.abs(newVelocity) > 0 && Math.sign(newVelocity) !== Math.sign(state.velocity || 1)) {
      newVelocity = 0; // Stop at zero — friction can't reverse motion
    }

    /* Position update: x = x₀ + v·Δt, clamped to canvas bounds */
    const newPosition = Math.max(
      20,
      Math.min(MAX_X, state.position + newVelocity * PIXELS_PER_METRE * deltaTime)
    );

    /* Stop at walls */
    const finalVelocity = (newPosition <= 20 || newPosition >= MAX_X) ? 0 : newVelocity;

    /* Kinetic energy: KE = ½mv² */
    const kineticEnergy = 0.5 * mass * finalVelocity * finalVelocity;

    /* Update physics state (in ref — no re-render) */
    physicsRef.current = {
      position:      newPosition,
      velocity:      finalVelocity,
      acceleration,
      netForce,
      kineticEnergy,
      time:          state.time + deltaTime,
    };

    /* Update React state for telemetry display (60fps) */
    setTelemetry({
      velocity:      `${finalVelocity >= 0 ? "+" : ""}${finalVelocity.toFixed(2)} m/s`,
      acceleration:  `${acceleration >= 0 ? "+" : ""}${acceleration.toFixed(2)} m/s²`,
      netForce:      `${netForce >= 0 ? "+" : ""}${netForce.toFixed(2)} N`,
      kineticEnergy: `${kineticEnergy.toFixed(2)} J`,
      time:          `${(state.time + deltaTime).toFixed(2)} s`,
    });
  }, [mass, appliedForce, mu]); // Recalculate when parameters change

  /* ── Animation Loop ──────────────────────────────────────────────────── */
  /** Main animation loop — runs at 60fps when simulation is active */
  const animationLoop = useCallback((timestamp: number) => {
    /* Calculate delta time in seconds (cap at 50ms to prevent large jumps) */
    const deltaTime = Math.min((timestamp - lastTimeRef.current) / 1000, 0.05);
    lastTimeRef.current = timestamp; // Update last frame time

    physicsStep(deltaTime); // Advance physics by one frame
    drawFrame();            // Render current state to canvas

    rafRef.current = requestAnimationFrame(animationLoop); // Schedule next frame
  }, [physicsStep, drawFrame]); // Depends on physics and draw functions

  /* ── Start/Stop Effects ──────────────────────────────────────────────── */
  useEffect(() => {
    if (isRunning) {
      lastTimeRef.current = performance.now(); // Reset timer when starting
      rafRef.current = requestAnimationFrame(animationLoop); // Start loop
    } else {
      cancelAnimationFrame(rafRef.current); // Stop loop
    }
    return () => cancelAnimationFrame(rafRef.current); // Cleanup on unmount
  }, [isRunning, animationLoop]);

  /* ── Draw initial frame ──────────────────────────────────────────────── */
  useEffect(() => {
    drawFrame(); // Draw static frame on mount and parameter changes
  }, [drawFrame]);

  /* ── Reset Handler ───────────────────────────────────────────────────── */
  const handleReset = () => {
    setIsRunning(false); // Stop simulation
    physicsRef.current = { // Reset physics state to initial values
      position:      BLOCK_START_X,
      velocity:      0,
      acceleration:  0,
      netForce:      0,
      kineticEnergy: 0,
      time:          0,
    };
    setTelemetry({ // Reset telemetry display
      velocity:      "0.00 m/s",
      acceleration:  "0.00 m/s²",
      netForce:      "0.00 N",
      kineticEnergy: "0.00 J",
      time:          "0.00 s",
    });
    setTimeout(drawFrame, 16); // Redraw after state update
  };

  /* ── Render ──────────────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="border-b border-border/40 bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/simulations" className="hover:text-foreground transition-colors">Simulations</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/simulations/physics" className="hover:text-foreground transition-colors">Physics</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">Force & Motion</span>
          </nav>

          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <Zap className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Force &amp; Motion Simulator</h1>
              <p className="text-muted-foreground mt-1 text-sm">
                Class 9 · Force &amp; Laws of Motion · Newton&apos;s Second Law (F = ma)
              </p>
              <div className="flex gap-2 mt-2">
                <Badge variant="secondary">CBSE Class 9</Badge>
                <Badge variant="outline" className="border-green-500/50 text-green-600">Free</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main simulation area */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Canvas */}
        <div className="rounded-xl border border-border/40 bg-card overflow-hidden">
          <div className="p-4 border-b border-border/30 flex items-center justify-between">
            <span className="text-sm font-medium">Simulation Canvas</span>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleReset}
                className="gap-1.5"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset
              </Button>
              <Button
                size="sm"
                onClick={() => setIsRunning((r) => !r)}
                className="gap-1.5"
              >
                {isRunning ? (
                  <><Pause className="h-3.5 w-3.5" /> Pause</>
                ) : (
                  <><Play className="h-3.5 w-3.5" /> Start</>
                )}
              </Button>
            </div>
          </div>

          {/* Physics canvas */}
          <div className="bg-slate-900 flex justify-center overflow-auto">
            <canvas
              ref={canvasRef}
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
              className="block"
              aria-label="Physics simulation canvas showing a block on a surface"
            />
          </div>
        </div>

        {/* Controls + Telemetry */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sliders */}
          <div className="rounded-xl border border-border/40 bg-card p-6 space-y-6">
            <h2 className="font-semibold">Controls</h2>

            {/* Mass slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <label htmlFor="mass-slider" className="flex items-center gap-1.5">
                  <Weight className="h-4 w-4 text-muted-foreground" />
                  Mass
                </label>
                <span className="font-mono font-medium">{mass.toFixed(1)} kg</span>
              </div>
              <input
                id="mass-slider"
                type="range"
                min="0.5"
                max="10"
                step="0.5"
                value={mass}
                onChange={(e) => { setMass(Number(e.target.value)); if (!isRunning) drawFrame(); }}
                className="w-full accent-indigo-500"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0.5 kg</span><span>10 kg</span>
              </div>
            </div>

            {/* Applied force slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <label htmlFor="force-slider" className="flex items-center gap-1.5">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  Applied Force
                </label>
                <span className="font-mono font-medium text-orange-500">
                  {appliedForce >= 0 ? "+" : ""}{appliedForce} N
                </span>
              </div>
              <input
                id="force-slider"
                type="range"
                min="-20"
                max="20"
                step="1"
                value={appliedForce}
                onChange={(e) => { setAppliedForce(Number(e.target.value)); if (!isRunning) drawFrame(); }}
                className="w-full accent-orange-500"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>−20 N ←</span><span>0</span><span>→ +20 N</span>
              </div>
            </div>

            {/* Friction coefficient slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <label htmlFor="mu-slider" className="flex items-center gap-1.5">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                  Friction (μ)
                </label>
                <span className="font-mono font-medium text-red-500">{mu.toFixed(2)}</span>
              </div>
              <input
                id="mu-slider"
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={mu}
                onChange={(e) => { setMu(Number(e.target.value)); if (!isRunning) drawFrame(); }}
                className="w-full accent-red-500"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0.0 (ice)</span><span>0.5</span><span>1.0 (rough)</span>
              </div>
            </div>
          </div>

          {/* Telemetry display */}
          <div className="rounded-xl border border-border/40 bg-card p-6">
            <h2 className="font-semibold mb-4">Live Telemetry</h2>
            <div className="space-y-3">
              {[
                { label: "Velocity",       value: telemetry.velocity,      color: "text-green-500",  icon: TrendingUp },
                { label: "Acceleration",   value: telemetry.acceleration,  color: "text-blue-500",   icon: Activity },
                { label: "Net Force",      value: telemetry.netForce,      color: "text-orange-500", icon: Zap },
                { label: "Kinetic Energy", value: telemetry.kineticEnergy, color: "text-purple-500", icon: Zap },
                { label: "Time Elapsed",   value: telemetry.time,          color: "text-muted-foreground", icon: Activity },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-2 border-b border-border/20 last:border-0">
                  <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                    <item.icon className="h-3.5 w-3.5" />
                    {item.label}
                  </span>
                  <span className={`font-mono font-semibold text-sm ${item.color}`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Formula reference */}
            <div className="mt-4 rounded-lg bg-muted/50 p-3 text-xs space-y-1 font-mono">
              <p className="text-muted-foreground font-sans text-xs font-medium mb-2">Key Formulas</p>
              <p>F<sub>net</sub> = F<sub>applied</sub> − f</p>
              <p>f = μ × m × g</p>
              <p>a = F<sub>net</sub> / m</p>
              <p>KE = ½mv²</p>
            </div>
          </div>
        </div>

        {/* Theory section */}
        <div className="rounded-xl border border-border/40 bg-card p-6">
          <h2 className="font-semibold mb-4">Theory — Newton&apos;s Second Law</h2>
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <p>
              <strong>Newton&apos;s Second Law</strong> states that the acceleration of an object is
              directly proportional to the net force applied on it and inversely proportional to its mass:
            </p>
            <blockquote className="border-l-4 border-brand-500 pl-4 font-mono text-lg my-3">
              F = m × a
            </blockquote>
            <p>
              In this simulation, we apply a horizontal force to a block on a surface.
              The surface exerts a <strong>friction force</strong> opposing the motion:
            </p>
            <blockquote className="border-l-4 border-red-500 pl-4 font-mono text-lg my-3">
              f = μ × m × g
            </blockquote>
            <p>
              where μ (mu) is the coefficient of kinetic friction, m is the mass, and g = 9.8 m/s².
              The net force determines the acceleration.
            </p>
          </div>
          <div className="mt-4 flex gap-3">
            <Button asChild variant="outline" size="sm">
              <Link href="/learn/class-9/science/chapter-09">Read Chapter Notes</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/simulations/physics/gravitation">Next Simulation →</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
