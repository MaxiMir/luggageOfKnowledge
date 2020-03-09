const bcrypt = require('bcrypt-nodejs') // пакет для шифрования паролей
const jwt = require('jsonwebtoken') // пакет для создания токенов для сессий
const keys = require('../keys') // ключи для разработки/прода
const User = require('../models/user.model') // импортируем модель user

module.exports.login = async (req, res) => {
  const candidate = await User.findOne({ login: req.body.login }) // ищем по логину

  if (!candidate) {
    res.status(404).json({ message: 'Пользователь не найден' })
  } else {
    const isPasswordCorrect = bcrypt.compareSync(req.body.password, candidate.password) // сравнение паролей

    if (!isPasswordCorrect) {
      res.status(401).json({ message: 'Логин или пароль неверен' }) // 401 - ошибка авторизации
    } else {
      const token = jwt.sign({ // что шифруем в токене
        login: candidate.login,
        userId: candidate._id
      }, keys.JWT, { expiresIn: 60 * 60 }) // keys.JWT - служит солью; 1 час жизнь токена;

      res.json({ token })
    }
  }
}

module.exports.createUser = async (req, res) => {
  const candidate = await User.findOne({ login: req.body.login })

  if (candidate) {
    res.status(409).json({ message: 'Такой login уже занят' })
  } else {
    const salt = bcrypt.genSaltSync(10) // хэш для хэширования пароля

    const user = new User({ // создаем нового юзера
      login: req.body.login,
      password: bcrypt.hashSync(req.body.password, salt) // шифруем пароль
    })

    await user.save() // сохраняем пользователя в БД
    res.status(201).json(user) // 201 - успешное создание
  }
}
