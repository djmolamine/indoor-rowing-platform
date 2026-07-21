# Product Definition

| Document field | Value |
|---|---|
| **Title** | Product Definition |
| **Version** | 1.0 |
| **Status** | Approved |
| **Owner** | Founders |
| **Last Reviewed** | 2026-07-21 |
| **Related Documents** | [Founding Principles](00_FOUNDING_PRINCIPLES.md), [Vision](01_VISION.md), [Product Requirements](product-requirements.md), [Roadmap](13_ROADMAP.md) |

## Product promise

Every row. Every machine. One athlete-owned history.

Indoor Rowing Platform combines workout tracking, athlete identity, personal progress, rankings, challenges, community missions, event discovery, and consented communications. The first experience is mobile-first because many athletes interact beside a rowing machine, in a gym, or immediately after training.

## Primary jobs to be done

Athletes hire the product to:

- Save a workout without worrying about machine brand or capture method.
- See one reliable history and understand progress over weeks, seasons, and a lifetime.
- Know when a performance is a personal best and how trustworthy or comparable it is.
- Find relevant virtual, local, national, and international opportunities.
- Join challenges and long-term missions without needing a club.
- Represent themselves through a controlled, verified Athlete Passport.
- Receive useful reminders and official information without losing communication control.
- Export or delete their data without negotiation.

Partners hire the product to:

- Connect equipment to an athlete-valued ecosystem.
- Publish events and rules to qualified, interested participants.
- Receive structured, auditable results.
- Operate clubs, teams, challenges, and rankings.
- Communicate through verified, consented channels.
- Understand participation through aggregated, privacy-safe reporting.

## Product surfaces

### Home

The athlete's current state: recent training, goal progress, challenge status, upcoming events, import issues, and relevant communications. Home prioritizes the next useful action rather than generic dashboard density.

### Workouts

One normalized history across providers. Workouts show core metrics, intervals where available, source, machine, capture method, quality warnings, verification, visibility, and derived achievements. See [06_DATABASE.md](06_DATABASE.md) and [07_MACHINE_PROVIDERS.md](07_MACHINE_PROVIDERS.md).

### Progress

Personal bests, trends, season summaries, consistency, volume, pace, power, stroke rate, and comparable benchmarks. Progress must explain when data is not comparable across sources.

### Rankings

Opt-in competitive views filtered by age, gender or competition category, weight category, country, club, federation, machine class, season, distance, and verification. Rankings never collapse incompatible machine classes merely to create a larger table.

### Challenges and River Expeditions

Short challenges create rhythm; River Expeditions create long-term shared purpose. Both accept rules defining eligible sources, dates, teams, verification, and privacy. See [10_COMMUNITY.md](10_COMMUNITY.md).

### Events

Discovery for virtual, in-person, and hybrid competitions. Event pages present organizer verification, dates, location, time zone, categories, machine eligibility, registration, rules, deadlines, result handling, and official updates. See [08_COMPETITIONS.md](08_COMPETITIONS.md).

### Athlete Passport

The lifelong profile connecting identity, achievements, verified results, affiliations, participation, privacy, consent, and presentation controls. See [09_ATHLETE_PASSPORT.md](09_ATHLETE_PASSPORT.md).

### Community

Purposeful relationships: training partners, follows, clubs, teams, coaches, encouragement, challenge groups, and expedition crews. There is no requirement for a broad public feed.

### Inbox and notifications

A durable in-app record of account, training, challenge, event, organizer, federation, and future World Rowing communications, governed by channel and category preferences. See [11_NOTIFICATIONS.md](11_NOTIFICATIONS.md).

## MVP definition

The MVP proves that athletes want a machine-independent record and will return to it. It includes:

- Account creation and secure sign-in.
- Minimum viable athlete profile with progressive completion.
- Manual workout creation.
- Photo/OCR extraction with athlete confirmation.
- Canonical workout history and detail.
- Source and machine provenance.
- Personal-best recognition for supported standard efforts.
- Basic season summaries.
- A basic public event directory that does not depend on additional profile data.
- Consent and notification preference foundations.
- Private-by-default profile and workout visibility.
- Data export and account-deletion workflows.

Provider API integrations, personalized event discovery, saved events, public rankings, complex social tools, live racing, and official federation operations should follow only after the core record is trusted and the required consent controls exist.

## Product rules

- A provider name never becomes the top-level product taxonomy.
- Manual and OCR entries are valid history but have lower default verification.
- Club affiliation is optional and never blocks individual participation unless an external event explicitly requires it.
- Optional profile completion may improve recommendations but cannot gate unrelated workout features.
- A public achievement links to the minimum necessary public profile information.
- Competition rules override general comparison logic only inside that competition.
- Official sender labels require organization verification.
- No World Rowing affiliation is implied without a signed agreement and approved brand use.

## Non-goals

For the initial product, we are not building:

- A clone of any manufacturer logbook.
- A universal formula that claims all rowing machines are equivalent.
- A replacement for every event-registration or timing vendor.
- A coaching prescription engine or medical platform.
- A general-purpose social media network.
- An advertising-led data marketplace.
- A club-only membership system.

## Quality standard

The product should feel calm, fast, trustworthy, and specific to indoor rowing. Core actions must work with one hand on a phone, poor gym connectivity, incomplete provider data, and athletes unfamiliar with technical rowing terminology. Error states explain what happened, what data is safe, and what the athlete can do next.

Design guidance appears in [05_DESIGN_SYSTEM.md](05_DESIGN_SYSTEM.md). Personas and journeys appear in [04_PERSONAS.md](04_PERSONAS.md) and [03_ATHLETE_JOURNEY.md](03_ATHLETE_JOURNEY.md).
