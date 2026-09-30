create table if not exists public.products (
  id text primary key,
  name text not null,
  category text not null,
  price numeric,
  price_label text,
  unit text,
  description text,
  emoji text,
  image_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.products enable row level security;

grant select on public.products to anon, authenticated;
grant insert, update, delete on public.products to authenticated;

drop policy if exists "Public can read active products" on public.products;
drop policy if exists "Only Tut Dessert admin can read products" on public.products;
drop policy if exists "Only Tut Dessert admin can insert" on public.products;
drop policy if exists "Only Tut Dessert admin can update" on public.products;
drop policy if exists "Only Tut Dessert admin can delete" on public.products;
drop policy if exists "Admins can insert products" on public.products;
drop policy if exists "Admins can update products" on public.products;
drop policy if exists "Admins can delete products" on public.products;

create policy "Public can read active products"
on public.products
for select
to anon, authenticated
using (is_active = true);

create policy "Only Tut Dessert admin can read products"
on public.products
for select
to authenticated
using ((auth.jwt() ->> 'email') = 'makhuseev0103@gmail.com');

create policy "Only Tut Dessert admin can insert"
on public.products
for insert
to authenticated
with check ((auth.jwt() ->> 'email') = 'makhuseev0103@gmail.com');

create policy "Only Tut Dessert admin can update"
on public.products
for update
to authenticated
using ((auth.jwt() ->> 'email') = 'makhuseev0103@gmail.com')
with check ((auth.jwt() ->> 'email') = 'makhuseev0103@gmail.com');

create policy "Only Tut Dessert admin can delete"
on public.products
for delete
to authenticated
using ((auth.jwt() ->> 'email') = 'makhuseev0103@gmail.com');

-- Keep updated_at current when rows are edited.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
before update on public.products
for each row execute function public.set_updated_at();


-- Site settings: one row for public contact information and branding.
create table if not exists public.site_settings (
  id integer primary key default 1 check (id = 1),
  address text not null default 'Tut Dessert, г. Тараз',
  phone text not null default '+7 747 226 09 76',
  whatsapp text not null default '77472260976',
  hours text not null default 'Уточняется',
  map_url text not null default 'https://go.2gis.com/4yEZN',
  logo_url text,
  instagram_url text,
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;
grant select on public.site_settings to anon, authenticated;
grant insert, update on public.site_settings to authenticated;

drop policy if exists "Public can read site settings" on public.site_settings;
drop policy if exists "Only Tut Dessert admin can read site settings" on public.site_settings;
drop policy if exists "Only Tut Dessert admin can insert site settings" on public.site_settings;
drop policy if exists "Only Tut Dessert admin can update site settings" on public.site_settings;

create policy "Public can read site settings"
on public.site_settings
for select
using (true);

create policy "Only Tut Dessert admin can read site settings"
on public.site_settings
for select to authenticated
using ((auth.jwt() ->> 'email') = 'makhuseev0103@gmail.com');

create policy "Only Tut Dessert admin can insert site settings"
on public.site_settings
for insert to authenticated
with check ((auth.jwt() ->> 'email') = 'makhuseev0103@gmail.com');

create policy "Only Tut Dessert admin can update site settings"
on public.site_settings
for update to authenticated
using ((auth.jwt() ->> 'email') = 'makhuseev0103@gmail.com')
with check ((auth.jwt() ->> 'email') = 'makhuseev0103@gmail.com');

insert into public.site_settings (id, address, phone, whatsapp, hours, map_url)
values (1, 'Tut Dessert, г. Тараз', '+7 747 226 09 76', '77472260976', 'Уточняется', 'https://go.2gis.com/4yEZN')
on conflict (id) do nothing;

drop trigger if exists site_settings_set_updated_at on public.site_settings;
create trigger site_settings_set_updated_at
before update on public.site_settings
for each row execute function public.set_updated_at();
