import type { WidgetManifest } from "../types";
import { Icon } from "./icon";
import { Renderer } from "./renderer";

export const barChartWidget: WidgetManifest = {
  id: "bar-chart",
  name: "Bar Chart",
  description: "Compare a measure across categories.",
  category: "chart",
  Icon,
  sizes: { w: 4, h: 8, minW: 2, minH: 5 },
  Render: Renderer,
};
