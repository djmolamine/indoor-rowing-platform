# Indoor Rowing Platform

A universal, mobile-first indoor rowing platform that normalizes workouts from many machines and import methods into one canonical model.

This repository currently contains the MVP architecture foundation only. No UI has been implemented.

## Product principles

- Machine-agnostic: Concept2, RP3, WaterRower, Technogym, Matrix, Bluetooth devices, manual entry, and photo/OCR imports are peers.
- Canonical data: every source is converted to the same workout model.
- Traceable imports: raw source payloads are retained separately from normalized workouts.
- Secure by default: Supabase Auth and row-level security protect user data.
- Replaceable adapters: source-specific logic lives behind importer contracts, not in core tables.

## Intended stack

- Next.js (App Router) and TypeScript
- Tailwind CSS and shadcn/ui
- Supabase Auth, PostgreSQL, Storage, and Edge Functions where appropriate
- Vercel

## Repository layout

```text
src/
  app/                   # Next.js routes and layouts (no UI yet)
  components/            # Future shared and feature components
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

## Getting started (next implementation phase)

1. Scaffold Next.js with TypeScript, Tailwind, ESLint, and the App Router in this repository.
2. Initialize shadcn/ui without generating product screens.
3. Create a Supabase project and configure local development.
4. Copy environment variables into `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

The service-role key must only be available to trusted server processes and must never use the `NEXT_PUBLIC_` prefix.

5. Apply `supabase/migrations/0001_initial_schema.sql` through the Supabase CLI.
6. Generate database types into `src/types/database.generated.ts` rather than maintaining them by hand.

## Architectural decisions

- `workouts` is the canonical aggregate; source identities live in `workout_imports`.
- `workout_intervals` stores ordered splits/segments without assuming a machine vendor.
- `source_connections` stores account/device connection metadata, while secrets should live in a secret store.
- `import_jobs` models asynchronous ingestion and retry state.
- Units are stored explicitly where ambiguity is possible; normalized rowing metrics use SI-friendly conventions.

See [Technical architecture](docs/architecture.md), [Authentication](docs/authentication.md), and [Navigation](docs/navigation.md).

## Status

Architecture foundation complete. The next milestone is project scaffolding and authentication plumbing, followed by manual workout entry as the first end-to-end source adapter.
