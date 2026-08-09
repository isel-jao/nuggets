import type { WidgetManifest } from "../types";
import { Icon } from "./icon";
import { Renderer } from "./renderer";

export const donutChartWidget: WidgetManifest = {
  id: "donut-chart",
  name: "Donut Chart",
  description: "Part-to-whole split across a handful of categories.",
  category: "chart",
  Icon,
  sizes: { w: 3, h: 8, minW: 2, minH: 6 },
  Render: Renderer,
};
