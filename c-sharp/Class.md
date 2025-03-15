# Class in C#

In C#, a class is a blueprint for creating objects. It defines the data and behavior of objects. In this article, we will discuss classes in C# and how to use them.

## Declaring a Class

```csharp
class Person
{
    public string Name;
    public int Age;

    // Constructor
    public Person(string name, int age)
    {
        Name = name;
        Age = age;
    }

    // Method
    public void PrintInfo()
    {
        Console.WriteLine($"Name: {Name}, Age: {Age}");
    }
}
```

## Creating an Instance of a Class

```csharp
Person person = new Person("Alice", 30);
```

## Accessing Members of a Class

```csharp
Console.WriteLine(person.Name); // Alice
Console.WriteLine(person.Age); // 30

person.PrintInfo(); // Name: Alice, Age: 30
```

## Properties

Properties are a way to encapsulate fields in a class. They provide a way to read, write, or compute the value of a private field.

`value` is an implicit parameter in the set accessor of a property that represents the value being assigned to the property.

```csharp
class Person
{
    private string name;
    private int age;

    public string Name
    {
        get { return name; }
        set { name = value; }
    }

    public int Age{ get => age;set => age = value; }
}
```

## Auto-Implemented Properties

Auto-implemented properties provide a more concise syntax for defining properties where no additional logic is required in the property accessors.

```csharp
class Person
{
    public string Name { get; set; }
    public int Age { get; set; }
    public string id { get; }
}
```

## Inheritance

Inheritance is a mechanism in which one class acquires the properties and behavior of another class. The class that inherits the members of another class is called the derived class, and the class whose members are inherited is called the base class.

```csharp
class Student : Person
{
    public int Grade;

    public Student(string name, int age, int grade) : base(name, age)
    {
        Grade = grade;
    }

    public void PrintGrade()
    {
        Console.WriteLine($"Grade: {Grade}");
    }
}
```

## Polymorphism

Polymorphism is the ability of an object to take on multiple forms. In C#, polymorphism is achieved through method overriding.

```csharp
class Animal
{
    public virtual void MakeSound()
    {
        Console.WriteLine("Animal makes a sound");
    }
}

class Dog : Animal
{
    public override void MakeSound()
    {
        Console.WriteLine("Dog barks");
    }
}

class Cat : Animal
{
    public override void MakeSound()
    {
        Console.WriteLine("Cat meows");
    }
}
```

## Encapsulation

Encapsulation is the bundling of data and methods that operate on the data into a single unit. It restricts direct access to some of the object's components and allows access to them only through the methods.

```csharp
class BankAccount
{
    private double balance;

    public void Deposit(double amount)
    {
        balance += amount;
    }

    public void Withdraw(double amount)
    {
        balance -= amount;
    }

    public double GetBalance()
    {
        return balance;
    }
}
```

## Abstraction

Abstraction is the concept of hiding the complex implementation details and showing only the essential features of the object. In C#, abstraction is achieved through abstract classes and interfaces.

```csharp
abstract class Shape
{
    public abstract double Area();
}

class Circle : Shape
{
    private double radius;

    public Circle(double radius)
    {
        this.radius = radius;
    }

    public override double Area()
    {
        return Math.PI * radius * radius;
    }
}
```

## Static Members

Static members belong to the class itself rather than to instances of the class. They are shared among all instances of the class.

```csharp
class MathUtils
{
    public static int Add(int a, int b)
    {
        return a + b;
    }
}

int sum = MathUtils.Add(10, 20);
```

## Partial Classes

Partial classes allow a class to be defined in multiple files. All the parts are combined into a single class at compile time.

```csharp
partial class Person
{
    public string Name;
}

partial class Person
{
    public int Age;
}

Person person = new Person();

person.Name = "Alice";
person.Age = 30;

Console.WriteLine($"Name: {person.Name}, Age: {person.Age}");
```

## ToString override

The `ToString` method is used to convert an object to its string representation. It is often overridden in custom classes to provide a meaningful string representation of the object.

```csharp
class Person
{
    public string Name;
    public int Age;

    public override string ToString()
    {
        return $"Name: {Name}, Age: {Age}";
    }
}

Person person = new Person { Name = "Alice", Age = 30 };
Console.WriteLine(person); // Name: Alice, Age: 30
```

## Equals override

The `Equals` method is used to compare two objects for equality. It is often overridden in custom classes to provide custom equality comparison logic.

```csharp
class Person
{
    public string Name;
    public int Age;

    public override bool Equals(object obj)
    {
        if (obj == null || GetType() != obj.GetType())
        {
            return false;
        }

        Person other = (Person)obj;
        return Name == other.Name && Age == other.Age;
    }
}

Person person1 = new Person { Name = "Alice", Age = 30 };
Person person2 = new Person { Name = "Alice", Age = 30 };

Console.WriteLine(person1.Equals(person2)); // True
```
