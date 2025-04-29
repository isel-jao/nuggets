import { Input } from "@/components/ui/input";
import React, { useDeferredValue } from "react";
import { twMerge } from "tailwind-merge";

interface SlowProps extends React.HTMLAttributes<HTMLElement> {
  ref?: React.RefObject<HTMLDivElement | null>;
  color?: string;
}

function Slow({ className, children, style, color, ...props }: SlowProps) {
  for (let i = 0; i < 5_000_000; i++) {
    // Simulate a slow operation
  }
  return (
    <div
      className={twMerge("size-8 shrink-0", className)}
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
  const [color, setColor] = React.useState("red");
  const defferdColor = useDeferredValue(color);
  return (
    <main className="container flex flex-col gap-4 p-6">
      <Input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 10 }, (_, i) => (
          <MemoizedSlow key={i} color={defferdColor}>
            {i}
          </MemoizedSlow>
        ))}
      </div>
    </main>
  );
}
