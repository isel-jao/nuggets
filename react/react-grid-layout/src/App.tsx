import { useState } from "react";
import widgetsManifests from "./widgets";
import { EditModeToggle } from "./components/edit-mode-toggle";
import { BreakPointSelector } from "./components/break-point-selector";
import { WidgetsInspector } from "./components/widget-inspector";
import { twMerge } from "tailwind-merge";
import {
  GridContainer,
  GridLayoutProvider,
  ResponsiveGrid,
  useGridLayoutContext,
} from "./grid-layout";

const widgetSizes: Record<string, any> = {};
for (const [key, manifest] of Object.entries(widgetsManifests)) {
  widgetSizes[key] = manifest.sizes;
}
export default function App() {
  const [widgetList, setWidgetList] = useState<
    { id: string; widgetKey: string }[]
  >([]);

  function addWidget(key: string): Promise<{ id: string }> {
    return new Promise((resolve) => {
      const id = new Date().getTime().toString();
      setWidgetList((prevList) => [...prevList, { id, widgetKey: key }]);
      resolve({ id });
    });
  }

  return (
    <GridLayoutProvider
      dragHandleClassName=".custom-drag-handle"
      addWidgetHandler={addWidget}
      widgetSizes={widgetSizes}
    >
      <main className="p-6  flex flex-col gap-3">
        <div className="border px-1.5 py-1 rounded-lg flex justify-between">
          <EditModeToggle />
          <BreakPointSelector />
        </div>
        <div className="flex  gap-4  h-1 flex-1">
          <WidgetsInspector />
          <GridContainer className="overflow-auto debug flex-1 ">
            <ResponsiveGrid className="w-full h-full">
              {Object.entries(widgetList).map(([_, { id, widgetKey }]) => {
                const WidgetComponent = widgetsManifests[widgetKey].Render;
                return (
                  <div
                    key={id}
                    className="border select-none bg-card group rounded-lg p-2 w-full h-full relative"
                  >
                    <div
                      className={twMerge(
                        " custom-drag-handle ",
                        "opacity-0 group-hover:opacity-100 transition-opacity",
                        "absolute top-0 left-0 w-full",
                        "flex items-center ",
                        "bg-foreground text-background h-7 ",
                      )}
                    >
                      <span className="px-2 h-full flex-1 content-center cursor-grab active:cursor-grabbing ">
                        drag handle
                      </span>
                      <DeleteWidgetButton
                        setWidgetList={setWidgetList}
                        id={id}
                      />
                    </div>
                    <WidgetComponent id={id} />
                  </div>
                );
              })}
            </ResponsiveGrid>
          </GridContainer>
        </div>
      </main>
    </GridLayoutProvider>
  );
}

interface DeleteWidgetButtonProps {
  setWidgetList: React.Dispatch<
    React.SetStateAction<{ id: string; widgetKey: string }[]>
  >;
  id: string;
}

function DeleteWidgetButton({ setWidgetList, id }: DeleteWidgetButtonProps) {
  const { deleteWidget } = useGridLayoutContext();
  function handleDelete() {
    deleteWidget(id);
    setWidgetList((prevList) => prevList.filter((widget) => widget.id !== id));
  }
  return (
    <button
      className="h-full aspect-square  flex rounded justify-center items-center text-red-500 hover:bg-red-500/10"
      onClick={handleDelete}
    >
      X
    </button>
  );
}
