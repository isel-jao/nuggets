import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState, useTransition } from "react";

function Tab1() {
  return (
    <div className="flex h-[30rem] items-center justify-center border">
      <h1 className="text-4xl font-bold">Tab 1</h1>
    </div>
  );
}

function Tab3() {
  return (
    <div className="flex h-[30rem] items-center justify-center border">
      <h1 className="text-4xl font-bold">Tab 3</h1>
    </div>
  );
}

function Slow({ children }: { children: React.ReactNode }) {
  const start = Date.now();
  const end = start + 20;
  while (Date.now() < end) {
    // do nothing
  }
  return <>{children}</>;
}

function Tab2() {
  return (
    <div className="flex h-[30rem] flex-col border">
      <h1 className="text-center text-4xl font-bold">Tab 3</h1>
      <div className="h-1 flex-1 overflow-auto">
        {Array.from({ length: 100 }, (_, i) => (
          <div
            key={i}
            className="flex h-10 items-center justify-between border-b"
          >
            <Slow>
              <h1 className="font-bold">Tab 2</h1>
            </Slow>
          </div>
        ))}
      </div>
    </div>
  );
}

const tabs = [
  { id: "tab1", label: "Tab 1", content: <Tab1 /> },
  { id: "tab2", label: "Tab 2 (Slow)", content: <Tab2 /> },
  { id: "tab3", label: "Tab 3 ", content: <Tab3 /> },
];

function TabButton({
  id,
  activeTab,
  setActiveTab,
}: {
  id: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      variant={activeTab === id ? "default" : "outline"}
      className={cn("w-32", {
        "pointer-events-none animate-pulse": isPending,
      })}
      onClick={() => {
        startTransition(() => {
          setActiveTab(id);
        });
      }}
    >
      {isPending ? "loading..." : tabs.find((tab) => tab.id === id)?.label}
    </Button>
  );
}

export default function UseTransitionPage() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <main className="p-20">
      <h1>useTransition</h1>
      <p>
        A React Hook that lets you mark certain updates as transitions, allowing
        React to optimize rendering for those updates.
      </p>
      <div className="my-4 flex gap-4">
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            id={tab.id}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        ))}
      </div>

      {tabs.find((tab) => tab.id === activeTab)?.content}
    </main>
  );
}
