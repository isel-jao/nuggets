import { EventEmitter } from "node:events";

const subject = new EventEmitter();
subject.setMaxListeners(0); // Remove listener limit

let counter = 0;

const observer1 = (data) => {
  console.log("Observer 1:", data);
};

const observer2 = (data) => {
  console.log("Observer 2:", data);
};

setInterval(() => {
  subject.emit("data", ++counter);
}, 1000);

subject.on("data", observer1);

setTimeout(() => {
  subject.on("data", observer2);
}, 3000);

setTimeout(() => {
  subject.off("data", observer1);
  console.log("Observer 1 unsubscribed");
}, 7000);

setTimeout(() => {
  subject.off("data", observer2);
  console.log("Observer 2 unsubscribed");
}, 10000);
