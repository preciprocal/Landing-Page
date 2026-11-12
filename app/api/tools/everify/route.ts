/**
 * app/api/tools/everify/route.ts
 *
 * GET ?q=<company> -> employers whose name matches or starts with the query,
 * with E-Verify enrolment and H-1B history. Backs the free search on
 * /opt/employer-lookup. No account,
 * nothing stored. See lib/everify.ts for where the data comes from.
 */

import { NextResponse } from "next/server";
import { searchEmployers } from "@/lib/everify";
import { rateLimit } from "@/lib/interviewTools/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_QUERY = 120;

export async function GET(req: Request) {
  // Search-as-you-type sends a request per pause, so the limit is generous;
  // it is there to stop someone scraping the whole list through it.
  if (!rateLimit(req, "everify", 60, 60 * 1000)) {
    return NextResponse.json({ error: "Too many searches in a minute. Wait a moment and try again." }, { status: 429 });
  }

  const q = (new URL(req.url).searchParams.get("q") ?? "").slice(0, MAX_QUERY);
  const result = await searchEmployers(q).catch((err) => {
    console.error("E-Verify search failed:", err);
    return "unavailable" as const;
  });

  if (result === "too-short") {
    return NextResponse.json({ error: "Type at least two letters of the company name." }, { status: 400 });
  }
  if (result === "unavailable") {
    return NextResponse.json(
      { error: "The employer list is not available right now. Use the official E-Verify search instead." },
      { status: 503 },
    );
  }
  // The list changes once a day, so a short shared cache is safe.
  return NextResponse.json(result, { headers: { "Cache-Control": "public, s-maxage=900, stale-while-revalidate=3600" } });
}
