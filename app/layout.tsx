import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { OrganizationJsonLd, SoftwareAppJsonLd, FAQJsonLd } from "@/components/JsonLd";
import CookieBanner from "@/components/CookieBanner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://preciprocal.com"),

  title: {
    default: "Preciprocal — AI-Powered Job Search Operating System",
    template: "%s | Preciprocal",
  },

  description:
    "Land your dream job with AI mock interviews, resume ATS scoring, cover letter generation, personalized study plans, and job tracking. One platform that turns preparation into offers — from $9.99/mo.",

  keywords: [
    "AI mock interview",
    "resume ATS score",
    "interview preparation",
    "cover letter generator",
    "job search platform",
    "AI interview practice",
    "career preparation",
    "job tracker",
    "study planner",
    "interview simulator",
    "ATS resume checker",
    "software engineer interview prep",
    "FAANG interview preparation",
    "behavioral interview practice",
    "resume analyzer",
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
    title: "Preciprocal — AI-Powered Job Search Operating System",
    description:
      "Mock interviews, resume analysis, cover letters, study plans & job tracking. One platform that turns preparation into offers.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Preciprocal – Land your dream job with AI",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@preciprocal",
    creator: "@preciprocal",
    title: "Preciprocal — AI-Powered Job Search Operating System",
    description:
      "Mock interviews, resume analysis, cover letters, study plans & job tracking. $9.99/mo.",
    images: [{ url: "/og-image.png", alt: "Preciprocal – AI Job Search OS" }],
  },

  verification: {
  google: "Gx5JSJmIhdKsJydR1agYdbj3-GZw5Cm5Js3K16sbgbU",
},

  alternates: {
    canonical: "https://preciprocal.com",
  },

  applicationName: "Preciprocal",
  referrer: "origin-when-cross-origin",
  category: "education",
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

        {/* Google Analytics 4 */}
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

        {/* Structured Data */}
        <OrganizationJsonLd />
        <SoftwareAppJsonLd />
        <FAQJsonLd />
      </head>
      <body className="font-sans">
        {children}
        {/* Cookie consent banner — renders client-side only, no SSR flash */}
        <CookieBanner />
      </body>
    </html>
  );
}