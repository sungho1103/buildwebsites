create extension if not exists "pgcrypto";

create table if not exists churches (
  id uuid primary key default gen_random_uuid(), name text not null, slug text unique not null,
  domain text, pastor_name text, intro text, worship_time text, address text, phone text, template_id text,
  site_status text default 'active', subscription_status text default 'trial', payment_due_date date,
  deployment_status text default 'not_deployed', created_at timestamptz default now()
);
create table if not exists profiles (
  id uuid primary key default gen_random_uuid(), user_id uuid unique not null, church_id uuid references churches(id),
  role text not null check(role in ('master_admin','church_admin','finance_admin')), name text, email text, created_at timestamptz default now()
);
create table if not exists videos (id uuid primary key default gen_random_uuid(), church_id uuid not null references churches(id), type text check(type in ('sermon','praise')), title text not null, youtube_url text not null, youtube_video_id text, thumbnail_url text, speaker text, preached_at date, description text, is_published boolean default true, created_at timestamptz default now());
create table if not exists posts (id uuid primary key default gen_random_uuid(), church_id uuid not null references churches(id), type text check(type in ('news','board')), title text not null, content text, is_published boolean default true, created_at timestamptz default now(), updated_at timestamptz default now());
create table if not exists members (id uuid primary key default gen_random_uuid(), church_id uuid not null references churches(id), name text not null, phone text, birthdate date, address text, position text, group_name text, status text default 'active', memo text, created_at timestamptz default now(), updated_at timestamptz default now());
create table if not exists offerings (id uuid primary key default gen_random_uuid(), church_id uuid not null references churches(id), member_id uuid references members(id), giver_name text not null, amount integer not null, offering_type text not null, offered_at date not null, memo text, created_at timestamptz default now());
create table if not exists edit_requests (id uuid primary key default gen_random_uuid(), church_id uuid not null references churches(id), requested_by uuid, request_text text not null, ai_summary text, ai_action_plan jsonb, status text default 'pending', master_memo text, created_at timestamptz default now(), updated_at timestamptz default now());
create table if not exists deployments (id uuid primary key default gen_random_uuid(), church_id uuid not null references churches(id), status text, deployment_url text, memo text, deployed_at timestamptz, created_at timestamptz default now());
create table if not exists subscriptions (id uuid primary key default gen_random_uuid(), church_id uuid not null references churches(id), plan_name text, amount integer, status text, paid_until date, memo text, created_at timestamptz default now());

alter table churches enable row level security; alter table profiles enable row level security; alter table videos enable row level security; alter table posts enable row level security; alter table members enable row level security; alter table offerings enable row level security; alter table edit_requests enable row level security; alter table deployments enable row level security; alter table subscriptions enable row level security;

create function is_master() returns boolean language sql stable as $$ select exists(select 1 from profiles p where p.user_id=auth.uid() and p.role='master_admin') $$;
create function my_church_id() returns uuid language sql stable as $$ select church_id from profiles p where p.user_id=auth.uid() limit 1 $$;

create policy master_all_churches on churches for all using (is_master()) with check (is_master());
create policy public_churches on churches for select using (site_status='active');
create policy own_church on churches for update using (id=my_church_id());

create policy public_posts on posts for select using (is_published=true);
create policy public_videos on videos for select using (is_published=true);
create policy church_posts on posts for all using (church_id=my_church_id() or is_master()) with check (church_id=my_church_id() or is_master());
create policy church_videos on videos for all using (church_id=my_church_id() or is_master()) with check (church_id=my_church_id() or is_master());
create policy church_members on members for all using (church_id=my_church_id() or is_master()) with check (church_id=my_church_id() or is_master());
create policy church_offerings on offerings for all using (church_id=my_church_id() or is_master()) with check (church_id=my_church_id() or is_master());
create policy church_edit_requests on edit_requests for all using (church_id=my_church_id() or is_master()) with check (church_id=my_church_id() or is_master());
create policy church_deployments on deployments for all using (church_id=my_church_id() or is_master()) with check (church_id=my_church_id() or is_master());
create policy church_subscriptions on subscriptions for all using (church_id=my_church_id() or is_master()) with check (church_id=my_church_id() or is_master());
