"use client";

import { motion } from "framer-motion";
import { InfiniteMovingCards } from "@/components/ui/InfiniteMovingCards";
import { TESTIMONIALS } from "@/lib/constants";

export default function Testimonials() {
  const items = TESTIMONIALS.map((t) => ({
    quote: t.text,
    name: t.name,
    title: t.role,
  }));

  return (
    <section id="testimonials" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-[13px] font-semibold text-indigo-400 uppercase tracking-widest mb-3">
            Real Stories
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-[42px] font-extrabold text-white tracking-tight leading-tight mb-4">
            They were where you are now.
            <br />
            <span className="text-gradient">Then they started preparing.</span>
          </motion.h2>
          <p className="text-base text-slate-400 max-w-lg mx-auto">
            Real people. Real rejections. Real comebacks. Here&apos;s what happened when they stopped winging it.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <InfiniteMovingCards items={items} direction="right" speed="slow" />
          <InfiniteMovingCards items={[...items].reverse()} direction="left" speed="slow" />
        </div>
      </div>
    </section>
  );
}