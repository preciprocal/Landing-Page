"use client";

import { motion } from "framer-motion";
import { FOOTER_COLUMNS } from "@/lib/constants";

const socials = [
  { label: "Twitter", href: "https://twitter.com/preciprocal" },
  { label: "LinkedIn", href: "https://linkedin.com/company/preciprocal" },
  { label: "GitHub", href: "https://github.com/preciprocal" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="max-w-[1200px] mx-auto px-6 pt-16 pb-10">
        {/* Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12"
        >
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
            <img src="/logo.png" alt="Preciprocal" className="w-auto h-10 object-contain" />
              <span className="text-lg font-bold text-white">Preciprocal</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed max-w-[280px]">
              The AI-powered job search operating system. Prepare smarter, apply
              faster, land offers.
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-[13px] font-semibold text-slate-400 uppercase tracking-wider mb-4">
                {col.title}
              </p>
              <div className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm text-slate-500 hover:text-slate-200 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[13px] text-slate-600">
            &copy; {new Date().getFullYear()} Preciprocal. All rights reserved.
          </p>
          <div className="flex gap-5">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-slate-600 hover:text-slate-200 transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}