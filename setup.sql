-- 1. Create Media Items Table
create table if not exists public.media_items (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  storage_path text not null,
  public_url text not null,
  width int,
  height int,
  alt_text text,
  caption text,
  tags text[],
  sort_order int default 0
);

-- 2. Projects Table
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  slug text unique not null,
  title text not null,
  description text,
  content text, -- Markdown
  thumbnail_id uuid references public.media_items(id),
  published boolean default false,
  sort_order int default 0
);

-- 3. Enable RLS
alter table public.media_items enable row level security;
alter table public.projects enable row level security;

-- 4. RLS Policies
-- Allow PUBLIC read access
create policy "Public Media Read"
on public.media_items for select to anon using (true);

create policy "Public Projects Read"
on public.projects for select to anon using (true);

-- Allow AUTHENTICATED (Admin) full access
-- Assumption: Only the admin will ever sign in to this app.
create policy "Admin Media All"
on public.media_items for all to authenticated using (true) with check (true);

create policy "Admin Projects All"
on public.projects for all to authenticated using (true) with check (true);

-- 5. Storage Bucket (Run this in the SQL Editor or use Dashboard if this fails)
insert into storage.buckets (id, name, public)
values ('portfolio-media', 'portfolio-media', true)
on conflict (id) do nothing;

-- 6. Storage Policies
create policy "Public Bucket Access"
on storage.objects for select
to public
using ( bucket_id = 'portfolio-media' );

create policy "Auth Bucket Upload"
on storage.objects for insert
to authenticated
with check ( bucket_id = 'portfolio-media' );

create policy "Auth Bucket Update"
on storage.objects for update
to authenticated
using ( bucket_id = 'portfolio-media' );

create policy "Auth Bucket Delete"
on storage.objects for delete
to authenticated
using ( bucket_id = 'portfolio-media' );
