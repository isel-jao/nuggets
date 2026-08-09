import { useState } from "react";
import { ChartCard, ChartTooltip } from "../lib/chart";
import { seriesColors } from "../lib/palette";
import { ringPath } from "../lib/scales";
import { compact, integer, percent } from "../lib/format";

/** Part-to-whole at a glance only — keep this at six segments or fewer. */
const data = [
  { label: "Desktop", value: 4_820 },
  { label: "Mobile", value: 3_610 },
  { label: "Tablet", value: 1_240 },
  { label: "Other", value: 430 },
];

const total = data.reduce((sum, item) => sum + item.value, 0);
const shares = data.map((item) => (item.value / total) * 100);

export function Renderer() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <ChartCard
      title="Traffic by device"
      subtitle="Sessions, last 7 days"
      minHeight={100}
      table={{
        columns: ["Device", "Sessions", "Share"],
        rows: data.map((item, index) => [
          item.label,
          item.value,
          percent(shares[index], 1),
        ]),
      }}
      footer={
        <ul className="flex flex-wrap gap-x-3 gap-y-0.5">
          {data.map((item, index) => (
            <li
              key={item.label}
              className="flex items-center gap-1.5 text-xs text-muted"
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
            >
              <span
                aria-hidden
                className="size-2.5 shrink-0 rounded-xs"
                style={{ backgroundColor: seriesColors[index] }}
              />
              <span className="truncate">{item.label}</span>
              <span className="tabular-nums text-foreground">
                {percent(shares[index])}
              </span>
            </li>
          ))}
        </ul>
      }
    >
      {({ width, height }) => {
        const cx = width / 2;
        const cy = height / 2;
        const outer = Math.max(Math.min(width, height) / 2 - 2, 8);
        const inner = outer * 0.62;
        /* A 2px arc of surface between segments — a gap, never a stroke. */
        const gap = 2 / ((outer + inner) / 2);

        let angle = 0;

        return (
          <>
            <svg width={width} height={height} role="img" aria-label="Traffic by device">
              {data.map((item, index) => {
                const sweep = (item.value / total) * Math.PI * 2;
                const start = angle;
                angle += sweep;
                /* Only pad when the segment can spare it. */
                const pad = sweep > gap * 2 ? gap / 2 : 0;
                return (
                  <path
                    key={item.label}
                    d={ringPath(cx, cy, outer, inner, start + pad, start + sweep - pad)}
                    fill={seriesColors[index]}
                    opacity={hovered === null || hovered === index ? 1 : 0.45}
                    onMouseEnter={() => setHovered(index)}
                    onMouseLeave={() => setHovered(null)}
                  />
                );
              })}

              {inner > 26 && (
                <>
                  <text
                    x={cx}
                    y={cy - 2}
                    textAnchor="middle"
                    className="fill-foreground text-sm font-semibold"
                  >
                    {compact(total)}
                  </text>
                  <text
                    x={cx}
                    y={cy + 12}
                    textAnchor="middle"
                    className="fill-muted text-[10px]"
                  >
                    sessions
                  </text>
                </>
              )}
            </svg>

            {hovered !== null && (
              <ChartTooltip
                x={cx}
                y={cy - outer}
                width={width}
                title={data[hovered].label}
                rows={[
                  {
                    label: "Sessions",
                    value: integer(data[hovered].value),
                    color: seriesColors[hovered],
                  },
                  { label: "Share", value: percent(shares[hovered], 1) },
                ]}
              />
            )}
          </>
        );
      }}
    </ChartCard>
  );
}
