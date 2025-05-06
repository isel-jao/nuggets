import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import useSWR from "swr";

async function fetcher() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  if (Math.random() > 0.5) {
    throw new Error("Error fetching data");
  }
  return "hello world";
}

function Loading() {
  return (
    <div className="flex h-[20rem] items-center justify-center border">
      <h1 className="text-4xl font-bold">Loading...</h1>
    </div>
  );
}

function ErrorFallback() {
  return (
    <div className="flex h-[20rem] flex-col items-center justify-center gap-2 border">
      <h1 className="font-medium">Something went wrong.</h1>
      <p>please try again later.</p>
    </div>
  );
}

function SomeComponent() {
  const { data } = useSWR("hello", fetcher, { suspense: true });
  return (
    <div className="flex h-[20rem] items-center justify-center border">
      <h1 className="text-4xl font-bold">{JSON.stringify(data)}</h1>
    </div>
  );
}

export default function DevPage() {
  return (
    <main className="container flex flex-col gap-4 p-6">
      <ErrorBoundary fallback={<ErrorFallback />}>
        <Suspense fallback={<Loading />}>
          <SomeComponent />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
