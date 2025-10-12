import { Observable } from "rxjs";

const observable = new Observable<number>((subscriber) => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  setTimeout(() => {
    subscriber.next(4);
    subscriber.complete();
    subscriber.next(6); // This will be ignored
  }, 1000);
  subscriber.next(5);
});

observable.subscribe((data) => console.log(data));
