begin;

create type public.credential_status as enum ('submitted','under_review','verified','rejected','expired','revoked');
create type public.eligibility_decision as enum ('pending','approved','rejected','more_information_required');

create table public.credential_types (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  name text not null,
  category text not null,
  description text,
  sensitive boolean not null default false,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.credential_requirements (
  id uuid primary key default gen_random_uuid(),
  credential_type_id uuid not null references public.credential_types(id),
  name text not null,
  instructions text,
  accepted_issuers jsonb not null default '[]'::jsonb,
  document_required boolean not null default false,
  organizer_approval_required boolean not null default true,
  definition_version integer not null default 1,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.event_credential_requirements (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null,
  race_id uuid,
  requirement_id uuid not null references public.credential_requirements(id),
  required boolean not null default false,
  configuration jsonb not null default '{}'::jsonb,
  created_by uuid not null references public.profiles(id),
  created_at timestamptz not null default now(),
  unique(event_id,race_id,requirement_id)
);

create table public.athlete_credentials (
  id uuid primary key default gen_random_uuid(),
  athlete_id uuid not null references public.profiles(id) on delete cascade,
  credential_type_id uuid not null references public.credential_types(id),
  status public.credential_status not null default 'submitted',
  issuing_organization text not null,
  serial_reference text,
  issued_at date,
  expires_at date,
  verified_at timestamptz,
  verified_by uuid references public.profiles(id),
  source_registration_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (status <> 'verified' or (verified_at is not null and verified_by is not null))
);

create table public.credential_documents (
  id uuid primary key default gen_random_uuid(),
  athlete_credential_id uuid references public.athlete_credentials(id) on delete cascade,
  registration_id uuid,
  athlete_id uuid not null references public.profiles(id) on delete cascade,
  storage_path text not null,
  original_filename text not null,
  mime_type text not null,
  size_bytes bigint not null check(size_bytes > 0),
  uploaded_at timestamptz not null default now()
);

create table public.credential_verifications (
  id uuid primary key default gen_random_uuid(),
  athlete_credential_id uuid not null references public.athlete_credentials(id) on delete cascade,
  decision public.credential_status not null,
  verifier_id uuid not null references public.profiles(id),
  verifier_organization text not null,
  notes text,
  decided_at timestamptz not null default now(),
  check (decision in ('verified','rejected','expired','revoked'))
);

create table public.registration_credential_submissions (
  id uuid primary key default gen_random_uuid(),
  registration_id uuid not null,
  athlete_id uuid not null references public.profiles(id) on delete cascade,
  event_requirement_id uuid not null references public.event_credential_requirements(id),
  athlete_credential_id uuid references public.athlete_credentials(id),
  issuing_authority text,
  credential_number text,
  classification_date date,
  expires_at date,
  notes text,
  status public.credential_status not null default 'submitted',
  submitted_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(registration_id,event_requirement_id)
);

create table public.registration_eligibility_decisions (
  id uuid primary key default gen_random_uuid(),
  registration_id uuid not null,
  athlete_id uuid not null references public.profiles(id) on delete cascade,
  event_id uuid not null,
  decision public.eligibility_decision not null default 'pending',
  decided_by uuid references public.profiles(id),
  reason text,
  decided_at timestamptz,
  updated_at timestamptz not null default now(),
  unique(registration_id)
);

create table public.credential_audit_log (
  id uuid primary key default gen_random_uuid(),
  athlete_id uuid not null references public.profiles(id) on delete cascade,
  athlete_credential_id uuid references public.athlete_credentials(id),
  registration_id uuid,
  actor_id uuid not null references public.profiles(id),
  action text not null,
  previous_state jsonb,
  new_state jsonb,
  reason text,
  created_at timestamptz not null default now()
);

create or replace function public.is_credential_reviewer()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.user_roles ur
    join public.profiles p on p.id = ur.profile_id
    where p.auth_user_id = (select auth.uid())
      and ur.role in ('event_organizer','federation_admin','rowform_admin')
      and ur.revoked_at is null
      and (ur.expires_at is null or ur.expires_at > now())
  );
$$;

alter table public.credential_types enable row level security;
alter table public.credential_requirements enable row level security;
alter table public.event_credential_requirements enable row level security;
alter table public.athlete_credentials enable row level security;
alter table public.credential_documents enable row level security;
alter table public.credential_verifications enable row level security;
alter table public.registration_credential_submissions enable row level security;
alter table public.registration_eligibility_decisions enable row level security;
alter table public.credential_audit_log enable row level security;

create policy "credential_catalog_read_active" on public.credential_types for select using (active);
create policy "credential_requirements_read_active" on public.credential_requirements for select using (active);
create policy "event_requirements_read_authenticated" on public.event_credential_requirements for select to authenticated using (true);
create policy "event_requirements_manage_reviewers" on public.event_credential_requirements for all to authenticated using (public.is_credential_reviewer()) with check (public.is_credential_reviewer());

create policy "athletes_read_own_credentials" on public.athlete_credentials for select to authenticated
  using (athlete_id in (select id from public.profiles where auth_user_id = (select auth.uid())));
create policy "reviewers_manage_credentials" on public.athlete_credentials for all to authenticated
  using (public.is_credential_reviewer()) with check (public.is_credential_reviewer());

create policy "athletes_manage_own_documents" on public.credential_documents for all to authenticated
  using (athlete_id in (select id from public.profiles where auth_user_id = (select auth.uid())))
  with check (athlete_id in (select id from public.profiles where auth_user_id = (select auth.uid())));
create policy "reviewers_read_documents" on public.credential_documents for select to authenticated using (public.is_credential_reviewer());

create policy "athletes_read_own_verifications" on public.credential_verifications for select to authenticated
  using (athlete_credential_id in (select id from public.athlete_credentials where athlete_id in (select id from public.profiles where auth_user_id = (select auth.uid()))));
create policy "reviewers_create_verifications" on public.credential_verifications for insert to authenticated with check (public.is_credential_reviewer());

create policy "athletes_manage_own_submissions" on public.registration_credential_submissions for all to authenticated
  using (athlete_id in (select id from public.profiles where auth_user_id = (select auth.uid())))
  with check (athlete_id in (select id from public.profiles where auth_user_id = (select auth.uid())) and status in ('submitted','under_review'));
create policy "reviewers_manage_submissions" on public.registration_credential_submissions for all to authenticated
  using (public.is_credential_reviewer()) with check (public.is_credential_reviewer());

create policy "athletes_read_own_eligibility" on public.registration_eligibility_decisions for select to authenticated
  using (athlete_id in (select id from public.profiles where auth_user_id = (select auth.uid())));
create policy "reviewers_manage_eligibility" on public.registration_eligibility_decisions for all to authenticated
  using (public.is_credential_reviewer()) with check (public.is_credential_reviewer());
create policy "athletes_read_own_credential_audit" on public.credential_audit_log for select to authenticated
  using (athlete_id in (select id from public.profiles where auth_user_id = (select auth.uid())));
create policy "reviewers_create_credential_audit" on public.credential_audit_log for insert to authenticated with check (public.is_credential_reviewer());

create index athlete_credentials_athlete_status_idx on public.athlete_credentials(athlete_id,status);
create index credential_submissions_registration_idx on public.registration_credential_submissions(registration_id,status);
create index credential_audit_athlete_created_idx on public.credential_audit_log(athlete_id,created_at desc);

commit;
