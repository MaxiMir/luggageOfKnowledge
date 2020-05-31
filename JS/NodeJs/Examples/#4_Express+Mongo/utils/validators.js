const { body } = require('express-validator/check')
const User = require('../models/user')

exports.registerValidators = [
  body('email')
    .isEmail()
    .withMessage('Введите корректный email') // свое сообщение при ошибке
    .custom(async (value, { req }) => { // асинхронный валидатор
      try {
        const user = await User.findOne({ email: value })

        if (user) {
          return Promise.reject('Такой email уже занят')
        }
      } catch (e) {
        console.log(e)
      }
    })
    .normalizeEmail(), // нормализация Email
  body('password', 'Пароль должен быть минимум 6 символов') // сообщение об ошибке можно передавать 2 параметром
    .isLength({ min: 6, max: 56 })
    .isAlphanumeric() // латиница + цифры
    .trim(),
  body('confirm')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Пароли должны совпадать')
      }

      return true
    })
    .trim(),
  body('name')
    .isLength({ min: 3 })
    .withMessage('Имя должно быть минимум 3 символа')
    .trim()
]


exports.courseValidators = [
  body('title')
    .isLength({ min: 3 })
    .withMessage('Минимальная длинна названия 3 символа')
    .trim(),
  body('price')
    .isNumeric()
    .withMessage('Введите корректную цену'),
  body('img', 'Введите корректный Url картинки')
    .isURL()
]
