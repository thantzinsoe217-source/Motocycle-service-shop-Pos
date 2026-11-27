-- Supabase → SQL Editor → New query → paste all → Run
-- Motorbike shop: products, categories, sales, purchases. All money in THB.

create table if not exists categories (
  name text primary key,
  sort int not null default 0
);

create table if not exists products (
  id text primary key,
  name text not null,
  category text not null default 'မသတ်မှတ်ရသေး',
  price numeric(12,2),            -- null = enter price at sale time
  cost numeric(12,2),             -- null = not set yet
  stock numeric(12,2),            -- null = stock not tracked
  tracked boolean not null default false,
  service boolean not null default false,
  code text not null default '',  -- barcode / part number
  ts bigint,                      -- created time (ms) for items added in the app
  updated_at timestamptz not null default now()
);
create index if not exists products_category_idx on products (category);
create index if not exists products_code_idx on products (code);

create table if not exists sales (
  id text primary key,
  voucher_no text not null,       -- e.g. 20261125-001
  ts bigint not null,             -- sale time (ms)
  total numeric(12,2) not null,
  rcv numeric(12,2),              -- cash received
  voided boolean not null default false,
  lines jsonb not null default '[]'::jsonb   -- [{pid,n,p,q,dec}]
);
create index if not exists sales_ts_idx on sales (ts desc);

create table if not exists purchases (
  id text primary key,
  voucher_no text not null,       -- e.g. PUR-20261116-001
  ts bigint not null,             -- purchase time (ms)
  supplier text not null default '',
  ref text not null default '',   -- supplier's own bill number
  who text not null default '',   -- cashier name on the bill
  total numeric(12,2) not null,
  voided boolean not null default false,
  lines jsonb not null default '[]'::jsonb   -- [{pid,n,d,q,c,add,ok,newp}]
);
create index if not exists purchases_ts_idx on purchases (ts desc);

-- keep updated_at fresh
create or replace function touch_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;
drop trigger if exists products_touch on products;
create trigger products_touch before update on products for each row execute function touch_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- MVP: no login yet, so the public (anon) key may read/write everything.
-- ⚠ Anyone who has the site URL can open the app and edit data.
--   Before real use: add Supabase Auth (shop login) and replace these policies
--   with:  using (auth.role() = 'authenticated')
-- ---------------------------------------------------------------------------
alter table categories enable row level security;
alter table products   enable row level security;
alter table sales      enable row level security;
alter table purchases  enable row level security;

do $$
declare t text;
begin
  foreach t in array array['categories','products','sales','purchases'] loop
    execute format('drop policy if exists "mvp anon all" on %I', t);
    execute format('create policy "mvp anon all" on %I for all to anon using (true) with check (true)', t);
  end loop;
end $$;
