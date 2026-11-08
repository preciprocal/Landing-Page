"use client";

/**
 * components/ProblemSection.tsx
 *
 * The homepage's "problem" beat, for the audience the product is built
 * around: F-1 students on OPT. Every figure here is a rule, not a statistic,
 * and each one is stated on the site's OPT guides, which are checked against
 * USCIS and DHS (Study in the States) sources. Do not add numbers to this
 * section unless they come from those guides.
 *
 * An earlier version showed "73% auto-rejected by ATS", "45% bomb interviews
 * from nerves" and "200+ applications per offer". None had a source, and the
 * first is a well known myth; they were removed.
 */

import Link from "next/link";
import { motion } from "framer-motion";
import { RevealOnScroll, StaggerChildren, StaggerItem, GlowDivider } from "@/components/LandingAnimations";
import { TextGenerateEffect } from "@/components/ui/TextGenerateEffect";

const FACTS = [
  {
    stat: "90",
    unit: "days",
    line: "of unemployment allowed on initial OPT, in total. The count runs while you apply.",
    color: "text-amber-300",
    bar: "bg-amber-400",
    width: "60%",
  },
  {
    stat: "150",
    unit: "days",
    line: "in total with the STEM extension. It adds 60 days to what you have used, it does not reset the count.",
    color: "text-orange-300",
    bar: "bg-orange-400",
    width: "100%",
  },
  {
    stat: "I-983",
    unit: "",
    line: "To extend, your employer must be enrolled in E-Verify and sign a training plan with you. E-Verify is the requirement most likely to rule an employer out.",
    color: "text-rose-300",
    bar: "bg-rose-400",
    width: "75%",
  },
  {
    stat: "H-1B",
    unit: "",
    line: "is a lottery at most employers. Even one that will sponsor you cannot promise you a spot, unless it is cap-exempt.",
    color: "text-red-300",
    bar: "bg-red-400",
    width: "90%",
  },
];

export default function ProblemSection() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <GlowDivider />

        <RevealOnScroll className="mb-14 mt-10 text-center">
          <p className="mb-3 text-[13px] font-semibold uppercase tracking-widest text-amber-300/90">The OPT reality</p>
          <h2 className="mb-5 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-[42px]">
            You are not just job hunting.
            <br />
            <span className="text-slate-500">You are racing a clock.</span>
          </h2>
          <TextGenerateEffect
            words="Domestic candidates can afford a slow search. On OPT, every week of generic applications is a week off your count. Fewer employers will sponsor, and the ones that do ask harder questions."
            className="mx-auto max-w-xl text-base font-normal leading-relaxed text-slate-400"
            duration={0.4}
          />
        </RevealOnScroll>

        <StaggerChildren className="space-y-3">
          {FACTS.map((f, i) => (
            <StaggerItem key={f.stat}>
              <div className="flex items-center gap-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
                <div className="w-24 flex-shrink-0 text-right">
                  <span className={`text-2xl font-black tracking-tight sm:text-3xl ${f.color}`}>{f.stat}</span>
                  {f.unit && <span className="ml-1 text-xs font-semibold text-slate-500">{f.unit}</span>}
                </div>
                <div className="h-10 w-px flex-shrink-0 bg-white/[0.06]" />
                <div className="min-w-0 flex-1">
                  <p className="mb-2 text-[15px] leading-snug text-slate-300">{f.line}</p>
                  <div className="h-1 overflow-hidden rounded-full bg-white/[0.04]">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: f.width }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.12, duration: 0.8, ease: "easeOut" }}
                      className={`h-full rounded-full ${f.bar} opacity-40`}
                    />
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>

        <p className="mt-5 text-center text-[12px] text-slate-500">
          Rules as published by USCIS and DHS. Not legal advice; your DSO has the final word on your case.{" "}
          <Link href="/opt" className="text-slate-300 underline decoration-white/20 underline-offset-4 hover:text-white">
            Read our OPT guides
          </Link>
        </p>

        <RevealOnScroll delay={0.4} className="mt-12 text-center">
          <p className="text-lg font-semibold text-white">So every application has to count.</p>
          <p className="mt-1 text-sm text-slate-500">That is what Preciprocal is built for. ↓</p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
