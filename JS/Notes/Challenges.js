// ===> @ FIZZBUZZ

// Программирование с флагами (императивно)
const isFizz = n => n % 3;

const isBuzz = n => n % 5;

const isFizzBuzz = n => isFizz(n) && isBuzz(n);

for (let i = 1; i < 100; i++) {
    switch(true) {
        case isFizzBuzz(i):
            console.log('FizzBuzz');
            break;
        case isFizz(i):
            console.log('Fizz');
            break;
        case isBuzz(i):
            console.log('Buzz');
            break;
        default:
            console.log(i);
    }
}

// Функциональное программирование
const gen = (n, w) => num => num % n === 0 ? w : '';

const fizz = gen(3, 'Fizz');

const buzz = gen(5, 'Buzz');

[...Array(99).keys()]
    .map(i => i + 1)
    .forEach(i => console.log(fizz(i) + buzz(i) || i));

// ООП
/*
Категории интерфейсов:

                Num(Число)      Tag (Value Object)  <=  Printer
                    ^                   |
                    |                   v
Condition   =>  Strategy    =>         Rule
                                        |
                                        v
                                    Collection
*/
const MAX_NUM = 100;

class Tag /* implements Value */ {
    constructor(_value) {
        this.value = _value;
    }
}

class Printer {
    constructor(_context) {
        this.context = _context;
    }

    print() {
        console.log(this.context.value);
    }
}

class DivCondition /* implements Condition, Truthy */ {
    constructor(_divider) {
        this.divider = _divider;
    }

    isTruthy(num) {
        return num % this.divider === 0;
    }
}

class AndStrategy /* implements Strategy, Truthy */ {
    constructor(_conditionsOrStrategies) {
        this.conditions = _conditionsOrStrategies;
    }

    isTruthy(num) {
        for(let i in this.conditions) {
            if (!this.conditions[i].isTruthy(num)) {
                return false;
            }
        }

        return true;
    }
}

class TagNumRule /* implements Ruke */ {
    constructor(_tag, _strategy) {
        this.strategy = _strategy;
        this.tag = _tag;
    }

    isSuccess(num) {
        return this.strategy.isTruthy(num);
    }
}

class TagNumRulesCollection /* implements collection */ {
    constructor(_tags) {
        this.tags = _tags
    }

    find(num, defaultValue) {
        for(let i in this.tags) {
            if (this.tags[i].isSuccess(num)) {
                return this.tags[i].tag;
            }
        }

        return defaultValue;
    }
}

const numTags = new TagNumRulesCollection([
    new TagNumRule(new Tag('FizzBuzz'), new AndStrategy([new DivCondition(3), new DivCondition(5)])),
    new TagNumRule(new Tag('Fizz'), new AndStrategy([new DivCondition(3)])),
    new TagNumRule(new Tag('Buzz'), new AndStrategy([new DivCondition(5)]))
]);

for(let i = 1; i < MAX_NUM; i++) {
    new Printer(numTags.find(i, new Tag(i))).print()
}



// ===> @ CHAINING FUNCTION WITH TDD:
const sum = a => {
    a = parseInt(a) || 0;
    console.log(a);

    return n => sum(a + n);
}



// ===> @ FETCH ITERATOR:
/**
 Есть RESTful API, куда можно отправлять HTTP GET запрос раз в 500 ms только.
 Есть очередь из 100 подобных запросов.
 Нужна также статистика по удавшимся и неудавшимся запросам.
 */

// @1:
const fetchIterator = {
    urls: [],
    delay: 500,
    setUrls(urls) {
        this.urls = urls;
    },
    setDelay(delay) {
        this.delay = delay;
    },
    [Symbol.asyncIterator]() {
        return {
            urls: this.urls,
            delay: this.delay,
            current: 0,
            last: this.urls.length - 1,

            async next() {
                let isSuccess = true;
                const currentDelay = !this.current ? 0 : this.delay;

                if (this.current > this.last) {
                    return {done: true};
                }

                const url = this.urls[this.current];

                await new Promise(resolve => setTimeout(async () => {
                    try {
                        await fetch(url);
                    } catch {
                        isSuccess = false;
                    } finally {
                        resolve();
                    }
                }, currentDelay));

                this.current++;
                return {done: false, value: isSuccess};
            }
        }
    }
};

(async () => {
    const result = {success: 0, error: 0};
    const urls = Array(100).fill('https://jsonplaceholder.typicode.com/posts');

    fetchIterator.setUrls(urls);

    for await (const isSuccess of fetchIterator) {
        const resultType = isSuccess ? 'success' : 'error';
        result[resultType]++;
    }

    console.log(`%cRESULT:`, 'color: green; font-size: small', result);
})();


// @2:
const urls = Array(100).fill('https://jsonplaceholder.typicode.com/posts');
const delay = 500;
let intervalId;
let success = 0;
let failed = 0;
let fetchedUrls = [...urls];

const fetcher = () => {
    const [url, ...restUrls] = fetchedUrls

    const onSuccess = () => {
        success += 1;
    }

    const onError = () => {
        failed += 1;
    }

    const onFinally = () => {
        fetchedUrls = restUrls;

        if (!fetchedUrls.length) {
            clearInterval(intervalId);
            console.log(`%cSUCCESS:`, 'color: green; font-size: small', success);
            console.log(`%cERRORS:`, 'color: red; font-size: small', failed);
        }
    }

    try {
        fetch(url)
            .then(onSuccess)
            .catch(onError)
            .finally(onFinally)
    } catch {
        onError();
    }
}

intervalId = setInterval(fetcher, delay);



// ===> @ DUPLICATE ENCODE:
/**
 The goal of this exercise is to convert a string to a new string where each character in the new string is "(" if that character appears only once in the original string, or ")" if that character appears more than once in the original string.
 Ignore capitalization when determining if a character is a duplicate.
 "din"      =>  "((("
 "recede"   =>  "()()()"
 "Success"  =>  ")())())"
 "(( @"     =>  "))(("
 */

const duplicateEncode = word => {
    return word
        .toLowerCase()
        .replace(/./g, m => word.indexOf(m) == word.lastIndexOf(m) ? '(' : ')');
};




// ===> @ FIND ODD:
/**
 Given an array, find the int that appears an odd number of times.
 There will always be only one integer that appears an odd number of times.
 */

// #1:
const findOdd = arr => {
    const valuesData = arr.reduce((acc, cur) => {
        !acc[cur] ? acc[cur] = 1 : acc[cur]++;

        return acc;
    }, {});

    return + Object.keys(valuesData).find(key => valuesData[key] % 2 !== 0);
}

// #2:
const findOdd = arr => arr.reduce((a, b) => a ^ b);
