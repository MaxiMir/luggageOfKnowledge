// @ OBJECTS:
Object.is(20, 20); // проверяет на эквивалентность 2 значения => true

const first = { a: 1 };
const second = { b: 2 };
const obj = Object.assign({}, first, second); // объединяет объект => {a: 1, b: 2}



// @ Object.fromEntries - метод возвращает массив собственных перечисляемых свойств указанного объекта в формате [key, value]
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
}); // => [ [ 'beatrice', 22 ], [ 'eloise', 21 ] ]

// turn multidimensional array back into an object
const DrinkingAgeStudents = Object.fromEntries(overTwentyOne); // => { beatrice: 22, eloise: 21 }



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


// @ __proto__ (not recommend):
// I recommend to avoid the pseudo-property __proto__: not all objects have it.
const proto = {
  protoProp: 'a'
}
const someObj = {
  __proto__: proto,
  someObjProp: 'b'
}

assert.equal(someObj.protoProp, 'a') // true

// @ ОБЪЕКТ БЕЗ ПРОТОТИПА
const data = Object.create(null);
data.text = 'Привет';

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

Object.defineProperty(user, 'name', {
  value: 'Вася',
  writable: false, // запретить присвоение "user.name="
  configurable: false // запретить удаление "delete user.name"
});


const user = {
  name: 'Вася',
  toString: function () {
    return this.name;
  }
};

// Помечаем toString как не подлежащий перебору в for..in
Object.defineProperty(user, 'toString', { enumerable: false }); // модифицируем настройки у существующего toString.

for (var key in user) console.log(key);  // name


Object.keys; // возвращает только enumerable-свойства.
Object.getOwnPropertyNames; // возвращает все



// @ DESTRUCTURING DYNAMIC PROPERTIES:
function greet(obj, nameProp) {
  const { [nameProp]: name = 'Unknown' } = obj;

  return `Hello, ${ name }!`;
}

greet({ name: 'Batman' }, 'name'); // => 'Hello, Batman!'
greet({}, 'name'); // => 'Hello, Unknown!'



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



// @ NULLABLE
const values = {
  undefined: undefined,
  null: null,
  false: false,
  zero: 0,
  empty: ''
}

values.undefined ?? 'default undefined' // default undefined
values.null ?? 'default null' // default null
values.false ?? 'default false' // false
values.zero ?? 'default zero' // 0
values.empty ?? 'default empty' // ''


// @ Freezing objects:
const frozen = Object.freeze({x: 2, y: 5})

assert.throws(
    () => {
      frozen.x = 3
    },
    {
      name: 'TypeError',
      message: /^Cannot assing to read only property 'x'/
    }
)