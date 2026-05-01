create extension if not exists "pgcrypto";
create schema if not exists app_private;

create table if not exists public.churches (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  domain text,
  pastor_name text,
  intro text,
  worship_time text,
  address text,
  phone text,
  template_id text default 'simple',
  site_status text not null default 'active' check (site_status in ('active', 'paused', 'stopped')),
  subscription_status text not null default 'trial' check (subscription_status in ('trial', 'active', 'unpaid', 'paused', 'cancelled')),
  payment_due_date date,
  deployment_status text not null default 'not_deployed' check (deployment_status in ('not_deployed', 'waiting', 'deployed', 'failed')),
  created_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  church_id uuid references public.churches(id) on delete set null,
  role text not null check (role in ('master_admin', 'church_admin', 'finance_admin')),
  name text,
  email text,
  created_at timestamptz not null default now()
);

create table if not exists public.videos (
  id uuid primary key default gen_random_uuid(),
  church_id uuid not null references public.churches(id) on delete cascade,
  type text not null check (type in ('sermon', 'praise')),
  title text not null,
  youtube_url text not null,
  youtube_video_id text,
  thumbnail_url text,
  speaker text,
  preached_at date,
  description text,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  church_id uuid not null references public.churches(id) on delete cascade,
  type text not null check (type in ('news', 'board')),
  title text not null,
  content text not null,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.members (
  id uuid primary key default gen_random_uuid(),
  church_id uuid not null references public.churches(id) on delete cascade,
  name text not null,
  phone text,
  birthdate date,
  address text,
  position text,
  group_name text,
  status text not null default 'active',
  memo text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.offerings (
  id uuid primary key default gen_random_uuid(),
  church_id uuid not null references public.churches(id) on delete cascade,
  member_id uuid references public.members(id) on delete set null,
  giver_name text not null,
  amount integer not null check (amount >= 0),
  offering_type text not null,
  offered_at date not null,
  memo text,
  created_at timestamptz not null default now()
);

create table if not exists public.edit_requests (
  id uuid primary key default gen_random_uuid(),
  church_id uuid not null references public.churches(id) on delete cascade,
  requested_by uuid references auth.users(id) on delete set null,
  request_text text not null,
  ai_summary text,
  ai_action_plan jsonb not null default '{}'::jsonb,
  status text not null default 'pending' check (status in ('pending', 'ai_reviewed', 'approved', 'rejected', 'applied', 'deployed')),
  master_memo text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.deployments (
  id uuid primary key default gen_random_uuid(),
  church_id uuid not null references public.churches(id) on delete cascade,
  status text not null check (status in ('waiting', 'deploying', 'success', 'failed')),
  deployment_url text,
  memo text,
  deployed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  church_id uuid not null references public.churches(id) on delete cascade,
  plan_name text not null,
  amount integer not null default 0,
  status text not null check (status in ('trial', 'active', 'unpaid', 'paused', 'cancelled')),
  paid_until date,
  memo text,
  created_at timestamptz not null default now()
);

create index if not exists idx_profiles_user_id on public.profiles(user_id);
create index if not exists idx_profiles_church_id on public.profiles(church_id);
create index if not exists idx_videos_church_type on public.videos(church_id, type);
create index if not exists idx_posts_church_type on public.posts(church_id, type);
create index if not exists idx_members_church on public.members(church_id);
create index if not exists idx_offerings_church on public.offerings(church_id, offered_at);
create index if not exists idx_edit_requests_church on public.edit_requests(church_id, status);

alter table public.churches enable row level security;
alter table public.profiles enable row level security;
alter table public.videos enable row level security;
alter table public.posts enable row level security;
alter table public.members enable row level security;
alter table public.offerings enable row level security;
alter table public.edit_requests enable row level security;
alter table public.deployments enable row level security;
alter table public.subscriptions enable row level security;

create or replace function app_private.current_profile_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where user_id = auth.uid() limit 1
$$;

create or replace function app_private.current_profile_church_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select church_id from public.profiles where user_id = auth.uid() limit 1
$$;

create or replace function app_private.is_master_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(app_private.current_profile_role() = 'master_admin', false)
$$;

grant usage on schema app_private to anon, authenticated;
grant execute on all functions in schema app_private to anon, authenticated;

create policy "public can read active churches"
on public.churches for select
using (site_status = 'active' or app_private.is_master_admin() or id = app_private.current_profile_church_id());

create policy "master manages churches"
on public.churches for all
using (app_private.is_master_admin())
with check (app_private.is_master_admin());

create policy "church admin updates own church"
on public.churches for update
using (id = app_private.current_profile_church_id() and app_private.current_profile_role() = 'church_admin')
with check (id = app_private.current_profile_church_id() and app_private.current_profile_role() = 'church_admin');

create policy "users read own profile"
on public.profiles for select
using (user_id = auth.uid() or app_private.is_master_admin());

create policy "master manages profiles"
on public.profiles for all
using (app_private.is_master_admin())
with check (app_private.is_master_admin());

create policy "public can read published videos"
on public.videos for select
using (is_published = true or app_private.is_master_admin() or church_id = app_private.current_profile_church_id());

create policy "church admin manages own videos"
on public.videos for all
using (church_id = app_private.current_profile_church_id() and app_private.current_profile_role() = 'church_admin')
with check (church_id = app_private.current_profile_church_id() and app_private.current_profile_role() = 'church_admin');

create policy "master manages videos"
on public.videos for all
using (app_private.is_master_admin())
with check (app_private.is_master_admin());

create policy "public can read published posts"
on public.posts for select
using (is_published = true or app_private.is_master_admin() or church_id = app_private.current_profile_church_id());

create policy "church admin manages own posts"
on public.posts for all
using (church_id = app_private.current_profile_church_id() and app_private.current_profile_role() = 'church_admin')
with check (church_id = app_private.current_profile_church_id() and app_private.current_profile_role() = 'church_admin');

create policy "master manages posts"
on public.posts for all
using (app_private.is_master_admin())
with check (app_private.is_master_admin());

create policy "church finance reads own members"
on public.members for select
using (app_private.is_master_admin() or (church_id = app_private.current_profile_church_id() and app_private.current_profile_role() in ('church_admin', 'finance_admin')));

create policy "church finance manages own members"
on public.members for insert
with check (church_id = app_private.current_profile_church_id() and app_private.current_profile_role() in ('church_admin', 'finance_admin'));

create policy "church finance updates own members"
on public.members for update
using (church_id = app_private.current_profile_church_id() and app_private.current_profile_role() in ('church_admin', 'finance_admin'))
with check (church_id = app_private.current_profile_church_id() and app_private.current_profile_role() in ('church_admin', 'finance_admin'));

create policy "master manages members"
on public.members for all
using (app_private.is_master_admin())
with check (app_private.is_master_admin());

create policy "church finance reads own offerings"
on public.offerings for select
using (app_private.is_master_admin() or (church_id = app_private.current_profile_church_id() and app_private.current_profile_role() in ('church_admin', 'finance_admin')));

create policy "church finance manages own offerings"
on public.offerings for insert
with check (church_id = app_private.current_profile_church_id() and app_private.current_profile_role() in ('church_admin', 'finance_admin'));

create policy "church finance updates own offerings"
on public.offerings for update
using (church_id = app_private.current_profile_church_id() and app_private.current_profile_role() in ('church_admin', 'finance_admin'))
with check (church_id = app_private.current_profile_church_id() and app_private.current_profile_role() in ('church_admin', 'finance_admin'));

create policy "master manages offerings"
on public.offerings for all
using (app_private.is_master_admin())
with check (app_private.is_master_admin());

create policy "church admin reads own edit requests"
on public.edit_requests for select
using (app_private.is_master_admin() or (church_id = app_private.current_profile_church_id() and app_private.current_profile_role() = 'church_admin'));

create policy "church admin creates own edit requests"
on public.edit_requests for insert
with check (church_id = app_private.current_profile_church_id() and app_private.current_profile_role() = 'church_admin');

create policy "master manages edit requests"
on public.edit_requests for all
using (app_private.is_master_admin())
with check (app_private.is_master_admin());

create policy "master reads deployments"
on public.deployments for select
using (app_private.is_master_admin() or church_id = app_private.current_profile_church_id());

create policy "master manages deployments"
on public.deployments for all
using (app_private.is_master_admin())
with check (app_private.is_master_admin());

create policy "master and church admin read subscriptions"
on public.subscriptions for select
using (app_private.is_master_admin() or church_id = app_private.current_profile_church_id());

create policy "master manages subscriptions"
on public.subscriptions for all
using (app_private.is_master_admin())
with check (app_private.is_master_admin());
