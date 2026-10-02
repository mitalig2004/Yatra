"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  MapPin,
  CalendarDays,
  Users,
  Wallet,
  Sun,
  Leaf,
  Coffee,
  Waves,
  Utensils,
  Music2,
  LoaderCircle,
  Route,
  ShieldCheck,
} from "lucide-react";
import { useTrip } from "./trip-provider";
import { PageIntro } from "./ui";
import { money, totals, initialPlan, RELAXED_PACE } from "@/lib/planner";
export function CreateBrief() {
  const { brief, setBrief, ready } = useTrip();
  const router = useRouter();
  const reduce = useReducedMotion();
  const [error, setError] = useState("");
  return (
    <main id="main" className="setup-page">
      <div className="setup-color-field" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <Link href="/" className="back-link">
        <ArrowLeft size={16} /> Back to the good part
      </Link>
      <motion.div
        className="setup-grid"
        initial={reduce ? false : { y: 34 }}
        animate={{ y: 0 }}
        transition={{ duration: reduce ? 0 : 0.65, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <div>
          <PageIntro
            step="01 / YOUR NEXT CHAPTER"
            title="Where are we going?"
            description="Start with the essentials. Leave a little room for the unexpected."
          />
          <form
            className="brief-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (brief.destination.trim().toLowerCase() !== "goa") {
                setError("This demo explores Goa. Enter Goa to continue.");
                return;
              }
              if (brief.budget < 100000 || brief.budget > 100000000) {
                setError(
                  "Enter a shared budget between ₹1,000 and ₹10,00,000.",
                );
                return;
              }
              router.push("/create/review");
            }}
          >
            <label className="field">
              Your destination
              <div className="input-icon">
                <MapPin size={18} />
                <input
                  required
                  value={brief.destination}
                  onChange={(e) =>
                    setBrief({ ...brief, destination: e.target.value })
                  }
                  placeholder="Where are you dreaming of?"
                />
              </div>
            </label>
            <div className="form-row">
              <div className="field">
                <span>How long?</span>
                <div className="fixture-field">
                  <CalendarDays size={18} />
                  <strong>4 days</strong>
                  <span>Flexible dates</span>
                </div>
              </div>
              <div className="field">
                <span>Who’s coming?</span>
                <div className="fixture-field">
                  <Users size={18} />
                  <strong>2 travelers</strong>
                </div>
              </div>
            </div>
            <label className="field">
              Your shared trip budget
              <div className="input-icon">
                <span className="currency">₹</span>
                <input
                  type="number"
                  min="1000"
                  max="1000000"
                  step="100"
                  required
                  value={brief.budget / 100}
                  onChange={(e) =>
                    setBrief({ ...brief, budget: Number(e.target.value) * 100 })
                  }
                />
                <span className="input-suffix">for both of you</span>
              </div>
              <span className="field-help">
                Stay, food, local transport & experiences. Travel to Goa is
                separate.
              </span>
            </label>
            <fieldset className="pace-field">
              <legend>The mood of the trip</legend>
              <div className="pace-choice">
                <Leaf size={23} />
                <div>
                  <strong>Take it slow</strong>
                  <span>Fewer stops. Longer lunches. Room to wander.</span>
                </div>
                <Check size={18} />
              </div>
            </fieldset>
            <div className="field">
              <span>A few things you love</span>
              <div className="interest-tags">
                {[
                  [Waves, "Beaches"],
                  [Coffee, "Cafés"],
                  [Utensils, "Local food"],
                  [Music2, "Nightlife"],
                ].map(([Icon, label]) => {
                  const I = Icon as typeof Waves;
                  return (
                    <span key={label as string}>
                      <I size={16} />
                      {label as string}
                    </span>
                  );
                })}
              </div>
            </div>
            <label className="field">
              Give your trip a name
              <input
                maxLength={70}
                value={brief.name}
                onChange={(e) => setBrief({ ...brief, name: e.target.value })}
                required
              />
            </label>
            {error && (
              <p role="alert" className="field-error">
                {error}
              </p>
            )}
            <div className="form-bottom">
              <span className="muted small">
                A considered Goa demo for two.
                <br />
                Duration and interests use the featured itinerary.
              </span>
              <button className="button primary" disabled={!ready}>
                Review trip brief <ArrowRight size={17} />
              </button>
            </div>
          </form>
        </div>
        <motion.aside
          className="setup-aside"
          initial={reduce ? false : { x: 45, rotate: 2 }}
          animate={{ x: 0, rotate: 0 }}
          transition={{ duration: reduce ? 0 : 0.75, delay: 0.12 }}
          whileHover={reduce ? undefined : { y: -6, rotate: -0.5 }}
        >
          <img src="/images/goa-coast.jpg" alt="A palm-lined bay in Goa" />
          <svg className="setup-route-sketch" viewBox="0 0 350 350" aria-hidden="true">
            <path d="M28 285C92 255 90 180 160 178S238 102 318 48" />
            <circle cx="28" cy="285" r="6" />
            <circle cx="318" cy="48" r="8" />
          </svg>
          <span className="setup-weather-note" aria-hidden="true">
            <Sun size={17} /> 28° · slow days
          </span>
          <div className="setup-aside-caption">
            <span className="eyebrow">ON THE HORIZON</span>
            <h2>
              A softer kind
              <br />
              of getaway.
            </h2>
            <p>
              Long mornings. Saltwater afternoons.
              <br />
              That café you’ll want to come back to.
            </p>
            <span className="location-line">
              <MapPin size={15} /> {brief.destination || "Your destination"}, India
            </span>
            <div className="live-brief-preview" aria-live="polite">
              <span>4 days</span>
              <span>2 travelers</span>
              <span>{money(brief.budget)}</span>
            </div>
            <p className="pace-preview">
              <Leaf size={15} /> {RELAXED_PACE.principle}
            </p>
          </div>
          <div className="aside-foot">
            <ShieldCheck size={17} />
            <span>
              Saved locally. No bookings.
              <br />
              Just a little space to plan.
            </span>
          </div>
        </motion.aside>
      </motion.div>
    </main>
  );
}
export function ReviewBrief() {
  const { brief } = useTrip();
  return (
    <main id="main" className="review-page">
      <Link href="/create" className="back-link">
        <ArrowLeft size={16} /> Edit your brief
      </Link>
      <PageIntro
        step="02 / BEFORE WE SET OFF"
        title="Does this feel like your trip?"
        description="A quick look at the details. Every good plan starts with being on the same page."
      />
      <div className="review-grid">
        <section className="brief-summary">
          <div className="summary-destination">
            <MapPin size={20} />
            <div>
              <p className="eyebrow">YOUR DESTINATION</p>
              <h2>Goa, India</h2>
            </div>
            <Link href="/create" className="text-link">
              Edit
            </Link>
          </div>
          <div className="summary-cells">
            <div>
              <CalendarDays size={21} />
              <span>Time to explore</span>
              <strong>4 unhurried days</strong>
              <small>Dates are flexible</small>
            </div>
            <div>
              <Users size={21} />
              <span>Good company</span>
              <strong>2 travelers</strong>
              <small>One shared plan</small>
            </div>
            <div>
              <Wallet size={21} />
              <span>Shared budget</span>
              <strong>{money(brief.budget)}</strong>
              <small>For the whole trip</small>
            </div>
            <div>
              <Sun size={21} />
              <span>Your pace</span>
              <strong>Relaxed</strong>
              <small>With room to wander</small>
            </div>
          </div>
          <div className="summary-interests">
            <span className="eyebrow">A LITTLE OF WHAT YOU LOVE</span>
            <p>
              Beaches <span>·</span> Cafés <span>·</span> Local food{" "}
              <span>·</span> Nightlife
            </p>
          </div>
        </section>
        <aside className="assumptions">
          <span className="eyebrow">THE SMALL, IMPORTANT DETAILS</span>
          <h3>Here’s what we’re planning around.</h3>
          <ul>
            <li>
              <Check size={17} />
              <span>
                3 nights around Assagao, estimated at ₹5,000 per night.
              </span>
            </li>
            <li>
              <Check size={17} />
              <span>
                Food, activities and local transport are included for two.
              </span>
            </li>
            <li>
              <Check size={17} />
              <span>₹2,000 set aside for a little flexibility.</span>
            </li>
          </ul>
          <p>
            Travel to and from Goa is excluded. Place details, availability and
            travel times are illustrative estimates.
          </p>
          <p className="small">
            This portfolio demo uses a curated itinerary, not live AI or booking
            data.
          </p>
        </aside>
      </div>
      <div className="review-bottom">
        <p>
          <strong>{brief.name}</strong>
          <br />
          <span className="muted">Your plan will stay editable. Always.</span>
        </p>
        <Link href="/create/generate" className="button primary">
          Create my itinerary <ArrowRight size={18} />
        </Link>
      </div>
    </main>
  );
}
export function Generation() {
  const { generate, brief } = useTrip();
  const [stage, setStage] = useState(0),
    [failed, setFailed] = useState(false),
    [attempt, setAttempt] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    started.current = false;
    const frame = requestAnimationFrame(() => {
      try {
        const result = totals(initialPlan());
        if (result.total !== 3760000) throw Error();
        setStage(1);
      } catch {
        setFailed(true);
      }
    });
    const timer = setTimeout(() => setStage(2), 450);
    const finish = setTimeout(() => {
      if (!started.current) {
        generate();
        started.current = true;
      }
      setStage(3);
    }, 950);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      clearTimeout(finish);
    };
  }, [attempt]);
  const steps = [
    "Arranging your four days",
    "Connecting places and travel time",
    "Checking the shared budget",
  ];
  return (
    <main id="main" className="generation-page">
      <div className="generation-art" aria-hidden="true">
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <span className="generation-compass">
          <Route size={36} strokeWidth={1.2} />
        </span>
        <span className="orbit-point p1" />
        <span className="orbit-point p2" />
        <span className="orbit-point p3" />
      </div>
      <p className="eyebrow">GOA · FOUR DAYS · TWO PEOPLE</p>
      <h1>
        {failed
          ? "A small detour."
          : stage === 3
            ? "Your slower days are ready."
            : "Making room for the good stuff."}
      </h1>
      <p className="muted">
        {stage === 3
          ? "A little coast, a little culture, and time to make it your own."
          : "Putting your places, time and budget in the same picture."}
      </p>
      <div className="generation-steps" aria-live="polite">
        {steps.map((s, i) => (
          <div key={s} className={stage > i ? "done" : ""}>
            {stage > i ? (
              <Check size={18} />
            ) : (
              <LoaderCircle size={18} className={stage === i ? "spin" : ""} />
            )}
            <span>{s}</span>
          </div>
        ))}
      </div>
      {failed ? (
        <button
          className="button primary"
          onClick={() => {
            setFailed(false);
            setAttempt((a) => a + 1);
          }}
        >
          Try again
        </button>
      ) : stage === 3 ? (
        <Link className="button primary" href="/trip/goa">
          See my Goa trip <ArrowRight size={18} />
        </Link>
      ) : (
        <div className="generation-placeholder" />
      )}
      <Link className="text-link generation-cancel" href="/create/review">
        {stage === 3 ? "Back to brief" : "Cancel and return to brief"}
      </Link>
      <p className="small muted">
        A curated demo itinerary · Nothing booked · Saved on this device
      </p>
    </main>
  );
}
