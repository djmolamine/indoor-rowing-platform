# Product Roadmap

| Document field | Value |
|---|---|
| **Title** | Product Roadmap |
| **Version** | 1.0 |
| **Status** | Approved |
| **Owner** | Founders |
| **Last Reviewed** | 2026-07-21 |
| **Related Documents** | [Vision](01_VISION.md), [Product Definition](02_PRODUCT.md), [Business Model](12_BUSINESS_MODEL.md), [Metrics](16_METRICS.md) |

## Roadmap philosophy

The roadmap is outcome-based. Dates should be assigned only after team capacity, user research, compliance scope, and provider access are known. Each phase must prove its central risk before the next phase adds organizational complexity.

## Phase 0: Foundation and validation

### Outcome

The team shares a precise product model and can test the value proposition without implying finished integrations or partnerships.

### Deliverables

- Numbered product foundation documentation.
- Canonical workout schema and provider-neutral architecture.
- Runnable landing page and mock dashboard for research.
- Interview program across home, gym, club, adaptive, and competition athletes.
- Provider and organizer discovery interviews.
- Brand strategy and naming exploration.
- Privacy, safeguarding, and competition-governance risk assessment.

### Exit criteria

Repeated evidence that athletes experience fragmented history or event discovery as meaningful problems and understand the universal-platform promise.

## Phase 1: Trusted personal record

### Outcome

Athletes can create an account and reliably maintain a useful machine-independent history.

### Deliverables

- Supabase authentication and RLS.
- Minimum athlete profile and progressive completion.
- Manual workout entry.
- OCR/photo extraction with confirmation.
- Canonical history, detail, provenance, and edit controls.
- Personal records for supported standard efforts.
- Weekly, monthly, season, and lifetime summaries.
- Basic public event directory without profile-based personalization.
- Export, deletion, and connection foundations.
- Accessibility and observability baselines.

### Exit criteria

Strong first-workout activation, repeat logging over four weeks, low duplicate/error rates, and athlete confidence in source accuracy.

## Phase 2: Connected machines

### Outcome

Automatic capture materially improves retention without compromising machine independence.

### Deliverables

- Provider adapter framework and certification tests.
- Bluetooth FTMS proof of concept.
- First account API integration selected by demand/access.
- Concept2, RP3, WaterRower, Technogym, and Matrix integration plans.
- Import job operations, retry, and reprocessing.
- Machine-model catalog and comparability classes.
- Provider connection consent and revocation.

### Exit criteria

High import success, low duplicates, acceptable support burden, and evidence that connected athletes retain better than manual-only athletes.

## Phase 3: Passport, events, and consent

### Outcome

The platform expands from record to participation home while preserving athlete control.

### Deliverables

- Athlete Passport and field-level visibility.
- Verified profile/affiliation claims foundations.
- Personalized event discovery and organizer verification.
- Saved events, registration handoffs, calendar, and eligibility summaries.
- In-app inbox.
- Category- and channel-specific notification preferences.
- Push notifications for selected challenges and events.
- Verified sender model.

### Exit criteria

Athletes use event discovery, understand sharing choices, and optional profile depth grows through visible benefits rather than forced completion.

## Phase 4: Community and River Expeditions

### Outcome

Athletes return for shared purpose and belonging, including athletes without clubs.

### Deliverables

- Training partners/follows with privacy controls.
- Clubs, teams, coaches, and roles.
- Individual and team challenges.
- First signature River Expedition.
- Milestones, crew contribution, recognition, and certificates.
- Moderation, blocking, reporting, and age-appropriate controls.
- Sponsored-mission governance.

### Exit criteria

Healthy repeat participation, meaningful independent-athlete inclusion, low abuse, and measurable retention lift without excessive notification volume.

## Phase 5: Fair rankings and competition results

### Outcome

Athletes and organizers trust filtered comparisons and structured result operations.

### Deliverables

- Ranking definitions by age, gender/competition category, weight, country, club, federation, machine, season, distance, adaptive category, and verification.
- Tiered verification evidence.
- Result submission and organizer review.
- Corrections, protests, appeals, and audit.
- Official result boards and Passport credentials.
- Standard event and rule templates.
- Organizer import/export and operational messaging.

### Exit criteria

Low dispute rates, explainable exclusions, predictable organizer workload, and athlete trust in machine and verification labels.

## Phase 6: Federation platform

### Outcome

National federations can grow participation and operate verified programs without taking ownership of athlete data.

### Deliverables

- Federation verification and administration.
- National event feeds and communication categories.
- Membership credential integration.
- National series and championships.
- Privacy-safe participation analytics.
- Safeguarding, localization, and data-role agreements.
- Federation service levels and support operations.

### Exit criteria

Successful federation pilots, valid consent coverage, official-message trust, and repeat organizer use.

## Phase 7: World Rowing readiness and partnership

### Outcome

The platform can support authorized global programs while remaining independently valuable.

### Deliverables

- World-level governance and brand controls.
- Virtual Series and Virtual World Championships use-case support.
- Global categories, qualification, sanctions, accessibility, and federation hierarchy.
- Official communication workflows.
- Partnership termination and data-continuity plan.
- Event-grade reliability and incident response.

### Exit criteria

Formal authorization, shared governance, proven operational capability, and no dependency that threatens the core athlete product.

## Continuous workstreams

Across every phase:

- Athlete research and accessibility.
- Security, privacy, consent, and safeguarding.
- Data quality and observability.
- Internationalization.
- Brand development.
- Provider and organizer relationships.
- Support and moderation readiness.
- Metrics and decision logging.

## Explicit sequencing rules

- Do not launch public cross-machine rankings before comparability rules exist.
- Do not launch broad direct messaging before moderation and consent controls.
- Do not request federation-grade profile data before related athlete value exists.
- Do not represent a World Rowing partnership before authorization.
- Do not let an integration delay block manual/OCR value.
- Do not monetize export, deletion, privacy, or basic provenance.

Dependencies and reversibility decisions should be recorded in [99_PRODUCT_DECISIONS.md](99_PRODUCT_DECISIONS.md).
