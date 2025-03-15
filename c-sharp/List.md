# Working with List in C#

## Declaration and Initialization

```csharp
List<int> numbers = new List<int> { 1, 2, 3, 4, 5 };
```

## Adding / Removing Elements

```csharp
List<int> numbers = new List<int> { 1, 2, 3, 4, 5 };

numbers.Add(6);
Console.WriteLine(String.Join(", ", numbers)); // 1, 2, 3, 4, 5, 6
numbers.Insert(0, 0);
Console.WriteLine(String.Join(", ", numbers)); // 0, 1, 2, 3, 4, 5, 6
numbers.Remove(3);
Console.WriteLine(String.Join(", ", numbers)); // 0, 1, 2, 4, 5, 6
numbers.RemoveAt(0);
Console.WriteLine(String.Join(", ", numbers)); // 1, 2, 4, 5, 6
numbers.Clear();
Console.WriteLine(String.Join(", ", numbers)); //
```

## Accessing Elements

```csharp
List<int> numbers = new List<int> { 1, 2, 3, 4, 5 };

Console.WriteLine(numbers[0]); // 1
Console.WriteLine(numbers.ElementAt(0)); // 1
Console.WriteLine(numbers.First()); // 1
Console.WriteLine(numbers.Last()); // 5
Console.WriteLine(numbers.Count); // 5
```

## Iterating Over Elements

```csharp
List<int> numbers = new List<int> { 1, 2, 3, 4, 5 };

foreach (int number in numbers)
{
    Console.WriteLine(number);
}
```

## List Other Methods

```csharp
List<int> numbers = new List<int> { 1, 2, 3, 4, 5 };

numbers.Sort();
Console.WriteLine(String.Join(", ", numbers)); // 1, 2, 3, 4, 5
numbers.Reverse();
Console.WriteLine(String.Join(", ", numbers)); // 5, 4, 3, 2, 1
```
