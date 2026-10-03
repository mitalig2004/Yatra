# YATRA — Design system

Status: Implemented product system for the portfolio prototype. The semantic palette, Instrument Serif/Manrope typography split, control proportions, and core planning patterns below are reflected in the application. Route-specific composition may vary, but it must use these shared roles. See `PRODUCT_AUDIT.md` for validation evidence and known limits.

The system is intentionally small. It standardizes repeated decisions while allowing the landing, authentication, trip overview, timeline, map, and budget to keep the composition each task requires.

## 1. Visual concept and rationale

Use an editorial travel character for discovery and trip identity, then a quiet, precise working surface for planning. Photography establishes place; typography and spacing organize decisions. The timeline should remain readable when images are unavailable.

One restrained evergreen-like accent is proposed for primary actions and selected states because it can sit quietly beside varied destination photography. Neutral canvas and ink-like text carry most of the UI. Confirm the hue and accessible values in visual exploration; do not use the accent for every card, icon, and label.

Avoid large hero typography inside the planner, pervasive gradients, translucent working surfaces, excessive pills, and ornamental AI symbols. Suggestions should be identifiable through language and consistent structure.

## 2. Typography hierarchy

Use one highly readable sans-serif family for the application. Explore an editorial serif only for landing/destination headings if it adds distinction without weakening cohesion. Font choice must include ₹, clear numerals, useful weights, and reliable fallback metrics. Do not prescribe a third typeface.

| Role | Compact / wide starting size | Line height | Weight / use |
| --- | --- | --- | --- |
| Editorial display | 36 / 56px | 1.1–1.15 | Medium; landing and select destination introductions only |
| Page title | 28 / 36px | 1.2 | Semibold; trip/home identity |
| Section title | 22 / 24px | 1.3 | Semibold; day and budget sections |
| Card title | 18 / 18px | 1.35 | Semibold; activity/place names |
| Body | 16 / 16px | 1.5 | Regular; descriptions and form input |
| UI label | 14 / 14px | 1.4 | Medium; tabs, fields, actions |
| Supporting metadata | 13 / 14px | 1.4 | Regular; estimate basis and timestamps |

Use relative units in implementation and permit user scaling. Important warnings, amounts, and action labels must not rely on the smallest style. Use tabular numerals for comparison rows when supported, but normal numerals in editorial text. Times, currency, and duration use consistent formatting: “10:30 am,” “45 min,” “₹1,200,” with timezone context at trip level. Avoid all-caps paragraphs and low-contrast metadata. Long place names wrap instead of hiding identity.

## 3. Spacing and density

Use a 4px base with a practical scale: 4, 8, 12, 16, 24, 32, 48, 64. Add values only for a clear layout need.

- 4–8px: inseparable metadata and icon/label relationships.
- 12–16px: controls, compact timeline content, related fields.
- 24px: card/panel padding and section separation.
- 32–48px: major workspace groups and editorial sections.
- 64px: large-screen landing rhythm only.

Density comes from grouping related content, not reducing hit targets or text size. Timeline items may use compact internal spacing while keeping adjacent actions independently tappable.

## 4. Grid and layout

| Layout band | Starting grid | Gutters / margins | Behavior |
| --- | --- | --- | --- |
| Compact <768px | 4 columns | 16px outer, 12–16px internal | Single planning surface; timeline/map switch |
| Medium 768–1199px | 8 columns | 24px outer, 24px gutters | Dominant main pane; optional companion only if readable |
| Wide ≥1200px | 12 columns | 32px outer, 24px gutters | Timeline approximately 5 columns, map approximately 7; adjust to content |

Editorial pages use a centered maximum width around 1280px; the workspace can use available width with bounded text lengths. Keep prose around 60–75 characters per line and forms around 560–640px when practical. Do not force a two-pane workspace below roughly 400px of usable timeline width. These are layout constraints to test, not rigid device dimensions.

## 5. Implemented color roles

The source of truth is the semantic token set in `src/app/globals.css`: warm canvas/paper/surface roles, primary/secondary/tertiary ink, forest brand roles, semantic success/warning/error/info roles, map-specific roles, and restrained editorial accents. Components use semantic roles rather than route-specific hex values.

The approximate distribution is 70% warm neutral surfaces, 20% ink and forest brand, and 10% supporting accents. Photography supplies most destination color. Warning amber communicates itinerary conflicts; error red is reserved for validation failures and destructive outcomes. Preview always includes a visible “Preview” label or equivalent text in addition to route or surface styling.

| Semantic role | Proposed direction | UX purpose |
| --- | --- | --- |
| Canvas | Very light warm neutral | Restful background alongside travel photography |
| Surface | Near-white, opaque | Clear readable planning content |
| Subtle surface | Slightly deeper neutral | Group notes, transit, and secondary information |
| Primary text | Near-black neutral | Strong readability |
| Secondary text | Medium-dark neutral | Supporting detail that still meets text contrast |
| Border | Neutral, darker for controls than separators | Distinguish actionable bounds from decorative division |
| Accent / on-accent | Restrained deep green / light text | Primary CTA, selection, active navigation |
| Information | Muted blue family with dark text | Neutral system context; not an AI brand color |
| Success | Green family with icon and label | Accepted/saved state, distinguished from selection by form and text |
| Warning | Amber-tinted surface with dark text | Budget/day-length uncertainty; no pale yellow text |
| Error | Deep red text/icon with light surface | Validation, unavailable or blocked action |
| Preview | Accent outline plus “Preview” label and dashed treatment where suitable | Distinguish proposed from accepted content |

Use semantic tokens such as text.primary, surface.base, action.primary, status.warning, and focus.ring when implemented. Exact color values must pass contrast validation in their actual combinations before approval. Never encode meaning only through red/green or assign a different saturated hue to every day.

## 6. Surfaces, borders, and elevation

Use opaque surfaces. Default organization relies on whitespace and light separators rather than floating tiles. Timeline content may sit directly on the main surface; photo-led discovery cards may have bounded containers.

- **Base:** canvas and page surface, no shadow.
- **Grouped:** subtle fill or 1px border for related content, no automatic elevation.
- **Raised:** modest shadow for popovers, selected draggable items, and sticky context that overlaps content.
- **Overlay:** clear modal scrim and a single elevated sheet/dialog; avoid nested modal layers.

Control borders must be visible enough to identify fields. Focus uses a distinct outline with offset and adequate contrast; it is not just a darker shadow. A sticky footer uses a separator and opaque fill so content cannot bleed through action text.

## 7. Radius rules

Proposed scale: 4px for compact status labels, 8px for buttons/fields, 12px for photo cards and grouped panels, 16px for top corners of mobile sheets. Use square or minimally rounded timeline separators and editorial sections.

Full circles are appropriate for avatars and numbered map markers. Pills are reserved for compact removable filter selections or small toggle groups where their shape helps recognition. Do not make all navigation, cards, buttons, and budget figures pill-shaped.

## 8. Iconography

Use Lucide-style outline icons consistently at 16, 20, or 24px with coherent stroke weight. Icons reinforce visible labels on key actions. Icon-only controls need accessible names, tooltips where useful, and at least the full interaction target size even when the glyph is small.

Use location, clock, route, wallet, bookmark, move, lock, and people icons only where they clarify meaning. Reservation and locked states require text explanations. Avoid sparkle icons as the primary way to identify AI. Suggestion content itself should say “Suggested” and explain why.

## 9. Buttons and actions

Implemented control tokens are 40px small, 44px medium, and 52px large, with a 6px control radius and 180ms state transition. Medium is the default. Full-width controls are used when the task or compact layout benefits from them, not as a default desktop treatment.

- **Primary:** forest fill and white label; one dominant action per task region.
- **Secondary:** paper fill and forest border; supporting action.
- **Tertiary/ghost:** text-forward action with a subtle brand hover surface.
- **Destructive:** error fill and explicit destructive language; never used for ordinary conflicts.
- **Icon button:** 44px target, 18px Lucide glyph, accessible name, and visible hover/focus boundary.

Every variant provides default, hover, pressed, focus-visible, disabled, and loading behavior. Loading preserves dimensions. Icons remain only when they add direction, identity, or comprehension; submission arrows are not decorative defaults.

Variants: primary filled, secondary outlined, tertiary text, and destructive with explicit action language. One visually dominant action per task region. Do not make every card's action primary.

All buttons define default, hover, focus-visible, pressed, disabled, and loading states. Loading preserves width, uses meaningful text, and prevents duplicate submissions. Disabled actions with non-obvious reasons need nearby explanation; a tooltip alone is insufficient.

Use specific labels: “Review change,” “Apply change,” “Move to Day 2,” “Discard proposal.” Avoid vague “OK” in consequential flows. Provide 44px minimum preferred control height. Destructive confirmation names the item and effect; ordinary reversible actions can rely on Undo.

## 10. Form controls

- Visible persistent labels, help text before error text, and grouped fieldsets for related choices.
- Text input, textarea, select/combobox, date/duration selector, checkbox, radio choice, and stepper share border/focus/error behavior.
- Natural-language input is paired with an editable structured interpretation.
- Budget fields always show currency and shared/per-person basis. Numeric inputs allow direct typing, not only steppers.
- Date entry has an accessible typed fallback; flexible days remain a distinct mode.
- Multi-select interests show selected states through text/checkmarks as well as fill.
- Segmented controls use correct selection semantics; navigation tabs and form choices must not be conflated.
- Errors explain the fix (“End date must be after start date”) and retain entered values.
- Native interaction patterns are preferred when a custom control adds little value.

## 11. Cards and imagery

Three card families are sufficient initially:

1. **Trip card:** destination imagery, identity, date/duration, travelers, plan status, estimate. Purpose: resume work.
2. **Place card:** image, name, category/location, useful cost/duration context, saved control. Purpose: decide whether to inspect/save.
3. **Activity card:** time/duration, name, location, cost basis, constraints, actions. Purpose: understand and edit a scheduled visit.

Do not force these into one identical layout. Activity cards prioritize sequence over photography; use small optional thumbnails. Suggested and conflict content can use inline panels rather than multiplying card types.

Photography should be destination-specific, naturally colored, and licensed for intended use. Use consistent crops within a collection, preserve focal points, and avoid text on busy images. If text overlays are essential, verify contrast through a stable scrim. The planner must remain usable with no image loaded. Source assets during visual exploration; no invented attribution.

## 12. Navigation components

Global navigation, local trip tabs, day selector, Timeline/Map switch, breadcrumbs/back controls, and notification entry each have a distinct scope. Active states use labels plus an underline, shape, or weight change, not color alone.

Mobile trip navigation replaces global bottom navigation while inside the workspace. Avoid simultaneous fixed bottom bars. Day selectors show day number plus short date where known, make the current day visible, and support horizontal keyboard navigation where tab semantics are used.

## 13. Itinerary components

| Component | Required content and behavior |
| --- | --- |
| Day header | Day/date, pace/free-time summary, daily estimate, warnings |
| Activity row/card | Stable identity, time/duration, title, place, estimate, constraint labels, contextual actions |
| Transit leg | Mode, estimated duration, cost where applicable, connection between visits |
| Free-time block | Available gap and optional add action; distinguish from locked rest |
| Stay anchor | Area/name, approximate status, start/end route context |
| Drop target | Visible insertion position, destination day, keyboard-equivalent control |
| Impact summary | Requested change, source/destination effects, net trip effects, review state |
| Conflict block | What overlaps or fails, relevant fixed constraint, recovery choices |
| Suggestion panel | Action, reason, assumptions, impact, review/dismiss controls |
| Change entry | Actor, action, time, affected visit, detail and eligible undo |

Times align for scanning but the screen-reader order remains chronological. Connectors supplement the ordered list; they are not the only indication of sequence. Locked/rest/reservation states are textually distinct.

## 14. Map components

Numbered stop marker, stay marker, selected marker, suggested-place marker, accepted route, preview route, fit/zoom controls, legend, selected-place sheet, and accessible route list.

Markers need visible hit targets larger than their glyphs. Selected markers use an outline/shape change and label. Day identity is expressed through numbering and labels, with optional restrained secondary color. An illustrative route is labeled as such; curves or lines cannot imply precise navigation.

Map motion is secondary to comprehension. Explicit selection may pan to an item; hover never moves the map. Provide a route list that exposes the same scheduled places, ordering, and travel estimates.

## 15. Feedback and status patterns

| Pattern | Usage |
| --- | --- |
| Inline field error | Local input correction |
| Inline planning warning | Budget, uncertain hours, pace/day length |
| Blocking review issue | Impossible timing or known unavailability in a proposal |
| Persistent banner | Offline, save failure, stale proposal, collaborator change |
| Toast + persistent history | Brief success and Undo entry point; no exclusive time-limited recovery |
| Empty state | Context, explanation, one useful next action |
| Skeleton | First load of stable content geometry |
| Indeterminate progress | Generation/calculation with meaningful phase labels |

Copy is calm and specific. Example: “This move adds ₹400 in estimated transport.” Avoid claims like “Perfectly optimized!” and avoid blaming travelers for errors. “Hours unknown” is more honest than a reassuring checkmark.

## 16. Motion principles

Use motion to maintain orientation, reveal cause/effect, and confirm direct manipulation. Proposed duration ranges: 120–180ms for button/selection feedback, 180–240ms for panel changes, and up to 300ms for moving a selected activity into its accepted position. Validate these with actual layouts before standardizing exact tokens.

- Dragged item lifts subtly; insertion placeholder makes destination unambiguous.
- After Apply, highlight affected rows briefly and retain textual change details.
- Budget values may transition gently but the final value and delta must be readable immediately; no slot-machine counting.
- Cross-view transitions preserve selected item/day; avoid full-page theatrical transitions inside planning.
- Loading reflects actual work; do not add intentional waits just to showcase animation.
- Reduced motion removes translations, animated map pans, and shimmer; state changes remain visible through labels and outlines.

Framer Motion is an implementation option for these behaviors, not a requirement to animate every component.

## 17. Accessibility and quality gates

Target WCAG 2.2 AA. Validate normal text at 4.5:1, large text at 3:1, and meaningful UI graphics/boundaries at 3:1 as applicable. Validate focus appearance across neutral, accent, image, and warning surfaces. Prefer 44 × 44px touch targets and adequate separation.

Required manual checks: complete trip creation and cross-day move by keyboard; move without drag; interpret budget and conflicts with a screen reader; dismiss and reopen sheets with correct focus restoration; use the planner at 200% zoom and 320px reflow; use reduced motion; fail images/map without losing tasks.

Do not equate a passing automated accessibility scan with compliance. Component reviews must include long names, ₹ formatting, empty content, missing estimates, warning combinations, and disabled-with-reason states.

## 18. Decisions to validate before visual implementation

- Compare two typographic directions on the same timeline and impact review: all-sans versus restrained editorial serif for headings.
- Approve an accent direction and validate exact semantic color values against actual surfaces.
- Test compact/mobile impact review first; a beautiful desktop comparison cannot compensate for an unreadable phone flow.
- Confirm imagery rights and fallback strategy, and whether the illustrative map meets the portfolio's expectations.
- Establish consistent fixture content before polishing cards and transitions; content length and constraint density should drive the layout.

The eventual system should emerge from these high-value components and verified states, rather than an oversized component catalog built before the product flow is proven.
