import type { WidgetManifest } from "../types";
import { Icon } from "./icon";
import { Renderer } from "./renderer";

export const clockWidget: WidgetManifest = {
  id: "clock",
  name: "Clock",
  description: "Local time and date, ticking every second.",
  category: "utility",
  Icon,
  sizes: { w: 3, h: 5, minW: 2, minH: 4 },
  Render: Renderer,
};
