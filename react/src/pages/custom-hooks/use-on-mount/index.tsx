import { useOnMount } from "@/hooks/use-on-mount";
import { useEffect } from "react";
import { toast } from "sonner";

const abortController = new AbortController();

export default function UseOnMountPage() {
  useOnMount(() => {
    setTimeout(
      () => {
        toast.info("useOnMount: This will only run once", {
          position: "top-right",
        });
      },
      1000,
      abortController.signal,
    );
    return () => {
      toast.dismiss();
      abortController.abort();
    };
  });

  useEffect(() => {
    // toast.info("useEffect: This will run twice in development mode");
    setTimeout(
      () => {
        toast.info("useEffect: This will run twice in development mode", {});
      },
      1000,
      abortController.signal,
    );
    return () => {
      toast.dismiss();
      abortController.abort();
    };
  }, []);
  return (
    <main className="container p-4">
      <h1 className="font-bold">useOnMount</h1>
      <p>
        A custom React hook that runs a callback function only once when a
        component mounts,
      </p>
      <p>
        even in React's Strict Mode which double-invokes effects during
        development.
      </p>
    </main>
  );
}
