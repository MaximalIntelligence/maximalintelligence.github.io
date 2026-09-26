"use client";

import React, { useEffect, useState } from "react";
import { Delaunay } from "d3-delaunay";

/**
 * Install: npm install d3-delaunay
 *
 * <div style={{ width: "100%", height: 400 }}>
 *   <DelaunayNetwork duration={12000} loop />
 * </div>
 *
 * The parent must have a definite height (or an aspect ratio).
 * All times are milliseconds. With `loop` off, change React's `key` to replay.
 * With `loop` on, the network builds, holds, fades out, and restarts forever.
 * `timeMs` optionally controls an exact animation frame for scrubbing/capture;
 * with `loop` on, any `timeMs` value is wrapped into the cycle.
 * SVG viewBox scaling preserves a circle in any rectangular container.
 * No CSS file, ResizeObserver, runtime randomness, or background fill.
 *
 * Point generation (Python 3, run once; order is intentionally unsorted):
 *   rng = random.Random(271828)
 *   for _ in range(100):
 *       angle = rng.random() * math.tau
 *       radius = 46 * math.sqrt(rng.random())
 *       point = (50 + radius * math.cos(angle),
 *                50 + radius * math.sin(angle))
 * sqrt makes sampling uniform by area. Coordinates below are precomputed.
 */
export const NETWORK_POINTS = Object.freeze([
  Object.freeze([31.866429, 8.389016]),
  Object.freeze([74.127486, 34.479846]),
  Object.freeze([81.531057, 29.307417]),
  Object.freeze([52.193187, 46.981899]),
  Object.freeze([71.245941, 51.756218]),
  Object.freeze([40.516803, 86.168250]),
  Object.freeze([13.910210, 32.674548]),
  Object.freeze([28.376163, 32.381381]),
  Object.freeze([77.350475, 67.289760]),
  Object.freeze([21.978850, 38.067601]),
  Object.freeze([26.394700, 87.557457]),
  Object.freeze([60.919894, 84.541073]),
  Object.freeze([17.161497, 78.778338]),
  Object.freeze([26.561026, 40.897576]),
  Object.freeze([30.061035, 38.926448]),
  Object.freeze([10.812055, 28.934772]),
  Object.freeze([41.852390, 43.317729]),
  Object.freeze([89.051973, 30.411098]),
  Object.freeze([29.155084, 82.878168]),
  Object.freeze([18.025815, 79.615355]),
  Object.freeze([26.106015, 37.781269]),
  Object.freeze([89.945015, 28.640173]),
  Object.freeze([47.240110, 23.607107]),
  Object.freeze([57.440278, 12.544936]),
  Object.freeze([39.623934, 84.131039]),
  Object.freeze([60.879163, 45.291395]),
  Object.freeze([38.467521, 44.207043]),
  Object.freeze([40.104600, 74.558824]),
  Object.freeze([31.743130, 48.098727]),
  Object.freeze([69.074296, 64.729215]),
  Object.freeze([24.289488, 83.805972]),
  Object.freeze([12.347309, 52.908239]),
  Object.freeze([77.381227, 29.789579]),
  Object.freeze([70.086796, 82.232287]),
  Object.freeze([83.524421, 44.366494]),
  Object.freeze([45.508170, 37.515947]),
  Object.freeze([65.804225, 20.299859]),
  Object.freeze([57.474818, 65.638511]),
  Object.freeze([27.502346, 51.371264]),
  Object.freeze([17.580310, 31.417868]),
  Object.freeze([44.009164, 57.737734]),
  Object.freeze([67.583466, 90.575829]),
  Object.freeze([84.968467, 56.332028]),
  Object.freeze([85.028999, 49.953135]),
  Object.freeze([61.952622, 83.707673]),
  Object.freeze([47.328054, 81.561080]),
  Object.freeze([42.565523, 62.292782]),
  Object.freeze([93.378201, 52.606069]),
  Object.freeze([62.850001, 34.950402]),
  Object.freeze([37.874777, 31.408118]),
  Object.freeze([11.809388, 25.610636]),
  Object.freeze([18.171376, 42.009244]),
  Object.freeze([20.090261, 69.011742]),
  Object.freeze([25.790634, 13.653540]),
  Object.freeze([21.331757, 78.278998]),
  Object.freeze([36.800266, 20.999152]),
  Object.freeze([67.000358, 51.127356]),
  Object.freeze([77.622541, 20.141825]),
  Object.freeze([58.500955, 10.358955]),
  Object.freeze([54.636660, 5.571939]),
  Object.freeze([40.364117, 61.755676]),
  Object.freeze([80.024795, 57.577883]),
  Object.freeze([40.616810, 18.684955]),
  Object.freeze([38.741152, 64.002782]),
  Object.freeze([44.482387, 23.211314]),
  Object.freeze([11.595026, 26.031076]),
  Object.freeze([72.094686, 32.458035]),
  Object.freeze([52.349765, 22.921578]),
  Object.freeze([55.778561, 27.119245]),
  Object.freeze([18.784234, 17.892617]),
  Object.freeze([71.467454, 45.909072]),
  Object.freeze([23.381007, 75.167284]),
  Object.freeze([59.961355, 65.101293]),
  Object.freeze([33.137212, 12.127414]),
  Object.freeze([37.966266, 41.990632]),
  Object.freeze([64.405150, 29.939293]),
  Object.freeze([6.137253, 57.459072]),
  Object.freeze([68.544223, 57.097344]),
  Object.freeze([42.336291, 21.908483]),
  Object.freeze([39.615591, 71.048062]),
  Object.freeze([77.881206, 58.479097]),
  Object.freeze([79.783357, 22.995946]),
  Object.freeze([32.451933, 33.350851]),
  Object.freeze([81.508192, 64.223269]),
  Object.freeze([47.598800, 66.660458]),
  Object.freeze([16.593039, 76.280706]),
  Object.freeze([39.224320, 58.083481]),
  Object.freeze([4.237483, 54.482580]),
  Object.freeze([41.067800, 16.238964]),
  Object.freeze([80.802502, 60.552991]),
  Object.freeze([34.359598, 31.494847]),
  Object.freeze([59.993721, 7.653784]),
  Object.freeze([76.458747, 47.049883]),
  Object.freeze([54.492839, 22.309619]),
  Object.freeze([86.079749, 28.202724]),
  Object.freeze([67.720649, 12.428578]),
  Object.freeze([51.588813, 24.376786]),
  Object.freeze([47.314055, 57.325155]),
  Object.freeze([95.482967, 49.308868]),
  Object.freeze([75.616149, 59.019270]),
]);

// Compute every topology once, shared by all component instances.
// Each edge appears once, including edges along the convex hull.
const TOPOLOGIES = Array.from({ length: NETWORK_POINTS.length + 1 }, (_, count) => {
  const edges = new Map();
  if (count < 2) return edges;
  const delaunay = Delaunay.from(NETWORK_POINTS.slice(0, count));
  for (let a = 0; a < count; a++) {
    for (const b of delaunay.neighbors(a)) {
      if (b <= a) continue;
      const [x1, y1] = NETWORK_POINTS[a];
      const [x2, y2] = NETWORK_POINTS[b];
      edges.set(`${a}-${b}`, `M${x1},${y1}L${x2},${y2}`);
    }
  }
  return edges;
});

const STAGES = TOPOLOGIES.map((current, count) => {
  const previous = TOPOLOGIES[Math.max(0, count - 1)];
  const stable = [], entering = [], leaving = [];
  for (const [key, path] of current) {
    (previous.has(key) ? stable : entering).push(path);
  }
  for (const [key, path] of previous) {
    if (!current.has(key)) leaving.push(path);
  }
  return { stable: stable.join(""), entering: entering.join(""), leaving: leaving.join("") };
});

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const ease = (t) => t * t * (3 - 2 * t);
const nonNegative = (value, fallback) =>
  Math.max(0, Number.isFinite(value) ? value : fallback);

/**
 * Props:
 * duration: build animation length in ms, default 12000.
 * fadeDuration: fade per insertion in ms, capped at the insertion interval.
 * loop: repeat forever (build → hold → fade out → restart), default false.
 * holdDuration: ms the finished network stays visible before fading (loop only).
 * fadeOutDuration: ms to fade the finished network out (loop only);
 *   0 gives a hard cut back to the first point.
 * timeMs: optional controlled playhead; when set, no animation timer runs.
 * respectReducedMotion: show the complete network when reduced motion is on.
 * pointRadius / lineWidth: SVG units in a 100 × 100 viewBox; scale with container.
 * className / style: applied to the root SVG.
 * ariaLabel: accessible description (the animation is not announced per frame).
 */
export default function DelaunayNetwork({
  duration = 14000,
  fadeDuration = 100,
  timeMs,
  pointColor = "#637D93",
  lineColor = "#B6CBDD",
  pointRadius = 0.52,
  lineWidth = 0.18,
  respectReducedMotion = true,
  loop = true,
  holdDuration = 1500,
  fadeOutDuration = 800,
  className,
  style,
  ariaLabel = "A circular network forming from 100 points",
}) {
  const total = Number.isFinite(duration) ? Math.max(1, duration) : 12000;
  const hold = loop ? nonNegative(holdDuration, 1500) : 0;
  const fadeOut = loop ? nonNegative(fadeOutDuration, 800) : 0;
  const cycle = total + hold + fadeOut;
  const controlled = typeof timeMs === "number" && Number.isFinite(timeMs);
  const [elapsed, setElapsed] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (!respectReducedMotion || typeof window.matchMedia !== "function") {
      setReducedMotion(false);
      return;
    }
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [respectReducedMotion]);

  useEffect(() => {
    if (controlled || reducedMotion) return;
    let frame;
    let startedAt;
    setElapsed(0);
    const tick = (now) => {
      if (startedAt === undefined) startedAt = now;
      const raw = now - startedAt;
      if (loop) {
        // Absolute time modulo the cycle: no drift, and a backgrounded tab
        // resumes at the correct point in the cycle.
        setElapsed(raw % cycle);
        frame = requestAnimationFrame(tick);
      } else {
        const next = Math.min(raw, total);
        setElapsed(next);
        if (next < total) frame = requestAnimationFrame(tick);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [total, cycle, loop, controlled, reducedMotion]);

  // Controlled time takes priority over reduced motion so frame capture and
  // scrubbing are reproducible. In loop mode, controlled time wraps too.
  const playhead = controlled
    ? loop
      ? ((timeMs % cycle) + cycle) % cycle
      : timeMs
    : reducedMotion
      ? total
      : elapsed;
  const time = clamp(playhead, 0, total);
  const fadeOutAge = playhead - total - hold;
  const networkOpacity =
    fadeOut > 0 && fadeOutAge > 0 ? 1 - ease(clamp(fadeOutAge / fadeOut, 0, 1)) : 1;

  const interval = total / NETWORK_POINTS.length;
  const fade = clamp(Number.isFinite(fadeDuration) ? fadeDuration : 100, 0, interval);
  const count = Math.min(NETWORK_POINTS.length, Math.floor(time / interval) + 1);
  const age = time - (count - 1) * interval;
  const progress = time === total || fade === 0 ? 1 : ease(clamp(age / fade, 0, 1));
  const stage = STAGES[count];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      width="100%"
      height="100%"
      className={className}
      style={{ display: "block", width: "100%", height: "100%", ...style }}
      role="img"
      aria-label={ariaLabel}
      focusable="false"
    >
      <g opacity={networkOpacity}>
        <g fill="none" stroke={lineColor} strokeWidth={lineWidth} strokeLinecap="round">
          <path d={stage.stable} />
          <path d={stage.entering} opacity={progress} />
          <path d={stage.leaving} opacity={1 - progress} />
        </g>
        <g fill={pointColor}>
          {NETWORK_POINTS.slice(0, count).map(([x, y], index) => (
            <circle
              key={index}
              cx={x}
              cy={y}
              r={pointRadius}
              opacity={index === count - 1 ? progress : 1}
            />
          ))}
        </g>
      </g>
    </svg>
  );
}
