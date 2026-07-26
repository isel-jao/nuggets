import { Suspense } from "react";
import FallbackIcon from "./fallback";
import { registry } from "./registry";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  Fallback?: React.FC<React.SVGProps<SVGSVGElement>>;
}

export function Icon({ name, Fallback = FallbackIcon, ...props }: IconProps) {
  const IconComponent = registry.get(name);
  if (IconComponent) {
    return (
      <Suspense fallback={<Fallback {...props} />}>
        <IconComponent {...props} />
      </Suspense>
    );
  }

  return <Fallback {...props} />;
}
