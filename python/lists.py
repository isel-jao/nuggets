# ============================================
# Creating lists
# ============================================
fruits = ["apple", "banana", "orange"]
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", 3.14, True]
empty = []

# ============================================
# Accessing Elements
# ============================================
fruits = ["apple", "banana", "orange", "grape"]
print(fruits[0])      # apple
print(fruits[1])      # banana
print(fruits[-1])     # grape (last item)
print(fruits[-2])     # orange (second to last)

# ============================================
# Slicing Lists
# ============================================
numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
print(numbers[2:5])      # [2, 3, 4]
print(numbers[:3])       # [0, 1, 2]
print(numbers[5:])       # [5, 6, 7, 8, 9]
print(numbers[::2])      # [0, 2, 4, 6, 8] (every 2nd item)
print(numbers[::-1])     # [9, 8, 7, 6, 5, 4, 3, 2, 1, 0] (reversed)

# ============================================
# Modifying Lists
# ============================================
fruits = ["apple", "banana", "orange"]
fruits[0] = "grape"              # Change an item
fruits.append("mango")            # Add item to end
fruits.insert(1, "kiwi")          # Insert at specific index
fruits.extend(["pear", "plum"])   # Add multiple items
fruits.remove("banana")           # Remove specific item
removed = fruits.pop()            # Remove and return last item
removed = fruits.pop(0)           # Remove and return first item
del fruits[0]                     # Delete item at index
fruits.clear()                    # Remove all items
fruits += ["apple", "banana"]  # Concatenate lists
fruits *= 2                   # Repeat list
print(fruits)

# ============================================
# Common List Methods
# ============================================
numbers = [3, 1, 4, 1, 5, 9, 2, 6]

# Information methods
print(len(numbers))               # 8 (length)
print(numbers.count(1))           # 2 (count occurrences)
print(numbers.index(4))           # 2 (first index of item)

# Modification methods
numbers.sort()                    # Sort in place: [1, 1, 2, 3, 4, 5, 6, 9]
numbers.reverse()                 # Reverse in place
numbers.copy()                    # Create a shallow copy

# Find min and max
print(min(numbers))               # 1
print(max(numbers))               # 9
print(sum(numbers))               # 31

# ============================================
# Checking Membership
# ============================================
fruits = ["apple", "banana", "orange"]
print("apple" in fruits)          # True
print("grape" in fruits)          # False
print("grape" not in fruits)      # True

# ============================================
# Looping Through Lists
# ============================================
fruits = ["apple", "banana", "orange"]

# Simple loop
for fruit in fruits:
    print(fruit)

# With index
for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")

# While loop
i = 0
while i < len(fruits):
    print(fruits[i])
    i += 1
# ============================================
# List Comprehension
# ============================================
# [expression for item in iterable ]
# [expression for item in iterable if condition]

# Double each number
numbers = [1, 2, 3, 4, 5]
doubled = [x * 2 for x in numbers]  # [2, 4, 6, 8, 10]

# Convert strings to integers
strings = ["1", "2", "3"]
integers = [int(x) for x in strings]  # [1, 2, 3]

# Create a range of numbers
tens = [x * 10 for x in range(5)]  # [0, 10, 20, 30, 40]


# Get only even numbers
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens = [x for x in numbers if x % 2 == 0]  # [2, 4, 6, 8, 10]

# Get numbers greater than 5
greater_than_five = [x for x in numbers if x > 5]  # [6, 7, 8, 9, 10]

# Filter strings by length
words = ["apple", "cat", "elephant", "dog", "butterfly"]
long_words = [word for word in words if len(word) > 3]
# ['apple', 'elephant', 'butterfly']

# Nested loops
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
doubled_matrix = [[item * 2 for item in row] for row in matrix]
print(doubled_matrix)

# ============================================
# Multiple Iterables
# ============================================
# Cartesian product
colors = ["red", "blue"]
sizes = ["S", "M", "L"]
combinations = [f"{color}-{size}" for color in colors for size in sizes]
# ['red-S', 'red-M', 'red-L', 'blue-S', 'blue-M', 'blue-L']

# Pairing lists
names = ["Alice", "Bob", "Charlie"]
ages = [25, 30, 35]
pairs = [(name, age) for name, age in zip(names, ages)]
# [('Alice', 25), ('Bob', 30), ('Charlie', 35)]