// @ ТИП ДАННЫХ СИМВОЛ (Symbol)

// #1:
const myPrivateMethod = Symbol();
this[myPrivateMethod] = function() {/* */};

/**
 Когда символ используется как идентификатор в присваивании свойства, свойство (например, символ) является анонимным; а также не исчислимым. Поскольку свойство не исчислимо, оно не будет отображаться в цикле «for (... in ...)», и поскольку свойство является анонимным, оно не будет отображаться в массиве результатов "Object.getOwnPropertyNames ()". Доступ к этому свойству можно получить с помощью исходного значения символа, создавшего его, или путем итерирования в массиве результатов «Object.getOwnPropertySymbols ()». В предыдущем примере кода доступ к свойству будет осуществляться через значение, которое было сохранено в переменной myPrivateMethod.
 */

// #2:
const symbol = Symbol('demo');
const other = Symbol('demo');

symbol === other; // => false

const obj = {
  name: 'Max',
  [symbol]: 'meta'
};

obj[symbol]; // => meta


// #3:
const integers = [1, 2, 3];
const iter = integers[Symbol.iterator](); // аналогично и для строк
iter.next(); // => {value: 1, done: false}
iter.next(); // => {value: 2, done: false}
iter.next(); // => {value: 3, done: false}
iter.next(); // => {value: undefined, done: true}

// <-> for of для объектов, для которых определен Symbol.iterator

const countries = {
  values: ['ru', 'kz', 'ua'],
  [Symbol.iterator]() { // описываем итератор для for of
    let i = 0;

    return {
      next: () => {
        const value = this.values[i];
        i++;
        return {
          done: i > this.values.length,
          value
        }
      }
    }
  }
};

for (let item of countries) {
  console.log(item);
}



// #@ DESTRUCTURING ITERABLES:
const movies = {
  list: [
    { title: 'Heat' },
    { title: 'Interstellar' }
  ],
  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => {
        if (index < this.list.length) {
          const value = this.list[index++].title;
          return { value, done: false };
        }

        return { done: true };
      }
    };
  }
};

const [firstMovieTitle] = movies;
console.log(firstMovieTitle); // => 'Heat'
