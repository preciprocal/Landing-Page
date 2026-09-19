import type { Metadata } from "next";

/**
 * app/features/metadata.ts
 *
 * Hub page for every tool, targeting broad "what does this do" and
 * "all in one job search" intent, above the individual tool pages which already
 * target their own head terms (for example "ATS checker", "cover letter
 * generator"). Keywords here deliberately avoid competing with those pages and
 * aim at category-level and audience-level queries instead.
 */
export const metadata: Metadata = {
  title: { absolute: "Features: Every Tool for Your Job Search" },
  description:
    "Every Preciprocal tool in one place: resume scoring against real postings, tailored cover letters, voice mock interviews, a study plan built to your interview date, contact finding, and application tracking. Built for students and early-career job seekers.",
  keywords: [
    "job search tools",
    "all in one job search platform",
    "job search tools for students",
    "job search tools for new grads",
    "resume and interview prep tools",
    "job application tools",
    "interview preparation platform",
    "career preparation tools",
    "free job search tools",
    "entry level job search help",
  ],
  alternates: { canonical: "https://preciprocal.com/features" },
  openGraph: {
    title: "Features: Every Tool for Your Job Search",
    description:
      "Resume scoring, tailored cover letters, voice mock interviews, study plans, contact finding and application tracking. Everything the search actually demands, in one place.",
    url: "https://preciprocal.com/features",
    type: "website",
    images: [{ url: "https://preciprocal.com/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Features: Every Tool for Your Job Search",
    description:
      "Resume scoring, cover letters, mock interviews, study plans, contact finding and tracking. All in one place.",
  },
};
