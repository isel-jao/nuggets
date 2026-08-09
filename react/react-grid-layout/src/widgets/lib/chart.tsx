import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { useElementSize, type Size } from "./use-element-size";
import { IconButton, WidgetFrame } from "./frame";
import { sequentialColors } from "./palette";

/* ------------------------------------------------------------------ legend */

export interface LegendItem {
  label: string;
  color: string;
  /** "line" draws a key instead of a swatch, matching a line chart's mark. */
  shape?: "swatch" | "line";
}

export function Legend({ items }: { items: LegendItem[] }) {
  return (
    <ul className="flex flex-wrap items-center gap-x-3 gap-y-1">
      {items.map((item) => (
        <li key={item.label} className="flex items-center gap-1.5 text-xs text-muted">
          {item.shape === "line" ? (
            <span
              aria-hidden
              className="h-0.5 w-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
          ) : (
            <span
              aria-hidden
              className="size-2.5 rounded-xs"
              style={{ backgroundColor: item.color }}
            />
          )}
          {item.label}
        </li>
      ))}
    </ul>
  );
}

/** Sequential scale key — required whenever magnitude is carried by color. */
export function ScaleLegend({
  min,
  max,
  colors = sequentialColors,
}: {
  min: string;
  max: string;
  colors?: readonly string[];
}) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-muted">
      <span>{min}</span>
      <span className="flex gap-0.5" aria-hidden>
        {colors.map((color) => (
          <span
            key={color}
            className="size-2.5 rounded-xs"
            style={{ backgroundColor: color }}
          />
        ))}
      </span>
      <span>{max}</span>
    </div>
  );
}

/* ----------------------------------------------------------------- tooltip */

export interface TooltipRow {
  label: string;
  value: string;
  color?: string;
}

interface ChartTooltipProps {
  x: number;
  y: number;
  /** Plot width, used to keep the tooltip inside the card. */
  width: number;
  title: string;
  rows: TooltipRow[];
}

export function ChartTooltip({ x, y, width, title, rows }: ChartTooltipProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [ownWidth, setOwnWidth] = useState(0);

  useLayoutEffect(() => {
    if (ref.current) setOwnWidth(ref.current.offsetWidth);
  }, [title, rows]);

  const half = ownWidth / 2;
  const left = Math.min(Math.max(x, half + 2), Math.max(width - half - 2, half + 2));

  return (
    <div
      ref={ref}
      role="tooltip"
      className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-md border bg-card px-2 py-1.5 shadow-md"
      style={{ left, top: y - 10 }}
    >
      <p className="whitespace-nowrap text-xs font-medium text-foreground">{title}</p>
      {rows.map((row) => (
        <p
          key={row.label}
          className="flex items-center gap-1.5 whitespace-nowrap text-xs text-muted"
        >
          {row.color && (
            <span
              aria-hidden
              className="size-2 rounded-xs"
              style={{ backgroundColor: row.color }}
            />
          )}
          <span>{row.label}</span>
          <span className="ml-auto pl-2 font-medium tabular-nums text-foreground">
            {row.value}
          </span>
        </p>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------- axes */

interface HorizontalGridProps {
  ticks: number[];
  y: (value: number) => number;
  left: number;
  right: number;
  /** Omit to draw gridlines without tick labels. */
  format?: (value: number) => string;
}

export function HorizontalGrid({ ticks, y, left, right, format }: HorizontalGridProps) {
  return (
    <g aria-hidden>
      {ticks.map((tick) => (
        <g key={tick}>
          <line
            x1={left}
            x2={right}
            y1={y(tick)}
            y2={y(tick)}
            stroke="var(--chart-grid)"
            strokeWidth={1}
            shapeRendering="crispEdges"
          />
          {format && (
            <text
              x={left - 6}
              y={y(tick)}
              dy="0.32em"
              textAnchor="end"
              className="fill-muted text-[10px] tabular-nums"
            >
              {format(tick)}
            </text>
          )}
        </g>
      ))}
    </g>
  );
}

export function AxisLabel({
  x,
  y,
  anchor = "middle",
  children,
}: {
  x: number;
  y: number;
  anchor?: "start" | "middle" | "end";
  children: ReactNode;
}) {
  return (
    <text x={x} y={y} textAnchor={anchor} className="fill-muted text-[10px]">
      {children}
    </text>
  );
}

/* -------------------------------------------------------------- table view */

export interface ChartTable {
  columns: string[];
  rows: (string | number)[][];
}

export function TableView({ table }: { table: ChartTable }) {
  return (
    <div className="absolute inset-0 overflow-auto">
      <table className="w-full text-xs">
        <thead className="sticky top-0 bg-card">
          <tr className="border-b">
            {table.columns.map((column, index) => (
              <th
                key={column}
                scope="col"
                className={twMerge(
                  "py-1 pr-2 text-left font-medium text-muted-foreground",
                  index > 0 && "text-right",
                )}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row) => (
            <tr key={String(row[0])} className="border-b last:border-0">
              {row.map((cell, index) => (
                <td
                  key={index}
                  className={twMerge(
                    "py-1 pr-2 text-foreground",
                    index > 0 && "text-right tabular-nums",
                  )}
                >
                  {typeof cell === "number" ? cell.toLocaleString("en-US") : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* -------------------------------------------------------------- chart card */

function TableIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M3 9h18M3 15h18M9 3v18" />
    </svg>
  );
}

interface ChartCardProps {
  title: string;
  subtitle?: string;
  /** Present for two or more series; a single series is named by the subtitle. */
  legend?: LegendItem[];
  footer?: ReactNode;
  /**
   * The WCAG-clean twin. Tooltips enhance, never gate — every plotted value is
   * reachable here too.
   */
  table: ChartTable;
  /** Below these, the plot is unreadable and the table is shown instead. */
  minWidth?: number;
  minHeight?: number;
  children: (size: Size) => ReactNode;
}

export function ChartCard({
  title,
  subtitle,
  legend,
  footer,
  table,
  minWidth = 120,
  minHeight = 80,
  children,
}: ChartCardProps) {
  const [showTable, setShowTable] = useState(false);
  const [ref, size] = useElementSize();

  const measured = size.width > 0 && size.height > 0;
  const tooSmall = measured && (size.width < minWidth || size.height < minHeight);
  const asTable = showTable || tooSmall;

  return (
    <WidgetFrame
      title={title}
      subtitle={subtitle}
      actions={
        <IconButton
          label={showTable ? "Show chart" : "Show table"}
          pressed={showTable}
          onClick={() => setShowTable((previous) => !previous)}
        >
          <TableIcon />
        </IconButton>
      }
    >
      <div className="flex h-full flex-col gap-2">
        {legend && legend.length > 1 && !asTable && <Legend items={legend} />}
        <div ref={ref} className="relative min-h-0 flex-1">
          {asTable ? <TableView table={table} /> : measured && children(size)}
        </div>
        {footer && !asTable && <div className="shrink-0">{footer}</div>}
      </div>
    </WidgetFrame>
  );
}
