# Competitions, Rankings, and Events

| Document field | Value |
|---|---|
| **Title** | Competitions, Rankings, and Events |
| **Version** | 1.0 |
| **Status** | Approved |
| **Owner** | Founders |
| **Last Reviewed** | 2026-07-22 |
| **Related Documents** | [Machine Providers](07_MACHINE_PROVIDERS.md), [Athlete Passport](09_ATHLETE_PASSPORT.md), [Notifications](11_NOTIFICATIONS.md), [World Rowing Strategy](15_WORLD_ROWING.md) |

## Product role

The platform helps athletes discover, understand, enter, follow, and record indoor-rowing competitions. It helps organizers publish rules, communicate, receive and verify results, resolve disputes, and publish outcomes. It does not claim rule authority where an external organizer, national federation, or World Rowing owns that authority.

## Event hierarchy

- **Series:** recurring brand or program, such as a national virtual series.
- **Edition:** dated annual or seasonal instance.
- **Event:** virtual, physical, or hybrid gathering.
- **Competition:** one race, distance, time piece, relay, challenge, or category-scored contest.
- **Category:** eligibility grouping governed by the edition's rules.
- **Result:** athlete or team performance with evidence and status.

This hierarchy supports local events and world-level championships without forcing them into one flat challenge table.

## Event discovery requirements

Event listings include organizer and verification status, format, date/time/time zone, location, language, registration window, official link, eligibility summary, age bands, gender or competition categories, weight categories, adaptive categories, machine rules, distances, result submission, costs, accessibility, contact, and communication preferences.

Discovery can filter by:

- Virtual, physical, or hybrid.
- Country, region, radius, and time zone.
- Date and registration status.
- Age eligibility.
- Gender or competition category.
- Weight category.
- Adaptive category.
- Machine provider/model/class.
- Distance or duration.
- Club, national federation, or organizer.
- Verification requirement.
- Beginner, open, age-group, elite, team, or school level.

General discovery works without a complete Passport. Personalization becomes more precise only with consented profile data.

## Competition rule sets

Rules are versioned and immutable after competition start except through a visible emergency amendment process. They define:

- Authority and organizer.
- Eligible dates and time zones.
- Machine classes and setup.
- Exact distance/duration and start protocol.
- Age calculation date.
- Gender or competition category policy.
- Weight limits and weigh-in procedure.
- Adaptive classification.
- Verification and evidence.
- Ranking, tie-break, penalties, and disqualification.
- Team and relay composition.
- Privacy and publication.
- Correction, protest, and appeal windows.

Athletes acknowledge event-specific terms separately from platform terms.

## Competition taxonomy

Competition divisions are Men, Women, Lightweight Men, Lightweight Women, and Adaptive / Para. `Open participation` is reserved for non-championship community challenges whose rules intentionally do not separate competition divisions. Personal gender or competition eligibility is stored separately from a result's event-defined division.

Recent World Rowing indoor structures inform the default individual age bands: Under 19, Under 23, Senior 23–39, five-year Masters bands from 40–44 through 85–89, and Masters 90+. Event configuration may additionally enable Under 13, Under 15, or Under 17 youth bands. Age is derived from date of birth using an event-owned calculation date; the general seasonal default is age on 31 December of the competition year. Athletes do not self-select an age category when date of birth is available. These individual indoor bands are distinct from the on-water Masters A–M crew-average system and must never be substituted for it.

Lightweight eligibility is event-specific. The current indoor limits used by World Rowing are a maximum of 75.0 kg for Lightweight Men and 61.5 kg for Lightweight Women. Editable profile weight cannot establish eligibility. A competition weigh-in records its own evidence and one of: declared, evidence submitted, organizer verified, or federation verified.

Adaptive / Para is the primary discovery division. Its child classifications are versioned event configuration containing category code, display name, applicable distance or duration, eligibility status, and verification authority. Rowform can load IAR or another organizer-approved structure without changing page components and does not turn a trial classification into a permanent global category.

### Ranking formats and scoring

- Fixed-distance targets are stored in meters and ranked by shortest elapsed time.
- Fixed-time targets are stored in seconds and ranked by greatest completed distance.
- Relay results are team results and remain separate from individual rankings.
- Supported fixed distances are 100 m, 250 m, 500 m, 1,000 m, 2,000 m, 5,000 m, 6,000 m, 10,000 m, 20,000 m, half marathon (21,097 m), and marathon (42,195 m).
- Supported fixed times are 1 minute, 4 minutes, 30 minutes, and 60 minutes. Relay definitions support 2,000 m and 5,000 m.

Every definition is labeled as a World Rowing official event, federation official event, organizer official event, Rowform standard ranking, or community challenge. A format is official only within the specific programme and rule version that grants that status. The 10K, 20K, and other platform standards are labeled Rowform standard unless an authorized event definition states otherwise.

Machine eligibility is expressed separately as provider, model, and class constraints. Ranking filters can narrow all three without implying equivalence. A result row exposes the actual provider and known model plus its class and verification. Cross-provider tables require an explicit comparability rule and visible label; provider-specific tables name the provider. Unknown machine records remain useful training history but do not enter strict rankings by default.

Official references reviewed on 2026-07-22: [2026 World Rowing Virtual Indoor Championships](https://worldrowing.com/2026-world-rowing-virtual-indoor-championships-presented-by-concept2/), [2026 World Rowing Virtual Series](https://worldrowing.com/event/2026-world-rowing-virtual-series/), [Indoor Adaptive Rowing](https://worldrowing.com/technical/para-rowing/indoor-adaptive-rowing/), and the [2025 championship Q&A](https://worldrowing.com/2025/01/08/qa-about-the-2025-world-rowing-indoor-championships-presented-by-concept2/).

## Verification tiers

Suggested tiers:

0. Athlete-declared manual result.
1. Photo-confirmed result.
2. Provider-signed or trusted API import.
3. Device-attested result under a recognized protocol.
4. Organizer-verified result.
5. Federation-certified or official championship result.

An organizer sets the minimum accepted tier. Evidence access is restricted and retained according to policy. Public result boards show the tier or a plain-language equivalent.

## Rankings

Rankings are opt-in/publication-governed views over eligible results. Supported dimensions include:

- Age or age band.
- Gender or competition category.
- Weight category.
- Country.
- Club.
- National federation.
- Machine provider/model/class.
- Season.
- Distance or duration.
- Verification tier.
- Adaptive category.

The active filter set must always be visible. Rankings never mix machine classes without an approved rule. Athletes may maintain private personal comparisons without entering a public ranking.

## Personal bests and records

Distinguish:

- Training personal best.
- Machine-class personal best.
- Verified personal best.
- Competition personal best.
- Season best.
- Platform record.
- Organizer/federation record.

Records reference the underlying result and rule version. Editing an underlying workout can suspend or supersede the record until revalidated.

## Registration and identity

The platform may host registration or hand off to an official external system. In either case, it should explain what data leaves the platform. Passport credentials can reduce repeated entry, but the athlete approves each disclosure.

Club membership remains optional unless a specific event owner lawfully requires it. Independent athletes need a clear affiliation option such as "Independent" rather than false club data.

## Organizer tooling

Long-term capabilities include:

- Verified organization profiles and scoped staff roles.
- Event and rule templates.
- Category validation.
- Registration links or structured entries.
- Bulk import with preview and validation.
- Live check-in and result intake.
- Verification queues.
- Corrections, protests, decisions, and audit logs.
- Result-board publication and correction notices.
- Certificates and Passport credentials.
- Consented communications and emergency updates.
- Privacy-safe reports and exports.

Spreadsheet import is a supported bridge, not the desired operating model.

## Competition integrity

The platform needs anomaly detection, rate limits, duplicate identity controls, evidence protection, staff separation of duties for major events, transparent sanctions, and an appeal route. Automated flags assist authorized reviewers and must not silently disqualify athletes.

Official results may require limited retention after account deletion. Athletes must understand this before entry, and public identity should be minimized or anonymized where rules allow.

## World Rowing readiness

World-level compatibility requires localization, global time zones, safeguarding, adaptive categories, federation identity, official branding controls, sanctions implementation under explicit authority, auditability, data-role agreements, and event-grade reliability. See [15_WORLD_ROWING.md](15_WORLD_ROWING.md).

## MVP sequence

1. Public event directory and saved events.
2. Machine/rule eligibility display.
3. Registration handoff and reminders.
4. Challenge-style result submission.
5. Verification tiers and filtered rankings.
6. Organizer administration and structured results.
7. Federation and official competition operations.
