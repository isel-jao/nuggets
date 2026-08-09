import { WidgetFrame } from "../lib/frame";
import { useElementSize } from "../lib/use-element-size";
import { arcPath } from "../lib/scales";
import { percent } from "../lib/format";

const used = 412;
const capacity = 500;
const ratio = used / capacity;

/** The fill carries severity; the track is a lighter step of that same hue. */
function severityOf(value: number) {
  if (value >= 0.9) return { color: "var(--critical)", label: "Critical" };
  if (value >= 0.7) return { color: "var(--warning)", label: "Warning" };
  return { color: "var(--chart-1)", label: "Healthy" };
}

const severity = severityOf(ratio);
const track = `color-mix(in oklab, ${severity.color} 22%, var(--card))`;

const START_ANGLE = Math.PI * 0.75;
const SWEEP = Math.PI * 1.5;

function SeverityIcon({ level }: { level: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {level === "Healthy" ? (
        <path d="M20 6 9 17l-5-5" />
      ) : (
        <path d="M12 8v5M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
      )}
    </svg>
  );
}

export function Renderer() {
  const [ref, size] = useElementSize();

  const { width, height } = size;
  const thickness = Math.max(8, Math.min(16, Math.min(width, height) * 0.09));
  const radius = Math.max(10, Math.min(width, height) / 2 - thickness / 2 - 2);
  const cx = width / 2;
  const cy = height / 2;

  return (
    <WidgetFrame
      title="Storage used"
      subtitle={`${used} GB of ${capacity} GB`}
      actions={
        <span
          className="flex items-center gap-1 text-xs"
          style={{ color: severity.color }}
        >
          <SeverityIcon level={severity.label} />
          {severity.label}
        </span>
      }
    >
      <div ref={ref} className="h-full w-full">
        {width > 0 && height > 0 && (
          <svg
            width={width}
            height={height}
            role="img"
            aria-label={`Storage used: ${percent(ratio * 100, 1)} of ${capacity} GB`}
          >
            <path
              d={arcPath(cx, cy, radius, START_ANGLE, START_ANGLE + SWEEP)}
              fill="none"
              stroke={track}
              strokeWidth={thickness}
              strokeLinecap="round"
            />
            {ratio > 0 && (
              <path
                d={arcPath(cx, cy, radius, START_ANGLE, START_ANGLE + SWEEP * ratio)}
                fill="none"
                stroke={severity.color}
                strokeWidth={thickness}
                strokeLinecap="round"
              />
            )}

            <text
              x={cx}
              y={cy}
              textAnchor="middle"
              dy="0.32em"
              className="fill-foreground text-2xl font-semibold"
            >
              {percent(ratio * 100)}
            </text>
            <text
              x={cx}
              y={cy + radius * 0.72}
              textAnchor="middle"
              className="fill-muted text-[10px]"
            >
              {capacity - used} GB free
            </text>
          </svg>
        )}
      </div>
    </WidgetFrame>
  );
}
