const express = require('express')
const exphbs = require('express-handlebars') // шаблонизатор
const path = require('path')
const homeRoutes = require('./routes/home')
const addRoutes = require('./routes/add')
const cursesRoutes = require('./routes/curses')
const cardRoutes = require('./routes/card')

const app = express()

const hbs = exphbs.create({ // конфигурируем шаблонизатор
  defaultLayout: 'main', // основной layout
  extname: 'hbs' // ext файлов
})

app.engine('hbs-engine', hbs.engine) // регистируем движок в express
app.set('view engine', 'hbs-engine') // используем зарегистрированный движок
app.set('views', 'view') // папка с шаблонами


app.use( express.static(path.join(__dirname, 'public'))) // .use - использование middleware | регистрируем папку со статическими файлами
app.use(express.urlencoded({ extended: true })) // для считывания body при отправке форм
// РОУТЫ:
app.use('/', homeRoutes) // префикс для роута
app.use('/add', addRoutes)
app.use('/curses',cursesRoutes)
app.use('/card', cardRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`SERVER HAS BEEN STARTED ON PORT ${PORT}...`)
})
