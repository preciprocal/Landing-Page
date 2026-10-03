# Prompt: build the marketing analytics section of the ERP

Paste everything below the line into the Claude working in `preciprocal-admin`.

---

We collect first-party analytics on the marketing site (preciprocal.com) and write it
into the same Supabase project this ERP already uses. The tables and views exist and
are live. Your job is to build the ERP pages that present it.

Read this whole brief before writing any code. Several of the rules below are the
difference between a correct dashboard and a confident-looking wrong one.

## What the data is

Every visit to the marketing site produces a session row and a stream of events: pages
opened, how long on each, which sections scrolled into view and for how long, how far
down people scrolled, and every link or button clicked. Traffic source is resolved to a
named origin (Google, LinkedIn, ChatGPT, Reddit) rather than a raw referrer host.

Two tables hold the raw data. Fourteen views sit on top, already aggregated by day.
**Prefer the views.** They encode decisions that are easy to get wrong by hand.

## Access rules

- Both tables have RLS enabled with **no policies**. Only the service role can read them.
- Query them **server-side only**: server components, route handlers, or server actions.
  A client-side query returns an empty array, not an error, so this fails silently and
  looks like "no data yet". Use the existing `lib/supabase/admin.ts` client.
- Never expose the service role key to the browser, and never add a `NEXT_PUBLIC_`
  variable for it.

## The views

Every view has a `day` column (`date_trunc('day', ...)`, UTC). Filter on it for ranges.

**Headline**
- `web_daily_summary` — one row per day: `sessions, unique_visitors, known_visitors,
  page_views, pages_per_session, avg_session_ms, bounce_rate_pct, consented_sessions,
  consent_rate_pct`

**Traffic source**
- `web_lead_sources` — `day, channel, source_name, utm_campaign, entry_path, sessions,
  leads, conversion_pct, avg_pages, avg_duration_ms, bounce_rate_pct`
- `web_acquisition` — same territory with UTM detail and `sessions_reaching_app,
  app_ctr_pct`
- `web_audience` — `device_type, browser, os, country, country_code, region, language,
  sessions, unique_visitors, avg_pages, bounce_rate_pct`

**Pages**
- `web_page_stats` — `path, views, sessions, unique_visitors, known_visitors,
  avg_time_on_page_ms, median_time_on_page_ms, timed_views`
- `web_entry_exit` — `entry_path, exit_path, sessions, bounces, avg_pages, avg_duration_ms`
- `web_page_flow` — `from_path, to_path, navigations, sessions`
- `web_scroll_depth` — `path, scroll_pct (25/50/75/100), sessions, page_sessions, reach_pct`

**Sections** — this is the part no off-the-shelf tool gives you
- `web_section_stats` — `path, section_id, section_name, section_index, impressions,
  sessions, page_views, view_rate_pct, avg_dwell_ms, median_dwell_ms, total_dwell_ms,
  avg_visible_pct, engaged_impressions, engagement_rate_pct`
  - `view_rate_pct` = share of page views that scrolled this section into view, i.e. how
    far down the page people actually get
  - `engagement_rate_pct` = share of impressions where dwell was 3s or more
  - `section_index` is document order; sort by it to show a page top to bottom

**Clicks**
- `web_click_through` — `from_path, to_path, from_section, label, clicks,
  clicking_sessions, from_page_views, from_page_sessions, ctr_pct, session_ctr_pct`
- `web_click_targets` — every click including outbound: `target_kind, target_href,
  target_label, target_section, clicks, sessions`
  - `target_kind` is one of `internal | app | external | anchor | mailto | button`.
    `app` means a click through to app.preciprocal.com, which is the conversion event.

**Individual visitors**
- `web_visitor_profile` — one row per visitor: `visitor_key, visitor_id, ever_consented,
  sessions, first_seen_at, last_seen_at, total_page_views, total_time_ms, avg_session_ms,
  bounced_sessions, first_entry_path, first_channel, first_source, last_channel,
  last_source, first_referrer_host, first_campaign, country, device_type, browser, os,
  top_paths, top_sections, reached_app`
  - `top_paths` and `top_sections` are arrays ranked by time spent, not by visit count
- `web_visitor_sections` — what one visitor read, by section, with dwell
- `web_session_journey` — **one visit replayed in order**: filter by `session_id` and sort
  by `step`. Columns: `step, occurred_at, type, path, page_title, section_id, dwell_ms,
  target_path, target_label, target_section, scroll_pct, time_on_page_ms` plus the
  session's `country, device_type, browser, channel, source_name, utm_campaign`

## Rules you must follow

These are not style preferences. Breaking them produces wrong numbers.

1. **Never sum `unique_visitors` across days.** Visitors who declined cookies are
   identified by a hash that is **regenerated every day on purpose**, so the same person
   is a different id tomorrow. Daily unique counts are honest; adding seven days together
   is not a weekly unique count and will overstate reach. For a multi-day figure either
   show "average daily uniques" or use `sessions`, and label it accurately.

2. **Never average a pre-averaged column.** `avg_dwell_ms`, `avg_time_on_page_ms`,
   `avg_duration_ms`, `bounce_rate_pct`, `ctr_pct`, `conversion_pct` and every other
   `avg_*` or `*_pct` column is already an average *within one day for one grouping*.
   Averaging them across days weights a day with 3 sessions the same as a day with 3000.
   Recompute from the underlying counts instead: `sum(total_dwell_ms) / sum(impressions)`,
   `100.0 * sum(clicks) / sum(from_page_views)`, and so on.

3. **Show `timed_views` next to `avg_time_on_page_ms`.** Time on page is only known for
   views where we saw the visitor leave. `timed_views` is how many views contributed. If
   it is much smaller than `views`, the average is thin and the UI should say so rather
   than presenting it as solid.

4. **`leads` is not signups.** In `web_lead_sources`, a lead is a session that clicked
   through to app.preciprocal.com. It is the furthest we can see from the marketing side.
   Label it "clicked through to app", never "signups" or "customers".

5. **Bounce has a custom definition here.** A session is a bounce if it saw one page AND
   never clicked anything AND never read a section for 3 seconds or more. Someone who
   lands, reads one section properly and leaves is deliberately *not* a bounce. If you
   surface the metric, tooltip that definition.

6. **If you query `web_events` directly, exclude page exit records.** Leaving a page emits
   a second `page_view` carrying `time_on_page_ms`, tagged `metadata->>'closing' = 'true'`.
   Counting those as views doubles page-view totals and halves every rate. The views
   already handle this; raw queries must add
   `and coalesce(metadata->>'closing','') <> 'true'`.

7. **Two identity strengths, and the UI should not blur them.** `visitor_id` exists only
   for visitors who accepted cookies and is stable across days. `anon_id` is everyone
   else and resets daily. `web_visitor_profile.visitor_key` is whichever is available, and
   `ever_consented` tells you which. A profile row built on an anon key is a single day of
   history by construction, so do not present it as a lifetime view.

8. **No personal data exists here and none should be added.** No IP addresses, names or
   emails are stored. Do not join this data to anything that would re-identify a visitor
   beyond what is described in the public privacy policy, and do not add a column that
   stores an IP.

## What to build

Use the ERP's existing MUI + MUI X Charts conventions and match the look of the pages
already there. Suggested structure, in priority order:

1. **Overview** — tiles for sessions, unique visitors, page views, bounce rate, consent
   rate from `web_daily_summary`, plus a sessions-over-time line chart. Add a date range
   control; everything else should respect it.

2. **Traffic sources** — `web_lead_sources` as a sortable table: source, sessions, clicked
   through to app, conversion %, bounce %. A bar chart of sessions by `source_name` and a
   breakdown by `channel`. This answers "where should we spend effort", so make it good.

3. **Pages** — `web_page_stats` table sorted by views, with time on page and its
   `timed_views` denominator. Scroll depth from `web_scroll_depth` as a funnel per page.

4. **Sections** — pick a page, show its sections in `section_index` order with
   `view_rate_pct` and `avg_dwell_ms`. This shows where attention dies on a page and is
   the most actionable view in the whole set. A horizontal bar per section reads well.

5. **Visitors** — `web_visitor_profile` as a list, clicking through to the full
   `web_session_journey` timeline for that person. Render the journey as an ordered
   timeline, not a table: page opened, sections read with dwell, clicks, in sequence.

## Known gap

Signup attribution is not wired up yet. Links from the marketing site to the app carry
`pr_sid` and `pr_vid` query parameters, but the app does not yet store them against new
accounts. Until it does, you can show which sources produce click-throughs, but you
cannot join a marketing journey to a named customer. Do not build UI that implies you
can. When the app starts storing those ids, the join is
`user record -> pr_sid -> web_session_journey.session_id`.

## Other notes

- Raw events are pruned after 14 months by `web_analytics_prune()`. Do not build anything
  that assumes history beyond that.
- The tables were empty until recently, so expect sparse data at first. Handle the
  zero-row case properly in every chart rather than rendering an empty axis.
- The schema source of truth is `supabase/web_analytics.sql` in the Landing-Page repo.
