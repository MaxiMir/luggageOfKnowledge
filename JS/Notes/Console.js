// #@ КОНСОЛЬ:
// console.count(label) - выводит общее количество вызовов функции:
const sayHello = name => {
  console.count(name); // eсли label не указан, то отображается количество вызовов с параметром по умолчанию.
  console.log(name);
};


// console.warn - выводит в консоли предупреждение:
const sayHello = name => {
  if(!name) {
    console.warn("No name given");
  }
};

// console.table - выводит массивы или объекты в таблице:
const pets = {
  name: "Simon",
  type: "cat"
};

const person = {
  firstName: "Indrek",
  lastName: "Lasn"
};

console.table([pets, person]); // с группировкой

const items = [
  {
    name: "chair",
    inventory: 5,
    unitPrice: 45.99
  },
  {
    name: "table",
    inventory: 10,
    unitPrice: 123.75
  },
  {
    name: "sofa",
    inventory: 2,
    unitPrice: 399.50
  }
];
console.table(items);

// Color
console.log('%cColor of the text is green plus small font size', 'color: green; font-size: x-small');

// Clear
console.clear();

// console.group - вывод вложенных групп
console.log("This is the first level");
console.group();
console.log("Level 2");
console.group();
console.log("Level 3");
console.warn("More of level 3");
console.groupEnd();
console.log("Back to level 2");
console.groupEnd();
console.log("Back to the first level");

// pass object, variable
const userDetails = {"name":"John Miller", "id":2522, "theme":"dark"};
console.log("Hey %s, here is your details %o in form of object", "John", userDetails);

// Memory
console.memory;

// Assertion
const errorMsg = 'Hey! The number is not even';
for (let number = 2; number <= 5; number += 1) {
  console.assert(number % 2 === 0, {number: number, errorMsg: errorMsg});
}

// time and time end
console.time("This");
let total = 0;
for (let j = 0; j < 10000; j++) {
  total += j
}

console.log("Result", total);
console.timeEnd("This");
