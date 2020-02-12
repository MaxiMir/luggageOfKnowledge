// TDD - test-driven development
// BDD - behavior-driven development

/**
  $ npm init
  test command: npm jest
 
  $ npm i -D jest
 
 // Webstorm -> Preferences -> Languages & Frameworks -> Javascript -> Libraries -> Add @types/jest
*/

// Своя реализация:
function expect(value) {
  return {
    toBe: exp => {
      if (value === exp) {
        console.log('Success');
      } else {
        console.log(`Value is ${value}, but expectation is ${exp}`);
      }
    }
  }
}

expect(sum(41, 1)).toBe(42); // => Success
expect(sum(41, 1)).toBe(43); // => Value is 42, but expectation is 43


// + FILE: intro.js:
const sum = (a, b) => a + b;
const nativeNull = () => null;

module.exports = { sum, nativeNull };

// + FILE: intro.test.js (test или spec):
const {sum, nativeNull} = require('./intro');

describe('Sum function', () => { //
  test('should return sum of two values', () => {
    expect(sum(1, 3)).toBe(4); // matcher для примитивов: expect value === 4
    expect(sum(1, 3)).toEqual(4); // matcher для массивов и объектов: expect value === 4
  });
  
  test('should return value correctly comparing to other', () => {
    expect(sum(2, 3)).toBeGreatherThan(4); // matcher: expect value > 4
    expect(sum(2, 3)).toBeGreatherThanOrEqual(5); // matcher: expect value >= 5
    expect(sum(2, 3)).toBeLessThan(10); // matcher: expect value < 10
    expect(sum(2, 3)).toBeLessThanOrEqual(5); // matcher: expect value <= 5
  });
  
  test('should sum 2 float values correctly', () => {
    expect(sum(0.1, 0.2)).toBeCloseTo(0.3); // matcher: expect value близок к 0.3
  });
});

describe('Native null function', () => {
  test('should return false value null', () => {
    expect(nativeNull()).toBeNull(null); // matcher: expect value is null
    expect(nativeNull()).toBeFalsy(); // undefined, null, 0, ''
    expect(nativeNull()).toBeDefined(); // определенное значение
    expect(nativeNull()).not.toBeTruthy(); // не true значения
    expect(nativeNull()).not.toBeUndefined(); // не undefined
  });
});

// + FILE: sync.js:
class Lodash {
  compact(array) {
    return array.filter(val => !!val);
  }
  
  groupBy(array, prop) {}
}

module.exports = Lodash;

// + FILE: intro.spec.js:
const Lodash = require('./sync');

describe('Lodash: compact', () => {
  
  let _ = new Lodash;
  let array;
  
  beforeEach(() => {  // вызывается перед каждым тестом
    array = [false, 42, 0, '', true, null, 'hello'];
  });
  
  beforeAll(() => { // вызывается перед первым тестом
  
  });
  
  afterEach(() => { // вызывается после каждого теста
  
  });
  
  afterAll(() => {  // вызывается после всех тестов
    _ = new Lodash;
  });
  
  test('should be defined', () => {
    expect(_.compact()).toBeDefined();
    expect(_.compact()).not.toBeUndefined();
  });
  
  test('should working array be editable', () => {
    array.push(...['one', 'two']);
    expect(array).toContain('one');
    expect(array).toContain('two');
  });
  
  test('should remove falsy values from array', () => {
    const result = [42, true, 'hello'];
    expect(_.compact(array)).toEqual(result);
  });
  
  test('should NOT contain falsy values', () => {
    expect(_.compact(array)).not.toContain(false); // matcher: expect value не содержит false
    expect(_.compact(array)).not.toContain(0); // matcher: expect value не содержит 0
    expect(_.compact(array)).not.toContain(''); // matcher: expect value не содержит ''
    expect(_.compact(array)).not.toContain(null); // matcher: expect value не содержит null
  })
});


// $ npm test # запускаем все тесты
// $ jest sync.spec.js # запуск тестов для конкретного файла

