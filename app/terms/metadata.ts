/**
 * app/terms/metadata.ts
 *
 * Metadata lives here because app/terms/page.tsx is a "use client" component.
 * Next.js 15 automatically picks up metadata exports from route segment files.
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — Preciprocal",
  description:
    "Preciprocal's full Terms of Service. Covers acceptable use, subscription payments and refunds, intellectual property, limitation of liability, arbitration, and dispute resolution.",
  keywords: [
    "preciprocal terms of service",
    "preciprocal user agreement",
    "preciprocal terms and conditions",
    "AI career tool terms",
    "preciprocal refund policy",
    "preciprocal cancellation policy",
  ],
  alternates: {
    canonical: "https://preciprocal.com/terms",
  },
  openGraph: {
    title: "Preciprocal Terms of Service",
    description:
      "The legal agreement governing your use of Preciprocal. Covers payments, refunds, intellectual property, and your rights as a user.",
    url: "https://preciprocal.com/terms",
    type: "website",
    images: [{ url: "https://preciprocal.com/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Preciprocal Terms of Service",
    description:
      "The legal agreement governing your use of Preciprocal. Covers payments, refunds, and your rights.",
  },
};