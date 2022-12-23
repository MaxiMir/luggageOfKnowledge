### .at():

Метод для индексируемых значений позволяет читать элемент по заданному индексу, как с операторными скобками `[]`. Но, в отличие от операторных скобок, `.at()` поддерживает отрицательные индексы.

* Arrays
```js
const arr = [1, 3, 44, 71, 14, 99]

arr.at(1) // <-> arr[1] // -> 3
arr.at(-1) // <-> arr[arr.length - 1] // -> 99
```
```js
const arr = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

arr.at(-1).at(-1) // <-> arr[arr.length - 1][arr[arr.length - 1].lenght - 1]
```

* Strings

```js
'js'.at(-1) // -> s
```

### Error cause:

Теперь Error и его подклассы позволяют нам уточнять, какая предыдущая ошибка вызвала текущую:

```js
try {
    connectToDatabase()
} catch (err) {
    throw new Error('Connecting to db failed', { cause: err }) // обращение error.cause. Возможно скоро сервисы для анализа ошибок Sentry, bugsnag смогут предоставлять более развернутую информацию по ошибке.

    // передвать можно любую структуру данных.
}
```

### Object.hasOwn(obj, propKey):

безопасный способ проверить, есть ли у объекта obj свое собственное (не наследуемое) свойство с ключом propKey.

```js
const obj = Object.create(null)
obj.name = "object"
obj.hasOwnProperty('name') // ERROR obj.hasOwnProperty is not a function

// Способ избежать ошибки:
const hasOwnProperty = Object.prototype.hasOwnProperty

if (hasOwnProperty.call(obj, 'name')) {
    console.log('has property name')
}

// Через новый статический метод у Object:
Object.hasOwn(obj, 'name')
```

### Приватность:

```js
class Foo {
    #privateField = 'private-field'

    #privateMethod() {
        return this.#privateField
    }

    static #PRIVATE_STATIC_FIELD = 'private-static-field'

    static #privateStaticMethod() {
        return 'private-static-method'
    }

    static hasPrivateField(instance) {    
  	    return #privateField in instance // чекнуть на приватное свойство
    }
}

const foo = new Foo()
Foo.hasPrivateField(foo) // -> true
```
```js
class Foo {
    #value = 0

    get value() {
        return this.#value
    }

    set value(newValue) {
        this.#value = newValue
    }
}
```

### «Глобальный» Await в модулях:

Теперь мы можем использовать await на верхних уровнях модулей — больше не нужно вводить асинхронные функции или методы:

```js
const response = await fetch('https://example.com');
const text = await response.text();
console.log(text);
```

### Пропозал RegExp match indices:

Если мы добавим флаг /d к регулярному выражению, при его использовании создаются объекты соответствия. Они записывают начальный и конечный индекс каждого группового захвата (строки A и B):

```js
const matchObj = /(a+)(b+)/d.exec('aaaabb');

matchObj[1] // -> 'aaaa'
matchObj.indices[1] // [0, 4] - (A)
matchObj[2] // -> 'bb'
matchObj.indices[2] // [4, 6] - (B)
```
