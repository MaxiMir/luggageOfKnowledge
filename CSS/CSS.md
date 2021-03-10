#### Переменные на чистом CSS ####

`:root` - класс для глобальных переменных

```css
:root {
    --color: red;
}

.elements {
    --width: 100px; /* локальная переменная - для дочерних элементов .elements */
    color: var(--color, blue); /* blue - цвет по умолчанию */
}

.elements__item {
    width: var(--width);
}
```

```javascript
const root = document.querySelector(':root'); 
const cssRules = getComputedStyle(root);
const color = cssRules.getPropertyValue('--color'); // получение свойства

root.style.setProperty('--color', 'green'); // изменение свойства
```

**Модальное окно с центрированием**
```html
<body>
    <div class="fade"></div>
    <div class="modal modal-center">Hello, world!</div>
    <main>
        <p>Главной отличительной чертой абсолютного позиционирования является то, что блок как бы "выдёргивается" из потока документа. Для него больше не существует такого элемента, поэтому место, которое он занимал ранее, освобождается и его могут занять другие элементы (если конечно их ширина и высота позволяют это сделать).</p>
    </main>
</body>
```
````css
:root {
    --modal-height: 100px;
    --modal-width: 100px;
}

body {
    margin: 0;
    padding: 0;
}

.fade {
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    position: absolute;
    background: rgba(0, 0, 0, 0.7);
}

.modal {
    height: var(--modal-height);
    width: var(--modal-width);
    padding: 20px;
    
    position: absolute;
    background: #FFFFFF;
    
    box-sizing: border-box;
    
    font-weight: bold;
}

.modal-center {
    left: calc(50% - var(--modal-width) / 2);
    top: calc(50% - (var(--modal-height) / 2));
}
````
