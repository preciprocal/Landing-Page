"use client";

import { motion } from "framer-motion";
import { HoverEffect } from "@/components/ui/CardHoverEffect";
import { FEATURES } from "@/lib/constants";
import { iconMap } from "@/components/Icons";

export default function Features() {
  const items = FEATURES.map((f) => {
    const Icon = iconMap[f.icon];
    return { title: f.title, description: f.description, icon: <Icon />, gradient: f.gradient };
  });

  return (
    <section id="features" className="relative">
      <div className="max-w-[1200px] mx-auto px-6 py-28">
        <div className="text-center mb-16">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-[13px] font-semibold text-indigo-400 uppercase tracking-widest mb-3">
            Features
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-[42px] font-extrabold text-white tracking-tight leading-tight mb-4">
            Everything that got others hired.
            <br />
            <span className="text-gradient">Now it&apos;s your turn.</span>
          </motion.h2>
          <p className="text-base text-slate-400 max-w-lg mx-auto">
            Six AI-powered tools working together so you spend less time guessing and more time getting callbacks.
          </p>
        </div>
        <HoverEffect items={items} />
      </div>
    </section>
  );
}