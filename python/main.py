# l1 = ["issam", "ismail", "oussama"]

# def test(item):
#   return item + "!!"

# l3 = [test(item) for item in l1 ]

# l4 = [item + "!!" for item in l1]

# print(l4)

t = (1, 2, 3, 4, 5)

t2 = (item * 2 for item in t if item % 2 == 0)
print(tuple(t2), type(t2))  # generator object