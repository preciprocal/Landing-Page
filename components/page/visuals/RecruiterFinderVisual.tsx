"use client";

/**
 * Hero illustration for /recruiter-contact-finder: the contact finder in the
 * product. A search field types a company name over a results card; the
 * contacts at that company are listed with name and role, and each email
 * resolves in turn from "Finding email" to a masked address with a verified
 * badge. The finished state offers to draft an intro.
 * Steps: 0 typing, 1..3 one more email found (3 is the finished state).
 * Names and companies are fictional examples; emails stay masked.
 */

import { motion } from "framer-motion";
import { BadgeCheck, Mail, Search, Send } from "lucide-react";
import { Chip, EASE, PulseDot, SURFACE, Stage, useLoop } from "./Frame";

const CONTACTS = [
  { initials: "PS", name: "Priya Shah", role: "Technical Recruiter", email: "p•••@n•••.com", tone: "from-sky-400 to-indigo-500" },
  { initials: "MW", name: "Marcus Webb", role: "Talent Partner, Design", email: "m•••@n•••.com", tone: "from-amber-400 to-rose-500" },
  { initials: "ER", name: "Elena Ruiz", role: "Engineering Manager", email: "e•••@n•••.com", tone: "from-emerald-400 to-teal-500" },
];

export default function RecruiterFinderVisual() {
  const { ref, step } = useLoop(4, 1700);
  const found = Math.min(step, CONTACTS.length);

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
          <span className="ml-auto rounded-full bg-white/[0.06] px-2.5 py-0.5 text-[10.5px] font-medium text-slate-300">Recruiting and design</span>
        </div>

        {/* Results */}
        <div className={`relative -mt-6 px-4 pb-4 pt-10 ${SURFACE}`}>
          <div className="flex items-center justify-between px-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Contacts at Northwind</p>
            <span className="text-[10.5px] font-medium text-slate-400">
              {found} of {CONTACTS.length} emails found
            </span>
          </div>
          <ul className="mt-3 space-y-2">
            {CONTACTS.map((c, i) => {
              const resolved = step >= i + 1;
              return (
                <li
                  key={c.name}
                  className={`flex items-center gap-3 rounded-xl border p-3 transition-colors duration-500 ${
                    resolved ? "border-white/[0.09] bg-white/[0.035]" : "border-white/[0.06] bg-white/[0.015]"
                  }`}
                >
                  <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br text-[11px] font-bold text-white ${c.tone}`}>
                    {c.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[12.5px] font-semibold text-white">{c.name}</p>
                    <p className="flex items-center gap-1.5 truncate text-[11px] text-slate-400">
                      {c.role} ·
                      {resolved ? (
                        <motion.span
                          initial={{ opacity: 0, x: -4 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, ease: EASE }}
                          className="inline-flex items-center gap-1 font-mono text-slate-300"
                        >
                          <Mail className="h-3 w-3 text-accent" />
                          {c.email}
                        </motion.span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-slate-400">
                          <PulseDot className="scale-75" /> Finding email
                        </span>
                      )}
                    </p>
                  </div>
                  <motion.span
                    initial={false}
                    animate={resolved ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.35, ease: EASE, delay: resolved ? 0.2 : 0 }}
                    className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10.5px] font-medium text-emerald-300"
                  >
                    <BadgeCheck className="h-3 w-3" />
                    Verified
                  </motion.span>
                </li>
              );
            })}
          </ul>
        </div>

        <Chip show={step === 3} className="-bottom-4 right-6">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-accent/20 text-accent">
            <Send className="h-3 w-3" />
          </span>
          Draft intro to Priya
        </Chip>
      </Stage>
    </div>
  );
}
