# Try Catch in C#

In C#, exceptions are handled using the `try`, `catch`, and `finally` blocks. The `try` block contains the code that may throw an exception, and the `catch` block is used to catch and handle the exception. The `finally` block is used to execute code that should always run, regardless of whether an exception is thrown or not.

Here's an example of using `try`, `catch`, and `finally` blocks in C#:

```csharp
try
{
    int[] numbers = { 1, 2, 3 };
    Console.WriteLine(numbers[3]); // Throws an IndexOutOfRangeException
}
catch (IndexOutOfRangeException e)
{
    Console.WriteLine("An error occurred: " + e.Message);
}
finally
{
    Console.WriteLine("Finally block executed.");
}
```

In this example, the `try` block contains code that accesses an element outside the bounds of the `numbers` array, which throws an `IndexOutOfRangeException`. The `catch` block catches the exception and handles it by printing an error message. The `finally` block is executed regardless of whether an exception is thrown or not.

You can also use multiple `catch` blocks to handle different types of exceptions:

```csharp
try
{
    int[] numbers = { 1, 2, 3 };
    Console.WriteLine(numbers[3]); // Throws an IndexOutOfRangeException
}
catch (IndexOutOfRangeException e)
{
    Console.WriteLine("An IndexOutOfRangeException occurred: " + e.Message);
}
catch (Exception e)
{
    Console.WriteLine("An error occurred: " + e.Message);
}
finally
{
    Console.WriteLine("Finally block executed.");
}
```
