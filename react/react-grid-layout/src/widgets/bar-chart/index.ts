import { memo } from "react";
import type { WidgetManifest } from "../types";
import { Icon } from "./icon";
import { Renderer } from "./renderer";

const MemoizedRenderer = memo(Renderer);

export const barChartWidget: WidgetManifest = {
  id: "bar-chart",
  name: "Bar Chart",
  description: "Compare a measure across categories.",
  category: "chart",
  Icon,
  /** Six bands wide, tall enough to keep the gridline labels off each other. */
  sizes: { w: 4, h: 8, minW: 3, minH: 6 },
  Render: MemoizedRenderer,
};
