### Array find from last

Array find from the last proposal by Wenlu Wang adds findLast() and findLastIndex() methods on Array and TypedArray prototype. They do the same thing as find() and findIndex() but in reverse order. Both methods are handy and let us skip creating temporary duplicates, mutations and confusing index substractions.

```js
const isEven = (number) => number % 2 === 0;
const numbers = [1, 2, 3, 4];

// from first to the last lookup
console.log(numbers.find(isEven));
// 2
console.log(numbers.findIndex(isEven));
// 1

// from last to the first lookup
console.log(numbers.findLast(isEven));
// 4
console.log(numbers.findLastIndex(isEven));
// 3
```

### Hashbang Grammar

Hashbang, also known as a shebang is a sequence of characters at the beginning of an executable script that defines the interpreter for the program to be run on. When the Unix kernel’s program loader executes a JavaScript program, the host strips the hashbang to generate a valid source before passing it down to the engine. Hashbang Grammar proposal by Bradley Farias standardizes how it is done.

```shell
#!/usr/bin/env node

console.log('hi 👋');
```

### Symbols as WeakMap keys

In JavaScript, Objects and Symbols are guaranteed to be unique and cannot be re-created, which makes them both great candidates for the WeakMap keys. Previous versions or specifications allowed only Objects to be used that way, but luckily Symbols as WeakMap keys proposal by Daniel Ehrenberg, Richard Button, Robin Ricard, Leo Balter, Rick Waldron and Caridy Patiño adds non-registered Symbols to the list of allowed keys.

```js
const weak = new WeakMap();
const key = Symbol("ref");
weak.set(key, "ECMAScript 2023");

console.log(weak.get(key));
// ECMAScript 2023
```


### Change Array by Copy

The reverse(), sort() and splice() methods on Array.prototype mutate the array in place. Change Array by Copy proposal by Ashley Claymore and Robin Ricard adds equivalents of those methods that return a new copy — toReversed(), toSorted() and toSpliced(). This proposal also adds a with() method that returns a new array with the element at the given index replaced with the given value to avoid mutations in place using bracket notation.

```js
const original = [1, 2, 3, 4];
const reversed = original.toReversed();

console.log(original);
// [ 1, 2, 3, 4 ]

console.log(reversed);
// [ 4, 3, 2, 1 ]
```

```js
const original = [1, 3, 2, 4];
const sorted = original.toSorted();

console.log(original);
// [ 1, 3, 2, 4 ]

console.log(sorted);
// [ 1, 2, 3, 4 ]
```

```js
const original = [1, 4];
const spliced = original.toSpliced(1, 0, 2, 3);

console.log(original);
// [ 1, 4 ]

console.log(spliced);
// [ 1, 2, 3, 4 ]
```

```js
const original = [1, 2, 2, 4];
const withThree = original.with(2, 3);

console.log(original);
// [ 1, 2, 2, 4 ]

console.log(withThree);
// [ 1, 2, 3, 4 ]
```
