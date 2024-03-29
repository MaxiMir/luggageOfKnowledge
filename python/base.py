################ Python ################

2 + 2 * 2 # => 6
# сокращенная запись: *= += -= /= //= (целочисленное деление)


help(len) # выводит информацию о функции
help(str.lower) # выводит информацию о методе


type('Julia') # возвращает тип передаваемого значения => <class 'str'>.
# другие 'int' - целые числа, 'float' - числа с плавающей точкой (дробные) """



### КЛАСС строка str ###
len('I love Python') # возвращает кол-во элементов контейнера(здесь - кол-во символов в строке)
'ho-ho-ho'.upper() # приводит строку в верхний регистр => HO-HO-HO
'HO-HO-HO'.lower() # приводит строку в нижний регистр => ho-ho-ho
'PHP' + ' + ' + 'JS' # конкатенация => PHP + JS
'\\n' # экранирование \

str = '....................\
..............' # обратный \ используется для переноса строки

'JULIA' + str(2018) # str() - приводит значение к строке => JULIA2018

name = 'Max'
age = '18'
greet = 'Привет, {}. Тебе {}.'.format(name, age) # подстановка значений в строку
greet = 'Привет, {1}. Тебе {0}.'.format(name, age) # меняем местами
greet = f'Привет, {name}. Тебе {age}' # форматированная строка Python > 3.6

first_name = 'Joffrey'
greeting = 'Hello'
template = "{}, {}!"
print(template.format(greeting, first_name))

sum = '{} + {} = {}'.format(n1, n2, n1 + n2); # => 2 + 3 = 5
sum = '{n1} + {n2} = {n1 + n2}' # <-> аналогично примеру выше

'abcde'[-1]  # простой способ извлечь последний символ

### input ###
w = input('Введите размер первой стороны прямоугольника: ') # выводит переданную строку и возвращает введенное значение
h = input('Введите размер другой стороны: ')
w = int(w)	# 1
h = int(h)	# 2
s = f'Площадь прямоугольника:\n\t {w}x{h} = {w*h}' # без приведения 1, 2 будет ошибка, т.к. переменные извне приходят с типом str вместо int

print(s) # выводит на экран переданное значение (в конце печатает \n) => 200
print(s, end='\n') # <-> аналогично примеру выше, значение по умолчанию
print(s, end='') # без переноса строки
print(w,s) # может принимать несколько параметров (выводит их через пробел)

path = r'c:\folder\test\abc' # r - сырая строка - \ не экранирует символы

'123'.isdigit() # предикат - содержит ли строка только цифры => true
'12aa3'.isdigit() # => false
'12.313'.replace('.', '', 1) # заменяем одно вхождение у float, затем можно проверять на isdigit()

str = 'ABCD'
str[1:] # работа со строкой как с элементами списка => BCD
str[1:2] # => B



### КЛАСС целые числа int ###
1 + int('222'); # int() - приводит значение к числу => 223
1 + 'ABC' # Ошибка, разные типы данных



### КЛАСС булев тип bool ###
bool(0) # преобразование к булеву типу => false
# false: 0, 0.0, '', остальное true/



### Условия if, elif, else ###
answer = input('Сколько будет 2 + 2?: ')
answer = int(answer)

if answer == 4: # условие
	print('Верно!')	# блоки отчитываются отступами (1 таб или 4 пробела) => Верно!
else:
	print('Неверно!')


import math # подключение модуля math
help(math) # просмотр информации о модуле
math.cos(2) # => -0.4161483654


import random

n1 = random.randrange(5) # сгенерировать случайное число с [0;5)
n2 = random.randrange(11) # сгенерировать случайное число с [0;11)

answer = input('Сколько будет {n1} + {n2}?: ')
test = answer.replace('.', '', 1)

if not test.isdigit():
	print('Надо ввести число!')
else: # else if в python - elif
	if answer == test: # значит ничего не было изменено и у answer тип int
		answer = int(answer)
	else:
		answer = float(answer)

	if answer == n1 + n2:
		print('Верно!')
	else:
		print('Неверно!')




### Тернарный оператор ###
# <expression on true> if <predicate> else <expression on false>
number if number >= 0 else -number

### Заглушка ###
if 1 == 1:
	pass # заглушка
else:
	pass # заглушка


### Константы ###
DRAGONS_BORN_COUNT = 3



### Отступы ###
 answer = input('Сколько будет 2 + 2: ') # SyntaxError: неожиданный отступ!



### Цикл while ###
import random

num = random.randrange(1, 11)


while True: #бесконечный цикл
	answer = imput('Введите число: ')
	if not answer.isdigit():
		print('Надо ввести число!')
		continue

	answer = int(answer)
	if answer > num:
		print(Меньше)
	elif answer < num: 	# else if
		print('Больше')
	else:
		print('Правильно')
		break


i = 0
while i < 5:
	if i == 3
		break # прерывание цикла
		# continue пропусить текущую итерацию
	print(i)
	i += 1 # => выведет с 0 до 3



### КЛАСС диапазон range ###
range(10) # сгенерирует ряд чисел в рамках заданного диапазона [0, 10)
range(1, 8) # (старт, стоп) сгенерирует ряд чисел [1, 7)
range(3, 16, 3) # (старт, стоп, шаг) сгенерирует ряд чисел [1, 7)

for i in range(10, -6, -2):
    print(i) # =>

#10
#8
#6
#4
#2
#0
#-2
#-4

# Можно получить доступ к объектам в range() по индексу, как если бы вы имели дело со списком:
range(3)[1] # => 1
range(3)[2] # => 2
len(range(3)) # => 3



### Цикл for ###
for i in range(1, 11):
	print(i)

for i in 'abc': # перебор строки
	print(i)

### КЛАСС список list ###
l = [1, 2, 3, 4, 5, 6, 7, 8]
l.append(6) # добавление в конец списка
d = l.pop() # извлечение последнего элемента по умолч. => 8
e = l.pop(0) # извлечение элемента по индексу

l[0] # вернет элемент по индексу => 1
l[5:] # вернет элементы начиная с выбранного индекса => [6, 7, 8]
l[:5] # вернет элементы до выбранного индекса => [1, 2, 3, 4, 5]
l[2:6] # вернет элементы между выбранными индексами => [3, 4, 5, 6]
l[1] = 0 # изменение элемента списка по индексу
3 in l # проверка есть ли элемент в списке => true
30 not in l # проверка отсутствует ли элемент в списке => true


l.sort() # сортировка списка
l.sort(reverse=True) # сортировка списка в обратном порядке

len(l) # количество элементов => 8


# копирование списков:
l1 = [1, 2, 3]
l2 = l.copy() # 2 разных списка
# или:
l1 = [1, 2, 3]
l2 = l[:]

for i in [1, 2, 3, 4, 5]:
	print(i)

list(range(3)) # приведение последовательности к списку => [1, 2, 3]
list('abc') # приведение строки к списку => ['a', 'b', 'c']


# создание списка
l = []
for i in [2, 3, 4]
	l.append(i ** 2) # сверху можно задать условие, например, if i > 2
# l => [4, 9, 16]
# <-> используя синтаксический сахар:
l = [i ** 2 for i in [2, 3, 4]]



### КЛАСС кортеж tuple ###
t = (1, 2, 3) # в отличие от списка НЕИЗМЕНЯЕМЫЙ
t[0] # => 1


# Поменять значения переменных местами:
a = 1; b = 2
a, b = b, a

# присваивание переменных:
a, b, c = 1, 2, 3 # кортежи Python создает неявно (a, b, c) = (1, 2, 3)



### КЛАСС множество set ###
s = {1, 3, 4, 2, 2} # значения могут встречаться только 1 раз {1, 3, 4, 2, 2}

# получаем уникальный список:
l = [1, 3, 4, 2, 2]
s = set(l)
l = list(s) # => [1, 3, 4, 2, 2]



### КЛАСС словарь ###
d = {'a': 100, 'b': 200, 'c': 300}
d['a'] # => 100
d['d'] = 500 # добавление ключа
d['b'] = 400 # изменение значения ключа
d['y'] # обращение по несуществующему ключу => Ошибка!

y in d: # проверка на существование ключа (подходит для списка)
d.get('d', 0) # вернуть значение ключа, в случае его осутствия, вернуть значение по-умолч. (2-й параметр)

# перебрать словарь:
for k, v in d.items():
	print(f'ключ {k}: значение {v}')

# выбрать все значения:
d.values() # => dict_values([100, 400, 300, 500]) можно обработать через list()
# выбрать все ключи:
d.keys() # => dict_keys(['a', 'b', 'c', 'd']) можно обработать через list()

hello = {
	'ru': 'Добрый день',
	'en': 'Good day',
	'de': 'Guten tag',
	'default': 'Unknown langauge'
}
s = input('Введите код: ') # Вводим en
greet = hello.get(s, hello['default'])
print(greet) # => Good day


### Логический оператор и (and) ###
age = 25
age >= 18 and age <= 60 # ко второму выражению перейдет если 1 часть true => true

1 and 2 # там где остановился то и возвращает => 2
0 and 2 # => 0



### Логический оператор или (or) ###
age = 25
age >= 18 or age <= 60 # ко второму выражению перейдет если 1 часть false => true

1 or 2 # => 1
0 or 2 # => 2


### Функции ###
def get_second_per_day():
	return 24 * 60 * 60 # вместо описания функции можно использовать заглушку - pass

sec = get_second_per_day() # вызов функции
print(sec) # => 86400

def get_second_per_day(days = 1): # функция с параметром по умолчанию
	return 24 * days * 60 * 60

sec = get_second_per_day(3)
print(sec) # => 259200
# если return ничего не возвращает возвращает None


def area_of_disk(r):
	return 3.14 * r ** 2

def area_of_ring(outer, inner):
	return area_of_disk(outer) - area_of_disk(inner) # вызов функции внутри функции


def foo(a, b = 2, c = 3):
	pass

fn(10, c = 30) 	# вызов функции с пареданным значением для переменной по умолч.
fn(c = 30, a = 10) 	# можно указывать в любом порядке


### Области видимости ###

# глобальная область видимости
x = 1
#/ глобальная область видимости

def fn(x):
	# локальная область видимости
	print(x)
	x = 20
	print(x)
	#/ локальная область видимости

print(x) # => 1
fn(0) # => 0 затем 20
print(x) # => 1


x = 1
# 1
def fn():
	print(x)

fn(x) # => 1
# 2
def fn():
	global x # без global, если будем менять значение глобальной переменной x,
	x = 20 # то она станет локальной

#3
def fn(*params): # * вернуть кортеж из передаемых параметров
	for p in params: # работаем с кортежем
		print(p, end = ' ')

fn(1,2,3,4) # => 1 2 3 4

#4
def fn(**params): # * вернуть словарь из передаемых параметров
	for p, m in params.items():
		print(p, m, end = '')

fn(John = 100, Mike = 200) #
# John 100
# Mike 200


def area_of_disk(r): # ''' для описания для вывода функции help()
	'''Help on function:

		area_of_disk(number) => number
		Return area of disk by radius
	'''
	return 3.14 * r ** 2

help(area_of_disk) # => Help on function: ...



### Модули ###

#1
import math
math.cos(1)

dir(math) # выводит список функций (c __ в названии - служебные)
help(math.gcd) # выводит информацию о методе класса

#2
from math import cos, sin # импортирование только выбранных методов
cos(2) # при это виде импортирования вызов методов, делается как у функций без class.

#3
from math import cos as math_cos # создание алиаса для метода с одинаковыми названиями

#4
import funcs # подключение файла funcs.py


import random
help(random.choice) # случайный элемент последовательности (строка/кортеж/список/словарь)
help(random.choice) # список случайных элементов

import string
help(string.printable) # печатные символы
help(string.punctuation) # символы пунктуации
help(string.ascii_uppercase) # заглавные латинские символы


$ pip install numpy # установка другого пакета через консоль

import numpy # импорт установленного пакета
numpty.product([1, 2, 3, 4, 5]) # произведение элементов => 120

$ pip uninstall numpy # удаление установленного пакета



# ... после установки пакета jupyter:
jupyter notebook # запускает вебсервер


# file: demo.py:
import funcs
print(__name__) # => для текущего файл - __main__, а для подключаемых подулей вернет название файла, напр. funcs

# file: funcs.py:
if __name__ == '__main__':
	print('Это funcs.py!')
else:
	print('Вызван в другом файле!')


# модуль sys:
import sys
sys.path # список путей по умолчанию для поиска подключаемых модулей (текущая директория по умолч. присутствует)



# Импортирование пакета модулей:
# folder: mylib
	# folder: data
		# file: dataModul1py
		# file: __init__.py # должен хранится в каждой папке, где используются файлы
	# file: modul.py
	# __init__.py - пустой файл для возможности импортирования пакетов

# file: ../demo.py:
import mylib.data.dataModul.getData as getData
import mylib.modul.foo as foo

res = foo()
data = getData()


import this # =>
# Beautiful is better than ugly.
# Explicit is better than implicit.
# Simple is better than complex.
# Complex is better than complicated.
# Flat is better than nested.
# Sparse is better than dense.
# Readability counts.
# Special cases aren't special enough to break the rules.
# Although practicality beats purity.
# Errors should never pass silently.
# Unless explicitly silenced.
# In the face of ambiguity, refuse the temptation to guess.
# There should be one-- and preferably only one --obvious way to do it.
# Although that way may not be obvious at first unless you're Dutch.
# Now is better than never.
# Although never is often better than *right* now.
# If the implementation is hard to explain, it's a bad idea.
# If the implementation is easy to explain, it may be a good idea.
# Namespaces are one honking great idea -- let's do more of those!



### Работа с файлами ###

#1
open('test.txt') # открывает файл только для чтения, указатель стоит в начале файла <-> open('test.txt', 'r')
open('test.txt', 'r+') # Открывает файл для чтения и записи, указатель стоит в начале файла.

open('test.txt', 'w') # открывает файл только для записи, указатель стоит в начале файла.
open('test.txt', 'w+') # Открывает файл для чтения и записи, указатель стоит в начале файла.

open('test.txt', 'a') # открывает файл для добавления информации в файл, указатель стоит в конце файла.
open('test.txt', 'a+') # Открывает файл для добавления и чтения, указатель стоит в конце файла.

f = open('test.txt', 'r', encoding='utf-8') # открытие с указанием кодировки
pass
f.close() # закрытие открытого файла

# 2
with open('test.txt', 'r', encoding='utf-8') as f: # чтение
	# 1
	print(f.read(5)) # в () количество символов, которое необходимо прочитать. По умолч. весь файл
	print(f.read(3)) # курсор сместился на 5 символов, соотвественно прочитает следующие 3 символа

	# 2
	s = f.readline() # читаем файл построчно со перемещением курсора на след. строку

	# 3
	line = f.readlines() # возвращает список со строками
	print(lines) # => ['Line one\n', 'Line two\n', 'Line three\n']

	#4
	for line in f: # сам дискриптор файла f итерируемый
		print(line)


with open('test.txt', 'a', encoding='utf-8') as f: # запись в файл
	f.write('\nLine four') # \n для переноса на новую строку
	print(f.closed) # открыт ли файл => true
	print(f.mode) # в каком режиме открыт => a
	print(f.name) # имя файла => test.txt



# file: data.csv
John;Smith;25;123-45-78
Mike;Dow;33;789-45-94

# file: csvReader.py:
import csv
with open('data.csv', 'r', encoding='utf-8') as f:
	reader = csv.reader(f, delimiter = ';') #  получает доступ к объекту файла
	for row in reader:
		print(row) # =>
#	['John','Smith','25','123-45-78']
#	['Mike','Dow','33','789-45-94']


# file: csvWriter.py:
with open('data.csv', 'a', encoding='utf-8', newline='\n') as f:
	writer = csv.writer(f, delimiter = ';')
	writer.writerow(['Pete','Parker','14','479-93-15'])
# file: data.csv =>
John;Smith;25;123-45-78
Mike;Dow;33;789-45-94
Pete;Parker;14;479-93-15



import os
os.getcwd() # текущая директория => 'C:\\Users\\Public\\python-22-01\\work\\demp'
os.path.exists('test.txt') # проверяем на существование директорию/файл => true
os.path.isdir('test.txt') # является ли путь директорией => false
os.path.isfile('test.txt') # является ли путь директорией => true
os.listdir('.') # список директорий/файлов в текущей директории



# file: params.py
import sys

print('Script name: ' + sys.argv[0])
print('First param: ' + sys.argv[1])
print('Second param: ' + sys.argv[2])

$ python params.py aaa bbb # =>
# Script name: params.py
# First param: aaa
# Second param: bbb


### try ###

# перехватить исключение:
try:
	age = input('Введите свой возраст: ')
	age = int(age)
	if age < 18:
		raise Exception('Не подходите по возрасту')
	else:
		print('Все хорошо')
except (NameError, TypeError): # несколько типов ошибок
	print('Ой!Что-то из NameError, TypeError') # можно разделить по условиям: if type(e) == NameError: ...
except ValueError as e: # e -экземпляр класса ValueError; type(e) => class 'ValueError'
	print(e)
except EOFError:
	print('Ой!EOFError')
except KeyboardInterrupt:
	print('Ой!KeyboardInterrupt')
except Exception as e:
	print(e)
except: # дефолтно
	print('Ой!Ошибка')
else: # если ошибок нет попадаем сюда
	print('Успех')
finally: # сюда попадаем в любом случае
	print('Конец')



try:
	n = 1
	try:
		s = 'a' > 1
	except:
		print('inner')
		raise Exception('from inner') # поднять исключение *
	finally:
		print('ok')
except:
	print('outer')
finally:
	print('the end')

# =>
# inner
# ok
# outer - выведется если прописано *
# the end



### 'Подсказки' ###
s: str # подсказка, планируется, что переменная s будет строкой
n: int = 1
s = 2

from typing import List, Dict, Tuple # для более сложных типов данных, необходим импорт
lst: List[int] # список: int-ы
d: Dict[str, int] # словарь: ключи - строки, значения - int-ы
t: List[Tuple[int, int]] # список, в котором кортежи из 2-х int-ов


def is_equal(n1: int, n2L: int)->bool: # подсказки в функциях, тип переменных и тип возвращаемого значения
	return n1 == n2


### Модуль 'mypy' ###


# парсер https://proglib.io/p/parsing-course/ https://losst.ru/parsing-sajtov-python-3
https://proglib.io/p/python-tips/