alter table public.products
  add column if not exists size_variants jsonb not null default '[]'::jsonb
  check (jsonb_typeof(size_variants) = 'array');
