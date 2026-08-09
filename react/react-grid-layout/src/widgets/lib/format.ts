const compactFormatter = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1,
});

const integerFormatter = new Intl.NumberFormat("en-US");

/** 1,284 stays exact; 12,900 becomes 12.9K. Used for stat values and ticks. */
export function compact(value: number) {
  return Math.abs(value) < 10_000
    ? integerFormatter.format(value)
    : compactFormatter.format(value);
}

export function integer(value: number) {
  return integerFormatter.format(value);
}

export function currency(value: number) {
  return `$${compact(value)}`;
}

export function percent(value: number, digits = 0) {
  return `${value.toFixed(digits)}%`;
}

/** Signed, for deltas: +4.2% / -1.8%. */
export function signedPercent(value: number, digits = 1) {
  return `${value > 0 ? "+" : value < 0 ? "-" : ""}${Math.abs(value).toFixed(digits)}%`;
}

export function duration(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
}

/** "3h ago" / "2d ago" — relative to a fixed reference so demos stay stable. */
export function relativeTime(minutesAgo: number) {
  if (minutesAgo < 60) return `${minutesAgo}m ago`;
  if (minutesAgo < 60 * 24) return `${Math.floor(minutesAgo / 60)}h ago`;
  return `${Math.floor(minutesAgo / (60 * 24))}d ago`;
}
