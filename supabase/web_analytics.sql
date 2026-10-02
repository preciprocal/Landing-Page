-- supabase/web_analytics.sql
-- ─────────────────────────────────────────────────────────────────────────────
-- First-party web analytics for the marketing site (preciprocal.com).
--
-- Run once in the Supabase SQL editor of the SAME project the ERP and Dashboard
-- use. Safe to re-run: everything is `if not exists` or `create or replace`.
--
-- Nothing here touches an existing table. All writes come from the marketing
-- site's /api/collect route using the service role; the views at the bottom are
-- what the ERP reads for its charts.
--
-- ── IDENTITY MODEL ──────────────────────────────────────────────────────────
-- Three identifiers, deliberately different in strength:
--
--   session_id   Always present. Client-generated, lives in sessionStorage,
--                expires after 30 minutes idle or when the tab closes. Ties a
--                single visit together. Not a cross-visit identifier.
--
--   anon_id      Always present. Server-derived sha256 of IP + user agent + a
--                salt that ROTATES DAILY, so the same person on two different
--                days produces two unrelated hashes. Gives honest daily unique
--                counts without storing a persistent identifier or the IP
--                itself. This is what makes collection lawful for visitors who
--                declined cookies.
--
--   visitor_id   Only ever set when the visitor accepted analytics cookies.
--                Stable across sessions and days, so consented traffic yields
--                real returning-visitor and multi-session funnel data.
--
-- The raw IP is never written to this schema. Country and region arrive already
-- coarsened from the edge.
-- ─────────────────────────────────────────────────────────────────────────────


-- ── Sessions: one row per visit ─────────────────────────────────────────────
create table if not exists public.web_sessions (
  session_id      uuid primary key,
  visitor_id      uuid,                       -- null unless analytics consent given
  anon_id         text not null,              -- daily-rotating hash, see header
  consent         text not null default 'anonymous'
                  check (consent in ('anonymous', 'granted', 'declined')),

  started_at      timestamptz not null default now(),
  last_seen_at    timestamptz not null default now(),
  ended_at        timestamptz,
  duration_ms     integer,                    -- filled on session_end

  entry_path      text,
  exit_path       text,
  page_count      integer not null default 0,
  event_count     integer not null default 0,
  is_bounce       boolean,                    -- computed on session_end

  -- Acquisition
  referrer        text,
  referrer_host   text,
  source_name     text,                       -- 'Google', 'LinkedIn', 'ChatGPT', or a utm_source
  channel         text,                       -- direct | organic | social | ai | referral | paid | email | campaign | affiliate
  utm_source      text,
  utm_medium      text,
  utm_campaign    text,
  utm_term        text,
  utm_content     text,
  landing_query   text,

  -- Environment (parsed server-side from the user agent; UA string not stored)
  device_type     text,                       -- desktop | mobile | tablet | bot
  browser         text,
  browser_version text,
  os              text,
  viewport_w      integer,
  viewport_h      integer,
  screen_w        integer,
  screen_h        integer,
  language        text,
  timezone        text,

  -- Geography (coarse, from edge headers; never derived from a stored IP)
  country         text,
  country_code    text,
  region          text,
  city            text,

  created_at      timestamptz not null default now()
);

-- Additive column top-ups, so re-running this file over an older install
-- picks up anything added since.
alter table public.web_sessions add column if not exists source_name text;

create index if not exists web_sessions_started_idx   on public.web_sessions (started_at desc);
create index if not exists web_sessions_visitor_idx   on public.web_sessions (visitor_id, started_at desc)
  where visitor_id is not null;
create index if not exists web_sessions_anon_day_idx  on public.web_sessions (anon_id, started_at desc);
create index if not exists web_sessions_entry_idx     on public.web_sessions (entry_path, started_at desc);
create index if not exists web_sessions_channel_idx   on public.web_sessions (channel, started_at desc);
create index if not exists web_sessions_source_idx    on public.web_sessions (source_name, started_at desc)
  where source_name is not null;
create index if not exists web_sessions_campaign_idx  on public.web_sessions (utm_campaign, started_at desc)
  where utm_campaign is not null;


-- ── Events: append-only stream ──────────────────────────────────────────────
-- One row per thing that happened. Never updated, never deleted except by the
-- retention job at the bottom of this file.
create table if not exists public.web_events (
  id              bigserial primary key,
  session_id      uuid not null references public.web_sessions(session_id) on delete cascade,
  visitor_id      uuid,                       -- denormalised so views need no join
  anon_id         text not null,

  occurred_at     timestamptz not null default now(),
  type            text not null
                  check (type in ('page_view', 'section_view', 'click', 'scroll_depth', 'session_end')),

  -- Where it happened
  path            text not null,
  page_title      text,

  -- page_view
  referrer_path   text,                       -- previous in-site path, drives path-to-path flow
  time_on_page_ms integer,                    -- filled when the visitor leaves the page

  -- section_view: emitted once per section per page view, on exit from view
  section_id      text,                       -- the data-section attribute
  section_name    text,                       -- human label, data-section-name
  section_index   integer,                    -- document order, so charts can sort by page position
  dwell_ms        integer,                    -- cumulative ms at least 50% visible
  max_visible_pct integer,                    -- how much of it the visitor actually saw

  -- click
  target_kind     text,                       -- internal | external | app | anchor | mailto | button
  target_href     text,
  target_path     text,                       -- normalised in-site destination, for CTR
  target_label    text,                       -- trimmed link text
  target_section  text,                       -- which section the click came from

  -- scroll_depth
  scroll_pct      integer,                    -- 25 | 50 | 75 | 100

  metadata        jsonb not null default '{}'::jsonb,
  created_at      timestamptz not null default now()
);

create index if not exists web_events_occurred_idx  on public.web_events (occurred_at desc);
create index if not exists web_events_session_idx   on public.web_events (session_id, occurred_at);
create index if not exists web_events_type_time_idx on public.web_events (type, occurred_at desc);
create index if not exists web_events_path_idx      on public.web_events (path, occurred_at desc);
create index if not exists web_events_section_idx   on public.web_events (section_id, occurred_at desc)
  where section_id is not null;
create index if not exists web_events_target_idx    on public.web_events (target_path, occurred_at desc)
  where target_path is not null;
create index if not exists web_events_visitor_idx   on public.web_events (visitor_id, occurred_at desc)
  where visitor_id is not null;


-- ── Lock both tables down ───────────────────────────────────────────────────
-- RLS on with no policies means anon and authenticated roles get nothing. Only
-- the service role (the collector, and the ERP's server-side queries) can read
-- or write. The marketing site's publishable key is never used against these.
alter table public.web_sessions enable row level security;
alter table public.web_events   enable row level security;


-- ── Session roll-up, called by the collector after each batch ───────────────
-- Counters are incremented in the database rather than read-modify-written in
-- the route, because two batches from two tabs of the same session can land at
-- the same moment and the last writer would otherwise erase the other's count.
create or replace function public.web_session_touch(
  p_session_id uuid,
  p_page_views integer default 0,
  p_events     integer default 0,
  p_exit_path  text    default null,
  p_ended      boolean default false
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.web_sessions s
  set
    last_seen_at = now(),
    page_count   = s.page_count + greatest(p_page_views, 0),
    event_count  = s.event_count + greatest(p_events, 0),
    exit_path    = coalesce(p_exit_path, s.exit_path),
    ended_at     = case when p_ended then now() else s.ended_at end,
    duration_ms  = case when p_ended
                        then least(2147483647,
                               greatest(0, (extract(epoch from (now() - s.started_at)) * 1000))
                             )::integer
                        else s.duration_ms end,
    -- A bounce is one page and nothing to show for it. Anyone who read a
    -- section for three seconds or clicked something engaged, whatever the
    -- page count says, so they are not counted as a bounce.
    is_bounce    = case when p_ended then (
                     s.page_count + greatest(p_page_views, 0) <= 1
                     and not exists (
                       select 1 from public.web_events e
                       where e.session_id = p_session_id
                         and (e.type = 'click'
                              or (e.type = 'section_view' and coalesce(e.dwell_ms, 0) >= 3000))
                     )
                   ) else s.is_bounce end
  where s.session_id = p_session_id;
end;
$$;


-- ═════════════════════════════════════════════════════════════════════════════
-- REPORTING VIEWS  —  what the ERP charts read
-- ═════════════════════════════════════════════════════════════════════════════

-- ── Per-page traffic and engagement ─────────────────────────────────────────
-- A page_view tagged closing=true is the exit record for a page the visitor
-- has just left; it exists only to carry time_on_page_ms. Counting it as a
-- view would double every page-view total and halve every rate derived from
-- one, so it is excluded wherever views are counted and kept wherever time on
-- page is measured.
-- Time on page arrives on two different events and the view has to read both.
-- Navigating to another page on the site produces a closing page_view carrying
-- the time; leaving the site instead produces session_end carrying it. Reading
-- only page_view therefore loses the exit page of every visit, and loses a
-- single-page visit entirely, which on a marketing site is most of them. The
-- counting columns stay on opening page_views so session_end never inflates a
-- view count.
create or replace view public.web_page_stats as
with counted as (
  select *,
    (e.type = 'page_view' and coalesce(e.metadata->>'closing', '') <> 'true') as is_view
  from public.web_events e
  where e.type in ('page_view', 'session_end')
)
select
  path,
  date_trunc('day', occurred_at)                       as day,
  count(*) filter (where is_view)                      as views,
  count(distinct session_id) filter (where is_view)    as sessions,
  count(distinct anon_id) filter (where is_view)       as unique_visitors,
  count(distinct visitor_id) filter
    (where is_view and visitor_id is not null)         as known_visitors,
  round(avg(time_on_page_ms) filter
    (where time_on_page_ms is not null))               as avg_time_on_page_ms,
  round(
    percentile_cont(0.5) within group (order by time_on_page_ms::double precision)
    filter (where time_on_page_ms is not null)
  )                                                    as median_time_on_page_ms,
  -- How many of those views actually contributed a timing, so a thin average
  -- is visible as thin rather than quietly trusted.
  count(*) filter (where time_on_page_ms is not null)  as timed_views
from counted
group by path, date_trunc('day', occurred_at);


-- ── Section engagement: which parts of a page actually get seen ─────────────
-- impressions      how many page views scrolled the section into view at all
-- page_views       how many times the page was viewed in total
-- view_rate_pct    impressions / page_views, i.e. how far down people get
-- avg_dwell_ms     average time the section was at least half visible
create or replace view public.web_section_stats as
with sections as (
  select
    e.path,
    e.section_id,
    max(e.section_name)                       as section_name,
    min(e.section_index)                      as section_index,
    date_trunc('day', e.occurred_at)          as day,
    count(*)                                  as impressions,
    count(distinct e.session_id)              as sessions,
    round(avg(e.dwell_ms))                    as avg_dwell_ms,
    round(
      percentile_cont(0.5) within group (order by e.dwell_ms::double precision)
    )                                         as median_dwell_ms,
    sum(e.dwell_ms)                           as total_dwell_ms,
    round(avg(e.max_visible_pct))             as avg_visible_pct,
    count(*) filter (where e.dwell_ms >= 3000) as engaged_impressions
  from public.web_events e
  where e.type = 'section_view'
    and e.section_id is not null
  group by e.path, e.section_id, date_trunc('day', e.occurred_at)
),
pages as (
  select path, date_trunc('day', occurred_at) as day, count(*) as page_views
  from public.web_events
  where type = 'page_view'
    and coalesce(metadata->>'closing', '') <> 'true'
  group by path, date_trunc('day', occurred_at)
)
select
  s.day,
  s.path,
  s.section_id,
  s.section_name,
  s.section_index,
  s.impressions,
  s.sessions,
  p.page_views,
  case when coalesce(p.page_views, 0) > 0
       then round(100.0 * s.impressions / p.page_views, 2) end as view_rate_pct,
  s.avg_dwell_ms,
  s.median_dwell_ms,
  s.total_dwell_ms,
  s.avg_visible_pct,
  s.engaged_impressions,
  case when s.impressions > 0
       then round(100.0 * s.engaged_impressions / s.impressions, 2) end as engagement_rate_pct
from sections s
left join pages p on p.path = s.path and p.day = s.day;


-- ── Click-through rate, page to page ────────────────────────────────────────
-- The headline number: of everyone who saw page X, what share clicked through
-- to page Y, and from which section of X.
create or replace view public.web_click_through as
with clicks as (
  select
    date_trunc('day', e.occurred_at)  as day,
    e.path                            as from_path,
    e.target_path                     as to_path,
    e.target_section                  as from_section,
    max(e.target_label)               as label,
    count(*)                          as clicks,
    count(distinct e.session_id)      as clicking_sessions
  from public.web_events e
  where e.type = 'click'
    and e.target_path is not null
  group by date_trunc('day', e.occurred_at), e.path, e.target_path, e.target_section
),
views as (
  select path, date_trunc('day', occurred_at) as day,
         count(*) as views, count(distinct session_id) as sessions
  from public.web_events
  where type = 'page_view'
    and coalesce(metadata->>'closing', '') <> 'true'
  group by path, date_trunc('day', occurred_at)
)
select
  c.day,
  c.from_path,
  c.to_path,
  c.from_section,
  c.label,
  c.clicks,
  c.clicking_sessions,
  v.views        as from_page_views,
  v.sessions     as from_page_sessions,
  case when coalesce(v.views, 0) > 0
       then round(100.0 * c.clicks / v.views, 2) end         as ctr_pct,
  case when coalesce(v.sessions, 0) > 0
       then round(100.0 * c.clicking_sessions / v.sessions, 2) end as session_ctr_pct
from clicks c
left join views v on v.path = c.from_path and v.day = c.day;


-- ── Every outbound and CTA click, including ones that leave the site ────────
create or replace view public.web_click_targets as
select
  date_trunc('day', occurred_at) as day,
  path                           as from_path,
  target_kind,
  target_href,
  target_label,
  target_section,
  count(*)                       as clicks,
  count(distinct session_id)     as sessions
from public.web_events
where type = 'click'
group by date_trunc('day', occurred_at), path, target_kind,
         target_href, target_label, target_section;


-- ── Scroll depth distribution per page ──────────────────────────────────────
create or replace view public.web_scroll_depth as
with reached as (
  select
    date_trunc('day', occurred_at) as day,
    path,
    scroll_pct,
    count(distinct session_id) as sessions
  from public.web_events
  where type = 'scroll_depth'
  group by date_trunc('day', occurred_at), path, scroll_pct
),
base as (
  select path, date_trunc('day', occurred_at) as day, count(distinct session_id) as total
  from public.web_events
  where type = 'page_view'
    and coalesce(metadata->>'closing', '') <> 'true'
  group by path, date_trunc('day', occurred_at)
)
select
  r.day, r.path, r.scroll_pct, r.sessions, b.total as page_sessions,
  case when coalesce(b.total, 0) > 0
       then round(100.0 * r.sessions / b.total, 2) end as reach_pct
from reached r
left join base b on b.path = r.path and b.day = r.day;


-- ── Acquisition: where traffic comes from and how well it converts ──────────
create or replace view public.web_acquisition as
select
  date_trunc('day', s.started_at) as day,
  coalesce(s.channel, 'direct')   as channel,
  coalesce(s.source_name, 'Direct') as source_name,
  s.referrer_host,
  s.utm_source,
  s.utm_medium,
  s.utm_campaign,
  count(*)                                              as sessions,
  count(distinct s.anon_id)                             as unique_visitors,
  round(avg(s.page_count), 2)                           as avg_pages_per_session,
  round(avg(s.duration_ms) filter
    (where s.duration_ms is not null))                  as avg_duration_ms,
  count(*) filter (where s.is_bounce)                   as bounces,
  case when count(*) > 0
       then round(100.0 * count(*) filter (where s.is_bounce) / count(*), 2) end as bounce_rate_pct,
  count(*) filter (where exists (
    select 1 from public.web_events e
    where e.session_id = s.session_id
      and e.type = 'click'
      and e.target_kind = 'app'
  ))                                                    as sessions_reaching_app,
  case when count(*) > 0
       then round(100.0 * count(*) filter (where exists (
         select 1 from public.web_events e
         where e.session_id = s.session_id
           and e.type = 'click'
           and e.target_kind = 'app'
       )) / count(*), 2) end                            as app_ctr_pct
from public.web_sessions s
group by date_trunc('day', s.started_at), s.channel, s.source_name, s.referrer_host,
         s.utm_source, s.utm_medium, s.utm_campaign;


-- ── Lead source: traffic by origin, ranked by how well it converts ─────────
-- The one to open first when asking "where is our traffic coming from and
-- which of it is worth more". A session counts as a lead when it clicks
-- through to the app, which on a marketing site is the only conversion event
-- that exists on this side of the boundary.
create or replace view public.web_lead_sources as
with sessions as (
  select
    s.session_id,
    date_trunc('day', s.started_at)     as day,
    coalesce(s.channel, 'direct')       as channel,
    coalesce(s.source_name, 'Direct')   as source_name,
    s.utm_campaign,
    s.entry_path,
    s.country,
    s.device_type,
    s.page_count,
    s.duration_ms,
    s.is_bounce,
    exists (
      select 1 from public.web_events e
      where e.session_id = s.session_id
        and e.type = 'click' and e.target_kind = 'app'
    ) as converted
  from public.web_sessions s
)
select
  day,
  channel,
  source_name,
  utm_campaign,
  entry_path,
  count(*)                                      as sessions,
  count(*) filter (where converted)             as leads,
  case when count(*) > 0
       then round(100.0 * count(*) filter (where converted) / count(*), 2) end as conversion_pct,
  round(avg(page_count), 2)                     as avg_pages,
  round(avg(duration_ms) filter (where duration_ms is not null)) as avg_duration_ms,
  case when count(*) > 0
       then round(100.0 * count(*) filter (where is_bounce) / count(*), 2) end as bounce_rate_pct
from sessions
group by day, channel, source_name, utm_campaign, entry_path;


-- ── Entry and exit pages ────────────────────────────────────────────────────
create or replace view public.web_entry_exit as
select
  date_trunc('day', started_at) as day,
  entry_path,
  exit_path,
  count(*)                      as sessions,
  count(*) filter (where is_bounce) as bounces,
  round(avg(page_count), 2)     as avg_pages,
  round(avg(duration_ms) filter (where duration_ms is not null)) as avg_duration_ms
from public.web_sessions
group by date_trunc('day', started_at), entry_path, exit_path;


-- ── Page-to-page flow, reconstructed from consecutive page views ───────────
-- Unlike web_click_through this counts actual navigation, including back
-- buttons and address-bar entries that no click produced.
create or replace view public.web_page_flow as
select
  date_trunc('day', occurred_at) as day,
  referrer_path                  as from_path,
  path                           as to_path,
  count(*)                       as navigations,
  count(distinct session_id)     as sessions
from public.web_events
where type = 'page_view'
  and referrer_path is not null
group by date_trunc('day', occurred_at), referrer_path, path;


-- ── Device and geography breakdown ──────────────────────────────────────────
create or replace view public.web_audience as
select
  date_trunc('day', started_at) as day,
  device_type,
  browser,
  os,
  country,
  country_code,
  region,
  language,
  count(*)                      as sessions,
  count(distinct anon_id)       as unique_visitors,
  round(avg(page_count), 2)     as avg_pages,
  case when count(*) > 0
       then round(100.0 * count(*) filter (where is_bounce) / count(*), 2) end as bounce_rate_pct
from public.web_sessions
group by date_trunc('day', started_at), device_type, browser, os,
         country, country_code, region, language;


-- ── One-line daily rollup for the ERP's summary tiles ───────────────────────
create or replace view public.web_daily_summary as
select
  date_trunc('day', s.started_at)                   as day,
  count(*)                                          as sessions,
  count(distinct s.anon_id)                         as unique_visitors,
  count(distinct s.visitor_id)
    filter (where s.visitor_id is not null)         as known_visitors,
  sum(s.page_count)                                 as page_views,
  round(avg(s.page_count), 2)                       as pages_per_session,
  round(avg(s.duration_ms) filter
    (where s.duration_ms is not null))              as avg_session_ms,
  case when count(*) > 0
       then round(100.0 * count(*) filter (where s.is_bounce) / count(*), 2) end as bounce_rate_pct,
  count(*) filter (where s.consent = 'granted')     as consented_sessions,
  case when count(*) > 0
       then round(100.0 * count(*) filter (where s.consent = 'granted') / count(*), 2) end as consent_rate_pct
from public.web_sessions s
group by date_trunc('day', s.started_at);


-- ═════════════════════════════════════════════════════════════════════════════
-- PER-VISITOR DETAIL  —  individual journeys, not just aggregates
-- ═════════════════════════════════════════════════════════════════════════════

-- ── One visit, replayed in order ────────────────────────────────────────────
-- The raw timeline: every page opened, every section scrolled into view and
-- for how long, every click, in the order it happened. Filter by session_id to
-- replay a single visit, or by visitor_id to replay everything one consented
-- person has ever done.
--
--   select * from web_session_journey
--   where session_id = '...' order by step;
create or replace view public.web_session_journey as
select
  e.session_id,
  e.visitor_id,
  e.anon_id,
  s.country,
  s.device_type,
  s.browser,
  s.channel,
  s.source_name,
  s.referrer_host,
  s.utm_campaign,
  row_number() over (partition by e.session_id order by e.occurred_at, e.id) as step,
  e.occurred_at,
  e.type,
  e.path,
  e.page_title,
  e.section_id,
  e.section_name,
  e.dwell_ms,
  e.max_visible_pct,
  e.target_kind,
  e.target_path,
  e.target_label,
  e.target_section,
  e.scroll_pct,
  e.time_on_page_ms,
  e.metadata
from public.web_events e
join public.web_sessions s on s.session_id = e.session_id;


-- ── Which sections one visitor actually read, ranked by attention ──────────
-- Answers "what was this person interested in", which is the question that
-- matters when a lead comes in and you want to know what to talk to them about.
create or replace view public.web_visitor_sections as
select
  coalesce(e.visitor_id::text, e.anon_id) as visitor_key,
  e.visitor_id,
  e.anon_id,
  e.path,
  e.section_id,
  max(e.section_name)                     as section_name,
  count(*)                                as times_seen,
  sum(e.dwell_ms)                         as total_dwell_ms,
  round(avg(e.dwell_ms))                  as avg_dwell_ms,
  max(e.max_visible_pct)                  as max_visible_pct,
  min(e.occurred_at)                      as first_seen_at,
  max(e.occurred_at)                      as last_seen_at
from public.web_events e
where e.type = 'section_view'
  and e.section_id is not null
group by coalesce(e.visitor_id::text, e.anon_id), e.visitor_id, e.anon_id, e.path, e.section_id;


-- ── One row per visitor, with their whole history summarised ───────────────
-- visitor_key is the strongest identifier available for that person: the
-- stable visitor_id where consent was given, otherwise the daily anonymous
-- hash. Rows keyed by an anon hash are per-day by construction.
create or replace view public.web_visitor_profile as
with visits as (
  select
    coalesce(s.visitor_id::text, s.anon_id) as visitor_key,
    s.visitor_id,
    s.consent,
    s.session_id,
    s.started_at,
    s.duration_ms,
    s.page_count,
    s.is_bounce,
    s.country,
    s.device_type,
    s.browser,
    s.os,
    s.channel,
    s.source_name,
    s.referrer_host,
    s.utm_campaign,
    s.entry_path
  from public.web_sessions s
)
select
  v.visitor_key,
  max(v.visitor_id::text)                        as visitor_id,
  bool_or(v.consent = 'granted')                 as ever_consented,
  count(distinct v.session_id)                   as sessions,
  min(v.started_at)                              as first_seen_at,
  max(v.started_at)                              as last_seen_at,
  sum(v.page_count)                              as total_page_views,
  sum(v.duration_ms)                             as total_time_ms,
  round(avg(v.duration_ms))                      as avg_session_ms,
  count(*) filter (where v.is_bounce)             as bounced_sessions,
  (array_agg(v.entry_path order by v.started_at))[1]    as first_entry_path,
  (array_agg(v.channel order by v.started_at))[1]       as first_channel,
  (array_agg(v.source_name order by v.started_at))[1]   as first_source,
  (array_agg(v.channel order by v.started_at desc))[1]  as last_channel,
  (array_agg(v.source_name order by v.started_at desc))[1] as last_source,
  (array_agg(v.referrer_host order by v.started_at))[1] as first_referrer_host,
  (array_agg(v.utm_campaign order by v.started_at)
    filter (where v.utm_campaign is not null))[1]       as first_campaign,
  max(v.country)                                 as country,
  max(v.device_type)                             as device_type,
  max(v.browser)                                 as browser,
  max(v.os)                                      as os,
  -- The pages and sections this person spent the most time on
  (
    select array_agg(x.path order by x.ms desc)
    from (
      select e.path, sum(coalesce(e.time_on_page_ms, 0)) as ms
      from public.web_events e
      where coalesce(e.visitor_id::text, e.anon_id) = v.visitor_key
        and e.type in ('page_view', 'session_end')
      group by e.path
      order by ms desc
      limit 10
    ) x
  )                                              as top_paths,
  (
    select array_agg(x.section_id order by x.ms desc)
    from (
      select e.section_id, sum(coalesce(e.dwell_ms, 0)) as ms
      from public.web_events e
      where coalesce(e.visitor_id::text, e.anon_id) = v.visitor_key
        and e.type = 'section_view'
        and e.section_id is not null
      group by e.section_id
      order by ms desc
      limit 10
    ) x
  )                                              as top_sections,
  -- Did they ever click through to the app
  exists (
    select 1 from public.web_events e
    where coalesce(e.visitor_id::text, e.anon_id) = v.visitor_key
      and e.type = 'click' and e.target_kind = 'app'
  )                                              as reached_app
from visits v
group by v.visitor_key;


-- ── Attribution hand-off to the app ─────────────────────────────────────────
-- Links on the marketing site that point at app.preciprocal.com are rewritten
-- in the browser to carry ?pr_sid=<session_id>&pr_vid=<visitor_id>. For a
-- signup to be traceable back to the journey that produced it, the app must
-- read those two params on sign-up and store them against the new account.
--
-- Once it does, joining the account's stored pr_sid to web_session_journey
-- gives the complete before-signup story for a named customer: every page,
-- every section, how long on each, and what they clicked. Until the app stores
-- them the params are inert and nothing here breaks.


-- ═════════════════════════════════════════════════════════════════════════════
-- RETENTION
-- ═════════════════════════════════════════════════════════════════════════════
-- The privacy policy commits to keeping raw analytics events for 14 months,
-- which matches the GA4 maximum and is the figure stated on /privacy. Call this
-- from a scheduled job (pg_cron, or the ERP on a timer). Deleting the session
-- cascades to its events.
create or replace function public.web_analytics_prune(older_than interval default interval '14 months')
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  removed integer;
begin
  delete from public.web_sessions
  where started_at < now() - older_than;
  get diagnostics removed = row_count;
  return removed;
end;
$$;

-- Example schedule, once pg_cron is enabled on the project:
--   select cron.schedule('web-analytics-prune', '0 4 * * *',
--                        $$select public.web_analytics_prune()$$);
