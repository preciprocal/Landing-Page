/**
 * components/opt/H1bSponsorData.tsx
 *
 * Server-side helpers and tables for the /opt/h1b-sponsors pages: per-year
 * totals across an employer's filing names, and the two tables (one employer
 * by year; every listed employer for the latest year).
 */

import Link from "next/link";
import type { EmployerProfile, EverifyState } from "@/lib/everify";
import { CARD, LABEL, SMALL } from "@/components/page/Layout";

export const fmt = (n: number) => n.toLocaleString("en-US");
export const fy = (year: string) => `FY${year}`;

export interface YearTotal {
  year: string;
  approvals: number;
  newEmployment: number;
  denials: number;
}

/** Per fiscal year, newest first, summed across the filing names found. */
export function yearTotals(p: EmployerProfile): YearTotal[] {
  return p.years.map((year) => {
    const t = { year, approvals: 0, newEmployment: 0, denials: 0 };
    for (const e of p.entities) {
      const y = e.years.find((x) => x.year === year);
      if (!y) continue;
      t.approvals += y.approvals;
      t.newEmployment += y.newEmployment;
      t.denials += y.denials;
    }
    return t;
  });
}

/** The best E-Verify state among the names checked: enrolled beats ending beats ended. */
export function everifyState(p: EmployerProfile): { state: EverifyState; name: string | null } {
  for (const s of ["enrolled", "ending", "ended"] as const) {
    const hit = p.everify.find((e) => e.state === s);
    if (hit) return { state: s, name: hit.name };
  }
  return { state: "not-found", name: null };
}

export const EVERIFY_LABEL: Record<EverifyState, string> = {
  enrolled: "Enrolled",
  ending: "Enrolment ending",
  ended: "Enrolment ended",
  "not-found": "Not found",
};

export const longDate = (iso: string | null) =>
  iso ? new Date(`${iso.slice(0, 10)}T00:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }) : null;

const TH = "px-4 py-3 text-left font-medium text-slate-400 whitespace-nowrap";
const TD = "px-4 py-3 text-left text-slate-300 tabular-nums whitespace-nowrap";

/** One employer: a row per fiscal year, then a row per filing name for the latest year. */
export function EmployerYearTable({ profile, name, note }: { profile: EmployerProfile; name: string; note?: string }) {
  const totals = yearTotals(profile);
  const latest = profile.years[0];
  const multi = profile.entities.length > 1;
  return (
    <div className={`${CARD} overflow-hidden`}>
      <div className="overflow-x-auto">
        <table className="w-full text-[15px]">
          <caption className={`px-4 pt-4 text-left ${LABEL} text-slate-500`}>{name}: H-1B workers approved, by fiscal year</caption>
          <thead>
            <tr className="border-b border-white/[0.07]">
              <th scope="col" className={TH}>Fiscal year</th>
              <th scope="col" className={TH}>Approved</th>
              <th scope="col" className={TH}>New employment</th>
              <th scope="col" className={TH}>Denied</th>
            </tr>
          </thead>
          <tbody>
            {totals.map((t) => (
              <tr key={t.year} className="border-b border-white/[0.05] last:border-0">
                <th scope="row" className={`${TD} font-medium text-white`}>{fy(t.year)}</th>
                <td className={TD}>{fmt(t.approvals)}</td>
                <td className={TD}>{fmt(t.newEmployment)}</td>
                <td className={TD}>{fmt(t.denials)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {multi && latest && (
        <div className="overflow-x-auto border-t border-white/[0.07]">
          <table className="w-full text-[14px]">
            <caption className={`px-4 pt-4 text-left ${LABEL} text-slate-500`}>{fy(latest)} by filing name</caption>
            <thead>
              <tr className="border-b border-white/[0.07]">
                <th scope="col" className={TH}>Filing name</th>
                <th scope="col" className={TH}>Approved</th>
                <th scope="col" className={TH}>New employment</th>
              </tr>
            </thead>
            <tbody>
              {profile.entities.map((e) => {
                const y = e.years.find((x) => x.year === latest);
                return (
                  <tr key={e.name} className="border-b border-white/[0.05] last:border-0">
                    <th scope="row" className={`${TD} font-normal`}>{e.name}</th>
                    <td className={TD}>{fmt(y?.approvals ?? 0)}</td>
                    <td className={TD}>{fmt(y?.newEmployment ?? 0)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      <p className={`border-t border-white/[0.07] px-4 py-3 ${SMALL}`}>
        Source: USCIS H-1B Employer Data Hub{profile.h1bDataThrough ? `, data through ${longDate(profile.h1bDataThrough)}` : ""}. Counts are
        workers on first decision.{note ? ` ${note}` : ""}
      </p>
    </div>
  );
}

export interface SponsorRow {
  slug: string;
  name: string;
  approvals: number;
  newEmployment: number;
  everify: EverifyState;
}

/** Every listed employer for the latest fiscal year, most approvals first. */
export function SponsorListTable({ rows, year }: { rows: SponsorRow[]; year: string }) {
  return (
    <div className={`${CARD} overflow-hidden`}>
      <div className="overflow-x-auto">
        <table className="w-full text-[15px]">
          <caption className={`px-4 pt-4 text-left ${LABEL} text-slate-500`}>H-1B workers approved in {fy(year)}</caption>
          <thead>
            <tr className="border-b border-white/[0.07]">
              <th scope="col" className={TH}>#</th>
              <th scope="col" className={TH}>Employer</th>
              <th scope="col" className={TH}>Approved</th>
              <th scope="col" className={TH}>New employment</th>
              <th scope="col" className={TH}>E-Verify</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.slug} className="border-b border-white/[0.05] last:border-0">
                <td className={`${TD} text-slate-500`}>{i + 1}</td>
                <th scope="row" className={`${TD} font-medium`}>
                  <Link href={`/opt/h1b-sponsors/${r.slug}`} className="text-white underline decoration-white/20 underline-offset-4 hover:decoration-accent">
                    {r.name}
                  </Link>
                </th>
                <td className={TD}>{fmt(r.approvals)}</td>
                <td className={TD}>{fmt(r.newEmployment)}</td>
                <td className={TD}>{EVERIFY_LABEL[r.everify]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
