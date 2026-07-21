# Athlete Journey

| Document field | Value |
|---|---|
| **Title** | Athlete Journey |
| **Version** | 1.0 |
| **Status** | Approved |
| **Owner** | Founders |
| **Last Reviewed** | 2026-07-21 |
| **Related Documents** | [Product Definition](02_PRODUCT.md), [Personas](04_PERSONAS.md), [Athlete Passport](09_ATHLETE_PASSPORT.md), [Metrics](16_METRICS.md) |

## Journey principles

The athlete journey must deliver useful value before requesting depth of identity. Onboarding is not a database-completion exercise; it is the shortest path to a meaningful first outcome. Every stage should work for a home athlete, commercial-gym athlete, club member, traveling athlete, beginner, and experienced competitor.

## Stage 1: Discover and understand

### Athlete question

"Why do I need another rowing app?"

### Required product response

Explain the unique promise immediately: one history across machines, athlete-owned data, credible progress, events, and community. Avoid leading with integrations or federation ambitions. Show real outcomes: recover scattered history, save today's row, follow a goal, find an event.

### Success signal

The visitor starts account creation or explores public events because the machine-independent value is clear.

## Stage 2: Create the minimum account

Collect email, display name, country or territory, time zone, and acceptance of current terms and privacy notice. Request date of birth or age band only when required for safeguarding, eligibility, or an immediately selected feature. Preferred language may be inferred and confirmed.

Do not ask for club, federation, gender, weight, machine ownership, biography, phone number, or marketing permission during minimum account creation unless the athlete has chosen a flow that strictly requires one of them.

### Progressive profile prompt pattern

Every later request should say:

- What is being requested.
- What immediate benefit it unlocks.
- Whether it is public, private, or shared for a specific purpose.
- Whether it can be skipped.

Example: "Add your age band to see eligible race categories. It stays private unless you choose to show it."

## Stage 3: Reach first value

The default path is to save or import the first workout. Offer choices based on the athlete's current context:

- Enter key metrics manually.
- Photograph a monitor and confirm extracted data.
- Connect a supported provider.
- Pair a compatible Bluetooth device.
- Upload a supported file.

The athlete should see a normalized workout detail, source provenance, and one useful interpretation immediately: pace, distance, session summary, or potential personal best. Do not block saving because optional metrics are missing.

### Target

Median time from verified email to first saved workout should be under five minutes for manual entry and under three minutes for a supported automatic source.

## Stage 4: Build trust and continuity

Over the first week, the platform demonstrates that it remembers and organizes:

- Recent workouts across sources.
- Import status and duplicate handling.
- A simple weekly total.
- Emerging personal records.
- Clear distinctions between manual, imported, and verified performances.

Profile enrichment should be contextual. Ask for preferred units when displaying metrics, machine details when improving source recognition, and event interests when showing discovery—not all at once.

## Stage 5: Understand progress

After enough workouts exist, unlock comparisons that are honest about source compatibility:

- Weekly and monthly volume.
- Season totals.
- Standard-distance personal bests.
- Pace, power, stroke-rate, and heart-rate trends where available.
- Consistency and streaks without punishment-oriented language.
- Machine-class views when cross-machine comparison is not valid.

The athlete can correct metadata and report suspicious source data. Edits affecting ranked or verified results create audit events and may require re-verification.

## Stage 6: Join the wider sport

Offer event and challenge discovery based first on country, time zone, and general availability. Ask for optional age band, competition category, weight category, federation, club, or interests only when each improves a visible result.

The athlete can:

- Save an event.
- Follow an organizer.
- Join a challenge.
- Opt into a specific communication category.
- Add a calendar reminder.
- Follow a registration link.
- Understand accepted machines and verification requirements.

## Stage 7: Establish the Athlete Passport

As verified activity accumulates, the Passport becomes valuable without demanding public exposure. It can contain:

- Lifetime and season activity.
- Source connections.
- Verified personal bests.
- Event participation and results.
- Challenge and River Expedition achievements.
- Club, team, coach, and federation relationships with effective dates.
- Selectively shareable claims.

The platform should celebrate Passport completeness by usefulness, not percentage alone. "Ready for national event recommendations" is better than "80% complete."

## Stage 8: Participate and belong

Community engagement should begin with concrete rowing contexts:

- Encourage a training partner.
- Join a club or remain independent.
- Form or join a challenge team.
- Enter a River Expedition crew.
- Compare within a fair category.
- Receive official event updates.

Athletes can mute, leave, block, or report. Minors and vulnerable athletes receive age-appropriate discovery and communication protections.

## Stage 9: Compete and verify

Competition participation adds explicit rules and stronger identity requirements. The platform explains:

- Which organization owns the event.
- Which machines and categories are eligible.
- What verification is required.
- Which Passport fields will be shared.
- Whether registration occurs on-platform or with an external organizer.
- How results can be corrected or appealed.

The athlete consents to event-specific data use separately from general marketing.

## Stage 10: Maintain control

At any time, the athlete can review profile visibility, communication preferences, connected providers, organization permissions, export status, and deletion controls. Disconnection and consent withdrawal take effect promptly. Deletion explains exceptional retention before confirmation and includes uploads, device tokens, connections, and derived personalization.

## Recovery journeys

The product must explicitly support:

- A failed or partial import.
- A duplicate workout.
- A provider outage.
- A lost provider connection.
- Incorrect OCR extraction.
- A disputed ranking or verification.
- An event cancellation or schedule change.
- A notification received without expected consent.
- A returning athlete after months or years.

Recovery language must preserve trust: state what is known, what is uncertain, and whether athlete data is safe.

## Journey ownership

Product owns stage outcomes; design owns clarity and emotional quality; engineering owns reliability and auditability; data owns measurement; partnerships owns the accuracy of provider and organizer promises. Metrics for each stage are in [16_METRICS.md](16_METRICS.md).
