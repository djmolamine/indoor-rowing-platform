# Indoor Rowing Platform

A universal, mobile-first indoor rowing platform that normalizes workouts from many machines and import methods into one canonical model.

The repository includes the runnable Rowform shell plus Supabase SSR authentication, private Profile and Athlete Passport persistence, structured location search, curated club submissions, persistent manual workouts, regional ranking foundations, and cinematic Expeditions. Controlled competitive and Expedition seed data remain temporary development fixtures.

## Product principles

- Machine-agnostic: Concept2, RP3, WaterRower, Technogym, Matrix, Bluetooth devices, manual entry, and photo/OCR imports are peers.
- Canonical data: every source is converted to the same workout model.
- Traceable imports: raw source payloads are retained separately from normalized workouts.
- Secure by default: Supabase Auth and row-level security protect user data.
- Replaceable adapters: source-specific logic lives behind importer contracts, not in core tables.

## Stack

- Next.js 16 with the App Router
- React 19 and TypeScript
- Tailwind CSS 4
- Lucide icons
- Supabase authentication and persistence through environment-provided project credentials

## Repository layout

```text
src/
  app/                   # Next.js routes, layouts, and global styles
  components/            # Shared navigation and presentation components
  features/              # Vertical product features
  lib/                    # Framework integrations and shared utilities
  server/                 # Server-only application code
  types/                  # Shared TypeScript contracts
docs/
  architecture.md        # System design and boundaries
  authentication.md      # Authentication and authorization flow
  navigation.md          # Route and navigation model
supabase/
  migrations/            # Versioned PostgreSQL schema
  seed.sql                # Optional local-development seed entrypoint
```

## Run locally

Requirements: Node.js 20.9 or newer and npm.

From the repository root, run exactly:

```bash
npm install
Copy-Item .env.example .env.local
npm run dev
```

Set `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, and `NEXT_PUBLIC_APP_URL` in `.env.local`. Keep `SUPABASE_SERVICE_ROLE_KEY` empty unless a reviewed server-only administrative workflow requires it. Apply every migration in filename order through `0005_authentication_database_foundation.sql`, then open [http://localhost:3000](http://localhost:3000).

Enable email/password in Supabase and allow-list `/auth/callback` for local, preview, and production URLs. Google or Apple requires provider-console credentials and Supabase provider configuration; enable its public capability flag only after configuration succeeds. The database trigger creates exactly one Profile, Athlete Passport, private visibility record, and athlete role for each new Auth user. Never seed a production authentication user.

To verify and run the production build locally:

```bash
npm run build
npm run start
```

To run the lint checks:

```bash
npm run lint
```

With the Supabase CLI installed and a local project linked, the repeatable database workflow is:

```bash
supabase start
supabase db reset
supabase gen types typescript --local > src/types/database.generated.ts
```

`supabase db reset` applies versioned migrations and then `supabase/seed.sql`. The seed file contains only production-safe reference entrypoints; development athletes must be created through Supabase Auth, never inserted into production authentication data.

The repository remains buildable without real secrets, but protected routes fail closed and redirect to sign-in with a configuration message. There is no unauthenticated private-data demo bypass.

## Available routes

- `/` — public landing page
- `/sign-in`, `/sign-up`, `/forgot-password`, `/reset-password` — account access and recovery
- `/onboarding` — concise athlete identity setup
- `/dashboard` — authenticated athlete Lobby
- `/workouts` — persisted athlete-owned manual workout history; provider imports remain planned
- `/leaderboard` — World, continent, country, and club ranking prototype
- `/challenges` — mock challenge progress
- `/profile` — persisted Athlete Passport with private-by-default fields
- `/settings` — verified email and session controls

## Architectural decisions

- `workouts` is the canonical aggregate; source identities live in `workout_imports`.
- `workout_intervals` stores ordered splits/segments without assuming a machine vendor.
- `source_connections` stores account/device connection metadata, while secrets should live in a secret store.
- `import_jobs` models asynchronous ingestion and retry state.
- Units are stored explicitly where ambiguity is possible; normalized rowing metrics use SI-friendly conventions.

See [Product requirements](docs/product-requirements.md), [Technical architecture](docs/architecture.md), [Authentication](docs/authentication.md), and [Navigation](docs/navigation.md).

## Status

Authenticated identity, Profile/Passport separation, privacy defaults, onboarding, Settings, manual workout persistence, generated database contracts, and RLS foundations are implemented in code. A clean non-production migration run, two-user authorization test, email-delivery configuration, and recovery-flow test remain required before production use.
