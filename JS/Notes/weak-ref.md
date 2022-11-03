# WeakRef

```js
function func() {
  const person = new WeakRef({ // создание слабой ссылки
    name: 'Max'
  })

  console.log(person.deref().name) // deref() - обращение к значению
}

async function start() {
  await new Promise(resolve => {
    resolve(func())
  }, 300)

  await new Promise(resolve => {
    resolve(func()) // не гарантировано, что мы получим name, так как сборщик мусора может обнаружить, что на person больше нигде не ссылаются, а поэтому он может взять и удалить из памяти
  }, 700)
}

start()
```

```js
const registery = new FinalizationRegistery((value) => {
// cb отработает тогда, когда сборщик мусора очистит объект MyWeakRef
  console.log('Clearning garbage', value)
})

async function start() {
  const ref = new WeakRef({a: 42})
  registery.register(ref, 'MyWeakRef') // регистрируем финализатор на объект ref и даем ему название MyWeakRef
}

start()
```

```js
const listenersRegistery = new FinalizationRegistery(({target, wrapper, type}) => {
  target.removeEventListener(type, wrapper)
})

function addWeakListener(target, type, listener) {
  const wr = new WeakRef(listener)
  const wrapper = event = wr.deref()?.(event)
  listenersRegistery.register(listener, {target, wrapper, type})

  target.addEventListener(type, wrapper)
}

addWeakListener(document, 'click', event => console.log(event))
```
