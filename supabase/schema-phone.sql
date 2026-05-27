-- Run after schema.sql in Supabase SQL Editor

create table if not exists public.phone_otps (
  id uuid primary key default gen_random_uuid(),
  phone text not null,
  code_hash text not null,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);

create index if not exists phone_otps_phone_created_idx
  on public.phone_otps (phone, created_at desc);

alter table public.phone_otps enable row level security;

-- No public policies: only service role (API) can read/write
