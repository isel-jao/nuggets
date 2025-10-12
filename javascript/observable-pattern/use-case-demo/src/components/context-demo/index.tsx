import { Card } from "../card";

import { createContext, useContext, useState } from "react";
import { Input } from "../input";
import { Display } from "../display";

type TDemoContext = {
  name: string;
  setName: (name: string) => void;
};

const DemoContext = createContext<TDemoContext | null>(null);

function useDemoContext() {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error("useDemoContext must be used within a DemoProvider");
  }
  return context;
}

export default function ContextDemo() {
  const [name, setName] = useState("");
  return (
    <DemoContext.Provider value={{ name, setName }}>
      <Card className="w-[60rem] flex flex-col gap-5 py-12 aspect-video">
        <h2 className="text-3xl font-bold">Context Demo</h2>
        <CustomInput />
        <CustomDisplay />
      </Card>
    </DemoContext.Provider>
  );
}

function CustomInput() {
  const { name, setName } = useDemoContext();
  return (
    <Input
      placeholder="Type something..."
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  );
}

function CustomDisplay() {
  const { name } = useDemoContext();
  return <Display>Hello, {name || "Stranger"}!</Display>;
}
