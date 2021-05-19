#### FIZZBUZZ ####

**Программирование с флагами (императивно)**

```js
const isFizz = n => n % 3;

const isBuzz = n => n % 5;

const isFizzBuzz = n => isFizz(n) && isBuzz(n);

for (let i = 1; i < 100; i++) {
	switch (true) {
		case isFizzBuzz(i):
			return console.log('FizzBuzz');
		case isFizz(i):
			return console.log('Fizz');
		case isBuzz(i):
			return console.log('Buzz');
		default:
			return console.log(i);
	}
}
```

**Функциональное программирование**

```js
const gen = (n, w) => num => num % n === 0 ? w : '';

const fizz = gen(3, 'Fizz');

const buzz = gen(5, 'Buzz');

[...Array(99).keys()]
	.map(i => i + 1)
	.forEach(i => console.log(fizz(i) + buzz(i) || i));
```

**ООП**
Категории интерфейсов:

                Num(Число)      Tag (Value Object)  <=  Printer
                    ^                   |
                    |                   v

Condition =>  Strategy =>         Rule | v Collection

```js
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
		for (let i in this.conditions) {
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
		for (let i in this.tags) {
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

for (let i = 1; i < MAX_NUM; i++) {
	new Printer(numTags.find(i, new Tag(i))).print()
}
```

#### DUPLICATE ENCODE: ####

The goal of this exercise is to convert a string to a new string where each character in the new string is "(" if that
character appears only once in the original string, or ")" if that character appears more than once in the original
string. Ignore capitalization when determining if a character is a duplicate.
"din"      =>  "((("
"recede"   =>  "()()()"
"Success"  =>  ")())())"
"(( @"     =>  "))(("

```js
const duplicateEncode = word => {
	return word
		.toLowerCase()
		.replace(/./g, m => word.indexOf(m) == word.lastIndexOf(m) ? '(' : ')');
};
```

#### FIND ODD: #### 

Given an array, find the int that appears an odd number of times. There will always be only one integer that appears an
odd number of times.

```js
// #1:
const findOdd = arr => {
	const valuesData = arr.reduce((acc, cur) => {
		!acc[cur] ? acc[cur] = 1 : acc[cur]++;

		return acc;
	}, {});

	return +Object.keys(valuesData).find(key => valuesData[key] % 2 !== 0);
}

// #2:
const findOdd = arr => arr.reduce((a, b) => a ^ b);
```


