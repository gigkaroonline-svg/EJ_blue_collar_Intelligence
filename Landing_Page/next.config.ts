import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Poll so Turbopack does not need extra inotify watches.
  watchOptions: {
    pollIntervalMs: 1000,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    root: __dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
