# Strings in Python are immutable (cannot be changed after creation).

# ============================================
# Creating Strings
# ============================================

# Basic strings
name = "Alice"
greeting = 'Hello, World!'

# Empty string
empty = ""

# Multi-line strings
poem = """Roses are red,
Violets are blue,
Python is awesome,
And so are you!"""

# ============================================
# Escape Characters
# ============================================
# Special characters
newline = "Line 1\nLine 2"      # New line
tab = "Name:\tJohn"             # Tab
quote = "He said \"Hello\""     # Quote inside string
backslash = "C:\\Users\\File"   # Backslash

# Raw strings (ignore escape characters)
path = r"C:\Users\File"         # Useful for file paths and regex

# ============================================
# String Operations
# ============================================

name = "Alice"
greeting = "Hello, " + name  # Concatenation -> "Hello, Alice"
shout = 'ha' * 3  # Repetition -> "hahaha"
length = len(name)  # Length -> 5

# ============================================
# Accessing Characters (Indexing) and Slicing
# ============================================
# Accessing Characters (Indexing)
word = "Python"

first = word[0]      # 'P'
last = word[-1]      # 'n'
second_last = word[-2]  # 'o'

# String Slicing
text = "Hello, World!"

text[0:5]    # "Hello"
text[7:]     # "World!"
text[:5]     # "Hello"
text[:]      # "Hello, World!" (copy)

text[::2]    # "Hlo ol!" (every 2nd character)
text[::-1]   # "!dlroW ,olleH" (reverse)

# ============================================
# String Methods
# ============================================
# Searching and checking
text = "Hello World"

text.find("World")      # 6 (index where found)
text.find("Python")     # -1 (not found)
text.index("World")     # 6 (raises error if not found)
text.count("l")         # 3
text.startswith("Hello")  # True
text.endswith("World")    # True
"World" in text         # True

# Cleaning strings
text = "  Hello World  "

text.strip()       # "Hello World" (removes leading/trailing spaces)
text.lstrip()      # "Hello World  " (left strip)
text.rstrip()      # "  Hello World" (right strip)
text.strip("H")    # Removes specified characters

# Splitting and joining
sentence = "Hello World Python"
words = sentence.split()        # ['Hello', 'World', 'Python']
csv = "apple,banana,orange"
fruits = csv.split(",")         # ['apple', 'banana', 'orange']

words = ["Hello", "World"]
sentence = " ".join(words)      # "Hello World"
sentence = "-".join(words)      # "Hello-World"

# Replacing
text = "Hello World"
new_text = text.replace("World", "Python")  # "Hello Python"
new_text = text.replace("l", "L")           # "HeLLo WorLd"

# String Checking Methods
"123".isdigit()      # True
"abc".isalpha()      # True
"abc123".isalnum()   # True
"   ".isspace()      # True
"Hello".islower()    # False
"HELLO".isupper()    # True

# String multiplication and alignment
text = "Python"
text.center(20, "-")      # "-------Python--------"
text.ljust(20, "-")       # "Python--------------"
text.rjust(20, "-")       # "--------------Python"
text.rjust(10)        # "    Python" (default padding with spaces)
text.zfill(10)       # "0000Python" (padding with zeros)

text = "python programming is fun"
title = text.title()  # "Python Programming Is Fun"

# ============================================
# String Formatting
# ============================================
# f-strings 
name = "Alice"
age = 25
message = f"My name is {name} and I'm {age} years old"
# "My name is Alice and I'm 25 years old"

# With expressions
price = 49.99
message = f"Total: ${price * 1.2:.2f}"  # "Total: $59.99"

# format() method
name = "Bob"
age = 30
message = "My name is {} and I'm {} years old".format(name, age)
message = "My name is {0} and I'm {1} years old".format(name, age)
message = "My name is {n} and I'm {a} years old".format(n=name, a=age)

# % formatting (older style)
name = "Charlie"
age = 35
message = "My name is %s and I'm %d years old" % (name, age)
print(message)

