import type { WidgetManifest } from "../types";
import { Icon } from "./icon";
import { Renderer } from "./renderer";

export const lineChartWidget: WidgetManifest = {
  id: "line-chart",
  name: "Line Chart",
  description: "Trend over time, with series compared year over year.",
  category: "chart",
  Icon,
  /** Twelve months plus a legend row; under h:6 the card falls back to its table. */
  dimensions: { w: 4, h: 8, minW: 3, minH: 6 },
  Render: Renderer,
};
