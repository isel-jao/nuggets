import type { WidgetManifest } from "../types";
import { Icon } from "./icon";
import { Renderer } from "./renderer";

export const progressListWidget: WidgetManifest = {
  id: "progress-list",
  name: "Progress List",
  description: "Ranked items as meters, for long category names.",
  category: "list",
  Icon,
  sizes: { w: 4, h: 12, minW: 3, minH: 8 },
  Render: Renderer,
};
