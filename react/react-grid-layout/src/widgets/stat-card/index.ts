import type { WidgetManifest } from "../types";
import { Icon } from "./icon";
import { Renderer } from "./renderer";

export const statCardWidget: WidgetManifest = {
  id: "stat-card",
  name: "Stat Card",
  description: "One headline number with its delta and a trend sparkline.",
  category: "metric",
  Icon,
  /** Floor is the content: the value, its delta and the 40px spark stop fitting below h:5. */
  sizes: { w: 3, h: 6, minW: 2, minH: 5 },
  Render: Renderer,
};
