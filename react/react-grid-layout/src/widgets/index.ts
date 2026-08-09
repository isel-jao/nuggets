import type { WidgetManifest } from "./types";
import { areaChartWidget } from "./area-chart";
import { barChartWidget } from "./bar-chart";
import { clockWidget } from "./clock";
import { dataTableWidget } from "./data-table";
import { donutChartWidget } from "./donut-chart";
import { gaugeWidget } from "./gauge";
import { heatmapWidget } from "./heatmap";
import { lineChartWidget } from "./line-chart";
import { progressListWidget } from "./progress-list";
import { statCardWidget } from "./stat-card";
import { todoListWidget } from "./todo-list";

/** Palette order — what a picker shows, grouped roughly by category. */
export const widgetList: WidgetManifest[] = [
  statCardWidget,
  gaugeWidget,
  barChartWidget,
  lineChartWidget,
  areaChartWidget,
  donutChartWidget,
  heatmapWidget,
  progressListWidget,
  dataTableWidget,
  todoListWidget,
  clockWidget,
];

/** Lookup by the id stored in a saved layout. */
const widgetsManifests: Record<string, WidgetManifest> = Object.fromEntries(
  widgetList.map((widget) => [widget.id, widget]),
);

export default widgetsManifests;
