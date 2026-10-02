# YATRA — User flows

Status: Proposed. These flows use the behavior contract in [UX_SPEC.md](UX_SPEC.md). “Saved” means locally saved on this device in the portfolio demo.

## Shared conventions

Every flow specifies entry, steps, alternate paths, and completion. A proposal is uncommitted until Apply. Cost/timing edits use impact review; all views update from one accepted revision. Mock authentication, AI, and collaboration are labeled as demonstrations.

## F01 — First-time onboarding

**Entry:** Public landing or first demo launch.

1. Traveler sees the product promise and a short visual example of an editable itinerary.
2. Selects “Try the demo” or opens the simulated sign-in entry.
3. Sees a short explanation of device-local data and simulated services.
4. Optionally chooses pace and interests; optional dietary/mobility preferences are collapsed and explained.
5. Reviews preferences and continues to Trips.

**Alternates:** Skip goes directly to Trips with editable defaults. Returning users skip onboarding. Demo sign-in uses a demo identity without real credentials. Invalid preference combinations show a specific field message. Back preserves entered preferences.

**Completion:** Home displays “Create a trip” and an optional sample trip. Onboarding is revisitable from Profile.

## F02 — Create a trip

**Entry:** Create action from Trips, or “Plan with this place” from place details.

1. Enter a natural-language brief or use structured fields.
2. Set destination, exact dates or flexible duration, travelers, budget, scope, and pace.
3. Optionally choose interests, stay area, preferred day hours, and saved places to include.
4. Review the interpreted brief. Example: Goa / four days / two travelers / ₹40,000 shared / relaxed / intercity transport excluded.
5. Correct assumptions and select “Generate itinerary.”

**Alternates:** Missing required data keeps the traveler in the brief and focuses the field. Unsupported destination/data coverage is explained before generation, with supported demo destinations offered; no silent substitution. Leaving dirty input offers keep/discard and preserves draft where possible.

**Completion:** A validated brief starts F03. No place has been booked.

## F03 — Generate an itinerary

**Entry:** Validated trip brief.

1. Show a structured generation state with the traveler’s destination and constraints.
2. Present named planning stages without fabricated numerical progress.
3. Produce a draft with day summaries, stay assumption, time/cost estimates, free time, and explicit warnings.
4. Traveler inspects the summary and chooses “Explore itinerary.”

**Alternates:** Cancel returns to preserved brief. Failure offers Retry or Edit brief. If constraints cannot be met, show a partial draft and explain tradeoffs; traveler may keep it as a draft with warnings. Unknown hours are labeled, not resolved by invented facts.

**Completion:** Locally saved trip opens Plan, Day 1, with “Draft generated” and assumptions accessible from the trip header.

## F04 — Manually edit an itinerary

**Entry:** Activity card or day “Add activity” control.

1. Choose edit, add, remove, replace, duration, or reorder.
2. Edit fields in a focused form. Show timing basis and cost basis explicitly.
3. For planning effects, select “Review change.”
4. Inspect affected activities, time, route, free time, and costs.
5. Apply or discard. Optional suggested adjustments remain unselected unless explicitly chosen.

**Alternates:** Notes/rename save directly. A locked item offers an explicit Unlock action before editing. Removing a user-marked reservation warns that YATRA does not cancel it externally. Validation failure preserves values. Recalculation failure preserves the proposal.

**Completion:** Accepted plan updates consistently, with a history entry and Undo. Removing an activity does not unsave its place.

## F05 — Move an activity between days (signature flow)

**Entry:** A flexible Day 1 café activity.

1. Drag it to Day 2 on desktop, or select Move → Day 2 → position on any device.
2. Show the destination placeholder and “Preview” state; retain access to the accepted plan.
3. Recalculate affected source/destination transit, flexible times, free time, and costs.
4. Show “Café moved to Day 2” plus before/after changes for both days. Explain any overall increase through the changed cost lines.
5. If a fixed-time conflict occurs, branch to F06. Otherwise select Apply or Discard.
6. After Apply, focus the moved item in Day 2; announce the result and offer Undo.

**Alternates:** Dropping in the original position is a no-op. Escape cancels a drag. Invalid drops do not change the plan and explain valid targets. A locked activity cannot start the move. Another accepted revision during review branches to F11. New nearby suggestions do not enter the itinerary until separately selected.

**Completion:** Exactly one instance has moved; source/destination totals and map reflect the same revision. The activity’s own fixed cost is not counted twice.

## F06 — Resolve a schedule conflict

**Entry:** An impact preview reports arrival after a fixed event starts.

1. Highlight the relevant activities and transit interval; explain the conflict numerically in text.
2. Offer feasible options: move the café earlier, move it to another day, remove it, or explicitly edit the fixed event.
3. Compare the selected option’s timing, travel, free-time, and cost effects.
4. Recalculate the proposal, preserving other locks and reservations.
5. Apply once hard conflicts are resolved; acknowledge any remaining soft warnings.

**Alternates:** If no feasible option exists, provide manual placement or discard. A fixed event cannot be shifted as an invisible side effect. A preferred day-end warning may be accepted with “Apply with warning”; an impossible overlap cannot.

**Completion:** The proposed arrangement becomes feasible or the accepted plan remains unchanged. An existing problematic plan can remain a draft; no false “All clear” status appears.

## F07 — Respond to a recommendation

**Entry:** Contextual suggestion near an activity/day or in budget review.

1. Read the proposed action, reason, assumptions, and affected costs/times.
2. Open “Why this?” or place details if needed.
3. Select Apply suggestion, Adjust, or Dismiss.
4. Apply suggestion opens the normal impact preview; accept only after reviewing downstream effects.

**Alternates:** Dismiss removes the suggestion from this context. Stale availability/plan revision prompts recalculation. A suggestion with unknown pricing labels the resulting total incomplete. Offline fixtures may still work; no live lookup is implied.

**Completion:** Accepted suggestion becomes a reversible plan edit, or the current plan remains unchanged.

## F08 — View and understand trip budget

**Entry:** Header estimate, day cost summary, or Budget tab.

1. See target, known estimate, remaining/overage, currency, traveler scope, and included categories.
2. Inspect category breakdown and day allocation, with trip-level lodging/contingency separate.
3. Select a cost line to inspect its activity or trip-level assumption.
4. Owner may edit target/scope; editors may edit activity costs through the normal review flow.
5. Return to the same day/activity in Plan.

**Alternates:** Missing costs show “Not estimated” and incomplete-total guidance. Over-budget state offers alternatives, not a forced budget increase. Changing target requires explicit save and does not alter actual planned costs. Viewer cannot edit.

**Completion:** Traveler understands what the total includes; any accepted change reconciles to the same trip revision.

## F09 — Save a discovered location

**Entry:** Discover feed/search or a place detail.

1. Browse curated destination content; search/filter within fixture coverage.
2. Open a place and see category, location, approximate duration, estimate, and data limitations.
3. Select Save; confirm saved status in place.
4. Optionally select Add to trip, choose trip/day/position, and review the scheduling impact.

**Alternates:** Saving the same place toggles unsave with clear state. Adding an already scheduled place offers “View existing visit” or explicit “Add another visit.” No trips exist → create a trip with this place retained as inspiration. No results → clear filters or change query.

**Completion:** Place is in Saved independently of whether it has a scheduled visit.

## F10 — Invite a collaborator (demo)

**Entry:** Trip owner opens People → Invite.

1. Read “Simulated invitation — nothing will be sent.”
2. Choose a mock person and Editor or Viewer role.
3. Review the role description and select “Preview invite.”
4. See a demo pending invitation in People.
5. Use an explicitly labeled simulation control to accept/decline the invitation.

**Alternates:** Already a member → show current role, do not duplicate. Owner may revoke a pending demo invitation. Editor/viewer sees role information but no invite control. A future real invite must introduce verified delivery and access checks before changing this flow.

**Completion:** Demo membership state changes with a visible activity entry; no external message or account is created.

## F11 — Collaborator edit and concurrent change

**Entry:** Demo Editor role, or explicitly simulated remote change during the owner's session.

1. Editor opens an activity and follows the same proposal/review rules.
2. Accepted edit records actor, affected items, and revision.
3. Owner sees a non-blocking “Aarav updated Day 2” banner and can review the change.
4. If the owner has an open proposal, its base revision is stale; disable Apply and retain the local proposal.
5. Compare accepted changes and local intent. Recalculate against the new revision.
6. If both edits affect the same activity, choose which intent to retain and review the resulting impact again.

**Alternates:** Deleted activity → re-add as a new visit or discard. Role changed to Viewer → preserve readable draft but block shared-plan mutation. Unrelated remote change still triggers recalculation before Apply, preventing inconsistent totals. Undo checks current revision rather than overwriting collaborator work.

**Completion:** One coherent accepted revision; actor-specific history explains the outcome.

## F12 — Recover from offline or unsaved work

**Entry:** Connection loss or local-save failure while planning.

1. Show connection or save status without obscuring the task.
2. Continue supported local edits; label what is preserved on this device.
3. If persistence fails, keep the in-memory plan and offer retry.
4. Before leaving, explain unsaved work and offer Keep editing or Discard where navigation supports it.

**Alternates:** A map/image fails → show text/list alternatives. A remote-dependent action is unavailable → explain why and preserve its input. Reconnection does not claim cloud synchronization in the demo.

**Completion:** Work is saved locally or the traveler knowingly discards it; no false success state.

## Cross-flow verification scenarios for the later prototype

- Create the sample trip using both text input and structured fields.
- Move the same café with drag, touch controls, and keyboard; outcomes must match.
- Use the exact cost reconciliation example in UX_SPEC and confirm both affected days and overall totals.
- Attempt a move into a fixed reservation; verify the blocker and all recovery paths.
- Accept a soft over-budget warning, then undo from history after the toast disappears.
- Reject a recommendation and confirm no plan changes.
- Simulate a collaborator edit while a local proposal is open; stale Apply must be unavailable.
- Save a place, schedule it, remove its visit, and confirm it remains Saved.
- Fail generation, map loading, and local persistence independently; verify preserved effort and honest status.
