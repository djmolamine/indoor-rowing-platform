# Product Decision Record

| Document field | Value |
|---|---|
| **Title** | Product Decision Record |
| **Version** | 1.0 |
| **Status** | Approved |
| **Owner** | Founders |
| **Last Reviewed** | 2026-07-22 |
| **Related Documents** | [Founding Principles](00_FOUNDING_PRINCIPLES.md), [Vision](01_VISION.md), [Product Definition](02_PRODUCT.md), [Roadmap](13_ROADMAP.md) |

## Purpose

This is the durable ledger for decisions that materially shape the product, data model, athlete relationship, business, or partnerships. It prevents teams from repeatedly reopening settled questions without new evidence and helps new contributors understand not only what was decided, but why.

## How to use this document

Add a decision when it:

- Changes a founding principle or creates an exception.
- Defines canonical terminology or domain meaning.
- Introduces a new provider, comparability rule, verification tier, or official role.
- Changes required athlete data, privacy defaults, consent, export, or deletion.
- Commits to a business model, partner, exclusivity, or official brand use.
- Changes roadmap sequencing or north-star metrics.
- Is expensive or difficult to reverse.

Each record includes date, status, owner, context, decision, rationale, consequences, alternatives, evidence, review trigger, and related documents. Status values are `Proposed`, `Accepted`, `Superseded`, or `Rejected`.

## Decision register

| ID | Decision | Status | Date |
|---|---|---|---|
| PD-001 | Build a universal machine-independent platform | Accepted | 2026-07-21 |
| PD-002 | Normalize providers into one canonical workout model | Accepted | 2026-07-21 |
| PD-003 | Preserve provenance and do not assume cross-machine equivalence | Accepted | 2026-07-21 |
| PD-004 | Make athlete ownership, export, and deletion foundational | Accepted | 2026-07-21 |
| PD-005 | Use value-led progressive profiling | Accepted | 2026-07-21 |
| PD-006 | Treat consent as category-specific and reversible | Accepted | 2026-07-21 |
| PD-007 | Establish the Athlete Passport as the lifelong identity layer | Accepted | 2026-07-21 |
| PD-008 | Keep club membership optional | Accepted | 2026-07-21 |
| PD-009 | Develop River Expeditions as long-term community missions | Accepted | 2026-07-21 |
| PD-010 | Remain World Rowing compatible, never dependent | Accepted | 2026-07-21 |
| PD-011 | Learn from Concept2 depth but copy neither design nor architecture | Accepted | 2026-07-21 |
| PD-012 | Sequence trusted record before public cross-machine competition | Accepted | 2026-07-21 |
| PD-013 | Use structured geography and a curated club directory | Accepted | 2026-07-22 |
| PD-014 | Launch eight curated Expeditions through one reusable journey system | Accepted | 2026-07-22 |
| PD-015 | Use Supabase Auth with private email and linked identities | Accepted | 2026-07-22 |
| PD-016 | Use maintained city data with a manual fallback | Accepted | 2026-07-22 |
| PD-017 | Establish explicit geographic ranking scopes | Accepted | 2026-07-22 |
| PD-018 | Defer coordinated Visual System V2 until foundations stabilize | Accepted | 2026-07-22 |

## PD-001: Universal machine-independent platform

- **Status:** Accepted
- **Context:** Indoor-rowing history is fragmented across manufacturers, gyms, devices, and manual records.
- **Decision:** The platform supports multiple providers and capture methods as peers. No manufacturer owns the top-level product taxonomy.
- **Rationale:** Athlete continuity and global sport participation require an identity and history above equipment brands.
- **Consequences:** Integration breadth and comparability are harder; provider attribution and source transparency are mandatory.
- **Alternatives rejected:** Start as a Concept2-only logbook; choose one exclusive hardware partner.
- **Review trigger:** Only if evidence shows a temporary provider focus is required for launch. Focus may not rewrite the canonical architecture.

## PD-002: Canonical workout model

- **Status:** Accepted
- **Context:** Provider payloads differ in naming, units, detail, identifiers, and trust.
- **Decision:** Adapters translate source data into one canonical workout and interval model while raw provenance is retained separately.
- **Rationale:** Core features should not branch by manufacturer.
- **Consequences:** Mapping/version governance and missing-data semantics are required.
- **Related:** [06_DATABASE.md](06_DATABASE.md), [07_MACHINE_PROVIDERS.md](07_MACHINE_PROVIDERS.md)

## PD-003: Provenance before equivalence

- **Status:** Accepted
- **Decision:** Machine-independent history does not imply machine-independent competitive equivalence. Rankings expose machine class, rule set, source, and verification.
- **Rationale:** Trust is more valuable than artificially large leaderboards.
- **Consequences:** Some workouts contribute to history and participation missions but not particular rankings.
- **Related:** [08_COMPETITIONS.md](08_COMPETITIONS.md)

## PD-004: Athlete-owned data

- **Status:** Accepted
- **Decision:** Athletes can inspect, export, restrict, disconnect, and delete their data, subject to disclosed legal or official-result retention.
- **Rationale:** Ownership is central to differentiation and trust.
- **Consequences:** Export and deletion are system-wide workflows, not settings-page decorations.

## PD-005: Value-led progressive profiling

- **Status:** Accepted
- **Decision:** Minimum account data first; optional data requested when it unlocks an immediate explained benefit.
- **Rationale:** Profile depth earned through value is more trustworthy and likely more accurate.
- **Consequences:** Teams measure readiness outcomes rather than maximizing fields collected.
- **Related:** [03_ATHLETE_JOURNEY.md](03_ATHLETE_JOURNEY.md), [09_ATHLETE_PASSPORT.md](09_ATHLETE_PASSPORT.md)

## PD-006: Specific reversible consent

- **Status:** Accepted
- **Decision:** Platform, challenge, event, organizer, federation, World Rowing, research, marketing, channel, and visibility choices are distinct where purposes differ.
- **Rationale:** Meaningful consent protects athletes and partner credibility.
- **Consequences:** Consent is a versioned domain model enforced at send time.
- **Related:** [11_NOTIFICATIONS.md](11_NOTIFICATIONS.md)

## PD-007: Athlete Passport

- **Status:** Accepted
- **Decision:** Build a lifelong Passport connecting athlete-controlled profile, history, verification, achievements, relationships, events, and permissions.
- **Rationale:** A portable identity is the strategic layer missing from manufacturer ecosystems.
- **Consequences:** Account, athlete, organization, device, and event identities remain distinct.

## PD-008: Club membership is optional

- **Status:** Accepted
- **Decision:** Athletes can fully use core history, challenges, Expeditions, discovery, and eligible rankings without a club.
- **Rationale:** Many athletes train at home or in commercial gyms.
- **Consequences:** "Independent" participation is a designed state, not missing data.

## PD-009: River Expeditions

- **Status:** Accepted
- **Decision:** Develop mapped, long-term, distance-based missions as a signature community system.
- **Rationale:** Expeditions create inclusive shared purpose across machines and performance levels.
- **Consequences:** Cultural, mapping, content-rights, integrity, privacy, and sponsorship governance are required.
- **Related:** [10_COMMUNITY.md](10_COMMUNITY.md)

## PD-010: World Rowing compatible, never dependent

- **Status:** Accepted
- **Decision:** Build partnership-ready governance and capabilities while prohibiting implied affiliation and preserving independent athlete value.
- **Rationale:** Official compatibility can grow the sport; dependency or false endorsement would undermine trust.
- **Consequences:** Official roles, sender identity, branding, data agreements, and termination planning are first-class.
- **Related:** [15_WORLD_ROWING.md](15_WORLD_ROWING.md)

## PD-011: Concept2 is inspiration, not template

- **Status:** Accepted
- **Decision:** Learn from Logbook depth, verification, rankings, challenges, seasons, and recognition; do not copy its visual system, information architecture, terminology, or manufacturer-centered model.
- **Rationale:** The new platform serves a different strategic boundary.
- **Related:** [14_COMPETITOR_ANALYSIS.md](14_COMPETITOR_ANALYSIS.md)

## PD-012: Record before public competition

- **Status:** Accepted
- **Decision:** Prove canonical logging, provenance, athlete trust, and provider quality before launching broad public cross-machine rankings.
- **Rationale:** Competition magnifies data-quality and fairness errors.
- **Consequences:** Early community uses personal progress, events, challenges, and participation missions before complex ranking claims.
- **Related:** [13_ROADMAP.md](13_ROADMAP.md)

## PD-013: Structured geography and curated club directory

- **Status:** Accepted
- **Date:** 2026-07-22
- **Owner:** Founders
- **Context:** Free-text country, city, and club values create duplicates, impossible combinations, unclear affiliations, and false verification signals in the Athlete Passport.
- **Decision:** Countries are stored with ISO 3166-1 alpha-2 codes and display names; cities are selected within a country or entered through an explicit manual-locality path. Club membership remains optional. Club discovery uses curated records with source, verification, and active status, and athletes can submit missing clubs for review without creating a verified affiliation automatically.
- **Rationale:** Structured geography improves internationalization and event eligibility, while a governed directory protects athlete identity and future federation credibility.
- **Consequences:** Country changes invalidate incompatible cities and club selections. Directory ingestion must preserve provenance and separate source review from federation verification. Independent, home, gym, school, and national-centre athletes remain complete product states.
- **Alternatives:** Unrestricted free text; an unsourced global club list; requiring club membership; treating athlete submissions as immediately verified.
- **Evidence:** Athlete Passport identity requirements, optional-club principle, federation-role governance, and MVP progressive-profile rules.
- **Review trigger:** Introduction of Supabase club records, federation imports, partner data, or administrator verification workflows.
- **Related:** [09_ATHLETE_PASSPORT.md](09_ATHLETE_PASSPORT.md), [06_DATABASE.md](06_DATABASE.md), [15_WORLD_ROWING.md](15_WORLD_ROWING.md)

## PD-014: Curated cinematic Expedition launch

- **Status:** Accepted
- **Date:** 2026-07-22
- **Owner:** Founders
- **Context:** Expeditions need enough route and narrative depth to become a signature product without creating an ungovernable worldwide catalogue or eight disconnected page implementations.
- **Decision:** Launch The Nile, The Danube, The Rhine, The Thames, The Mississippi, The Amazon, The Mekong, and The Murray as structured checkpoint journeys rendered by one reusable cinematic route system. The MVP permits one active individual Expedition; switching is explicit, preserves prior progress, and routes only future eligible canonical workouts to the new journey.
- **Rationale:** A focused collection establishes geographic range, distinct completion commitments, editorial quality, and a scalable data contract while keeping athlete progress understandable.
- **Consequences:** Every journey must pass catalogue validation and content review. Maps remain stylized and non-navigational, text routes remain complete, workout records remain authoritative, and adding a journey requires data and editorial review rather than a new page implementation.
- **Alternatives:** A single progress bar; twenty shallow launch routes; separate bespoke pages; concurrent automatic contribution to multiple individual Expeditions.
- **Evidence:** [19_EXPEDITIONS.md](19_EXPEDITIONS.md), canonical workout requirements, accessibility standards, and the one-active-journey MVP constraint.
- **Review trigger:** Evidence that athletes understand concurrent contribution routing, or introduction of licensed map geometry and an administrative publishing workflow.
- **Related:** [19_EXPEDITIONS.md](19_EXPEDITIONS.md), [06_DATABASE.md](06_DATABASE.md), [10_COMMUNITY.md](10_COMMUNITY.md), [17_MVP_BUILD_PLAN.md](17_MVP_BUILD_PLAN.md)

## PD-015: Supabase identity and private account email

- **Status:** Accepted
- **Date:** 2026-07-22
- **Owner:** Founders
- **Decision:** Use Supabase SSR authentication with email/password verification plus Google and Apple OAuth. Facebook is prepared but deferred. Authentication email is required, private by default, changed through a verified account flow, and excluded from public Passport data. Multiple identities link to one auth user and one athlete profile; ambiguous cross-account merges are never automatic.
- **Rationale:** Secure account recovery and provider choice are necessary without turning contact data into public identity.
- **Review trigger:** Introduction of a cross-account recovery/merge workflow or another launch login provider.
- **Related:** [authentication.md](authentication.md), [09_ATHLETE_PASSPORT.md](09_ATHLETE_PASSPORT.md)

## PD-016: Maintained city dataset with manual fallback

- **Status:** Accepted
- **Date:** 2026-07-22
- **Owner:** Founders
- **Decision:** Keep ISO country identity locally and use a maintained structured country/state/city dataset for country-filtered city search. Store supplied region and coordinates plus selected/manual provenance. Always support manual city entry and never claim universal settlement coverage.
- **Rationale:** Global discovery needs broader, maintainable coverage without presenting a partial list as complete.
- **Review trigger:** Dataset licensing, quality, localization, bundle size, or migration to a server-managed location service.
- **Related:** [09_ATHLETE_PASSPORT.md](09_ATHLETE_PASSPORT.md), [06_DATABASE.md](06_DATABASE.md)

## PD-017: Geographic ranking hierarchy

- **Status:** Accepted
- **Date:** 2026-07-22
- **Owner:** Founders
- **Decision:** Rankings support World, Continent, Country, and Club scopes. Continents use the six-region product taxonomy with an explicit country-to-ranking-region mapping, including documented choices for transcontinental and exceptional territories. Future subregions extend this hierarchy rather than replacing it.
- **Rationale:** Stable geography makes filters explainable and auditable across datasets and partners.
- **Review trigger:** Federation adoption of another geography standard or launch of subregional rankings.
- **Related:** [06_DATABASE.md](06_DATABASE.md), [08_COMPETITIONS.md](08_COMPETITIONS.md)

## PD-018: Visual System V2 sequencing

- **Status:** Accepted
- **Date:** 2026-07-22
- **Owner:** Founders
- **Decision:** Limit current visual work to coherent, accessible implementation of foundational flows. Conduct a coordinated product-wide Visual System V2 pass after authentication, profiles, locations, clubs, and rankings stabilize.
- **Rationale:** System-wide refinement should follow stable product structures rather than repeatedly redesigning temporary states.
- **Review trigger:** Completion of the authenticated foundation and ranking data model.
- **Related:** [05_DESIGN_SYSTEM.md](05_DESIGN_SYSTEM.md), [17_MVP_BUILD_PLAN.md](17_MVP_BUILD_PLAN.md)

## PD-019: Event-configurable competition and ranking taxonomy

- **Status:** Accepted
- **Date:** 2026-07-22
- **Owner:** Founders
- **Context:** Mock filters collapsed competition identity and supported too few formats to represent credible indoor rowing competition.
- **Decision:** Rowform uses stable, reusable definitions for competition divisions, weight categories, derived individual indoor age bands, event-defined adaptive classifications, fixed-distance, fixed-time and relay formats, machine classes, verification requirements, and official-status classification. Lightweight eligibility requires separate event weigh-in evidence. A result is official only within an authorized event definition; 10K, 20K, and other platform formats remain Rowform standards unless an event authority says otherwise.
- **Rationale:** Transparent, versioned taxonomy enables credible rankings without hardcoding one organizer's changing programme or implying endorsement.
- **Consequences:** Date of birth plus an event calculation date determines age category. Fixed-distance rankings sort elapsed time ascending; fixed-time rankings sort completed distance descending; relays remain separate. Adaptive classifications can change by event without component changes. Personal gender, profile weight, event eligibility, weigh-in evidence, and result division remain distinct records.
- **Alternatives:** One permanent World Rowing category table; manually selected age bands; profile weight as lightweight proof; a universal machine leaderboard; unlabeled platform rankings.
- **Evidence:** World Rowing's 2025 championship guidance, 2026 Virtual Indoor Championship and Virtual Series rules, and 2026 Indoor Adaptive Rowing material reviewed 2026-07-22.
- **Review trigger:** World Rowing rule changes, an official partnership, introduction of production competition registration, or evidence that a machine comparability definition is unsafe.
- **Related:** [08_COMPETITIONS.md](08_COMPETITIONS.md), [06_DATABASE.md](06_DATABASE.md), [09_ATHLETE_PASSPORT.md](09_ATHLETE_PASSPORT.md), [15_WORLD_ROWING.md](15_WORLD_ROWING.md)

## Decision template

Copy this structure for new records:

```markdown
## PD-XXX: Short decision title

- **Status:** Proposed | Accepted | Superseded | Rejected
- **Date:** YYYY-MM-DD
- **Owner:** Role or person
- **Context:** What changed or must be resolved?
- **Decision:** What exactly are we doing?
- **Rationale:** Why is this the best choice now?
- **Consequences:** What becomes easier, harder, required, or impossible?
- **Alternatives:** What else was considered?
- **Evidence:** Research, metrics, technical findings, or partner constraints.
- **Review trigger:** What new evidence or date requires review?
- **Related:** Links to documents, issues, or implementation records.
```

Do not delete superseded decisions. Link the replacement so the reasoning history remains intact.
