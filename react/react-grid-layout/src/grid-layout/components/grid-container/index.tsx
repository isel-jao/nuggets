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
  const { containerRef } = useGridLayoutContext();
  return (
    <div ref={containerRef} className={twMerge("", className)} {...props}>
      {children}
    </div>
  );
}
