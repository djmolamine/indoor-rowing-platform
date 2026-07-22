# Design System Direction

| Document field | Value |
|---|---|
| **Title** | Design System Direction |
| **Version** | 1.0 |
| **Status** | Approved |
| **Owner** | Founders |
| **Last Reviewed** | 2026-07-22 |
| **Related Documents** | [Founding Principles](00_FOUNDING_PRINCIPLES.md), [Product Definition](02_PRODUCT.md), [Athlete Journey](03_ATHLETE_JOURNEY.md), [Navigation](navigation.md) |

## Design objective

Create a distinctive, global indoor-rowing product that feels precise enough for competition, calm enough for daily training, and welcoming enough for a first-time athlete. The system must not copy Concept2 Logbook, any machine console, or a generic fitness dashboard.

The product name and final visual identity are not yet fixed. Until they are, design work should use a neutral working identity and avoid accumulating logo debt.

## Brand attributes

- **Athletic:** purposeful motion, effort, rhythm, and progression.
- **Credible:** clear provenance, structured data, restrained claims, and visible rules.
- **Human:** encouraging language, inclusive achievement, and respect for different motivations.
- **Independent:** no manufacturer color palette or console metaphor dominates.
- **International:** culturally neutral foundations, localization-ready layouts, and accessible symbolism.
- **Enduring:** more like a trusted sporting institution than a trend-driven fitness campaign.

## Visual territory

The visual system may draw inspiration from waterways, lane rhythm, distance markers, boat-house materials, and the repeated cadence of a rowing stroke. It should avoid literal oars everywhere, fake metallic machine interfaces, nautical clichés, or visual dependence on a single manufacturer's equipment.

### Color

Use a restrained core palette with high contrast and one energetic action color. Product states—success, warning, error, verification, official communication, privacy, and source quality—must never rely on color alone. Partner and provider colors appear as scoped attribution, not as global themes.

### Typography

Typography must support dense numeric performance data and readable international prose. Use tabular numerals for times, pace, watts, stroke rate, distances, ranks, and splits. Headings may be expressive, but body text, tables, labels, and legal or consent content prioritize clarity.

### Iconography

Use a consistent icon library with text labels for ambiguous concepts. Provider logos are not navigation icons. Verification, visibility, consent, official sender, and machine class need distinct meanings and accessible labels.

## Information design

### Metrics

- Always show units.
- Use `m`, `km`, `W`, `spm`, `bpm`, and `/500m` consistently, with accessible expansions.
- Distinguish zero from missing.
- Label estimates and normalized values.
- Show source and verification near competitive metrics.
- Preserve original values when conversion could matter.

### Time and dates

Store and communicate event times with time zone. Display the athlete's local time plus the event zone where ambiguity matters. Use locale-aware dates and avoid numeric-only formats in international contexts.

### Rankings

Every ranking header must make the active comparison class visible: event or distance, season, machine class, age, competition category, weight, geography, club/federation, and verification. Hidden filters create false conclusions.

### Provenance

Source information should be discoverable without overwhelming the workout summary. A concise badge can expand into provider, machine, capture method, adapter version, warnings, and verification evidence.

## Core components

The eventual component system should include:

- App shell, responsive navigation, page heading, and contextual actions.
- Workout card, metric group, split table, source badge, and verification badge.
- Profile field with visibility and purpose controls.
- Consent choice, channel preference, sender identity, and quiet-hours control.
- Event card, eligibility summary, deadline, organizer badge, and registration handoff.
- Ranking table with filter summary and comparable-class explanation.
- Challenge/Expedition progress, milestone, crew contribution, and completion artifact.
- Empty, loading, partial-data, import-error, offline, and permission-denied states.
- Destructive-action confirmation for connection removal, export, and deletion.

Components should eventually be implemented through shadcn/ui primitives where appropriate, but product semantics—not the library's defaults—define the system.

## Mobile-first behavior

Many interactions happen next to a machine. Primary actions require generous touch targets, minimal typing, camera access, and one-handed reach. Dense tables must transform into scannable cards or horizontally controlled views without hiding active filters. Bottom navigation should contain only durable destinations; import status and settings are contextual.

Desktop expands information density for coaches, organizers, comparison, and administration but must not introduce a different conceptual model.

## Content design

Use direct, specific language:

- "Save workout" instead of "Submit data."
- "Imported from RP3" instead of "Synced."
- "Not comparable with this ranking" plus the reason instead of a silent exclusion.
- "World Rowing communication" only when authorization exists; otherwise identify the actual organizer.
- "Optional—used to show eligible events" instead of a bare profile field.

Avoid guilt, false urgency, body shaming, or streak-loss punishment. Celebrate returning after a gap.

## Accessibility and inclusion

Target WCAG 2.2 AA. All critical flows require keyboard access, visible focus, screen-reader labels, logical heading structure, reduced-motion support, sufficient contrast, non-color state indicators, and scalable text. Charts require textual summaries. Metric tables need meaningful headers. Camera/OCR flows need manual alternatives.

Support right-to-left layouts, longer translations, locale-specific names, multiple competition category systems, and age-appropriate experiences. Adaptive rowing information is represented respectfully and exposed only where necessary.

## Trust patterns

Consent, visibility, verification, sender identity, and destructive actions must be explicit. Do not use dark patterns to increase profile completion or notification opt-in. Preview what becomes public. Show how to reverse a choice. Official and sponsored content must be labeled.

## Governance

Design tokens, component behavior, accessibility criteria, content patterns, and provider attribution rules require documented ownership. New components should solve repeated product needs rather than one page. Any partner co-branding must be reversible and must preserve the platform's independent identity. Related principles are in [00_FOUNDING_PRINCIPLES.md](00_FOUNDING_PRINCIPLES.md).

## Visual System V2 milestone

A coordinated product-wide Visual System V2 pass follows stabilization of authentication, onboarding, data-backed Athlete Passport fields, location controls, club governance, and regional rankings. Until then, new foundational flows should match the current Rowform palette, typography, spacing, focus treatment, and mobile behavior without creating isolated redesigns. V2 will review the application as one system: navigation, type scale, responsive density, motion, form patterns, empty/loading/error states, data provenance, accessibility, and partner-ready branding.
