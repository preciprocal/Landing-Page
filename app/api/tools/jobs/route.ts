/**
 * app/api/tools/jobs/route.ts
 *
 * GET ?q=&family=&level=&stem=1&h1b=1&days=&page= -> a page of live job
 * postings for /jobs. See lib/jobsFeed.ts for where they come from.
 */

import { NextResponse } from "next/server";
import { searchJobs } from "@/lib/jobsFeed";
import { rateLimit } from "@/lib/interviewTools/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  if (!rateLimit(req, "jobs", 90, 60 * 1000)) {
    return NextResponse.json({ error: "Too many searches in a minute. Wait a moment and try again." }, { status: 429 });
  }
  const sp = new URL(req.url).searchParams;
  const level = sp.get("level");
  const days = Number(sp.get("days"));
  const result = await searchJobs({
    q: (sp.get("q") ?? "").slice(0, 100),
    family: sp.get("family") ?? undefined,
    level: level === "intern" || level === "early" ? level : "all",
    stem: sp.get("stem") === "1",
    h1b: sp.get("h1b") === "1",
    days: [1, 7, 30].includes(days) ? days : undefined,
    page: Number(sp.get("page")) || 1,
  }).catch((err) => {
    console.error("jobs search failed:", err);
    return null;
  });
  if (!result) {
    return NextResponse.json({ error: "Job postings are not available right now. Try again in a few minutes." }, { status: 503 });
  }
  return NextResponse.json(result, { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=1800" } });
}
