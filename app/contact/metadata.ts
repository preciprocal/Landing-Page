/**
 * app/contact/metadata.ts
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Preciprocal: Get in Touch",
  description:
    "Questions, feedback, bug reports, or partnership enquiries — we read every email. Reach us at support@preciprocal.com. We respond within 24 hours on weekdays.",
  keywords: [
    "contact preciprocal",
    "preciprocal support",
    "preciprocal email",
    "preciprocal help",
  ],
  alternates: { canonical: "https://preciprocal.com/contact" },
  openGraph: {
    title: "Contact Preciprocal",
    description:
      "Questions or feedback? We read every email and respond within 24 hours on weekdays.",
    url: "https://preciprocal.com/contact",
    type: "website",
    images: [{ url: "https://preciprocal.com/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Preciprocal",
    description: "Questions or feedback? We read every email and respond within 24 hours.",
  },
};