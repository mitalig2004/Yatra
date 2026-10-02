# YATRA

A travel-planning portfolio experience for Mitali Giri. Travel editorial meets a quiet, precise planning workspace.

## Run locally

Requires Node.js 20.9+ (verified with Node 24).

```sh
npm install
npm run dev
```

Open http://localhost:3000. All photographs and fonts are bundled locally. No API keys, backend, external booking service, real authentication, or paid map service are required.

## Implemented routes

- `/` — editorial landing
- `/create` — featured Goa trip brief
- `/create/review` — structured brief and planning assumptions
- `/create/generate` — deterministic demo generation
- `/trip/goa` — four-day overview
- `/trip/goa/plan` — synchronized timeline and illustrative map, Move, impact review, conflict resolution
- `/trip/goa/budget` — accepted plan budget and daily reconciliation

Move and review are contextual dialogs. Mobile dialogs become full-screen tasks. Discover, Saved, Profile, Notifications, authentication and collaboration are outside this milestone.

## Try the signature interaction

1. Create the featured trip, review the brief, generate and explore the itinerary.
2. On Day 1 choose **Move** on **A slow coffee at Assagao**. Desktop users can also drag the activity onto Day 2.
3. Preview Day 2 before **Your sunset table**. Accepted spending remains ₹37,600; preview spending is ₹38,000, entirely due to ₹400 extra transport.
4. The café ends at 5 pm; 20 minutes of transport makes the traveler 20 minutes short for the fixed 5 pm table.
5. Choose the late-morning or evening alternative. This recalculates only the preview.
6. Optionally opt into the free 20-minute stroll. It is never silently included.
7. Apply. Timeline, map and budget update together. The café receives focus. Undo is available in the confirmation and persistent workspace control, as well as on Budget.

## Architecture

- `src/lib/planner.ts`: pure fixture, scheduling, transit, cost, proposal and validation functions. Money is stored in paise. No API calls.
- `src/components/trip-provider.tsx`: client state, accepted revision, isolated proposal, local persistence, selection/day/view context, undo history.
- `src/components/workspace.tsx`: day navigation, semantic timeline, desktop drag and accessible explicit Move entry.
- `src/components/goa-map.tsx`: original illustrative SVG map, stop selection, stay anchor, accepted/preview routes, fit/zoom, equivalent route list.
- `src/components/editing.tsx`: accessible move dialog, impact comparison, numerical conflict explanations and opt-in alternatives.
- `src/components/brief.tsx`, `overview.tsx`, `budget.tsx`, `ui.tsx`: supporting core screens and shared primitives.
- `src/app/globals.css`: Tailwind entry and intentionally styled component system, responsive composition, accessible focus and reduced motion.

The five approved documents remain the architecture reference. `docs/MILESTONE_1.md` records the narrower implementation contract and exact fixture reconciliation.

## Data boundaries

Featured fixture: four flexible-date days, two people, relaxed Goa trip, Assagao stay anchor, three nights at ₹5,000, ₹2,000 contingency, shared INR target initially ₹40,000. The brief allows editing the title, destination validation, and target budget; duration, traveler count and interests intentionally identify the featured scenario rather than pretending to generate unsupported itineraries.

Destination-local times are represented as minutes within each day. Transit is an illustrative fixture matrix, not road routing. Named areas are contextual; unnamed café/meal venues and the sunset reservation are fictional. Availability is not verified. Travel to/from Goa is excluded. All sums are planned estimates, not real expenses.

State is saved only in this browser's local storage. Reloads restore accepted and preview plans. There is no cloud synchronization. Corrupt storage recovers to the original fixture with a notice; persistence failure warns while retaining in-memory work. Loaded local data remains usable offline; initial offline loading is not promised.

## Verify

```sh
npm run typecheck
npm test
npm run build
```

For browser tests, start the local server separately, install Google Chrome, then run:

```sh
npm run test:e2e
```

Browser tests use the installed Chrome channel. They cover the complete journey, desktop drag, mobile/keyboard Move, preview isolation, conflict resolution, accepted revision consistency, undo, persistence, no 320px page overflow, and axe accessibility checks. Screenshots and failure traces are written to ignored `test-results/`.

## Accessibility

Native modal dialogs provide focus containment; close restores focus. Apply focuses the moved visit. Semantic ordered timelines and keyboard-operable map markers are paired with an ordered route list. All moves have a non-drag path. Warnings include text and numeric explanations. Focus rings, preferred 44px controls, reduced motion, and explicit save/preview status are provided. Automated accessibility checks supplement rather than establish full WCAG compliance; manual screen-reader evaluation remains recommended before publication.

See `public/images/CREDITS.md` for image provenance and licenses.
