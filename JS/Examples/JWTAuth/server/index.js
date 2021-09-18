require('dotenv').config() // для чтения .env конфиг файлов
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const router = require('./router/index')
const errorMiddleware = require('./middlewares/error-middleware')

const PORT = process.env.PORT || 5000 // из .env
const app = express()

app.use(express.json()) // middleware
app.use(cookieParser())
app.use(cors({
	credentials: true,
	origin: process.env.CLIENT_URL,
}))
app.use('/api', router)
app.use(errorMiddleware) // ! middleware для обработки ошибок должен идти последним

const start = async () => {
	try {
		// подключаем БД:
		await mongoose.connect(process.env.DB_URL, { // из .env
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`))
	} catch (e) {
		console.log(e)
	}
}

start()
