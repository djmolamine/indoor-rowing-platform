# Indoor Rowing Platform

## Vision

Create the trusted global home for indoor rowing, where every athlete has a recognizable identity, can understand and improve their performance, and can discover opportunities to participate regardless of the machine they use.

## Mission

Make indoor rowing data, events, and official sport communications accessible and useful through one trusted, athlete-first experience.

## Problem

Indoor rowing data is fragmented across manufacturers, devices, apps, screenshots, and manual records. Athlete identity and event participation are similarly fragmented across organizers, federations, and communication channels. Athletes can lose training continuity, miss relevant competitions, and have little control over how their information is used. This weakens engagement and creates unnecessary dependence on individual manufacturers or closed event systems.

## Solution

Indoor Rowing Platform gives athletes one place to build a rowing identity, capture and manage workouts, discover events, and receive communications they have explicitly chosen. It accepts data from multiple machines and input methods, presents workouts consistently, and preserves their source without allowing any manufacturer to define the product experience. It is designed to support future collaboration with national federations and World Rowing while remaining an athlete-controlled, machine-independent platform.

## Brand identity

The product must establish a strong, ownable indoor-rowing identity that athletes recognize independently of any equipment manufacturer. The brand should feel authoritative, modern, international, and performance-oriented without implying an official federation or World Rowing endorsement unless a formal partnership exists. Naming, visual language, tone, event presentation, and athlete communications must work across countries, ability levels, and rowing-machine ecosystems.

## User personas

### Independent rower

Rows at home or in a gym and wants a simple, modern record of workouts without being tied to one machine brand.

### Performance-focused athlete

Trains consistently, compares sessions over time, and needs reliable metrics to measure progress and support structured training.

### Multi-machine user

Uses different rowing machines across home, gyms, clubs, or travel and wants one continuous workout history.

### Coach or club athlete

Needs accurate, portable workout records that can eventually support coaching review, team programs, and shared performance analysis.

### Competition participant

Wants to discover relevant virtual, national, and international events, understand eligibility and deadlines, and receive timely updates without surrendering control of personal data.

### Federation or event organizer

Needs a consent-based channel for reaching eligible athletes with official event information, participation opportunities, schedule changes, and safety or operational notices.

## Athlete profile data

### Required fields

- Account email address
- Display name
- Country or territory of residence
- Date of birth or verified age band, collected only when needed for eligibility or safeguarding
- Time zone
- Acceptance of the terms of service and privacy notice, recorded with version and timestamp

### Optional fields

- Full legal name
- Profile photo
- Pronouns
- Gender or competition category, where relevant and clearly explained
- Nationality and federation affiliation
- Club, team, or training group
- City or region
- Preferred language
- Rowing experience level
- Competition interests and preferred event formats
- Accessibility requirements
- Connected machines, workout sources, and wearable devices
- Public biography and social links

Optional fields must remain optional unless a specific service requires them. The platform must explain why additional information is needed and what value the athlete receives before requesting it.

## MVP features

- Secure account creation and sign-in
- Manual workout entry
- Photo or screenshot upload with review before saving
- Connections to selected external workout sources
- A single workout history across all supported sources
- Consistent workout detail and key rowing metrics
- Import status, error handling, and duplicate prevention
- Source and rowing-machine management
- Mobile-first experience that works well across screen sizes
- Athlete profile with clearly separated required and optional information
- Event discovery for virtual, national, and international indoor-rowing competitions
- Explicit notification preferences and consent records
- Opt-in push notifications for the Virtual Series, Virtual World Championships, national events, challenges, and other selected competitions
- Athlete-controlled profile visibility and communication privacy
- Self-service data export and account deletion
- Profile, preferences, and account controls

## Future roadmap

### Broader connectivity

Add more manufacturer integrations, direct Bluetooth capture, file imports, wearable data, and automated background synchronization.

### Events and official communications

Expand event discovery, registration handoffs, eligibility guidance, results linking, calendar tools, and consented communications from verified event organizers, national federations, and—subject to a future formal partnership—World Rowing. Official messages may include invitations, registration deadlines, qualification information, schedule changes, event operations, results, challenges, and athlete-development opportunities.

### Training intelligence

Introduce trends, personal records, goals, training load, workout comparisons, and personalized performance insights.

### Coaching and community

Support coach-athlete relationships, clubs, shared programs, challenges, leaderboards, and privacy-controlled workout sharing.

### Live experiences

Explore real-time rowing sessions, remote races, group workouts, and event support across compatible machines.

## Core principles

- **Machine independence:** Athletes own their history and can change equipment without losing continuity.
- **Athlete value before data:** Deliver clear value before requesting additional personal information, explain why it is needed, and never make unrelated optional data a condition of participation.
- **Trustworthy data:** Preserve source context, clearly identify estimates, and never invent missing metrics.
- **Athlete ownership:** Users control their data, connections, exports, and account lifecycle.
- **Explicit consent:** Marketing, event discovery, push notifications, federation communications, and public profile visibility require specific, understandable, reversible choices.
- **Privacy by default:** New athlete profiles and sensitive fields are private unless the athlete deliberately changes their visibility.
- **Verified communications:** Clearly distinguish platform messages, organizer messages, federation messages, and official partner messages; never imply official status without authorization.
- **Simple by default:** Make common actions effortless while keeping advanced detail available.
- **Quality over breadth:** Deliver a polished, reliable core experience before expanding features.
- **Inclusive progression:** Serve beginners and experienced athletes without assuming one training style or ecosystem.
- **Privacy by design:** Minimize collection and treat workout, health, identity, eligibility, and communication data with care and transparency.

## Success metrics

- Percentage of new users who save or import their first workout
- Time from sign-up to first completed workout record
- Weekly and monthly active athletes
- Workouts recorded per active athlete
- Four-week and twelve-week athlete retention
- Percentage of athletes using more than one workout source or machine
- Successful import rate and duplicate rate
- Photo-import confirmation and correction rates
- User-reported confidence in workout accuracy
- Account export and deletion requests completed successfully
- Athlete profile completion by optional field, without using completion as a coercive goal
- Event discovery-to-interest and registration-handoff conversion
- Opt-in, delivery, open, and opt-out rates by notification category
- Percentage of communications sent with valid, category-specific consent
- Consent withdrawal completion time and suppression accuracy
- Privacy-control usage and reported privacy incidents
- Reach and engagement for verified federation or event communications

The MVP is successful when athletes repeatedly use the platform as their primary indoor rowing history, independent of the equipment that produced each workout.

Detailed requirements and acceptance criteria are maintained in [Product requirements](docs/product-requirements.md).
