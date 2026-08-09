import React, { memo } from "react";
import { twMerge } from "tailwind-merge";
import widgetsManifests from "../../widgets";

interface WidgetRenderProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "children"
> {
  widget: {
    id: string;
    widgetKey: string;
  };
}

export function WidgetRender({
  className,
  widget,
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
    </div>
  );
}
