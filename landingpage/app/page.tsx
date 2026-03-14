"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionTemplate,
  MotionValue,
} from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Zap,
  ShieldCheck,
  TrendingUp,
  Menu,
  X,
  Play,
} from "lucide-react";
import Link from "next/link";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// --- Utils ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Magnetic Button Component ---
const MagneticButton = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } =
      ref.current?.getBoundingClientRect() ?? {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
      };
    const center = { x: left + width / 2, y: top + height / 2 };
    x.set((clientX - center.x) * 0.15);
    y.set((clientY - center.y) * 0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={cn("relative overflow-hidden group", className)}
    >
      {children}
    </motion.button>
  );
};

// --- Scrollytelling Text Component ---
const ScrollRevealText = ({ text }: { text: string }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.25"],
  });

  const words = text.split(" ");

  return (
    <p
      ref={container}
      className="flex flex-wrap gap-x-3 text-4xl md:text-6xl font-bold leading-tight max-w-4xl mx-auto"
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);

        return (
          <motion.span
            key={i}
            style={{ opacity }}
            className="transition-colors duration-300"
          >
            {word}
          </motion.span>
        );
      })}
    </p>
  );
};

// --- 3D Card Component ---
const ParallaxCard = ({ title, desc, icon: Icon, index }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.2 }}
      className="relative h-[400px] w-full rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-md group"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 z-10" />

      {/* Background Animation */}
      <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-500">
        <div
          className={cn(
            "absolute w-[300px] h-[300px] rounded-full blur-[100px] -top-20 -right-20",
            index === 0
              ? "bg-indigo-500"
              : index === 1
                ? "bg-purple-500"
                : "bg-pink-500",
          )}
        />
      </div>

      <div className="relative z-20 h-full flex flex-col justify-end p-8">
        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6 backdrop-blur-md border border-white/20 group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-3xl font-bold text-white mb-3">{title}</h3>
        <p className="text-slate-300 text-lg leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
};

// --- Main Landing Page ---

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
      <div className="relative pt-40 pb-20 px-6 perspective-1000">
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
            Career <br />
            Velocity.
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

          {/* UI Mockup - Chat Interface */}
          <div className="flex h-full">
            {/* Sidebar */}
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

            {/* Main Content */}
            <div className="flex-1 p-8 relative">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none" />

              {/* Chat Bubble 1 */}
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

              {/* Chat Bubble 2 (User) */}
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

              {/* AI Analysis Overlay */}
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

      {/* Scrollytelling Section */}
      <section className="min-h-screen flex items-center justify-center py-24 bg-black relative z-10">
        <div className="px-6 text-center">
          <ScrollRevealText text="Most candidates memorize answers. You will learn to think. Our AI analyzes your micro-expressions, voice tonality, and structural logic in real-time." />
        </div>
      </section>

      {/* Feature Showcase */}
      <section ref={targetRef} className="py-32 px-6 bg-[#050505]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <ParallaxCard
            index={0}
            icon={Zap}
            title="Hyper-Realistic Simulations"
            desc="Engineered to mimic the pressure of a real interview. No pauses, no mercy, just pure preparation."
          />
          <ParallaxCard
            index={1}
            icon={ShieldCheck}
            title="Resume Fortification"
            desc="We don't just 'check' your resume. We reconstruct it to pass the most aggressive ATS filters."
          />
          <ParallaxCard
            index={2}
            icon={TrendingUp}
            title="Compensation Intelligence"
            desc="Access real-time salary data to negotiate with the leverage of a senior executive."
          />
        </div>
      </section>

      {/* Final CTA */}
      <section className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" />
        </div>

        <div className="relative z-10 text-center px-6">
          <h2 className="text-5xl md:text-7xl font-bold mb-8">
            Ready to take command?
          </h2>
          <Link href="/signup">
            <MagneticButton className="px-12 py-6 bg-white text-black text-xl font-bold rounded-full hover:scale-105 transition-transform">
              Initialize Setup
            </MagneticButton>
          </Link>
        </div>
      </section>
    </div>
  );
}
