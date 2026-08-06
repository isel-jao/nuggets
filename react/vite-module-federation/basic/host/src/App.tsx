import { Button } from "./components/button";
import { Card } from "./components/card";
import { lazy, Suspense } from "react";

const RemoteButton = lazy(() =>
  import("remote_app/button").then((m) => ({ default: m.Button })),
);

const RemoteCard = lazy(() =>
  import("remote_app/card").then((m) => ({ default: m.Card })),
);

export default function App() {
  return (
    <main className="container ">
      <h3>Host App</h3>
      <Card>
        <Button>click me</Button>
      </Card>
      <h3>Remote Button</h3>
      <Suspense fallback={<div>Loading...</div>}>
        <RemoteButton>click me</RemoteButton>
      </Suspense>

      <h3>Remote Card</h3>
      <Suspense fallback={<div>Loading...</div>}>
        <RemoteCard>hello from remote card</RemoteCard>
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <RemoteButton>click me</RemoteButton>
      </Suspense>
    </main>
  );
}
