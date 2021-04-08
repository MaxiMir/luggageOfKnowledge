const express = require('express')
const {v4: uuidv4} = require('uuid') // uuid версии 4
const {ExpressPeerServer} = require('peer')
const http = require('http')
const socket = require('socket.io')

const app = express()
const server = http.Server(app)
const peerServer = ExpressPeerServer(server, {debug: true})
const io = socket(server)

app.set('view engine', 'ejs') // шаблонизатор EJS (смотрит в папку views)

app.use(express.static('public')) // открывает доступ ко всем статическим файлам в папке public

app.use('/peerjs', peerServer)

app.get('/', (req, res) => {
  res.redirect(`/${uuidv4()}`) // создаем случайный уникальный идентификатор для каждой комнаты и перенаправляем пользователя в эту комнату
})

app.get('/:room', (req, res) => {
  res.render('room', {roomId: req.param.room}) // рендерит room.ejs
})

io.on('connection', (socket) => {
  socket.on('join-room', (roomId, userId, userName) => { // сервер прослушивает событие присоединения к комнате
    socket.join(roomId)
    socket.to(roomId).broadcast.emit('user-connected', userId)
    socket.on('message', (message) => {
      io.to(roomId).emit('createMessage', message, userName)
    })
  })
})

server.listen(process.env.PORT || 3030)
