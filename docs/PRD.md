# YATRA — Product requirements

Status: Proposed for Mitali Giri's review. Documentation only; implementation is not authorized by this document.

## 1. Product vision

YATRA turns travel inspiration, preferences, places, time, and money into a visual plan people can confidently change. Its core promise is: **Make a trip your own, without rebuilding it every time something changes.**

The flagship portfolio experience follows two people planning a relaxed four-day Goa trip within a ₹40,000 shared budget. The product should make the consequences of an edit understandable through an interconnected itinerary, map, and budget.

This is a proposed product architecture, not a record of completed user research or a claim of market validation. The case study must distinguish hypotheses, prototype behavior, and any subsequently observed findings.

## 2. Problem statement

Independent leisure travelers collect inspiration across social posts, maps, blogs, booking sites, notes, and chats. Turning that material into a realistic itinerary requires reconciling distance, timing, cost, availability, and different people's preferences. Changes then create more coordination work because the sources do not share a common plan.

The central problem is maintaining a feasible, understandable plan as decisions change. Discovery alone does not solve it.

### Hypothesized pain points

- Saved places lack trip context: when to visit, what they cost, and what is nearby.
- An attractive list of places can hide an exhausting travel schedule.
- Travelers cannot easily see whether a budget is for one person, the group, or only selected expenses.
- A moved activity can invalidate timings or reservations elsewhere in the day.
- Group chats preserve discussion but obscure the latest agreed plan.
- Automatically rewritten itineraries may remove deliberate choices and weaken trust.

Validate these hypotheses with interviews about recent real trips and usability tasks; do not present them as research findings.

## 3. Target users and jobs to be done

Primary users: independently planning leisure travelers, approximately 22–35, often traveling with a partner or small group. Age is context, not an eligibility restriction. They value visual inspiration, budget clarity, and flexibility, and may begin planning on a phone before refining on a larger screen.

| Situation | Job | Desired outcome |
| --- | --- | --- |
| I have scattered inspiration | Bring the places I care about into one plan | Avoid losing ideas or repeatedly searching |
| I know my budget and travel style | Turn my constraints into a feasible first draft | Start making decisions rather than formatting a schedule |
| My preferences change | Move, replace, or remove one item and understand the consequences | Keep the rest of my intentional choices |
| A day feels too busy | Compare alternatives in time, distance, and cost | Choose a comfortable day |
| My friends contribute | Know what changed, who changed it, and what needs agreement | Maintain one understandable plan |

Secondary context: a collaborator who contributes occasional suggestions without owning the entire plan. Excluded from initial targeting: professional travel agents, large tour groups, complex business travel, and flight-disruption management.

## 4. Value proposition

An editable visual itinerary that connects where you go, when you go, and what you expect to spend. YATRA explains downstream impacts and offers reversible options. The traveler decides which tradeoffs to accept.

## 5. Goals and non-goals

### Goals

1. Help a traveler reach a credible first draft with limited setup.
2. Make one consequential edit easier than regenerating an entire trip.
3. Keep schedule, map, and estimated budget consistent after each accepted change.
4. Explain uncertainty and distinguish estimates from verified facts.
5. Support small-group contributions without obscuring ownership or conflicts.
6. Demonstrate Mitali Giri's product reasoning, interaction design, responsive design, accessibility, and complex state handling in a polished portfolio prototype.

### Non-goals

- Flight/hotel search, checkout, ticketing, booking management, or payment processing.
- Guaranteed opening hours, live availability, live traffic, or confirmed reservations.
- A general-purpose conversational assistant.
- Automatic whole-trip optimization without traveler consent.
- Expense settlement, reimbursement, or currency conversion.
- Production authentication, realtime synchronization, or AI infrastructure in the portfolio MVP.

## 6. Product principles

| Principle | Product consequence |
| --- | --- |
| Visual before textual | Use timelines, route relationships, photography, and compact impact comparisons; retain text equivalents |
| Exploration feels enjoyable | Allow saving without committing a place to the schedule |
| Explainable assistance | Show evidence, assumptions, and alternatives beside suggestions |
| Traveler control | Keep hard constraints and locked activities; require approval for indirect schedule changes |
| Complex planning feels simple | Reveal route and timing detail only where decisions require it |
| Connected representations | One trip revision powers itinerary, map, and estimated budget |
| Editing before regeneration | Put move, replace, duration, and undo actions close to each activity |
| Mobile-first responsiveness | Preserve all core tasks on a phone; use larger screens for simultaneous views |
| Accessible by design | Provide non-drag editing, semantic timelines, and non-map alternatives |
| Purpose-built AI | Use contextual suggestions and impact previews rather than a chat-first layout |

## 7. Feature and scope decisions

### MVP: one complete, demonstrable planning loop

| Area | Required depth | Acceptance condition |
| --- | --- | --- |
| Landing and demo entry | Explain the product through an edit example | A visitor can enter a clearly labeled demo without an account |
| Preferences | Optional pace, interests, mobility and dietary preferences | Skip and edit later; sensitive preferences are never inferred |
| Home | Trips, recent work, clear create action | Empty state leads directly into trip creation |
| Trip brief | Destination, dates or flexible duration, travelers, budget scope, pace, interests, stay area | A structured summary exposes all interpreted values before generation |
| Generation | Staged loading, cancel, recoverable failure | Inputs survive cancellation and retry |
| Itinerary | Four-day fixture with free time, transit, estimates, stay context | Every day is navigable and editable |
| Adaptive editing | Move, reorder, duration, remove, replace, add, lock, undo | Cross-day move produces explainable before/after effects and consistent accepted totals |
| Map | Select markers, inspect route order, focus current day | Selection links to the same itinerary activity, including keyboard alternatives |
| Budget | Group estimate, categories, day totals, contingency and excluded costs | Moving a fixed-cost item changes day allocation, not its total trip cost |
| Discovery and saved places | Curated searchable fixtures, filters, save and add | A saved place can be scheduled without losing its saved status |
| Collaboration | Roles, mock invite, simulated remote edits and revision conflict | Demonstration never implies a real invite was delivered |
| Activity and preferences | Changes, unread status, editable defaults | Changes link to the affected item or explain its removal |
| State coverage | Error, offline, unavailable, conflicting, over-budget, stale proposal | Each critical state has a recovery path |

The areas above do not all require equally extensive standalone products. The trip workspace is the primary investment. Authentication, discovery, notifications, and profile are deliberately bounded supporting experiences. Screen contracts are in [SCREEN_REQUIREMENTS.md](SCREEN_REQUIREMENTS.md).

### Future scope

- Verified places/hours and routing providers, with freshness and provenance.
- Real accounts, sharing permissions, realtime collaboration, server persistence, and secure invite lifecycle.
- Link imports from external inspiration sources where permissions and extraction are feasible.
- Multi-destination planning, multiple currencies, richer accessibility information, and offline travel access.
- Reservation integrations, weather-aware alternatives, personal recommendation learning, and actual expense tracking.

These additions require validation and infrastructure; they must not appear as working prototype capabilities.

## 8. Planning and data contract

- A trip owns dates or numbered days, a destination, timezone, traveler count, currency, target budget, included categories, stay area, preferences, activities, and a revision number.
- An activity instance has an identity separate from its place. The same place can be visited twice only through an explicit duplicate action.
- Activity timing includes duration and either a flexible window or a fixed start. Status can include locked, unavailable, or user-marked reservation. A reservation label is user-provided context, never booking verification.
- Transit legs and daily aggregates are derived from ordered activity instances. A place's saved status belongs to the traveler's library, not to its position in a trip.
- A proposed edit references a base revision, affected days, requested change, derived effects, optional adjustments, warnings, and a reversible change record.
- Cost lines have category, scope, quantity, day allocation, and provenance. Store monetary values in minor units when implemented; format them in the UI.
- All accepted views read one revision. Do not update a displayed budget independently of the itinerary that generated it.

## 9. Success metrics and validation

Targets below are proposed prototype acceptance thresholds, not current performance or statistically validated business forecasts.

| Outcome | Measure | Proposed target / method |
| --- | --- | --- |
| First-draft usability | Participant can create and find their itinerary without moderator rescue | At least 4 of 5 initial formative participants |
| Core edit usability | Move an activity and complete impact review | At least 4 of 5, using both touch and desktop tasks |
| Explainability | Participant correctly describes timing, day-cost, and total-cost effects | At least 4 of 5; ask open-ended questions after a move |
| Control and recovery | Participant rejects a suggestion and undoes an accepted change | All participants have an available recovery path; inspect failure causes |
| Budget comprehension | Participant identifies group scope and excluded costs | At least 4 of 5 |
| Accessibility | Core create/edit/conflict flow with keyboard and screen reader | No blocking issues in manual audit; automated checks are supplementary |
| Prototype credibility | Estimates and simulated collaboration are understood | No participant believes an external booking/invite actually occurred |

Recruit approximately 5–8 relevant travelers for a first formative round, then iterate. Ask participants to show how they planned a recent trip, where changes occurred, and what they used to coordinate. Test confidence and comprehension alongside task completion. Small samples guide design changes; they do not establish population-level conversion rates.

Future instrumentable events: trip_brief_reviewed, generation_completed/failed, proposal_opened/applied/discarded/stale, conflict_resolved, edit_undone, budget_viewed, place_saved, collaborator_change_reviewed. Avoid logging free-text trip briefs or sensitive preferences. Future product indicators include returning to edit a draft, proportion of suggestions accepted then undone, and unresolved conflicts before travel; define baselines after real usage.

## 10. Assumptions requiring owner approval

1. The portfolio hero journey is domestic Goa travel, INR, two travelers, four days; the product architecture remains destination-neutral.
2. ₹40,000 means a shared trip budget including lodging, local transport, activities, and food. Travel to/from Goa is excluded by default and explicitly visible. The user can change scope before generation.
3. Flexible dates produce Day 1–4 and cannot claim date-specific opening hours. Exact dates use destination-local time.
4. A clearly labeled, local demo with simulated accounts/AI/collaboration is sufficient; no backend, paid APIs, or actual messages are necessary.
5. A functional illustrative map with fixture coordinates and routes is acceptable for the prototype. It must say that travel times/routes are estimates and not turn-by-turn navigation.
6. English and INR are the initial presentation scope; localization is future work.
7. Profile preferences are optional, and only explicitly supplied trip-relevant preferences shape the demo.

## 11. Constraints and risks

- Eventual stack: Next.js, TypeScript, Tailwind CSS, reusable React components, Lucide icons, and Framer Motion for meaningful transitions. This phase creates no application code.
- Use deterministic mock planning behavior and realistic fixture data, including a known conflict and budget-warning scenario. Do not promise geographic or availability accuracy.
- Costs, travel times, and suggestions need visible estimate labels and assumptions. Photographs need usable rights and attribution where required; source selection happens before implementation.
- The initial request spans seventeen product areas. Equal treatment would dilute the signature interaction; prioritize the workspace and its complete recovery paths.
- Frontend persistence is device/browser-local and can be cleared. The product must not imply cloud sync or full offline travel reliability.
- Avoid unsolicited personal-data collection. Dietary/mobility preferences should be editable, skippable, and removable.

## 12. Definition of readiness

Before implementation, approve the assumptions above, establish an internally consistent four-day fixture, confirm reservation/locking behavior and budget accounting, and wireframe the core move/conflict flow at mobile and desktop widths. The interaction and visual foundation in the companion documents is a proposal to review, not user approval to start coding.
