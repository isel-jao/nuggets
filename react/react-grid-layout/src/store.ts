import { create } from "zustand";
import type { Breakpoint } from "./types";
import type { LayoutItem } from "react-grid-layout";
import type { RefObject } from "react";

type Store = {
  breakpoint: Breakpoint;
  layout: Record<Breakpoint, LayoutItem[]>;
  editMode: boolean;
  isInteracting: boolean;
  ref: RefObject<HTMLDivElement | null> | null;
  draggedWidget: string | null;
  widgetList: {
    id: string;
    widgetKey: string;
  }[];
  setDraggedWidget: (widgetKey: string | null) => void;
};

export const useStore = create<Store>()((set) => ({
  breakpoint: "desktop",
  editMode: false,
  isInteracting: true,
  ref: null,
  widgetList: [],
  layout: {
    "desktop-ultra-wide": [],
    "desktop-wide": [],
    desktop: [],
    tablet: [],
    mobile: [],
  },
  draggedWidget: null,
  setDraggedWidget: (widgetKey) => set({ draggedWidget: widgetKey }),
}));
