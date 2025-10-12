import { useState } from "react";
import ContextDemo from "./components/context-demo";
import ObservablePatternDemo1 from "./components/observable-pattern-demo1";
import ObservablePatternDemo2 from "./components/observable-pattern-demo2";

const demos = {
  "demo-1": <ContextDemo />,
  "demo-2": <ObservablePatternDemo1 />,
  "demo-3": <ObservablePatternDemo2 />,
};

export default function App() {
  const [demo, setDemo] = useState<keyof typeof demos>("demo-1");
  return (
    <main className="container p-[clamp(1rem,5vw,5rem)] grid place-content-center ">
      <select
        className="mb-4 p-2 border border-foreground/20 rounded [&>option]:bg-card accent-primary"
        value={demo}
        onChange={(e) => setDemo(e.target.value as keyof typeof demos)}
      >
        <option value="demo-1">Context Demo</option>
        <option value="demo-2">Observable Pattern Demo 1 (Simple)</option>
        <option value="demo-3">Observable Pattern Demo 2 (Improved)</option>
      </select>
      {demos[demo]}
    </main>
  );
}
