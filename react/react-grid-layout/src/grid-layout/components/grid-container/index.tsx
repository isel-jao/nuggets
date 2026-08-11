import React from "react";
import { twMerge } from "tailwind-merge";
import { useGridLayoutContext } from "../../context";
import "./index.css";
import { ResponsiveGrid } from "../responsive-grid";

interface GridContainerProps extends React.HTMLAttributes<HTMLElement> {}

export function GridContainer({
  className,
  children,
  ...props
}: GridContainerProps) {
  const { containerRef } = useGridLayoutContext();
  return (
    <div
      ref={containerRef}
      className={twMerge("relative overflow-auto flex-1", className)}
      {...props}
    >
      <ResponsiveGrid>{children}</ResponsiveGrid>
    </div>
  );
}
