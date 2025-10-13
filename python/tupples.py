# A tuple is an ordered collection of elements that are immutable, meaning once created, you can't change, add, or remove items from it.

# ============================================
# Creating tuples
# ============================================

my_tuple = (1, 2, 3)
fruits = ("apple", "banana", "cherry")
mixed = (1, "hello", 3.14, True)
single_item = (42,)  # Note the comma for single-element tuples
empty = ()

# ============================================
# Tuple Unpacking
# ============================================
# Basic unpacking
coordinates = (10, 20)
x, y = coordinates
print(x, y)  # 10 20

# Multiple values
person = ("Alice", 25, "Engineer")
name, age, job = person

# Using * to capture multiple values
numbers = (1, 2, 3, 4, 5)
first, *middle, last = numbers
print(first)   # 1
print(middle)  # [2, 3, 4]
print(last)    # 5

# ============================================
# Sets are Hashable
# ============================================

my_dict = {(1, 2): "coordinates", (3, 4): "location"}
my_set = {(1, 2), (3, 4)}

# ============================================
# Accessing Elements
# ============================================

my_tuple = (10, 20, 30, 40, 50)
print(my_tuple[0])      # 10
print(my_tuple[-1])     # 50
print(my_tuple[1:4])    # (20, 30, 40)
print(my_tuple[:3])     # (10, 20, 30)

# ============================================
# Common Tuple Methods
# ============================================

my_tuple = (1, 2, 2, 3, 4, 2)

# count() - returns how many times an item appears
print(my_tuple.count(2))  # Output: 3

# index() - returns the index of the first occurrence
print(my_tuple.index(3))  # Output: 3

# ============================================
# Named Tuples
# ============================================

from collections import namedtuple

Point = namedtuple('Point', ['x', 'y'])
p = Point(10, 20)
print(p.x, p.y)  # 10 20