import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

const nextConfig: NextConfig = {
  // Only use static export for GitHub Pages
  output: isGitHubPages ? 'export' : undefined,
  basePath: isGitHubPages ? '/AirpodMax' : '',
  images: {
    // Vercel can handle optimized images, only unoptimize for GitHub Pages
    unoptimized: isGitHubPages,
  },
  trailingSlash: true,
};

export default nextConfig;
