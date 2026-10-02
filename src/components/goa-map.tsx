"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { LocateFixed, Plus, Minus, ArrowRight, Home } from "lucide-react";
import { ACTIVITIES, Plan, STAY, schedule, money, time } from "@/lib/planner";
export function GoaMap({
  plan,
  accepted,
  day,
  selected,
  onSelect,
  onViewActivity,
  preview = false,
}: {
  plan: Plan;
  accepted: Plan;
  day: number;
  selected: string;
  onSelect: (id: string) => void;
  onViewActivity: (id: string) => void;
  preview?: boolean;
}) {
  const [box, setBox] = useState([100, 35, 620, 760]);
  const reduce = useReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const [mapSize, setMapSize] = useState([620, 760]);
  const markerScale = 1 / Math.min(mapSize[0] / box[2], mapSize[1] / box[3]);
  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry.contentRect.width && entry.contentRect.height) {
        setMapSize([entry.contentRect.width, entry.contentRect.height]);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const activities = plan.days[day].map((id) => ACTIVITIES[id]);
  const acceptedDay = schedule(accepted, day);
  const proposedDay = schedule(plan, day);
  const lastDay = useRef(day);
  const current = ACTIVITIES[selected];
  const route = (p: Plan) => {
    const points = [STAY, ...p.days[day].map((id) => ACTIVITIES[id])];
    return points.reduce((path, point, index) => {
      if (index === 0) return `M ${point.x} ${point.y}`;
      const previous = points[index - 1];
      const curve = index % 2 === 0 ? 8 : -8;
      const controlX = (previous.x + point.x) / 2 + curve;
      const controlY = (previous.y + point.y) / 2 - curve;
      return `${path} Q ${controlX} ${controlY} ${point.x} ${point.y}`;
    }, "");
  };
  const fit = () => {
    const points = [STAY, ...activities];
    const x = Math.min(...points.map((p) => p.x)) - 100,
      y = Math.min(...points.map((p) => p.y)) - 110;
    setBox([
      x,
      y,
      Math.max(400, Math.max(...points.map((p) => p.x)) - x + 100),
      Math.max(450, Math.max(...points.map((p) => p.y)) - y + 140),
    ]);
  };
  const zoom = (factor: number) =>
    setBox(([x, y, w, h]) => {
      const nw = Math.min(900, Math.max(300, w * factor)),
        nh = h * (nw / w);
      return [x + (w - nw) / 2, y + (h - nh) / 2, nw, nh];
    });
  useEffect(() => {
    if (lastDay.current !== day) {
      lastDay.current = day;
      fit();
    }
  }, [day]);
  return (
    <div
      className="map-container"
      data-testid="map"
      data-revision={plan.revision}
    >
      <div className="map-top">
        <span>
          <span className="map-live-dot" />{" "}
          {preview ? "PROPOSED ROUTE" : "YOUR DAY, ON THE MAP"}
        </span>
        <button onClick={fit} className="map-fit">
          <LocateFixed size={16} /> Fit day
        </button>
      </div>
      {preview && (
        <div className="map-change-summary" role="status">
          <strong>Day {day + 1} route preview</strong>
          <span>
            {acceptedDay.travel} → {proposedDay.travel} min travel · {acceptedDay.items.length} → {proposedDay.items.length} stops
          </span>
          <span>
            {proposedDay.conflicts.length
              ? `${proposedDay.conflicts[0].late} min late to a fixed time`
              : "Fixed times protected"}
          </span>
        </div>
      )}
      <svg
        ref={svgRef}
        className="goa-map"
        viewBox={box.join(" ")}
        role="group"
        aria-label={`Illustrative Goa route for Day ${day + 1}`}
      >
        <defs>
          <filter id="land-depth" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="-5" dy="8" stdDeviation="7" floodColor="var(--text-primary)" floodOpacity=".14" />
          </filter>
          <pattern
            id="map-grain"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="4" r=".6" fill="var(--map-suggestion)" opacity=".2" />
          </pattern>
          <pattern
            id="forest"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M5 14l4-7 4 7M8 18l4-7 4 7"
              fill="none"
              stroke="var(--map-suggestion)"
              strokeWidth=".8"
              opacity=".35"
            />
          </pattern>
        </defs>
        <rect x="-500" y="-500" width="2000" height="2200" fill="var(--map-water)" />
        <path
          d="M365 -300 C300 -80 400 -15 300 70 C230 100 330 125 282 163 C227 205 241 228 216 265 C180 320 270 350 266 398 C265 428 222 453 267 485 C300 518 335 540 310 565 C267 610 340 625 359 670 C382 725 360 770 397 835 L422 1150 L1200 1150 L1200 -300Z"
          fill="var(--map-land)"
          stroke="var(--map-geography)"
          strokeWidth="3"
          filter="url(#land-depth)"
        />
        <path
          d="M306 69 C398 107 429 119 508 136 C580 142 650 175 745 162"
          fill="none"
          stroke="var(--map-water)"
          strokeWidth="22"
        />
        <path
          d="M310 565 C375 555 407 595 477 602 C520 609 538 624 624 613 C706 600 724 569 810 584"
          fill="none"
          stroke="var(--map-water)"
          strokeWidth="27"
        />
        <path
          d="M580 10 Q625 145 690 195L765 345 705 491 748 582 696 776 777 900 1000 900 1000 0Z"
          fill="var(--map-geography)"
        />
        <path
          d="M580 10 Q625 145 690 195L765 345 705 491 748 582 696 776 777 900 1000 900 1000 0Z"
          fill="url(#forest)"
        />
        <path
          d="M440 -20Q415 70 445 180T425 340Q412 415 470 490T492 663L580 865M320 100Q370 180 355 280T380 460L440 550M267 200Q380 225 480 220T695 277M272 348Q380 350 445 400T690 418M354 656Q458 691 610 711M486 200L580 300 535 425 590 516 570 685"
          fill="none"
          stroke="var(--map-geography)"
          strokeWidth="8"
          strokeLinejoin="round"
        />
        <path
          d="M580 -30Q575 95 605 200T600 390Q615 465 628 540T640 855"
          fill="none"
          stroke="var(--map-suggestion)"
          strokeWidth="5"
        />
        <path
          d="M580 -30Q575 95 605 200T600 390Q615 465 628 540T640 855"
          fill="none"
          stroke="var(--map-land)"
          strokeWidth="2"
        />
        <path
          d="M400 130L490 180 535 240M365 290L465 285 580 300M335 390L460 410 535 425M470 490L610 500M465 635L525 735 570 685M290 220L345 345"
          stroke="var(--map-geography)"
          strokeWidth="4"
          fill="none"
        />
        <rect
          x="200"
          y="0"
          width="650"
          height="900"
          fill="url(#map-grain)"
          pointerEvents="none"
        />
        <g className="map-geography" aria-hidden="true">
          <text
            x="125"
            y="470"
            transform="rotate(-75 125 470)"
            className="sea-label"
          >
            ARABIAN SEA
          </text>
          <text x="354" y="53">
            MORJIM
          </text>
          <text x="365" y="191">
            CHAPORA
          </text>
          <text x="215" y="292">
            VAGATOR
          </text>
          <text x="413" y="263">
            ASSAGAO
          </text>
          <text x="265" y="415">
            ANJUNA
          </text>
          <text x="570" y="215">
            MAPUSA
          </text>
          <text x="335" y="525">
            CALANGUTE
          </text>
          <text x="473" y="663">
            PANJIM
          </text>
          <text x="603" y="757">
            FONTAINHAS
          </text>
          <text x="641" y="100" className="map-region">
            NORTH GOA
          </text>
          <text x="422" y="594" className="river-label">
            Mandovi River
          </text>
          <text x="467" y="129" className="river-label">
            Chapora River
          </text>
        </g>
        <motion.path
          className="route-depth"
          initial={false}
          animate={{ d: route(accepted) }}
          transition={{ duration: reduce ? 0 : 0.32, ease: "easeOut" }}
          fill="none"
          stroke="var(--map-land)"
          strokeWidth="8"
          strokeLinejoin="round"
          strokeLinecap="round"
          opacity={preview ? 0.28 : 0.55}
          aria-hidden="true"
        />
        <motion.path
          key={`accepted-${accepted.revision}-${day}`}
          className="accepted-route"
          initial={reduce ? false : { pathLength: 0, opacity: 0.25 }}
          animate={{ d: route(accepted), pathLength: 1, opacity: preview ? 0.5 : 0.78 }}
          transition={{ duration: reduce ? 0 : 0.32, ease: "easeOut" }}
          fill="none"
          stroke={preview ? "var(--map-route-preview)" : "var(--map-route)"}
          strokeWidth={preview ? 2.5 : 3.5}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {preview && (
          <motion.path
            key={`preview-${plan.days[day].join("-")}`}
            className="preview-route"
            initial={reduce ? false : { opacity: 0, pathLength: 0 }}
            animate={{ d: route(plan), opacity: 1, pathLength: 1 }}
            transition={{ duration: reduce ? 0 : 0.42, ease: "easeOut" }}
            fill="none"
            stroke="var(--map-route-preview)"
            strokeWidth="3.5"
            strokeDasharray="10 7"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        )}
        <g className="stay-marker" transform={`translate(${STAY.x} ${STAY.y})`}>
          <g transform={`scale(${markerScale})`}>
            <ellipse className="map-marker-shadow" cx="2" cy="22" rx="18" ry="7" />
            <rect x="-19" y="-19" width="38" height="38" rx="5" />
            <path d="M-9 0L0-8 9 0M-6-2V9H6V-2M-2 9V3H2V9" />
            <text x="26" y="5" className="stay-label">Your stay</text>
          </g>
        </g>
        {activities.map((a, i) => (
          <g
            key={a.id}
            role="button"
            tabIndex={0}
            aria-label={`Stop ${i + 1}: ${a.name}${selected === a.id ? ", selected" : ""}`}
            aria-pressed={selected === a.id}
            className={`map-marker ${selected === a.id ? "selected" : ""}`}
            transform={`translate(${a.x} ${a.y})`}
            onClick={() => onSelect(a.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect(a.id);
              }
            }}
          >
            <g transform={`scale(${markerScale})`}>
              <ellipse className="map-marker-shadow" cx="2" cy="18" rx="15" ry="6" />
              <motion.g
                initial={false}
                animate={{ y: selected === a.id ? -4 : 0 }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 330, damping: 24 }
                }
              >
                <circle className="marker-hit" r="25" fill="transparent" />
                {selected === a.id && (
                  <circle
                    className="marker-selection"
                    r="24"
                  />
                )}
                <circle
                  className="marker-core"
                  r={selected === a.id ? 17 : 14}
                />
                <text
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={selected === a.id ? "var(--brand-on-primary)" : "var(--text-primary)"}
                  fontSize={selected === a.id ? 14 : 12}
                  fontWeight="700"
                >
                  {i + 1}
                </text>
              </motion.g>
            </g>
          </g>
        ))}
      </svg>
      <div className="map-compass" aria-hidden="true">
        <span>N</span>
        <span>↑</span>
      </div>
      <div className="map-zoom">
        <button aria-label="Zoom in" onClick={() => zoom(0.8)}>
          <Plus size={18} />
        </button>
        <button aria-label="Zoom out" onClick={() => zoom(1.25)}>
          <Minus size={18} />
        </button>
      </div>
      <div className="map-bottom">
        {current && plan.days[day].includes(selected) && (
          <div className="map-selected">
            <span className="map-selected-number">
              {plan.days[day].indexOf(selected) + 1}
            </span>
            <div>
              <span className="eyebrow">
                {current.category} · {preview ? "PREVIEW" : "SELECTED STOP"}
              </span>
              <strong>{current.name}</strong>
              <span>
                {current.area} · {money(current.cost)} for two
              </span>
            </div>
            <button
              className="map-selected-action"
              onClick={() => onViewActivity(selected)}
              aria-label={`View ${current.name} in the timeline`}
            >
              <span>View stop</span><ArrowRight size={16} />
            </button>
          </div>
        )}
        <div className="map-legend">
          <span>
            <i className="accepted" />
            {preview ? "Accepted route" : "Day route"}
          </span>
          {preview && (
            <span>
              <i className="preview" />
              Preview
            </span>
          )}
          <span>
            <Home size={13} />
            Stay
          </span>
        </div>
        <p>Illustrative map · Estimated travel · Not for navigation</p>
      </div>
      <details className="route-accessible">
        <summary>View the route as a list</summary>
        <ol>
          {schedule(plan, day).items.map((s, i) => (
            <li key={s.activity.id}>
              <button
                onClick={() => onSelect(s.activity.id)}
                aria-pressed={selected === s.activity.id}
              >
                <span>
                  {i + 1}. {s.activity.name}
                </span>
                <span>
                  {time(s.start)} · {s.transit.minutes} min travel
                </span>
              </button>
            </li>
          ))}
        </ol>
      </details>
    </div>
  );
}
