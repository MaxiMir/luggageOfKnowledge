# Events #

+ [Конструктор Event](#constructor)
+ [Как отличить реальное нажатие от скриптового](#isTrusted)
+ [Запрет на копирование текста](#oncopy)
+ [Событие переход на другую страницу или сделан клик на «закрыть окно»](#exit)

### <a name="constructor"></a> Конструктор Event:

`const event = new Event(тип события[, флаги])`

Где:

- Тип события – может быть как своим, так и встроенным, к примеру "click".
- Флаги – объект вида `{bubbles: true/false, cancelable: true/false}`, где свойство bubbles указывает, всплывает ли
  событие, а `cancelable` – можно ли отменить действие по умолчанию. Флаги по
  умолчанию: `{bubbles: false, cancelable: false}`.

Конструкторы:

* UIEvent
* FocusEvent
* MouseEvent
* WheelEvent
* KeyboardEvent
* CompositionEvent - для генерации своих, нестандартных, событий

```js
const e = new MouseEvent("click", {
  bubbles: true,
  cancelable: true,
  clientX: 100,
  clientY: 100
})

// Пример:
elem.addEventListener("hello", event => {
  console.log(event.detail.name)
}, false)

const event = new CustomEvent("hello", {
  detail: {name: "Вася"} // дополнительное свойство detail, в котором можно указывать информацию для передачи в событие.
})

elem.dispatchEvent(event)
```
```js
const event = new Event("click")
elem.dispatchEvent(event) // инициирование события
```

### <a name="isTrusted"></a> Как отличить реальное нажатие от скриптового?:
```js
event.isTrusted // true -если посетитель кликнул сам, и всегда false – если событие инициировал скрипт.
```

### <a name="oncopy"></a> Запрет на копирование текста:
```html
<div oncopy="return false"></div>
```

### <a name="exit"></a> Событие переход на другую страницу или сделан клик на «закрыть окно»:
```js
window.onbeforeunload = () => alert("Данные не сохранены. Точно перейти?") // приостановливает процесс и спрашивает подтверждение.
```
