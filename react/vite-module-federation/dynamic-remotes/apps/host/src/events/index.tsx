import { twMerge } from "tailwind-merge";
import { useAllRemoteStates } from "../store";

interface EventsProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "children"
> {}

export function Events({ className, ...props }: EventsProps) {
  const allStates = useAllRemoteStates();
  return (
    <section
      className={twMerge(
        "flex flex-col gap-2 [&>h3]:text-lg [&>h3]:font-semibold",
        className,
      )}
      {...props}
    >
      <h3>Remote States</h3>
      <ul className="flex flex-col gap-2">
        {Object.entries(allStates).map(([key, state]) => (
          <li key={key} className="flex gap-2 items-center">
            <span className="font-mono text-sm">{state.name}</span>
            <span className="flex-1 border-t border-dashed border-foreground/20" />
            {state.isLoading && (
              <span className="text-sm text-foreground/50">loading...</span>
            )}
            {"error" in state && (
              <span className="text-sm text-red-500">error</span>
            )}
            {"remote" in state && (
              <span className="text-sm text-green-500">loaded</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
