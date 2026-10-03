# YATRA product quality audit

Audit date: 3 October 2026  
Scope: the implemented portfolio prototype, including authentication, trip entry, the Goa fixture, planning, map, impact review, budget, and responsive behavior.

## Executive assessment

YATRA already has a credible product idea and a distinctive interaction story. Its strongest work is the accepted-plan versus proposal model: moving the café creates a reviewable proposal, explains timing and cost effects, requires an explicit conflict resolution, and commits one synchronized revision only after Apply. That behavior should remain the center of the portfolio story.

The visual identity is also worth preserving. Instrument Serif is limited to editorial moments, Manrope carries functional content, photography supplies destination color, and the planning workspace uses a quiet warm-neutral system. The final pass therefore focuses on consistency and evidence rather than adding screens or decoration.

## Inventory reviewed

Routes: `/`, `/signup`, `/login`, `/forgot-password`, `/trips`, `/create`, `/create/review`, `/create/generate`, `/trip/goa`, `/trip/goa/plan`, `/trip/goa/budget`, and the not-found route.

Primary systems: global header and trip navigation, local authentication, trip fixture and revision state, creation brief, generation state, overview, timeline, illustrative map, move dialog, impact review, conflict resolution, budget, change history, confirmation with Undo, offline/save feedback, responsive Timeline/Map switching, and reduced-motion behavior.

## What should be preserved

- The editorial/product typography split and warm travel identity.
- The deterministic Goa fixture and consistent ₹37,600 accepted estimate.
- Proposal-before-commit behavior and the clear separation of requested change, consequences, and optional suggestions.
- The numerical conflict explanation and explicit resolution choices.
- Synchronized timeline, map, budget, selection, active day, revision, and Undo state.
- An explicit non-drag Move path with semantic radio choices.
- Mobile full-screen decision tasks and the Timeline/Map view switch.
- Semantic feedback that combines text, icons, structure, and color.

## Priority findings

### P0 — broken or blocking

No P0 issue was found in the implemented core journey. The tested route and revision model remains functional.

### P1 — significant UX issues

1. **Control language drift.** Buttons accumulated different heights, spacing, shadows, and icon behavior across iterations. This weakened perceived quality and made some states less predictable.
2. **Decorative authentication arrows.** Submission CTAs used arrows that did not add meaning and competed with loading feedback.
3. **Incomplete assistive feedback on reset validation.** The forgot-password inline error was visually clear but did not announce itself as an alert.
4. **Documentation drift.** The design-system document still described a proposed system even though the prototype now has an implemented token contract.

### P2 — consistency and polish

- Standardize small, medium, and large control heights around accessible targets.
- Keep icon buttons at a 44px target while using a consistent 18px glyph.
- Use restrained primary elevation instead of a heavy offset-button effect.
- Keep disabled controls readable and loading controls dimensionally stable.
- Record real validation evidence and remaining constraints for portfolio credibility.

### P3 — optional enhancement

A separate Design Story route could later explain the hypothesis, iteration, responsive strategy, and flagship flow. It should be added only when the narrative and artifacts are ready; adding it during this quality pass would dilute the product work and risk presenting process claims without evidence.

## Changes made from the audit

- Added shared control size and motion tokens.
- Refined primary, secondary, tertiary/ghost, destructive, and icon-button visual states.
- Added explicit hover, pressed, focus-visible, disabled, and loading treatment without layout shift.
- Removed ornamental arrows from authentication submission and reset actions.
- Kept the loading indicator in a stable position within the authentication CTA.
- Added alert semantics to forgot-password validation.
- Updated the design-system documentation to distinguish implemented rules from future validation.

## Accessibility and contrast evidence

Representative calculated contrast ratios:

| Combination | Ratio | Intended use |
| --- | ---: | --- |
| Primary text on canvas | 14.85:1 | Body and headings |
| Secondary text on canvas | 5.50:1 | Supporting copy and metadata |
| White on brand primary | 9.10:1 | Primary actions |
| Brand primary on brand subtle | 7.58:1 | Selected/low-emphasis brand states |
| Warning on warning surface | 4.56:1 | Conflict copy |
| Error on error surface | 5.37:1 | Validation and failures |
| Info on info surface | 4.99:1 | Preview and informational states |

`--text-tertiary` is 4.00:1 on the canvas and therefore is not approved for normal-size meaningful copy. Functional supporting text and disabled button labels use `--text-secondary`. Tertiary may be used for non-text decoration or sufficiently large text only after checking the actual combination.

## Remaining risks and next validation

- Authentication is intentionally local and should be labeled as prototype behavior in any case study.
- The map is an illustrative planning surface, not road-accurate navigation.
- The deterministic fixture proves the interaction model but does not validate recommendation quality or real travel-time accuracy.
- Automated checks support accessibility work but do not replace keyboard, screen-reader, 200% zoom, reflow, and device testing.
- A future case study should use “design hypothesis,” “assumption,” and “proposed validation” unless real research evidence is available.

## Hiring-manager reading of the product

The first portfolio sequence should show: the planning problem, the accepted Day 1 plan, the café Move action, unresolved Impact Review, the 20-minute conflict, the selected resolution, the synchronized revision after Apply, and Undo. This sequence demonstrates the distinctive product thinking more clearly than a broad feature tour.
