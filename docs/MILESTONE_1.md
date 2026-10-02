# Milestone 1 implementation contract

Approved architecture remains in the five original documents; this milestone intentionally implements only the core planning journey.

## Before-code decisions

- Routes: `/` landing; `/create` brief; `/create/review` structured review; `/create/generate` deterministic generation; `/trip/goa` overview; `/trip/goa/plan` timeline/map; `/trip/goa/budget` accepted budget.
- Contextual screens: Move activity, Impact review, Conflict resolution. No Discover, Saved, Profile, Notifications, authentication, or collaboration.
- Components: application header and trip navigation; brief form/review; generation phases; trip overview; day navigation; semantic timeline/activity/transit/free-time rows; illustrative SVG Goa map; accessible modal; move form; impact comparison/conflict choices; budget breakdown; persistent confirmation/undo.
- State: one client provider contains accepted Plan with monotonic revision, independent Proposal based on that revision, previous accepted snapshot for Undo, trip brief, active day, selected activity, and mobile view. Derived schedules/totals use pure functions. Only Apply mutates accepted state; Discard does not. Proposal and context persist locally. Malformed local data falls back safely with a notice.
- Tokens: canvas #F7F5EF, surface #FFFFFF, ink #20221F, secondary #696B65, accent #244A3A, accent surface #E8EEE9, warm #EDE4D3. Stronger control borders and error/warning/focus colors are tested separately. Manrope UI, Instrument Serif editorial headings. 4px spacing base; selective 8–12px radii; opaque surfaces.

## Deterministic fixture

Four flexible-date days, two travelers, relaxed pace, INR shared target ₹40,000. Stay anchor: Assagao area. Three nights at ₹5,000 = ₹15,000, contingency ₹2,000. Travel to/from Goa excluded. Costs are fictional group estimates; venue hours and reservation are fixture context, not verified availability or bookings.

| Day | Theme | Activities | Activity costs | Transport | Total |
| --- | --- | --- | --- | --- | --- |
| 1 | Ease into the coast | Vagator beach, slow café stop, Goan lunch, Chapora fort, coastal dinner | ₹4,400 | ₹1,000 | ₹5,400 |
| 2 | A little local life | Anjuna market, village lunch, fixed 5 pm sunset table, light supper | ₹5,000 | ₹1,000 | ₹6,000 |
| 3 | The other side of Goa | Fontainhas walk, Panjim lunch, riverside pause, live music dinner | ₹3,600 | ₹1,000 | ₹4,600 |
| 4 | One last ocean morning | Morjim beach, brunch, local keepsakes, farewell lunch | ₹3,600 | ₹1,000 | ₹4,600 |

Total days ₹20,600 + lodging ₹15,000 + contingency ₹2,000 = ₹37,600.

The café costs ₹900 for two and lasts 90 minutes. A Day 2 afternoon insertion starts 3:30 pm, ends 5 pm, and needs 20 minutes to the fixed 5 pm table: the traveler is 20 minutes short. An earlier or after-reservation alternative preserves the reservation; choosing either updates only the proposal. Source/destination fixture transport legs increase by ₹100/₹300 respectively, producing ₹4,600 / ₹7,200 and total ₹38,000. Transit is derived from explicit fixture leg estimates, not a claimed routing service. Other days remain unchanged.

Optional recommendation: a free 20-minute neighborhood stroll can be explicitly included in a feasible preview. It never appears by default and its schedule effect is shown separately.

## Verification plan

Pure engine tests verify cost reconciliation, no duplicate café cost, fixed-time conflict, feasible alternatives, immutability, stale proposal rejection, and undo. Browser verification covers the full creation journey, drag and non-drag edits, proposal isolation, apply/map/budget revision consistency, persistence, mobile view context, keyboard dialogs, reduced motion, and visual checks at desktop/mobile widths.

## Refinements from implementation verification

- Supporting text uses `#62645E`, slightly darker than the initial `#696B65`, following contrast checks on the warm supporting surface.
- Planning metadata remains readable without shrinking the whole interface to fit more cards. Mobile day comparisons stack vertically.
- Apply switches to Timeline and focuses the moved visit as part of the same accepted-state update, including when review began in Map.
- Map marker touch regions retain their screen size across zoom levels. Optional stroll numbering remains consistent with the timeline.
- Conflict review includes a direct shortcut to numerical explanations and feasible alternatives, particularly useful on a phone.
- The local preview runs from the production build for final verification. The app remains a frontend-only, locally persisted portfolio demonstration.
