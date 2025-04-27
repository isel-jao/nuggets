import { useState } from "react";
import { Button } from "@/components/ui/button";
import { usePrev } from "@/hooks/use-prev";

export default function UsePrevPage() {
  const [count, setCount] = useState(0);
  const prevCount = usePrev(count);

  return (
    <main className="container flex flex-col gap-2">
      <h1 className="font-bold">usePrev</h1>
      <p>
        A custom React hook that returns the previous value of a state whenever
        it changes.
      </p>
      <div className="flex items-center gap-2">
        <Button onClick={() => setCount((prev) => prev - 1)}>Decrement</Button>
        <Button onClick={() => setCount((prev) => prev + 1)}>Increment</Button>
        <div>
          <p>Current count: {count}</p>
          <p>Previous count: {prevCount}</p>
        </div>
      </div>
      <p>
        The previous value is stored in a ref, so it will not cause a re-render
        when it changes.
      </p>
    </main>
  );
}
