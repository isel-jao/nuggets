export interface IObserver<T = unknown> {
  next(value: T): void | Promise<void>;
  error?(err: unknown): void;
  complete?(): void;
  removeOnError?: boolean;
  onError?: (err: unknown) => void;
}

export interface Subscription {
  unsubscribe(): void;
  readonly closed: boolean;
}

export class Subject<T> {
  private observers: Set<IObserver<T>>;
  private isStopped = false;
  private hasError = false;
  private thrownError: unknown = null;

  private onObserverError: ((err: unknown) => void) | null = null;
  constructor() {
    this.observers = new Set();
  }

  next(value: T): void {
    if (this.isStopped) return;
    this.notifyAsync(value);
  }

  error(err: unknown): void {
    if (this.isStopped) return;
    this.hasError = true;
    this.thrownError = err;
    this.observers.forEach((observer) => observer.error?.(err));
    this.isStopped = true;
    this.observers.clear();
  }

  complete(): void {
    if (this.isStopped) return;
    this.observers.forEach((observer) => observer.complete?.());
    this.isStopped = true;
    this.observers.clear();
  }

  subscribe(observer: IObserver<T>): Subscription {
    if (this.hasError) {
      observer.error?.(this.thrownError);
      return {
        unsubscribe: () => {},
        closed: true,
      };
    }

    if (this.isStopped) {
      observer.complete?.();
      return {
        unsubscribe: () => {},
        closed: true,
      };
    }
    this.observers.add(observer);
    let closed = false;
    return {
      unsubscribe: () => {
        if (!closed) {
          this.observers.delete(observer);
          closed = true;
        }
      },
      get closed() {
        return closed;
      },
    };
  }

  private async notifyAsync(value: T): Promise<void> {
    await Promise.all(
      Array.from(this.observers).map(async (observer) => {
        try {
          await observer.next(value);
        } catch (err) {
          this.onObserverError?.(err);
          try {
            observer.onError?.(err);
          } catch (e) {
            console.error("Error in observer's onError callback:", e);
          }
          if (observer.removeOnError) {
            this.observers.delete(observer);
          }
        }
      })
    );
  }
}
