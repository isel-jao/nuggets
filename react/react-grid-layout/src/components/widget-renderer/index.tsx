import React from "react";
import { twMerge } from "tailwind-merge";
import widgetsManifests from "../../widgets";
import { useGridLayoutContext } from "../../grid-layout";
interface WidgetRenderProps {
  setWidgetList: React.Dispatch<
    React.SetStateAction<{ id: string; widgetKey: string }[]>
  >;
  widget: {
    id: string;
    widgetKey: string;
  };
}

export function WidgetRender({ widget, setWidgetList }: WidgetRenderProps) {
  const { id, widgetKey } = widget;
  const widgetManifest = widgetsManifests[widgetKey];
  if (!widgetManifest) {
    throw new Error(`Widget manifest not found for key: ${widget.widgetKey}`);
  }

  const WidgetComponent = widgetManifest.Render;

  return (
    <>
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
        <DeleteWidgetButton setWidgetList={setWidgetList} id={id} />
      </div>
      <WidgetComponent id={id} />
    </>
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
