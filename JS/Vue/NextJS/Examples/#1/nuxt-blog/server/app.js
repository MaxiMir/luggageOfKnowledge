// новый файл сюда перенесли app:
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const passportStrategy = require('./middleware/passport.strategy')
const authRoutes = require('./routes/auth.routes')
const postRoutes = require('./routes/post.routes')
const commentRoutes = require('./routes/comment.routes')
const keys = require('./keys')
const app = express()

// рекомендуется подлючаться к БД после инициализации express
mongoose.connect(keys.MONGO_URI) // берем из файлов в /keys
  .then(() => console.log('MongoDb connected'))
  .catch(error => console.error(error))

// passport
app.use(passport.initialize())
passport.use(passportStrategy) // передаем стратегию для запросов роутов

// bodyParser - пакет для удобного парсинга входящих параметров:
app.use(bodyParser.urlencoded({extended: true})) // добавляем middleware
app.use(bodyParser.json())

// Роуты:
app.use('/api/auth', authRoutes) // регистрация роута
app.use('/api/post', postRoutes) // регистрация роута
app.use('/api/comments', commentRoutes) // регистрация роута


module.exports = app


