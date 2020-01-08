// MERN <-> MONGO DB + EXPRESS + REACT + NODE JS

//
/**
   WebStorm -> create project -> mern-course
 
	$ npm init
   // ...
   entry point: (index.js) app.js
   
   $ npm install express mongoose
   $ npm install -D nodemon concurrently
   $ npm i config
   $ npm i bcryptjs
   $ npm i express-validator
   $ npm i jsonwebtoken
 */


// FILE: /mern-course/package.json:
/**
{
	// ...
	"scripts": {
		"start": "node app.js",
		"server": "nodemon app.js", // пакет для перезагрузки сервера
		"client": "npm run start --prefix client", // prefix тк как находится в папке client
		"dev": "concurrently \"npm run server\" \"npm run client\"" // concurrently - для запуска нескольких скриптов одновременно
	}
}
 */

// + FOLDER: /mern-course/config
// + FOLDER: /mern-course/routes
// + FOLDER: /mern-course/models


// + FILE: /mern-course/config/default.json:
/**
{
	"port": 5000,
	"jwtSecret": "app mern",
	"mongoURI": "mongodb+srv://maximir:1234qwer@cluster0-kggc2.azure.mongodb.net/app?retryWrites=true&w=major" // берется из Connection String Only
}
 */


// + FILE: /mern-course/app.js:
const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();
app.use('/api/auth', require('./routers/auth.routes')); // регистрация роутов

const PORT = config.get('port') || 5000;

async function start() {
	try {
		await mongoose.connect(config.get('mongoUri'), {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		});
		
		app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));
	} catch (e) {
		console.log('Server Error', e.message);
		process.exit(1); // завершение процесса NodeJS
	}
}

start();


/**
	URI: mongodb.com
	Context -> new Project -> mern -> create project
	-> build cluster -> FREE -> azure + netherlands
	-> connect -> Add Your Current IP address -> Create a MongoDB User -> Choose a connection method -> Connect Your Application -> Connection String Only -> Copy
 */



// + FILE: /mern-course/routes/auth.routes.js:
const {Router} = require('express');
const config = require('');
const bcrypt = require('bcryptjs'); // для хэширования и сравнения паролей
const jwt = require('jsonwebtoken'); // для создания токенов
const {check, validationResult} = require('express-validator'); // для валидации отправленных данных
const User = require('../models/User');
const router = Router();

// /api/auth/register
router.post(
	'/register',
	[ // MiddleWare
		check('email', 'Некорректный email').isEmail(),
		check('password', 'Минимальная длина пароля - 6 символов').isLength({min: 6})
	],
	async (req, res) => {
		try {
			const errors = validationResult(req); // валидация полей
			
			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
					message: 'Некорректные данные при регистрации'
				});
			}
			
			const {email, password} = req.body;
			
			const candidate = await User.findOne({email});
			
			if (candidate) {
				res.status(400).json({message: 'Такой пользователь уже существует'});
				return;
			}
			
			const hashedPassword = await bcrypt.hash(password, 12);
			const user = new User({email, password: hashedPassword});
			
			await user.save();
			
			res.status(201).json({message: 'Пользователь создан'});
		} catch (e) {
			res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
		}
	}
);

// /api/auth/login
router.post(
	'/login',
	[
		check('email', 'Введите корректный email').normalizeEmail().isEmail(),
		check('password', 'Введите пароль').exists()
	],
	async (req, res) => {
		try {
			const errors = validationResult(req); // валидация полей
			
			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
					message: 'Некорректные данные при входе в систему'
				});
			}
			
			const {email, password} = req.body;
			const user = await User.findOne({ email });
			
			if (!user) {
				return res.status(400).json({ message: 'Пользователь не найден'});
			}
			
			const isMatch = await bcrypt.compare(password, user.password);
			
			if (!isMatch) {
				return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' });
			}
			
			const token = jwt.sign(
				{ userId: user.id }, // данные для шифрования
				config.get('jwtSecret'), // секреный ключ
				{ expiresIn: '1h' } // время существования токена
			);
			
			req.json({ token, userId: user.id });
		} catch (e) {
			res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
		}
	}
);

module.exports = router;



// + FILE: /mern-course/models/User.js:
const {Schema, model, Types} = require('mongoose');
const schema = new Schema({
	email: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	links: [{type: Types.ObjectId, ref: 'Link'}] // type - связка модели пользователя с определенными записями в БД. ref - модель к чему привязываем
});

module.exports = model('User', schema);


// $ npx create-react-app client // с указанием папки client
// $ cd client/
// $ rm -rf node_modules/
// $ rm -rf .git
// DELETE yarn.lock
// DELETE App.css
// DELETE App.text.js
// DELETE logo.svg
// $ npm i
// $ npm install materialize-css@next



// FILE: /mern-course/client/src/App.js:

import React from 'react';
import 'materialize-css';

function App() {
	return (
		<div>
			<h1>Hello</h1>
		</div>
	)
}

export default App;



// FILE: /mern-course/client/src/index.css:
/**
	@import "~materialize-css/dist/css/materialize.min.css";

 */