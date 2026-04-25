-- 1) Magazines tablosunu oluştur
create table if not exists magazines (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text default '',
  issue_number text default '',
  pdf_url text not null,
  cover_url text default '',
  is_published boolean default true,
  created_at timestamptz default now()
);

-- 2) RLS (Row Level Security) - herkese okuma izni
alter table magazines enable row level security;

create policy "Herkes yayınlı dergileri okuyabilir"
  on magazines for select
  using (is_published = true);

create policy "Herkes tüm dergileri okuyabilir (admin)"
  on magazines for select
  using (true);

create policy "Ekleme izni"
  on magazines for insert
  with check (true);

create policy "Silme izni"
  on magazines for delete
  using (true);

-- 3) Storage bucket oluştur (Supabase Dashboard > Storage'dan da yapabilirsin)
insert into storage.buckets (id, name, public)
values ('magazines', 'magazines', true)
on conflict (id) do nothing;

-- 4) Storage policy - herkes okuyabilsin
create policy "Public read magazines storage"
  on storage.objects for select
  using (bucket_id = 'magazines');

create policy "Upload magazines storage"
  on storage.objects for insert
  with check (bucket_id = 'magazines');

create policy "Delete magazines storage"
  on storage.objects for delete
  using (bucket_id = 'magazines');
