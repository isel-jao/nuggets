import { useState } from "react";
import { ChartCard, ChartTooltip, ScaleLegend } from "../lib/chart";
import { sequentialColors } from "../lib/palette";
import { integer } from "../lib/format";
import { createRandom, weekdayLabels } from "../lib/data";

const WEEKS = 18;
const DAYS = weekdayLabels.length;
const GAP = 2;
const LABEL_WIDTH = 26;

const random = createRandom(4242);
/* Skewed low so the grid reads like real activity, not uniform noise. */
const values = Array.from({ length: WEEKS * DAYS }, () =>
  Math.round(random() ** 2.2 * 18),
);

/** Six classes — past about seven, adjacent bins stop being distinguishable. */
const bins = [
  { max: 0, color: "var(--chart-grid)" },
  { max: 2, color: sequentialColors[0] },
  { max: 5, color: sequentialColors[1] },
  { max: 9, color: sequentialColors[2] },
  { max: 14, color: sequentialColors[3] },
  { max: Infinity, color: sequentialColors[4] },
];

function colorFor(value: number) {
  return bins.find((bin) => value <= bin.max)?.color ?? bins[0].color;
}

function cellLabel(index: number) {
  return `Week ${Math.floor(index / DAYS) + 1} · ${weekdayLabels[index % DAYS]}`;
}

const total = values.reduce((sum, value) => sum + value, 0);

export function Renderer() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <ChartCard
      title="Contributions"
      subtitle={`${integer(total)} commits over ${WEEKS} weeks`}
      minWidth={160}
      minHeight={90}
      footer={<ScaleLegend min="Less" max="More" />}
      table={{
        columns: ["Day", "Commits"],
        rows: values.map((value, index) => [cellLabel(index), value]),
      }}
    >
      {({ width, height }) => {
        const cell = Math.min(
          (width - LABEL_WIDTH - GAP * (WEEKS - 1)) / WEEKS,
          (height - GAP * (DAYS - 1)) / DAYS,
        );
        if (cell <= 1) return null;

        const pitch = cell + GAP;
        const showLabels = cell >= 8;

        return (
          <>
            <svg
              width={width}
              height={height}
              role="img"
              aria-label={`Contribution heatmap, ${integer(total)} commits`}
            >
              {showLabels &&
                weekdayLabels.map((day, index) =>
                  index % 2 === 0 ? (
                    <text
                      key={day}
                      x={LABEL_WIDTH - 6}
                      y={pitch * index + cell / 2}
                      dy="0.32em"
                      textAnchor="end"
                      className="fill-muted text-[9px]"
                    >
                      {day}
                    </text>
                  ) : null,
                )}

              {values.map((value, index) => {
                const week = Math.floor(index / DAYS);
                const day = index % DAYS;
                return (
                  <rect
                    key={index}
                    x={LABEL_WIDTH + week * pitch}
                    y={day * pitch}
                    width={cell}
                    height={cell}
                    rx={2}
                    fill={colorFor(value)}
                    opacity={hovered === null || hovered === index ? 1 : 0.5}
                    onMouseEnter={() => setHovered(index)}
                    onMouseLeave={() => setHovered(null)}
                  />
                );
              })}
            </svg>

            {hovered !== null && (
              <ChartTooltip
                x={LABEL_WIDTH + Math.floor(hovered / DAYS) * pitch + cell / 2}
                y={(hovered % DAYS) * pitch}
                width={width}
                title={cellLabel(hovered)}
                rows={[
                  {
                    label: "Commits",
                    value: integer(values[hovered]),
                    color: colorFor(values[hovered]),
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
