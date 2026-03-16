import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Cache TTL for user stats (5 minutes - stats can change frequently)
const USER_STATS_CACHE_TTL = 5 * 60;

// Metadata configuration
export const metadata: Metadata = {
  title:
    "Preciprocal | AI Career Prep — Interviews, Resumes & Job Applications",
  description:
    "Ace your next interview with AI-powered mock interviews, resume analysis, cover letter generation, and job application tracking. Built for job seekers who want to win.",
  keywords: [
    "AI mock interview",
    "interview practice",
    "resume analyzer",
    "resume ATS checker",
    "cover letter generator",
    "job application tracker",
    "career preparation",
    "AI career coach",
    "interview feedback",
    "job search tools",
    "Chrome extension job apply",
    "VAPI interview practice",
  ],
  authors: [{ name: "Preciprocal", url: "https://preciprocal.com" }],
  metadataBase: new URL("https://preciprocal.com"),
  openGraph: {
    title: "Preciprocal | AI-Powered Career Prep",
    description:
      "Mock interviews, resume analysis, cover letter generation, and job tracking — all in one AI-powered platform. Land the job, faster.",
    url: "https://preciprocal.com",
    siteName: "Preciprocal",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Preciprocal — AI Career Prep Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Preciprocal | AI Career Prep",
    description:
      "Mock interviews, resume analysis, cover letter generation & job tracking. Land the job with AI on your side.",
    images: ["/og-image.png"],
    creator: "@preciprocal",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://preciprocal.com",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
