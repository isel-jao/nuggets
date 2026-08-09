import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface WidgetFrameProps {
  title: string;
  /** Names what is plotted, so single-series charts need no legend box. */
  subtitle?: string;
  /** Header-right slot: view toggles, ranges, counts. */
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}

/**
 * Shared chrome for every widget. Deliberately paints no background — the grid
 * item supplies `bg-card`, which is the surface the palette was validated
 * against.
 */
export function WidgetFrame({
  title,
  subtitle,
  actions,
  children,
  className,
  bodyClassName,
}: WidgetFrameProps) {
  return (
    <section className={twMerge("flex h-full w-full flex-col gap-3 p-4", className)}>
      <header className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-foreground">{title}</h3>
          {subtitle && (
            <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {actions && <div className="flex shrink-0 items-center gap-1">{actions}</div>}
      </header>
      <div className={twMerge("relative min-h-0 flex-1", bodyClassName)}>{children}</div>
    </section>
  );
}

interface IconButtonProps {
  label: string;
  pressed?: boolean;
  onClick: () => void;
  children: ReactNode;
}

export function IconButton({ label, pressed, onClick, children }: IconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      aria-pressed={pressed}
      className={twMerge(
        "rounded border p-1 text-muted-foreground transition-colors hover:text-foreground",
        pressed && "border-primary text-primary",
      )}
    >
      {children}
    </button>
  );
}
