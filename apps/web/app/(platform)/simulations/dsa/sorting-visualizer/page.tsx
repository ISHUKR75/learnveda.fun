/**
 * @file app/(platform)/simulations/dsa/sorting-visualizer/page.tsx
 * @description Sorting Algorithm Visualizer — DSA Simulation
 * Route: /simulations/dsa/sorting-visualizer
 *
 * Animates the following sorting algorithms step by step:
 *   - Bubble Sort    — O(n²)
 *   - Selection Sort — O(n²)
 *   - Insertion Sort — O(n²)
 *   - Merge Sort     — O(n log n)
 *   - Quick Sort     — O(n log n) average
 *
 * Color coding:
 *   - Blue  = unsorted element
 *   - Red   = element being compared
 *   - Green = sorted element
 *   - Yellow = pivot (Quick Sort)
 */

"use client"; // Client component — uses animation, state, DOM

/* ─── Imports ─────────────────────────────────────────────────────────────── */
import { useState, useRef, useCallback, useEffect } from "react"; // React hooks
import Link from "next/link";  // Navigation
import {
  ChevronRight, Play, Pause, RotateCcw,
  Shuffle, BarChart2, Clock, Zap,
} from "lucide-react"; // Icons
import { Badge }  from "@/components/ui/badge";  // Badge component
import { Button } from "@/components/ui/button"; // Button component

/* ─── Types ──────────────────────────────────────────────────────────────── */
/** State of a single bar in the visualizer */
interface Bar {
  value:  number;   // Height value (1–100)
  state:  "idle" | "comparing" | "sorted" | "pivot" | "swapping"; // Visual state
}

/** Available sorting algorithms */
type Algorithm = "bubble" | "selection" | "insertion" | "merge" | "quick";

/* ─── Algorithm Metadata ─────────────────────────────────────────────────── */
const ALGORITHMS: Record<Algorithm, {
  name:       string;  // Display name
  timeWorst:  string;  // Worst-case time complexity
  timeBest:   string;  // Best-case time complexity
  timeAvg:    string;  // Average time complexity
  space:      string;  // Space complexity
  stable:     boolean; // Is it a stable sort?
  description: string; // Short description
}> = {
  bubble: {
    name:        "Bubble Sort",
    timeWorst:   "O(n²)",
    timeBest:    "O(n)",
    timeAvg:     "O(n²)",
    space:       "O(1)",
    stable:      true,
    description: "Repeatedly swap adjacent elements if they are in wrong order. Simple but slow for large arrays.",
  },
  selection: {
    name:        "Selection Sort",
    timeWorst:   "O(n²)",
    timeBest:    "O(n²)",
    timeAvg:     "O(n²)",
    space:       "O(1)",
    stable:      false,
    description: "Find the minimum element from unsorted subarray and swap it with first unsorted element.",
  },
  insertion: {
    name:        "Insertion Sort",
    timeWorst:   "O(n²)",
    timeBest:    "O(n)",
    timeAvg:     "O(n²)",
    space:       "O(1)",
    stable:      true,
    description: "Build sorted array one element at a time by inserting each element in its correct position.",
  },
  merge: {
    name:        "Merge Sort",
    timeWorst:   "O(n log n)",
    timeBest:    "O(n log n)",
    timeAvg:     "O(n log n)",
    space:       "O(n)",
    stable:      true,
    description: "Divide array into halves, sort each half, then merge them. Best for large datasets.",
  },
  quick: {
    name:        "Quick Sort",
    timeWorst:   "O(n²)",
    timeBest:    "O(n log n)",
    timeAvg:     "O(n log n)",
    space:       "O(log n)",
    stable:      false,
    description: "Pick a pivot, partition array around it, recursively sort sub-arrays. Very fast in practice.",
  },
};

/* ─── Utility: Generate random array ─────────────────────────────────────── */
/** Creates an array of n bars with random heights 10–100 */
function generateArray(n: number): Bar[] {
  return Array.from({ length: n }, () => ({
    value: Math.floor(Math.random() * 90) + 10, // Heights 10–100
    state: "idle" as const,
  }));
}

/* ─── Utility: Sleep helper for animation delays ─────────────────────────── */
/** Returns a promise that resolves after `ms` milliseconds */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/* ─── Main Component ──────────────────────────────────────────────────────── */
export default function SortingVisualizerPage() {
  /* ── State ───────────────────────────────────────────────────────────── */
  const [bars,       setBars]       = useState<Bar[]>(() => generateArray(30)); // Array of bars
  const [algorithm,  setAlgorithm]  = useState<Algorithm>("bubble");             // Selected algorithm
  const [speed,      setSpeed]      = useState(50);                              // Animation speed (ms)
  const [isRunning,  setIsRunning]  = useState(false);                           // Is animation running?
  const [isDone,     setIsDone]     = useState(false);                           // Is sort complete?
  const [comparisons, setComparisons] = useState(0);                             // Comparison counter
  const [swaps,       setSwaps]     = useState(0);                               // Swap counter
  const [arraySize,  setArraySize]  = useState(30);                              // Number of bars

  const stopRef = useRef(false); // Signal to stop animation mid-run

  /* ── Bar color mapping ───────────────────────────────────────────────── */
  /** Returns Tailwind class for bar color based on state */
  const barColor = (state: Bar["state"]): string => {
    switch (state) {
      case "comparing": return "bg-red-500";   // Being compared
      case "sorted":    return "bg-green-500"; // Sorted position
      case "pivot":     return "bg-yellow-400"; // Quick sort pivot
      case "swapping":  return "bg-orange-500"; // Being swapped
      default:          return "bg-blue-500";  // Idle
    }
  };

  /* ── Shuffle handler ─────────────────────────────────────────────────── */
  const handleShuffle = () => {
    stopRef.current = true; // Stop any running animation
    setIsRunning(false);
    setIsDone(false);
    setComparisons(0);
    setSwaps(0);
    setTimeout(() => {
      setBars(generateArray(arraySize)); // Generate new random array
      stopRef.current = false;
    }, 100);
  };

  /* ── Array size change handler ───────────────────────────────────────── */
  const handleSizeChange = (size: number) => {
    stopRef.current = true;
    setIsRunning(false);
    setIsDone(false);
    setComparisons(0);
    setSwaps(0);
    setArraySize(size);
    setTimeout(() => {
      setBars(generateArray(size));
      stopRef.current = false;
    }, 100);
  };

  /* ── Bubble Sort ─────────────────────────────────────────────────────── */
  const bubbleSort = useCallback(async (arr: Bar[]) => {
    const a = [...arr]; // Copy array
    let comps = 0, swapCount = 0; // Counters

    for (let i = 0; i < a.length - 1; i++) {
      for (let j = 0; j < a.length - i - 1; j++) {
        if (stopRef.current) return; // Stop signal

        /* Mark bars being compared */
        a[j].state = "comparing";
        a[j + 1].state = "comparing";
        setBars([...a]);
        comps++;
        setComparisons(comps);

        await sleep(speed); // Pause for animation

        if (a[j].value > a[j + 1].value) {
          /* Swap values */
          [a[j].value, a[j + 1].value] = [a[j + 1].value, a[j].value];
          a[j].state = "swapping";
          a[j + 1].state = "swapping";
          setBars([...a]);
          swapCount++;
          setSwaps(swapCount);
          await sleep(speed);
        }

        /* Reset comparison state */
        a[j].state = "idle";
        a[j + 1].state = "idle";
      }
      a[a.length - i - 1].state = "sorted"; // Mark as sorted
    }
    a[0].state = "sorted"; // Last element is also sorted
    setBars([...a]);
    setIsDone(true);
  }, [speed]);

  /* ── Selection Sort ──────────────────────────────────────────────────── */
  const selectionSort = useCallback(async (arr: Bar[]) => {
    const a = [...arr];
    let comps = 0, swapCount = 0;

    for (let i = 0; i < a.length - 1; i++) {
      let minIdx = i; // Assume current is minimum

      for (let j = i + 1; j < a.length; j++) {
        if (stopRef.current) return;

        a[j].state = "comparing";
        a[minIdx].state = "pivot"; // Highlight current min
        setBars([...a]);
        comps++;
        setComparisons(comps);
        await sleep(speed);

        if (a[j].value < a[minIdx].value) {
          if (minIdx !== i) a[minIdx].state = "idle"; // Reset old min
          minIdx = j; // Update minimum index
        } else {
          a[j].state = "idle";
        }
      }

      /* Swap minimum with current position */
      if (minIdx !== i) {
        [a[i].value, a[minIdx].value] = [a[minIdx].value, a[i].value];
        swapCount++;
        setSwaps(swapCount);
      }

      a[i].state = "sorted";
      a[minIdx].state = "idle";
      setBars([...a]);
    }
    a[a.length - 1].state = "sorted";
    setBars([...a]);
    setIsDone(true);
  }, [speed]);

  /* ── Insertion Sort ──────────────────────────────────────────────────── */
  const insertionSort = useCallback(async (arr: Bar[]) => {
    const a = [...arr];
    let comps = 0, swapCount = 0;

    a[0].state = "sorted"; // First element is trivially sorted
    setBars([...a]);

    for (let i = 1; i < a.length; i++) {
      const key = a[i].value; // Element to insert
      a[i].state = "comparing";
      setBars([...a]);
      await sleep(speed);

      let j = i - 1;
      while (j >= 0 && a[j].value > key) {
        if (stopRef.current) return;
        comps++;
        setComparisons(comps);
        a[j + 1].value = a[j].value; // Shift element right
        a[j + 1].state = "swapping";
        setBars([...a]);
        swapCount++;
        setSwaps(swapCount);
        await sleep(speed);
        a[j + 1].state = "sorted";
        j--;
      }
      a[j + 1].value = key; // Insert in correct position
      a[j + 1].state = "sorted";
      setBars([...a]);
    }
    setBars(a.map((b) => ({ ...b, state: "sorted" })));
    setIsDone(true);
  }, [speed]);

  /* ── Quick Sort (simplified iterative) ──────────────────────────────── */
  const quickSort = useCallback(async (arr: Bar[]) => {
    const a = [...arr];
    let comps = 0, swapCount = 0;

    async function partition(low: number, high: number): Promise<number> {
      const pivot = a[high].value; // Last element as pivot
      a[high].state = "pivot";
      let i = low - 1;

      for (let j = low; j < high; j++) {
        if (stopRef.current) return -1;
        a[j].state = "comparing";
        setBars([...a]);
        comps++;
        setComparisons(comps);
        await sleep(speed);

        if (a[j].value <= pivot) {
          i++;
          [a[i].value, a[j].value] = [a[j].value, a[i].value]; // Swap
          a[j].state = "idle";
          swapCount++;
          setSwaps(swapCount);
        } else {
          a[j].state = "idle";
        }
        setBars([...a]);
      }
      [a[i + 1].value, a[high].value] = [a[high].value, a[i + 1].value];
      a[high].state = "idle";
      a[i + 1].state = "sorted";
      setBars([...a]);
      return i + 1;
    }

    async function sort(low: number, high: number) {
      if (low < high && !stopRef.current) {
        const pi = await partition(low, high);
        if (pi === -1) return;
        await sort(low, pi - 1);
        await sort(pi + 1, high);
      }
    }

    await sort(0, a.length - 1);
    setBars(a.map((b) => ({ ...b, state: "sorted" })));
    setIsDone(true);
  }, [speed]);

  /* ── Run selected algorithm ──────────────────────────────────────────── */
  const handleStart = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setIsDone(false);
    setComparisons(0);
    setSwaps(0);
    stopRef.current = false;

    const current = [...bars].map((b) => ({ ...b, state: "idle" as const }));

    try {
      switch (algorithm) {
        case "bubble":    await bubbleSort(current);    break;
        case "selection": await selectionSort(current); break;
        case "insertion": await insertionSort(current); break;
        case "quick":     await quickSort(current);     break;
        default:          await bubbleSort(current);
      }
    } finally {
      setIsRunning(false);
    }
  };

  /* ── Render ──────────────────────────────────────────────────────────── */
  const algo = ALGORITHMS[algorithm]; // Current algorithm metadata

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/40 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4" aria-label="Breadcrumb">
            <Link href="/simulations" className="hover:text-foreground transition-colors">Simulations</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/simulations/dsa" className="hover:text-foreground transition-colors">DSA</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">Sorting Visualizer</span>
          </nav>
          <h1 className="text-2xl font-bold">Sorting Algorithm Visualizer</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            DSA · Compare sorting algorithms with live animation and complexity analysis
          </p>
          <div className="flex gap-2 mt-2">
            <Badge variant="secondary">Engineering / DSA</Badge>
            <Badge variant="outline" className="border-green-500/50 text-green-600">Free</Badge>
          </div>
        </div>
      </div>

      {/* Main area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Algorithm selector */}
        <div className="flex flex-wrap gap-2">
          {(Object.keys(ALGORITHMS) as Algorithm[]).map((alg) => (
            <button
              key={alg}
              onClick={() => { if (!isRunning) { setAlgorithm(alg); handleShuffle(); }}}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                algorithm === alg
                  ? "bg-brand-500 text-white border-brand-500"
                  : "border-border/60 hover:border-brand-500/50 text-muted-foreground hover:text-foreground"
              }`}
            >
              {ALGORITHMS[alg].name}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-4 p-4 rounded-xl border border-border/40 bg-card">
          <div className="flex items-center gap-2 text-sm">
            <label htmlFor="speed-slider">Speed:</label>
            <input
              id="speed-slider"
              type="range" min="10" max="200" step="10"
              value={200 - speed + 10} // Invert so right = faster
              onChange={(e) => setSpeed(200 - Number(e.target.value) + 10)}
              disabled={isRunning}
              className="w-24 accent-brand-500"
            />
            <span className="text-muted-foreground text-xs">{speed <= 30 ? "Fast" : speed <= 80 ? "Medium" : "Slow"}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <label htmlFor="size-slider">Array size:</label>
            <input
              id="size-slider"
              type="range" min="10" max="80" step="5"
              value={arraySize}
              onChange={(e) => handleSizeChange(Number(e.target.value))}
              disabled={isRunning}
              className="w-24 accent-brand-500"
            />
            <span className="text-muted-foreground text-xs">{arraySize}</span>
          </div>

          <div className="ml-auto flex gap-2">
            <Button size="sm" variant="outline" onClick={handleShuffle} disabled={isRunning} className="gap-1.5">
              <Shuffle className="h-3.5 w-3.5" /> Shuffle
            </Button>
            <Button size="sm" onClick={handleStart} disabled={isRunning || isDone} className="gap-1.5">
              {isRunning ? <><Pause className="h-3.5 w-3.5" /> Running…</> : <><Play className="h-3.5 w-3.5" /> Sort</>}
            </Button>
            {isDone && (
              <Button size="sm" variant="outline" onClick={handleShuffle} className="gap-1.5 text-green-600 border-green-500/50">
                <RotateCcw className="h-3.5 w-3.5" /> Done! Reshuffle
              </Button>
            )}
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Comparisons", value: comparisons, icon: BarChart2, color: "text-blue-500" },
            { label: "Swaps",       value: swaps,       icon: Zap,       color: "text-orange-500" },
            { label: "Array Size",  value: arraySize,   icon: Clock,     color: "text-purple-500" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-lg border border-border/40 bg-card p-4 text-center">
              <stat.icon className={`h-5 w-5 ${stat.color} mx-auto mb-1`} />
              <p className="text-2xl font-bold">{stat.value.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Bar visualization */}
        <div className="rounded-xl border border-border/40 bg-card p-4 overflow-hidden">
          <div className="flex items-end gap-[2px] h-48 px-2" role="img" aria-label="Sorting visualization bars">
            {bars.map((bar, i) => (
              <div
                key={i}
                className={`flex-1 rounded-t transition-all duration-75 ${barColor(bar.state)}`}
                style={{ height: `${bar.value}%` }}
                title={`Value: ${bar.value}`}
              />
            ))}
          </div>
          {/* Color legend */}
          <div className="flex flex-wrap gap-4 mt-4 text-xs text-muted-foreground">
            {[
              { color: "bg-blue-500",   label: "Unsorted" },
              { color: "bg-red-500",    label: "Comparing" },
              { color: "bg-orange-500", label: "Swapping" },
              { color: "bg-yellow-400", label: "Pivot" },
              { color: "bg-green-500",  label: "Sorted" },
            ].map((item) => (
              <span key={item.label} className="flex items-center gap-1.5">
                <span className={`w-3 h-3 rounded-sm ${item.color}`} />
                {item.label}
              </span>
            ))}
          </div>
        </div>

        {/* Algorithm info */}
        <div className="rounded-xl border border-border/40 bg-card p-6">
          <h2 className="font-semibold text-lg mb-3">{algo.name}</h2>
          <p className="text-muted-foreground text-sm mb-4">{algo.description}</p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
            {[
              { label: "Best Case",  value: algo.timeBest },
              { label: "Average",    value: algo.timeAvg },
              { label: "Worst Case", value: algo.timeWorst },
              { label: "Space",      value: algo.space },
              { label: "Stable",     value: algo.stable ? "Yes ✓" : "No ✗" },
            ].map((item) => (
              <div key={item.label} className="rounded-lg bg-muted/50 p-3">
                <p className="font-mono font-bold text-sm">{item.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
