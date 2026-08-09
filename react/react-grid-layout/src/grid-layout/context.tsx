import { createContext, useContext, useRef, useState } from "react";
import type {
  Breakpoint,
  Breakpoints,
  Cols,
  Layouts,
  WidgetSizes,
} from "./type";
import {
  defaultBreakpoints,
  defaultMargin,
  defaultRowHeight,
  defaultCols,
  defaultLayouts,
} from "./constants";
import type { LayoutItem } from "react-grid-layout";

export type TGridLayoutContext = {
  breakPoints: Breakpoints;
  sortedBreakpoints: [Breakpoint, number][];
  cols: Cols;
  margin: [number, number];
  rowHeight: number;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  breakpoint: Breakpoint;
  setBreakpoint: React.Dispatch<React.SetStateAction<Breakpoint>>;
  draggedWidget: string | null;
  setDraggedWidget: React.Dispatch<React.SetStateAction<string | null>>;
  layouts: Layouts;
  setLayouts: React.Dispatch<React.SetStateAction<Layouts>>;
  isInteracting: boolean;
  setIsInteracting: React.Dispatch<React.SetStateAction<boolean>>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  widgetSizes: WidgetSizes;
  addWidgetHandler?: (key: string) => Promise<{ id: string }>;
  deleteWidget: (id: string) => void;
  dragHandleClassName?: string;
};

const GridLayoutContext = createContext<TGridLayoutContext | null>(null);

export function useGridLayoutContext() {
  const context = useContext(GridLayoutContext);
  if (!context) {
    throw new Error(
      "useGridLayoutContext must be used within a GridLayoutProvider",
    );
  }
  return context;
}

interface GridLayoutProviderProps {
  breakPoints?: Partial<Breakpoints>;
  cols?: Partial<Cols>;
  margin?: [number, number];
  rowHeight?: number;
  children: React.ReactNode;
  initialLayouts?: Partial<Layouts>;
  widgetSizes: WidgetSizes;
  dragHandleClassName?: string;
  addWidgetHandler?: (key: string) => Promise<{ id: string }>;
}

export function GridLayoutProvider({
  breakPoints = {},
  cols = {},
  margin = defaultMargin,
  rowHeight = defaultRowHeight,
  initialLayouts = {},
  children,
  ...props
}: GridLayoutProviderProps) {
  const mergedBreakPoints: Breakpoints = {
    ...defaultBreakpoints,
    ...breakPoints,
  };

  const mergedCols: Cols = {
    ...defaultCols,
    ...cols,
  };
  const mergedLayouts: Layouts = {
    ...defaultLayouts,
    ...initialLayouts,
  };

  const [breakpoint, setBreakpoint] = useState<Breakpoint>("desktop");
  const [editMode, setEditMode] = useState<boolean>(false);
  const [layouts, setLayouts] = useState<Layouts>(mergedLayouts);
  const [isInteracting, setIsInteracting] = useState<boolean>(false);
  const [draggedWidget, setDraggedWidget] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sortedBreakpoints = Object.entries(mergedBreakPoints).sort(
    (a, b) => a[1] - b[1],
  ) as [Breakpoint, number][];

  function deleteWidget(id: string) {
    setLayouts((prevLayouts) => {
      const newLayouts: Record<string, LayoutItem[]> = { ...prevLayouts };
      for (const bp in newLayouts) {
        newLayouts[bp] = newLayouts[bp].filter((item) => item.i !== id);
      }
      return newLayouts as Layouts;
    });
  }

  return (
    <GridLayoutContext
      value={{
        sortedBreakpoints,
        editMode,
        setEditMode,
        breakpoint,
        setBreakpoint,
        layouts,
        setLayouts,
        isInteracting,
        setIsInteracting,
        draggedWidget,
        setDraggedWidget,
        containerRef,
        breakPoints: mergedBreakPoints,
        cols: mergedCols,
        deleteWidget,
        margin,
        rowHeight,
        ...props,
      }}
    >
      {children}
    </GridLayoutContext>
  );
}
