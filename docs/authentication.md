# Authentication and authorization flow

## Goals

- Supabase Auth is the identity provider.
- The web app supports email magic link or one-time password first; OAuth providers can be added later.
- Sessions work correctly across Server Components, Server Actions, Route Handlers, and the browser.
- Database row-level security remains the final authorization boundary.

## Sign-up and sign-in

1. A visitor opens `/sign-in` or `/sign-up`.
2. The client requests an email link/OTP from Supabase Auth with an allow-listed redirect to `/auth/callback`.
3. Supabase redirects to `/auth/callback` with an authorization code.
4. A Route Handler exchanges the code for a session using the server Supabase client.
5. Auth cookies are written securely, and the user is redirected to `/workouts`.
6. The database trigger creates `public.profiles` on first identity creation.

Do not put privileged profile initialization in browser code.

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

## Account lifecycle

- Profile edits update `public.profiles`, not `auth.users` directly.
- Email changes use Supabase Auth verification.
- Account deletion is a deliberate server-side use case requiring recent authentication. Deleting the auth identity cascades user-owned records according to the schema.
- Export and deletion workflows should include uploaded artifacts in Storage.

## Security checklist

- Allow-list production and preview redirect URLs.
- Set secure cookie behavior through the supported Supabase SSR client.
- Prevent open redirects by accepting only application-relative `next` paths.
- Rate-limit auth and import endpoints.
- Never expose the service-role key to browser bundles.
- Never store provider OAuth tokens in `metadata` or `raw_payload`.
- Add automated RLS tests for cross-user reads, inserts, updates, and deletes.
