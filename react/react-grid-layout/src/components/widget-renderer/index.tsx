import React from "react";
import { twMerge } from "tailwind-merge";
import widgetsManifests from "../../widgets";

/**
 * `children` is not decoration here: react-grid-layout clones this element and
 * appends the resize handles to its children. Drop them and the item is still
 * draggable (that binds to the DOM node via ref) but silently unresizable.
 */
interface WidgetRenderProps extends React.HTMLAttributes<HTMLElement> {
  widget: {
    id: string;
    widgetKey: string;
  };
}

export function WidgetRender({
  className,
  widget,
  children,
  ...props
}: WidgetRenderProps) {
  const countRef = React.useRef(0);
  const widgetManifest = widgetsManifests[widget.widgetKey];
  if (!widgetManifest) {
    throw new Error(`Widget manifest not found for key: ${widget.widgetKey}`);
  }

  console.log(
    `Rendering widget ${widget.widgetKey} with id ${widget.id}. Render count: ${
      countRef.current + 1
    }`,
  );
  countRef.current += 1;
  return (
    <div
      className={twMerge(
        "bg-card rounded-lg border overflow-x-hidden  w-full h-full",
        className,
      )}
      {...props}
    >
      <widgetManifest.Render id={widget.id} />
      {children}
    </div>
  );
}
