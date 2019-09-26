/** @@@ LEARN @@@

 * Портал Ильи Кантора: http://learn.javascript.ru/

 * Codewars: https://www.codewars.com/
 
 * Серия «You don't know JS»: https://github.com/azat-io/you-dont-know-js-ru
 
 * Книга «Exploring ES6»: https://exploringjs.com/es6/

 * Справочник MDN web docs: https://developer.mozilla.org/ru/
 
 * Гарвардский курс «CS50» https://www.youtube.com/watch?v=Sy_wba7l1UU&list=PLawfWYMUziZqyUL5QDLVbe3j5BKWj42E5
 
 * https://habr.com/ru/company/mailru/blog/335292/

 */


/* # Тип данных Символ (Symbol) */
const myPrivateMethod = Symbol();
this[myPrivateMethod] = function() {/* */};

/*
Когда символ используется как идентификатор в присваивании свойства, свойство (например, символ) является анонимным; а также не исчислимым. Поскольку свойство не исчислимо, оно не будет отображаться в цикле «for (... in ...)», и поскольку свойство является анонимным, оно не будет отображаться в массиве результатов "Object.getOwnPropertyNames ()". Доступ к этому свойству можно получить с помощью исходного значения символа, создавшего его, или путем итерирования в массиве результатов «Object.getOwnPropertySymbols ()». В предыдущем примере кода доступ к свойству будет осуществляться через значение, которое было сохранено в переменной myPrivateMethod.
*/


/* # Унарный побитовый оператор */
// проверка на −1: 
const str = "Проверка";

if (~str.indexOf("верка")) { // если найдено , т.к. ~n = -(n+1)
  alert( 'найдено!' );
}

/* # Проверка на целое число: */
const isInteger = num => (num ^ 0) === num; // ^ исключающее ИЛИ


/* # Неточные вычисления */
alert( 0.1 + 0.2 ); // 0.30000000000000004
/*
Всё дело в том, что в стандарте IEEE 754 на число выделяется ровно 8 байт(=64 бита), не больше и не меньше.

Число 0.1 (одна десятая) записывается просто в десятичном формате. Но в двоичной системе счисления это бесконечная дробь, так как единица на десять в двоичной системе так просто не делится. Также бесконечной дробью является 0.2 (=2/10).

Когда мы складываем 0.1 и 0.2, то две неточности складываются, получаем незначительную, но всё же ошибку в вычислениях.
 */

alert( 9999999999999999 ); // выведет 10000000000000000

/*
Причина та же – потеря точности.

Из 64 бит, отведённых на число, сами цифры числа занимают до 52 бит, остальные 11 бит хранят позицию десятичной точки и один бит – знак. Так что если 52 бит не хватает на цифры, то при записи пропадут младшие разряды.
*/


/* # Генерация случайного целого числа между min и max
Напишите функцию randomInteger(min, max) для генерации случайного целого числа между min и max, включая min,max как возможные значения.

Любое число из интервала min..max должно иметь одинаковую вероятность.
*/

const randomInteger = (min, max) => {
    const rand = min + Math.random() * (max + 1 - min);

    return Math.floor(rand);
};

/* # Очередь и Стек
 * Очередь - упорядоченная коллекция элементов, в которой новые элементы добавляются в конец, а обрабатываются – с начала.
 * Стек - коллекция элементов, в которой новые элементы берутся и добавляются с конца.
*/


/* # new Array + join = Повторение строки */
new Array(4).join("ля"); // ляляля



LexicalEnvironment


/* # Замыкания
Замыкание – это функция вместе со всеми внешними переменными, которые ей доступны.

Все переменные внутри функции – это свойства специального внутреннего объекта LexicalEnvironment (лексическое окружение).
При запуске функция создает объект LexicalEnvironment, записывает туда аргументы, функции и переменные. Процесс инициализации выполняется в том же порядке, что и для глобального объекта, который, вообще говоря, является частным случаем лексического окружения.
*/
function sayHi(name) {
    var phrase = "Привет, " + name;
    alert( phrase );
}
 
sayHi('Вася');


// 1. До выполнения первой строчки её кода, на стадии инициализации, интерпретатор создает пустой объект LexicalEnvironment и заполняет его:   
function sayHi(name) {
    // LexicalEnvironment = { name: 'Вася', phrase: undefined }
    var phrase = "Привет, " + name;
    alert( phrase );
}
  
sayHi('Вася');  

// 2. Функция выполняется:
function sayHi(name) {
    // LexicalEnvironment = { name: 'Вася', phrase: undefined }
    var phrase = "Привет, " + name;
  
    // LexicalEnvironment = { name: 'Вася', phrase: 'Привет, Вася'}
    alert( phrase );
}
  
sayHi('Вася');

/*
 3. В конце выполнения функции объект с переменными обычно выбрасывается и память очищается (исключение - замыкания). 


  
В функции ссылка на внешний объект переменных хранится в специальном внутреннем свойстве функции, которое называется [[Scope]].

- Каждая функция при создании получает ссылку [[Scope]] на объект с переменными, в контексте которого была создана.
- При запуске функции создаётся новый объект с переменными LexicalEnvironment. Он получает ссылку на внешний объект переменных из [[Scope]].
- При поиске переменных он осуществляется сначала в текущем объекте переменных, а потом – по этой ссылке.

«Понимать замыкания» в JavaScript означает понимать следующие вещи:

1. Все переменные и параметры функций являются свойствами объекта переменных LexicalEnvironment. Каждый запуск функции создает новый такой объект. На верхнем уровне им является «глобальный объект», в браузере – window.
2. При создании функция получает системное свойство [[Scope]], которое ссылается на LexicalEnvironment, в котором она была создана.
3. При вызове функции, куда бы её ни передали в коде – она будет искать переменные сначала у себя, а затем во внешних LexicalEnvironment с места своего «рождения».

При создании функции с использованием new Function, её свойство [[Scope]] ссылается не на текущий LexicalEnvironment, а на window => cледствие – такие функции не могут использовать замыкание. 
*/


/* # Счетчик с установкой/сбросом значений: */
const makeCounter = () =>  {
    let currentCount = 1;
  
    const counter = () => currentCount++;
  
    counter.set = value => { 
        currentCount = value; 
    };
  
    counter.reset = () => { 
        currentCount = 1;
    };
  
    return counter;
};
  
const counter = makeCounter();

counter(); // 1
counter(); // 2

counter.set(5);
counter(); // 5


/* # Приём проектирования «Модуль» */
// FILE: some-module.js:
;(function() { // Function Expression
    // глобальная переменная нашего скрипта
    const message = "Привет";

    // функция для вывода этой переменной
    const showMessage = () => alert( message );

    // выводим сообщение
    showMessage();
}());


+function() { // показываем что здесь Function Expression
    alert('Вызов на месте');
}();



/* # Одалживание метода */
// #1:
const printArgs = () => {
    arguments.join = [].join; // скопируем ссылку на функцию в переменную

    const argStr = join.call(arguments, ':'); // запустили join в контексте arguments

    console.log( argStr ); // сработает и выведет 1:2:3
};
  
printArgs(1, 2, 3);

// #2:
const printArgs = () =>  {
    // вызов arr.slice() скопирует все элементы из this в новый массив
    var args = [].slice.call(arguments);
    console.log( args.join(', ') ); // args - полноценный массив из аргументов
};
  
printArgs('Привет', 'мой', 'мир'); // Привет, мой, мир

// # Сумма переданных аргументов:
const sumArgs = () => {
    return [].reduce.call(arguments, (a, b) => a + b);
}
  
sumArgs(4, 5, 6); // 15


/* # Декоратор для проверки типа: */

// вспомогательная функция для проверки на число
const checkNumber = value => typeof value == 'number';

// декоратор, проверяющий типы для f
// второй аргумент checks - массив с функциями для проверки
const typeCheck = (f, checks) => {
    return function() {
        for (var i = 0; i < arguments.length; i++) {
            if (!checks[i](arguments[i])) {
                console.log( "Некорректный тип аргумента номер " + i );

                return;
            }
        }
        
        return f.apply(this, arguments);
    }
}

let sum = (a, b) => a + b;
// обернём декоратор для проверки
sum = typeCheck(sum, [checkNumber, checkNumber]); // оба аргумента - числа

// пользуемся функцией как обычно
sum(1, 2); // 3, все хорошо

// а вот так - будет ошибка
sum(true, null); // некорректный аргумент номер 0
sum(1, ["array", "in", "sum?!?"]); // некорректный аргумент номер 1









// # Табы 
/* HTML
<div class="container">
    <ul class="acco">
        <li class="acco__item">
            <a href="#" class="acco__triger">
                Пункт 1
            </a> 
            <div class="acco__content">
                    <div class="acco__content-text">
                        TEXT TEXT TEXT
                    </div>
            </div> 
        </li>
        <li class="acco__item">
            <a href="#" class="acco__triger">
                Пункт 2
            </a> 
            <div class="acco__content">
                <div class="acco__content-text">
                    TEXT TEXT TEXT
                </div>
            </div> 
        </li>        
        <li class="acco__item">
            <a href="#" class="acco__triger">
                Пункт 3
            </a> 
            <div class="acco__content">
                <div class="acco__content-text">
                    TEXT TEXT TEXT
                </div>
            </div> 
        </li>               
    </ul>
</div>

<style>
    ...
    .acco__content {
        height: 0;
        overflow: hidden;
        transition: height .3s;
    }
</style>
*/


const items = document.querySelectorAll('.acco_item');

for (item of items) {
    item.addEventListener('click', e => handleAccoOpening);
}   

function handleAccoOpening(e) {
    const curItem = e.currentTarget; // ссылается на элемент, на который повесили обработчик
    // e.target; // фактический элемент, на котором сработало событие
    const isClosedItem = curItem.classList.contains('active');

    if (isClosedItem) {
        closeItemsAndRemoveActive(items);
    } else {
        closeItemsAndRemoveActive(items);
        openItem(curItem)
    }
}

function closeItemsAndRemoveActive(items) {
    Array.from(items).forEach(elem => {
        elem.classList.remove('active');
        elem.querySelector('acco__content').style.height = 0;     
    });
}

function openItem(item) {
    const content = item.querySelector('.acco__content');
    const textBlock = content.firstElementChild; // первый потомок
    const reqHeight = textBlock.getBoundingClientRect().height; // getBoundingClientRect - размер элемента + его позиция отн. окна

    item.classList.add('active');
    content.style.height = `${reqHeight}`;   
}



// # Cлайдер:
/* HTML
<div class="container">
    <div class="slider-container">
        <a href="#" class="arrow" id="left"><-</a>
        <div class="slider">
            <div class="items" id="items">
                <div class="item">1</div>
                <div class="item">2</div>
                <div class="item">3</div>
            </div>
        </div>
    </div>
    <a href="#" class="arrow" id="right">-></a>
</div>
*/

const leftBtn = document.querySelector('#left');
const rightBtn = document.querySelector('#right');
const item = document.querySelector('#items');
const step = items.firstElementChild.getBoundingClientRect().width;
const slidesInView = 3;
const maxRight = (items.children.length - slidesInView) * step;
const minRight = 0;
let currentRight = 0;

rightBtn.addEventListener('click', e => {
    if (currentRight < maxRight) {
        currentRight += step;
        item.style.right = `${currentRight}px`;
    } else { // зацикливаем
        currentRight = 0;
        items.style.right = 0;
    }
});

leftBtn.addEventListener('click', e => {
    if (currentRight > minRight) {
        currentRight -= step;
        item.style.right = `${currentRight}px`;
    } else { // зацикливаем
        currentRight = maxRight;
        items.style.right = maxRight + 'px';
    }
});



// # Модальное окно:
/*
<button id="showModal">Show Modal</button>



<script type="template" id="#modal">
    <div class="overlay">
        <div class="popup__container">
            <a href="#" class="popup__close"></a>
            <div class="popup__content">
                <h1>Header</h1>
            </div>
        </div>   
    </div>    
</script>
*/

const button = document.querySelector('#showModal');
const remplate = document.querySelector('#modal-template').innerHTML; 
const modal = createModal();

button.addEventListener('click', e => {
    modal.setContent('Hello world');
    modal.open();

    setTimeout(() => {
        modal.close();
    }, 3000);
});

function createModal() {
    const container = document.createElement('div');
    container.className = 'popup';
    container.innerHTML = template;

    const contentBlock = container.querySelector('.popup__content');

    const closeBtn = container.querySelector('.popup__close');
    closeBtn.addEventListener('click', e => {
        document.body.removeChild(container);
    });

    const overlay = container.querySelector('.overlay');
    overlay.addEventListener('click', e => { 
        if (e.target === overlay) {
            closeBtn.click();
        }
    });

    return {
        open() {
            document.body.appendChild(container);
        },
        close() {
            closeBtn.click();
        },
        setContent(content) {
            contentBlock.innerHTML = content;
        }
    };
}

/* XMLHttpRequest + JSON */
/*
<button id="loadButton">Загрузить</button>
<div id="result"></div>
*/

const loadButton = document.querySelector('#loadButton');
const result = document.querySelector('#result');

loadButton.addEventListener('click', () => {
    // #1:
    const xhr = new XMLHttpRequest();

    xhr.open('GET', 'friends.json');
    xhr.responseType = 'json'; // тип принимаемых данных от сервера (*)
    xhr.send(); // для POST в () передаем JSON.stringify(someData)
    xhr.addEventListener('load', () => {
        if (xhr.response.status) {
            result.innerHTML('Ошибка на стороне сервера');
        } else {
            // Если прописан тип json в (*) то:
            const friends = xhr.response;
            // Иначе:
            const friends = JSON.parse(xhr.responseText);
                        
            for (const friend of friends) {
                const friendDom = createFriendDOM(friend);
                result.appendChild(friendDom);
            }
        }
    });

    // #2:
    fetch('data.txt')
        .then(response => response.text())
        .then(text => console.log(text));
});

function createFriendDOM(friend) {
    const div = document.createElement('div');
    div.classList.add('friend');
    div.textContent = `${friend.name} ${friend.lastName}`;

    return div;
}



// # Скролл по блокам:
/*
<body>
    <div class="wrapper">
        <div class="maincontent">
            <section class="section hero">
                <div class="container">
                    ....
                </div>
            </section>
            <section class="section best">
                <div class="container">
                    ....
                </div>
            </section>
        </div>
    </div>
    <style>
        .container {
            margin: 0 auto;
            postion: relative;
            max-width: rem(940px);
            width: 95%;
            display: flex;
            flex-direction: column;
        }
        .wrapper {
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
        .maincontent {
            height: 100%;
            transition: transform 1s;
            will-change: transform; // СSS оптимизация для тяжелой анимации
        }
        .section {
            height: 100%;
            position: relative;
            display: flex;
            overflow: hidden;
        }
    </style>
</body>    
*/
const sections = $('.section');
const display = $('.maincontent');

let inscroll = false;

const md = new MobileDetect(window.navigator.userAgent); // mobile-detect
const isMobile = md.mobile();

const switchActiveClassInSideMenu = menuItemIndex => {
    $('.fixed-menu__item')
        .eq(menuItemIndex)
        .addClass('active')
        .siblings()
        .removeClass('active');
}

const performTransition = sectionEq => {
    if (inscroll) return;

    const sectionEqNum = parseInt(sectionEq);

    if (!!sectionEq === false) {
        console.error('неверное значение для аргумента sectionEq');
    }

    const postion = sectionEq * -100 + '%';

    inscroll = true;

    sectionEq
        .eq(sectionEq) // eq - cелектор по номеру
        .addClass('active')
        .siblings() // siblings - элементы одного уровня вложенности
        .removeClass('active');  

    display.css({
        'transform': `translateY(${postion})`
    });        

    setTimeout(() => {
        inscroll = false;
        switchActiveClassInSideMenu(sectionEq);
    }, 1300); // продолжительность транзишна + 300мс - время завершения инерции тачпада   
};

const scrollToSection = direction => {
    const activeSection = sections.filter('.active');
    const nextSection = activeSection.next();
    const prevSection = activeSection.prev();

    if (direction === 'next' &&  nextSection.length) {
        performTransition(nextSection.index());
    }

    if (direction === 'prev' && prevSection.length) {
        performTransition(prevSection.index());
    }
};


$('.wrapper').on('wheel', e => {
    const deltaY = e.originalEvent.deltaY; // e.originalEvent - оригинальный e без обертки jQuery

    if (deltaY > 0) { 
        scrollToSection('next');
    } 

    if (deltaY < 0) { 
        scrollToSection('prev');
    }
});

$('.wrapper').on('touchmove', e => { // убираем белую полосу при прокрутке вверху/внизу
    e.preventDefault();
});

$(document).on('keydown', e => {
    switch (e.key) {
        case 38:
            scrollToSection('next'); 
            break;
        case 40:
            scrollToSection('prev'); 
            break;
    }
});

if (isMobile) {
    $(window).swipe({ // jquery touchSwipe:
        swipe: function (event, direction) {
            const nextOrPrev = direction === 'up' ? 'next' : 'prev';
    
            scrollToSection(nextOrPrev);
        }
    });
}


const loadButton = document.querySelector('#loadButton');
const gallery = document.querySelector('#gallery');
const urls = [
    'https://ya.ru/images/1.png',
    'https://ya.ru/images/2.png',
    'https://ya.ru/images/3.png'
];
const loadImage = url => {
    return new Promise(resolve => {
        const img = document.createElement('img');
        gallery.appendChild(img);
        img.src = url;
        img.addEventListener('load', () => resolve());
    });
}

loadButton.addEventListener('click', () => {
    loadImage(urls[0])
        .then(() => loadImage(urls[1]))
        .then(() => urls[2])
});

















// >>>>>> Что такое prototype <<<<<<
// #1 добавляем всем объектам метод sayHello:
const maxiMir = {
    name: "Maxim",
    age: 25,
    greet: function () {
        console.log('Greet');
    }
};

maxiMir.sayHello(); // => Uncaught TypeError

Object.prototype.sayHello = function () { 
    console.log('Hello!');
};

// цепочка наследования - объект __proto__

maxiMir.sayHello(); // => Hello!
 и
// #2 один из вариантов наследования:
const maxCon = Object.create(maxiMir);
maxCon.age = 30;
maxCon.greet(); // Greet



// >>>>>> Что такое контекст. Как работает call, bind, apply <<<<<<

function hello () {
    console.log('Hello', this);
}

const maxiMir = {
    name: "Maxim",
    age: 25,
    sayHello: hello
};

maxiMir.sayHello(); // Hello > {name: "Maxim", age: 25, sayHello: f}
window.hello(); // <-> hello(); Hello > Window {postMessage: f, blur: f, focus: f, ...}


this === window; // true


const maxiMir = {
    name: "Maxim",
    age: 25,
    sayHello: hello,
    sayHelloWindow: hello.bind(window), // в () контекст вызова для this
    logInfo: function (job, phone) {
        console.group(`${this.name} info:`); // Заголовок для группы
        console.log(`Name is ${this.name}`);
        console.log(`Age is ${this.age}`);
        console.log(`Job is ${job}`);
        console.log(`Phone is ${phone}`);
        console.groupEnd();
    }
};

const maxCon = {
    name: "Max",
    age: 30   
};

// #1 bind:
const fnMaxConInfoLog = maxiMir.logInfo.bind(maxCon, 'Frontend', '8-999-999-99-99'); 
fnMaxConInfoLog(); // () - т.к. метод bind не вызывает функцию, а возвращает новую // =>

// #2 call:
maxiMir.logInfo.call(maxCon, 'Frontend', '8-999-999-99-99'); // сразу вызывает функцию => 

// #3:
maxiMir.logInfo.apply(maxCon, ['Frontend', '8-999-999-99-99']); // сразу вызывает функцию => 

// Max info:
//      Name is Max
//      Age is 30
//      Job is Frontend
//      Phone is 8-999-999-99-99


// Пример задачи с собеседований (создать метод для массивов):
const nums = [1, 2, 3, 4, 5];

Array.prototype.multBy = function(n) {
    return this.map(item => item * n);
};

nums.multBy(2); // [2, 4, 6, 8, 10]



// >>>>>> Что такое замыкания <<<<<<

// Написать свою функцию bind
function logPerson() {
    console.log(`Person: ${this.name}, ${this.age}, ${this.job}`);
}

const person1 = {name: 'Maxim', age: 22, job: 'Frontend'};
const person2 = {name: 'John', age: 23, job: 'SMM'};

function bind(context, fn) {
    return (...args) => fn.apply(context, args);
}

bind(person1, logPerson)(); // Person: Maxim, 22, Frontend
bind(person2, logPerson)(); // Person: John, 23, SMM



// >>>>>> Асинхронность. Event Loop. SetTimeout  <<<<<<

setTimeout(() => { // Web Apis <-> window.setTimeout(...); 
    console.log('Inside timeout, after 2000 seconds');
}, 2000); 

// Call Stack
// Web Apis
// Event Loop
// Callback Queue



// >>>>>> Promise <<<<<<
console.log('Request data...');

const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Preparing data...');

        const backendData = {
            server: 'aws',
            port: 2000,
            status: 'working'
        };

        resolve(backendData);
    }, 2000);
});

promise
    .then(data => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                data.modified = true;
                resolve(data);
            }, 2000);
        });
    })  
    .then(clientData => {
        clientData.fromPromise = true;

        return clientData; // можно возвращать не только промисы
    })
    .then(data => console.log('Modified', data))
    .catch(err => console.error('Error', err))
    .finally(() => console.log('Finally')); // вызывается в любом случае


// #2 sleep:    
const sleep = ms => {
    return new Promise(resolve => {
        setTimeout(() => resolve(), ms)
    });    
} 
    
sleep(2000).then(() => console.log('After 2 sec'));
sleep(3000).then(() => console.log('After 3 sec'));


// #3 Promise.all: 
Promise.all([sleep(2000), sleep(3000)])
    .then(() => console.log('All promises')); // ждет выполнения всех промисов


// #4 Promise.race: 
Promise.race([sleep(2000), sleep(3000)])
    .then(() => console.log('Race promises')); // ждет выполнения первого промиса



// >>>>>> Объекты с Object.create <<<<<<

const person = Object.create(
    { // прототип:
        calculateAge() {
            console.log('Age:', new Date().getFullYear() - this.birthYear);
        }
    }, 
    {
        name: {
            value: 'MaxiMir',
            enumerable: true, // !#1
            writable: true, // !#2
            configurable: true // !#3
        },
        birthYear: {
            value: 1988,
            enumerable: true, // !#1
            writable: true // !#2
        },
        age: {
            get() {
                return new Date().getFullYear() - this.birthYear;        
            }, 
            set(value) {
                document.body.style.background = 'red';
                console.log('Set age', value)
            }
        }
    }
);

const person2 = { name: 'MaxiMir', birthYear: 1988 };

for(let key in person) {
    if (person.hasOwnProperty(key)) { // собственный ключ объекта (не прототип)
        console.log('Key', key); // => #1 Ничего не выведет без enumerable
    }
}

// объект без прототипа
const data = Object.create(null);
data.text = "Привет";

alert(data.text); // Привет
alert(data.toString); // undefined


for(let key in person2) {
    console.log('Key', key); // => Key name \n Key birthYear
}

person.name = 'John'; // !#2 Нельзя будет изменить без writable
console.log('Name', person.name); // => MaxiMir

delete person.birthYear // !#3 Нельзя будет удалить по ключу из объекта без configurable

person.age; // => 30
person.age = 100; 

person.calculateAge(); // => 30



// >>>>>> Object.defineProperty <<<<<< 
// Свойство-константа
const user = {};

Object.defineProperty(user, "name", {
  value: "Вася",
  writable: false, // запретить присвоение "user.name="
  configurable: false // запретить удаление "delete user.name"
});

// Помечаем toString как не подлежащий перебору в for..in
const user = {
    name: "Вася",
    toString: function() { return this.name; }
};
  
Object.defineProperty(user, "toString", {enumerable: false}); // модифицируем настройки у существующего toString.
  
for(var key in user) console.log(key);  // name


Object.keys // возвращает только enumerable-свойства.
Object.getOwnPropertyNames // возвращает все



// >>>>>> Все о ES6 Классах  <<<<<<

class Animal {
    static type = 'ANIMAL';

    constructor(options) {
        this.name = options.name;
        this.age = options.age;
        this.hasTail = options.hasTail;
    }

    voice() {
        console.log('I am animal')
    }
}

const animal = new Animal({
    name: 'Animal',
    age: 5, 
    hasTail: true
});

Animal.voice(); // => 'I am animal'

animal.type; // ! => undefined
Animal.type; // ! => ANIMAL


class Cat extends Animal {
    static type = 'CAT';

    constructor(options) {
        super(options);
        this.color = options.color;
    }

    voice() {
        super.voice();
        console.log('I am cat')
    }

    get ageInfo() {
        return this.age * 7;
    }

    set ageInfo(newAge) {
        this.age = newAge;
    }
}

const cat =  new Cat({
    name: 'Cat',
    age: 7, 
    hasTail: true,
    color: 'black'
});

Cat.type; // => CAT
cat.voice(); // => I am animal \n I am cat 
cat.ageInfo; // => 49
cat.ageInfo = 8; // => 49
cat.ageInfo; // => 56


// #2:

class Component {
    constructor(selector) {
        this.$el = document.querySelector(selector);
    }

    hide() {
        this.$el.style.display = 'none';
    }

    show() {
        this.$el.style.display = 'block';
    }
}

class Box extends Component {
    constructor(options) {
        super(options.selector);

        this.$el.style.width = this.$el.style.heighth = options.size + 'px';
        this.$el.style.background = options.color;
    }
}

class Circle extends Box {
    constructor(options) {
        super(options);

        this.$el.style.borderRadius = '50%';
    }
}

const box1 = new Box({
    selector: '#box1',
    size: 100,
    color: 'red'
});

const box2 = new Box({
    selector: '#box2',
    size: 130,
    color: 'blue'
});

const circle = new Circle({
    selector: '#circle',
    size: 90,
    color: 'green'
});


box1.hide(); // cкрываем элемент box1
box1.show(); // показываем элемент box1

box2.hide(); // cкрываем элемент box2
box2.show(); // показываем элемент box2



// >>>>>> Async, Await <<<<<<
const delay = ms => {
	return new Promise(r => setTimeout(() => r(), ms));
};

const url = 'https://jsonplaceholder.typicode.com/todos';

// #1:
function fetchTodos() {
	console.log('Fetch todo started...');

	return delay(2000)
		.then(() => fetch(url))
		.then(response => response.json())
}


fetchTodos()
	.then(data => {
		console.log('Data:', data)
	})
	.catch(e => console.error(e));


// #2 аналогично через async + await:
async function fetchAsyncTodos() {
	console.log('Fetch todo started...');

	try {
		await delay(2000);
		const response = await fetch(url);
		const data = await response.json();
		console.log('Data:', data);
	} catch (e) {
		console.error(e)
	} finally {

	}
	
}

fetchAsyncTodos();



// # Вставка загруженной картинки:
function readFile() {
    if (this.files && this.files[0]) {
        const FileReader = new FileReader();
        
        FileReader.addEventListener("load", e => {
        document.getElementById("img").src       = e.target.result;
        document.getElementById("b64").innerHTML = e.target.result;
        }); 
        
        FileReader.readAsDataURL( this.files[0] );
    }
}
  
document.getElementById("inp").addEventListener("change", readFile);

/* --- HTML ---
<input id="inp" type='file'>
<p id="b64"></p>
<img id="img" height="150"></img>
*/

// >>>>>> Proxy. Объекты, функции, классы. <<<<<<

// # Objects:
const person = {
	name: "Maxim",
	age: 25,
	job: 'Fullstack'
};

const op = new Proxy(person, {
	get(target, prop) { // ловушка на метод get
		console.log('Target', target);
		console.log('Prop', prop);
		console.log(`Getting prop ${prop}`);
		return target[prop];
	},
	set(target, prop, value) {
		if (prop in target) {
			target[prop] = value;
		} else {
			throw new Error(`No ${prop} field in target`);
		}
	}, 
	has(target, prop) {
		return ['age', 'name', 'job'].includes(prop);
	},
	deleteProperty(target, prop) {
		console.log('Deleting...', prop);
		delete target.prop;

		return true;
	}
});

op.age; 
// Target >  {name: Maxim, age: 25, job: Fullstack}
// Prop age
// 25

op.qqq = 26;
// No qqq field in target

'name' in op;
// true

'age2' in op;
// false

delete op.age;
// 'Deleting... age


// # Functions:
const log = text = `Log: ${text}`;

const fp = new Proxy(log, {
	apply(target, thisArg, args) { // отслеживание вызова функции, thisArg - контекст, args - переданные параметры
		console.log('Calling fn...');

		return target.apply(thisArg, args).toUpperCase();
	},
});

fp(); 
// Calling fn...
// "LOG: undefined"

fn('TEST');
// Calling fn...
// "LOG: TEST"


// # Classes:
class Person {
	constructor(name, age) {
		this.name = name;
		this.age = age;
	}
}

const PersonProxy = new Proxy(Person, {
	construct(target, args) { // отслеживание инициализации класса
		console.log('Construct...');

		return new target(...args);
		// или
		return new Proxy(new target(...args), {
			get(tar, prop) {
				console.log(`Getting prop "${prop}"`);
				return t[prop];	
			}
		});
	}
});

const p = new PersonProxy('Maxim', 30);
// Construct...

p.name;
// Getting prop name
// "Maxim"


// # Wrapper
const withDefaultValue = (target, defaultValue = 0) => {
    return new Proxy(target, {
        get: (obj, prop) => (prop in obj ? obj[prop] : defaultValue)
    });
};

const position = withDefaultValue(
    {
        x: 24,
        y: 42
    },
    0
);

console.log(position); 
// > Proxy {x: 24, y: 42}
position.x
// 24
position.y
// 42
position.z
// 0

// # Hidden properties:
const withHiddenProps = (target, prefix = '_') => {
    return new Proxy(target, {
        has: (obj, prop) => (prop in obj) && (!prop.startWith(prefix)),
        ownKeys: obj => Reflect.ownKeys(obj) // возвращает массив из ключей
            .filter(p => !p.startsWith(prefix)),
        get: (obj, prop, receiver) => (prop in receiver ? obj[prop] : void 0) // void 0 <-> undefined 
    });
};

const data = withHiddenProps({
   name: 'MaxiMir', 
   age: 25,
   _uid: '1231231'
});

data
// > Proxy {name: MaxiMir, age: 25, _uid: 1231231}

data.age
//25

data._uid
// undefined

'_uid' in data
// false

for(let key in data) console.log(key);
// name
// age

Object.keys(data)
// ['name', 'age']


// Optimization
const userData = [
  {id: 1, name: 'MaxiMir', job: 'Fullstact', age: 25},
  {id: 2, name: 'Elena', job: 'Student', age: 22},  
  {id: 3, name: 'Victor', job: 'Backend', age: 23}
];

// Не подходит для больших объемов данных:
userData.find(user => user.id === 3); // По сути метод является циклом по всему массиву {id: 3, name: 'Victor', job: 'Backend', age: 23}

// Решение в лоб (карта индексов):
const index = {};
userData.forEach(i => (index[i.id] = i));
// 1: {id: 1, name: 'MaxiMir', job: 'Fullstact', age: 25},
// 2: {id: 2, name: 'Elena', job: 'Student', age: 22},  
// 3: {id: 3, name: 'Victor', job: 'Backend', age: 23},  
index[2]; // {id: 2, name: 'Elena', job: 'Student', age: 22}

// Right Way:
const IndexedArray = new Proxy(Array, {
    construct(target, [args]) {
        const index = {};
        args.forEach(item => (index[item.id] = item))

        return new Proxy(target(...args), {
            get(arr, prop) {
                switch(prop) {
                    case 'push':
                       return item => {
                           index[item.id] = item;
                           arr[prop].call(arr, item);
                       };
                    case 'findById': 
                        return id => index[id];
                    default: 
                        return arr[prop];
                }
            }
        });
    }
});

const users = new IndexedArray([
    {id: 1, name: 'MaxiMir', job: 'Fullstact', age: 25},
    {id: 2, name: 'Elena', job: 'Student', age: 22},  
    {id: 3, name: 'Victor', job: 'Backend', age: 23}    
]);

users.push({id: 7, name: 'John', job: 'Student', age: 22});
users.findById(7); // {id: 7, name: 'John', job: 'Student', age: 22}



// # Генераторы. Symbol iterator, for of:

// @1:
function* strGenerator()
{
    yield 'Y';
    yield 'E';
    yield 'S';
}

const str = strGenerator();
str.next(); // {value: Y, done: false}
str.next(); // {value: E, done: false}
str.next(); // {value: S, done: false}
str.next(); // {value: undefined, done: true}

// @2:
function* numberGen(n = 10) {
    for (let i = 0; i < n; i++) {
        yield i;
    }
}

const num = numberGen(2);
num.next(); // {value: 0, done: false}
num.next(); // {value: 1, done: false}
num.next(); // {value: undefined, done: true}

// @3 cвой генератор:
сonst iterator = {
    gen(n = 10) { // [Symbol.iterator]
        let i = 0;

        return {
            next() {
                if (i < n) {
                    return {value: i++, done: false}
                }

                return {value: undefined, done: true}
            }
        }
    }
};

const itr = iterator().gen(2);
itr.next(); // {value: 1, done: false}
itr.next(); // {value: 2, done: false}
itr.next(); // {value: undefined, done: true}


// @4 for of:
// работает с объектами, у которых определено свойство Symbol(Symbol.Iterator)
function* iter(n = 10) { // в function* по умолч. определен Symbol.Iterator
    for (let i = 0; i < n; i++) {
        yield i;
    }
}

for (let k of iter(6)) {
    console.log(k);
}

// 0
// 1
// 2
// 3
// 4
// 5


// # Методы массивов find и findIndex
const people = [
    { name: "Макс", age: 25, budget: 40000},
    { name: "Игорь", age: 21, budget: 80000}
];
const igor = people.find(person => person.name === 'Игорь'); // { name: "Игорь", age: 21, budget: 80000},
const igorIndex = people.findIndex(person => person.name === 'Игорь'); // 1



// # Object.fromEntries - метод возвращает массив собственных перечисляемых свойств указанного объекта в формате [key, value]
let students = {
    amelia: 20,
    beatrice: 22,
    cece: 20,
    deirdre: 19,
    eloise: 21
};
  
// convert to array in order to make use of .filter() function:
let overTwentyOne = Object.entries(students).filter(([name, age]) => {
    return age >= 21
}) 
// => [ [ 'beatrice', 22 ], [ 'eloise', 21 ] ]
  

// turn multidimensional array back into an object
let DrinkingAgeStudents = Object.fromEntries(overTwentyOne); 
// => { beatrice: 22, eloise: 21 }

/*
It is important to note that arrays and objects are different data structures for a reason. There are certain cases in which switching between the two will cause data loss. The example below of array elements that become duplicate object keys is one of them.
When using these functions make sure to be aware of the potential side effects.
*/



// # Array.prototype.flat - возвращает новый массив, в котором все элементы вложенных подмассивов были рекурсивно "подняты" на указанный уровень depth:
let courseStudents = [
    [ 'Janet', 'Martha', 'Bob', [ 'Phil', 'Candace' ] ],
    [ 'Wilson', 'Taylor' ],
    [ 'Edith', 'Jacob', 'Peter', 'Betty' ]
];
  
let flattenOneLevel = courseStudents.flat()
console.log(flattenOneLevel)
// [
//   'Janet',
//   'Martha',
//   'Bob',
//   [ 'Phil', 'Candace' ],
//   'Wilson',
//   'Taylor',
//   'Edith',
//   'Jacob',
//   'Peter',
//   'Betty'
// ]
  
let flattenTwoLevels = courseStudents.flat(2) // Infinity - для неизвестной глубины
console.log(flattenTwoLevels)
// [
//   'Janet',   'Martha',
//   'Bob',     'Phil',
//   'Candace', 'Wilson',
//   'Taylor',  'Edith',
//   'Jacob',   'Peter',
//   'Betty'
// ]



// # Array.prototype.flatMap - сначала применяет функцию к каждому элементу, а затем преобразует полученный результат в плоскую структуру и помещает в новый массив.:
let grades = [78, 62, 80, 64]

let flatMapped = grades.flatMap(grade => [grade, grade + 7]);
// [
//  78, 85, 62, 69,
//  80, 87, 64, 71
// ]


// # String.trimStart and String.trimEnd:
let message = "   Welcome to CS 101    "
message.trimEnd()
// '   Welcome to CS 101'
message.trimStart()
// 'Welcome to CS 101   '
message.trimEnd().trimStart()
// 'Welcome to CS 101'



// access array item (with default value)
const colors = [];
const [, secondColor = 'black'] = colors;

// immutable operations
const big = {
   foo: 'value Foo',
   bar: 'value Bar'
};

const { foo, ...small } = big;
foo = ''
small; // => { bar: 'value Bar' }

// destructuring iterables
const movies = {
   list: [
      { title: 'Heat' },
      { title: 'Interstellar' }
   ],
   [Symbol.iterator]() {
      let index = 0;
      return {
         next: () => {
            if (index < this.list.length) {
               const value = this.list[index++].title;
               return { value, done: false };
            }
            return { done: true };
         }
      };
   }
};

const [firstMovieTitle] = movies;
console.log(firstMovieTitle); // => 'Heat'


// destructuring dynamic properties
function greet(obj, nameProp) {
   const { [nameProp]: name = 'Unknown' } = obj;
   return `Hello, ${name}!`;
}

greet({ name: 'Batman' }, 'name'); // => 'Hello, Batman!'
greet({ }, 'name'); // => 'Hello, Unknown!'



// # Сохраняем данные формы на сайте при перезагрузке страницы, с помощью sessionStorage:
document.addEventListener("DOMContentLoaded", function() { // событие загрузки страницы
    // выбираем на странице все элементы типа textarea и input
    document.querySelectorAll('textarea, input').forEach(e => {
        // если данные значения уже записаны в sessionStorage, то вставляем их в поля формы
        // путём этого мы как раз берём данные из памяти браузера, если страница была случайно перезагружена
        e.value = window.sessionStorage.getItem(e.name, e.value);
        // на событие ввода данных (включая вставку с помощью мыши) вешаем обработчик
        e.addEventListener('input', () => {
            // и записываем в sessionStorage данные, в качестве имени используя атрибут name поля элемента ввода
            window.sessionStorage.setItem(e.name, e.value);
        })
    })
});




// # Debouncing:

// FILE: debounce.html:
/*
<html>
	<body>
		<label>Search</label>
		<!-- Renders an HTML input box -->
		<input  type="text"  id="search-box">

		<p>No of times event fired</p>
		<p  id='show-api-call-count'></p>

		<p>No of times debounce executed the method</p>
		<p  id="debounce-count"></p>
	</body>
	<script  src="debounce.js"></script>
</html>
*/

// FILE: debounce.js:
let  timerId;
const  searchBoxDom  =  document.getElementById('search-box');

// This represents a very heavy method. Which takes a lot of time to execute
const makeAPICall = () => {
    const  debounceDom  =  document.getElementById('debounce-count');
    const  debounceCount  =  debounceDom.innerHTML  ||  0;

    debounceDom.innerHTML  =  parseInt(debounceCount) +  1
};

// Debounce function: Input as function which needs to be debounced and delay is the debounced time in milliseconds
const debounceFunction = (func, delay) => {
    // Cancels the setTimeout method execution
    clearTimeout(timerId);

    // Executes the func after delay time.
    timerId  =  setTimeout(func, delay)
};

// Event listener on the input box
searchBoxDom.addEventListener('input', () => {
    const  apiCallCountDom  =  document.getElementById('show-api-call-count');
    let  apiCallCount  =  apiCallCountDom.innerHTML  ||  0;
    apiCallCount  =  parseInt(apiCallCount) +  1;

    // Updates the number of times makeAPICall method is called
    apiCallCountDom.innerHTML  =  apiCallCount;

    // Debounces makeAPICall method
    debounceFunction(makeAPICall, 200)
});


// # Throttling
// FILE: throttling.html:
/*
<html>
	<style>
		div {
			border: 1px  solid  black;
			width: 300px;
			height: 200px;
			overflow: scroll;
		}
	</style>
	<body>
		<div  id="div-body">
			<p style="background-color: red; height: 700px">This is line 1</p>
			<p style="background-color: blue; height: 700px">This is line 2</p>
			<p style="background-color: green; height: 700px">This is line 3</p>
			<p style="background-color: yellow; height: 700px">This is line 4</p>
		</div>

		<p>No of times event fired</p>
		<p id='show-api-call-count'></p>

		<p>No of times throttling executed the method</p>
		<p id="debounc-count"></p>
	</body>

	<script  src="throttling.js">  </script>
</html>
* */
// FILE: throttling.js:
let  timerID;
const  divBodyDom  =  document.getElementById('div-body');

// This represents a very heavy method which takes a lot of time to execute
const makeAPICall = () => {
    const  debounceDom  =  document.getElementById('debounc-count');
    let  debounceCount  =  debounceDom.innerHTML  ||  0;

    debounceDom.innerHTML  =  parseInt(debounceCount) +  1
};

// Throttle function: Input as function which needs to be throttled and delay is the time interval in milliseconds
const throttleFunction = (func, delay) => {
    // If setTimeout is already scheduled, no need to do anything
    if (timerID) {
        return;
    }

    // Schedule a setTimeout after delay seconds
    timerID  =  setTimeout(() => {
        func();

        // Once setTimeout function execution is finished, timerId = undefined so that in <br>
        // the next scroll event function execution can be scheduled by the setTimeout
        timerID  =  undefined;
    }, delay);
};

// Event listener on the input box
divBodyDom.addEventListener('scroll', () => {
    const apiCallCountDom  =  document.getElementById('show-api-call-count');
    let apiCallCount  =  apiCallCountDom.innerHTML  ||  0;
    apiCallCount  =  parseInt(apiCallCount) +  1;

    // Updates the number of times makeAPICall method is called
    apiCallCountDom.innerHTML  =  apiCallCount;

    // Throttles makeAPICall method such that it is called once in every 200 milliseconds
    throttleFunction(makeAPICall, 200);
});



// # Убрать из массива переданные отстальными аргументами элементы:
const filterArr = (a, ...args) => a.filter(i => !args.includes(i));
filterArr([1, 2, 3, 4, 5, 6, 7], 1, 3, 5, 6); // => [2, 4, 7]



// # DOM:
// Обёртка как в Jquery:
const $ = document.querySelector.bind(document);
$('#container');

const $$ = document.querySelectorAll.bind(document);
$$('p');

// Добавление элементов:
const link = document.createElement('a');
a.setAttribute('href', '/home');
a.className = 'active';
a.textContent = 'Главная страница';

document.body.appendChild(link);

// нативный эквивалент:
document.body.insertAdjacentHTML('beforeend', '<a href="/home" class="active">Главная страница</a>');
/*
 * 'beforebegin': перед элементом.
 * 'afterbegin': внутри элемента перед его первым потомком. 
 * 'beforeend': внутри элемента после его последнего потомка.
 * 'afterend': после элемента

<!-- beforebegin -->
<p>
  <!-- afterbegin -->
  foo
  <!-- beforeend -->
</p>
<!-- afterend -->
*/

// вставляем текст:
const link = document.createElement('a');
const p = document.querySelector('p');

p.insertAdjacentText('afterbegin', 'foo');


// Двигаем элементы:
/*
Исходный верстка:
<div class="first">
  <h1>Заголовок</h1>
</div>

<div class="second">
  <h2>Подзаголовок</h2>
</div>
*/
const h1 = document.querySelector('h1');
const h2 = document.querySelector('h2');

h1.insertAdjacentElement('afterend', h2); //  и <h2> вставляется после <h1> (он просто сдвигается, а не копируется)

// Заменяем элементы:
const h1 = document.querySelector('h1');
const h2 = document.querySelector('h2');

h1.replaceWith(h2); // заменой выступает новый элемент, созданный с помощью document.createElement, или элемент, который уже есть в том же документе (тогда он снова будет перемещён, а не скопирован

// Создаём элемент из сырого HTML:
/*
Если хотим создать элемент из сырого HTML и использовать его позже:
Для этого понадобится объект DomParser и метод parseFromString. 
> DomParser преобразует исходный код HTML или XML в документ DOM.
> Используем метод parseFromString для создания документа с одним элементом и возвращаем только этот элемент
*/

const createElement = domString => {
    return new DOMParser().parseFromString(domString, 'text/html').body.firstChild;
};

const a = createElement('<a href="/home" class="active">Главная страница</a>');

// Инспектируем DOM:
// Стандартный DOM API также предоставляет методы для инспекции DOM. Например, matchesпроверяет соответствие элемента определённому селектору:
<p class="foo">Hello world</p>

const p = document.querySelector('p');

p.matches('p');     // true
p.matches('.foo');  // true
p.matches('.bar');  // false, нет класса "bar"

/* 
Чтобы получить больше информации об элементах, используй compareDocumentPosition. Этот метод определяет, предшествует ли один элемент другому элементу или следует за ним, или же один из них содержит другой. Возвращает целое число, которое представляет собой отношение между сравниваемыми элементами.

<div class="container">
  <h1 class="title">Foo</h1>
</div>

<h2 class="subtitle">Bar</h2>
*/

const container = document.querySelector('.container');
const h1 = document.querySelector('h1');
const h2 = document.querySelector('h2');

//  20: h1 содержится в элементе container и следует за container
container.compareDocumentPosition(h1); 

// 10: 10: container содержит h1 и предшествует ему
h1.compareDocumentPosition(container);

// 4: h2 следует за h1
h1.compareDocumentPosition(h2);

// 2: h1 предшествует h2
h2.compareDocumentPosition(h1);

/*
Возвращаемое значение compareDocumentPosition– целое число, биты которого представляют собой отношение между узлами касательно аргумента, указанного в этом методе.

Таким образом, с учётом синтаксиса node.compareDocumentPostion(otherNode) возвращаемое число означает:

1: узлы не части одного и того же документа.
2: otherNodeпредшествует node
4: otherNodeследует за node.
8: otherNodeсодержит node.  
16: otherNode содержится вnode.  

Поскольку устанавливается не один бит, в приведённом выше примере container.compareDocumenPosition(h1)возвращает 20, когда ожидалось 16, ведь h1 содержится в container. Но h1 также следует за элементом container(4), поэтому полученное значение равно 16 + 4 = 20.
*/

// Отслеживание изменений  в любом узле DOM:
/*
Для этого используется интерфейс MutationObserver. 
Включает в себя:
> изменения текста
> добавление или удаление узлов из наблюдаемого элемента или изменение атрибутов узла.

MutationObserver– невероятно мощный API для наблюдения практически за любыми изменениями, которые происходят в элементе DOM и его дочерних узлах.

Новый MutationObserverсоздаётся путём вызова конструктора с функцией обратного вызова. Этот обратный вызов будет запускаться всякий раз, когда изменяется наблюдаемый узел:
*/

const observer = new MutationObserver(callback);

// Чтобы отслеживать элемент, вызываем метод наблюдателя observe, где исследуемый узел будет первым аргументом и объект с параметрами – вторым.
const target = document.querySelector('#container');
const observer = new MutationObserver(callback);

observer.observe(target, options);

/*
Наблюдение начинается после вызова observe. Объект параметров принимает следующие ключи:
1. attributes: когда значение true, изменения атрибутов узла будут отслеживаться.
2. attributeFilter: массив имён атрибутов для мониторинга, когда attributes равно true, а этот ключ не задан, наблюдаются изменения всех атрибутов узла.
3. attributeOldValue: при установке true записывается предыдущее значение атрибута при каждом изменении.
4. characterData: когда значение true, регистрирует изменения текста текстового узла, так что подходит для элементов Text, а не HTMLElement. Чтобы это работало, узел должен быть объектом Text или, если наблюдатель отслеживает HTMLElement, требуется значение true у параметра subtree для мониторинга изменений дочерних узлов.
5. characterDataOldValue: если true, регистрируется предыдущее значение символьных данных при каждом изменении.
6. subtree: когда true, также отслеживаются изменения дочерних узлов наблюдаемого элемента. 
7. childList: установи true, чтобы контролировать добавление и удаление дочерних узлов элемента. Если subtree задано значение true, для дочерних элементов также отслеживаются удаление и добавление дочерних узлов. 

Когда начинаешь мониторинг элемента при запуске observe, обратный вызов в конструкторе MutationObserverвызывается с массивом объектов MutationRecord, описывающих произошедшие изменения, и наблюдателем в качестве второго параметра.


A MutationRecordсодержит следующие свойства:

1. type: тип изменения, attributes, characterDataлибо childList.
2. target: изменённый элемент: его атрибуты, символьные данные или дочерние элементы.
3. addedNodes: список добавленных узлов или пустой NodeList, если ничего не добавлялось.
4. removedNodes: список удалённых узлов или пустой NodeList, если ничего не удалялось.
5. attributeName: имя изменённого атрибута или null, если атрибуты не изменялись.
6. previousSibling: предыдущий смежный элемент добавленных или удалённых узлов или null.
7. nextSibling: следующий смежный элемент добавленных или удалённых узлов или null.

Допустим, будем наблюдать изменения в атрибутах и ​​дочерних узлах:
*/
const target = document.querySelector('#container');
const callback = (mutations, observer) => {
  mutations.forEach(mutation => {
    switch (mutation.type) {
      case 'attributes':
        // имя изменённого атрибута находится в
        // mutation.attributeName
        // и его старое значение содержится в mutation.oldValue
        // текущее значение получаем с помощью 
        // target.getAttribute(mutation.attributeName)
        break;
      case 'childList':
        // добавленные узлы хранятся в mutation.addedNodes
        // удалённые узлы – в mutation.removedNodes
        break;
    }
  });
};

const observer = new MutationObserver(callback);

observer.observe(target, {
  attributes: true,
  attributeFilter: ['foo'], // отслеживает только атрибут 'foo'
  attributeOldValue: true,
  childList: true
});

/*
Когда завершаем мониторинг, отключаем наблюдателя и при необходимости вызываем метод takeRecordsдля получения незавершённых изменений, которые ещё не доставлены в обратный вызов:
*/

const mutations = observer.takeRecords();
callback(mutations);
observer.disconnect();


// # КОНСОЛЬ:

// console.count(label) - выводит общее количество вызовов функции:
const sayHello = name => {
    console.count(name) // eсли label не указан, то отображается количество вызовов с параметром по умолчанию.
    console.log(name)
};


// console.warn - выводит в консоли предупреждение:
const sayHello = name => {
    if(!name) {
      console.warn("No name given")
    }
};

// console.table - выводит массивы или объекты в таблице:
const pets = {
    name: "Simon",
    type: "cat"
};
  
const person = {
firstName: "Indrek",
lastName: "Lasn"
};
  
console.table([pets, person]); // с группировкой


// console.group - вывод вложенных групп
console.log("This is the first level");
console.group();
console.log("Level 2");
console.group();
console.log("Level 3");
console.warn("More of level 3");
console.groupEnd();
console.log("Back to level 2");
console.groupEnd();
console.log("Back to the first level");



// # Map, Set, WeakMap, WeakSet

const obj = {
    name: 'Max',
    age: 26,
    job: 'Fullstack'
};

const entries = [
    ['name', 'Max'],
    ['age', 26],
    ['job', 'Fullstack'],
];

Object.entries(obj); // Объект в массив => [['name', 'Max'], ['age', 26], ['job', 'Fullstack']]
Object.fromEntries(entries); // Массив в объект => { name: 'Max', age: 26, job: 'Fullstack' }

// @ Map:
const map = new Map(entries);
map; // { 'name': 'Max', 'age': 26, 'job': 'Fullstack' }
map.get('job'); // Fullstack
map
    .set('newField', 42)
    .set(obj, 'Value of object') // задаем ключ объект
    .set(NaN, 'NaN ??'); // задаем ключ NaN

map.get(obj); // Получаем значение по ключу объекту => Value of object
map.get(NaN); // NaN ??
map.delete('job'); // удаляем из map 'job': 'Fullstack'
map.has('job'); // проверяем наличие в map 'job'
map.size // размер карты => 6
map.clear(); // очищаем карту

for (let [key, value] of map) { // итерируем map

}

for (let keys of map.keys()) { // итерация по значениям

}

for (let val of map.values()) { // итерация по значениям

}

map.forEach((val, key, m) => { // итерация через forEach

});

const array = [...map]; // преобразуем map в массив <-> Array.from(map)
const mabObj = Object.fromEntries(map.entries()); // преобразуем map в массив (если ключ объект, то в объекте будет [object Object])


const users = [
    {name: 'Juli'},
    {name: 'Alex'},
    {name: 'Irina'}
];

const visits = new Map();

visits
    .set(users[0], new Date())
    .set(users[1], new Date(new Date().getTime() + 1000 * 60))
    .set(users[2], new Date(new Date().getTime() + 5000 * 60));

const lastVisit = user => visits.get(user)
lastVisit(user[1]); // 2019-09-26T08:33:21.696Z


// @ Set:
const set = new Set([1,2,3,3,4,4,5]); // остаются уникальные значения => {1,2,3,4,5}
set
    .add(10) // добавленые новых элементов в set
    .add(20);

set.has(32); // проверяет на наличие в set элемента => false
set.size(); // размер set => 7
set.delete(1); // удаление элемента из ыet
set.clear(); // очистка set

set.values(); // [Set Iterator] {1,2,3,4,5,10,20}
set.keys(); // [Set Iterator] {1,2,3,4,5,10,20}
set.entries(); // [Set Entries] {[1,1],[2,2],[3,3],[4,4],[5,5],[10,10],[20,20]}

for (let value of set) { 

}

const uniqValues = array => [...new Set(array)]; // <-> [Array.from(new Set(array))]


// @ WeakMap:

// #1:
let obj = {name: 'weakmap'};
obj = null; // сборщик мусора удалил объект
obj; // null

// #2:
let obj = {name: 'weakmap'};
const arr = [obj];
obj = null; // сборщик мусора удалил объект
obj; // null
arr; // {name: 'weakmap'}


сonst weakMap = new WeakMap([ // позволяет избежать утечки памяти (ключи только объекты)
    [obj, 'obj Data']
]); 

// METHODS: // get set delete has

weakMap.has(obj); // true
weakMap.get(obj); // obj Data

obj.null; // сборщик мусора удалил объект obj + удалил obj в weakMap
map.get(obj); // undefined
map // WeakMap { <items> unknown> }

const cache = new WeakMap();

const cacheUser = user => {
    if (!cache.has(user)) {
        cache.set(user, Date.now());
    }

    return cache.get(user);
};

const lena = {name: 'Elena'};
const alex = {name: 'Alex'};

cacheUser(lena);
cacheUser(alex);

lena = null;

// автоматически у WeakMap был удален объект + очищена память
0
cache.has(lena); // true0
cache.has(alex); // true0
0

// @ WeakSet:
const users = [
    {name: 'Elena'},
    {name: 'Alex'},
    {name: 'Irina'}
];

const visits = new WeakSet();

visits
    .add(users[0])
    .add(users[1]);

users.splice(1, 1);    
// автоматически у WeakSet был удален объект + очищена память

console.log(visits.has(users[0])); // true
console.log(visits.has(users[1])); // false