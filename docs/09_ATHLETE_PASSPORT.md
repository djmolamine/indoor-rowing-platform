# Athlete Passport

| Document field | Value |
|---|---|
| **Title** | Athlete Passport |
| **Version** | 1.0 |
| **Status** | Approved |
| **Owner** | Founders |
| **Last Reviewed** | 2026-07-21 |
| **Related Documents** | [Founding Principles](00_FOUNDING_PRINCIPLES.md), [Athlete Journey](03_ATHLETE_JOURNEY.md), [Database Foundation](06_DATABASE.md), [Authentication](authentication.md) |

## Definition

The Athlete Passport is the lifelong, athlete-controlled identity and achievement layer for indoor rowing. It connects who the athlete chooses to be on the platform with workouts, verified claims, personal records, competition participation, affiliations, challenges, River Expeditions, privacy, consent, and data rights.

It is not a public profile by default, not a replacement for legal identity systems, and not a partner-owned customer record.

## Athlete value

The Passport should reduce repeated data entry, preserve history across equipment and organizations, help athletes discover relevant opportunities, provide credible proof of achievement, and allow selective sharing. It becomes more valuable through participation rather than through forced profile completion.

## Minimum required data

At initial account creation:

- Verified email address.
- Display name.
- Country or territory of residence.
- Time zone.
- Preferred language when needed for service delivery.
- Versioned acceptance of terms and privacy notice.
- Date of birth or verified age band only when required for safeguarding or a selected eligibility use case.

## Optional data

- Full legal name.
- Profile image.
- Pronouns.
- Date of birth where age band is insufficient.
- Gender or competition category.
- Weight category or competition weigh-in claims.
- Nationality.
- City or region.
- Club, team, coach, or training group.
- National federation and membership reference.
- Experience and competition level.
- Preferred machine providers and connected sources.
- Event interests, distances, and formats.
- Accessibility or adaptive-category information.
- Biography, social links, and public achievements.

Each optional field has purpose, visibility, verification, source, and effective date where applicable.

## Progressive completion

Do not show a generic demand for "100% complete." Show readiness outcomes:

- Ready to save workouts.
- Ready for personalized event discovery.
- Ready for age-group rankings.
- Ready for weight-category competition.
- Ready to represent a club or federation.
- Ready to share a verified competition card.

Prompts must be skippable unless the athlete is entering a feature that requires the data. Declining does not reduce unrelated service.

## Credentials and claims

Passport claims can include:

- Verified identity or age band.
- Verified federation or club membership.
- Provider-connected workout history.
- Personal bests by machine class.
- Official event results.
- Challenge and River Expedition completions.
- Coaching or organizer roles.
- Certificates, records, and participation milestones.

Each claim identifies issuer, evidence type, verification tier, issue date, expiry/revocation, and visibility. Future standards-based credentials may be supported, but the platform should not expose raw legal documents to routine partners.

## Visibility model

Default: private.

Athletes can separately control:

- Discoverability.
- Display name and image.
- Country/region.
- Club/federation relationships.
- Age band and competition categories.
- Workout summaries and individual workouts.
- Personal bests and rankings.
- Challenge, expedition, and event participation.
- Achievements and credentials.

Contact details, exact birth date, accessibility information, provider tokens, precise routine locations, legal identity evidence, and consent history are never public profile fields.

## Sharing

Sharing uses scoped presentations rather than exposing the full Passport. Examples:

- Public achievement card.
- Coach training view.
- Event eligibility package.
- Federation membership proof.
- Club roster identity.
- Personal export.

The athlete sees the fields, recipient, purpose, duration, and revocation behavior before sharing. An organizer's ability to message an athlete does not automatically reveal the athlete's email.

## Affiliations

Club membership is optional. Club, team, coach, gym, and federation are separate relationship types with effective dates and roles. Athletes may have multiple relationships unless a particular competition rule limits representation. Changing affiliation does not rewrite historical results.

## Minors and delegated access

The Passport must eventually support guardian consent, age-appropriate visibility, restricted discovery, safe communications, and transition to athlete control at the appropriate age. Coaches and guardians use delegated roles rather than shared passwords. Safeguarding requirements can vary by jurisdiction and partner.

## Corrections and disputes

Athletes can correct self-declared attributes. Verified claims require a correction or reverification workflow. Competition results use the event appeal process. Historical changes are audited when they affect eligibility, records, or public results.

## Export and deletion

Export includes profile attributes, relationships, workouts, provenance summaries, records, achievements, event participation, consents, communications preferences, and connected sources in machine-readable and human-readable forms.

Deletion removes private Passport data, tokens, artifacts, and personalization. Official results or integrity records may be retained or anonymized under disclosed rules. The athlete receives status and completion confirmation.

## Success criteria

The Passport succeeds when athletes view it as useful, accurate, portable, and safe; partners can rely on scoped verified claims; and profile depth grows because value is visible rather than because the interface applies pressure.
