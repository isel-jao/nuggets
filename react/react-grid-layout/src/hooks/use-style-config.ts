import { useShallow } from "zustand/shallow";
import { useStore } from "../store";
import { breakpoints, cols, GRID_MARGIN, ROW_HEIGHT } from "../constant";
import { useCallback, useEffect, useState } from "react";
import { calculateGridColumnWidth, getBreakpointForWidth } from "../utils";

export const useStyleConfig = () => {
  const { breakpoint, editMode, isInteracting, ref } = useStore(
    useShallow((state) => ({
      breakpoint: state.breakpoint,
      editMode: state.editMode,
      isInteracting: state.isInteracting,
      ref: state.ref,
    })),
  );

  const containerWidth = ref?.current?.getBoundingClientRect().width || 0;
  const breakpointMinWidth = breakpoints[breakpoint];
  const initialWidth = editMode ? breakpointMinWidth : containerWidth;
  const [width, setWidth] = useState<number>(initialWidth);

  useEffect(() => {
    if (editMode || !ref?.current) {
      setWidth(breakpoints[breakpoint]);
    }
  }, [breakpoint, editMode, ref]);

  useEffect(() => {
    if (editMode || !ref?.current) {
      return;
    }
    let timer: ReturnType<typeof setTimeout>;
    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (ref?.current) {
          const containerWidth = ref.current.getBoundingClientRect().width;
          const breakPointForWidth = getBreakpointForWidth(containerWidth);
          let newWidth = breakpoints[breakPointForWidth];
          if (breakPointForWidth === "mobile") {
            newWidth = Math.min(containerWidth, breakpoints["mobile"]);
          }
          setWidth(newWidth);
        }
      }, 100);
    });
    resizeObserver.observe(ref.current);

    return () => {
      resizeObserver.disconnect();
      clearTimeout(timer);
    };
  }, [editMode, ref]);

  const getGridBackground = useCallback(() => {
    const [marginX, marginY] = GRID_MARGIN;
    const cellW = calculateGridColumnWidth({
      width: breakpoints[breakpoint],
      cols: cols[breakpoint],
      margin: marginX,
    });
    const cellH = ROW_HEIGHT + marginY;
    const gridPattern = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${cellW + marginX}' height='${cellH}'%3E%3Crect x='0.5' y='0.5' width='${cellW + marginX}' height='${ROW_HEIGHT + marginY}' fill='none' stroke='%23333333' stroke-width='1'/%3E%3C/svg%3E")`;

    return {
      backgroundImage: gridPattern,
      backgroundAttachment: "local",
    };
  }, [breakpoint]);

  const baseStyle = {
    minHeight: "100%",
    width: width,
    margin: "0 auto",
  };

  const style = {
    ...baseStyle,
    backgroundColor: "#7f7f7f3f",
    ...(editMode && isInteracting ? getGridBackground() : {}),
  };

  return { style, width };
};
