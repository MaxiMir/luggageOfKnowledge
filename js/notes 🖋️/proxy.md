## PROXY

+ [OBJECTS](#OBJECTS)
+ [FUNCTIONS](#FUNCTIONS)
+ [CLASSES](#CLASSES)
+ [WRAPPER](#WRAPPER)
+ [OPTIMIZATION](#OPTIMIZATION)
+ [CHAINING STYLE](#CHAINING_STYLES)
+ [UTIL](#UTIL)

### <a name="OBJECTS"></a> OBJECTS:

```js
const person = {
  name: "Maxim",
  age: 25,
  job: 'Fullstack'
}

const op = new Proxy(person, {
  get(target, prop) { // ловушка на метод get
    console.log('Target', target)
    console.log('Prop', prop)

    return target[prop]
  },
  set(target, prop, value) {
    if (prop in target) {
      target[prop] = value
    } else {
      throw new Error(`No ${prop} field in target`)
    }
  },
  has(target, prop) {
    return ['age', 'name', 'job'].includes(prop)
  },
  deleteProperty(target, prop) {
    console.log('Deleting...', prop)
    delete target.prop

    return true
  }
})

op.age // =>
// Target,  {name: Maxim, age: 25, job: Fullstack}
// Prop, age

op.qqq = 26 // No qqq field in target

'name' in op // true

'age2' in op // false

delete op.age // 'Deleting... age
```

```js
сonst validator = {
  get(target, prop) {
    return prop in target ? target[prop] : `Поля ${prop} в объекте нет`
  },
  set(target, prop, value) {
    if (value.length > 2) {
      Reflect.set(target, prop, value)
    } else {
      console.log("Длина должна быть больше 2х символов")
    }
  }
}

сonst form = {
  login: 'tester',
  password: '12345'
}

const formProxy = new Proxy(form, validator) // следим за объектом form + ловушки
formProxy.login // tester
formProxy.password // 12345
formProxy['username'] // Поля username в объекте нет
formProxy.password = '1' // Длина должна быть больше 2х символов
```

### <a name="FUNCTIONS"></a> FUNCTIONS:

```js
const log = text => `[Log]: ${text}`

const proxy = new Proxy(log, {
  apply(target, thisArg, argArray) { // вызывается при вызове функции log thisArg - контекст argArray - массив переметров
    if (argArray.length === 1) {
      return Reflect.apply(target, thisArg, argArray) // вызываем фунцию
    } else {
      console.log("Количество аргументов не совпадает")
    }
  }
})

proxy() // "Количество аргументов не совпадает"
proxy('TEST')
```

```js
const log = text => `[Log]: ${text}`

const proxy = new Proxy(log, {
  apply(target, thisArg, args) { // отслеживание вызова функции, thisArg - контекст, args - переданные параметры
    console.log('Calling fn...')

    return target.apply(thisArg, args).toUpperCase()
  },
})

proxy()
// Calling fn...
// "LOG: undefined"

proxy('TEST')
// Calling fn...
// "LOG: TEST"
```

### <a name="CLASSES"></a> CLASSES:

```js
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
}

const PersonProxy = new Proxy(Person, {
  construct(target, args) { // отслеживание инициализации класса
    console.log('Construct...')

    return new target(...args)
    // или
    return new Proxy(new target(...args), {
      get(tar, prop) {
        console.log(`Getting prop "${prop}"`)
        return t[prop]
      }
    })
  }
})

const p = new PersonProxy('Maxim', 30)
// Construct...

p.name
// Getting prop name
// "Maxim"
```

### <a name="WRAPPER"></a> WRAPPER:

```js
const withDefaultValue = (target, defaultValue = 0) => {
  return new Proxy(target, {
    get: (obj, prop) => (prop in obj ? obj[prop] : defaultValue)
  })
}

const position = withDefaultValue(
  {
    x: 24,
    y: 42
  },
  0
)

console.log(position) // Proxy, {x: 24, y: 42}
position.x // 24
position.y // 42
position.z // 0
```

### <a name="HIDDEN"></a> HIDDEN:

```js
const withHiddenProps = (target, prefix = '_') => {
  return new Proxy(target, {
    has: (obj, prop) => (prop in obj) && (!prop.startWith(prefix)),
    ownKeys: obj => Reflect.ownKeys(obj).filter(p => !p.startsWith(prefix)), // возвращает массив из ключей
    get: (obj, prop, receiver) => (prop in receiver ? obj[prop] : void 0) // void 0 <-> undefined
  })
}

const data = withHiddenProps({
  name: 'MaxiMir',
  age: 25,
  _uid: '1231231'
})

data // > Proxy {name: MaxiMir, age: 25, _uid: 1231231}
data.age // 25
data._uid // undefined

'_uid' in data // false

for(let key in data) console.log(key)
// name
// age

Object.keys(data) // ['name', 'age']
```

### <a name="OPTIMIZATION"></a> OPTIMIZATION:

```js
const userData = [
  {id: 1, name: 'MaxiMir', job: 'Fullstact', age: 25},
  {id: 2, name: 'Elena', job: 'Student', age: 22},
  {id: 3, name: 'Victor', job: 'Backend', age: 23}
]

// Не подходит для больших объемов данных:
userData.find(user => user.id === 3) // По сути метод является циклом по всему массиву {id: 3, name: 'Victor', job: 'Backend', age: 23}

// Решение в лоб (карта индексов):
const index = {}
userData.forEach(i => (index[i.id] = i))
// 1: {id: 1, name: 'MaxiMir', job: 'Fullstact', age: 25},
// 2: {id: 2, name: 'Elena', job: 'Student', age: 22},
// 3: {id: 3, name: 'Victor', job: 'Backend', age: 23},
index[2] // {id: 2, name: 'Elena', job: 'Student', age: 22}

// ! Right Way:
const IndexedArray = new Proxy(Array, {
  construct(target, [args]) {
    const index = {}
    args.forEach(item => (index[item.id] = item))

    return new Proxy(target(...args), {
      get(arr, prop) {
        switch(prop) {
          case 'push':
            return item => {
              index[item.id] = item
              arr[prop].call(arr, item)
            }
          case 'findById':
            return id => index[id]
          default:
            return arr[prop]
        }
      }
    })
  }
})

const users = new IndexedArray([
  {id: 1, name: 'MaxiMir', job: 'Fullstact', age: 25},
  {id: 2, name: 'Elena', job: 'Student', age: 22},
  {id: 3, name: 'Victor', job: 'Backend', age: 23}
])

users.push({id: 7, name: 'John', job: 'Student', age: 22})
users.findById(7) // {id: 7, name: 'John', job: 'Student', age: 22}
```

### <a name="CHAINING_STYLES"></a> CHAINING STYLES:

```js
const styleProxy = {
  get: (object, property) => {
    return value => {
      if (!value) {
        return object[property]
      }

      object[property] = value
    
      return new Proxy(object, styleProxy)
    }
  }
}

const style = (selector) => {
  let element = document.querySelector(selector)

  return new Proxy(element.style, styleProxy)
}

// use:
style(".menu")      // Returns the style object in a Proxy
  .color("#fff")           // Updates color and returns a Proxy
  .backgroundColor("#000") // Updates bgColor and returns a Proxy
  .opacity("1")           // ... and so on so forth
```

### <a name="UTIL"></a> UTIL:

```js
const util = new Proxy({}, {
  get(_, key) {
    return (target, ...args) => {
      return !target[key].call ? target[key]: target[key](...args)
    }
  }
})

util.trim('TRIMMED STRING  ')
util.length('HOW MANY SYMBOLS?')
```
