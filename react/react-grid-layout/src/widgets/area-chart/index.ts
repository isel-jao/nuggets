import type { WidgetManifest } from "../types";
import { Icon } from "./icon";
import { Renderer } from "./renderer";

export const areaChartWidget: WidgetManifest = {
  id: "area-chart",
  name: "Area Chart",
  description: "A single series over time, with volume shown as a wash.",
  category: "chart",
  Icon,
  sizes: { w: 4, h: 12, minW: 3, minH: 8 },
  Render: Renderer,
};
