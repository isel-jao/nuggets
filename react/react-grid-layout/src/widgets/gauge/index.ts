import type { WidgetManifest } from "../types";
import { Icon } from "./icon";
import { Renderer } from "./renderer";

export const gaugeWidget: WidgetManifest = {
  id: "gauge",
  name: "Gauge",
  description: "A single ratio against its limit, with a severity read-out.",
  category: "metric",
  Icon,
  sizes: { w: 4, h: 12, minW: 3, minH: 8 },
  Render: Renderer,
};
