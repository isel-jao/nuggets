import React from "react";
import { twMerge } from "tailwind-merge";
import { useShallow } from "zustand/shallow";
import { useStore } from "../../store";
import { sortedBreakpoints } from "../../constant";

interface EditModeToggleProps extends Omit<
  React.HTMLAttributes<HTMLButtonElement>,
  "children"
> {}

export function EditModeToggle({ className, ...props }: EditModeToggleProps) {
  const { editMode } = useStore(
    useShallow((state) => ({ editMode: state.editMode })),
  );

  function handleToggleEditMode() {
    const { ref } = useStore.getState();
    if (editMode || !ref?.current) {
      useStore.setState({ editMode: !editMode });
      return;
    }
    const width = ref.current.getBoundingClientRect().width;

    const breakpoint = getBreakpointForWidth(width);
    useStore.setState({ editMode: !editMode, breakpoint });
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
