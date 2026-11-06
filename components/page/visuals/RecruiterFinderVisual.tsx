"use client";

/**
 * Hero illustration for /recruiter-contact-finder: a floating search field
 * types a company name, then contact rows resolve one by one from skeletons
 * into a name, role, masked email and a verified check.
 * Steps: 0 typing, 1..3 one more contact resolved.
 */

import { motion } from "framer-motion";
import { BadgeCheck, Search } from "lucide-react";
import { EASE, Line, Stage, useLoop } from "./Frame";

const CONTACTS = [
  { initials: "PS", name: "Priya Shah", role: "Technical Recruiter", email: "p•••@n•••.com" },
  { initials: "MW", name: "Marcus Webb", role: "Talent Partner, Design", email: "m•••@n•••.com" },
  { initials: "ER", name: "Elena Ruiz", role: "Engineering Manager", email: "e•••@n•••.com" },
];

export default function RecruiterFinderVisual() {
  const { ref, step } = useLoop(4, 1500);

  return (
    <div ref={ref}>
      <Stage>
        {/* Search field, floating over the results */}
        <div className="relative z-10 mx-8 flex items-center gap-3 rounded-full border border-accent/30 bg-[#0d1322]/95 px-4 py-3 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)] backdrop-blur">
          <Search className="h-4 w-4 shrink-0 text-accent" />
          <motion.span
            key={step === 0 ? "typing" : "typed"}
            className="inline-block whitespace-nowrap text-[13px] font-medium text-white"
            initial={step === 0 ? { clipPath: "inset(0 100% 0 0)" } : false}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 0.8, ease: "linear", delay: 0.2 }}
          >
            Northwind
          </motion.span>
          <span className="h-4 w-px animate-pulse bg-accent/70" />
          <span className="ml-auto rounded-full bg-white/[0.05] px-2 py-0.5 text-[10px] text-slate-400">Recruiting</span>
        </div>

        {/* Results */}
        <div className="relative -mt-6 rounded-2xl border border-white/[0.08] bg-[#0a0f1c]/90 px-4 pb-4 pt-10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] backdrop-blur">
          <p className="px-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
            Contacts at Northwind
          </p>
          <ul className="mt-3 space-y-2">
            {CONTACTS.map((c, i) => {
              const resolved = step >= i + 1;
              return (
                <li
                  key={c.name}
                  className={`flex items-center gap-3 rounded-xl border p-3 transition-colors duration-500 ${
                    resolved ? "border-white/[0.08] bg-white/[0.03]" : "border-white/[0.04] bg-transparent"
                  }`}
                >
                  <div
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-[11px] font-semibold transition-colors duration-500 ${
                      resolved ? "bg-gradient-to-br from-accent-deep/50 to-accent-deep-2/40 text-white" : "bg-white/[0.05] text-transparent"
                    }`}
                  >
                    {c.initials}
                  </div>
                  <div className="relative min-w-0 flex-1">
                    <motion.div
                      initial={false}
                      animate={{ opacity: resolved ? 0 : 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 flex flex-col justify-center gap-2"
                    >
                      <Line w="w-1/2" />
                      <Line w="w-3/4" />
                    </motion.div>
                    <motion.div
                      initial={false}
                      animate={resolved ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
                      transition={{ duration: 0.4, ease: EASE }}
                    >
                      <p className="truncate text-[12px] font-semibold text-white">{c.name}</p>
                      <p className="truncate text-[11px] text-slate-400">
                        {c.role} · <span className="font-mono text-slate-500">{c.email}</span>
                      </p>
                    </motion.div>
                  </div>
                  <motion.span
                    initial={false}
                    animate={resolved ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.35, ease: EASE, delay: resolved ? 0.2 : 0 }}
                    className="inline-flex shrink-0 items-center gap-1 rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-medium text-accent-soft"
                  >
                    <BadgeCheck className="h-3 w-3" />
                    Verified
                  </motion.span>
                </li>
              );
            })}
          </ul>
        </div>
      </Stage>
    </div>
  );
}
