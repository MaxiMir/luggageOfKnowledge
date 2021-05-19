+ [DESTRUCTURE](#DESTRUCTURE)
+ [find & findIndex](#FIND)
+ [flat](#FLAT)
+ [flatMap](#FLAT_MAP)

### <a name="DESTRUCTURE"></a> DESTRUCTURE:

* REST:

```js
const arr = [1, 2, 3, 4, 5, 6] 
const [num1, num2, ...nums] = arr 

console.log(num1) // -> 1
console.log(num2) // -> 2
console.log(nums) // -> [3, 4, 5, 6]
```

* SPREAD:

```js
const func = (a, ...arrs) => {
  console.log(a) // -> [1, 2, 3]
  console.log(arrs) // -> [[4, 5, 6], [7, 8, 9]]
}

func([1, 2, 3], [4, 5, 6], [7, 8, 9])
```

* конкатенация произвольного количества массивов:

```js
const concatArrs = (...arrs) => [].concat(...arrs)
```

* копирование массива:

```js
const arr = [1, 2, 3]
const [...clone] = arr // <-> const clone = [...arr]  
```

* меняем значения a,b местами:

```js
let a = 1
let b = 2

[a, b] = [b, a]
```

* слайдер:

```js
setInterval(() => {
  [img[0].src, img[1].src, img[2].src] = [img[1].src, img[2].src, img[0].src]
}, 1000) 
```  

* преобразуем строку в массив:

```js
const str = 'abcde' 
const letters = [...str]
```

* нахождение максимального числа через Spread Operator:

```js
const nums = [1, 20, 7, 6, 5]
Math.max(...nums) // -> 20
```

* получение порядкового номера DOM элемента в for of:

```js
const elems = document.querySelectorAll('p')
const entries = elems.entries() // итератор entries -> [ключ, элемент]

for (let [num, {id, innerHTML}] of entries) {
  console.log(num, id, innerHTML) // в num - порядковый номер элемента 
}
```

* убрать из массива переданные остальными аргументами элементы:

```js
const filterArr = (a, ...args) => a.filter(i => !args.includes(i))
filterArr([1, 2, 3, 4, 5, 6, 7], 1, 3, 5, 6) // -> [2, 4, 7]
```

* access array item (with default value):

```js
const colors = []
const [, secondColor = 'black'] = colors
```

### <a name="FIND"></a> find & findIndex:

```js
const people = [
  { name: "Макс", age: 25, budget: 40000},
  { name: "Игорь", age: 21, budget: 80000}
]
const igor = people.find(person => person.name === 'Игорь') // {name: "Игорь", age: 21, budget: 80000}
const igorIndex = people.findIndex(person => person.name === 'Игорь') // 1
```

### <a name="FLAT"></a> flat:

возвращает новый массив, в котором все элементы вложенных подмассивов были рекурсивно "подняты" на указанный уровень
depth:

```js
const courseStudents = [
  ['Janet', 'Martha', 'Bob', ['Phil', 'Candace' ]],
  ['Wilson', 'Taylor'],
  ['Edith', 'Jacob', 'Peter', 'Betty']
]

const flattenOneLevel = courseStudents.flat()
```

```json
["Janet", "Martha", "Bob", ["Phil", "Candace"], "Wilson", "Taylor", "Edith", "Jacob", "Peter", "Betty"]
```

```js
const flattenTwoLevels = courseStudents.flat(2) // Infinity - для неизвестной глубины
```

```json
["Janet", "Martha", "Bob", "Phil", "Candace", "Wilson", "Taylor", "Edith", "Jacob", "Peter", "Betty"]
```

### <a name="FLAT_MAP"></a> flatMap:

сначала применяет функцию к каждому элементу, а затем преобразует полученный результат в плоскую структуру и помещает в
новый массив:

```js
const grades = [78, 62, 80, 64]

const flatMapped = grades.flatMap(grade => [grade, grade + 7])
```

```json
[78, 85, 62, 69, 80, 87, 64, 71]
```
