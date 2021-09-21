require('dotenv').config()
const path = require('path')
const express = require('express')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const sequelize = require('./db')
const models = require('./models/models')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors()) // для запросов из браузера
app.use(express.json()) // для парсинга json
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

// Обработка ошибок, последний Middleware
app.use(errorHandler)

const start = async () => {
	try {
		await sequelize.authenticate() // установить подключение к БД
		await sequelize.sync() // сверяет состояние БД со схемами данных
		app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
	} catch (e) {
		console.log(e)
	}
}


start()
