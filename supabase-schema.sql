-- Tut Dessert: базовая структура Supabase
-- Выполните этот SQL в Supabase SQL Editor после создания проекта.

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

-- Публичное чтение активных товаров:
create policy "Public can read active products"
on public.products for select
using (is_active = true);

-- ВАЖНО: политики на INSERT/UPDATE/DELETE добавляйте только после настройки
-- Supabase Auth и проверки роли администратора. Не открывайте запись всем.
