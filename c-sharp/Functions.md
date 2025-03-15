# Function In C#

## Function Declaration

A function is a block of code that performs a specific task. In C#, functions are declared using the `function` keyword followed by the return type, function name, and parameters (if any).

```csharp
returnType functionName(parameters)
{
    // function body
}
```

examples of function declaration:

```csharp
void PrintHello()
{
    Console.WriteLine("Hello, World!");
}

int Add(int a, int b)
{
    return a + b;
}

double Divide(double a, double b)
{
    if (b == 0)
    {
        throw new DivideByZeroException();
    }
    return a / b;
}
```

## Function Call

To call a function in C#, you simply use the function name followed by parentheses `()`.

```csharp
PrintHello();
int sum = Add(10, 20);
double result = Divide(10.0, 2.0);
```

## Parameters and Return Types

Functions in C# can have parameters and return types. Parameters are values that are passed to the function when it is called, and the return type is the type of value that the function returns.

```csharp
int Add(int a, int b)
{
    return a + b;
}

double Divide(double a, double b)
{
    if (b == 0)
    {
        throw new DivideByZeroException();
    }
    return a / b;
}
```

In case a function does not return any value, the return type is `void`.

```csharp
void PrintHello()
{
    Console.WriteLine("Hello, World!");
}
```

## Optional Parameters

- Functions can also have optional parameters, which are parameters that have default values. If a value is not provided for an optional parameter, the default value is used.
- Note: Optional parameters must be at the end of the parameter list.

```csharp
// implicit optional parameter
int Add(int a, int b, int c = 0)
{
    return a + b + c;
}

int sum1 = Add(10, 20); // c = 0
int sum2 = Add(10, 20, 30); // c = 30
```

```csharp
// explicit optional parameter
int Add(int a, int b, [Optional] int c)
{
    return a + b + c;
}

int sum1 = Add(10, 20); // c = 0
int sum2 = Add(10, 20, 30); // c = 30
```

## Named Parameters

```csharp
void greet(string name, age int)
{
    Console.WriteLine($"Hello, {name}! You are {age} years old.");
}

greet("Alice", 30); // Hello, Alice! You are 30 years old.
greet(age: 30, name: "Alice"); // Hello, Alice! You are 30 years old.
```

## Output Parameters

Output parameters are used to return multiple values from a function. They are declared using the `out` keyword.

```csharp
void Divide(int a, int b, out int quotient, out int remainder)
{
    quotient = a / b;
    remainder = a % b;
}

int q, r;
Divide(10, 3, out q, out r);
Console.WriteLine($"Quotient: {q}, Remainder: {r}"); // Quotient: 3, Remainder: 1
```

## Reference Parameters

Reference parameters are used to pass arguments by reference to a function. They are declared using the `ref` keyword.

```csharp
void Increment(ref int value)
{
    value++;
}

int number = 10;
Increment(ref number);
Console.WriteLine(number); // 11
```

## Different Between Out and Ref

- The `out` parameter does not need to be initialized before passing it to the function, while the `ref` parameter must be initialized.
- The `out` parameter does not need to be assigned a value inside the function, while the `ref` parameter must be assigned a value.

## Function Overloading

Function overloading is a feature in C# that allows you to define multiple functions with the same name but different parameters. This can be useful when you want to perform similar tasks with different types of input.

```csharp
int Add(int a, int b)
{
    return a + b;
}

double Add(double a, double b)
{
    return a + b;
}

// Call the overloaded functions

int sum1 = Add(10, 20);
double sum2 = Add(10.0, 20.0);
```

## Lambda Expressions

Lambda expressions are a concise way to define anonymous functions in C#. They are often used in LINQ queries and event handlers.

```csharp
Func<int, int, int> add = (a, b) => a + b;
int sum = add(10, 20);
```
