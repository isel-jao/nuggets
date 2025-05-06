import { Input } from "@/components/ui/input";
import React, { useDeferredValue } from "react";
import { twMerge } from "tailwind-merge";

interface SlowProps extends React.HTMLAttributes<HTMLElement> {
  ref?: React.RefObject<HTMLDivElement | null>;
  color?: string;
}

function Slow({ className, children, style, color, ...props }: SlowProps) {
  const start = Date.now();
  const end = start + 10;
  while (Date.now() < end) {
    // do nothing
  }
  return (
    <div
      className={twMerge(
        "grid size-8 shrink-0 place-content-center font-semibold",
        className,
      )}
      style={{
        backgroundColor: color,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

const MemoizedSlow = React.memo(Slow);

export default function UseDeferredValuePage() {
  const [color, setColor] = React.useState("#ff4040");
  const deferredColor = useDeferredValue(color);
  return (
    <main className="container flex flex-col gap-4 p-6">
      <div>{color}</div>
      <Input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 10 }, (_, i) => (
          <MemoizedSlow key={i} color={deferredColor}>
            {i}
          </MemoizedSlow>
        ))}
      </div>
    </main>
  );
}
