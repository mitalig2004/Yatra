"use client";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Info,
  Undo2,
  Home,
  Utensils,
  Route,
  Ticket,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import { useTrip } from "./trip-provider";
import { TripNav, Notice } from "./ui";
import {
  ACTIVITIES,
  CONTINGENCY,
  DAY_INFO,
  LODGING,
  money,
  totals,
} from "@/lib/planner";
export function Budget() {
  const { accepted, brief, setDay, history, undo, proposal } = useTrip();
  const t = totals(accepted),
    remaining = brief.budget - t.total,
    latestChange = history.at(-1);
  const ids = accepted.days.flat();
  const food = ids.reduce(
    (s, id) =>
      s +
      (["Food", "Café", "Nightlife"].includes(ACTIVITIES[id].category)
        ? ACTIVITIES[id].cost
        : 0),
    0,
  );
  const experiences = ids.reduce(
    (s, id) =>
      s +
      (!["Food", "Café", "Nightlife"].includes(ACTIVITIES[id].category)
        ? ACTIVITIES[id].cost
        : 0),
    0,
  );
  const categories = [
    {
      label: "Your stay",
      note: "3 nights around Assagao",
      value: LODGING,
      icon: Home,
      color: "sand",
    },
    {
      label: "Food & good evenings",
      note: "Meals, cafés and a live-music evening",
      value: food,
      icon: Utensils,
      color: "green",
    },
    {
      label: "Getting around",
      note: "All estimated local transit legs",
      value: t.transport,
      icon: Route,
      color: "blue",
    },
    {
      label: "Experiences & little finds",
      note: "Activities and shopping allowances",
      value: experiences,
      icon: Ticket,
      color: "clay",
    },
    {
      label: "A little breathing room",
      note: "Trip-level contingency",
      value: CONTINGENCY,
      icon: ShieldCheck,
      color: "light",
    },
  ];
  return (
    <main id="main" className="budget-page" data-revision={accepted.revision}>
      <Link href="/trip/goa/plan" className="back-link">
        <ArrowLeft size={16} /> Back to plan
      </Link>
      <div className="budget-heading">
        <div>
          <p className="eyebrow">GOA · FOUR DAYS · TWO PEOPLE</p>
          <h1>
            More memories.
            <br />
            <em>Fewer surprises.</em>
          </h1>
        </div>
        <p>
          A clear picture of what you’re planning to spend.
          <br />
          One shared budget, with room for the unexpected.
        </p>
      </div>
      <TripNav active="budget" />
      {proposal && (
        <div className="preview-banner">
          <span>
            These are your accepted costs. A move is still in preview.
          </span>
          <Link href="/trip/goa/plan" className="text-link">
            Review proposal <ArrowRight size={16} />
          </Link>
        </div>
      )}
      <div className="budget-layout">
        <section>
          <div className="budget-headline">
            <span className="eyebrow">TOTAL ESTIMATED SPEND</span>
            <div>
              <strong data-testid="budget-total">{money(t.total)}</strong>
              <span>of {money(brief.budget)} shared budget</span>
            </div>
            <div className="stacked-budget" aria-hidden="true">
              {categories.map((c) => (
                <span
                  className={c.color}
                  key={c.label}
                  style={{ width: `${(c.value / brief.budget) * 100}%` }}
                />
              ))}
            </div>
            <p className={remaining < 0 ? "over-budget" : "budget-remaining"}>
              {remaining < 0 ? (
                <TriangleAlert size={17} />
              ) : (
                <Check size={17} />
              )}
              <strong>
                {money(Math.abs(remaining))}{" "}
                {remaining < 0 ? "over budget" : "left in your budget"}
              </strong>
              <span>Includes ₹2,000 contingency</span>
            </p>
          </div>
          {latestChange && latestChange.after.plan.revision === accepted.revision && (
            <div className="budget-change" role="status">
              <Route size={19} />
              <div>
                <span className="eyebrow">WHAT CHANGED</span>
                <strong>
                  {money(latestChange.totalBefore)} → {money(latestChange.totalAfter)}
                </strong>
                <p>
                  {latestChange.title}. The net increase is {money(latestChange.transportDelta)} in estimated local transport; the activity cost moved between days and was not added again.
                </p>
              </div>
            </div>
          )}
          <div className="section-heading">
            <h2>Where it all goes</h2>
            <span className="small muted">Group estimates · INR</span>
          </div>
          <div className="category-list">
            {categories.map((c) => (
              <div className="category-row" key={c.label}>
                <span className={`budget-icon ${c.color}`}>
                  <c.icon size={20} />
                </span>
                <div>
                  <strong>{c.label}</strong>
                  <span>{c.note}</span>
                </div>
                <strong>{money(c.value)}</strong>
              </div>
            ))}
          </div>
          <div className="budget-total-row">
            <strong>Estimated trip total</strong>
            <strong>{money(t.total)}</strong>
          </div>
        </section>
        <aside>
          <h2>One day at a time</h2>
          <p className="muted">Your daily plans, with the costs connected.</p>
          <div className="budget-days">
            {DAY_INFO.map((d, i) => (
              <Link
                key={d.title}
                href="/trip/goa/plan"
                onClick={() => setDay(i)}
              >
                <span className="budget-day-number">0{i + 1}</span>
                <div>
                  <strong>Day {i + 1}</strong>
                  <span>{d.title}</span>
                </div>
                <strong>{money(t.days[i].total)}</strong>
                <ChevronRight size={15} />
              </Link>
            ))}
          </div>
          <div className="reconciliation">
            <div>
              <span>All four days</span>
              <strong>{money(t.days.reduce((s, d) => s + d.total, 0))}</strong>
            </div>
            <div>
              <span>Stay · counted once</span>
              <strong>{money(LODGING)}</strong>
            </div>
            <div>
              <span>Contingency · counted once</span>
              <strong>{money(CONTINGENCY)}</strong>
            </div>
            <div className="reconciliation-total">
              <span>Shared trip estimate</span>
              <strong>{money(t.total)}</strong>
            </div>
          </div>
          <div className="budget-note">
            <Info size={20} />
            <div>
              <strong>A plan, not a bill.</strong>
              <p>
                These are illustrative estimates for both travelers, not actual
                expenses. Travel to and from Goa is separate. No payments or
                reservations have been made.
              </p>
            </div>
          </div>
          {history.length > 0 && (
            <button className="button secondary budget-undo" onClick={undo}>
              <Undo2 size={17} />
              Undo last itinerary change
            </button>
          )}
          <p className="small muted">
            Accepted plan · Revision {accepted.revision}
            <br />
            Saved on this device
          </p>
        </aside>
      </div>
      <Notice />
    </main>
  );
}
