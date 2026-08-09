import type { ResizeConfig } from "react-grid-layout/core";
import { useGridLayoutContext } from "../context";

export function useResizeConfig(): Partial<ResizeConfig> {
  const { editMode } = useGridLayoutContext();
  return {
    enabled: editMode,
    handles: ["se", "e", "s"] as const,
  };
}
