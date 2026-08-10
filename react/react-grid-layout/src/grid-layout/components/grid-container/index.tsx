import React from "react";
import { twMerge } from "tailwind-merge";
import { useGridLayoutContext } from "../../context";
import "./index.css";

interface GridContainerProps extends React.HTMLAttributes<HTMLElement> {}

export function GridContainer({
  className,
  children,
  ...props
}: GridContainerProps) {
  const {
    containerRef,
    breakpoint,
    editModeBreakpoint,
    calculateBreakpoint,
    containerWidth,
  } = useGridLayoutContext();
  return (
    <div
      ref={containerRef}
      className={twMerge("relative", className)}
      {...props}
    >
      <div className=" bg-card pointer-events-none z-10 opacity-50 p-4 flex  absolute bottom-1/2 right-1/2 flex-col translate-x-1/2 translate-y-1/2 rounded-lg text-sm text-foreground">
        {Object.entries({
          "edit mode breakpoint": editModeBreakpoint,
          "current breakpoint": breakpoint,
          "calculated breakpoint": calculateBreakpoint,
          "container width": containerWidth,
        }).map(([label, value]) => (
          <div key={label} className="flex gap-1">
            <span className="font-bold">{label}:</span>
            <span>{value}</span>
          </div>
        ))}
      </div>
      {children}
    </div>
  );
}
