import { useEffect, useState } from "react";
import { useGridLayoutContext } from "../context";
import { calculateGridColumnWidth } from "../utils";

export const useStyleConfig = () => {
  const { containerRef, breakpoint, editMode, margin, rowHeight, cols } =
    useGridLayoutContext();

  const containerWidth =
    containerRef?.current?.getBoundingClientRect().width || 0;

  const [width, setWidth] = useState<number>(containerWidth);

  useEffect(() => {
    if (editMode || !containerRef?.current) {
      setWidth(containerWidth);
    }
  }, [breakpoint, editMode, containerRef, containerWidth]);

  const getGridBackground = () => {
    const [marginX, marginY] = margin;
    const cellW = calculateGridColumnWidth({
      width: width,
      cols: cols[breakpoint],
      margin: marginX,
    });
    const cellH = rowHeight + marginY;

    const gridPattern = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${cellW + marginX}' height='${cellH}'%3E%3Crect x='0.5' y='0.5' width='${cellW - 1}' height='${rowHeight - 1}' fill='none' stroke='%23333333' stroke-width='1'/%3E%3C/svg%3E")`;
    return {
      backgroundImage: gridPattern,
      backgroundAttachment: "local",
    };
  };

  const baseStyle = {
    minHeight: "100%",
    width: width,
    margin: "0 auto",
  };

  const style = {
    ...baseStyle,
    ...(editMode ? getGridBackground() : {}),
  };

  return { style, width };
};
