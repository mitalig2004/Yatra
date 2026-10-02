"use client";
import { useState } from "react";
import {
  ArrowRight,
  Check,
  TriangleAlert,
  Clock3,
  Route,
  Info,
  Map,
  Leaf,
} from "lucide-react";
import { useTrip } from "./trip-provider";
import { Modal } from "./ui";
import {
  ACTIVITIES,
  DAY_INFO,
  changeImpact,
  money,
  time,
  duration,
} from "@/lib/planner";
export function MoveActivity({
  id,
  onClose,
  onReview,
}: {
  id: string;
  onClose: () => void;
  onReview: () => void;
}) {
  const { accepted, propose } = useTrip();
  const source = accepted.days.findIndex((d) => d.includes(id));
  const [target, setTarget] = useState(source === 0 ? 1 : 0),
    [position, setPosition] = useState(source === 0 ? 2 : 0);
  const items = accepted.days[target].filter(
    (x) => x !== id && !(id === "cafe" && x === "stroll"),
  );
  return (
    <Modal
      title="A change of scenery."
      eyebrow="MOVE ACTIVITY"
      onClose={onClose}
    >
      <div className="modal-body">
        <div className="moving-activity">
          <span className="category-icon">
            <Route size={22} />
          </span>
          <div>
            <strong>{ACTIVITIES[id].name}</strong>
            <p>
              Currently Day {source + 1} · {duration(ACTIVITIES[id].duration)} ·{" "}
              {money(ACTIVITIES[id].cost)} for two
            </p>
          </div>
        </div>
        <fieldset className="move-choice-group">
          <legend>Which day?</legend>
          <div className="move-day-options">
            {DAY_INFO.map((d, i) => (
              <label
                key={d.title}
                className={`move-day-option ${target === i ? "selected" : ""} ${source === i ? "is-current" : ""}`}
              >
                <input
                  type="radio"
                  name="destination-day"
                  value={i}
                  checked={target === i}
                  disabled={source === i}
                  onChange={() => {
                    setTarget(i);
                    setPosition(i === 1 && source === 0 ? 2 : 0);
                  }}
                />
                <span className="move-day-number">DAY {i + 1}</span>
                <strong>{d.title}</strong>
                <small>{d.area}</small>
                {source === i && <small>Current day</small>}
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset className="move-choice-group placement-group">
          <legend>Where in the day?</legend>
          <div className="position-options">
            {items.map((x, i) => (
              <label
                key={`${target}-${x}`}
                className={`position-option ${position === i ? "selected" : ""}`}
              >
                <input
                  type="radio"
                  name="day-position"
                  value={i}
                  checked={position === i}
                  onChange={() => setPosition(i)}
                />
                <span className="position-marker" aria-hidden="true" />
                <span>
                  <strong>Before {ACTIVITIES[x].name}</strong>
                  <small>{ACTIVITIES[x].area}</small>
                </span>
              </label>
            ))}
            <label
              className={`position-option ${position === items.length ? "selected" : ""}`}
            >
              <input
                type="radio"
                name="day-position"
                value={items.length}
                checked={position === items.length}
                onChange={() => setPosition(items.length)}
              />
              <span className="position-marker" aria-hidden="true" />
              <span>
                <strong>After the last activity</strong>
                <small>Keep the rest of the day unchanged</small>
              </span>
            </label>
          </div>
        </fieldset>
        <div className="quiet-note">
          <Info size={18} />
          <p>
            This creates a preview. We’ll check the route, timing and budget
            before anything changes.
          </p>
        </div>
      </div>
      <div className="modal-footer">
        <button className="button secondary" onClick={onClose}>
          Cancel
        </button>
        <button
          className="button primary"
          onClick={() => {
            propose(id, target, position);
            onReview();
          }}
        >
          Preview move <ArrowRight size={17} />
        </button>
      </div>
    </Modal>
  );
}
export function ImpactReview({
  onClose,
  onApplied,
  onAdjust,
}: {
  onClose: () => void;
  onApplied: () => void;
  onAdjust: () => void;
}) {
  const { accepted, proposal, propose, discard, apply, brief } = useTrip();
  if (!proposal) return null;
  const impact = changeImpact(accepted, proposal, brief.budget),
    before = impact.before,
    after = impact.after,
    conflicts = after.days.flatMap((d) => d.conflicts);
  const availabilityConflict = impact.warnings.find(
    (warning) => warning.kind === "opening-hours",
  );
  const hasBlockingConflict = conflicts.length > 0 || !!availabilityConflict;
  const transportDelta = impact.transportDelta;
  const moved = ACTIVITIES[proposal.activityId];
  const relevant = [...new Set([proposal.source, proposal.target])];
  const over = after.total > brief.budget;
  const isCafe = proposal.activityId === "cafe" && proposal.target === 1;
  return (
    <Modal
      title={
        hasBlockingConflict
          ? "A little overlap to untangle."
          : "A small move. The whole picture."
      }
      eyebrow="IMPACT REVIEW · PREVIEW ONLY"
      onClose={onClose}
      wide
    >
      <div className="impact-body">
        <section className="requested-change">
          <p className="eyebrow">01 / REQUESTED CHANGE</p>
          <div>
            <span className="category-icon">
              <Route size={22} />
            </span>
            <div>
              <h3>{moved.name}</h3>
              <p>
                Day {proposal.source + 1} <ArrowRight size={15} /> Day{" "}
                {proposal.target + 1} · {money(moved.cost)} moves with it
              </p>
            </div>
            <span className="status-tag">Not applied</span>
          </div>
        </section>
        {hasBlockingConflict && (
          <button
            className="conflict-jump"
            onClick={() => {
              const panel = document.getElementById("schedule-conflict");
              panel?.focus({ preventScroll: true });
              panel?.scrollIntoView({ block: "start", behavior: "instant" });
            }}
          >
            <TriangleAlert size={18} />
            <span>
              <strong>
                {conflicts.length
                  ? `You’re ${conflicts[0].late} minutes short`
                  : "This stop is outside its opening hours"}
              </strong>
              <span>See your alternatives before applying</span>
            </span>
            <ArrowRight size={18} />
          </button>
        )}
        <section className="impact-section">
          <p className="eyebrow">02 / CONSEQUENCES</p>
          <div className="impact-metrics">
          <div className="impact-ledger" aria-label="Before and after cost comparison">
            <div className="impact-ledger-column before">
              <span className="eyebrow">BEFORE</span>
              <dl>
                <div><dt>Day 1</dt><dd>{money(before.days[0].total)}</dd></div>
                <div><dt>Day 2</dt><dd>{money(before.days[1].total)}</dd></div>
                <div className="trip-line"><dt>Trip</dt><dd>{money(before.total)}</dd></div>
              </dl>
            </div>
            <ArrowRight className="impact-ledger-arrow" size={20} aria-hidden="true" />
            <div className="impact-ledger-column after">
              <span className="eyebrow">AFTER</span>
              <dl>
                <div><dt>Day 1</dt><dd>{money(after.days[0].total)}</dd></div>
                <div><dt>Day 2</dt><dd>{money(after.days[1].total)}</dd></div>
                <div className="trip-line"><dt>Trip</dt><dd>{money(after.total)}</dd></div>
              </dl>
            </div>
            <div className="cost-delta">
              <span className="eyebrow">NET EFFECT</span>
              <strong>{transportDelta >= 0 ? "+" : "−"}{money(Math.abs(transportDelta))} estimated transport</strong>
              <span>The ₹900 café moves between days. It is not added again.</span>
            </div>
          </div>
          <p className="impact-summary" aria-live="polite">
            <Info size={16} /> {impact.summary}
          </p>
          <div className="day-comparisons">
            {relevant.map((d) => (
              <div key={d}>
                <span className="eyebrow">
                  DAY {d + 1} ·{" "}
                  {d === proposal.source ? "SOURCE" : "DESTINATION"}
                </span>
                <strong>
                  {money(before.days[d].total)} <ArrowRight size={14} />{" "}
                  {money(after.days[d].total)}
                </strong>
                <p>
                  <Route size={14} /> {before.days[d].travel} →{" "}
                  {after.days[d].travel} min travel
                </p>
                <p>
                  <Clock3 size={14} /> {duration(before.days[d].free)} →{" "}
                  {duration(after.days[d].free)} free
                </p>
                <small>
                  Transport {money(before.days[d].transport)} →{" "}
                  {money(after.days[d].transport)}
                </small>
              </div>
            ))}
          </div>
          </div>
          <details className="timing-details">
            <summary>
              See Day {proposal.target + 1} timing in the preview
            </summary>
            <ol>
              {after.days[proposal.target].items.map((s) => (
                <li
                  key={s.activity.id}
                  className={
                    s.activity.id === proposal.activityId ? "moved-preview" : ""
                  }
                >
                  <span>
                    {time(s.start)}–{time(s.end)}
                  </span>
                  <strong>{s.activity.name}</strong>
                  {s.activity.fixed && <small>Fixed time</small>}
                  {s.activity.id === proposal.activityId && (
                    <small>Moved here</small>
                  )}
                </li>
              ))}
            </ol>
          </details>
          {conflicts.length > 0 ? (
            <div
              className="conflict-panel"
              role="alert"
              id="schedule-conflict"
              tabIndex={-1}
              aria-labelledby="conflict-title"
            >
              <div className="conflict-title">
                <TriangleAlert size={20} />
                <h3 id="conflict-title">You’re {conflicts[0].late} minutes short.</h3>
              </div>
              <p>
                Moving the café here means it ends at{" "}
                <strong>
                  {time(
                    after.days[proposal.target].items.find(
                      (s) => s.activity.id === proposal.activityId,
                    )!.end,
                  )}
                </strong>
                . The next leg takes{" "}
                <strong>
                  {conflicts[0].transit.minutes} minutes of travel
                </strong>
                , which would put you at your <strong>{time(conflicts[0].start)}</strong>{" "}
                reservation around <strong>{conflicts[0].late} minutes late</strong>.
                Your table stays fixed.
              </p>
              <div className="conflict-timing" aria-hidden="true">
                <div>
                  <span>Café ends</span>
                  <strong>5:00 pm</strong>
                </div>
                <span className="conflict-connector">20 min travel</span>
                <div>
                  <span>Reservation</span>
                  <strong>5:00 pm</strong>
                </div>
                <div className="conflict-result">
                  <span>Expected arrival</span>
                  <strong>~5:20 pm</strong>
                </div>
              </div>
              {isCafe && (
                <div className="conflict-options">
                  <button
                    className="recommended-resolution"
                    onClick={() =>
                      propose(proposal.activityId, 1, 1, proposal.plan.stroll)
                    }
                  >
                    <div>
                      <strong>Move café earlier <span>Recommended</span></strong>
                      <span>
                        11:45 am café · Lunch shifts to 1:45 pm · Table stays 5
                        pm
                      </span>
                      <small>Protects the reservation and keeps the move within budget.</small>
                    </div>
                    <ArrowRight size={18} />
                  </button>
                  <button
                    onClick={() => propose(proposal.activityId, 1, 3, false)}
                  >
                    <div>
                      <strong>Move café after the reservation</strong>
                      <span>
                        7 pm café · Shorter evening route · Table stays 5 pm
                      </span>
                    </div>
                    <ArrowRight size={18} />
                  </button>
                  <button onClick={() => propose(proposal.activityId, 2, 1, false)}>
                    <div>
                      <strong>Try another day</strong>
                      <span>Move coffee to Day 3 and recalculate that route</span>
                    </div>
                    <ArrowRight size={18} />
                  </button>
                  <button onClick={onAdjust}>
                    <div>
                      <strong>Adjust manually</strong>
                      <span>Choose a different day and exact position</span>
                    </div>
                    <ArrowRight size={18} />
                  </button>
                </div>
              )}
              <p className="small">
                Choose an alternative to recalculate this preview. Nothing is
                applied yet.
              </p>
            </div>
          ) : (
            <div
              className={`clear-status ${availabilityConflict ? "has-conflict" : ""}`}
              id={availabilityConflict ? "schedule-conflict" : undefined}
              tabIndex={availabilityConflict ? -1 : undefined}
            >
              {availabilityConflict ? (
                <>
                  <TriangleAlert size={18} />
                  <span>
                    <strong>This activity will not fit here.</strong>{" "}
                    {availabilityConflict.message}{" "}
                    <button className="text-link" onClick={onAdjust}>Choose another position</button>
                  </span>
                </>
              ) : (
                <>
                  <Check size={18} />
                  <span>
                    No schedule conflicts.{" "}
                    {isCafe
                      ? "Your 5 pm table stays exactly where it is."
                      : "Fixed times are protected."}
                  </span>
                </>
              )}
            </div>
          )}
        </section>
        <section className="impact-section optional-section">
          <p className="eyebrow">03 / OPTIONAL SUGGESTIONS</p>
          {isCafe && !hasBlockingConflict ? (
            <label className="optional-choice">
              <input
                type="checkbox"
                checked={proposal.plan.stroll}
                onChange={(e) =>
                  propose(
                    proposal.activityId,
                    proposal.target,
                    proposal.position,
                    e.target.checked,
                  )
                }
              />
              <Leaf size={20} />
              <span>
                <strong>A little walk around Assagao</strong>
                <span>Add a 20-minute stroll after coffee · ₹0 extra</span>
                <small>
                  Uses 20 minutes of free time. Only included if you choose it.
                </small>
              </span>
            </label>
          ) : (
            <p className="muted">
              Keep a little room to wander. No extra stops are included in this
              move.
            </p>
          )}
        </section>
        {over && (
          <p className="warning budget-warning">
            <TriangleAlert size={18} />
            This preview is {money(after.total - brief.budget)} over your shared
            budget.
          </p>
        )}
        <p className="small muted">
          Travel and prices are fixture estimates for two. This preview does not
          change an external reservation.
        </p>
      </div>
      <div className="modal-footer impact-footer">
        <div>
          <button
            className="text-link"
            onClick={() => {
              discard();
              onClose();
            }}
          >
            Discard proposal
          </button>
          <button className="text-link" onClick={onClose}>
            <Map size={16} /> Inspect on map
          </button>
        </div>
        <button
          className="button primary"
          disabled={hasBlockingConflict}
          onClick={() => {
            apply();
            onApplied();
          }}
        >
          {hasBlockingConflict
            ? "Choose a resolution"
            : over
              ? "Apply with warning"
              : "Apply change"}
          {!hasBlockingConflict && <Check size={17} />}
        </button>
      </div>
    </Modal>
  );
}
