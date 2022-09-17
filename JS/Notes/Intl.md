## RelativeTimeFormat

```js
const formatter = new Intl.RelativeTimeFormat('ru')
const diff = new Date() - new Date('4/18/2022')
formatter.format(-diff / (1000 * 60 * 60 * 24), 'days') // 152,525 дня назад
```
