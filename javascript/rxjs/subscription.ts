import { Observable, Observer, Subscription } from "rxjs";

// const observable = new Observable<number>((subscriber) => {
//   subscriber.next(1);
//   subscriber.next(2);
//   subscriber.next(3);
//   setTimeout(() => {
//     subscriber.next(4);
//     subscriber.complete();
//   }, 1000);
//   subscriber.next(5);
// });

// const subscription1 = observable.subscribe((data) =>
//   console.log("observable 1:", data)
// );

// const subscription2 = observable.subscribe((data) =>
//   console.log("observable 2:", data)
// );

const observable = new Observable<number>((subscriber) => {
  let i = 0;
  const take = 5;

  const intervalId = setInterval(() => {
    if (i === take) {
      subscriber.complete();
      clearInterval(intervalId);
    }
    subscriber.next(i++);
  }, 1000);
});

const subscription1 = observable.subscribe((data) =>
  console.log("observable 1:", data)
);

const subscription2 = observable.subscribe((data) =>
  console.log("observable 2:", data)
);

// setTimeout(() => {
//   subscription1.unsubscribe();
//   console.log("subscription 1 unsubscribed");
//   subscription2.unsubscribe();
//   console.log("subscription 2 unsubscribed");
// }, 5000);

subscription1.add(subscription2);

setTimeout(() => {
  subscription1.unsubscribe();
  console.log("subscription 1 unsubscribed");
}, 5000);
