begin;

create extension if not exists pgcrypto;

create type public.activity_type as enum ('rowing');
create type public.workout_quality as enum ('raw', 'estimated', 'verified');
create type public.interval_kind as enum ('work', 'rest', 'warmup', 'cooldown', 'unknown');
create type public.connection_status as enum ('active', 'expired', 'revoked', 'error');
create type public.import_job_status as enum ('queued', 'processing', 'completed', 'failed', 'cancelled');
create type public.import_trigger as enum ('manual', 'scheduled', 'webhook', 'upload', 'device');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text check (display_name is null or char_length(display_name) between 1 and 80),
  avatar_path text,
  timezone text not null default 'UTC',
  preferred_units jsonb not null default '{"distance":"meters","weight":"kilograms"}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.source_providers (
  id uuid primary key default gen_random_uuid(),
  key text not null unique check (key ~ '^[a-z0-9][a-z0-9_-]*$'),
  display_name text not null,
  source_kind text not null check (source_kind in ('api', 'device', 'file', 'manual', 'ocr')),
  capabilities jsonb not null default '{}'::jsonb,
  is_enabled boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.source_connections (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  provider_id uuid not null references public.source_providers(id) on delete restrict,
  external_account_id text,
  display_name text,
  status public.connection_status not null default 'active',
  secret_reference text,
  sync_cursor text,
  last_synced_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, provider_id, external_account_id)
);

create table public.machine_models (
  id uuid primary key default gen_random_uuid(),
  manufacturer text not null,
  model_name text not null,
  capabilities jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique (manufacturer, model_name)
);

create table public.machines (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  machine_model_id uuid references public.machine_models(id) on delete set null,
  nickname text,
  serial_number text,
  connection_metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.workouts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  machine_id uuid references public.machines(id) on delete set null,
  activity_type public.activity_type not null default 'rowing',
  title text,
  notes text,
  started_at timestamptz not null,
  ended_at timestamptz,
  timezone text,
  duration_ms bigint check (duration_ms is null or duration_ms >= 0),
  moving_duration_ms bigint check (moving_duration_ms is null or moving_duration_ms >= 0),
  distance_meters numeric(12,3) check (distance_meters is null or distance_meters >= 0),
  stroke_count integer check (stroke_count is null or stroke_count >= 0),
  average_spm numeric(6,2) check (average_spm is null or average_spm >= 0),
  max_spm numeric(6,2) check (max_spm is null or max_spm >= 0),
  average_heart_rate_bpm smallint check (average_heart_rate_bpm is null or average_heart_rate_bpm > 0),
  max_heart_rate_bpm smallint check (max_heart_rate_bpm is null or max_heart_rate_bpm > 0),
  average_power_watts numeric(9,2) check (average_power_watts is null or average_power_watts >= 0),
  max_power_watts numeric(9,2) check (max_power_watts is null or max_power_watts >= 0),
  average_pace_ms_per_500m integer check (average_pace_ms_per_500m is null or average_pace_ms_per_500m > 0),
  calories_kcal numeric(9,2) check (calories_kcal is null or calories_kcal >= 0),
  quality public.workout_quality not null default 'raw',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (ended_at is null or ended_at >= started_at),
  check (moving_duration_ms is null or duration_ms is null or moving_duration_ms <= duration_ms),
  check (max_spm is null or average_spm is null or max_spm >= average_spm),
  check (max_heart_rate_bpm is null or average_heart_rate_bpm is null or max_heart_rate_bpm >= average_heart_rate_bpm),
  check (max_power_watts is null or average_power_watts is null or max_power_watts >= average_power_watts)
);

create table public.workout_intervals (
  id uuid primary key default gen_random_uuid(),
  workout_id uuid not null references public.workouts(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  sequence integer not null check (sequence >= 0),
  kind public.interval_kind not null default 'unknown',
  started_offset_ms bigint check (started_offset_ms is null or started_offset_ms >= 0),
  duration_ms bigint check (duration_ms is null or duration_ms >= 0),
  distance_meters numeric(12,3) check (distance_meters is null or distance_meters >= 0),
  stroke_count integer check (stroke_count is null or stroke_count >= 0),
  average_spm numeric(6,2) check (average_spm is null or average_spm >= 0),
  average_heart_rate_bpm smallint check (average_heart_rate_bpm is null or average_heart_rate_bpm > 0),
  average_power_watts numeric(9,2) check (average_power_watts is null or average_power_watts >= 0),
  average_pace_ms_per_500m integer check (average_pace_ms_per_500m is null or average_pace_ms_per_500m > 0),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique (workout_id, sequence)
);

create table public.import_jobs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  connection_id uuid references public.source_connections(id) on delete set null,
  provider_id uuid not null references public.source_providers(id) on delete restrict,
  trigger public.import_trigger not null,
  status public.import_job_status not null default 'queued',
  attempt_count integer not null default 0 check (attempt_count >= 0),
  source_reference text,
  progress jsonb not null default '{}'::jsonb,
  error_code text,
  error_message text,
  queued_at timestamptz not null default now(),
  started_at timestamptz,
  completed_at timestamptz,
  updated_at timestamptz not null default now()
);

create table public.workout_imports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  workout_id uuid not null references public.workouts(id) on delete cascade,
  provider_id uuid not null references public.source_providers(id) on delete restrict,
  connection_id uuid references public.source_connections(id) on delete set null,
  import_job_id uuid references public.import_jobs(id) on delete set null,
  external_workout_id text,
  payload_hash text,
  raw_payload jsonb,
  artifact_path text,
  adapter_version text,
  warnings jsonb not null default '[]'::jsonb,
  imported_at timestamptz not null default now(),
  unique (connection_id, external_workout_id)
);

create unique index workout_imports_connection_payload_hash_uidx
  on public.workout_imports (connection_id, payload_hash)
  where connection_id is not null and payload_hash is not null;
create index workouts_user_started_at_idx on public.workouts (user_id, started_at desc);
create index workout_intervals_workout_sequence_idx on public.workout_intervals (workout_id, sequence);
create index import_jobs_user_status_idx on public.import_jobs (user_id, status, queued_at desc);
create index source_connections_user_idx on public.source_connections (user_id);
create index machines_user_idx on public.machines (user_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, nullif(new.raw_user_meta_data ->> 'display_name', ''));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create trigger profiles_set_updated_at before update on public.profiles
  for each row execute procedure public.set_updated_at();
create trigger source_providers_set_updated_at before update on public.source_providers
  for each row execute procedure public.set_updated_at();
create trigger source_connections_set_updated_at before update on public.source_connections
  for each row execute procedure public.set_updated_at();
create trigger machines_set_updated_at before update on public.machines
  for each row execute procedure public.set_updated_at();
create trigger workouts_set_updated_at before update on public.workouts
  for each row execute procedure public.set_updated_at();
create trigger import_jobs_set_updated_at before update on public.import_jobs
  for each row execute procedure public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.source_providers enable row level security;
alter table public.source_connections enable row level security;
alter table public.machine_models enable row level security;
alter table public.machines enable row level security;
alter table public.workouts enable row level security;
alter table public.workout_intervals enable row level security;
alter table public.import_jobs enable row level security;
alter table public.workout_imports enable row level security;

create policy "profiles_select_own" on public.profiles for select using ((select auth.uid()) = id);
create policy "profiles_update_own" on public.profiles for update using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

create policy "providers_read_enabled" on public.source_providers for select using (is_enabled);
create policy "machine_models_read" on public.machine_models for select using (true);

create policy "connections_select_own" on public.source_connections for select using ((select auth.uid()) = user_id);
create policy "connections_insert_own" on public.source_connections for insert with check ((select auth.uid()) = user_id);
create policy "connections_update_own" on public.source_connections for update using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "connections_delete_own" on public.source_connections for delete using ((select auth.uid()) = user_id);

create policy "machines_select_own" on public.machines for select using ((select auth.uid()) = user_id);
create policy "machines_insert_own" on public.machines for insert with check ((select auth.uid()) = user_id);
create policy "machines_update_own" on public.machines for update using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "machines_delete_own" on public.machines for delete using ((select auth.uid()) = user_id);

create policy "workouts_select_own" on public.workouts for select using ((select auth.uid()) = user_id);
create policy "workouts_insert_own" on public.workouts for insert with check (
  (select auth.uid()) = user_id and (
    machine_id is null or exists (
      select 1 from public.machines m where m.id = machine_id and m.user_id = (select auth.uid())
    )
  )
);
create policy "workouts_update_own" on public.workouts for update using ((select auth.uid()) = user_id) with check (
  (select auth.uid()) = user_id and (
    machine_id is null or exists (
      select 1 from public.machines m where m.id = machine_id and m.user_id = (select auth.uid())
    )
  )
);
create policy "workouts_delete_own" on public.workouts for delete using ((select auth.uid()) = user_id);

create policy "intervals_select_own" on public.workout_intervals for select using ((select auth.uid()) = user_id);
create policy "intervals_insert_own" on public.workout_intervals for insert with check (
  (select auth.uid()) = user_id and exists (
    select 1 from public.workouts w where w.id = workout_id and w.user_id = (select auth.uid())
  )
);
create policy "intervals_update_own" on public.workout_intervals for update using ((select auth.uid()) = user_id) with check (
  (select auth.uid()) = user_id and exists (
    select 1 from public.workouts w where w.id = workout_id and w.user_id = (select auth.uid())
  )
);
create policy "intervals_delete_own" on public.workout_intervals for delete using ((select auth.uid()) = user_id);

create policy "jobs_select_own" on public.import_jobs for select using ((select auth.uid()) = user_id);
create policy "jobs_insert_own" on public.import_jobs for insert with check ((select auth.uid()) = user_id);
create policy "jobs_delete_own" on public.import_jobs for delete using ((select auth.uid()) = user_id and status in ('failed', 'cancelled'));

create policy "imports_select_own" on public.workout_imports for select using ((select auth.uid()) = user_id);

insert into public.source_providers (key, display_name, source_kind, capabilities) values
  ('manual', 'Manual entry', 'manual', '{"import":true}'::jsonb),
  ('photo_ocr', 'Photo or OCR upload', 'ocr', '{"import":true,"requires_confirmation":true}'::jsonb),
  ('concept2_logbook', 'Concept2 Logbook', 'api', '{"import":true,"sync":true}'::jsonb),
  ('rp3', 'RP3', 'api', '{"import":true}'::jsonb),
  ('waterrower', 'WaterRower', 'device', '{"import":true}'::jsonb),
  ('technogym', 'Technogym', 'api', '{"import":true}'::jsonb),
  ('matrix', 'Matrix', 'api', '{"import":true}'::jsonb),
  ('bluetooth_ftms', 'Bluetooth FTMS', 'device', '{"import":true,"live":true}'::jsonb);

commit;
