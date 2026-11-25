const user = {
  id: 1,
  firstName: "John",
  lastName: "Doe",
  email: "test@test.com",
  isActive: true,
};

const userProxyHandler = {
  get(target, prop) {
    if (prop === "fullName") {
      return `${target.firstName} ${target.lastName}`;
    }
    return Reflect.get(target, prop);
  },
  set(target, prop, value) {
    // email and id connot be updated
    if (prop === "email" || prop === "id") {
      throw new Error(
        `${prop.charAt(0).toUpperCase() + prop.slice(1)} cannot be updated.`,
      );
    }
    // cannot add new properties to the user object
    if (!target.hasOwnProperty(prop)) {
      throw new Error(`Cannot add new property '${prop}' to user object.`);
    }

    return Reflect.set(target, prop, value);
  },
};

const userProxy = new Proxy(user, userProxyHandler);

// Example usage
console.log(userProxy.fullName); // Output: John Doe

userProxy.firstName = "Jane"; // Update first name
console.log(userProxy.fullName); // Output: Jane Doe

try {
  userProxy.email = "updated@email.com";
} catch (error) {
  console.error(error.message); // Output: Email cannot be updated.
}

try {
  userProxy.age = 30; // Attempt to add a new property
} catch (error) {
  console.error(error.message); // Output: Cannot add new property 'age' to user object.
}

user.isActive = false; // Update isActive property
console.log(userProxy.isActive); // Output: false
