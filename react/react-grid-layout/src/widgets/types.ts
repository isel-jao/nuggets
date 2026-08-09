import type { ComponentType, SVGProps } from "react";
import type { LayoutItem } from "react-grid-layout";

export const widgetCategories = ["chart", "metric", "list", "utility"] as const;

export type WidgetCategory = (typeof widgetCategories)[number];

/** Icons are plain SVGs so callers control size and color via props. */
export type WidgetIcon = ComponentType<SVGProps<SVGSVGElement>>;

/** Props every renderer receives from the grid. */
export interface WidgetRenderProps {
  /** Layout id of the placed instance, unique within a dashboard. */
  id: string;
}

export interface WidgetSizes {
  /** Default span, in grid columns / rows, when the widget is dropped. */
  w: number;
  h: number;
  minW?: number;
  minH?: number;
  maxW?: number;
  maxH?: number;
}

export interface WidgetManifest {
  /** Stable key — persisted in saved layouts, so never rename it. */
  id: string;
  name: string;
  description: string;
  category: WidgetCategory;
  Icon: WidgetIcon;
  sizes: Pick<LayoutItem, "w" | "h" | "minW" | "minH" | "maxW" | "maxH">;
  Render: ComponentType<WidgetRenderProps>;
}
