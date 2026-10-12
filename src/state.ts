import type { Journal } from "./model";
export const STORAGE_KEY = "inside-bosch:journal:v1";
export const emptyJournal = (): Journal => ({
  version: 1,
  seen: [],
  saved: [],
  notes: {},
  journeyIndex: 0,
  threads: [],
});
export function parseJournal(
  value: string | null,
  ids: readonly string[],
  threadIds: readonly string[],
  maxJourneyIndex = 14,
): Journal {
  if (!value) return emptyJournal();
  try {
    const o = JSON.parse(value);
    if (o?.version !== 1) return emptyJournal();
    const valid = (a: unknown, all: readonly string[]) =>
      Array.isArray(a)
        ? [
            ...new Set(
              a.filter(
                (x): x is string => typeof x === "string" && all.includes(x),
              ),
            ),
          ]
        : [];
    const notes: Record<string, string> = {};
    if (o.notes && typeof o.notes === "object")
      for (const [k, v] of Object.entries(o.notes))
        if (ids.includes(k) && typeof v === "string")
          notes[k] = v.slice(0, 4000);
    return {
      version: 1,
      seen: valid(o.seen, ids),
      saved: valid(o.saved, ids),
      notes,
      journeyIndex:
        typeof o.journeyIndex === "number" && Number.isInteger(o.journeyIndex)
          ? Math.max(0, Math.min(maxJourneyIndex, o.journeyIndex))
          : 0,
      threads: valid(o.threads, threadIds),
    };
  } catch {
    return emptyJournal();
  }
}
export function toggleId(ids: string[], id: string): string[] {
  return ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id];
}
export function nextIndex(
  index: number,
  length: number,
  delta: number,
): number {
  return Math.max(0, Math.min(length - 1, index + delta));
}
export function imageRect(
  box: { x: number; y: number; width: number; height: number },
  width: number,
  height: number,
) {
  return {
    x: box.x * width,
    y: box.y * height,
    width: box.width * width,
    height: box.height * height,
  };
}
