# Structure in C#

In C#, a structure is a value type that can contain data members and function members. It is similar to a class, but with some key differences. In this article, we will discuss structures in C# and how to use them.

## Declaring a Structure

```csharp
struct Point
{
    public int x;
    public int y;

    // Constructor
    public Point(int x, int y)
    {
        this.x = x;
        this.y = y;
    }

    // Function member
    public void Print()
    {
        Console.WriteLine($"({x}, {y})");
    }
}
```

## Creating an Instance of a Structure

```csharp
Point p;
p.x = 10;
p.y = 20;
```

```csharp
Point p = new Point(10, 20);
```

## Accessing Members of a Structure

```csharp
Console.WriteLine(p.x); // 10
Console.WriteLine(p.y); // 20
```

```csharp
p.Print(); // (10, 20)
```
