# **this** keyword in JavaScript

## What is this?

In JavaScript, `this` is a special keyword that is used in methods to refer to the object on which a method is being invoked. It is a reference to the object that is currently executing the current function.

## Global context

```javascript
console.log(this); // Window in browsers, global in Node.js
```

```javascript
"use strict";
console.log(this); // undefined
```

```javascript
let obj = {
  name: "John",
  sayName: function () {
    console.log(this.name);
  },
};

obj.sayName(); // John
```

## Constructor context

```javascript
function Person(name) {
  this.name = name;
}

let john = new Person("John");
console.log(john.name); // John
```

## Arrow functions

```javascript
let obj = {
  name: "John",
  sayName: () => {
    console.log(this.name);
  },
};

obj.sayName(); // throws an error (cannot access 'name' of 'undefined')
```

```javascript
let obj = {
  name: "John",
  sayName() {
    const inner = () => {
      console.log(this.name);
    };
    inner();
  },
};

obj.sayName(); // John
```

## Event handlers

```html
<button id="btn">Click me</button>
```

```javascript
document.getElementById("btn").addEventListener("click", function () {
  console.log(this); // button
});
```

## Callback functions

When a method is passed as a callback function, the context of `this` is lost.

```javascript
function greet(callback) {
  callback();
}

const child = {
  name: "John",
  sayName: function () {
    console.log(this.name);
  },
};

greet(child.sayName); // throws an error
```

# `bind`, `call`, and `apply` in JavaScript

| Method  | Calls Function Immediately? | Arguments Format      | Returns a New Function? |
| ------- | --------------------------- | --------------------- | ----------------------- |
| `call`  | ✅ Yes                      | Individual arguments  | ❌ No                   |
| `apply` | ✅ Yes                      | Arguments as an array | ❌ No                   |
| `bind`  | ❌ No                       | Individual arguments  | ✅ Yes                  |

## Examples

### `call()`

Calls the function immediately with individual arguments.

```javascript
function greet(greeting, punctuation) {
  console.log(greeting + ", " + this.name + punctuation);
}

const person = { name: "Alice" };

greet.call(person, "Hello", "!"); // Output: Hello, Alice!

greet.apply(person, ["Hi", "!!"]); // Output: Hi, Alice!!

const boundGreet = greet.bind(person, "Hey", "!!!");
boundGreet(); // Output: Hey, Alice!!!
```
