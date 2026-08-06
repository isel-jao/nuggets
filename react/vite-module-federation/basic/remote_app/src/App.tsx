import { Button } from "./components/button";
import { Card } from "./components/card";

export default function App() {
  return (
    <main className="container ">
      <h3>Host App</h3>
      <Card>
        <Button>click me</Button>
      </Card>
    </main>
  );
}
