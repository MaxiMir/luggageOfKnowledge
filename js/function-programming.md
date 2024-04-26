### Композиция (compose):

```js
function sortArr(arr) {
  return [...arr].sort()
}

function compact(arr) {
  return arr.filter(notEmpty)
}

function notEmpty(item) {
  return item !== undefined && item !== null
}

function compose(...functions) {
  return (arg) => {
    return functions.reduceRight((acc, fn) => fn(acc), arg)
  }
}

const compactSortedArray = compose(sortArr, compact)

compactSortedArray([1, 3, null]) // -> [1, 3]
```

### Каррирование и частичное применение:

```js
function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
        return func.apply(this, args)
    }

    return (...argsNext) => {
      return curried.apply(this, args.concat(argsNext))
    }
  }
}

const sum = (a, b, c) => a + b + c
const curriedSum = curry(sum)

curriedSum(5)(4)(3) // -> 12
```

### Контейнер:

```js
// Контейнер является функтором
// Функтор - класс типов, для которых определен map и выполняется ряд правил:
// x.map(f).map(g) = f(g(x) - закон композиции
// x.map(value => value) = x - закон идентичности
// map - применяет функцию к внутреннему состоянию, сохраняя при этом свою структуру и поведение
class Container {
  constructor(x) { // На TS делаем private constructor (для закрытия от внешнего использования)
    this.$value = x
  }

  static of(x) {
    return new Container(x)
  }

  map(f) {
    return Container.of(f(this.$value))
  }

  toValue() {
    return this.$value
  }
}

// Использование:

Container.of(5)
  .map(x => x + 5)
  .map(x => x * 10)
  .toValue() // -> 100
```

### Монада:

```js
// Монада проверяюшая на null/undefined
class Maybe {
  constructor(x) { // На TS делаем private constructor (для закрытия от внешнего использования)
    this.$value = x
  }

  static of(x) {
    return new Maybe(x)
  }

  // Монада является функтором, поэтому должна реализовывать метод map
  map(f) {
    return this.isNothing ? this : Maybe.of(fn(this.$value))
  }

  get isNothing() {
    return this.$value === null || this.$value === undefined
  }

  orElse(defaultValuie, fn) {
    return this.isNothing ? Maybe.of(defaultValuie) : this.map(f)
  }
}

// Использование:

// 🚫 Без Maybe
function getPlayerRating() {
  const users = getUsers()

  if (!users) return

  const player = getLatestPlayer(users)

  if (!player) return

  return getGating(player)
}

// ✅ C Maybe:

function getPlayerRating() {
  return Maybe.of(getUsers())
    .map(getLatestPlayer)
    .map(getGating)
}

// С orElse:
Maybe.of(getUsers())
  .orElse({ name: 'Kate' }, getLatestPlayer)
  .map(getGating)
```

Другие монады:

**Either** - Монада условное ветвление/обработка ошибок

**Future** - тоже самое что и промисы

**IO monad** - монада для сайд эффектов. Отделяем саму операцию от вызова. Запускаем через run()

### Аппликативный функтор:

```js
class Maybe {
  constructor(x) { // На TS делаем private constructor (для закрытия от внешнего использования)
    this.$value = x
  }

  static of(x) {
    return new Maybe(x)
  }

  map(f) {
    return this.isNothing ? this : Maybe.of(fn(this.$value))
  }

  ap(functor) {
    return functor.map(this.$value)
  }
}

Maybe
  .of(curriedSum) // пробрасываем не значение, а функцию $value = функция от 2 аргументов
  .ap(Maybe.of(25)) // передаем первый функтор в ap $value = функция от 1 аргумента
  .ap(Maybe.of(7)) // передаем второй функтор $value = 32


Maybe.of(curriedSum).ap(Maybe.of(25)).ap(Maybe.of(7))
// ====
Maybe.of(25).map(curriedSum).ap(Maybe.of(7))
```
