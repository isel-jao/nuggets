import type { WidgetManifest } from "../types";
import { Icon } from "./icon";
import { Renderer } from "./renderer";

export const todoListWidget: WidgetManifest = {
  id: "todo-list",
  name: "Task List",
  description: "A checklist with completion tracked as a meter.",
  category: "list",
  Icon,
  sizes: { w: 4, h: 3, minW: 3, minH: 2 },
  Render: Renderer,
};
