/**
 * app/privacy/metadata.ts
 *
 * Metadata lives here because app/privacy/page.tsx is a "use client" component.
 * Next.js 15 automatically picks up metadata exports from route segment files.
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Preciprocal",
  description:
    "Preciprocal's full privacy policy. How we collect and use your data, your rights under GDPR and CCPA, data retention schedules, security practices, and how to contact us.",
  keywords: [
    "preciprocal privacy policy",
    "preciprocal data privacy",
    "AI job search tool privacy",
    "GDPR compliance career app",
    "CCPA rights preciprocal",
    "resume data privacy",
  ],
  alternates: {
    canonical: "https://preciprocal.com/privacy",
  },
  openGraph: {
    title: "Preciprocal Privacy Policy",
    description:
      "How Preciprocal handles your personal data. Plain language, full GDPR and CCPA compliance, and a clear explanation of your rights.",
    url: "https://preciprocal.com/privacy",
    type: "website",
    images: [{ url: "https://preciprocal.com/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Preciprocal Privacy Policy",
    description:
      "How Preciprocal handles your personal data. Plain language, no legalese.",
  },
};