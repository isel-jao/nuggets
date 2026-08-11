import { useState } from "react";
import widgetsManifests from "./widgets";
import { EditModeToggle } from "./components/edit-mode-toggle";
import { BreakPointSelector } from "./components/break-point-selector";
import { WidgetsInspector } from "./components/widget-inspector";
import { GridContainer, GridLayoutProvider } from "./grid-layout";
import { WidgetRender } from "./components/widget-renderer";

// TODO: show background pattern only when attempting to change layout

const widgetTypeDimensions: Record<string, any> = {};
for (const [key, manifest] of Object.entries(widgetsManifests)) {
  widgetTypeDimensions[key] = manifest.dimensions;
}

export default function App() {
  const [widgetList, setWidgetList] = useState<
    { id: string; widgetKey: string }[]
  >([]);

  function addWidget(type: string): Promise<{ id: string }> {
    return new Promise((resolve) => {
      const id = new Date().getTime().toString();
      setWidgetList((prevList) => [...prevList, { id, widgetKey: type }]);
      resolve({ id });
    });
  }

  return (
    <GridLayoutProvider
      // dragHandleClassName=".custom-drag-handle"
      addWidgetHandler={addWidget}
      widgetTypeDimensions={widgetTypeDimensions}
      onLayoutChange={console.log}
    >
      <main className="p-6  flex flex-col gap-3">
        <div className="border px-1.5 py-1 rounded-lg flex justify-between">
          <EditModeToggle />
          <BreakPointSelector />
        </div>
        <div className="flex  gap-4  h-1 flex-1">
          <WidgetsInspector />
          <GridContainer className="">
            {Object.entries(widgetList).map(([_, { id, widgetKey }]) => {
              return (
                <div key={id} className="bg-card rounded-lg border ">
                  <WidgetRender
                    widget={{ id, widgetKey }}
                    setWidgetList={setWidgetList}
                  />
                </div>
              );
            })}
          </GridContainer>
        </div>
      </main>
    </GridLayoutProvider>
  );
}
