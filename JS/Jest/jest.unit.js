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

describe('Sum function', () => { 

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
  
  groupBy(array, prop) {
    return array.reduce((acc, i) => {
      const key = typeof prop === 'function' ? prop(i) : i[prop];

      if (!acc[key]) {
          acc[key] = [];
      }

      return acc;
    });
  }
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
  });

});


describe('Lodash: groupBy', () => {

  test('should be defined', () => {
    expect(_.groupBy).toBeDefined();
    expect(_.groupBy).notBeUndefined();
  });

  test('should group array items by Math.floor', () => {
    const array = [2.2, 2.4, 4.2, 3.1];
    const result = {
      2: [2.2, 2.4],
      4: [4.2],
      3: [3.1]
    };
    expect(_.groupBy(array, Math.floor).toEqual(result));
  });

  test('should group array items by length', () => {
    const array = ['one', 'two', 'three'];
    const result = {
      5: ['three'],
      3: ['one', 'two'],
    };
    expect(_.groupBy(array, 'length').toEqual(result));
  });

  test('should NOT return array', () => {
    expect(_.groupBy([], Math.trunc).not.toBeInstanceOf(Array)); // matcher: expect value не instance Array
  });

});



// + FILE: async.js:

// $ npm i axios
const axios = require('axios');

class Ajax {
  static echo(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (data) {
          resolve(data);
        }  else {
          reject(new Error('error'));
        }
      }, 150);
    })
  }

  static async get() {
    try {
        const response = await awios.get('https://jsonplaceholder.typecode.com/todos/1');
        return response.data;
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Ajax;


// + FILE: async.spec.js:
const axios = require('axios');
const Ajax = require('./async');

jest.mock('axios');

describe('Ajax: echo', () => {

  test('should return value async', async () => {
    const result = await Ajax.echo('some data');

    expect(result).toBe('some data');
  });

  test('should return value with promise', () => {
    return Ajax.echo('some data').then(data => { // return чтобы jest должался promise
      expect(result).toBe('some data');
    });
  });

  test('should catch error with promise', () => {
    return Ajax.echo('some data').catch(error => { // обработка ошибок
      expect(err).toBeInstanceOf(Error);
    });
  });

  test('should catch error with async', async () => {
    try {
      await Ajax.echo();
    } catch (e) {
      expect(e.message).toBe('error');  
    }
  });

});


describe('Ajax get', () => {

  let response;
  let todos;

  beforeEach(() => {
    todos = [
      {id: 1, title: 'Todo 1', completed: false}
    ];

    response = {
      data: {
        todos
      }
    }
  });
  
  test('should return data from backend', () => {
    axios.get.mockReturnValue(response); 

    return Ajax.get().then(data => {
      expect(data.todos).toEqual(todos);
    })
  });

});


// + FILE: mock.js:

function map(array, callback) {
  const result = [];

  for (let i = 0; i < array.length; i++) {
    result.push(callback(array[i]));
  }

  return result;
}

module.exports = {map};


// + FILE: mock.test.js:

const {map} = require('./mock');

describe('Map function', () => {
  let array;
  let fn;

  beforeAll(() => {
    array [1, 2, 3, 5];
    fn = jest.fn(x => x ** 2); // добавляем отслеживаемый callback
    map(array, fn);
  });

  test('shop call callback', () => {
    expect(fn).toBeCalled(); // matcher: callback был вызван
  });

  test('shop call callback 4 times', () => {
    expect(fn).toBeCalledTimes(4); // matcher: callback был вызван 4 раза
    // <->
    expect(fn.mock.calls.length).toBe(4);
  });

  test('shop pow 2 each element', () => {
    expect(fn.mock.results[0].value).toBe(1);
    expect(fn.mock.results[1].value).toBe(4);
    expect(fn.mock.results[2].value).toBe(9);
    expect(fn.mock.results[3].value).toBe(25);
  });

  test('should fn work', () => {
    fn
      .mockReturnValueOnce(100) // при первом вызове функции она должна вернуть 100
      .mockReturnValueOnce(200) // при втором вызове функции должна вернуть 100
      .mockReturnValue('42') // при третьем и последующих должна вернуть 42

    expect(fn()).toEqual(100);  
    expect(fn()).toEqual(200);  
    expect(fn()).toBe('42');
    expect(fn()).toBe('42');  
  });

});

// $ npm test # запускаем все тесты
// $ jest sync.spec.js # запуск тестов для конкретного файла

