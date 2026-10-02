"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  Leaf,
  MapPin,
  Plus,
  Users,
} from "lucide-react";
import { useAuth } from "./auth-provider";
import { useTrip } from "./trip-provider";
import { money, totals } from "@/lib/planner";

export function TripsHome() {
  const { user, ready } = useAuth();
  const { accepted, brief } = useTrip();
  const router = useRouter();
  const reduce = useReducedMotion();
  const estimate = totals(accepted).total;

  useEffect(() => {
    if (ready && !user) router.replace("/login");
  }, [ready, user, router]);

  if (!ready || !user) {
    return <main id="main" className="trips-loading" aria-live="polite">Opening your journeys…</main>;
  }

  const firstName = user.name.split(/\s+/)[0] || "traveler";
  return (
    <main id="main" className="trips-page">
      <motion.header
        className="trips-intro"
        initial={reduce ? false : { y: 22 }}
        animate={{ y: 0 }}
        transition={{ duration: reduce ? 0 : 0.45 }}
      >
        <div>
          <p className="eyebrow">GOOD AFTERNOON, {firstName.toUpperCase()}.</p>
          <h1>Where are we<br /><em>going next?</em></h1>
        </div>
        <Link href="/create" className="button secondary plan-another">
          <Plus size={18} /> Plan another trip
        </Link>
      </motion.header>

      <motion.section
        className="current-trip"
        initial={reduce ? false : { y: 28 }}
        animate={{ y: 0 }}
        transition={{ duration: reduce ? 0 : 0.55, delay: 0.08 }}
        whileHover={reduce ? undefined : { y: -5, rotateX: 0.4, rotateY: -0.6 }}
      >
        <img src="/images/goa-coast.jpg" alt="Palm-lined Goa coastline" />
        <div className="current-trip-overlay" />
        <div className="current-trip-copy">
          <p className="eyebrow">CURRENT TRIP · GOA, INDIA</p>
          <h2>Four days with<br /><em>room to wander.</em></h2>
          <div className="current-trip-meta">
            <span><CalendarDays size={16} /> 4 days</span>
            <span><Users size={16} /> 2 travelers</span>
            <span><Leaf size={16} /> Relaxed pace</span>
          </div>
          <div className="current-trip-bottom">
            <p><strong>{money(estimate)}</strong> <span>/ {money(brief.budget)}</span></p>
            <Link href="/trip/goa/plan" className="button trip-continue">
              Continue planning <ArrowRight size={18} />
            </Link>
          </div>
        </div>
        <span className="trip-location"><MapPin size={15} /> Assagao base</span>
      </motion.section>

      <section className="journeys-section">
        <div className="journeys-heading">
          <div>
            <p className="eyebrow">YOUR JOURNEYS</p>
            <h2>Places you’re shaping.</h2>
          </div>
          <p>One living plan. More room when you need it.</p>
        </div>
        <div className="journey-row">
          <Link href="/trip/goa" className="journey-entry">
            <span className="journey-number">01</span>
            <div>
              <span className="journey-status">CURRENT TRIP</span>
              <h3>{brief.name || "A little Goa, a little slower"}</h3>
              <p>Goa · 4 days · Updated locally</p>
            </div>
            <strong>{money(estimate)}</strong>
            <ArrowRight size={19} />
          </Link>
          <div className="journey-entry journey-draft" aria-label="Draft trip placeholder">
            <span className="journey-number">02</span>
            <div>
              <span className="journey-status">DRAFT</span>
              <h3>Somewhere by the sea</h3>
              <p>A thought waiting for a destination.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
