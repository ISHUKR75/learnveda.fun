/**
 * @file features/simulations/components/PhysicsSimulation.tsx
 * @description Interactive physics simulations — projectile motion, pendulum, waves, optics
 * Uses Canvas API and React hooks for real-time animation — no external dependencies needed.
 */

"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, Sliders } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* ─── Styled range helper (native HTML — no extra dep) ─────────────────── */
function RangeInput({
  min, max, step, value, onChange, className,
}: {
  min: number; max: number; step: number;
  value: number; onChange: (v: number) => void;
  className?: string;
}) {
  return (
    <input
      type="range" min={min} max={max} step={step} value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className={cn("h-2 w-full cursor-pointer accent-indigo-600", className)}
    />
  );
}

/* ─── Projectile Motion Simulation ─────────────────────────────────────── */
export function ProjectileMotionSim() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef<number>(0);
  const [angle, setAngle]     = useState(45);
  const [speed, setSpeed]     = useState(50);
  const [running, setRunning] = useState(false);
  const [stats, setStats]     = useState({ range: 0, maxH: 0, time: 0 });

  const drawProjectile = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx  = canvas.getContext("2d")!;
    const W    = canvas.width, H = canvas.height;
    const g    = 9.8;
    const v0   = speed;
    const θ    = (angle * Math.PI) / 180;
    const vx   = v0 * Math.cos(θ);
    const vy   = v0 * Math.sin(θ);
    const T    = (2 * vy) / g;
    const R    = vx * T;
    const maxH = (vy * vy) / (2 * g);

    setStats({ range: Math.round(R), maxH: Math.round(maxH), time: Math.round(T * 10) / 10 });

    // Scale: 1m = 4px roughly
    const scale = Math.min((W - 40) / (R + 10), (H - 60) / (maxH + 10)) * 0.8;

    ctx.clearRect(0, 0, W, H);

    // Ground
    ctx.fillStyle = "#e5e7eb";
    ctx.fillRect(0, H - 30, W, 30);
    ctx.fillStyle = "#374151";
    ctx.font = "11px sans-serif";

    // Draw trajectory path
    ctx.beginPath();
    ctx.strokeStyle = "#6366f1";
    ctx.lineWidth   = 2;
    ctx.setLineDash([4, 4]);
    const steps = 100;
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * T;
      const x = vx * t * scale + 30;
      const y = H - 30 - (vy * t - 0.5 * g * t * t) * scale;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // Animate ball
    let startTime: number | null = null;
    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const elapsed = (ts - startTime) / 1000; // seconds
      if (elapsed > T) { setRunning(false); return; }

      ctx.clearRect(0, 0, W, H);

      // Redraw ground & path
      ctx.fillStyle = "#e5e7eb"; ctx.fillRect(0, H - 30, W, 30);
      ctx.beginPath(); ctx.strokeStyle = "#6366f166"; ctx.lineWidth = 1.5; ctx.setLineDash([4, 4]);
      for (let i = 0; i <= steps; i++) {
        const t2 = (i / steps) * T;
        const x2 = vx * t2 * scale + 30, y2 = H - 30 - (vy * t2 - 0.5 * g * t2 * t2) * scale;
        i === 0 ? ctx.moveTo(x2, y2) : ctx.lineTo(x2, y2);
      }
      ctx.stroke(); ctx.setLineDash([]);

      // Ball position
      const bx = vx * elapsed * scale + 30;
      const by = H - 30 - (vy * elapsed - 0.5 * g * elapsed * elapsed) * scale;

      // Velocity vector
      const curVx = vx, curVy = vy - g * elapsed;
      const vMag  = Math.sqrt(curVx * curVx + curVy * curVy) * scale * 0.3;
      ctx.beginPath(); ctx.strokeStyle = "#ef4444"; ctx.lineWidth = 2;
      ctx.moveTo(bx, by);
      ctx.lineTo(bx + curVx * scale * 0.3, by - curVy * scale * 0.3);
      ctx.stroke();

      // Ball
      ctx.beginPath();
      const grad = ctx.createRadialGradient(bx - 3, by - 3, 1, bx, by, 10);
      grad.addColorStop(0, "#818cf8"); grad.addColorStop(1, "#4338ca");
      ctx.fillStyle = grad;
      ctx.arc(bx, by, 10, 0, Math.PI * 2);
      ctx.fill();

      // Stats overlay
      ctx.fillStyle = "#111827"; ctx.font = "bold 12px monospace";
      ctx.fillText(`t = ${elapsed.toFixed(1)}s`, 10, 20);
      ctx.fillText(`h = ${Math.round(vy * elapsed - 0.5 * g * elapsed * elapsed)}m`, 10, 36);
      ctx.fillText(`v = ${Math.round(Math.sqrt(curVx**2 + curVy**2))}m/s`, 10, 52);

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
  }, [angle, speed]);

  const handleStart = () => {
    cancelAnimationFrame(animRef.current);
    setRunning(true);
    drawProjectile();
  };

  const handleReset = () => {
    cancelAnimationFrame(animRef.current);
    setRunning(false);
    const canvas = canvasRef.current;
    if (canvas) canvas.getContext("2d")!.clearRect(0, 0, canvas.width, canvas.height);
    setStats({ range: 0, maxH: 0, time: 0 });
  };

  useEffect(() => { return () => cancelAnimationFrame(animRef.current); }, []);

  return (
    <div className="space-y-4">
      <canvas ref={canvasRef} width={640} height={320}
        className="w-full h-auto rounded-xl border bg-white dark:bg-gray-900/50 aspect-video" />

      <div className="grid grid-cols-3 gap-3 text-center">
        {[
          { label: "Range",    value: `${stats.range} m`  },
          { label: "Max Height", value: `${stats.maxH} m` },
          { label: "Time of Flight", value: `${stats.time} s` },
        ].map((s) => (
          <div key={s.label} className="rounded-lg border bg-muted/30 p-2">
            <div className="font-bold text-sm text-indigo-600 dark:text-indigo-400">{s.value}</div>
            <div className="text-[11px] text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-4 px-1">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1.5 flex justify-between">
            <span>Launch Angle</span>
            <span className="font-bold text-foreground">{angle}°</span>
          </label>
          <RangeInput min={5} max={85} step={1} value={angle} onChange={setAngle} />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1.5 flex justify-between">
            <span>Initial Speed</span>
            <span className="font-bold text-foreground">{speed} m/s</span>
          </label>
          <RangeInput min={10} max={100} step={5} value={speed} onChange={setSpeed} />
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={handleStart} disabled={running} size="sm" className="gap-1.5">
          <Play className="h-3.5 w-3.5" /> Launch
        </Button>
        <Button onClick={handleReset} variant="outline" size="sm" className="gap-1.5">
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </Button>
      </div>
    </div>
  );
}

/* ─── Pendulum Simulation ───────────────────────────────────────────────── */
export function PendulumSim() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef<number>(0);
  const [length, setLength]   = useState(2.0);   // metres
  const [running, setRunning] = useState(false);

  const g  = 9.8;
  const T  = Math.round((2 * Math.PI * Math.sqrt(length / g)) * 100) / 100;
  const freq = Math.round((1 / T) * 100) / 100;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx    = canvas.getContext("2d")!;
    const W = canvas.width, H = canvas.height;
    const scale  = Math.min(W, H) * 0.35; // pixels per metre
    const cx     = W / 2, cy = 60;
    const amp    = 0.4; // radians (≈23°)
    let startTime: number | null = null;

    const draw = (ts: number) => {
      if (!startTime) startTime = ts;
      const elapsed = (ts - startTime) / 1000;
      const θ = amp * Math.cos((2 * Math.PI / T) * elapsed);

      ctx.clearRect(0, 0, W, H);

      // Pivot
      ctx.fillStyle = "#374151"; ctx.beginPath(); ctx.arc(cx, cy, 6, 0, Math.PI * 2); ctx.fill();

      // Rod
      const bx = cx + length * scale * Math.sin(θ);
      const by = cy + length * scale * Math.cos(θ);
      ctx.beginPath(); ctx.strokeStyle = "#374151"; ctx.lineWidth = 3;
      ctx.moveTo(cx, cy); ctx.lineTo(bx, by); ctx.stroke();

      // Bob
      const grad = ctx.createRadialGradient(bx - 4, by - 4, 2, bx, by, 18);
      grad.addColorStop(0, "#818cf8"); grad.addColorStop(1, "#4338ca");
      ctx.fillStyle = grad;
      ctx.beginPath(); ctx.arc(bx, by, 18, 0, Math.PI * 2); ctx.fill();

      // Stats
      const v = amp * (2 * Math.PI / T) * Math.sin((2 * Math.PI / T) * elapsed);
      ctx.fillStyle = "#111827"; ctx.font = "bold 12px monospace";
      ctx.fillText(`θ = ${(θ * 180 / Math.PI).toFixed(1)}°`, 10, 20);
      ctx.fillText(`v = ${Math.abs(v * length * scale / scale).toFixed(2)} m/s`, 10, 36);
      ctx.fillText(`T = ${T} s`, 10, 52);

      if (running) animRef.current = requestAnimationFrame(draw);
    };

    if (running) {
      animRef.current = requestAnimationFrame(draw);
    } else {
      // Static render
      const θ0 = amp;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#374151"; ctx.beginPath(); ctx.arc(cx, cy, 6, 0, Math.PI * 2); ctx.fill();
      const bx0 = cx + length * scale * Math.sin(θ0);
      const by0 = cy + length * scale * Math.cos(θ0);
      ctx.beginPath(); ctx.strokeStyle = "#374151"; ctx.lineWidth = 3;
      ctx.moveTo(cx, cy); ctx.lineTo(bx0, by0); ctx.stroke();
      ctx.fillStyle = "#6366f1"; ctx.beginPath(); ctx.arc(bx0, by0, 18, 0, Math.PI * 2); ctx.fill();
    }

    return () => cancelAnimationFrame(animRef.current);
  }, [running, length, T]);

  return (
    <div className="space-y-4">
      <canvas ref={canvasRef} width={500} height={380}
        className="w-full h-auto rounded-xl border bg-white dark:bg-gray-900/50" />

      <div className="grid grid-cols-3 gap-3 text-center">
        {[
          { label: "Length",    value: `${length} m` },
          { label: "Period T",  value: `${T} s`      },
          { label: "Frequency", value: `${freq} Hz`  },
        ].map((s) => (
          <div key={s.label} className="rounded-lg border bg-muted/30 p-2">
            <div className="font-bold text-sm text-indigo-600 dark:text-indigo-400">{s.value}</div>
            <div className="text-[11px] text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      <div>
        <label className="text-xs font-medium text-muted-foreground mb-1.5 flex justify-between">
          <span>Pendulum Length</span>
          <span className="font-bold text-foreground">{length} m</span>
        </label>
        <RangeInput min={0.5} max={5} step={0.5} value={length} onChange={setLength} />
      </div>

      <div className="flex gap-2">
        <Button onClick={() => setRunning(!running)} size="sm" className="gap-1.5">
          {running ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          {running ? "Pause" : "Start"}
        </Button>
        <Button onClick={() => setRunning(false)} variant="outline" size="sm" className="gap-1.5">
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </Button>
      </div>

      <p className="text-xs text-muted-foreground bg-muted/30 rounded-lg p-2">
        📐 <strong>Observe:</strong> Doubling the length increases T by √2 ≈ 1.41×. Period is independent of mass and amplitude (for small angles).
      </p>
    </div>
  );
}

/* ─── Wave Superposition Simulation ────────────────────────────────────── */
export function WaveSuperpositionSim() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef<number>(0);
  const [f1, setF1] = useState(1.0);
  const [f2, setF2] = useState(1.5);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const W = canvas.width, H = canvas.height;
    const mid = H / 2;
    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Background lanes
      ctx.fillStyle = "rgba(99,102,241,0.04)"; ctx.fillRect(0, 0, W, H / 3);
      ctx.fillStyle = "rgba(236,72,153,0.04)"; ctx.fillRect(0, H / 3, W, H / 3);
      ctx.fillStyle = "rgba(16,185,129,0.05)"; ctx.fillRect(0, 2 * H / 3, W, H / 3);

      // Lane labels
      ctx.font = "11px sans-serif"; ctx.fillStyle = "#6366f1";
      ctx.fillText(`Wave 1  f=${f1.toFixed(1)}Hz`, 8, 14);
      ctx.fillStyle = "#ec4899";
      ctx.fillText(`Wave 2  f=${f2.toFixed(1)}Hz`, 8, H / 3 + 14);
      ctx.fillStyle = "#10b981";
      ctx.fillText("Resultant (superposition)", 8, 2 * H / 3 + 14);

      const drawWave = (yMid: number, freq: number, color: string, isSum: boolean) => {
        ctx.beginPath(); ctx.strokeStyle = color; ctx.lineWidth = 2;
        for (let x = 0; x <= W; x++) {
          let y: number;
          if (isSum) {
            y = yMid - 25 * (Math.sin(2 * Math.PI * f1 * (x / W) + t) + Math.sin(2 * Math.PI * f2 * (x / W) + t));
          } else {
            y = yMid - 30 * Math.sin(2 * Math.PI * freq * (x / W) + t);
          }
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
        // Center line
        ctx.beginPath(); ctx.strokeStyle = color + "33"; ctx.lineWidth = 0.5; ctx.setLineDash([4, 4]);
        ctx.moveTo(0, yMid); ctx.lineTo(W, yMid); ctx.stroke(); ctx.setLineDash([]);
      };

      drawWave(H * 0.17, f1, "#6366f1", false);
      drawWave(H * 0.50, f2, "#ec4899", false);
      drawWave(H * 0.83, 0,  "#10b981", true);

      t += 0.04;
      if (running) animRef.current = requestAnimationFrame(draw);
    };

    if (running) {
      animRef.current = requestAnimationFrame(draw);
    } else {
      draw(); // Single static frame
    }
    return () => cancelAnimationFrame(animRef.current);
  }, [running, f1, f2]);

  const beats = Math.abs(f1 - f2);

  return (
    <div className="space-y-4">
      <canvas ref={canvasRef} width={640} height={300}
        className="w-full h-auto rounded-xl border bg-white dark:bg-gray-900/50" />

      <div className="grid grid-cols-3 gap-3 text-center">
        {[
          { label: "Wave 1 Freq",  value: `${f1.toFixed(1)} Hz`, color: "text-indigo-600 dark:text-indigo-400" },
          { label: "Wave 2 Freq",  value: `${f2.toFixed(1)} Hz`, color: "text-pink-600 dark:text-pink-400" },
          { label: "Beats/sec",    value: `${beats.toFixed(1)}`,  color: "text-emerald-600 dark:text-emerald-400" },
        ].map((s) => (
          <div key={s.label} className="rounded-lg border bg-muted/30 p-2">
            <div className={cn("font-bold text-sm", s.color)}>{s.value}</div>
            <div className="text-[11px] text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-4 px-1">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1.5 flex justify-between">
            <span>Wave 1 Frequency</span><span className="font-bold">{f1.toFixed(1)} Hz</span>
          </label>
          <RangeInput min={0.5} max={5} step={0.5} value={f1} onChange={setF1} />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1.5 flex justify-between">
            <span>Wave 2 Frequency</span><span className="font-bold">{f2.toFixed(1)} Hz</span>
          </label>
          <RangeInput min={0.5} max={5} step={0.5} value={f2} onChange={setF2} />
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={() => setRunning(!running)} size="sm" className="gap-1.5">
          {running ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          {running ? "Pause" : "Animate"}
        </Button>
      </div>

      <p className="text-xs text-muted-foreground bg-muted/30 rounded-lg p-2">
        🎵 <strong>Beats:</strong> When f₁ ≈ f₂, beats form at frequency |f₁–f₂|. Set both equal for standing waves!
      </p>
    </div>
  );
}
