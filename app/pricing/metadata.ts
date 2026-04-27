/**
 * app/pricing/metadata.ts
 *
 * Metadata lives here because app/pricing/page.tsx is a "use client" component.
 * Next.js 15 automatically picks up metadata exports from route segment files.
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — Preciprocal",
  description:
    "Start free, upgrade when you're ready. Preciprocal Pro is $9.99/mo — AI mock interviews, resume ATS scoring, cover letters, study plans, and job tracking. 30-day money-back guarantee.",
  keywords: [
    "preciprocal pricing",
    "AI interview prep cost",
    "mock interview app price",
    "resume ATS checker pricing",
    "career prep tool subscription",
    "preciprocal pro plan",
    "preciprocal free plan",
  ],
  alternates: {
    canonical: "https://preciprocal.com/pricing",
  },
  openGraph: {
    title: "Preciprocal Pricing — Start Free, Land Faster",
    description:
      "Free plan available. Pro at $9.99/mo. 30-day money-back guarantee. AI mock interviews, resume scoring, cover letters & job tracking — all in one place.",
    url: "https://preciprocal.com/pricing",
    type: "website",
    images: [{ url: "https://preciprocal.com/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Preciprocal Pricing — Start Free, Land Faster",
    description:
      "Free plan available. Pro at $9.99/mo. 30-day money-back guarantee.",
  },
};