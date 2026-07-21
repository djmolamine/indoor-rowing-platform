# Product requirements

| Document field | Value |
|---|---|
| **Title** | Product Requirements |
| **Version** | 1.0 |
| **Status** | Approved |
| **Owner** | Founders |
| **Last Reviewed** | 2026-07-21 |
| **Related Documents** | [Founding Principles](00_FOUNDING_PRINCIPLES.md), [Product Definition](02_PRODUCT.md), [Athlete Passport](09_ATHLETE_PASSPORT.md), [Roadmap](13_ROADMAP.md) |

## 1. Purpose and positioning

Indoor Rowing Platform is a machine-independent athlete platform for workout history, athlete identity, event discovery, challenges, and consented communications. It must be suitable for a future official relationship with World Rowing or national federations without presenting itself as an official partner before such a relationship is authorized.

The product must establish its own strong indoor-rowing brand: modern, credible, international, inclusive, and recognizable without relying on the identity of a rowing-machine manufacturer.

## 2. Product boundaries

- Equipment manufacturers are workout sources, not owners of the athlete relationship or product experience.
- The architecture is provider-neutral: Concept2, RP3, WaterRower, Technogym, Matrix, Bluetooth devices, manual entry, OCR/photo capture, files, and future providers connect through adapters.
- An athlete account is distinct from any device, source connection, federation membership, or event registration.
- Consenting to core service operation does not imply consent to marketing, federation communications, public visibility, or every event category.
- The platform may facilitate event discovery and registration handoffs without becoming the official registration or eligibility authority.
- Only verified organizations may be represented as federations, governing bodies, or official event organizers.
- The platform is World Rowing compatible, never dependent, and must not imply affiliation without authorization.

## 3. Athlete identity and profile

### 3.1 Required at account creation

The initial sign-up must request only the minimum data required to establish and operate an account:

- Email address
- Display name
- Country or territory of residence
- Time zone, which may be inferred but must be editable
- Date of birth or verified age band only when required for eligibility, age-appropriate experiences, or safeguarding
- Acceptance of the current terms of service and privacy notice

Acceptance records must include the document version, timestamp, and applicable locale. Product analytics, marketing, event promotion, and third-party communications must not be bundled into acceptance of core terms.

### 3.2 Optional profile data

The platform may offer athletes the following optional fields:

- Full legal name
- Profile image
- Pronouns
- Gender or competition category
- Date of birth when an age band is otherwise sufficient
- Nationality
- National federation affiliation and membership reference
- Club, team, or training group
- City or region
- Preferred language
- Experience level
- Competition interests and event-format preferences
- Accessibility requirements
- Connected machines, sources, and wearables
- Public biography and social links

Each request for optional data must state its purpose, whether it will be shared, and the immediate athlete benefit. Missing optional fields must not degrade unrelated core workout functionality.

### 3.3 Profile visibility

Profiles are private by default. Athletes must be able to control visibility at a useful level, including:

- Entire profile discoverability
- Display name and profile image
- Country, club, federation, age band, or competition category
- Workout summaries and individual workouts
- Challenge participation and leaderboard presence
- Personal records and results

Sensitive identity, eligibility, health, precise location, contact, and accessibility data must never become public profile fields by default.

## 4. Consent and notification preferences

### 4.1 Consent requirements

Consent must be specific, informed, affirmative, recorded, and easy to withdraw. The platform must maintain a history of:

- Consent purpose and category
- Status and source of the choice
- Policy or disclosure version
- Timestamp and locale
- Withdrawal timestamp where applicable

Preselected consent boxes are not permitted. Withdrawing optional communication consent must not affect access to unrelated core services.

### 4.2 Communication categories

Athletes must be able to manage delivery channels independently for:

- Essential account and security messages
- Workout import and device status
- Challenge progress and reminders
- Virtual Series announcements
- Virtual World Championships announcements
- National federation and national event announcements
- Other local, regional, or international competitions
- Product news and research invitations

Available channels may include in-app inbox, push notification, and email. Essential transactional messages must be clearly distinguished from optional promotional communications.

### 4.3 Push notifications

Push notifications require operating-system permission and an in-product category opt-in. Notifications must:

- Identify the sender or responsible organization
- State why the athlete is receiving the message
- Deep-link to relevant event or preference details
- Respect time zone, quiet hours, age restrictions, geography, and selected interests
- Avoid revealing sensitive information on a locked device
- Stop promptly after consent is withdrawn

Supported use cases include Virtual Series events, Virtual World Championships, national events, challenges, registration deadlines, schedule changes, qualification updates, and other selected competitions.

## 5. Canonical workouts and machine providers

Every workout source must map through a versioned adapter into the canonical workout model while preserving provider, machine, capture method, original identifiers, raw evidence where retained, units, timestamps, and normalization warnings.

Provider and workout requirements:

- Missing metrics remain missing and are never silently represented as zero.
- Manual and OCR-confirmed workouts are valid athlete history with explicit provenance.
- Provider failures do not block access to previously imported history.
- Deduplication is idempotent and explainable to the athlete.
- Provider attribution remains visible without shaping the top-level product taxonomy.
- Athlete disconnection revokes future access without deleting imported history unless the athlete requests deletion.
- Machine classes are versioned and separate from provider identity.
- Provider integration does not imply competitive comparability.

## 6. Event discovery

Athletes must be able to discover relevant competitions without connecting a particular machine brand. Event records should support:

- Event name, organizer, verification status, and event level
- Virtual, in-person, or hybrid format
- Date, time zone, location, and supported languages
- Registration period and official registration link
- Eligibility summary, age bands, and competition categories
- Supported equipment or submission methods without platform-wide machine preference
- Distances, race formats, and challenge rules
- Official information, contact, results, and update links

Discovery should use athlete-controlled preferences such as location, language, experience, age eligibility, and event interests. Personalized discovery must remain useful with minimal profile data and become more precise only when athletes choose to provide more.

## 7. Competitions, rankings, and verification

Competition rules must define accepted machine classes, distance or duration, start protocol, categories, verification tier, ranking logic, tie-breaks, publication, and appeal process. The active comparison class must be visible wherever results are ranked.

Rankings may filter by age, gender or competition category, weight category, country, club, federation, machine class, season, distance or duration, adaptive category, and verification tier. Rankings must not mix incompatible machine classes without an approved published methodology.

Verification tiers are:

0. Athlete-declared manual result.
1. Photo-confirmed result.
2. Provider-signed or trusted API import.
3. Device-attested result under a recognized protocol.
4. Organizer-verified result.
5. Federation-certified or official championship result.

Verification and comparability remain separate: a verified result is not automatically comparable with every other verified result.

## 8. Community and River Expeditions

Community features must create belonging through rowing activity rather than an undirected engagement feed. Training partners, follows, coaches, clubs, teams, challenge crews, and organizers use explicit relationships and visibility rules. Club membership remains optional.

River Expeditions are inclusive, long-term community missions in which eligible canonical workouts advance individual or crew progress along a mapped river journey. They must reward participation, consistency, contribution, and shared progress across ability levels. Expedition rules define eligible sources, dates, distance treatment, privacy, milestones, and integrity controls without presenting participation distance as universal performance equivalence.

Community launch requirements include blocking, muting, reporting, anti-spam controls, moderation ownership, and age-appropriate safeguarding.

## 9. Federation and World Rowing communications

The platform must support consented communications from verified event organizers, national federations, and a potential future World Rowing partner:

- Announce competitions and participation opportunities
- Notify eligible or interested athletes about registration windows
- Communicate qualification information and deadlines
- Deliver operational, schedule, safety, or venue updates
- Promote challenges, development programs, education, and research opportunities
- Link athletes to authoritative rules, registration, live coverage, and results

Official communication requirements:

- Sender identity and verification status must be prominent.
- The platform must not use World Rowing names, marks, official styling, or implied endorsement without authorization.
- Audience selection must use lawful, consented data and the minimum attributes needed for the communication.
- Federations and organizers must not receive athlete contact or profile data merely because they can send a platform message.
- Communication access, targeting criteria, sends, and administrative actions must be auditable.
- Athletes must be able to mute an organization or category except for essential messages tied to an event they have actively entered, subject to applicable rules and law.

## 10. Athlete privacy and data rights

Athletes must be able to:

- Review and edit profile data
- See active source, device, and organization connections
- Understand how each data category is used
- Change profile and workout visibility
- Review and withdraw optional consents
- Download a portable export of profile, workout, consent, connection, challenge, and event-interest data
- Request deletion of the account and associated personal data

Export must use documented, machine-readable formats with human-readable context. Account deletion must explain any lawful retention, event-integrity, fraud-prevention, or backup limitations before confirmation and report completion status. Connected secrets, push tokens, uploaded artifacts, and derived personalization data must be included in the deletion workflow.

## 11. Athlete value before additional data

The platform must provide useful workout capture, history, and general event discovery before asking athletes to enrich their profiles. Progressive profiling is permitted only when:

1. The athlete is shown a clear and immediate benefit.
2. The purpose and visibility of the requested field are explained.
3. The request can be skipped when the related feature does not strictly require it.
4. Previously supplied information is not requested again without reason.
5. Declining does not trigger manipulative prompts or artificial feature restrictions.

Examples of valid value exchanges include asking for event interests to improve recommendations, an age band to show eligible categories, or federation affiliation to surface national opportunities.

## 12. MVP requirements

The initial product must provide:

- A distinct, machine-independent brand and product voice
- Secure athlete accounts and minimum required profile data
- Optional profile enrichment with purpose explanations
- Canonical workout history from manual and OCR-confirmed sources before external integrations
- General public event discovery without requiring optional profile data
- Separate consent and channel preferences
- Opt-in event and challenge push-notification foundations
- Private-by-default athlete profiles and visibility controls
- Data export and account-deletion entry points
- Clear distinction between platform, organizer, federation, and future official-partner communications

The current mock UI does not yet implement these requirements. They define the next product and design phases; this document does not authorize UI, database, or integration changes by itself.

Preference-informed discovery, saved events, and targeted event communications follow after the Athlete Passport and consent foundations are implemented.

## 13. Success and governance

The product should measure athlete value and trust, not raw data collection. Core measures include activation through a first workout, retained training use, event discovery engagement, valid consent coverage, communication relevance, opt-out processing, export/deletion completion, privacy incidents, and athlete confidence.

Any future federation or World Rowing partnership must add a documented governance model covering brand authorization, data roles, lawful basis, safeguarding, communication permissions, incident response, retention, cross-border processing, and partnership termination.
