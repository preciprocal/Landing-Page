"use client";

/**
 * components/JobsBoard.tsx
 *
 * The /jobs listing: live postings from employers' own job boards with the
 * filters an F-1 student needs (field, level, STEM OPT employer, H-1B
 * sponsor, how recent). Filters live in the URL so a search can be shared.
 * Data: app/api/tools/jobs/route.ts.
 */

import { useEffect, useRef, useState } from "react";
import { ExternalLink, Search } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import { BTN_PRIMARY_SM, BTN_SECONDARY_SM, CARD_SOLID } from "@/components/page/Layout";

interface Job {
  title: string;
  company: string;
  location: string;
  url: string;
  posted: string;
  family: string;
  level: "intern" | "early" | "mid" | "senior";
  everify: "enrolled" | "ending" | "ended" | "not-found";
  h1b: { approvals: number; newEmployment: number } | null;
}
interface Result {
  jobs: Job[];
  total: number;
  page: number;
  pages: number;
  syncedAt: string;
  h1bYear: string | null;
  maxAgeDays: number;
  totalLive: number;
  employers: number;
}

const FAMILIES = [
  ["", "All fields"],
  ["software", "Software"],
  ["data", "Data and AI"],
  ["hardware", "Hardware"],
  ["product", "Product and design"],
  ["business", "Business and finance"],
] as const;
const LEVELS = [
  ["all", "All levels"],
  ["early", "Early career"],
  ["intern", "Internships"],
] as const;
const DAYS = [
  ["", "Any time"],
  ["1", "Last 24 hours"],
  ["7", "Last 7 days"],
  ["30", "Last 30 days"],
] as const;

type Filters = { q: string; family: string; level: string; stem: boolean; h1b: boolean; days: string; page: number };
const DEFAULTS: Filters = { q: "", family: "", level: "all", stem: false, h1b: false, days: "", page: 1 };

const n = (v: number) => v.toLocaleString("en-US");
const DATE = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
function ago(iso: string) {
  const days = Math.floor((Date.now() - Date.parse(`${iso}T00:00:00Z`)) / 86_400_000);
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  return DATE.format(new Date(`${iso}T00:00:00Z`));
}
function hoursAgo(iso: string) {
  const h = Math.max(0, Math.round((Date.now() - Date.parse(iso)) / 3_600_000));
  return h < 1 ? "less than an hour ago" : h === 1 ? "1 hour ago" : `${h} hours ago`;
}

const select =
  "min-h-[40px] rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 text-sm text-slate-200 focus:outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/25 [color-scheme:dark]";

function toParams(f: Filters) {
  const p = new URLSearchParams();
  if (f.q.trim()) p.set("q", f.q.trim());
  if (f.family) p.set("family", f.family);
  if (f.level !== "all") p.set("level", f.level);
  if (f.stem) p.set("stem", "1");
  if (f.h1b) p.set("h1b", "1");
  if (f.days) p.set("days", f.days);
  if (f.page > 1) p.set("page", String(f.page));
  return p;
}

export default function JobsBoard() {
  const [f, setF] = useState<Filters>(DEFAULTS);
  const [ready, setReady] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const top = useRef<HTMLDivElement>(null);

  // Read filters from the URL after mount, so server and client agree.
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    setF({
      q: sp.get("q") ?? "",
      family: sp.get("family") ?? "",
      level: sp.get("level") ?? "all",
      stem: sp.get("stem") === "1",
      h1b: sp.get("h1b") === "1",
      days: sp.get("days") ?? "",
      page: Number(sp.get("page")) || 1,
    });
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const params = toParams(f);
    const qs = params.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
    const ctrl = new AbortController();
    setLoading(true);
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/tools/jobs?${qs}`, { signal: ctrl.signal });
        const body = await res.json();
        if (!res.ok) { setError(body.error ?? "Could not load jobs."); setResult(null); }
        else { setError(null); setResult(body as Result); }
      } catch (err) {
        if ((err as Error).name !== "AbortError") setError("Could not load jobs. Check your connection and try again.");
      } finally {
        if (!ctrl.signal.aborted) setLoading(false);
      }
    }, 250);
    return () => { clearTimeout(t); ctrl.abort(); };
  }, [f, ready]);

  const set = (patch: Partial<Filters>) => setF((cur) => ({ ...cur, ...patch, page: patch.page ?? 1 }));
  const goPage = (page: number) => { set({ page }); top.current?.scrollIntoView({ behavior: "smooth", block: "start" }); };

  return (
    <div ref={top} className="scroll-mt-28">
      {/* Filters */}
      <div className={`${CARD_SOLID} p-4 sm:p-5`}>
        <div className="relative">
          <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            type="search"
            aria-label="Search jobs"
            placeholder="Job title, company or city"
            value={f.q}
            onChange={(e) => set({ q: e.target.value })}
            className="min-h-[48px] w-full rounded-xl border border-white/[0.08] bg-white/[0.04] pl-11 pr-4 text-[15px] text-white placeholder:text-slate-500 hover:border-white/[0.14] focus:outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/25"
          />
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <select aria-label="Field" className={select} value={f.family} onChange={(e) => set({ family: e.target.value })}>
            {FAMILIES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
          <select aria-label="Level" className={select} value={f.level} onChange={(e) => set({ level: e.target.value })}>
            {LEVELS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
          <select aria-label="Posted" className={select} value={f.days} onChange={(e) => set({ days: e.target.value })}>
            {DAYS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
          <Toggle on={f.stem} onChange={(stem) => set({ stem })} label="STEM OPT employers" hint="Enrolled in E-Verify" />
          <Toggle on={f.h1b} onChange={(h1b) => set({ h1b })} label="H-1B sponsors" hint="H-1B approvals in the latest fiscal year" />
        </div>
      </div>

      {/* Results */}
      <div className="mt-5 flex flex-wrap items-baseline justify-between gap-2 text-[13px] text-slate-400" aria-live="polite">
        <p>
          {result ? (
            <>
              <span className="font-semibold text-white">{n(result.total)}</span> {result.total === 1 ? "job" : "jobs"}
              {result.total !== result.totalLive ? ` of ${n(result.totalLive)} live` : ` from ${n(result.employers)} employers`}
            </>
          ) : loading ? "Loading jobs…" : ""}
        </p>
        {result && <p>Updated {hoursAgo(result.syncedAt)}</p>}
      </div>

      {error ? (
        <p className="mt-4 rounded-xl border border-rose-400/20 bg-rose-400/[0.05] px-5 py-4 text-sm text-rose-200">{error}</p>
      ) : result && result.jobs.length === 0 ? (
        <div className="mt-4 rounded-xl border border-dashed border-white/[0.1] px-5 py-8 text-center text-sm text-slate-400">
          No jobs match these filters. Try a broader field or a longer time range.
          <div className="mt-4"><button type="button" onClick={() => setF(DEFAULTS)} className={BTN_SECONDARY_SM}>Clear filters</button></div>
        </div>
      ) : (
        <ul className={`mt-3 space-y-2.5 transition-opacity ${loading ? "opacity-60" : ""}`}>
          {result?.jobs.map((j) => <JobRow key={j.url} j={j} year={result.h1bYear} />)}
        </ul>
      )}

      {result && result.pages > 1 && (
        <nav aria-label="Pages" className="mt-6 flex items-center justify-center gap-3 text-sm text-slate-400">
          <button type="button" className={BTN_SECONDARY_SM} disabled={result.page <= 1} onClick={() => goPage(result.page - 1)}>Previous</button>
          <span>Page {result.page} of {n(result.pages)}</span>
          <button type="button" className={BTN_SECONDARY_SM} disabled={result.page >= result.pages} onClick={() => goPage(result.page + 1)}>Next</button>
        </nav>
      )}
    </div>
  );
}

function Toggle({ on, onChange, label, hint }: { on: boolean; onChange: (v: boolean) => void; label: string; hint: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      title={hint}
      onClick={() => onChange(!on)}
      className={`min-h-[40px] rounded-xl border px-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 ${
        on ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-200" : "border-white/[0.08] bg-white/[0.04] text-slate-300 hover:border-white/[0.16]"
      }`}
    >
      {on ? "✓ " : ""}{label}
    </button>
  );
}

function JobRow({ j, year }: { j: Job; year: string | null }) {
  const ev =
    j.everify === "enrolled" ? { label: "STEM OPT: E-Verify", cls: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300" }
    : j.everify === "ending" ? { label: "E-Verify ending", cls: "border-amber-400/30 bg-amber-400/10 text-amber-300" }
    : j.everify === "ended" ? { label: "E-Verify terminated", cls: "border-rose-400/30 bg-rose-400/10 text-rose-300" }
    : { label: "E-Verify not found", cls: "border-white/[0.1] bg-white/[0.03] text-slate-400" };
  const sponsor = j.h1b && j.h1b.approvals > 0;
  return (
    <li className={`${CARD_SOLID} p-4 sm:px-5`}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <a href={j.url} target="_blank" rel="noopener noreferrer" className="break-words text-[15px] font-semibold text-white hover:text-accent-soft">
            {j.title}
          </a>
          <p className="mt-0.5 text-[13px] text-slate-400">
            <span className="text-slate-300">{j.company}</span>
            {j.location ? ` · ${j.location}` : ""} · {ago(j.posted)}
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {(j.level === "intern" || j.level === "early") && (
              <span className="rounded-full border border-indigo-400/30 bg-indigo-400/10 px-2.5 py-0.5 text-[11px] font-semibold text-indigo-200">
                {j.level === "intern" ? "Internship" : "Early career"}
              </span>
            )}
            <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${ev.cls}`}>{ev.label}</span>
            <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${sponsor ? "border-sky-400/30 bg-sky-400/10 text-sky-300" : "border-white/[0.1] bg-white/[0.03] text-slate-400"}`}>
              {sponsor && j.h1b ? `H-1B: ${n(j.h1b.approvals)} approved FY${year}` : `No H-1B approvals in FY${year}`}
            </span>
          </div>
        </div>
        <div className="flex shrink-0 gap-2">
          <a href={`${APP_URL}/sign-up?tool=resume-tailoring`} className={BTN_SECONDARY_SM}>Tailor resume</a>
          <a href={j.url} target="_blank" rel="noopener noreferrer" className={BTN_PRIMARY_SM}>
            Apply <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </li>
  );
}
