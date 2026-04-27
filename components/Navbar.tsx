"use client";

import { useState, useRef, useEffect } from "react";
import { FloatingNavbar } from "@/components/ui/FloatingNavbar";
import { APP_URL } from "@/lib/constants";
import { MenuIcon, CloseIcon } from "@/components/Icons";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

// ─── Dropdown menu data ───────────────────────────────────────────────────────

const PREP_LINKS = [
  {
    group: "Tech & Engineering",
    items: [
      { label: "Software Engineer",   href: "/interview-questions/software-engineer" },
      { label: "Product Manager",     href: "/interview-questions/product-manager" },
      { label: "Data Scientist",      href: "/interview-questions/data-scientist" },
      { label: "Frontend Developer",  href: "/interview-questions/frontend-developer" },
      { label: "ML Engineer",         href: "/interview-questions/machine-learning-engineer" },
      { label: "DevOps Engineer",     href: "/interview-questions/devops-engineer" },
    ],
    seeAllLabel: "All 40+ roles →",
    seeAllHref: "/interview-questions",
  },
  {
    group: "Business, Finance & More",
    items: [
      { label: "Financial Analyst",      href: "/interview-questions/financial-analyst" },
      { label: "Investment Banker",      href: "/interview-questions/investment-banker" },
      { label: "Management Consultant",  href: "/interview-questions/management-consultant" },
      { label: "Marketing Manager",      href: "/interview-questions/marketing-manager" },
      { label: "Sales Manager",          href: "/interview-questions/sales-manager" },
      { label: "HR Manager",             href: "/interview-questions/hr-manager" },
    ],
    seeAllLabel: "Browse all roles →",
    seeAllHref: "/interview-questions",
  },
  {
    group: "Company Prep",
    items: [
      { label: "Google",    href: "/interview-prep/google" },
      { label: "Amazon",    href: "/interview-prep/amazon" },
      { label: "Meta",      href: "/interview-prep/meta" },
      { label: "Microsoft", href: "/interview-prep/microsoft" },
      { label: "Stripe",    href: "/interview-prep/stripe" },
      { label: "Apple",     href: "/interview-prep/apple" },
    ],
    seeAllLabel: "All companies →",
    seeAllHref: "/interview-prep",
  },
];

const RESOURCES_GROUPS = [
  {
    group: "Career Tools",
    items: [
      { label: "Free ATS Checker",      href: "/free-ats-checker",      sub: "Score your resume in 60s" },
      { label: "Resume Tips by Role",   href: "/resume-tips",           sub: "ATS keywords & bullet formulas" },
      { label: "Cover Letter Examples", href: "/cover-letter-examples", sub: "Annotated templates for every role" },
      { label: "Salary Guide 2026",     href: "/salary-guide",          sub: "Ranges, equity & negotiation scripts" },
    ],
  },
  {
    group: "Learn",
    items: [
      { label: "Blog", href: "/blog", sub: "Interview & career guides" },
      { label: "FAQ",  href: "/faq",  sub: "Common questions answered" },
    ],
  },
];

const FLAT_NAV = [
  { label: "Features",     href: "/#features" },
  { label: "How it Works", href: "/#how-it-works" },
  { label: "Pricing",      href: "/#pricing" },
];

// ─── Dropdown component ───────────────────────────────────────────────────────

function NavDropdown({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 text-sm font-medium text-slate-400 hover:text-white transition-colors group"
        aria-expanded={open}
        aria-haspopup="true"
      >
        {label}
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
        <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-indigo-500 rounded-full transition-all group-hover:w-full" />
      </button>

      {open && (
        <div
          className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50"
          style={{ minWidth: "720px" }}
        >
          {/* Arrow */}
          <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0d1224] border-l border-t border-white/[0.08] rotate-45 z-10" />

          <div className="relative bg-[#0d1224] border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/50 overflow-hidden">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Prep mega-dropdown panel ─────────────────────────────────────────────────

function PrepDropdown() {
  return (
    <NavDropdown label="Interview Prep">
      <div className="grid grid-cols-3 gap-0 p-2">
        {PREP_LINKS.map((group) => (
          <div key={group.group} className="p-4">
            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-3">
              {group.group}
            </p>
            <ul className="space-y-1">
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block text-[13px] text-slate-300 hover:text-white hover:bg-white/[0.04] rounded-lg px-2 py-1.5 transition-all"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={group.seeAllHref}
              className="inline-block mt-3 text-[12px] text-indigo-400 hover:text-indigo-300 font-medium transition-colors px-2"
            >
              {group.seeAllLabel}
            </Link>
          </div>
        ))}
      </div>
    </NavDropdown>
  );
}

// ─── Resources dropdown ───────────────────────────────────────────────────────

function ResourcesDropdown() {
  return (
    <NavDropdown label="Resources">
      <div className="grid grid-cols-2 gap-0 p-2">
        {RESOURCES_GROUPS.map((group) => (
          <div key={group.group} className="p-4">
            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-3">
              {group.group}
            </p>
            <ul className="space-y-1">
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex flex-col px-2 py-2 rounded-lg hover:bg-white/[0.04] transition-all group"
                  >
                    <span className="text-[13px] text-slate-300 group-hover:text-white font-medium transition-colors">
                      {item.label}
                    </span>
                    <span className="text-[11px] text-slate-600 mt-0.5">{item.sub}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </NavDropdown>
  );
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpandedGroup, setMobileExpandedGroup] = useState<string | null>(null);

  return (
    <FloatingNavbar style={{ top: "var(--banner-h, 0px)" }}>
      {/* Desktop */}
      <div className="max-w-[1200px] mx-auto flex items-center justify-between h-[72px] px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
          <Image
            src="/logo.png"
            alt="Preciprocal"
            width={36}
            height={36}
            className="w-9 h-9 rounded-[10px] transition-transform group-hover:scale-105"
          />
          <span className="text-xl font-bold text-white tracking-tight">Preciprocal</span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-7">
          {FLAT_NAV.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-indigo-500 rounded-full transition-all group-hover:w-full" />
            </a>
          ))}
          <PrepDropdown />
          <ResourcesDropdown />
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={`${APP_URL}/sign-in`}
            className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            Log in
          </a>
          <a
            href={`${APP_URL}/sign-up`}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-lg text-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(99,102,241,0.3)]"
          >
            Get Started Free
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/[0.06] bg-[#050810]/95 backdrop-blur-xl px-6 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
          {/* Flat links */}
          {FLAT_NAV.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-base text-slate-400 hover:text-white transition-colors py-2.5 border-b border-white/[0.04]"
            >
              {link.label}
            </a>
          ))}

          {/* Interview Prep accordion */}
          <div className="border-b border-white/[0.04]">
            <button
              onClick={() =>
                setMobileExpandedGroup(
                  mobileExpandedGroup === "prep" ? null : "prep"
                )
              }
              className="w-full flex items-center justify-between text-base text-slate-400 hover:text-white py-2.5 transition-colors"
            >
              <span>Interview Prep</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${mobileExpandedGroup === "prep" ? "rotate-180" : ""}`}
              />
            </button>
            {mobileExpandedGroup === "prep" && (
              <div className="pb-3 space-y-4">
                {PREP_LINKS.map((group) => (
                  <div key={group.group}>
                    <p className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest mb-2 pl-2">
                      {group.group}
                    </p>
                    <div className="space-y-0.5">
                      {group.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="block text-[14px] text-slate-400 hover:text-white py-1.5 pl-2 rounded-lg hover:bg-white/[0.04] transition-all"
                        >
                          {item.label}
                        </Link>
                      ))}
                      <Link
                        href={group.seeAllHref}
                        onClick={() => setMobileOpen(false)}
                        className="block text-[13px] text-indigo-400 py-1.5 pl-2 font-medium"
                      >
                        {group.seeAllLabel}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Resources accordion */}
          <div className="border-b border-white/[0.04]">
            <button
              onClick={() =>
                setMobileExpandedGroup(
                  mobileExpandedGroup === "resources" ? null : "resources"
                )
              }
              className="w-full flex items-center justify-between text-base text-slate-400 hover:text-white py-2.5 transition-colors"
            >
              <span>Resources</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${mobileExpandedGroup === "resources" ? "rotate-180" : ""}`}
              />
            </button>
            {mobileExpandedGroup === "resources" && (
              <div className="pb-3 space-y-4">
                {RESOURCES_GROUPS.map((group) => (
                  <div key={group.group}>
                    <p className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest mb-2 pl-2">
                      {group.group}
                    </p>
                    <div className="space-y-0.5">
                      {group.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="block text-[14px] text-slate-400 hover:text-white py-1.5 pl-2 rounded-lg hover:bg-white/[0.04] transition-all"
                        >
                          {item.label}
                          <span className="block text-[11px] text-slate-600 mt-0.5">{item.sub}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* CTAs */}
          <div className="pt-3 flex flex-col gap-3">
            <a
              href={`${APP_URL}/sign-in`}
              className="text-sm text-slate-400 hover:text-white py-2"
            >
              Log in
            </a>
            <a
              href={`${APP_URL}/sign-up`}
              className="inline-flex items-center justify-center px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-lg text-sm text-center"
            >
              Get Started Free
            </a>
          </div>
        </div>
      )}
    </FloatingNavbar>
  );
}