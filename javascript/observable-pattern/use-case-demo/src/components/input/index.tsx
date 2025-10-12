import React from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  ref?: React.RefObject<HTMLInputElement | null>;
}

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={twMerge(
        "bg-foreground/5 rounded border border-foreground/20 hover:bg-foreground/20 px-4 py-2",
        className
      )}
      {...props}
    />
  );
}
