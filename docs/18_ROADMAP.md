# Rowform Development Roadmap

| Document field | Value |
|---|---|
| **Title** | Rowform Development Roadmap |
| **Version** | 1.0 |
| **Status** | Approved |
| **Owner** | Founders |
| **Last Reviewed** | 2026-07-22 |
| **Related Documents** | [Founding Principles](00_FOUNDING_PRINCIPLES.md), [Vision](01_VISION.md), [Product Roadmap](13_ROADMAP.md), [MVP Build Plan](17_MVP_BUILD_PLAN.md), [Product Decision Record](99_PRODUCT_DECISIONS.md) |

Rowform is a universal, athlete-first indoor-rowing platform that preserves one athlete-owned history across machines, locations, clubs, and seasons. Its long-term vision is to become the digital home of indoor rowing worldwide through a canonical workout record, the Athlete Passport, fair competition, Expeditions, purposeful community, and consented communications.

This is a living implementation roadmap, not a catalogue of product ideas. It reports what is working in the repository, what is only a prototype or technical foundation, and what engineering should build next. Strategic product sequencing remains in [13_ROADMAP.md](13_ROADMAP.md), while acceptance criteria and dependencies remain in [17_MVP_BUILD_PLAN.md](17_MVP_BUILD_PLAN.md). Priorities may change as athlete research, technical evidence, provider access, regulation, and team capacity evolve; material changes must be recorded in [99_PRODUCT_DECISIONS.md](99_PRODUCT_DECISIONS.md).

---

## Product Status

The repository now contains the Supabase authentication and database foundation: protected cookie sessions, verification and recovery flows, idempotent Profile/Passport creation, generated database contracts, RLS-protected athlete tables, server repositories, persistent onboarding and Passport edits, persistent manual workouts, and private Settings. Applying and validating the migrations against a configured non-production Supabase project remains an operational release gate; no remote success is claimed by repository-only validation.

Rowform is currently a runnable, responsive product prototype with a substantial documentation and data-model foundation. It is not yet a production service. The application builds a coherent athlete experience around realistic typed mock data and session-only prototype state; some profile operations can use Supabase when credentials and migrations are configured.

### Implemented

- [x] Next.js, TypeScript, and Tailwind CSS application foundation.
- [x] Public landing page, authentication screens, responsive authenticated shell, and protected-route redirects. The unauthenticated prototype bypass has been removed.
- [x] Athlete Lobby, workout history and entry prototype, Athlete Passport editor, rankings explorer, Expeditions catalogue and route detail, challenges view, onboarding, and basic settings screens.
- [x] Typed ISO country, country-dependent city, curated seed-club, machine-provider/model, ranking-region, competition-taxonomy, and Expedition data.
- [x] Supabase SSR client, session middleware, auth callback, server actions, and forward-only SQL migration files.
- [x] Provider-neutral canonical workout, machine-provider, competition, Athlete Passport, consent, and Expedition architecture documented in `/docs`.

### Partially implemented

- [ ] Supabase authentication, Profile/Passport persistence, onboarding, Settings, and manual workout persistence are implemented in code but still require an applied clean migration, email/provider configuration, and two-user RLS validation in a non-production project.
- [ ] Workouts can be added to the prototype session, but canonical database persistence, detail pages, editing, attachments, imports, deduplication, and provenance workflows are not complete.
- [ ] Rankings have typed filters and realistic mock results, but no persisted ranking definitions, eligibility engine, deterministic recalculation job, or verified athlete results.
- [ ] Expeditions provide eight typed journeys and a reusable route experience, but progress is local prototype state rather than canonical-workout-backed participation.
- [ ] The Athlete Passport supports structured identity, location, club, machine, and privacy fields, but most claims, visibility controls, verification, export, and deletion workflows remain incomplete.
- [ ] Machine-provider and competition taxonomies exist in TypeScript and migrations, but no live provider adapter or production organizer workflow exists.
- [ ] Club discovery has a small sourced seed directory and database-ready API boundary; global curation, federation ingestion, review, and membership history are not operational.

### Planned

- [ ] Production canonical workout ingestion, verification, records, and attachments.
- [ ] Live machine and provider integrations.
- [ ] Data-backed events, community, notifications, and public profile surfaces.
- [ ] Organizer, federation, coach, club, and administrator products.
- [ ] Production launch operations, observability, safeguarding, moderation, and support.

## Completed

These milestones are complete as repository foundations or reviewable prototypes; they are not claims of production readiness.

- [x] Established the Next.js application, responsive Rowform shell, and accessible core navigation.
- [x] Created a distinctive, action-led Athlete Lobby instead of a generic analytics dashboard.
- [x] Built prototype surfaces for Workouts, Athlete Passport, Rankings, Challenges, Expeditions, onboarding, and Settings.
- [x] Built the eight-route Expedition catalogue and reusable cinematic route renderer from typed journey definitions.
- [x] Added complete ISO country selection, country-dependent city search with manual fallback, and an incomplete sourced seed-club directory.
- [x] Defined a curated machine-provider and model catalogue with aliases, machine classes, capabilities, and explicit unknown/other states.
- [x] Defined competition formats, divisions, age bands, geographic scopes, verification tiers, and official-status taxonomy without hardcoding a governing body.
- [x] Built a commercially oriented Events prototype with marketplace discovery, Event detail, commerce-mode routing, transparent registration review, confirmation, and provider-neutral payment types.
- [x] Added Supabase SSR authentication and profile-persistence foundations, including migration files and row-level security policies.
- [x] Approved the product, business, data, competition, community, World Rowing compatibility, Expedition, and MVP execution documentation.

## In Progress

The following are the current engineering workstreams because their foundations exist but their production loops are incomplete:

- [ ] Reconcile the canonical workout domain with persisted manual entry, history, detail, edit, delete, provenance, and recalculation behavior.
- [ ] Turn the provider catalogue into a tested adapter contract and select the first integration using athlete demand and verified API access.
- [ ] Connect ranking definitions to canonical results, machine comparability rules, Passport eligibility, privacy, and auditable recalculation.
- [ ] Implement verification evidence from athlete-declared through photo-confirmed and provider-signed tiers before any official claims.
- [ ] Replace session-only Passport, club, ranking, and Expedition state with authorized Supabase repositories where the MVP phase requires persistence.
- [ ] Verify migrations, row-level security, authentication redirects, and profile lifecycle against a clean non-production Supabase environment.

## Next Priorities

Priorities follow the trusted-record-first sequence in the [MVP Build Plan](17_MVP_BUILD_PLAN.md). A checked prototype does not move ahead of an unfinished data-integrity dependency.

### High Priority

- [ ] Build canonical workout persistence and the workout detail page, including intervals, provenance, machine attribution, verification, visibility, and accessible error states.
- [ ] Add workout editing and deletion with deterministic updates to personal records, rankings, and Expedition contributions.
- [ ] Add protected workout attachments and an OCR draft/confirmation architecture; never save extracted values without athlete review.
- [ ] Implement observable, idempotent import jobs, duplicate detection, failure recovery, and the provider adapter contract.
- [ ] Begin machine integrations with manual/OCR parity tests, then Bluetooth FTMS and the first approved provider API.
- [ ] Operationalize the curated club directory, optional dated club membership, missing-club submissions, duplicate review, and verification states.
- [ ] Refine rankings around persisted definitions, clear exclusion reasons, machine classes, verification tiers, privacy opt-in, and deterministic calculation.
- [ ] Add Athlete Passport claims, field-level privacy, verification foundations, and scoped public projections.

### Medium Priority

- [ ] Replace the Event marketplace prototype with persisted organizer-owned listings, authenticated registrations, hosted checkout, payment webhooks, and audited lifecycle operations.
- [ ] Connect Expedition progress to eligible canonical workouts, contribution reversal, milestones, completion certificates, and one simple crew mode.
- [ ] Add purposeful community relationships, encouragement, block, mute, report, and moderation without an infinite feed or unrestricted messaging.
- [ ] Implement the in-app inbox, category/channel preferences, consent records, quiet hours, and optional push notifications.
- [ ] Add public Athlete Passport presentations with athlete-controlled fields and revocable sharing.
- [ ] Build club pages, verified organization presentation, and safe member discovery after club governance is operational.
- [ ] Add product-wide search for workouts, athletes who opt into discovery, clubs, events, and Expeditions.
- [ ] Improve onboarding through value-led progressive profiling and readiness outcomes rather than completion pressure.

### Long Term

- [ ] Production Bluetooth Low Energy and PM5 live connection flows.
- [ ] RP3 and additional Concept2, WaterRower, Technogym, Matrix, and provider API adapters where access and terms permit.
- [ ] Organizer portal for event configuration, entries, evidence review, results, appeals, and communications.
- [ ] Federation portal for verified roles, national programs, consented communications, credentials, and privacy-safe reporting.
- [ ] Live competition mode, live leaderboards, timing integrations, and event-grade incident operations.
- [ ] Coach tools with explicit athlete-controlled permissions and revocation.
- [ ] Versioned public API and partner integration programme.
- [ ] Native mobile applications after the responsive web platform and device workflows prove demand.

## Technical Debt

Address these items before a public production launch:

- [ ] Replace prototype-only actions, disabled controls, mock counters, hardcoded dates, and session-reset behavior with working flows or honest unavailable states.
- [ ] Replace prototype wording with production copy once each capability is backed by persistence and operations.
- [ ] Complete routes that navigation currently represents through dashboard anchors or incomplete pages, especially Events, Community, Notifications, imports, and workout detail.
- [ ] Reconcile duplicated mock/domain types with generated Supabase types and application-owned domain contracts.
- [ ] Validate all migrations from a clean database and add automated row-level-security, cross-athlete authorization, and migration tests.
- [ ] Add unit, integration, accessibility, and critical browser-flow tests; the current build-and-lint checks are necessary but insufficient.
- [ ] Add structured logging, error monitoring, import observability, privacy-safe analytics, backups, and incident runbooks.
- [ ] Audit responsive density, keyboard behavior, focus order, screen-reader semantics, reduced motion, empty states, loading states, and error recovery against WCAG 2.2 AA.
- [ ] Standardize navigation labels and route ownership across mobile and desktop while preserving durable URLs.
- [ ] Expand Settings into privacy, consent, notifications, sources, export, deletion, units, and security controls.
- [ ] Review location and club dataset licensing, freshness, localization, source attribution, and migration to server-managed curation.
- [ ] Complete security, privacy, safeguarding, moderation, retention, export, and deletion readiness before accepting real athlete data at scale.

## Release Milestones

### Phase 1: Foundation

**Objective:** Establish a reliable engineering baseline: repository conventions, validated migrations, Supabase environments, CI, authentication, authorization tests, observability, and a reconciled canonical workout model.

**Exit condition:** A clean environment can be deployed reproducibly, two athletes cannot access each other's records, and no domain boundary depends on one machine provider.

### Phase 2: Athlete Platform

**Objective:** Deliver the trusted personal record through minimum identity, manual logging, workout history/detail, provenance, basic progress, Athlete Passport privacy, export, and deletion.

**Exit condition:** Athletes can reach first value quickly, return to a correct history, understand source quality, and exercise core data rights.

### Phase 3: Competitive Rankings

**Objective:** Add personal records and a narrow ranking beta backed by explicit machine classes, verification tiers, eligibility rules, opt-in publication, and auditability.

**Exit condition:** Every ranking entry traces to an eligible canonical result, exclusions are explainable, and incompatible machines are never silently mixed.

### Phase 4: Events & Community

**Objective:** Add event discovery, one canonical-workout-backed Expedition, simple crews, consented notifications, and minimum moderation controls.

**Exit condition:** Independent and club athletes can participate safely, communications have valid consent, and engagement comes from rowing rather than a generic feed.

### Phase 5: Machine Integrations

**Objective:** Add OCR/photo confirmation, Bluetooth FTMS, and selected provider integrations through versioned, observable adapters.

**Exit condition:** Imports are accurate, idempotent, recoverable, and visibly attributed without compromising the canonical workout or ranking rules.

### Phase 6: Organizer & Federation Tools

**Objective:** Add verified organization roles, event operations, evidence review, official result workflows, scoped communications, and privacy-safe reporting.

**Exit condition:** Partners can operate named programmes without receiving ownership of athlete identity or bypassing consent, safeguarding, and audit controls.

### Phase 7: Public Launch

**Objective:** Harden the complete athlete platform for public use through accessibility, security, reliability, support, moderation, localization, data-rights operations, and launch measurement.

**Exit condition:** Launch criteria from [16_METRICS.md](16_METRICS.md) and [17_MVP_BUILD_PLAN.md](17_MVP_BUILD_PLAN.md) are approved, critical recovery paths are tested, and no partnership dependency threatens core athlete value.

## Guiding Principles

Every roadmap item must pass the decision test in the [Founding Principles](00_FOUNDING_PRINCIPLES.md). In particular, implementation must grow the sport, remain athlete-first and machine-independent, preserve athlete ownership and consent, make provenance and comparability visible, include independent athletes, and stay World Rowing compatible without becoming dependent. If delivery pressure creates an exception, record it explicitly in the [Product Decision Record](99_PRODUCT_DECISIONS.md) before implementation.
