# Navigation structure

| Document field | Value |
|---|---|
| **Title** | Navigation Structure |
| **Version** | 1.0 |
| **Status** | Approved |
| **Owner** | Founders |
| **Last Reviewed** | 2026-07-21 |
| **Related Documents** | [Product Definition](02_PRODUCT.md), [Athlete Journey](03_ATHLETE_JOURNEY.md), [Design System](05_DESIGN_SYSTEM.md), [Product Requirements](product-requirements.md) |

The navigation model is mobile-first and intentionally independent of visual styling. It describes the target information architecture; the current mock application may expose only a subset and should not be treated as the final navigation contract.

## Route map

```text
/                              Public product entry
/sign-in                       Sign in
/sign-up                       Create account
/auth/callback                 Supabase code exchange (non-visual route)

/(app)
  /dashboard                   Home and next best actions
  /workouts                    Canonical workout history
  /workouts/new                Choose manual, photo, device, or connected source
  /workouts/[workoutId]        Canonical workout detail
  /progress                    Personal records, trends, and seasons
  /leaderboard                 Rankings with visible machine classes and filters
  /challenges                  Challenges and River Expeditions
  /events                      Competition discovery and saved events
  /events/[eventId]            Rules, eligibility, registration, and updates
  /community                   Training partners, clubs, teams, and crews
  /imports                     Import activity, progress, warnings, and failures
  /sources                     Connected providers and devices
  /machines                    User machines and model association
  /notifications              In-app inbox and consented communications
  /profile                     Athlete Passport, privacy, export, and account controls
```

## Primary navigation

The initial mobile primary destinations are:

1. Home
2. Workouts
3. Events
4. Community
5. Profile

Add workout remains a prominent contextual action. Progress, rankings, challenges, and River Expeditions are reached from Home, Workouts, or Community until research justifies additional permanent destinations. Imports, Sources, Machines, and Notifications remain contextual and do not consume mobile navigation space.

On larger screens the same information architecture can use a sidebar. Labels and URLs remain unchanged across breakpoints.

## Navigation rules

- Unauthenticated access to app routes redirects to `/sign-in` with a safe return path.
- After authentication, default to `/dashboard`.
- Workout detail always renders the canonical workout, with source provenance and verification available without overwhelming core metrics.
- Source-specific flows live beneath `/sources/[providerKey]` or route-handler APIs; provider names never become top-level product navigation.
- Import errors deep-link to the affected job and provide a retry or correction path.
- The browser back action must remain useful; drawers/modals should use intercepting routes only when they preserve deep-link behavior.

## Evolution rules

New top-level destinations require validated frequency and a clear athlete job. Provider names never become top-level navigation. Official partner branding never changes the underlying information architecture. Live racing, prescriptive training, organizer administration, and federation administration should use dedicated surfaces only when their workflows are mature.
