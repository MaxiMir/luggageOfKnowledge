/* ######## Vue ######### */
<?

# http://book.loftschool.com/vuejs

/** 
  @ ЗАЧЕМ?
  * Обеспечивать сложный front-end
  * SPA, PWA
  * Отдельные виджеты  
  * Реактивность - данные сообщают об их изменений, и представление отображает текущее состояние модели

  @ ЧТО?
  * Виртуальный DOM
  * Система событий
  * Система шаблонов
  * Двусторонная связь данных

  @ Виртуальный дом
  * Представление реального DOM в виде объекта JS
  * Оптимальный процесс взаимодействия
  * Меньшее количество обращений к DOM
*/


// FILE: index.html: ?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta chatset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>vue-js</title
	<script src="https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js"></script> <!-- подключаем вверху -->
	<style>
		[v-cloak]: {
			display: none;
		}
	</style>
</head>
<body>
    <div id="app" v-cloak> <!-- атрибут v-cloak будет у элемента, до тех пор, пока Vue его не обработает -->
		<h1>{{ title }}</h1> <!-- ИЛИ: <h1 v-text="title"></h1> если кроме title ничего нет -->
		
		<!-- v-pre: -->
		<p v-pre>{{ title }}</p> <!-- {{ title }} не будет обработан Vue -->

		<!-- v-once: -->
		<p v-text="text" v-once></p> <!-- перерисован будет только 1 раз --> 
		<p v-text="text"></p>
		
		 <!-- v-on: -->
		<input 
			type="text" 
			v-on:input="handleChange"
		> <!-- v-on - обработка событий, input - имя события, handleChange - имя метода для обработки 

		! Сокращенная рекомендуемая запись: v-on:input="handleChange" -> @input="handleChange"
		-->

		<!-- Несколько обработчиков: -->
		<input 
			type="text" 
			v-on:"{input="handleChange", focus:handleFocus}"
		> 

		<!-- Вывод динамических свойств в атрибутах элемента:-->
		<a v-bind:href="href">ссылка</a> <!-- v-bind +  без {{ }}. В v-bind можно реализовывать JS код

		! Сокращенная рекомендуемая запись: v-bind:href="href" -> :href="href"
		-->


		<!-- Вывод HTML:-->
		<p v-html="link"></p>

		<!-- Методы с параметрами:-->
		<div>{{textOfBtn.textOfBtn}}, был клик в x = {{textOfBtn.coordX}}</div>
		<button @click="handleClick('ONE', $event)">Изменить</button> <!-- $event - данные о событии -->
		<button @click="handleClick('TWO', $event)">Изменить</button>


		<!--
			v-model — позволяет связать элемент ввода в шаблоне и заставляет его изменять свойство данных Vue, когда пользователь меняет содержимое поля в шаблоне;
			v-show — элемент не будет исчеpпать из разметки, а будет добавляться display: none;
			v-if, v-else и v-else-if — директивы условий;
			v-for — позволяет создать список элементов.
		-->
	</div>
	 
    <script src="main.js"></script>
</body>



<script src="main.js"></script><script>

// FILE: main.js:
new Vue({
	el: '#app', 
	data: { // данные которые хотим отрисовать в компоненте
		title: 'Hello world',
		text: 'some text',
		href: '//gogle.com',
		link: "<a href='google.com'>google.com</a>",
		textOfBtn: { // объединяем данные одной сущности в объект
			'title': 'Ждем клика',   
			coordX: 0  
		}  
	},
	methods: {
		handleChange(e) {
			this.title = e.target.value // меняем title на значение из input
		},
		handleClick(newTitle, e) {
			this.textOfBtn.title = newTitle;
			this.textOfBtn.coordX = e.clientX;
		} 
	}
});

</script>



<!-- # Модификаторы событий -->
<div id="app">
	<div class="outer" @click.capture="handleOuter"> <!-- события срабатывают в момент погружения
		@click.stop <-> e.stopPropagation()
		@click.self - обработчик сработает только на том элементе, на котором произошло событие
		@click.once - обработчик сработает только 1 раз
		@click.passive - соответствует опции passive в addEventListener. Улучшить взаимодейтсвие пользователя со скроллом: при нажатии элемента в пассивный элемент, скролл не будет думать нужно ли ему скроллится или нет, а сразу будет производить необходимые операции.
		@click.left - нажатие левой кнопки мыши
		@click.right - нажатие правой кнопки мыши
		@click.middle - нажатие средней кнопки мыши
		@keydown.alt.enter - нажатие alt + enter (tab|delete|space|esc|up|down|left|right|down|alt|meta). Можжно и с кодом кнопки @keydown.alt.67
		-->
		внешний
		<div class="inner" @click="handleInner"></div>

		<a @click.prevent href="#">ссылка</a> <!-- отменяем действия по умолчанию @click.prevent.once() - отменить действия по умолчанию 1 раз --> 	
	</div>
</div>		

<script src="main.js"></script><script>

// FILE: main.js:
new Vue({
	el: '#app', 
	data: { 
		expample: {
			'title': 'Ждем клика',   
			coordX: 0  
		}  
	},
	methods: {
		handleOuter(e) {
			console.log('Внешний');
		},
		handleInner(newTitle, e) {
			console.log('Внутренний');
		}
	}
});
</script>

<!--
Без @click:
Внутренний
Внешний

C @click.capture:
Внешний
Внутренний

С @click.stop:
Внутренний
-->


<!-- # Вычисляемые свойства -->
<div id="app">
	<h1>{{ reversedTitle }}</h1>

	<h2>{{ title }}</h2>
	<button @click="setupTitle">Вывести #1</button>
	<button @click="setupSecondTitle">Вывести #2</button>
</div>

<script src="main.js"></script><script>

// FILE: main.js:
new Vue({
	el: '#app', 
	data: { 
		title: 'Hello world!'
	},
	computed: { // вычисляемые свойства (выполняются 1 раз, затем кэшируются)
		reversedTitle() {
			return this.title.split('').revese().join();
		},
		newTitle() {
			return 'new Title'; // #1
		},
		newSecondTitle: { // #2 !через объект
			get() {
				return 'new second Title';		
			},
			set(value) {
				this.title = `new second Title ${value}`
			}
		}
	},
	methods: {
		setupTitle() {
			this.title = this.newTitle; // # берем из #1
		},
		setupSecondTitle() {
			this.newSecondTitle = 'from setter'; // setter
			this.title = this.newSecondTitle; // getter
		}
	}
});
</script>



<!-- # Вотчеры  -->
<div id="app">
	<h1>{{ title }}</h1>

	<p>{{ title }}</pack>
</div>

<script src="main.js"></script><script>

// FILE: main.js:
new Vue({
	el: '#app', 
	data: { 
		title: 'Hello world!',
		status: ""
	},
	methods: {
		setupTitle() {
			this.title = "new title";
		}
	},
	watch: { // указываем свойства, за которыми будем следить
		title(value) { // в value на что было изменено
			this.status = `title изменился на ${value}`;
		}
	}
});	
</script>



<!-- # Управление классами -->
<div id="app">
	<h1 class="static-class" :class="{active: changed}"></h1> <!-- className: propName (propName - true ? добавляем класс className : не добавляем ) 

	// еще пример: класс active и colored - по условию, класс error - всегда:
	:class="[{ active: changed, active: colored }, errorClass]" 
	-->

	<button @click="setupTitle">
		Вывести
	</button>	
</div>

<script src="main.js"></script><script>

// FILE: main.js:
new Vue({
	el: '#app', 
	data: { 
		title: 'Hello world!',
		activeClass: 'active',
		errorClass: 'error'
		changed: false
	},
	methods: {
		setupTitle() {
			this.changed = !this.changed;
		}
	}
});
</script>



<!-- # Работа со стилями: -->
<div id="app">
	<h1 :style="styles">{{title}}</h1> 
	<p :style="{color: fontNewColor, backgroundColor: backgroundColor }">
		Some text
	</p>
</div>

<script src="main.js"></script><script>

// FILE: main.js:
new Vue({
	el: '#app', 
	data: { 
		title: 'Hello world!',
		styles: {
			color: 'white',
			backgroundColor: 'blue',
			fontSize: '20px'
		},
		fontNewColor: 'blue',
		backgroundColor: 'pink'
	}
});
</script>


<!-- # Условный рендеринг: -->
<div id="app">
	<h1 v-if="num === 0">0</h1>
	<h1 v-else-if="num <= 5">меньше 5</h1> <!-- должны распологаться друг за другом -->
	<h1 v-else>больше 5</h1>

	<p v-show="show">Some text</p> <!-- при false делает display: none -->
	<button @click="change">
		Изменить
	</button>
</div>

<script src="main.js"></script><script>

// FILE: main.js:
new Vue({
	el: '#app', 
	data: { 
		show: true;
		num: 0
	},
	methods: {
		change() {
			this.show = !this.show;
			this.num += 1;
		}
	}
});
</script>


<!-- # Рендеринг списков: -->
<div id="app">
	<ul> <!-- массивы -->
		<li v-for="elem in arr"> <!-- для получения индексов "(elem, index) in arr" -->
			{{elem}}
		</li>
	</ul>
	<ul> <!-- объекты -->
		<li v-for="(val, prop) in obj">  <!-- перебор объекта -->
			{{prop}} : {{val}}
		</li>	
	</ul>
	<ul>
		<li 
			v-for="member in arrObj"
			@click="handleClick" 
			v-if="member.salary < 1500"
		><!-- В цикле вышаем обработчики на клик и вывод по условию -->
			<p>name: {{member.name}}</p>
			<p>salary: {{member.salary}}</p>
		</li>
	</ul>
	<ul>
		<li v-for="n in 10"><!-- выводим 10 li-->
			{n}
		</li>
	</ul>

</div>

<script src="main.js"></script><script>

// FILE: main.js:
new Vue({
	el: '#app', 
	data: { 
		arr: ['one', 'two', 'three'],
		obj: {
			prop1: 'val1',
			prop2: 'val2'
		},
		arrObj: [
			{name: 'John', salary: 2000},
			{name: 'Foo', salary: 500},
			{name: 'Bar', salary: 1500}
		]
	}
});
</script>


<!-- # Объект Vue -->
<div id="app">
	<h1>{{title}}</h1>
</div>

<script src="main.js"></script><script>

// FILE: main.js:
const vueModel = new Vue({
	data: { // здесь объявляется реактивные поля
		title: 'hello world!'
	},
	methods: {
		testMeth() {
			this.$data.newProp = '123'
		}
	}
});

vueModel.$mount('#app'); // монтируем в 'селекторЭлемента'

setTimeout(() => {
	vueModel.$data.title = 'Поменялось извне' // изменяем title через 2с (таким образом можно менять поля только из data)
}, 2000);

/*
На стадии "mount" содержимое DOM узла, указанного в свойстве "el" полностью заменяется 
на результат выполнения рендер-функции Vue
*/
</script>



<!-- # Создание компонента -->
<div id="app"> <!--используем в примонтированном объекте: -->
	<hello></hello><!-- каждый компонент независимая сущность -->
	<hello></hello><!-- каждый компонент независимая сущность -->
	<hello></hello><!-- каждый компонент независимая сущность -->
</div>

<script src="main.js"></script><script>

// FILE: main.js:
Vue.component('hello', { // экземляр компонета. hello - название компонента, в {} - настройки
	template: '<h1 @click="handleClick">{{title}}</h1>',
	data() { // ! в экземляре компонента data должна возвращать объект
		return {
			'title': 'hello world'
		}
	},
	methods: {
		handleClick() {
			this.title = 'title from handler';
		}
	}
});

const vueModel = new Vue();
vueModel.$mount('#app');
</script>



<!-- # Шаблон компонента + Локальные компоненты -->
<div id="app"> <!--компоненты выводим в примонтированном объекте: -->
	<hello></hello><!-- каждый компонент независимая сущность -->
	<hello></hello><!-- каждый компонент независимая сущность -->
	<hello></hello><!-- каждый компонент независимая сущность -->

	<!-- или так -->
	<hello v-for="n in 3"></hello>
</div>

<script type="text/x-template" id="helloTemplate">
	<div>
		<h1 @click="handleClick">{{title}}</h1>
		<outerComponent></outerComponent><!-- выводим глобальный компонент-->
		<innerComponent></innerComponent><!-- выводим локальный компонент-->
	</div>
</script>

<script src="main.js"></script><script>

// FILE: main.js:
Vue.component('outerComponent', {
	template: '<span> внутренний компонент</span>'
});


Vue.component('hello', { 
	template: "#helloTemplate", // указываем селектор шаблона
	data() { 
		return {
			'title': 'hello world'
		}
	},
	mounted() { // компонент был вмонтирован (полная готовность к функционированию)
		console.log('компонерт hello вмонтирован');
	},
	methods: {
		handleClick() {
			this.title = 'title from handler';
		}
	},
	components: { // локальный компонент:
		innerComponent: {
			template: '<span> внутренний компонент</span>'
		}
	}
});

const vueModel = new Vue(); 
vueModel.$mount('#app');
</script>



<!-- # Свойства компонента -->
<div id="app"> 
	<hello 
		:key="name"
		v-for="name in names"
		:name="name" 
	></hello><!--для внутренней оптимизации Vue, добавляем уникальный key-->
<div>
	
<script type="text/x-template" id="helloTemplate">
	<h1>Hello {{name}}!</h1>
</script>

<script src="main.js"></script><script>

// FILE: main.js:
Vue.component('hello', { 
	props: ['name'], // регистрируем с какими свойствами будем работать в компоненте
	template: "#helloTemplate",
});

const vueModel = new Vue({
	data() { // data добавляем в корневой компонент, чтобы данные из нее были доступны в цикле
		return {
			names: ['Maxim', 'Bill', 'John', 'Hank']
		}
	}
});
vueModel.$mount('#app');
</script>



<!-- # Пользовательские события -->
<div id="app"> 
	<hello 
		:key="name"
		v-for="name in names"
		:name="name" 
	></hello><!--для внутренней оптимизации Vue, добавляем уникальный key-->
<div>
	
<script type="text/x-template" id="helloTemplate">
	<h1>Hello {{title}}!</h1>
	<child @clickEmitted="changeTitle"></child> <!-- #2 -->
</script>
	
<script type="text/x-template" id="childTemplate">
	<button @click="handleClick">
		Оповестить
	</button>
</script>

<script src="main.js"></script><script>


// FILE: main.js:
Vue.component('child', {
	template: "#childTemplate",
	methods: {
		handleClick() {
			this.$emit('clickEmitted', {
				string: "new title",
				num: 123
			}); // #1
			// возможность обратится к родительскому компоненту. 
			// clickEmitted - имя пользовательского события
			// {} - передаваемые данные
		}
	}
});

Vue.component('hello', { 
	props: ['name'], // регистрируем с какими свойствами будем работать в компоненте
	template: "#helloTemplate",
	data() {
		return {
			title: 'world'
		}
	},
	methods: {
		changeTitle(payload) { // #3
			this.title = newTitle;
		}
	}
});

const vueModel = new Vue({
	data() { // data добавляем в корневой компонент, чтобы данные из нее были доступны в цикле
		return {
			names: ['Maxim', 'Bill', 'John', 'Hank']
		}
	}
});
vueModel.$mount('#app');

</script>


<!-- # Vue CLI --
https://cli.vuejs.org/guide/creating-a-project.html#using-the-gui

$ npm install -g @vue/cli // yarn global add @vue/cli
$ vue create my-vue-project 
$ vue inspect // выведет конфиг данного форкфлоу, или сохраним в файл: vue inspect > output.js

// Для расширения/изменения сборки, в корне необходимо создать файл vue.config.js:
module.exports = {
	// настройки для сборки webpack
}


// Создаем более простую сборку с webpack и singlefile компоненты:
vue init webpack-simple vue-components
cd vue-components
npm install // устанавливаем все зависимости

-->