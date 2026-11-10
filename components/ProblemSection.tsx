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
    color: "text-amber-400",
    bar: "from-amber-500 to-yellow-300",
    card: "border-amber-400/20 bg-amber-400/[0.04]",
    divider: "bg-amber-400/30",
  },
  {
    stat: "150",
    unit: "days",
    line: "in total with the STEM extension. It adds 60 days to what you have used, it does not reset the count.",
    color: "text-orange-400",
    bar: "from-orange-500 to-amber-300",
    card: "border-orange-400/20 bg-orange-400/[0.04]",
    divider: "bg-orange-400/30",
  },
  {
    stat: "I-983",
    unit: "",
    line: "To extend, your employer must be enrolled in E-Verify and sign a training plan with you. E-Verify is the requirement most likely to rule an employer out.",
    color: "text-rose-400",
    bar: "from-rose-500 to-pink-400",
    card: "border-rose-400/20 bg-rose-400/[0.04]",
    divider: "bg-rose-400/30",
  },
  {
    stat: "H-1B",
    unit: "",
    line: "is a lottery at most employers. Even one that will sponsor you cannot promise you a spot, unless it is cap-exempt.",
    color: "text-red-400",
    bar: "from-red-500 to-rose-400",
    card: "border-red-400/20 bg-red-400/[0.04]",
    divider: "bg-red-400/30",
  },
];

export default function ProblemSection() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <GlowDivider />

        <RevealOnScroll className="mb-14 mt-10 text-center">
          <p className="mb-3 text-[13px] font-semibold uppercase tracking-widest text-amber-400">The OPT reality</p>
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
              <div className={`relative flex flex-col items-start gap-2 overflow-hidden rounded-2xl border p-5 pl-6 sm:flex-row sm:items-center sm:gap-5 sm:pl-7 ${f.card}`}>
                {/* An accent stripe in the fact's colour, drawn top to bottom
                    on reveal. It marks the rule; it is not a measure, so it
                    has no length to misread. */}
                <motion.span
                  aria-hidden="true"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 + i * 0.12, duration: 0.6, ease: "easeOut" }}
                  className={`absolute inset-y-0 left-0 w-1 origin-top bg-gradient-to-b ${f.bar}`}
                />
                <div className="flex-shrink-0 sm:w-24 sm:text-right">
                  <span className={`text-2xl font-black tracking-tight sm:text-3xl ${f.color}`}>{f.stat}</span>
                  {f.unit && <span className="ml-1 text-xs font-semibold text-slate-500">{f.unit}</span>}
                </div>
                <div className={`hidden h-10 w-px flex-shrink-0 sm:block ${f.divider}`} />
                <div className="min-w-0 flex-1">
                  <p className="text-[15px] leading-snug text-slate-200">{f.line}</p>
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

      </div>
    </section>
  );
}
