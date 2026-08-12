import React from "react";
import { twMerge } from "tailwind-merge";

interface InnerCardProps extends React.HTMLAttributes<HTMLElement> {}

export function InnerCard({ className, children, ...props }: InnerCardProps) {
  return (
    <div
      className={twMerge(
        "shadow-inner shadow-background bg-background/50 rounded-md p-4",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
