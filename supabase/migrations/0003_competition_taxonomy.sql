begin;

create type public.ranking_format_kind as enum ('fixed_distance', 'fixed_time', 'relay_distance');
create type public.ranking_official_status as enum ('world_rowing_official', 'federation_official', 'organizer_official', 'rowform_standard', 'community_challenge');
create type public.lightweight_evidence_status as enum ('declared', 'evidence_submitted', 'organizer_verified', 'federation_verified');

alter table public.ranking_definitions rename column competition_category to competition_division;
alter table public.ranking_definitions alter column distance_meters drop not null;
alter table public.ranking_definitions add column format_kind public.ranking_format_kind not null default 'fixed_distance';
alter table public.ranking_definitions add column target_seconds integer check (target_seconds > 0);
alter table public.ranking_definitions add column official_status public.ranking_official_status not null default 'rowform_standard';
alter table public.ranking_definitions add column age_calculation_date date;
alter table public.ranking_definitions add column adaptive_classification_id uuid;
alter table public.ranking_definitions add constraint ranking_target_matches_format check (
  (format_kind in ('fixed_distance','relay_distance') and distance_meters is not null and target_seconds is null)
  or (format_kind = 'fixed_time' and target_seconds is not null and distance_meters is null)
);

alter table public.ranking_entries alter column result_milliseconds drop not null;
alter table public.ranking_entries add column result_distance_meters integer check (result_distance_meters > 0);
alter table public.ranking_entries add constraint ranking_result_matches_definition check (
  (result_milliseconds is not null and result_distance_meters is null)
  or (result_milliseconds is null and result_distance_meters is not null)
);

create table public.adaptive_classifications (
  id uuid primary key default gen_random_uuid(),
  event_edition_id uuid,
  category_code text not null,
  display_name text not null,
  applicable_distance_meters integer,
  applicable_duration_seconds integer,
  eligibility_status text not null,
  verification_authority text not null,
  active boolean not null default true,
  unique (event_edition_id, category_code)
);

alter table public.ranking_definitions add constraint ranking_adaptive_classification_fk foreign key (adaptive_classification_id) references public.adaptive_classifications(id);

create table public.competition_weigh_ins (
  id uuid primary key default gen_random_uuid(),
  athlete_id uuid not null references public.profiles(id) on delete cascade,
  event_edition_id uuid,
  measured_weight_kg numeric(5,2),
  competition_division text not null check (competition_division in ('lightweight-men','lightweight-women')),
  evidence_status public.lightweight_evidence_status not null default 'declared',
  evidence_path text,
  verified_by uuid,
  measured_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.adaptive_classifications enable row level security;
alter table public.competition_weigh_ins enable row level security;
create policy "adaptive_classifications_read_active" on public.adaptive_classifications for select using (active);
create policy "weigh_ins_select_own" on public.competition_weigh_ins for select using ((select auth.uid()) = athlete_id);
create policy "weigh_ins_insert_own_declared" on public.competition_weigh_ins for insert with check ((select auth.uid()) = athlete_id and evidence_status in ('declared','evidence_submitted'));

drop index if exists public.ranking_entries_scope_idx;
create index ranking_entries_scope_idx on public.ranking_entries(ranking_definition_id, region, country_code, club_id, result_milliseconds, result_distance_meters);

commit;
