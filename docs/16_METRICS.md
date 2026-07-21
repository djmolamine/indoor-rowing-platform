# Product Metrics and Measurement Framework

| Document field | Value |
|---|---|
| **Title** | Product Metrics and Measurement Framework |
| **Version** | 1.0 |
| **Status** | Approved |
| **Owner** | Founders |
| **Last Reviewed** | 2026-07-21 |
| **Related Documents** | [Vision](01_VISION.md), [Product Definition](02_PRODUCT.md), [Athlete Journey](03_ATHLETE_JOURNEY.md), [Business Model](12_BUSINESS_MODEL.md) |

## Measurement philosophy

Metrics exist to test whether the platform creates durable athlete value and trustworthy sport infrastructure. We do not optimize raw data collection, notification volume, profile fields, screen time, or public posting as ends in themselves.

Every growth or engagement metric needs trust, quality, and inclusion guardrails. Metrics must be segmented by machine/source, athlete context, geography, accessibility needs where safely available, club status, and acquisition channel without exposing individuals.

## North-star metric

### Monthly Trusted Active Athletes

Athletes who record at least two valid workouts on separate days in a rolling 30-day period and successfully use at least one value feature such as progress, a personal record, challenge or River Expedition contribution, event discovery, or competition participation.

This combines repeated core behavior with experienced value. "Trusted" requires that workouts are not unresolved duplicates or invalid imports; it does not require high-tier competitive verification.

## Input metric tree

### Acquisition

- Qualified landing-page visitor to sign-up start.
- Sign-up completion.
- Acquisition by provider, club, gym, organizer, federation, referral, and organic channel.
- Cost per activated athlete.
- Country/language coverage.

Guardrail: do not count coerced partner account creation as healthy acquisition.

### Activation

- First workout saved/imported.
- Median time to first workout.
- First source connected.
- First useful progress insight viewed.
- First event saved or challenge joined.
- Percentage reaching first value without optional profile completion.

Initial targets should be set after baseline research. Directionally, manual first-workout time should be under five minutes and connected-source import under three minutes once supported.

### Retention

- Week 1, week 4, week 12, and annual retained athletes.
- Active weeks per athlete.
- Workouts and training days per active athlete.
- Return after lapse.
- Retention by capture method and number of providers.
- Retention lift from challenges, River Expeditions, events, and community relationships.

Guardrail: avoid notification-driven short-term return that increases mute, uninstall, or distrust.

### Workout data quality

- Import success and time to availability.
- Duplicate rate and resolution.
- Adapter error rate by provider/version.
- OCR field confidence, correction rate, and abandonment.
- Missing core metric rate.
- Source-time-zone correction rate.
- Athlete-reported accuracy.
- Reprocessing and rollback incidents.

### Athlete Passport

- Passport readiness outcomes achieved.
- Optional field completion by stated benefit.
- Verified claims issued, expired, revoked, and corrected.
- Visibility-control usage.
- Scoped share creation and revocation.
- Profile correction/dispute completion.

Guardrail: no target for maximum number of personal fields collected. Measure whether each field improves a chosen athlete outcome.

### Events and competitions

- Events published and verified.
- Event detail to save/registration-handoff conversion.
- Eligible athlete discovery coverage.
- Entries or result submissions where supported.
- Verified result percentage by tier.
- Result processing time.
- Correction, protest, appeal, and reversal rates.
- Organizer repeat rate and satisfaction.
- Competition incident rate.

### Rankings and records

- Athletes opting into rankings.
- Searches by age, category, weight, country, club, federation, machine, season, distance, and verification.
- Ineligible/excluded result explanation views.
- Record calculation accuracy.
- Ranking disputes per 1,000 entries.
- Cross-machine comparability complaints.

Guardrail: larger leaderboard size is not success if comparability becomes less credible.

### Challenges and River Expeditions

- Join, active-contributor, milestone, and completion rates.
- Contribution days and distance distribution.
- Independent versus club athlete participation.
- Crew formation and healthy active-crew rate.
- Repeat participation.
- Encouragement interactions.
- Suspicious contribution and moderation rates.
- Athlete-reported motivation and belonging.

### Community health

- Meaningful relationships established.
- Encouragement given and received.
- Club/team/coach participation.
- Blocks, mutes, reports, spam, and safety incidents.
- Median moderation response and resolution.
- Safety and safeguarding incidents involving minors.
- Community sentiment.

Do not optimize feed impressions or comments without corresponding health measures.

### Notifications and consent

- Consent opt-in by category and channel.
- Delivery, action completion, mute, and opt-out.
- Complaint and irrelevant-message feedback.
- Quiet-hour violations.
- Percentage of optional sends with valid consent proof.
- Withdrawal-to-suppression latency.
- Suppression accuracy.
- Sender quality by organizer/federation.

Guardrail: no total-push volume target. The goal is timely useful action with low regret.

### Privacy and data rights

- Export request completion and time.
- Deletion completion and time.
- Failed deletion dependencies.
- Unauthorized access and privacy incidents.
- RLS and authorization test coverage.
- Consent audit exceptions.
- Data-retention policy compliance.
- Athlete trust score.

### Business

- Free-to-paid conversion.
- Athlete, club, organizer, provider, and federation revenue.
- Gross margin by product line.
- Integration maintenance cost.
- Support cost per active athlete and event.
- Verification cost per result tier.
- Revenue concentration by partner.
- Churn and reason.

Guardrail: no single provider or official partner should create an existential revenue dependency without explicit board/founder acceptance.

## Research metrics

Quantitative behavior must be paired with:

- Athlete interviews across personas.
- Usability sessions in home, gym, and club contexts.
- Accessibility testing.
- Data-trust comprehension.
- Consent and sender-identity comprehension.
- Organizer workflow research.
- Provider integration feedback.
- Partnership and federation research.

## Experiment standards

Every experiment states hypothesis, target population, primary metric, guardrails, duration, consent implications, and stop conditions. Experiments must not manipulate legal acceptance, privacy visibility, result verification, competition eligibility, or official sender appearance.

## Reporting cadence

- Daily operational reliability.
- Weekly product funnel and data quality.
- Monthly north star, retention, consent, community health, and business review.
- Quarterly strategy, persona, provider, competition, and partnership review.
- Immediate escalation for security, privacy, safeguarding, result-integrity, or official-communication incidents.

Metric definition changes are recorded in [99_PRODUCT_DECISIONS.md](99_PRODUCT_DECISIONS.md) so historical reporting remains interpretable.
