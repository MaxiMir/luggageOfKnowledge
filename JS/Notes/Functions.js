// @ НЕОГРАНИЧЕННЫЕ ПЕРЕХВАТЫ:

// Теперь вы можете писать выражения try/catch без привязки к киданию ошибок:
try {
  // something throws
} catch {
// don't have to do catch(e)
}

// Кстати, перехваты, в которых вы не учитываете значение e, иногда называют обработкой исключений-покемонов. Потому что вы должны поймать их все!


// @ ЗАМЫКАНИЯ:
/**
 Замыкание – это функция вместе со всеми внешними переменными, которые ей доступны.

 Все переменные внутри функции – это свойства специального внутреннего объекта LexicalEnvironment (лексическое окружение).
 При запуске функция создает объект LexicalEnvironment, записывает туда аргументы, функции и переменные. Процесс инициализации выполняется в том же порядке, что и для глобального объекта, который, вообще говоря, является частным случаем лексического окружения.
 */

function sayHi(name) {
  var phrase = "Привет, " + name;
  alert( phrase );
}

sayHi('Вася');


// 1. До выполнения первой строчки её кода, на стадии инициализации, интерпретатор создает пустой объект LexicalEnvironment и заполняет его:
function sayHi(name) {
  // LexicalEnvironment = { name: 'Вася', phrase: undefined }
  var phrase = "Привет, " + name;
  alert( phrase );
}

sayHi('Вася');

// 2. Функция выполняется:
function sayHi(name) {
  // LexicalEnvironment = { name: 'Вася', phrase: undefined }
  var phrase = "Привет, " + name;

  // LexicalEnvironment = { name: 'Вася', phrase: 'Привет, Вася'}
  alert( phrase );
}

sayHi('Вася');

/**
 3. В конце выполнения функции объект с переменными обычно выбрасывается и память очищается (исключение - замыкания).

 В функции ссылка на внешний объект переменных хранится в специальном внутреннем свойстве функции, которое называется [[Scope]].

 - Каждая функция при создании получает ссылку [[Scope]] на объект с переменными, в контексте которого была создана.
 - При запуске функции создаётся новый объект с переменными LexicalEnvironment. Он получает ссылку на внешний объект переменных из [[Scope]].
 - При поиске переменных он осуществляется сначала в текущем объекте переменных, а потом – по этой ссылке.

 «Понимать замыкания» в JavaScript означает понимать следующие вещи:

 1. Все переменные и параметры функций являются свойствами объекта переменных LexicalEnvironment. Каждый запуск функции создает новый такой объект. На верхнем уровне им является «глобальный объект», в браузере – window.
 2. При создании функция получает системное свойство [[Scope]], которое ссылается на LexicalEnvironment, в котором она была создана.
 3. При вызове функции, куда бы её ни передали в коде – она будет искать переменные сначала у себя, а затем во внешних LexicalEnvironment с места своего «рождения».

 При создании функции с использованием new Function, её свойство [[Scope]] ссылается не на текущий LexicalEnvironment, а на window => cледствие – такие функции не могут использовать замыкание.
 */



// @ СЧЕТЧИК С УСТАНОВКОЙ/СБРОСОМ ЗНАЧЕНИЙ:
const makeCounter = () =>  {
  let currentCount = 1;

  const counter = () => currentCount++;

  counter.set = value => {
    currentCount = value;
  };

  counter.reset = () => {
    currentCount = 1;
  };

  return counter;
};

const counter = makeCounter();

counter(); // 1
counter(); // 2

counter.set(5);
counter(); // 5



// @ ПРИЕМ ПРОЕКТИРОВАНИЯ "МОДУЛЬ":
// FILE: some-module.js:
;(function() { // Function Expression
  // глобальная переменная нашего скрипта
  const message = "Привет";

  // функция для вывода этой переменной
  const showMessage = () => alert( message );

  // выводим сообщение
  showMessage();
}());

+function() { // показываем что здесь Function Expression
  alert('Вызов на месте');
}();



// @ ОДАЛЖИВАНИЕ МЕТОДА:
// #1:
const printArgs = () => {
  arguments.join = [].join; // скопируем ссылку на функцию в переменную

  const argStr = join.call(arguments, ':'); // запустили join в контексте arguments

  console.log( argStr ); // сработает и выведет 1:2:3
};

printArgs(1, 2, 3);

// #2:
const printArgs = () =>  {
  // вызов arr.slice() скопирует все элементы из this в новый массив
  const args = [].slice.call(arguments);
  console.log( args.join(', ') ); // args - полноценный массив из аргументов
};

printArgs('Привет', 'мой', 'мир'); // Привет, мой, мир

// # Сумма переданных аргументов:
const sumArgs = () => {
  return [].reduce.call(arguments, (a, b) => a + b);
};

sumArgs(4, 5, 6); // 15



// @ ДЕКОРАТОР ДЛЯ ПРОВЕРКИ ТИПА:
// вспомогательная функция для проверки на число
const checkNumber = value => typeof value == 'number';

// декоратор, проверяющий типы для f
// второй аргумент checks - массив с функциями для проверки
const typeCheck = (f, checks) => {
  return () => {
    for (let i = 0; i < arguments.length; i++) {
      if (!checks[i](arguments[i])) {
        console.log( "Некорректный тип аргумента номер " + i );

        return;
      }
    }

    return f.apply(this, arguments);
  }
};

let sum = (a, b) => a + b;
// обернём декоратор для проверки
sum = typeCheck(sum, [checkNumber, checkNumber]); // оба аргумента - числа

// пользуемся функцией как обычно
sum(1, 2); // 3, все хорошо

// а вот так - будет ошибка
sum(true, null); // некорректный аргумент номер 0
sum(1, ["array", "in", "sum?!?"]); // некорректный аргумент номер 1



// @ КОНТЕКСТ:
function hello () {
  console.log('Hello', this);
}

const maxiMir = {
  name: "Maxim",
  age: 25,
  sayHello: hello
};

maxiMir.sayHello(); // Hello > {name: "Maxim", age: 25, sayHello: f}
window.hello(); // <-> hello(); Hello > Window {postMessage: f, blur: f, focus: f, ...}

this === window; // ! => true


const maxiMir = {
  name: "Maxim",
  age: 25,
  sayHello: hello,
  sayHelloWindow: hello.bind(window), // в () контекст вызова для this
  logInfo: function (job, phone) {
    console.group(`${this.name} info:`); // Заголовок для группы
    console.log(`Name is ${this.name}`);
    console.log(`Age is ${this.age}`);
    console.log(`Job is ${job}`);
    console.log(`Phone is ${phone}`);
    console.groupEnd();
  }
};

const maxCon = {
  name: "Max",
  age: 30
};

// #1 bind:
const fnMaxConInfoLog = maxiMir.logInfo.bind(maxCon, 'Frontend', '8-999-999-99-99');
fnMaxConInfoLog(); // () - т.к. метод bind не вызывает функцию, а возвращает новую // =>

// #2 call:
maxiMir.logInfo.call(maxCon, 'Frontend', '8-999-999-99-99'); // сразу вызывает функцию =>

// #3 apply:
maxiMir.logInfo.apply(maxCon, ['Frontend', '8-999-999-99-99']); // сразу вызывает функцию =>

// Max info:
//      Name is Max
//      Age is 30
//      Job is Frontend
//      Phone is 8-999-999-99-99



// @ Пример задачи с собеседований (создать метод для массивов):
const nums = [1, 2, 3, 4, 5];

Array.prototype.multBy = function(n) {
  return this.map(item => item * n);
};

nums.multBy(2); // [2, 4, 6, 8, 10]



// @ Написать свою функцию bind:
function logPerson() {
  console.log(`Person: ${this.name}, ${this.age}, ${this.job}`);
}

const person1 = {name: 'Maxim', age: 22, job: 'Frontend'};
const person2 = {name: 'John', age: 23, job: 'SMM'};

function bind(context, fn) {
  return (...args) => fn.apply(context, args);
}

bind(person1, logPerson)(); // Person: Maxim, 22, Frontend
bind(person2, logPerson)(); // Person: John, 23, SMM



// @ SETTIMEOUT:

setTimeout(() => { // Web API <-> window.setTimeout(...);
  console.log('Inside timeout, after 2000 seconds');
}, 2000);

// Call Stack
// Web API
// Event Loop
// Callback Queue



// @ PROMISE:
console.log('Request data...');

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('Preparing data...');

    const backendData = {
      server: 'aws',
      port: 2000,
      status: 'working'
    };

    resolve(backendData);
  }, 2000);
});

promise
  .then(data => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        data.modified = true;
        resolve(data);
      }, 2000);
    });
  })
  .then(clientData => {
    clientData.fromPromise = true;

    return clientData; // можно возвращать не только промисы
  })
  .then(data => console.log('Modified', data))
  .catch(err => console.error('Error', err))
  .finally(() => console.log('Finally')); // вызывается в любом случае


// #2 sleep:
const sleep = ms => {
  return new Promise(resolve => {
    setTimeout(() => resolve(), ms)
  });
};

sleep(2000).then(() => console.log('After 2 sec'));
sleep(3000).then(() => console.log('After 3 sec'));


// #3 Promise.all:
Promise.all([sleep(2000), sleep(3000)])
  .then(() => console.log('All promises')); // ждет выполнения всех промисов


// #4 Promise.race:
Promise.race([sleep(2000), sleep(3000)])
  .then(() => console.log('Race promises')); // ждет выполнения первого промиса


// #5 Promise.allSetted:
const p1 = Promise.resolve(1)
const p2 = Promise.reject('my error')
const p3 = Promise.resolve(3)

;(async () => {
  const result = await Promise.allSettled([p1, p2, p3])
})()



// @ ASYNC, AWAIT:
const delay = ms => {
  return new Promise(r => setTimeout(() => r(), ms));
};

const url = 'https://jsonplaceholder.typicode.com/todos';

// #1:
function fetchTodos() {
  console.log('Fetch todo started...');

  return delay(2000)
    .then(() => fetch(url))
    .then(response => response.json())
}


fetchTodos()
  .then(data => {
    console.log('Data:', data)
  })
  .catch(e => console.error(e));


// #2 аналогично через async + await:
async function fetchAsyncTodos() {
  console.log('Fetch todo started...');

  try {
    await delay(2000);
    const response = await fetch(url);
    const data = await response.json();
    console.log('Data:', data);
  } catch (e) {
    console.error(e)
  } finally {

  }
}



// @ Map, Set, WeakMap, WeakSet:
const obj = {
  name: 'Max',
  age: 26,
  job: 'Fullstack'
};

const entries = [
  ['name', 'Max'],
  ['age', 26],
  ['job', 'Fullstack'],
];

Object.entries(obj); // Объект в массив => [['name', 'Max'], ['age', 26], ['job', 'Fullstack']]
Object.fromEntries(entries); // Массив в объект => { name: 'Max', age: 26, job: 'Fullstack' }



// @ Map:
const map = new Map(entries);
map; // { 'name': 'Max', 'age': 26, 'job': 'Fullstack' }
map.get('job'); // Fullstack
map
  .set('newField', 42)
  .set(obj, 'Value of object') // задаем ключ объект
  .set(NaN, 'NaN ??'); // задаем ключ NaN

map.get(obj); // Получаем значение по ключу объекту => Value of object
map.get(NaN); // -> ??
map.delete('job'); // удаляем из map 'job': 'Fullstack'
map.has('job'); // проверяем наличие в map 'job'
map.size // размер карты => 6
map.clear(); // очищаем карту

for (let [key, value] of map) { // итерируем map

}

for (let keys of map.keys()) { // итерация по значениям

}

for (let val of map.values()) { // итерация по значениям

}

map.forEach((val, key, m) => { // итерация через forEach

});

const array = [...map]; // преобразуем map в массив <-> Array.from(map)
const mabObj = Object.fromEntries(map.entries()); // преобразуем map в массив (если ключ объект, то в объекте будет [object Object])


const users = [
  {name: 'Juli'},
  {name: 'Alex'},
  {name: 'Irina'}
];

const visits = new Map();

visits
  .set(users[0], new Date())
  .set(users[1], new Date(new Date().getTime() + 1000 * 60))
  .set(users[2], new Date(new Date().getTime() + 5000 * 60));

const lastVisit = user => visits.get(user)
lastVisit(user[1]); // 2019-09-26T08:33:21.696Z



// @ Set:
const set = new Set([1,2,3,3,4,4,5]); // остаются уникальные значения => {1,2,3,4,5}
set
  .add(10) // добавленые новых элементов в set
  .add(20);

set.has(32); // проверяет на наличие в set элемента => false
set.size(); // размер set => 7
set.delete(1); // удаление элемента из ыet
set.clear(); // очистка set

set.values(); // [Set Iterator] {1,2,3,4,5,10,20}
set.keys(); // [Set Iterator] {1,2,3,4,5,10,20}
set.entries(); // [Set Entries] {[1,1],[2,2],[3,3],[4,4],[5,5],[10,10],[20,20]}

for (let value of set) {

}

const uniqValues = array => [...new Set(array)]; // <-> [Array.from(new Set(array))]




// @ weakMap:
// #1:
let obj = {name: 'weakmap'};
obj = null; // сборщик мусора удалил объект
obj; // null

// #2:
let obj = {name: 'weakmap'};
const arr = [obj];
obj = null; // сборщик мусора удалил объект
obj; // null
arr; // {name: 'weakmap'}

сonst weakMap = new WeakMap([ // позволяет избежать утечки памяти (ключи только объекты)
  [obj, 'obj Data']
]);

// METHODS: // get set delete has

weakMap.has(obj); // true
weakMap.get(obj); // obj Data

obj.null; // сборщик мусора удалил объект obj + удалил obj в weakMap
map.get(obj); // undefined
map // WeakMap { <items> unknown> }

const cache = new WeakMap();

const cacheUser = user => {
  if (!cache.has(user)) {
    cache.set(user, Date.now());
  }

  return cache.get(user);
};

let lena = {name: 'Elena'};
let alex = {name: 'Alex'};

cacheUser(lena);
cacheUser(alex);

lena = null;

// автоматически у WeakMap был удален объект + очищена память
cache.has(lena); // false
cache.has(alex); // true



// @ WeakSet:
const users = [
  {name: 'Elena'},
  {name: 'Alex'},
  {name: 'Irina'}
];

const visits = new WeakSet();

visits
  .add(users[0])
  .add(users[1]);

users.splice(1, 1);
// автоматически у WeakSet был удален объект + очищена память

console.log(visits.has(users[0])); // true
console.log(visits.has(users[1])); // false



// @ VOID:
// интересный способ работы с немедленно вызываемыми функциями:
void function() {
  console.log('What')
}();

// без загрязнения глобального пространства имён:
void function aRecursion(i) {
  if (i > 0) {
    console.log(i--)
    aRecursion(i)
  }
}(3);

console.log(typeof aRecursion); // undefined



// @ for-await-of (ES7-ES9)
// Async function for iteration with 'for-await-of':
const showNames = async = () => {
  for await(name of names) {
    console.log(name);
  }
};

// @ Async generator function (ES7-ES9)
async function* readLines(path) {
  const file = await fileOpen(path);

  try {
    while(!file.EOF) {
      yield await file.readLine();
    }
  } finally {
    await file.close();
  }
}

// @ Async iteration of async generator function results:
for await (const line of readLines(filePath)) {
  console.log(line);
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




/**
 * Программирование с флагами (императивно)
 */

const isFizz = n => n % 3;

const isBuzz = n => n % 5;

const isFizzBuzz = n => isFizz(n) && isBuzz(n);

for (let i = 1; i < 100; i++) {
  switch(true) {
    case isFizzBuzz(i):
      console.log('FizzBuzz');
      break;
    case isFizz(i):
      console.log('Fizz');
      break;
    case isBuzz(i):
      console.log('Buzz');
      break;
    default:
      console.log(i);
  }
}

/**
 * Функциональное программирование
 */

const gen = (n, w) => num => num % n === 0 ? w : '';

const fizz = gen(3, 'Fizz');

const buzz = gen(5, 'Buzz');

[...Array(99).keys()]
    .map(i => i + 1)
    .forEach(i => console.log(fizz(i) + buzz(i) || i));

/**
 * ООП
 */

/*
Категории интерфейсов:

                Num(Число)      Tag (Value Object)  <=  Printer
                    ^                   |
                    |                   v
Condition   =>  Strategy    =>         Rule
                                        |
                                        v
                                    Collection
*/

const MAX_NUM = 100;

class Tag /* implements Value */ {
  constructor(_value) {
    this.value = _value;
  }
}

class Printer {
  constructor(_context) {
    this.context = _context;
  }

  print() {
    console.log(this.context.value);
  }
}

class DivCondition /* implements Condition, Truthy */ {
  constructor(_divider) {
    this.divider = _divider;
  }

  isTruthy(num) {
    return num % this.divider === 0;
  }
}

class AndStrategy /* implements Strategy, Truthy */ {
  constructor(_conditionsOrStrategies) {
    this.conditions = _conditionsOrStrategies;
  }

  isTruthy(num) {
    for(let i in this.conditions) {
      if (!this.conditions[i].isTruthy(num)) {
        return false;
      }
    }

    return true;
  }
}

class TagNumRule /* implements Ruke */ {
  constructor(_tag, _strategy) {
    this.strategy = _strategy;
    this.tag = _tag;
  }

  isSuccess(num) {
    return this.strategy.isTruthy(num);
  }
}

class TagNumRulesCollection /* implements collection */ {
  constructor(_tags) {
    this.tags = _tags
  }

  find(num, defaultValue) {
    for(let i in this.tags) {
      if (this.tags[i].isSuccess(num)) {
        return this.tags[i].tag;
      }
    }

    return defaultValue;
  }
}

const numTags = new TagNumRulesCollection([
  new TagNumRule(new Tag('FizzBuzz'), new AndStrategy([new DivCondition(3), new DivCondition(5)])),
  new TagNumRule(new Tag('Fizz'), new AndStrategy([new DivCondition(3)])),
  new TagNumRule(new Tag('Buzz'), new AndStrategy([new DivCondition(5)]))
]);

for(let i = 1; i < MAX_NUM; i++) {
  new Printer(numTags.find(i, new Tag(i))).print()
}

