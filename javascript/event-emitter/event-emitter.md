# EventEmitter

It's an implementation of the Observer pattern where objects can subscribe to events and get notified when those events are triggered.

## Simple Example

```javascript
import { EventEmitter } from "node:events";

const eventEmitter = new EventEmitter();

const emitter = new EventEmitter();

emitter.on("event", (message) => {
  console.log("Event received:", message);
});

emitter.emit("event", "Hello, world!");
```

## Core Methods

`.on(eventName, listener)` - Add a listener for a named event

`.once(eventName, listener)` - Add a one-time listener

`.emit(eventName, [...args])` - Emit an event with optional arguments

`.off(eventName, listener)` - Remove a listener (alias for removeListener)

`.removeListener(eventName, listener)` - Remove a specific listener

`.removeAllListeners([eventName])` - Remove all listeners for an event

`.setMaxListeners(n)` - Set the maximum number of listeners (default is 10)

`.getMaxListeners()` - Get the maximum number of listeners

`.listeners(eventName)` - Get an array of listeners for an event

`.rawListeners(eventName)` - Get an array of listeners including wrappers

`.listenerCount(eventName)` - Get the count of listeners for an event

`.prependListener(eventName, listener)` - Add listener to beginning of listeners array

`.prependOnceListener(eventName, listener)` - Add one-time listener to beginning of array

`.eventNames()` - Get an array of event names with registered listeners
