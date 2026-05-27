-- Run in Supabase: SQL Editor → New query → Paste → Run

create table if not exists public.lesson_completions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  lesson_id text not null,
  score integer not null default 0,
  accuracy integer not null default 0,
  completed_at timestamptz not null default now(),
  unique (user_id, lesson_id)
);

create table if not exists public.user_stats (
  user_id uuid primary key references auth.users (id) on delete cascade,
  total_score integer not null default 0,
  streak integer not null default 0,
  last_practice_date date,
  updated_at timestamptz not null default now()
);

alter table public.lesson_completions enable row level security;
alter table public.user_stats enable row level security;

create policy "lesson_completions_select_own"
  on public.lesson_completions for select
  using (auth.uid() = user_id);

create policy "lesson_completions_insert_own"
  on public.lesson_completions for insert
  with check (auth.uid() = user_id);

create policy "lesson_completions_update_own"
  on public.lesson_completions for update
  using (auth.uid() = user_id);

create policy "user_stats_select_own"
  on public.user_stats for select
  using (auth.uid() = user_id);

create policy "user_stats_insert_own"
  on public.user_stats for insert
  with check (auth.uid() = user_id);

create policy "user_stats_update_own"
  on public.user_stats for update
  using (auth.uid() = user_id);
