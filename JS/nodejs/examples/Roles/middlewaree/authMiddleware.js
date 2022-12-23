const jwt = require('jsonwebtoken')
const {secret} = require('../config')

// middleware только для авторизованных в /Roles/authRouter.js
module.exports = (req, res, next) => {
    if (req.method === "OPTIONS") {
        next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]

        if (!token) {
            return res.status(403).json({message: "Пользователь не авторизован"})
        }

        req.user = jwt.verify(token, secret) // проверка токена
        next()
    } catch (e) {
        console.log(e)
        return res.status(403).json({message: "Пользователь не авторизован"})
    }
};
