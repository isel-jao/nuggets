import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useRemoteState } from "../store";

type RemoteComponentProps = Record<string, unknown> & {
  name: string;
  entry: string;
  className?: string;
};

export function Remote({
  name,
  entry,
  className,
  ...props
}: RemoteComponentProps) {
  const LoadedComponent = useRemoteState(entry, name, { suspense: true });
  return <LoadedComponent {...props} />;
}

export function RemoteComponent({
  name,
  entry,
  className,
  ...props
}: RemoteComponentProps) {
  return (
    <ErrorBoundary
      fallback={
        <div className="text-red-500">
          Failed to load remote component "{name}" from "{entry}"
        </div>
      }
    >
      <Suspense
        fallback={
          <div className="text-foreground/50">
            Loading remote component "{name}" from "{entry}"
          </div>
        }
      >
        <Remote name={name} entry={entry} {...props} />
      </Suspense>
    </ErrorBoundary>
  );
}
