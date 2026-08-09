import { useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import { WidgetFrame } from "../lib/frame";
import { compact, integer } from "../lib/format";

type Health = "good" | "warning" | "critical";

interface Row {
  service: string;
  requests: number;
  latency: number;
  health: Health;
}

const rows: Row[] = [
  { service: "api-gateway", requests: 1_284_000, latency: 128, health: "good" },
  { service: "auth", requests: 642_500, latency: 96, health: "good" },
  { service: "billing", requests: 88_300, latency: 412, health: "warning" },
  { service: "search", requests: 371_900, latency: 244, health: "good" },
  { service: "media-encode", requests: 24_100, latency: 1_870, health: "critical" },
  { service: "webhooks", requests: 158_600, latency: 302, health: "warning" },
];

/** Status colors are reserved and always ship with an icon plus a word. */
const health: Record<Health, { color: string; label: string }> = {
  good: { color: "var(--good)", label: "Healthy" },
  warning: { color: "var(--warning)", label: "Degraded" },
  critical: { color: "var(--critical)", label: "Failing" },
};

type SortKey = keyof Pick<Row, "service" | "requests" | "latency">;

const columns: { key: SortKey; label: string; numeric: boolean }[] = [
  { key: "service", label: "Service", numeric: false },
  { key: "requests", label: "Requests", numeric: true },
  { key: "latency", label: "p95", numeric: true },
];

function HealthDot({ level }: { level: Health }) {
  return (
    <span
      aria-hidden
      className="size-1.5 shrink-0 rounded-full"
      style={{ backgroundColor: health[level].color }}
    />
  );
}

export function Renderer() {
  const [sortKey, setSortKey] = useState<SortKey>("requests");
  const [ascending, setAscending] = useState(false);

  const sorted = useMemo(() => {
    const direction = ascending ? 1 : -1;
    return [...rows].sort((a, b) => {
      const left = a[sortKey];
      const right = b[sortKey];
      if (typeof left === "number" && typeof right === "number") {
        return (left - right) * direction;
      }
      return String(left).localeCompare(String(right)) * direction;
    });
  }, [sortKey, ascending]);

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) {
      setAscending((previous) => !previous);
      return;
    }
    setSortKey(key);
    setAscending(key === "service");
  };

  return (
    <WidgetFrame
      title="Service health"
      subtitle="Last hour"
      bodyClassName="overflow-auto"
    >
      <table className="w-full text-xs">
        <thead className="sticky top-0 bg-card">
          <tr className="border-b">
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                aria-sort={
                  sortKey === column.key
                    ? ascending
                      ? "ascending"
                      : "descending"
                    : "none"
                }
                className={twMerge(
                  "py-1 pr-2 font-medium",
                  column.numeric ? "text-right" : "text-left",
                )}
              >
                <button
                  type="button"
                  onClick={() => toggleSort(column.key)}
                  className={twMerge(
                    "inline-flex items-center gap-1 hover:text-foreground",
                    sortKey === column.key ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {column.label}
                  {sortKey === column.key && (
                    <span aria-hidden>{ascending ? "↑" : "↓"}</span>
                  )}
                </button>
              </th>
            ))}
            <th
              scope="col"
              className="py-1 text-right font-medium text-muted-foreground"
            >
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((row) => (
            <tr key={row.service} className="border-b last:border-0">
              <td className="py-1 pr-2 text-foreground">{row.service}</td>
              <td className="py-1 pr-2 text-right tabular-nums text-foreground">
                {compact(row.requests)}
              </td>
              <td className="py-1 pr-2 text-right tabular-nums text-foreground">
                {integer(row.latency)}ms
              </td>
              <td className="py-1 text-right">
                <span className="inline-flex items-center gap-1.5 text-muted">
                  <HealthDot level={row.health} />
                  {health[row.health].label}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </WidgetFrame>
  );
}
