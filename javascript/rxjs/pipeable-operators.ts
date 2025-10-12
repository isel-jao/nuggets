import { Observable, from } from "rxjs";

// ops.pipe(op) , op is an Pipeable Operator takes an Observable and returns another Observable
// ops.pipe(opFactory(config)) , opFactory is an Pipeable Operator Factory that takes some configuration and returns an Pipeable Operator

// function isEven(observable: Observable<number>): Observable<boolean> {
//   return new Observable<boolean>((subscriber) => {
//     const subscription = observable.subscribe({
//       next: (value) => {
//         subscriber.next(value % 2 === 0);
//       },
//       error: (err) => {
//         subscriber.error(err);
//       },
//       complete: () => {
//         subscriber.complete();
//       },
//     });
//     return () => {
//       subscription.unsubscribe();
//     };
//   });
// }

// from([1, 2, 3, 4, 5])
//   .pipe(isEven)
//   .subscribe({
//     next: (data) => console.log("next =>", data),
//     error: (err) => console.log("error =>", err),
//     complete: () => console.log("completed"),
//   });

// function map<T, V>(callback: (value: T) => V) {
//   return (observable: Observable<T>) => {
//     return new Observable<V>((subscriber) => {
//       const subscription = observable.subscribe({
//         next: (value) => {
//           // apply the callback to the value and emit the result
//           const result = callback(value);
//           subscriber.next(result);
//         },
//         error: (err) => {
//           // propagate the error to the subscriber
//           subscriber.error(err);
//         },
//         complete: () => {
//           // finish the subscriber
//           subscriber.complete();
//         },
//       });
//       return () => {
//         // cleanup
//         subscription.unsubscribe();
//       };
//     });
//   };
// }

// from([1, 2, 3, 4, 5])
//   .pipe(
//     map((value) => value * 2),
//     map((value) => value + 1)
//   )
//   .subscribe({
//     next: (data) => console.log("next =>", data),
//     error: (err) => console.log("error =>", err),
//     complete: () => console.log("completed"),
//   });

// function filter<T>(predicate: (value: T) => boolean) {
//   return (observable: Observable<T>) => {
//     return new Observable<T>((subscriber) => {
//       const subscription = observable.subscribe({
//         next: (value) => {
//           // apply the predicate to the value and emit if true
//           if (predicate(value)) {
//             subscriber.next(value);
//           }
//         },
//         error: (err) => {
//           // propagate the error to the subscriber
//           subscriber.error(err);
//         },
//         complete: () => {
//           // finish the subscriber
//           subscriber.complete();
//         },
//       });
//       return () => {
//         // cleanup
//         subscription.unsubscribe();
//       };
//     });
//   };
// }

// from(Array.from({ length: 10 }, (_, i) => i))
//   .pipe(
//     filter((value) => value % 2 === 0)
//     // filter((value) => value > 2)
//   )
//   .subscribe({
//     next: (data) => console.log("next =>", data),
//     error: (err) => console.log("error =>", err),
//     complete: () => console.log("completed"),
//   });
