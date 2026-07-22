begin;

create type public.onboarding_status as enum ('not_started','in_progress','completed','skipped_optional');
create type public.record_visibility as enum ('private','connections','public');
create type public.result_status as enum ('provisional','verified','disqualified','appealed','corrected','official');
create type public.membership_status as enum ('requested','active','left','rejected','suspended');
create type public.app_role as enum ('athlete','coach','club_admin','event_organizer','federation_admin','rowform_admin');

alter table public.profiles
  add column auth_user_id uuid,
  add column email text,
  add column email_verified_at timestamptz,
  add column first_name text,
  add column last_name text,
  add column gender text,
  add column city_id uuid,
  add column manual_city text,
  add column primary_club_id uuid,
  add column onboarding_status public.onboarding_status not null default 'not_started',
  add column deleted_at timestamptz;
update public.profiles set auth_user_id=id where auth_user_id is null;
alter table public.profiles alter column auth_user_id set not null;
alter table public.profiles add constraint profiles_auth_user_id_key unique(auth_user_id);
alter table public.profiles add constraint profiles_auth_user_id_fkey foreign key(auth_user_id) references auth.users(id) on delete cascade;

create table public.countries (
  alpha2 char(2) primary key check(alpha2 ~ '^[A-Z]{2}$'),
  alpha3 char(3) not null unique check(alpha3 ~ '^[A-Z]{3}$'),
  display_name text not null unique,
  continent text not null,
  active boolean not null default true,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.cities (
  id uuid primary key default gen_random_uuid(), country_code char(2) not null references public.countries(alpha2),
  name text not null, region text, latitude numeric(9,6), longitude numeric(9,6), active boolean not null default true,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  unique(country_code,name,region)
);
create index cities_country_name_idx on public.cities(country_code,lower(name)) where active;
alter table public.profiles add constraint profiles_city_id_fkey foreign key(city_id) references public.cities(id) on delete set null;
-- Profile and club country foreign keys are added only after the production ISO seed is loaded.
-- This keeps the forward migration safe for projects that already contain profile or club rows.

create table public.athlete_passports (
  id uuid primary key default gen_random_uuid(), profile_id uuid not null unique references public.profiles(id) on delete cascade,
  public_slug text not null unique, bio text check(bio is null or char_length(bio)<=1000), avatar_url text,
  primary_machine_provider_id text references public.machine_providers(key), primary_machine_model_id uuid references public.machine_models(id),
  passport_status text not null default 'active', verification_status text not null default 'unverified',
  visibility public.passport_visibility not null default 'private', created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.profile_visibility_settings (
  profile_id uuid primary key references public.profiles(id) on delete cascade,
  full_name boolean not null default false, location boolean not null default false, club boolean not null default false,
  age_category boolean not null default false, workouts boolean not null default false, rankings boolean not null default false,
  achievements boolean not null default false, expeditions boolean not null default false, updated_at timestamptz not null default now()
);
create table public.user_roles (
  id uuid primary key default gen_random_uuid(), profile_id uuid not null references public.profiles(id) on delete cascade,
  role public.app_role not null, scope_type text not null default 'platform', scope_id uuid, granted_by uuid references public.profiles(id),
  starts_at timestamptz not null default now(), expires_at timestamptz, revoked_at timestamptz,
  unique(profile_id,role,scope_type,scope_id)
);

alter table public.clubs add column submitted_by uuid references public.profiles(id), add column city_id uuid references public.cities(id), add column normalized_official_name text;
alter table public.profiles add constraint profiles_primary_club_id_fkey foreign key(primary_club_id) references public.clubs(id) on delete set null;
update public.clubs set normalized_official_name=normalized_name where normalized_official_name is null;
alter table public.athlete_club_memberships rename to club_memberships;
alter table public.club_memberships add column membership_status public.membership_status not null default 'active';
alter table public.club_memberships add column verification_status public.club_verification_status not null default 'pending';

alter table public.workouts
  add column workout_type text not null default 'fixed_distance', add column workout_role text not null default 'training',
  add column source_method text not null default 'manual', add column visibility public.record_visibility not null default 'private',
  add column ranking_eligible boolean not null default false, add column deleted_at timestamptz;
create table public.workout_sources (
  id uuid primary key default gen_random_uuid(), workout_id uuid not null references public.workouts(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade, source_type text not null,
  provider_key text references public.machine_providers(key), external_id text, evidence_type text, captured_at timestamptz,
  metadata jsonb not null default '{}'::jsonb, created_at timestamptz not null default now()
);
create table public.workout_splits (
  id uuid primary key default gen_random_uuid(), workout_id uuid not null references public.workouts(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade, sequence integer not null check(sequence>0), split_type text not null,
  distance_meters numeric(12,3), duration_ms bigint, pace_ms_per_500m integer, watts numeric(9,2), stroke_rate numeric(6,2),
  heart_rate smallint, calories numeric(9,2), cumulative_distance_meters numeric(12,3), cumulative_duration_ms bigint,
  unique(workout_id,sequence)
);
create table public.results (
  id uuid primary key default gen_random_uuid(), athlete_id uuid not null references public.profiles(id) on delete cascade,
  workout_id uuid references public.workouts(id) on delete set null, event_id uuid, race_id uuid,
  result_type text not null, status public.result_status not null default 'provisional', competition_division text,
  age_category text, weight_category text, adaptive_classification text, machine_constraints jsonb not null default '{}'::jsonb,
  verification_tier smallint not null default 0 check(verification_tier between 0 and 5), ranking_eligible boolean not null default false,
  official_position integer check(official_position is null or official_position>0), created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.personal_bests (
  id uuid primary key default gen_random_uuid(), athlete_id uuid not null references public.profiles(id) on delete cascade,
  result_id uuid not null references public.results(id) on delete cascade, ranking_definition_id uuid references public.ranking_definitions(id),
  achieved_on date not null, current boolean not null default true, superseded_at timestamptz, created_at timestamptz not null default now()
);
create unique index personal_bests_one_current_idx on public.personal_bests(athlete_id,ranking_definition_id) where current;

create table public.expeditions (
  id uuid primary key default gen_random_uuid(), slug text not null unique, name text not null, total_distance_meters bigint not null check(total_distance_meters>0),
  status text not null default 'published', definition jsonb not null default '{}'::jsonb, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.athlete_expeditions (
  id uuid primary key default gen_random_uuid(), athlete_id uuid not null references public.profiles(id) on delete cascade,
  expedition_id uuid not null references public.expeditions(id), active boolean not null default false, started_at timestamptz not null default now(),
  completed_at timestamptz, total_contributed_meters bigint not null default 0 check(total_contributed_meters>=0), unique(athlete_id,expedition_id)
);
create unique index athlete_one_active_expedition_idx on public.athlete_expeditions(athlete_id) where active;
create table public.expedition_contributions (
  id uuid primary key default gen_random_uuid(), athlete_expedition_id uuid not null references public.athlete_expeditions(id) on delete cascade,
  workout_id uuid not null references public.workouts(id) on delete cascade, eligible_distance_meters bigint not null check(eligible_distance_meters>0),
  contributed_at timestamptz not null default now(), unique(athlete_expedition_id,workout_id)
);

create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path='' as $$
declare profile_uuid uuid; slug text;
begin
  profile_uuid:=new.id; slug:='athlete-'||lower(substr(replace(new.id::text,'-',''),1,12));
  insert into public.profiles(id,auth_user_id,email,email_verified_at,display_name,passport_id)
  values(profile_uuid,new.id,new.email,new.email_confirmed_at,nullif(new.raw_user_meta_data->>'display_name',''),public.generate_passport_id(null,new.id))
  on conflict(auth_user_id) do update set email=excluded.email,email_verified_at=excluded.email_verified_at;
  insert into public.athlete_passports(profile_id,public_slug) values(profile_uuid,slug) on conflict(profile_id) do nothing;
  insert into public.profile_visibility_settings(profile_id) values(profile_uuid) on conflict(profile_id) do nothing;
  insert into public.user_roles(profile_id,role) values(profile_uuid,'athlete') on conflict(profile_id,role,scope_type,scope_id) do nothing;
  if new.raw_user_meta_data->>'legal_accepted_at' is not null then
    insert into public.legal_acceptances(athlete_id,document_type,document_version,accepted_at) values
      (profile_uuid,'terms',coalesce(new.raw_user_meta_data->>'terms_version','2026-07-22'),(new.raw_user_meta_data->>'legal_accepted_at')::timestamptz),
      (profile_uuid,'privacy',coalesce(new.raw_user_meta_data->>'privacy_version','2026-07-22'),(new.raw_user_meta_data->>'legal_accepted_at')::timestamptz)
    on conflict do nothing;
  end if;
  return new;
end $$;

create or replace function public.sync_auth_user_profile() returns trigger language plpgsql security definer set search_path='' as $$
begin
  update public.profiles set email=new.email,email_verified_at=new.email_confirmed_at where auth_user_id=new.id;
  return new;
end $$;
drop trigger if exists on_auth_user_profile_sync on auth.users;
create trigger on_auth_user_profile_sync after update of email,email_confirmed_at on auth.users for each row execute procedure public.sync_auth_user_profile();

insert into public.athlete_passports(profile_id,public_slug,bio,visibility)
select id,'athlete-'||lower(substr(replace(id::text,'-',''),1,12)),biography,visibility from public.profiles on conflict(profile_id) do nothing;
insert into public.profile_visibility_settings(profile_id) select id from public.profiles on conflict do nothing;
insert into public.user_roles(profile_id,role) select id,'athlete' from public.profiles on conflict do nothing;

alter table public.countries enable row level security; alter table public.cities enable row level security;
alter table public.athlete_passports enable row level security; alter table public.profile_visibility_settings enable row level security;
alter table public.user_roles enable row level security; alter table public.workout_sources enable row level security;
alter table public.workout_splits enable row level security; alter table public.results enable row level security;
alter table public.personal_bests enable row level security; alter table public.expeditions enable row level security;
alter table public.athlete_expeditions enable row level security; alter table public.expedition_contributions enable row level security;
create policy countries_read_active on public.countries for select using(active);
create policy cities_read_active on public.cities for select using(active);
create policy passports_manage_own on public.athlete_passports for all using(profile_id=(select auth.uid())) with check(profile_id=(select auth.uid()));
create policy visibility_manage_own on public.profile_visibility_settings for all using(profile_id=(select auth.uid())) with check(profile_id=(select auth.uid()));
create policy roles_read_own on public.user_roles for select using(profile_id=(select auth.uid()));
create policy workout_sources_read_own on public.workout_sources for select using(user_id=(select auth.uid()));
create policy workout_sources_insert_own on public.workout_sources for insert with check(user_id=(select auth.uid()) and exists(select 1 from public.workouts w where w.id=workout_id and w.user_id=(select auth.uid())));
create policy splits_read_own on public.workout_splits for select using(user_id=(select auth.uid()));
create policy splits_insert_own on public.workout_splits for insert with check(user_id=(select auth.uid()) and exists(select 1 from public.workouts w where w.id=workout_id and w.user_id=(select auth.uid())));
create policy results_read_own on public.results for select using(athlete_id=(select auth.uid()));
create policy results_insert_self_declared on public.results for insert with check(athlete_id=(select auth.uid()) and verification_tier=0 and status='provisional' and official_position is null);
create policy personal_bests_read_own on public.personal_bests for select using(athlete_id=(select auth.uid()));
create policy expeditions_read_published on public.expeditions for select using(status='published');
create policy athlete_expeditions_manage_own on public.athlete_expeditions for all using(athlete_id=(select auth.uid())) with check(athlete_id=(select auth.uid()));
create policy contributions_read_own on public.expedition_contributions for select using(exists(select 1 from public.athlete_expeditions ae where ae.id=athlete_expedition_id and ae.athlete_id=(select auth.uid())));
create policy contributions_insert_owned_workout on public.expedition_contributions for insert with check(
  exists(select 1 from public.athlete_expeditions ae where ae.id=athlete_expedition_id and ae.athlete_id=(select auth.uid())) and
  exists(select 1 from public.workouts w where w.id=workout_id and w.user_id=(select auth.uid()) and w.deleted_at is null));

drop policy if exists workouts_select_own on public.workouts;
create policy workouts_select_own on public.workouts for select using((select auth.uid())=user_id and deleted_at is null);
drop policy if exists workouts_delete_own on public.workouts;
drop policy if exists workouts_insert_own on public.workouts;
create policy workouts_insert_own on public.workouts for insert with check(
  (select auth.uid())=user_id and coalesce(verification_tier,'manual') in('manual','unverified') and ranking_eligible=false);
drop policy if exists workouts_update_own on public.workouts;
create policy workouts_update_own on public.workouts for update using((select auth.uid())=user_id) with check(
  (select auth.uid())=user_id and coalesce(verification_tier,'manual') in('manual','unverified') and ranking_eligible=false);
revoke delete on public.workouts from authenticated;

drop policy if exists memberships_insert_own on public.club_memberships;
create policy memberships_insert_own on public.club_memberships for insert with check(
  (select auth.uid())=athlete_id and membership_status='requested' and verification_status='pending');
drop policy if exists memberships_update_own on public.club_memberships;
drop policy if exists memberships_delete_own on public.club_memberships;

create or replace view public.public_athlete_passports as
select ap.public_slug,p.display_name,case when vs.location then p.country_code end country_code,
  case when vs.location then coalesce(c.name,p.manual_city,p.city_name) end city,
  case when vs.club then cl.official_name end club_name,ap.bio,ap.avatar_url,ap.verification_status
from public.athlete_passports ap join public.profiles p on p.id=ap.profile_id
join public.profile_visibility_settings vs on vs.profile_id=p.id
left join public.cities c on c.id=p.city_id left join public.clubs cl on cl.id=p.primary_club_id
where ap.visibility='public' and p.deleted_at is null;
create or replace view public.public_ranking_results as
select r.id,ap.public_slug,p.display_name,r.result_type,r.competition_division,r.age_category,r.weight_category,
 r.verification_tier,r.official_position,w.distance_meters,w.duration_ms,w.machine_provider_key,w.machine_model_key,w.machine_class
from public.results r join public.profiles p on p.id=r.athlete_id join public.athlete_passports ap on ap.profile_id=p.id
join public.profile_visibility_settings vs on vs.profile_id=p.id left join public.workouts w on w.id=r.workout_id
where vs.rankings and r.ranking_eligible and r.status in('verified','official') and p.deleted_at is null;
create or replace view public.public_club_summaries as
select id,official_name,country_code,city_name,club_type,website,federation_affiliation,verification_status
from public.clubs where active and verification_status in('source_reviewed','federation_verified');
revoke all on public.public_athlete_passports,public.public_ranking_results,public.public_club_summaries from public;
grant select on public.public_athlete_passports,public.public_ranking_results,public.public_club_summaries to anon,authenticated;

create trigger athlete_passports_set_updated_at before update on public.athlete_passports for each row execute procedure public.set_updated_at();
create trigger countries_set_updated_at before update on public.countries for each row execute procedure public.set_updated_at();
create trigger cities_set_updated_at before update on public.cities for each row execute procedure public.set_updated_at();
create trigger results_set_updated_at before update on public.results for each row execute procedure public.set_updated_at();
create trigger expeditions_set_updated_at before update on public.expeditions for each row execute procedure public.set_updated_at();

commit;
