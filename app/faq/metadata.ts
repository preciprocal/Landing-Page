/**
 * app/faq/metadata.ts
 *
 * Because app/faq/page.tsx is a "use client" component, metadata must be
 * exported from a separate server file in Next.js 15.
 *
 * Place this file at: app/faq/metadata.ts
 * (Next.js automatically picks up metadata exports from route segments)
 *
 * Alternative: Remove "use client" from page.tsx, make the page async,
 * and extract the interactive parts into a separate client component.
 * That's the cleaner pattern for new projects.
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ — Preciprocal",
  description:
    "Answers to every question about Preciprocal — pricing, free plan, mock interview setup, ATS scoring, cover letter generation, data privacy, and cancellation.",
  keywords: [
    "preciprocal faq",
    "AI interview prep questions",
    "ATS checker faq",
    "mock interview platform faq",
    "preciprocal pricing",
    "preciprocal free plan",
  ],
  alternates: {
    canonical: "https://preciprocal.com/faq",
  },
  openGraph: {
    title: "Frequently Asked Questions — Preciprocal",
    description:
      "Answers to every question about pricing, features, data privacy, and getting started with Preciprocal.",
    url: "https://preciprocal.com/faq",
    type: "website",
  },
};