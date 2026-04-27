"use client";

import { motion } from "framer-motion";
import {
  RevealOnScroll, StaggerChildren, StaggerItem,
  SpotlightCard, GlowDivider,
} from "@/components/LandingAnimations";
import { TextGenerateEffect } from "@/components/ui/TextGenerateEffect";
import { Tooltip } from "@/components/ui/ToolTipCard";

// ─── Tooltip content cards ────────────────────────────────────────────────────

const AtsTooltip = () => (
  <div>
    <p className="text-xs font-bold text-white mb-1">What is an ATS?</p>
    <p className="text-[11px] text-neutral-400 leading-relaxed">
      Applicant Tracking Systems (like Workday, Greenhouse & Lever) automatically
      parse and score resumes before any human sees them. If your resume isn't
      formatted for ATS, it's invisible.
    </p>
    <div className="mt-3 flex flex-wrap gap-1">
      {["Workday", "Greenhouse", "Lever", "iCIMS", "Taleo"].map((name) => (
        <span key={name} className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.06] text-slate-400 border border-white/[0.08]">
          {name}
        </span>
      ))}
    </div>
  </div>
);

const RecruiterTooltip = () => (
  <div>
    <p className="text-xs font-bold text-white mb-1">The 6-second resume scan</p>
    <p className="text-[11px] text-neutral-400 leading-relaxed">
      Eye-tracking studies show recruiters spend an average of 6–7 seconds on
      initial resume review — focusing on job title, company, dates, and education.
      Everything else is noise unless it jumps out immediately.
    </p>
    <p className="text-[10px] text-indigo-400 mt-2">Source: TheLadders eye-tracking study</p>
  </div>
);

const NervesTooltip = () => (
  <div>
    <p className="text-xs font-bold text-white mb-1">Interview anxiety is real</p>
    <p className="text-[11px] text-neutral-400 leading-relaxed">
      Studies find that nearly half of candidates underperform in interviews due to
      anxiety — not lack of knowledge. Mock practice is the single most effective
      way to rewire that response before it counts.
    </p>
  </div>
);

const ApplicationsTooltip = () => (
  <div>
    <p className="text-xs font-bold text-white mb-1">The spray-and-pray trap</p>
    <p className="text-[11px] text-neutral-400 leading-relaxed">
      Most job seekers send the same generic resume to hundreds of roles. A
      tailored application targeting 20 well-matched roles statistically
      outperforms 200 untailored ones.
    </p>
    <div className="mt-2 flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
        <div className="h-full w-[15%] rounded-full bg-emerald-500/60" />
      </div>
      <span className="text-[10px] text-emerald-400">Tailored: ~15% response rate</span>
    </div>
    <div className="mt-1 flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
        <div className="h-full w-[2%] rounded-full bg-red-500/60" />
      </div>
      <span className="text-[10px] text-red-400">Generic: ~2% response rate</span>
    </div>
  </div>
);

// ─── Pain point data with tooltip content ─────────────────────────────────────

const PAIN_POINTS = [
  {
    stat: "73%",
    statTooltip: <AtsTooltip />,
    pain: (
      <>
        of applications get auto-rejected by{" "}
        <Tooltip
          containerClassName="text-slate-300"
          content={<AtsTooltip />}
        >
          <span className="font-semibold text-white underline decoration-dotted decoration-slate-500 underline-offset-2 cursor-help">
            ATS
          </span>
        </Tooltip>{" "}
        before a human sees them
      </>
    ),
    color: "text-red-400",
    barColor: "bg-red-500",
    barWidth: "73%",
  },
  {
    stat: "6 sec",
    statTooltip: <RecruiterTooltip />,
    pain: (
      <>
        is all a{" "}
        <Tooltip
          containerClassName="text-slate-300"
          content={<RecruiterTooltip />}
        >
          <span className="font-semibold text-white underline decoration-dotted decoration-slate-500 underline-offset-2 cursor-help">
            recruiter
          </span>
        </Tooltip>{" "}
        spends scanning your resume
      </>
    ),
    color: "text-amber-400",
    barColor: "bg-amber-500",
    barWidth: "6%",
  },
  {
    stat: "45%",
    statTooltip: <NervesTooltip />,
    pain: (
      <>
        of candidates bomb interviews from{" "}
        <Tooltip
          containerClassName="text-slate-300"
          content={<NervesTooltip />}
        >
          <span className="font-semibold text-white underline decoration-dotted decoration-slate-500 underline-offset-2 cursor-help">
            nerves
          </span>
        </Tooltip>
        , not lack of skill
      </>
    ),
    color: "text-orange-400",
    barColor: "bg-orange-500",
    barWidth: "45%",
  },
  {
    stat: "200+",
    statTooltip: <ApplicationsTooltip />,
    pain: (
      <>
        applications is the average before landing{" "}
        <Tooltip
          containerClassName="text-slate-300"
          content={<ApplicationsTooltip />}
        >
          <span className="font-semibold text-white underline decoration-dotted decoration-slate-500 underline-offset-2 cursor-help">
            one offer
          </span>
        </Tooltip>
      </>
    ),
    color: "text-red-400",
    barColor: "bg-red-500",
    barWidth: "85%",
  },
];

export default function ProblemSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-red-500/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <GlowDivider />

        <RevealOnScroll className="text-center mb-16 mt-10">
          <p className="text-[13px] font-semibold text-red-400/80 uppercase tracking-widest mb-3">
            The uncomfortable truth
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-[42px] font-extrabold text-white tracking-tight leading-tight mb-5">
            The job market isn&apos;t broken.
            <br />
            <span className="text-slate-500">Your preparation is.</span>
          </h2>
          <TextGenerateEffect
            words="You're not getting rejected because you're not good enough. You're getting rejected because you don't know the rules of a game that's been rigged against you."
            className="text-base text-slate-500 max-w-xl mx-auto leading-relaxed font-normal"
            duration={0.4}
          />
        </RevealOnScroll>

        <StaggerChildren className="space-y-4">
          {PAIN_POINTS.map((point, i) => (
            <StaggerItem key={i}>
              <SpotlightCard
                className="rounded-2xl border border-white/[0.05] bg-white/[0.02] hover:border-red-500/10 transition-all duration-300"
                spotlightColor="rgba(239,68,68,0.04)"
              >
                <div className="flex items-center gap-5 p-5">
                  <div className="flex-shrink-0 w-20 text-right">
                    <Tooltip
                      containerClassName={point.color}
                      content={point.statTooltip}
                    >
                      <span className={`text-2xl sm:text-3xl font-black tracking-tight cursor-help ${point.color}`}>
                        {point.stat}
                      </span>
                    </Tooltip>
                  </div>
                  <div className="w-[1px] h-10 bg-white/[0.06] flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] text-slate-300 leading-snug mb-2">{point.pain}</p>
                    <div className="h-1 bg-white/[0.04] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: point.barWidth }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.12, duration: 0.8, ease: "easeOut" }}
                        className={`h-full rounded-full ${point.barColor} opacity-40`}
                      />
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </StaggerChildren>

        <RevealOnScroll delay={0.4} className="text-center mt-12">
          <p className="text-lg text-white font-semibold">
            What if you could flip every one of those numbers?
          </p>
          <p className="text-sm text-slate-500 mt-1">
            That&apos;s exactly what Preciprocal does. ↓
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}