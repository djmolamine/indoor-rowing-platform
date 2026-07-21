# Navigation structure

The navigation model is mobile-first and intentionally independent of visual design.

## Route map

```text
/                              Public product entry
/sign-in                       Sign in
/sign-up                       Create account
/auth/callback                 Supabase code exchange (non-visual route)

/(app)
  /workouts                    Workout history (default authenticated route)
  /workouts/new                Choose manual, photo, device, or connected source
  /workouts/[workoutId]        Canonical workout detail
  /imports                     Import activity, progress, warnings, and failures
  /sources                     Connected providers and devices
  /machines                    User machines and model association
  /profile                     Profile, preferences, export, and account controls
```

## Primary navigation

Mobile primary destinations:

1. Workouts
2. Add workout (prominent action)
3. Sources
4. Profile

`Imports` is contextual from add-workout, sources, and status notifications; it does not need permanent bottom-navigation space in the MVP. `Machines` is reached from Sources or Profile until usage justifies a primary destination.

On larger screens the same information architecture can use a sidebar. Labels and URLs remain unchanged across breakpoints.

## Navigation rules

- Unauthenticated access to app routes redirects to `/sign-in` with a safe return path.
- After authentication, default to `/workouts`.
- Workout detail always renders the canonical model, with source provenance as secondary information.
- Source-specific flows live beneath `/sources/[providerKey]` or route-handler APIs; provider names never become top-level product navigation.
- Import errors deep-link to the affected job and provide a retry or correction path.
- The browser back action must remain useful; drawers/modals should use intercepting routes only when they preserve deep-link behavior.

## Future-compatible routes

Reserved concepts—not MVP commitments—include `/training`, `/insights`, `/teams`, and `/live`. They should only be introduced after validating product demand.
