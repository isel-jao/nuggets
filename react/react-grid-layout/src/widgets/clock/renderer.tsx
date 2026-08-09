import { useEffect, useState } from "react";
import { WidgetFrame } from "../lib/frame";

const timeFormat = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
});

const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export function Renderer() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const seconds = now.getSeconds();

  return (
    <WidgetFrame
      title="Local time"
      subtitle={timeZone}
      bodyClassName="flex flex-col justify-center gap-2"
    >
      <p className="flex items-baseline gap-1.5">
        <time
          dateTime={now.toISOString()}
          className="text-4xl leading-none font-semibold text-foreground"
        >
          {timeFormat.format(now)}
        </time>
        <span className="text-lg text-muted tabular-nums">
          :{String(seconds).padStart(2, "0")}
        </span>
      </p>

      <p className="text-xs text-muted">{dateFormat.format(now)}</p>

      {/* Seconds as a meter, so the widget reads as live at a glance. */}
      <div
        className="h-1 w-full overflow-hidden rounded-full"
        style={{ backgroundColor: "var(--seq-1)" }}
        aria-hidden
      >
        <div
          className="h-full rounded-full transition-[width] duration-500 ease-linear"
          style={{
            width: `${((seconds + 1) / 60) * 100}%`,
            backgroundColor: "var(--chart-1)",
          }}
        />
      </div>
    </WidgetFrame>
  );
}
