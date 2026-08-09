import type { DropConfig } from "react-grid-layout/core";
import { useStore } from "../store";
import widgetsManifests from "../widgets";

export function useDropConfig(): Partial<DropConfig> {
  const editMode = useStore((state) => state.editMode);
  const draggedWidget = useStore((state) => state.draggedWidget);
  if (!editMode || draggedWidget === null) {
    return {
      enabled: false,
    };
  }
  const defaultItem = { w: 4, h: 12 };
  const sizes = widgetsManifests[draggedWidget]?.sizes ?? defaultItem;
  return {
    enabled: true,
    defaultItem,
    onDragOver: editMode ? () => sizes : undefined,
  };
}
