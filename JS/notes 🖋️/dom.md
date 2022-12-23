### Design mode:

```js
document.designMode = "on" // controls whether the entire document is editable
```

### Random Color:

```js
document.body.style.background = `#${Math.floor(Math.random() * 0xffffff).toString(16)}` 
```

### Screen Capture:

```js
const previewElem = document.getElementById('preview')
const button = document.querySelector('button')

button.addEventListener("click", async () => {
	const options = {
		video: {
			cursor: "always", // show the cursor
		},
		audio: false // don't record audio
	}

	previewElem.srcObject = await navigator.mediaDevices.getDisplayMedia(options)
})
```

#### Обертка как в Jquery:

```js
const $ = document.querySelector.bind(document)
$('#container')

const $$ = document.querySelectorAll.bind(document)
$$('p')
```

### Сохраняем данные формы при перезагрузке страницы:

```js
document.addEventListener("DOMContentLoaded", () => { // событие загрузки страницы
	document.querySelectorAll('textarea, input').forEach(field => {
		// если данные значения уже записаны в sessionStorage, то вставляем их в поля формы
		// путём этого мы как раз берём данные из памяти браузера, если страница была случайно перезагружена
		field.value = window.sessionStorage.getItem(field.name, field.value)
		// на событие ввода данных (включая вставку с помощью мыши) вешаем обработчик
		field.addEventListener('input', () => {
			// и записываем в sessionStorage данные, в качестве имени используя атрибут name поля элемента ввода
			window.sessionStorage.setItem(field.name, field.value)
		})
	})
})
```

#### Debounce:

```html
<html>
<body>
<label>Search</label>
<!-- Renders an HTML input box -->
<input type='text' id='search-box'>

<p>No of times event fired</p>
<p id='show-api-call-count'></p>

<p>No of times debounce executed the method</p>
<p id='debounce-count'></p>
</body>
<script src='debounce.js'></script>
</html>
```

```js
// debounce.js
let timerId
const searchBoxDom = document.getElementById('search-box')

// This represents a very heavy method. Which takes a lot of time to execute
const makeAPICall = () => {
	const debounceDom = document.getElementById('debounce-count')
	const debounceCount = debounceDom.innerHTML || 0

	debounceDom.innerHTML = parseInt(debounceCount) + 1
}

// Debounce function: Input as function which needs to be debounced and delay is the debounced time in milliseconds
const debounceFunction = (func, delay) => {
	// Cancels the setTimeout method execution
	clearTimeout(timerId)

	// Executes the func after delay time.
	timerId = setTimeout(func, delay)
}

searchBoxDom.addEventListener('input', () => {
	const apiCallCountDom = document.getElementById('show-api-call-count')
	const apiCallCount = parseInt(apiCallCountDom.innerHTML || 0) + 1

	// Updates the number of times makeAPICall method is called
	apiCallCountDom.innerHTML = apiCallCount

	// Debounces makeAPICall method
	debounceFunction(makeAPICall, 200)
})
```

### Throttling:

```html
<html>
<style>
  div {
    border: 1px solid black;
    width: 300px;
    height: 200px;
    overflow: scroll;
  }
</style>
<body>
<div id='div-body'>
  <p style='background-color: red; height: 700px'>This is line 1</p>
  <p style='background-color: blue; height: 700px'>This is line 2</p>
  <p style='background-color: green; height: 700px'>This is line 3</p>
  <p style='background-color: yellow; height: 700px'>This is line 4</p>
</div>

<p>No of times event fired</p>
<p id='show-api-call-count'></p>

<p>No of times throttling executed the method</p>
<p id='debounc-count'></p>
</body>

<script src='throttling.js'></script>
</html>
```

```js
let timerID
const divBodyDom = document.getElementById('div-body')

// This represents a very heavy method which takes a lot of time to execute
const makeAPICall = () => {
	const debounceDom = document.getElementById('debounc-count')
	let debounceCount = debounceDom.innerHTML || 0

	debounceDom.innerHTML = parseInt(debounceCount) + 1
}

// Throttle function: Input as function which needs to be throttled and delay is the time interval in milliseconds
const throttleFunction = (func, delay) => {
	// If setTimeout is already scheduled, no need to do anything
	if (timerID) {
		return
	}

	// Schedule a setTimeout after delay seconds
	timerID = setTimeout(() => {
		func()
		// Once setTimeout function execution is finished, timerId = undefined so that in <br>
		// the next scroll event function execution can be scheduled by the setTimeout
		timerID = undefined
	}, delay)
}

// Event listener on the input box
divBodyDom.addEventListener('scroll', () => {
	const apiCallCountDom = document.getElementById('show-api-call-count')
	let apiCallCount = apiCallCountDom.innerHTML || 0
	apiCallCount = parseInt(apiCallCount) + 1

	// Updates the number of times makeAPICall method is called
	apiCallCountDom.innerHTML = apiCallCount

	// Throttles makeAPICall method such that it is called once in every 200 milliseconds
	throttleFunction(makeAPICall, 200)
})
```

#### Добавление элементов:

```js
const link = document.createElement('a')
link.setAttribute('href', '/home')
link.className = 'active'
link.textContent = 'Главная страница'

document.body.appendChild(link)

// <-> нативный эквивалент:
document.body.insertAdjacentHTML('beforeend', '<a href="/home" class="active">Главная страница</a>')
```

**beforebegin**: перед элементом.
**afterbegin**: внутри элемента перед его первым потомком.
**beforeend**' внутри элемента после его последнего потомка.
**afterend**: после элемента

```html
 <!-- beforebegin -->
 <p>
 <!-- afterbegin -->
 foo
 <!-- beforeend -->
 </p>
 <!-- afterend -->
```

#### Вставка текста:

```js
const p = document.querySelector('p');
p.insertAdjacentText('afterbegin', 'foo');
```
