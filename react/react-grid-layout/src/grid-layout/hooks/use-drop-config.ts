import type { DropConfig } from "react-grid-layout/core";
import { useGridLayoutContext } from "../context";

export function useDropConfig(): Partial<DropConfig> {
  const { editMode, draggedWidget, widgetSizes } = useGridLayoutContext();
  if (!editMode || draggedWidget === null) {
    return {
      enabled: false,
    };
  }
  const defaultItem = { w: 4, h: 12 };
  const sizes = widgetSizes[draggedWidget] ?? defaultItem;
  return {
    enabled: true,
    defaultItem,
    onDragOver: editMode ? () => sizes : undefined,
  };
}
