export type Activity = {
  id: string;
  name: string;
  area: string;
  category:
    "Beach" | "Café" | "Food" | "Culture" | "Nightlife" | "Shopping" | "Walk";
  duration: number;
  preferred: number;
  cost: number;
  x: number;
  y: number;
  description: string;
  fixed?: boolean;
  image?: string;
  savedBy?: string[];
  opensAt?: number;
  closesAt?: number;
};
export type Plan = {
  revision: number;
  days: string[][];
  cafeStart?: number;
  stroll: boolean;
};
export type Proposal = {
  baseRevision: number;
  activityId: string;
  source: number;
  target: number;
  position: number;
  plan: Plan;
};
export type Brief = {
  destination: string;
  days: number;
  travelers: number;
  budget: number;
  pace: string;
  interests: string[];
  name: string;
};
export type PlanningWarning = {
  kind:
    | "insufficient-travel"
    | "time-overlap"
    | "opening-hours"
    | "packed-day"
    | "budget"
    | "breathing-room";
  day?: number;
  activityId?: string;
  message: string;
};
export type ChangeImpact = {
  before: ReturnType<typeof totals>;
  after: ReturnType<typeof totals>;
  transportDelta: number;
  totalDelta: number;
  warnings: PlanningWarning[];
  summary: string;
};
export const RELAXED_PACE = {
  targetStops: 4,
  minimumBreathingRoom: 90,
  principle: "Aim for four meaningful stops and protect at least 90 minutes of breathing room.",
};
export const DEFAULT_BRIEF: Brief = {
  destination: "Goa",
  days: 4,
  travelers: 2,
  budget: 4000000,
  pace: "Relaxed",
  interests: ["Beaches", "Cafés", "Local food", "Nightlife"],
  name: "A little Goa, a little slower",
};
const activity = (
  id: string,
  name: string,
  area: string,
  category: Activity["category"],
  duration: number,
  preferred: number,
  rupees: number,
  x: number,
  y: number,
  description: string,
  fixed = false,
  image?: string,
): Activity => ({
  id,
  name,
  area,
  category,
  duration,
  preferred,
  cost: rupees * 100,
  x,
  y,
  description,
  fixed,
  image,
});
export const ACTIVITIES: Record<string, Activity> = {
  beach: activity(
    "beach",
    "An unhurried Vagator morning",
    "Vagator Beach",
    "Beach",
    120,
    540,
    0,
    245,
    255,
    "Bare feet, a sea breeze, and absolutely no rush.",
    false,
    "/images/goa-coast.jpg",
  ),
  cafe: activity(
    "cafe",
    "A slow coffee at Assagao",
    "Assagao · neighbourhood café",
    "Café",
    90,
    720,
    900,
    465,
    285,
    "Good coffee, something freshly baked, and time to linger.",
    false,
    "/images/cafe.jpg",
  ),
  lunch: activity(
    "lunch",
    "A taste of the Goan coast",
    "Anjuna · local kitchen",
    "Food",
    75,
    840,
    1500,
    335,
    390,
    "A leisurely fish thali, or its equally lovely vegetarian cousin.",
  ),
  fort: activity(
    "fort",
    "Golden hour at Chapora",
    "Chapora Fort",
    "Culture",
    60,
    990,
    200,
    270,
    165,
    "Climb the old walls for a wide-open view of the river and sea.",
  ),
  dinner: activity(
    "dinner",
    "Dinner with an ocean soundtrack",
    "Vagator · coastal kitchen",
    "Food",
    90,
    1140,
    1800,
    260,
    310,
    "A table by the coast, local flavours, and nowhere else to be.",
  ),
  market: activity(
    "market",
    "Little finds in Anjuna",
    "Anjuna · market lanes",
    "Shopping",
    90,
    600,
    600,
    345,
    345,
    "Wander the local stalls. A small allowance for something to take home.",
  ),
  lunch2: activity(
    "lunch2",
    "Lunch in the village",
    "Assagao · local kitchen",
    "Food",
    90,
    780,
    1600,
    520,
    340,
    "A long lunch under the trees, away from the busiest beach roads.",
  ),
  sunset: activity(
    "sunset",
    "Your sunset table",
    "Vagator · sea-view terrace",
    "Food",
    90,
    1020,
    2200,
    295,
    225,
    "A user-marked 5 pm table for two. Keep this time protected.",
    true,
    "/images/goa-coast.jpg",
  ),
  supper: activity(
    "supper",
    "One more little bite",
    "Anjuna · evening café",
    "Food",
    60,
    1200,
    600,
    350,
    445,
    "A light supper if you feel like it, then a slow ride home.",
  ),
  lanes: activity(
    "lanes",
    "Colour outside the lines",
    "Fontainhas, Panjim",
    "Culture",
    120,
    600,
    400,
    525,
    735,
    "A self-guided walk through colourful streets and quiet courtyards.",
  ),
  panjim: activity(
    "panjim",
    "A proper Goan lunch",
    "Panjim · neighbourhood kitchen",
    "Food",
    90,
    780,
    1400,
    570,
    685,
    "Regional favourites and a little time out of the midday sun.",
  ),
  river: activity(
    "river",
    "Pause by the Mandovi",
    "Mandovi riverfront",
    "Walk",
    60,
    990,
    200,
    465,
    635,
    "Something cool to drink and boats drifting past.",
  ),
  music: activity(
    "music",
    "Let the evening play out",
    "Panjim · live music venue",
    "Nightlife",
    120,
    1140,
    1600,
    610,
    720,
    "Dinner and a relaxed live set. Programme is illustrative.",
  ),
  morjim: activity(
    "morjim",
    "One last ocean morning",
    "Morjim Beach",
    "Beach",
    120,
    540,
    0,
    320,
    90,
    "An early stretch of sand before the day warms up.",
    false,
    "/images/goa-coast.jpg",
  ),
  brunch: activity(
    "brunch",
    "Brunch, without the hurry",
    "Morjim · beach café",
    "Café",
    90,
    720,
    1200,
    400,
    110,
    "A late breakfast and one more cup.",
  ),
  keepsakes: activity(
    "keepsakes",
    "A little Goa to take home",
    "Assagao · local shops",
    "Shopping",
    60,
    900,
    800,
    570,
    240,
    "A considered souvenir, rather than a last-minute airport purchase.",
  ),
  farewell: activity(
    "farewell",
    "Until next time, Goa",
    "Assagao · garden kitchen",
    "Food",
    90,
    1050,
    1600,
    535,
    420,
    "A final shared meal before your onward plans.",
  ),
  stroll: activity(
    "stroll",
    "A small Assagao detour",
    "Around the café · optional walk",
    "Walk",
    20,
    0,
    0,
    505,
    325,
    "A free twenty-minute neighbourhood stroll, included only by your choice.",
  ),
};
ACTIVITIES.cafe.savedBy = ["You", "Mitali"];
ACTIVITIES.sunset.savedBy = ["Mitali"];
ACTIVITIES.market.closesAt = 840;
ACTIVITIES.music.opensAt = 1080;
export const DAY_INFO = [
  {
    title: "Ease into the coast",
    subtitle: "Salt in the air. Nothing on the clock.",
    area: "Vagator & Assagao",
  },
  {
    title: "A little local life",
    subtitle: "Village lanes, good food, golden light.",
    area: "Anjuna & Vagator",
  },
  {
    title: "The other side of Goa",
    subtitle: "Colourful streets and riverside stories.",
    area: "Panjim & Fontainhas",
  },
  {
    title: "One last ocean morning",
    subtitle: "Leave a little room for doing nothing.",
    area: "Morjim & Assagao",
  },
];
export const STAY = { id: "stay", name: "Your Assagao base", x: 580, y: 300 };
export const LODGING = 1500000;
export const CONTINGENCY = 200000;
export function initialPlan(): Plan {
  return {
    revision: 1,
    days: [
      ["beach", "cafe", "lunch", "fort", "dinner"],
      ["market", "lunch2", "sunset", "supper"],
      ["lanes", "panjim", "river", "music"],
      ["morjim", "brunch", "keepsakes", "farewell"],
    ],
    stroll: false,
  };
}
const legs: Record<string, [number, number]> = {
  "stay:beach": [20, 200],
  "beach:cafe": [15, 100],
  "cafe:lunch": [15, 100],
  "lunch:fort": [25, 200],
  "fort:dinner": [20, 200],
  "dinner:stay": [20, 200],
  "beach:lunch": [40, 300],
  "stay:market": [20, 200],
  "market:lunch2": [20, 200],
  "lunch2:sunset": [25, 200],
  "sunset:supper": [15, 200],
  "supper:stay": [20, 200],
  "market:cafe": [15, 250],
  "cafe:lunch2": [30, 250],
  "lunch2:cafe": [30, 250],
  "cafe:sunset": [20, 250],
  "sunset:cafe": [30, 250],
  "cafe:supper": [30, 250],
  "stay:lanes": [45, 250],
  "lanes:panjim": [10, 100],
  "panjim:river": [10, 100],
  "river:music": [15, 200],
  "music:stay": [45, 350],
  "stay:morjim": [30, 250],
  "morjim:brunch": [10, 100],
  "brunch:keepsakes": [30, 250],
  "keepsakes:farewell": [15, 150],
  "farewell:stay": [15, 250],
};
export function leg(from: string, to: string) {
  if (to === "stroll") return { minutes: 0, cost: 0 };
  if (from === "stroll") from = "cafe";
  const value = legs[`${from}:${to}`] ?? [25, 200];
  return { minutes: value[0], cost: value[1] * 100 };
}
export type Scheduled = {
  activity: Activity;
  start: number;
  end: number;
  arrival: number;
  transit: { minutes: number; cost: number };
  freeBefore: number;
  late: number;
};
export function schedule(
  plan: Plan,
  day: number,
): {
  items: Scheduled[];
  transport: number;
  travel: number;
  free: number;
  total: number;
  conflicts: Scheduled[];
  end: number;
} {
  let end = 510,
    previous = "stay",
    transport = 0,
    travel = 0,
    free = 0;
  const items = plan.days[day].map((id) => {
    const a = ACTIVITIES[id],
      transit = leg(previous, id),
      arrival = end + transit.minutes;
    const preferred =
      id === "cafe" && plan.cafeStart !== undefined
        ? plan.cafeStart
        : a.preferred;
    const start = a.fixed ? preferred : Math.max(preferred, arrival);
    const late = a.fixed ? Math.max(0, arrival - start) : 0;
    const freeBefore = Math.max(0, start - arrival);
    transport += transit.cost;
    travel += transit.minutes;
    free += freeBefore;
    end = start + a.duration;
    previous = id;
    return { activity: a, start, end, arrival, transit, freeBefore, late };
  });
  const back = leg(previous, "stay");
  transport += back.cost;
  travel += back.minutes;
  end += back.minutes;
  free += Math.max(0, 1320 - end);
  return {
    items,
    transport,
    travel,
    free,
    total: items.reduce((sum, s) => sum + s.activity.cost, transport),
    conflicts: items.filter((s) => s.late > 0),
    end,
  };
}
export function totals(plan: Plan) {
  const days = plan.days.map((_, d) => schedule(plan, d));
  return {
    days,
    total: days.reduce((s, d) => s + d.total, LODGING + CONTINGENCY),
    transport: days.reduce((s, d) => s + d.transport, 0),
  };
}
export function planningWarnings(plan: Plan, budget = DEFAULT_BRIEF.budget) {
  const result = totals(plan);
  const warnings: PlanningWarning[] = [];
  result.days.forEach((day, dayIndex) => {
    day.conflicts.forEach((item) =>
      warnings.push(
        {
          kind: "insufficient-travel",
          day: dayIndex,
          activityId: item.activity.id,
          message: `${item.activity.name} would start ${item.late} minutes late because the preceding travel leg does not fit.`,
        },
        {
          kind: "time-overlap",
          day: dayIndex,
          activityId: item.activity.id,
          message: `The preceding activity and travel overlap ${item.activity.name} by ${item.late} minutes.`,
        },
      ),
    );
    day.items.forEach((item) => {
      if (
        (item.activity.opensAt !== undefined && item.start < item.activity.opensAt) ||
        (item.activity.closesAt !== undefined && item.end > item.activity.closesAt)
      )
        warnings.push({
          kind: "opening-hours",
          day: dayIndex,
          activityId: item.activity.id,
          message:
            item.activity.closesAt !== undefined && item.end > item.activity.closesAt
              ? `${item.activity.name} closes at ${time(item.activity.closesAt)}, so it will not fit in this position.`
              : `${item.activity.name} is not open yet at this time.`,
        });
    });
    if (day.items.length > RELAXED_PACE.targetStops + 1)
      warnings.push({
        kind: "packed-day",
        day: dayIndex,
        message: `Day ${dayIndex + 1} has ${day.items.length} stops, which is busy for a relaxed trip.`,
      });
    if (day.free < RELAXED_PACE.minimumBreathingRoom)
      warnings.push({
        kind: "breathing-room",
        day: dayIndex,
        message: `Day ${dayIndex + 1} has less than ${RELAXED_PACE.minimumBreathingRoom} minutes of breathing room.`,
      });
  });
  if (result.total > budget)
    warnings.push({
      kind: "budget",
      message: `The trip is ${money(result.total - budget)} over the shared budget.`,
    });
  return warnings;
}
export function changeImpact(
  accepted: Plan,
  proposal: Proposal,
  budget = DEFAULT_BRIEF.budget,
): ChangeImpact {
  const before = totals(accepted);
  const after = totals(proposal.plan);
  const sourceTravel = after.days[proposal.source].travel - before.days[proposal.source].travel;
  const targetTravel = after.days[proposal.target].travel - before.days[proposal.target].travel;
  const sourceFree = after.days[proposal.source].free - before.days[proposal.source].free;
  const targetFree = after.days[proposal.target].free - before.days[proposal.target].free;
  const signed = (value: number, unit: string) =>
    `${value >= 0 ? "+" : "−"}${Math.abs(value)} ${unit}`;
  return {
    before,
    after,
    transportDelta: after.transport - before.transport,
    totalDelta: after.total - before.total,
    warnings: planningWarnings(proposal.plan, budget),
    summary: `Day ${proposal.source + 1} ${signed(sourceTravel, "min travel")} and ${signed(sourceFree, "min free time")}; Day ${proposal.target + 1} ${signed(targetTravel, "min travel")} and ${signed(targetFree, "min free time")}.`,
  };
}
export function makeProposal(
  accepted: Plan,
  id: string,
  target: number,
  position: number,
  stroll = accepted.stroll,
): Proposal {
  if (!ACTIVITIES[id] || ACTIVITIES[id].fixed || id === "stroll")
    throw Error("This activity cannot be moved.");
  const source = accepted.days.findIndex((d) => d.includes(id));
  if (source < 0 || target < 0 || target > 3)
    throw Error("Choose a valid activity and day.");
  const days = accepted.days.map((d) =>
    d.filter((x) => x !== id && !(id === "cafe" && x === "stroll")),
  );
  position = Math.max(0, Math.min(position, days[target].length));
  days[target].splice(position, 0, id);
  const plan: Plan = {
    ...accepted,
    days,
    stroll: id === "cafe" ? false : accepted.stroll,
  };
  if (id === "cafe") {
    plan.cafeStart =
      target === 1
        ? position <= 1
          ? 705
          : position === 2
            ? 930
            : 1140
        : undefined;
  }
  if (stroll && id === "cafe") {
    days[target].splice(position + 1, 0, "stroll");
    plan.stroll = true;
  }
  return {
    baseRevision: accepted.revision,
    activityId: id,
    source,
    target,
    position,
    plan,
  };
}
export function applyProposal(accepted: Plan, proposal: Proposal): Plan {
  if (accepted.revision !== proposal.baseRevision)
    throw Error("This preview is out of date. Review the move again.");
  if (totals(proposal.plan).days.some((d) => d.conflicts.length))
    throw Error("Resolve the timing conflict before applying.");
  if (planningWarnings(proposal.plan).some((w) => w.kind === "opening-hours"))
    throw Error("Resolve the opening-hours conflict before applying.");
  return { ...proposal.plan, revision: accepted.revision + 1 };
}
export function money(minor: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(minor / 100);
}
export function time(min: number) {
  const h = Math.floor(min / 60) % 24;
  return `${h % 12 || 12}:${String(min % 60).padStart(2, "0")} ${h >= 12 ? "pm" : "am"}`;
}
export function duration(min: number) {
  return min >= 60
    ? `${Math.floor(min / 60)}h${min % 60 ? ` ${min % 60}m` : ""}`
    : `${min} min`;
}
export function validPlan(value: unknown): value is Plan {
  if (!value || typeof value !== "object") return false;
  const p = value as Plan;
  if (
    !Number.isInteger(p.revision) ||
    p.revision < 1 ||
    !Array.isArray(p.days) ||
    p.days.length !== 4 ||
    p.days.some(
      (d) =>
        !Array.isArray(d) ||
        d.some((id) => typeof id !== "string" || !ACTIVITIES[id]),
    )
  )
    return false;
  const ids = p.days.flat();
  const required = initialPlan().days.flat();
  return (
    new Set(ids).size === ids.length &&
    required.every((id) => ids.includes(id)) &&
    typeof p.stroll === "boolean" &&
    (p.cafeStart === undefined || Number.isFinite(p.cafeStart))
  );
}
