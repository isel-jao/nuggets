/**
 * EventEmitter - A full-featured event emitter implementation for browsers
 * Features:
 * - Standard .on(), .off(), .emit(), .once() methods
 * - Namespaced events with wildcards
 * - Memory leak prevention with max listeners
 * - Error handling
 * - Method chaining
 */
export class EventEmitter {
  /**
   * Create a new EventEmitter instance
   */
  constructor() {
    this._events = {};
    this._eventsCount = 0;
    this._maxListeners = 10; // Default max listeners (like Node.js)
  }

  /**
   * Set the maximum number of listeners that can be added for any single event
   * @param {Number} n - The maximum number of listeners
   * @returns {EventEmitter} - Returns this for chaining
   */
  setMaxListeners(n) {
    if (typeof n !== "number" || n < 0 || Number.isNaN(n)) {
      throw new TypeError("Expected n to be a non-negative number");
    }

    this._maxListeners = n;
    return this;
  }

  /**
   * Get the maximum number of listeners
   * @returns {Number} - The maximum number of listeners
   */
  getMaxListeners() {
    return this._maxListeners;
  }

  /**
   * Add a listener for a specified event
   * @param {String} event - The event name
   * @param {Function} fn - The listener function
   * @returns {EventEmitter} - Returns this for chaining
   */
  on(event, fn) {
    return this._addListener(event, fn, false);
  }

  /**
   * Add a listener that will be invoked only once
   * @param {String} event - The event name
   * @param {Function} fn - The listener function
   * @returns {EventEmitter} - Returns this for chaining
   */
  once(event, fn) {
    return this._addListener(event, fn, true);
  }

  /**
   * Internal method to add a listener
   * @param {String} event - The event name
   * @param {Function} fn - The listener function
   * @param {Boolean} once - Whether this listener should only be called once
   * @returns {EventEmitter} - Returns this for chaining
   * @private
   */
  _addListener(event, fn, once) {
    if (typeof fn !== "function") {
      throw new TypeError("Listener must be a function");
    }

    // Create wrapper for 'once' functionality
    const listener = once
      ? (...args) => {
          this.off(event, listener);
          fn.apply(this, args);
        }
      : fn;

    // Store original function for later removal
    listener._originalFn = fn;

    // Create the event array if it doesn't exist
    if (!this._events[event]) {
      this._events[event] = [];
      this._eventsCount++;
    }

    // Check for potential memory leak
    if (
      this._events[event].length >= this._maxListeners &&
      this._maxListeners !== 0
    ) {
      console.warn(
        `Warning: Event '${event}' has exceeded the maximum number of listeners (${this._maxListeners}).`,
        "This might indicate a memory leak in your application."
      );
    }

    // Add the listener to the event array
    this._events[event].push(listener);

    // Emit 'newListener' event
    if (event !== "newListener") {
      this.emit("newListener", event, fn);
    }

    return this;
  }

  /**
   * Add a listener to the beginning of the listeners array
   * @param {String} event - The event name
   * @param {Function} fn - The listener function
   * @returns {EventEmitter} - Returns this for chaining
   */
  prependListener(event, fn) {
    if (typeof fn !== "function") {
      throw new TypeError("Listener must be a function");
    }

    // Create the event array if it doesn't exist
    if (!this._events[event]) {
      this._events[event] = [];
      this._eventsCount++;
    }

    // Check for potential memory leak
    if (
      this._events[event].length >= this._maxListeners &&
      this._maxListeners !== 0
    ) {
      console.warn(
        `Warning: Event '${event}' has exceeded the maximum number of listeners (${this._maxListeners}).`,
        "This might indicate a memory leak in your application."
      );
    }

    // Add the listener to the beginning of the event array
    this._events[event].unshift(fn);

    // Emit 'newListener' event
    if (event !== "newListener") {
      this.emit("newListener", event, fn);
    }

    return this;
  }

  /**
   * Add a one-time listener to the beginning of the listeners array
   * @param {String} event - The event name
   * @param {Function} fn - The listener function
   * @returns {EventEmitter} - Returns this for chaining
   */
  prependOnceListener(event, fn) {
    if (typeof fn !== "function") {
      throw new TypeError("Listener must be a function");
    }

    // Create wrapper for 'once' functionality
    const listener = (...args) => {
      this.off(event, listener);
      fn.apply(this, args);
    };

    // Store original function for later removal
    listener._originalFn = fn;

    // Use prependListener to add it
    return this.prependListener(event, listener);
  }

  /**
   * Remove a listener for a specified event
   * @param {String} event - The event name
   * @param {Function} fn - The listener function to remove
   * @returns {EventEmitter} - Returns this for chaining
   */
  off(event, fn) {
    if (!this._events[event]) return this;

    // If no listener is specified, remove all listeners for this event
    if (!fn) {
      this._clearEvent(event);
      return this;
    }

    // Find the listener
    const list = this._events[event];
    const position = this._findListenerIndex(list, fn);

    if (position !== -1) {
      list.splice(position, 1);

      // Remove event from _events if no more listeners
      if (list.length === 0) {
        delete this._events[event];
        this._eventsCount--;
      }

      // Emit 'removeListener' event
      if (event !== "removeListener") {
        this.emit("removeListener", event, fn);
      }
    }

    return this;
  }

  /**
   * Alias for off method (like Node.js)
   */
  removeListener(event, fn) {
    return this.off(event, fn);
  }

  /**
   * Find the index of a listener in a listener array
   * @param {Array} list - Array of listeners
   * @param {Function} fn - Function to find
   * @returns {Number} - Index of the listener or -1 if not found
   * @private
   */
  _findListenerIndex(list, fn) {
    for (let i = 0; i < list.length; i++) {
      const listener = list[i];
      // Check if it's the same function or a wrapped version of it
      if (
        listener === fn ||
        (listener._originalFn && listener._originalFn === fn)
      ) {
        return i;
      }
    }
    return -1;
  }

  /**
   * Remove all listeners for an event or all events
   * @param {String} [event] - Optional event name. If not provided, all events are cleared
   * @returns {EventEmitter} - Returns this for chaining
   */
  removeAllListeners(event) {
    // If event is specified, clear only that event
    if (event) {
      if (this._events[event]) {
        this._clearEvent(event);
      }
    }
    // Otherwise clear all events
    else {
      const events = Object.keys(this._events);
      for (let i = 0; i < events.length; i++) {
        const event = events[i];
        this._clearEvent(event);
      }
    }

    return this;
  }

  /**
   * Internal method to clear an event
   * @param {String} event - The event to clear
   * @private
   */
  _clearEvent(event) {
    if (event === "removeListener") {
      // Clear all listeners first, then emit removeListener
      const listeners = this._events[event].slice();
      delete this._events[event];
      this._eventsCount--;

      // Now emit removeListener events
      for (let i = 0; i < listeners.length; i++) {
        this.emit("removeListener", event, listeners[i]);
      }
    } else {
      delete this._events[event];
      this._eventsCount--;
    }
  }

  /**
   * Get all listeners for a specified event
   * @param {String} event - The event name
   * @returns {Array} - Array of listener functions
   */
  listeners(event) {
    const list = this._events[event] || [];

    // Return a copy of the array to prevent modification
    return list.map((listener) => {
      // If we have an original function (for once listeners), return that
      return listener._originalFn || listener;
    });
  }

  /**
   * Get all listeners including wrappers (like for 'once')
   * @param {String} event - The event name
   * @returns {Array} - Array of listener functions with wrappers
   */
  rawListeners(event) {
    return (this._events[event] || []).slice();
  }

  /**
   * Get the number of listeners for a specified event
   * @param {String} event - The event name
   * @returns {Number} - Number of listeners
   */
  listenerCount(event) {
    return this._events[event] ? this._events[event].length : 0;
  }

  /**
   * Get an array of all event names that have registered listeners
   * @returns {Array} - Array of event names
   */
  eventNames() {
    return Object.keys(this._events);
  }

  /**
   * Emit an event, triggering all listeners
   * @param {String} event - The event name
   * @param {...any} args - Arguments to pass to listeners
   * @returns {Boolean} - true if the event had listeners, false otherwise
   */
  emit(event, ...args) {
    if (!this._events[event]) {
      // Special handling for 'error' events without listeners
      if (event === "error") {
        const err = args[0];
        if (err instanceof Error) {
          throw err; // Unhandled 'error' event, throw the Error
        } else {
          const error = new Error(`Unhandled 'error' event: ${err}`);
          error.context = err;
          throw error;
        }
      }
      return false;
    }

    const listeners = this._events[event].slice(); // Clone array to prevent modification while emitting

    // Call each listener with provided arguments
    for (let i = 0; i < listeners.length; i++) {
      try {
        listeners[i].apply(this, args);
      } catch (err) {
        // If an error occurs, emit an 'error' event
        this.emit("error", err);
      }
    }

    return listeners.length > 0;
  }

  /**
   * Create an event that triggers on first listener added and ends on last listener removed
   * @param {String} event - The event name to manage
   * @param {Function} startFn - Function to call when first listener is added
   * @param {Function} stopFn - Function to call when last listener is removed
   * @returns {EventEmitter} - Returns this for chaining
   */
  createLifecycleEvent(event, startFn, stopFn) {
    // Track if the event is active
    let isActive = false;

    // Add new listener hook
    this.on("newListener", (type, listener) => {
      if (type === event && !isActive) {
        isActive = true;
        startFn.call(this);
      }
    });

    // Add remove listener hook
    this.on("removeListener", (type, listener) => {
      if (type === event && this.listenerCount(event) === 0) {
        isActive = false;
        stopFn.call(this);
      }
    });

    return this;
  }
}

// Add common aliases
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

// // Export for use with module systems
// if (typeof module !== "undefined" && module.exports) {
//   module.exports = EventEmitter;
// } else if (typeof define === "function" && define.amd) {
//   define(function () {
//     return EventEmitter;
//   });
// } else {
//   // Global for browser
//   window.EventEmitter = EventEmitter;
// }
