type TObserverCallback<T> = (data: T) => void;

interface ISubscription {
  unsubscribe(): void;
}

class Subject<T> {
  private observers: Set<TObserverCallback<T>>;
  private isStopped = false;

  constructor() {
    this.observers = new Set();
  }

  next(value: T): void {
    if (this.isStopped) return;
    this.observers.forEach((callback) => callback(value));
  }

  subscribe(callback: TObserverCallback<T>): ISubscription {
    if (this.isStopped) {
      throw new Error("Subject has been completed");
    }
    this.observers.add(callback);
    let closed = false;
    return {
      unsubscribe: () => {
        if (!closed) {
          this.observers.delete(callback);
          closed = true;
        }
      },
    };
  }
  closed = true;
}

const subject = new Subject<number>();

const subscription1 = subject.subscribe((data) => {
  console.log("Observer 1:", data);
});

let counter = 0;

setInterval(() => {
  subject.next(++counter);
}, 1000);

let subscription2: ISubscription | null = null;

setTimeout(() => {
  subscription2 = subject.subscribe((data) => {
    console.log("Observer 2:", data);
  });
}, 3000);

setTimeout(() => {
  subscription1.unsubscribe();
  console.log("Observer 1 unsubscribed");
}, 7000);

setTimeout(() => {
  if (subscription2) {
    subscription2.unsubscribe();
    console.log("Observer 2 unsubscribed");
  }
}, 10000);
