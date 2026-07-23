import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useMountEffect } from "./index";

function MountEffectDemo() {
  const [log, setLog] = useState<string[]>([]);

  useMountEffect(() => {
    setLog((prev) => [...prev, `mounted at ${new Date().toLocaleTimeString()}`]);

    return () => {
      // Only observable by remounting this demo, since the log lives in
      // the parent's state and disappears with the child on unmount.
      console.log(`unmounted at ${new Date().toLocaleTimeString()}`);
    };
  });

  return (
    <ul>
      {log.map((entry, index) => (
        <li key={index}>{entry}</li>
      ))}
    </ul>
  );
}

function Harness() {
  const [mounted, setMounted] = useState(true);

  return (
    <div>
      <button onClick={() => setMounted((prev) => !prev)}>
        {mounted ? "Unmount" : "Mount"}
      </button>
      <p>
        Toggle to remount the child. The effect still runs only once per
        mount (open the console to see the cleanup log), even under
        StrictMode's double-invoke.
      </p>
      {mounted && <MountEffectDemo />}
    </div>
  );
}

const meta = {
  title: "Hooks/useMountEffect",
  component: Harness,
} satisfies Meta<typeof Harness>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
