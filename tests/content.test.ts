import { test } from "node:test";
import assert from "node:assert/strict";
import { details, byId } from "../src/data/details";
import { sources } from "../src/data/sources";
import { journeyIds, threads } from "../src/data/threads";
import {
  imageRect,
  nextIndex,
  parseJournal,
  toggleId,
  emptyJournal,
} from "../src/state";
test("25 bilingual entries have valid image boxes and visually checked coordinates", () => {
  assert.equal(details.length, 25);
  assert.equal(new Set(details.map((d) => d.id)).size, 25);
  for (const d of details) {
    for (const field of [d.title, d.hook, d.observation, d.context, d.question])
      for (const lang of ["ru", "en"] as const)
        assert.ok(field[lang].trim().length > 0);
    const b = d.box;
    assert.ok(
      b.x >= 0 &&
        b.y >= 0 &&
        b.width > 0 &&
        b.height > 0 &&
        b.x + b.width <= 1 &&
        b.y + b.height <= 1,
    );
    assert.equal(d.coordinateReview, "visually_checked");
    assert.equal(d.anchor.x, b.x + b.width / 2);
    assert.equal(d.anchor.y, b.y + b.height / 2);
    assert.ok(d.sourceIds.includes("image"));
  }
});
test("every interpretation references a known source and remains distinct from observation", () => {
  for (const d of details)
    for (const claim of d.interpretations) {
      assert.ok(claim.sourceIds.length > 0);
      for (const id of claim.sourceIds)
        assert.ok(sources.find((s) => s.id === id));
      assert.ok(
        [
          "museum_interpretation",
          "scholarly_argument",
          "visual_comparison",
        ].includes(claim.kind),
      );
      for (const lang of ["ru", "en"] as const) assert.ok(claim.text[lang]);
    }
  for (const s of sources) assert.equal(new URL(s.url).protocol, "https:");
});
test("journey is ordered Eden → Garden → Hell, covers retained five scenes, and stops at its end", () => {
  assert.equal(journeyIds.length, 15);
  const order = { eden: 0, garden: 1, hell: 2 };
  let previous = -1;
  for (const id of journeyIds) {
    assert.ok(byId[id]);
    assert.ok(order[byId[id].panel] >= previous);
    previous = order[byId[id].panel];
  }
  for (const id of ["eden", "fountain", "circle", "globe", "tree-man"])
    assert.ok(journeyIds.includes(id));
  assert.equal(nextIndex(14, 15, 1), 14);
  assert.equal(nextIndex(0, 15, -1), 0);
  assert.equal(nextIndex(6, 15, 1), 7);
});
test("all relationships resolve and symbol threads compare multiple details", () => {
  for (const d of details) for (const id of d.related) assert.ok(byId[id]);
  assert.equal(threads.length, 5);
  for (const t of threads) {
    assert.equal(t.kind, "visual_comparison");
    assert.ok(t.detailIds.length >= 3);
    for (const id of t.detailIds) assert.ok(byId[id]);
  }
});
test("corrupt, outdated and partially invalid browser journals recover safely", () => {
  const ids = details.map((d) => d.id),
    ts = threads.map((t) => t.id);
  assert.deepEqual(parseJournal("{bad", ids, ts), emptyJournal());
  assert.deepEqual(parseJournal('{"version":9}', ids, ts), emptyJournal());
  const j = parseJournal(
    JSON.stringify({
      version: 1,
      seen: ["eden", "eden", "missing"],
      saved: ["globe", null],
      notes: { eden: "question", missing: "discard" },
      journeyIndex: -1,
      threads: ["birds", "invalid"],
    }),
    ids,
    ts,
  );
  assert.deepEqual(j.seen, ["eden"]);
  assert.deepEqual(j.saved, ["globe"]);
  assert.deepEqual(j.notes, { eden: "question" });
  assert.equal(j.journeyIndex, 0);
  assert.deepEqual(j.threads, ["birds"]);
  assert.deepEqual(toggleId(["eden"], "eden"), []);
});
test("normalised geometry maps to original native pixels, including a non-square image", () => {
  const b = imageRect(
    { x: 0.25, y: 0.5, width: 0.1, height: 0.2 },
    39137,
    22279,
  );
  assert.equal(b.x, 9784.25);
  assert.equal(b.y, 11139.5);
  assert.ok(Math.abs(b.width - 3913.7) < 1e-7);
  assert.ok(Math.abs(b.height - 4455.8) < 1e-7);
});
