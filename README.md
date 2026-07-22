# Indoor Rowing Platform

A universal, mobile-first indoor rowing platform that normalizes workouts from many machines and import methods into one canonical model.

The repository includes the runnable Rowform shell plus Supabase SSR authentication, athlete-profile persistence, structured location search, curated club submissions, regional ranking foundations, and cinematic Expeditions. Workout aggregation remains mocked while the canonical model is implemented incrementally.

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

Feature and server directories contain `.gitkeep` placeholders until implementation begins.

## Run locally

Requirements: Node.js 20.9 or newer and npm.

From the repository root, run exactly:

```bash
npm install
Copy-Item .env.example .env.local
npm run dev
```

Set `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, and `NEXT_PUBLIC_SITE_URL` in `.env.local`. Apply `supabase/migrations/0001_initial_schema.sql` followed by `supabase/migrations/0002_athlete_identity_locations_rankings.sql`, then open [http://localhost:3000](http://localhost:3000).

Email/password works when Supabase email authentication and redirect URLs are enabled. Google and Apple additionally require provider-console credentials and matching callback URLs.

To verify and run the production build locally:

```bash
npm run build
npm run start
```

To run the lint checks:

```bash
npm run lint
```

Without Supabase environment variables the application remains buildable and exposes a clearly labeled local prototype mode, but live authentication and persistence are unavailable.

## Available routes

- `/` — public landing page
- `/sign-in`, `/sign-up`, `/forgot-password`, `/reset-password` — account access and recovery
- `/onboarding` — concise athlete identity setup
- `/dashboard` — authenticated athlete Lobby
- `/workouts` — mock workout history and import actions
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

Authenticated athlete identity, location, club-submission, and regional ranking foundations are implemented. The next data-backed milestone is manual workout persistence through the canonical workout model.
