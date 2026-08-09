import { useRef, useState, type MouseEvent } from "react";
import { ChartCard, ChartTooltip, HorizontalGrid } from "../lib/chart";
import { seriesColors, SURFACE } from "../lib/palette";
import { areaPath, labelStride, niceScale, polyline, scaleLinear } from "../lib/scales";
import { compact, integer } from "../lib/format";
import { randomWalk } from "../lib/data";

const values = randomWalk(1312, 30, { start: 1_800, volatility: 420, drift: 26 });
const labels = values.map((_, index) => `Mar ${index + 1}`);

const PADDING = { top: 12, right: 8, bottom: 20, left: 40 };

const scale = niceScale(0, Math.max(...values));

export function Renderer() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <ChartCard
      title="Sessions"
      subtitle="Daily, current month"
      table={{
        columns: ["Day", "Sessions"],
        rows: labels.map((label, index) => [label, values[index]]),
      }}
    >
      {({ width, height }) => {
        const plotWidth = width - PADDING.left - PADDING.right;
        const plotHeight = height - PADDING.top - PADDING.bottom;
        if (plotWidth <= 0 || plotHeight <= 0) return null;

        const baseline = PADDING.top + plotHeight;
        const step = plotWidth / (values.length - 1);
        const x = (index: number) => PADDING.left + step * index;
        const y = scaleLinear([scale.min, scale.max], [baseline, PADDING.top]);
        const points = values.map((value, index) => ({ x: x(index), y: y(value) }));
        const stride = labelStride(values.length, step, 42);

        const handleMove = (event: MouseEvent) => {
          const rect = svgRef.current?.getBoundingClientRect();
          if (!rect) return;
          const index = Math.round((event.clientX - rect.left - PADDING.left) / step);
          setHovered(Math.min(Math.max(index, 0), values.length - 1));
        };

        return (
          <>
            <svg
              ref={svgRef}
              width={width}
              height={height}
              role="img"
              aria-label="Daily sessions for the current month"
              onMouseMove={handleMove}
              onMouseLeave={() => setHovered(null)}
            >
              <HorizontalGrid
                ticks={scale.ticks}
                y={y}
                left={PADDING.left}
                right={width - PADDING.right}
                format={compact}
              />

              {/* A wash, never a saturated block. */}
              <path d={areaPath(points, baseline)} fill={seriesColors[0]} fillOpacity={0.1} />
              <path
                d={polyline(points)}
                fill="none"
                stroke={seriesColors[0]}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {hovered !== null && (
                <>
                  <line
                    x1={x(hovered)}
                    x2={x(hovered)}
                    y1={PADDING.top}
                    y2={baseline}
                    stroke="var(--chart-axis)"
                    strokeWidth={1}
                    shapeRendering="crispEdges"
                  />
                  <circle
                    cx={x(hovered)}
                    cy={y(values[hovered])}
                    r={4}
                    fill={seriesColors[0]}
                    stroke={SURFACE}
                    strokeWidth={2}
                  />
                </>
              )}

              {labels.map((label, index) => {
                if (index % stride !== 0) return null;
                return (
                  <text
                    key={label}
                    x={x(index)}
                    y={height - 6}
                    textAnchor="middle"
                    className="fill-muted text-[10px]"
                  >
                    {label}
                  </text>
                );
              })}
            </svg>

            {hovered !== null && (
              <ChartTooltip
                x={x(hovered)}
                y={y(values[hovered])}
                width={width}
                title={labels[hovered]}
                rows={[
                  {
                    label: "Sessions",
                    value: integer(values[hovered]),
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
