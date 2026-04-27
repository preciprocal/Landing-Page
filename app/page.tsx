/**
 * app/page.tsx — Landing page (root route)
 *
 * SEO changes from original:
 *   • Added WebSiteJsonLd (enables Google Sitelinks Search Box)
 *   • Richer keywords in metadata
 *   • Stronger description (includes price + guarantee for CTR)
 *   • All section-level aria-labels added for accessibility + crawlability
 *
 * NOTE: The Hero component already renders a <h1>. Every other section should
 * use <h2> for its heading — see each component's internal markup.
 */

import type { Metadata } from "next";
import { WebSiteJsonLd } from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import StickyBanner from "@/components/StickyBanner";
import Hero from "@/components/Hero";
import LogoBar from "@/components/LogoBar";
import SocialProofStrip from "@/components/SocialProofStrip";
import ProblemSection from "@/components/ProblemSection";
import BentoFeatures from "@/components/BentoFeatures";
import HowItWorks from "@/components/HowItWorks";
import ComparisonTable from "@/components/ComparisonTable";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import ScrollToast from "@/components/ScrollToast";
import HeroProductDemo from "@/components/HeroProductDemo";

export const metadata: Metadata = {
  // Page-level overrides (layout.tsx handles the base/template)
  title: "Preciprocal — AI-Powered Job Search Operating System",

  // 155 chars — specific, keyword-rich, includes price/guarantee for CTR
  description:
    "Land your dream job with AI mock interviews, resume ATS scoring, cover letter generation, personalized study plans, and job tracking. $9.99/mo. 30-day money-back guarantee.",

  keywords: [
    "AI mock interview",
    "resume ATS scorer",
    "cover letter generator",
    "job search tool for students",
    "interview prep platform",
    "career prep AI",
    "ATS resume checker free",
    "mock interview practice",
    "job application tracker",
    "FAANG interview prep",
    "preciprocal",
  ],

  openGraph: {
    title: "Preciprocal — Stop Applying Into the Void",
    description:
      "AI mock interviews, resume analysis, cover letters, study plans & job tracking. Built for students at $9.99/mo. 30-day guarantee.",
    url: "https://preciprocal.com",
    siteName: "Preciprocal",
    images: [
      {
        url: "https://preciprocal.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Preciprocal — AI Job Search Operating System",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Preciprocal — AI Job Search OS",
    description:
      "AI mock interviews, ATS resume scoring, cover letters, study plans & job tracking. $9.99/mo.",
    images: [{ url: "https://preciprocal.com/og-image.png", alt: "Preciprocal" }],
  },

  alternates: {
    canonical: "https://preciprocal.com",
  },
};

export default function Home() {
  return (
    <>
      {/* WebSiteJsonLd enables Sitelinks Search Box in Google */}
      <WebSiteJsonLd />

      <StickyBanner />
      <Navbar />

      <main>
        {/* 1. Hero — contains the single <h1> for this page */}
        <Hero />

        {/* 1b. Product demo — visually part of hero */}
        <HeroProductDemo />

        

        {/* 4. Problem — pain point */}
        <section aria-label="The job search problem">
          <ProblemSection />
        </section>

        {/* 5. Solution — bento feature grid */}
        <section id="features" aria-label="Product features">
          <BentoFeatures />
        </section>

        {/* 6. Process — 3 steps */}
        <section id="how-it-works" aria-label="How Preciprocal works">
          <HowItWorks />
        </section>

        {/* 7. Differentiation — comparison table */}
        <section aria-label="Competitor comparison">
          <ComparisonTable />
        </section>

      
        {/* 9. Pricing */}
        <section id="pricing" aria-label="Pricing plans">
          <Pricing />
        </section>

        {/* 10. FAQ */}
        <section aria-label="Frequently asked questions">
          <FAQSection />
        </section>

        {/* 11. Final CTA */}
        <section aria-label="Get started">
          <FinalCTA />
        </section>
      </main>

      <Footer />

      {/* Scroll-triggered toast for .edu users — fires after 20s */}
      <ScrollToast />
    </>
  );
}