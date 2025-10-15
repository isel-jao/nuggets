# ============================================
# Conditional Statements (if/elif/else)
# ============================================
# Basic if statement
age = 18
if age >= 18:
    print("You can vote")

# if-else
temperature = 25
if temperature > 30:
    print("It's hot!")
else:
    print("It's comfortable")

# if-elif-else (multiple conditions)
score = 85
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "F"
    

# Combined conditions
age = 25
has_license = True
if age >= 18 and has_license:
    print("You can drive")

# ============================================
# Loops
# ============================================
# Loop through a list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit, end=" ")
print()  

# Loop with range
for i in range(5):  # 0, 1, 2, 3, 4
    print(i, end=" ")
print()

# Range with start, stop, step
for i in range(2, 10, 2):  # 2, 4, 6, 8
    print(i, end=" ")
print()

# Loop through dictionary
person = {"name": "Alice", "age": 30}
for key, value in person.items():
    print(f"{key}: {value}", end="; ")
print()

# Enumerate (get index and value)
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")
    
# while loops - Run while a condition is True
# Basic while loop
count = 0
while count < 5:
    print(count, end=" ")
    count += 1
print()

# While with user input
# password = ""
# while password != "secret":
#     password = input("Enter password: ")
# print("Access granted!")

# ============================================
# Loop Control Statements
# ============================================
# break - Exit the loop immediately
for i in range(10):
    if i == 5:
        break  # Stop when i is 5
    print(i, end=" ")  # Prints 0, 1, 2, 3, 4
print()

# continue - Skip to next iteration
for i in range(5):
    if i == 2:
        continue  # Skip when i is 2
    print(i, end=" ")  # Prints 0, 1, 3, 4
print()

# pass - Do nothing (placeholder)
for i in range(5):
    if i == 2:
        pass  # Placeholder, do nothing
    print(i, end=" ")
print()

# ============================================
# else with Loops
# ============================================
# Loops can have an else clause that runs when the loop completes normally (not via break):

numbers = [1, 3, 5, 7, 9]
target = 4

for num in numbers:
    if num == target:
        print("Found!")
        break
else:
    print("Not found!")  # This runs because break never happened

# ============================================
# Ternary (Conditional) Expressions
# ============================================

# Instead of:
if age >= 18:
    status = "adult"
else:
    status = "minor"

# You can write:
status = "adult" if age >= 18 else "minor"
