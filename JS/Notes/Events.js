// @ КОНСТРУКТОР EVENT:
/**
 const event = new Event(тип события[, флаги]);

 Где:
 - Тип события – может быть как своим, так и встроенным, к примеру "click" .
 - Флаги – объект вида { bubbles: true/false, cancelable: true/false } , где свойство bubbles указывает, всплывает ли событие, а cancelable – можно ли отменить действие по умолчанию.
 Флаги по умолчанию: {bubbles: false, cancelable: false} .
 */

// Конструкторы:
// UIEvent
// FocusEvent
// MouseEvent
// WheelEvent
// KeyboardEvent
// CompositionEvent - для генерации своих, нестандартных, событий

// Пример:
const e = new MouseEvent("click", {
  bubbles: true,
  cancelable: true,
  clientX: 100,
  clientY: 100
});

// Пример:
elem.addEventListener("hello", event => {
  console.log(event.detail.name);
}, false);

const event = new CustomEvent("hello", {
  detail: {name: "Вася"} // дополнительное свойство detail, в котором можно указывать информацию для передачи в событие.
});

elem.dispatchEvent(event);



// @ МЕТОД dispatchEvent:
const event = new Event("click");
elem.dispatchEvent(event); // инициирование события




// @ Как отличить реальное нажатие от скриптового?
event.isTrusted; // true -если посетитель кликнул сам, и всегда false – если событие инициировал скрипт.



// @ Запрет на копирование текста:
// <div oncopy="return false">



// @ Событие переход на другую страницу или сделан клик на «закрыть окно»:
window.onbeforeunload = () => "Данные не сохранены. Точно перейти?"; // приостановливает процесс и спрашивает подтверждение.
