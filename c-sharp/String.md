# Working with string in C#

## Declaration and Initialization

```csharp
string stringValue = "Hello, World!";
Console.WriteLine(stringValue); // Hello, World!
```

## String Concatenation

```csharp
string firstName = "John";
string lastName = "Doe";

string fullName = firstName + " " + lastName;

Console.WriteLine(fullName); // John Doe
```

## String Interpolation

```csharp
string name = "Alice";
int age = 30;

string message = $"Hello, my name is {name} and I am {age} years old.";
Console.WriteLine(message); // Hello, my name is Alice and I am 30 years old.
```

## Formatting Strings

````csharp
string name = "Alice";
int age = 30;

string message = string.Format("Hello, my name is {0} and I am {1} years old.", name, age);
Console.WriteLine(message); // Hello, my name is Alice and I am 30 years old.

double price = 123.45;

string formattedPrice = string.Format("The price is {0:C}.", price);
```

## Verbatim string literal

```csharp
string path = "C:\\Windows\\System32\\";
Console.WriteLine(path); // C:\Windows\System32\

// using Verbatim string literal
string path = @"C:\Windows\System32\";
Console.WriteLine(path); // C:\Windows\System32\

string helloName = @"Hello, ""Alice""!";
Console.WriteLine(helloName); // Hello, "Alice"!
```

## String Comparison

```csharp
string str1 = "hello";
string str2 = "HELLO";

bool areEqual = str1.Equals(str2, StringComparison.OrdinalIgnoreCase);
Console.WriteLine(areEqual); // True
````

<!-- ## Comparing Strings

```csharp
string str1 = "hello";
string str2 = "HELLO";


Console.WriteLine(str1 == str2); // False
Console.WriteLine(str1.Equals(str2)); // False
Console Console.WriteLine(string.Compare(str1,str2)); // -1
Console.WriteLine(string.Compare(str1, str2, StringComparison.OrdinalIgnoreCase)); // 0
Console.WriteLine(string.Compare(str1, str2, StringComparison.Ordinal)); // 32
Console.WriteLine(string.CompareOrdinal(str1, str2)); // 32

Console.WriteLine("" == string.Empty); // True

``` -->

## String methods

```csharp

string str = "Hello, World!";
// Length
Console.WriteLine(str.Length); // 13
// Search
Console.WriteLine(str.Contains("World")); // True
Console.WriteLine(str.StartsWith("Hello")); // True
Console.WriteLine(str.EndsWith("World")); // True
Console.WriteLine(str.IndexOf("World")); // 7
Console.WriteLine(str.LastIndexOf("o")); // 8
// Substring
Console.WriteLine(str.Substring(7)); // World!
Console.WriteLine(str.Substring(7, 5)); // World
// Replace
Console.WriteLine(str.Replace("World", "Alice")); // Hello, Alice!
// Remove
Console.WriteLine(str.Remove(7)); // Hello,
Console.WriteLine(str.Remove(7, 6)); // Hello!
// ToUpper, ToLower
Console.WriteLine(str.ToUpper()); // HELLO, WORLD!
Console.WriteLine(str.ToLower()); // hello, world!
// Trim
string str2 = "  Hello, World!  ";
Console.WriteLine(str2.Trim()); // Hello, World!
// Split
string str3 = "apple,orange,banana";
string[] fruits = str3.Split(','); // fruits = ["apple", "orange", "banana"]
// Join
string joined = string.Join(" ", fruits); // joined = "apple orange banana"
// Padding
string str4 = "123";
Console.WriteLine(str4.PadLeft(5, '0')); //
Console.WriteLine(str4.PadRight(5, '0')); //
// Compare
string str5 = "hello";
string str6 = "HELLO";
Console.WriteLine(str5.Equals(str6)) // False
Console.WriteLine(str5.Equals(str6, StringComparison.OrdinalIgnoreCase)) // True
Console.WriteLine(string.Compare(str5, str6)) // -1
Console.WriteLine(string.Compare(str5, str6, StringComparison.OrdinalIgnoreCase)) // 0
Console.WriteLine(string.Compare(str5, str6, StringComparison.Ordinal)) // 32
Console.WriteLine(string.CompareOrdinal(str5, str6)) // 32
// Empty
Console.WriteLine(string.Empty); // ""
// IsNullOrEmpty
string str7 = null;
Console.WriteLine(string.IsNullOrEmpty(str7)); // True
```
