# ============================================
# Local Scope
# ============================================

def my_function():
    local_var = "I'm local"
    print(local_var)  # Works fine

my_function()
# print(local_var)  # ERROR: NameError - local_var doesn't exist here

# ============================================
# Enclosing Scope
# ============================================
def outer():
    outer_var = "I'm in outer"
    
    def inner():
        print(outer_var)  # Can access outer_var
    
    inner()

outer()  # Prints: I'm in outer

# To modify a variable from an enclosing scope, use nonlocal:

def outer():
    count = 0
    
    def inner():
        nonlocal count  # Tell Python to use the outer count
        count += 1
        return count
    
    print(inner())  # 1
    print(inner())  # 2

outer()

# ============================================
# Global Scope
# ============================================

counter = 0

def increment():
    global counter  # Tell Python to use the global counter
    counter += 1

increment()
print(counter)  # 1


# ============================================
# Built-in Scope
# ============================================
# Python's built-in functions and names like print(), len(), range(), etc.

# These are all built-in
print(len([1, 2, 3]))
range(10)
int("42")

# You can accidentally shadow built-ins (but shouldn't):
# Bad practice!
list = [1, 2, 3]  # Shadows the built-in list() function
# Now list() won't work until you delete this variable