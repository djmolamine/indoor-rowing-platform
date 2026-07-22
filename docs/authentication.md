# Authentication and authorization flow

| Document field | Value |
|---|---|
| **Title** | Authentication and Authorization Flow |
| **Version** | 1.0 |
| **Status** | Approved |
| **Owner** | Founders |
| **Last Reviewed** | 2026-07-22 |
| **Related Documents** | [Athlete Passport](09_ATHLETE_PASSPORT.md), [Database Foundation](06_DATABASE.md), [Notifications](11_NOTIFICATIONS.md), [Technical Architecture](architecture.md) |

## Goals

- Supabase Auth is the identity provider.
- The web app supports email/password with verification, plus Google and Apple OAuth through the same cookie-based PKCE session architecture.
- Sessions work correctly across Server Components, Server Actions, Route Handlers, and the browser.
- Database row-level security remains the final authorization boundary.
- Authentication remains separate from the Athlete Passport, provider connections, organization roles, and event eligibility.

Facebook is represented as a deferred provider configuration, not a launch method. OAuth buttons may be visible before production credentials exist only when they clearly report that configuration is required.

## Sign-up and sign-in

1. A visitor opens `/sign-in` or `/sign-up` and chooses email/password, Google, or Apple.
2. Email/password registration sends verification through Supabase Auth. OAuth uses PKCE with an allow-listed redirect to `/auth/callback`.
3. Supabase redirects to `/auth/callback` with an authorization code.
4. A Route Handler exchanges the code for a session using the server Supabase client.
5. Auth cookies are written securely, and the user is redirected to onboarding after first registration or the Lobby after returning sign-in.
6. The database trigger creates the minimum application profile on first identity creation.
7. Onboarding collects display name, country, and date of birth; city, training context, club, preferred machine, and communication permission remain skippable.

Authentication email is required for account operation and remains private by default. It is read from `auth.users`, never copied into public Passport projections, and changed only through Supabase's verified email-change flow.

## Login identities and linking

One Supabase auth user controls one athlete profile. Additional Google, Apple, or password identities must be linked to that existing auth user rather than creating another `profiles` row. Provider identity records are authentication metadata, not Athlete Passport affiliations.

Automatic merging by matching email alone is unsafe: Apple relay addresses, changed provider emails, aliases, unverified addresses, and an attacker controlling a newly recycled address can all create ambiguity. Cross-account merging remains an explicit, recently authenticated recovery workflow requiring proof of control over both identities. Until that workflow is designed, the product must prevent silent merges and direct ambiguous cases to support.

Do not put privileged profile initialization in browser code.

Optional Athlete Passport fields, notification preferences, provider permissions, and event-specific consents are collected later through value-led flows. They must not be bundled into account creation.

## Request/session flow

- A lightweight root middleware refreshes expiring auth cookies. It should not perform application authorization.
- Server code creates a request-scoped Supabase client from cookies.
- Protected layouts call `auth.getUser()` and redirect unauthenticated users to `/sign-in?next=<safe-path>`.
- Mutations validate input, obtain the authenticated user server-side, and rely on RLS for row ownership.
- Browser clients use the public anonymous key only.

## Sign-out

1. A server action calls Supabase sign-out.
2. Auth cookies are cleared.
3. The app redirects to `/` and invalidates user-specific cached data.

## Authorization

Authentication answers who the user is. Authorization is enforced in two layers:

1. Application layer: protected routes and use cases require a verified user.
2. Database layer: RLS restricts every user-owned table to `auth.uid() = user_id`.

Catalog tables such as `source_providers` and `machine_models` may be publicly readable. They are not user-writable.

Organization, coach, guardian, organizer, federation, and future World Rowing access uses explicit scoped roles with effective dates, expiry, and revocation. Shared credentials are prohibited. Public profile views use purpose-built projections that respect Athlete Passport visibility rather than exposing profile tables directly.

## Account lifecycle

- Profile edits update `public.profiles`, not `auth.users` directly.
- Email changes use Supabase Auth verification.
- Account deletion is a deliberate server-side use case requiring recent authentication. The workflow deletes or anonymizes data according to category-specific policy before removing the auth identity.
- Export and deletion workflows should include uploaded artifacts in Storage.
- Official competition results or integrity records may require disclosed limited retention; this exception must not preserve unrelated private Athlete Passport data.

## Security checklist

- Allow-list production and preview redirect URLs.
- Set secure cookie behavior through the supported Supabase SSR client.
- Prevent open redirects by accepting only application-relative `next` paths.
- Rate-limit auth and import endpoints.
- Never expose the service-role key to browser bundles.
- Never store provider OAuth tokens in `metadata` or `raw_payload`.
- Add automated RLS tests for cross-user reads, inserts, updates, and deletes.
