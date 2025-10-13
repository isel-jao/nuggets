# ============================================
# Creating Dictionaries
# ============================================
# Using curly braces
dict1 = {"a": 1, "b": 2, "c": 3}

# Using the dict() constructor
dict2 = dict(name="Bob", age=25)

# Empty dictionary
dict3 = {}
dict4 = dict()

# From a list of tuples
dict5 = dict([("x", 10,), ("y", 20)])

# From two lists using zip()
keys = ["name", "age", "city"]
values = ["Alice", 30, "Boston"]
person = {k: v for k, v in zip(keys, values)}

# ============================================
# Accessing Values
# ============================================
person = {"name": "Alice", "age": 30}
print(person["name"])  # Output: Alice

# Using get() method (returns None if key doesn't exist)
print(person.get("age"))  # Output: 30
print(person.get("job"))  # Output: None
print(person.get("job", "Unknown"))  # Output: Unknown (default value)

# ============================================
# Adding and Modifying Items
# ============================================
person = {"name": "Alice"}

# Add a new key-value pair
person["age"] = 30

# Modify existing value
person["name"] = "Alicia"

# Using update() to add multiple items
person.update({"city": "Boston", "job": "Engineer"})

print(person)  # Output: {'name': 'Alicia', 'age': 30, 'city': 'Boston', 'job': 'Engineer'}

# ============================================
# Removing Items
# ============================================
person = {"name": "Alice", "age": 30, "city": "Boston"}

# Remove using del
del person["city"]

# Using pop() - removes and returns the value
age = person.pop("age")  # Returns 30
print(age)  # Output: 30

# Using popitem() - removes last inserted item
person.popitem()

# Using clear() - removes all items
person.clear()

# ============================================
# Iterating Through Dictionaries
# ============================================
person = {"name": "Alice", "age": 30, "city": "Boston"}

# Iterate through keys
for key in person:
    print(key)

# Iterate through keys explicitly
for key in person.keys():
    print(key)

# Iterate through values
for value in person.values():
    print(value)

# Iterate through key-value pairs
for key, value in person.items():
    print(f"{key}: {value}")
    
# ============================================
# Dictionary Methods
# ============================================

person = {"name": "Alice", "age": 30}

# setdefault() - gets a value or sets a default if key doesn't exist
person.setdefault("job", "Unknown")  # Adds job if it doesn't exist

# copy() - creates a shallow copy
person_copy = person.copy()

# fromkeys() - creates a dictionary with specified keys and default value
new_dict = dict.fromkeys(["a", "b", "c"], 0)  # {'a': 0, 'b': 0, 'c': 0}

# ============================================
# Checking for Keys
# ============================================
person = {"name": "Alice", "age": 30}

# Check if key exists
if "name" in person:
    print("Name exists")

# Check if key doesn't exist
if "job" not in person:
    print("Job doesn't exist")
    
# ============================================
# Dictionary Comprehension
# ============================================

# {key_expression: value_expression for item in iterable}
# {key_expression: value_expression for item in iterable if condition}

squares = {x: x**2 for x in range(5)}
# Output: {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# Only even numbers
even_squares = {x: x**2 for x in range(10) if x % 2 == 0}
# Output: {0: 0, 2: 4, 4: 16, 6: 36, 8: 64}

# Only if value meets condition
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
filtered = {x: x**2 for x in numbers if x % 3 == 0}
# Output: {3: 9, 6: 36, 9: 81}

# ============================================
# Grouping and Aggregation
# ============================================
# Group by category
items = [
    {"category": "fruit", "name": "apple"},
    {"category": "fruit", "name": "banana"},
    {"category": "vegetable", "name": "carrot"}
]

grouped = {}
for item in items:
    category = item["category"]
    if category not in grouped:
        grouped[category] = []
    grouped[category].append(item["name"])

print(grouped)  

# Or using a more advanced approach with defaultdict or comprehension
from collections import defaultdict
# Dictionary comprehension works better with simpler grouping patterns

grouped_defaultdict = defaultdict(list)
for item in items:
    grouped_defaultdict[item["category"]].append(item["name"])
    
print(dict(grouped_defaultdict))
