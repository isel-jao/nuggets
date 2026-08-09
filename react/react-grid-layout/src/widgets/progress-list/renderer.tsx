import { WidgetFrame } from "../lib/frame";
import { integer, percent } from "../lib/format";

const data = [
  { label: "google.com", value: 4_820 },
  { label: "github.com", value: 3_140 },
  { label: "news.ycombinator.com", value: 1_960 },
  { label: "twitter.com", value: 1_270 },
  { label: "reddit.com", value: 840 },
];

const total = data.reduce((sum, item) => sum + item.value, 0);
const peak = Math.max(...data.map((item) => item.value));

export function Renderer() {
  return (
    <WidgetFrame
      title="Top referrers"
      subtitle={`${integer(total)} sessions, last 7 days`}
      bodyClassName="overflow-auto"
    >
      <ul className="flex flex-col gap-2.5">
        {data.map((item) => (
          <li key={item.label} className="flex flex-col gap-1">
            <div className="flex items-baseline justify-between gap-2 text-xs">
              <span className="truncate text-foreground">{item.label}</span>
              <span className="shrink-0 tabular-nums text-muted">
                {integer(item.value)}
                <span className="pl-1.5 text-muted-foreground">
                  {percent((item.value / total) * 100)}
                </span>
              </span>
            </div>
            {/* Track is a lighter step of the fill's own ramp. */}
            <div
              className="h-1.5 w-full overflow-hidden rounded-full"
              style={{ backgroundColor: "var(--seq-1)" }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(item.value / peak) * 100}%`,
                  backgroundColor: "var(--chart-1)",
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    </WidgetFrame>
  );
}
