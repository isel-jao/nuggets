import { lazy, useState, type ReactNode, type SVGProps } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon, registry } from "./index";

function makeIcon(children: ReactNode) {
  return function GeneratedIcon(props: SVGProps<SVGSVGElement>) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        {children}
      </svg>
    );
  };
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Stand-ins for the real chunks an app would point `lazy` at, e.g.
// `lazy(() => import("./icons/check"))`.
const checkIcon = makeIcon(<path d="M20 6 9 17l-5-5" />);
const heartIcon = makeIcon(
  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />,
);
const starIcon = makeIcon(
  <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.68a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z" />,
);

registry.register("check", lazy(async () => ({ default: checkIcon })));
registry.register("heart", lazy(async () => ({ default: heartIcon })));
registry.register("star", lazy(async () => ({ default: starIcon })));

const registeredNames = ["check", "heart", "star"];

function PlaceholderIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeDasharray="3 3"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="3" />
    </svg>
  );
}

const meta = {
  title: "Components/Icon",
  component: Icon,
  argTypes: {
    name: {
      control: "select",
      options: [...registeredNames, "not-registered"],
    },
  },
  args: {
    name: "check",
  },
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Every extra prop lands on the underlying `<svg>`. */
export const Styled: Story = {
  args: {
    name: "heart",
    width: 64,
    height: 64,
    color: "crimson",
    fill: "crimson",
    strokeWidth: 1.5,
  },
};

/** Unknown names render the built-in fallback instead of throwing. */
export const UnknownName: Story = {
  args: {
    name: "not-registered",
  },
};

/** `Fallback` overrides what renders for a miss (and while a chunk loads). */
export const CustomFallback: Story = {
  args: {
    name: "not-registered",
    Fallback: PlaceholderIcon,
  },
};

function LoadingHarness() {
  const [attempt, setAttempt] = useState(0);

  function reload() {
    // `lazy` caches its resolved module, so re-registering under the same name
    // is what makes the Suspense fallback observable more than once.
    registry.register(
      "slow",
      lazy(async () => {
        await delay(1500);
        return { default: starIcon };
      }),
    );
    setAttempt((prev) => prev + 1);
  }

  return (
    <div>
      <button onClick={reload}>Load slow icon</button>
      <p>
        The registered component takes 1.5s to resolve; until it does, `Fallback`
        stands in as the Suspense boundary's fallback.
      </p>
      {attempt > 0 && (
        <Icon
          key={attempt}
          name="slow"
          width={64}
          height={64}
          Fallback={PlaceholderIcon}
        />
      )}
    </div>
  );
}

export const LazyLoading: Story = {
  render: () => <LoadingHarness />,
};

export const Gallery: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 24 }}>
      {[...registeredNames, "not-registered"].map((name) => (
        <figure key={name} style={{ margin: 0, textAlign: "center" }}>
          <Icon name={name} width={40} height={40} />
          <figcaption>{name}</figcaption>
        </figure>
      ))}
    </div>
  ),
};
