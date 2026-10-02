"use client";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Users,
  Leaf,
  MapPin,
  Check,
  ArrowUpRight,
  Sun,
} from "lucide-react";
import { useTrip } from "./trip-provider";
import { TripNav, Footer } from "./ui";
import { DAY_INFO, money, totals } from "@/lib/planner";
import { SpatialSurface } from "./spatial-surface";
export function Overview() {
  const { accepted, brief, setDay } = useTrip();
  const t = totals(accepted);
  return (
    <>
      <main id="main" className="overview-page">
        <div className="overview-heading">
          <div>
            <p className="eyebrow">YOUR NEXT CHAPTER</p>
            <h1>{brief.name || "A little Goa, a little slower"}</h1>
            <div className="trip-meta">
              <span>
                <CalendarDays size={16} />4 days · Flexible dates
              </span>
              <span>
                <Users size={16} />2 travelers
              </span>
              <span>
                <Leaf size={16} />
                Relaxed
              </span>
            </div>
          </div>
          <Link href="/trip/goa/plan" className="button primary">
            Explore itinerary <ArrowRight size={18} />
          </Link>
        </div>
        <TripNav active="overview" />
        <SpatialSurface className="overview-hero">
          <img
            src="/images/goa-coast.jpg"
            alt="Turquoise water and palm-fringed shores in Goa"
          />
          <div>
            <span className="eyebrow">INDIA’S SLOWER SIDE</span>
            <h2>Hello, Goa.</h2>
            <p>Four days of following your own tide.</p>
          </div>
          <svg className="overview-route-sketch" viewBox="0 0 1200 320" aria-hidden="true">
            <path d="M710 278C765 230 748 174 825 164S924 88 1038 98 1122 52 1172 32" />
            <circle cx="710" cy="278" r="6" />
            <circle cx="1172" cy="32" r="8" />
          </svg>
          <span className="overview-weather-note" aria-hidden="true">
            <Sun size={16} /> 28° · easy pace
          </span>
          <span className="overview-location">
            <MapPin size={16} /> Goa, India
          </span>
          <div className="overview-postcard depth-card" aria-hidden="true">
            <img src="/images/cafe.jpg" alt="" />
            <span>DAY 01 · SAVED PLACE</span>
            <strong>Slow coffee in Assagao</strong>
          </div>
        </SpatialSurface>
        <div className="overview-content">
          <section>
            <div className="section-heading">
              <div>
                <p className="eyebrow">THE SHAPE OF YOUR TRIP</p>
                <h2>A good kind of full.</h2>
              </div>
              <span className="muted small">Room to breathe, every day.</span>
            </div>
            <div className="day-stories">
              {DAY_INFO.map((d, i) => (
                <Link
                  key={d.title}
                  href="/trip/goa/plan"
                  onClick={() => setDay(i)}
                >
                  <span className="day-story-number">0{i + 1}</span>
                  <div>
                    <p className="eyebrow">{d.area}</p>
                    <h3>{d.title}</h3>
                    <p>{d.subtitle}</p>
                  </div>
                  <ArrowUpRight size={22} />
                </Link>
              ))}
            </div>
          </section>
          <aside className="overview-budget">
            <span className="eyebrow">A LITTLE PEACE OF MIND</span>
            <p className="budget-large">{money(t.total)}</p>
            <p>Estimated for both of you</p>
            <div className="budget-meter">
              <span
                style={{
                  width: `${Math.min(100, (t.total / brief.budget) * 100)}%`,
                }}
              />
            </div>
            <div className="budget-between">
              <span>{money(brief.budget)} shared budget</span>
              <strong>
                {money(Math.abs(brief.budget - t.total))}{" "}
                {brief.budget >= t.total ? "left" : "over"}
              </strong>
            </div>
            <Link href="/trip/goa/budget" className="text-link">
              See the breakdown <ArrowRight size={16} />
            </Link>
            <div className="stay-context">
              <MapPin size={19} />
              <div>
                <strong>Your base: Assagao</strong>
                <p>
                  3 nights · ₹15,000 estimated
                  <br />
                  An area to stay, not a booking.
                </p>
              </div>
            </div>
            <p className="small muted">
              <Check size={14} /> Includes a ₹2,000 contingency.
              <br />
              Travel to Goa is separate. Costs and routes are illustrative;
              check availability before traveling.
            </p>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
