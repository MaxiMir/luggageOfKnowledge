const express = require('express')
const config = require('config')
const path = require('path')
const mongoose = require('mongoose')

const app = express()

app.use(express.json({ extended: true }))

// Регистрация роутов:
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))
app.use('/t', require('./routes/redirect.routes'))


if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = config.get('port') || 5000 // использование пакета config

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), { // подключение к БД
      useNewUrlParser: true, // лечение DeprecationWarning
      useUnifiedTopology: true,
      useCreateIndex: true
    })

    app.listen(PORT, () => console.log(`App has been started on port ${ PORT }...`))
  } catch (e) {
    console.log('Server Error', e.message)

    process.exit(1) // завершение процесса NodeJS
  }
}

start()

