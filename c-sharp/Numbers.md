# Working with Numbers in C#

## Conversion between string and numeric types

### int.Parse

`int.Parse` throws an exception if the string is invalid or null.

```csharp
string numberString = "123";
int number = int.Parse(numberString);
Console.WriteLine(number); // 123


string nullString = null;
int number = int.Parse(nullString);
Console.WriteLine(number); // ArgumentNullException

```

### Convert.ToInt32

`Convert.ToInt32` throws an exception if the string is invalid but returns 0 if the string is null.

```csharp
string numberString = "123";
int number = Convert.ToInt32(numberString);
Console.WriteLine(number); // 123

string nullString = null;
int number = Convert.ToInt32(nullString);
Console.WriteLine(number); // 0
```

### int.TryParse

`int.TryParse` returns a boolean value indicating whether the conversion was successful or not.

```csharp
string numberString = "123";

int.TryParse(numberString, out int number);
Console.WriteLine(number); // 123

string nullString = null;
int.TryParse(nullString, out int number);
Console.WriteLine(number); // 0
```

## Conversion between numeric types

### Implicit Conversion

```csharp
int number = 123;
long bigNumber = number;
Console.WriteLine(bigNumber); // 123
```

### Explicit Conversion

```csharp
long bigNumber = 123;
int number = (int)bigNumber;
Console.WriteLine(number); // 123
```

## Rounding Numbers

### Math.Round

```csharp
double number = 123.456;
double roundedNumber = Math.Round(number);
Console.WriteLine(roundedNumber); // 123
```

### Math.Floor

```csharp
double number = 123.456;
double floorNumber = Math.Floor(number);
Console.WriteLine(floorNumber); // 123
```

### Math.Ceiling

```csharp
double number = 123.456;
double ceilingNumber = Math.Ceiling(number);
Console.WriteLine(ceilingNumber); // 124
```

## Generating Random Numbers

```csharp
Random random = new Random();
int randomNumber = random.Next(1, 101); // Generates a random number between 1 and 100
Console.WriteLine(randomNumber);
```

## Formatting Numbers

### Currency

```csharp
decimal price = 123.45M;

Console.WriteLine(price.ToString("C")); // $123.45
// or
Console.WriteLine(price.ToString("C", System.Globalization.CultureInfo.CurrentCulture)); // $123.45

// specify a specific culture
Console.WriteLine(price.ToString("C", System.Globalization.CultureInfo.CreateSpecificCulture("fr-MA"))); // 123,45 DH
```

### Percentage

```csharp
decimal percentage = 0.1234M;
Console.WriteLine(percentage.ToString("P")); // 12.34%
```

### Custom Numeric Format Strings

```csharp
decimal number = 123.456M;
Console.WriteLine(number.ToString("0.00")); // 123.46
// or
Console.WriteLine(number.ToString("#.##")); // 123.46

```

### Scientific Notation

```csharp
decimal number = 1234567890M;
Console.WriteLine(number.ToString("0.###E+0")); // 1.235E+9
```

### padding

```csharp
int number = 123;
Console.WriteLine(number.ToString("00000")); // 00123
// or
Console.WriteLine(number.ToString("D5")); // 00123
```
