import { useCallback, useState } from "react";
import { RemoteComponent } from "./components/remote-component";

export default function App() {
  const [active, setActive] = useState("button");
  const ActiveComponent = useCallback(
    () => (
      <RemoteComponent
        name={active}
        entry="http://localhost:8089/remoteEntry.js"
        onClick={() => alert("Button clicked!")}
      >
        {active === "button" ? "Click me!" : <p>Card content</p>}
      </RemoteComponent>
    ),
    [active],
  );

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex gap-2">
        <button
          className="bg-blue-500 text-white px-3 py-1.5 rounded"
          onClick={() => setActive("button")}
        >
          Load Button
        </button>
        <button
          className="bg-green-500 text-white px-3 py-1.5 rounded"
          onClick={() => setActive("card")}
        >
          Load Card
        </button>
      </div>
      <div className="mt-4">
        <ActiveComponent />
      </div>
    </div>
  );
}
