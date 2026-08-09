import { Responsive, type Layout, type LayoutItem } from "react-grid-layout";
import { useShallow } from "zustand/shallow";
import { EditModeToggle } from "./components/edit-mode-toggle";
import { BreakPointSelector } from "./components/break-point-selector";
import { useStore } from "./store";
import { breakpoints, cols, GRID_MARGIN } from "./constant";
import { GridContainer } from "./components/grid-container";
import { useStyleConfig } from "./hooks/use-style-config";
import widgetsManifests from "./widgets";
import "react-grid-layout/css/styles.css";
import { WidgetsInspector } from "./components/widget-inspector";
import { useCallback, useMemo } from "react";
import { WidgetRender } from "./components/widget-renderer";

export default function App() {
  const { style, width } = useStyleConfig();
  const { layout, editMode, breakpoint, draggedWidget, widgetList } = useStore(
    useShallow((state) => ({
      layout: state.layout,
      editMode: state.editMode,
      breakpoint: state.breakpoint,
      draggedWidget: state.draggedWidget,
      widgetList: state.widgetList,
    })),
  );
  const dragConfig = useMemo(() => {
    return {
      enabled: editMode,
    };
  }, [editMode]);

  const resizeConfig = useMemo(
    () => ({
      enabled: editMode,
      handles: ["se"] as const,
    }),
    [editMode],
  );

  const dropConfig = useMemo(() => {
    if (!editMode || draggedWidget === null) {
      return {
        enabled: false,
      };
    }
    const defaultItem = { w: 2, h: 2 };
    const sizes = widgetsManifests[draggedWidget]?.sizes ?? defaultItem;
    return {
      enabled: true,
      defaultItem,
      onDragOver: editMode ? () => sizes : undefined,
    };
  }, [editMode, draggedWidget]);

  const handleDrop = useCallback(
    async (_layout: Layout, item: LayoutItem | undefined, _e: Event) => {
      if (!item || !draggedWidget) {
        return;
      }
      const { breakpoint } = useStore.getState();
      const widgetManifest = widgetsManifests[draggedWidget];
      if (!widgetManifest) {
        throw new Error(`Widget manifest not found for key: ${draggedWidget}`);
      }
      console.log({
        sizes: widgetManifest.sizes,
        item,
        breakpoint,
      });
      const id = new Date().getTime().toString();
      const newItem: LayoutItem = {
        i: id,
        x: item.x,
        y: item.y,
        ...widgetManifest.sizes,
      };
      const newWidget = {
        id,
        widgetKey: draggedWidget,
      };
      useStore.setState((state) => {
        const newLayout = { ...state.layout };
        for (const key in newLayout) {
          const bp = key as keyof typeof newLayout;
          if (bp === breakpoint) {
            newLayout[bp] = [...newLayout[bp], newItem];
          } else {
            const maxY = newLayout[bp].reduce((max, item) => {
              return Math.max(max, item.y + item.h);
            }, 0);
            newLayout[bp] = [...newLayout[bp], { ...newItem, y: maxY }];
          }
        }

        return {
          widgetList: [...state.widgetList, newWidget],
          layout: newLayout,
          draggedWidget: null,
        };
      });
    },

    [breakpoint, draggedWidget],
  );

  return (
    <main className="p-6  flex flex-col gap-3">
      <div className="border px-1.5 py-1 rounded-lg flex justify-between">
        <EditModeToggle />
        {editMode && <BreakPointSelector />}
      </div>
      <div className="flex  h-full gap-4">
        {editMode && <WidgetsInspector />}
        <GridContainer className="overflow-auto flex-1 ">
          <Responsive
            breakpoint={editMode ? breakpoint : undefined}
            dropConfig={dropConfig}
            dragConfig={dragConfig}
            resizeConfig={resizeConfig}
            breakpoints={breakpoints}
            cols={cols}
            width={width}
            margin={GRID_MARGIN}
            containerPadding={[0, 0]}
            style={style}
            layouts={layout}
            onDrop={handleDrop}
          >
            {widgetList.map((widget) => (
              <WidgetRender key={widget.id} widget={widget} />
            ))}
          </Responsive>
        </GridContainer>
      </div>
    </main>
  );
}
