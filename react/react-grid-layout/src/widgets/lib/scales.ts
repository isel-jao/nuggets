export interface Point {
  x: number;
  y: number;
}

export interface Padding {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

/** Snaps a step to 1, 2, 5 or 10 times a power of ten. */
function niceStep(rawStep: number) {
  const exponent = Math.floor(Math.log10(rawStep));
  const fraction = rawStep / 10 ** exponent;
  const niceFraction =
    fraction < 1.5 ? 1 : fraction < 3 ? 2 : fraction < 7 ? 5 : 10;
  return niceFraction * 10 ** exponent;
}

/**
 * Rounds a domain out to clean tick values (0 / 1,000 / 2,000) so the axis
 * carries the values that aren't directly labeled. The step comes from the
 * real range — rounding the range up first would leave a third of the plot
 * empty above the tallest mark.
 */
export function niceScale(min: number, max: number, tickCount = 5) {
  const safeMax = max === min ? min + 1 : max;
  const step = niceStep((safeMax - min) / (tickCount - 1));
  const niceMin = Math.floor(min / step) * step;
  const niceMax = Math.ceil(safeMax / step) * step;

  const ticks: number[] = [];
  for (let value = niceMin; value <= niceMax + step / 2; value += step) {
    // Re-round: repeated addition of a fractional step drifts.
    ticks.push(Number(value.toPrecision(12)));
  }

  return { min: niceMin, max: niceMax, ticks };
}

export function scaleLinear(
  domain: [number, number],
  range: [number, number],
): (value: number) => number {
  const [d0, d1] = domain;
  const [r0, r1] = range;
  const span = d1 - d0;
  if (span === 0) return () => r0;
  return (value) => r0 + ((value - d0) / span) * (r1 - r0);
}

export function polyline(points: Point[]) {
  return points
    .map((point, index) => `${index === 0 ? "M" : "L"}${point.x} ${point.y}`)
    .join(" ");
}

export function areaPath(points: Point[], baseline: number) {
  if (points.length === 0) return "";
  const first = points[0];
  const last = points[points.length - 1];
  return `${polyline(points)} L${last.x} ${baseline} L${first.x} ${baseline} Z`;
}

/** Column: 4px rounded cap, square where it meets the baseline. */
export function columnPath(x: number, y: number, width: number, height: number, radius = 4) {
  const r = Math.max(0, Math.min(radius, width / 2, height));
  const bottom = y + height;
  return [
    `M${x} ${bottom}`,
    `L${x} ${y + r}`,
    `Q${x} ${y} ${x + r} ${y}`,
    `L${x + width - r} ${y}`,
    `Q${x + width} ${y} ${x + width} ${y + r}`,
    `L${x + width} ${bottom}`,
    "Z",
  ].join(" ");
}

/** Horizontal bar: rounded at the tip, square at the baseline. */
export function barPath(x: number, y: number, width: number, height: number, radius = 4) {
  const r = Math.max(0, Math.min(radius, height / 2, width));
  const right = x + width;
  return [
    `M${x} ${y}`,
    `L${right - r} ${y}`,
    `Q${right} ${y} ${right} ${y + r}`,
    `L${right} ${y + height - r}`,
    `Q${right} ${y + height} ${right - r} ${y + height}`,
    `L${x} ${y + height}`,
    "Z",
  ].join(" ");
}

export function polar(cx: number, cy: number, radius: number, angle: number): Point {
  return { x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) };
}

/**
 * Ring segment. Angles are radians clockwise from 12 o'clock; the caller pads
 * them so neighbours are separated by surface, not by a stroke.
 */
export function ringPath(
  cx: number,
  cy: number,
  outerRadius: number,
  innerRadius: number,
  startAngle: number,
  endAngle: number,
) {
  const start = startAngle - Math.PI / 2;
  const end = endAngle - Math.PI / 2;
  const largeArc = end - start > Math.PI ? 1 : 0;

  const outerStart = polar(cx, cy, outerRadius, start);
  const outerEnd = polar(cx, cy, outerRadius, end);
  const innerEnd = polar(cx, cy, innerRadius, end);
  const innerStart = polar(cx, cy, innerRadius, start);

  return [
    `M${outerStart.x} ${outerStart.y}`,
    `A${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L${innerEnd.x} ${innerEnd.y}`,
    `A${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${innerStart.x} ${innerStart.y}`,
    "Z",
  ].join(" ");
}

/** Open arc for meters — stroked, so it needs no inner edge. */
export function arcPath(
  cx: number,
  cy: number,
  radius: number,
  startAngle: number,
  endAngle: number,
) {
  const start = polar(cx, cy, radius, startAngle);
  const end = polar(cx, cy, radius, endAngle);
  const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
  return `M${start.x} ${start.y} A${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}

/**
 * Keeps axis labels from colliding: returns the stride at which a label of
 * `labelWidth` still fits inside `bandWidth`.
 */
export function labelStride(count: number, bandWidth: number, labelWidth = 34) {
  if (bandWidth >= labelWidth) return 1;
  return Math.min(count, Math.ceil(labelWidth / Math.max(bandWidth, 1)));
}
