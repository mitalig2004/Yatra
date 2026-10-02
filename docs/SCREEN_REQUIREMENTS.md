# YATRA — Screen requirements

Status: Proposed. These contracts define content and behavior, not finished visual compositions. Each screen inherits accessibility, persistence, responsive, and error rules from [UX_SPEC.md](UX_SPEC.md). Screen identifiers support wireframes and prototype review; they are not prescribed URL paths.

## Screen inventory and shared shell

Public: S01–S02. Setup: S03, S05–S07. Personal: S04, S17–S18, S21–S22. Trip: S08–S16, S19–S20. Contextual surfaces may be drawers, sheets, or full-screen tasks instead of separate pages.

Every data-dependent screen supports layout-matched loading, scoped failure/retry, offline status when relevant, and honest local-save status. Empty, unavailable, and permission states are specified below. Skeletons reserve the final content's geometry; errors preserve usable content.

## S01 — Landing / product introduction

- **Purpose:** Explain flexible visual trip planning and establish credibility.
- **Hierarchy:** Product promise → destination image and concrete before/after edit example → three supporting benefits → demo invitation and estimate disclosure.
- **Primary CTA:** Try the demo.
- **Secondary actions:** See how editing works; open demo sign-in.
- **Components:** Minimal header, editorial destination visual, annotated itinerary example, benefit sections, footer with portfolio/demo context.
- **States:** Image loading/fallback; reduced-motion static example; demo launch failure with retry.
- **Interactions:** Show a short move-and-impact illustration controlled by the viewer; avoid forced auto-playing product tours.
- **Mobile:** Single reading column; concise hero; product example remains legible without horizontal page scroll.
- **Desktop:** Photography and interaction example can share the hero; generous whitespace with one clear focal action.

## S02 — Authentication / demo identity

- **Purpose:** Model entry and returning identity without building real authentication.
- **Hierarchy:** Demo disclosure → demo identity choice → continuation → device-local data explanation.
- **Primary CTA:** Continue as demo traveler.
- **Secondary actions:** Back to introduction; continue without profile setup.
- **Components:** Identity panel, explanatory text, clear back action; future real-auth form documented as out of scope.
- **States:** Loading demo identity; initialization error/retry; returning identity.
- **Interactions:** Use a fixture identity; do not collect passwords or simulate successful OAuth.
- **Mobile:** Focused full-page layout with reachable action.
- **Desktop:** Narrow content column; optional supporting travel image, never a distraction from disclosure.

## S03 — Travel preference onboarding

- **Purpose:** Establish optional defaults with minimal effort.
- **Hierarchy:** Why preferences help → pace → interests → optional dietary/mobility needs → editable-later reassurance.
- **Primary CTA:** Continue.
- **Secondary actions:** Skip for now; Back; clear optional selections.
- **Components:** Labeled pace choices with descriptions, multi-select interests, optional expanded fields, progress indicator only if multiple steps are used.
- **States:** Unselected, selected, validation error, saving failure, returning edit mode.
- **Interactions:** Selections have visible check states and keyboard semantics; never infer sensitive needs from interests.
- **Mobile:** Stacked choices with large targets; no photography behind controls.
- **Desktop:** Bounded form width; grouped choices, not a dashboard grid.

## S04 — Home / trip dashboard

- **Purpose:** Resume planning or start a new trip.
- **Hierarchy:** Current/recent trip → Create action → remaining trips → optional sample-trip entry.
- **Primary CTA:** Create a trip in empty state; Resume planning for an existing active trip.
- **Secondary actions:** Open trip details; browse Discover; open Activity or Profile.
- **Components:** Trip cards with destination, dates/duration, travelers, estimate and draft/warning status; global navigation; contextual greeting.
- **States:** First-use empty; populated; loading; failed local load; offline/local-only status.
- **Interactions:** Card opens its last active day. Give nested actions distinct targets. Warnings link to the relevant trip issue.
- **Mobile:** One-column cards with restrained imagery and visible status.
- **Desktop:** Editorial feature for the active trip with compact supporting trip list; avoid meaningless analytics cards.

## S05 — Create trip / brief

- **Purpose:** Capture constraints and inspiration in an editable structure.
- **Hierarchy:** Destination → dates/duration and travelers → budget/scope → pace/interests → optional stay area and places.
- **Primary CTA:** Review trip brief.
- **Secondary actions:** Use sample brief; switch text/structured entry; save local draft; cancel.
- **Components:** Optional natural-language input, structured form, date/flexible-day selector, traveler stepper with text input, money field and shared/per-person basis, inclusion checklist.
- **States:** Blank; parsed draft; unsupported destination; invalid dates/amount; dirty draft; offline; save failure.
- **Interactions:** Text interpretation populates editable fields. Budget conversion between per-person and shared values is explicitly explained. Never silently replace the original budget intent.
- **Mobile:** Sequential sections with sticky action outside keyboard overlap.
- **Desktop:** Form with compact live brief summary; keep reading order logical.

## S06 — Review trip brief

- **Purpose:** Confirm what generation will use and surface assumptions early.
- **Hierarchy:** Core constraints → included/excluded costs → stay/date assumptions → preferences and included places.
- **Primary CTA:** Generate itinerary.
- **Secondary actions:** Edit individual section; return to brief.
- **Components:** Structured summary, editable field links, assumption callout, scope labels.
- **States:** Ready; missing required value; incompatible constraints; dirty values; generation launch failure.
- **Interactions:** Section edits return focus to their summary. Explain if flexible dates prevent date-specific checks.
- **Mobile:** Compact stacked summary, expandable optional preferences.
- **Desktop:** Two-column summary only when hierarchy remains clear; action stays visually tied to assumptions.

## S07 — Generation

- **Purpose:** Explain progress and preserve the user's effort through delay or failure.
- **Hierarchy:** Trip identity → current phase → brief summary → cancel/recovery action.
- **Primary CTA:** Explore itinerary once complete; Retry on failure.
- **Secondary actions:** Cancel; Edit brief after failure.
- **Components:** Indeterminate stage indicator, stable day skeletons, brief recap, recoverable error block.
- **States:** Loading; longer-than-usual; canceled; failed; complete; partial draft with warnings.
- **Interactions:** Announce major phase changes politely. Completion does not automatically steal focus. No fabricated research statements or precise progress percentage.
- **Mobile:** Lightweight progress view; concise recap.
- **Desktop:** Draft layout preview can reveal structure, but unfinished items cannot be mistaken for committed output.

## S08 — Generated trip overview / trip details

- **Purpose:** Orient the traveler to the proposed trip before detailed editing.
- **Hierarchy:** Destination/dates/travelers → overall estimate and scope → day summaries → stay context → assumptions/warnings.
- **Primary CTA:** Explore itinerary / Resume planning.
- **Secondary actions:** Edit trip settings; open Budget; open People; inspect assumptions.
- **Components:** Restrained destination header, day summary list, budget summary, accommodation-area context, draft label, warning list.
- **States:** New draft; returning trip; incomplete/over-budget draft; unavailable item warning; loading/failure.
- **Interactions:** Day summaries open the selected day. Changing trip-wide dates/traveler count/stay area requires impact review; owner-only settings follow role rules.
- **Mobile:** Compact header prioritizes plan content over decorative photography.
- **Desktop:** Summary and supporting stay/budget context, with no hotel-booking module.

## S09 — Plan / day-by-day timeline

- **Purpose:** Serve as the primary planning workspace.
- **Hierarchy:** Trip/day context → daily time/cost summary and warnings → ordered activities/transit/free time → Add activity.
- **Primary CTA:** Add activity for an empty day; contextual Review change while editing.
- **Secondary actions:** Select day; open Map; move/edit/replace/remove/lock an item; Budget; People; trip details.
- **Components:** Day selector, semantic timeline, activity cards, transit legs, free-time blocks, day summary, local tabs, status indicators.
- **States:** Populated; empty day; locked item; conflict; unavailable activity; over budget; proposal preview; unsaved; collaborator change; offline.
- **Interactions:** Drag and Move controls share the same proposal logic. Selection links to the map. Show action menus on focus/touch, not only hover. Preserve scroll on detail dismissal.
- **Mobile:** Timeline-first, short activity cards, explicit Move menu, map switch; complex editing opens full-screen.
- **Desktop:** Timeline beside map when space supports both; day header remains visible without covering focus.

## S10 — Map / route view

- **Purpose:** Make geography, route order, and travel tradeoffs understandable.
- **Hierarchy:** Active day and estimate disclaimer → scheduled markers/route → selected place → optional nearby suggestions.
- **Primary CTA:** View selected activity.
- **Secondary actions:** Fit day; All days; return to Timeline; toggle optional nearby places.
- **Components:** Illustrative map, numbered labeled markers, stay anchor, route segments, legend, zoom controls, accessible ordered place list.
- **States:** Loading/failure with list fallback; no activities; selection; preview route; unknown stay anchor; offline asset failure.
- **Interactions:** Marker selection synchronizes timeline; route lines do not promise navigational accuracy. Nearby places are unnumbered and visually separate.
- **Mobile:** Full main content area with compact selected-place sheet; tab/day controls remain accessible.
- **Desktop:** Companion pane shares selection with timeline. Explicit Fit day restores bounds after user panning.

## S11 — Place / activity detail

- **Purpose:** Help the traveler decide whether and how a place fits.
- **Hierarchy:** Place name/category/image → location, duration and estimated cost → trip-specific timing/constraints → description and provenance.
- **Primary CTA:** Add to trip for unscheduled places; Edit activity for scheduled visits.
- **Secondary actions:** Save/unsave; Move; Replace; Remove visit; inspect map location.
- **Components:** Image with fallback, factual metadata, estimate labels, saved toggle, activity-context panel, user-entered notes/reservation indicator.
- **States:** Saved/unsaved; scheduled/unscheduled; unknown hours; unavailable; image failure; viewer read-only.
- **Interactions:** Separate place facts from visit-specific details. An existing visit and another visit are separate explicit choices.
- **Mobile:** Detail sheet for brief inspection, expandable full-screen for long content; no nested modal stacks.
- **Desktop:** Drawer or secondary-pane replacement with clear close action and retained timeline context.

## S12 — Add / edit / move activity

- **Purpose:** Express a concrete planning change with accessible controls.
- **Hierarchy:** Activity identity → destination day/position or changed fields → time/cost basis → constraints.
- **Primary CTA:** Review change; Save for note/name-only changes.
- **Secondary actions:** Cancel; select a different place; explicit unlock when applicable.
- **Components:** Day and position selector, duration/time fields, fixed/flexible control, cost/basis fields, lock control, reservation-context note.
- **States:** New/edit/move; invalid value; locked; dirty; deleted remotely; permission removed; calculation failure.
- **Interactions:** Preview validates duration, times, availability and role. Cancel returns to origin. A locked field has an explanation rather than a mysterious disabled state.
- **Mobile:** Full-screen task with reachable actions and keyboard-aware scrolling.
- **Desktop:** Focused drawer/form; avoid burying input inside an oversized modal.

## S13 — Impact review / adaptive edit

- **Purpose:** Make the requested change and its consequences reviewable before commitment.
- **Hierarchy:** Requested change → blocking issues → before/after timing and costs for both days → optional improvements → assumptions.
- **Primary CTA:** Apply change; Apply with warning for soft warnings only.
- **Secondary actions:** Adjust placement; inspect affected activity; Discard; view why an effect occurred.
- **Components:** Change summary, source/destination day comparison, route preview, cost delta rows, explicit optional adjustment choices, status footer.
- **States:** Calculating; ready; hard conflict; soft warning; stale revision; failure; applying; success.
- **Interactions:** Optional changes update the preview only when selected. Apply is unavailable when calculating, stale, or blocked. Accepted views change atomically; success offers Undo.
- **Mobile:** Full-screen stacked before/after blocks with clear labels; do not compress two timelines side by side.
- **Desktop:** Wider comparison surface with both affected days and a compact impact summary; preserve legibility over dense metrics.

## S14 — Conflict resolution

- **Purpose:** Help the traveler make a feasible choice without unexplained automatic rescheduling.
- **Hierarchy:** Specific conflict/cause → protected constraint → alternatives and tradeoffs → revised preview.
- **Primary CTA:** Review selected resolution, then Apply when valid.
- **Secondary actions:** Choose manual placement; edit fixed constraint explicitly; Discard proposal.
- **Components:** Conflict interval, textual explanation, comparable option rows, affected-activity links.
- **States:** Fixed-event overlap; insufficient transit time; unavailable place; no feasible alternative; soft day-length warning; resolved.
- **Interactions:** Selecting an option recalculates; it never commits immediately. Constraint editing makes clear that external reservations remain unchanged.
- **Mobile:** One option per row; expandable details; protected event stays named in the summary.
- **Desktop:** Alternatives next to the relevant timeline segment; do not require map interpretation to resolve.

## S15 — Recommendation detail

- **Purpose:** Explain an optional suggestion and allow informed acceptance.
- **Hierarchy:** Proposed action → concrete reason → time/cost/location tradeoffs → assumptions.
- **Primary CTA:** Review suggestion.
- **Secondary actions:** Adjust; Dismiss; view place.
- **Components:** Suggestion card, Why this disclosure, impact estimates, alternative detail.
- **States:** New; dismissed; stale; unavailable; missing estimate; accepted.
- **Interactions:** Review enters S13. Dismiss changes no itinerary data. Do not introduce a general chat composer.
- **Mobile:** Inline compact card expands into a sheet/full task as needed.
- **Desktop:** Contextual panel near the affected activity or budget category.

## S16 — Trip budget

- **Purpose:** Explain expected group spending and decision consequences.
- **Hierarchy:** Target/estimate/remaining → scope and missing amounts → categories → day allocations → trip-level cost lines.
- **Primary CTA:** Review costs when over budget; otherwise contextual Edit cost on a selected line.
- **Secondary actions:** Owner edits target/scope; inspect activity; explore savings suggestion; return to Plan.
- **Components:** Money summary, labeled category bars with text/table equivalents, day rows, shared/per-person labels, contingency line, unknown-cost count.
- **States:** Within budget; exceeded; incomplete estimate; no priced items; viewer read-only; proposal values clearly labeled; save error.
- **Interactions:** Drill down without losing day context. Target editing does not alter planned costs. Sum of day allocations plus trip-level lines visibly reconciles to total.
- **Mobile:** Stacked summary and expandable cost lists; no wide accounting table required.
- **Desktop:** Summary beside detailed categories/day allocations; charts supplement rather than replace values.

## S17 — Discover / inspiration

- **Purpose:** Turn appealing destination content into usable saved places.
- **Hierarchy:** Destination/search → relevant filters → editorial collections and place results → save/add action.
- **Primary CTA:** Save place on results; open details for scheduling.
- **Secondary actions:** Search; filter by interest/cost/duration; clear filters; open Saved.
- **Components:** Search input, labeled filter controls, destination photography, place cards, result count.
- **States:** Curated default; results; no results; saved; loading; data failure; offline fixtures.
- **Interactions:** Functional filtering within declared mock coverage; no pretend universal web search. Save feedback stays on the card.
- **Mobile:** One/two-column cards based on readable width; filters open an accessible sheet.
- **Desktop:** Editorial collection layout with consistent metadata and stable reading order; avoid irregular masonry that breaks keyboard predictability.

## S18 — Saved places

- **Purpose:** Keep inspiration independent from scheduled activities.
- **Hierarchy:** Library/search → destination or trip filters → saved places → schedule status where relevant.
- **Primary CTA:** Add to trip on a selected place; Explore places when empty.
- **Secondary actions:** Open details; unsave; clear filters.
- **Components:** Place list/cards, saved toggle, filter controls, “Scheduled in…” text, trip picker.
- **States:** Empty; filtered empty; populated; already scheduled; unavailable place; local-save failure.
- **Interactions:** Unsave does not remove an itinerary visit. Scheduling opens day/position selection then impact review.
- **Mobile:** Compact list option for quick planning; full touch targets.
- **Desktop:** Scannable grid/list with contextual scheduling controls, not a separate planning workspace.

## S19 — Trip people / invite

- **Purpose:** Explain access and demonstrate small-group participation.
- **Hierarchy:** Members and roles → pending demo invitations → permission explanation → trip activity link.
- **Primary CTA:** Invite collaborator for owner.
- **Secondary actions:** Review activity; owner changes role/removes demo member/revokes pending invitation.
- **Components:** Member rows, role selector, simulated invite dialog, explicit demo disclosure, permission helper text.
- **States:** Solo; pending/accepted/declined/revoked demo invite; existing member; editor/viewer read-only; role changed.
- **Interactions:** Choose mock identity; Preview invite sends nothing. Removing a member requires a specific confirmation because it changes demo access. Owner cannot remove the sole owner.
- **Mobile:** Full-width member rows; role descriptions available beside selection.
- **Desktop:** Bounded people list with role explanation; avoid expanding into an administration console.

## S20 — Trip activity / collaborator change review

- **Purpose:** Show who changed the plan and support safe recovery.
- **Hierarchy:** Latest relevant changes → actor/action/time → affected items and diff → recovery action.
- **Primary CTA:** Review change; Recalculate my proposal when stale.
- **Secondary actions:** Open affected day; Undo eligible own change; choose intent on same-item conflict.
- **Components:** Chronological activity list, before/after detail, stale revision banner, local/remote comparison.
- **States:** No changes; new change; stale local proposal; same-item conflict; item deleted; undo requires review; permission removed.
- **Interactions:** Actor labels accompany avatars. A deleted item still has a meaningful historical summary. Undo follows latest-revision checks.
- **Mobile:** Change details open full-screen with clear return to the preserved draft.
- **Desktop:** Drawer/list with diff detail; background updates do not steal focus.

## S21 — Notifications / activity center

- **Purpose:** Surface actionable changes across trips without becoming a noisy feed.
- **Hierarchy:** Unread actionable changes → recent changes → read history.
- **Primary CTA:** Review the selected notification.
- **Secondary actions:** Mark read; open trip; dismiss informational notice.
- **Components:** Text-first notification rows, timestamps, trip/actor labels, read-state control, empty state.
- **States:** Empty; unread/read; target removed; local load failure; offline.
- **Interactions:** Opening links to the exact trip change and marks read. Repeated notices for one accepted edit are grouped. No browser push permission prompt in MVP.
- **Mobile:** Dedicated list reached from header; Back returns to origin.
- **Desktop:** Popover for recent items with a full-list option; keyboard focus management required.

## S22 — Profile / preferences

- **Purpose:** Maintain editable travel defaults and explain demo data storage.
- **Hierarchy:** Demo identity → travel defaults → optional dietary/mobility preferences → device-local data information.
- **Primary CTA:** Save preferences.
- **Secondary actions:** Cancel changes; clear optional preferences; reset demo data with specific confirmation.
- **Components:** Preference controls shared with onboarding, save status, demo explanation, reset dialog.
- **States:** Clean/dirty; saving/saved; validation or storage failure; reset confirmation.
- **Interactions:** Updated defaults apply to future trips. Applying them to an existing trip requires an explicit trip edit and impact review. Reset names what local data will be removed.
- **Mobile:** Stacked groups; destructive reset separated from normal save.
- **Desktop:** Narrow readable settings form; no account/security controls that imply unsupported services.

## State coverage cross-check

| Required state | Main demonstration surfaces |
| --- | --- |
| Loading / skeleton | S04, S07, S09, S10, S17 |
| Empty | S04, S09, S18, S20, S21 |
| Success | S07, S13, S18, S19, S22 |
| Error | S05, S07, S10, S12, S13, S22 |
| Offline | Shared shell; S09, S10, S17, S18 |
| Conflicting itinerary | S09, S13, S14 |
| Budget exceeded | S08, S09, S13, S16 |
| Unavailable activity | S09, S11, S14, S18 |
| AI suggestion | S09, S15, S16 |
| Unsaved changes | S05, S12, S13, S22 |
| Collaborator changes | S09, S13, S20, S21 |

## Suggested wireframe/prototype priority

First: S05–S06 → S07 → S09/S10 → S12 → S13/S14 → S16. Next: S11, S15, S18, S19/S20. Finally: supporting entry, discovery, activity center, and preferences. Every listed screen needs a credible bounded implementation, but the core edit journey should set the quality bar before supporting screens expand.
