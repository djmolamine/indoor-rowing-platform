# Machine Providers and Adapter Strategy

| Document field | Value |
|---|---|
| **Title** | Machine Providers and Adapter Strategy |
| **Version** | 1.0 |
| **Status** | Approved |
| **Owner** | Founders |
| **Last Reviewed** | 2026-07-21 |
| **Related Documents** | [Founding Principles](00_FOUNDING_PRINCIPLES.md), [Database Foundation](06_DATABASE.md), [Competitions](08_COMPETITIONS.md), [Technical Architecture](architecture.md) |

## Objective

Support Concept2, RP3, WaterRower, Technogym, Matrix, Bluetooth devices, manual entry, OCR/photo capture, files, and future providers without allowing any one integration to shape the core product or database.

## Provider principles

1. Providers are adapters to one canonical workout model.
2. Provider attribution is preserved and visible.
3. Integration does not imply comparability.
4. The athlete controls connection and import scope.
5. Raw provider semantics are retained for traceability.
6. Failure in one adapter cannot compromise other providers or canonical history.
7. Provider partnerships do not grant ownership of athlete identity or unrelated data.

## Provider categories

### Account APIs

Cloud services that expose athlete-authorized history through OAuth or another delegated protocol. Examples may include Concept2 Logbook or future manufacturer services. Requirements include scoped authorization, refresh-token security, cursor-based sync, webhook handling where available, deletion/disconnection, rate limits, and provider terms.

### Direct connected devices

Bluetooth FTMS, proprietary Bluetooth, USB, local network, or companion-app capture. These adapters may stream a live workout or retrieve completed sessions. Device pairing must distinguish a temporary shared-gym machine from a personal machine.

### File imports

CSV, FIT, TCX, JSON, or provider-specific exports. Files require format detection, validation, duplicate handling, and an import preview. Unsupported columns should be reported, not silently discarded when material.

### OCR/photo imports

The platform stores a protected image artifact, extracts candidate values, shows confidence and source assumptions, and requires athlete confirmation before canonical persistence. The confirmed workout remains photo-sourced rather than device-verified.

### Manual entry

Manual entry is a permanent first-class source, not a temporary fallback. It supports machines without connectivity and athletes recovering historical records. Its provenance and verification tier remain clear.

## Adapter contract

Every adapter should declare:

- Stable provider key and display attribution.
- Supported machine families and models.
- Connection method and required scopes.
- Capabilities: history, live data, intervals, heart rate, power, stroke data, verification evidence, webhooks, deletion.
- Source units, timestamp semantics, and time-zone behavior.
- Pagination, rate limits, retry guidance, and idempotency behavior.
- External identity and workout keys.
- Known data limitations.
- Terms, certification, and support owner.

The functional boundary includes connect, disconnect, list, fetch, parse, normalize, validate, and health-check operations. Adapters return canonical drafts and provenance; they do not write workouts directly.

## Canonical mapping

For every field, mapping documentation must say:

- Provider field and meaning.
- Original unit.
- Canonical target.
- Conversion formula.
- Missing/invalid behavior.
- Whether provider-calculated or platform-derived.
- Confidence and known edge cases.

Do not infer metrics simply because they are common on another machine. A provider that exposes distance and duration only should produce a valid limited workout.

## Comparability classes

Machine-independent history and cross-machine competition are different problems. Each competition or ranking uses an explicit class:

- Same verified model/protocol.
- Same provider family under an approved rule.
- Cross-provider class validated by an organizer or governing body.
- Participation-only distance where performance comparison is not intended.
- Non-comparable training history.

Any normalization intended for competitive equivalence requires published methodology, versioning, validation, appeals, and partner governance. The default is no hidden equivalence.

## Initial provider priorities

### Manual and OCR

Launch first because they prove the canonical workout model and include every athlete. Optimize correction speed and quality feedback.

### Bluetooth FTMS

Prioritize as the broadest standards-based direct path, while testing real manufacturer deviations from the standard.

### Concept2

Important for athlete demand, trusted capture, benchmarks, and competition participation. Treat as one high-value provider, not the database template.

### RP3

Important for performance-focused athletes and richer stroke data. Preserve advanced fields without requiring every provider to supply them.

### WaterRower

Important for home athletes and diverse connectivity generations. Support direct/cloud/file paths as available.

### Technogym and Matrix

Important for commercial gyms, where shared machines, account handoff, QR flows, and inconsistent connectivity require careful experience design.

Priority ultimately follows athlete demand, API availability, data quality, partnership readiness, and implementation cost—not brand prestige alone.

## Import behavior

- Imports run as observable jobs with queued, processing, completed, failed, and cancelled states.
- Retries are idempotent.
- Stable external IDs and payload hashes prevent duplicates.
- Athletes can inspect warnings and resolve ambiguous matches.
- Reprocessing with a new adapter version preserves the earlier transformation audit.
- Provider outages do not block access to existing history.

## Provider experience

Providers receive accurate attribution, documented APIs, sandbox tooling, certification feedback, integration health, and a path to supported challenges or events. They do not receive private athlete data outside consented scopes.

## Certification

A provider integration can be labeled:

- Community-supported
- Platform-supported
- Provider-certified
- Competition-approved for a named rule set

Certification status is time-bound and versioned. Marketing language must not transform technical compatibility into official competitive approval.

## Exit and failure planning

Every integration plan must answer:

- What happens if API access is revoked?
- Can athletes export directly from the provider?
- How are tokens revoked and secrets deleted?
- How are breaking schema changes detected?
- How are previously imported workouts preserved?
- How will athletes be informed without exposing provider disputes?

The canonical history must remain valuable even when an adapter stops syncing.
