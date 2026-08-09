/**
 * Chart color roles. Kept out of `chart.tsx` so that file exports only
 * components and stays Fast Refresh friendly.
 *
 * The hexes live in `global.css`; both modes were validated as a set against
 * the widget card surface (#fafafa / #18181b).
 */

/**
 * Categorical slots in fixed order. Index by entity, never by rank — a filter
 * that drops a series must not repaint the survivors. Past eight, fold the
 * tail into "Other" rather than generating a ninth hue.
 */
export const seriesColors = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--chart-6)",
  "var(--chart-7)",
  "var(--chart-8)",
] as const;

/** Sequential ramp for magnitude — one hue, ordered by distance from surface. */
export const sequentialColors = [
  "var(--seq-1)",
  "var(--seq-2)",
  "var(--seq-3)",
  "var(--seq-4)",
  "var(--seq-5)",
] as const;

/** The card surface, used for the 2px rings and gaps that separate marks. */
export const SURFACE = "var(--card)";
