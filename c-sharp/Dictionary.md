# Working with Dictionary in C#

A dictionary is a collection of key-value pairs. It is similar to a list, but instead of using an index to access elements, you use a key. Each key in a dictionary must be unique.

## Declaration and Initialization

you first need to include the `System.Collections.Generic` namespace in your code file.

```csharp
using System.Collections.Generic;
```

```csharp
Dictionary<string, int> ages = new Dictionary<string, int>
{
    { "Alice", 30 },
    { "Bob", 40 },
    { "Charlie", 50 }
};
```

## Accessing Elements

You can access elements in a dictionary using the key.

```csharp
Dictionary<string, int> ages = new Dictionary<string, int>
{
    { "Alice", 30 },
    { "Bob", 40 },
    { "Charlie", 50 }
};
```

```csharp
// this will throw an exception if the key does not exist
int aliceAge = ages["Alice"];
Console.WriteLine(aliceAge); // 30
```

You can also use the `TryGetValue` method to safely access elements in a dictionary.

```csharp
int aliceAge;
if (ages.TryGetValue("Alice", out aliceAge))
{
    Console.WriteLine(aliceAge); // 30
}
```

```csharp
int davidAge;
if (ages.TryGetValue("David", out davidAge))
{
    Console.WriteLine(davidAge);
}
else
{
    Console.WriteLine("David not found");
}
```

```csharp
int davidAge = ages.GetValueOrDefault("David");
Console.WriteLine(davidAge); // 0
```

```csharp
int davidAge = ages.GetValueOrDefault("David", -1);
Console.WriteLine(davidAge); // -1
```

## Checking if a Key Exists

You can check if a key exists in a dictionary using the `ContainsKey` method.

```csharp
Dictionary<string, int> ages = new Dictionary<string, int>
{
    { "Alice", 30 },
    { "Bob", 40 },
    { "Charlie", 50 }
};
```

```csharp
if (ages.ContainsKey("Alice"))
{
    Console.WriteLine("Alice exists");
}
```

## Adding and Removing Elements

You can add elements to a dictionary using the `Add` method.

```csharp
Dictionary<string, int> ages = new Dictionary<string, int>
{
    { "Alice", 30 },
    { "Bob", 40 },
    { "Charlie", 50 }
};
ages.Add("David", 60);
```

You can remove elements from a dictionary using the `Remove` method.

```csharp
Dictionary<string, int> ages = new Dictionary<string, int>
{
    { "Alice", 30 },
    { "Bob", 40 },
    { "Charlie", 50 }
};
ages.Remove("Bob");
```

## Iterating Over a Dictionary

```csharp
Dictionary<string, int> ages = new Dictionary<string, int>
{
    { "Alice", 30 },
    { "Bob", 40 },
    { "Charlie", 50 }
};
```

You can iterate over a dictionary using a `foreach` loop.

```csharp
foreach (var pair in ages)
{
    Console.WriteLine($"{pair.Key}: {pair.Value}");
}
```

using keys

```csharp
foreach (var key in ages.Keys)
{
    Console.WriteLine($"{key}: {ages[key]}");
}
```

using values

```csharp
foreach (var value in ages.Values)
{
    Console.WriteLine(value);
}
```

You can also iterate over a dictionary using a `for` loop.

```csharp
for (int i = 0; i < ages.Count; i++)
{
    KeyValuePair<string, int> pair = ages.ElementAt(i);
    Console.WriteLine($"{pair.Key}: {pair.Value}");
}
```

## Other Methods

```csharp
Dictionary<string, int> ages = new Dictionary<string, int>
{
    { "Alice", 30 },
    { "Bob", 40 },
    { "Charlie", 50 }
};
```

You can check if dictionary contains a specific key using the `ContainsKey` method.

```csharp
if (ages.ContainsKey("Alice"))
{
    Console.WriteLine("Alice exists");
}
```

You can check if dictionary contains a specific value using the `ContainsValue` method.

```csharp
if (ages.ContainsValue(30))
{
    Console.WriteLine("Value 30 exists");
}
```

You can check if dictionary contains a specific key-value pair using the `Contains` method.

```csharp
if (ages.Contains(new KeyValuePair<string, int>("Alice", 30)))
{
    Console.WriteLine("Key-value pair exists");
}
```
