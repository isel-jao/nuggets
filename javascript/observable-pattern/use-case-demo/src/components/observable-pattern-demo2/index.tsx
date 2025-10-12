import { useEffect, useRef } from "react";
import { Subject } from "../../lib/subject";
import { Card } from "../card";
import { Input } from "../input";
import { Display } from "../display";

const subject = new Subject<string>();

export default function ObservablePatternDemo2() {
  return (
    <Card className="w-[60rem] flex flex-col gap-5 py-12 aspect-video">
      <h2 className="text-3xl font-bold">Observable Pattern Demo 2</h2>
      <CustomInput />
      <CustomDisplay />
    </Card>
  );
}

function CustomInput() {
  return (
    <Input
      placeholder="Type something..."
      onChange={(e) => subject.next(e.target.value)}
    />
  );
}

function CustomDisplay() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const subscription = subject.subscribe({
      next: (value) => {
        if (ref.current) {
          ref.current.textContent = "Hello, " + value;
        }
      },
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);
  return <Display ref={ref}>Hello, Stranger</Display>;
}
