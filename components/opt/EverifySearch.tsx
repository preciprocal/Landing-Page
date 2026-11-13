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
import { Check, ChevronDown, Clock, ExternalLink, Minus, Search, X } from "lucide-react";

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
        className="relative flex w-full flex-col gap-2.5 px-4 py-3.5 text-left transition-colors hover:bg-white/[0.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent/60 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-5"
      >
        <div className="min-w-0">
          <p className="break-words pr-7 text-[15px] font-semibold text-white sm:pr-0">{m.name}</p>
          {sub.length > 0 && <p className="mt-0.5 break-words text-[12px] text-slate-400">{sub.join("  ·  ")}</p>}
        </div>
        <div className="flex flex-wrap items-center gap-1.5 sm:flex-nowrap">
          <Chip tone={ev.tone}>{ev.label}</Chip>
          <Chip tone={h ? "info" : "muted"}>{h ? `H-1B · ${n(h.approvals)} in FY${h.year}` : "No H-1B record"}</Chip>
          <ChevronDown aria-hidden="true" className={`absolute right-4 top-4 h-4 w-4 shrink-0 text-slate-500 transition-transform sm:static sm:ml-1 ${open ? "rotate-180" : ""}`} />
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
            <Breakdown m={m} years={years} />
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

// ─── The breakdown: one plain answer per stage, records on request ──────────

type Verdict = { stage: string; tone: Tone; answer: string; note: string };

const ICON: Record<Tone, { Icon: typeof Check; cls: string; text: string }> = {
  good: { Icon: Check, cls: "bg-emerald-400/10 text-emerald-300", text: "text-emerald-300" },
  info: { Icon: Check, cls: "bg-emerald-400/10 text-emerald-300", text: "text-emerald-300" },
  warn: { Icon: Clock, cls: "bg-amber-400/10 text-amber-300", text: "text-amber-300" },
  bad: { Icon: X, cls: "bg-rose-400/10 text-rose-300", text: "text-rose-300" },
  muted: { Icon: Minus, cls: "bg-white/[0.05] text-slate-400", text: "text-slate-300" },
};

const year = (iso: string | null) => (iso ? iso.slice(0, 4) : "");

/** The earliest enrolment among open accounts: how long the employer has used E-Verify. */
function enrolledSince(m: Match): string | null {
  const dates = m.everify.accounts.filter((a) => a.open && a.enrolledOn).map((a) => a.enrolledOn as string).sort();
  return dates[0] ?? null;
}

function verdicts(m: Match, years: string[]): Verdict[] {
  const s = m.everify.state;
  const best = m.everify.accounts[0];
  const since = enrolledSince(m);
  const stem: Verdict =
    s === "enrolled"
      ? { stage: "STEM OPT", tone: "good", answer: "Yes", note: `Enrolled in E-Verify${since ? ` since ${year(since)}` : ""}. They must also sign your Form I-983.` }
      : s === "ending"
        ? { stage: "STEM OPT", tone: "warn", answer: `Until ${day(best.terminatesOn)}`, note: "Its E-Verify enrolment ends on that date." }
        : s === "ended"
          ? { stage: "STEM OPT", tone: "bad", answer: "Not currently", note: "Its E-Verify account was terminated. Ask whether another part of the company is enrolled." }
          : { stage: "STEM OPT", tone: "muted", answer: "Not confirmed", note: "No E-Verify record under this name. Ask the employer whether it uses E-Verify." };

  const h = latestH1b(m);
  const span = years.length ? `FY${years[years.length - 1]} to FY${years[0]}` : "recent years";
  const h1b: Verdict = h
    ? { stage: "H-1B", tone: "good", answer: "Has sponsored", note: `${n(h.approvals)} workers approved in FY${h.year}, ${n(h.newEmployment)} of them new hires.` }
    : { stage: "H-1B", tone: "muted", answer: "No record", note: `No approvals from ${span} under this name. Try the legal company name.` };

  return [
    { stage: "OPT", tone: "good", answer: "Yes", note: "No sponsorship needed. The role must be related to your major." },
    stem,
    h1b,
  ];
}

function Breakdown({ m, years }: { m: Match; years: string[] }) {
  const [details, setDetails] = useState(false);
  const hasDetails = m.everify.accounts.length > 0 || !!m.h1b;
  return (
    <div className="border-t border-white/[0.06] px-4 pb-4 pt-4 sm:px-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Can this employer hire you?</p>
      <ul className="mt-1 divide-y divide-white/[0.05]">
        {verdicts(m, years).map((v) => {
          const { Icon, cls, text } = ICON[v.tone];
          return (
            <li key={v.stage} className="flex items-start gap-3 py-3">
              <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${cls}`}>
                <Icon aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2.5} />
              </span>
              <div className="min-w-0 flex-1 sm:flex sm:gap-4">
                <p className="shrink-0 text-sm font-semibold leading-6 text-white sm:w-24">{v.stage}</p>
                <p className="text-sm leading-6">
                  <span className={`font-semibold ${text}`}>{v.answer}.</span>{" "}
                  <span className="text-slate-400">{v.note}</span>
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      {hasDetails && (
        <div className="border-t border-white/[0.05] pt-2">
          <button
            type="button"
            onClick={() => setDetails((d) => !d)}
            aria-expanded={details}
            className="inline-flex min-h-[36px] items-center gap-1 rounded-md text-[12px] font-medium text-accent-soft transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
          >
            {details ? "Hide records" : "View records"}
            <ChevronDown aria-hidden="true" className={`h-3.5 w-3.5 transition-transform ${details ? "rotate-180" : ""}`} />
          </button>
          {details && <Records m={m} />}
        </div>
      )}
    </div>
  );
}

function Records({ m }: { m: Match }) {
  return (
    <div className="mt-2 grid gap-6 pb-1 lg:grid-cols-2">
      {m.h1b && (
        <div className="min-w-0">
          <p className="text-[12px] font-semibold text-slate-300">H-1B approvals by year</p>
          <p className="mt-0.5 text-[11.5px] text-slate-500">Filed as {m.h1b.employer}. Counts are workers.</p>
          <table className="mt-2 w-full text-[12px] tabular-nums">
            <thead>
              <tr className="text-left text-slate-500">
                <th className="pb-1.5 font-medium">Fiscal year</th>
                <th className="pb-1.5 text-right font-medium">Approved</th>
                <th className="pb-1.5 text-right font-medium">New hires</th>
                <th className="pb-1.5 text-right font-medium">Denied</th>
              </tr>
            </thead>
            <tbody>
              {m.h1b.years.map((y) => (
                <tr key={y.year} className="border-t border-white/[0.05] text-slate-300">
                  <td className="py-1.5">FY{y.year}</td>
                  <td className="py-1.5 text-right">{n(y.approvals)}</td>
                  <td className="py-1.5 text-right">{n(y.newEmployment)}</td>
                  <td className="py-1.5 text-right">{n(y.denials)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {m.everify.accounts.length > 0 && (
        <div className="min-w-0">
          <p className="text-[12px] font-semibold text-slate-300">E-Verify accounts</p>
          <p className="mt-0.5 text-[11.5px] text-slate-500">Names as enrolled, reported by the employer.</p>
          <ul className="mt-2">
            {m.everify.accounts.map((a, i) => (
              <li key={i} className="flex items-baseline justify-between gap-3 border-t border-white/[0.05] py-1.5 text-[12px] first:border-t-0">
                <span className="min-w-0 break-words text-slate-300">
                  {a.employer}
                  {a.dba ? <span className="text-slate-500"> ({a.dba})</span> : null}
                </span>
                <span className="shrink-0 tabular-nums text-slate-500">
                  <span className={a.open ? "text-emerald-300" : "text-rose-300"}>{a.open ? "Enrolled" : "Terminated"}</span>
                  {a.enrolledOn ? ` · ${year(a.enrolledOn)}${a.terminatesOn ? `-${year(a.terminatesOn)}` : ""}` : ""}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
