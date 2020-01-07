// LINK: https://github.com/vladilenm/podcast-js-app

// + FOLDER: /app
// + FOLDER: /app/src/ - для исходников

/**
	$ npm init
	description: PodCast App
	entry point: (index.js) app.js
	
	$ npm install -D webpack webpack-cli webpack-dev-server
	$ npm install -D html-webpack-plugin
	$ npm install -D clean-webpack-plugin
	$ npm install -D style-loader css-loader
 */


// + FILE: /app/webpack.config.js:
const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); // для очистки старых сбилженных файлов (например, bundle.js)

module.exports = {
	entry: './src/app.js', // входной файл приложения
	output: {
		filename: 'bundle.[chunkhash].js', // добавление хэша в название файлов
		path: path.resolve(__dirname, 'public') // путь для соединеннных js файлов
	},
	devServer: { // сервер для разработки
		port: 3000
	},
	plugins: [ // подключение плагинов
		new HTMLPlugin({ // инстанс плагина html-webpack-plugin
			template: './src/index.html' // путь до шаблона (из которого будет генерироваться итоговый шаблон)
		}),
		new CleanWebpackPlugin()
	],
	module: {
		rules: [
			{
				test: /\.css$/i, // для работы c *.css файлами
				use: ['style-loader', 'css-loader'] // модули для работы с css файлами
			}
		]
	}
};


// FILE: /app/package.json:
/**
{
	// ...
	"scripts": {
		"start": "webpack-dev-server --mode development --open", // сервер в режиме разработки с автоматическим открытием в браузере
		"build": "webpack --mode production"
	}
	// ...
}
*/

// + FILE: /app/src/index.html:
/**
	<!doctype html>
	<html>
	<head>
	  <meta charset="utf-8">
	  <meta http-equiv="X-UA-Compatible" content="IE=edge">
	  <meta name="viewport" content="width=device-width, initial-scale=1">
	  <link href="https://cdn.muicss.com/mui-latest/css/mui.min.css" rel="stylesheet" type="text/css" />
	  <script src="https://cdn.muicss.com/mui-latest/js/mui.min.js"></script>
	  <title>Подкаст Вопросы</title>
	</head>
	<body>
	<button class="mui-btn mui-btn--fab mui-btn--accent floating-btn" id="modal-btn">Все</button>
	<div id="sidebar">
	  <div class="mui--text-white mui--text-display1 mui--align-vertical">
	    Подкаст Вопросы
	    <br>
	    <small class="author">by me</small>
	  </div>
	</div>
	<div id="content" class="mui-container-fluid">
	  <div class="mui-row">
	    <div class="mui-col-sm-10 mui-col-sm-offset-1">
	      <br>
	      <br>
	      <div class="mui--text-black-54 mui--text-body2">Задай вопрос</div>
	      <div class="mui-divider"></div>
	      <br>
	
	      <form class="mui-form" id="form">
	        <div class="mui-textfield mui-textfield--float-label">
	          <input type="text" id="question-input" required minlength="10" maxlength="256">
	          <label for="question-input">Что хочешь спросить?</label>
	        </div>
	        <button
	          type="submit"
	          id="submit"
	          disabled
	          class="mui-btn mui-btn--raised mui-btn--primary"
	        >
	          Задать вопрос
	        </button>
	      </form>
	
	      <br>
	      <br>
	      <div class="mui--text-black-54 mui--text-body2">Ваши вопросы</div>
	      <div class="mui-divider"></div>
	      <br>
	
	      <div id="list"></div>
	    </div>
	  </div>
	</div>
	</body>
	</html>
 */


// + FILE: /app/src/styles.css:
/**
	html,
	body {
		height: 100%;
	}
	
	html,
	body,
	input,
	textarea,
	button {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.004);
	}
	
	#sidebar {
		background-color: #E57373;
		padding: 15px;
	}
 
   .floating-btn {
      position: fixed;
      bottom: 50px;
      right: 50px;
   }
 
   .modal {
      max-width: 600px;
      max-height: 300px;
      margin: 100px auto;
      overflow-y: auto;
      background: #fff;
   }
 
   .modal > h1 {
      text-align: center;
   }
 
	.modal .modal-content {
		padding: 1rem;
	}
 
	@media (min-width: 768px) {
		#sidebar {
			position: fixed;
			top: 0;
			bottom: 0;
			width: 180px;
			height: 100%;
			padding-top: 30px;
		}
	}
	
	@media (min-width: 768px) {
		#content {
			margin-left: 180px;
		}
	}
*/


// + FILE: /app/src/app.js:
import {Question} from './question';
import {createModal, isValid} from './utils';
import {getAuthForm} from './auth';
import './styles.css'; // импортируем стили

const modalBtn = document.getElementById('modal-btn');
const form = document.getElementById('form');
const input = form.querySelector('#question-input');
const submitBtn = form.querySelector('#submit');

form.addEventListener('submit', submitFormHandler);
input.addEventListener('input', () => {
	submitBtn.disabled = !isValid(input.value);
});
modalBtn.addEventListener('click', openModal);
window.addEventListener('load', Question.renderList);


function submitFormHandler(event) {
	event.preventDefault();
	
	if (isValid(input.value)) {
		const question = {
			text: input.value.trim(),
			date: new Date().toJSON()
		};
		
		// Async request to server to save question
		
		submitBtn.disabled = true;
		Question
			.create(question)
			.then(() => {
				input.value = '';
				input.className = '';
				submitBtn.disabled = false;
			});
	}
}

function authFormHandler(event) {
	const form = event.target;
	const email = form.querySelector('#email');
	const password = form.querySelector('#password');
	
	event.preventDefault();
	
	authWithEmailAndPassword(email, password)
		.then(token => {
		
		});
}

function openModal() {
	createModal('Авторизация', getAuthForm());
	const authForm = document.getElementById('auth-form');
	
	authForm.addEventListener('submit', authFormHandler, {once: true}); // флаг событие добавляется 1 раз
}


// + FILE: /app/src/utils.js:
export function isValid(value) {
	return value.length >= 10;
}

export function createModal(title, content) {
	const modal = document.createElement('div');
	modal.classList.add('modal');
	modal.innerHTML = `
		<h1>${title}</h1>
		<div class="modal-content">${content}</div>
	`;
	mui.overlay('on', modal);
}

/**
	URI: console.firebase.google.com - регистрация
   Database -> Realtime Database - создать базу данных (вначале запускаем в тестовом режиме)
   Authentication -> Настроиться способ входа - необходимо включить нужные варианты для авторизации
   Project Overview -> Веб приложение -> название приложения - зарегистрировать приложение -> копируем apiKey
 */

// + FILE: /app/src/question.js:
export class Question {
	static create(question) {
		// URI - ссылка до БД, берется из Realtime Database
		// questions - название коллекции (таблицы) в БД
		return fetch(
			'https://app-15663.firebaseio.com/questions.json',
			{
				method: 'POST',
				body: JSON.stringify(question),
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)
			.then(response => response.json())
			.then(response => {
				question.id = response.name; // в name содержится ID
				return question;
			})
			.then(addToLocalStorage)
			.then(Question.renderList)
	}
	
	static renderList() {
		const list = document.getElementById('list');
		const questions = getQuestionFromLocalStorage();
		
		const html = questions.length
			?
			questions.map(toCard).join('\n')
			:
			'<div class="mui--text-headline">Вы пока ничего не спрашивали</div>';
		
		list.innerHTML = html;
	}
}

function addToLocalStorage(question) {
	const all = getQuestionFromLocalStorage();
	all.push(question);
	localStorage.setItem('questions', JSON.stringify(all));
}

function getQuestionFromLocalStorage() {
	const questions = localStorage.getItem('questions') || '[]';
	
	return JSON.parse(questions);
}

function toCard(question) {
	return `
		<div class="mui--text-black-54">
			${new Date(question.date).toLocaleDateString()}
			${new Date(question.date).toLocaleTimeString()}
		</div>
		<div>
			${question.text}
		</div>
	`;
}


// + FILE: /app/src/auth.js:
export function getAuthForm() {
	return `
		<form class="mui-form" id="auth-form">
			<div class="mui-textfield mui-textfield--float-label">
				<input type="email" id="email" required>
				<label for="email">Email</label>
			</div>
			<div class="mui-textfield mui-textfield--float-label">
				<input type="password" id="password" required>
				<label for="password">Password</label>
			</div>
			<button
				type="submit"
				class="mui-btn mui-btn--raised mui-btn--primary"
			>
				Войти
			</button>
		</form>
	`;
}

export function authWithEmailAndPassword(email, password) {
	const apiKey = "AIzaSyDuwdXp5VebTh2z"; // из Project Overview
	return fetch(
		`https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${apiKey}`,
		{
			method: 'POST',
			body: JSON.stringify({
				email, password,
				returnSecureToken: true // обязательное значение
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		}
	)
	.then(response => response.json())
	.then(data => data.idToken);
}
