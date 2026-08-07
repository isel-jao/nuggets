import React from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
}

export function Button({
  className,
  children,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={twMerge(
        variant === "primary"
          ? "bg-primary hover:brightness-110 active:brightness-125 text-primary-foreground"
          : "bg-foreground/10 hover:bg-foreground/20 active:bg-foreground/30 text-ghost-foreground",
        "flex justify-center items-center gap-2",
        "font-semibold capitalize",
        " px-3 py-1.5 rounded",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
