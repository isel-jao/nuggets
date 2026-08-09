import type { WidgetManifest } from "../types";
import { Icon } from "./icon";
import { Renderer } from "./renderer";

export const clockWidget: WidgetManifest = {
  id: "clock",
  name: "Clock",
  description: "Local time and date, ticking every second.",
  category: "utility",
  Icon,
  sizes: { w: 4, h: 3, minW: 3, minH: 2 },
  Render: Renderer,
};
