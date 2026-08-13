import { useState } from "react";
import { RemoteComponent } from "./remote-component";
import { Events } from "./events";
import { store } from "./store";

function preloadRemoteComponent(remotes: { entry: string; name: string }[]) {
  for (const { entry, name } of remotes) {
    store.load(entry, name);
  }
}

preloadRemoteComponent([
  { entry: "http://localhost:8089/remoteEntry.js", name: "button" },
  { entry: "http://localhost:8089/remoteEntry.js", name: "card" },
]);

export default function App() {
  const [showCard, setShow] = useState(false);
  function handleCardLoad() {
    setShow(true);
  }

  return (
    <main className="flex p-6 gap-4 ">
      <div className="border rounded p-4 flex-1 [&>h3]:mb-2 [&>h3]:text-lg [&>h3]:font-semibold [&>h3:not(:first-child)]:mt-4">
        <h3>Remote Button</h3>
        <RemoteComponent
          entry="http://localhost:8089/remoteEntry.js"
          name="button"
          onClick={() => {
            alert("clicked");
          }}
        >
          click me
        </RemoteComponent>
        <h3>
          Remote Card{" "}
          {!showCard && (
            <button
              className="ml-2 rounded bg-foreground/10 hover:brightness-110  px-2 py-0.5 text-white"
              onClick={handleCardLoad}
            >
              load card
            </button>
          )}
        </h3>
        {showCard && (
          <RemoteComponent
            entry="http://localhost:8089/remoteEntry.js"
            name="card"
            onLoad={handleCardLoad}
          >
            <p>
              This is a remote card component loaded from a different
              application. It
            </p>
          </RemoteComponent>
        )}
        <h3>Invalid Entry</h3>
        <RemoteComponent name="card" entry="invalid-entry.js" />
        <h3>Invalid Name</h3>
        <RemoteComponent
          name="invalid-name"
          entry="http://localhost:8089/remoteEntry.js"
        />
      </div>
      <Events className="w-120 border rounded p-4" />
    </main>
  );
}
