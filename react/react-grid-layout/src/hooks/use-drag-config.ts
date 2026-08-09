import type { DragConfig } from "react-grid-layout/core";
import { useStore } from "../store";

export function useDragConfig(): Partial<DragConfig> {
  const editMode = useStore((state) => state.editMode);
  return {
    enabled: editMode,
  };
}
