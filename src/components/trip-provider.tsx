"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  ACTIVITIES,
  Brief,
  DEFAULT_BRIEF,
  Plan,
  Proposal,
  applyProposal,
  changeImpact,
  initialPlan,
  makeProposal,
  validPlan,
} from "@/lib/planner";
type Snapshot = { plan: Plan; day: number; selected: string };
export type RevisionEntry = {
  revision: number;
  appliedAt: string;
  title: string;
  detail: string;
  activityId: string;
  source: number;
  target: number;
  totalBefore: number;
  totalAfter: number;
  transportDelta: number;
  before: Snapshot;
  after: Snapshot;
};
type Stored = {
  version: 3;
  accepted: Plan;
  proposal: Proposal | null;
  brief: Brief;
  day: number;
  selected: string;
  view: "timeline" | "map";
  history: RevisionEntry[];
};
type TripContextValue = Stored & {
  ready: boolean;
  notice: string;
  storageError: boolean;
  offline: boolean;
  setBrief: (b: Brief) => void;
  setDay: (d: number) => void;
  select: (id: string) => void;
  setView: (v: "timeline" | "map") => void;
  propose: (
    id: string,
    target: number,
    position: number,
    stroll?: boolean,
  ) => void;
  discard: () => void;
  apply: () => void;
  undo: () => void;
  generate: () => void;
  setNotice: (n: string) => void;
};
const KEY = "yatra-milestone-1-v2";
const fresh = (): Stored => ({
  version: 3,
  accepted: initialPlan(),
  proposal: null,
  brief: { ...DEFAULT_BRIEF },
  day: 0,
  selected: "beach",
  view: "timeline",
  history: [],
});
const Context = createContext<TripContextValue | null>(null);
export function TripProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Stored>(fresh),
    [ready, setReady] = useState(false),
    [notice, setNotice] = useState(""),
    [storageError, setStorageError] = useState(false),
    [offline, setOffline] = useState(false);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const s = JSON.parse(raw) as Stored & { version: number };
        if (
          ![2, 3].includes(s.version) ||
          !validPlan(s.accepted) ||
          !Number.isInteger(s.day) ||
          s.day < 0 ||
          s.day > 3 ||
          !ACTIVITIES[s.selected] ||
          !s.brief ||
          !Number.isFinite(s.brief.budget) ||
          s.brief.budget <= 0 ||
          typeof s.brief.name !== "string"
        )
          throw Error();
        const featuredBrief = {
          ...DEFAULT_BRIEF,
          name: s.brief.name?.trim() || DEFAULT_BRIEF.name,
        };
        setState({
          ...fresh(),
          ...s,
          version: 3,
          brief: featuredBrief,
          proposal:
            s.proposal &&
            validPlan(s.proposal.plan) &&
            s.proposal.baseRevision === s.accepted.revision
              ? s.proposal
              : null,
          history:
            s.version === 3 && Array.isArray(s.history)
              ? s.history.filter(
                  (h) => validPlan(h.before?.plan) && validPlan(h.after?.plan),
                )
              : [],
        });
      }
    } catch {
      setNotice(
        "Saved data could not be restored. Your original demo plan is ready.",
      );
    }
    setReady(true);
    setOffline(!navigator.onLine);
    const on = () => setOffline(!navigator.onLine);
    window.addEventListener("online", on);
    window.addEventListener("offline", on);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", on);
    };
  }, []);
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }, [state, ready]);
  useEffect(() => {
    if (!storageError) return;
    const warn = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [storageError]);
  const select = (id: string) => {
    if (ACTIVITIES[id]) setState((s) => ({ ...s, selected: id }));
  };
  const propose = (
    id: string,
    target: number,
    position: number,
    stroll = state.accepted.stroll,
  ) =>
    setState((s) => ({
      ...s,
      proposal: makeProposal(s.accepted, id, target, position, stroll),
      day: target,
      selected: id,
    }));
  const discard = () =>
    setState((s) => ({
      ...s,
      proposal: null,
      day: s.proposal?.source ?? s.day,
      selected: s.proposal?.activityId ?? s.selected,
    }));
  const apply = () => {
    if (!state.proposal) return;
    try {
      const accepted = applyProposal(state.accepted, state.proposal);
      const impact = changeImpact(state.accepted, state.proposal, state.brief.budget);
      const activity = ACTIVITIES[state.proposal.activityId];
      const entry: RevisionEntry = {
        revision: accepted.revision,
        appliedAt: new Date().toISOString(),
        title: `${activity.name} moved to Day ${state.proposal.target + 1}`,
        detail: `Day ${state.proposal.source + 1} → Day ${state.proposal.target + 1} · ${impact.transportDelta >= 0 ? "+" : "−"}${Math.abs(impact.transportDelta) / 100} estimated transport`,
        activityId: activity.id,
        source: state.proposal.source,
        target: state.proposal.target,
        totalBefore: impact.before.total,
        totalAfter: impact.after.total,
        transportDelta: impact.transportDelta,
        before: {
          plan: state.accepted,
          day: state.proposal.source,
          selected: activity.id,
        },
        after: {
          plan: accepted,
          day: state.proposal.target,
          selected: activity.id,
        },
      };
      setState((s) => ({
        ...s,
        accepted,
        view: "timeline",
        proposal: null,
        history: [...s.history, entry],
        day: s.proposal!.target,
        selected: s.proposal!.activityId,
      }));
      setNotice(
        `Plan updated. ${activity.name} is now on Day ${state.proposal.target + 1}.`,
      );
    } catch (e) {
      setNotice((e as Error).message);
    }
  };
  const undo = () => {
    setState((s) => {
      const last = s.history.at(-1);
      if (!last) return s;
      return {
        ...s,
        accepted: { ...last.before.plan, revision: s.accepted.revision + 1 },
        proposal: null,
        day: last.before.day,
        view: "timeline",
        selected: last.before.selected,
        history: s.history.slice(0, -1),
      };
    });
    setNotice("Move undone. Previous plan restored.");
  };
  return (
    <Context.Provider
      value={{
        ...state,
        ready,
        notice,
        storageError,
        offline,
        setNotice,
        select,
        propose,
        discard,
        apply,
        undo,
        setBrief: (brief) => setState((s) => ({ ...s, brief })),
        setDay: (day) =>
          setState((s) => ({
            ...s,
            day,
            selected:
              (s.proposal?.plan ?? s.accepted).days[day][0] ?? s.selected,
          })),
        setView: (view) => setState((s) => ({ ...s, view })),
        generate: () => {
          setState((s) => ({ ...fresh(), brief: s.brief }));
          setNotice("");
        },
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function useTrip() {
  const value = useContext(Context);
  if (!value) throw Error("TripProvider required");
  return value;
}
