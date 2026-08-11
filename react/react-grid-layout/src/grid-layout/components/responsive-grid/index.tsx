import {
  Responsive,
  type Breakpoint,
  type Layout,
  type LayoutItem,
  type ResponsiveLayouts,
} from "react-grid-layout";
import { useGridLayoutContext } from "../../context";
import { useStyleConfig } from "../../hooks/use-style-config";
import { useDragConfig } from "../../hooks/use-drag-config";
import { useDropConfig } from "../../hooks/use-drop-config";
import "react-grid-layout/css/styles.css";
import type { Layouts } from "../../type";
import { useCallback, useRef } from "react";
import { useResizeConfig } from "../../hooks/use-resize-config";
interface ResponsiveGridProps {
  className?: string;
  children: React.ReactNode;
}
export function ResponsiveGrid({ className, children }: ResponsiveGridProps) {
  const {
    layouts,
    setLayouts,
    breakpoint,
    breakPoints,
    rowHeight,
    margin,
    cols,
    draggedWidget,
    widgetTypeDimensions,
    onLayoutChange,
    addWidgetHandler,
  } = useGridLayoutContext();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { style, width } = useStyleConfig();

  const handleDrop = useCallback(
    async (layout: Layout, item: LayoutItem | undefined, _e: Event) => {
      if (!item || !draggedWidget || !addWidgetHandler) {
        return;
      }
      const sizes = widgetTypeDimensions[draggedWidget];
      if (!sizes) {
        throw new Error(`Widget sizes not found for key: ${draggedWidget}`);
      }
      const { id } = await addWidgetHandler(draggedWidget);
      const newItem: LayoutItem = {
        i: id,
        x: item.x,
        y: item.y,
        ...sizes,
      };
      setLayouts((prevLayouts) => {
        const newLayouts: Record<Breakpoint, Layout> = { ...prevLayouts };
        for (const bp in newLayouts) {
          if (bp === breakpoint) {
            newLayouts[bp] = [...layout, newItem];
          } else {
            let maxY = 0;
            for (const existingItem of newLayouts[bp]) {
              const itemBottomEdge = existingItem.y + existingItem.h;
              if (itemBottomEdge > maxY) {
                maxY = itemBottomEdge;
              }
            }
            if (bp === "mobile") {
              const mobileCols = cols["mobile"];
              if (item.w > mobileCols / 2) {
                newItem.w = mobileCols;
              }
            }
            newLayouts[bp] = [
              ...newLayouts[bp],
              {
                ...newItem,
                x: 0,
                y: maxY,
              },
            ];
          }
        }
        return newLayouts as Layouts;
      });
    },
    [
      breakpoint,
      draggedWidget,
      addWidgetHandler,
      setLayouts,
      widgetTypeDimensions,
    ],
  );

  const handleResize = useCallback(
    (layout: Layout) => {
      setLayouts((prevLayouts) => ({
        ...prevLayouts,
        [breakpoint]: layout,
      }));
    },
    [breakpoint, setLayouts],
  );

  const handleDragStop = useCallback(
    (layout: Layout) => {
      setLayouts((prevLayouts) => ({
        ...prevLayouts,
        [breakpoint]: layout,
      }));
    },
    [breakpoint, setLayouts],
  );

  const dragConfig = useDragConfig();
  const dropConfig = useDropConfig();
  const resizeConfig = useResizeConfig();

  const handleLayoutChange = useCallback(
    (_l: Layout, newLayouts: ResponsiveLayouts<Breakpoint>) => {
      if (!onLayoutChange) {
        return;
      }
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        const isEqual = JSON.stringify(layouts) === JSON.stringify(newLayouts);
        if (isEqual) {
          return;
        }
        onLayoutChange(newLayouts as Layouts);
      }, 250);
    },
    [onLayoutChange],
  );
  return (
    <Responsive
      dragConfig={dragConfig}
      dropConfig={dropConfig}
      resizeConfig={resizeConfig}
      className={className}
      breakpoint={breakpoint}
      breakpoints={breakPoints}
      cols={cols}
      rowHeight={rowHeight}
      margin={margin}
      layouts={layouts}
      onDrop={handleDrop}
      onResizeStop={handleResize}
      onDragStop={handleDragStop}
      width={width}
      style={style}
      onLayoutChange={handleLayoutChange}
      containerPadding={[0, 0]}
    >
      {children}
    </Responsive>
  );
}
