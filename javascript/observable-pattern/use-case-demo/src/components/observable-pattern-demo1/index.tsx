import { useEffect, useState } from "react";
import { Subject } from "../../lib/subject";
import { Card } from "../card";
import { Input } from "../input";
import { Display } from "../display";

const subject = new Subject<string>();

export default function ObservablePatternDemo1() {
  return (
    <Card className="w-[60rem] flex flex-col gap-5 py-12 aspect-video">
      <h2 className="text-3xl font-bold">Observable Pattern Demo 1</h2>
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
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    const subscription = subject.subscribe({
      next: (v) => setValue(v),
    });
    return () => subscription.unsubscribe();
  }, []);

  return <Display>Hello, {value || "Stranger"}!</Display>;
}
