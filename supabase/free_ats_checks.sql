-- supabase/free_ats_checks.sql
-- ─────────────────────────────────────────────────────────────────────────────
-- Results of the free ATS check on preciprocal.com/free-ats-checker, so a
-- returning visitor sees their result again instead of a fresh upload form.
-- See lib/resumeCheck/store.ts for how a visitor is matched.
--
-- Run once in the Supabase SQL editor of the same project as web_analytics.sql.
-- Safe to re-run. Nothing here touches an existing table.
--
-- No raw IP address or user agent is stored, only salted sha256 hashes. The
-- resume file is never stored, only the result the visitor was shown. Rows
-- older than 30 days are deleted by the site on each new check.
--
-- The table also enforces the free allowance (lib/resumeCheck/store.ts): one
-- check per visitor, 3 per IP address per 30 days, one running at a time per
-- IP, and 200 a day across the site. A row is written when a check starts
-- (result null) and filled in when it finishes.
-- ─────────────────────────────────────────────────────────────────────────────

create table if not exists public.free_ats_checks (
  id               uuid primary key default gen_random_uuid(),
  token            uuid not null unique,          -- matches the pp_ats_check cookie
  ip_hash          text not null,
  ua_hash          text not null,
  overall_score    integer,                       -- null while the check is running
  has_job_context  boolean not null default false,
  result           jsonb,                         -- the ResumeCheckResult shown; null while running
  created_at       timestamptz not null default now()
);

-- For a table created by the first version of this file, where both were
-- required. A running check has no result yet.
alter table public.free_ats_checks alter column overall_score drop not null;
alter table public.free_ats_checks alter column result drop not null;

create index if not exists free_ats_checks_visitor_idx
  on public.free_ats_checks (ip_hash, ua_hash, created_at desc);

create index if not exists free_ats_checks_ip_idx
  on public.free_ats_checks (ip_hash, created_at desc);

create index if not exists free_ats_checks_created_idx
  on public.free_ats_checks (created_at);

-- Only the site's service role reads and writes this table. With RLS on and no
-- policies, the anon and authenticated keys can do nothing with it.
alter table public.free_ats_checks enable row level security;
