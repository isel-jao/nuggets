import type { LayoutItem } from "react-grid-layout";
import type { breakpointsList } from "./constants";

export type Breakpoint = (typeof breakpointsList)[number];

export type Breakpoints = {
  [key in Breakpoint]: number;
};

export type Cols = {
  [key in Breakpoint]: number;
};

export type Layouts = {
  [key in Breakpoint]: LayoutItem[];
};

export type WidgetKey = string;

export type WidgetDimensions = Pick<
  LayoutItem,
  "w" | "h" | "minW" | "minH" | "maxW" | "maxH"
>;

export type WidgetTypeDimensions = Record<WidgetKey, WidgetDimensions>;
