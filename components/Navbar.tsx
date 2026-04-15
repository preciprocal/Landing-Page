"use client";

import { useState } from "react";
import { FloatingNavbar } from "@/components/ui/FloatingNavbar";
import { NAV_LINKS, APP_URL } from "@/lib/constants";
import { MenuIcon, CloseIcon } from "@/components/Icons";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <FloatingNavbar style={{ top: "var(--banner-h, 0px)" }}>
      <div className="max-w-[1200px] mx-auto flex items-center justify-between h-[72px] px-6">
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image
            src="/logo.png"
            alt="Preciprocal"
            width={44}
            height={56}
            className="w-auto h-11 object-contain transition-transform group-hover:scale-105"
          />
          <span className="text-xl font-bold text-white tracking-tight">Preciprocal</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href} className="text-sm font-medium text-slate-400 hover:text-white transition-colors relative group">
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-indigo-500 rounded-full transition-all group-hover:w-full" />
            </a>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <a href={`${APP_URL}/sign-in`} className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Log in</a>
          <a href={`${APP_URL}/sign-up`} className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-lg text-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(99,102,241,0.3)]">Get Started Free</a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-white p-2" aria-label="Toggle menu">
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/[0.06] bg-[#050810]/95 backdrop-blur-xl px-6 py-4 space-y-3">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href} onClick={() => setOpen(false)} className="block text-base text-slate-400 hover:text-white transition-colors py-2">{link.label}</a>
          ))}
          <div className="pt-3 border-t border-white/[0.06] flex flex-col gap-3">
            <a href={`${APP_URL}/sign-in`} className="text-sm text-slate-400 hover:text-white py-2">Log in</a>
            <a href={`${APP_URL}/sign-up`} className="inline-flex items-center justify-center px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-lg text-sm text-center">Get Started Free</a>
          </div>
        </div>
      )}
    </FloatingNavbar>
  );
}