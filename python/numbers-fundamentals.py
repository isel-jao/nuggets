# ============================================
# Integer (int)
# ============================================
# Positive, negative, and zero
x = 42
y = -17
z = 0

# No size limit in Python 3!
huge = 12345678901234567890123456789

# Different number systems
binary = 0b1010      # Binary (base 2) = 10
octal = 0o12         # Octal (base 8) = 10
hexadecimal = 0xFF   # Hexadecimal (base 16) = 255


# ============================================
# Float (float)
# ============================================
price = 19.99
pi = 3.14159
scientific = 2.5e3   # 2.5 × 10³ = 2500.0
tiny = 1.5e-4        # 0.00015

# Special float values
infinity = float('inf')
neg_infinity = float('-inf')
not_a_number = float('nan')


# ============================================
# Complex (complex)
# ============================================
z = 3 + 4j           # j represents √-1
w = complex(2, 5)    # 2 + 5j

# Access components
z.real    # 3.0
z.imag    # 4.0
abs(z)    # 5.0 (magnitude)

# ============================================
# Decimal (from decimal module)
# ============================================
from decimal import Decimal, getcontext

# Precise decimal calculations
price1 = Decimal('0.1')
price2 = Decimal('0.2')
total = price1 + price2  # Exactly 0.3

# Set precision
getcontext().prec = 6
Decimal('1') / Decimal('7')  # 0.142857

# ============================================
# Fraction (from fractions module)
# ============================================
from fractions import Fraction

half = Fraction(1, 2)
third = Fraction(1, 3)
result = half + third    # Fraction(5, 6)

# From strings or floats
Fraction('0.25')        # Fraction(1, 4)
Fraction(0.5)           # Fraction(1, 2)


# ============================================
# Operations
# ============================================
# Arithmetic
10 + 3    # 13 (addition)
10 - 3    # 7 (subtraction)
10 * 3    # 30 (multiplication)
10 / 3    # 3.333... (division, always returns float)
10 // 3   # 3 (floor division, integer result)
10 % 3    # 1 (modulo, remainder)
10 ** 3   # 1000 (exponentiation)

# Compound assignment
x = 5
x += 3    # x = x + 3 → 8
x *= 2    # x = x * 2 → 16

# Number Comparisons
5 == 5    # True (equal)
5 != 3    # True (not equal)
5 > 3     # True
5 >= 5    # True
3 < 5     # True
3 <= 4    # True

# Chaining comparisons
1 < x < 10  # True if x is between 1 and 10

# Bitwise Operations (for integers)
5 & 3     # 1 (AND)
5 | 3     # 7 (OR)
5 ^ 3     # 6 (XOR)
~5        # -6 (NOT)
5 << 1    # 10 (left shift)
5 >> 1    # 2 (right shift)

# ============================================
# Type Conversion
# ============================================
# Converting between types
int(3.7)           # 3 (truncates)
float(5)           # 5.0
str(42)            # '42'
int('100')         # 100
int('FF', 16)      # 255 (from hexadecimal)

# Check type
type(42)           # <class 'int'>
isinstance(3.14, float)  # True

# ============================================
# Useful Built-in Functions
# ============================================
abs(-5)            # 5 (absolute value)
round(3.7)         # 4 (rounds to nearest int)
round(3.14159, 2)  # 3.14 (round to 2 decimals)
pow(2, 3)          # 8 (same as 2**3)
pow(2, 3, 5)       # 3 (2³ mod 5)

max(1, 5, 3)       # 5
min(1, 5, 3)       # 1
sum([1, 2, 3, 4])  # 10

# ============================================
# Math Module
# ============================================
import math

math.sqrt(16)      # 4.0
math.ceil(3.2)     # 4 (round up)
math.floor(3.8)    # 3 (round down)
math.pi            # 3.141592653589793
math.sin(math.pi/2) # 1.0
math.log(100, 10)  # 2.0 (log base 10)
math.factorial(5)  # 120

