# A set in Python is an unordered collection of unique, immutable elements. 

# ============================================
# Creating Sets
# ============================================

my_set = {1, 2, 3, 4, 5}
fruits = {"apple", "banana", "cherry"}
empty_set = set()  # Not {}

from_list = set([1, 2, 2, 3, 3, 4])  # {1, 2, 3, 4}
from_string = set("hello")  # {'h', 'e', 'l', 'o'}

# my_set = {1, 2, [3, 4]}  # Error: lists are mutable
my_set = {frozenset([1, 2]), frozenset([3, 4])}  # Valid


# ============================================
# Adding and Removing Elements
# ============================================
my_set = {1, 2, 3}
my_set.add(4)  # {1, 2, 3, 4}
my_set.update([5, 6, 7])  # {1, 2, 3, 4, 5, 6, 7}

my_set.remove(5)  # Raises KeyError if 5 doesn't exist
my_set.discard(5)  # No error if 5 doesn't exist
my_set.pop()  # Removes and returns an arbitrary element
my_set.clear()  # Removes all elements


# ============================================
# Checking Membership
# ============================================
my_set = {1, 2, 3, 4}
print(3 in my_set)  # True
print(5 in my_set)  # False

# ============================================
# Set Operations
# ============================================

set1 = {1, 2, 3}
set2 = {3, 4, 5}
print(set1 | set2)  # {1, 2, 3, 4, 5}
print(set1.union(set2))  # {1, 2, 3, 4, 5}

print(set1 & set2)  # {3}
print(set1.intersection(set2))  # {3}

print(set1 - set2)  # {1, 2}
print(set1.difference(set2))  # {1, 2}

print(set1 ^ set2)  # {1, 2, 4, 5}
print(set1.symmetric_difference(set2))  # {1, 2, 4, 5}


set1 = {1, 2, 3}
set2 = {1, 2}

print(set2 < set1)  # True (set2 is a proper subset)
print(set2 <= set1)  # True (set2 is a subset)
print(set1 > set2)  # True (set1 is a proper superset)
print(set1 >= set2)  # True (set1 is a superset)
print(set1 == set2)  # False
print(set1 != set2)  # True

# ============================================
# Common Methods
# ============================================

my_set = {1, 2, 3, 4, 5}
print(len(my_set))  # 5
print(max(my_set))  # 5
print(min(my_set))  # 1
new_set = my_set.copy()

set_a = {1, 2, 3}
set_b = {4, 5, 6}
print(set_a.isdisjoint(set_b))  # True
print({1, 2}.issubset(set_a))  # True