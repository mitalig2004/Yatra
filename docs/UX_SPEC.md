# YATRA — UX architecture and behavior

Status: Proposed. Read with [PRD.md](PRD.md), [USER_FLOWS.md](USER_FLOWS.md), and [SCREEN_REQUIREMENTS.md](SCREEN_REQUIREMENTS.md).

## 1. Experience principles

The itinerary is the main working surface. Maps explain spatial relationships; budget explains financial consequences; recommendations appear where a decision is being made. The product should feel like planning a trip, not operating an analytics dashboard.

- Show the current plan before asking for another prompt.
- Use progressive disclosure: day summary first, activity detail second, assumptions on demand.
- Preserve effort: inputs survive errors, canceled proposals preserve the accepted plan, and saved inspiration remains available after an activity is removed.
- Distinguish a direct user edit, its mechanical consequences, and additional suggested changes.
- Prefer plain explanations: “This adds about 20 minutes of travel” rather than an unexplained optimization score.

## 2. Information architecture

| Level | Destination | Children / surfaces |
| --- | --- | --- |
| Public | Product introduction | Demo entry, sign-in entry |
| Personal | Trips | Empty state, trip cards, create trip |
| Personal | Discover | Search/filter results, place detail |
| Personal | Saved | Saved places, trip association filter, place detail |
| Personal | Profile | Travel defaults, demo/persistence information |
| Contextual | Activity center | Personal notices and trip changes |
| Trip | Overview | Dates, travelers, stay context, budget summary, resume day |
| Trip | Plan workspace | Day timeline, map, activity details, move/add/replace actions |
| Trip | Budget | Categories, day allocation, scope and estimates |
| Trip | People & activity | Roles, invitation demo, change history |
| Task | Trip creation | Brief, structured review, generation, recoverable failure |
| Task | Edit review | Impact preview, conflict resolution, apply/discard |

Activity details, suggestions, edit review, and invitations are contextual surfaces, not global navigation destinations. Give place/trip/day selections stable navigation state so Back returns to the prior context and scroll position.

### Core object relationships

Traveler → preferences and saved places. Trip → days, people, budget definition, and revision history. Day → ordered activity instances and derived transit legs. Activity instance → place, timing, cost, constraints. Proposal → one base revision and changes. Notifications → the corresponding trip/change, not a duplicate data record.

## 3. Navigation model

Mobile global navigation: Trips, Discover, Saved, Profile. Activity is a labeled header control with an unread count. Within a trip, use local Plan, Budget, and People tabs; Overview is reached through the trip title/details action. Plan contains a Timeline/Map view switch and a horizontally scrollable day selector.

Desktop: restrained global navigation, persistent trip context, local Plan/Budget/People tabs. Plan normally shows timeline and map side by side. The day selector changes the active day in both.

Do not stack two fixed bottom navigation bars. Trip workspaces replace the global bottom bar with local navigation and an explicit “Back to trips” action. A task-focused full-screen editor replaces local navigation until saved/discarded. Browser Back dismisses the top contextual surface before leaving the trip.

## 4. Brief and generation

Natural-language input is an optional shortcut into structured fields, not the entire interface. A traveler can enter the sample Goa request or use destination, dates/duration, traveler count, budget, interests, and pace controls directly.

Before generating, show “Your trip brief” with editable interpreted values, missing required fields, budget scope, stay area, and unknown assumptions. Do not silently infer departure city, exact travel dates, accessibility needs, reservation status, or accommodation price.

Required: destination, dates or duration, traveler count, budget amount/scope, and pace. Interests and stay area are optional; unknown stay area is an explicit assumption used for route estimates. Defaults must remain editable.

Generation uses named phases such as “Arranging your days” and “Checking time and budget.” Show indeterminate progress without fabricated completion percentages. Cancel returns to the preserved brief. The generated result is a draft, accompanied by a concise assumptions summary and actionable warnings. If constraints cannot be met, return a partial draft and choices to reduce activities, change stay assumptions, or revise budget; never pretend feasibility.

## 5. AI interaction model

Each suggestion has: proposed action, reason, affected items/days, timing and cost differences, assumptions/provenance, and Apply / Adjust / Dismiss controls. “Why this?” reveals the explanation without dominating the plan.

Distinguish:

- **Given:** traveler preferences, entered reservation, selected budget.
- **Estimated:** travel durations and costs, with an explanation of the fixture assumptions.
- **Unknown:** actual availability, current opening hours, and unprovided stay location.
- **Suggested:** an optional alteration awaiting approval.

Avoid invented numerical confidence scores. Use relevant uncertainty statements such as “Travel time is estimated; traffic is not included.” Demo explanations arise from deterministic rules, not claims of live research.

Rejecting a recommendation leaves the plan intact and removes that suggestion from the current context. It does not silently train a persistent preference. Changes to defaults require an explicit preference action.

## 6. Editing contract and signature interaction

### Direct edit versus additional changes

Rename/note changes can save directly. Changes to timing, sequence, day, duration, place, cost, or constraints open an impact review. This consistent review step is intentional for the portfolio MVP; a later product may streamline low-impact edits after testing.

Dragging is an enhancement. Every activity has a visible Move action with destination day and position controls, plus Move earlier/later actions. Touch users can operate these without long presses.

### Proposal lifecycle

Accepted plan → local proposal → calculation → impact review → apply or discard → accepted plan with a new revision.

Error returns to the same proposal with Retry/Discard. A collaborator revision makes the proposal stale; applying is blocked until recalculated and reviewed. An unresolved hard constraint blocks Apply. A soft warning allows “Apply with warning” after the user reviews it.

### Cross-day move sequence

1. Capture the requested item, source day, destination day/position, and current revision.
2. Show a temporary placeholder at the destination and label the view “Preview.” Keep accepted totals distinct from preview totals.
3. Recalculate transit legs around the source gap and destination insertion, arrival times, free time, daily allocations, and overall estimates. Suggestions for nearby alternatives appear after the impact summary, never as automatically inserted activities.
4. Preserve user order by default. A more efficient order is a separately described optional suggestion. Preserve fixed times, locks, reservations, and activity durations.
5. Shift flexible start times only in the preview and list every affected activity. Shift nothing in the accepted plan until approval.
6. Present requested change, derived consequences, additional optional adjustments, warnings, and the resulting day summaries. Show both source and destination days.
7. Apply the reviewed version atomically. Timeline, map, budget, and activity history update together. Announce success and offer Undo.
8. Discard restores the accepted presentation and previous selection. Focus returns to the moved activity or its original action.

### Constraint policy

| Constraint | Treatment | Recovery |
| --- | --- | --- |
| Locked activity | Cannot be moved or changed indirectly | Explicit unlock action before editing |
| User-entered fixed time/reservation | Keep start and duration; never silently reschedule | Move another activity or explicitly edit the constraint; state that no reservation is changed externally |
| Two fixed activities overlap | Hard blocker for that proposed arrangement | Change placement or explicitly edit one fixed time |
| Known fixture closure / unavailable activity | Hard blocker to inserting it | Keep as saved inspiration, remove, or choose an alternative |
| Hours unknown | Uncertainty warning | Continue with estimate; prompt external verification before travel |
| Travel cannot fit between fixed events | Hard blocker | Remove/replace/reorder flexible items or change the fixed event explicitly |
| Day extends beyond preferred hours | Soft warning | Apply with warning, shorten, or move an activity |
| Too little free time for selected pace | Soft warning | Accept busier day or choose a less crowded plan |
| Estimated budget exceeds target | Soft warning | Apply with warning, lower cost, or explicitly revise target |

Free-time blocks are derived gaps within preferred day hours. Users can create a locked rest block when it must be preserved. Each day uses the stay area as its assumed start/end anchor; show when that location is approximate. Overnight activities must show their end date/“next day” label; MVP fixtures avoid complex overnight scheduling, but inputs cannot silently roll over.

### Cost semantics: example acceptance fixture

Illustrative fixture, not a live Goa quote: accepted estimate ₹37,600, target ₹40,000, remaining ₹2,400. Day 1 has ₹5,400 in day-allocated costs; Day 2 has ₹6,000. Moving a ₹900 café visit removes ₹900 from Day 1 and adds ₹900 to Day 2. Recomputed transit adds ₹100 on Day 1 and ₹300 on Day 2. Proposed day totals are ₹4,600 and ₹7,200. Overall estimate becomes ₹38,000, remaining ₹2,000. The other day allocations and trip-level costs are unchanged.

Explain the total increase as “₹400 more estimated transport,” not as a new ₹900 café expense. Nearby recommendations carry their own optional deltas and are excluded until accepted.

### Undo, persistence, and unsaved changes

An accepted edit saves locally in the demo and creates a history entry. Show “Saved on this device,” never “Synced.” Undo is available from a transient confirmation and persistent activity history; the short-lived toast is not the only recovery route.

Undo creates an inverse proposal against the latest revision. If nothing relevant changed, it can restore immediately; if subsequent edits conflict, show a review rather than overwriting them. Local proposals and accepted data have separate storage. Leaving a dirty form offers Keep editing / Discard / Save where applicable. Leaving an impact preview offers Keep editing / Discard; Apply still follows validation. Browser navigation should preserve drafts where confirmation cannot reliably be shown.

## 7. Map and timeline relationship

- Selected trip day, activity identity, and plan revision are shared across views.
- Selecting an activity highlights its numbered map marker; selecting a marker highlights and reveals its timeline item.
- Desktop selection pans only as much as needed to reveal the marker. Do not repeatedly reset user zoom on hover or minor updates.
- An explicit “Fit day” restores route bounds. “All days” is a map overview mode with a clear return to the active day.
- On mobile, switching Timeline/Map preserves the selected day and item. Marker detail opens a compact sheet with a route back to the activity.
- Differentiate transit, activity, and stay markers with shape/label, not color alone. Nearby suggestions are visually distinct from scheduled stops and excluded from route numbering.
- If map assets fail, retain timeline, location labels, transit estimates, and an accessible ordered place list.
- A preview route is labeled and visually differentiated from the accepted route. Never suggest an illustrative line is road-accurate navigation.

## 8. Budget UX

Budget is **estimated planned spending**, not actual expenses or payments. Always show currency, traveler scope, included/excluded categories, and last plan revision/estimate context.

Total = all scheduled cost lines + trip-level cost lines + explicit contingency. Daily totals are day-allocated lines only. Show trip-level lodging/contingency separately with a reconciliation: sum of days + trip-level costs = total. Do not count lodging twice. Default entered per-person costs multiply by traveler count; shared prices multiply by quantity only. Controls must make the basis visible.

Remaining = target − estimate. A negative value is “Over budget by …,” not an ambiguous red remaining value. Editing the target never changes planned costs. Costs without a known amount are “Not estimated,” not ₹0; the displayed total is then a “Known estimate” with a count of missing amounts.

Daily totals are informational allocations, not enforced daily allowances. Trip-level warning appears persistently but does not prevent planning. Cost-saving alternatives show what is traded off, and never replace an activity without acceptance.

## 9. Collaboration UX

| Role | Permissions |
| --- | --- |
| Owner | Edit plan; change budget/trip settings; invite, change roles, remove members |
| Editor | Edit activities and propose/apply itinerary changes; view budget; cannot manage people or trip target/scope |
| Viewer | View trip/budget/activity and save places to their own library; cannot edit the shared plan |

MVP invitations are simulated. A demo dialog chooses a mock person and role and shows “Preview invite”; success says “Demo invite created — nothing sent.” Do not request real email addresses or imply a public share URL works. Production link expiry, revocation, authentication, and access checks are future requirements.

Presence is secondary to change clarity. Activity entries show actor, action, time, affected day, and change detail. Accepted remote edits update all views together and surface a review banner. Do not steal focus or move the viewport while the user is reading.

If a collaborator edits while a local proposal is open, show “The plan changed while you were editing.” Preserve the proposal, block stale Apply, offer Compare and Recalculate. If both changed the same item, require an explicit choice; if the item was deleted, offer to re-add as a new activity or discard. Permission removal cancels write authority while preserving a readable local draft. The frontend demo illustrates these rules; it provides no actual security boundary.

## 10. State and recovery model

| State | Presentation | Recovery / behavior |
| --- | --- | --- |
| Initial loading | Layout-matched skeletons, one accessible loading label | Keep structure stable and avoid decorative shimmer with reduced motion |
| Generation | Named phases and preserved brief | Cancel or retry without re-entering inputs |
| Recalculation | Preview remains visible; Apply disabled | Cancel; timeout transitions to explicit Retry/Discard |
| Empty | Contextual explanation and one useful next step | Create trip, save place, add activity, or clear filters |
| Success | Inline saved state plus optional polite toast | Undo where meaningful; no focus-stealing modal |
| Invalid input | Field-level message plus summary on submit | Preserve values; focus first error |
| Failure | Local error scoped to failed operation | Retry and fallback; do not blank the whole workspace |
| Offline | Persistent unobtrusive banner | Retain local plan and deterministic edits; remote-dependent actions explain unavailability |
| Storage failure | “Changes are not saved on this device” | Keep in-memory work, retry, warn before leaving |
| Conflict | Inline affected interval plus review summary | Explain cause and compare feasible alternatives |
| Over budget | Amount over target and source categories | Review costs or explicitly edit target |
| Unavailable place | Status on activity and relevant details | Remove/replace; preserve contextual notes |
| AI suggestion | Optional labeled proposal with rationale | Apply, adjust, dismiss |
| Unsaved draft | Persistent draft indicator | Keep editing, save/review, or discard |
| Collaborator change | Actor-specific banner and history item | Review diff; recompute stale local proposal |

Previously loaded fixture plans may work offline through local data. Do not promise the app can be first-opened offline or has cached images/map assets without implementing and verifying that behavior later.

## 11. Accessibility requirements

Target WCAG 2.2 AA, verified during implementation through automated and manual testing. Use semantic headings, landmarks, forms, ordered itinerary lists, and explicit button labels. All core tasks must work with keyboard, screen reader, touch, and without maps or drag gestures.

Provide visible focus, logical DOM reading order, skip links, text equivalents for cost/time deltas, and status labels in addition to color. Aim for 44 × 44 CSS pixel touch targets; do not fall below applicable AA minimum target requirements. Meet 4.5:1 contrast for normal text, 3:1 for large text and meaningful UI boundaries. Validate chosen color combinations rather than assuming token names ensure contrast.

Dialogs/sheets announce their name, trap focus only while modal, support Escape where safe, and restore focus. Dirty-state Escape opens the same discard choice. Sticky controls must not obscure focused fields. Changes use concise polite live announcements; do not announce every map movement or skeleton. Hard submission errors may use assertive announcements sparingly.

Support 200% text zoom and reflow at 320 CSS pixels without loss of tasks. Day selectors may scroll horizontally; provide visible active state and keyboard access. Reduced-motion preferences remove spatial transitions and shimmer. Photographs use useful alt text when informative and empty alt text when decorative.

## 12. Responsive behavior

Content-driven layout bands: compact below 768px; medium 768–1199px; wide at 1200px and above. These are initial test points, not device assumptions.

- Compact: one primary surface, timeline/map switch, sticky day context, full-screen complex editing, concise impact summary followed by details. Long titles wrap.
- Medium: timeline or map remains dominant; optional collapsible companion map if space permits. Do not force narrow dual panes.
- Wide: timeline/map split with draggable-independent, bounded panes; details replace the secondary pane or open a drawer without compressing the timeline below a readable width.
- All: preserve task state when resizing/rotating. Scrolling a pane must not trap keyboard users. Primary Apply action remains reachable while full impact detail stays inspectable.
