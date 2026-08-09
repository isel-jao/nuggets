import type { WidgetManifest } from "../types";
import { Icon } from "./icon";
import { Renderer } from "./renderer";

export const lineChartWidget: WidgetManifest = {
  id: "line-chart",
  name: "Line Chart",
  description: "Trend over time, with series compared year over year.",
  category: "chart",
  Icon,
  sizes: { w: 4, h: 3, minW: 3, minH: 2 },
  Render: Renderer,
};
