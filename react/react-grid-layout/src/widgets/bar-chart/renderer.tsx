import { useState } from "react";
import { ChartCard, ChartTooltip, HorizontalGrid } from "../lib/chart";
import { seriesColors } from "../lib/palette";
import { columnPath, labelStride, niceScale, scaleLinear } from "../lib/scales";
import { compact, currency } from "../lib/format";

const data = [
  { label: "Direct", value: 18_240 },
  { label: "Organic", value: 24_980 },
  { label: "Referral", value: 12_460 },
  { label: "Social", value: 9_310 },
  { label: "Email", value: 15_720 },
  { label: "Paid", value: 21_050 },
];

const PADDING = { top: 20, right: 6, bottom: 20, left: 40 };
/** Never fill the band — the leftover is the air that keeps bars readable. */
const MAX_BAR_WIDTH = 24;

const values = data.map((item) => item.value);
const peakIndex = values.indexOf(Math.max(...values));
const scale = niceScale(0, Math.max(...values));

export function Renderer() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <ChartCard
      title="Revenue by channel"
      subtitle="Last 30 days"
      table={{
        columns: ["Channel", "Revenue"],
        rows: data.map((item) => [item.label, item.value]),
      }}
    >
      {({ width, height }) => {
        const plotWidth = width - PADDING.left - PADDING.right;
        const plotHeight = height - PADDING.top - PADDING.bottom;
        if (plotWidth <= 0 || plotHeight <= 0) return null;

        const baseline = PADDING.top + plotHeight;
        const y = scaleLinear([scale.min, scale.max], [baseline, PADDING.top]);
        const band = plotWidth / data.length;
        const barWidth = Math.min(MAX_BAR_WIDTH, band * 0.62);
        const stride = labelStride(data.length, band, 44);

        const active = hovered === null ? null : data[hovered];

        return (
          <>
            <svg
              width={width}
              height={height}
              role="img"
              aria-label="Revenue by channel"
            >
              <HorizontalGrid
                ticks={scale.ticks}
                y={y}
                left={PADDING.left}
                right={width - PADDING.right}
                format={compact}
              />

              {data.map((item, index) => {
                const x = PADDING.left + band * index + (band - barWidth) / 2;
                const top = y(item.value);
                return (
                  <path
                    key={item.label}
                    d={columnPath(x, top, barWidth, baseline - top)}
                    fill={seriesColors[0]}
                    opacity={hovered === null || hovered === index ? 1 : 0.45}
                  />
                );
              })}

              {/* The extreme is direct-labeled; the axis carries the rest. */}
              <text
                x={PADDING.left + band * peakIndex + band / 2}
                y={y(values[peakIndex]) - 6}
                textAnchor="middle"
                className="fill-foreground text-[10px] font-medium tabular-nums"
              >
                {currency(values[peakIndex])}
              </text>

              {data.map((item, index) => {
                if (index % stride !== 0) return null;
                return (
                  <text
                    key={item.label}
                    x={PADDING.left + band * index + band / 2}
                    y={height - 6}
                    textAnchor="middle"
                    className="fill-muted text-[10px]"
                  >
                    {item.label}
                  </text>
                );
              })}

              {/* Hit targets span the whole band, not just the 24px bar. */}
              {data.map((item, index) => (
                <rect
                  key={item.label}
                  x={PADDING.left + band * index}
                  y={PADDING.top}
                  width={band}
                  height={plotHeight}
                  fill="transparent"
                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered(null)}
                />
              ))}
            </svg>

            {active && hovered !== null && (
              <ChartTooltip
                x={PADDING.left + band * hovered + band / 2}
                y={y(active.value)}
                width={width}
                title={active.label}
                rows={[
                  {
                    label: "Revenue",
                    value: currency(active.value),
                    color: seriesColors[0],
                  },
                ]}
              />
            )}
          </>
        );
      }}
    </ChartCard>
  );
}
