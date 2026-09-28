import { useEffect, useRef } from "react";
import { Button } from "../../components/button";
import { useSearchParams } from "react-router";
import { create } from "zustand";

type GlobalStore = {
  token: string | null;
  setToken: (token: string | null) => void;
};

const useGlobalStore = create<GlobalStore>((set) => ({
  token: null,
  setToken: (token) => set({ token }),
}));

type MessagePayload = {
  message: string | null;
};

const environment = {
  isIframe: window.self !== window.top,
};

console.log("Environment:", environment);

function sendMessageToParent(payload: MessagePayload) {
  if (!environment.isIframe) {
    console.warn("Not in an iframe, cannot send message to parent");
    return;
  }
  window.parent?.postMessage(
    {
      source: "client",
      payload,
    },
    "http://localhost:8081",
  );
}

if (!environment.isIframe) {
  // throw new Error("This page should not be loaded in an iframe");
}

export default function HomePage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [searchParams] = useSearchParams();
  const { token, setToken } = useGlobalStore();

  useEffect(() => {
    console.log("Environment:", environment);

    const token = searchParams.get("token");
    if (token) {
      setToken(token);
      searchParams.delete("token");
    }

    const handleMessage = (event: MessageEvent) => {
      if (event.data.source === "consumer") {
        console.log("Message received in client:", event.data.payload);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const message = formData.get("message");

    if (!message) return;

    sendMessageToParent({ message: message as string });

    // reset the form after submission
    formRef.current?.reset();
  }

  return (
    <main className="p-4  space-y-4 overflow-auto">
      <div>
        <p>StoreToken: {token}</p>
        <p>SearchParamsToken: {searchParams.get("token")}</p>
      </div>
      <form
        ref={formRef}
        className="flex p-4 bg-card border rounded-lg"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="message"
          className="px-4 py-2 rounded bg-foreground/5 w-1 flex-1"
          placeholder="Send message to parent"
        />
        <Button type="submit" className="ml-2">
          Send to Inline Iframe
        </Button>
      </form>
      <div className="flex gap-2 p-2 border rounded ">
        <Button
          onClick={() => {
            alert("This is an alert from the client app");
          }}
        >
          Alert
        </Button>
        <Button
          onClick={() => {
            console.log("This is a console log from the client app");
          }}
        >
          Console Log
        </Button>
        <Button
          onClick={() => {
            navigator.mediaDevices
              .getUserMedia({ video: true })
              .then((stream) => {
                console.log("Camera access granted", stream);
              })
              .catch((err) => {
                console.error("Camera access denied", err);
              });
          }}
        >
          Access Camera
        </Button>
      </div>
      <h3>this is client </h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
      </p>
    </main>
  );
}
