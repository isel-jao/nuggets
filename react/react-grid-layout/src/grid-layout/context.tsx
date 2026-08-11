import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type {
  Breakpoint,
  Breakpoints,
  Cols,
  Layouts,
  WidgetTypeDimensions,
} from "./type";
import {
  defaultBreakpoints,
  defaultMargin,
  defaultRowHeight,
  defaultCols,
  defaultLayouts,
  resizeObserverDelay,
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
  editModeBreakpoint: Breakpoint;
  setEditModeBreakpoint: React.Dispatch<React.SetStateAction<Breakpoint>>;
  draggedWidget: string | null;
  setDraggedWidget: React.Dispatch<React.SetStateAction<string | null>>;
  layouts: Layouts;
  setLayouts: React.Dispatch<React.SetStateAction<Layouts>>;
  isInteracting: boolean;
  setIsInteracting: React.Dispatch<React.SetStateAction<boolean>>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  widgetTypeDimensions: WidgetTypeDimensions;
  addWidgetHandler?: (key: string) => Promise<{ id: string }>;
  deleteWidget: (id: string) => void;
  dragHandleClassName?: string;
  containerWidth: number;
  calculateBreakpoint: Breakpoint;
  breakpoint: Breakpoint;
  onLayoutChange?: (layouts: Layouts) => void;
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
  widgetTypeDimensions: WidgetTypeDimensions;
  dragHandleClassName?: string;
  addWidgetHandler?: (type: string) => Promise<{ id: string }>;
  onLayoutChange?: (layouts: Layouts) => void;
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

  const [editModeBreakpoint, setEditModeBreakpoint] =
    useState<Breakpoint>("desktop");
  const [editMode, setEditMode] = useState<boolean>(false);
  const [layouts, setLayouts] = useState<Layouts>(mergedLayouts);
  const [isInteracting, setIsInteracting] = useState<boolean>(false);
  const [draggedWidget, setDraggedWidget] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const sortedBreakpoints = useMemo(() => {
    return Object.entries(mergedBreakPoints).sort((a, b) => a[1] - b[1]) as [
      Breakpoint,
      number,
    ][];
  }, [mergedBreakPoints]);

  function deleteWidget(id: string) {
    setLayouts((prevLayouts) => {
      const newLayouts: Record<string, LayoutItem[]> = { ...prevLayouts };
      for (const bp in newLayouts) {
        newLayouts[bp] = newLayouts[bp].filter((item) => item.i !== id);
      }
      return newLayouts as Layouts;
    });
  }

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [containerWidth, setContainerWidth] = useState<number>(0);

  const resizeObserver = useMemo(() => {
    return new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === containerRef.current) {
          if (timerRef.current) {
            clearTimeout(timerRef.current);
          }
          timerRef.current = setTimeout(() => {
            const newWidth =
              containerRef.current?.getBoundingClientRect().width || 0;
            setContainerWidth(newWidth);
          }, resizeObserverDelay);
        }
      }
    });
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const containerWidth = containerRef.current.getBoundingClientRect().width;
    setContainerWidth(containerWidth);
    resizeObserver.observe(containerRef.current, {
      box: "border-box",
    });
    return () => {
      resizeObserver.disconnect();
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  function getBreakpointForWidth(width: number) {
    let index = 0;
    for (const [_bp, bpWidth] of sortedBreakpoints) {
      if (width >= bpWidth) {
        index++;
      } else {
        break;
      }
    }
    index = Math.max(0, index - 1);
    return sortedBreakpoints[index]?.[0];
  }

  const calculateBreakpoint = useMemo(() => {
    return getBreakpointForWidth(containerWidth);
  }, [sortedBreakpoints, containerWidth]);

  const breakpoint = useMemo(() => {
    return editMode ? editModeBreakpoint : calculateBreakpoint;
  }, [editMode, editModeBreakpoint, calculateBreakpoint]);

  return (
    <GridLayoutContext
      value={{
        sortedBreakpoints,
        containerWidth,
        calculateBreakpoint,
        editMode,
        setEditMode,
        editModeBreakpoint,
        setEditModeBreakpoint,
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
        breakpoint,
        margin,
        rowHeight,
        ...props,
      }}
    >
      {children}
    </GridLayoutContext>
  );
}
