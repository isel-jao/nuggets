import { twMerge } from "tailwind-merge";
import { breakpointsList } from "../../grid-layout/constants";
import { useGridLayoutContext } from "../../grid-layout/context";
import type { Breakpoint } from "../../grid-layout/type";

const breakPointsLabels: Record<Breakpoint, string> = {
  "desktop-ultra-wide": "Ultra Wide",
  "desktop-wide": "Wide",
  desktop: "Desktop",
  tablet: "Tablet",
  mobile: "Mobile",
};
interface BreakPointSelectorProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "children"
> {}
export function BreakPointSelector({ className }: BreakPointSelectorProps) {
  const { editMode, breakpoint, setBreakpoint } = useGridLayoutContext();
  if (!editMode) {
    return null;
  }
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
          onClick={() => setBreakpoint(bp)}
        >
          {breakPointsLabels[bp]}
        </button>
      ))}
    </div>
  );
}
