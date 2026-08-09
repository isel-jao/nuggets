import type { WidgetManifest } from "../types";
import { Icon } from "./icon";
import { Renderer } from "./renderer";

export const areaChartWidget: WidgetManifest = {
  id: "area-chart",
  name: "Area Chart",
  description: "A single series over time, with volume shown as a wash.",
  category: "chart",
  Icon,
  sizes: { w: 5, h: 8, minW: 3, minH: 5 },
  Render: Renderer,
};
