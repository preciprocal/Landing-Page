import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LogoBar from "@/components/LogoBar";
import ProblemSection from "@/components/ProblemSection";
import BentoFeatures from "@/components/BentoFeatures";
import BeforeAfter from "@/components/BeforeAfter";
import HowItWorks from "@/components/HowItWorks";
import SocialProofStrip from "@/components/SocialProofStrip";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* 1. Hook — Emotional headline + live product demo */}
        <Hero />

        {/* 2. Trust — University logos */}
        <LogoBar />

        {/* 3. Problem — Hit the pain point hard */}
        <ProblemSection />

        {/* 4. Solution — Bento grid with mini previews */}
        <BentoFeatures />

        {/* 5. Contrast — Before vs After */}
        <BeforeAfter />

        {/* 6. Process — How it works in 3 steps */}
        <HowItWorks />

        {/* 7. Proof — Hard numbers */}
        <SocialProofStrip />

        {/* 8. Social proof — Real testimonials */}
        <Testimonials />

        {/* 9. Pricing — With money-back guarantee */}
        <Pricing />

        {/* 10. Close — Emotional final push */}
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}