# Notifications, Consent, and Official Communications

| Document field | Value |
|---|---|
| **Title** | Notifications, Consent, and Official Communications |
| **Version** | 1.0 |
| **Status** | Approved |
| **Owner** | Founders |
| **Last Reviewed** | 2026-07-21 |
| **Related Documents** | [Founding Principles](00_FOUNDING_PRINCIPLES.md), [Athlete Passport](09_ATHLETE_PASSPORT.md), [Competitions](08_COMPETITIONS.md), [World Rowing Strategy](15_WORLD_ROWING.md) |

## Purpose

Notifications should help athletes act at the right time without turning trust into an engagement tactic. The system supports in-app, push, and email channels while keeping category, sender, consent, time zone, and privacy explicit.

## Communication classes

### Essential service

Security alerts, authentication, data export/deletion status, material privacy changes, payment receipts when applicable, and urgent service incidents. These are not marketing, but frequency and content remain minimal.

### Workout and connection operations

Import completion, failed sync, duplicate resolution, provider disconnection, expiring authorization, and OCR confirmation. Athletes can configure non-critical operational notifications.

### Training and goals

Personal reminders, planned sessions, progress, personal-best recognition, and selected summaries. Disabled by default until the athlete configures them.

### Challenges and River Expeditions

Join confirmation, milestones, crew progress, deadlines, completion, and certificates. Preference can be per mission and channel.

### Competitions and events

Saved-event reminders, registration windows, qualification, entry status, schedule changes, results, and appeals. An athlete entering an event may receive essential event-operation messages under the event terms; promotional messages remain optional.

### Verified organizer and federation

National events, athlete-development opportunities, official rule updates, and programs from verified organizations. Consent is separate by organization/category/geography as appropriate.

### Future World Rowing

Virtual Series, Virtual World Championships, official campaigns, qualification, and global event communications may have a dedicated sender and preference category only after formal authorization. Until then, messages identify the actual platform or event organizer and do not imply World Rowing status.

### Product and research

Product news, surveys, research, and commercial messages require separate opt-in and cannot be bundled with event access.

## Consent model

Consent must be:

- Specific to a clear purpose.
- Affirmative; no preselected optional choices.
- Informed through concise context and accessible detail.
- Recorded with disclosure version, locale, source, and time.
- Reversible through the same or easier path.
- Enforced before audience selection and again before delivery.

Operating-system push permission is not product consent. Both OS permission and an enabled in-product category are required.

## Preference center

Athletes can manage:

- Channel: in-app, push, email.
- Category and subcategory.
- Organization/sender follows and mutes.
- Country or federation interests.
- Event formats and competition levels.
- Quiet hours and time zone.
- Digest versus immediate delivery.
- Lock-screen privacy.

The center distinguishes essential messages and explains why they cannot all be disabled while the account remains active.

## Message requirements

Every message must identify:

- Sender.
- Reason the athlete is receiving it.
- Primary action or information.
- Relevant date and time zone.
- Whether it is official, sponsored, or promotional.
- A deep link to the relevant event, workout, challenge, or preference.

Push previews must not reveal sensitive health, identity, eligibility, or precise-location data. Email tracking should be minimized and disclosed.

## Audience selection

Audience rules can use only data appropriate to the consented purpose. Example: a national federation event may target athletes who selected that country's events and match an age-eligible band, but it does not receive a downloadable list of athlete emails merely to send through the platform.

Sensitive targeting requires governance review. Do not infer protected or sensitive attributes for messaging. Minors require age-appropriate sender and frequency controls.

## Delivery architecture requirements

- Durable message record and template version.
- Sender organization and verified role.
- Consent/lawful basis snapshot.
- Audience rule and count.
- Idempotent delivery jobs.
- Per-channel attempt, provider response, and suppression reason.
- Preference and withdrawal checks at send time.
- Time-zone and quiet-hour scheduling.
- Rate limits and frequency caps.
- Emergency override restricted to authorized event operations with audit.

## Official communications

Official badges are issued to verified organizations, not typed into message content. Administrators use scoped roles and strong authentication. Major sends can require approval. Corrections identify the original message and preserve an audit trail.

World Rowing and national federation communications require agreements defining sender authority, data roles, approval, branding, safeguarding, retention, incident response, and termination. See [15_WORLD_ROWING.md](15_WORLD_ROWING.md).

## Measurement and guardrails

Useful metrics include delivery, action completion, opt-in, opt-out, mute, complaint, irrelevant-message feedback, quiet-hour violations, consent-proof coverage, and suppression accuracy. Open and click rates are diagnostic, not the north star.

Guardrails:

- No success target for maximizing total pushes.
- No degraded workout experience for declining marketing.
- No repeated permission prompts after a clear decline without new context.
- Consent withdrawal should suppress optional sends promptly.
- Notification experiments require privacy and trust review.

## Athlete recourse

Every optional message offers a direct preference path. Athletes can report unexpected communication, inspect active consents, mute a sender, and see why they were selected. Reports are auditable and feed sender-quality governance.
