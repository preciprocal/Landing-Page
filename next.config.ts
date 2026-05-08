import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Fix: www.preciprocal.com/* -> preciprocal.com/*
      // This resolves the 404s for www.preciprocal.com/terms and
      // www.preciprocal.com/cover-letter seen in Search Console.
      // Using permanent: true (308) so Google transfers link equity.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.preciprocal.com" }],
        destination: "https://preciprocal.com/:path*",
        permanent: true,
      },
      // Fix: /cover-letter -> /ai-mock-interview (or your closest feature page)
      // Google found www.preciprocal.com/cover-letter linked somewhere.
      // Redirect it to the most relevant page rather than leaving it as a 404.
      {
        source: "/cover-letter",
        destination: "/cover-letter-generator",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;