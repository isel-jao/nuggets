import { Observable } from "rxjs";
// import { of, from, interval } from "rxjs";

// function of<T = unknown>(...args: T[]): Observable<T> {
//   const observable = new Observable<T>((subscriber) => {
//     args.forEach((arg) => subscriber.next(arg));
//     subscriber.complete();
//   });
//   return observable;
// }

// of(1, 2, 3, 4, 5).subscribe({
//   next: (data) => console.log("next =>", data),
//   error: (err) => console.log("error =>", err),
//   complete: () => console.log("completed"),
// });

// function from<T = unknown>(array: T[]): Observable<T> {
//   const observable = new Observable<T>((subscriber) => {
//     array.forEach((item) => subscriber.next(item));
//     subscriber.complete();
//   });
//   return observable;
// }

// from([1, 2, 3, 4, 5]).subscribe({
//   next: (data) => console.log("next =>", data),
//   error: (err) => console.log("error =>", err),
//   complete: () => console.log("completed"),
// });

// function interval(period: number): Observable<number> {
//   const observable = new Observable<number>((subscriber) => {
//     let tick = 0;
//     const intervalId = setInterval(() => {
//       subscriber.next(tick++);
//     }, period);

//     return () => {
//       clearInterval(intervalId);
//     };
//   });
//   return observable;
// }

// interval(1000).subscribe({
//   next: (data) => console.log("next =>", data),
//   error: (err) => console.log("error =>", err),
//   complete: () => console.log("completed"),
// });
