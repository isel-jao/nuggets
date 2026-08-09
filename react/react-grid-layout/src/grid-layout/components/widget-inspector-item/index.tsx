import React from "react";
import { twMerge } from "tailwind-merge";
import { useGridLayoutContext } from "../../context";

interface WidgetInspectorItemProps extends React.HTMLAttributes<HTMLElement> {
  widgetKey: string;
}

export function WidgetInspectorItem({
  className,
  widgetKey,
  children,
  ...props
}: WidgetInspectorItemProps) {
  const { setDraggedWidget } = useGridLayoutContext();
  function handleDragStart() {
    setDraggedWidget(widgetKey);
  }

  return (
    <div
      className={twMerge("", className)}
      {...props}
      draggable
      onDragStart={handleDragStart}
    >
      {children}
    </div>
  );
}
