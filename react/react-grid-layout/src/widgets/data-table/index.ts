import type { WidgetManifest } from "../types";
import { Icon } from "./icon";
import { Renderer } from "./renderer";

export const dataTableWidget: WidgetManifest = {
  id: "data-table",
  name: "Data Table",
  description: "Sortable rows with reserved status colors.",
  category: "list",
  Icon,
  /** Four columns and six rows fit at h:7 without scrolling. */
  sizes: { w: 4, h: 7, minW: 3, minH: 4 },
  Render: Renderer,
};
