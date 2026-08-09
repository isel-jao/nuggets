import type { WidgetManifest } from "../types";
import { Icon } from "./icon";
import { Renderer } from "./renderer";

export const dataTableWidget: WidgetManifest = {
  id: "data-table",
  name: "Data Table",
  description: "Sortable rows with reserved status colors.",
  category: "list",
  Icon,
  sizes: { w: 4, h: 3, minW: 3, minH: 2 },
  Render: Renderer,
};
