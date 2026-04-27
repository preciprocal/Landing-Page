/**
 * app/not-found.tsx
 * Branded 404 page — helpful links, no dead ends.
 * Next.js automatically uses this for any unmatched route.
 */

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { APP_URL } from "@/lib/constants";

export default function NotFound() {
  const links = [
    { label: "Home", href: "/" },
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Free ATS Checker", href: "/free-ats-checker" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <div className="min-h-screen bg-[#050810] flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="max-w-xl mx-auto text-center">
          {/* Glowing 404 */}
          <div className="relative inline-block mb-8">
            <span
              className="text-[120px] sm:text-[160px] font-extrabold leading-none select-none"
              style={{
                background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(192,132,252,0.15))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              404
            </span>
            {/* Glow behind */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at center, rgba(99,102,241,0.12) 0%, transparent 70%)",
                filter: "blur(20px)",
              }}
            />
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            Page not found
          </h1>
          <p className="text-slate-400 text-base mb-10 max-w-sm mx-auto">
            This page doesn't exist or may have moved. Here are some places
            that do:
          </p>

          {/* Quick links */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] hover:text-white transition-all"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Primary CTA */}
          <Link
            href={`${APP_URL}/sign-up`}
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-lg text-sm hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(99,102,241,0.3)] transition-all"
          >
            Get started free — it's the right page
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}