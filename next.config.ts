import type { NextConfig } from "next";

/**
 * next.config.ts
 *
 * NOTE: The www -> non-www redirect is handled at the Vercel domain level,
 * NOT here. Go to: Vercel Dashboard -> your project -> Settings -> Domains,
 * add "www.preciprocal.com" and set it to redirect to "preciprocal.com".
 * That is the correct place for this redirect and avoids redirect loops.
 */
const nextConfig: NextConfig = {
  async redirects() {
    return [
      // /cover-letter -> /cover-letter-generator
      // Handles old links and the 404 Google found at www.preciprocal.com/cover-letter
      {
        source: "/cover-letter",
        destination: "/cover-letter-generator",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;