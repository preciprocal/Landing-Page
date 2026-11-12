"use client";

/**
 * components/opt/EverifySearch.tsx
 *
 * Search-as-you-type employer check for F-1 students (see lib/everify.ts and
 * app/api/tools/everify/route.ts). For each employer it shows what matters
 * for each stage of work authorization:
 *
 *   OPT       authorised by the student's own EAD, no employer petition, so
 *             any employer qualifies if the role relates to the degree (USCIS)
 *   STEM OPT  the employer must be enrolled in and using E-Verify, and sign
 *             the I-983 training plan (USCIS, DHS Study in the States)
 *   H-1B      the employer's H-1B approvals, from the USCIS Employer Data Hub
 *
 * Records are matched on the name an employer used, so a missing record is
 * shown as "not confirmed", never as "not eligible", and H-1B history is past
 * petitions, never a promise to sponsor. The query is kept in ?q= so a search
 * can be shared.
 */

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, ExternalLink, Search } from "lucide-react";

const EVERIFY_SEARCH = "https://www.e-verify.gov/e-verify-employer-search";
const H1B_HUB = "https://www.uscis.gov/tools/reports-and-studies/h-1b-employer-data-hub";
const EXAMPLES = ["Google", "Deloitte", "Stripe", "Northeastern University"];
const DEBOUNCE_MS = 250;

type EverifyState = "enrolled" | "ending" | "ended" | "not-found";
interface Account {
  employer: string;
  dba: string | null;
  open: boolean;
  enrolledOn: string | null;
  terminatesOn: string | null;
  workforce: string | null;
}
interface H1bYear {
  year: string;
  newEmployment: number;
  approvals: number;
  denials: number;
}
interface Match {
  name: string;
  enrolledAs: string | null;
  exact: boolean;
  everify: { state: EverifyState; accounts: Account[] };
  h1b: { employer: string; years: H1bYear[] } | null;
}
interface Result {
  query: string;
  matches: Match[];
  everify: { records: number; sourceUpdated: string | null };
  h1b: { employers: number; years: string[]; dataThrough: string | null } | null;
}

const input =
  "min-h-[52px] w-full min-w-0 rounded-xl bg-white/[0.04] border border-white/[0.08] pl-11 pr-4 py-3 text-[15px] text-white placeholder:text-slate-500 transition-colors hover:border-white/[0.14] focus:outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/25";
const link = "text-accent-soft underline underline-offset-4 hover:text-white";

const DATE = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
const day = (iso: string | null) => (iso ? DATE.format(new Date(`${iso}T00:00:00Z`)) : "");
const n = (v: number) => v.toLocaleString("en-US");

type Tone = "good" | "warn" | "bad" | "info" | "muted";
const TONE: Record<Tone, string> = {
  good: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  warn: "border-amber-400/30 bg-amber-400/10 text-amber-300",
  bad: "border-rose-400/30 bg-rose-400/10 text-rose-300",
  info: "border-sky-400/30 bg-sky-400/10 text-sky-300",
  muted: "border-white/[0.1] bg-white/[0.03] text-slate-400",
};

function Chip({ tone, children }: { tone: Tone; children: React.ReactNode }) {
  return (
    <span className={`inline-flex w-fit shrink-0 items-center whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] font-semibold ${TONE[tone]}`}>
      {children}
    </span>
  );
}

function everifyChip(m: Match): { tone: Tone; label: string } {
  const s = m.everify.state;
  if (s === "enrolled") return { tone: "good", label: "E-Verify enrolled" };
  if (s === "ending") return { tone: "warn", label: `E-Verify until ${day(m.everify.accounts[0].terminatesOn)}` };
  if (s === "ended") return { tone: "bad", label: "E-Verify terminated" };
  return { tone: "muted", label: "E-Verify not found" };
}

function latestH1b(m: Match): H1bYear | null {
  return m.h1b?.years.find((y) => y.approvals > 0) ?? null;
}

export default function EverifySearch() {
  const [q, setQ] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();
  const abort = useRef<AbortController | null>(null);

  // Read ?q= after mount so the server render and the client agree.
  useEffect(() => {
    const initial = new URLSearchParams(window.location.search).get("q");
    if (initial) setQ(initial);
  }, []);

  useEffect(() => {
    const term = q.trim();
    const url = new URL(window.location.href);
    if (term) url.searchParams.set("q", term);
    else url.searchParams.delete("q");
    window.history.replaceState(null, "", url);

    abort.current?.abort();
    if (term.replace(/[^a-z0-9]/gi, "").length < 2) {
      setResult(null);
      setError(null);
      setLoading(false);
      return;
    }
    const ctrl = new AbortController();
    abort.current = ctrl;
    setLoading(true);
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/tools/everify?q=${encodeURIComponent(term)}`, { signal: ctrl.signal });
        const body = await res.json();
        if (!res.ok) {
          setError(body.error ?? "Search failed. Try again.");
          setResult(null);
        } else {
          setError(null);
          setResult(body as Result);
          setOpen(0);
        }
      } catch (err) {
        if ((err as Error).name !== "AbortError") setError("Search failed. Check your connection and try again.");
      } finally {
        if (!ctrl.signal.aborted) setLoading(false);
      }
    }, DEBOUNCE_MS);
    return () => {
      clearTimeout(t);
      ctrl.abort();
    };
  }, [q]);

  const fade = {
    initial: reduce ? false : { opacity: 0, y: 6 },
    animate: { opacity: 1, y: 0 },
    exit: reduce ? undefined : { opacity: 0 },
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] as const },
  };

  const coverage = result
    ? `${n(result.everify.records)} E-Verify records${result.h1b ? ` and ${n(result.h1b.employers)} H-1B employers` : ""}`
    : "Over 1.2 million E-Verify records and H-1B history for US employers";

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#070b16]">
      <div className="border-b border-white/[0.06] p-6 sm:p-8">
        <p className="text-lg font-semibold text-white">Employer lookup</p>
        <p className="mt-1.5 text-[12px] text-slate-400">{coverage}.</p>

        <div className="relative mt-5">
          <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            type="search"
            inputMode="search"
            autoComplete="off"
            spellCheck={false}
            aria-label="Company name"
            placeholder="Search by company name"
            className={input}
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          {loading && (
            <span
              aria-hidden="true"
              className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin rounded-full border-2 border-white/15 border-t-accent-soft"
            />
          )}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2 text-[12px] text-slate-400">
          <span>Examples</span>
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => setQ(ex)}
              className="min-h-[32px] rounded-full border border-white/[0.08] bg-white/[0.02] px-3 text-slate-300 transition-colors hover:border-white/[0.16] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
            >
              {ex}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white/[0.015] p-4 sm:p-8" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          {error ? (
            <motion.p key="error" {...fade} className="rounded-xl border border-rose-400/20 bg-rose-400/[0.05] px-5 py-4 text-sm text-rose-200">
              {error}
            </motion.p>
          ) : !result ? (
            <motion.p key="empty" {...fade} className="rounded-xl border border-dashed border-white/[0.08] px-5 py-6 text-sm text-slate-400">
              Enter a company name to see whether it can employ you on OPT, STEM OPT and H-1B, based on its E-Verify enrolment
              and H-1B record.
            </motion.p>
          ) : result.matches.length === 0 ? (
            <motion.div key={`none-${result.query}`} {...fade} className="rounded-xl border border-white/[0.08] px-5 py-5 text-sm text-slate-300">
              <p className="font-medium text-white">No records match &ldquo;{result.query}&rdquo;.</p>
              <p className="mt-1.5 text-slate-400">
                Employers are listed under the name they used with USCIS, such as a legal name, trade name or abbreviation. Try
                an alternative name, or check the{" "}
                <a href={EVERIFY_SEARCH} target="_blank" rel="noopener noreferrer" className={link}>
                  official E-Verify search
                </a>
                .
              </p>
            </motion.div>
          ) : (
            <motion.ul key={`list-${result.query}`} {...fade} className="space-y-3">
              {result.matches.map((m, i) => (
                <MatchRow
                  key={`${m.name}-${i}`}
                  m={m}
                  years={result.h1b?.years ?? []}
                  open={open === i}
                  onToggle={() => setOpen(open === i ? null : i)}
                />
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        <p className="mt-5 text-[11px] leading-relaxed text-slate-400">
          Sources:{" "}
          <a href={EVERIFY_SEARCH} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-0.5 ${link}`}>
            USCIS E-Verify Employer Search
            <ExternalLink aria-hidden="true" className="h-3 w-3" />
          </a>
          {result?.everify.sourceUpdated ? ` (current as of ${day(result.everify.sourceUpdated)})` : ""} and{" "}
          <a href={H1B_HUB} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-0.5 ${link}`}>
            USCIS H-1B Employer Data Hub
            <ExternalLink aria-hidden="true" className="h-3 w-3" />
          </a>
          {result?.h1b?.dataThrough ? ` (through ${day(result.h1b.dataThrough)})` : ""}. E-Verify records are self-reported by
          employers. H-1B figures count workers approved on USCIS&apos;s first decision and show past petitions, not whether an
          employer will sponsor you. For reference only; Preciprocal is not affiliated with USCIS or the Department of Homeland
          Security.
        </p>
      </div>
    </div>
  );
}

function MatchRow({ m, years, open, onToggle }: { m: Match; years: string[]; open: boolean; onToggle: () => void }) {
  const reduce = useReducedMotion();
  const ev = everifyChip(m);
  const h = latestH1b(m);
  const best = m.everify.accounts[0];
  const sub = [
    m.enrolledAs && `Enrolled as ${m.enrolledAs}`,
    best?.workforce && `Workforce ${best.workforce}`,
    !best && m.h1b && `Files H-1B petitions as ${m.h1b.employer}`,
  ].filter(Boolean);

  return (
    <li className="overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.02]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full flex-col gap-2.5 px-4 py-3.5 text-left transition-colors hover:bg-white/[0.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent/60 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-5"
      >
        <div className="min-w-0">
          <p className="break-words text-[15px] font-semibold text-white">{m.name}</p>
          {sub.length > 0 && <p className="mt-0.5 break-words text-[12px] text-slate-400">{sub.join("  ·  ")}</p>}
        </div>
        <div className="flex flex-wrap items-center gap-1.5 sm:flex-nowrap">
          <Chip tone={ev.tone}>{ev.label}</Chip>
          <Chip tone={h ? "info" : "muted"}>{h ? `H-1B · ${n(h.approvals)} in FY${h.year}` : "No H-1B record"}</Chip>
          <ChevronDown aria-hidden="true" className={`ml-1 h-4 w-4 shrink-0 text-slate-500 transition-transform ${open ? "rotate-180" : ""}`} />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="border-t border-white/[0.06] px-4 pb-4 pt-4 sm:px-5 sm:pb-5">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Work authorisation</p>
              <div className="grid gap-3 lg:grid-cols-3">
                <Stage title="OPT" chip={<Chip tone="good">No sponsorship needed</Chip>}>
                  OPT is authorised by your own EAD, so no petition from the employer is needed. The role must be directly
                  related to your major.
                </Stage>
                <StemStage m={m} />
                <H1bStage m={m} years={years} />
              </div>

              {m.everify.accounts.length > 0 && (
                <div className="mt-4">
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">E-Verify records</p>
                  <ul className="space-y-1.5 border-l border-white/[0.08] pl-3">
                    {m.everify.accounts.map((a, i) => (
                      <li key={i} className="text-[12px] text-slate-400">
                        <span className="text-slate-300">{a.employer}</span>
                        {a.dba ? ` (${a.dba})` : ""}
                        {" · "}
                        <span className={a.open ? "text-emerald-300" : "text-rose-300"}>{a.open ? "Enrolled" : "Terminated"}</span>
                        {a.enrolledOn ? ` · enrolled ${day(a.enrolledOn)}` : ""}
                        {a.terminatesOn ? ` · ${a.open ? "active until" : "terminated"} ${day(a.terminatesOn)}` : ""}
                        {a.workforce ? ` · ${a.workforce}` : ""}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

function Stage({ title, chip, children }: { title: string; chip: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-white/[0.06] bg-[#070b16] p-4">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-semibold text-white">{title}</p>
        {chip}
      </div>
      <div className="text-[12.5px] leading-relaxed text-slate-400">{children}</div>
    </div>
  );
}

function StemStage({ m }: { m: Match }) {
  const s = m.everify.state;
  const best = m.everify.accounts[0];
  const chip =
    s === "enrolled" ? (
      <Chip tone="good">Meets E-Verify rule</Chip>
    ) : s === "ending" ? (
      <Chip tone="warn">Until {day(best.terminatesOn)}</Chip>
    ) : s === "ended" ? (
      <Chip tone="bad">E-Verify terminated</Chip>
    ) : (
      <Chip tone="muted">Not confirmed</Chip>
    );
  const body =
    s === "enrolled"
      ? `Enrolled in E-Verify${best.enrolledOn ? ` since ${day(best.enrolledOn)}` : ""}, which STEM OPT requires.`
      : s === "ending"
        ? `Enrolled in E-Verify until ${day(best.terminatesOn)}. After that it no longer meets the STEM OPT requirement.`
        : s === "ended"
          ? `The E-Verify account under this name was terminated${best.terminatesOn ? ` on ${day(best.terminatesOn)}` : ""}. Ask whether another entity of the company is enrolled.`
          : "No E-Verify record under this name. The company may be enrolled under a legal or trade name, so confirm with the employer.";
  return (
    <Stage title="STEM OPT" chip={chip}>
      {body} The employer must also sign your Form I-983 training plan.
    </Stage>
  );
}

function H1bStage({ m, years }: { m: Match; years: string[] }) {
  const h = latestH1b(m);
  const span = years.length ? `FY${years[years.length - 1]} to FY${years[0]}` : "the years on record";
  if (!m.h1b || !h) {
    return (
      <Stage title="H-1B" chip={<Chip tone="muted">No record</Chip>}>
        No H-1B approvals under this name from {span}. Petitions are filed under the legal entity, so try the company&apos;s
        legal name before drawing conclusions.
      </Stage>
    );
  }
  return (
    <Stage title="H-1B" chip={<Chip tone="info">Has sponsored</Chip>}>
      <p>
        {n(h.approvals)} H-1B workers approved in FY{h.year}, {n(h.newEmployment)} of them for new employment
        {m.h1b.employer.toLowerCase() !== m.name.toLowerCase() ? `, filed as ${m.h1b.employer}` : ""}.
      </p>
      <table className="mt-2.5 w-full text-[11.5px] tabular-nums">
        <thead>
          <tr className="text-left text-slate-500">
            <th className="pb-1 font-medium">Year</th>
            <th className="pb-1 text-right font-medium">Approved</th>
            <th className="pb-1 text-right font-medium">New</th>
            <th className="pb-1 text-right font-medium">Denied</th>
          </tr>
        </thead>
        <tbody>
          {m.h1b.years.map((y) => (
            <tr key={y.year} className="border-t border-white/[0.05] text-slate-300">
              <td className="py-1">FY{y.year}</td>
              <td className="py-1 text-right">{n(y.approvals)}</td>
              <td className="py-1 text-right">{n(y.newEmployment)}</td>
              <td className="py-1 text-right">{n(y.denials)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Stage>
  );
}
