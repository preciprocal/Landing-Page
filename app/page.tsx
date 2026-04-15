import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import StickyBanner from "@/components/StickyBanner";
import Hero from "@/components/Hero";
// import LogoBar from "@/components/LogoBar";          // TODO: restore when university signups are verified
// import SocialProofStrip from "@/components/SocialProofStrip"; // TODO: restore when real usage metrics are available
import ProblemSection from "@/components/ProblemSection";
import BentoFeatures from "@/components/BentoFeatures";
import HowItWorks from "@/components/HowItWorks";
import ComparisonTable from "@/components/ComparisonTable";
// import Testimonials from "@/components/Testimonials"; // TODO: restore when real user reviews are collected
import Pricing from "@/components/Pricing";
import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import ScrollToast from "@/components/ScrollToast";
import HeroProductDemo from "@/components/HeroProductDemo";

export const metadata: Metadata = {
  title: "Preciprocal — AI-Powered Job Search Operating System",
  description:
    "AI mock interviews, resume analysis with ATS scoring, cover letter generation, study planner, job tracker & contact finder. Built for students at $9.99/mo. 30-day money-back guarantee.",
  keywords: [
    "AI mock interview",
    "resume ATS scorer",
    "cover letter generator",
    "job search tool",
    "interview prep",
    "career prep for students",
    "preciprocal",
  ],
  openGraph: {
    title: "Preciprocal — Stop Applying Into the Void",
    description:
      "AI mock interviews, resume analysis, cover letters, study plans & job tracking. Built for students at $9.99/mo.",
    url: "https://preciprocal.com",
    siteName: "Preciprocal",
    images: [{ url: "https://preciprocal.com/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Preciprocal — AI Job Search OS",
    description: "AI mock interviews, ATS resume scoring, cover letters & more. $9.99/mo.",
    images: ["https://preciprocal.com/og-image.png"],
  },
  alternates: { canonical: "https://preciprocal.com" },
};

export default function Home() {
  return (
    <>
      <StickyBanner />
      <Navbar />
      <main>
        {/* 1. Hook — Emotional headline */}
        <Hero />

        {/* 1b. Product demo — feels like part of hero, full height */}
        <HeroProductDemo />

        {/* 2. Trust — University logos (hidden until real signups verified) */}
        {/* <LogoBar /> */}

        {/* 3. Proof — Hard numbers (hidden until real usage metrics available) */}
        {/* <SocialProofStrip /> */}

        {/* 4. Problem — Hit the pain point */}
        <ProblemSection />

        {/* 5. Solution — Bento grid with live demos */}
        <BentoFeatures />

        {/* 6. Process — 3 steps */}
        <HowItWorks />

        {/* 7. Differentiation — Competitor comparison */}
        <ComparisonTable />

        {/* 8. Social proof — Testimonials (hidden until real reviews collected) */}
        {/* <Testimonials /> */}

        {/* 9. Pricing */}
        <Pricing />

        {/* 10. Objections — FAQ */}
        <FAQSection />

        {/* 11. Close */}
        <FinalCTA />
      </main>
      <Footer />

      {/* Scroll-triggered toast for .edu users — appears after 20s */}
      <ScrollToast />
    </>
  );
}