"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Route,
  SlidersHorizontal,
  Wallet,
  MoveRight,
} from "lucide-react";
import { Footer } from "@/components/ui";
import { MotionReveal, SpatialSurface } from "@/components/spatial-surface";
import { useAuth } from "@/components/auth-provider";
export default function Landing() {
  const { user } = useAuth();
  const startHref = user ? "/trips" : "/signup";
  return (
    <>
      <main id="main" className="landing">
        <section className="landing-hero">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="tiny-line" /> LESS PLANNING. MORE POSSIBILITY.
            </p>
            <h1>
              The best trips
              <br />
              leave room for
              <br />
              <em>a little unexpected.</em>
            </h1>
            <p className="hero-description">
              A place you saved. A café you stumbled on.
              <br className="desktop-only" /> Bring it all together in a trip
              that moves with you.
            </p>
            <div className="hero-actions">
              <Link className="button primary" href={startHref}>
                Plan a trip <ArrowRight size={18} />
              </Link>
              <Link className="text-link" href="/trip/goa/plan">
                Explore a sample trip <ArrowUpRight size={17} />
              </Link>
            </div>
            <p className="hero-footnote">
              Your ideas. A little intelligence. A lot of possibility.
            </p>
          </div>
          <SpatialSurface className="hero-photo">
            <img
              src="/images/goa-coast.jpg"
              alt="Palm-lined Goa coastline with turquoise water and a quiet sandy beach"
              fetchPriority="high"
            />
            <div className="photo-top">
              <span>FIELD NOTES / 001</span>
              <span>15.6° N · 73.7° E</span>
            </div>
            <div className="photo-bottom">
              <div>
                <p>TAKE THE SLOW ROAD TO</p>
                <h2>Goa, India.</h2>
              </div>
              <span className="round-arrow">
                <ArrowUpRight size={25} />
              </span>
            </div>
            <div className="floating-note">
              <span className="note-icon">
                <Route size={20} />
              </span>
              <div>
                <strong>A change of plans? Lovely.</strong>
                <p>Move one stop. See the whole picture.</p>
              </div>
            </div>
            <div className="hero-postcard depth-card" aria-hidden="true">
              <img src="/images/cafe.jpg" alt="" />
              <span>Save this for later</span>
              <strong>Assagao · 12:00</strong>
            </div>
            <svg
              className="hero-route-sketch"
              viewBox="0 0 620 560"
              aria-hidden="true"
            >
              <path d="M70 420C145 338 188 382 250 288S390 248 470 158 535 82 570 68" />
              <circle cx="70" cy="420" r="7" />
              <circle cx="570" cy="68" r="9" />
            </svg>
            <span className="hero-sun" aria-hidden="true" />
          </SpatialSurface>
        </section>
        <MotionReveal className="landing-strip">
          <span>FOR THE WAY YOU ACTUALLY TRAVEL</span>
          <p>
            Less tab-switching.
            <i />
            More good decisions.
            <i />
            Always your call.
          </p>
        </MotionReveal>
        <MotionReveal
          className="landing-story"
          delay={0.08}
          as="section"
          id="how-it-works"
        >
          <div>
            <p className="eyebrow">A PLAN, NOT A SCRIPT</p>
            <h2>
              A little structure.
              <br />
              <em>A lot of freedom.</em>
            </h2>
            <p>
              See how your days, places and budget fit together. When something
              changes, understand the difference before you make it yours.
            </p>
          </div>
          <div className="principle-list">
            {[
              {
                n: "01",
                icon: MapPin,
                title: <>Your whole trip, <em>in one place</em></>,
                body: "An itinerary and a map that speak the same language.",
              },
              {
                n: "02",
                icon: SlidersHorizontal,
                title: <>Change your mind. <em>Keep your plans.</em></>,
                body: "Move a café to tomorrow. Review the ripple, not a whole new trip.",
              },
              {
                n: "03",
                icon: Wallet,
                title: <>Know what the change <em>means</em></>,
                body: "Clear time and cost differences. No mysterious adjustments.",
              },
            ].map((p) => (
              <article key={p.n}>
                <span>{p.n}</span>
                <div>
                  <h3>
                    <p.icon size={19} />
                    {p.title}
                  </h3>
                  <p>{p.body}</p>
                </div>
              </article>
            ))}
          </div>
        </MotionReveal>
        <MotionReveal className="landing-invite" as="section">
          <span className="eyebrow">
            FOUR DAYS. TWO PEOPLE. YOUR KIND OF GOA.
          </span>
          <Link href={startHref}>
            Let’s make a little room. <MoveRight size={38} />
          </Link>
          <p>
            A working portfolio demo · Illustrative estimates · Nothing booked
          </p>
        </MotionReveal>
      </main>
      <Footer />
    </>
  );
}
