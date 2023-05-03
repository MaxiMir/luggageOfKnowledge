const Router = require('express').Router
const { body } = require('express-validator') // функция для валидации тела запросов
const userController = require('../controllers/user-controller')
const authMiddleware = require('../middlewares/auth-middleware')

const router = new Router()

router.post('/registration',
	body('email').isEmail(), // передаем как middleware
	body('password').isLength({ min: 3, max: 32 }), // передаем как middleware
	userController.registration,
)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)
router.get('/users', authMiddleware, userController.getUsers) // только для авторизованных пользователей

module.exports = router

// передаем его как middleware в index.js
