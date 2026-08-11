import React from "react";
import { twMerge } from "tailwind-merge";
import { useGridLayoutContext } from "../../grid-layout/context";

interface EditModeToggleProps extends Omit<
  React.HTMLAttributes<HTMLButtonElement>,
  "children"
> {}

export function EditModeToggle({ className, ...props }: EditModeToggleProps) {
  const { editMode, setEditMode } = useGridLayoutContext();

  function handleToggleEditMode() {
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
