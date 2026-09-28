import { useEffect, useRef } from "react";
import { Button } from "./components/button";

const inlineIframeSrcDoc = `
<body><h1>Hello</h1></body>
<style>
  body {
    background-color: #00f0f0;
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
  }
</style>
<script>
  console.log('Hello from inline iframe');
</script>
`;

const shortLivedToken = "short-lived-token"; // This token is valid for 5 minutes

type MessagePayload = {
  message: string | null;
};

function sendMessageToIframe(
  iframe: HTMLIFrameElement,
  payload: MessagePayload,
) {
  iframe.contentWindow?.postMessage(
    {
      source: "consumer",
      payload,
    },
    "http://localhost:8080",
  );
}

export default function App() {
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const message = formData.get("message");
    if (!message) return;

    const externalIframe = document.getElementById("external-iframe") as
      | HTMLIFrameElement
      | undefined;

    if (externalIframe) {
      sendMessageToIframe(externalIframe, { message: message as string });
    }

    // reset the form after submission
    formRef.current?.reset();
  }

  useEffect(() => {
    window.addEventListener("message", (event) => {
      if (event.data.source === "client") {
        console.log("Message received in consumer:", event.data.payload);
      }
    });
  }, []);

  return (
    <main className="mx-0 flex flex-col">
      <h3 className="px-4  font-bold text-xl mt-4">Consumer</h3>
      <form ref={formRef} className="p-4 flex" onSubmit={handleSubmit}>
        <input
          type="text"
          name="message"
          className="px-4 py-2 rounded bg-foreground/5 w-1 flex-1"
          placeholder="Send message to external iframe"
        />
        <Button type="submit" className="ml-2">
          Send to Inline Iframe
        </Button>
      </form>
      <h3 className="px-4 mt-4 font-bold text-xl">Inline iframe</h3>
      <iframe
        title="inline iframe demo"
        id="inline-iframe"
        srcDoc={inlineIframeSrcDoc}
      ></iframe>
      <h3 className="px-4 mt-4 font-bold text-xl">External iframe</h3>
      <iframe
        title="external iframe demo"
        id="external-iframe"
        src={`http://localhost:8080?token=${shortLivedToken}`}
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals"
        allow="fullscreen; clipboard-write"
        referrerPolicy="strict-origin-when-cross-origin"
        className=" w-full h-1 flex-1 "
      />
    </main>
  );
}
