# Генераторы. Symbol iterator, for of: #

```js
function *strGenerator(){
  yield 'Y'
  yield 'E'
  yield 'S'
}

const str = strGenerator()
str.next() // {value: Y, done: false}
str.next() // {value: E, done: false}
str.next() // {value: S, done: false}
str.next() // {value: undefined, done: true}
```

```js
function *numberGen(n = 10) {
  for (let i = 0 i < n i++) {
    yield i
  }
}

const num = numberGen(2)
num.next() // {value: 0, done: false}
num.next() // {value: 1, done: false}
num.next() // {value: undefined, done: true}
```
**Свой генератор:**
```js
// свой генератор:
const iterator = {
  gen(n = 10) { // [Symbol.iterator]
    let i = 0

    return {
      next() {
        if (i < n) {
          return {value: i++, done: false}
        }

        return {value: undefined, done: true}
      }
    }
  }
}

const itr = iterator().gen(2)
itr.next() // {value: 1, done: false}
itr.next() // {value: 2, done: false}
itr.next() // {value: undefined, done: true}
```
**for of:**
```js
// работает с объектами, у которых определено свойство Symbol(Symbol.Iterator)

function *iter(n = 10) { // в function* по умолч. определен Symbol.Iterator
  for (let i = 0 i < n i++) {
    yield i
  }
}

for (let k of iter(6)) {
  console.log(k)
}

// 0
// 1
// 2
// 3
// 4
// 5
```
