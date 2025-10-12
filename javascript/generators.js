// ---------------------------------- //
// Basic Generator Function
// ---------------------------------- //
console.log("Basic Generator Function ".padEnd(60, "-"));

function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

const generator = generateSequence();

const first = generator.next();
console.log(first); // { value: 1, done: false }

const second = generator.next();
console.log(second); // { value: 2, done: false }

const third = generator.next();
console.log(third); // { value: 3, done: true }

// ---------------------------------- //
// Iteration
// ---------------------------------- //
console.log("\nIteration ".padEnd(60, "-"));

function* countdown() {
  yield 3;
  yield 2;
  yield 1;
}

for (const num of countdown()) {
  console.log(num); // 3, 2, 1
}

const nums = [...countdown()];
console.log(nums); // [3, 2, 1]

// ---------------------------------- //
// Two-Way Communication
// ---------------------------------- //
console.log("\nTwo-Way Communication ".padEnd(60, "-"));

function* dialogue() {
  const name = yield "What's your name?";
  const age = yield `Nice to meet you, ${name}!`;
  return `So you're ${age} years old!`;
}

const gen = dialogue();
console.log(gen.next().value); // "What's your name?"
console.log(gen.next("Alice").value); // "Nice to meet you, Alice!"
console.log(gen.next(25).value); // "So you're 25 years old!"

// ---------------------------------- //
// Delegating Generators
// ---------------------------------- //
console.log("\nDelegating Generators ".padEnd(60, "-"));

function* gen1() {
  yield 1;
  yield 2;
}

function* gen2() {
  yield* gen1();
  yield 3;
}

console.log([...gen2()]); // [1, 2, 3]
