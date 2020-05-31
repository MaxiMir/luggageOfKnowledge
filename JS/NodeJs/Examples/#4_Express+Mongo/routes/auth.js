const { Router } = require('express')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const { validationResult } = require('express-validator/check') // проверяем параметры из body (для query параметров - query), check = body + query
const nodemailer = require('nodemailer')
const sendgrid = require('nodemailer-sendgrid-trapsport')
const keys = require('../keys')
const User = require('../models/user')
const regMail = require('../emails/registration')
const resetEmail = require('../emails/reset')
const { registerValidators } = require('../utils/validators')
const router = Router()


const transporter = nodemailer.createTransport(sendgrid({
  auth: { api_key: keys.SENDGRID_API_KEY }
}))


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

router.post('/register', registerValidators, async (req, res) => { // middleware body
  try {
    const { email, password, name } = req.body
    const candidate = await User.findOne({ email })

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      req.flash('registerError', errors.array()[0].msg) // array() приводит к массиву
      return res.status(422).redirect('/auth/login#register') // 422 - ошибки валидации
    }

    const hashPassword = await bcrypt.hash(password, 10) // шифрование пароля
    const user = new User({
      email, name, password: hashPassword, cart: { items: [] }
    })

    await user.save()
    res.redirect('/auth/login#login')
    await transporter.sendMail(regMail(email)) // рекомендуется использовать после редиректа
  } catch (e) {
    console.log(e)
  }
})

router.get('/reset', (req, res) => {
  res.render('auth/reset', {
    title: 'Забыли пароль?',
    error: req.flash('error')
  })
})

router.get('/password/:token', async (req, res) => {
  if (!req.params.token) {
    return res.redirect('/auth/login')
  }

  try {
    const user = await User.findOne({
      resetToken: req.params.token,
      resetTokenExp: { $gt: Date.now() }
    })

    if (!user) {
      return res.redirect('/auth/login')
    } else {
      res.render('auth/password', {
        title: 'Восстановить доступ',
        error: req.flash('error'),
        userId: user._id.toString(),
        token: req.params.token
      })
    }

  } catch (e) {
    console.log(e)
  }
})

router.post('/reset', (req, res) => {
  try {
    crypto.randomBytes(32, async (err, buffer) => { // 32 байта
      if (err) {
        req.flash('error', 'Что-то пошло не так, повторите попытку позже')
        return res.redirect('/auth/reset')
      }

      const token = buffer.toString('hex') // получаем сгенерированное выражение
      const candidate = await User.findOne({ email: req.body.email })

      if (candidate) {
        candidate.resetToken = token
        candidate.resetTokenExp = Date.now() + 60 * 60 * 1000 // 1 час
        await candidate.save()
        await transporter.sendMail(resetEmail(candidate.email, token))
        res.redirect('/auth/login')
      } else {
        req.flash('error', 'Такого email нет')
        res.redirect('/auth/reset')
      }

    })
  } catch (e) {
    console.log(e)
  }
})

router.post('/password', async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.body.id,
      resetToken: req.body.token,
      resetTokenExp: { $gt: Data.now() }
    })

    if (!user) {
      req.flash('loginError', 'Время жизни токена истекло')
      res.redirect('/auth/login')
    } else {
      user.password = await bcrypt.hash(req.body.password, 10)
      user.resetToken = undefined
      user.resetTokenExp = undefined
      await user.save()
      res.redirect('/auth/login')
    }

  } catch (e) {
    console.log(e)
  }
})


module.exports = router
