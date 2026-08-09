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
  sizes: { w: 4, h: 3, minW: 3, minH: 2 },
  Render: MemoizedRenderer,
};
