/**
 * Deterministic sample data. Widgets are dragged, resized and re-mounted
 * constantly in a grid — a Math.random() dataset would reshuffle on every one
 * of those and make the dashboard look broken.
 */
export function createRandom(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let value = Math.imul(state ^ (state >>> 15), 1 | state);
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

export function randomSeries(
  seed: number,
  count: number,
  { min = 0, max = 100 }: { min?: number; max?: number } = {},
) {
  const random = createRandom(seed);
  return Array.from({ length: count }, () => Math.round(min + random() * (max - min)));
}

/** A series with drift, so trend charts look like a trend and not noise. */
export function randomWalk(
  seed: number,
  count: number,
  { start = 50, volatility = 12, drift = 1.5, min = 0 }: {
    start?: number;
    volatility?: number;
    drift?: number;
    min?: number;
  } = {},
) {
  const random = createRandom(seed);
  let value = start;
  return Array.from({ length: count }, () => {
    value = Math.max(min, value + drift + (random() - 0.5) * volatility);
    return Math.round(value);
  });
}

export const monthLabels = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export const weekdayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
