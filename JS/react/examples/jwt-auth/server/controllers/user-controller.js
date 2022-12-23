const { validationResult } = require('express-validator')
const userService = require('../service/user-service')
const ApiError = require('../exceptions/api-error')

class UserController {
	async registration(req, res, next) {
		try {
			const errors = validationResult(req) // результат валидации
			if (!errors.isEmpty()) {
				return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
			}
			const { email, password } = req.body
			const userData = await userService.registration(email, password)
			res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true }) // добавляем refresh token в cookie | чтобы работало нужен middleware app.use(cookieParser()) | если используется https добавить флаг secure
			return res.json(userData)
		} catch (e) {
			next(e)
		}
	}

	async login(req, res, next) {
		try {
			const { email, password } = req.body
			const userData = await userService.login(email, password)
			res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
			return res.json(userData)
		} catch (e) {
			next(e)
		}
	}

	async logout(req, res, next) {
		try {
			const { refreshToken } = req.cookies // достаем из кук refreshToken
			const token = await userService.logout(refreshToken)
			res.clearCookie('refreshToken') // удаляем куку
			return res.json(token)
		} catch (e) {
			next(e)
		}
	}

	async activate(req, res, next) {
		try {
			const activationLink = req.params.link
			await userService.activate(activationLink)
			return res.redirect(process.env.CLIENT_URL) // редирект
		} catch (e) {
			next(e)
		}
	}

	async refresh(req, res, next) {
		try {
			const { refreshToken } = req.cookies
			const userData = await userService.refresh(refreshToken)
			res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
			return res.json(userData)
		} catch (e) {
			next(e)
		}
	}

	async getUsers(req, res, next) {
		try {
			const users = await userService.getAllUsers()
			return res.json(users)
		} catch (e) {
			next(e)
		}
	}
}


module.exports = new UserController()
