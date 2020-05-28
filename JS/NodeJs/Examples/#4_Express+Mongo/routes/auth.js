const { Router } = require('express')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const sendgrid = require('nodemailer-sendgrid-trapsport')
const keys = require('../keys')
const User = require('../models/user')
const regMail = require('../emails/registration')
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
      await transporter.sendMail(regMail(email)) // рекомендуется использовать после редиректа
    }
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

      } else {
        req.flash('error', 'Такого email нет')
        res.redirect('/auth/reset')
      }

    })
  } catch (e) {
    console.log(e)
  }
})


module.exports = router
