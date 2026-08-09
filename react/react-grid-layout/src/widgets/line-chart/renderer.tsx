import { useRef, useState, type MouseEvent } from "react";
import { ChartCard, ChartTooltip, HorizontalGrid } from "../lib/chart";
import { seriesColors, SURFACE } from "../lib/palette";
import { labelStride, niceScale, polyline, scaleLinear } from "../lib/scales";
import { compact, integer } from "../lib/format";
import { monthLabels, randomWalk } from "../lib/data";

const series = [
  {
    label: "2026",
    values: randomWalk(7, 12, { start: 420, volatility: 90, drift: 14 }),
  },
  {
    label: "2025",
    values: randomWalk(21, 12, { start: 380, volatility: 70, drift: 6 }),
  },
];

const PADDING = { top: 12, right: 34, bottom: 20, left: 40 };

const allValues = series.flatMap((item) => item.values);
const scale = niceScale(Math.min(...allValues), Math.max(...allValues));

export function Renderer() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <ChartCard
      title="Active users"
      subtitle="Monthly, year over year"
      legend={series.map((item, index) => ({
        label: item.label,
        color: seriesColors[index],
        shape: "line",
      }))}
      table={{
        columns: ["Month", ...series.map((item) => item.label)],
        rows: monthLabels.map((month, index) => [
          month,
          ...series.map((item) => item.values[index]),
        ]),
      }}
    >
      {({ width, height }) => {
        const plotWidth = width - PADDING.left - PADDING.right;
        const plotHeight = height - PADDING.top - PADDING.bottom;
        if (plotWidth <= 0 || plotHeight <= 0) return null;

        const step = plotWidth / (monthLabels.length - 1);
        const x = (index: number) => PADDING.left + step * index;
        const y = scaleLinear(
          [scale.min, scale.max],
          [PADDING.top + plotHeight, PADDING.top],
        );
        const stride = labelStride(monthLabels.length, step, 26);

        const handleMove = (event: MouseEvent) => {
          const rect = svgRef.current?.getBoundingClientRect();
          if (!rect) return;
          const index = Math.round(
            (event.clientX - rect.left - PADDING.left) / step,
          );
          setHovered(Math.min(Math.max(index, 0), monthLabels.length - 1));
        };

        return (
          <>
            <svg
              ref={svgRef}
              width={width}
              height={height}
              role="img"
              aria-label="Active users, monthly, year over year"
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

              {hovered !== null && (
                <line
                  x1={x(hovered)}
                  x2={x(hovered)}
                  y1={PADDING.top}
                  y2={PADDING.top + plotHeight}
                  stroke="var(--chart-axis)"
                  strokeWidth={1}
                  shapeRendering="crispEdges"
                />
              )}

              {series.map((item, seriesIndex) => (
                <path
                  key={item.label}
                  d={polyline(
                    item.values.map((value, index) => ({
                      x: x(index),
                      y: y(value),
                    })),
                  )}
                  fill="none"
                  stroke={seriesColors[seriesIndex]}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ))}

              {/* End marker + direct label: two series separate cleanly here. */}
              {series.map((item, seriesIndex) => {
                const last = item.values.length - 1;
                return (
                  <g key={item.label}>
                    <circle
                      cx={x(last)}
                      cy={y(item.values[last])}
                      r={4}
                      fill={seriesColors[seriesIndex]}
                      stroke={SURFACE}
                      strokeWidth={2}
                    />
                    <text
                      x={x(last) + 8}
                      y={y(item.values[last])}
                      dy="0.32em"
                      className="fill-muted text-[10px] tabular-nums"
                    >
                      {compact(item.values[last])}
                    </text>
                  </g>
                );
              })}

              {hovered !== null &&
                series.map((item, seriesIndex) => (
                  <circle
                    key={item.label}
                    cx={x(hovered)}
                    cy={y(item.values[hovered])}
                    r={4}
                    fill={seriesColors[seriesIndex]}
                    stroke={SURFACE}
                    strokeWidth={2}
                  />
                ))}

              {monthLabels.map((month, index) => {
                if (index % stride !== 0) return null;
                return (
                  <text
                    key={month}
                    x={x(index)}
                    y={height - 6}
                    textAnchor="middle"
                    className="fill-muted text-[10px]"
                  >
                    {month}
                  </text>
                );
              })}
            </svg>

            {hovered !== null && (
              <ChartTooltip
                x={x(hovered)}
                y={Math.min(...series.map((item) => y(item.values[hovered])))}
                width={width}
                title={monthLabels[hovered]}
                rows={series.map((item, seriesIndex) => ({
                  label: item.label,
                  value: integer(item.values[hovered]),
                  color: seriesColors[seriesIndex],
                }))}
              />
            )}
          </>
        );
      }}
    </ChartCard>
  );
}
