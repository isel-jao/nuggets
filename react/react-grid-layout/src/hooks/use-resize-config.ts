import type { ResizeConfig } from "react-grid-layout/core";
import { useStore } from "../store";

export function useResizeConfig(): Partial<ResizeConfig> {
  const editMode = useStore((state) => state.editMode);
  return {
    enabled: editMode,
    handles: ["se", "e", "s"] as const,
  };
}
