# ============================================
# Simple functions with type hints
# ============================================

def ft_max(list: list[int]) -> int:
    """
    Return the maximum value from a list of integers.

    Args:
        list (list[int]): A list of integers.

    Returns:
        int: The maximum integer found in the list.
    """
    m: int = list[0]
    for i in list:
        if i > m:
            m = i
    return m


print(ft_max, type(ft_max))  # <function ft_max at 0x7f8b8c0c1ee0> <class 'function'>

# ============================================
# Functions with default parameters
# ============================================

def print_msg(msg: str, case: str = None) -> None:
    """
    Print a message in either uppercase or lowercase.

    Args:
        msg (str): The message to be printed.
        case (str, optional): The case format for the message. Defaults to "upper".
                              Can be "upper" or "lower".

    Returns:
        None
    """
    if case == "upper":
        print(msg.upper())
    elif case == "lower":
        print(msg.lower())
    else:
        print(msg)


print_msg("camelCase")  # prints "camelCase"
print_msg("camelCase", "upper")  # prints "CAMELCASE"
print_msg("camelCase", case="lower")  # prints "camelcase"

# ============================================
# Functions with multiple return values
# ============================================

def get_stats(numbers: list[int]) -> tuple[int, int, float]:
    """Return min, max, and average of a list."""
    return min(numbers), max(numbers), sum(numbers) / len(numbers)


minimum, maximum, avg = get_stats([1, 2, 3, 4, 5])

print({"min": minimum, "max": maximum, "avg": avg})  # min:  2 max:  6 sum:  12

# ============================================
# variadic functions
# ============================================

# args
def variadic_function(*args: int) -> int:
    """
    Return the sum of all provided integer arguments.

    Args:
        *args (int): Variable number of integer arguments.

    Returns:
        int: The sum of all provided integers.
    """
    return sum(args)

print(variadic_function(1, 2, 3, 4, 5,))  # 15

# kwargs
def print_user_info(**kwargs: str) -> None:
    """
    Print user information provided as keyword arguments.

    Args:
        **kwargs (str): Variable number of keyword arguments representing user info.

    Returns:
        None
    """
    for key, value in kwargs.items():
        print(f"{key}: {value}")
print_user_info(name="Issam", age="30", city="New York")

# args and kwargs
def mixed_function(*args: int, **kwargs: str) -> None:
    """
    Print positional and keyword arguments.

    Args:
        *args (int): Variable number of integer positional arguments.
        **kwargs (str): Variable number of keyword arguments.
    Returns:
        None
    """
    print("Positional arguments:", args)
    print("Keyword arguments:", kwargs)
    
mixed_function(1, 2, 3, name="Issam", age="30")
        
        
# ============================================
# optional parameters gotcha
# ============================================

def append_to_list(value: int, lst: list[int] = []) -> list[int]:
    """
    Append a value to a list. If no list is provided, a new list is created.

    Args:
        value (int): The value to append.
        lst (list[int], optional): The list to append to. Defaults to a new list.

    Returns:
        list[int]: The list with the appended value.
    """
    lst.append(value)
    return lst

l1 = append_to_list(1)
l2 = append_to_list(2)
print({"l1": l1, "l2":   l2})  # both l1 and l2 will be [1, 2] due to mutable default argument

def append_to_list_fixed(value: int, lst: list[int] = None) -> list[int]:
    """
    Append a value to a list. If no list is provided, a new list is created.

    Args:
        value (int): The value to append.
        lst (list[int], optional): The list to append to. Defaults to None.

    Returns:
        list[int]: The list with the appended value.
    """
    if lst is None:
        return [value]
    lst.append(value)
    return lst

l3 = append_to_list_fixed(1)
l4 = append_to_list_fixed(2)
print({"l3": l3, "l4":   l4})  # l3 will be [1] and l4 will be [2] 
