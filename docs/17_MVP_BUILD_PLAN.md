# MVP Build Plan

| Document field | Value |
|---|---|
| **Title** | MVP Build Plan |
| **Version** | 1.0 |
| **Status** | Approved |
| **Owner** | Founders |
| **Last Reviewed** | 2026-07-22 |
| **Related Documents** | [Founding Principles](00_FOUNDING_PRINCIPLES.md), [Product Definition](02_PRODUCT.md), [Product Requirements](product-requirements.md), [Database Foundation](06_DATABASE.md), [Roadmap](13_ROADMAP.md), [Technical Architecture](architecture.md) |

## Executive Summary

### What the MVP is

The MVP is the first trustworthy, usable release of a universal indoor-rowing platform. It allows an athlete to create an account, establish a private Athlete Passport, record workouts without depending on one manufacturer, review a canonical workout history, understand basic progress, and participate in a deliberately narrow community and ranking beta.

The build is staged. The first releasable core proves the trusted personal record through manual and confirmed photo/OCR logging. Later MVP milestones add a limited Athlete Passport, one fair ranking format, one River Expedition, consented communications, and the minimum administration required to operate them safely. This sequence follows [13_ROADMAP.md](13_ROADMAP.md): the record must be trusted before competitive or community claims expand.

The MVP does not claim that all rowing machines are equivalent. Provider, machine class, capture method, provenance, and verification tier remain visible. Concept2, RP3, WaterRower, Technogym, Matrix, Bluetooth devices, and future providers are represented by a provider-neutral architecture, but external provider APIs are not required for the first releasable core.

### Who it is for

The primary MVP users are independent home rowers, commercial-gym athletes, and performance-focused athletes who need a continuous history across machines. Club athletes and competition athletes are supported without making club membership mandatory. Coaches, organizers, federations, and machine providers are secondary stakeholders; the MVP gives them limited administrative or informational capabilities rather than full partner products.

The persona definitions and inclusion requirements are governed by [04_PERSONAS.md](04_PERSONAS.md).

### What problem it solves

Indoor-rowing history is fragmented across machine consoles, manufacturer applications, photographs, spreadsheets, and event systems. Athletes lose continuity when they change machines or locations, cannot always tell which results are comparable, and may be excluded from community experiences if they are not club members or do not use a preferred machine.

The MVP solves the first part of that problem by creating an athlete-owned record with honest provenance. It then demonstrates that the same record can support useful progress, limited fair rankings, and inclusive long-term participation without surrendering athlete data or inventing cross-machine equivalence.

## MVP Goals

### Primary goal

Prove that athletes will trust and repeatedly use a machine-independent platform as their primary indoor-rowing history.

### Secondary goals

- Validate the canonical workout model with manual and photo/OCR sources.
- Establish a minimum Athlete Passport that delivers value before requesting optional data.
- Prove that machine classes and verification tiers are understandable to athletes.
- Test a narrow ranking experience without mixing incompatible machine classes.
- Test inclusive community retention through one River Expedition rather than a general social feed.
- Establish consent, privacy, export, deletion, support, and audit foundations before external partnerships.
- Demonstrate a provider adapter boundary suitable for later Concept2, RP3, WaterRower, Technogym, Matrix, and Bluetooth integrations.

### Success criteria

The MVP is successful when:

- Athletes can sign up and save a first workout without optional profile completion.
- Median first-workout time is under five minutes for manual entry.
- Confirmed OCR workouts have measurable field confidence and a low unresolved correction rate.
- Imports and manual saves are idempotent, with duplicate and failure states explained.
- Athletes return to record workouts during at least four separate weeks.
- Athlete-reported confidence in workout accuracy and data ownership is strong.
- Public or beta-ranked results always display their machine class and verification tier.
- The River Expedition attracts repeat contributions from independent and club athletes.
- Optional notifications have valid consent proof and can be suppressed promptly after withdrawal.
- Export and deletion complete across the MVP data domains.
- No critical privacy, authorization, safeguarding, or competition-integrity issue remains unresolved.

The metric definitions and reporting cadence come from [16_METRICS.md](16_METRICS.md).

## Core User Journey

### 1. Landing Page

The visitor understands the promise: every row, every machine, one athlete-owned history. The page explains machine independence, provenance, privacy, and the value of one lifelong record without implying active provider or World Rowing partnerships. The primary action is account creation; public product explanation and a limited event or River Expedition preview may be viewed without an account.

### 2. Sign Up

The athlete uses email magic link or one-time password through Supabase Auth. The platform records acceptance of the current terms and privacy notice. Authentication is separate from the Athlete Passport, communication consent, provider connections, and competition eligibility.

### 3. Onboarding

Onboarding requests only display name, country or territory, time zone, and preferred units. Date of birth or age band is requested only if the athlete chooses an age-dependent ranking or event. Club, federation, gender or competition category, weight category, machine ownership, public visibility, and marketing consent remain optional and contextual.

The final onboarding step offers immediate paths: enter a workout manually, photograph a monitor, or explore the dashboard. It does not require a complete profile.

### 4. Dashboard/Lobby

The dashboard prioritizes the next useful action. Before the first workout it explains capture options. After activity exists it shows recent canonical workouts, weekly totals, personal-record signals, River Expedition progress, and actionable import issues. Ranking and community cards appear only when the athlete is eligible and has made the necessary visibility or participation choices.

### 5. First Workout

The athlete chooses manual entry or photo/OCR. The form accepts partial but valid workout data and never fabricates missing metrics. OCR presents extracted fields with confidence and requires confirmation. After saving, the athlete sees distance, duration, pace where derivable, source, machine or machine class where known, verification tier, and privacy state.

### 6. Athlete Passport

The platform explains that the Athlete Passport is private by default and shows readiness outcomes rather than a coercive completion percentage. The athlete may add an age band for rankings, a competition category, a club or independent status, and selected public achievements. Every optional request states its benefit and visibility.

### 7. Rankings

After sufficient data and explicit opt-in, the athlete can view a limited beta ranking for approved standard efforts. The active distance, season, machine class, age/category filters, and verification tier are always visible. Manual results can appear only in a clearly labeled tier or private comparison. No cross-machine competitive equivalence is implied.

### 8. Community

The athlete joins the MVP River Expedition individually or as part of a simple crew. Eligible canonical workouts advance progress. The experience emphasizes collective distance, milestones, and contribution rather than speed. The athlete can control visibility, mute notifications, leave the mission, and report inappropriate content. There is no open public feed or unrestricted direct messaging.

This journey is a build sequence as well as a product flow. Rankings and community enter closed beta only after the trusted-record completion criteria pass.

## MVP Scope

### Included

- Mobile-first landing page and authenticated application shell.
- Email magic-link or one-time-password authentication.
- Secure sessions, protected routes, and row-level security.
- Minimum athlete profile and private-by-default Athlete Passport.
- Value-led optional profile completion.
- Manual workout logging.
- Photo/OCR extraction with athlete confirmation.
- Canonical workouts with ordered intervals where supplied.
- Provider, machine class, capture method, provenance, and verification tier display.
- Workout history, workout detail, editing, deletion, and duplicate handling.
- Weekly, monthly, season, and lifetime summary foundations.
- Personal records for approved standard efforts.
- A narrow, opt-in ranking beta using explicit machine classes and verification tiers.
- One MVP River Expedition with individual participation and simple crews.
- Basic community relationships required by the Expedition; independent participation is supported.
- In-app operational notifications and opt-in push foundations for the River Expedition and ranking milestones.
- Consent and notification preference center.
- Profile and workout privacy controls.
- Data export, provider disconnection foundations, and account deletion.
- Admin tools for athlete support, provider/machine catalog, OCR review diagnostics, ranking rules, River Expedition configuration, reports, and audit review.
- Basic public event directory if content is available, without profile-based personalization.
- Accessibility baseline targeting WCAG 2.2 AA and localization-ready content structure.

## Out of Scope

- Live external Concept2, RP3, WaterRower, Technogym, or Matrix account integrations in the first releasable core.
- Full Bluetooth FTMS live-workout capture.
- Claims that performance is equivalent across different machine classes.
- Open public cross-machine rankings.
- World records, federation-certified records, or official championship status.
- Full event registration, payments, timing, qualification, live racing, result appeals, or organizer operations.
- Personalized event recommendations and federation targeting.
- Official World Rowing branding, sender identity, or partnership claims.
- General-purpose social feed, unrestricted comments, or direct messaging.
- Full club, coach, federation, guardian, or dependent-account products.
- Prescriptive coaching, medical advice, training plans, or injury management.
- Subscription billing, sponsorship activation, or marketplace functionality.
- Native mobile applications; the MVP is a responsive web application.
- Universal file-format support or bulk historical migration.
- Advanced anomaly detection, video evidence review, or federation-certified verification.

## Feature Breakdown

### Authentication

**Purpose:** Establish secure athlete identity and sessions without conflating authentication with the Athlete Passport.

**User Story:** As an athlete, I want to create and access my account securely so my history remains private and available across devices.

**Acceptance Criteria:**

- Email magic link or OTP completes through an allow-listed callback.
- Auth cookies use the supported Supabase SSR pattern.
- Protected routes reject unauthenticated requests.
- Sign-out clears the session and cached athlete data.
- Terms/privacy acceptance stores version, locale, and timestamp.
- Cross-athlete RLS tests prevent reads and mutations.
- No service-role credential is exposed to the browser.

**Dependencies:** Supabase Auth, server-side session client, middleware refresh, `profiles`/athlete initialization, legal document versions, and [authentication.md](authentication.md).

### Athlete Profile

**Purpose:** Collect the minimum information needed to operate the service and progressively request optional information only when it unlocks value.

**User Story:** As an athlete, I want to control my profile information and understand why each field is requested.

**Acceptance Criteria:**

- Required and optional fields are visually and logically distinct.
- Country, time zone, display name, and units are editable.
- Optional fields show purpose and visibility before collection.
- Profile visibility defaults to private.
- Declining optional fields does not block workout logging.
- Sensitive fields are excluded from public projections.

**Dependencies:** Athlete entity, profile attributes, visibility policy, onboarding flow, country/time-zone catalogs, and [09_ATHLETE_PASSPORT.md](09_ATHLETE_PASSPORT.md).

### Athlete Passport

**Purpose:** Provide the lifelong athlete-controlled identity layer for history, claims, achievements, affiliations, and permissions.

**User Story:** As an athlete, I want one private Passport that preserves my verified progress across machines and organizations.

**Acceptance Criteria:**

- Passport shows source connections, records, selected achievements, and readiness outcomes.
- Claims identify issuer/source, verification tier, status, and visibility.
- The athlete can preview public presentation.
- Club membership is optional and independent is a valid state.
- Passport sharing exposes only selected fields.
- Export and deletion include Passport data.

**Dependencies:** Athlete/profile domains, verification evidence, records, privacy projections, audit events, and consent.

### Workout Logging

**Purpose:** Capture a valid canonical workout from manual or photo/OCR sources without manufacturer lock-in.

**User Story:** As an athlete, I want to save a workout from the machine available to me so my history stays complete.

**Acceptance Criteria:**

- Manual entry supports date/time, duration, distance, machine/provider, and optional rowing metrics.
- Missing fields remain `NULL`; zero is not used as a substitute.
- OCR shows extracted values and confidence before save.
- Athlete corrections are retained in provenance.
- Canonical validation rejects impossible combinations with actionable errors.
- Duplicate submissions do not create duplicate workouts.
- Saved workouts receive a source and verification tier.

**Dependencies:** Canonical workout/interval schema, provider catalog, machine classes, storage for protected artifacts, OCR service selection, validation, and import jobs.

### Workout History

**Purpose:** Make the athlete's multi-source record searchable, understandable, and trustworthy.

**User Story:** As an athlete, I want to review all my workouts in one place and understand where each record came from.

**Acceptance Criteria:**

- History is ordered by athlete-local workout time.
- Filters include date, source/provider, machine class, verification tier, and standard effort.
- Detail shows metrics, intervals, provenance summary, warnings, visibility, and record status.
- Editing a ranked or verified result triggers audit and re-evaluation.
- Deletion updates derived summaries, records, rankings, and Expedition contributions safely.
- Empty, loading, partial-data, and failed-import states are accessible.

**Dependencies:** Workout repository, provenance, derived metrics, record recalculation, search indexes, and athlete time zone.

### Rankings

**Purpose:** Test fair comparison using explicit rules without claiming universal machine equivalence.

**User Story:** As an athlete, I want to compare an eligible performance with a clearly defined peer group.

**Acceptance Criteria:**

- Ranking definitions specify standard effort, season, machine class, categories, verification threshold, privacy, and tie-break rules.
- Active filters remain visible on mobile and desktop.
- Athletes opt in before public appearance.
- Ineligible results explain the reason.
- Manual/photo, provider-signed, and stronger tiers are not visually conflated.
- One athlete contributes only the eligible best result per ranking definition.
- Ranking definitions distinguish fixed distance, fixed time, and relay scoring; competition division, derived age category, event-specific lightweight evidence, adaptive classification, official status, machine comparability, and verification provenance are configuration rather than page constants.
- Workout entry and rankings use the same curated provider/model catalogue, alias normalization, explicit machine classes, and versioned comparability rules. Unknown equipment remains loggable but is excluded from strict rankings unless a named rule permits it.
- Ranking recalculation is deterministic and auditable.

**Dependencies:** Standard-effort definitions, personal records, machine classes, verification tiers, Passport fields, privacy projections, and admin rule configuration.

### Community

**Purpose:** Create belonging through rowing activity while avoiding the moderation burden and incentives of a general social network.

**User Story:** As an athlete, I want to participate with others whether or not I belong to a club.

**Acceptance Criteria:**

- Athletes can join the MVP River Expedition independently.
- Simple crews have explicit membership and visibility.
- Public names and achievements follow Passport visibility.
- Athletes can leave, mute, block, and report.
- Admins can review reports and apply documented actions.
- No unrestricted direct messaging or public feed exists.

**Dependencies:** Athlete Passport projections, community relationships, moderation/reporting, consented communications, and River Expedition participation.

### River Expeditions (MVP Scope)

**Purpose:** Validate inclusive, long-term participation that motivates athletes regardless of speed or ability.

**User Story:** As an athlete, I want my eligible rowing distance to advance a meaningful shared journey.

**Acceptance Criteria:**

- One Expedition has a reviewed route, stages, dates, milestones, and content rights.
- Rules define eligible canonical workouts, sources, distance treatment, contribution limits, and privacy.
- Individual and simple crew progress are supported.
- Every contribution links to an eligible workout or immutable audit snapshot.
- Milestones reward consistency and contribution, not only volume or speed.
- Suspicious contributions can be flagged without automatic public accusation.
- Athletes can join, leave, and control public display.

**Dependencies:** Canonical workouts, challenge/Expedition entities, route content, geospatial stage data, crew membership, notifications, moderation, and admin configuration.

### Notifications

**Purpose:** Deliver necessary operational information and optional motivation without treating attention as the product.

**User Story:** As an athlete, I want relevant updates on my workouts and selected activities while controlling channel and frequency.

**Acceptance Criteria:**

- Essential and optional categories are clearly separated.
- In-app operational notifications support failed OCR/import, security, export, and deletion status.
- Push requires both OS permission and category opt-in.
- River Expedition and ranking notifications are disabled until explicitly enabled.
- Sender, reason, deep link, time zone, and preference path are present.
- Quiet hours and withdrawal suppression are enforced.
- Delivery attempts and consent basis are auditable.

**Dependencies:** Consent records, preference center, in-app inbox, push provider, delivery jobs, templates, time-zone scheduler, and [11_NOTIFICATIONS.md](11_NOTIFICATIONS.md).

### Settings

**Purpose:** Give athletes direct control over account, privacy, units, sources, communications, export, and deletion.

**User Story:** As an athlete, I want to understand and change how the platform uses and presents my data.

**Acceptance Criteria:**

- Settings expose profile, units, visibility, consent, notifications, connected sources, export, and account deletion.
- Destructive actions require recent authentication and clear confirmation.
- Export status and deletion status are visible.
- Provider disconnection explains the effect on imported history.
- Preferences are accessible and work on mobile.

**Dependencies:** Authentication, Athlete Passport, consent, provider connections, export/deletion jobs, and audit logging.

### Machine Providers

**Purpose:** Prove the provider-neutral adapter boundary before investing in live manufacturer integrations.

**User Story:** As an athlete, I want my workout attributed to the correct provider and machine without my account becoming tied to that brand.

**Acceptance Criteria:**

- Provider and machine-model catalogs include Concept2, RP3, WaterRower, Technogym, Matrix, Bluetooth FTMS, manual, and photo/OCR categories.
- Manual and OCR sources implement the same canonical draft contract expected of future adapters.
- Capabilities and known limitations are represented explicitly.
- Provider attribution is visible but not top-level navigation.
- Adapter fixtures and contract tests cover units, timestamps, missing data, and duplicate IDs.
- No live provider connection is presented before it exists.

**Dependencies:** Provider catalog, machine models/classes, adapter interface, provenance schema, test fixtures, and [07_MACHINE_PROVIDERS.md](07_MACHINE_PROVIDERS.md).

### Admin

**Purpose:** Operate the MVP safely without direct database manipulation.

**User Story:** As an authorized operator, I want to manage catalogs, rules, missions, and support cases through audited tools.

**Acceptance Criteria:**

- Admin access uses explicit scoped roles and strong authentication.
- Admins can manage provider/machine catalogs, ranking definitions, River Expedition configuration, and reviewed content.
- Support can inspect import/OCR diagnostics without unrestricted access to sensitive Passport data.
- Moderation reports have status, owner, action, and audit history.
- Official or federation labels cannot be self-assigned.
- High-impact actions require confirmation and are logged.

**Dependencies:** Organization/role model, admin authorization, audit events, provider catalog, ranking/Expedition domains, moderation, and support procedures.

## Pages

### Public

- `/` — Landing page and product promise.
- `/events` — Basic public event directory when content exists.
- `/privacy` — Privacy notice.
- `/terms` — Terms of service.
- `/sign-in` — Sign in.
- `/sign-up` — Account creation.
- `/auth/callback` — Non-visual auth callback.

### Onboarding and authenticated athlete application

- `/onboarding` — Minimum profile and units.
- `/dashboard` — Lobby and next best actions.
- `/workouts` — Canonical workout history.
- `/workouts/new` — Capture-method selection.
- `/workouts/new/manual` — Manual workout entry.
- `/workouts/new/photo` — Photo/OCR capture and confirmation.
- `/workouts/[workoutId]` — Workout detail and provenance.
- `/progress` — Summaries and personal records.
- `/leaderboard` — Limited ranking beta and filters.
- `/challenges` — Available participation programs.
- `/expeditions/[expeditionId]` — River Expedition route, progress, rules, and crew.
- `/community` — MVP crews and relationships.
- `/profile` — Athlete Passport presentation.
- `/profile/edit` — Profile fields and visibility.
- `/notifications` — In-app inbox.
- `/settings` — Settings overview.
- `/settings/privacy` — Visibility and data controls.
- `/settings/notifications` — Consent and channel preferences.
- `/settings/sources` — Provider and source status.
- `/settings/data` — Export and account deletion.

### Administration Pages

- `/admin` — Operational overview.
- `/admin/providers` — Provider, model, and machine-class catalog.
- `/admin/rankings` — Ranking definitions and recalculation status.
- `/admin/expeditions` — River Expedition configuration and content.
- `/admin/imports` — Import/OCR diagnostics.
- `/admin/moderation` — Reports and actions.
- `/admin/audit` — High-impact audit events.

Route placement may use Next.js route groups; URLs remain stable unless a decision is recorded in [99_PRODUCT_DECISIONS.md](99_PRODUCT_DECISIONS.md).

## Database Dependencies

The implementation must extend the domain model in [06_DATABASE.md](06_DATABASE.md) rather than invent page-specific tables.

### Required for the trusted-record core

- `Account` through Supabase Auth.
- `Athlete` and profile attributes.
- Legal-document acceptance records.
- `SourceProvider`, `SourceConnection`, `MachineModel`, physical `Machine`, and versioned machine classes.
- Canonical `Workout` and `WorkoutInterval`.
- Provenance/import records, import jobs, payload hashes, warnings, and artifact references.
- Verification evidence and verification tier.
- Personal-record definitions and derived records.
- Audit events.
- Export and deletion jobs.

### Required for the ranking/community beta

- `Season`, `RankingDefinition`, and `RankingEntry`.
- Passport claims and public profile projections.
- Community relationship, crew, membership, block, and report.
- Challenge/River Expedition, stage, milestone, participation, contribution, and scoring snapshot.
- Consent, preference, notification endpoint, message, delivery attempt, and suppression record.
- Organization, role assignment, and admin authorization.

Workout contributions reference canonical workouts. Ranking entries reference eligible source results. Neither domain copies the workout as an independent source of truth.

## API Dependencies

### MVP external services

- Supabase Auth, PostgreSQL, Storage, and row-level security.
- OCR extraction provider selected through a documented privacy, quality, cost, and retention decision.
- Push-notification provider or web-push infrastructure after consent foundations are complete.
- Email delivery for authentication and essential account operations.

### Internal APIs and server boundaries

- Server-side account/session operations.
- Workout create, validate, update, delete, list, and detail use cases.
- OCR upload, extract, confirm, and discard flow.
- Import job status and retry.
- Personal-record and summary calculation.
- Ranking eligibility, calculation, and publication.
- River Expedition join, contribute, milestone, leave, and crew operations.
- Consent, preferences, notification delivery, export, deletion, moderation, and audit.

### Future provider APIs

Concept2, RP3, WaterRower, Technogym, Matrix, and Bluetooth integrations remain behind the approved adapter contract. The MVP should build provider fixtures and contract tests but must not depend on undocumented or unavailable APIs. OAuth secrets stay in a server-side vault; browser code receives only public configuration.

Future event, federation, and World Rowing APIs are optional later integrations. The MVP is World Rowing compatible, never dependent.

## Technical Milestones

### Phase 0: Baseline and Architecture Reconciliation

**Objective:** Convert the mock application and initial migration into an implementation baseline aligned with the approved documentation.

**Deliverables:** Typed environment validation, repository conventions, schema reconciliation plan, generated database types, test strategy, CI build/lint/type checks, error monitoring, analytics governance, and accessibility baseline.

**Completion Criteria:** The existing application builds; architecture decisions are recorded; database migrations apply in a clean environment; no product code assumes a specific provider.

### Phase 1: Authentication and Minimum Athlete Identity

**Objective:** Establish secure accounts and a private minimum profile.

**Deliverables:** Supabase SSR auth, callback, protected routes, profile initialization, legal acceptance, onboarding, units/time zone, RLS policies, and auth tests.

**Completion Criteria:** Two test athletes cannot access each other's data; sign-up-to-dashboard works; optional profile data is not required; sign-out and session refresh are reliable.

### Phase 2: Canonical Workout Core

**Objective:** Deliver the trusted personal record through manual entry.

**Deliverables:** Reconciled workout/provenance schema, manual form, validation, history, detail, edit/delete, source badges, machine classes, verification tier 0, duplicate protection, and summaries.

**Completion Criteria:** An athlete can save partial valid workouts, see honest provenance, edit/delete safely, and receive deterministic weekly/monthly totals; RLS and domain tests pass.

### Phase 3: Photo/OCR and Operational Reliability

**Objective:** Make shared and unconnected machines practical while preserving athlete confirmation.

**Deliverables:** Secure upload, OCR extraction, confidence display, confirmation/correction, artifact retention policy, import jobs, retries, failure recovery, tier 1 verification, diagnostics, and provider adapter contract tests.

**Completion Criteria:** Supported monitor photos produce reviewable drafts; no OCR output is saved without confirmation; failures and duplicates are recoverable; quality metrics are observable.

### Phase 4: Athlete Passport, Privacy, and Data Rights

**Objective:** Turn account data and workout achievements into an athlete-controlled lifelong profile.

**Deliverables:** Passport page, readiness outcomes, optional profile fields, visibility controls, consent records and preference foundations, claims, personal records, public projections, export, deletion, and audit.

**Completion Criteria:** Passport defaults private; every optional field has purpose and visibility; scoped public presentation exposes no sensitive data; export/deletion integration tests pass.

### Phase 5: River Expedition and MVP Community

**Objective:** Validate inclusive long-term engagement beyond competition.

**Deliverables:** One reviewed River Expedition, stages, milestones, individual/crew participation, canonical workout contributions, privacy, basic encouragement, leave/mute/block/report, moderation, and admin tools.

**Completion Criteria:** Independent athletes can participate; contribution is idempotent; rules are visible; moderation paths work; route content and rights are approved; no public feed or unrestricted messaging is introduced.

### Phase 6: Narrow Rankings Beta

**Objective:** Validate fair comparison only after workout provenance, Athlete Passport controls, and community operations are trusted.

**Deliverables:** One or more approved standard efforts, season, machine-class rules, verification filters, opt-in publication, deterministic calculation, ineligibility explanations, admin definitions, and audit.

**Completion Criteria:** No incompatible machine classes mix; every entry traces to a canonical workout; filters are visible; recalculation is repeatable; disputes can be investigated.

### Phase 7: Consented Communications and Release Hardening

**Objective:** Deliver useful notifications and prepare the complete MVP beta for controlled release.

**Deliverables:** In-app inbox, preference center, optional web push, quiet hours, templates, delivery/suppression audit, support procedures, security review, accessibility review, backups, load tests, and incident runbooks.

**Completion Criteria:** Optional sends have valid consent; withdrawal suppresses delivery; critical flows meet accessibility criteria; recovery objectives are tested; launch metrics and rollback criteria are approved.

### Phase 8: Coordinated Visual System V2

**Objective:** Refine Rowform as one coherent product after authenticated flows and data-backed structures are stable.

**Deliverables:** Product-wide navigation and hierarchy review, finalized responsive type and spacing scales, unified form and state patterns, accessible motion, improved provenance and verification presentation, localization/RTL review, and reversible partner-branding rules.

**Completion Criteria:** The refinement is applied consistently across authenticated and public surfaces, meets WCAG 2.2 AA, introduces no regression in core flows, and does not imitate a manufacturer product.

## Risks

### Cross-machine trust

Athletes may assume normalized workouts are competitively equivalent. Mitigation: persistent machine-class, provenance, and verification language; narrow rankings; no hidden conversion formula.

### OCR accuracy and cost

Monitor layouts, glare, locale, and incomplete screens can produce incorrect data or high review cost. Mitigation: supported-layout scope, confidence thresholds, mandatory confirmation, artifact retention limits, and manual fallback.

### MVP breadth

Passport, rankings, community, notifications, and admin can overwhelm a small team. Mitigation: protect the staged release gates; ship the trusted-record core before enabling closed-beta ranking/community milestones; use one River Expedition and minimal relationships.

### Privacy and consent

Profile visibility or messaging mistakes would undermine the core promise. Mitigation: private defaults, purpose-specific consent, public projections, RLS tests, audit, suppression checks, and no broad partner data export.

### Competition integrity

Manual/photo data can be manipulated, and verification may be misunderstood. Mitigation: visible verification tiers, ranking-specific thresholds, audit history, no official record claims, and a correction path.

### Provider availability

Manufacturer APIs may be restricted, unstable, or commercially unavailable. Mitigation: manual/OCR first, provider fixtures, adapter isolation, and no launch dependency on a named provider.

### Community safety

Even narrow community features introduce spam, abuse, and safeguarding obligations. Mitigation: no DMs/feed, explicit crew membership, block/mute/report, scoped admin roles, and controlled beta cohorts.

### River Expedition content

River names, maps, stories, sponsorship, and cultural context may introduce rights or representation risk. Mitigation: content review, rights clearance, geographic/cultural consultation, and one carefully scoped pilot.

### Data deletion versus derived results

Deleting a workout affects records, rankings, and Expedition contributions. Mitigation: domain-level deletion orchestration, recalculation jobs, immutable minimal audit where justified, and clear athlete confirmation.

### Operational maturity

Admin shortcuts or direct database changes can corrupt trust. Mitigation: minimum admin tooling, separation of roles, audited high-impact actions, backups, and written support procedures.

## Open Questions

The following decisions should be resolved or explicitly deferred in [99_PRODUCT_DECISIONS.md](99_PRODUCT_DECISIONS.md) before the relevant milestone begins:

1. What public product name and brand identity replace the working title "Indoor Rowing Platform"?
2. Which age policy and minimum account age apply in launch jurisdictions?
3. Is date of birth ever required, or can verified age band satisfy all MVP use cases?
4. Which OCR provider, supported monitor layouts, artifact-retention period, and confidence thresholds are acceptable?
5. Which standard efforts and single machine class are safe for the first ranking beta?
6. Can tier 0 manual results appear publicly, or only in private/purpose-labeled comparisons?
7. What fields are required for ranking category eligibility, and how are sensitive fields kept private?
8. Which river, route source, map license, cultural review, and content owner define the first River Expedition?
9. Are crews invitation-only in the MVP, and what maximum size limits moderation risk?
10. Which community interactions are permitted beyond predefined encouragement?
11. Which push technology and browser support are required, or is in-app notification sufficient for the first beta?
12. What export formats and completion target are promised to athletes?
13. Which data, if any, must survive account deletion for fraud, audit, or ranking integrity?
14. What admin roles exist, who may grant them, and which actions require dual approval?
15. Which launch countries and languages define legal, time-zone, localization, and support scope?
16. What exact metrics and thresholds open each phase gate, especially rankings and community?
17. Which external provider should follow manual/OCR, based on athlete demand, API access, and maintenance cost?
18. Is the basic public event directory part of initial launch content or a post-core beta activation?

No unresolved question should be answered implicitly in code. High-impact answers require an accepted product decision or architecture decision before implementation.
