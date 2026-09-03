import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { OrganizationJsonLd, SoftwareAppJsonLd } from "@/components/JsonLd";
import CookieBanner from "@/components/CookieBanner";
import ConsentedAnalytics from "@/components/ConsentedAnalytics";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://preciprocal.com"),

  title: {
    default: "Preciprocal: AI Job Search Platform for Students and New Grads",
    template: "%s | Preciprocal",
  },

  description:
    "The all-in-one AI job search platform built for students and new grads. AI mock interviews, ATS resume scoring, cover letter generator, study planner, and job tracker. From $9.99/mo.",

  keywords: [
    // Core product
    "AI mock interview",
    "mock interview practice for students",
    "ATS resume checker",
    "resume ATS score",
    "interview preparation for new grads",
    "AI interview practice",
    "cover letter generator",
    "job search platform for students",
    "career preparation",
    "job tracker",
    "interview simulator",
    "entry level job search",
    "FAANG interview prep",
    "behavioral interview practice",
    "resume analyzer",
    "new grad job search",
    // Alternative signals
    "Jobscan alternative",
    "Resume Worded alternative",
    "Final Round AI alternative",
    "free ATS checker",
    "mock interview tool free",
    "AI cover letter generator",
    "cover letter generator free",
    "cover letter generator for students",
    // International student signals, now supported by blog content
    "F1 student job search",
    "OPT job search",
    "international student career",
    "H1B sponsorship jobs",
    "visa sponsorship job search",
    "EAD card OPT",
    "STEM OPT extension",
    "job search for international graduates",
  ],

  authors: [{ name: "Preciprocal", url: "https://preciprocal.com" }],
  creator: "Preciprocal",
  publisher: "Preciprocal",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://preciprocal.com",
    siteName: "Preciprocal",
    title: "Preciprocal: AI Job Search Platform for Students and New Grads",
    description:
      "AI mock interviews, ATS resume scoring, cover letters, study plans and job tracking. Built for students and new grads. From $9.99/mo.",
    images: [
      {
        url: "https://preciprocal.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Preciprocal: AI Job Search Platform for Students",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@preciprocal",
    creator: "@preciprocal",
    title: "Preciprocal: AI Job Search Platform for Students and New Grads",
    description:
      "AI mock interviews, ATS resume scoring, cover letters, study plans and job tracking. $9.99/mo.",
    images: [{ url: "https://preciprocal.com/og-image.png", alt: "Preciprocal - AI Job Search for Students" }],
  },

  alternates: {
    canonical: "https://preciprocal.com",
  },

  applicationName: "Preciprocal",
  referrer: "origin-when-cross-origin",
  category: "business",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/logo.png" type="image/png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta name="theme-color" content="#050810" />
        <meta name="color-scheme" content="dark" />
        {/*
          NO ANALYTICS ARE LOADED HERE, deliberately.

          Google Analytics and Microsoft Clarity are both injected by
          components/ConsentedAnalytics.tsx, and only after the user opts in via
          CookieBanner. Previously both loaded unconditionally from this head,
          which contradicted the privacy policy's statement that analytics
          cookies can be declined.

          A Consent Mode v2 snippet was tried here first, but Next.js hoists
          external <script async src> tags to the top of the document, so
          gtag.js was being placed above the inline consent-default block and
          could execute before consent was configured. Gating both scripts
          entirely removes that ordering dependency: before consent there are no
          analytics network requests at all.
        */}
        <OrganizationJsonLd />
        <SoftwareAppJsonLd />
      </head>
      <body className="font-sans">
        {children}
        {/* Consent gate. CookieBanner records the decision; ConsentedAnalytics
            acts on it by granting GA storage and loading Clarity. */}
        <CookieBanner />
        <ConsentedAnalytics />
      </body>
    </html>
  );
}