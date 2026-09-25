"use client";

import React, { useEffect, useMemo, useRef } from "react";

export const CRYSTALS = {
  sc: [[0, 0, 0]],
  bcc: [[0, 0, 0], [0.5, 0.5, 0.5]],
  fcc: [[0, 0, 0], [0, 0.5, 0.5], [0.5, 0, 0.5], [0.5, 0.5, 0]],
};

const TAU = 2 * Math.PI;
const IDENTITY = [0, 0, 0, 1];
const clamp = (x, low, high) => Math.max(low, Math.min(high, x));
const quatDot = (a, b) => a.reduce((sum, x, i) => sum + x * b[i], 0);

function buildLattice(nx, ny, nz, motif, closeBoundary) {
  const dimensions = [nx, ny, nz];
  if (!dimensions.every(n => Number.isInteger(n) && n > 0)) {
    throw new Error("CrystalLattice: nx, ny and nz must be positive integers.");
  }
  if (!Array.isArray(motif) || !motif.length || !motif.every(p =>
    Array.isArray(p) && p.length === 3 &&
    p.every(x => Number.isFinite(x) && x >= 0 && x < 1))) {
    throw new Error("CrystalLattice: choose sc/bcc/fcc, or supply basis coordinates in [0, 1).");
  }
  const basis = [...new Map(motif.map(p => [p.join(","), p])).values()];
  const repeats = basis.map(p => dimensions.map((n, i) =>
    n + (closeBoundary && p[i] === 0 ? 1 : 0)));
  const count = repeats.reduce((sum, n) => sum + n[0] * n[1] * n[2], 0);
  if (count > 24000) throw new Error("CrystalLattice: use at most 24,000 atoms.");

  const positions = [];
  basis.forEach((p, index) => {
    const [a, b, c] = repeats[index];
    for (let x = 0; x < a; x++)
      for (let y = 0; y < b; y++)
        for (let z = 0; z < c; z++)
          positions.push([x + p[0], y + p[1], z + p[2]]);
  });
  const low = [0, 1, 2].map(i => Math.min(...positions.map(p => p[i])));
  const high = [0, 1, 2].map(i => Math.max(...positions.map(p => p[i])));
  const center = low.map((n, i) => (n + high[i]) / 2);
  let radius = 0;
  const points = positions.map(p => {
    const [x, y, z] = p.map((n, i) => n - center[i]);
    radius = Math.max(radius, Math.hypot(x, y, z));
    // Screen right, screen up, toward viewer: [111] initially points out.
    return [(x - y) / Math.sqrt(2), (x + y - 2 * z) / Math.sqrt(6),
      (x + y + z) / Math.sqrt(3)];
  });
  return { points, radius, depthBound: Math.max(radius, 1e-9) };
}

function slerp(a, b, amount) {
  let cosine = quatDot(a, b);
  if (cosine < 0) {
    b = b.map(x => -x);
    cosine = -cosine;
  }
  let left = 1 - amount, right = amount;
  if (cosine < 0.9995) {
    const angle = Math.acos(clamp(cosine, -1, 1));
    left = Math.sin((1 - amount) * angle) / Math.sin(angle);
    right = Math.sin(amount * angle) / Math.sin(angle);
  }
  const q = a.map((x, i) => left * x + right * b[i]);
  const length = Math.hypot(...q);
  return q.map(x => x / length);
}

function rotationMatrix([x, y, z, w]) {
  return [
    1 - 2 * (y * y + z * z), 2 * (x * y - z * w), 2 * (x * z + y * w),
    2 * (x * y + z * w), 1 - 2 * (x * x + z * z), 2 * (y * z - x * w),
    2 * (x * z - y * w), 2 * (y * z + x * w), 1 - 2 * (x * x + y * y),
  ];
}

function cursorTarget(pointer, rect, maxTilt) {
  if (!pointer) return IDENTITY;
  const halfSize = Math.max(1, Math.min(rect.width, rect.height) / 2);
  const dx = (pointer.x - rect.left - rect.width / 2) / halfSize;
  const dy = (rect.top + rect.height / 2 - pointer.y) / halfSize;
  const gain = Math.tan(maxTilt * Math.PI / 180) / Math.max(1, Math.hypot(dx, dy));
  const x = dx * gain, y = dy * gain;
  const inverseLength = 1 / Math.hypot(x, y, 1);
  const z = inverseLength;
  const w = Math.sqrt((1 + z) / 2);
  // Shortest rotation from +Z (the initial [111] axis) to the cursor direction.
  return [-y * inverseLength / (2 * w), x * inverseLength / (2 * w), 0, w];
}

/**
 * A responsive, orthographic SVG lattice. React is the only dependency.
 * Give its parent a height or aspect ratio, e.g.:
 * <div style={{ width: "100%", height: 320 }}>
 *   <CrystalLattice nx={2} ny={2} nz={2} preset="fcc" />
 * </div>
 *
 * basis: optional custom fractional coordinates; overrides preset.
 * atomRadius: radius in lattice-spacing units.
 * padding: fraction of the shorter container side reserved at each edge.
 * smoothingSeconds: time to close about 95% of the angular gap; 0 = immediate.
 * maxTilt: maximum cursor-directed tilt, in degrees (0..85).
 * autoRotateSeconds: seconds per automatic revolution around screen vertical.
 * autoRotateBreakpoint: viewport width at/below which rotation is automatic;
 *   0 disables the width rule. No fine hovering pointer also selects automatic.
 * Reduced motion: disables automatic spin and makes cursor changes immediate.
 * The cursor is tracked across the page; leaving the window returns to [111].
 */
export default function CrystalLattice({
  nx = 2, ny = 2, nz = 2,
  preset = "fcc", basis, closeBoundary = true,
  color = "#167596", backOpacity = 0.1, frontOpacity = 1,
  atomRadius = 0.12, padding = 0.06,
  smoothingSeconds = 0.25, maxTilt = 60,
  autoRotateSeconds = 20, autoRotateBreakpoint = 768,
  className, style, label = "Crystal lattice",
}) {
  const svgRef = useRef(null);
  const circleRefs = useRef([]);
  const motionRef = useRef({ quaternion: [...IDENTITY], phase: 0 });
  const model = useMemo(() => buildLattice(nx, ny, nz,
    basis ?? CRYSTALS[preset], closeBoundary), [nx, ny, nz, basis, preset, closeBoundary]);

  if (!(Number.isFinite(atomRadius) && atomRadius > 0) ||
      !(Number.isFinite(padding) && padding >= 0 && padding < 0.5) ||
      !(Number.isFinite(smoothingSeconds) && smoothingSeconds >= 0) ||
      !(Number.isFinite(maxTilt) && maxTilt >= 0 && maxTilt <= 85) ||
      !(Number.isFinite(autoRotateSeconds) && autoRotateSeconds > 0) ||
      !(Number.isFinite(autoRotateBreakpoint) && autoRotateBreakpoint >= 0) ||
      !(backOpacity >= 0 && frontOpacity <= 1 && backOpacity <= frontOpacity)) {
    throw new Error("CrystalLattice: invalid radius, padding, motion or opacity setting.");
  }
  // Include the atom radius so every rotation fits inside the SVG's viewBox.
  const fit = (1 - 2 * padding) / (model.radius + atomRadius);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const narrow = window.matchMedia(`(max-width: ${autoRotateBreakpoint}px)`);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const motion = motionRef.current;
    let pointer = null;
    let rect = svg.getBoundingClientRect();
    let needsMeasure = true, disposed = false;
    let pending = null, lastTime = null;
    const automatic = () => !fine.matches || (autoRotateBreakpoint > 0 && narrow.matches);

    function requestFrame() {
      if (disposed || document.hidden || pending !== null) return;
      if (lastTime === null) lastTime = performance.now();
      pending = requestAnimationFrame(frame);
    }

    function paint(q) {
      const m = rotationMatrix(q);
      model.points.forEach(([x, y, z], i) => {
        const circle = circleRefs.current[i];
        if (!circle) return;
        const px = m[0] * x + m[1] * y + m[2] * z;
        const py = m[3] * x + m[4] * y + m[5] * z;
        const depth = m[6] * x + m[7] * y + m[8] * z;
        circle.setAttribute("cx", fit * px);
        circle.setAttribute("cy", -fit * py);
        circle.setAttribute("opacity", backOpacity + (frontOpacity - backOpacity) *
          clamp(0.5 + depth / (2 * model.depthBound), 0, 1));
      });
    }

    function frame(now) {
      pending = null;
      if (disposed || document.hidden) { lastTime = null; return; }
      const dt = Math.max(0, (now - lastTime) / 1000);
      lastTime = now;
      if (needsMeasure) {
        rect = svg.getBoundingClientRect();
        needsMeasure = false;
      }
      if (!rect.width || !rect.height) { lastTime = null; return; }
      const auto = automatic();
      let target = IDENTITY;
      if (auto && !reduced.matches) {
        motion.phase = (motion.phase + dt * TAU / autoRotateSeconds) % TAU;
        target = [0, Math.sin(motion.phase / 2), 0, Math.cos(motion.phase / 2)];
      } else if (!auto) {
        target = cursorTarget(pointer, rect, maxTilt);
      }

      // Exponential quaternion damping: independent of frame rate.
      const blend = reduced.matches || smoothingSeconds === 0 ? 1 :
        -Math.expm1(-Math.log(20) * dt / smoothingSeconds);
      let q = slerp(motion.quaternion, target, blend);
      const settled = 1 - Math.abs(quatDot(q, target)) < 1e-7;
      if (settled) q = [...target];
      motion.quaternion = q;
      paint(q);
      if ((auto && !reduced.matches) || !settled) requestFrame();
      else lastTime = null;
    }

    function measureAndRequest() {
      needsMeasure = true;
      requestFrame();
    }
    function onPointerMove(event) {
      if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
      pointer = { x: event.clientX, y: event.clientY };
      if (!automatic()) measureAndRequest();
    }
    function resetPointer() { pointer = null; requestFrame(); }
    function onPointerOut(event) { if (!event.relatedTarget) resetPointer(); }
    function onVisibility() {
      if (document.hidden) {
        if (pending !== null) cancelAnimationFrame(pending);
        pending = null;
        lastTime = null;
      } else measureAndRequest();
    }

    const observer = typeof ResizeObserver === "undefined" ? null :
      new ResizeObserver(measureAndRequest);
    observer?.observe(svg);
    const media = [fine, narrow, reduced];
    media.forEach(query => query.addEventListener("change", measureAndRequest));
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerout", onPointerOut, { passive: true });
    window.addEventListener("blur", resetPointer);
    window.addEventListener("resize", measureAndRequest, { passive: true });
    window.addEventListener("scroll", measureAndRequest, { passive: true, capture: true });
    document.addEventListener("visibilitychange", onVisibility);
    paint(motion.quaternion);
    requestFrame();

    return () => {
      disposed = true;
      if (pending !== null) cancelAnimationFrame(pending);
      observer?.disconnect();
      media.forEach(query => query.removeEventListener("change", measureAndRequest));
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerout", onPointerOut);
      window.removeEventListener("blur", resetPointer);
      window.removeEventListener("resize", measureAndRequest);
      window.removeEventListener("scroll", measureAndRequest, true);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [model, fit, backOpacity, frontOpacity, maxTilt, smoothingSeconds,
    autoRotateSeconds, autoRotateBreakpoint]);

  return (
    <svg
      ref={svgRef}
      className={className}
      viewBox="-1 -1 2 2"
      preserveAspectRatio="xMidYMid meet"
      width="100%"
      height="100%"
      role="img"
      aria-label={label}
      style={{ display: "block", width: "100%", height: "100%",
        minWidth: 0, minHeight: 0, overflow: "hidden", ...style }}
    >
      <g fill={color}>
        {model.points.map(([x, y, z], i) => (
          <circle
            key={i}
            ref={node => { circleRefs.current[i] = node; }}
            cx={x * fit}
            cy={-y * fit}
            r={atomRadius * fit}
            opacity={backOpacity + (frontOpacity - backOpacity) *
              clamp(0.5 + z / (2 * model.depthBound), 0, 1)}
          />
        ))}
      </g>
    </svg>
  );
}
