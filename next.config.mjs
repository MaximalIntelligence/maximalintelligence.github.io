import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

export default (phase) => ({
    output: "export",
    distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next" : "docs",
    images: { unoptimized: true },
  });