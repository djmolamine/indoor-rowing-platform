# Founding Principles

| Document field | Value |
|---|---|
| **Title** | Founding Principles |
| **Version** | 1.0 |
| **Status** | Approved |
| **Owner** | Founders |
| **Last Reviewed** | 2026-07-21 |
| **Related Documents** | [Vision](01_VISION.md), [Product Definition](02_PRODUCT.md), [Athlete Journey](03_ATHLETE_JOURNEY.md), [Product Decision Record](99_PRODUCT_DECISIONS.md) |

## Purpose

These principles are the product constitution for Indoor Rowing Platform. They guide strategy, design, engineering, partnerships, moderation, data governance, and commercial decisions. When a short-term opportunity conflicts with a principle, the team must either reject the opportunity or record a deliberate exception in [99_PRODUCT_DECISIONS.md](99_PRODUCT_DECISIONS.md).

Indoor rowing deserves an open digital ecosystem that is not defined by a single manufacturer, competition, or organization. The platform should connect the sport's participants and institutions while preserving athlete choice, provider neutrality, and the ability to evolve independently.

## 1. The athlete is the primary customer

The platform exists to improve an athlete's indoor-rowing life: record training, understand progress, find motivation, participate in events, and maintain a lifelong history. Equipment providers, clubs, coaches, organizers, federations, sponsors, and partners are important participants, but none may displace the athlete as the center of the product.

We judge features by the value they create for athletes, the burden they impose, and the trust they require. Administrative convenience alone is not enough to justify collecting more data or limiting athlete choice.

## 2. Grow the Sport

Every major product decision should help increase participation in indoor rowing by making the sport more accessible, welcoming, engaging, and sustainable. The platform should lower barriers for beginners, home athletes, commercial-gym athletes, club members, adaptive athletes, and competitors while creating clear pathways from a first workout to lifelong participation.

Success is measured not only by helping athletes become faster, but also by helping more people become—and remain—indoor-rowing athletes. Growth must be healthy: it should strengthen trust, inclusion, community, and the long-term capacity of clubs, organizers, providers, and federations to serve the sport.

## 3. One sport, many machines

Indoor rowing is larger than any manufacturer. Concept2, RP3, WaterRower, Technogym, Matrix, Bluetooth FTMS devices, future providers, manual entry, and photo/OCR capture must all be able to contribute to one athlete history.

Machine independence does not mean pretending all machines measure identically. We preserve provider, model, capture method, units, evidence, and verification. Comparisons are allowed only within clearly defined comparability rules. See [07_MACHINE_PROVIDERS.md](07_MACHINE_PROVIDERS.md) and [08_COMPETITIONS.md](08_COMPETITIONS.md).

## 4. The athlete owns their data

An athlete's identity, workouts, achievements, connections, consents, and participation history belong to the athlete. The platform is a trusted steward, not the owner. Athletes can review, correct where appropriate, export, restrict, disconnect, and delete their data subject to transparent legal or event-integrity retention requirements.

Provider integrations enrich the athlete record; they do not acquire control over it. A provider disconnection must not erase already imported athlete-owned records unless the athlete asks for deletion.

## 5. Value before data

The platform must provide useful workout capture, history, and general event discovery before asking for extensive personal information. Every optional field must have a clear purpose and a visible athlete benefit. Profile-completion techniques must be informative, skippable, and non-coercive.

We collect the minimum required to operate an account and progressively request additional information when it unlocks a relevant benefit, such as age-appropriate event discovery or national federation opportunities. See [03_ATHLETE_JOURNEY.md](03_ATHLETE_JOURNEY.md) and [09_ATHLETE_PASSPORT.md](09_ATHLETE_PASSPORT.md).

## 6. Consent is specific and reversible

Core service operation, public visibility, rankings, challenge participation, push notifications, research, marketing, organizer messages, national federation messages, and future World Rowing communications are separate purposes. Consent for one is never treated as consent for all.

Choices must be affirmative, understandable, versioned, auditable, easy to withdraw, and honored promptly across every channel. Essential transactional messages must be distinguished from optional communications. See [11_NOTIFICATIONS.md](11_NOTIFICATIONS.md).

## 7. Trust requires visible provenance

Every imported workout must retain its source and normalization history. Every competitive result must expose enough information to understand its verification and comparability. Missing values remain missing; estimates are labeled; edits are audited when they affect records or rankings.

Verification is tiered, not binary. Manual, photo-confirmed, provider-signed, device-attested, organizer-verified, and federation-certified results can coexist without being represented as equally authoritative.

## 8. A lifelong Athlete Passport

The Athlete Passport is the durable identity layer connecting profile, training history, personal bests, achievements, event participation, verification, affiliations, and permissions. It must survive changes in equipment, gym, club, country, coach, and federation relationships.

The Passport is private by default. It is not a public dossier or a mechanism for partners to obtain athlete contact data. Athletes selectively present verified claims and chosen profile elements. See [09_ATHLETE_PASSPORT.md](09_ATHLETE_PASSPORT.md).

## 9. Community is built through rowing

The platform should create belonging through shared training, encouragement, challenges, clubs, teams, competitions, and long-term missions—not through an undirected engagement feed. Home athletes and commercial-gym athletes are first-class community members even when they have no club.

Long-term engagement must come from more than competition. Athletes should have meaningful reasons to return whether they are pursuing a podium, building a habit, recovering fitness, contributing to a team, or simply enjoying the sport. River Expeditions are one expression of this principle: inclusive, cumulative missions that turn distance into shared journeys along real rowing landscapes. They motivate athletes across ability levels by rewarding participation, consistency, contribution, and collective progress—not only speed. See [10_COMMUNITY.md](10_COMMUNITY.md).

## 10. Recognition must be inclusive and fair

Elite performance matters, but so do consistency, improvement, challenge completion, contribution, and longevity. Rankings must clearly state age, gender or competition category, weight category, country, club, federation, machine class, season, distance, and verification filters where applicable.

Club membership is optional. Athletes without clubs must have meaningful ways to compete, participate, and belong.

## 11. World Rowing compatible, never dependent

The platform should support the data, competition, identity, communication, governance, accessibility, and internationalization standards needed for a future official World Rowing partnership. It must remain useful and viable without that partnership.

No World Rowing name, mark, official status, or implied endorsement may be used without authorization. Partnership readiness is an architectural and governance quality, not a branding shortcut. See [15_WORLD_ROWING.md](15_WORLD_ROWING.md).

## 12. Build, don't copy

The product needs a distinct global indoor-rowing brand: credible, modern, human, energetic, and recognizably about rowing. We should study proven products to understand why they earn trust and sustain participation, then build from our own athlete-first vision. Concept2 Logbook is inspiration for depth, trust, and sustained community mechanics, not for visual design, information architecture, terminology, or manufacturer-centered architecture.

## 13. Safety, privacy, and accessibility are product quality

Security, safeguarding, privacy, inclusive competition categories, accessible interfaces, localization, and respectful community controls are not compliance decorations. They are required product capabilities. Sensitive data concerning health, eligibility, accessibility, precise location, or minors receives heightened protection.

## Decision test

Before approving a major feature or partnership, ask:

1. What athlete problem does this solve?
2. Will it help more people begin, continue, or deepen their participation in indoor rowing?
3. Does it work for athletes outside a club and outside a single manufacturer?
4. What data and consent does it require, and is the exchange fair?
5. Can the athlete understand provenance, verification, and visibility?
6. Does it strengthen or weaken the Athlete Passport?
7. Would we still make this decision without a prospective partner?
8. Can it operate internationally and accessibly?
9. What should be recorded in [99_PRODUCT_DECISIONS.md](99_PRODUCT_DECISIONS.md)?
