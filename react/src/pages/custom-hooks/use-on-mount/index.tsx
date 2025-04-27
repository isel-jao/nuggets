import useOnMount from "@/hooks/use-on-mount";
export default function UseOnMountPage() {
  useOnMount(() => {
    console.log("useOnMount");
  });
  return (
    <main className="container">
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
