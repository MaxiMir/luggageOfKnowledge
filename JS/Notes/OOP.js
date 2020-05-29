// @ ЧТО ТАКОЕ PROTOTYPE:
// #1 добавляем всем объектам метод sayHello:
const maxiMir = {
  name: "Maxim",
  age: 25,
  greet: () => {
    console.log('Greet');
  }
};

maxiMir.sayHello(); // => Uncaught TypeError

Object.prototype.sayHello = () => {
  console.log('Hello!');
};

// цепочка наследования - объект __proto__

maxiMir.sayHello(); // => Hello!



// #2 один из вариантов наследования:
const maxCon = Object.create(maxiMir);
maxCon.age = 30;
maxCon.greet(); // Greet
