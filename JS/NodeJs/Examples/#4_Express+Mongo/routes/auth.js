const { Router } = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const router = Router()

router.get('/login', async (req, res) => {
  res.render('auth/login', {
    title: 'Авторизация',
    isLogin: true,
    loginError: req.flash('loginError'), // передаем flash сообщения
    registerError: req.flash('registerError') // передаем flash сообщения
  })
})

router.get('/logout', async (req, res) => {
  req.session.destroy(() => { // колбэк после уничтожения всех файлов в сессии
    res.redirect('/auth/login#login')
  })
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const candidate = await User.findOne({ email })

    if (!candidate) {
      req.flash('loginError', 'Такого пользователя не существует')
      res.redirect('/auth/login#login')
    } else {
      const areSame = await bcrypt.compare(password, candidate.password)

      if (areSame) {
        req.session.user = candidate // добавляем в сессию данные
        req.session.isAuthenticated = true // добавляем в сессию данные
        req.session.save(err => { // сохраняем данные в сессии
          if (err) {
            throw err
          }

          res.redirect('/') // после делаем редирект
        })
      } else {
        req.flash('loginError', 'Неверный пароль')
        res.redirect('/auth/login#login')
      }
    }
  } catch (e) {
    console.log(e)
  }
})

router.post('/register', async (req, res) => {
  try {
    const { email, password, repeat, name } = req.body
    const candidate = await User.findOne({ email })

    if (candidate) {
      req.flash('registerError', 'Пользователь с таким email уже существует')
      res.redirect('/auth/login#register')
    } else {
      const hashPassword = await bcrypt.hash(password, 10) // шифрование пароля
      const user = new User({
        email, name, password: hashPassword, cart: { items: [] }
      })

      await user.save()
      res.redirect('/auth/login#login')
    }
  } catch (e) {
    console.log(e)
  }
})

module.exports = router