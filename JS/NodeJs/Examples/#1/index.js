/**
    NODEJS + MONGO + EXPRESS

    $ npm init -y   # package.json по умолчанию
    $ npm install express mongoose
    $ npm i -D nodemon # автоматическая перезагрузка сервера по Ctrl+S
    $ npm i express-handlebars # HTML движок

    $ npm run dev
*/

const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const exphbs = require('express-handlebars')
const todoRoutes = require('./routes/todos') // импортируем роут

const PORT = process.env.PORT || 3000

const app = express()
const hbs = exphbs.create({ // конфигурация шаблонизатора
    defaultLayout: 'main', // название дефолтного layout
    extname: 'htb' // расширение у layout
})

app.engine('hbs-engine', hbs.engine) // движок для рендеринга страниц; hbs-engine - название движка
app.set('view engine', 'hbs-engine') // использование зарегистрированного движка
app.set('views', 'views') // указываем папку с views


app.use(express.urlencoded({ extended: true })) // для считывания body
app.use(express.static(path.join(__dir, 'public'))) // регистрируем статическую папку public
app.use(todoRoutes) // регистрация роута


async function start() {
    try {
      await mongoose.connect(
        'mongodb+srv://maximir:1q2w3e4r@cluster0-ua4e7.mongodb.net/todos',
        {
          useNewUrlParser: true,
          useFindAndModify: false
        }
      ) // todos - название коллекции

      app.listen(PORT, () => { // запуск сервера
        console.log('Server has been started...')
      })
    } catch (e) {
      console.log(e)
    }
  }
  
  start()
