import type { WidgetManifest } from "../types";
import { Icon } from "./icon";
import { Renderer } from "./renderer";

export const heatmapWidget: WidgetManifest = {
  id: "heatmap",
  name: "Heatmap",
  description: "Magnitude across a day-by-week grid, on one sequential hue.",
  category: "chart",
  Icon,
  sizes: { w: 4, h: 3, minW: 3, minH: 2 },
  Render: Renderer,
};
