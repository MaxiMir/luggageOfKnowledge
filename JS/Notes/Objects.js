// @ РАБОТА С ОБЪЕКТАМИ:
Object.is(20, 20); // проверяет на эквивалентность 2 значения => true

const first = {a: 1};
const second = {b: 2};
const obj = Object.assign({}, first, second); // объединяет объект => {a: 1, b: 2}
Object.entries(obj); // => [['a', 1], ['b', 2]]
Object.keys(obj); // => ['a', 'b']
Object.values(obj); // => [1, 2]


// @ Object.create:
const person = Object.create(
  { // прототип:
    calculateAge() {
      console.log('Age:', new Date().getFullYear() - this.birthYear);
    }
  },
  {
    name: {
      value: 'MaxiMir',
      enumerable: true, // !#1
      writable: true, // !#2
      configurable: true // !#3
    },
    birthYear: {
      value: 1988,
      enumerable: true, // !#1
      writable: true // !#2
    },
    age: {
      get() {
        return new Date().getFullYear() - this.birthYear;
      },
      set(value) {
        document.body.style.background = 'red';
        console.log('Set age', value)
      }
    }
  }
);

const person2 = { name: 'MaxiMir', birthYear: 1988 };

for (let key in person) {
  if (person.hasOwnProperty(key)) { // собственный ключ объекта (не прототип)
    console.log('Key', key); // => #1 Ничего не выведет без enumerable
  }
}

// объект без прототипа
const data = Object.create(null);
data.text = "Привет";

alert(data.text); // Привет
alert(data.toString); // undefined


for (let key in person2) {
  console.log('Key', key); // => Key name \n Key birthYear
}

person.name = 'John'; // !#2 Нельзя будет изменить без writable
console.log('Name', person.name); // => MaxiMir

delete person.birthYear // !#3 Нельзя будет удалить по ключу из объекта без configurable

person.age; // => 30
person.age = 100;
person.calculateAge(); // => 30



// @ Object.defineProperty:

// Свойство-константа:
const user = {};

Object.defineProperty(user, "name", {
  value: "Вася",
  writable: false, // запретить присвоение "user.name="
  configurable: false // запретить удаление "delete user.name"
});


const user = {
  name: "Вася",
  toString: function() { return this.name; }
};

// Помечаем toString как не подлежащий перебору в for..in
Object.defineProperty(user, "toString", { enumerable: false }); // модифицируем настройки у существующего toString.

for(var key in user) console.log(key);  // name


Object.keys; // возвращает только enumerable-свойства.
Object.getOwnPropertyNames; // возвращает все



// # Object.fromEntries - метод возвращает массив собственных перечисляемых свойств указанного объекта в формате [key, value]
const students = {
  amelia: 20,
  beatrice: 22,
  cece: 20,
  deirdre: 19,
  eloise: 21
};

// convert to array in order to make use of .filter() function:
const overTwentyOne = Object.entries(students).filter(([name, age]) => {
  return age >= 21
});
// => [ [ 'beatrice', 22 ], [ 'eloise', 21 ] ]


// turn multidimensional array back into an object
const DrinkingAgeStudents = Object.fromEntries(overTwentyOne);
// => { beatrice: 22, eloise: 21 }

/*
It is important to note that arrays and objects are different data structures for a reason. There are certain cases in which switching between the two will cause data loss. The example below of array elements that become duplicate object keys is one of them.
When using these functions make sure to be aware of the potential side effects.
*/


// immutable operations
const big = {
  foo: 'value Foo',
  bar: 'value Bar'
};

const { foo, ...small } = big;
foo = '';
small; // => { bar: 'value Bar' }



// @ DESTRUCTURING DYNAMIC PROPERTIES:
function greet(obj, nameProp) {
  const { [nameProp]: name = 'Unknown' } = obj;

  return `Hello, ${name}!`;
}

greet({ name: 'Batman' }, 'name'); // => 'Hello, Batman!'
greet({ }, 'name'); // => 'Hello, Unknown!'


// @ ОПЦИОНАЛЬНЫЕ ПОСЛЕДОВАТЕЛЬНОСТИ (OPTIONAL CHAINING)

const someObj = {
  property: 'prop',
  otherProperty: {
    name: 'prop2'
  }
};
const property = someObj.NotOtherProperty?.name;
console.log(property); // undefined



// @ Object.get (ES7-ES9)
Object.getOwnPropertyDescriptor(person, 'age') // -> полную конфигурацию конкретного поля
// { value: 30m writable: true, enumerable: true, configurable: true }
Object.getOwnPropertyDescriptors(person) // -> полную конфигурация всех полей
Object.defineProperties({}, Object.getOwnPropertyDescriptors(person)); // клонирование объекта (сохраяет геттеры и сеттеры)
