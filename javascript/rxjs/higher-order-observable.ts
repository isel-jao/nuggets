import {
  interval,
  map,
  mergeAll,
  switchAll,
  of,
  combineLatest,
  zip,
} from "rxjs";

const observable1 = interval(1000).pipe(map((val) => `First: ${val}`));
const observable2 = interval(2500).pipe(map((val) => `Second: ${val}`));

// of(observable1, observable2)
//   .pipe(mergeAll())
//   .subscribe((data) => console.log(data));

// combineLatest([observable1, observable2]).subscribe((data) =>
//   console.log(data)
// );

// zip(observable1, observable2).subscribe((data) => console.log(data));
