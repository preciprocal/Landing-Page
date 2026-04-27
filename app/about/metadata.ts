/**
 * app/about/metadata.ts
 *
 * Metadata lives here because app/about/page.tsx is a "use client" component.
 * Next.js 15 automatically picks up metadata exports from route segment files.
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Preciprocal — Our Story, Mission & Values",
  description:
    "Preciprocal started as one frustrated student's side project after 200+ job applications. Here's the story of why we built it, what we believe, and where we're going.",
  keywords: [
    "about preciprocal",
    "preciprocal story",
    "AI job search tool",
    "career prep platform mission",
    "who built preciprocal",
    "preciprocal founder",
  ],
  alternates: {
    canonical: "https://preciprocal.com/about",
  },
  openGraph: {
    title: "About Preciprocal — Our Story & Mission",
    description:
      "We built the tool we wish existed. One frustrated student, 200+ rejections, and a mission to make expert-level career prep accessible to everyone.",
    url: "https://preciprocal.com/about",
    type: "website",
    images: [{ url: "https://preciprocal.com/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Preciprocal — Our Story & Mission",
    description:
      "We built the tool we wish existed. One frustrated student, 200+ rejections, and a mission to make expert-level career prep accessible to everyone.",
  },
};