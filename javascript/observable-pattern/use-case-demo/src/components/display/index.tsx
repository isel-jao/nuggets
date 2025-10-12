import React from "react";
import { twMerge } from "tailwind-merge";

interface DisplayProps extends React.HTMLAttributes<HTMLElement> {
  ref?: React.RefObject<HTMLDivElement | null>;
}

export function Display({ className, children, ...props }: DisplayProps) {
  return (
    <div
      className={twMerge(
        "p-4 bg-foreground/5 rounded-md text-2xl rou",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
