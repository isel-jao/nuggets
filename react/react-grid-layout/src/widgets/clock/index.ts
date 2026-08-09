import type { WidgetManifest } from "../types";
import { Icon } from "./icon";
import { Renderer } from "./renderer";

export const clockWidget: WidgetManifest = {
  id: "clock",
  name: "Clock",
  description: "Local time and date, ticking every second.",
  category: "utility",
  Icon,
  sizes: { w: 4, h: 12, minW: 3, minH: 8 },
  Render: Renderer,
};
