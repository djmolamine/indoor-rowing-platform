# Rowform Events Architecture

| Document field | Value |
|---|---|
| **Title** | Rowform Events Architecture |
| **Version** | 1.0 |
| **Status** | Approved |
| **Owner** | Founders |
| **Last Reviewed** | 2026-07-22 |
| **Related Documents** | [Founding Principles](00_FOUNDING_PRINCIPLES.md), [Database Foundation](06_DATABASE.md), [Competitions, Rankings, and Events](08_COMPETITIONS.md), [Athlete Passport](09_ATHLETE_PASSPORT.md), [Notifications](11_NOTIFICATIONS.md), [World Rowing Strategy](15_WORLD_ROWING.md), [MVP Build Plan](17_MVP_BUILD_PLAN.md), [Expeditions](19_EXPEDITIONS.md) |

## Purpose

Events exist to connect athletes with organized indoor-rowing participation: from an informal club race to a federation championship or authorized international competition. They give organizers a structured way to publish authoritative information, define eligibility and machine rules, receive or reference entries, verify results, resolve corrections, and publish outcomes. They give athletes one place to discover opportunities, understand what is required, compete with informed consent, and carry trusted achievements into a lifelong Athlete Passport.

Events are also a commercial platform pillar. Rowform intends to support the complete path from discovery and promotion through registration, payment, competition operations, verified results, Rankings, and Athlete Passport history. Revenue may come from configurable athlete-paid service fees, organizer-funded platform fees, premium organizer tools, disclosed promotion and sponsorship, and federation or championship licensing. Commercial value never permits false official status, hidden fees, disguised promotion, or ownership of unrelated athlete data.

Events connect four existing Rowform systems without replacing any of them:

- The **Athlete Passport** supplies athlete-approved identity, eligibility, affiliation, and verified claims.
- The **canonical workout** preserves the underlying performance, source, machine attribution, provenance, and evidence.
- A **competition result** records the organizer's decision about a performance under a named rule set.
- A **ranking** projects eligible results into a defined comparison class and season.

An Event is different from an Expedition. An Event is organizer-owned, time-bounded, rule-governed, and may determine competitive placing or official results. An Expedition is an athlete-first participation journey in which eligible cumulative distance advances through real waterways; it emphasizes discovery, consistency, and community rather than race authority. An event may include or promote an Expedition, but neither domain owns or duplicates the other's records. See [19_EXPEDITIONS.md](19_EXPEDITIONS.md).

This architecture extends the hierarchy already approved in [08_COMPETITIONS.md](08_COMPETITIONS.md): `EventSeries` represents a recurring programme, `EventEdition` represents a dated occurrence, an Event represents the virtual, physical, or hybrid gathering, and a Competition represents one race or scored contest. In this document, “Event” refers to the athlete-facing edition unless a narrower entity is named.

---

## Event Lifecycle

```text
Draft
  ↓
Published
  ↓
Registration Open
  ↓
Registration Closed
  ↓
Competition Live
  ↓
Results Pending
  ↓
Results Verified
  ↓
Archived
```

Lifecycle transitions are explicit, authorized, timestamped, and audited. Public status must be derived from stored state, not inferred only from dates. A scheduled transition may occur automatically, but the responsible organizer remains visible. Material rule changes create a new version and follow the amendment controls in [08_COMPETITIONS.md](08_COMPETITIONS.md).

### Draft

The organizer builds the Event privately. Required information, races, categories, machine rules, registration method, verification policy, privacy terms, communication permissions, and responsible staff are incomplete or under review. Preview is restricted to authorized roles. No athlete can register, and no official status is implied.

### Published

The Event is publicly discoverable with authoritative basic information and a clear registration-opening date or explanation. Rules and races have publishable versions. Athletes may save or follow the Event where that feature exists, but cannot register before the registration window opens.

### Registration Open

Eligible athletes may register on Rowform or follow a clearly labeled handoff to an external registration system. The athlete sees the data being shared, event-specific terms, refund or withdrawal rules where applicable, category and machine requirements, deadlines, and the verified organizer. Registration creates an Entry only when Rowform owns the registration workflow; an external handoff records intent or referral status without copying unnecessary third-party data.

### Registration Closed

New standard entries stop. Authorized staff may process approved late entries, corrections, withdrawals, waitlists, category checks, or external-registration reconciliation under audited rules. Published schedules and essential operational communications remain available.

### Competition Live

The Event is actively running or accepting performances during a defined virtual window. The active rule version is locked except for a visible emergency amendment. Check-in, lane assignment, result ingestion, evidence capture, operational updates, and safety notices may occur when those capabilities exist. Public presentation must distinguish live or unverified data from official results.

### Results Pending

Competition is complete, but results remain provisional while imports, organizer uploads, evidence, eligibility, penalties, duplicates, corrections, protests, and appeals are processed. A provisional board may be shown with prominent status and last-updated information. Passport achievements and official rankings are not issued from unresolved results.

### Results Verified

Authorized officials have completed the Event's verification workflow. Eligible results are locked to the applicable rule version, published with their verification and official-status labels, and made available to ranking and Passport projection workflows. Later corrections do not overwrite history; they supersede the earlier decision with an audit trail.

### Archived

The Event becomes a durable read-only historical record. Results, rule versions, correction notices, certificates, and selected communications remain accessible according to retention and privacy policy. Operational editing closes, except for authorized correction, legal, safeguarding, or integrity workflows. Archive status never converts an unofficial Event into an official one.

Exceptional states such as `Postponed`, `Cancelled`, and `Suspended` are modeled as governed overlays with reason, effective time, responsible authority, athlete communication, and recovery path. They do not silently skip or erase the lifecycle history.

## Event Types

Event type describes intended context; it does not grant authority, verification, or official status. An Event separately stores organizer verification, governing authority, scope, and official-status classification.

| Event type | Intended use |
|---|---|
| **Club Event** | A competition organized for one club, invited clubs, or a local rowing community. Club membership may be optional unless the published rules require it. |
| **University Event** | Inter-university, university-hosted, alumni, or campus competition with institution-specific eligibility. |
| **School Event** | Age-appropriate school competition requiring safeguarding, guardian, communication, and eligibility controls appropriate to minors. |
| **Indoor League** | A recurring series with multiple rounds, cumulative scoring, team or individual standings, and season rules. |
| **National Championship** | A championship governed or authorized by a verified national federation, with explicit nationality, membership, category, and result-authority rules. |
| **Continental Championship** | A multi-country championship governed by an authorized continental body and configured for cross-border eligibility, time zones, languages, and federation relationships. |
| **World Championship** | An authorized world-level championship with the strongest governance, audit, verification, reliability, and brand controls. Rowform must never self-assign this status. |
| **Charity Event** | A participation or competition event connected to a verified charitable purpose. Fundraising, sponsorship, and data sharing are disclosed separately from entry. |
| **Virtual Event** | A time-windowed remote competition accepting defined machines, capture methods, and evidence under published rules. |
| **Provider Challenge** | A provider-organized or provider-sponsored competition with explicit equipment eligibility and attribution. It remains an Event adapter to Rowform's neutral model, not a platform-wide machine preference. |

An Event may have more than one descriptive facet—for example, a virtual national championship—but exactly one primary type should support discovery and reporting. Physical, virtual, and hybrid format remains a separate field.

## Event Information

Every published Event requires a complete, versioned information record. Drafts may be incomplete but cannot advance until validation passes.

### Identity and authority

- Stable internal ID and human-readable slug.
- Title and concise summary.
- Full description.
- Primary Event type and format: physical, virtual, or hybrid.
- Owning organizer and verified organization status.
- Governing or sanctioning authority where applicable.
- Official-status classification: community, Rowform-listed, organizer official, federation official, or authorized world-level official.
- Series and edition relationship where applicable.
- Supported languages.

### Place and time

- Venue name for physical or hybrid Events.
- Venue address and accessibility information where appropriate.
- Country stored with ISO 3166-1 alpha-2 code and localized name.
- Country-dependent city or reviewed manual locality.
- IANA time zone.
- Start and end date/time.
- Registration opening and closing date/time.
- Virtual submission window where different from Event dates.
- Schedule publication status and last update.

### Presentation and contact

- Event logo with rights, credit, accessible alternative text, and approved usage.
- Cover image where used, with the same rights and accessibility controls.
- Official website or registration URL.
- Public contact email or protected contact route.
- Organizer profile link.
- Cost, currency, refund/withdrawal summary, and external payment disclosure where applicable.
- Accessibility, safeguarding, privacy, cancellation, and emergency-information links.

### Participation and operations

- Registration mode: Rowform, external handoff, invitation, or information only.
- Eligibility summary.
- Competition and race catalogue.
- Rule-set version and amendment history.
- Accepted machine providers, models, classes, and capture methods.
- Minimum verification requirement.
- Result-submission method and deadline.
- Publication, correction, protest, and appeal policy.
- Communication categories and responsible sender.

Sensitive operational contacts, evidence locations, credentials, unpublished schedules, staff assignments, and incident information are not part of the public Event projection.

## Competition Classes

Each Event edition owns versioned competition configuration. Rowform may provide reusable templates, but the Event chooses and publishes its active definitions rather than relying on page constants or a permanent governing-body taxonomy. The approved base semantics remain in [08_COMPETITIONS.md](08_COMPETITIONS.md) and [99_PRODUCT_DECISIONS.md](99_PRODUCT_DECISIONS.md).

### Divisions

An Event selects applicable divisions such as Men, Women, Lightweight Men, Lightweight Women, and Adaptive / Para, or an explicitly non-championship Open participation class. Personal identity attributes and an Event result's division remain separate records. The Event defines required evidence and how an athlete is assigned.

### Age categories

Age bands are definitions with minimum and maximum ages, label, age-calculation date, jurisdiction or authority, and rule version. Rowform derives eligibility from the athlete-approved date-of-birth or age credential; athletes do not simply select a more favorable band. Youth safeguarding rules remain separate from scoring categories.

### Weight categories

Weight categories store limits, units, weigh-in window, clothing allowance where applicable, evidence method, verifier, and decision state. Editable Passport weight never proves lightweight eligibility. Event-specific weigh-in evidence remains protected.

### Adaptive classifications

Adaptive classifications belong to the Event edition and contain code, display label, eligible race formats, evidence authority, effective dates, and status. Rowform does not convert one organizer's classification into a permanent global athlete label. Sensitive details are disclosed only for the athlete-selected purpose.

### Machine rules

Rules identify accepted provider, model, physical setup, machine class, firmware or monitor requirements where necessary, connection or capture method, calibration or drag settings where relevant, and whether the result is participation-only or ranking-comparable. Unknown equipment remains valid workout history but is excluded from strict Event rankings unless a versioned rule explicitly permits it.

### Verification requirements

Each competition declares its minimum verification tier, accepted evidence sources, identity checks, reviewer authority, retention, correction, and appeal process. Verification and machine comparability remain separate: a strongly verified result is not automatically comparable across machine classes.

## Race Catalogue

An Event contains one or more Competition records presented to athletes as races. A race definition is versioned and reusable within an edition; results always reference the exact version used.

Rowform supports fixed-distance races such as 500 m, 1,000 m, 2,000 m, and 5,000 m; fixed-time races such as 30 minutes and 60 minutes; and team formats such as relays. Additional approved formats are configured through the same model described in [08_COMPETITIONS.md](08_COMPETITIONS.md), not implemented as new page-specific fields.

Each race defines:

- Name, code, description, display order, and scheduled or submission window.
- Format: fixed distance, fixed time, relay, or another approved scored format.
- Target distance in meters or target duration in seconds; one result cannot mix both primary scoring measures.
- Individual or team participation and relay-leg structure where applicable.
- Eligibility: division, age, weight, adaptive class, geography, affiliation, qualification, and entry limits.
- Machine requirements: provider/model/class, setup, capture method, and accepted verification evidence.
- Ranking eligibility: ranking definition, season, privacy requirements, minimum verification, and whether the race is official, standard, or participation-only.
- Scoring: elapsed time ascending, distance descending, points table, team aggregate, penalties, ties, and advancement rules.
- Medals and awards: placing, category scope, tie handling, award issuer, and whether an Athlete Passport claim or certificate is produced.
- Result submission, correction, protest, appeal, and publication deadlines.

Relay results belong to the team and retain each member's approved association without being misrepresented as individual performances. Medal configuration records what an organizer awards; it does not imply Rowform or governing-body recognition.

## Athlete Journey

```text
Discover Event
  ↓
Register or follow official handoff
  ↓
Receive confirmation
  ↓
Compete
  ↓
Result verification
  ↓
Ranking update
  ↓
Athlete Passport update
  ↓
Achievement unlocked
```

### Discover Event

The athlete can browse public Events without completing the Athlete Passport. Discovery exposes organizer identity, format, place/time, registration status, races, eligibility summary, machine rules, verification, accessibility, and official-status labels. Personalization uses only consented profile data and explains why a recommendation appears.

### Register

The athlete chooses a race and category, reviews eligibility and data use, and approves the minimum Passport presentation required for that Event. Club membership remains optional unless the Event's lawful, visible rule requires it. External registration is clearly identified, including what leaves Rowform.

### Confirmation

The athlete receives a durable entry or handoff confirmation with race, category, schedule, time zone, machine/evidence rules, organizer contact, and change/withdrawal path. Operational Event communications are distinguished from optional promotion under [11_NOTIFICATIONS.md](11_NOTIFICATIONS.md).

### Compete

The athlete completes the race on an eligible machine and under the active protocol. A canonical workout may provide the underlying performance, but an Event result remains a separate rule-governed claim. Live or uploaded data preserves provenance and never overwrites the athlete's workout record.

### Result verification

Evidence enters the Event's review process. The athlete can see whether the result is provisional, awaiting evidence, verified, challenged, corrected, disqualified, or official, with an appropriate reason and appeal path.

### Ranking update

Only results eligible under the ranking definition enter the relevant board. Machine class, competition class, season, geography, verification, and status remain visible. Recalculation is deterministic and auditable.

### Passport update

With the athlete's visibility choice, Rowform adds a scoped claim for participation, verified result, placing, certificate, or official result. The Passport references the Event and issuing authority; it does not copy private evidence into the public profile.

### Achievement unlocked

An achievement may recognize participation, completion, placing, record, team contribution, or qualification. Its issuer and authority are explicit. A community Event achievement must never be styled as a federation or world-level credential.

## Results

A Result links an Entry or participant, Competition version, performance measure, canonical workout where applicable, machine attribution, evidence, verification decisions, penalties, placing, publication status, and audit history. Result state is explicit:

| Result state | Meaning | Ranking behavior |
|---|---|---|
| **Provisional** | Received or calculated but still subject to evidence, eligibility, correction, protest, or organizer review. | May appear only on a clearly labeled provisional Event board; excluded from official and durable rankings. |
| **Verified** | Meets the Event's evidence and eligibility requirements at the recorded verification tier. | Eligible for the defined ranking if all machine, category, privacy, and publication rules also pass. Verification alone does not make it official. |
| **Disqualified** | Excluded by an authorized decision under a cited rule, with reason and appeal window. | Excluded from ranking and awards; retained in protected audit history. |
| **Appealed** | A timely challenge is under review. The prior decision remains visible with an appeal indicator. | Entry is frozen or marked under review according to the ranking rule; it cannot silently change official standings. |
| **Corrected** | A factual or adjudicated change supersedes an earlier result. | The earlier entry is withdrawn or superseded, rankings are recalculated, and a correction notice preserves history. |
| **Official** | Final published result issued by the named authorized organizer or governing authority after applicable review windows. | Eligible for an official Event ranking and Passport credential only within that authority and rule version. |

States are not free-form labels. Transitions require authorized roles, timestamps, reason codes, and linked evidence or decisions. “Official” is scoped to a named Event and authority; Rowform cannot promote a result to federation or World Rowing official status without authorization.

## Verification

Event verification applies the tiered model in [08_COMPETITIONS.md](08_COMPETITIONS.md) to named claims and evidence. An Event can require one or combine several of these sources:

- **Organizer upload:** a structured result file or signed record submitted by an authorized organizer, validated before import.
- **Provider integration:** a trusted provider payload preserving external ID, signature or authorization, machine attribution, adapter version, and source provenance.
- **Official judge:** an attestation by an assigned official with role, Event scope, timestamp, and decision audit.
- **Federation:** a result or eligibility certification issued by a verified federation role under a named programme.
- **Manual review:** an authorized reviewer assesses protected photos, monitor codes, video, documents, or anomaly flags under a published checklist.

Athlete-declared and photo-confirmed evidence may support lower tiers where the Event permits them. Device attestation may support stronger evidence where a recognized protocol exists. No source bypasses eligibility, comparability, or privacy rules merely because it is technically trusted.

Evidence records identify the claim, source, verifier, method, tier, status, rule version, protected artifact, decision, reason, and retention policy. Rejection, expiry, revocation, supersession, and appeal are preserved. Public results expose a plain-language verification label, never sensitive evidence.

## Event Relationships

### Athletes

Athletes discover, save, register, compete, withdraw, submit evidence, appeal, and control publication. Event participation never transfers ownership of the athlete account or unrelated data to the organizer.

### Athlete Passport

The Passport supplies scoped, athlete-approved eligibility and identity claims and receives participation, result, placing, certificate, and achievement claims. Exact birth date, profile weight, adaptive evidence, and contact details remain private unless specifically required and disclosed.

### Rankings

Rankings are projections over eligible Event results, not fields manually typed onto Event pages. Definitions specify format, season, classes, machine rules, verification, geography, privacy, tie-breaking, and authority. A Result can exist without being ranking-eligible.

### Workouts

The canonical workout is the athlete-owned performance record. A Result may reference it but cannot mutate its source data. Corrections to either side trigger eligibility review rather than silent synchronization. Organizer-uploaded results can exist without a canonical workout if the Event rules permit, while still retaining provenance.

### Achievements

Achievements reference the Event, Competition, issuer, rule version, claim type, and result. Visibility is athlete-controlled. Revoked or corrected results supersede dependent achievements through an auditable workflow.

### Expeditions

An Event may promote, sponsor, launch, or celebrate an Expedition, and an eligible canonical workout may independently contribute to both domains. Event placing never controls Expedition progress, and Expedition distance never qualifies a race result unless an explicit separate Event rule creates a valid performance claim.

### Clubs

Clubs may organize Events, enter teams, verify membership, or appear as the athlete's historical affiliation at competition time. Club membership is optional by platform default, dated rather than stored as permanent identity, and required only when a visible Event rule lawfully says so.

## Future Expansion

The architecture reserves these capabilities without including them in the current implementation:

- **Live timing:** adapter-based split, finish, and status ingestion with clock source, latency, correction, and failover metadata.
- **Live leaderboards:** provisional real-time projections separated from verified and official standings.
- **Spectator mode:** privacy-safe public schedules, races, athlete presentations, and results without exposing private Passport data.
- **Livestreams:** external or hosted stream references, rights, language, accessibility, moderation, schedule, and synchronization metadata.
- **QR check-in:** short-lived, signed check-in credentials that do not reveal unnecessary profile fields.
- **Digital race packs:** versioned athlete-specific documents, schedules, venue instructions, rules, accessibility details, and acknowledgements.
- **Certificates:** verifiable participation, completion, placing, or result documents tied to an issuer and result version.
- **Medals:** physical or digital award records with category, issuer, fulfilment, and correction behavior.
- **Volunteer management:** roles, shifts, qualification requirements, safeguarding, contact controls, and audit separate from athlete identity.
- **Officials:** verified, scoped, time-bound assignments for judging, verification, appeals, timing, safeguarding, and publication.
- **Lane assignments:** race, heat, lane, machine instance, seeding, status, and reassignment history.

These capabilities extend the same Event, Competition, Entry, Result, evidence, role, consent, and audit boundaries. They must not be implemented as isolated systems that duplicate athlete, workout, or ranking truth.

## Commerce and Payment Architecture

An Event declares one commerce mode: `external_registration`, `rowform_registration`, `information_only`, or `invite_only`. The mode controls every registration call to action. External Events link to the identified organizer and never enter a native Rowform checkout. Native registration is available only for an organizer-managed Event with verified ownership, accepted commercial terms, and operational support.

Fee configuration is versioned per Event and may be organizer-funded, athlete-paid, percentage, fixed, hybrid, waived, discounted, coupon-based, or subsidized. Before confirmation, the athlete sees entry fee, Rowform service fee, estimated tax, discount, and total in the Event currency. There is no universal fee: final pricing depends on organizer agreements, payment processing costs, taxes, refunds, chargeback exposure, and local regulation.

Production payment uses a compliant hosted checkout provider. Rowform stores provider and checkout references, amounts, currency, payment/payout/refund/dispute states, and timestamps, but never card details. Provider IDs remain data rather than domain taxonomy so a compliant payment service can be replaced. Organizer payout, refunds, chargebacks, reconciliation, tax reporting, and payment webhooks require dedicated later implementation and financial controls.

## Organizer Ownership and Promotion

Organizer records separate identity verification, organization verification, federation authority, Event ownership, authorized administrators, payout readiness, and commercial agreement status. Event ownership progresses from unclaimed public listing to claimed, verified organizer-owned, or Rowform-managed. Claiming never grants an official badge automatically.

Promotion may include featured, sponsored, promoted-search, homepage, newsletter, regional, or club-targeted placement. Every paid placement stores its campaign, period, targeting scope, and disclosure label. `Featured`, `Sponsored`, or `Promoted` remains visible wherever the placement affects discovery; payment never changes organic eligibility or result ranking.

## MVP Scope

The Events MVP is a trusted discovery and commercial-path prototype delivered without live financial processing. It includes:

- A curated public Event directory with physical, virtual, and hybrid Events.
- Event detail pages containing organizer identity, official-status label, place/time/time zone, registration window, races, eligibility summary, machine rules, verification requirement, accessibility information, and source links.
- Country, date, format, registration-status, machine-class, and Event-type filters using structured data.
- External registration handoff with clear ownership and data-sharing disclosure.
- Native prototype registration for explicitly Rowform-managed Events, including Passport reuse, race/category selection, machine acknowledgement, versioned acceptances, fee breakdown, review, and a clearly unpaid confirmation state.
- Typed provider-neutral payment, fee, discount, payout, refund, organizer, ownership, promotion, registration, and result records ready for persistence.
- Versioned Event and race definitions sufficient to render accurate information.
- Organizer/source provenance and an administrator-reviewed publication workflow.
- Accessible empty, postponed, cancelled, registration-closed, and outdated-information states.
- Optional save/follow capability only after authenticated persistence and notification consent are available.

The Events MVP excludes:

- Live hosted checkout, card processing, payment success claims, organizer payouts, refunds, chargebacks, qualification decisions, and persistent entry operations.
- Live timing, check-in, lane assignment, live leaderboards, spectator mode, and livestreams.
- Athlete result submission, organizer result upload, verification queues, protests, appeals, and official result publication.
- Automatic ranking or Athlete Passport updates from Events.
- Organizer, official, volunteer, federation, and World Rowing portals.
- Personalized targeting that requires optional profile data.
- Official federation or World Rowing branding without formal authorization.

The next release should persist saved Events and registrations, add consented reminders, and integrate compliant hosted checkout with verified organizer ownership before accepting money. Structured organizer result operations follow only after canonical workouts, Passport privacy, ranking rules, organization roles, audit, and competition-integrity controls are proven. This sequencing follows [13_ROADMAP.md](13_ROADMAP.md), [17_MVP_BUILD_PLAN.md](17_MVP_BUILD_PLAN.md), and [18_ROADMAP.md](18_ROADMAP.md).

## Architectural Guardrails

- Providers are evidence and workout sources, never the Event domain owner.
- Rules, categories, races, result status, verification, and official authority are versioned configuration, not UI constants.
- Registration identity, authentication identity, Athlete Passport identity, and provider identity remain separate.
- General discovery works without optional Passport completion.
- Club membership remains optional unless a named Event rule requires it.
- A canonical workout, Event result, ranking entry, and Passport claim are linked but distinct records.
- Public views use purpose-built projections and never expose protected evidence or sensitive eligibility data.
- Organizer and federation communications follow consent, sender verification, and audit requirements in [11_NOTIFICATIONS.md](11_NOTIFICATIONS.md).
- Result corrections supersede history; they never erase decisions silently.
- World Rowing compatibility must never be represented as dependency or endorsement.

The architecture is ready for implementation only when the team can preserve these boundaries from a club Event through an authorized international championship without introducing provider-specific or partner-specific core models.
