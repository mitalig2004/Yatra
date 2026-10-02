"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Clock3,
  Coffee,
  GripVertical,
  Leaf,
  List,
  LockKeyhole,
  Map as MapIcon,
  MapPin,
  MoveRight,
  Route,
  Sun,
  Undo2,
  Users,
  Wallet,
  Waves,
  Utensils,
  CalendarDays,
  History,
  Heart,
} from "lucide-react";
import {
  ACTIVITIES,
  DAY_INFO,
  duration,
  money,
  schedule,
  totals,
  time,
} from "@/lib/planner";
import { useTrip } from "./trip-provider";
import { TripNav, Notice, Modal } from "./ui";
import { GoaMap } from "./goa-map";
import { MoveActivity, ImpactReview } from "./editing";
export function Workspace() {
  const {
    accepted,
    proposal,
    brief,
    day,
    setDay,
    selected,
    select,
    view,
    setView,
    propose,
    discard,
    history,
    undo,
    ready,
    storageError,
  } = useTrip();
  const [moving, setMoving] = useState<string | null>(null),
    [review, setReview] = useState(false),
    [dragging, setDragging] = useState<string | null>(null),
    [dropDay, setDropDay] = useState<number | null>(null),
    [justApplied, setJustApplied] = useState(false),
    [historyOpen, setHistoryOpen] = useState(false);
  const reduce = useReducedMotion();
  const timeline = useRef<HTMLDivElement>(null);
  const current = proposal?.plan ?? accepted,
    summary = schedule(current, day),
    acceptedTotal = totals(accepted).total;
  const previousRevision = useRef(accepted.revision);
  useEffect(() => {
    if (previousRevision.current !== accepted.revision) {
      previousRevision.current = accepted.revision;
      setJustApplied(true);
      const emphasis = window.setTimeout(() => setJustApplied(false), 1600);
      requestAnimationFrame(() => {
        const el = document.getElementById(`activity-${selected}`);
        el?.focus({ preventScroll: true });
        el?.scrollIntoView({
          block: "nearest",
          behavior: reduce ? "instant" : "smooth",
        });
      });
      return () => window.clearTimeout(emphasis);
    }
  }, [accepted.revision, selected, reduce]);
  const selectOnMap = (id: string) => {
    select(id);
    if (window.innerWidth >= 1100)
      document.getElementById(`activity-${id}`)?.scrollIntoView({
        block: "nearest",
        behavior: reduce ? "instant" : "smooth",
      });
  };
  const drop = (target: number, position?: number) => {
    if (!dragging) return;
    const index = position ?? (target === 1 ? 2 : 0);
    propose(dragging, target, index);
    setDragging(null);
    setDropDay(null);
    setReview(true);
  };
  return (
    <main id="main" className="workspace-page">
      <div className="workspace-heading">
        <div>
          <Link href="/trip/goa" className="back-link">
            <ArrowLeft size={15} /> Trip overview
          </Link>
          <div className="workspace-identity">
            <div>
              <p className="eyebrow">GOA · INDIA</p>
              <h1>Goa</h1>
            </div>
            <div className="trip-meta">
              <span>
                <CalendarDays size={14} />4 days
              </span>
              <span>
                <Users size={14} />2 travelers
              </span>
              <span>
                <Leaf size={14} /> Relaxed
              </span>
            </div>
          </div>
        </div>
        <div className="workspace-total">
          <Link href="/trip/goa/budget">
            <Wallet size={18} />
            <div className="budget-desktop">
              <span>Shared trip estimate</span>
              <motion.strong
                key={acceptedTotal}
                data-testid="accepted-total"
                initial={reduce ? false : { opacity: 0.35, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduce ? 0 : 0.28, ease: "easeOut" }}
              >
                {money(acceptedTotal)} <small>/ {money(brief.budget)}</small>
              </motion.strong>
            </div>
            <motion.strong
              className="budget-mobile"
              key={`mobile-${acceptedTotal}`}
              data-testid="accepted-total-mobile"
              initial={reduce ? false : { opacity: 0.35, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduce ? 0 : 0.28, ease: "easeOut" }}
            >
              {money(acceptedTotal)} <small>of {money(brief.budget)}</small>
            </motion.strong>
            <ChevronRight size={17} />
          </Link>
          <span className="save-status">
            <Check size={13} />
            <span className="save-status-long">
              {storageError
                ? "Not saved"
                : ready
                  ? "Saved on this device"
                  : "Loading your plan"}{" "}
              · Revision {accepted.revision}
            </span>
            <span className="save-status-short">
              {storageError ? "Not saved" : ready ? "Saved" : "Loading"} · Rev. {accepted.revision}
            </span>
          </span>
        </div>
      </div>
      <div className="workspace-tabs">
        <TripNav active="plan" />
        {history.length > 0 && (
          <div className="revision-actions">
            <button className="text-link" onClick={() => setHistoryOpen(true)}>
              <History size={16} /> View changes
            </button>
            <button
              className="text-link undo-persistent"
              onClick={undo}
              aria-label="Undo last change"
            >
              <Undo2 size={16} /> Undo
            </button>
          </div>
        )}
        <span className="workspace-hint">A plan, not a script.</span>
      </div>
      {proposal && (
        <div className="preview-banner">
          <div>
            <strong>
              Preview · Day {proposal.source + 1} → Day {proposal.target + 1}
            </strong>
            <span>Your accepted plan is unchanged.</span>
          </div>
          <button className="text-link" onClick={() => setReview(true)}>
            Review impact <ArrowRight size={16} />
          </button>
          <button className="text-link" onClick={discard}>
            Discard
          </button>
        </div>
      )}
      <div className="day-navigation" aria-label="Trip days">
        {DAY_INFO.map((d, i) => (
          <button
            key={d.title}
            className={`${day === i ? "active" : ""} ${dropDay === i ? "drop-highlight" : ""}`}
            aria-pressed={day === i}
            onClick={() => setDay(i)}
            onDragOver={(e) => {
              e.preventDefault();
              setDropDay(i);
            }}
            onDragLeave={() => setDropDay(null)}
            onDrop={(e) => {
              e.preventDefault();
              drop(i);
            }}
            data-testid={`day-${i + 1}`}
            aria-label={`Day ${i + 1}: ${d.title} — ${d.area}`}
          >
            <span>DAY 0{i + 1}</span>
            <span className="day-nav-copy">
              <strong>{d.title}</strong>
              <small>{d.area}</small>
            </span>
            <span className="day-mobile-label">
              <strong>0{i + 1}</strong>
              <small>{d.area.split(" & ")[0]}</small>
            </span>
            {day === i && <span className="active-day-indicator" />}
          </button>
        ))}
      </div>
      {dragging && (
        <div className="drag-instruction" role="status">
          Drop onto a day above, or onto a position in the timeline. You’ll
          review the move first.
        </div>
      )}
      <div className="mobile-view-switch" aria-label="Plan view">
        <button
          aria-pressed={view === "timeline"}
          onClick={() => setView("timeline")}
        >
          <List size={17} />
          Timeline
        </button>
        <button aria-pressed={view === "map"} onClick={() => setView("map")}>
          <MapIcon size={17} />
          Map <span aria-hidden="true">↑</span>
        </button>
      </div>
      <div className="planning-grid">
        <section
          className={`timeline-pane ${view !== "timeline" ? "mobile-hidden" : ""}`}
          aria-label={`Day ${day + 1} itinerary`}
          data-revision={current.revision}
        >
          <div className="day-intro">
            <div>
              <p className="eyebrow">{DAY_INFO[day].area}</p>
              <h2>{DAY_INFO[day].title}</h2>
              <p>{DAY_INFO[day].subtitle}</p>
            </div>
            <Sun size={27} strokeWidth={1.2} />
          </div>
          <div className="day-stats">
            <span>
              <Route size={15} />
              {summary.travel} min travel
            </span>
            <span>
              <Clock3 size={15} />
              {duration(summary.free)} free
            </span>
            <span>{money(summary.total)} for two</span>
          </div>
          <div className="timeline-scroll" ref={timeline}>
            <div className="stay-row">
              <span className="stay-dot">
                <MapPin size={14} />
              </span>
              <div>
                <strong>Start from your Assagao base</strong>
                <span>8:30 am · Stay area is approximate</span>
              </div>
            </div>
            <ol className="timeline-list">
              {summary.items.map((s, i) => {
                const a = s.activity;
                const Icon =
                  a.category === "Café"
                    ? Coffee
                    : a.category === "Beach"
                      ? Waves
                      : a.category === "Food"
                        ? Utensils
                        : MapPin;
                return (
                  <li
                    key={a.id}
                    className={`timeline-item ${selected === a.id ? "is-selected" : ""} ${proposal?.activityId === a.id ? "is-preview" : ""}`}
                  >
                    <div className="transit-line">
                      <Route size={13} />
                      <span>
                        {s.transit.minutes} min drive · {money(s.transit.cost)}{" "}
                        est.
                      </span>
                      {s.freeBefore >= 30 && (
                        <span className="free-time">
                          <Leaf size={12} />
                          {duration(s.freeBefore)} breathing room
                        </span>
                      )}
                    </div>
                    <div
                      className={`insertion-slot ${dragging ? "visible" : ""}`}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        drop(day, i);
                      }}
                    >
                      {dragging ? "Drop here to preview" : ""}
                    </div>
                    <motion.article
                      initial={reduce ? false : { opacity: 0, x: -14 }}
                      animate={{ opacity: 1, x: 0 }}
                      layout={!reduce}
                      transition={{
                        duration: reduce ? 0 : 0.28,
                        delay: reduce ? 0 : Math.min(i * 0.045, 0.2),
                        ease: [0.2, 0.8, 0.2, 1],
                      }}
                      whileHover={
                        reduce || dragging === a.id ? undefined : { x: 3 }
                      }
                      draggable={!a.fixed && a.id !== "stroll" && !proposal}
                      onDragStart={(e) => {
                        setDragging(a.id);
                      }}
                      onDragEnd={() => {
                        setDragging(null);
                        setDropDay(null);
                      }}
                      className={`activity-card ${dragging === a.id ? "dragging" : ""} ${justApplied && selected === a.id ? "just-applied" : ""}`}
                    >
                      <span className="timeline-number">{i + 1}</span>
                      <div className="activity-time">
                        <span>
                          {time(s.start)} <span>– {time(s.end)}</span>
                        </span>
                        {a.fixed ? (
                          <span className="fixed-label">
                            <LockKeyhole size={12} />
                            Fixed table
                          </span>
                        ) : proposal?.activityId === a.id ? (
                          <span className="preview-label">
                            Moved here · preview
                          </span>
                        ) : (
                          <span className="activity-category">
                            <Icon size={13} />
                            {a.category}
                          </span>
                        )}
                      </div>
                      <div className="activity-main">
                        <div>
                          <button
                            id={`activity-${a.id}`}
                            className="activity-title"
                            onClick={() => select(a.id)}
                            aria-pressed={selected === a.id}
                          >
                            {a.name}
                          </button>
                          <p className="activity-area">
                            <MapPin size={12} />
                            {a.area}
                          </p>
                          <p className="activity-description">
                            {a.description}
                          </p>
                          {a.savedBy && (
                            <p className="shared-preference">
                              <Heart size={12} />
                              {a.savedBy.length > 1
                                ? "Shared favourite · Both of you saved this"
                                : `${a.savedBy[0]} saved this`}
                            </p>
                          )}
                        </div>
                        {a.image && (
                          <img
                            src={a.image}
                            alt=""
                            className="activity-thumbnail"
                            loading="lazy"
                          />
                        )}
                      </div>
                      <div className="activity-bottom">
                        <span>
                          {a.cost
                            ? `${money(a.cost)} for two`
                            : "Free to enjoy"}
                          <span className="duration-dot">·</span>
                          {duration(a.duration)}
                        </span>
                        {!a.fixed && a.id !== "stroll" && !proposal ? (
                          <button
                            className="move-action"
                            onClick={() => {
                              select(a.id);
                              setMoving(a.id);
                            }}
                            aria-label={`Move ${a.name}`}
                          >
                            <GripVertical size={14} className="drag-grip" />
                            <MoveRight size={15} />
                            Move
                          </button>
                        ) : a.fixed ? (
                          <span className="small muted">
                            User-marked reservation
                          </span>
                        ) : null}
                      </div>
                      {s.late > 0 && (
                        <p className="row-conflict">
                          Arrives {s.late} min after the fixed start. Review a
                          different position.
                        </p>
                      )}
                    </motion.article>
                  </li>
                );
              })}
            </ol>
            <div
              className={`insertion-slot ${dragging ? "visible" : ""}`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                drop(day, summary.items.length);
              }}
            >
              {dragging ? "Drop at the end of this day" : ""}
            </div>
            <div className="end-day">
              <span className="stay-dot">
                <MapPin size={14} />
              </span>
              <div>
                <strong>Back to your Assagao base</strong>
                <p>Arrive around {time(summary.end)} · The rest is yours.</p>
              </div>
            </div>
            <p className="timeline-footnote">
              Times and costs are estimates. Opening hours and availability are
              not verified.
            </p>
          </div>
          <div className="timeline-tip">
            <MoveRight size={18} />
            <p>
              <strong>Plans can change. That’s the point.</strong>
              <span>
                Try moving the café to Day 2. We’ll show you what follows.
              </span>
            </p>
          </div>
        </section>
        <section
          className={`map-pane ${view !== "map" ? "mobile-hidden" : ""}`}
          aria-label="Trip map"
        >
          <GoaMap
            plan={current}
            accepted={accepted}
            day={day}
            selected={selected}
            onSelect={selectOnMap}
            onViewActivity={(id) => {
              select(id);
              setView("timeline");
              requestAnimationFrame(() =>
                document.getElementById(`activity-${id}`)?.focus(),
              );
            }}
            preview={!!proposal}
          />
        </section>
      </div>
      <Notice />
      {moving && (
        <MoveActivity
          id={moving}
          onClose={() => setMoving(null)}
          onReview={() => {
            setMoving(null);
            setReview(true);
          }}
        />
      )}
      {review && proposal && (
        <ImpactReview
          onClose={() => setReview(false)}
          onApplied={() => setReview(false)}
          onAdjust={() => {
            const id = proposal.activityId;
            setReview(false);
            setMoving(id);
          }}
        />
      )}
      {historyOpen && (
        <Modal
          title="How the plan changed"
          eyebrow="REVISION HISTORY"
          onClose={() => setHistoryOpen(false)}
        >
          <div className="revision-history modal-body">
            {[...history].reverse().map((entry) => (
              <article key={`${entry.revision}-${entry.appliedAt}`}>
                <span className="revision-marker">R{entry.revision}</span>
                <div>
                  <strong>{entry.title}</strong>
                  <p>{entry.detail}</p>
                  <small>
                    {money(entry.totalBefore)} → {money(entry.totalAfter)} · {new Intl.DateTimeFormat("en-IN", {
                      day: "numeric",
                      month: "short",
                      hour: "numeric",
                      minute: "2-digit",
                    }).format(new Date(entry.appliedAt))}
                  </small>
                </div>
              </article>
            ))}
            <article>
              <span className="revision-marker">R1</span>
              <div>
                <strong>Original Goa itinerary</strong>
                <p>Four relaxed days · {money(3760000)} shared estimate</p>
              </div>
            </article>
          </div>
          <div className="modal-footer">
            <p className="small muted">Undo restores the snapshot before the latest accepted change.</p>
            <button className="button secondary" onClick={() => setHistoryOpen(false)}>Done</button>
          </div>
        </Modal>
      )}
    </main>
  );
}
