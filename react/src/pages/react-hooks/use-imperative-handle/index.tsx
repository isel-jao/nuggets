import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useImperativeHandle, useRef } from "react";

type MyInputRef = {
  focus: () => void;
  scrollIntoView: () => void;
};

interface MyInputProps {
  ref: React.Ref<MyInputRef>;
}

function MyInput({ ref }: MyInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => {
    return {
      focus() {
        inputRef.current?.focus();
        console.log("focus input");
      },
      scrollIntoView() {
        inputRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      },
    };
  }, []);

  return (
    <input ref={inputRef} className="bg-foreground/10 rounded px-4 py-2" />
  );
}

export default function UseImperativeHandlePage() {
  const inputRef = useRef<MyInputRef>(null);
  const handleFocus = () => {
    inputRef.current?.focus();
    console.log("focus");
  };
  const handleScrollIntoView = () => {
    inputRef.current?.scrollIntoView();
  };
  return (
    <main className="container flex flex-col gap-4 p-4">
      <h1 className="font-bold">useImperativeHandle</h1>
      <p>A React Hook that lets you customize the handle exposed as a ref.</p>

      <div className="flex items-center gap-4">
        <Button onClick={handleScrollIntoView}>Scroll Into View</Button>
        <Button onClick={handleFocus}>Fucus Input</Button>
      </div>
      <ScrollArea className="h-1 flex-1">
        <div className="pl-1">
          <div className="h-screen"></div>
          <MyInput ref={inputRef} />
          <div className="h-screen"></div>
        </div>
      </ScrollArea>
    </main>
  );
}
