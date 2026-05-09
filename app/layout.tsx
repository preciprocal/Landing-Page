import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { OrganizationJsonLd, SoftwareAppJsonLd, FAQJsonLd } from "@/components/JsonLd";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  // ─── Base URL ─────────────────────────────────────────────────────────────
  metadataBase: new URL("https://preciprocal.com"),

  // ─── Titles ───────────────────────────────────────────────────────────────
  title: {
    default: "Preciprocal: AI Job Search Platform for Students and New Grads",
    template: "%s | Preciprocal",
  },

  // ─── Description ──────────────────────────────────────────────────────────
  // 150–160 chars. Audience-specific, keyword-rich, written for humans.
  description:
    "The all-in-one AI job search platform built for students and new grads. AI mock interviews, ATS resume scoring, cover letter generator, study planner, and job tracker. From $9.99/mo.",

  // ─── Keywords ─────────────────────────────────────────────────────────────
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
    // New content signals
    "how to get first tech job",
    "ATS resume tips new grads",
    "Jobscan alternative",
    "Resume Worded alternative",
    "Final Round AI alternative",
    "free ATS checker",
    "mock interview tool free",
    "first software engineering job",
    "AI cover letter generator",
    "cover letter generator free",
    "cover letter generator for students",
    "cover letter no experience",
  ],

  // ─── Authors / Creator ────────────────────────────────────────────────────
  authors: [{ name: "Preciprocal", url: "https://preciprocal.com" }],
  creator: "Preciprocal",
  publisher: "Preciprocal",

  // ─── Robots ───────────────────────────────────────────────────────────────
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

  // ─── Open Graph ───────────────────────────────────────────────────────────
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://preciprocal.com",
    siteName: "Preciprocal",
    title: "Preciprocal: AI Job Search Platform for Students and New Grads",
    description:
      "AI mock interviews, ATS resume scoring, cover letters, study plans & job tracking. Built for students and new grads. From $9.99/mo.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Preciprocal: AI Job Search Platform for Students",
        type: "image/png",
      },
    ],
  },

  // ─── Twitter / X ──────────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    site: "@preciprocal",
    creator: "@preciprocal",
    title: "Preciprocal: AI Job Search Platform for Students and New Grads",
    description:
      "AI mock interviews, ATS resume scoring, cover letters, study plans & job tracking. $9.99/mo.",
    images: [{ url: "/og-image.png", alt: "Preciprocal – AI Job Search for Students" }],
  },

  // ─── Verification ─────────────────────────────────────────────────────────
  // ✅ Google Search Console: already verified via DNS/HTML file method.
  //    The meta tag method is NOT needed - remove the placeholder entirely
  //    to avoid the invalid token showing up in your HTML source.
  //
  // To add Bing Webmaster Tools:
  //   1. Go to https://www.bing.com/webmasters
  //   2. Add your site → choose "XML file" or "Meta tag" method
  //   3. Paste your content value below and uncomment
  // verification: {
  //   other: { "msvalidate.01": "REPLACE_WITH_BING_TOKEN" },
  // },

  // ─── Canonical ────────────────────────────────────────────────────────────
  alternates: {
    canonical: "https://preciprocal.com",
  },

  // ─── App metadata ─────────────────────────────────────────────────────────
  applicationName: "Preciprocal",
  referrer: "origin-when-cross-origin",
  category: "education",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* ── Favicons ─────────────────────────────────────────────────────── */}
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/logo.png" type="image/png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/logo.png" />

        {/* ── Theme color ──────────────────────────────────────────────────── */}
        <meta name="theme-color" content="#050810" />
        <meta name="color-scheme" content="dark" />

        {/* ── Google Analytics 4 ───────────────────────────────────────────── */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XJVD3DYG25" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XJVD3DYG25', { page_path: window.location.pathname });
            `,
          }}
        />

        {/* ── Microsoft Clarity ────────────────────────────────────────────── */}
        {/* Heatmaps, session recordings, rage/dead-click detection.           */}
        {/* Get your Project ID: clarity.microsoft.com → Settings → Setup     */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "wojqnrrn0s");
            `,
          }}
        />

        {/* ── Structured Data ──────────────────────────────────────────────── */}
        <OrganizationJsonLd />
        <SoftwareAppJsonLd />
        <FAQJsonLd />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}