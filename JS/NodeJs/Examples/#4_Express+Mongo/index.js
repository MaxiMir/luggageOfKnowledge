const express = require('express')
const path = require('path')
const mongoose = require('mongoose') // подключаем mongoose
const exphbs = require('express-handlebars')
const homeRoutes = require('./routes/home')
const cardRoutes = require('./routes/card')
const addRoutes = require('./routes/add')
const ordersRoutes = require('./routes/orders')
const coursesRoutes = require('./routes/courses')
const User = require('./models/user')

const app = express()

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')


app.use(async (req, res, next) => {
  try {
    const user = await User.findById('5cc1d29dcedab01481e03660')
    req.user = user
    next()
  } catch (e) {
    console.log(e)
  }
})


app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))

app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/courses', coursesRoutes)
app.use('/card', cardRoutes)
app.use('/orders', ordersRoutes)

const PORT = process.env.PORT || 3000


async function start() {
  try {
    const url = `mongodb+srv://maximir:0I5GEL9uLUcR38GC@cluster0-3rrau.mongodb.net/shop` // 0I5GEL9uLUcR38GC - пароль | shop - название БД
    await mongoose.connect(url, {
      useNewUrlParser: true, // лечение warning
      useFindAndModify: false
    })

    const candidate = await User.findOne()

    if (!candidate) {
      const user = new User({
        email: 'maxim@mail.ru',
        name: 'Maxim',
        cart: {items: []}
      })
      await user.save()
    }

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()


