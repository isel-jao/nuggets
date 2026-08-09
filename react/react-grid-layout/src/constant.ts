import type { Breakpoint } from "./types";

export const breakpointsList = [
  "desktop-ultra-wide",
  "desktop-wide",
  "desktop",
  "tablet",
  "mobile",
] as const;

export const breakPointsLabels: Record<Breakpoint, string> = {
  "desktop-ultra-wide": "Desktop Ultra Wide",
  "desktop-wide": "Desktop Wide",
  desktop: "Desktop",
  tablet: "Tablet",
  mobile: "Mobile",
};

export const GRID_MARGIN = [10, 10] as const;
export const ROW_HEIGHT = 30;

export const breakpoints: Record<Breakpoint, number> = {
  "desktop-ultra-wide": 2560,
  "desktop-wide": 1920,
  desktop: 1280,
  tablet: 768,
  mobile: 480,
};

export const sortedBreakpoints = Object.entries(breakpoints).sort(
  (a, b) => a[1] - b[1],
) as [Breakpoint, number][];

export const cols: Record<Breakpoint, number> = {
  "desktop-ultra-wide": 16,
  "desktop-wide": 12,
  desktop: 9,
  tablet: 6,
  mobile: 4,
};
