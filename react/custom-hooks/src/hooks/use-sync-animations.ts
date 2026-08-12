import { useLayoutEffect, useRef } from "react";

const ORIGIN = 300;

interface Options {
  subtree?: boolean;
  iterationType?: "infinite" | "finite" | "both";
}

export function useSyncedAnimations<T extends Element>(options: Options = {}) {
  const { subtree = false, iterationType } = options;
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    for (const animation of root.getAnimations({ subtree })) {
      if (
        iterationType === "infinite" &&
        animation.effect?.getTiming().iterations !== Infinity
      )
        continue;
      if (
        iterationType === "finite" &&
        animation.effect?.getTiming().iterations === Infinity
      )
        continue;
      if (animation.startTime === ORIGIN) continue;
      animation.startTime = ORIGIN;
    }
  }, [iterationType, subtree]);

  return ref;
}
