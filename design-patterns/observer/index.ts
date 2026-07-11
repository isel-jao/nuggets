// Observer interface
interface Observer<T> {
  next(value: T): void;
  error(err: Error): void;
  complete(): void;
}


interface Subscription {
  unsubscribe(): void;
}

class Subject<T> {
    private observers: Observer<T>[] = [];
    private isComplete = false;

    subscribe(observer: Observer<T>): Subscription {
        this.observers.push(observer);
        return {
            unsubscribe: () => this.unsubscribe(observer)
        };
    }

    unsubscribe(observer: Observer<T>): void {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    next(value: T): void {
        if (this.isComplete) return;
        for (const observer of this.observers) {
                observer.next(value);
        }
    }

    error(err: Error): void {
        for (const observer of this.observers) {
            observer.error(err);
        }
    }

    complete(): void {
        for (const observer of this.observers) {
            observer.complete();
        }
        this.isComplete = true;
    }
}


const subject = new Subject<number>();

const subscription1 = subject.subscribe({
    next: (value) => console.log(`Observer 1: ${value}`),
    error: (err) => console.error(`Observer 1 Error: ${err}`),
    complete: () => console.log(`Observer 1 Complete`)
});

let count = 0;

const intervalId = setInterval(() => {
    subject.next(++count);
}, 1000);


setTimeout(() => {
    subject.complete();
    clearInterval(intervalId);
}, 10000);

