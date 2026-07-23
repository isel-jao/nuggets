import { useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useMountLayoutEffect } from "./index";

function LayoutEffectDemo() {
  const boxRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number | null>(null);

  useMountLayoutEffect(() => {
    // Measured synchronously before paint, so there's no flash of the
    // "not yet measured" state like there would be with useEffect.
    setWidth(boxRef.current?.getBoundingClientRect().width ?? null);
  });

  return (
    <div>
      <div
        ref={boxRef}
        style={{ width: "60%", padding: 8, background: "#eee" }}
      >
        Measured box
      </div>
      <p>Width at mount: {width === null ? "measuring…" : `${width}px`}</p>
    </div>
  );
}

function Harness() {
  const [mounted, setMounted] = useState(true);

  return (
    <div>
      <button onClick={() => setMounted((prev) => !prev)}>
        {mounted ? "Unmount" : "Mount"}
      </button>
      <p>Toggle to remount the child and re-measure its width.</p>
      {mounted && <LayoutEffectDemo />}
    </div>
  );
}

const meta = {
  title: "Hooks/useMountLayoutEffect",
  component: Harness,
} satisfies Meta<typeof Harness>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
