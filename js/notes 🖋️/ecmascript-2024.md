### Object.groupBy

Object.groupBy группирует элементы по произвольному ключу

```js
const array = [1, 2, 3, 4, 5];

Object.groupBy(array, (num, index) => num % 2 === 0 ? 'even' : 'odd');
// -> { odd: [1, 3, 5], even: [2, 4] }
```

### Map.groupBy

Map.groupBy возвращает элементы в виде Map и полезен для группировки с использованием ключа объекта

```js
const odd = { odd: true };
const even = { even: true };

Map.groupBy(array, (num, index) => num % 2 === 0 ? even : odd);
// -> { { odd: true }: [1, 3, 5], { even: true }: [2, 4] }
```

### Promise.withResolves

```js
const { promise, resolve, reject } = Promise.withResolvers();

setTimeout(() => resolve('test'), 5000);

const response = await promise; 

console.log('response ->', response);
```
