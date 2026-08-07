import { useState } from "react";
import { RemoteComponent } from "./components/remote-component";

export default function App() {
  const [isCardLoaded, setIsCardLoaded] = useState(false);
  function handleCardLoad() {
    setIsCardLoaded(true);
  }
  return (
    <main className=" p-6 [&>h3]:mb-2 [&>h3]:text-lg [&>h3]:font-semibold [&>h3:not(:first-child)]:mt-4">
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
        {!isCardLoaded && (
          <button
            className="ml-2 rounded bg-foreground/10 hover:brightness-110  px-2 py-0.5 text-white"
            onClick={handleCardLoad}
          >
            load card
          </button>
        )}
      </h3>
      {isCardLoaded && (
        <RemoteComponent
          entry="http://localhost:8089/remoteEntry.js"
          name="card"
          onLoad={handleCardLoad}
        >
          <p>
            This is a remote card component loaded from a different application.
            It
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
    </main>
  );
}
