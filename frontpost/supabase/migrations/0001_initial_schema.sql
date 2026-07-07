create extension if not exists pgcrypto;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  locale text not null default 'zh' check (locale in ('zh', 'en', 'ar')),
  font_scale numeric not null default 1.0 check (font_scale between 0.85 and 1.4),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.papers (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  source text not null,
  abstract text,
  url text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.reading_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  paper_id uuid not null references public.papers(id) on delete cascade,
  event_type text not null check (event_type in ('impression', 'open', 'save', 'dismiss', 'share')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.papers enable row level security;
alter table public.reading_events enable row level security;

create policy "profiles own rows" on public.profiles for all using (auth.uid() = id) with check (auth.uid() = id);
create policy "papers readable by authenticated users" on public.papers for select to authenticated using (true);
create policy "reading events own rows" on public.reading_events for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
