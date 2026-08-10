import { twMerge } from "tailwind-merge";
import { breakpointsList } from "../../grid-layout/constants";
import { useGridLayoutContext } from "../../grid-layout";
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
  const { editMode, editModeBreakpoint, setEditModeBreakpoint } =
    useGridLayoutContext();
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
            editModeBreakpoint === bp
              ? "bg-blue-500  text-white"
              : "bg-foreground text-background",
            className,
          )}
          onClick={() => setEditModeBreakpoint(bp)}
        >
          {breakPointsLabels[bp]}
        </button>
      ))}
    </div>
  );
}
