begin;

-- Users created before the application schema was installed never fired the
-- profile trigger. Backfill the same one-to-one records idempotently.
insert into public.profiles (
  id, auth_user_id, email, email_verified_at, display_name, passport_id
)
select
  u.id,
  u.id,
  u.email,
  u.email_confirmed_at,
  nullif(u.raw_user_meta_data ->> 'display_name', ''),
  public.generate_passport_id(null, u.id)
from auth.users u
on conflict (id) do update
set auth_user_id = excluded.auth_user_id,
    email = excluded.email,
    email_verified_at = excluded.email_verified_at;

insert into public.athlete_passports (profile_id, public_slug)
select p.id, 'athlete-' || lower(substr(replace(p.id::text, '-', ''), 1, 12))
from public.profiles p
on conflict (profile_id) do nothing;

insert into public.profile_visibility_settings (profile_id)
select p.id from public.profiles p
on conflict (profile_id) do nothing;

insert into public.user_roles (profile_id, role)
select p.id, 'athlete'::public.app_role
from public.profiles p
where not exists (
  select 1 from public.user_roles r
  where r.profile_id = p.id
    and r.role = 'athlete'
    and r.scope_type = 'platform'
    and r.revoked_at is null
);

insert into public.legal_acceptances (
  athlete_id, document_type, document_version, accepted_at
)
select u.id, legal.document_type, legal.document_version,
       (u.raw_user_meta_data ->> 'legal_accepted_at')::timestamptz
from auth.users u
cross join lateral (
  values
    ('terms', coalesce(u.raw_user_meta_data ->> 'terms_version', '2026-07-22')),
    ('privacy', coalesce(u.raw_user_meta_data ->> 'privacy_version', '2026-07-22'))
) as legal(document_type, document_version)
where u.raw_user_meta_data ->> 'legal_accepted_at' is not null
on conflict (athlete_id, document_type, document_version) do nothing;

commit;
