-- Run once in Supabase SQL editor.
create table if not exists site_content (
  id int primary key default 1,
  data jsonb not null,
  updated_at timestamptz default now(),
  constraint single_row check (id = 1)
);
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  created_at timestamptz default now(),
  customer jsonb not null,
  items jsonb not null,
  total int not null,
  status text not null default 'awaiting_payment',
  utr text
);
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text, business text, phone text, message text
);

-- Public site may only READ site content. Orders/leads are written via server routes (service role).
alter table site_content enable row level security;
alter table orders enable row level security;
alter table leads enable row level security;
create policy "public read content" on site_content for select using (true);

-- Public bucket for product images (uploads happen server-side via service role).
insert into storage.buckets (id, name, public) values ('media', 'media', true) on conflict do nothing;
