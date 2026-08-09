import type { WidgetManifest } from "../types";
import { Icon } from "./icon";
import { Renderer } from "./renderer";

export const lineChartWidget: WidgetManifest = {
  id: "line-chart",
  name: "Line Chart",
  description: "Trend over time, with series compared year over year.",
  category: "chart",
  Icon,
  sizes: { w: 4, h: 12, minW: 3, minH: 8 },
  Render: Renderer,
};
