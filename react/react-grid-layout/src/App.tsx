import { Responsive } from "react-grid-layout";
import { useShallow } from "zustand/shallow";
import { EditModeToggle } from "./components/edit-mode-toggle";
import { BreakPointSelector } from "./components/break-point-selector";
import { useStore } from "./store";
import { breakpoints, cols } from "./constant";
import { GridContainer } from "./components/grid-container";
import { useStyleConfig } from "./hooks/use-style-config";
import widgetsManifests from "./widgets";

export default function App() {
  const { breakpoint, editMode } = useStore(
    useShallow((state) => ({
      breakpoint: state.breakpoint,
      editMode: state.editMode,
    })),
  );

  const { style, width } = useStyleConfig();

  return (
    <main className="p-6  flex flex-col gap-3">
      <div className="border px-1.5 py-1 rounded-lg flex justify-between">
        <EditModeToggle />
        {editMode && <BreakPointSelector />}
      </div>
      <div className="flex  h-full gap-4">
        <div className="bg-card w-[16rem] border rounded p-2 overflow-auto">
          <div className="grid grid-cols-2 gap-1 select-none ">
            {Object.entries(widgetsManifests).map(([key, widget]) => (
              <div
                draggable
                key={key}
                className="p-2 border flex flex-col items-center [&>svg]:size-6 gap-2  rounded"
              >
                <widget.Icon />
                <span className="text-center">{widget.name}</span>
              </div>
            ))}
          </div>
        </div>

        <GridContainer className="overflow-auto flex-1 ">
          <Responsive
            breakpoint={editMode ? breakpoint : undefined}
            breakpoints={breakpoints}
            cols={cols}
            width={width}
            margin={[10, 10]}
            style={style}
          >
            <div className="bg-card p-4 "></div>
          </Responsive>
        </GridContainer>
      </div>
    </main>
  );
}
