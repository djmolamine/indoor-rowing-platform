# Database and Data-Domain Foundation

| Document field | Value |
|---|---|
| **Title** | Database and Data-Domain Foundation |
| **Version** | 1.0 |
| **Status** | Approved |
| **Owner** | Founders |
| **Last Reviewed** | 2026-07-22 |
| **Related Documents** | [Technical Architecture](architecture.md), [Machine Providers](07_MACHINE_PROVIDERS.md), [Competitions](08_COMPETITIONS.md), [Athlete Passport](09_ATHLETE_PASSPORT.md) |

## Purpose

This document defines the product-facing data model that engineering should preserve as the platform grows. It complements the implementation detail in [architecture.md](architecture.md) and the initial migration. The database must model the sport and the athlete relationship—not a particular provider API.

## Domain boundaries

The system is divided into related but independently governed domains:

1. Identity and account
2. Athlete Passport and privacy
3. Machines, providers, and connections
4. Workouts, intervals, and provenance
5. Verification and personal records
6. Seasons, rankings, and leaderboards
7. Events, competitions, entries, and results
8. Challenges, River Expeditions, teams, and clubs
9. Organizations, federations, and roles
10. Consent, notifications, and communications
11. Audit, moderation, export, and deletion

Domain tables should use stable internal UUIDs. External identifiers are scoped to their provider or issuing organization and never become primary identities.

## Athlete and identity model

### Implemented foundation

Migration `0005_authentication_database_foundation.sql` makes the account boundary explicit. `profiles.auth_user_id` is unique and references `auth.users`; the existing profile UUID remains stable so earlier foreign keys do not require destructive rewrites. One Profile owns one `athlete_passports` row and one `profile_visibility_settings` row. `user_roles` prepares scoped authorization, while only the non-editable athlete grant is currently used by the MVP.

Canonical `countries` and country-dependent `cities` tables are distinct from manually entered locality fallback. Clubs and dated `club_memberships` remain separate from the temporary primary-club presentation. The complete ISO catalogue remains maintained source data and must be loaded before the later country foreign-key validation migration is enabled for an existing project.

The workout ledger now includes canonical role, source, visibility, ranking eligibility, and soft deletion. `workout_sources`, `workout_splits`, existing `workout_intervals`, `results`, `personal_bests`, `expeditions`, `athlete_expeditions`, and `expedition_contributions` use explicit ownership and relationships. A result references a workout instead of copying its metrics.

All athlete-owned additions have RLS. Athlete-created Results are constrained to provisional, tier-zero claims with no official position; organizer and federation mutation policies remain intentionally absent. Public views exclude email, authentication UUIDs, date of birth, private notes, device identifiers, internal evidence, and deleted records.

### Account

Authentication identity, verified email, security state, account lifecycle, and accepted legal documents. Authentication credentials remain in Supabase Auth; application profile data remains in application tables.

### Athlete

The stable person-level entity behind the Athlete Passport. One account initially controls one athlete identity. Future guardian, dependent, or delegated access must be modeled through explicit relationships rather than shared credentials.

### Profile attributes

Each profile attribute should have value, source, verification status, visibility, updated time, and—where relevant—effective dates. Required and optional fields are defined in [09_ATHLETE_PASSPORT.md](09_ATHLETE_PASSPORT.md).

The authenticated athlete profile is one-to-one with `auth.users`. It stores Passport ID, display name, private date of birth, ISO country code, selected or manual city with optional region and coordinates, training context, optional club relationship, preferred machine, biography, visibility, and lifecycle timestamps. Authentication email remains in Supabase Auth and is excluded from public profile projections.

### Relationships

Club, team, coach, organizer, and federation relationships are dated entities with roles and status. A single `club_id` column on the profile is insufficient because athletes change organizations, can have multiple roles, and need history.

`Club` is a curated directory record with location, official website, federation affiliation, verification status, provenance, and active state. `ClubSubmission` preserves athlete-proposed missing clubs as pending review records with duplicate candidates. Pending submissions never inherit verified presentation.

## Canonical workout model

`Workout` is the normalized aggregate:

- Athlete and ownership
- Activity type
- Start/end time and source time zone
- Duration and moving duration
- Distance
- Stroke count and stroke rate
- Pace per 500 meters
- Power
- Heart rate
- Calories where provided
- Title and notes
- Physical machine reference where known
- Data quality and visibility
- Source-neutral metadata extensions

`WorkoutInterval` stores ordered work, rest, warm-up, cool-down, and unknown segments. It may include interval-level duration, distance, pace, power, stroke rate, heart rate, and provider metadata.

Missing values are `NULL`, not zero. Derived values must identify derivation logic and version when they influence records, rankings, or reporting.

## Provenance and imports

Every non-native workout has one or more provenance records containing:

- Provider and connection
- External workout identifier
- Payload hash and deduplication key
- Import job and adapter version
- Raw payload or artifact reference under controlled retention
- Original units and timestamps
- Normalization warnings
- Athlete confirmations or corrections
- Import and reprocessing times

Provider payloads never define canonical columns directly. Adapters translate into a draft, validation evaluates it, and persistence writes canonical data and provenance in one transaction.

## Machines and comparability

Separate:

- Manufacturer/provider
- Machine model
- Physical machine instance
- Firmware or console version
- Connection or capture source
- Comparability class

A provider may serve multiple machine types. A physical gym machine may be used by many athletes. A workout can name a model without requiring ownership. Comparability classes are versioned rule objects, not hardcoded provider assumptions.

`MachineProvider` is a curated canonical record with stable key, display name, active state, supported classes, connection capabilities, ranking comparability status, verification capability, and optional icon. `MachineProviderAlias` normalizes imported spellings to that key. `MachineModel` belongs to one provider and stores a stable key, reviewed name, suggested class, capabilities, and active state. Other and Unknown remain explicit controlled values.

Every workout may preserve provider key, model key or reviewed free-text fallback, explicit machine class, connection/source method, and verification provenance independently of its physical machine instance. Ranking definitions can constrain provider, model, and class; materialized entries retain the machine attribution used when eligibility was calculated. Strict rankings reject unknown equipment unless a versioned event rule explicitly permits it.

## Verification model

Verification is an append-only evidence chain:

- Claim being verified
- Verification tier
- Evidence type and protected location
- Issuer or verifier
- Rule set and version
- Status: pending, accepted, rejected, expired, revoked, superseded
- Decision reason and timestamps

Verification applies to a workout, result, identity attribute, affiliation, achievement, or event entry. A verified workout is not automatically comparable across machine classes.

## Seasons, records, and rankings

### Season

A versioned period owned by the platform, an organization, or a competition. The system supports calendar years, federation seasons, event windows, and athlete-defined training cycles.

### Personal record

A derived claim referencing the underlying workout/result, record definition, machine class, verification tier, and effective period. Records are recomputable and retain supersession history.

### Ranking definition

Defines event format, distance in meters or duration in seconds, season, configurable age calculation date and category rules, competition division, weight category, geography, club/federation scope, machine eligibility, verification requirement, official-status classification, tie-breaking, privacy requirements, and publication status. Fixed-distance and relay definitions have a distance target and produce elapsed-time results; fixed-time definitions have a duration target and produce completed-distance results. The database prevents one entry from mixing both result measures.

Competition division is not an alias for personal gender. Lightweight eligibility references an event-specific `CompetitionWeighIn` and its evidence state rather than editable profile weight. `AdaptiveClassification` is owned by an event edition and stores code, display label, applicable distance or duration, eligibility status, verification authority, and active state. This permits event-defined IAR or adaptive structures without schema or page changes.

### Ranking entry

References an athlete's result and materialized rank. The source result remains authoritative; ranks can be recalculated without rewriting history.

Geographic ranking scope is `World`, `Continent`, `Country`, or `Club`. Country-to-continent assignment uses an explicit reviewed mapping for Africa, Asia, Europe, North America, South America, and Oceania; it is not inferred at query time. The model can add subregional groupings later without changing country identity.

## Competitions and events

### Competition credential system

Identity and Event eligibility are separate domains. The flexible credential ledger comprises `credential_types`, `credential_requirements`, `event_credential_requirements`, `athlete_credentials`, `credential_documents`, `credential_verifications`, `registration_credential_submissions`, `registration_eligibility_decisions`, and the append-only `credential_audit_log`.

Credential types are extensible rather than hardcoded as profile columns. Event requirements determine whether a federation licence, adaptive classification, medical clearance, accreditation, safety certificate, or future governing-body credential is needed. Athlete submissions are scoped to a registration; only an authorized organizer, federation administrator, or Rowform administrator may create a verification decision or verified credential. Athletes can read their own credentials and submit their own evidence, but Row Level Security prevents them from self-verifying.

Documents are private objects referenced by protected metadata. Public Passport projections may expose only the minimum verified endorsement fields approved for presentation; they never expose raw documents, medical details, disability information, or review notes.

Core entities:

- `Organization` and verified roles
- `EventSeries`
- `EventEdition`
- `Competition` or race within an event
- `RuleSet` and accepted machine classes
- `CategoryDefinition`
- `Entry`
- `EligibilityAssessment`
- `Result`
- `ResultEvidence`
- `Appeal` and `Decision`
- `OfficialCommunication`

Registration may be external. Store the handoff and athlete intent without copying unnecessary registration data. See [08_COMPETITIONS.md](08_COMPETITIONS.md).

### Event commerce entities

The commercial Event domain uses stable internal IDs and explicit relationships:

- `Organizer` and `OrganizerUser` hold verified organization identity, scoped administrators, billing readiness, payout readiness, commercial agreement, federation affiliation, and Event ownership.
- `Event`, `EventSource`, and `EventPromotion` hold lifecycle, commerce mode, provenance, ownership, paid-placement disclosure, and targeting metadata.
- `Race` holds versioned format, eligibility, machine, verification, scoring, capacity, ranking, and medal rules.
- `Registration` and `RegistrationEntry` connect athlete, Passport presentation, Event, race, categories, affiliation, acceptances, payment, and later result.
- `Payment`, `Fee`, `Discount`, `Payout`, and `Refund` preserve provider references, currency and minor-unit amounts, transparent fee allocation, status, disputes, and timestamps. Card details never enter Rowform storage.
- `EventResult` connects race, registration, athlete, canonical workout where available, verification decision, ranking definition, and Passport claim.
- `EventNotice`, `Waiver`, and `AthleteWaiverAcceptance` preserve versioned communication and acceptance evidence.

External registration creates no native payment or confirmed Entry unless an organizer-authorized reconciliation import explicitly does so. Native payments use hosted checkout; webhooks update idempotent payment state and never trust browser success alone. See [19_EVENTS_ARCHITECTURE.md](19_EVENTS_ARCHITECTURE.md).

## Community and missions

Keep long-lived organization membership separate from temporary challenge teams. Core concepts include training relationship, follow, club membership, team membership, challenge participation, River Expedition, crew, milestone, contribution, encouragement, moderation report, and block.

Workout contribution should reference an eligible canonical workout rather than copy metrics into each challenge. Snapshot values may be stored for audit when challenge rules require immutable scoring.

## Consent and communications

Consent records contain purpose, category, channel where applicable, status, disclosure version, source, locale, timestamp, and withdrawal. Notification endpoints contain platform tokens but never imply consent.

Every message references sender organization, message category, lawful/consent basis, audience rule, template version, delivery attempts, and suppression reason. See [11_NOTIFICATIONS.md](11_NOTIFICATIONS.md).

## Privacy and authorization

- User-owned rows use row-level security.
- Organization access uses explicit membership and scoped roles.
- Public profile and ranking views use purpose-built projections, not direct access to private tables.
- Sensitive attributes are excluded from general metadata JSON.
- Service-role operations are limited to trusted workers.
- Audit logs record access and mutations for official results, organization roles, consents, exports, and deletion.

## Data lifecycle

Each data category requires a retention policy. Raw provider payloads and uploaded images may have shorter retention than canonical workouts. Notification delivery logs, consent proof, competition results, and fraud evidence may have different legal or integrity requirements.

Export must include understandable and machine-readable representations. Deletion must traverse authentication, profile, workouts, artifacts, device tokens, connections, community content, personalization, and backups. Published official results may require anonymization or limited retention rather than silent removal; this must be disclosed before entry.

## Migration discipline

- Forward-only reviewed migrations.
- Generated TypeScript types.
- RLS tests for cross-athlete and cross-organization access.
- Backfills are idempotent and observable.
- Provider adapters are versioned independently from schema migrations.
- Canonical meaning changes require a recorded decision in [99_PRODUCT_DECISIONS.md](99_PRODUCT_DECISIONS.md).

## Detailed workout and result records

Every canonical workout can expose a detailed technical view without requiring every provider to supply the same depth. Summary metrics remain on `Workout`; ordered `WorkoutSplit`, `WorkoutInterval`, and optional `WorkoutSample` records preserve exact imported structure and sample basis. Missing data remains `NULL`, telemetry is never synthesized from a summary, and provider-specific metrics belong in a structured extension associated with its provider and schema version.

`Result` remains a competitive claim rather than a copy of workout metrics. Ranking and Event results reference the authoritative `Workout` where one exists; organizer-issued results may exist without a workout when their rules permit. `ResultVerification`, `ResultRanking`, `ResultEventContext`, `WorkoutMachineDetail`, protected `WorkoutAttachment`, and append-only `ResultAuditHistory` preserve provenance, comparability, context, evidence, and corrections. Official corrections supersede prior versions instead of overwriting them. Purpose-built public projections enforce Athlete Passport visibility and exclude private notes, device identifiers, protected evidence, and private location data.
