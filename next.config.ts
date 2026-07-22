import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    // Keep Windows production builds stable in constrained local/CI environments.
    cpus: 1,
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
