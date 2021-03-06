```css
@supports (display: grid) {
    /* Стили работают, если браузер поддерживает display: grid */
}

@supports not (display: grid) {
    /* Стили работают, если браузер не поддерживает display: grid */
}

.grid {
    display: grid;
    grid-template-columns: max-content 2fr 100px; /* задаем явную сетку для столбцов */
    /*
        min-content - минимальное значение, при котором может расположится контент (например, по слову)
        max-content - максимальное значение, при котором может расположится контент (например, по строке целиком)
        fit-content(300px) - ограничение по значению - max 300px
        minmax(100px, 300px) - ограничение по значению - min 100 и max 300px
        repeat(5, 1ft) - повторять 5 столцов по 1fr
        repeat(auto-fill, 100px) - вместить максимальное количество столбцов по 100px
        repeat(auto-fit, 100px) - вместить максимальное количество столбцов по 100px + анализ количества элементов (не создает лишние столбцы)
        repeat(auto-fill, minmax(100px, 1fr)); пример
    */

    /* ИЛИ */
    grid-auto-columns: 100px; /* задаем неявную сетку для столбцов */
    

    grid-template-rows: repeat(4, 200px); /* задаем явную сетку -> 4 ряда, даже если элементов не хватает */
    /* ИЛИ */
    grid-auto-rows: 50px 100px; /* задаем неявную сетку -> 3 ряда */
    
}
```
```css
.grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr); /* 5 столбцов */
    grid-template-rows: repeat(3, 100px); /* 3 столбцов */
    /* или */
    grid-template: repeat(3, 100px) / repeat(5, 1fr);

}

.grid__item:nth-child(3) { /* меняем положение элемента */
    grid-column-start: 4;
    grid-column-end: 6;
    /*<->*/
    grid-column: 4 / 6;

    /* или */
    grid-column: 4 / span 2; /* начни с 4 линии и растянись до 2 линии */
    /* или */
    grid-column: span 2 / 6; /* растянись на 2 полосы и закончись на 6 линии */

    grid-row-start: 2;
    grid-row-end: 4;
    /*<->*/
    grid-row: 2 / 4;


    /* или */
    grid-area: 2 / 4 / 4 / 6; /* начало - строки/столбцы / конец - строки/столбцы */

    
    /* -1 до конца, -2 до предпоследнего, и тд... */
}

.grid__item:nth-child(1) {
    grid-area: 1 / 1 / 2 / 2;
}

.grid__item:nth-child(2) {
    grid-area: 3 / 1 / 4 / 6;
}
```
```css
.grid {
    display: grid;
    grid-template: repeat(3, 100px) / repeat(5, 1fr);
    
    grid-auto-columns: 75px; /* задаем неявную сетку */
    grid-auto-rows: 75px; /* задаем неявную сетку */
    grid-template-areas:
        'a . . . .' /* . - пустой столбец */
        '. . . c c c c'  /* благодаря неявной сетке выходим за область явной сетки */
        'b b . c c c c'  /* благодаря неявной сетке выходим за область явной сетки */
        '. . . c c c c'  /* благодаря неявной сетке выходим за область явной сетки */
        '. . . c c c c'; /* благодаря неявной сетке выходим за область явной сетки */
    
    /* или другой пример сокращенной записи */
    grid-template:
        'a . . . .' 100px /* - высота столбцов */
        '. . . c c' 100px
        'b b . c c' 100px
        / repeat(5, 1fr); /* - столбцы */
}

.grid__item:nth-child(1) {
    grid-area: a;
}

.grid__item:nth-child(2) {
    grid-area: b;
}

.grid__item:nth-child(3) {
    grid-area: c;
}
```
```css
.grid {
    height: 500px;
    display: grid;
    grid-template:
        'a . . . .' 100px
        '. . . c c' 100px
        'b b . c c' 100px
        / repeat(5, 1fr);

    justify-content: end; /* горизонтальное выравнивание */
    align-content: center; /* вертикальное выравнивание */
    /* или */
    place-content: center end; /* align-content justify-content */
    
    /*
    stretch - по умолч. растянуть
    start
    end
    space-around - отступы между 3-я элементами x/2 x x x x x/2
    space-between - отступы между 3-я элементами x x x x
    space-evently - отступы между 3-я элементами x x x x x x
    */

    justify-content: center; /* горизонтальное выравнивание содержимого ячеки */
    align-items: end; /* вертикальное выравнивание содержимого ячеки */
    /* или */
    place-items: end center; /* align-content justify-content */
}

.grid__item:nth-child(1) {
    grid-area: a;
}

.grid__item:nth-child(2) {
    grid-area: b;
}

.grid__item:nth-child(3) {
    grid-area: c;

    justify-self: end; /* горизонтальное выравнивание элемента */
    align-self: center; /* вертикальное выравнивание элемента  */
    /* или */
    place-self: center end;
}
```
```css
.grid {
    display: grid;
    grid-template: repeat(3, 300px) / repeat(3, 1fr);

    grid-column-gap: 20px; /* толщина вертикальных линий */
    grid-row-gap: 40px; /* толщина горизонтальных линий */
    /* или */
    grid-gap: 30px / 25px; /*  grid-row-gap / grid-column-gap */
}
```
```css
.grid {
    display: grid;
    grid-template-columns: [a] 1fr [b] 1fr [c] 1fr [a b] 1fr [e] 1 fr [c f]; /* задаем имена горизонтальным линиям */
    grid-template-rows: [a] 100px [b] 100px [c] 100px; /* задаем имена вертикальным линиям */

    /* или #2 */
    grid-template-columns: [a-start b-start] 1fr [a-end] 1fr [b-end] 1r [c-start] 1fr 1fr [c-end];
    grid-template-rows: [a-start] 100px [a-end c-start] 100px [b-start] 100px [b-end c-end];

    /* или #3 */
    grid-template:
        'a . . . .' 100px
        '. . . c c' 100px
        'b b . c c' 100px
        / 1fr 1fr 1fr 1fr 1fr;
}

.grid__item:nth-child(1) {
    grid-area: a / a 1 / b / a 2; /* 2 линии имеют одинаковое название a, поэтому указываем порядковый номер*/
    
    /* или #2 */
    grid-area: a;

    /* или #3 */
    grid-area: a-start / a-start / a-end / a-end;
}

.grid__item:nth-child(2) {
    grid-area: c / a / d / c;

    /* или #2 */
    grid-area: b;

    /* или #3 */
    grid-area: b-start / b-start / b-end / b-end;
}

.grid__item:nth-child(3) {
    grid-area: b / d / d / f;

    /* или #3 */
    grid-area: c;

    /* или #3 */
    grid-area: c-start / c-start / c-end / c-end;
}
```

```css
body {
    /* direction: rtl; */
    /* writing-mode: vertical-rl; */
}

.grid {
    display: grid;
    grid-template-columns: repeat(3, 100px);
    grid-template-rows: repeat(5, 100px);
    grid-gap: 20px;

    grid-auto-flow: row; /* по умолчанию */
    /*
        column // разместить по столбцам
        column densel; // разместить по столбцам,
        а затем переразместить таким образом, чтобы не было пустого пространства
        dense; // разместить по строкам,
        а затем переразместить таким образом, чтобы не было пустого пространства
    */
}

.grid__item:nth-child(1) {
    grid-column-end: span 2;
    grid-row-end: span 2;
}

.grid__item:nth-child(4) {
    grid-column-end: span 2;
    grid-row-end: span 2;
}

.grid__item:nth-child(5) {
    order: 1; /* 0 - по умолчанию, 1 - в конец, -1 - в начало*/
}

.grid__item:nth-child(7) {
    grid-column-end: span 2;
    grid-row-end: span 2;
}
```
```css
.grid {
    display: grid;
    grid-template-columns: repeat(3, 100px);
    grid-template-rows: repeat(5, 100px);
}

.grid__item:nth-child(1) {
    grid-area: 1 / 1 / 3 / 4;
    z-index: 2; /* будет перекрывать нижний */
}

.grid__item:nth-child(2) {
    grid-area: 2 / 1 / 4 / 2;
    z-index: 1;
}
```

```css
.grid {
    display: grid;
    /* #1 */
    grid: repeat(3, 100px) / repeat(4, 1fr);
    /* <-> */
    grid:
        '. . . .' 100px
        '. . . .' 100px
        '. . . .' 100px
        / 1fr 1fr 1fr 1fr;
    
    /* #2 */
    grid: repeat(3, 100px) / auto-flow dense 100px;
    
    /* #3 */
    grid: auto-flow 100px / repeat(4, 1fr);

    /* #4 */
    grid: subgrid; /* наследование от родителя. Пока не реализован в браузерах */
    grid: contents; /* вложенные элементы становятся частью сетки родителя */

}
```
```html
<div class="grid">
    <div class="grid-item">1</div>
    <div class="grid-item">2</div>
    <div class="grid-item">3</div>
    <div class="grid-item">4</div>
    <div class="grid-item">5</div>
    <div class="grid-item">6</div>
    <div class="grid-item">7</div>
</div>
```
