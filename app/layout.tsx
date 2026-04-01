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
  metadataBase: new URL("https://preciprocal.com"),
  title: {
    default: "Preciprocal — AI-Powered Job Search Operating System",
    template: "%s | Preciprocal",
  },
  description:
    "Land your dream job with AI mock interviews, resume analysis with ATS scoring, cover letter generation, personalized study plans, and job tracking. One platform that turns preparation into offers.",
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
  ],
  authors: [{ name: "Preciprocal" }],
  creator: "Preciprocal",
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
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Preciprocal — AI-Powered Job Search Operating System",
    description:
      "Mock interviews, resume analysis, cover letters, study plans & job tracking.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/logo.png" sizes="any" />
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <OrganizationJsonLd />
        <SoftwareAppJsonLd />
        <FAQJsonLd />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}