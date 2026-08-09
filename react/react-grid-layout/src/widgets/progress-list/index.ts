import type { WidgetManifest } from "../types";
import { Icon } from "./icon";
import { Renderer } from "./renderer";

export const progressListWidget: WidgetManifest = {
  id: "progress-list",
  name: "Progress List",
  description: "Ranked items as meters, for long category names.",
  category: "list",
  Icon,
  /** Five meters fit at h:7; long referrer names are what set the width. */
  sizes: { w: 3, h: 7, minW: 2, minH: 4 },
  Render: Renderer,
};
