import type { WidgetManifest } from "../types";
import { Icon } from "./icon";
import { Renderer } from "./renderer";

export const dataTableWidget: WidgetManifest = {
  id: "data-table",
  name: "Data Table",
  description: "Sortable rows with reserved status colors.",
  category: "list",
  Icon,
  sizes: { w: 4, h: 12, minW: 3, minH: 8 },
  Render: Renderer,
};
