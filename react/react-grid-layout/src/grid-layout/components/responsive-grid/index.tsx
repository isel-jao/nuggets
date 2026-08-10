import {
  Responsive,
  type Breakpoint,
  type Layout,
  type LayoutItem,
} from "react-grid-layout";
import { useGridLayoutContext } from "../../context";
import { useStyleConfig } from "../../hooks/use-style-config";
import { useDragConfig } from "../../hooks/use-drag-config";
import { useDropConfig } from "../../hooks/use-drop-config";
import "react-grid-layout/css/styles.css";
import type { Layouts } from "../../type";
import { useCallback } from "react";
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
    widgetSizes,
    addWidgetHandler,
  } = useGridLayoutContext();

  const { style, width } = useStyleConfig();

  const handleDrop = useCallback(
    async (layout: Layout, item: LayoutItem | undefined, _e: Event) => {
      if (!item || !draggedWidget || !addWidgetHandler) {
        return;
      }
      const sizes = widgetSizes[draggedWidget];
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
    [breakpoint, draggedWidget, addWidgetHandler, setLayouts, widgetSizes],
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

  return (
    <Responsive
      dragConfig={dragConfig}
      dropConfig={dropConfig}
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
      containerPadding={[0, 0]}
    >
      {children}
    </Responsive>
  );
}
