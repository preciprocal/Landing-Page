/**
 * app/roadmap/metadata.ts
 *
 * Metadata lives here because app/roadmap/page.tsx is a "use client" component.
 * Next.js 15 automatically picks up metadata exports from route segment files.
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preciprocal Roadmap: What We Have Shipped and What Is Coming Next",
  description:
    "Every feature Preciprocal has shipped, what is currently in progress, and what is planned next. Ghost job detector, salary intelligence, AI screening simulator, and more. Updated as we build.",
  keywords: [
    "preciprocal roadmap",
    "preciprocal new features",
    "AI job search tool updates",
    "preciprocal changelog",
    "career prep platform features",
    "preciprocal upcoming features",
  ],
  alternates: {
    canonical: "https://preciprocal.com/roadmap",
  },
  openGraph: {
    title: "Preciprocal Product Roadmap",
    description:
      "See everything we have shipped, what is in progress, and what is coming next. No vaporware — if it is here, it is real.",
    url: "https://preciprocal.com/roadmap",
    type: "website",
    images: [{ url: "https://preciprocal.com/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Preciprocal Product Roadmap",
    description:
      "See everything we have shipped, what is in progress, and what is coming next.",
  },
};