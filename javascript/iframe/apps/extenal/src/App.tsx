import { useEffect, useRef } from "react";
import { Button } from "./components/button";
import { useParams } from "react-router";

type MessagePayload = {
  message: string | null;
};

const environment = {
  isIframe: window.self !== window.top,
  // sameOrigin: window.location.origin === window.parent.location.origin,
};
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

export default function App() {
  const formRef = useRef<HTMLFormElement>(null);
  const { token } = useParams<{ token: string }>();

  useEffect(() => {
    console.log("Environment:", environment);

    console.log("Token from URL:", token);

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
