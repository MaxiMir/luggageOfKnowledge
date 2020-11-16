### НЕОГРАНИЧЕННЫЕ ПЕРЕХВАТЫ:
Теперь вы можете писать выражения try/catch без привязки к киданию ошибок
```js
try {
  // something throws
} catch {
  // don't have to do catch(e)
}    
```
> Кстати, перехваты, в которых вы не учитываете значение e, иногда называют обработкой исключений-покемонов. Потому что вы должны поймать их все!

### ЗАМЫКАНИЯ:
Замыкание – это функция вместе со всеми внешними переменными, которые ей доступны.

> Все переменные внутри функции – это свойства специального внутреннего объекта LexicalEnvironment (лексическое окружение).
При запуске функция создает объект LexicalEnvironment, записывает туда аргументы, функции и переменные.
Процесс инициализации выполняется в том же порядке, что и для глобального объекта, который, вообще говоря, является частным случаем лексического окружения.

```js
function sayHi(name) {
  var phrase = "Привет, " + name
  alert( phrase )
}

sayHi('Вася')
```

1. До выполнения первой строчки её кода, на стадии инициализации, интерпретатор создает пустой объект LexicalEnvironment и заполняет его:
```js
function sayHi(name) {
  // LexicalEnvironment = { name: 'Вася', phrase: undefined }
  var phrase = "Привет, " + name
  alert( phrase )
}

sayHi('Вася')
```
2. Функция выполняется:
```js
function sayHi(name) {
  // LexicalEnvironment = { name: 'Вася', phrase: undefined }
  var phrase = "Привет, " + name

  // LexicalEnvironment = { name: 'Вася', phrase: 'Привет, Вася'}
  alert( phrase )
}

sayHi('Вася')
```
3. В конце выполнения функции объект с переменными обычно выбрасывается и память очищается (исключение - замыкания).

> В функции ссылка на внешний объект переменных хранится в специальном внутреннем свойстве функции, которое называется [[Scope]].
 >> Каждая функция при создании получает ссылку [[Scope]] на объект с переменными, в контексте которого была создана.

 >> При запуске функции создаётся новый объект с переменными LexicalEnvironment. Он получает ссылку на внешний объект переменных из [[Scope]].

 >> При поиске переменных он осуществляется сначала в текущем объекте переменных, а потом – по этой ссылке.

«Понимать замыкания» в JavaScript означает понимать следующие вещи:

 >> Все переменные и параметры функций являются свойствами объекта переменных LexicalEnvironment. 
Каждый запуск функции создает новый такой объект. На верхнем уровне им является «глобальный объект», в браузере – window.

 >> При создании функция получает системное свойство [[Scope]], которое ссылается на LexicalEnvironment, в котором она была создана.

 >> При вызове функции, куда бы её ни передали в коде – она будет искать переменные сначала у себя, а затем во внешних LexicalEnvironment с места своего «рождения».

При создании функции с использованием new Function, её свойство [[Scope]] ссылается не на текущий LexicalEnvironment, а на window => следствие – такие функции не могут использовать замыкание.

### СЧЕТЧИК С УСТАНОВКОЙ/СБРОСОМ ЗНАЧЕНИЙ:
```js
const makeCounter = () =>  {
  let currentCount = 1

  const counter = () => currentCount++

  counter.set = value => {
    currentCount = value
  }

  counter.reset = () => {
    currentCount = 1
  }

  return counter
}

const counter = makeCounter()

counter() // 1
counter() // 2

counter.set(5)
counter() // 5
```
### ПРИЕМ ПРОЕКТИРОВАНИЯ "МОДУЛЬ":
FILE: some-module.js:
```js
(function() { // Function Expression
  // глобальная переменная нашего скрипта
  const message = "Привет"

  // функция для вывода этой переменной
  const showMessage = () => alert( message )

  // выводим сообщение
  showMessage()
}())

+function() { // показываем что здесь Function Expression
  alert('Вызов на месте')
}()
```
### ОДАЛЖИВАНИЕ МЕТОДА:
```js
const printArgs = () => {
  arguments.join = [].join // скопируем ссылку на функцию в переменную

  const argStr = join.call(arguments, ':') // запустили join в контексте arguments
}

printArgs(1, 2, 3) // -> 1:2:3

// #2:
const printArgs = () =>  {
  // вызов arr.slice() скопирует все элементы из this в новый массив
  const args = [].slice.call(arguments)
  const argStr = args.join(', ') // args - полноценный массив из аргументов
}

printArgs('Привет', 'мой', 'мир') // -> Привет, мой, мир

// #3:
const sumArgs = () => {
  return [].reduce.call(arguments, (a, b) => a + b)
}

sumArgs(4, 5, 6) // -> 15
```
### ДЕКОРАТОР ДЛЯ ПРОВЕРКИ ТИПА:
```js
const checkNumber = value => typeof value == 'number'

// декоратор, проверяющий типы для f
// второй аргумент checks - массив с функциями для проверки
const typeCheck = (f, checks) => {
  return () => {
    for (let i = 0 i < arguments.length; i++) {
      if (!checks[i](arguments[i])) {
        console.log( "Некорректный тип аргумента номер " + i )

        return
      }
    }

    return f.apply(this, arguments)
  }
}

let sum = (a, b) => a + b
// обернём декоратор для проверки
sum = typeCheck(sum, [checkNumber, checkNumber]) // оба аргумента - числа

// пользуемся функцией как обычно
sum(1, 2) // -> 3, все хорошо

// а вот так - будет ошибка:
sum(true, null) // некорректный аргумент номер 0
sum(1, ["array", "in", "sum?!?"]) // некорректный аргумент номер 1
```
### КОНТЕКСТ:
```js
function hello () {
  console.log('Hello', this)
}

const maxiMir = {
  name: "Maxim",
  age: 25,
  sayHello: hello
}

maxiMir.sayHello() // Hello > {name: "Maxim", age: 25, sayHello: f}
window.hello() // <-> hello() Hello > Window {postMessage: f, blur: f, focus: f, ...}

this === window // => true


const maxiMir = {
  name: "Maxim",
  age: 25,
  sayHello: hello,
  sayHelloWindow: hello.bind(window), // в () контекст вызова для this
  logInfo: function (job, phone) {
    console.group(`${this.name} info:`) // Заголовок для группы
    console.log(`Name is ${this.name}`)
    console.log(`Age is ${this.age}`)
    console.log(`Job is ${job}`)
    console.log(`Phone is ${phone}`)
    console.groupEnd()
  }
}

const maxCon = {
  name: "Max",
  age: 30
}

// bind:
const fnMaxConInfoLog = maxiMir.logInfo.bind(maxCon, 'Frontend', '8-999-999-99-99')
fnMaxConInfoLog() // () - т.к. метод bind не вызывает функцию, а возвращает новую // =>

// call:
maxiMir.logInfo.call(maxCon, 'Frontend', '8-999-999-99-99') // сразу вызывает функцию =>

// apply:
maxiMir.logInfo.apply(maxCon, ['Frontend', '8-999-999-99-99']) // сразу вызывает функцию =>
```
```text
Max info:
Name is Max
Age is 30
Job is Frontend
Phone is 8-999-999-99-99
```

### СОЗДАТЬ МЕТОД ДЛЯ МАССИВОВ:
```js
const nums = [1, 2, 3, 4, 5]

Array.prototype.multBy = function(n) {
  return this.map(item => item * n)
}

nums.multBy(2) // [2, 4, 6, 8, 10]
```
### bind СВОЯ РЕАЛИЗАЦИЯ:
```js
function logPerson() {
  console.log(`Person: ${this.name}, ${this.age}, ${this.job}`)
}

const person1 = {name: 'Maxim', age: 22, job: 'Frontend'}
const person2 = {name: 'John', age: 23, job: 'SMM'}

function bind(context, fn) {
  return (...args) => fn.apply(context, args)
}

bind(person1, logPerson)() // Person: Maxim, 22, Frontend
bind(person2, logPerson)() // Person: John, 23, SMM
```
### setTimeout:
```js
setTimeout(() => { // Web API <-> window.setTimeout(...)
  console.log('Inside timeout, after 2000 seconds')
}, 2000)

// Call Stack
// Web API
// Event Loop
// Callback Queue
```
### Map, Set, WeakMap, WeakSet:
```js
const obj = {
  name: 'Max',
  age: 26,
  job: 'Fullstack'
}

const entries = [
  ['name', 'Max'],
  ['age', 26],
  ['job', 'Fullstack'],
]

Object.entries(obj) // Объект в массив => [['name', 'Max'], ['age', 26], ['job', 'Fullstack']]
Object.fromEntries(entries) // Массив в объект => { name: 'Max', age: 26, job: 'Fullstack' }
```
### Map:
```js
const map = new Map(entries)
map // { 'name': 'Max', 'age': 26, 'job': 'Fullstack' }
map.get('job') // Fullstack
map
  .set('newField', 42)
  .set(obj, 'Value of object') // задаем ключ объект
  .set(NaN, 'NaN ??') // задаем ключ NaN

map.get(obj) // Получаем значение по ключу объекту => Value of object
map.get(NaN) // -> ??
map.delete('job') // удаляем из map 'job': 'Fullstack'
map.has('job') // проверяем наличие в map 'job'
map.size // размер карты => 6
map.clear() // очищаем карту

for (let [key, value] of map) {} // итерируем map

for (let keys of map.keys()) {} // итерация по значениям

for (let val of map.values()) {} // итерация по значениям

map.forEach((val, key, m) => {} // итерация через forEach

const array = [...map] // преобразуем map в массив <-> Array.from(map)
const mabObj = Object.fromEntries(map.entries()) // преобразуем map в массив (если ключ объект, то в объекте будет [object Object])


const users = [
  {name: 'Juli'},
  {name: 'Alex'},
  {name: 'Irina'}
]

const visits = new Map()

visits
  .set(users[0], new Date())
  .set(users[1], new Date(new Date().getTime() + 1000 * 60))
  .set(users[2], new Date(new Date().getTime() + 5000 * 60))

const lastVisit = user => visits.get(user)
lastVisit(user[1]) // 2019-09-26T08:33:21.696Z
```
### Set:
```js
const set = new Set([1,2,3,3,4,4,5]) // остаются уникальные значения => {1,2,3,4,5}
set.add(10).add(20) // добавление новых элементов в set

set.has(32) // проверяет на наличие в set элемента => false
set.size() // размер set => 7
set.delete(1) // удаление элемента из ыet
set.clear() // очистка set

set.values() // [Set Iterator] {1,2,3,4,5,10,20}
set.keys() // [Set Iterator] {1,2,3,4,5,10,20}
set.entries() // [Set Entries] {[1,1],[2,2],[3,3],[4,4],[5,5],[10,10],[20,20]}

for (let value of set) {}

const uniqValues = array => [...new Set(array)] // <-> [Array.from(new Set(array))]
```
### weakMap:
позволяет избежать утечки памяти (ключи только объекты)
```js
const cache = new WeakMap()

const cacheUser = user => {
  if (!cache.has(user)) {
    cache.set(user, Date.now())
  }

  return cache.get(user)
}

let lena = {name: 'Elena'}
let alex = {name: 'Alex'}

cacheUser(lena)
cacheUser(alex)

lena = null // сборщик мусора удалил объект obj + удалил obj в weakMap

// автоматически у WeakMap был удален объект + очищена память
cache.has(lena) // false
cache.has(alex) // true
```
### WeakSet:
```js
const users = [
  {name: 'Elena'},
  {name: 'Alex'},
  {name: 'Irina'}
]

const visits = new WeakSet()

visits.add(users[0]).add(users[1])

users.splice(1, 1)
// автоматически у WeakSet был удален объект + очищена память

console.log(visits.has(users[0])) // true
console.log(visits.has(users[1])) // false
```
### VOID:
```js
// интересный способ работы с немедленно вызываемыми функциями:
void function() {
  console.log('What')
}()

// без загрязнения глобального пространства имён:
void function aRecursion(i) {
  if (i > 0) {
    console.log(i--)
    aRecursion(i)
  }
}(3)

console.log(typeof aRecursion) // undefined
```
### for-await-of (ES7-ES9)
```js
// Async function for iteration with 'for-await-of':
const showNames = async = () => {
  for await(name of names) {
    console.log(name)
  }
}
```
### Async generator function (ES7-ES9)
```js
async function* readLines(path) {
  const file = await fileOpen(path)

  try {
    while(!file.EOF) {
      yield await file.readLine()
    }
  } finally {
    await file.close()
  }
}
```
### Async iteration of async generator function results:
```js
for await (const line of readLines(filePath)) {
  console.log(line)
}

const emulate = (id, ms) => new Promise(resolve => {
  setTimeout(() => resolve(), ms)
})

const promises = [
  emulate(1, 250),
  emulate(2, 500),
  emulate(3, 1500)
]

async function old() {
  for (const promise of await Promise.all(promises)) { // ждем пока все зарезолвится затем их выводим в консоли
    console.log('Old: ', promise)
  }
}

old()

async function modern() {
  for await (const promise of promises) { // как только промис зарезолвится он выведется в консоли
    console.log('New: ', promise)
  }
}

modern()
```
### Finally is always executed:
```js
let finallyWasExecuted = false

assert.throws(
    () => {
      try {
        throw new Error() // even if there return statement
      } finally {
        finallyWasExecuted = true
      }
    },
    Error
)

assert.equal(finallyWasExecuted, true)
```
### ЧАСТИЧНОЕ ПРИМЕНЕНИЕ:
```js
Function.prototype.curry = function(...args) {
  const currying = (fn, ...args) =>
      (fn.length <= args.length) ?
          fn(...args)
          : (...others) => currying(fn, ...args, ...others)

  return currying(this, ...args)
}
```
### КАРРИРОВАНИЕ:
```js
const curry = _f => x => y => z => _f(x, y, z)

function f(x, y, z) {
  return x + y + z
}

// Использование:
curry(f)(1)(2)(3) // 6
f.curry(1)(2)(3) // 6

// Отличие: каррирование всегда возвращает набор унарных функций / частичное применениие как только собрала нужное количество параметров - тут же вызывает функцию
```
### <a name="CLICK_SET"></a> СОБРАТЬ ЭЛЕМЕНТЫ НА КОТОРЫЕ КЛИКНУЛИ (SET):
```js
const set = new Set
const elems = document.querySelectorAll('p')

for (let elem of elems) {
    elem.addEventListener('click', function() {
        set.add(this)
    })
}

let button = document.querySelector('button')

button.addEventListener('click', () => {
    for(let elem of set) {
        elem.innerHTML += '!'
    }
    
    set.clear() // очищаем коллекцию
})
```
### <a name="CLICK_MAP"></a> ПО НАЖАТИЮ КЛАВИШИ ДВИГАТЬСЯ ПО ИСТОРИИ ВВЕДЕННЫХ ЗНАЧЕНИЙ (MAP):
```js
const map = new Map // создаем новую коллекцию

for (let input in inputs) {
    map.set(input, {values: [], index: -1}) // для каждого перебираемого input создаем пустой объект
    
    input.addEventListener('blur', function () {
       const {values, index} = map.get(this) // получаем предыдущие значения
       values.push(this.value) // добавляем текущее значение
       map.set(this, {values: values, index: index + 1}) //  переопределяем
       this.value = '' // удаляем данные из input
       console.log(map.get(this))
    })
    
    input.addEventListener('keydown', function (event) { // по нажатию кнопки влево - в input выводим предыдущие введенные значения
        let { values, index } = map.get(this)
        
        if (event.key === 'ArrowLeft' && index > -1)  {
            event.preventDefault()
            
            this.value = values[index]
            map.set(this, {values: values, index: index - 1})
        }
        
        if (event.key === 'ArrowRight' && index < values.lenght - 1)  {
            event.preventDefault()
            
            this.value = values[index + 1]
            map.set(this, {values: values, index: index + 1})
        }
    })
}
```