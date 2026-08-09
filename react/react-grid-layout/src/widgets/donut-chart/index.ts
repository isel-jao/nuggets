import type { WidgetManifest } from "../types";
import { Icon } from "./icon";
import { Renderer } from "./renderer";

export const donutChartWidget: WidgetManifest = {
  id: "donut-chart",
  name: "Donut Chart",
  description: "Part-to-whole split across a handful of categories.",
  category: "chart",
  Icon,
  /** Square plot with a legend under it: narrow, and tall enough to keep the center label. */
  sizes: { w: 3, h: 8, minW: 3, minH: 6 },
  Render: Renderer,
};
