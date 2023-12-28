# Array

## Declaration

```javascript
let arr = [];
let arr2 = [1, 2, 3];
```

## Properties

- Length: `arr.length` -> number of elements in the array
- Constructor: `Array()` -> creates an array
- Prototype: `Array.prototype` -> allows to add new properties and methods to all arrays

## Methods

- `arr.push(element)` -> adds an element to the end of the array
- `arr.pop()` -> removes the last element of the array
- `arr.shift()` -> removes the first element of the array
- `arr.unshift(element)` -> adds an element to the beginning of the array
- `arr.slice(start, end)` -> returns a new array with the elements from start to end
- `arr.splice(start, deleteCount, element)` -> removes deleteCount elements from start and adds element
- `arr.concat(arr2)` -> returns a new array with the elements of arr and arr2
- `arr.join(separator)` -> returns a string with the elements of arr separated by separator
- `arr.reverse()` -> reverses the order of the elements in arr
- `arr.sort()` -> sorts the elements in arr
- `arr.indexOf(element)` -> returns the index of element in arr
- `arr.lastIndexOf(element)` -> returns the last index of element in arr
- `arr.forEach(function)` -> executes function for each element in arr
- `arr.map(function)` -> returns a new array with the results of executing function for each element in arr
- `arr.filter(function)` -> returns a new array with the elements of arr for which function returns true
- `arr.reduce(function)` -> returns a single value by executing function for each element in arr
- `arr.every(function)` -> returns true if function returns true for all elements in arr
- `arr.some(function)` -> returns true if function returns true for at least one element in arr
