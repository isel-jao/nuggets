# C# Data Types

## Value Types

### Signed numeric types (sbyte, short, int, long)

```csharp
// 8-bit signed integer
sbyte sbyteValue = 127;
Console.WriteLine(sbyte.MaxValue); // 127
Console.WriteLine(sbyte.MinValue); // -128

// 16-bit signed integer
short shortValue = 32767;
Console.WriteLine(short.MaxValue); // 32767
Console.WriteLine(short.MinValue); // -32768

// 32-bit signed integer
int intValue = 2147483647;
Console.WriteLine(int.MaxValue); // 2147483647
Console.WriteLine(int.MinValue); // -2147483648

// 64-bit signed integer
long longValue = 9223372036854775807L;
Console.WriteLine(long.MaxValue); // 9223372036854775807
Console.WriteLine(long.MinValue); // -9223372036854775808
```

### Unsigned numeric types (byte, ushort, uint, ulong)

```csharp
// 8-bit unsigned integer
byte byteValue = 255;
Console.WriteLine(byte.MaxValue); // 255
Console.WriteLine(byte.MinValue); // 0

// 16-bit unsigned integer
ushort ushortValue = 65535;
Console.WriteLine(ushort.MaxValue); // 65535
Console.WriteLine(ushort.MinValue); // 0

// 32-bit unsigned integer
uint uintValue = 4294967295;
Console.WriteLine(uint.MaxValue); // 4294967295
Console.WriteLine(uint.MinValue); // 0

// 64-bit unsigned integer
ulong ulongValue = 18446744073709551615L;
Console.WriteLine(ulong.MaxValue); // 18446744073709551615
```

### Floating-point types (float, double)

```csharp
// 32-bit floating-point number
float floatValue = 3.40282347E+38F;
Console.WriteLine(float.MaxValue); // 3.40282347E+38
Console.WriteLine(float.MinValue); // -3.40282347E+38

// 64-bit floating-point number
double doubleValue = 1.79769313486231570E+308;
Console.WriteLine(double.MaxValue); // 1.79769313486231570E+308
Console.WriteLine(double.MinValue); // -1.79769313486231570E+308
```

### Decimal type (decimal)

```csharp
// 128-bit high-precision decimal floating-point number
decimal decimalValue = 79228162514264337593543950335M;
Console.WriteLine(decimal.MaxValue); // 79228162514264337593543950335
Console.WriteLine(decimal.MinValue); // -79228162514264337593543950335
```

### Boolean type (bool)

```csharp
bool boolValue = true;
Console.WriteLine(bool.TrueString); // True
Console.WriteLine(bool.FalseString); // False

bool condition = 3 > 2;
Console.WriteLine(condition); // True

```

### Character type (char)

```csharp
char charValue = 'A';
Console.WriteLine(char.MaxValue); // 65535
Console.WriteLine(char.MinValue); // 0
```

## Reference Types

### String type (string)

```csharp
string stringValue = "Hello, World!";
Console.WriteLine(stringValue); // Hello, World!
```

### Object type (object)

```csharp
object objectValue = 123;
Console.WriteLine(objectValue); // 123

objectValue = "Hello, World!";
Console.WriteLine(objectValue); // Hello, World!
```

### Dynamic type (dynamic)

```csharp
dynamic dynamicValue = 123;
Console.WriteLine(dynamicValue); // 123

dynamicValue = "Hello, World!";
Console.WriteLine(dynamicValue); // Hello, World!
```

### Nullable type

```csharp
int? nullableValue = null;
Console.WriteLine(nullableValue); //
```

## Enumerations

```csharp
enum Day
{
    Sunday,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday
}

Day today = Day.Sunday;
Console.WriteLine(today); // Sunday
```

## Structs

```csharp
struct Point
{
    public int X;
    public int Y;
}

Point point = new Point { X = 10, Y = 20 };
Console.WriteLine($"X: {point.X}, Y: {point.Y}"); // X: 10, Y: 20
```

## Arrays

```csharp
int[] numbers1 = { 1, 2, 3, 4, 5 }; // Single-dimensional array
int numbers2 = new int[5]; // Single-dimensional array

int[,] matrix = new int[2, 3]; // Multidimensional array
int[][] jaggedArray = new int[2][]; // Jagged array
```

## Lists

```csharp
List<int> numbers = new List<int> { 1, 2, 3, 4, 5 };
numbers.Add(6);
numbers.Remove(3);
```

## Dictionaries

```csharp
Dictionary<string, int> ages = new Dictionary<string, int>
{
    { "Alice", 25 },
    { "Bob", 30 },
    { "Charlie", 35 }
};

ages.Add("David", 40);
ages.Remove("Bob");
```

## Structure

```csharp
struct Point
{
    public int X;
    public int Y;

    public Point(int x, int y)
    {
        X = x;
        Y = y;
    }

    public void Print()
    {
        Console.WriteLine($"({X}, {Y})");
    }
}
```

## Classes

```csharp
class Person
{
    public string Name { get; set; }
    public int Age { get; set; }

    public Person(string name, int age)
    {
        Name = name;
        Age = age;
    }

    public void Greet()
    {
        Console.WriteLine($"Hello, my name is {Name} and I am {Age} years old.");
    }
}
```
