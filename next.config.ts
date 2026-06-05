import type { NextConfig } from "next";

/**
 * next.config.ts
 *
 * NOTE: The www -> non-www redirect is handled at the Vercel domain level,
 * NOT here. Go to: Vercel Dashboard -> your project -> Settings -> Domains,
 * add "www.preciprocal.com" and set it to redirect to "preciprocal.com".
 * That is the correct place for this redirect and avoids redirect loops.
 *
 * SEO redirects — all permanent (308/301) so link equity passes through.
 * Add new redirects here whenever a route is renamed or removed.
 */
const nextConfig: NextConfig = {
  async redirects() {
    return [
      // ------------------------------------------------------------------
      // Cover letter routes
      // ------------------------------------------------------------------
      // Old /cover-letter slug (Google found a 404 here)
      {
        source: "/cover-letter",
        destination: "/cover-letter-generator",
        permanent: true,
      },
      // /cover-letter-examples/[slug] — this entire section was removed.
      // Google crawled at least /cover-letter-examples/cybersecurity-analyst
      // and found a redirect chain (GSC validation: Failed).
      // Redirect the index and ALL slugs to cover-letter-generator.
      {
        source: "/cover-letter-examples",
        destination: "/cover-letter-generator",
        permanent: true,
      },
      {
        source: "/cover-letter-examples/:slug",
        destination: "/cover-letter-generator",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;