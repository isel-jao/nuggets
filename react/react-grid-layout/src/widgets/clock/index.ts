import type { WidgetManifest } from "../types";
import { Icon } from "./icon";
import { Renderer } from "./renderer";

export const clockWidget: WidgetManifest = {
  id: "clock",
  name: "Clock",
  description: "Local time and date, ticking every second.",
  category: "utility",
  Icon,
  /** Fixed-height content — h:5 is the first row count that clears time, date and meter. */
  dimensions: { w: 2, h: 4, minW: 2, minH: 5 },
  Render: Renderer,
};
