import { seriesColors, SURFACE } from "../lib/palette";
import { WidgetFrame } from "../lib/frame";
import { useElementSize } from "../lib/use-element-size";
import { polyline, scaleLinear } from "../lib/scales";
import { currency, signedPercent } from "../lib/format";
import { randomWalk } from "../lib/data";

/** 12 points of context — the tile's job is the current number. */
const trend = randomWalk(88, 12, { start: 62_000, volatility: 9_000, drift: 2_400 });
const value = trend[trend.length - 1];
const previous = trend[trend.length - 2];
const delta = ((value - previous) / previous) * 100;

/** Up is good for revenue; for churn or latency this mapping would invert. */
const upIsGood = true;
const isPositive = delta >= 0;
const deltaColor = isPositive === upIsGood ? "var(--good)" : "var(--critical)";

const SPARK_HEIGHT = 40;

function TrendArrow({ up }: { up: boolean }) {
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
      {up ? <path d="M12 19V5M5 12l7-7 7 7" /> : <path d="M12 5v14M5 12l7 7 7-7" />}
    </svg>
  );
}

export function Renderer() {
  const [ref, size] = useElementSize();

  const min = Math.min(...trend);
  const max = Math.max(...trend);
  const step = size.width / (trend.length - 1);
  const y = scaleLinear([min, max], [SPARK_HEIGHT - 5, 5]);
  const points = trend.map((point, index) => ({ x: step * index, y: y(point) }));
  const last = points[points.length - 1];

  return (
    <WidgetFrame title="Monthly recurring revenue" bodyClassName="flex flex-col">
      <p className="text-3xl leading-tight font-semibold text-foreground">
        {currency(value)}
      </p>

      {/* Direction is carried by the arrow and the words, not by hue alone. */}
      <p className="mt-1 flex items-center gap-1 text-xs">
        <span className="flex items-center gap-0.5" style={{ color: deltaColor }}>
          <TrendArrow up={isPositive} />
          {signedPercent(delta)}
        </span>
        <span className="text-muted">vs last month</span>
      </p>

      <div ref={ref} className="mt-auto" style={{ height: SPARK_HEIGHT }}>
        {size.width > 0 && (
          <svg width={size.width} height={SPARK_HEIGHT} aria-hidden>
            <path
              d={polyline(points)}
              fill="none"
              stroke="var(--chart-axis)"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Current period in the accent; the rest recedes. */}
            <path
              d={polyline(points.slice(-2))}
              fill="none"
              stroke={seriesColors[0]}
              strokeWidth={2}
              strokeLinecap="round"
            />
            <circle
              cx={last.x - 1}
              cy={last.y}
              r={3.5}
              fill={seriesColors[0]}
              stroke={SURFACE}
              strokeWidth={2}
            />
          </svg>
        )}
      </div>
    </WidgetFrame>
  );
}
