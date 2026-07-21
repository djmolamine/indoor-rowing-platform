# Indoor Rowing Platform

A universal, mobile-first indoor rowing platform that normalizes workouts from many machines and import methods into one canonical model.

The repository includes the first runnable product shell: a responsive landing page, dashboard, workouts, leaderboard, challenges, and profile views. All application data is currently mocked; Supabase is intentionally not connected yet.

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
- Supabase and Vercel are planned but not connected in this version

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
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

To verify and run the production build locally:

```bash
npm run build
npm run start
```

To run the lint checks:

```bash
npm run lint
```

No environment variables are required for this mock-data version.

## Available routes

- `/` — public landing page
- `/dashboard` — authenticated-product shell preview
- `/workouts` — mock workout history and import actions
- `/leaderboard` — mock monthly community ranking
- `/challenges` — mock challenge progress
- `/profile` — mock user preferences and account summary

## Architectural decisions

- `workouts` is the canonical aggregate; source identities live in `workout_imports`.
- `workout_intervals` stores ordered splits/segments without assuming a machine vendor.
- `source_connections` stores account/device connection metadata, while secrets should live in a secret store.
- `import_jobs` models asynchronous ingestion and retry state.
- Units are stored explicitly where ambiguity is possible; normalized rowing metrics use SI-friendly conventions.

See [Technical architecture](docs/architecture.md), [Authentication](docs/authentication.md), and [Navigation](docs/navigation.md).

## Status

First runnable frontend complete. The next milestone is Supabase client setup and authentication plumbing, followed by manual workout entry through the canonical workout model.
