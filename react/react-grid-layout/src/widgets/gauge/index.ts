import type { WidgetManifest } from "../types";
import { Icon } from "./icon";
import { Renderer } from "./renderer";

export const gaugeWidget: WidgetManifest = {
  id: "gauge",
  name: "Gauge",
  description: "A single ratio against its limit, with a severity read-out.",
  category: "metric",
  Icon,
  sizes: { w: 4, h: 3, minW: 3, minH: 2 },
  Render: Renderer,
};
