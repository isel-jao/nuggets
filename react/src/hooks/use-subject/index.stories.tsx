import { useMemo } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useSubject } from "./index";

class BehaviorSubject<T> {
  private value: T;
  private observers = new Set<(value: T) => void>();

  constructor(initialValue: T) {
    this.value = initialValue;
  }

  getValue() {
    return this.value;
  }

  next(value: T) {
    this.value = value;
    this.observers.forEach((observer) => observer(value));
  }

  subscribe(callback: (value: T) => void) {
    this.observers.add(callback);
    return { unsubscribe: () => this.observers.delete(callback) };
  }
}

type CounterState = { count: number; label: string };

function CountDisplay({ subject }: { subject: BehaviorSubject<CounterState> }) {
  const state = useSubject(subject);
  return (
    <p>
      {state.label}: {state.count}
    </p>
  );
}

function CountOnlyDisplay({
  subject,
}: {
  subject: BehaviorSubject<CounterState>;
}) {
  // Selector keeps this component from re-rendering when only `label` changes.
  const count = useSubject(subject, (state) => state.count);
  return <p>count via selector: {count}</p>;
}

function Harness() {
  const subject = useMemo(
    () => new BehaviorSubject<CounterState>({ count: 0, label: "counter" }),
    [],
  );

  return (
    <div>
      <button
        onClick={() =>
          subject.next({ ...subject.getValue(), count: subject.getValue().count + 1 })
        }
      >
        Increment
      </button>
      <button
        onClick={() =>
          subject.next({ ...subject.getValue(), label: `counter-${Date.now() % 1000}` })
        }
      >
        Change label
      </button>
      <CountDisplay subject={subject} />
      <CountOnlyDisplay subject={subject} />
    </div>
  );
}

const meta = {
  title: "Hooks/useSubject",
  component: Harness,
} satisfies Meta<typeof Harness>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
