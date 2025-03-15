# Extras

## **var** in C Sharp

In C#, `var` is an implicit type that is determined by the compiler at compile-time. It is used to declare a variable without specifying its type explicitly. The type of the variable is inferred from the value assigned to it.

Here's an example of using `var` to declare a variable:

```csharp
var number = 42;
Console.WriteLine(number); // 42
```

## **const** in C Sharp

In C#, `const` is used to declare constants, i.e., variables whose values cannot be changed once assigned. The value of a `const` variable must be known at compile-time.

Here's an example of using `const` to declare a constant:

```csharp
const int number = 42;
Console.WriteLine(number); // 42
number = 43; // Error: Cannot assign to 'number' because it is a constant
```

## Reading Input from the Console

In C#, you can read input from the console using the `Console.ReadLine()` method. This method reads a line of characters from the standard input stream (usually the keyboard) and returns it as a string.

Here's an example of reading input from the console:

```csharp
Console.WriteLine("Enter your name:");
string name = Console.ReadLine();
Console.WriteLine($"Hello, {name}!");
```

## Default

In C#, the `default` keyword is used to obtain the default value of a type. The default value of a type is the value that is assigned to a variable of that type if no other value is specified.

Here's an example of using the `default` keyword:

```csharp
int number = default; // 0
bool flag = default; // false
string text = default; // null
```
