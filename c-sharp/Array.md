# Working with arrays in C#

## Declaration and Initialization

```csharp
// Single-dimensional array
int[] numbers1 = { 1, 2, 3, 4, 5 };
```

```csharp
// Multi-dimensional array
int[,] numbers2 = new int[2, 3];
```

## Accessing Elements

```csharp
int[] numbers = { 1, 2, 3, 4, 5 };

Console.WriteLine(numbers[0]); // 1
Console.WriteLine(numbers[1]); // 2
```

```csharp
int[,] numbers = new int[2, 3] { { 1, 2, 3 }, { 4, 5, 6 } };

Console.WriteLine(numbers[0, 0]); // 1
Console.WriteLine(numbers[1, 1]); // 5
```

## Modifying Elements

```csharp
int[] numbers = { 1, 2, 3, 4, 5 };

numbers[0] = 10;
numbers[1] = 20;

Console.WriteLine(numbers[0]); // 10
Console.WriteLine(numbers[1]); // 20
```

## Foreach Loop

```csharp
int[] numbers = { 1, 2, 3, 4, 5 };

foreach (int number in numbers)
{
    Console.WriteLine(number);
}
```

```csharp
int[,] numbers = new int[2, 3] { { 1, 2, 3 }, { 4, 5, 6 } };

foreach (int number in numbers)
{
    Console.WriteLine(number);
}
```

## Array Methods

```csharp
int[] numbers = { 1, 2, 3, 4, 5 };

Console.WriteLine(numbers.Length); // 5
Console.WriteLine(numbers.Sum()); // 15
Console.WriteLine(numbers.Average()); // 3
Console.WriteLine(numbers.Max()); // 5
Console.WriteLine(numbers.Min()); // 1
Console.WriteLine(numbers.Contains(3)); // True
Console.WriteLine(numbers.Count(n => n % 2 == 0)); // 2
Console.WriteLine(numbers.All(n => n > 0)); // True
Console.WriteLine(numbers.Any(n => n > 5)); // False
Console.WriteLine(numbers.First()); // 1
Console.WriteLine(numbers.First(n => n % 2 == 0)); // 2
Console.WriteLine(numbers.Last()); // 5
Console.WriteLine(numbers.Last(n => n % 2 == 0)); // 4
Console.WriteLine(numbers.ElementAt(2)); // 3
Console.WriteLine(numbers.ElementAtOrDefault(10)); // 0
Console.WriteLine(numbers.FirstOrDefault(n => n > 5)); // 0
Console.WriteLine(numbers.LastOrDefault(n => n > 5)); // 0
Console.WriteLine(numbers.Single(n => n == 3)); // 3
Console.WriteLine(numbers.SingleOrDefault(n => n == 10)); // 0
Console.WriteLine(numbers.Skip(2).Take(2)); // 3, 4
```

```csharp
int[] numbers = { 1, 2, 3, 4, 5 };

Console.WriteLine(Array.IndexOf(numbers, 3)); // 2
Console.WriteLine(Array.IndexOf(numbers, 10)); // -1
Console.WriteLine(Array.LastIndexOf(numbers, 3)); // 2
Console.WriteLine(Array.BinarySearch(numbers, 3)); // 2
Console.WriteLine(Array.BinarySearch(numbers, 10)); // -6
Console.WriteLine(Array.Find(numbers, n => n % 2 == 0)); // 2
Console.WriteLine(Array.FindLast(numbers, n => n % 2 == 0)); // 4
Console.WriteLine(Array.FindIndex(numbers, n => n % 2 == 0)); // 1
Console.WriteLine(Array.FindLastIndex(numbers, n => n % 2 == 0)); // 3
Console.WriteLine(Array.Exists(numbers, n => n % 2 == 0)); // True
Console.WriteLine(Array.TrueForAll(numbers, n => n > 0)); // True
Console.WriteLine(String.Join(", ",Array.FindAll(numbers, n => n % 2 == 0))); // 2, 4
Console.WriteLine(String.Join(", ",Array.ConvertAll(numbers, n => n * 2))); // 2, 4, 6, 8, 10

```

```csharp
//  destructive methods
int[] numbers = { 1, 2, 3, 4, 5 };

Array.Reverse(numbers);
Console.WriteLine(string.Join(", ", numbers)); // 5, 4, 3, 2, 1

Array.Sort(numbers);
Console.WriteLine(string.Join(", ", numbers)); // 1, 2, 3, 4, 5

int[] copy = new int[5];
Array.Copy(numbers, copy, 5);

Console.WriteLine(string.Join(", ", copy)); // 1, 2, 3, 4, 5

Array.Clear(copy, 3, 5);
Console.WriteLine(string.Join(", ", copy)); // 1, 2, 3, 0, 0

```
