/**
 * app/not-found.tsx
 * Branded 404 page, helpful links, no dead ends.
 * Next.js automatically uses this for any unmatched route.
 *
 * Layout: one calm centred column over a masked grid and an accent glow, a
 * large 404 in the accent gradient, then the helpful links as a ruled grid.
 */

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chevron from "@/components/Chevron";
import { APP_URL } from "@/lib/constants";
import { ACCENT_TEXT, BTN_PRIMARY, GRID_BG, HoverRule, PAD } from "@/components/page/Layout";

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
    <div data-accent="indigo" className="flex min-h-screen flex-col bg-[#050810]">
      <Navbar />

      <main className={`relative flex flex-1 items-center justify-center overflow-hidden py-28 sm:py-32 ${PAD}`}>
        {/* Grid and glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_55%_50%_at_50%_42%,black,transparent)]"
          style={GRID_BG}
        />

        <div className="relative mx-auto w-full max-w-2xl animate-fade-up text-center opacity-0">
          <p
            aria-hidden="true"
            className={`select-none font-mono text-[112px] font-bold leading-none tracking-tight sm:text-[168px] ${ACCENT_TEXT}`}
          >
            404
          </p>
          <div aria-hidden="true" className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

          <h1 className="mt-8 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">Page not found</h1>
          <p className="mx-auto mt-3 max-w-sm text-base leading-relaxed text-slate-400">
            This page doesn&apos;t exist or may have moved. Here are some places
            that do:
          </p>

          {/* Quick links */}
          <nav aria-label="Helpful links" className="mt-10">
            <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] text-left sm:grid-cols-3 fill-2 fill-sm-3">
              {links.map((l, i) => (
                <li key={l.label} className={`bg-[#070b16] ${i === links.length - 1 ? "col-span-2 sm:col-span-3" : ""}`}>
                  <Link
                    href={l.href}
                    className="group relative flex min-h-[48px] items-center justify-between gap-3 px-4 py-3 text-sm font-medium text-slate-300 transition-colors duration-300 hover:bg-[#0a1020] hover:text-white focus-visible:bg-[#0a1020] focus-visible:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-accent/60"
                  >
                    {l.label}
                    <Chevron className="text-slate-500 group-hover:text-accent-soft" />
                    <HoverRule className="inset-x-4" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Primary CTA */}
          <div className="mt-10">
            <Link href={`${APP_URL}/sign-up`} className={BTN_PRIMARY}>
              Get started free, it&apos;s the right page
              <Chevron />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
