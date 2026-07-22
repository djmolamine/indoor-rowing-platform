# Expeditions

| Document field | Value |
|---|---|
| **Title** | Expeditions |
| **Version** | 1.0 |
| **Status** | Approved |
| **Owner** | Founders |
| **Last Reviewed** | 2026-07-22 |
| **Related Documents** | [Founding Principles](00_FOUNDING_PRINCIPLES.md), [Vision](01_VISION.md), [Product Definition](02_PRODUCT.md), [Athlete Journey](03_ATHLETE_JOURNEY.md), [Database Foundation](06_DATABASE.md), [Machine Providers](07_MACHINE_PROVIDERS.md), [Athlete Passport](09_ATHLETE_PASSPORT.md), [Community](10_COMMUNITY.md), [Notifications](11_NOTIFICATIONS.md), [Metrics](16_METRICS.md), [MVP Build Plan](17_MVP_BUILD_PLAN.md) |

## Vision

Expeditions transform indoor distance into a journey through the real waterways that have shaped communities, ecosystems, trade, exploration, and rowing culture. They give every workout a larger destination: an athlete does not merely add meters to a progress bar; they move from place to place, discover what lies along the route, contribute to a crew, and build a story that becomes part of their lifelong Athlete Passport.

Expeditions should become one of Rowform's defining experiences because they express the product's central promise in a form no machine-specific logbook can own. Any eligible row—from a Concept2, RP3, WaterRower, Technogym, Matrix, Bluetooth device, manual record, photo capture, or future provider—can move the same athlete along the same journey. Equipment changes; the journey continues.

The experience serves competitors, beginners, home rowers, commercial-gym athletes, club members, adaptive athletes, and returning athletes without requiring them to be equally fast. It creates a reason to participate over months, learn about the wider world, and feel part of indoor rowing. Success is measured not only by who finishes first, but by how many athletes begin, return, contribute, learn, and complete.

River Expeditions are the first and primary expression of the broader Expeditions product. Future journeys may follow lakes, canals, coastlines, or historically significant rowing routes, provided they retain the same standards of geographic truth, cultural respect, athlete value, and machine independence.

## Philosophy

Expeditions are not gamification. They must never reduce meaningful places to points, exploit streak anxiety, manufacture false urgency, or pressure athletes to train beyond safe limits. Progress follows real eligible rowing distance. Recognition celebrates consistency, discovery, contribution, and completion rather than addictive mechanics.

Expeditions connect indoor rowing with real rivers, lakes, and waterways that shaped rowing history and culture. Each journey should:

1. **Educate:** reveal the geography, people, history, rowing traditions, engineering, wildlife, and environmental significance of the waterway through reviewed, place-specific stories.
2. **Motivate:** convert today's achievable row into visible forward movement while respecting rest, recovery, disability, training plans, and different levels of ability.
3. **Reward:** recognize meaningful progress with enduring artifacts, Athlete Passport achievements, and moments worth sharing—not artificial currencies or chance-based rewards.
4. **Connect:** let independent athletes and crews contribute to something larger without requiring a club, public profile, or competitive ranking.
5. **Respect:** represent places and cultures accurately, credit sources and contributors, avoid romanticizing harm, and acknowledge Indigenous, local, colonial, ecological, and contested histories with appropriate care.

An Expedition must provide value before requesting additional personal data. Joining requires only an account and eligible workout history. Crew discovery, local stories, public recognition, and personalized recommendations may use optional data only after explaining the benefit and receiving the appropriate permission.

## Product Principles

- **Real distance, honest progress:** one eligible canonical workout meter advances one Expedition meter unless clearly published contribution rules say otherwise.
- **One sport, many machines:** provider and capture provenance remain visible, but no manufacturer owns the journey.
- **Participation before comparison:** the default experience is personal and collective progress, not speed or volume ranking.
- **Athlete-controlled identity:** joining, crew membership, contribution visibility, certificate display, and sharing are separate choices.
- **Learning in the flow:** stories appear when a place is reached, with enough depth to be meaningful and short enough to enjoy after training.
- **No punishment:** rest days, interruptions, and slow progress never erase distance or diminish an achievement.
- **Geographic integrity:** route distances are curated journey distances based on a declared route version, not implied navigational guarantees.
- **Community with purpose:** social interaction exists around milestones, crew contribution, and encouragement; there is no generic infinite feed.
- **World Rowing compatible, never dependent:** Rowform may support official or partner-curated journeys, but its core catalogue and athlete value do not depend on any governing body.
- **Sustainable by design:** environmental stories should inform without lecturing, greenwashing, or claiming that digital distance equals environmental action.

## Expedition Structure

Every Expedition is a versioned editorial and rules package. Published athletes remain attached to the version they joined unless a safety or factual correction requires migration with a visible explanation.

### Required Definition

Each Expedition contains:

- **Name:** a distinctive, searchable title based on the waterway or journey.
- **Subtitle:** a concise promise that describes the route and emotional theme.
- **Cover image:** licensed, credited, responsive artwork with meaningful alternative text and a focal-point definition for crops.
- **Introduction story:** a reviewed opening that explains why the waterway matters and what the athlete will encounter.
- **Total distance:** the curated route distance in kilometers and meters, with source, methodology, version, and an explicit approximate label where appropriate.
- **Estimated completion time:** a range calculated from athlete-selected or observed weekly distance, always presented as guidance rather than pressure.
- **Difficulty:** Accessible, Moderate, Ambitious, or Legendary, based primarily on total distance and route commitment—not athletic worth.
- **Route:** an ordered geospatial path with stage boundaries, map attribution, coordinate precision, and content-safe display behavior.
- **Start location and finish location:** named, geocoded places with country and local context.
- **Countries crossed:** ordered by the route, distinguishing the river channel from the wider basin.
- **Major cities:** curated stops with local names and pronunciation or transliteration support where useful.
- **Major landmarks:** natural and human landmarks selected for narrative significance, not merely tourism popularity.
- **Historical facts:** sourced facts connected to the reached location and reviewed for accuracy and cultural framing.
- **Wildlife and nature highlights:** habitat, species, geology, seasonal patterns, and conservation context sourced from credible institutions.
- **Milestones:** ordered distance thresholds that unlock places and stories.
- **Completion certificate:** a verifiable, exportable achievement tied to the athlete, Expedition version, completion date, and contribution evidence.
- **Rewards:** non-random recognition such as Passport badges, route artwork, story collections, or partner benefits disclosed before participation.
- **Community statistics:** privacy-safe totals for participants, active crews, countries represented, distance contributed, completions, and collective milestones.

### Presentation Layers

An Expedition page has five layers, ordered for mobile use:

1. **Current position:** location, distance completed, distance remaining, next milestone, and today's contribution.
2. **The route:** a lightweight accessible map or illustrated route with completed, current, and upcoming stages. A text route is always available.
3. **The story:** the latest unlocked place, a short narrative, and optional deeper reading.
4. **The crew:** personal contribution and selected crew or global progress without an automatic leaderboard.
5. **The logbook:** a transparent list of canonical workouts that contributed, exclusions with reasons, corrections, and rule version.

The initial view should answer: “Where am I?”, “What did my last row change?”, and “What is ahead?” It must not resemble a generic challenge card enlarged into a page.

### Difficulty and Completion Estimates

| Difficulty | Curated distance guidance | Intended experience |
|---|---:|---|
| Accessible | Up to 500 km | A first journey or focused seasonal goal |
| Moderate | 501–1,500 km | A sustained journey across several months |
| Endurance | 1,501–3,500 km | A long-form commitment with many stages |
| Epic | More than 3,500 km | A multi-season or multi-year flagship journey |

Completion estimates use the athlete's chosen weekly target when available. Otherwise Rowform shows neutral scenarios—for example, 25 km, 50 km, and 100 km per week—rather than predicting from sensitive profile data. Estimates update gently and never describe an athlete as “behind.”

## Participation and Progress Rules

### Joining

An athlete can preview the full route theme, total distance, rules, privacy choices, expected content cadence, and reward terms before joining. Joining creates an Expedition participation record and asks separately whether the athlete wants milestone notifications, a crew, public contribution display, or certificate display. All optional choices default off unless an earlier purpose-specific preference applies.

The MVP allows one active individual Expedition at a time. Starting another requires explicit switch confirmation. Existing progress is preserved, but only future eligible workouts advance the newly active journey; old workouts are not applied retroactively. Multi-Expedition participation may be reconsidered only through a recorded product decision after contribution routing is proven understandable.

### Eligible Distance

- Contributions reference eligible canonical workouts; an Expedition does not create a second workout record.
- All machine providers and first-class capture methods can participate when the Expedition's published rules permit them.
- Verification tier affects the evidence label, not the value of participation, unless a named official or sponsored Expedition publishes a higher requirement.
- Cross-machine performance comparability is irrelevant to ordinary distance progress. Expeditions do not imply that pace or power is equivalent between machine classes.
- Warm-ups, intervals, and complete sessions contribute according to the same transparent distance rules.
- Deleted or invalidated workouts reverse derived progress and explain the effect before deletion is confirmed.
- Duplicate imports, implausible contributions, and corrected OCR records follow canonical workout and audit rules.
- Optional daily contribution limits may protect community statistics from accidental or abusive data, but must not erase valid personal history.

### Individual and Crew Modes

Every Expedition supports **Solo**, **Crew**, and **Global** context:

- **Solo** is the athlete's full personal journey and completion record.
- **Crew** shows the combined progress of an explicitly joined small group. Crew membership is optional, reversible, and independent of club membership.
- **Global** shows privacy-safe community participation and collective milestones. It does not expose individual activity by default.

A crew can choose “shared route” mode, where all members advance one collective position, or “alongside” mode, where members travel the same route individually. Rules cannot change after contributions begin without unanimous acceptance or a new crew journey.

### States and Lifecycle

An Expedition definition moves through `draft`, `editorial review`, `rights review`, `scheduled`, `published`, `paused`, `retired`, and `archived`. An athlete participation moves through `previewing`, `active`, `paused`, `completed`, and `left`.

Pausing stops prompts but preserves position. Leaving removes the Expedition from active views but preserves earned history privately unless the athlete asks to delete it. Retiring a catalogue item never removes earned certificates or Passport achievements; archived content remains available in a safe, read-only form.

## Milestones

Milestones are the narrative rhythm of an Expedition. They are not arbitrary percentage badges. Each must correspond to a meaningful location, transition, or story and include:

- **Distance:** the exact cumulative threshold on the curated route.
- **Location reached:** local and translated names, country, coordinates, and accessible pronunciation where useful.
- **Story:** an original or licensed short narrative explaining what the athlete has reached.
- **Historical fact:** a sourced, reviewed fact with publication and correction metadata.
- **Achievement unlocked (optional):** a named Passport achievement or visual artifact when the milestone represents a significant stage.

Milestones may also include an image, audio pronunciation, map focus, wildlife highlight, local rowing connection, environmental context, deeper-reading source, content warning, and partner attribution. These fields are enhancements, not substitutes for the required text experience.

### Milestone Cadence

- Early milestones arrive relatively quickly so a new participant experiences the journey's value after the first few workouts.
- Later spacing can widen, but the athlete should normally have a meaningful next place within two to four typical sessions.
- Very long routes use stages and chapters so progress remains comprehensible.
- Narrative milestones and achievement milestones are separate; not every story needs a badge.
- Previously unlocked stories remain in a journey journal and work offline after loading where practical.
- Overshooting a threshold unlocks every crossed milestone in order, summarized without flooding the athlete.

### Example Milestone

**Danube, 310 km — Passau, Germany:** The athlete reaches the confluence of the Danube, Inn, and Ilz. The story explains the city's relationship with three rivers, the historical fact is linked to a reviewed source, and the optional “Three Rivers” achievement is added to the Passport. If one workout crosses several thresholds, Passau appears in a single journey recap with the other reached locations.

## Notifications

Expedition notifications should make a journey feel alive while preserving the communication principles in [11_NOTIFICATIONS.md](11_NOTIFICATIONS.md). In-app milestone records may be part of the requested experience; push and email require explicit category and channel consent.

Examples include:

- “You've reached Luxor.”
- “Only 20 km until Vienna.”
- “Your crew has entered Germany.”
- “Today's 8,420 m carried you beyond Oxford.”
- “Three new stories are waiting in your journey journal.”
- “The Danube crew has reached the Black Sea.”

Every message identifies the Expedition, why it was sent, the contributing workout or crew event where relevant, and a direct destination. Notification preferences separate:

- Personal milestone reached.
- Nearing the next milestone.
- Crew milestone or stage transition.
- Global community milestone.
- Expedition editorial update or correction.
- New Expedition recommendation.
- Time-limited partner benefit.

Athletes can set quiet hours, digest frequency, preferred channel, and per-Expedition mutes. “Near milestone” messages are rate-limited, never use guilt, and are not sent after inactivity merely to provoke a return. Withdrawal is honored before the next optional send. Essential notices—such as a material rules correction or removal of unsafe content—are clearly distinguished from motivation.

## Completion Experience

Completion is a durable sporting and personal moment, not a disposable animation. It begins after the contribution is validated and the final route threshold is crossed.

### Celebration Screen

The first view uses restrained motion inspired by water, distance markers, and rowing rhythm. It names the finish location, acknowledges the athlete's journey, and provides a reduced-motion equivalent. Sound is off by default. The experience must remain complete with animation disabled and should not interrupt workout saving or data correction.

### Journey Summary

The summary tells the athlete's story from start to finish:

- Start and completion dates.
- Calendar duration and active rowing days.
- Total eligible distance and number of contributing workouts.
- Machines and capture sources used, described without implying comparability.
- Crews joined and the athlete's contribution where sharing permits.
- Countries, cities, landmarks, and milestones reached.
- Favorite or revisited stories when that interaction is available.
- Pauses and returns framed positively, never as failure.

### Statistics

Completion statistics favor understandable facts over charts. They may include average distance per contributing workout, longest eligible row, most active month, consistency, crew contribution, and the proportion of workouts by source. Pace, power, and ranking comparisons do not belong in the default Expedition summary.

### Certificate

The completion certificate includes the athlete's chosen display name, Expedition and route version, curated distance, completion date, certificate identifier, Rowform verification URL or QR code, and evidence tier summary. It is downloadable in accessible PDF and image formats and can be added privately or publicly to the Athlete Passport. The certificate proves completion under stated contribution rules; it does not certify navigation of the physical waterway or an official rowing record.

### Share Options

The athlete can share a privacy-previewed image, a controlled public Passport claim, a certificate link, or a crew completion card. Share assets never include precise home location, private profile fields, hidden crew members, or workout times by default. The athlete can revoke Rowform-hosted links. No contact upload or automatic posting is required.

### Next Recommended Expedition

Rowform recommends one to three next journeys based on completed distance, preferred duration, saved regions or themes, and explicit interests. Recommendations explain why they appear and work without demographic profiling. The athlete can choose “surprise me,” browse the full catalogue, repeat a route under a new version, or take a break without losing status.

## Rewards and Recognition

Rewards must be predictable, meaningful, and safe:

- Athlete Passport completion achievement.
- Stage and route artwork.
- A complete journey journal.
- Completion certificate.
- Crew recognition with participant-controlled display.
- Optional physical merchandise or partner benefit with clear terms and no data transfer without consent.
- Environmental or community initiative updates when a verified partnership exists; rowing distance must never be falsely equated with a donation or impact.

There are no loot boxes, random prizes tied to workout volume, purchasable progress, pay-to-complete mechanics, or rewards that encourage unsafe training. Paid catalogue access, if introduced under [12_BUSINESS_MODEL.md](12_BUSINESS_MODEL.md), cannot invalidate already earned progress or make the free experience deceptive.

## Community Experience

Community statistics should create scale and belonging without surveillance. Supported measures include active participants, independent athletes, crews, countries represented, eligible distance, completions, and collective stage progress. Counts use privacy thresholds and never expose a person's participation through a small demographic slice.

Community interactions are deliberately narrow:

- Send a predefined or lightly personalized encouragement after a milestone.
- Celebrate a crew stage transition.
- Invite an existing Rowform connection to a crew.
- Compare crew progress only when members explicitly choose it.
- Report an inappropriate crew name, image, or interaction.
- Mute or leave without explanation.

There is no Expedition-wide infinite feed, unrestricted direct messaging, public location tracking, or default individual distance leaderboard. Clubs, gyms, and federations may organize crews, but independent athletes retain equal access to the journey.

## Curated Launch Catalogue

The launch collection contains exactly eight complete journeys. Distances are curated narrative-route values and can differ from other source-to-mouth measurements because channels, source definitions, and measurement methods vary. Each digital route is a stylized progression, never navigation guidance.

| Expedition | Distance | Difficulty | Distinctive theme |
|---|---:|---|---|
| The Nile | 6,650 km | Epic | Civilizations carried by water |
| The Danube | 2,850 km | Endurance | Ten countries sharing one current |
| The Rhine | 1,230 km | Moderate | Alpine source to industrial artery |
| The Thames | 346 km | Accessible | The home water of modern rowing |
| The Mississippi | 3,730 km | Endurance | A continental gathering river |
| The Amazon | 6,400 km | Epic | Water, forest, and planetary scale |
| The Mekong | 4,350 km | Epic | Six countries and a living flood pulse |
| The Murray | 2,508 km | Endurance | An inland river sustaining a dry continent |

Every launch definition is typed structured data with a unique slug, narrative identity, status, cover treatment, ordered checkpoints, community statistics, completion reward, and certificate title. Every checkpoint contains a unique ID, country, cumulative distance, coordinates where known, story, contextual note, type, and optional achievement. Automated validation rejects duplicate slugs or checkpoint IDs, non-sequential or out-of-range distances, missing start or finish checkpoints, invalid statuses, and empty narrative fields.

### Cinematic Route-Map Standard

The primary detail view uses a restrained dark route canvas, coordinate-grid texture, curved route geometry, connected checkpoint markers, completed and remaining route segments, athlete-position marker, and a selected-checkpoint story panel. Current position receives a subtle reduced-motion-aware emphasis. Desktop presents route and story together; mobile preserves the route through horizontal progression and large tap targets. Every checkpoint is keyboard selectable and every visual route has a complete ordered text timeline.

Prototype geometry may use a curated SVG generated from checkpoint order and coordinates. It must be labeled as a stylized, non-navigation-grade representation and must never resemble fake satellite imagery. A future licensed mapping layer can replace the renderer without changing the Expedition or checkpoint contracts.

### Adding Future Expeditions

Future catalogue entries are added through the same structured definition and validation pipeline, then pass geographic, cultural, editorial, accessibility, rights, and route-distance review. React pages do not contain route catalogues, and new journeys do not require new page implementations. Publication occurs only after the shared dynamic route renders the complete definition and all validation checks pass.

## Content and Cultural Standards

Every published fact needs a source, reviewer, review date, locale, and correction path. Route authors should prioritize local institutions, Indigenous and community voices, museums, environmental agencies, rowing organizations, and subject experts. Machine-generated drafts may assist research but cannot be the final authority.

Content review must check:

- Correct local names, diacritics, borders, and transliterations.
- Distinction between a waterway, basin, tributary system, and curated route.
- Indigenous and local histories presented as living cultures rather than historical decoration.
- Colonial, conflict, displacement, enslavement, and environmental histories handled accurately and proportionately.
- Wildlife claims, conservation status, and imagery rights.
- Political boundaries or naming disputes with neutral, transparent treatment.
- Accessibility of text, maps, images, motion, audio, and certificates.
- Translation quality and the ability to correct all locales after publication.

Sponsored content is labeled and cannot override editorial independence. A tourism board, federation, provider, or sponsor may support a journey but cannot receive athlete contact or workout data without a separate, explicit consented purpose.

## Data and Technical Model

The system extends the community and mission domains in [06_DATABASE.md](06_DATABASE.md). It must not store Expedition progress as an isolated counter without traceability.

Core entities include:

- `ExpeditionDefinition`, `ExpeditionVersion`, `Route`, `RouteStage`, and geospatial route points.
- `ExpeditionContentItem`, source citation, rights record, locale, reviewer, and revision.
- `Milestone`, location, unlock rule, story, fact, media, and optional achievement definition.
- `ExpeditionParticipation`, mode, state, privacy, primary/secondary status, and notification preferences.
- `ExpeditionContribution` referencing the eligible canonical workout, rule version, credited distance, and reversal state.
- `ExpeditionCrew`, membership, role, mode, visibility, invitation, and moderation state.
- `ExpeditionAchievement` and the resulting Athlete Passport claim.
- `CompletionCertificate`, verification identifier, presentation state, and revocation/supersession history.
- Aggregated community statistics with privacy thresholds and recalculation metadata.

Contribution processing is idempotent. A workout update, deletion, duplicate resolution, verification change, or rules correction triggers deterministic recalculation. The original workout remains the source of truth; snapshots exist only where audit integrity requires them. Route and content versions are immutable after athlete use except for documented corrections.

Maps should use licensed vector or raster data with offline- and low-bandwidth-aware fallbacks. The product must provide a complete ordered text route so core understanding never depends on a map, color, fine motor input, or vision.

## Administration and Operations

Authorized administrators need audited tools to:

- Draft and version definitions, stages, milestones, eligibility rules, rewards, and availability.
- Import and validate route geometry.
- Manage localized content, sources, image rights, credits, and review status.
- Preview athlete states at arbitrary distances and screen sizes.
- Schedule publication and retire a route without removing earned records.
- Recalculate contributions safely and inspect exceptions.
- Review implausible or disputed contributions without public accusation.
- Moderate crew names, images, invitations, and interactions.
- Issue, supersede, or revoke certificates with a reason.
- Send corrections and essential notices through consent-aware communication infrastructure.

Official, federation, provider, environmental, and sponsored badges require verified organization roles. No administrator can self-assign World Rowing status or imply endorsement without authorization.

## Privacy, Safety, and Accessibility

- Participation, current position, crew, contribution, and certificate visibility are independently controlled.
- Public maps show route progress, never the athlete's physical location.
- Community aggregates use minimum cohort thresholds and privacy-safe reporting.
- Children and vulnerable athletes receive age-appropriate crew discovery and communication safeguards.
- Training prompts avoid medical claims and overtraining pressure; athletes can mute motivation while preserving essential notices.
- Motion follows reduced-motion settings, maps have text equivalents, images have useful alternative text, and all controls meet WCAG 2.2 AA.
- Units, dates, place names, right-to-left layouts, and translations support international audiences.
- Export includes participation, contributions, unlocked content references, achievements, and certificates in understandable and machine-readable formats.
- Account deletion removes or anonymizes Expedition participation according to disclosed integrity requirements and recalculates public aggregates.

## Success Measures

Expeditions should improve healthy participation, not attention extraction. Measures align with [16_METRICS.md](16_METRICS.md):

- Preview-to-join conversion, segmented by athlete context without invasive profiling.
- First contribution and first milestone completion.
- Percentage of participants who return for a second contributing day within 14 days.
- Active Expedition athletes with eligible workouts on at least two separate days per month.
- Stage and Expedition completion rates, interpreted by route length and cohort age.
- Median contributing days and sustainable weekly distance—not maximum volume.
- Independent-athlete, home-athlete, commercial-gym, adaptive, and multi-provider participation where consented and sufficiently aggregated.
- Crew join, leave, mute, report, and healthy encouragement rates.
- Milestone story opens and optional deeper-reading use.
- Notification opt-in, mute, complaint, and disable rates by category.
- Contribution reversals, duplicate exclusions, disputes, and recalculation accuracy.
- Certificate creation, Passport presentation, and privacy-safe sharing.
- Post-completion continuation into another Expedition or normal training, without making immediate re-enrollment the only success outcome.

No team should optimize raw time in Expedition screens, notification volume, public sharing, or distance extremes as primary success metrics.

## MVP and Rollout

The MVP remains the one reviewed River Expedition defined in [17_MVP_BUILD_PLAN.md](17_MVP_BUILD_PLAN.md). It should include a versioned route, stages, milestones, individual progress, one simple crew mode, canonical workout contributions, a text route, reviewed stories, privacy choices, milestone notifications, a completion certificate, and basic administration.

The full flagship system should develop in deliberate stages:

1. **Foundation:** one editorially excellent route; personal progress; contribution audit; accessible milestone journal.
2. **Community:** simple crews, encouragement, privacy-safe global statistics, moderation, and community milestones.
3. **Completion:** certificate verification, Passport presentation, share assets, and next-journey recommendations.
4. **Catalogue:** a balanced set of accessible, moderate, and long-form journeys with localized content.
5. **Partnerships:** clearly labeled provider, federation, cultural, conservation, or potential World Rowing collaborations that preserve Rowform independence and athlete control.

## Definition of Quality

An Expedition is ready to publish only when:

- Its route, distance, stages, and location order have been independently validated.
- Every milestone contains a useful place-based story and sourced fact.
- Cultural, geographic, environmental, and rights reviews are complete.
- Eligible workout rules are machine-independent, visible, and tested against every supported capture method.
- Contribution, reversal, pause, leave, completion, export, and deletion behaviors are deterministic.
- Privacy defaults, crew controls, notification consent, and moderation workflows pass review.
- Mobile, keyboard, screen-reader, reduced-motion, low-bandwidth, localization, and right-to-left experiences meet the design standard.
- The certificate accurately describes what it verifies.
- Community statistics cannot reveal a private athlete through a small cohort.
- The experience still motivates and educates when all optional social and notification features are disabled.

The defining test is simple: after an athlete finishes a row, the Expedition should make the distance feel connected to a real place, a meaningful story, and a worldwide sport—while leaving the athlete fully in control.
