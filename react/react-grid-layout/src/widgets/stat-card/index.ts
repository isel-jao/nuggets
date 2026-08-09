import type { WidgetManifest } from "../types";
import { Icon } from "./icon";
import { Renderer } from "./renderer";

export const statCardWidget: WidgetManifest = {
  id: "stat-card",
  name: "Stat Card",
  description: "One headline number with its delta and a trend sparkline.",
  category: "metric",
  Icon,
  sizes: { w: 3, h: 5, minW: 2, minH: 4 },
  Render: Renderer,
};
