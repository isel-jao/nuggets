import { Observable, Observer } from "rxjs";

const observable = new Observable<number>((subscriber) => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  setTimeout(() => {
    subscriber.next(4);
    subscriber.complete();
  }, 1000);
  subscriber.next(5);
});

const observer: Observer<number> = {
  next: (data) => console.log("next =>", data),
  error: (err) => console.log("error =>", err),
  complete: () => console.log("completed"),
};

observable.subscribe(observer);
