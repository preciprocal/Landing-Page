import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Preciprocal Roadmap: Shipped and Coming Next" },
  description:
    "Every feature Preciprocal has shipped, what is in progress, and what is planned next. Ghost job detector, salary intelligence, AI screening simulator, and more. Updated as we build.",
  keywords: [
    "preciprocal roadmap",
    "preciprocal new features",
    "AI job search tool updates",
    "preciprocal changelog",
    "career prep platform features",
    "preciprocal upcoming features",
    "ghost job detector",
    "salary intelligence tool",
  ],
  alternates: { canonical: "https://preciprocal.com/roadmap" },
  openGraph: {
    title: "Preciprocal Product Roadmap",
    description:
      "See everything shipped, what is in progress, and what is coming next. No vaporware.",
    url: "https://preciprocal.com/roadmap",
    type: "website",
    images: [{ url: "https://preciprocal.com/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Preciprocal Product Roadmap",
    description: "See everything shipped, what is in progress, and what is coming next.",
  },
};