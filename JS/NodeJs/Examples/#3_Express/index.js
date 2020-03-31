const express = require('express')
const exphbs = require('express-handlebars') // шаблонизатор
const homeRoutes = require('./routes/home')
const addRoutes = require('./routes/add')
const cursesRoutes = require('./routes/curses')

const app = express()

const hbs = exphbs.create({ // конфигурируем шаблонизатор
  defaultLayout: 'main', // основной layout
  extname: 'hbs' // ext файлов
})

app.engine('hbs-engine', hbs.engine) // регистируем движок в express
app.set('view engine', 'hbs-engine') // используем зарегистрированный движок
app.set('views', 'view') // папка с шаблонами


app.use(express.static('public')) // .use - использование middleware | регистрируем папку со статическими файлами
app.use(homeRoutes) // роуты для главной
app.use(addRoutes) // роуты для /add
app.use(cursesRoutes) // роуты для /curses



app.get('/add', (req, res) => {
  res.render('add', { // рендерим страницу index.hbs
    title: 'Добавить курс',
    isAdd: true
  })
})

app.get('/courses', (req, res) => {
  res.render('add', {
    title: 'Курсы',
    isCurses: true
  })
})


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`SERVER HAS BEEN STARTED ON PORT ${PORT}...`)
})
