const crystals = {
    sc: [[0, 0, 0]],
    bcc: [[0, 0, 0], [0.5, 0.5, 0.5]],
    fcc: [[0, 0, 0], [0, 0.5, 0.5],
        [0.5, 0, 0.5], [0.5, 0.5, 0]]
};

const cfg = {
    nx: 3, ny: 3, nz: 3,
    basis: crystals.sc,
    closeBoundary: true,
    backOpacity: 0.1,
    frontOpacity: 1
};

function buildPoints() {
    let dims = [2,2,2];
    let basis = crystals.fcc;

    const repeats = basis.map(b =>
      dims.map((n, a) =>
        n + (b[a] === 0 ? 1 : 0))
    );
    const points = [];
    basis.forEach((b, m) => {
      const n = repeats[m];
      for (let i = 0; i < n[0]; i++)
        for (let j = 0; j < n[1]; j++)
          for (let k = 0; k < n[2]; k++)
            points.push([i + b[0], j + b[1], k + b[2]]);
    });

    const low = [Infinity, Infinity, Infinity];
    const high = [-Infinity, -Infinity, -Infinity];
    points.forEach(p => p.forEach((v, a) => {
        low[a] = Math.min(low[a], v);
        high[a] = Math.max(high[a], v);
    }));
    const center = low.map((v, a) => (v + high[a]) / 2);
    points.forEach(p => p.forEach((v, a) => p[a] = v - center[a]));

    const bound = Math.max(0.5, Math.hypot(
        ...high.map((v, a) => (v - low[a]) / 2)
    ));
    return { points, bound, scale: Math.min(92, 248 / bound) };
}

const clamp = v => Math.max(0, Math.min(1, v));
const dot = (a, b) => a.reduce((s, v, i) => s + v * b[i], 0);

// Rows are screen-right, screen-up, and depth toward the viewer.
// t = 0 gives [100]; t = 1 gives [111].
function orientation(t, angle = 0) {
    const azimuth = t * Math.PI / 4;
    const elevation = t * Math.asin(1 / Math.sqrt(3));
    const ca = Math.cos(azimuth), sa = Math.sin(azimuth);
    const ce = Math.cos(elevation), se = Math.sin(elevation);
    const right = [sa, -ca, 0];
    const up = [se * ca, se * sa, -ce];
    const depth = [ce * ca, ce * sa, se];
    const c = Math.cos(angle), s = Math.sin(angle);

    // Rotate around screen-up without changing the vertical coordinates.
    return [
        right.map((v, i) => c * v + s * depth[i]),
        up,
        depth.map((v, i) => c * v - s * right[i])
    ];
    }

    const model = buildPoints();
    const mount = document.getElementById("lattice");
    mount.innerHTML =
    '<svg viewBox="0 0 400 400" width="400" height="400" ' +
    'role="img" aria-label="Rotating crystal lattice">' +
    '<g fill="#167596"></g></svg>';

    const group = mount.querySelector("g");
    const radius = Math.max(1.1, Math.min(6, model.scale * 0.16775));
    const circles = model.points.map(() => {
    const c = document.createElementNS(
        "http://www.w3.org/2000/svg", "circle"
    );
    c.setAttribute("r", 1.3*radius);
    group.appendChild(c);
    return c;
});

function draw(matrix) {
    model.points.forEach((p, i) => {
        const z = dot(matrix[2], p);
        const depth = clamp(0.5 + 0.5 * z / model.bound);

        circles[i].setAttribute("cx",
        200 + model.scale * dot(matrix[0], p));
        circles[i].setAttribute("cy",
        200 - model.scale * dot(matrix[1], p));
        circles[i].setAttribute("opacity",
        cfg.backOpacity + (cfg.frontOpacity - cfg.backOpacity) * depth);
    });
}

function progress() {
    const travel =
        document.documentElement.scrollHeight - window.innerHeight;
    return clamp(window.scrollY / Math.max(1, travel));
}

// Increase this number for slower rotation.
const pixelsPerTurn = 1500;

const reduced =
  matchMedia("(prefers-reduced-motion: reduce)").matches;

const start = performance.now();
let pending = null;

function requestFrame() {
  if (pending === null) pending = requestAnimationFrame(frame);
}

function frame(now) {
  pending = null;

  // Introductory tilt depends on time.
  const t = reduced ? 1 : clamp((now - start - 650) / 2400);

  // Spin depends on absolute scroll position, even during the intro.
  const angle =
    2 * Math.PI * Math.max(0, window.scrollY) / pixelsPerTurn;

  draw(orientation(t * t * (3 - 2 * t), angle));

  if (t < 1) requestFrame();
}

window.addEventListener("scroll", requestFrame, { passive: true });
window.addEventListener("resize", requestFrame);
window.addEventListener("pageshow", requestFrame);

frame(start);