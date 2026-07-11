import { useEffect, useState } from "react";

export type Selector<T, U> = (state: T) => U;

type BehaviorSubject<T> = {
  getValue(): T;
  subscribe(callback: (value: T) => void): { unsubscribe(): void };
};

export function useSubject<T>(subject: BehaviorSubject<T>): T;

export function useSubject<T, U>(
  subject: BehaviorSubject<T>,
  selector: Selector<T, U>,
): U;

export function useSubject<T, U>(
  subject: BehaviorSubject<T>,
  selector?: Selector<T, U>,
) {
  const project = (value: T) => (selector ? selector(value) : (value as T | U));

  const [state, setState] = useState(() => project(subject.getValue()));

  useEffect(() => {
    const subscription = subject.subscribe((value) => {
      setState(project(value));
    });

    return () => subscription.unsubscribe();
  }, [subject, selector]);

  return state;
}
