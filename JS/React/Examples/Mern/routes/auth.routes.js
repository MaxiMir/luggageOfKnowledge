const {Router} = require('express')
const bcrypt = require('bcryptjs') // для хэширования и сравнения паролей
const config = require('config')
const jwt = require('jsonwebtoken') // для создания токенов
const {check, validationResult} = require('express-validator') // для валидации данных
const User = require('../models/User')


const router = Router()


// /api/auth/register
router.post(
	'/register',
	[ // MiddleWare
		check('email', 'Некорректный email').isEmail(), // проверка на email
		check('password', 'Минимальная длина пароля 6 символов').isLength({min: 6}) // проверка на длину
	],
	async (req, res) => {
		try {
			const errors = validationResult(req) // валидация полей

			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(), // ошибка валадиции
					message: 'Некорректные данные при регистрации'
				})
			}

			const {email, password} = req.body

			const candidate = await User.findOne({email})

			if (candidate) {
				return res.status(400).json({message: 'Такой пользователь уже существует'})
			}

			const hashedPassword = await bcrypt.hash(password, 12) //  хэширование пароля, соль = 12
			const user = new User({email, password: hashedPassword})

			await user.save()

			res.status(201).json({message: 'Пользователь создан'})

		} catch (e) {
			res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
		}
	})

// /api/auth/login
router.post(
	'/login',
	[ // MiddleWare
		check('email', 'Введите корректный email').normalizeEmail().isEmail(), // normalizeEmail - приводит к email
		check('password', 'Введите пароль').exists() // пароль должен существовать
	],
	async (req, res) => {
		try {
			const errors = validationResult(req)

			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
					message: 'Некорректный данные при входе в систему'
				})
			}

			const {email, password} = req.body

			const user = await User.findOne({email})

			if (!user) {
				return res.status(400).json({message: 'Неправильный логин или пароль'})
			}

			const isMatch = await bcrypt.compare(password, user.password)

			if (!isMatch) {
				return res.status(400).json({message: 'Неправильный логин или пароль'})
			}

			const token = jwt.sign(
				{userId: user.id}, // данные, которые необходимо зашифровать в токене
				config.get('jwtSecret'), // секретный ключ (библиотека config)
				{expiresIn: '1h'} // время существования токена
			)

			res.json({token, userId: user.id})

		} catch (e) {
			res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
		}
	}
)


module.exports = router
