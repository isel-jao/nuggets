import { Subject, interval, BehaviorSubject } from "rxjs";

// A Subject is like an Observable, but can multicast to many Observers. Subjects are like EventEmitters: they maintain a registry of many listeners.

// Every Subject is an Observable.

// Every Subject is an Observer

// const subject = new Subject<number>();

// const subscription1 = subject.subscribe({
//   next: (data) => console.log("observer 1:", data),
//   error: (err) => console.log("observer 1 error:", err),
//   complete: () => console.log("observer 1 completed"),
// });

// let count = 0;

// const intervalId = setInterval(() => {
//   subject.next(++count);
// }, 1000);

// setTimeout(() => {
//   const subscription2 = subject.subscribe({
//     next: (data) => console.log("observer 2:", data),
//     error: (err) => console.log("observer 2 error:", err),
//     complete: () => console.log("observer 2 completed"),
//   });
// }, 5000);

// setTimeout(() => {
//   subject.complete();
//   clearInterval(intervalId);
// }, 10000);

// ------------------------------------------
// Every Subject is an Observer
// ------------------------------------------

// const subject = new Subject<number>();
// interval(1000).subscribe(subject);

// const subscription1 = subject.subscribe({
//   next: (data) => console.log("observer 1:", data),
//   error: (err) => console.log("observer 1 error:", err),
//   complete: () => console.log("observer 1 completed"),
// });

// setTimeout(() => {
//   const subscription2 = subject.subscribe({
//     next: (data) => console.log("observer 2:", data),
//     error: (err) => console.log("observer 2 error:", err),
//     complete: () => console.log("observer 2 completed"),
//   });
// }, 5000);

// setTimeout(() => {
//   subject.complete();
// }, 10000);

// const subject = new BehaviorSubject<number>(0); // initial value

// const subscription1 = subject.subscribe({
//   next: (data) => console.log("observer 1:", data),
//   error: (err) => console.log("observer 1 error:", err),
//   complete: () => console.log("observer 1 completed"),
// });

// let count = 0;

// const intervalId = setInterval(() => {
//   subject.next(++count);
// }, 2000);

// setTimeout(() => {
//   const subscription2 = subject.subscribe({
//     next: (data) => console.log("observer 2:", data),
//     error: (err) => console.log("observer 2 error:", err),
//     complete: () => console.log("observer 2 completed"),
//   });
// }, 5000);
