## RelativeTimeFormat

```js
const formatter = new Intl.RelativeTimeFormat('ru')
const diff = new Date() - new Date('4/18/2022')
formatter.format(-diff / (1000 * 60 * 60 * 24), 'days') // 152,525 дня назад
```

## ListFormat

```js
const list = ['one', 'two', 'three']

const formatter = new Intl.ListFormat('en-us', { style: 'narrow' })
const result = f.format(array) // -> one, two, three
```
