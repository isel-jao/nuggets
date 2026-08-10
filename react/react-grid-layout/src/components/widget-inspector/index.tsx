import { twMerge } from "tailwind-merge";
import widgetsManifests from "../../widgets";
import { useGridLayoutContext } from "../../grid-layout/context";

interface WidgetsInspectorProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "children"
> {}

export function WidgetsInspector({
  className,
  ...props
}: WidgetsInspectorProps) {
  const { editMode } = useGridLayoutContext();
  if (!editMode) {
    return null;
  }
  return (
    <div
      className={twMerge(
        "bg-card w-[16rem] border rounded p-2 overflow-auto",
        className,
      )}
      {...props}
    >
      <div className="grid grid-cols-2 gap-1 select-none ">
        {Object.keys(widgetsManifests).map((key) => (
          <WidgetItem key={key} widgetKey={key} />
        ))}
      </div>
    </div>
  );
}

interface WidgetItemProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "children"
> {
  widgetKey: string;
}

export function WidgetItem({
  className,
  widgetKey,
  ...props
}: WidgetItemProps) {
  const { setDraggedWidget } = useGridLayoutContext();

  const widgetManifest = widgetsManifests[widgetKey];
  if (!widgetManifest) {
    throw new Error(`Widget manifest not found for key: ${widgetKey}`);
  }
  return (
    <div
      className={twMerge(
        "p-2 border flex flex-col items-center [&>svg]:size-6 gap-2  rounded hover:border-primary transition-colors",
        className,
      )}
      {...props}
      onDragStart={() => {
        setDraggedWidget(widgetKey);
      }}
      draggable
    >
      <widgetManifest.Icon />
      <span className="text-center">{widgetManifest.name}</span>
    </div>
  );
}
