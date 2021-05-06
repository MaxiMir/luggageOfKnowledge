# КОНСОЛЬ #

+ [console.count](#consoleCount)
+ [console.warn](#consoleWarn)
+ [console.count](#consoleCount)
+ [console.table](#consoleTable)
+ [color](#color)
+ [clear](#clear)
+ [console.group](#consoleGroup)
+ [pass object, variable](#passObjectVariable)
+ [memory](#memory)
+ [assertion](#assertion)
+ [time](#time)

### <a name="consoleCount"></a> console.count:
```js
// console.count(label) - выводит общее количество вызовов функции:
const sayHello = name => {
  console.count(name); // eсли label не указан, то отображается количество вызовов с параметром по умолчанию.
  console.log(name);
};
```

### <a name="consoleWarn"></a> console.warn:
```js
// console.warn - выводит в консоли предупреждение:
const sayHello = name => {
  if(!name) {
    console.warn("No name given");
  }
};
```
### <a name="consoleTable"></a> console.table:
```js
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
```
### <a name="color"></a> color:
```js
// Color
console.log('%cColor of the text is green plus small font size', 'color: green; font-size: x-small');
```
### <a name="clear"></a> clear:
```js
// Clear
console.clear();
```
### <a name="consoleGroup"></a> console.group:
```js
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
```

### <a name="passObjectVariable"></a> pass object, variable:
```js
const userDetails = {"name":"John Miller", "id":2522, "theme":"dark"};
console.log("Hey %s, here is your details %o in form of object", "John", userDetails);
```

### <a name="memory"></a> memory:
```js
console.memory;
```

### <a name="assertion"></a> assertion:
```js
const errorMsg = 'Hey! The number is not even';

for (let number = 2; number <= 5; number += 1) {
  console.assert(number % 2 === 0, {number: number, errorMsg: errorMsg});
}
```

### <a name="time"></a> time and time end:
```js
console.time("This");
let total = 0;
for (let j = 0; j < 10000; j++) {
  total += j
}

console.log("Result", total);
console.timeEnd("This");
```
