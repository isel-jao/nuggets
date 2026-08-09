import React from "react";
import { twMerge } from "tailwind-merge";
import { useStore } from "../../store";
import { useShallow } from "zustand/shallow";
import { breakPointsLabels, breakpointsList } from "../../constant";

interface BreakPointSelectorProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "children"
> {}
export function BreakPointSelector({ className }: BreakPointSelectorProps) {
  const { breakpoint } = useStore(
    useShallow((state) => ({ breakpoint: state.breakpoint })),
  );
  return (
    <div className={className}>
      {breakpointsList.map((bp) => (
        <button
          key={bp}
          className={twMerge(
            "px-1.5 py-1 m-1 rounded text-xs",
            breakpoint === bp
              ? "bg-blue-500  text-white"
              : "bg-foreground text-background",
            className,
          )}
          onClick={() => useStore.setState({ breakpoint: bp })}
        >
          {breakPointsLabels[bp]}
        </button>
      ))}
    </div>
  );
}
