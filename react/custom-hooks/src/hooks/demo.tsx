import React from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "../components/button";
import { useSyncedAnimations } from "./use-sync-animations";
import { InnerCard } from "../components/inner-card";
import { Card } from "../components/card";

interface UseSyncAnimationsDemoProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "children"
> {}

export function UseSyncAnimationsDemo({
  className,
  ...props
}: UseSyncAnimationsDemoProps) {
  return (
    <Card className={twMerge("space-y-2", className)} {...props}>
      <h3 className="text-lg">useSyncAnimations Demo</h3>
      <WithoutSyncAnimations />
      <WithSyncAnimations />
    </Card>
  );
}

interface LoaderProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "children"
> {
  ref?: React.Ref<HTMLDivElement>;
}

export function Loader({ className, ...props }: LoaderProps) {
  return (
    <div
      className={twMerge(
        "bg-conic from-blue-500 to-purple-500 animate-spin [animation-duration:1s] size-12 rounded-full",
        className,
      )}
      {...props}
    ></div>
  );
}
export function SyncedLoader({ className, ...props }: LoaderProps) {
  const ref = useSyncedAnimations<HTMLDivElement>({
    iterationType: "infinite",
  });
  return <Loader ref={ref} className={twMerge(className)} {...props} />;
}

function WithoutSyncAnimations() {
  const [loadersCount, setLoadersCount] = React.useState(1);
  function handleClick() {
    setLoadersCount((prev) => prev + 1);
  }
  return (
    <InnerCard className="space-y-1 bg-background/50 shadow-inner shadow-background   rounded px-4 py-2">
      <h4 className="text-base">Without useSyncAnimations</h4>
      <div className="flex gap-4 flex-wrap items-center">
        <Button onClick={handleClick}>add loader</Button>
        {Array.from({ length: loadersCount }).map((_, i) => (
          <Loader key={i} />
        ))}
      </div>
    </InnerCard>
  );
}

function WithSyncAnimations() {
  const [loadersCount, setLoadersCount] = React.useState(1);
  function handleClick() {
    setLoadersCount((prev) => prev + 1);
  }
  return (
    <InnerCard className="space-y-2 ">
      <h4 className="text-base">With useSyncAnimations</h4>
      <div className="flex gap-4 flex-wrap items-center">
        <Button onClick={handleClick}>add loader</Button>
        {Array.from({ length: loadersCount }).map((_, i) => (
          <SyncedLoader key={i} />
        ))}
      </div>
    </InnerCard>
  );
}
