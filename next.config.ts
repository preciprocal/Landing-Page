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
      // Old /cover-letter slug (Google found a 404 here).
      // This route genuinely does not exist, so the redirect stays.
      {
        source: "/cover-letter",
        destination: "/cover-letter-generator",
        permanent: true,
      },

      // NOTE: /cover-letter-examples and /cover-letter-examples/:slug used to
      // be redirected here, from a period when that section had been removed.
      // The section was later rebuilt — app/cover-letter-examples/page.tsx and
      // app/cover-letter-examples/[role]/page.tsx now prerender 42 real pages
      // with their own canonicals and metadata. The redirects survived the
      // rebuild and were intercepting every one of them, which is what GSC
      // reported as "Page with redirect" (validation: Failed).
      //
      // Do not re-add a redirect for a path that has a page.tsx behind it.
    ];
  },
};

export default nextConfig;