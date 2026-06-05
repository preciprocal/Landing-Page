/**
 * app/faq/metadata.ts
 *
 * Metadata lives here because app/faq/page.tsx is a "use client" component.
 * Next.js 15 automatically picks up metadata exports from route segment files.
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ — Preciprocal: Pricing, Mock Interviews, Resume Analysis & More",
  description:
    "Answers to the most common questions about Preciprocal. Covers pricing and plans, how AI mock interviews work, resume ATS scoring, cover letter generation, data privacy, and cancellation.",
  keywords: [
    "preciprocal FAQ",
    "preciprocal questions",
    "how does preciprocal work",
    "preciprocal pricing questions",
    "AI mock interview questions",
    "resume ATS checker FAQ",
    "preciprocal free plan",
    "preciprocal refund policy",
  ],
  alternates: {
    canonical: "https://preciprocal.com/faq",
  },
  openGraph: {
    title: "Preciprocal FAQ: Everything You Need to Know",
    description:
      "Answers to every question about Preciprocal — pricing, how the AI tools work, data privacy, refunds, and more.",
    url: "https://preciprocal.com/faq",
    type: "website",
    images: [{ url: "https://preciprocal.com/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Preciprocal FAQ: Everything You Need to Know",
    description:
      "Answers to every question about Preciprocal — pricing, AI tools, data privacy, and more.",
  },
};