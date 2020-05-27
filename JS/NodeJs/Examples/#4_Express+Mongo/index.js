const express = require('express')
const path = require('path')
const csrf = require('csurf')
const flash = require('connect-flash')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session) // в () передаем с чем синхронизируем
const keys = require('keys')

const homeRoutes = require('./routes/home')
const cardRoutes = require('./routes/card')
const addRoutes = require('./routes/add')
const ordersRoutes = require('./routes/orders')
const coursesRoutes = require('./routes/courses')
const authRoutes = require('./routes/auth')
const varMiddleware = require('./middleware/variables')
const userMiddleware = require('./middleware/user')


const PORT = process.env.PORT || 3000

const app = express()
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

const store = new MongoStore({
  collection: "sessions", // название коллекции где будем хранить сессии
  uri: keys.MONGODB_URI
})
/** Пример sessions:
{
  _id: N3tbn7453dvt3,
  expires: 2020-05-10T12:14:11.401+00:00
  session: Object
    cookie: Object
    user:
      card:
        items: Array
      _id: ObjectId("5cc1d29d")
      email: "maxim@mail.ru"
      name: "Maxim"
      __v: 0
      isAuthenticated: true
}
*/

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use(session({ // добавляем пакет express-session в middleware
  secret: keys.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store  // синхронизированный store для сесссии
}))
app.use(csrf())
app.use(flash())
app.use(varMiddleware)
app.use(userMiddleware)

app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/courses', coursesRoutes)
app.use('/card', cardRoutes)
app.use('/orders', ordersRoutes)
app.use('/auth', authRoutes)

async function start() {
  try {
    await mongoose.connect(keys.MONGODB_URI, {
      useNewUrlParser: true, // лечение warning
      useFindAndModify: false // лечение warning
    })
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()


