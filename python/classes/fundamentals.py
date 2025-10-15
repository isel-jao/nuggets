# ============================================
# Basic Class Definition
# ============================================

class Dog:
    pass

my_dog = Dog()  # Creating an instance


# ============================================
# Attributes and Methods
# ============================================
class Dog:
    count = 0  # class variable (shared across all instances)
    def __init__(self, name, age):
        Dog.count += 1      # Increment class variable
        self.name = name    # attribute
        self.age = age      # attribute
    
    def bark(self):         # method
        return f"{self.name} says Woof!"
    
    def get_age(self):      # method
        return self.age

my_dog = Dog("Buddy", 3)
print(my_dog.name)          # Buddy
print(my_dog.bark())        # Buddy says Woof!
print(my_dog.get_age())     # 3
second_dog = Dog("Max", 5)
print(Dog.count)            # 2

# ============================================
# Inheritance
# ============================================
class Animal:
    def __init__(self, name):
        self.name = name
    
    def speak(self):
        return f"{self.name} makes a sound"

class Dog(Animal):  # Dog inherits from Animal
    def __init__(self, name, breed):
        super().__init__(name)  # calls Animal's __init__
        self.breed = breed
    
    def speak(self):  # override the parent method
        return f"{self.name} barks"

my_dog = Dog("Rex", "German Shepherd")
print(my_dog.breed) # German Shepherd
print(my_dog.speak())  # Rex barks

# ============================================
# Encapsulation
# ============================================
class BankAccount:
    def __init__(self, balance):
        self._balance = balance  # protected (convention: single underscore)
        self.__pin = "1234"      # private (name mangling: double underscore)
        
    def deposit(self, amount):
        if amount > 0:
            self._balance += amount
            return True
        return False
    
    def withdraw(self, amount, pin):
        if pin == self.__pin and 0 < amount <= self._balance:
            self._balance -= amount
            return True
        return False
    
    def get_balance(self, pin):
        if pin == self.__pin:
            return self._balance
        return "Invalid PIN"

account = BankAccount(1000)
account.deposit(500)

print(account.get_balance("1234"))  # 1500
print(account.withdraw(200, "1234")) # True
print(account._balance)  # accessible but discouraged
# print(account.__pin)   # AttributeError: 'BankAccount' object has no attribute

# ============================================
# Special Methods (Dunder Methods)
# ============================================

class Vector2D:
    def __init__(self, x, y):
        self.x = x
        self.y = y
        
    def __repr__(self):  # String representation
        return f"Vector2D({self.x}, {self.y})"
    
    def __str__(self):
        return f"({self.x}, {self.y})"
    
    def __eq__(self, other):  
        return self.x == other.x and self.y == other.y
    
    def __add__(self, other):  
        return Vector2D(self.x + other.x, self.y + other.y)

    def __mul__(self, scalar):  
        return Vector2D(self.x * scalar, self.y * scalar)
    
    def __rmul__(self, scalar):  
        return self.__mul__(scalar)
    
    def __abs__(self):  
        return (self.x**2 + self.y**2) ** 0.5
    
    def __bool__(self):  
        return self.x != 0 or self.y != 0
    
    def __hash__(self):
        return hash((self.x, self.y))
    
    
    
    
    
    
v1 = Vector2D(2, 3)
v2 = Vector2D(5, 7)
print(v1)  # (2, 3) -> calls __str__
print(v1 == Vector2D(2, 3))  # True -> calls __eq__
print(v1 + v2)  # (7, 10) -> calls __add__
print(v1 * 3)  # (6, 9) -> calls __mul__
print(3 * v1)  # (6, 9) -> calls __rmul__
print(abs(v1))  # 3.605551275463989 -> calls __abs__
print(bool(v1)) # True -> calls __bool__
s = {v1, v2}  # uses __hash__

# ============================================
# Decorators
# ============================================

# Property Decorators
class Temperature:
    def __init__(self, celsius):
        self._celsius = celsius
    
    @property
    def fahrenheit(self):
        return (self._celsius * 9/5) + 32
    
    @fahrenheit.setter
    def fahrenheit(self, value):
        self._celsius = (value - 32) * 5/9

temp = Temperature(0)
print(temp.fahrenheit)  # 32
temp.fahrenheit = 86
print(temp._celsius)    # 30


# static Method
class MathUtils:
    pi = 3.14159
    
    @staticmethod
    def add(a, b):
        return a + b
    
    @classmethod
    def from_string(cls, value):
        return cls(int(value))

print(MathUtils.add(5, 3))  # 8 (no instance needed)

# ============================================
# Abstract Base Classes
# ============================================

from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    
    def area(self):
        return 3.14 * self.radius ** 2

# circle = Shape()  # This would error
circle = Circle(5)
print(circle.area())  # 78.5