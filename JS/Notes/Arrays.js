// #@ Методы массивов find и findIndex:
const people = [
  { name: "Макс", age: 25, budget: 40000},
  { name: "Игорь", age: 21, budget: 80000}
];
const igor = people.find(person => person.name === 'Игорь'); // { name: "Игорь", age: 21, budget: 80000},
const igorIndex = people.findIndex(person => person.name === 'Игорь'); // 1



// #@ Array.prototype.flat - возвращает новый массив, в котором все элементы вложенных подмассивов были рекурсивно "подняты" на указанный уровень depth:
const courseStudents = [
  [ 'Janet', 'Martha', 'Bob', [ 'Phil', 'Candace' ] ],
  [ 'Wilson', 'Taylor' ],
  [ 'Edith', 'Jacob', 'Peter', 'Betty' ]
];

const flattenOneLevel = courseStudents.flat()
console.log(flattenOneLevel)
// [
//   'Janet',
//   'Martha',
//   'Bob',
//   [ 'Phil', 'Candace' ],
//   'Wilson',
//   'Taylor',
//   'Edith',
//   'Jacob',
//   'Peter',
//   'Betty'
// ]

const flattenTwoLevels = courseStudents.flat(2) // Infinity - для неизвестной глубины
console.log(flattenTwoLevels)
// [
//   'Janet',   'Martha',
//   'Bob',     'Phil',
//   'Candace', 'Wilson',
//   'Taylor',  'Edith',
//   'Jacob',   'Peter',
//   'Betty'
// ]



// #@ Array.prototype.flatMap - сначала применяет функцию к каждому элементу, а затем преобразует полученный результат в плоскую структуру и помещает в новый массив:
const grades = [78, 62, 80, 64]

const flatMapped = grades.flatMap(grade => [grade, grade + 7]);
// [
//  78, 85, 62, 69,
//  80, 87, 64, 71
// ]



// #@ access array item (with default value)
const colors = [];
const [, secondColor = 'black'] = colors;



// @ УБРАТЬ ИЗ МАССИВА ПЕРЕДАННЫЕ ОСТАЛЬНЫМИ АРГУМЕНТАМИ ЭЛЕМЕНТЫ:
const filterArr = (a, ...args) => a.filter(i => !args.includes(i));
filterArr([1, 2, 3, 4, 5, 6, 7], 1, 3, 5, 6); // => [2, 4, 7]
