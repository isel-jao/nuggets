import { useEffect, useRef, useState } from "react";

export interface Size {
  width: number;
  height: number;
}

/**
 * Measures an element so SVG can be drawn at real pixel size. Charts must not
 * be scaled with a viewBox — that distorts stroke widths and text.
 */
export function useElementSize<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new ResizeObserver((entries) => {
      const box = entries[0]?.contentRect;
      if (!box) return;
      setSize((previous) =>
        previous.width === box.width && previous.height === box.height
          ? previous
          : { width: box.width, height: box.height },
      );
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, size] as const;
}
