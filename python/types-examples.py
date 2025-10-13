text = "Hello, World!"
print(text, type(text))

integer = 42
print(integer, type(integer))  # 42 <class 'int'>

floating_point = 3.14
print(floating_point, type(floating_point))  # 3.14 <class 'float'>

boolean = True
print(boolean, type(boolean))  # True <class 'bool'>

complex_number = 1 + 2j
print(complex_number, type(complex_number))  # (1+2j) <class 'complex'>

none_type = None
print(none_type, type(none_type))  # None <class 'NoneType'>

list_example = [1, 2, 3, 4, 5]
print(list_example, type(list_example))  # [1, 2, 3, 4, 5] <class 'list'>

tuple_example = (1, 2, 2, 3)
print(tuple_example, type(tuple_example))  # (1, 2, 3) <class 'tuple'>

set_example = {1, 2, 3, 3, 4}
print(set_example, type(set_example))  # {1, 2, 3, 4} <class 'set'>

dict_example = {"key1": "value1", "key2": "value2"}
print(
    dict_example, type(dict_example)
)  # {"key1": "value1", "key2": "value2"} <class 'dict'>

range_example = range(5)
print(list(range_example), type(range_example))  # [0, 1, 2, 3, 4] <class 'range'>

byte_example = b"Hello"
print(byte_example, type(byte_example))  # b'Hello' <class 'bytes'>

bytearray_example = bytearray(5)
print(
    bytearray_example, type(bytearray_example)
)  # bytearray(b'\x00\x00\x00\x00\x00') <class 'bytearray'>

memoryview_example = memoryview(b"Hello")
print(
    memoryview_example, type(memoryview_example)
)  # <memoryview object at 0x...> <class 'memoryview'>

frozenset_example = frozenset([1, 2, 3])
print(
    frozenset_example, type(frozenset_example)
)  # frozenset({1, 2, 3}) <class 'frozenset'>

import datetime

date_example = datetime.date.today()
print(date_example, type(date_example))  # 2024-06-15 <class 'datetime.date'>

import decimal

decimal_example = decimal.Decimal("10.5")
print(decimal_example, type(decimal_example))  # 10.5 <class 'decimal.Decimal'>


import fractions

fraction_example = fractions.Fraction(1, 3)
print(fraction_example, type(fraction_example))  # 1/3 <class 'fractions.Fraction'>

import uuid

uuid_example = uuid.uuid4()
print(uuid_example, type(uuid_example))  # <UUID object> <class 'uuid.UUID'>

import pathlib

path_example = pathlib.Path(".")
print(path_example, type(path_example))  # . <class 'pathlib._local.PosixPath'>

import re

regex_example = re.compile(r"\d+")
print(regex_example, type(regex_example))  # re.compile('\\d+') <class 're.Pattern'>

import array

array_example = array.array("i", [1, 2, 3, 4, 5])
print(
    array_example, type(array_example)
)  # array('i', [1, 2, 3, 4, 5]) <class 'array.array'>

import queue

queue_example = queue.Queue()
print(
    queue_example, type(queue_example)
)  # <queue.Queue object at 0x...> <class 'queue.Queue'>

import threading

thread_example = threading.Thread(target=lambda: None)
print(
    thread_example, type(thread_example)
)  # <Thread(Thread-1, initial)> <class 'threading.Thread'>

import multiprocessing

process_example = multiprocessing.Process(target=lambda: None)
print(
    process_example, type(process_example)
)  # <Process(Process-1, initial)> <class 'multiprocessing.Process'>

import socket

socket_example = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
print(
    socket_example, type(socket_example)
)  # <socket.socket object at 0x...> <class 'socket.socket'>
socket_example.close()

import http.client

http_example = http.client.HTTPConnection("www.example.com")
print(
    http_example, type(http_example)
)  # <http.client.HTTPConnection object at 0x...> <class 'http

