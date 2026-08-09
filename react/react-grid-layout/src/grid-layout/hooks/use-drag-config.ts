import type { DragConfig } from "react-grid-layout/core";
import { useGridLayoutContext } from "../context";

export function useDragConfig(): Partial<DragConfig> {
  const { editMode, dragHandleClassName } = useGridLayoutContext();
  return {
    enabled: editMode,
    handle: dragHandleClassName,
  };
}
