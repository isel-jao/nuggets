import React from "react";
import { twMerge } from "tailwind-merge";
import { useGridLayoutContext } from "../../grid-layout/context";

interface EditModeToggleProps extends Omit<
  React.HTMLAttributes<HTMLButtonElement>,
  "children"
> {}

export function EditModeToggle({ className, ...props }: EditModeToggleProps) {
  const {
    editMode,
    containerRef,
    setEditMode,
    setBreakpoint,
    sortedBreakpoints,
  } = useGridLayoutContext();

  function getBreakpointForWidth(width: number) {
    let index = 0;
    for (let i = 0; i < sortedBreakpoints.length; i++) {
      const [_, minWidth] = sortedBreakpoints[i];
      if (width >= minWidth) {
        index = i;
      } else {
        break;
      }
    }
    return sortedBreakpoints[index][0];
  }

  function handleToggleEditMode() {
    if (!editMode && containerRef?.current) {
      const width = containerRef.current.getBoundingClientRect().width;

      const breakpoint = getBreakpointForWidth(width);
      setBreakpoint(breakpoint);
    }
    setEditMode(!editMode);
  }

  return (
    <button
      className={twMerge(
        "px-2 py-1 border m-1 rounded bg-foreground/10",
        editMode && "border-primary text-primary",
        className,
      )}
      onClick={handleToggleEditMode}
      {...props}
    >
      edit Mode
    </button>
  );
}
