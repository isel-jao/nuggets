import type { WidgetManifest } from "../types";
import { Icon } from "./icon";
import { Renderer } from "./renderer";

export const todoListWidget: WidgetManifest = {
  id: "todo-list",
  name: "Task List",
  description: "A checklist with completion tracked as a meter.",
  category: "list",
  Icon,
  /** Five tasks and the completion meter fit at h:6; it scrolls below that. */
  dimensions: { w: 3, h: 6, minW: 2, minH: 4 },
  Render: Renderer,
};
