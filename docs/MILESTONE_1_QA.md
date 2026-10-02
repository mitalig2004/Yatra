# Milestone 1 verification

Verified on 1 October 2026 against the local production build using installed Google Chrome.

## Passed checks

- `npm run typecheck`: passed.
- Planning-engine smoke verification passed against the refined fixture: accepted ₹37,600; proposal ₹38,000; +₹400 transport; 20-minute conflict; resolved revision 2.
- `npm run build`: passed; seven product routes prerendered successfully, plus the not-found route.
- `npm run test:e2e`: 4 browser suites passed in the final run.

## Final signature-flow polish

- The desktop Impact Review now places the before/after ledger beside the two affected-day summaries, keeping trip cost, transport delta, travel time and free-time changes visible together.
- The unresolved conflict includes a visual timing relationship for café end, 20-minute travel, the fixed reservation and expected arrival. Equivalent explanatory text remains in the alert.
- Move Activity uses keyboard-accessible radio option groups for destination day and placement rather than generic select controls.
- Mobile day navigation exposes four equal, touch-accessible Day/area tabs without clipped titles.
- Apply animates the accepted estimate and illustrative route over 280–320ms, focuses and briefly emphasizes the moved café, and uses a smaller mobile confirmation with a prominent Undo action. Reduced-motion preferences remove these transitions.
- Browser coverage now explicitly verifies timeline-to-marker selection, marker-to-timeline selection, preserved mobile selection, moved-café focus, synchronized revision 2 surfaces and full Undo restoration.

## Accessible spatial treatment

- Landing and overview photography use a shallow pointer-responsive perspective with layered editorial labels. The effect is limited to mouse input and removed for reduced-motion users.
- The illustrative map adds a softly raised coastline, route casing, marker ground shadows and clearer selected-marker elevation without implying road-accurate navigation.
- Primary actions use restrained physical depth and pressed feedback. Selected itinerary and map surfaces receive depth only when it clarifies focus.
- The treatment reuses YATRA's green, warm sand, white and ink palette. Forced-colors mode removes decorative shadows and retains explicit control borders.
- Interaction motion is action-led: selected map markers rise with a short spring, directional icons move toward their result, option groups respond to hover/focus, map controls give pressed feedback, and Apply/Undo confirmations enter over 260ms. No element loops continuously.
- Instrument Serif now adds a playful voice to selected editorial phrases and friendly planner guidance while Manrope remains the primary interface typeface.

## Expressive entry experience

- Landing and Create Trip use the warm sand, soft ivory, taupe and deep espresso reference palette with stronger decorative motion before transitioning into the quieter planning workspace.
- Fraunces provides a playful, sturdy display voice on the first two pages; Instrument Serif remains the softer handwritten/editorial accent and Manrope remains the interface face.
- The landing hero includes staggered type, an animated illustrative route, floating destination points, orbiting color forms, layered photography and scroll-triggered story sections.
- Create Trip includes a staggered form arrival, animated color field, traveling route sketch, floating weather note, interactive interest colors and a responsive editorial postcard.
- All choreography is CSS or Framer Motion, stops under `prefers-reduced-motion`, preserves readable contrast throughout the animation, and does not affect the planner's deterministic behavior.

## Cohesive product-wide visual pass

- The final palette follows the supplied nautical reference: Warm Sand `#DEBF93`, Soft Ivory `#EFE4D2`, Warm Taupe `#A49689` and Deep Espresso `#1F1919`.
- Review, Generation, Overview, Plan, Impact Review, Conflict Resolution and Budget share this restrained four-color system with Landing and Create Trip.
- Review uses a printed-brief composition with colored information rules; Generation animates orbiting inputs into one route; Overview adds an illustrative traveling route and weather note over the destination image.
- The planning workspace stays deliberately quieter: color communicates the active day, accepted versus preview route, selected stop, requested change, conflict and optional suggestion.
- Budget uses the palette as a stable category key, with an animated stacked estimate and a distinct daily-cost ledger. It keeps all amounts and category labels available as text.
- Continuous decorative motion is limited to editorial pages. Workspace motion remains short and causal. All motion stops under `prefers-reduced-motion`.
- Taupe is reserved for borders, large display elements and decorative depth. Informational text on sand and cream uses espresso to meet WCAG AA contrast.

## Browser coverage

1. Full landing → create → review → generation → overview → Plan → explicit Move → 20-minute conflict → alternative → Apply → budget → Undo journey. Confirms the before/after day totals, ₹37,600 accepted estimate, ₹38,000 preview, +₹400 transport explanation, fixed 5 pm reservation, focused moved café, shared map/budget/timeline revision, and restored accepted plan after reload. No uncaught page errors.
2. Desktop drag to Day 2 creates a proposal. Inspecting the preview shows a separate route; discarding leaves accepted costs and placement intact.
3. At 390 × 844 with reduced motion: keyboard entry to Move, day/position controls, numerical conflict review, mobile Map switching with retained day/proposal, Fit day, Apply focus, and Undo. Workspace reflow also checked at 320px.
4. Mobile supporting routes: landing, creation, brief review, overview, and budget remain within the viewport and pass the configured axe WCAG A/AA checks. The workspace and conflict dialog pass equivalent checks in the third suite.

Visual screenshots were inspected for landing, desktop/mobile workspace, mobile conflict review, and budget. Supporting text was enlarged and its neutral color darkened to fix a warm-surface contrast failure. Mobile Apply now switches to Timeline atomically before focusing the moved activity. Map touch regions retain their size across zoom. The decorative budget bar is hidden from assistive technology because the complete category amounts are provided as adjacent text.

The normal `npm test` entrypoint could not be rerun in the final host session because Node's Windows `os.userInfo()` call returned `ENOMEM` before `tsx` loaded the tests. This is a host-level startup failure rather than a test assertion. The same fixture outcomes were verified through a direct Node planning-engine smoke check and the passing browser journey.

## Evidence

Browser tests save screenshots under `test-results/` (ignored generated output):

- `landing-desktop.png`, `landing-mobile.png`
- `workspace-desktop.png`, `workspace-mobile.png`
- `conflict-desktop.png`, `conflict-mobile.png`
- `map-mobile.png`, `budget-desktop.png`

`tests/planner.test.ts` and `tests/browser/journey.spec.ts` are the reproducible verification sources.

## Boundaries and next checks

- Chrome desktop and emulated mobile are verified; real iOS Safari/Android device checks and manual screen-reader testing remain before publication. Automated scans do not establish full WCAG compliance.
- This is the curated Goa fixture, not arbitrary destination generation. Dates are flexible; costs, routes, venue descriptions, and the user-marked reservation are illustrative. No external reservation is changed.
- Storage is browser-local, with no backend, auth, collaboration, paid APIs or bookings. First-load offline support is not promised.
- Before Milestone 2, run a small formative usability study on understanding the transport delta, reaching conflict alternatives on mobile, distinguishing previews from accepted data, and discovering Undo. Expand scope only after that core journey is validated.
