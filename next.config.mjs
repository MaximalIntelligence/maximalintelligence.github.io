import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";
import createMDX from '@next/mdx';

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
  },
});

export default (phase) => withMDX({
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  output: "export",
  distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next" : "docs",
  images: { unoptimized: true },
});