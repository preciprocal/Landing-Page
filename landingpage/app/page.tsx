"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

// Import your newly split components
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ScrollRevealText } from "@/components/ui/ScrollRevealText";
import { DashboardShowcase } from "@/components/sections/DashboardShowcase";
import { BentoFeatureGrid } from "@/components/sections/BentoFeatureGrid";
import { AppFeaturesDetails } from "@/components/sections/AppFeaturesDetails";
import { FAQSection } from "@/components/sections/FAQSection";
import { Footer } from "@/components/sections/Footer";

export default function EtherealLanding() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5], [0, 15]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  return (
    <div className="bg-[#030303] text-white min-h-screen font-sans selection:bg-indigo-500/30">
      {/* Navigation */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50 rounded-full border border-white/10 bg-black/50 backdrop-blur-xl px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-indigo-500 animate-pulse" />
          <span className="font-bold tracking-tight">Preciprocal</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <a href="#" className="hover:text-white transition-colors">
            Method
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Manifesto
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Pricing
          </a>
        </div>
        <Link href="/login">
          <MagneticButton className="px-5 py-2 rounded-full bg-white text-black font-semibold text-sm hover:bg-indigo-50 transition-colors">
            Book Demo
          </MagneticButton>
        </Link>
      </nav>

      {/* Hero Section */}
      <div
        ref={targetRef}
        className="relative pt-40 pb-20 px-6 perspective-1000"
      >
        <div className="max-w-5xl mx-auto text-center z-10 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-slate-300 mb-10"
          >
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>AI-Native Career Architecture</span>
          </motion.div>

          <h1 className="text-6xl md:text-9xl font-bold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40">
            Career <br /> Velocity.
          </h1>

          <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto mb-16 leading-relaxed">
            Preciprocal isn't just a tool. It's a competitive advantage. We use
            military-grade AI to simulate the toughest interviews on earth.
          </p>

          <div className="flex justify-center gap-6">
            <MagneticButton className="group px-8 py-4 bg-indigo-600 rounded-full text-lg font-bold flex items-center gap-2 shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)]">
              Start Simulation{" "}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </MagneticButton>
          </div>
        </div>

        {/* 3D Dashboard Tilt Effect */}
        <motion.div
          style={{ rotateX, scale, y }}
          className="mt-24 max-w-6xl mx-auto rounded-xl border border-white/10 bg-[#0A0A0A] shadow-2xl relative overflow-hidden aspect-[16/9]"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
          <div className="flex h-full">
            <div className="w-64 border-r border-white/5 bg-[#050505] p-6 hidden md:block">
              <div className="space-y-4">
                <div className="h-2 w-20 bg-white/10 rounded" />
                <div className="h-8 w-full bg-indigo-500/10 border border-indigo-500/20 rounded-lg flex items-center px-3 text-xs text-indigo-300">
                  Mock Interview #042
                </div>
                <div className="h-8 w-full bg-white/5 rounded-lg" />
                <div className="h-8 w-full bg-white/5 rounded-lg" />
              </div>
            </div>
            <div className="flex-1 p-8 relative">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none" />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="max-w-xl bg-white/5 border border-white/10 p-6 rounded-2xl rounded-tl-none mb-6 backdrop-blur-sm"
              >
                <p className="text-slate-300 text-lg">
                  Let's discuss the system design of a URL shortener like
                  Bit.ly. How would you handle 100M daily active users?
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="max-w-xl ml-auto bg-indigo-600/20 border border-indigo-500/30 p-6 rounded-2xl rounded-tr-none text-right backdrop-blur-sm"
              >
                <p className="text-white text-lg">
                  I'd start by estimating the write vs. read ratio. Assuming
                  100:1 read-heavy...
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="absolute bottom-8 right-8 w-80 bg-[#111] border border-white/10 rounded-xl p-5 shadow-2xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Live Feedback
                  </span>
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Technical Depth</span>
                    <span className="text-green-400">92%</span>
                  </div>
                  <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "92%" }}
                      transition={{ delay: 1.5, duration: 1 }}
                      className="h-full bg-green-500"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      <BentoFeatureGrid />
      <AppFeaturesDetails />

      {/* The Dashboard Showcase */}
      <section className="relative z-10 py-16 px-4 sm:px-6 bg-[#030303]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Your Command Center
            </h2>
            <p className="text-lg text-slate-400">
              A unified interface to manage interviews, resumes, and progress.
            </p>
          </div>
          <div className="relative mx-auto perspective-1000">
            <motion.div
              whileHover={{ rotateX: 2, rotateY: -2 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <DashboardShowcase />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Scrollytelling Section */}
      <section className="min-h-[80vh] flex items-center justify-center py-24 bg-black relative z-10 border-y border-white/5">
        <div className="px-6 text-center">
          <ScrollRevealText text="Most candidates memorize answers. You will learn to think. Our AI analyzes your micro-expressions, voice tonality, and structural logic in real-time." />
        </div>
      </section>

      <FAQSection />

      {/* Final CTA */}
      <section className="py-32 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" />
        </div>
        <div className="relative z-10 text-center px-6">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
            Ready to take command?
          </h2>
          <Link href="/signup">
            <MagneticButton className="px-12 py-6 bg-white text-black text-xl font-bold rounded-full hover:scale-105 transition-transform">
              Initialize Setup
            </MagneticButton>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
