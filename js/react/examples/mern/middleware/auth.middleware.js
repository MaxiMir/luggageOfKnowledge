const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => { // next - метод продолжить выполнение запроса
	if (req.method === 'OPTIONS') { // метод из RestApi - проверяет доступность сервера
		return next()
	}

	try {
		const token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"

		if (!token) {
			return res.status(401).json({message: 'Нет авторизации'})
		}

		req.user = jwt.verify(token, config.get('jwtSecret')) // раскодирование токена
		next()

	} catch (e) {
		res.status(401).json({message: 'Нет авторизации'})
	}
}
