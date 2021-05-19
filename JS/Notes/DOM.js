// @ ОБЕРТКА КАК В Jquery:
const $ = document.querySelector.bind(document);
$('#container');

const $$ = document.querySelectorAll.bind(document);
$$('p');


// @ СОХРАНЯЕМ ДАННЫЕ ФОРМЫ НА САЙТЕ ПРИ ПЕРЕЗАГРУЗКЕ СТРАНИЦЫ:
document.addEventListener("DOMContentLoaded", function () { // событие загрузки страницы
                                                            // выбираем на странице все элементы типа textarea и input
	document.querySelectorAll('textarea, input').forEach(e => {
		// если данные значения уже записаны в sessionStorage, то вставляем их в поля формы
		// путём этого мы как раз берём данные из памяти браузера, если страница была случайно перезагружена
		e.value = window.sessionStorage.getItem(e.name, e.value);
		// на событие ввода данных (включая вставку с помощью мыши) вешаем обработчик
		e.addEventListener('input', () => {
			// и записываем в sessionStorage данные, в качестве имени используя атрибут name поля элемента ввода
			window.sessionStorage.setItem(e.name, e.value);
		});
	})
});


// @ DEBOUNCING:
// FILE: debounce.html:
/**
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
let timerId;
const searchBoxDom = document.getElementById('search-box');

// This represents a very heavy method. Which takes a lot of time to execute
const makeAPICall = () => {
	const debounceDom = document.getElementById('debounce-count');
	const debounceCount = debounceDom.innerHTML || 0;

	debounceDom.innerHTML = parseInt(debounceCount) + 1
};

// Debounce function: Input as function which needs to be debounced and delay is the debounced time in milliseconds
const debounceFunction = (func, delay) => {
	// Cancels the setTimeout method execution
	clearTimeout(timerId);

	// Executes the func after delay time.
	timerId = setTimeout(func, delay)
};

// Event listener on the input box
searchBoxDom.addEventListener('input', () => {
	const apiCallCountDom = document.getElementById('show-api-call-count');
	let apiCallCount = apiCallCountDom.innerHTML || 0;
	apiCallCount = parseInt(apiCallCount) + 1;

	// Updates the number of times makeAPICall method is called
	apiCallCountDom.innerHTML = apiCallCount;

	// Debounces makeAPICall method
	debounceFunction(makeAPICall, 200)
});


// @ THROTTLING:
// FILE: throttling.html:
/**
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
 */

// FILE: throttling.js:
let timerID;
const divBodyDom = document.getElementById('div-body');

// This represents a very heavy method which takes a lot of time to execute
const makeAPICall = () => {
	const debounceDom = document.getElementById('debounc-count');
	let debounceCount = debounceDom.innerHTML || 0;

	debounceDom.innerHTML = parseInt(debounceCount) + 1;
};

// Throttle function: Input as function which needs to be throttled and delay is the time interval in milliseconds
const throttleFunction = (func, delay) => {
	// If setTimeout is already scheduled, no need to do anything
	if (timerID) {
		return;
	}

	// Schedule a setTimeout after delay seconds
	timerID = setTimeout(() => {
		func();
		// Once setTimeout function execution is finished, timerId = undefined so that in <br>
		// the next scroll event function execution can be scheduled by the setTimeout
		timerID = undefined;
	}, delay);
};

// Event listener on the input box
divBodyDom.addEventListener('scroll', () => {
	const apiCallCountDom = document.getElementById('show-api-call-count');
	let apiCallCount = apiCallCountDom.innerHTML || 0;
	apiCallCount = parseInt(apiCallCount) + 1;

	// Updates the number of times makeAPICall method is called
	apiCallCountDom.innerHTML = apiCallCount;

	// Throttles makeAPICall method such that it is called once in every 200 milliseconds
	throttleFunction(makeAPICall, 200);
});


// @ ДОБАВЛЕНИЕ ЭЛЕМЕНТОВ:
const link = document.createElement('a');
link.setAttribute('href', '/home');
link.className = 'active';
link.textContent = 'Главная страница';

document.body.appendChild(link);

// <-> нативный эквивалент:
document.body.insertAdjacentHTML('beforeend', '<a href="/home" class="active">Главная страница</a>');

/**
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


// @ ВСТАВЛЯЕМ ТЕКСТ:
const p = document.querySelector('p');
p.insertAdjacentText('afterbegin', 'foo');


// @ ДВИГАЕМ ЭЛЕМЕНТЫ:
/**
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


// @ ЗАМЕНЯЕМ ЭЛЕМЕНТЫ:
const h1 = document.querySelector('h1');
const h2 = document.querySelector('h2');

h1.replaceWith(h2); // заменой выступает новый элемент, созданный с помощью document.createElement, или элемент, который уже есть в том же документе (тогда он снова будет перfемещён, а не скопирован


// @ СОЗДАЕМ ЭЛЕМЕНТ ИЗ СЫРОГО HTML:
/**
 Если хотим создать элемент из сырого HTML и использовать его позже:
 Для этого понадобится объект DomParser и метод parseFromString.
 > DomParser преобразует исходный код HTML или XML в документ DOM.
 > Используем метод parseFromString для создания документа с одним элементом и возвращаем только этот элемент
 */

const createElement = domString => {
	return new DOMParser().parseFromString(domString, 'text/html').body.firstChild;
};

const a = createElement('<a href="/home" class="active">Главная страница</a>');


// @ ИНСПЕКТИРУЕМ DOM:
// Стандартный DOM API также предоставляет методы для инспекции DOM. Например, matches проверяет соответствие элемента определённому селектору:
// <p class="foo">Hello world</p>

const p = document.querySelector('p');

p.matches('p');     // true
p.matches('.foo');  // true
p.matches('.bar');  // false, нет класса "bar"

/**
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

/**
 Возвращаемое значение compareDocumentPosition– целое число, биты которого представляют собой отношение между узлами касательно аргумента, указанного в этом методе.
 nodeA.compareDocumentPosition(nodeB):

 Биты    Число       Значение

 000000  0           nodeA и nodeB ‐‐ один и тот же узел

 000001  1           Узлы в разных документах (или один из них не в документе)

 000010  2           nodeB предшествует nodeA (в порядке обхода документа)

 000100  4           nodeA предшествует nodeB

 001000  8           nodeB содержит nodeA

 010000  16          nodeA содержит nodeB

 100000  32          Зарезервировано для браузера

 Поскольку устанавливается не один бит, в приведённом выше примере container.compareDocumenPosition(h1)возвращает 20, когда ожидалось 16, ведь h1 содержится в container. Но h1 также следует за элементом container(4), поэтому полученное значение равно 16 + 4 = 20.
 */



// @ Проверить конкретное условие, например, "nodeA содержит nodeB":
const body = document.body;
const li = document.body.children[0].children[0];

if (body.compareDocumentPosition(li) & 16) {

}


// @ node.sourceIndex:
// Номер элемента node в порядке прямого обхода дерева. Только для узлов‐элементов.


// @ ОТСЛЕЖИВАНИЕ ИЗМЕНЕНИЙ В ЛЮБОМ УЗЛЕ DOM:
/**
 Для этого используется интерфейс MutationObserver.
 Включает в себя:
 > изменения текста
 > добавление или удаление узлов из наблюдаемого элемента или изменение атрибутов узла.

 MutationObserver – невероятно мощный API для наблюдения практически за любыми изменениями, которые происходят в элементе DOM и его дочерних узлах.

 Новый MutationObserver создаётся путём вызова конструктора с функцией обратного вызова. Этот обратный вызов будет запускаться всякий раз, когда изменяется наблюдаемый узел:
 */

const observer = new MutationObserver(callback);

// Чтобы отслеживать элемент, вызываем метод наблюдателя observe, где исследуемый узел будет первым аргументом и объект с параметрами – вторым.
const target = document.querySelector('#container');
const observer = new MutationObserver(callback);

observer.observe(target, options);

/**
 Наблюдение начинается после вызова observe. Объект параметров принимает следующие ключи:
 1. attributes: когда значение true, изменения атрибутов узла будут отслеживаться.
 2. attributeFilter: массив имён атрибутов для мониторинга, когда attributes равно true, а этот ключ не задан, наблюдаются изменения всех атрибутов узла.
 3. attributeOldValue: при установке true записывается предыдущее значение атрибута при каждом изменении.
 4. characterData: когда значение true, регистрирует изменения текста текстового узла, так что подходит для элементов Text, а не HTMLElement. Чтобы это работало, узел должен быть объектом Text или, если наблюдатель отслеживает HTMLElement, требуется значение true у параметра subtree для мониторинга изменений дочерних узлов.
 5. characterDataOldValue: если true, регистрируется предыдущее значение символьных данных при каждом изменении.
 6. subtree: когда true, также отслеживаются изменения дочерних узлов наблюдаемого элемента.
 7. childList: установи true, чтобы контролировать добавление и удаление дочерних узлов элемента. Если subtree задано значение true, для дочерних элементов также отслеживаются удаление и добавление дочерних узлов.

 Когда начинаешь мониторинг элемента при запуске observe, обратный вызов в конструкторе MutationObserverвызывается с массивом объектов MutationRecord, описывающих произошедшие изменения, и наблюдателем в качестве второго параметра.


 A MutationRecord содержит следующие свойства:

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

// Когда завершаем мониторинг, отключаем наблюдателя и при необходимости вызываем метод takeRecordsдля получения незавершённых изменений, которые ещё не доставлены в обратный вызов:

const mutations = observer.takeRecords();
callback(mutations);
observer.disconnect();


// @ ОТЛИЧИЕ getElementsBy* ОТ querySelectorAll:
/**
 Результаты поиска getElementsBy* – живые! При изменении документа – изменяется и результат запроса.
 Например, найдём все div при помощи querySelectorAll и getElementsByTagName , а потом изменим документ:
 */
const resultGet = document.getElementsByTagName('div');
const resultQuery = document.querySelectorAll('div');
resultQuery.length; // => 1
resultGet.length; // => 1

document.body.innerHTML = '';

resultQuery.length; // => 1
resultGet.length; // => 0

// getElementsBy*- возвращают динамическую HTML-коллекцию (HTMLCollection)
// querySelector* - возвращают статический список нод (NodeList)

// @ ВЫПОЛНЕНИЕ ФУНКЦИИ ПОСЛЕ ЗАГРУЗКИ СТРАНИЦЫ:
document.readyState === 'complete' ?
	someFunction()
	:
	window.addEventListener('load', someFunction, false);


// @ ПОЛИФИЛЛ:
// <script src="//cdn.polyfill.io/v1/polyfill.js?features=es6"></script>
// При запросе сервис анализирует заголовки, понимает, какая версия какого браузера к нему обратилась и возвращает скрипт‐полифилл, добавляющий в браузер возможности, которых там нет.


// @ ИСХОДНОЕ ЗНАЧЕНИЕ value
// <input id="input" type="text" value="markup">

// При изменении свойства input.value атрибут input.getAttribute('value') не меняется:
input.value = 'new'; // поменяли свойство
input.getAttribute('value'); // 'markup', не изменилось!

// То есть, изменение DOM‐свойства value на атрибут не влияет, он остаётся таким же. А вот изменение атрибута обновляет свойство:
input.setAttribute('value', 'new'); // поменяли атрибут
input.value; // 'new', input.value изменилось

// Получается, что атрибут input.getAttribute('value') хранит оригинальное (исходное) значение даже после того, как пользователь заполнил поле и свойство изменилось.


// @ СОБЫТИЕ ОКОНЧАНИЕ АНИМАЦИИ:
elem.addEventListener("transitionend", () => {
	console.log("addEventListener");
});


// @ Проверка на видимость элемента:
// <img src="https://js.cx/lazyimg/1.gif" width="680" height="433" realsrc="https://js.cx/lazyimg/6.jpg"></div>

/**
 * Проверяет элемент на попадание в видимую часть экрана.
 * Для попадания достаточно, чтобы верхняя или нижняя границы элемента были видны.
 */
const isVisible = elem => {
	const coords = elem.getBoundingClientRect();
	const windowHeight = document.documentElement.clientHeight;
	const topVisible = coords.top > 0 && coords.top < windowHeight;
	const bottomVisible = coords.bottom > 0 && coords.bottom < windowHeight;

	return topVisible || bottomVisible;
};

const showVisibleImages = () => {
	const images = document.getElementsByTagName('img');

	for (let image of images) {
		const realSrc = image.getAttribute('realsrc');

		if (realSrc && isVisible(image)) {
			image.src = realSrc;
			image.setAttribute('realsrc', '');
		}
	}
};

showVisibleImages();
window.onscroll = showVisibleImages;


// @ ВСТАВКА ЗАГРУЖЕННОЙ КАРТИНКИ:
/* --- HTML ---
<input id="inp" type='file'>
<p id="b64"></p>
<img id="img" height="150"></img>
*/
function readFile() {
	if (this.files && this.files[0]) {
		const FileReader = new FileReader();

		FileReader.addEventListener("load", e => {
			document.getElementById("img").src = e.target.result;
			document.getElementById("b64").innerHTML = e.target.result;
		});

		FileReader.readAsDataURL(this.files[0]);
	}
}

document.getElementById("inp").addEventListener("change", readFile);

