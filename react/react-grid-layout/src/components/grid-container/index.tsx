import React, { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";
import { useStore } from "../../store";

interface GridContainerProps extends React.HTMLAttributes<HTMLElement> {}

export function GridContainer({
  className,
  children,
  ...props
}: GridContainerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    useStore.setState({ ref: ref });
  }, []);

  return (
    <div ref={ref} className={twMerge("", className)} {...props}>
      {children}
    </div>
  );
}
