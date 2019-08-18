const express = require('express') // подключаем express
const app = express()

const PORT = process.env.PORT || 80 // heroku должен сам добавить данную переменную, если ее нет, присваиваем 80 порт

app.get('/', (req, res) => { // обработчик для главной
    res.end(`
        <h1>HOME PAGE</h1> 
        <a href="/about">ABOUT PAGE</a>
    `)
})

app.get('/about', (req, res) => { // обработчик для страницы about
    res.end(`
        <h1>ABOUT PAGE</h1>
        <a href="/">HOME PAGE</a>
    `)
})

app.listen(PORT, () => {
    console.log('Sever has been started')
})