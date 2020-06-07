const express = require('express')
const path = require('path')
const app = express()

const sequelize = require('./utils/database')
const todoRoutes = require('./routes/todo')

const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'public'))) // делаем папку статической
app.use(express.json()) // парсит JSON запросы
app.use('/api/todo', todoRoutes)

app.use((req, res, next) => { // на каждый запрос отдаем файл
  res.sendFile('/index.html')
})

async function start() {
  try {
    await sequelize.sync() // подключение к БД // ({force: true})
    app.listen(PORT)
  } catch (e) {
    console.log(e)
  }
}

start()
