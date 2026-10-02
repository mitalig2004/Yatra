import { test } from "node:test";
import assert from "node:assert/strict";
import {
  initialPlan,
  totals,
  makeProposal,
  applyProposal,
  schedule,
  validPlan,
} from "../src/lib/planner";
test("four-day budget reconciles exactly", () => {
  const t = totals(initialPlan());
  assert.equal(t.total, 3760000);
  assert.deepEqual(
    t.days.map((d) => d.total),
    [540000, 600000, 460000, 460000],
  );
  assert.ok(t.days.every((d) => !d.conflicts.length));
});
test("café move is isolated and adds only transport", () => {
  const p = initialPlan(),
    snapshot = JSON.stringify(p),
    proposal = makeProposal(p, "cafe", 1, 2);
  assert.equal(JSON.stringify(p), snapshot);
  assert.equal(totals(proposal.plan).total, 3800000);
  assert.deepEqual(
    totals(proposal.plan).days.map((d) => d.total),
    [460000, 720000, 460000, 460000],
  );
  assert.equal(totals(proposal.plan).transport - totals(p).transport, 40000);
  assert.equal(
    proposal.plan.days.flat().filter((id) => id === "cafe").length,
    1,
  );
});
test("afternoon placement conflicts by exactly 20 minutes and cannot commit", () => {
  const p = initialPlan(),
    proposal = makeProposal(p, "cafe", 1, 2);
  assert.equal(schedule(proposal.plan, 1).conflicts[0].late, 20);
  assert.throws(() => applyProposal(p, proposal), /Resolve/);
});
test("both alternatives keep reservation and reconcile", () => {
  for (const position of [1, 3]) {
    const p = initialPlan(),
      proposal = makeProposal(p, "cafe", 1, position);
    const next = applyProposal(p, proposal);
    assert.equal(next.revision, 2);
    assert.equal(totals(next).total, 3800000);
    assert.equal(
      schedule(next, 1).items.find((i) => i.activity.id === "sunset")?.start,
      1020,
    );
  }
});
test("optional stroll is opt-in with a schedule effect but no extra cost", () => {
  const p = initialPlan(),
    base = makeProposal(p, "cafe", 1, 1),
    walk = makeProposal(p, "cafe", 1, 1, true);
  assert.ok(!base.plan.days.flat().includes("stroll"));
  assert.ok(walk.plan.days.flat().includes("stroll"));
  assert.equal(totals(walk.plan).total, totals(base.plan).total);
  assert.equal(schedule(walk.plan, 1).free, schedule(base.plan, 1).free - 20);
});
test("stale revision and fixed activity rejected; valid persisted plan checked", () => {
  const p = initialPlan(),
    proposal = makeProposal(p, "cafe", 1, 1);
  assert.throws(
    () => applyProposal({ ...p, revision: 2 }, proposal),
    /out of date/,
  );
  assert.throws(() => makeProposal(p, "sunset", 0, 1));
  assert.ok(validPlan(p));
  assert.ok(!validPlan({ ...p, days: [[], [], [], []] }));
});
test("a later unrelated move preserves an explicitly accepted stroll", () => {
  const first = initialPlan();
  const accepted = applyProposal(
    first,
    makeProposal(first, "cafe", 1, 1, true),
  );
  const next = makeProposal(accepted, "fort", 3, 1);
  assert.ok(next.plan.days[1].includes("stroll"));
  assert.equal(next.plan.stroll, true);
});
