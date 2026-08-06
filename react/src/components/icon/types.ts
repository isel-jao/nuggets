import React, { type ComponentType, type SVGProps } from "react";

export type IconComponent = React.LazyExoticComponent<
  ComponentType<SVGProps<SVGSVGElement>>
>;
