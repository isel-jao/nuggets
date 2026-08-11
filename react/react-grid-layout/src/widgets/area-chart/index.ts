import type { WidgetManifest } from "../types";
import { Icon } from "./icon";
import { Renderer } from "./renderer";

export const areaChartWidget: WidgetManifest = {
  id: "area-chart",
  name: "Area Chart",
  description: "A single series over time, with volume shown as a wash.",
  category: "chart",
  Icon,
  /** Thirty daily points — the widest default, so the line reads as a trend. */
  dimensions: { w: 6, h: 8, minW: 3, minH: 6 },
  Render: Renderer,
};
