import type { LayoutItem } from "react-grid-layout";
import type { Breakpoint, Cols } from "./type";

export const breakpointsList = [
  "desktop-ultra-wide",
  "desktop-wide",
  "desktop",
  "tablet",
  "mobile",
] as const;

export const defaultMargin = [10, 10] as [number, number];
export const defaultRowHeight = 30;

type Breakpoints = {
  [key in Breakpoint]: number;
};

export const defaultBreakpoints: Breakpoints = {
  "desktop-ultra-wide": 2560,
  "desktop-wide": 1440,
  desktop: 1024,
  tablet: 768,
  mobile: 480,
};

export const defaultCols: Cols = {
  "desktop-ultra-wide": 16,
  "desktop-wide": 12,
  desktop: 9,
  tablet: 6,
  mobile: 4,
};

export const defaultLayouts: Record<Breakpoint, LayoutItem[]> = {
  "desktop-ultra-wide": [],
  "desktop-wide": [],
  desktop: [],
  tablet: [],
  mobile: [],
};

export const resizeObserverDelay = 250;
