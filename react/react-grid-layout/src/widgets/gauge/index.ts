import type { WidgetManifest } from "../types";
import { Icon } from "./icon";
import { Renderer } from "./renderer";

export const gaugeWidget: WidgetManifest = {
  id: "gauge",
  name: "Gauge",
  description: "A single ratio against its limit, with a severity read-out.",
  category: "metric",
  Icon,
  /** The arc scales to the shorter side, so height is what buys a readable dial. */
  dimensions: { w: 3, h: 7, minW: 2, minH: 5 },
  Render: Renderer,
};
