begin;

create type public.training_context as enum ('home', 'commercial_gym', 'rowing_club', 'school_university', 'national_training_centre', 'other');
create type public.passport_visibility as enum ('private', 'connections', 'public', 'event_organizers');
create type public.club_verification_status as enum ('pending', 'source_reviewed', 'federation_verified', 'rejected');
create type public.club_source_kind as enum ('federation_import', 'administrator', 'club_submission', 'athlete_submission', 'partner_import');
create type public.ranking_region as enum ('africa', 'asia', 'europe', 'north_america', 'south_america', 'oceania');

alter table public.profiles
  add column passport_id text unique,
  add column date_of_birth date,
  add column country_code char(2),
  add column city_name text,
  add column city_region text,
  add column city_latitude numeric(9,6),
  add column city_longitude numeric(9,6),
  add column city_is_manual boolean not null default false,
  add column training_context public.training_context,
  add column preferred_machine_model_id uuid references public.machine_models(id) on delete set null,
  add column preferred_machine_label text,
  add column biography text check (biography is null or char_length(biography) <= 1000),
  add column visibility public.passport_visibility not null default 'private',
  add column onboarding_completed_at timestamptz,
  add constraint profiles_country_code_format check (country_code is null or country_code ~ '^[A-Z]{2}$'),
  add constraint profiles_city_location_valid check (
    (city_name is null and city_region is null and city_latitude is null and city_longitude is null)
    or country_code is not null
  );

create table public.clubs (
  id uuid primary key default gen_random_uuid(),
  official_name text not null check (char_length(official_name) between 2 and 160),
  normalized_name text not null,
  country_code char(2) not null check (country_code ~ '^[A-Z]{2}$'),
  city_name text not null,
  city_region text,
  club_type text not null,
  website text,
  federation_affiliation text,
  verification_status public.club_verification_status not null default 'pending',
  source_kind public.club_source_kind not null,
  source_label text not null,
  source_url text,
  source_reference text,
  active boolean not null default true,
  reviewed_by uuid references auth.users(id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index clubs_country_city_normalized_name_uidx on public.clubs(country_code, lower(city_name), normalized_name);
create index clubs_location_search_idx on public.clubs(country_code, lower(city_name), active, verification_status);

create table public.club_submissions (
  id uuid primary key default gen_random_uuid(),
  submitted_by uuid not null references auth.users(id) on delete cascade,
  proposed_name text not null check (char_length(proposed_name) between 2 and 160),
  normalized_name text not null,
  country_code char(2) not null check (country_code ~ '^[A-Z]{2}$'),
  city_name text not null,
  city_region text,
  website text,
  federation_affiliation text,
  status public.club_verification_status not null default 'pending',
  possible_duplicate_club_id uuid references public.clubs(id) on delete set null,
  review_notes text,
  reviewed_by uuid references auth.users(id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index club_submissions_review_idx on public.club_submissions(status, country_code, normalized_name);

create table public.athlete_club_memberships (
  id uuid primary key default gen_random_uuid(),
  athlete_id uuid not null references public.profiles(id) on delete cascade,
  club_id uuid references public.clubs(id) on delete restrict,
  pending_submission_id uuid references public.club_submissions(id) on delete set null,
  role text not null default 'athlete',
  starts_on date not null default current_date,
  ends_on date,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  check ((club_id is not null) <> (pending_submission_id is not null)),
  check (ends_on is null or ends_on >= starts_on)
);

create table public.communication_consents (
  id uuid primary key default gen_random_uuid(),
  athlete_id uuid not null references public.profiles(id) on delete cascade,
  purpose text not null,
  channel text not null,
  granted boolean not null,
  disclosure_version text not null,
  recorded_at timestamptz not null default now(),
  withdrawn_at timestamptz,
  unique (athlete_id, purpose, channel)
);

create table public.legal_acceptances (
  id uuid primary key default gen_random_uuid(),
  athlete_id uuid not null references public.profiles(id) on delete cascade,
  document_type text not null,
  document_version text not null,
  accepted_at timestamptz not null,
  locale text not null default 'en',
  unique (athlete_id, document_type, document_version)
);

create unique index athlete_one_active_club_uidx on public.athlete_club_memberships(athlete_id) where active;

create table public.country_ranking_regions (
  country_code char(2) primary key check (country_code ~ '^[A-Z]{2}$'),
  region public.ranking_region not null,
  rationale text,
  updated_at timestamptz not null default now()
);

create table public.ranking_definitions (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  title text not null,
  season text not null,
  distance_meters integer not null check (distance_meters > 0),
  age_category text not null,
  competition_category text not null,
  weight_category text not null,
  machine_class text not null,
  minimum_verification_tier smallint not null check (minimum_verification_tier between 0 and 5),
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.ranking_entries (
  id uuid primary key default gen_random_uuid(),
  ranking_definition_id uuid not null references public.ranking_definitions(id) on delete cascade,
  athlete_id uuid not null references public.profiles(id) on delete cascade,
  workout_id uuid references public.workouts(id) on delete cascade,
  result_milliseconds integer not null check (result_milliseconds > 0),
  country_code char(2) not null,
  region public.ranking_region not null,
  club_id uuid references public.clubs(id) on delete set null,
  published_name text not null,
  verification_tier smallint not null check (verification_tier between 0 and 5),
  calculated_at timestamptz not null default now(),
  unique (ranking_definition_id, athlete_id)
);

create index ranking_entries_scope_idx on public.ranking_entries(ranking_definition_id, region, country_code, club_id, result_milliseconds);

create or replace function public.generate_passport_id(country text, athlete_id uuid)
returns text language sql immutable set search_path = ''
as $$ select 'RF-' || coalesce(country, 'XX') || '-' || upper(substr(replace(athlete_id::text, '-', ''), 1, 8)) $$;

update public.profiles set passport_id = public.generate_passport_id(country_code, id) where passport_id is null;
alter table public.profiles alter column passport_id set not null;

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name, passport_id)
  values (new.id, nullif(new.raw_user_meta_data ->> 'display_name', ''), public.generate_passport_id(null, new.id));
  if new.raw_user_meta_data ->> 'legal_accepted_at' is not null then
    insert into public.legal_acceptances (athlete_id, document_type, document_version, accepted_at)
    values
      (new.id, 'terms', coalesce(new.raw_user_meta_data ->> 'terms_version', '2026-07-22'), (new.raw_user_meta_data ->> 'legal_accepted_at')::timestamptz),
      (new.id, 'privacy', coalesce(new.raw_user_meta_data ->> 'privacy_version', '2026-07-22'), (new.raw_user_meta_data ->> 'legal_accepted_at')::timestamptz);
  end if;
  return new;
end;
$$;

create trigger clubs_set_updated_at before update on public.clubs for each row execute procedure public.set_updated_at();
create trigger club_submissions_set_updated_at before update on public.club_submissions for each row execute procedure public.set_updated_at();
create trigger ranking_definitions_set_updated_at before update on public.ranking_definitions for each row execute procedure public.set_updated_at();

alter table public.clubs enable row level security;
alter table public.club_submissions enable row level security;
alter table public.athlete_club_memberships enable row level security;
alter table public.communication_consents enable row level security;
alter table public.legal_acceptances enable row level security;
alter table public.country_ranking_regions enable row level security;
alter table public.ranking_definitions enable row level security;
alter table public.ranking_entries enable row level security;

create policy "clubs_read_active_curated" on public.clubs for select using (active and verification_status in ('source_reviewed', 'federation_verified'));
create policy "club_submissions_insert_own" on public.club_submissions for insert with check ((select auth.uid()) = submitted_by and status = 'pending');
create policy "club_submissions_select_own" on public.club_submissions for select using ((select auth.uid()) = submitted_by);
create policy "memberships_select_own" on public.athlete_club_memberships for select using ((select auth.uid()) = athlete_id);
create policy "memberships_insert_own" on public.athlete_club_memberships for insert with check ((select auth.uid()) = athlete_id);
create policy "memberships_update_own" on public.athlete_club_memberships for update using ((select auth.uid()) = athlete_id) with check ((select auth.uid()) = athlete_id);
create policy "memberships_delete_own" on public.athlete_club_memberships for delete using ((select auth.uid()) = athlete_id);
create policy "consents_select_own" on public.communication_consents for select using ((select auth.uid()) = athlete_id);
create policy "consents_insert_own" on public.communication_consents for insert with check ((select auth.uid()) = athlete_id);
create policy "consents_update_own" on public.communication_consents for update using ((select auth.uid()) = athlete_id) with check ((select auth.uid()) = athlete_id);
create policy "legal_acceptances_select_own" on public.legal_acceptances for select using ((select auth.uid()) = athlete_id);
create policy "ranking_regions_read" on public.country_ranking_regions for select using (true);
create policy "ranking_definitions_read_published" on public.ranking_definitions for select using (published);
create policy "ranking_entries_read_published" on public.ranking_entries for select using (exists (select 1 from public.ranking_definitions d where d.id = ranking_definition_id and d.published));

insert into public.country_ranking_regions(country_code, region)
select code, 'africa'::public.ranking_region from unnest(string_to_array('DZ AO BJ BW BF BI CV CM CF TD KM CD CG CI DJ EG GQ ER SZ ET GA GM GH GN GW KE LS LR LY MG MW ML MR MU MA MZ NA NE NG RE RW SH ST SN SC SL SO ZA SS SD TZ TG TN UG EH ZM ZW YT TF BV', ' ')) code;
insert into public.country_ranking_regions(country_code, region)
select code, 'asia'::public.ranking_region from unnest(string_to_array('AF AM AZ BH BD BT BN KH CN CY GE HK IN ID IR IQ IL JP JO KZ KW KG LA LB MO MY MV MN MM NP KP OM PK PS PH QA SA SG KR LK SY TW TJ TH TL TR TM AE UZ VN YE IO', ' ')) code;
insert into public.country_ranking_regions(country_code, region)
select code, 'europe'::public.ranking_region from unnest(string_to_array('AX AL AD AT BY BE BA BG HR CZ DK EE FO FI FR DE GI GR GG VA HU IS IE IM IT JE LV LI LT LU MT MD MC ME NL MK NO PL PT RO RU SM RS SK SI ES SJ SE CH UA GB', ' ')) code;
insert into public.country_ranking_regions(country_code, region)
select code, 'north_america'::public.ranking_region from unnest(string_to_array('AI AG AW BS BB BZ BM BQ VG CA KY CR CU CW DM DO SV GL GD GP GT HT HN JM MQ MX MS NI PA PR BL KN LC MF PM VC SX TT TC US VI', ' ')) code;
insert into public.country_ranking_regions(country_code, region)
select code, 'south_america'::public.ranking_region from unnest(string_to_array('AR BO BR CL CO EC FK GF GY PY PE SR UY VE GS', ' ')) code;
insert into public.country_ranking_regions(country_code, region)
select code, 'oceania'::public.ranking_region from unnest(string_to_array('AS AU CX CC CK FJ PF GU HM KI MH FM NR NC NZ NU NF MP PW PG PN WS SB TK TO TV UM VU WF AQ', ' ')) code;

create or replace view public.public_athlete_profiles as
select id, passport_id, display_name, country_code, city_name, training_context, preferred_machine_label, biography, created_at
from public.profiles where visibility = 'public';

grant select on public.public_athlete_profiles to anon, authenticated;
revoke all on public.profiles from anon;

insert into public.clubs (id, official_name, normalized_name, country_code, city_name, club_type, website, federation_affiliation, verification_status, source_kind, source_label, source_url) values
  ('00000000-0000-4000-8000-000000000101', 'Leander Club', 'leander club', 'GB', 'Henley-on-Thames', 'high_performance', 'https://www.leander.co.uk/', 'British Rowing', 'source_reviewed', 'administrator', 'Official club website', 'https://www.leander.co.uk/'),
  ('00000000-0000-4000-8000-000000000102', 'Tideway Scullers School', 'tideway scullers school', 'GB', 'London', 'community', 'https://www.tidewayscullers.com/', 'British Rowing', 'source_reviewed', 'administrator', 'Official club website', 'https://www.tidewayscullers.com/'),
  ('00000000-0000-4000-8000-000000000103', 'Riverside Boat Club', 'riverside boat club', 'US', 'Cambridge', 'community', 'https://www.riversideboatclub.com/', 'USRowing', 'source_reviewed', 'administrator', 'Official club website', 'https://www.riversideboatclub.com/'),
  ('00000000-0000-4000-8000-000000000104', 'Community Rowing, Inc.', 'community rowing inc', 'US', 'Boston', 'community', 'https://www.communityrowing.org/', 'USRowing', 'source_reviewed', 'administrator', 'Official club website', 'https://www.communityrowing.org/'),
  ('00000000-0000-4000-8000-000000000105', 'Sydney Rowing Club', 'sydney rowing club', 'AU', 'Sydney', 'high_performance', 'https://www.sydneyrowingclub.com.au/', 'Rowing Australia', 'source_reviewed', 'administrator', 'Official club website', 'https://www.sydneyrowingclub.com.au/'),
  ('00000000-0000-4000-8000-000000000106', 'UTS Haberfield Rowing Club', 'uts haberfield rowing club', 'AU', 'Sydney', 'school_university', 'https://www.utsrowing.com.au/', 'Rowing NSW', 'source_reviewed', 'administrator', 'Official club website', 'https://www.utsrowing.com.au/'),
  ('00000000-0000-4000-8000-000000000107', 'Rowing Club Lausanne', 'rowing club lausanne', 'CH', 'Lausanne', 'community', 'https://www.rowing-club-lausanne.ch/', 'Swiss Rowing', 'source_reviewed', 'administrator', 'Official club website', 'https://www.rowing-club-lausanne.ch/'),
  ('00000000-0000-4000-8000-000000000108', 'Berliner Ruder-Club', 'berliner ruder-club', 'DE', 'Berlin', 'community', 'https://www.berliner-ruder-club.de/', 'Deutscher Ruderverband', 'source_reviewed', 'administrator', 'Official club website', 'https://www.berliner-ruder-club.de/');

commit;
