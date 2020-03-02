const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')
const keys = require('../keys')
const User = require('../models/user.model') // импортируем модель

module.exports.login = async (req, res) => {
  const candidate = await User.findOne({login: req.body.login}) // ищем по логину

  if (!candidate) {
    res.status(404).json({message: 'Пользователь не найден'})
  } else {
    const isPasswordCorrect = bcrypt.compareSync(req.body.password, candidate.password) // сравнение паролей

    if (!isPasswordCorrect) {
      res.status(401).json({message: 'Ошибка авторизаци'})
    } else {
      const token = jwt.sign({ // что шифруем в токене
        login: candidate.login,
        userId: candidate._id,
      }, keys.JWT, {expiresIn: 60 * 60}) // 1 час жизнь токена ; keys.JWT - будет солью

      res.json({token})
    }
  }
}

module.exports.createUser = async (req, res) => {
  const candidate = await User.findOne({login: req.body.login})

  if (candidate) {
    res.status(409).json({message: 'Такой логин уже занят'})
  } else {
    const solt = bcrypt.genSaltSync(10) // хэш для пароля

    const user = new User({
      login: req.body.login,
      password: bcrypt.hashSync(req.body.password, solt), // шифруем пароль
    })

    await user.save() // сохраяем пользователя в БД

    req.status(201).json(user)
  }
}
