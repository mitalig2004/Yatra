# YATRA product audit for the portfolio case study

Audit date: 18 October 2026  
Audited build: local Next.js prototype and the deployed YATRA application  
Portfolio owner: Mitali Giri  
Audit standard: describe only behavior supported by source, documentation, or a reproduced browser journey.

## Executive assessment

YATRA is a functional consumer travel-planning prototype with one unusually strong product interaction: a traveler can move an activity, preview the effect on schedule, route, free time and cost, resolve a fixed-time conflict, and commit or discard the proposal. The accepted plan and the proposed plan are deliberately separate. Apply creates one synchronized revision across timeline, illustrative map and budget; Undo restores the previous plan.

The prototype is strongest when it stays close to this decision model. It is not a booking product, a real AI service, a road-navigation tool, or a production collaboration system. The portfolio story should present those boundaries directly.

## Implemented routes and screens

| Route | Screen | Implementation status |
| --- | --- | --- |
| `/` | Editorial landing page | Functional |
| `/signup` | Local prototype account creation | Functional, simulated authentication |
| `/login` | Local prototype login | Functional, simulated authentication |
| `/forgot-password` | Reset request and success state | Functional, no email sent |
| `/trips` | Trips Home | Functional after local authentication |
| `/create` | Goa trip brief | Functional with deterministic inputs |
| `/create/review` | Trip brief review | Functional |
| `/create/generate` | Staged generation experience | Simulated |
| `/trip/goa` | Trip overview | Functional |
| `/trip/goa/plan` | Timeline and illustrative map workspace | Functional |
| `/trip/goa/budget` | Budget breakdown and reconciliation | Functional |
| `/work/yatra` | Canonical portfolio case study | Implemented from this audit |
| `/case-study` | Legacy case-study route | Redirects to `/work/yatra` |

The not-found route provides a branded recovery state.

## Demo fixture

- Destination: Goa, India
- Duration: four days
- Travelers: two
- Shared target budget: ₹40,000
- Pace: relaxed
- Interests: beaches, cafés, local food and nightlife
- Accepted initial estimate: ₹37,600
- Accepted estimate after the reviewed café move: ₹38,000
- Net change: +₹400 estimated transport

The café's ₹900 cost moves between Day 1 and Day 2. It is not added to the trip a second time.

## Primary journeys

### Product entry

Landing → Sign up or Log in → Trips Home → Continue planning.

The portfolio demo also offers direct public access to the Goa plan so a reviewer is not blocked by prototype authentication.

### Create a trip

Create Trip → Confirm destination, travelers, budget, pace and interests → Review brief → Simulated generation → Trip Overview → Plan.

The flow uses one deterministic Goa fixture. It demonstrates information architecture and state transitions, not arbitrary destination intelligence.

### Adaptive itinerary editing

Open Day 1 → Move “A slow coffee at Assagao” → Select Day 2 and a placement before the reservation → Review impact → See the 20-minute conflict → Choose “Move café earlier” → Review the recalculated proposal → Apply → Inspect synchronized timeline, map and budget → Undo.

Both drag-and-drop and an explicit semantic Move action are implemented. Drag is never required.

## Collaboration behavior

Real invitations, permissions, presence, voting, concurrent editing and server synchronization are not implemented. The current prototype establishes interaction foundations that could support collaboration later:

- accepted plan versus proposed change;
- explicit Apply and Discard;
- a revision number and change history;
- human-readable consequences;
- optional suggestions that are never silently applied;
- Undo.

The case study may describe collaboration as the product direction and these mechanics as its foundation. It must not claim real-time collaboration exists.

## Existing design system

### Identity and typography

- Instrument Serif is used selectively for editorial travel moments.
- Manrope is used for forms, navigation, planning data and controls.
- The YATRA mark combines a bold wordmark with a minimal route-like circular symbol.

### Color roles

- Canvas `#F7F5EF`
- Paper `#FCFBF7`
- Primary surface `#FFFFFF`
- Sand surface `#EDE4D2`
- Primary text `#20211D`
- Secondary text `#62645E`
- Forest brand `#1F513F`
- Warning `#95601D`
- Error `#9B443C`
- Map water `#DCE9E8`

Warning amber is used for planning conflicts. Red is reserved for failures or destructive states. Preview is always labeled in addition to visual treatment.

### Controls and layout

- Controls use 40, 44 and 52px height tokens.
- Focus-visible uses a 3px forest outline with separation from the target.
- Cards are reserved for emphasis; ordinary timeline rows rely on structure and spacing.
- Desktop planning uses a timeline/map split.
- Mobile planning uses a Timeline/Map switch and focused full-screen decision tasks.

## Interaction patterns

- Proposal before commit
- Requested change, consequences and optional suggestions shown as separate groups
- Numeric conflict explanation
- Explicit resolution choice followed by a second review
- Selection synchronization between timeline and map
- Apply confirmation with Undo
- Local save state and offline messaging
- Restrained 200–400ms motion for selection, route and revision changes
- Reduced-motion behavior

## Responsive behavior

The product has dedicated desktop and mobile compositions rather than scaled desktop screens.

- At desktop widths, timeline and map share the primary workspace.
- At mobile widths, the views are switchable and preserve active day, selected activity and proposal state.
- Impact Review and conflict resolution become focused tasks.
- Authentication uses a two-panel composition on large screens and a compact image-supported form on mobile.
- Automated reflow checks cover 390px and 320px in the core journey.

The case study has been designed to remain legible from phone to large desktop and uses authentic captures at desktop and 390px.

## Accessibility observations

Verified strengths:

- skip link and semantic landmarks;
- visible focus indicators;
- labels, help text, validation relationships and alert semantics in forms;
- semantic radio choices in the non-drag Move flow;
- native dialog behavior with focus return;
- semantic timeline structure;
- 44px preferred touch targets;
- accessible ordered route alternative for the illustrative map;
- color is supplemented by text, icons and structure;
- `prefers-reduced-motion` support;
- automated axe scans pass for the tested mobile conflict and supporting routes.

Remaining validation:

- manual testing with NVDA, VoiceOver and TalkBack;
- keyboard review across every route;
- 200% and 400% zoom;
- Windows High Contrast Mode;
- real iOS Safari and Android browser behavior;
- full WCAG 2.2 AA audit.

Passing automated scans is not presented as full compliance.

## UX strengths

1. **A distinctive product thesis.** Editing a plan is treated as a decision with consequences rather than a prompt to regenerate.
2. **Explainable assistance.** Timing and budget changes are numerical and connected to the requested move.
3. **Strong state integrity.** Accepted and preview states remain separate until Apply.
4. **Connected surfaces.** Timeline, map, budget, selection and active day share the same revision.
5. **Credible visual identity.** Warm editorial presentation gives way to a quieter planning workspace.
6. **Accessible alternative input.** The explicit Move path provides equal capability without drag.

## UX weaknesses and incomplete areas

1. No primary research, user interviews or usability sessions are documented.
2. Collaboration is a product direction rather than an implemented system.
3. AI generation and travel calculations are deterministic simulations.
4. Authentication and persistence are browser-local.
5. The map and routes are illustrative, not road accurate.
6. Only one destination and one signature conflict are modeled.
7. There is no booking, payment, live availability or external reservation integration.
8. Empty, loading, error and offline states exist selectively rather than as a complete product matrix.

## Evidence available for the case study

- Product requirements, UX specification, user flows, screen requirements and design-system documentation
- Deterministic fixture and planning engine source
- Automated planning-engine tests
- Desktop and mobile Playwright journeys
- Axe accessibility checks for tested routes
- Authentic screenshots of landing, trip creation, overview, plan, conflict, map and budget
- A deployed interactive prototype

No interview quotes, survey results, task-completion rates, behavioral analytics or business outcomes are available. The case study therefore separates Designed, Built, Evaluated and Future Validation.

## Recommended usability validation

Test with 5–7 people who independently plan leisure trips with partners or friends. Ask participants to:

1. create a four-day trip with a shared budget;
2. explain the accepted estimate and available budget;
3. move the café into Day 2 using the explicit Move path;
4. explain why the proposal costs ₹400 more;
5. resolve the fixed reservation conflict;
6. predict what Apply will change;
7. find the moved café on timeline and map;
8. Undo and verify restoration.

Observe completion, errors, hesitation, interpretation of accepted versus preview state, confidence in Apply, and discovery of Undo. Do not add collaboration scope until this core decision model is understood.
