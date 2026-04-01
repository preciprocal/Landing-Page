"use client";

import { motion } from "framer-motion";
import { CheckIcon } from "@/components/Icons";
import { APP_URL } from "@/lib/constants";

const PLANS = [
  {
    name: "Free",
    price: "Free",
    period: "",
    tagline: "Get started and feel the value.",
    features: [
      "5 resume analyses / month",
      "5 cover letters / month",
      "2 LinkedIn optimisations / month",
      "1 interview debrief / month",
      "2 find contacts / month",
      "3 mock interviews / month",
      "Job tracker (10 jobs)",
      "Chrome extension (limited)",
      "Basic analytics",
    ],
    cta: "Get started free",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$9.99",
    period: "/mo",
    tagline: "Everything an active job seeker needs.",
    features: [
      "20 resume analyses / month",
      "30 mock interviews / month",
      "Unlimited cover letters",
      "5 LinkedIn optimisations / month",
      "5 interview debriefs / month",
      "10 find contacts / month",
      "5 active study plans",
      "Unlimited job tracker",
      "Chrome extension (full)",
      "Resume editor + PDF & Word export",
      "Recruiter eye simulation",
      "Full analytics dashboard",
      "Priority AI responses",
    ],
    cta: "Start Pro",
    highlighted: true,
  },
  {
    name: "Premium",
    price: "$24.99",
    period: "/mo",
    tagline: "Unlimited access for serious candidates.",
    features: [
      "Unlimited everything",
      "Company-specific interview prep",
      "AI interview coach + deep analysis",
      "Post-interview improvement roadmap",
      "All Pro features included",
      "Priority support (24hr SLA)",
      "Early access to new features",
    ],
    cta: "Go Premium",
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative">
      <div className="max-w-[1100px] mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-[13px] font-semibold text-indigo-400 uppercase tracking-widest mb-3">
            Pricing
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-[42px] font-extrabold text-white tracking-tight leading-tight mb-4">
            Invest in yourself.
            <br />
            <span className="text-gradient">It pays back fast.</span>
          </motion.h2>
          <p className="text-base text-slate-400 max-w-lg mx-auto">
            The average job search costs months of lost salary. Preciprocal helps you land offers weeks faster — for less than a single coffee a day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`relative rounded-2xl p-9 ${
                plan.highlighted
                  ? "bg-gradient-to-br from-indigo-500/[0.10] to-purple-500/[0.05] border border-indigo-500/30 md:scale-[1.03]"
                  : "bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12]"
              } transition-all duration-300`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-xs font-bold text-white whitespace-nowrap">
                  Most Popular
                </div>
              )}

              <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
              <p className="text-[13px] text-slate-500 mb-4">{plan.tagline}</p>

              <div className="mb-6">
                <span className="text-5xl font-extrabold text-white tracking-tight">{plan.price}</span>
                {plan.period && (
                  <span className="text-[15px] text-slate-500 ml-1">{plan.period}</span>
                )}
              </div>

              <div className="flex flex-col gap-3.5 mb-8">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2.5 text-sm text-slate-300">
                    <CheckIcon className="flex-shrink-0 text-indigo-400" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <a href={`${APP_URL}/sign-up`}
                className={`block w-full text-center py-3.5 rounded-xl font-semibold text-[15px] transition-all duration-300 ${
                  plan.highlighted
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(99,102,241,0.3)]"
                    : "bg-white/[0.05] border border-white/[0.12] text-slate-200 hover:bg-white/[0.08] hover:border-white/20 hover:-translate-y-0.5"
                }`}>
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>

        {/* Money-back guarantee banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 p-5 bg-emerald-500/[0.06] border border-emerald-500/20 rounded-2xl max-w-2xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-[15px] font-bold text-emerald-400">30-Day Money-Back Guarantee</span>
          </div>
          <p className="text-[13px] text-slate-400 leading-relaxed">
            Land an interview within 30 days or get a full refund. No hoops, no fine print, no awkward emails.
            We&apos;re that confident this works.
          </p>
        </motion.div>

        {/* Student offer */}
        <p className="text-center text-[13px] text-slate-600 mt-5">
          University student? Verify your .edu email for{" "}
          <span className="text-slate-400 font-medium">1 month of Pro free</span>{" "}
          — no card needed.
        </p>
      </div>
    </section>
  );
}