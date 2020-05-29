// @ ОКРУГЛЕНИЕ:
~~9.7 === 9 // true <-> Math.floor(9.7)



// @ ПРОВЕРКА НА ЦЕЛОЕ ЧИСЛО:
const isInteger = num => (num ^ 0) === num; // ^ исключающее ИЛИ



// @ ПРОВЕРКА НА ЧЕТНОЕ ЧИСЛО:
const isEven = num => num & 1 // "&" (бинарное и). Оператор "&" сравнивает операнды как бинарные значения.



// @ ДВОИЧНЫЕ И ВОСЬМЕРИЧНЫЕ ЛИТЕРАЛЫ В ES6:

const binaryZero = 0b0;
const binaryOne  = 0b1;
const binary255  = 0b11111111;
const binaryLong = 0b111101011101101;

// Pizza toppings
const olives    = 0b0001;
const ham       = 0b0010;
const pineapple = 0b0100;
const artechoke = 0b1000;

const pizza_ham_pineapple = pineapple | ham;
const pizza_four_seasons  = olives | ham | artechoke;



// @ Number.isNaN()
/**
 Не путать с window.isNaN(), это новый метод с гораздо более интуитивным поведением.
 У классического isNaN есть несколько интересных хитростей:
 */
isNaN(NaN)        === true
isNaN(null)       === false
isNaN(undefined)  === true
isNaN({})         === true
isNaN('0/0')      === true
isNaN('hello')    === true

// Эту проблему решает новый статический метод Number.isNaN(). Он раз и навсегда возвращает равенство аргументов, переданных ему и NaN. Это абсолютно однозначно:

Number.isNaN(NaN) === true
Number.isNaN(null)      === false
Number.isNaN(undefined) === false
Number.isNaN({})        === false
Number.isNaN('0/0')     === false
Number.isNaN('hello')   === false



// @ НЕТОЧНЫЕ ВЫЧИСЛЕНИЯ:
alert( 0.1 + 0.2 ); // 0.30000000000000004
/**
 Всё дело в том, что в стандарте IEEE 754 на число выделяется ровно 8 байт(=64 бита), не больше и не меньше.

 Число 0.1 (одна десятая) записывается просто в десятичном формате. Но в двоичной системе счисления это бесконечная дробь, так как единица на десять в двоичной системе так просто не делится. Также бесконечной дробью является 0.2 (=2/10).

 Когда мы складываем 0.1 и 0.2, то две неточности складываются, получаем незначительную, но всё же ошибку в вычислениях.
 */

alert(9999999999999999); // выведет 10000000000000000

/**
 Причина та же – потеря точности.

 Из 64 бит, отведённых на число, сами цифры числа занимают до 52 бит, остальные 11 бит хранят позицию десятичной точки и один бит – знак. Так что если 52 бит не хватает на цифры, то при записи пропадут младшие разряды.
 */



// @ ГЕНЕРАЦИЯ СЛУЧАЙНОГО ЦЕЛОГО ЧИСЛА МЕЖДУ MIN И MAX:
/**
 Напишите функцию randomInteger(min, max) для генерации случайного целого числа между min и max, включая min,max как возможные значения.

 Любое число из интервала min..max должно иметь одинаковую вероятность.
 */

const randomInteger = (min, max) => {
  const rand = min + Math.random() * (max + 1 - min);

  return Math.floor(rand);
};



// @ Big Int
Number.MAX_SAFE_INTEGER
typeof 10 // number
typeof 10n // bigint
typeof -10n // bigint
BigInt(4) // приведение к bigint -> 4n
