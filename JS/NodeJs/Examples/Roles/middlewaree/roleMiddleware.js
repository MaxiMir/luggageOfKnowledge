const jwt = require('jsonwebtoken')
const { secret } = require('../config')

// middleware только для определенных ролей в /Roles/authRouter.js
module.exports = roles => {
	return function(req, res, next) {
		if (req.method === 'OPTIONS') {
			next()
		}

		try {
			const token = req.headers.authorization.split(' ')[1]

			if (!token) {
				return res.status(403).json({ message: 'Пользователь не авторизован' })
			}

			const { roles: userRoles } = jwt.verify(token, secret)

			const hasRole = userRoles.some((role) => roles.includes(role))

			if (!hasRole) {
				return res.status(403).json({ message: 'У вас нет доступа' })
			}

			next()
		} catch (e) {
			console.log(e)
			return res.status(403).json({ message: 'Пользователь не авторизован' })
		}
	}
}
