import { useMemo, useState } from "react";
import { WidgetFrame } from "../lib/frame";
import { percent } from "../lib/format";

interface Task {
  id: string;
  title: string;
  due: string;
  done: boolean;
}

const initialTasks: Task[] = [
  { id: "1", title: "Review dashboard layout PR", due: "Today", done: true },
  { id: "2", title: "Ship widget palette", due: "Today", done: false },
  { id: "3", title: "Audit chart contrast in dark mode", due: "Tomorrow", done: false },
  { id: "4", title: "Write layout persistence tests", due: "Thu", done: false },
  { id: "5", title: "Cut the 0.4 release", due: "Fri", done: false },
];

export function Renderer() {
  const [tasks, setTasks] = useState(initialTasks);

  const completed = useMemo(() => tasks.filter((task) => task.done).length, [tasks]);
  const ratio = tasks.length === 0 ? 0 : completed / tasks.length;

  const toggle = (id: string) =>
    setTasks((previous) =>
      previous.map((task) => (task.id === id ? { ...task, done: !task.done } : task)),
    );

  return (
    <WidgetFrame
      title="Tasks"
      subtitle={`${completed} of ${tasks.length} done`}
      actions={
        <span className="text-xs tabular-nums text-muted">{percent(ratio * 100)}</span>
      }
      bodyClassName="flex flex-col gap-2"
    >
      <div
        className="h-1 w-full shrink-0 overflow-hidden rounded-full"
        style={{ backgroundColor: "var(--seq-1)" }}
        role="progressbar"
        aria-valuenow={completed}
        aria-valuemin={0}
        aria-valuemax={tasks.length}
        aria-label="Tasks completed"
      >
        <div
          className="h-full rounded-full transition-[width]"
          style={{ width: `${ratio * 100}%`, backgroundColor: "var(--chart-1)" }}
        />
      </div>

      <ul className="min-h-0 flex-1 overflow-auto">
        {tasks.map((task) => (
          <li key={task.id}>
            <label className="flex cursor-pointer items-center gap-2 py-1 text-xs">
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggle(task.id)}
                className="size-3.5 shrink-0 accent-primary"
              />
              <span
                className={
                  task.done
                    ? "truncate text-muted-foreground line-through"
                    : "truncate text-foreground"
                }
              >
                {task.title}
              </span>
              <span className="ml-auto shrink-0 text-muted-foreground">{task.due}</span>
            </label>
          </li>
        ))}
      </ul>
    </WidgetFrame>
  );
}
